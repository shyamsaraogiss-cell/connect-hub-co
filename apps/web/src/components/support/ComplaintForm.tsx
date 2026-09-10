'use client';

import { priestTerminology } from '@/lib/priest-terminology';

import type { FormEvent } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { verifyUniversalReferenceOwnership } from '@/services/urms.api';

const field = 'mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-orange-600 disabled:bg-stone-100';
const section = 'grid gap-4 rounded-2xl border border-stone-200 p-5';
const label = 'text-xs font-semibold uppercase tracking-wider text-stone-700';

export function ComplaintForm() {
  const [referenceType, setReferenceType] = useState('');
  const [contacted, setContacted] = useState('');
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const data = new FormData(event.currentTarget);
    const firstName = String(data.get('firstName') || '').trim();
    const lastName = String(data.get('lastName') || '').trim();
    const subject = String(data.get('subject') || '').trim();
    const description = String(data.get('description') || '').trim();
    const filingDate = String(data.get('filingDate') || '');
    const existingReferenceId = String(data.get('existingReferenceId') || '').trim().toUpperCase();
    try {
      if (existingReferenceId) {
        const allowedTypes = referenceType === 'Partner Registration ID' ? ['PARTNER_REGISTRATION'] as const : referenceType === 'Inquiry Reference' ? ['INQUIRY'] as const : referenceType === 'Booking / Payment Reference' ? ['BOOKING'] as const : ['SERVICE_REQUEST'] as const;
        const verified = await verifyUniversalReferenceOwnership(existingReferenceId, [String(data.get('email') || ''), String(data.get('mobile') || '')], allowedTypes);
        if (!verified) { setError('The existing reference could not be verified against the registered email or mobile number.'); return; }
      }
      const result = await api<{ referenceId: string }>('/urms/universal-requests/public', { method: 'POST', body: JSON.stringify({
        requestType: 'COMPLAINT', serviceDomain: String(data.get('category') || ''), guestName: [firstName, String(data.get('middleName') || '').trim(), lastName].filter(Boolean).join(' '), guestPhone: String(data.get('mobile') || '').trim(), guestEmail: String(data.get('email') || '').trim(), title: `Complaint: ${subject}`, description, assignedTeam: 'Support', sourceChannel: 'WEBSITE_FORM', metadata: { filingDate, whatsapp: String(data.get('whatsapp') || '').trim(), preferredContactMethod: String(data.get('preferredContactMethod') || ''), referenceType, originatingReferenceId: existingReferenceId || undefined, issueDate: String(data.get('issueDate') || ''), serviceConcerned: String(data.get('serviceConcerned') || '').trim() || undefined, locationConcerned: String(data.get('locationConcerned') || '').trim() || undefined, resolutionRequested: String(data.get('resolutionRequested') || '').trim(), previouslyContacted: contacted || undefined, previousReference: String(data.get('previousReference') || '').trim() || undefined, previousContactDate: String(data.get('previousContactDate') || '') || undefined, previousContactChannel: String(data.get('previousContactChannel') || '') || undefined, supportingNotes: String(data.get('supportingNotes') || '').trim() || undefined, preferredContactTime: String(data.get('preferredContactTime') || '').trim() || undefined, contactInstructions: String(data.get('contactInstructions') || '').trim() || undefined } }
      ) });
      setReferenceId(result.referenceId);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Unable to submit the complaint.'); }
    finally { setSubmitting(false); }
  }

  if (referenceId) return <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-8 text-center" role="status"><h2 className="font-serif text-2xl font-bold">Complaint submitted</h2><p className="mt-3 text-sm">Keep this Complaint Reference ID for tracking.</p><strong className="mt-3 block font-mono text-2xl text-emerald-800">{referenceId}</strong><Link className="mt-5 inline-block rounded-xl bg-orange-900 px-5 py-2.5 font-semibold text-white" href="/tracking?type=service">Track Service Request</Link></div>;

  return <form className="grid gap-6" onSubmit={submit}>
    
    <section className={section}><h2 className="font-serif text-xl font-bold">1. Complainant Details</h2><div className="grid gap-4 sm:grid-cols-3"><label className={label}>First Name *<input className={field} name="firstName" placeholder="Enter first name" required /></label><label className={label}>Middle Name<input className={field} name="middleName" placeholder="Enter middle name" /></label><label className={label}>Last Name *<input className={field} name="lastName" placeholder="Enter last name" required /></label></div><div className="grid gap-4 sm:grid-cols-2"><label className={label}>Registered Mobile Number *<input className={field} name="mobile" type="tel" placeholder="Enter registered mobile number" required /></label><label className={label}>WhatsApp Number<input className={field} name="whatsapp" type="tel" placeholder="Enter WhatsApp number" /></label><label className={label}>Email Address *<input className={field} name="email" type="email" placeholder="Enter email address" required /></label><label className={label}>Preferred Contact Method *<select className={field} name="preferredContactMethod" required defaultValue=""><option value="" disabled>Select method</option><option>Mobile</option><option>Email</option><option>WhatsApp</option></select></label></div></section>
    <section className={section}>
      <h2 className="font-serif text-xl font-bold">2. Complaint Reference</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className={label}>
          Reference Type *
          <select className={field} required value={referenceType} onChange={(event) => setReferenceType(event.target.value)}>
            <option value="" disabled>Select reference type</option>
            <option>Service Request ID</option>
            <option>Booking / Payment Reference</option>
            <option value="Partner Registration ID">Priest Registration ID</option>
            <option>Inquiry Reference</option>
            <option>No Existing Reference</option>
          </select>
        </label>

        {referenceType && referenceType !== 'No Existing Reference' ? (
          <label className={label}>
            Reference ID *
            <input className={`${field} font-mono`} name="existingReferenceId" placeholder="Enter reference ID" required />
          </label>
        ) : (
          <div />
        )}

        <label className={label}>
          Complaint Date
          <input className={field} name="filingDate" type="date" />
        </label>
      </div>
    </section>
    <section className={section}><h2 className="font-serif text-xl font-bold">3. Complaint Category</h2><label className={label}>Complaint Related To *<select className={field} name="category" required defaultValue=""><option value="" disabled>Select category</option>{['PitruMoksha Gaya','Ritual Services','Travel Assistance','Vahi Records','Religious Partner / Service Provider','Booking / Scheduling','Payment / Refund','Website / Technical Issue','Customer Support','Privacy / Personal Information','Other'].map((item) => <option key={item} value={item}>{priestTerminology(item)}</option>)}</select></label></section>
    <section className={section}><h2 className="font-serif text-xl font-bold">4. Complaint Details</h2><label className={label}>Complaint Subject *<input className={field} name="subject" placeholder="Enter complaint subject" required /></label><div className="grid gap-4 sm:grid-cols-2"><label className={label}>Date of Issue / Incident *<input className={field} name="issueDate" type="date" required /></label><label className={label}>Service / Ritual Concerned<input className={field} name="serviceConcerned" placeholder="Enter service / ritual, if applicable" /></label><label className={label}>Location Concerned<input className={field} name="locationConcerned" placeholder="Enter location, if applicable" /></label></div><label className={label}>Describe the Complaint *<textarea className={field} name="description" rows={5} placeholder="Describe the complaint in detail" required maxLength={1000} /></label><label className={label}>Resolution Requested *<textarea className={field} name="resolutionRequested" rows={3} placeholder="Describe the resolution requested" required maxLength={1000} /></label></section>
    <section className={section}><h2 className="font-serif text-xl font-bold">5. Previous Communication</h2><label className={label}>Have you already contacted us regarding this issue?<select className={field} value={contacted} onChange={(event) => setContacted(event.target.value)}><option value="">Select option</option><option>Yes</option><option>No</option></select></label>{contacted === 'Yes' ? <div className="grid gap-4 sm:grid-cols-2"><label className={label}>Previous Inquiry / Complaint Reference<input className={field} name="previousReference" placeholder="Enter previous reference ID" /></label><label className={label}>Approximate Contact Date<input className={field} name="previousContactDate" type="date" /></label><label className={label}>Contact Channel<select className={field} name="previousContactChannel" defaultValue=""><option value="">Select channel</option>{['Email','WhatsApp','Raise Inquiry','Phone','Other'].map((item) => <option key={item} value={item}>{priestTerminology(item)}</option>)}</select></label></div> : null}</section>
    <section className={section}><h2 className="font-serif text-xl font-bold">6. Supporting Evidence</h2><div className="grid gap-4 sm:grid-cols-2"><label className={label}>Supporting Document / Image<input className={field} type="file" disabled /></label><label className={label}>Additional Supporting Document<input className={field} type="file" disabled /></label></div><p className="text-xs text-stone-500">File-storage integration is not currently available.</p><label className={label}>Additional Reference / Notes<textarea className={field} name="supportingNotes" rows={3} placeholder="Add relevant notes, if applicable" maxLength={1000} /></label></section>
    <section className={section}><h2 className="font-serif text-xl font-bold">7. Follow-up Preference</h2><p className="text-sm text-stone-600">The preferred contact method selected above will be used for follow-up.</p><label className={label}>Preferred Contact Time<input className={field} name="preferredContactTime" placeholder="Enter preferred contact time" /></label><label className={label}>Additional Contact Instructions<textarea className={field} name="contactInstructions" rows={3} placeholder="Add contact instructions, if applicable" maxLength={1000} /></label></section>
    <section className={section}><h2 className="font-serif text-xl font-bold">8. Declaration &amp; Consent</h2><label className="flex gap-3 text-sm"><input name="accuracy" type="checkbox" required />I confirm that the information provided in this complaint is accurate to the best of my knowledge. *</label><label className="flex gap-3 text-sm"><input name="reviewConsent" type="checkbox" required />I consent to Connect Hub Co. reviewing the information and supporting material submitted for the purpose of investigating and responding to this complaint. *</label><label className="flex gap-3 text-sm"><input name="policyConsent" type="checkbox" required />I agree to the <Link className="font-semibold text-orange-900 underline" href="/privacy-policy">Privacy Policy</Link> and applicable <Link className="font-semibold text-orange-900 underline" href="/terms">Terms &amp; Conditions</Link>. *</label></section>
    {error ? <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</p> : null}
    <label className="flex gap-3 rounded-xl border border-stone-300 p-4 text-sm"><input name="outcomeAcknowledgement" type="checkbox" required />I understand that if I submit incorrect information, the Company does not guarantee a particular resolution, refund, compensation, disciplinary action, or other requested outcome. *</label>
    <button className="rounded-xl bg-orange-900 px-6 py-3 font-semibold text-white disabled:opacity-50" disabled={submitting} type="submit">{submitting ? 'Submitting Complaint...' : 'Submit Complaint'}</button>
  </form>;
}
