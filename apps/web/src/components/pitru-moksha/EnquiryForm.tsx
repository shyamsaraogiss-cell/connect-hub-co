"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { submitPitruMokshaRequest } from "@/services/pitru-moksha.api";
import { PitruMokshaInput } from "@/types/pitru-moksha";

const initial: PitruMokshaInput = { name: "", email: "", phone: "", country: "India", city: "", isNRI: false, packageCode: "COMPLETE", preferredDate: "", preferredDateEnd: "", pilgrimCount: 1, pilgrimNames: "", ancestorNames: "", gotra: "", relationToAncestors: "", contactPreference: "WHATSAPP", travelSupport: false, accommodationSupport: false, arrivalDetails: "", specialRequirements: "" };
const field = "mt-1 w-full rounded-xl border border-amber-200 bg-white p-3 text-stone-900 outline-none focus:border-orange-600";

export function EnquiryForm() {
  const router = useRouter(); const [form, setForm] = useState(initial); const [error, setError] = useState<string | null>(null); const [saving, setSaving] = useState(false);
  function change(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) { const target = event.target; setForm((value) => ({ ...value, [target.name]: target instanceof HTMLInputElement && target.type === "checkbox" ? target.checked : target.name === "pilgrimCount" ? Number(target.value) : target.value })); }
  async function submit(event: FormEvent) { event.preventDefault(); setError(null); setSaving(true); try { const result = await submitPitruMokshaRequest({ ...form, preferredDate: `${form.preferredDate}T09:00:00.000Z`, preferredDateEnd: form.preferredDateEnd ? `${form.preferredDateEnd}T09:00:00.000Z` : "" }); router.push(`/pitru-moksha/success?request=${encodeURIComponent(result.requestId)}`); } catch (reason) { setError(reason instanceof Error ? reason.message : "We could not submit your request. Please try again."); } finally { setSaving(false); } }
  return <form id="enquiry" onSubmit={submit} className="mx-auto max-w-4xl rounded-3xl bg-amber-50 p-5 shadow-xl sm:p-10">
    <h2 className="text-3xl font-bold text-stone-900">Plan your Gaya seva</h2><p className="mt-2 text-stone-600">Share the details our pilgrimage coordinator needs. Your information is kept private.</p>
    {error ? <p className="mt-5 rounded-lg bg-red-50 p-3 text-red-700" role="alert">{error}</p> : null}
    <div className="mt-7 grid gap-5 sm:grid-cols-2">
      <label>Full name *<input className={field} name="name" value={form.name} onChange={change} maxLength={120} required /></label><label>Phone / WhatsApp *<input className={field} name="phone" value={form.phone} onChange={change} maxLength={40} required /></label>
      <label>Email<input className={field} type="email" name="email" value={form.email} onChange={change} /></label><label>Preferred contact<select className={field} name="contactPreference" value={form.contactPreference} onChange={change}><option value="WHATSAPP">WhatsApp</option><option value="PHONE">Phone</option><option value="EMAIL">Email</option></select></label>
      <label>Country *<input className={field} name="country" value={form.country} onChange={change} required /></label><label>City<input className={field} name="city" value={form.city} onChange={change} /></label>
      <label className="flex items-center gap-2 sm:col-span-2"><input type="checkbox" name="isNRI" checked={form.isNRI} onChange={change} /> I live outside India / need NRI coordination</label>
      <label>Seva package<select className={field} name="packageCode" value={form.packageCode} onChange={change}><option value="ESSENTIAL">Essential Pind Daan</option><option value="COMPLETE">Complete Pitru Moksha Seva</option><option value="FAMILY">Family & NRI Assisted Seva</option></select></label><label>Number of pilgrims *<input className={field} type="number" min={1} max={50} name="pilgrimCount" value={form.pilgrimCount} onChange={change} required /></label>
      <label>Preferred ritual date *<input className={field} type="date" name="preferredDate" value={form.preferredDate} onChange={change} required /></label><label>Alternative / end date<input className={field} type="date" name="preferredDateEnd" value={form.preferredDateEnd} onChange={change} /></label>
      <label className="sm:col-span-2">Ancestor name(s) / details *<textarea className={field} name="ancestorNames" value={form.ancestorNames} onChange={change} rows={3} required /></label><label>Gotra, if known<input className={field} name="gotra" value={form.gotra} onChange={change} /></label><label>Relationship to ancestor(s)<input className={field} name="relationToAncestors" value={form.relationToAncestors} onChange={change} /></label>
      <label className="sm:col-span-2">Names of travelling pilgrims<textarea className={field} name="pilgrimNames" value={form.pilgrimNames} onChange={change} rows={2} /></label>
      <label className="flex items-center gap-2"><input type="checkbox" name="travelSupport" checked={form.travelSupport} onChange={change} /> Need arrival / local travel support</label><label className="flex items-center gap-2"><input type="checkbox" name="accommodationSupport" checked={form.accommodationSupport} onChange={change} /> Need accommodation guidance</label>
      <label className="sm:col-span-2">Arrival or travel details<textarea className={field} name="arrivalDetails" value={form.arrivalDetails} onChange={change} rows={2} /></label><label className="sm:col-span-2">Special requirements<textarea className={field} name="specialRequirements" value={form.specialRequirements} onChange={change} rows={3} /></label>
    </div><button className="mt-7 w-full rounded-xl bg-orange-700 px-6 py-4 font-semibold text-white disabled:opacity-60" disabled={saving}>{saving ? "Submitting securely..." : "Request a consultation"}</button>
  </form>;
}
