'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { verifyUniversalReferenceOwnership } from '@/services/urms.api';

const field = 'mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-orange-600 disabled:bg-stone-100';
const section = 'grid gap-4 rounded-2xl border border-stone-200 p-5';
const label = 'text-xs font-semibold uppercase tracking-wider text-stone-700';

export function GrievanceForm() {
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSubmitting(true); setError(null);
    const data = new FormData(event.currentTarget);
    const contact = String(data.get('registeredContact') || '').trim();
    const category = String(data.get('category') || '');
    const existingReference = String(data.get('existingReference') || '').trim();
    const filingDate = String(data.get('filingDate') || '');
    try {
      const verified = await verifyUniversalReferenceOwnership(existingReference, [contact], ['COMPLAINT', 'SERVICE_REQUEST', 'BOOKING']);
      if (!verified) { setError('The originating reference could not be verified against the registered email or mobile number.'); return; }
      const result = await api<{ referenceId: string }>('/urms/universal-requests/public', { method: 'POST', body: JSON.stringify({ requestType: 'GRIEVANCE', serviceDomain: 'grievance', guestName: String(data.get('fullName') || '').trim(), guestEmail: contact.includes('@') ? contact : '', guestPhone: contact.includes('@') ? '' : contact, title: `Grievance: ${category}`, description: String(data.get('reason') || '').trim(), assignedTeam: 'Support', sourceChannel: 'WEBSITE_FORM', metadata: { filingDate, originatingReferenceId: existingReference.toUpperCase(), originalComplaintDate: String(data.get('originalComplaintDate') || ''), category, previousResponse: String(data.get('previousResponse') || '').trim(), resolutionRequested: String(data.get('resolutionRequested') || '').trim() } }) });
      setReferenceId(result.referenceId);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to submit the grievance.'); }
    finally { setSubmitting(false); }
  }

  if (referenceId) return <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-8 text-center" role="status"><h2 className="font-serif text-2xl font-bold">Grievance submitted</h2><p className="mt-3 text-sm">Keep this Grievance Reference ID for tracking.</p><strong className="mt-3 block font-mono text-2xl text-emerald-800">{referenceId}</strong><Link className="mt-5 inline-block rounded-xl bg-orange-900 px-5 py-2.5 font-semibold text-white" href="/tracking?type=service">Track Service Request</Link></div>;

  return <form className="grid gap-6" onSubmit={submit}>
    <div className="grid gap-4 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:grid-cols-2"><label className={label}>Service Request ID *<input className={`${field} font-mono`} name="existingReference" placeholder="Enter Service / Booking Reference ID" required /></label><label className={label}>Grievance Date<input className={field} name="filingDate" type="date" /></label></div>
    <section className={section}><h2 className="font-serif text-xl font-bold">1. Applicant Details</h2><label className={label}>Full Name *<input className={field} name="fullName" placeholder="Enter full name" required /></label><label className={label}>Registered Email / Mobile *<input className={field} name="registeredContact" placeholder="Enter registered email or mobile" required /></label></section>
    <section className={section}><h2 className="font-serif text-xl font-bold">2. Existing Matter</h2><div className="grid gap-4 sm:grid-cols-2"><label className={label}>Original Complaint Date *<input className={field} name="originalComplaintDate" type="date" required /></label><label className={label}>Grievance Category *<select className={field} name="category" required defaultValue=""><option value="" disabled>Select category</option>{['Unresolved Complaint','Unsatisfactory Resolution','Delay','Refund / Payment Dispute','Religious Partner / Service Provider','Privacy / Personal Information','Other'].map((item) => <option key={item}>{item}</option>)}</select></label></div></section>
    <section className={section}><h2 className="font-serif text-xl font-bold">3. Grievance Details</h2><label className={label}>Reason for Escalation *<textarea className={field} name="reason" rows={4} placeholder="Describe the reason for escalation" required maxLength={1000} /></label><label className={label}>Previous Resolution / Response Received *<textarea className={field} name="previousResponse" rows={3} placeholder="Describe the previous response" required maxLength={1000} /></label><label className={label}>Resolution Requested *<textarea className={field} name="resolutionRequested" rows={3} placeholder="Describe the resolution requested" required maxLength={1000} /></label><label className={label}>Supporting Document<input className={field} type="file" disabled /></label><p className="text-xs text-stone-500">File-storage integration is not currently available.</p></section>
    <section className={section}><h2 className="font-serif text-xl font-bold">4. Declaration &amp; Consent</h2><label className="flex gap-3 text-sm"><input name="accuracy" type="checkbox" required />I confirm that the information provided in this grievance is accurate to the best of my knowledge. *</label><label className="flex gap-3 text-sm"><input name="reviewConsent" type="checkbox" required />I consent to Connect Hub Co. reviewing the related complaint/service records for the purpose of considering this grievance. *</label></section>
    {error ? <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</p> : null}

    <button className="rounded-xl bg-orange-900 px-6 py-3 font-semibold text-white disabled:opacity-50" disabled={submitting} type="submit">{submitting ? 'Submitting Grievance...' : 'Submit Grievance'}</button>
  </form>;
}
