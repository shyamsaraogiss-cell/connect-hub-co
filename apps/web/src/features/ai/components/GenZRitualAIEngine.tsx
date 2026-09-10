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

  if (compact) {
    const compactAnswer = priestTerminology(responseStatus === 'approved' ? activeResponse : responseMessage);
    return (
      <div className="flex h-full w-full flex-col overflow-hidden bg-[#07162f] text-white" role="region" aria-label="Ask GenZ AI">
        <header
          className="relative shrink-0 border-b border-[#7f66ff]/70 bg-cover bg-center px-4 py-3"
          style={{ backgroundImage: "linear-gradient(90deg,rgba(4,13,35,.96),rgba(4,13,35,.76)),url('/images/ai-panel/genz-ritual-ai-background.png')" }}
        >
          <div className="flex items-center justify-between gap-3">
            <div><h2 id="hero-assistant-title" className="font-serif text-[18px] font-bold leading-5 text-white">Ask GenZ AI</h2><p className="mt-1 text-[11px] font-medium text-[#f6c64f]">Approved guidance · Human escalation</p></div>
            <span className="rounded-full border border-emerald-400/60 bg-emerald-950/70 px-2 py-1 text-[10px] font-bold text-emerald-200"><span aria-hidden="true">●</span> LIVE</span>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3" aria-live="polite">
          {isCompactLoading ? (
            <div className="flex h-full min-h-28 flex-col items-center justify-center gap-2 text-center" role="status">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#8c70ff] border-t-[#f6c64f]" aria-hidden="true" />
              <strong className="text-sm">Searching approved guidance…</strong>
            </div>
          ) : displayQuestion ? (
            <div className="space-y-2.5">
              <div className="rounded-lg border border-[#334d79] bg-[#102344] px-3 py-2"><span className="block text-[10px] font-bold uppercase tracking-wider text-[#9fb7df]">Your question</span><p className="mt-1 text-xs leading-[17px] text-white">{displayQuestion}</p></div>
              <div className={`rounded-lg border px-3 py-2.5 ${responseStatus === 'failure' ? 'border-red-400/70 bg-red-950/50' : responseStatus === 'pending-review' ? 'border-amber-400/70 bg-amber-950/40' : responseStatus === 'escalated' ? 'border-emerald-400/70 bg-emerald-950/40' : 'border-[#7559df] bg-[#171b45]'}`}>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#f6c64f]">{responseStatus === 'pending-review' ? 'Authorised review needed' : responseStatus === 'escalated' ? 'Escalation submitted' : responseStatus === 'failure' ? 'Request failed' : 'GenZ response'}</span>
                <p className="mt-1.5 whitespace-pre-wrap text-xs leading-[17px] text-[#f4f6ff]">{compactAnswer}</p>
                {responseStatus === 'service-intent' ? <Link href={serviceActionHref} className="mt-2 inline-flex rounded-md bg-[#7257e8] px-2.5 py-1.5 text-[11px] font-bold text-white">{serviceActionLabel}</Link> : null}
                {responseStatus === 'escalated' && submittedInquiryId ? <p className="mt-2 border-t border-emerald-400/30 pt-2 text-[11px] text-emerald-100">Reference: <strong>{submittedInquiryId}</strong> · <Link className="underline" href={`/tracking?ref=${submittedInquiryId}`}>Track status</Link></p> : null}
              </div>

              {showLeadForm && !submittedInquiryId ? (
                <form className="space-y-2 rounded-lg border border-amber-400/60 bg-[#141d36] p-2.5" onSubmit={handleLeadSubmit}>
                  <strong className="block text-[11px] text-amber-200">Send to the authorised team</strong>
                  <input required aria-label="Full name" placeholder="Full name" className="w-full rounded-md border border-[#50648a] bg-[#09172e] px-2.5 py-2 text-xs text-white outline-none focus:border-[#f6c64f]" value={leadName} onChange={(event) => setLeadName(event.target.value)} />
                  <input required aria-label="WhatsApp or phone" placeholder="WhatsApp / phone" className="w-full rounded-md border border-[#50648a] bg-[#09172e] px-2.5 py-2 text-xs text-white outline-none focus:border-[#f6c64f]" value={leadWhatsApp} onChange={(event) => setLeadWhatsApp(event.target.value)} />
                  {submissionError ? <p role="alert" className="text-[11px] leading-4 text-red-300">{submissionError}</p> : null}
                  <button disabled={isSubmittingLead} className="w-full rounded-md bg-[#7257e8] px-3 py-2 text-xs font-bold text-white disabled:opacity-60">{isSubmittingLead ? 'Submitting…' : 'Submit for review'}</button>
                </form>
              ) : null}
              <button type="button" onClick={resetCompactQuestion} className="text-[11px] font-bold text-[#cbbdff] underline underline-offset-2">Ask a new question</button>
            </div>
          ) : (
            <div className="flex h-full min-h-24 flex-col justify-center rounded-lg border border-[#263e68] bg-[#0b1c38]/80 px-3 py-3 text-center">
              <strong className="text-sm text-white">How can I help?</strong><p className="mt-1 text-[11px] leading-4 text-[#b9c8e5]">Ask about rituals, services, bookings, travel, Vahi records or tracking.</p>
              {submissionError ? <p role="alert" className="mt-2 text-[11px] font-medium text-red-300">{submissionError}</p> : null}
            </div>
          )}
        </div>

        <form className="flex shrink-0 gap-2 border-t border-[#344a73] bg-[#09172e] p-3" onSubmit={handleCompactSubmit} role="search">
          <input value={inputQuery} onChange={(event) => { const value = event.target.value; if (value.trim().split(/\s+/).filter(Boolean).length <= 30) setInputQuery(value); }} disabled={isCompactLoading} maxLength={240} aria-label="Ask GenZ AI a question" placeholder="Type your question…" className="min-w-0 flex-1 rounded-lg border-2 border-[#6f63c9] bg-white px-3 py-2 text-xs font-medium text-[#101b35] shadow-[0_0_0_2px_rgba(111,99,201,.15)] outline-none placeholder:text-slate-500 focus:border-[#f6c64f]" />
          <button type="submit" disabled={isCompactLoading || !inputQuery.trim()} aria-label="Submit question" className="grid w-10 shrink-0 place-items-center rounded-lg bg-[#7257e8] text-lg font-bold text-white shadow-[0_0_14px_rgba(114,87,232,.45)] disabled:opacity-50">→</button>
        </form>
      </div>
    );
  }

  return (
    <div className="genz-ai-engine flex h-full w-full flex-col overflow-hidden rounded-2xl border border-teal-200/80 bg-[#fffdfa] text-stone-900 shadow-[0_12px_30px_rgba(6,78,89,0.10)]" role="region" aria-label="Ask GenZ AI">
      <div className="grid min-w-0 items-start gap-5 p-4 sm:p-5 lg:grid-cols-[minmax(220px,3fr)_minmax(0,7fr)] lg:items-stretch lg:gap-6">
        <aside className="flex flex-col justify-between rounded-2xl border border-amber-300/80 bg-gradient-to-b from-[#fff9e9] via-white to-teal-50/60 px-5 py-3 shadow-[0_8px_22px_rgba(180,130,35,0.10)] lg:self-stretch" aria-label="Trust and privacy">
          <div className="border-b border-amber-200 pb-2"><h3 className="font-serif text-lg font-bold text-[#064E59]">Trust &amp; Privacy</h3><span className="mt-1 block h-0.5 w-12 rounded-full bg-[#D4AF37]" /></div>
          <ul className="mt-2.5 grid gap-[5px] sm:grid-cols-2 lg:grid-cols-1">
            {TRUST_STATEMENTS.map((statement) => (
              <li key={statement.label} className="flex h-9 items-center gap-3 rounded-xl border border-white/80 bg-white/80 px-3 text-sm font-semibold text-stone-700 shadow-sm">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-xl ${statement.tone}`} aria-hidden="true">{statement.icon}</span>
                {statement.label}
              </li>
            ))}
          </ul>
          <div className="mt-3 border-b border-amber-200 pb-2"><h3 className="font-serif text-lg font-bold text-[#064E59]">Service Assurance</h3><span className="mt-1 block h-0.5 w-12 rounded-full bg-[#D4AF37]" /></div>
          <ul className="mt-2.5 grid gap-[5px] sm:grid-cols-2 lg:grid-cols-1">
            {SERVICE_ASSURANCE_STATEMENTS.map((statement) => (
              <li key={statement.label} className="flex h-9 items-center gap-3 rounded-xl border border-white/80 bg-white/80 px-3 text-sm font-semibold text-stone-700 shadow-sm">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-xl ${statement.tone}`} aria-hidden="true">{statement.icon}</span>
                {statement.label}
              </li>
            ))}
          </ul>
          <p className="mt-2 border-t border-amber-200/70 pt-2 text-sm leading-6 text-stone-600">Always here to help you.</p>
        </aside>

        <section className="min-w-0 overflow-hidden rounded-2xl border border-teal-200/80 bg-white shadow-[0_8px_22px_rgba(6,78,89,0.08)]" aria-labelledby="guided-topics-title">
          <div className="border-b border-teal-100 bg-gradient-to-r from-teal-50/80 via-white to-amber-50/60 px-5 py-4">
            <h3 id="guided-topics-title" className="font-serif text-lg font-bold text-[#064E59]">Guided Assistance</h3>
            <span className="mt-1 block h-0.5 w-14 rounded-full bg-[#D4AF37]" />
            <div className="mt-4 grid gap-3">
              {GUIDED_TOPIC_GROUPS.map((group) => (
                <div key={group.group} className="flex flex-col gap-1.5 sm:flex-row sm:items-start">
                  <span className="w-36 shrink-0 pt-2 text-xs font-bold uppercase tracking-wider text-stone-500">{group.group}</span>
                  <div className="flex flex-wrap gap-2">
                    {group.topics.map((topic) => topic.href ? (
                      <Link key={topic.label} href={topic.href} className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-amber-200 bg-white px-3.5 py-2 text-sm font-semibold text-stone-700 shadow-sm transition hover:border-[#087F8C] hover:bg-teal-50 hover:text-[#064E59]"><span className="text-base leading-none" aria-hidden="true">{topic.icon}</span>{topic.label}</Link>
                    ) : (
                      <button key={topic.label} type="button" onClick={() => handleTopicSelect(topic.label, topic.category)} aria-pressed={selectedTopic === topic.label} className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-semibold shadow-sm transition ${selectedTopic === topic.label ? 'border-[#D4AF37] bg-[#064E59] text-white ring-2 ring-[#D4AF37]/25' : 'border-amber-200 bg-white text-stone-700 hover:border-[#087F8C] hover:bg-teal-50 hover:text-[#064E59]'}`}><span className="text-base leading-none" aria-hidden="true">{topic.icon}</span>{topic.label}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {pendingReferenceId && (
              <form className="mt-4 rounded-xl border border-teal-200 bg-teal-50 p-3 text-xs" onSubmit={handleReferenceVerification}>
                <label className="font-semibold text-teal-950">Registered Email or Mobile *<input className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white p-2 outline-none focus:border-[#087F8C]" value={verificationContact} onChange={(event) => setVerificationContact(event.target.value)} required /></label>
                <button className="mt-2 rounded-lg bg-[#064E59] px-3 py-2 font-bold text-white disabled:opacity-50" disabled={isSearchingURMS}>{isSearchingURMS ? 'Verifying…' : 'Verify & Track'}</button>
              </form>
            )}
            {urmsQueryResult && (
              <div className="mt-4 space-y-1 rounded-xl border border-amber-300 bg-white p-3 text-xs shadow-sm">
                <strong className="block font-serif font-bold text-orange-950">Universal Reference: {urmsQueryResult.referenceId}</strong>
                <p className="text-stone-700">Title: {urmsQueryResult.title}</p>
                <p className="text-stone-700">Status: <span className="font-bold text-emerald-800">{urmsQueryResult.currentStatus.replaceAll('_', ' ')}</span></p>
                <p className="text-stone-700">Stage: {priestTerminology(urmsQueryResult.currentStage)}</p>
                <Link href={`/tracking?ref=${urmsQueryResult.referenceId}`} className="mt-1 block text-xs font-bold text-[var(--peacock-dark,#087F8C)] underline">Open Tracking Portal</Link>
              </div>
            )}
            {responseStatus === 'failure' && !isFallbackState ? (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-900" role="status">{priestTerminology(responseMessage)}</div>
            ) : null}
          </div>

          <div className="border-t border-teal-100 bg-white px-5 py-4">
            <section aria-labelledby="ai-response-title" aria-live="polite">
              <h3 id="ai-response-title" className="font-serif text-base font-bold text-[#064E59]">AI Response</h3>
              <div className="mt-3 grid gap-2.5">
                <div className={`rounded-xl border px-4 py-3 shadow-sm ${responseStatus === 'service-intent' ? 'border-teal-300 bg-teal-50 text-teal-950' : responseStatus === 'clarification' ? 'border-cyan-300 bg-cyan-50 text-cyan-950' : responseStatus === 'escalated' ? 'border-emerald-300 bg-emerald-50 text-emerald-950' : responseStatus === 'failure' ? 'border-red-300 bg-red-50 text-red-950' : responseStatus === 'pending-review' ? 'border-amber-300 bg-amber-50 text-amber-950' : 'border-stone-200 bg-stone-50 text-stone-500'}`}>
                  <strong className="block text-xs font-bold uppercase tracking-wide">{responseStatus === 'service-intent' ? 'Service Guidance' : responseStatus === 'clarification' ? 'Clarification Needed' : 'Human Review Response'}</strong>
                  {isAIResponse ? <p className="mt-1.5 whitespace-pre-wrap text-sm leading-6">{priestTerminology(responseMessage)}</p> : null}
                  {responseStatus === 'service-intent' ? (
                    <div className="mt-3 flex flex-wrap gap-2 border-t border-teal-200 pt-3 text-xs">
                      <Link href={serviceActionHref} className="rounded-lg bg-[#064E59] px-3 py-2 font-bold text-white shadow-sm hover:opacity-95">{serviceActionLabel}</Link>
                      {serviceInformationHref ? <Link href={serviceInformationHref} className="rounded-lg border border-teal-300 bg-white px-3 py-2 font-bold text-[#064E59] shadow-sm hover:bg-teal-50">View Service Information</Link> : null}
                    </div>
                  ) : null}
                  {showLeadForm && !submittedInquiryId ? (
                    <form className="mt-3 space-y-2 border-t border-amber-200 pt-3 text-xs" onSubmit={handleLeadSubmit}>
                      <strong className="block">Request Verified Guidance &amp; Scope</strong>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <input required placeholder="Full Name *" className="w-full rounded-lg border border-stone-300 bg-white p-2 text-stone-900" value={leadName} onChange={(e) => setLeadName(e.target.value)} />
                        <input required placeholder="WhatsApp / Phone *" className="w-full rounded-lg border border-stone-300 bg-white p-2 text-stone-900" value={leadWhatsApp} onChange={(e) => setLeadWhatsApp(e.target.value)} />
                      </div>
                      <div className="grid gap-2 sm:grid-cols-2">
                        <input placeholder="Preferred Date" type="date" className="w-full rounded-lg border border-stone-300 bg-white p-2 text-stone-900" value={leadPreferredDate} onChange={(e) => setLeadPreferredDate(e.target.value)} />
                        <input placeholder="Gotra (If known)" className="w-full rounded-lg border border-stone-300 bg-white p-2 text-stone-900" value={leadGotra} onChange={(e) => setLeadGotra(e.target.value)} />
                      </div>
                      <input placeholder="Ancestor Details / Notes" className="w-full rounded-lg border border-stone-300 bg-white p-2 text-stone-900" value={leadAncestorDetails} onChange={(e) => setLeadAncestorDetails(e.target.value)} />
                      <button type="submit" disabled={isSubmittingLead} className="w-full rounded-lg bg-[var(--peacock-dark,#087F8C)] py-2 font-bold text-white transition hover:opacity-95 disabled:opacity-50">{isSubmittingLead ? 'Saving Request…' : 'Submit for Verified Review'}</button>
                    </form>
                  ) : null}
                  {responseStatus === 'escalated' && submittedInquiryId ? (
                    <div className="mt-2 border-t border-emerald-200 pt-2 text-sm">
                      <p>Tag ID: <strong>{submittedInquiryId}</strong></p>
                      <p className="mt-1">Use this Tag ID to track your request.</p>
                      <Link href={`/tracking?ref=${submittedInquiryId}`} className="mt-1 inline-block font-bold text-[#087F8C] underline">Track Response</Link>
                    </div>
                  ) : null}
                </div>

                <div className={`rounded-xl border px-4 py-3 shadow-sm ${isWarningResponse ? 'border-red-400 bg-red-50 text-red-950 ring-1 ring-red-200' : 'border-stone-200 bg-stone-50 text-stone-500'}`} role="alert">
                  <strong className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide"><span aria-hidden="true">{isWarningResponse ? '⚠' : '○'}</span>Status / Warning</strong>
                  {isWarningResponse ? <p className="mt-1.5 whitespace-pre-wrap text-sm leading-6">{priestTerminology(responseMessage)}</p> : null}
                </div>
              </div>
            </section>
          </div>
        </section>

        <section
          className="col-span-full min-w-0 overflow-hidden rounded-2xl border border-teal-200/80 bg-white shadow-[0_8px_22px_rgba(6,78,89,0.08)]"
          aria-label="Approved Questions"
        >

          {/* 3. CONTEXTUAL APPROVED Q&A METADATA */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 bg-[#fffdfa] px-5 py-4 text-sm">
        <strong className="block font-serif text-lg text-[#064E59]">Approved Questions</strong>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <form className="flex items-center gap-1" onSubmit={handleQuestionNumberSubmit}>
            <input
              aria-label="Approved question number"
              className="w-24 rounded-lg border border-teal-200 bg-white px-2.5 py-1.5 font-mono text-xs text-stone-800 outline-none focus:border-[#087F8C]"
              onChange={(event) => { setQuestionNumberInput(event.target.value); setQuestionNumberError(false); }}
              placeholder="Enter Q No."
              value={questionNumberInput}
            />
            <button className="rounded-lg bg-[#064E59] px-3 py-1.5 text-xs font-bold text-white" type="submit">Go</button>
          </form>
          {questionNumberError ? <span className="text-xs font-medium text-red-700" role="status">Question not found</span> : null}
          <span className="rounded-full bg-teal-50 px-2.5 py-1 font-mono text-xs font-bold text-teal-800">
            {totalQuestions > 0 ? `${activeQuestionIndex + 1} of ${totalQuestions}` : '0 of 0'}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevQuestion}
              disabled={approvedQuestionWindowStart === 0 || totalQuestions === 0}
              className="rounded-lg border border-teal-200 bg-white px-3 py-1.5 text-xs font-bold text-[#064E59] shadow-sm hover:bg-teal-50 disabled:opacity-30"
              aria-label="Previous question"
            >
               Prev
            </button>
            <button
              type="button"
              onClick={handleNextQuestion}
              disabled={approvedQuestionWindowStart >= finalApprovedQuestionWindowStart || totalQuestions === 0}
              className="rounded-lg border border-teal-200 bg-white px-3 py-1.5 text-xs font-bold text-[#064E59] shadow-sm hover:bg-teal-50 disabled:opacity-30"
              aria-label="Next question"
            >
              Next 
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-stone-100 bg-white px-5 py-4">
        <h3 className="font-serif text-base font-bold text-[#064E59]">How can I assist you?</h3>
        <form className="mt-2.5" onSubmit={handleTextSubmit} role="search" aria-label="Search approved questions">
          <div className="flex items-center gap-2">
            <input
              value={inputQuery}
              onChange={(e) => {
                const value = e.target.value;
                const words = value.trim().split(/\s+/).filter(Boolean);
                if (words.length <= 30) setInputQuery(value);
              }}
              className="min-w-0 flex-1 rounded-xl border border-teal-200 bg-white px-3.5 py-2.5 text-sm shadow-inner outline-none focus:border-[#087F8C] focus:ring-2 focus:ring-[#087F8C]/20"
              placeholder="Ask a question..."
            />
            <button type="submit" className="shrink-0 whitespace-nowrap rounded-xl bg-[var(--peacock-dark,#087F8C)] px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:opacity-95" aria-label="Search approved questions">
              Search ›
            </button>
          </div>
        </form>
      </div>

      {/* 4. CONCISE APPROVED ANSWER AREA */}
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4">
        <div className="space-y-3 rounded-xl border border-amber-300/80 bg-gradient-to-br from-amber-50 via-white to-teal-50/40 p-5 text-sm leading-6 text-stone-800 shadow-sm">
          {isFirstUse || responseStatus !== 'approved' ? (
            <p className="text-sm text-stone-700 italic">Select an approved question below or use search.</p>
          ) : (
            <div>
              <h3 className="mb-2 font-serif text-base font-bold leading-6 text-orange-950">
                {displayQuestion || currentPrompt?.label || 'Approved Guidance'}
              </h3>
              <p className="whitespace-pre-wrap text-sm leading-6 text-stone-800">{priestTerminology(activeResponse)}</p>
            </div>
          )}
        </div>
        <div className="grid gap-2 sm:grid-cols-2" aria-label="Approved question list">
          {visibleApprovedQuestions.map((prompt, visibleIndex) => {
            const index = approvedQuestionWindowStart + visibleIndex;
            return (
            <button
              key={prompt.id}
              type="button"
              onClick={() => handleSelectQuestionIndex(index)}
              aria-pressed={!isFirstUse && index === activeQuestionIndex}
              className={`flex min-h-11 w-full items-center justify-between rounded-lg border px-3.5 py-2.5 text-left text-sm font-medium shadow-sm transition hover:border-[#D4AF37] hover:bg-amber-50 ${!isFirstUse && index === activeQuestionIndex ? 'border-[#D4AF37] bg-teal-50 text-[#064E59]' : 'border-stone-200 bg-white text-stone-800'}`}
            >
              <span className="pr-3">{prompt.label}</span>
              <span className="shrink-0 text-xs text-stone-400" aria-hidden="true">›</span>
            </button>
            );
          })}
        </div>
      </div>

      {/* 5. RELATED QUESTIONS */}
      <div className="border-t border-teal-100 bg-teal-50/40 px-5 py-4">
        {responseStatus !== 'service-intent' && relatedPrompts.length > 0 && (
          <>
            <span className="block text-xs font-bold uppercase tracking-wider text-[#064E59]">Related Approved Questions</span>
            <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {relatedPrompts.map((prompt) => (
              <button
                key={prompt.id}
                type="button"
                onClick={() => handleSelectQuestionIndex(prompt.originalIndex)}
                className="flex min-h-8 w-full items-center justify-between rounded-lg border border-stone-200 bg-white px-3 py-2 text-left text-xs font-medium text-stone-700 shadow-sm transition hover:border-[#D4AF37] hover:bg-amber-50"
              >
                <span className="truncate pr-2">{prompt.label}</span>
                <span className="text-stone-400 text-xs shrink-0">›</span>
              </button>
              ))}
            </div>
          </>
        )}
        <div className={`${responseStatus !== 'service-intent' && relatedPrompts.length > 0 ? 'mt-3' : ''} text-right`}>
          <Link href="/knowledge-center" className="text-sm font-semibold text-[var(--peacock-dark,#087F8C)] hover:underline">Explore Knowledge Center</Link>
        </div>
      </div>
        </section>
      </div>
      <div className="border-t border-amber-200 bg-gradient-to-r from-amber-50/70 to-teal-50/60 px-5 py-4">
        <div className="flex flex-wrap items-center gap-2.5 text-sm"><strong className="mr-1 font-serif text-lg text-[#064E59]">Need more help?</strong>{[
          ['Raise Inquiry', '/contact?topic=inquiry'], ['Book Now', '/services'], ['Track Request', '/tracking'], ['Complaint', '/complaint'], ['Grievance', '/grievance'], ['Founder Support', '/founder-support'],
        ].map(([label, href]) => <Link key={href} href={href} className="inline-flex min-h-10 items-center rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm hover:border-[#087F8C] hover:bg-teal-50 hover:text-[#064E59]">{label}</Link>)}</div>
      </div>
      <section className="border-t border-stone-200 bg-stone-50/80 px-5 py-3 text-xs leading-5 text-stone-600" aria-labelledby="genz-ai-limitations-title">
        <h3 id="genz-ai-limitations-title" className="font-semibold text-red-700">GenZ AI Limitations</h3>
        <p className="mt-1">GenZ AI answers from Founder-approved Q&amp;A, approved Knowledge Center information and authorised service information. It does not invent an answer when reliable approved guidance is unavailable. GenZ AI provides guidance only. It does not make final religious decisions or autonomous pricing, quotation, payment, booking approval, registration approval, complaint, grievance, cancellation, refund, or other sensitive decisions requiring authorised human judgment.</p>
      </section>
    </div>
  );
}


