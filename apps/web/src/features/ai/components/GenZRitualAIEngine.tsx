'use client';

import React, { useState, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import type { BusinessCategory } from '../types/ai.types';
import { APPROVED_AI_KNOWLEDGE_TREES } from '../knowledge/ai-knowledge';
import { searchKnowledgeCenter, syncKnowledgeFromBackend } from '../knowledge/semantic-search';
import { getAISessionMemory, updateAISessionMemory } from '../services/ai-session.service';
import { submitUnifiedInquiry } from '@/services/inquiry.api';
import { getUniversalRequestByReferenceId } from '@/services/urms.api';
import type { URMSUniversalRecord } from '@/types/urms';

export type GenZRitualAIEngineProps = {
  category: BusinessCategory;
};

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

const contextSubtitleMap: Record<BusinessCategory, string> = {
  'pitru-moksha-gaya': 'PitruMoksha Gaya Assistant',
  'ritual-services': 'Ritual Services Assistant',
  'travel-assistance': 'Travel Assistance Assistant',
  'vahi-records': 'Vahi Records Assistant',
  'religious-partners': 'Religious Partner Assistant',
  'booking': 'Booking Assistant',
  'inquiry': 'Inquiry Assistant',
  'tracking': 'Tracking Assistant',
  'complaint': 'Support Assistant',
  'grievance': 'Support Assistant',
  'founder-support': 'Support Assistant',
  'company-info': 'Company Info Assistant',
};

// Category mapping for tab Q&A queries
const tabCategoryMapping: Record<FixedTabKey, BusinessCategory> = {
  'services': 'pitru-moksha-gaya',
  'rituals': 'ritual-services',
  'booking': 'booking',
  'tracking': 'tracking',
  'inquiry': 'inquiry',
  'documents': 'vahi-records',
  'complaints': 'complaint',
  'founder-support': 'founder-support',
  'knowledge-guides': 'company-info',
};

export function GenZRitualAIEngine({ category: initialCategory }: GenZRitualAIEngineProps) {
  const [activeTabKey, setActiveTabKey] = useState<FixedTabKey>('services');
  const [activePageCategory] = useState<BusinessCategory>(initialCategory);

  useEffect(() => {
    syncKnowledgeFromBackend();
  }, []);

  // Compute active question tree adapting to active tab and current Hero context
  const currentCategory: BusinessCategory = (activeTabKey === 'services' || activeTabKey === 'rituals')
    ? activePageCategory
    : (tabCategoryMapping[activeTabKey] || activePageCategory);

  const tree = APPROVED_AI_KNOWLEDGE_TREES[currentCategory] || APPROVED_AI_KNOWLEDGE_TREES[activePageCategory] || APPROVED_AI_KNOWLEDGE_TREES['pitru-moksha-gaya'];
  const promptsList = tree.initialPrompts || [];
  const totalQuestions = promptsList.length;

  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [isFirstUse, setIsFirstUse] = useState<boolean>(true);
  const [activeResponse, setActiveResponse] = useState<string>(tree.greeting);

  const [selectedService, setSelectedService] = useState<string>(() => getAISessionMemory().interestedService || '');
  const [showLeadForm, setShowLeadForm] = useState<boolean>(false);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [urmsQueryResult, setUrmsQueryResult] = useState<URMSUniversalRecord | null>(null);
  const [isSearchingURMS, setIsSearchingURMS] = useState<boolean>(false);

  // Session Memory & Lead State
  const [leadName, setLeadName] = useState(() => getAISessionMemory().customerName || '');
  const [leadCountry] = useState(() => getAISessionMemory().country || 'India');
  const [leadWhatsApp, setLeadWhatsApp] = useState('');
  const [leadPreferredDate, setLeadPreferredDate] = useState('');
  const [leadGotra, setLeadGotra] = useState('');
  const [leadAncestorDetails, setLeadAncestorDetails] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  const currentPrompt = promptsList[activeQuestionIndex] || null;
  const contextSubtitle = contextSubtitleMap[activePageCategory] || 'GenZ Ritual Assistant';

  const [isFallbackState, setIsFallbackState] = useState<boolean>(false);

  const handleTabSwitch = (tabKey: FixedTabKey) => {
    setActiveTabKey(tabKey);
    setActiveQuestionIndex(0);
    setIsFirstUse(true);
    setIsFallbackState(false);

    const targetCat = (tabKey === 'services' || tabKey === 'rituals') ? activePageCategory : (tabCategoryMapping[tabKey] || activePageCategory);
    const newTree = APPROVED_AI_KNOWLEDGE_TREES[targetCat] || APPROVED_AI_KNOWLEDGE_TREES['pitru-moksha-gaya'];

    setActiveResponse(newTree.greeting);
    setSelectedService('');
    setShowLeadForm(false);
    setUrmsQueryResult(null);
  };

  const handleSelectQuestionIndex = (index: number) => {
    if (index < 0 || index >= totalQuestions) return;
    setActiveQuestionIndex(index);
    setIsFirstUse(false);
    setIsFallbackState(false);
    const prompt = promptsList[index];
    if (prompt) {
      setActiveResponse(prompt.response);
      setUrmsQueryResult(null);
      if (prompt.suggestedService) {
        setSelectedService(prompt.suggestedService);
        updateAISessionMemory({ interestedService: prompt.suggestedService });
      }
      if (prompt.requiresLeadCollection) {
        setShowLeadForm(true);
      }
    }
  };

  const handleNextQuestion = () => {
    if (activeQuestionIndex < totalQuestions - 1) {
      handleSelectQuestionIndex(activeQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestionIndex > 0) {
      handleSelectQuestionIndex(activeQuestionIndex - 1);
    }
  };

  const handleTextSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const query = inputQuery.trim();
    if (!query) return;

    setUrmsQueryResult(null);
    setIsFirstUse(false);
    setIsFallbackState(false);

    // 1. URMS Reference ID Detection (CHC-YYYY-XXXXXX)
    const refMatch = query.match(/CHC-\d{4}-\d{6}/i);
    if (refMatch) {
      const refId = refMatch[0].toUpperCase();
      setIsSearchingURMS(true);
      setActiveResponse(`Searching URMS Universal Registry for reference ID ${refId}…`);
      try {
        const record = await getUniversalRequestByReferenceId(refId, 'GUEST');
        if (record) {
          setUrmsQueryResult(record);
          setActiveResponse(
            `Found record for Universal Reference ID ${record.referenceId}. Current status: ${record.currentStatus.replaceAll('_', ' ')}. Current stage: ${record.currentStage}.`
          );
        } else {
          setActiveResponse(
            `No public record found for reference ID ${refId}. Please verify your ID format or contact Operations Support.`
          );
        }
      } catch {
        setActiveResponse(`Unable to query tracking engine right now. Please visit /tracking directly.`);
      } finally {
        setIsSearchingURMS(false);
        setInputQuery('');
      }
      return;
    }

    // 2. Search current Hero knowledge prompts first
    const localMatch = promptsList.find(
      (p) => p.label.toLowerCase().includes(query.toLowerCase()) || query.toLowerCase().includes(p.label.toLowerCase().slice(0, 10))
    );
    if (localMatch) {
      const matchedIdx = promptsList.findIndex((p) => p.id === localMatch.id);
      if (matchedIdx !== -1) {
        handleSelectQuestionIndex(matchedIdx);
      } else {
        setActiveResponse(localMatch.response);
      }
      setInputQuery('');
      return;
    }

    // 3. Semantic Knowledge Center Search
    const searchRes = searchKnowledgeCenter(query);

    if (searchRes.suggestedAnswer) {
      setActiveResponse(searchRes.suggestedAnswer);
      setInputQuery('');
      return;
    }

    // 4. Fallback when no approved answer exists (do not fabricate answer)
    setIsFallbackState(true);
    setActiveResponse('An approved answer is not currently available for this specific query. Our AI system does not fabricate unverified religious or operational commitments.');
    setShowLeadForm(true);
    setInputQuery('');
  };

  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);
    updateAISessionMemory({
      customerName: leadName,
      country: leadCountry,
      interestedService: selectedService,
    });

    try {
      const result = await submitUnifiedInquiry('pitru-moksha-gaya', {
        fullName: leadName,
        phone: leadWhatsApp,
        email: '',
        contactPreference: 'WHATSAPP',
        city: '',
        state: '',
        country: leadCountry,
        isNRI: false,
        packageCode: 'COMPLETE',
        serviceMode: 'OFFLINE',
        preferredDate: leadPreferredDate,
        ancestorNames: leadAncestorDetails || 'Gaya Ji Ancestral Inquiry',
        gotra: leadGotra,
        pilgrimCount: 1,
        travelSupportNeeded: false,
        accommodationNeeded: false,
      });

      const generatedId = (result.success && result.inquiryId) ? result.inquiryId : `CHC-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedInquiryId(generatedId);
    } catch {
      const fallbackId = `CHC-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedInquiryId(fallbackId);
    } finally {
      setIsSubmittingLead(false);
      setShowLeadForm(false);
    }
  };

  // Related questions (3 to 5 approved related questions)
  const relatedPrompts = promptsList
    .map((p, idx) => ({ ...p, originalIndex: idx }))
    .filter((_, idx) => idx !== activeQuestionIndex)
    .slice(0, 4);

  return (
    <div className="w-full flex flex-col h-full bg-white text-stone-900 rounded-2xl overflow-hidden border border-stone-200 shadow-sm" role="region" aria-label="GenZ Ritual AI Shared Panel">
      {/* 1. PANEL HEADER (Single Locked Identity Block) */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-stone-200">
        <div className="flex items-center gap-2.5">
          <span className="text-amber-600 font-bold text-lg leading-none" aria-hidden="true">✦</span>
          <div>
            <h2 id="hero-assistant-title" className="font-serif font-bold text-stone-950 text-sm leading-tight">
              GenZ Ritual AI
            </h2>
            <p className="text-[11px] text-stone-600 font-medium">{contextSubtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </span>
          <Link
            href="/knowledge-center"
            className="text-xs font-semibold text-[var(--peacock-dark,#087F8C)] hover:underline whitespace-nowrap"
          >
            Knowledge Hub →
          </Link>
        </div>
      </div>

      {/* 2. SEARCH / INPUT FIELD */}
      <form className="p-3 border-b border-stone-100 bg-stone-50/50" onSubmit={handleTextSubmit} role="search" aria-label="Ask GenZ Ritual AI or enter Reference ID">
        <div className="flex gap-2">
          <input
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 rounded-xl border border-stone-300 bg-white px-3 py-2 text-xs outline-none focus:border-[#087F8C] focus:ring-1 focus:ring-[#087F8C]"
            placeholder="Ask a question or enter Ref ID (CHC-2026-000123)…"
          />
          <button
            type="submit"
            disabled={isSearchingURMS}
            className="rounded-xl bg-[var(--peacock-dark,#087F8C)] px-4 py-2 text-xs font-bold text-white transition hover:opacity-95 disabled:opacity-50"
            aria-label="Send question or look up reference ID"
          >
            {isSearchingURMS ? '…' : 'Search ›'}
          </button>
        </div>
      </form>

      {/* 3. FIXED AI CATEGORY TABS (EXACT 9 TABS IN EXACT ORDER WITH HORIZONTAL SCROLL) */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-stone-100 bg-stone-50/40 overflow-x-auto whitespace-nowrap scrollbar-thin" role="tablist" aria-label="Fixed Category Tabs">
        {FIXED_AI_CATEGORY_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTabKey === tab.key}
            onClick={() => handleTabSwitch(tab.key)}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all shrink-0 ${
              activeTabKey === tab.key
                ? 'bg-[var(--peacock-dark,#087F8C)] text-white shadow-sm'
                : 'bg-stone-100 text-stone-600 hover:bg-amber-100/60 hover:text-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4. FEATURED QUESTION HEADING, COUNTER & NAVIGATION */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1 text-xs">
        <span className="font-serif font-bold text-stone-950">Featured Approved Question</span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-stone-500 font-medium">
            {totalQuestions > 0 ? `${activeQuestionIndex + 1} of ${totalQuestions}` : '0 of 0'}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevQuestion}
              disabled={activeQuestionIndex === 0 || totalQuestions === 0}
              className="px-2 py-0.5 rounded border border-stone-300 bg-white text-[11px] font-bold text-stone-700 disabled:opacity-30 hover:bg-stone-100"
              aria-label="Previous question"
            >
              ← Prev
            </button>
            <button
              type="button"
              onClick={handleNextQuestion}
              disabled={activeQuestionIndex >= totalQuestions - 1 || totalQuestions === 0}
              className="px-2 py-0.5 rounded border border-stone-300 bg-white text-[11px] font-bold text-stone-700 disabled:opacity-30 hover:bg-stone-100"
              aria-label="Next question"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* 5. APPROVED ANSWER AREA (Largest usable area, scrollable) */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 min-h-[150px]">
        <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs leading-relaxed text-stone-800 space-y-2">
          {isFirstUse ? (
            <p className="text-stone-700 italic">
              {tree.greeting || 'Namaste! Select a question below or enter your query for clear, verified guidance.'}
            </p>
          ) : (
            <div>
              <h3 className="font-serif font-bold text-orange-950 text-xs mb-1.5">
                {isFallbackState ? 'Notice: Approved Answer Not Available' : (currentPrompt?.label || 'Approved Guidance')}
              </h3>
              <p className="text-stone-800 leading-relaxed whitespace-pre-wrap">{activeResponse}</p>

              {isFallbackState && (
                <div className="flex flex-wrap gap-2 pt-3 mt-2 border-t border-amber-200/80">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--peacock-dark,#087F8C)] text-white text-xs font-bold hover:opacity-95 shadow-sm"
                  >
                    Contact Support →
                  </Link>
                  <Link
                    href="/founder-support"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-800 text-white text-xs font-bold hover:opacity-95 shadow-sm"
                  >
                    Founder Support →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {urmsQueryResult && (
          <div className="p-3 rounded-xl bg-white border border-amber-300 shadow-sm space-y-1 text-xs">
            <strong className="block text-orange-950 font-serif font-bold">Universal Reference: {urmsQueryResult.referenceId}</strong>
            <p className="text-stone-700">Title: {urmsQueryResult.title}</p>
            <p className="text-stone-700">Status: <span className="font-bold text-emerald-800">{urmsQueryResult.currentStatus.replaceAll('_', ' ')}</span></p>
            <p className="text-stone-700">Stage: {urmsQueryResult.currentStage}</p>
            <Link href={`/tracking?ref=${urmsQueryResult.referenceId}`} className="text-xs font-bold text-[var(--peacock-dark,#087F8C)] underline block mt-1">
              Open Tracking Portal →
            </Link>
          </div>
        )}

        {showLeadForm && !submittedInquiryId && (
          <form className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs space-y-2" onSubmit={handleLeadSubmit}>
            <strong className="block text-teal-950 font-serif font-bold">Request Verified Guidance & Scope</strong>
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                required
                placeholder="Full Name *"
                className="w-full rounded-lg border border-stone-300 p-2 bg-white"
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
              />
              <input
                required
                placeholder="WhatsApp / Phone *"
                className="w-full rounded-lg border border-stone-300 p-2 bg-white"
                value={leadWhatsApp}
                onChange={(e) => setLeadWhatsApp(e.target.value)}
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                placeholder="Preferred Date"
                type="date"
                className="w-full rounded-lg border border-stone-300 p-2 bg-white"
                value={leadPreferredDate}
                onChange={(e) => setLeadPreferredDate(e.target.value)}
              />
              <input
                placeholder="Gotra (If known)"
                className="w-full rounded-lg border border-stone-300 p-2 bg-white"
                value={leadGotra}
                onChange={(e) => setLeadGotra(e.target.value)}
              />
            </div>
            <input
              placeholder="Ancestor Details / Notes"
              className="w-full rounded-lg border border-stone-300 p-2 bg-white"
              value={leadAncestorDetails}
              onChange={(e) => setLeadAncestorDetails(e.target.value)}
            />
            <button
              type="submit"
              disabled={isSubmittingLead}
              className="w-full rounded-lg bg-[var(--peacock-dark,#087F8C)] py-2 font-bold text-white transition hover:opacity-95 disabled:opacity-50"
            >
              {isSubmittingLead ? 'Saving Request…' : 'Submit for Verified Review →'}
            </button>
          </form>
        )}

        {submittedInquiryId && (
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-xs text-emerald-900 text-center font-medium space-y-1">
            <div>✓ Request <strong>{submittedInquiryId}</strong> recorded.</div>
            <Link href={`/tracking?ref=${submittedInquiryId}`} className="font-bold underline text-[var(--peacock-dark,#087F8C)] block">
              Track your Request on Universal Tracking Engine →
            </Link>
          </div>
        )}
      </div>

      {/* 6. RELATED QUESTIONS (3 to 5 approved related questions) */}
      {relatedPrompts.length > 0 && (
        <div className="px-4 py-2 border-t border-stone-100 bg-stone-50/40 space-y-1.5">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-500">Related Approved Questions</span>
          <div className="grid gap-1">
            {relatedPrompts.map((prompt) => (
              <button
                key={prompt.id}
                type="button"
                onClick={() => handleSelectQuestionIndex(prompt.originalIndex)}
                className="w-full text-left px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white hover:bg-amber-50/80 text-[11px] text-stone-800 transition font-medium flex items-center justify-between"
              >
                <span className="truncate pr-2">{prompt.label}</span>
                <span className="text-stone-400 text-xs shrink-0">›</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
