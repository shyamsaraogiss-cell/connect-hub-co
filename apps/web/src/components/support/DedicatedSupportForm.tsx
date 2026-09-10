"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { verifyUniversalReferenceOwnership } from "@/services/urms.api";

type Workflow = "complaint" | "founder-support";
const fieldClass = "mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-orange-600";

const workflowCopy = {
  complaint: {
    requestType: "COMPLAINT",
    categoryLabel: "Complaint Category",
    categoryPlaceholder: "Select complaint category...",
    categories: [["service-quality", "Service Quality"], ["travel-logistics", "Travel or Logistics"], ["partner-conduct", "Verified Priest or Staff Conduct"], ["billing-scope", "Billing or Service Scope"], ["other", "Other"]],
    detailsLabel: "Complaint Details",
    detailsPlaceholder: "Describe the complaint, including relevant dates and context.",
    submitLabel: "Submit Complaint",
    submittingLabel: "Submitting Complaint...",
    successTitle: "Complaint submitted",
    referenceLabel: "Complaint Reference ID",
    anotherLabel: "Submit another complaint",
  },
  "founder-support": {
    requestType: "FOUNDER_SUPPORT",
    categoryLabel: "Reason for Founder Escalation",
    categoryPlaceholder: "Select an escalation reason...",
    categories: [["unresolved-issue", "Unresolved Issue"], ["sensitive-matter", "Sensitive Matter"], ["partner-concern", "Verified Priest Concern"], ["service-concern", "Service Concern"], ["other", "Other"]],
    detailsLabel: "Issue / Details",
    detailsPlaceholder: "Describe the issue and why you are requesting Founder Support.",
    submitLabel: "Submit Founder Support Request",
    submittingLabel: "Submitting Founder Support Request...",
    successTitle: "Founder Support request submitted",
    referenceLabel: "Founder Support Reference ID",
    anotherLabel: "Submit another Founder Support request",
  },
} as const;

export function DedicatedSupportForm({ workflow }: { workflow: Workflow }) {
  const copy = workflowCopy[workflow];
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    const evidence = data.get("evidence");
    const category = String(data.get("category") || "").trim();
    const details = String(data.get("details") || "").trim();
    const serviceReferenceId = String(data.get("serviceReferenceId") || "").trim();

    try {
      if (workflow === "founder-support") {
        const verified = await verifyUniversalReferenceOwnership(serviceReferenceId, [String(data.get("email") || ""), String(data.get("phone") || "")], ["SERVICE_REQUEST", "BOOKING"]);
        if (!verified) { setError("The Service or Booking Reference ID could not be verified against the registered email or mobile number."); return; }
      }
      const result = await api<{ referenceId: string }>("/urms/universal-requests/public", {
        method: "POST",
        body: JSON.stringify({
          requestType: copy.requestType,
          serviceDomain: workflow,
          guestName: String(data.get("name") || "").trim(),
          guestEmail: String(data.get("email") || "").trim(),
          guestPhone: String(data.get("phone") || "").trim(),
          title: `${workflow === "complaint" ? "Complaint" : "Founder Support"}: ${category}`,
          description: details,
          assignedTeam: workflow === "complaint" ? "Support" : "Founder",
          sourceChannel: "WEBSITE_FORM",
          metadata: {
            category,
            originatingReferenceId: serviceReferenceId.toUpperCase() || undefined,
            preferredContactMethod: String(data.get("preferredContactMethod") || ""),
            consent: data.get("consent") === "on",
            evidence: evidence instanceof File && evidence.size > 0 ? { name: evidence.name, type: evidence.type, size: evidence.size, storagePending: true } : undefined,
          },
        }),
      });
      setReferenceId(result.referenceId);
      form.reset();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to submit this request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (referenceId) {
    return <div className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50 p-8 text-center" role="status">
      <h2 className="font-serif text-2xl font-bold text-stone-950">{copy.successTitle}</h2>
      <p className="mt-3 text-sm text-stone-700">Your submission has been recorded. Keep this reference ID for your records.</p>
      <div className="mx-auto mt-4 inline-block rounded-xl border border-emerald-200 bg-white p-4"><span className="block text-xs font-semibold uppercase tracking-widest text-stone-500">{copy.referenceLabel}</span><strong className="mt-1 block font-mono text-2xl tracking-wider text-emerald-800">{referenceId}</strong></div>
      <div className="mt-5 flex flex-wrap justify-center gap-3"><Link href="/tracking" className="rounded-xl bg-orange-900 px-5 py-2.5 text-sm font-semibold text-white">Track reference</Link><button type="button" onClick={() => setReferenceId(null)} className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-700">{copy.anotherLabel}</button></div>
    </div>;
  }

  return <form className="mt-6 grid gap-4" onSubmit={submit}>
    {error ? <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</p> : null}
    <div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Name *<input className={fieldClass} name="name" type="text" required /></label><label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Email *<input className={fieldClass} name="email" type="email" required /></label></div>
    <div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Phone *<input className={fieldClass} name="phone" type="tel" required /></label><label className="text-xs font-semibold uppercase tracking-wider text-stone-700">{workflow === "founder-support" ? "Service Request ID *" : "Service / Reference ID (optional)"}<input className={`${fieldClass} font-mono`} name="serviceReferenceId" type="text" placeholder={workflow === "founder-support" ? "Enter Service / Booking Reference ID" : undefined} required={workflow === "founder-support"} /></label></div>
    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">{copy.categoryLabel} *<select className={fieldClass} name="category" required defaultValue=""><option value="" disabled>{copy.categoryPlaceholder}</option>{copy.categories.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">{copy.detailsLabel} *<textarea className={fieldClass} name="details" rows={5} required placeholder={copy.detailsPlaceholder} maxLength={1000} /></label>
    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Supporting Document / Evidence (optional)<input className={`${fieldClass} file:mr-4 file:rounded-lg file:border-0 file:bg-orange-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-orange-900`} name="evidence" type="file" accept=".pdf,.png,.jpg,.jpeg" /><span className="mt-1 block text-[11px] font-normal normal-case tracking-normal text-stone-500">PDF, PNG, or JPG.</span><span className="mt-1 block text-[11px] font-semibold normal-case tracking-normal text-orange-800">File-storage integration is not currently available.</span></label>
    <fieldset><legend className="text-xs font-semibold uppercase tracking-wider text-stone-700">Preferred Contact Method *</legend><div className="mt-2 flex flex-wrap gap-4 text-sm"><label className="flex items-center gap-2"><input type="radio" name="preferredContactMethod" value="email" required /> Email</label><label className="flex items-center gap-2"><input type="radio" name="preferredContactMethod" value="phone" /> Phone</label><label className="flex items-center gap-2"><input type="radio" name="preferredContactMethod" value="whatsapp" /> WhatsApp</label></div></fieldset>
    <label className="flex items-start gap-2 text-xs text-stone-600"><input className="mt-1" name="consent" type="checkbox" required />I acknowledge the Privacy Policy and consent to the use of these details to review and respond to this submission.</label>
    <button className="mt-2 rounded-xl bg-orange-900 px-6 py-3 font-semibold text-white transition hover:bg-black disabled:opacity-50" type="submit" disabled={submitting}>{submitting ? copy.submittingLabel : copy.submitLabel}</button>
  </form>;
}
