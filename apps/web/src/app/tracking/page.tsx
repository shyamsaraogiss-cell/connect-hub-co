'use client';

import { priestTerminology } from '@/lib/priest-terminology';

import type { FormEvent } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PublicHeroShell } from '@/features/public-shell';
import { QuestionCircleIcon, MulticolourAiBrainIcon } from '@/features/public-shell/components/PublicHeroSidebar';
import { getUniversalRequestByReferenceId } from '@/services/urms.api';
import type { URMSUniversalRecord } from '@/types/urms';
import { CommercialWorkflowPanel } from './CommercialWorkflowPanel';

type TrackingMode = 'service' | 'partner';

function TrackingForm({ mode, preferred, loading, onTrack }: { mode: TrackingMode; preferred: boolean; loading: boolean; onTrack: (referenceId: string, verification: string, mode: TrackingMode) => Promise<void> }) {
  const [referenceId, setReferenceId] = useState('');
  const [verification, setVerification] = useState('');
  const partner = mode === 'partner';
  const heading = partner ? 'Track Priest Registration' : 'Track Service Request';
  const idLabel = partner ? 'Priest Registration ID' : 'Service Request ID';

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void onTrack(referenceId, verification, mode);
  }

  return (
    <form id={partner ? 'track-partner-registration' : 'track-service-request'} onSubmit={submit} className={`flex h-full flex-col p-5 sm:p-6 ${partner ? 'bg-[#B78662]/20' : 'bg-cyan-50/70'} ${preferred ? partner ? 'ring-1 ring-inset ring-[#8A4F35]' : 'ring-1 ring-inset ring-cyan-700' : ''}`}>
      <h2 className="font-serif text-xl font-bold text-stone-950">{heading}</h2>
      <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-stone-700">{idLabel} *<input autoFocus={preferred} className={`mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 font-mono text-sm outline-none ${partner ? 'focus:border-[#8A4F35]' : 'focus:border-cyan-700'}`} name="referenceId" required value={referenceId} onChange={(event) => setReferenceId(event.target.value)} placeholder="CHC-YYYY-XXXXXX" /></label>
      <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-stone-700">Registered Email or Mobile *<input className={`mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none ${partner ? 'focus:border-[#8A4F35]' : 'focus:border-cyan-700'}`} name="verification" required value={verification} onChange={(event) => setVerification(event.target.value)} /></label>
      <button className={`mt-4 w-full rounded-xl px-5 py-3 font-semibold text-white disabled:opacity-50 ${partner ? 'bg-orange-900' : 'bg-[var(--peacock-dark,#087F8C)]'}`} disabled={loading} type="submit">{loading ? 'Searching...' : heading}</button>
      <div className="mt-auto pt-5">
        {partner ? (
          <Link className="flex w-fit items-center gap-2 rounded-xl border border-[#D4AF37] bg-[#075A63] px-4 py-2 text-sm font-semibold text-white shadow-sm" href="/zen-g">
            <span className="flex h-[35px] w-[35px] items-center justify-center [&>svg]:h-[35px] [&>svg]:w-[35px]"><MulticolourAiBrainIcon /></span>
            <span>May I Help You?</span>
          </Link>
        ) : (
          <Link className="flex w-fit items-center gap-2 rounded-xl border border-orange-300 bg-white px-4 py-2 text-sm font-semibold text-orange-950 shadow-sm hover:bg-orange-50" href="/contact?topic=inquiry">
            <span className="flex h-[35px] w-[35px] items-center justify-center [&>svg]:h-[35px] [&>svg]:w-[35px]"><QuestionCircleIcon /></span>
            <span>Raise Inquiry</span>
          </Link>
        )}
      </div>
    </form>
  );
}

export default function TrackingPage() {
  const searchParams = useSearchParams();
  const preferredMode: TrackingMode = searchParams.get('type') === 'partner' ? 'partner' : 'service';
  const [loadingMode, setLoadingMode] = useState<TrackingMode | null>(null);
  const [resultMode, setResultMode] = useState<TrackingMode>(preferredMode);
  const [searchedReference, setSearchedReference] = useState('');
  const [verifiedContact, setVerifiedContact] = useState('');
  const [record, setRecord] = useState<URMSUniversalRecord | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function track(referenceId: string, verification: string, mode: TrackingMode) {
    const cleanReference = referenceId.trim().toUpperCase();
    if (!/^CHC-\d{4}-\d{6}$/.test(cleanReference)) {
      setResultMode(mode);
      setSearchedReference(cleanReference);
      setRecord(null);
      setMessage('Enter a valid reference ID in the format CHC-YYYY-XXXXXX.');
      return;
    }

    setLoadingMode(mode);
    setResultMode(mode);
    setSearchedReference(cleanReference);
    setMessage(null);
    try {
      const result = await getUniversalRequestByReferenceId(cleanReference, 'GUEST', verification);
      const matchesMode = result && (mode === 'partner' ? result.requestType === 'PARTNER_REGISTRATION' : result.requestType !== 'PARTNER_REGISTRATION');
      setRecord(matchesMode ? result : null);
      setVerifiedContact(matchesMode ? verification.trim() : '');
      if (!matchesMode) setMessage(partnerMessage(mode));
    } catch {
      setRecord(null);
      setVerifiedContact('');
      setMessage(partnerMessage(mode));
    } finally {
      setLoadingMode(null);
    }
  }

  const partnerResult = resultMode === 'partner';
  const idLabel = partnerResult ? 'Priest Registration ID' : 'Service Request ID';
  const statusLabel = partnerResult ? 'Application Status' : 'Request Status';

  async function refreshCommercialWorkflow() {
    const refreshed = await getUniversalRequestByReferenceId(searchedReference, 'GUEST', verifiedContact);
    if (!refreshed) throw new Error('Tracking refresh failed.');
    setRecord(refreshed);
  }

  return (
    <PublicHeroShell>
      <main className="bg-amber-50 px-4 py-5 text-stone-900 sm:px-6 sm:py-6">
        <div className="mx-auto max-w-4xl space-y-4">
          <section className="rounded-2xl border border-[#D4AF37] bg-[#4A5568] px-5 py-4 text-white shadow-sm sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-200">Track &amp; Status Support</p>
            <h1 className="mt-2 font-serif text-3xl font-bold">Track Your Request or Registration</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-orange-50">
              Track your service request or Priest Registration using the registered reference details below.
            </p>
            <p className="mt-3 text-sm text-orange-50">
              <span className="font-semibold text-[var(--ritual-gold)]">PLEASE MAKE SURE -</span> Please use the same Registered Reference ID, Email or Mobile Number associated with it, for every purpose.
            </p>
          </section>

          <section className="overflow-hidden rounded-2xl border border-[#A66D4F] bg-white shadow-sm">
            <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-[#A66D4F]">
              <TrackingForm mode="service" preferred={preferredMode === 'service'} loading={loadingMode !== null} onTrack={track} />
              <TrackingForm mode="partner" preferred={preferredMode === 'partner'} loading={loadingMode !== null} onTrack={track} />
            </div>
          </section>

          {searchedReference ? <section className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
            {record ? <>
              <h2 className="font-serif text-2xl font-bold text-stone-950">{partnerResult ? 'Priest Registration Tracking Result' : 'Service Request Tracking Result'}</h2>
              <dl className="mt-6 grid gap-4 rounded-xl border border-stone-200 bg-stone-50 p-5 sm:grid-cols-2">
                <div><dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">{idLabel}</dt><dd className="mt-1 font-mono font-bold text-stone-900">{record.referenceId}</dd></div>
                <div><dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">{statusLabel}</dt><dd className="mt-1 font-bold text-orange-950">{record.currentStatus.replaceAll('_', ' ')}</dd></div>
                <div><dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">Last Updated</dt><dd className="mt-1 text-stone-900">{new Date(record.updatedAt).toLocaleString()}</dd></div>
                <div><dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">Current Stage</dt><dd className="mt-1 text-stone-900">{priestTerminology(record.currentStage)}</dd></div>
                {record.expectedNextStep ? <div className="sm:col-span-2"><dt className="text-xs font-semibold uppercase tracking-wider text-stone-500">Next Step / Action Required</dt><dd className="mt-1 text-stone-900">{priestTerminology(record.expectedNextStep)}</dd></div> : null}
              </dl>
              {record.timeline.length ? <div className="mt-6"><h3 className="font-semibold text-stone-900">Public Updates</h3><div className="mt-3 space-y-3">{record.timeline.map((event) => <article className="rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm" key={event.id}><div className="flex flex-wrap justify-between gap-2"><strong>{priestTerminology(event.title)}</strong><time className="text-xs text-stone-500">{new Date(event.timestamp).toLocaleString()}</time></div><p className="mt-1 text-stone-600">{priestTerminology(event.description)}</p></article>)}</div></div> : null}
              {!partnerResult && record.requestType === 'SERVICE_REQUEST' ? <CommercialWorkflowPanel referenceId={record.referenceId} verification={verifiedContact} workflow={record.commercialWorkflow ?? null} onRefresh={refreshCommercialWorkflow} /> : null}
            </> : <div className="text-center"><h2 className="font-serif text-xl font-bold text-stone-900">Tracking record not available</h2><p className="mx-auto mt-2 max-w-lg text-sm text-stone-600">{message}</p></div>}
          </section> : null}

        </div>
      </main>
    </PublicHeroShell>
  );
}

function partnerMessage(mode: TrackingMode) {
  return mode === 'partner'
    ? 'No Priest Registration was found for those verified details.'
    : 'No customer or service request was found for those verified details.';
}
