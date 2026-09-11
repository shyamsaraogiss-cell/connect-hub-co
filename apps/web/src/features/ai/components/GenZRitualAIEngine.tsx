'use client';

import { priestTerminology } from '@/lib/priest-terminology';

import React, { useState, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import { BookIcon, CompassIcon, DiyaIcon, MandalaIcon, PartnerUserPlusIcon, QuestionCircleIcon, ScrollQuillIcon, ShieldIcon } from '@/features/public-shell/components/PublicHeroSidebar';
import type { BusinessCategory } from '../types/ai.types';
import { APPROVED_AI_KNOWLEDGE_TREES } from '../knowledge/ai-knowledge';
import { APPROVED_QUESTION_BROWSER_DATASET } from '../knowledge/approved-question-browser';
import { findApprovedPublicKnowledge, findExactApprovedQuestion, findFounderKnowledge, isReliablyRelatedQuestion, rankApprovedQuestions, searchKnowledgeCenter, syncKnowledgeFromBackend, understandPublicQuestion } from '../knowledge/semantic-search';
import { getAISessionMemory, updateAISessionMemory } from '../services/ai-session.service';
import { submitUnifiedInquiry } from '@/services/inquiry.api';
import { getUniversalRequestByReferenceId } from '@/services/urms.api';
import type { URMSUniversalRecord } from '@/types/urms';
import type { BaseInquiryInput, BusinessModuleCategory } from '@/components/inquiry/types';
import { GenZChatShell, GenZComposer, genzChatStyles as chatStyles, type GenZDrawerId } from './GenZChatShell';

export type GenZRitualAIEngineProps = {
  category: BusinessCategory;
  compact?: boolean;
};

type AIResponseStatus = 'neutral' | 'approved' | 'service-intent' | 'clarification' | 'tracking' | 'pending-review' | 'escalated' | 'failure' | 'warning' | 'unsupported';

export type ServiceIntent = {
  guidance: string;
  actionLabel: string;
  actionHref: string;
  informationHref?: string;
};

const NEUTRAL_RESPONSE_MESSAGE = 'Your AI guidance and important response updates will appear here.';
const MISUSE_RESPONSE_MESSAGE = 'This request cannot be supported. GenZ AI is intended for legitimate service, guidance, knowledge, tracking, and support use. Abusive, unlawful, harmful, fraudulent, or intentionally disruptive requests may be refused or restricted.';
const OUT_OF_PURPOSE_RESPONSE_MESSAGE = 'This request is outside the supported purpose of GenZ AI. Please use the platform for Connect Hub Co. services, approved knowledge, tracking, and authorised support.';

export const MISUSE_PATTERNS = [
  /\b(?:help|teach|show|tell)\s+me\s+(?:how\s+to\s+)?(?:hack|steal|scam|defraud|attack|harm|kill|threaten|bypass)\b/i,
  /\b(?:create|make|forge)\s+(?:a\s+)?(?:fake|fraudulent)\s+(?:receipt|invoice|identity|document|certificate)\b/i,
  /\b(?:bomb|malware|ransomware)\s+(?:instructions|code|attack|plan)\b/i,
  /\b(?:poison|injure|harm|kill|attack)\s+(?:someone|a\s+person|people|them)\b/i,
  /\b(?:evade|avoid)\s+(?:tax|taxes|law|police)\b/i,
  /\b(?:spam|flood)\s+(?:requests?|messages?|forms?|system)\b/i,
  /\byou\s+(?:are|'re)\s+(?:stupid|useless|idiotic|an?\s+idiot)\b/i,
] as const;

export const OUT_OF_PURPOSE_PATTERNS = [
  /\b(?:write|debug)\s+(?:my\s+)?(?:code|program|software)\b/i,
  /\b(?:stock|crypto)\s+(?:price|tip|prediction)\b/i,
  /\b(?:football|cricket|basketball)\s+(?:score|result)\b/i,
  /\b(?:movie|music|restaurant)\s+recommendation\b/i,
  /\b(?:recipe|homework|dating advice)\b/i,
  /\b(?:laptop|restaurant\s+booking|company\s+payroll|virtual\s+machine|computer\s+network)\b/i,
] as const;

const SERVICE_ACTION_PATTERN = /\b(?:i\s+)?(?:want|need|would\s+like|wish|looking)\b|\b(?:book|booking|request|arrange|arranged|proceed\s+with|register|registration|join|apply|raise|submit|make)\b/i;

export function identifyServiceIntent(query: string): ServiceIntent | null {
  const hasActionLanguage = SERVICE_ACTION_PATTERN.test(query);

  if (/\b(?:track|tracking|check\s+(?:my\s+)?(?:request\s+)?status)\b/i.test(query) && /\b(?:request|reference|id|status|application|booking|registration)\b/i.test(query)) {
    return { guidance: 'Use the existing Tracking portal with your Reference ID and registered verification details to view the customer-safe status of your request.', actionLabel: 'Track Request', actionHref: '/tracking' };
  }
  if (/\b(?:raise|submit|send|make)\b.*\b(?:inquiry|enquiry)\b|\b(?:inquiry|enquiry)\b.*\b(?:help|form|support)\b/i.test(query)) {
    return { guidance: 'Use the existing Inquiry form to send your service or guidance request to the authorised team.', actionLabel: 'Raise Inquiry', actionHref: '/contact?topic=inquiry' };
  }
  if (/\bcomplaint\b/i.test(query) && hasActionLanguage) return { guidance: 'Use the existing Complaint channel to submit a service-quality concern for authorised review.', actionLabel: 'Raise Complaint', actionHref: '/complaint' };
  if (/\bgrievance\b/i.test(query) && hasActionLanguage) return { guidance: 'Use the existing Grievance channel to submit the matter for authorised review.', actionLabel: 'Submit Grievance', actionHref: '/grievance' };
  if (/\bfounder\s+support\b/i.test(query) && hasActionLanguage) return { guidance: 'Use the existing Founder Support channel for matters requiring authorised founder-level review.', actionLabel: 'Founder Support', actionHref: '/founder-support' };

  if (/\b(?:religious\s+partners?|purohit|pandit|priest)\b/i.test(query) && /\b(?:register|registration|join|apply)\b/i.test(query)) {
    return { guidance: 'To register as a Verified Priest, please proceed through the existing Priest Registration application.', actionLabel: 'Priest Registration', actionHref: '/religious-partners/register', informationHref: '/religious-partners' };
  }
  if (/\b(?:price|pricing|cost|quote|charges?)\b/i.test(query) && (hasActionLanguage || /\b(?:pind|ritual|puja|travel|vahi|service|booking)\b/i.test(query))) {
    return { guidance: 'For approved service scope and pricing guidance, please proceed through Book Now or raise an inquiry. The authorised team will confirm the applicable service options without requiring immediate payment.', actionLabel: 'Book Now', actionHref: '/services' };
  }
  if (/\b(?:book|booking)\b/i.test(query) && hasActionLanguage) {
    return { guidance: 'To begin a service request, please proceed through Book Now and select the relevant service/request option.', actionLabel: 'Book Now', actionHref: '/services' };
  }
  if (!hasActionLanguage) return null;

  if (/\b(?:vahi|bahi|panji)(?:\s+(?:records?|service))?\b/i.test(query)) {
    return {
      guidance: 'Yes. To request the Vahi Records service, please proceed through Book Now and select the relevant Vahi Records service/request option. I can guide you through the next steps if you need assistance.',
      actionLabel: 'Book Now',
      actionHref: '/services',
      informationHref: '/vahi-records',
    };
  }
  if (/\b(?:pitru\s*moksha|pind\s+daan|ancestral\s+rites?)(?:\s+service)?\b/i.test(query)) {
    return { guidance: 'To request a PitruMoksha Gaya service, please proceed through Book Now and select the relevant service/request option.', actionLabel: 'Book Now', actionHref: '/services', informationHref: '/pitru-moksha-gaya' };
  }
  if (/\b(?:ritual|puja|pooja|havan)(?:\s+service)?\b/i.test(query)) {
    return { guidance: 'To request a ritual service, please proceed through Book Now and select the relevant ritual service/request option.', actionLabel: 'Book Now', actionHref: '/services', informationHref: '/ritual-services' };
  }
  if (/\b(?:travel|pilgrimage)(?:\s+assistance|\s+service)?\b/i.test(query)) {
    return { guidance: 'To request travel assistance, please proceed through Book Now and select the relevant travel assistance/request option.', actionLabel: 'Book Now', actionHref: '/services', informationHref: '/travel-assistance' };
  }
  if (/\b(?:book|booking|request)\b.*\bservice\b|\bservice\b.*\b(?:book|booking|request)\b/i.test(query)) {
    return { guidance: 'To request a service, please proceed through Book Now and select the relevant service/request option.', actionLabel: 'Book Now', actionHref: '/services' };
  }
  return null;
}

export type FixedTabKey =
  | 'services'
  | 'rituals'
  | 'booking'
  | 'tracking'
  | 'inquiry'
  | 'documents'
  | 'complaints'
  | 'founder-support'
  | 'knowledge-guides';

export const FIXED_AI_CATEGORY_TABS: readonly { key: FixedTabKey; label: string }[] = Object.freeze([
  { key: 'services', label: 'Services' },
  { key: 'rituals', label: 'Rituals' },
  { key: 'booking', label: 'Booking' },
  { key: 'tracking', label: 'Tracking' },
  { key: 'inquiry', label: 'Inquiry' },
  { key: 'documents', label: 'Documents' },
  { key: 'complaints', label: 'Complaints' },
  { key: 'founder-support', label: 'Founder Support' },
  { key: 'knowledge-guides', label: 'Knowledge & Guides' },
]);

const GUIDED_TOPIC_GROUPS: readonly { group: string; topics: readonly { label: string; icon: React.ReactNode; category: BusinessCategory | null; href?: string }[] }[] = [
  { group: 'Featured', topics: [{ label: 'Featured', icon: '✦', category: null }] },
  { group: 'Services & Family', topics: [
    { label: 'Ancestral Rites', icon: <DiyaIcon />, category: 'pitru-moksha-gaya' },
    { label: 'Ritual Help', icon: <MandalaIcon />, category: 'ritual-services' },
    { label: 'Family Guidance', icon: '👪', category: 'inquiry' },
    { label: 'Travel Guidance', icon: <CompassIcon />, category: 'travel-assistance' },
    { label: 'Lineage Help', icon: <ScrollQuillIcon />, category: 'vahi-records' },
    { label: 'Booking Guidance', icon: '📅', category: 'booking' },
  ] },
  { group: 'Knowledge', topics: [{ label: 'Learning Centre', icon: <BookIcon />, category: 'company-info' }] },
  { group: 'Track Request', topics: [
    { label: 'Track Reference ID', icon: '⌕', category: 'tracking', href: '/tracking' },
    { label: 'Service Request', icon: '📅', category: 'tracking', href: '/tracking?type=service' },
    { label: 'Priest Registration', icon: <PartnerUserPlusIcon />, category: 'religious-partners', href: '/religious-partners/register' },
  ] },
];

const TRUST_STATEMENTS = [
  { label: 'Trusted & Private', icon: <ShieldIcon />, tone: 'border-amber-300 bg-amber-50 text-amber-900' },
  { label: 'Complete Privacy', icon: '🔒', tone: 'border-amber-200 bg-amber-50 text-amber-800' },
  { label: 'Secure & Safe', icon: '✓', tone: 'border-cyan-300 bg-cyan-50 text-cyan-700 shadow-[0_0_12px_rgba(34,211,238,0.45)] [text-shadow:0_0_8px_rgba(34,211,238,0.8)]' },
  { label: 'Confidential First', icon: <ShieldIcon />, tone: 'border-teal-200 bg-teal-50 text-teal-800' },
];

const GlobalAccessIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" fill="#2B72B8" stroke="#F4B942" strokeWidth="1.3" />
    <path d="M3.5 12h17M12 3.5c2.8 2.5 4.2 5.3 4.2 8.5S14.8 18 12 20.5C9.2 18 7.8 15.2 7.8 12S9.2 6 12 3.5Z" fill="none" stroke="#DDF9FF" strokeWidth="1.1" />
    <circle cx="19.5" cy="6" r="2" fill="#FF7043" stroke="#FFF4C7" strokeWidth="0.8" />
  </svg>
);

const SERVICE_ASSURANCE_STATEMENTS = [
  { label: 'Background Screened', icon: <PartnerUserPlusIcon />, tone: 'border-amber-300 bg-amber-50 text-amber-900' },
  { label: 'Global Access', icon: <GlobalAccessIcon />, tone: 'border-cyan-200 bg-cyan-50 text-cyan-800' },
  { label: 'Hassle-Free Guidance', icon: <QuestionCircleIcon />, tone: 'border-teal-200 bg-teal-50 text-teal-800' },
  { label: '100% Transparent', icon: '◉', tone: 'border-orange-200 bg-orange-50 text-orange-800' },
];

export function GenZRitualAIEngine({ category: initialCategory, compact = false }: GenZRitualAIEngineProps) {
  useEffect(() => {
    syncKnowledgeFromBackend().catch(() => {
      // Backend sync unavailable; smoothly fallback to internal knowledge tree
    });
  }, []);

  const [selectedTopic, setSelectedTopic] = useState('Featured');
  const [selectedCategory, setSelectedCategory] = useState<BusinessCategory | null>(null);
  const activeCategory = selectedCategory ?? initialCategory;
  const tree = APPROVED_AI_KNOWLEDGE_TREES[activeCategory] || APPROVED_AI_KNOWLEDGE_TREES['pitru-moksha-gaya'];
  const retrievalPromptsList = tree.initialPrompts || [];
  const promptsList = APPROVED_QUESTION_BROWSER_DATASET;
  const totalQuestions = promptsList.length;

  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [approvedQuestionWindowStart, setApprovedQuestionWindowStart] = useState(0);
  const [isFirstUse, setIsFirstUse] = useState<boolean>(true);
  const [activeResponse, setActiveResponse] = useState<string>(tree.greeting);

  const [selectedService, setSelectedService] = useState<string>(() => getAISessionMemory().interestedService || '');
  const [showLeadForm, setShowLeadForm] = useState<boolean>(false);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [questionNumberInput, setQuestionNumberInput] = useState('');
  const [questionNumberError, setQuestionNumberError] = useState(false);
  const [urmsQueryResult, setUrmsQueryResult] = useState<URMSUniversalRecord | null>(null);
  const [isSearchingURMS, setIsSearchingURMS] = useState<boolean>(false);
  const [pendingReferenceId, setPendingReferenceId] = useState<string | null>(null);
  const [verificationContact, setVerificationContact] = useState('');

  // Session Memory & Lead State
  const [leadName, setLeadName] = useState(() => getAISessionMemory().customerName || '');
  const [leadCountry] = useState(() => getAISessionMemory().country || 'India');
  const [leadWhatsApp, setLeadWhatsApp] = useState('');
  const [leadPreferredDate, setLeadPreferredDate] = useState('');
  const [leadGotra, setLeadGotra] = useState('');
  const [leadAncestorDetails, setLeadAncestorDetails] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [displayQuestion, setDisplayQuestion] = useState<string>('');
  const [responseStatus, setResponseStatus] = useState<AIResponseStatus>('neutral');
  const [responseMessage, setResponseMessage] = useState(NEUTRAL_RESPONSE_MESSAGE);
  const [serviceInformationHref, setServiceInformationHref] = useState<string | null>(null);
  const [serviceActionLabel, setServiceActionLabel] = useState('Book Now');
  const [serviceActionHref, setServiceActionHref] = useState('/services');
  const [isCompactLoading, setIsCompactLoading] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<GenZDrawerId>(null);

  const currentPrompt = promptsList[activeQuestionIndex] || null;
  const approvedQuestionGroupSize = 5;
  const finalApprovedQuestionWindowStart = Math.max(0, totalQuestions - approvedQuestionGroupSize);
  const visibleApprovedQuestions = promptsList.slice(approvedQuestionWindowStart, approvedQuestionWindowStart + approvedQuestionGroupSize);

  const [isFallbackState, setIsFallbackState] = useState<boolean>(false);

  const handleSelectQuestionIndex = (index: number) => {
    if (index < 0 || index >= totalQuestions) return;
    if (index < approvedQuestionWindowStart || index >= approvedQuestionWindowStart + approvedQuestionGroupSize) {
      setApprovedQuestionWindowStart(Math.min(Math.floor(index / approvedQuestionGroupSize) * approvedQuestionGroupSize, finalApprovedQuestionWindowStart));
    }
    setActiveQuestionIndex(index);
    setIsFirstUse(false);
    setIsFallbackState(false);
    const prompt = promptsList[index];
    if (prompt) {
      setDisplayQuestion(prompt.label);
      setActiveResponse(prompt.response);
      setResponseStatus('approved');
      setResponseMessage(prompt.response);
      setUrmsQueryResult(null);
      setPendingReferenceId(null);
      setSubmittedInquiryId(null);
      setSubmissionError(null);
      setServiceInformationHref(null);
      setShowLeadForm(Boolean(prompt.requiresLeadCollection));
      if (prompt.suggestedService) {
        setSelectedService(prompt.suggestedService);
        updateAISessionMemory({ interestedService: prompt.suggestedService });
      }
    }
  };

  const handleTopicSelect = (label: string, category: BusinessCategory | null) => {
    const nextTree = APPROVED_AI_KNOWLEDGE_TREES[category ?? initialCategory] || APPROVED_AI_KNOWLEDGE_TREES['pitru-moksha-gaya'];
    setSelectedTopic(label);
    setSelectedCategory(category);
    setActiveQuestionIndex(0);
    setApprovedQuestionWindowStart(0);
    setIsFirstUse(true);
    setDisplayQuestion('');
    setActiveResponse(nextTree.greeting);
    setResponseStatus('neutral');
    setResponseMessage(NEUTRAL_RESPONSE_MESSAGE);
    setUrmsQueryResult(null);
    setPendingReferenceId(null);
    setSubmittedInquiryId(null);
    setSubmissionError(null);
    setServiceInformationHref(null);
    setShowLeadForm(false);
  };

  const handleNextQuestion = () => {
    if (approvedQuestionWindowStart < finalApprovedQuestionWindowStart) {
      const nextGroupStart = Math.min(approvedQuestionWindowStart + approvedQuestionGroupSize, finalApprovedQuestionWindowStart);
      setApprovedQuestionWindowStart(nextGroupStart);
      handleSelectQuestionIndex(nextGroupStart);
    }
  };

  const handlePrevQuestion = () => {
    if (approvedQuestionWindowStart > 0) {
      const previousGroupStart = approvedQuestionWindowStart === finalApprovedQuestionWindowStart && approvedQuestionWindowStart % approvedQuestionGroupSize !== 0
        ? Math.floor(approvedQuestionWindowStart / approvedQuestionGroupSize) * approvedQuestionGroupSize
        : Math.max(0, approvedQuestionWindowStart - approvedQuestionGroupSize);
      setApprovedQuestionWindowStart(previousGroupStart);
      handleSelectQuestionIndex(previousGroupStart);
    }
  };

  const handleTextSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const query = inputQuery.trim();
    if (!query) return;
    if (query.split(/\s+/).filter(Boolean).length > 30) {
      setSubmissionError('Please keep your question within 30 words.');
      return;
    }
    setDisplayQuestion(query);

    setUrmsQueryResult(null);
    setIsFirstUse(false);
    setIsFallbackState(false);
    setPendingReferenceId(null);
    setSubmittedInquiryId(null);
    setSubmissionError(null);
    setShowLeadForm(false);
    setServiceInformationHref(null);

    if (MISUSE_PATTERNS.some((pattern) => pattern.test(query))) {
      setResponseStatus('warning');
      setResponseMessage(MISUSE_RESPONSE_MESSAGE);
      setActiveResponse(MISUSE_RESPONSE_MESSAGE);
      setShowLeadForm(false);
      setSubmittedInquiryId(null);
      setPendingReferenceId(null);
      setSubmissionError(null);
      setInputQuery('');
      return;
    }

    if (OUT_OF_PURPOSE_PATTERNS.some((pattern) => pattern.test(query))) {
      setResponseStatus('unsupported');
      setResponseMessage(OUT_OF_PURPOSE_RESPONSE_MESSAGE);
      setActiveResponse(OUT_OF_PURPOSE_RESPONSE_MESSAGE);
      setShowLeadForm(false);
      setSubmittedInquiryId(null);
      setPendingReferenceId(null);
      setSubmissionError(null);
      setInputQuery('');
      return;
    }

    const exactBrowserQuestion = findExactApprovedQuestion(query, promptsList);
    if (exactBrowserQuestion) {
      const exactIndex = promptsList.findIndex((prompt) => prompt.id === exactBrowserQuestion.id);
      if (exactIndex !== -1) handleSelectQuestionIndex(exactIndex);
      setInputQuery('');
      return;
    }

    const exactApprovedQuestion = findExactApprovedQuestion(query, retrievalPromptsList);
    if (exactApprovedQuestion) {
      const exactIndex = promptsList.findIndex((prompt) => prompt.sourceId === exactApprovedQuestion.id);
      if (exactIndex !== -1) handleSelectQuestionIndex(exactIndex);
      setInputQuery('');
      return;
    }

    if (query.split(/\s+/).filter(Boolean).length === 1) {
      const clarificationMessage = 'Please add a little more detail so I can identify whether you need approved information, a service action, tracking, or authorised support.';
      setActiveResponse(clarificationMessage);
      setResponseStatus('clarification');
      setResponseMessage(clarificationMessage);
      setServiceInformationHref(null);
      setInputQuery('');
      return;
    }

    const serviceIntent = identifyServiceIntent(query);
    if (serviceIntent) {
      setActiveResponse(serviceIntent.guidance);
      setResponseStatus('service-intent');
      setResponseMessage(serviceIntent.guidance);
      setServiceInformationHref(serviceIntent.informationHref ?? null);
      setServiceActionLabel(serviceIntent.actionLabel);
      setServiceActionHref(serviceIntent.actionHref);
      setInputQuery('');
      return;
    }

    const publicKnowledge = findApprovedPublicKnowledge(query);
    if (publicKnowledge) {
      setActiveResponse(publicKnowledge.approvedContent);
      setResponseStatus('approved');
      setResponseMessage(publicKnowledge.approvedContent);
      setInputQuery('');
      return;
    }

    // 1. Search current Hero knowledge prompts first
    const localMatch = rankApprovedQuestions(query, retrievalPromptsList);
    if (localMatch) {
      const matchedIdx = promptsList.findIndex((prompt) => prompt.sourceId === localMatch.id);
      if (matchedIdx !== -1) {
        handleSelectQuestionIndex(matchedIdx);
      } else {
        setActiveResponse(localMatch.response);
      }
      setInputQuery('');
      return;
    }

    // 2. Semantic Knowledge Center Search
    const searchRes = searchKnowledgeCenter(query);

    if (searchRes.suggestedAnswer) {
      setActiveResponse(searchRes.suggestedAnswer);
      setResponseStatus('approved');
      setResponseMessage(searchRes.suggestedAnswer);
      setInputQuery('');
      return;
    }

    // 3. Founder-approved retrieval-only knowledge. Existing 41, actions,
    // safety and approved public/Knowledge Center grounding remain authoritative.
    const understoodQuestion = understandPublicQuestion(query);
    const founderPointMatches = understoodQuestion.points.map((point) => findFounderKnowledge(point, activeCategory));
    if (founderPointMatches.length > 1 && founderPointMatches.every(Boolean)) {
      const uniqueMatches = [...new Map(founderPointMatches.map((match) => [match!.record.excelId, match!])).values()];
      const framedAnswer = uniqueMatches.map((match) => match.record.answer).join('\n\n');
      setActiveResponse(framedAnswer);
      setResponseStatus('approved');
      setResponseMessage(framedAnswer);
      setInputQuery('');
      return;
    }
    const founderMatch = findFounderKnowledge(query, activeCategory);
    if (founderMatch) {
      const matchedIndex = promptsList.findIndex((prompt) => prompt.sourceId === founderMatch.record.excelId);
      if (matchedIndex !== -1) handleSelectQuestionIndex(matchedIndex);
      else {
        setActiveResponse(founderMatch.record.answer);
        setResponseStatus('approved');
        setResponseMessage(founderMatch.record.answer);
      }
      setInputQuery('');
      return;
    }

    // 4. Fallback when no approved answer exists (do not fabricate answer)
    setIsFallbackState(true);
    setActiveResponse('I couldn’t find an approved answer for this question. Please send this question to our authorised team for review.');
    setResponseStatus('pending-review');
    setResponseMessage('I couldn’t find an approved answer for this question. Please submit it for authorised human review. No escalation has been created yet.');
    setSubmittedInquiryId(null);
    setShowLeadForm(true);
    setSubmissionError(null);
    setInputQuery('');
  };

  const handleQuestionNumberSubmit = (event: FormEvent) => {
    event.preventDefault();
    const match = questionNumberInput.trim().match(/^q?(\d+)$/i);
    const questionNumber = match ? Number(match[1]) : 0;
    if (!Number.isInteger(questionNumber) || questionNumber < 1 || questionNumber > totalQuestions) {
      setQuestionNumberError(true);
      return;
    }

    setQuestionNumberError(false);
    handleSelectQuestionIndex(questionNumber - 1);
  };

  const handleReferenceVerification = async (e: FormEvent) => {
    e.preventDefault();
    if (!pendingReferenceId || !verificationContact.trim()) return;
    setIsSearchingURMS(true);
    try {
      const record = await getUniversalRequestByReferenceId(pendingReferenceId, 'GUEST', verificationContact.trim());
      if (record) {
        setUrmsQueryResult(record);
        setActiveResponse(`Reference ${record.referenceId} is verified. Current status: ${record.currentStatus.replaceAll('_', ' ')}. Current stage: ${record.currentStage}.`);
        setResponseStatus('tracking');
        setResponseMessage(`Reference ${record.referenceId} is verified. Current status: ${record.currentStatus.replaceAll('_', ' ')}. Current stage: ${record.currentStage}.`);
        setPendingReferenceId(null);
        setVerificationContact('');
      } else {
        setUrmsQueryResult(null);
        setActiveResponse('The reference could not be verified with those registered details. Check the ID and registered email or mobile number.');
        setResponseStatus('failure');
        setResponseMessage('The reference could not be verified with those registered details. Check the ID and registered email or mobile number.');
      }
    } catch {
      setActiveResponse('Unable to query tracking right now. Please use the Tracking Portal.');
      setResponseStatus('failure');
      setResponseMessage('Unable to query tracking right now. Please use the Tracking Portal.');
    } finally {
      setIsSearchingURMS(false);
    }
  };

  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);
    setSubmissionError(null);
    updateAISessionMemory({
      customerName: leadName,
      country: leadCountry,
      interestedService: selectedService,
    });

    try {
      const supportedCategories: readonly BusinessModuleCategory[] = ['pitru-moksha-gaya', 'ritual-services', 'travel-assistance', 'vahi-records', 'religious-partners'];
      if (!supportedCategories.includes(initialCategory as BusinessModuleCategory)) throw new Error('This context does not support public escalation.');
      const inquiry: BaseInquiryInput = {
        fullName: leadName,
        phone: leadWhatsApp,
        email: '',
        contactPreference: 'WHATSAPP',
        city: '',
        state: '',
        country: leadCountry,
        isNRI: false,
        notes: [leadPreferredDate && `Preferred date: ${leadPreferredDate}`, leadGotra && `Gotra: ${leadGotra}`, leadAncestorDetails].filter(Boolean).join('\n'),
      };
      const result = await submitUnifiedInquiry(initialCategory as BusinessModuleCategory, inquiry);
      if (!result.success || !result.inquiryId) throw new Error(result.message || 'The server did not issue a reference ID.');
      setSubmittedInquiryId(result.inquiryId);
      if (isFallbackState) {
        setActiveResponse('No approved answer is currently available for your question.\n\nYour matter has been routed to our Founder/authorised team for verified review.');
        setResponseStatus('escalated');
        setResponseMessage('No approved answer is currently available for your question.\n\nYour matter has been routed to our Founder/authorised team for verified review.');
      }
      setShowLeadForm(false);
    } catch {
      const failureMessage = 'Your question could not be recorded right now. Please use Founder Support or Contact Support; no reference ID has been issued.';
      setSubmissionError(failureMessage);
      setResponseStatus('failure');
      setResponseMessage(failureMessage);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  // Related questions (3 to 5 approved related questions)
  const relatedPrompts = promptsList
    .map((p, idx) => ({ ...p, originalIndex: idx }))
    .filter((_, idx) => idx < approvedQuestionWindowStart || idx >= approvedQuestionWindowStart + approvedQuestionGroupSize)
    .filter((prompt) => responseStatus === 'approved' && isReliablyRelatedQuestion(displayQuestion || currentPrompt?.label || '', prompt.label))
    .slice(0, 4);

  const isAIResponse = responseStatus === 'service-intent' || responseStatus === 'clarification' || responseStatus === 'pending-review' || responseStatus === 'escalated' || (responseStatus === 'failure' && isFallbackState);
  const isWarningResponse = responseStatus === 'warning' || responseStatus === 'unsupported';

  const handleCompactSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!inputQuery.trim()) return;
    setIsCompactLoading(true);
    try {
      await syncKnowledgeFromBackend();
      await handleTextSubmit(event);
    } finally {
      setIsCompactLoading(false);
    }
  };

  const resetCompactQuestion = () => {
    setInputQuery('');
    setDisplayQuestion('');
    setActiveResponse(tree.greeting);
    setResponseStatus('neutral');
    setResponseMessage(NEUTRAL_RESPONSE_MESSAGE);
    setIsFallbackState(false);
    setShowLeadForm(false);
    setSubmittedInquiryId(null);
    setSubmissionError(null);
    setServiceInformationHref(null);
  };

  const density = compact ? 'floating' : 'page';
  const hasExchange = Boolean(displayQuestion) || responseStatus !== 'neutral';
  const starterQuestions = promptsList.slice(0, 5);
  const answerText = priestTerminology(responseStatus === 'approved' ? activeResponse : responseMessage);
  const statusMeta =
    responseStatus === 'pending-review'
      ? 'Authorised review needed'
      : responseStatus === 'escalated'
        ? 'Escalation submitted'
        : responseStatus === 'failure'
          ? 'Request failed'
          : responseStatus === 'service-intent'
            ? 'Service guidance'
            : responseStatus === 'clarification'
              ? 'Clarification needed'
              : responseStatus === 'warning' || responseStatus === 'unsupported'
                ? 'Status / warning'
                : responseStatus === 'approved'
                  ? 'GenZ response'
                  : responseStatus === 'tracking'
                    ? 'Tracking update'
                    : null;

  const bubbleTone =
    responseStatus === 'warning' || responseStatus === 'unsupported' || (responseStatus === 'failure' && !isFallbackState)
      ? chatStyles.bubbleBotWarning
      : responseStatus === 'pending-review'
        ? chatStyles.bubbleBotPending
        : responseStatus === 'approved' || responseStatus === 'escalated' || responseStatus === 'service-intent' || responseStatus === 'tracking'
          ? chatStyles.bubbleBotOk
          : '';

  const onAskSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!inputQuery.trim()) return;
    setIsCompactLoading(true);
    try {
      if (compact) {
        await syncKnowledgeFromBackend().catch(() => undefined);
      }
      await handleTextSubmit(event);
    } finally {
      setIsCompactLoading(false);
    }
  };

  const thread = (
    <div className={chatStyles.messageList}>
      {!hasExchange ? (
        <>
          <div className={chatStyles.welcome}>
            <strong>How can I help?</strong>
            <p>{tree.greeting}</p>
          </div>
          {starterQuestions.length > 0 ? (
            <div className={chatStyles.chips} aria-label="Suggested questions">
              {starterQuestions.map((prompt, index) => (
                <button
                  key={prompt.id}
                  type="button"
                  className={chatStyles.chip}
                  onClick={() => handleSelectQuestionIndex(index)}
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          ) : null}
        </>
      ) : null}

      {isCompactLoading ? (
        <div className={chatStyles.loading} role="status">
          <span className={chatStyles.spinner} aria-hidden="true" />
          <strong>Searching approved guidance…</strong>
        </div>
      ) : null}

      {displayQuestion ? (
        <div className={`${chatStyles.bubbleRow} ${chatStyles.bubbleRowUser}`}>
          <div className={`${chatStyles.bubble} ${chatStyles.bubbleUser}`}>{displayQuestion}</div>
        </div>
      ) : null}

      {hasExchange && !isCompactLoading && statusMeta ? (
        <div className={`${chatStyles.bubbleRow} ${chatStyles.bubbleRowBot}`}>
          <div className={`${chatStyles.bubble} ${chatStyles.bubbleBot} ${bubbleTone}`}>
            <span className={chatStyles.bubbleMeta}>{statusMeta}</span>
            {(responseStatus === 'approved' ||
              responseStatus === 'service-intent' ||
              responseStatus === 'clarification' ||
              responseStatus === 'pending-review' ||
              responseStatus === 'escalated' ||
              responseStatus === 'failure' ||
              responseStatus === 'warning' ||
              responseStatus === 'unsupported' ||
              responseStatus === 'tracking') && (
              <p style={{ margin: 0 }}>{answerText}</p>
            )}

            {responseStatus === 'service-intent' ? (
              <div className={chatStyles.actions}>
                <Link href={serviceActionHref} className={chatStyles.primaryAction}>
                  {serviceActionLabel}
                </Link>
                {serviceInformationHref ? (
                  <Link href={serviceInformationHref} className={chatStyles.secondaryAction}>
                    View service information
                  </Link>
                ) : null}
              </div>
            ) : null}

            {showLeadForm && !submittedInquiryId ? (
              <form className={chatStyles.leadForm} onSubmit={handleLeadSubmit}>
                <strong>Send to the authorised team</strong>
                <input
                  required
                  aria-label="Full name"
                  placeholder="Full name"
                  value={leadName}
                  onChange={(event) => setLeadName(event.target.value)}
                />
                <input
                  required
                  aria-label="WhatsApp or phone"
                  placeholder="WhatsApp / phone"
                  value={leadWhatsApp}
                  onChange={(event) => setLeadWhatsApp(event.target.value)}
                />
                {!compact ? (
                  <>
                    <input
                      placeholder="Preferred date"
                      type="date"
                      value={leadPreferredDate}
                      onChange={(event) => setLeadPreferredDate(event.target.value)}
                    />
                    <input
                      placeholder="Gotra (if known)"
                      value={leadGotra}
                      onChange={(event) => setLeadGotra(event.target.value)}
                    />
                    <input
                      placeholder="Ancestor details / notes"
                      value={leadAncestorDetails}
                      onChange={(event) => setLeadAncestorDetails(event.target.value)}
                    />
                  </>
                ) : null}
                {submissionError ? (
                  <p role="alert" className={chatStyles.alert}>
                    {submissionError}
                  </p>
                ) : null}
                <button type="submit" className={chatStyles.primaryAction} disabled={isSubmittingLead}>
                  {isSubmittingLead ? 'Submitting…' : 'Submit for review'}
                </button>
              </form>
            ) : null}

            {responseStatus === 'escalated' && submittedInquiryId ? (
              <p style={{ margin: '0.55rem 0 0', fontSize: '0.75rem' }}>
                Reference: <strong>{submittedInquiryId}</strong> ·{' '}
                <Link className={chatStyles.textAction} href={`/tracking?ref=${submittedInquiryId}`}>
                  Track status
                </Link>
              </p>
            ) : null}

            {pendingReferenceId ? (
              <form className={chatStyles.leadForm} onSubmit={handleReferenceVerification}>
                <strong>Verify registered email or mobile</strong>
                <input
                  required
                  aria-label="Registered email or mobile"
                  value={verificationContact}
                  onChange={(event) => setVerificationContact(event.target.value)}
                />
                <button type="submit" className={chatStyles.primaryAction} disabled={isSearchingURMS}>
                  {isSearchingURMS ? 'Verifying…' : 'Verify & track'}
                </button>
              </form>
            ) : null}

            {urmsQueryResult ? (
              <div className={chatStyles.actions}>
                <Link href={`/tracking?ref=${urmsQueryResult.referenceId}`} className={chatStyles.secondaryAction}>
                  Open tracking portal
                </Link>
              </div>
            ) : null}

            <div className={chatStyles.actions}>
              <button type="button" className={chatStyles.textAction} onClick={resetCompactQuestion}>
                Ask another question
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {hasExchange && relatedPrompts.length > 0 && responseStatus === 'approved' ? (
        <div className={chatStyles.chips} aria-label="Related approved questions">
          {relatedPrompts.map((prompt) => (
            <button
              key={prompt.id}
              type="button"
              className={chatStyles.chip}
              onClick={() => handleSelectQuestionIndex(prompt.originalIndex)}
            >
              {prompt.label}
            </button>
          ))}
        </div>
      ) : null}

      {submissionError && !hasExchange ? (
        <p role="alert" className={chatStyles.alert}>
          {submissionError}
        </p>
      ) : null}
    </div>
  );

  const approvedPanel = (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <form className={chatStyles.leadForm} onSubmit={handleQuestionNumberSubmit} style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
        <strong>
          {totalQuestions > 0 ? `${activeQuestionIndex + 1} of ${totalQuestions}` : '0 of 0'} approved questions
        </strong>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <input
            aria-label="Approved question number"
            placeholder="Enter Q No."
            value={questionNumberInput}
            onChange={(event) => {
              setQuestionNumberInput(event.target.value);
              setQuestionNumberError(false);
            }}
          />
          <button type="submit" className={chatStyles.primaryAction}>
            Go
          </button>
        </div>
        {questionNumberError ? (
          <p role="status" className={chatStyles.alert}>
            Question not found
          </p>
        ) : null}
        <div className={chatStyles.actions}>
          <button type="button" className={chatStyles.secondaryAction} onClick={handlePrevQuestion} disabled={approvedQuestionWindowStart === 0 || totalQuestions === 0}>
            Prev
          </button>
          <button
            type="button"
            className={chatStyles.secondaryAction}
            onClick={handleNextQuestion}
            disabled={approvedQuestionWindowStart >= finalApprovedQuestionWindowStart || totalQuestions === 0}
          >
            Next
          </button>
        </div>
      </form>
      <div style={{ display: 'grid', gap: '0.4rem' }}>
        {visibleApprovedQuestions.map((prompt, visibleIndex) => {
          const index = approvedQuestionWindowStart + visibleIndex;
          return (
            <button
              key={prompt.id}
              type="button"
              className={chatStyles.chip}
              style={{ borderRadius: '10px', textAlign: 'left', width: '100%' }}
              onClick={() => {
                handleSelectQuestionIndex(index);
                setActiveDrawer(null);
              }}
            >
              {prompt.label}
            </button>
          );
        })}
      </div>
      <div style={{ display: 'grid', gap: '0.55rem' }}>
        {GUIDED_TOPIC_GROUPS.map((group) => (
          <div key={group.group}>
            <strong style={{ display: 'block', fontSize: '0.68rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#4a6578', marginBottom: '0.35rem' }}>
              {group.group}
            </strong>
            <div className={chatStyles.chips}>
              {group.topics.map((topic) =>
                topic.href ? (
                  <Link key={topic.label} href={topic.href} className={chatStyles.chip} style={{ textDecoration: 'none' }}>
                    {topic.label}
                  </Link>
                ) : (
                  <button
                    key={topic.label}
                    type="button"
                    className={chatStyles.chip}
                    onClick={() => {
                      handleTopicSelect(topic.label, topic.category);
                      setActiveDrawer(null);
                    }}
                  >
                    {topic.label}
                  </button>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
      <Link href="/knowledge-center" className={chatStyles.textAction}>
        Explore Knowledge Center
      </Link>
    </div>
  );

  const trustPanel = (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '0.45rem' }}>
      {[...TRUST_STATEMENTS, ...SERVICE_ASSURANCE_STATEMENTS].map((statement) => (
        <li
          key={statement.label}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.55rem',
            border: '1px solid rgba(8,127,140,0.15)',
            borderRadius: '12px',
            padding: '0.45rem 0.6rem',
            background: '#fff',
            fontSize: '0.78rem',
            fontWeight: 650,
          }}
        >
          <span aria-hidden="true" style={{ fontSize: '1rem' }}>
            {statement.icon}
          </span>
          {statement.label}
        </li>
      ))}
      <li style={{ fontSize: '0.78rem', color: '#4a6578' }}>Always here to help you.</li>
    </ul>
  );

  const helpPanel = (
    <div className={chatStyles.chips}>
      {(
        [
          ['Raise Inquiry', '/contact?topic=inquiry'],
          ['Book Now', '/services'],
          ['Track Request', '/tracking'],
          ['Complaint', '/complaint'],
          ['Grievance', '/grievance'],
          ['Founder Support', '/founder-support'],
        ] as const
      ).map(([label, href]) => (
        <Link key={href} href={href} className={chatStyles.chip} style={{ textDecoration: 'none' }}>
          {label}
        </Link>
      ))}
    </div>
  );

  const limitsPanel = (
    <p style={{ margin: 0, lineHeight: 1.5, color: '#4a6578' }}>
      GenZ AI answers from Founder-approved Q&amp;A, approved Knowledge Center information and authorised service information. It does not invent an answer when reliable approved guidance is unavailable. GenZ AI provides guidance only. It does not make final religious decisions or autonomous pricing, quotation, payment, booking approval, registration approval, complaint, grievance, cancellation, refund, or other sensitive decisions requiring authorised human judgment.
    </p>
  );

  return (
    <GenZChatShell
      density={density}
      activeDrawer={activeDrawer}
      onDrawerChange={setActiveDrawer}
      showSidePanel={!compact}
      thread={thread}
      composer={
        <GenZComposer
          value={inputQuery}
          onChange={setInputQuery}
          onSubmit={onAskSubmit}
          disabled={isCompactLoading}
        />
      }
      approvedPanel={approvedPanel}
      trustPanel={trustPanel}
      helpPanel={helpPanel}
      limitsPanel={limitsPanel}
    />
  );
}
