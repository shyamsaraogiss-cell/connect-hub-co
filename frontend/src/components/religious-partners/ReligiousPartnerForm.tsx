"use client";

import { useState } from "react";
import { createReligiousPartner } from "@/lib/religiousPartner";
import { ReligiousPartner } from "@/types/religiousPartner";

interface Props {
  onSaved: () => void;
}

const initialForm: ReligiousPartner = {
  fullName: "",
  category: "",
  mobile: "",
  whatsapp: "",
  email: "",
  city: "",
  state: "",
  country: "India",

  preferredServiceArea: "",

  onlineAvailable: true,
  offlineAvailable: true,
  relocationAvailable: false,

  identityVerified: false,
  addressVerified: false,
  qualificationVerified: false,

  verificationDate: "",

  status: "Active",

  remarks: "",
};

export default function ReligiousPartnerForm({
  onSaved,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<ReligiousPartner>(initialForm);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const result = await createReligiousPartner(form);

    if (result.success) {
      alert("Religious Partner Saved");

      setForm(initialForm);

      onSaved();
    } else {
      alert(result.message ?? "Unable to save Religious Partner");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl bg-white p-6 shadow"
    >
      <h2 className="text-2xl font-bold">
        New Religious Partner
      </h2>

      <input
        className="w-full rounded border p-3"
        placeholder="Full Name"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        required
      />

      <select
        className="w-full rounded border p-3"
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      >
        <option value="">Category</option>
        <option>Panda</option>
        <option>Pandit ji</option>
        <option>Arya Samaj Pandit ji</option>
        <option>Imam Saheb</option>
        <option>Granthi</option>
        <option>Pastor</option>
        <option>Monk</option>
        <option>Others</option>
      </select>

      <input
        className="w-full rounded border p-3"
        placeholder="Mobile"
        name="mobile"
        value={form.mobile}
        onChange={handleChange}
        required
      />

      <input
        className="w-full rounded border p-3"
        placeholder="WhatsApp"
        name="whatsapp"
        value={form.whatsapp ?? ""}
        onChange={handleChange}
      />

      <input
        className="w-full rounded border p-3"
        placeholder="Email"
        name="email"
        value={form.email ?? ""}
        onChange={handleChange}
      />

      <input
        className="w-full rounded border p-3"
        placeholder="City"
        name="city"
        value={form.city ?? ""}
        onChange={handleChange}
      />

      <input
        className="w-full rounded border p-3"
        placeholder="State"
        name="state"
        value={form.state ?? ""}
        onChange={handleChange}
      />

      <input
        className="w-full rounded border p-3"
        placeholder="Preferred Service Area"
        name="preferredServiceArea"
        value={form.preferredServiceArea ?? ""}
        onChange={handleChange}
      />

      <textarea
        rows={4}
        className="w-full rounded border p-3"
        placeholder="Remarks"
        name="remarks"
        value={form.remarks ?? ""}
        onChange={handleChange}
      />

      <button
        disabled={loading}
        className="rounded bg-blue-600 px-6 py-3 text-white"
      >
        {loading
          ? "Saving..."
          : "Save Religious Partner"}
      </button>
    </form>
  );
}