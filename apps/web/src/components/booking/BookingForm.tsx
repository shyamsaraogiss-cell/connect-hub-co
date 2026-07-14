"use client";
import { useEffect, useState } from "react";
import { getCustomers } from "@/services/customer.api";
import { getPartners } from "@/services/partner.api";
import { BookingInput, BookingStatus } from "@/types/booking";
import { Customer } from "@/types/customer";
import { ReligiousPartner } from "@/types/partner";
interface Props { initialValue?: BookingInput; onSubmit: (value: BookingInput) => Promise<void>; label: string; }

const transitions: Record<BookingStatus, BookingStatus[]> = {
  PENDING: ["PENDING", "CONFIRMED", "CANCELLED"],
  CONFIRMED: ["CONFIRMED", "COMPLETED", "CANCELLED"],
  COMPLETED: ["COMPLETED"],
  CANCELLED: ["CANCELLED"],
};

export default function BookingForm({ initialValue, onSubmit, label }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [partners, setPartners] = useState<ReligiousPartner[]>([]);
  const [form, setForm] = useState<BookingInput>(initialValue ?? { customerId: "", religiousPartnerId: "", serviceName: "", scheduledAt: "", notes: "" });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void Promise.all([getCustomers(), getPartners()])
      .then(([customerOptions, partnerOptions]) => {
        setCustomers(customerOptions);
        setPartners(partnerOptions.filter((partner) => partner.active || partner.id === initialValue?.religiousPartnerId));
      })
      .catch((reason) => setError(reason instanceof Error ? reason.message : "Unable to load booking options."));
  }, [initialValue?.religiousPartnerId]);

  function change(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((value) => ({ ...value, [event.target.name]: event.target.value }));
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSaving(true);
    try { await onSubmit(form); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to save booking."); }
    finally { setSaving(false); }
  }

  return <form onSubmit={submit} className="mt-6 grid max-w-xl gap-4">
    {error ? <p className="text-red-700" role="alert">{error}</p> : null}
    <label>Customer<select className="block w-full border p-2" name="customerId" value={form.customerId} onChange={change} required><option value="">Select customer</option>{customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}</select></label>
    <label>Religious partner<select className="block w-full border p-2" name="religiousPartnerId" value={form.religiousPartnerId} onChange={change} required><option value="">Select religious partner</option>{partners.map((partner) => <option key={partner.id} value={partner.id}>{partner.name}</option>)}</select></label>
    <label>Service<input className="block w-full border p-2" name="serviceName" value={form.serviceName} onChange={change} required /></label>
    <label>Scheduled at<input className="block w-full border p-2" type="datetime-local" name="scheduledAt" value={form.scheduledAt.slice(0, 16)} onChange={change} required /></label>
    <label>Notes<textarea className="block w-full border p-2" name="notes" value={form.notes ?? ""} onChange={change} /></label>
    {initialValue?.status ? <label>Status<select className="block w-full border p-2" name="status" value={form.status} onChange={change}>{transitions[initialValue.status].map((value) => <option key={value} value={value}>{value}</option>)}</select></label> : null}
    <button className="w-fit rounded bg-blue-700 px-4 py-2 text-white disabled:opacity-50" disabled={saving} type="submit">{saving ? "Saving..." : label}</button>
  </form>;
}
