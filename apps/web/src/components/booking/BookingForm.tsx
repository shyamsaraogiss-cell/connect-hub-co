"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { createPublicBookingRequest } from "@/services/booking.api";
import { getCustomers } from "@/services/customer.api";
import { getPartners } from "@/services/partner.api";
import type { BookingInput, BookingStatus, PublicBookingInput } from "@/types/booking";
import type { Customer } from "@/types/customer";
import type { ReligiousPartner } from "@/types/partner";

interface Props { initialValue?: BookingInput; onSubmit: (value: BookingInput) => Promise<void>; label: string; }
const transitions: Record<BookingStatus, BookingStatus[]> = { PENDING: ["PENDING", "CONFIRMED", "CANCELLED"], CONFIRMED: ["CONFIRMED", "COMPLETED", "CANCELLED"], COMPLETED: ["COMPLETED"], CANCELLED: ["CANCELLED"] };

export default function BookingForm({ initialValue, onSubmit, label }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [partners, setPartners] = useState<ReligiousPartner[]>([]);
  const [form, setForm] = useState<BookingInput>(initialValue ?? { customerId: "", religiousPartnerId: "", serviceName: "", scheduledAt: "", notes: "" });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  useEffect(() => { void Promise.all([getCustomers(), getPartners()]).then(([c, p]) => { setCustomers(c); setPartners(p.filter(x => x.active || x.id === initialValue?.religiousPartnerId)); }).catch(e => setError(e instanceof Error ? e.message : "Unable to load booking options.")); }, [initialValue?.religiousPartnerId]);
  function change(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { setForm(v => ({ ...v, [e.target.name]: e.target.value })); }
  async function submit(e: FormEvent) { e.preventDefault(); setError(null); setSaving(true); try { await onSubmit(form); } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to save booking."); } finally { setSaving(false); } }
  return <form onSubmit={submit} className="mt-6 grid max-w-xl gap-4">{error ? <p className="text-red-700" role="alert">{error}</p> : null}<label>Customer<select className="block w-full border p-2" name="customerId" value={form.customerId} onChange={change} required><option value="">Select customer</option>{customers.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}</select></label><label>Religious partner<select className="block w-full border p-2" name="religiousPartnerId" value={form.religiousPartnerId} onChange={change} required><option value="">Select religious partner</option>{partners.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}</select></label><label>Service<input className="block w-full border p-2" name="serviceName" value={form.serviceName} onChange={change} required /></label><label>Scheduled at<input className="block w-full border p-2" type="datetime-local" name="scheduledAt" value={form.scheduledAt.slice(0, 16)} onChange={change} required /></label><label>Notes<textarea className="block w-full border p-2" name="notes" value={form.notes ?? ""} onChange={change} /></label>{initialValue?.status ? <label>Status<select className="block w-full border p-2" name="status" value={form.status} onChange={change}>{transitions[initialValue.status].map(x => <option key={x}>{x}</option>)}</select></label> : null}<button className="w-fit rounded bg-blue-700 px-4 py-2 text-white disabled:opacity-50" disabled={saving}>{saving ? "Saving..." : label}</button></form>;
}

const serviceTypes = [
  { value: "pitru-moksha", label: "PitruMoksha Gaya" },
  { value: "ritual-services", label: "Ritual Services" },
  { value: "travel-assistance", label: "Travel Assistance" },
  { value: "vahi-records", label: "Vahi Records" },
  { value: "customized-service", label: "Customized Service" },
  { value: "other", label: "Other / Not Sure" },
] as const;
type PublicBookingFormState = PublicBookingInput & { firstName: string; middleName: string; lastName: string };
const initial: PublicBookingFormState = { fullName: "", firstName: "", middleName: "", lastName: "", mobile: "", whatsappNumber: "", email: "", serviceId: "", serviceName: "", serviceCategory: "", participationFormat: "", preferredLocation: "", preferredDate: "", participants: 1, message: "", contactMethod: "WHATSAPP", consent: false };
const field = "mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-500 outline-none focus:border-orange-600 [&>option]:bg-white [&>option]:text-stone-900";

export function PublicBookingForm() {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  function change(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const t = e.target;
    if (t.name === "message" && t.value.trim().split(/\s+/).filter(Boolean).length > 200) return;
    if (t.name === "serviceId") { const selected = serviceTypes.find(x => x.value === t.value); setForm(v => ({ ...v, serviceId: t.value, serviceName: selected?.label ?? "" })); return; }
    const value = t instanceof HTMLInputElement && t.type === "checkbox" ? t.checked : t.name === "participants" ? Number(t.value) : t.value;
    setForm(v => ({ ...v, [t.name]: value }));
  }
  async function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setError(null); const fullName = [form.firstName, form.middleName, form.lastName].map(part => part.trim()).filter(Boolean).join(" "); if (!form.firstName.trim() || !form.lastName.trim() || !form.mobile.trim() || !form.email.trim() || !form.serviceId || !form.serviceCategory.trim() || !form.participationFormat || !form.preferredLocation.trim() || !form.preferredDate || form.participants < 1 || !form.consent) { setError("Complete all required fields and provide consent before submitting."); return; } setSubmitting(true); try { const result = await createPublicBookingRequest({ ...form, fullName }); setReferenceId(result.referenceId); } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to submit the booking request."); } finally { setSubmitting(false); } }
  if (referenceId) return <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-8 text-center" role="status"><h3 className="text-2xl font-bold">Booking request submitted</h3><p className="mt-3">Keep this Universal Reference ID to track your request.</p><strong className="mt-3 block font-mono text-2xl text-emerald-800">{referenceId}</strong><div className="mt-5 flex justify-center gap-3"><Link className="rounded-xl bg-orange-900 px-5 py-2.5 text-white" href="/tracking">Track request</Link><button className="rounded-xl border bg-white px-5 py-2.5" type="button" onClick={() => { setForm(initial); setReferenceId(null); }}>Submit another</button></div></div>;
  return <form className="grid gap-4" onSubmit={submit}>
    {error ? <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{error}</p> : null}
    <div className="grid gap-4 sm:grid-cols-3">
      <label>First Name *<input className={field} name="firstName" value={form.firstName} onChange={change} placeholder="First name" required /></label>
      <label>Middle Name<input className={field} name="middleName" value={form.middleName} onChange={change} placeholder="Middle name" /></label>
      <label>Last Name *<input className={field} name="lastName" value={form.lastName} onChange={change} placeholder="Last name" required /></label>
    </div>
    <div className="grid gap-4 sm:grid-cols-3">
      <label>Registered Mobile Number *<input className={field} type="tel" name="mobile" value={form.mobile} onChange={change} placeholder="+91 9876543210" required /></label>
      <label>WhatsApp Number<input className={field} type="tel" name="whatsappNumber" value={form.whatsappNumber} onChange={change} placeholder="+91 9876543210" /></label>
      <label>Email Address *<input className={field} type="email" name="email" value={form.email} onChange={change} placeholder="name@example.com" required /></label>
    </div>
    <div className="grid gap-4 sm:grid-cols-3">
      <label>Service *<select aria-label="Service" className={field} name="serviceId" value={form.serviceId} onChange={change} required><option value="">Select a service</option>{serviceTypes.map(x => <option key={x.value} value={x.value}>{x.label}</option>)}</select></label>
      <label>Service Category *<input aria-label="Service Category" className={field} name="serviceCategory" value={form.serviceCategory} onChange={change} placeholder="e.g. Griha Pravesh / Pind Daan" required /></label>
      <label>Participation Format *<select aria-label="Participation Format" className={field} name="participationFormat" value={form.participationFormat} onChange={change} required><option value="">Select a participation format</option><option value="ONLINE_REMOTE">Online / Remote Live</option><option value="OFFLINE_ON_SITE">Offline / On-Site In-Person</option><option value="HYBRID">Hybrid / Travel &amp; Ritual</option><option value="TO_BE_GUIDED">Not Sure / Please Guide Me</option></select></label>
    </div>
    <div className="grid gap-4 sm:grid-cols-3"><label>Preferred Location *<input className={field} name="preferredLocation" value={form.preferredLocation} onChange={change} placeholder="Gaya, Home City, Destination..." required /></label><label>Preferred Date *<input className={field} type="date" name="preferredDate" min={new Date().toISOString().slice(0, 10)} value={form.preferredDate} onChange={change} required /></label><label>Participants *<input className={field} type="number" min={1} name="participants" value={form.participants} onChange={change} required /></label></div>
    <label>Message / Requirements<textarea className={field} rows={3} name="message" value={form.message} onChange={change} maxLength={1000} /></label>
    <fieldset><legend className="font-medium">Preferred Contact Method *</legend><div className="mt-2 flex flex-wrap gap-4">{[["WHATSAPP", "WhatsApp"], ["EMAIL", "Email"], ["PHONE", "Phone Call"]].map(([value, label]) => <label className="flex items-center gap-2" key={value}><input type="radio" name="contactMethod" value={value} checked={form.contactMethod === value} onChange={change} required />{label}</label>)}</div></fieldset>
    <label className="flex items-start gap-2"><input className="mt-1" type="checkbox" name="consent" checked={form.consent} onChange={change} required /><span className="text-sm text-stone-600">I consent to Connect Hub Co. reviewing this request and contacting me under the Privacy Policy and Booking Terms.</span></label>
    <button className="rounded-xl bg-orange-900 px-6 py-3 font-semibold text-white disabled:opacity-50" disabled={submitting}>{submitting ? "Submitting Request..." : "Submit Service Booking Request"}</button>
  </form>;
}
