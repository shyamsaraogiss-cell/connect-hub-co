"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import { ReligiousPartnerInput } from "@/types/partner";

interface PartnerFormProps {
  initialValue?: ReligiousPartnerInput;
  submitLabel: string;
  onSubmit: (partner: ReligiousPartnerInput) => Promise<void>;
}

const defaultPartner: ReligiousPartnerInput = {
  name: "", partnerType: "PANDIT", organization: "", email: "", phone: "", city: "", country: "India", verified: false, active: true,
};

export default function PartnerForm({ initialValue, submitLabel, onSubmit }: PartnerFormProps) {
  const [form, setForm] = useState<ReligiousPartnerInput>(initialValue ?? defaultPartner);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function change(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? (event.target as HTMLInputElement).checked : value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSubmit(form);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to save partner.");
    } finally {
      setLoading(false);
    }
  }

  return <form onSubmit={submit} className="space-y-4">
    {error ? <p role="alert" className="rounded border border-red-200 bg-red-50 p-3 text-red-700">{error}</p> : null}
    <input name="name" placeholder="Partner Name" className="w-full rounded border p-3" onChange={change} value={form.name} required />
    <select name="partnerType" className="w-full rounded border p-3" onChange={change} value={form.partnerType}>
      <option value="PANDIT">Pandit</option><option value="TEMPLE">Temple</option><option value="ORGANIZATION">Organization</option>
    </select>
    <input name="organization" placeholder="Organization" className="w-full rounded border p-3" onChange={change} value={form.organization ?? ""} />
    <input type="email" name="email" placeholder="Email" className="w-full rounded border p-3" onChange={change} value={form.email ?? ""} />
    <input name="phone" placeholder="Phone" className="w-full rounded border p-3" onChange={change} value={form.phone ?? ""} />
    <input name="city" placeholder="City" className="w-full rounded border p-3" onChange={change} value={form.city ?? ""} />
    <input name="country" placeholder="Country" className="w-full rounded border p-3" onChange={change} value={form.country ?? ""} />
    <label className="flex gap-3"><input type="checkbox" name="verified" checked={form.verified} onChange={change} />Verified</label>
    <label className="flex gap-3"><input type="checkbox" name="active" checked={form.active} onChange={change} />Active</label>
    <Button loading={loading}>{submitLabel}</Button>
  </form>;
}
