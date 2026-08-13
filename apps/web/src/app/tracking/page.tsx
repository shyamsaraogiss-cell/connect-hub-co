'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { PublicHeroShell } from '@/features/public-shell';
import { getUniversalRequestByReferenceId } from '@/services/urms.api';
import type { URMSUniversalRecord, URMSStatus } from '@/types/urms';
import Link from 'next/link';

const STATUS_STEPS: { key: URMSStatus; label: string }[] = [
  { key: 'SUBMITTED', label: 'Submitted' },
  { key: 'ACKNOWLEDGED', label: 'Acknowledged' },
  { key: 'ASSIGNED', label: 'Assigned' },
  { key: 'UNDER_REVIEW', label: 'Under Review' },
  { key: 'IN_PROGRESS', label: 'In Progress' },
  { key: 'COMPLETED', label: 'Completed' },
];

function getCategoryBadge(type: string) {
  switch (type) {
    case 'SERVICE_REQUEST':
      return 'bg-amber-100 text-amber-950 border-amber-300';
    case 'BOOKING':
      return 'bg-orange-100 text-orange-950 border-orange-300';
    case 'PARTNER_REGISTRATION':
      return 'bg-blue-100 text-blue-950 border-blue-300';
    case 'COMPLAINT':
      return 'bg-red-100 text-red-950 border-red-300';
    case 'GRIEVANCE':
      return 'bg-purple-100 text-purple-950 border-purple-300';
    case 'FOUNDER_SUPPORT':
      return 'bg-stone-900 text-amber-300 border-stone-700';
    default:
      return 'bg-stone-100 text-stone-800 border-stone-300';
  }
}

export default function TrackingPage() {
  const searchParams = useSearchParams();
  const initialRef = searchParams.get('ref') || searchParams.get('id') || '';

  const [inputRef, setInputRef] = useState(initialRef);
  const [contactVerification, setContactVerification] = useState('');
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<URMSUniversalRecord | null>(null);
  const [searched, setSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<'TIMELINE' | 'COMMUNICATIONS' | 'DOCUMENTS' | 'ACTIONS'>('TIMELINE');
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateRefFormat = (ref: string): boolean => {
    const clean = ref.trim().toUpperCase();
    if (!clean) return false;
    const refRegex = /^CHC-\d{4}-\d{6}$/;
    if (!refRegex.test(clean)) {
      setValidationError('Please enter a valid Universal Reference ID in format CHC-YYYY-XXXXXX (e.g. CHC-2026-000123)');
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSearch = useCallback(async (refToSearch: string) => {
    if (!refToSearch.trim()) return;
    if (!validateRefFormat(refToSearch)) return;

    setLoading(true);
    setSearched(true);
    try {
      // Pass role='GUEST' to guarantee customer-safe data output (hides internal notes/documents)
      const data = await getUniversalRequestByReferenceId(refToSearch, 'GUEST', contactVerification);
      setRecord(data);
    } catch {
      setRecord(null);
    } finally {
      setLoading(false);
    }
  }, [contactVerification]);

  useEffect(() => {
    if (initialRef) {
      let isMounted = true;
      (async () => {
        if (!validateRefFormat(initialRef)) return;
        setLoading(true);
        setSearched(true);
        try {
          if (!contactVerification) return;
          const data = await getUniversalRequestByReferenceId(initialRef, 'GUEST', contactVerification);
          if (isMounted) setRecord(data);
        } catch {
          if (isMounted) setRecord(null);
        } finally {
          if (isMounted) setLoading(false);
        }
      })();
      return () => {
        isMounted = false;
      };
    }
  }, [contactVerification, initialRef]);

  const currentStepIdx = record ? STATUS_STEPS.findIndex((s) => s.key === record.currentStatus) : -1;

  return (
    <PublicHeroShell>
      <main className="bg-amber-50 px-6 py-16 text-stone-900 min-h-[75vh]">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Universal Header Card */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-stone-200">
            <p className="font-semibold tracking-widest text-orange-800 uppercase text-xs">URMS Universal Tracking Engine</p>
            <h1 className="mt-2 text-3xl font-serif font-bold text-stone-950">Track Service Request or Registration</h1>
            <p className="mt-3 text-stone-600 text-sm leading-relaxed">
              Enter your immutable Universal Reference ID (e.g. <code className="bg-stone-100 px-2 py-0.5 rounded font-mono text-orange-950">CHC-2026-000123</code> or <code className="bg-stone-100 px-2 py-0.5 rounded font-mono text-orange-950">CHC-2026-000124</code>) to view real-time status and customer-safe updates.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(inputRef);
              }}
              className="mt-6 space-y-3"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  required
                  value={inputRef}
                  onChange={(e) => {
                    setInputRef(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  placeholder="Enter Universal Reference ID (CHC-YYYY-XXXXXX)..."
                  className="flex-1 rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-[var(--peacock-dark,#087F8C)] focus:ring-2 focus:ring-cyan-600/20 font-mono"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-[var(--peacock-dark,#087F8C)] px-8 py-3 font-semibold text-white transition hover:opacity-95 disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? 'Searching...' : 'Track Request →'}
                </button>
              </div>
              <input
                type="text"
                required
                value={contactVerification}
                onChange={(event) => setContactVerification(event.target.value)}
                placeholder="Enter the email address or phone number used for this request"
                className="w-full rounded-xl border border-stone-300 px-4 py-3 text-sm outline-none focus:border-[var(--peacock-dark,#087F8C)] focus:ring-2 focus:ring-cyan-600/20"
                autoComplete="email"
              />
              {validationError && <p className="text-xs text-red-600 font-medium">{validationError}</p>}
            </form>
          </div>

          {/* Result Card */}
          {searched && (
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-stone-200 space-y-6">
              {record ? (
                <>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-6">
                    <div>
                      <span className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border ${getCategoryBadge(record.requestType)}`}>
                        {record.requestType.replaceAll('_', ' ')}
                      </span>
                      <h2 className="text-2xl font-serif font-bold text-stone-950 mt-2">{record.title}</h2>
                      <p className="text-xs text-stone-500 mt-1 font-mono">Immutable Universal Reference ID: {record.referenceId}</p>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs uppercase tracking-wider text-stone-500">Current Status</span>
                      <span className="inline-block mt-1 font-bold text-orange-950 text-lg bg-orange-50 px-3 py-1 rounded-lg border border-orange-200">
                        {record.currentStatus.replaceAll('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Progress Stepper */}
                  <div className="py-2">
                    <div className="flex justify-between items-center text-xs font-mono mb-4 text-stone-600">
                      <span>Current Stage: <strong className="text-stone-900">{record.currentStage}</strong></span>
                      <span>Last Updated: <strong>{new Date(record.updatedAt).toLocaleString()}</strong></span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center">
                      {STATUS_STEPS.map((step, idx) => {
                        const isDone = idx <= currentStepIdx;
                        const isCurrent = idx === currentStepIdx;
                        return (
                          <div
                            key={step.key}
                            className={`p-2.5 rounded-xl border text-xs font-semibold transition ${
                              isCurrent
                                ? 'border-orange-600 bg-orange-50 text-orange-950 shadow-sm'
                                : isDone
                                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                                  : 'border-stone-200 bg-stone-50 text-stone-400'
                            }`}
                          >
                            <div className="mb-1 text-base">{isDone ? '✓' : idx + 1}</div>
                            {step.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Key Customer Details */}
                  <div className="grid gap-4 sm:grid-cols-2 bg-stone-50 p-5 rounded-xl border border-stone-200 text-sm">
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-stone-500 font-semibold">Customer / Applicant Name</span>
                      <strong className="block text-stone-900 mt-0.5">{record.guestName}</strong>
                    </div>
                    <div>
                      <span className="block text-xs uppercase tracking-wider text-stone-500 font-semibold">Assigned Operational Unit</span>
                      <strong className="block text-orange-950 mt-0.5">{record.assignedTeam || 'Operations Desk'}</strong>
                    </div>
                    {record.expectedNextStep && (
                      <div className="sm:col-span-2 bg-amber-50/80 p-3 rounded-lg border border-amber-200/80">
                        <span className="block text-xs uppercase tracking-wider text-amber-900 font-semibold">Expected Next Step</span>
                        <p className="text-xs text-amber-950 mt-0.5">{record.expectedNextStep}</p>
                      </div>
                    )}
                  </div>

                  {/* Universal Navigation Tabs */}
                  <div className="border-b border-stone-200 flex gap-4 text-sm font-medium">
                    <button
                      onClick={() => setActiveTab('TIMELINE')}
                      className={`pb-3 transition border-b-2 ${
                        activeTab === 'TIMELINE'
                          ? 'border-[var(--peacock-dark,#087F8C)] text-[var(--peacock-dark,#087F8C)] font-bold'
                          : 'border-transparent text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      Customer Timeline ({record.timeline.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('COMMUNICATIONS')}
                      className={`pb-3 transition border-b-2 ${
                        activeTab === 'COMMUNICATIONS'
                          ? 'border-[var(--peacock-dark,#087F8C)] text-[var(--peacock-dark,#087F8C)] font-bold'
                          : 'border-transparent text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      Messages ({record.communications.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('DOCUMENTS')}
                      className={`pb-3 transition border-b-2 ${
                        activeTab === 'DOCUMENTS'
                          ? 'border-[var(--peacock-dark,#087F8C)] text-[var(--peacock-dark,#087F8C)] font-bold'
                          : 'border-transparent text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      Documents & Files ({record.documents.length})
                    </button>
                    <button
                      onClick={() => setActiveTab('ACTIONS')}
                      className={`pb-3 transition border-b-2 ${
                        activeTab === 'ACTIONS'
                          ? 'border-[var(--peacock-dark,#087F8C)] text-[var(--peacock-dark,#087F8C)] font-bold'
                          : 'border-transparent text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      Available Actions
                    </button>
                  </div>

                  {/* TAB CONTENT: TIMELINE */}
                  {activeTab === 'TIMELINE' && (
                    <div className="space-y-3">
                      {record.timeline.map((event) => (
                        <div key={event.id} className="flex gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                          <div className="font-mono text-stone-500 whitespace-nowrap">{new Date(event.timestamp).toLocaleDateString()}</div>
                          <div>
                            <strong className="block font-semibold text-stone-900">{event.title}</strong>
                            <p className="mt-1 text-stone-600">{event.description}</p>
                            <span className="mt-1 block text-[11px] text-stone-400">Update Source: {event.actor}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB CONTENT: COMMUNICATIONS */}
                  {activeTab === 'COMMUNICATIONS' && (
                    <div className="space-y-3">
                      {record.communications.length > 0 ? (
                        record.communications.map((msg) => (
                          <div key={msg.id} className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs space-y-1">
                            <div className="flex justify-between items-center text-stone-500 font-mono">
                              <span className="font-semibold text-orange-950">{msg.sender} ({msg.channel})</span>
                              <span>{new Date(msg.timestamp).toLocaleString()}</span>
                            </div>
                            <p className="text-stone-800 text-sm mt-1">{msg.message}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-stone-500 italic py-4">No public messages recorded yet.</p>
                      )}
                    </div>
                  )}

                  {/* TAB CONTENT: DOCUMENTS */}
                  {activeTab === 'DOCUMENTS' && (
                    <div className="space-y-3">
                      {record.documents.length > 0 ? (
                        record.documents.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                            <div>
                              <strong className="block text-stone-900 font-semibold">{doc.fileName}</strong>
                              <span className="text-stone-500 text-[11px]">Category: {doc.category} • Uploaded by {doc.uploadedBy} on {new Date(doc.uploadDate).toLocaleDateString()}</span>
                            </div>
                            <button className="text-[var(--peacock-dark,#087F8C)] font-semibold hover:underline">
                              Download ↓
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-stone-500 italic py-4">No customer documents uploaded or generated yet.</p>
                      )}
                    </div>
                  )}

                  {/* TAB CONTENT: ACTIONS */}
                  {activeTab === 'ACTIONS' && (
                    <div className="grid gap-3 sm:grid-cols-2 text-xs">
                      <Link href={`/contact?topic=request-update&ref=${record.referenceId}`} className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 transition block">
                        <strong className="block text-stone-900 text-sm">Reply or Add Instructions →</strong>
                        <span className="text-stone-600 mt-1 block">Send additional requirements or family updates to the operations team.</span>
                      </Link>
                      <Link href={`/founder-support?ref=${record.referenceId}`} className="p-4 rounded-xl border border-stone-900 bg-stone-950 text-amber-300 hover:opacity-95 transition block">
                        <strong className="block text-amber-300 text-sm">Escalate to Founder Support ⚡</strong>
                        <span className="text-stone-300 mt-1 block">Direct Executive Founder channel for exceptional or sensitive matters.</span>
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-10">
                  <div className="text-4xl mb-3">🔍</div>
                  <h3 className="text-xl font-bold text-stone-900 font-serif">Reference ID Not Found</h3>
                  <p className="mt-2 text-stone-600 text-sm max-w-md mx-auto">
                    We could not locate a record for reference ID <code className="bg-stone-100 px-2 py-0.5 rounded font-mono text-orange-950">{inputRef}</code>. Please double-check your ID or contact support.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Quick Help Footer */}
          <div className="flex flex-wrap justify-between items-center text-xs text-stone-500 px-2">
            <span>Need assistance or cannot locate your Universal Reference ID?</span>
            <Link className="font-semibold text-orange-950 hover:underline" href="/contact?topic=tracking-assistance">
              Contact Operations Support →
            </Link>
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}
