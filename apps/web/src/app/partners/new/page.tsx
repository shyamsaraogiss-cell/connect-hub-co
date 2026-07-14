"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPartner } from "@/services/partner.api";
import { ReligiousPartnerInput } from "@/types/partner";

export default function NewPartnerPage() {
  const router = useRouter();

  const [form, setForm] = useState<ReligiousPartnerInput>({
    name: "",
    partnerType: "PANDIT",
    organization: "",
    email: "",
    phone: "",
    city: "",
    country: "India",
    verified: false,
    active: true,
  });

  const [saving, setSaving] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    try {
      await createPartner(form);

      router.push("/partners");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Unable to save partner.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">

        <h1 className="mb-8 text-3xl font-bold">
          Register Religious Partner
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            className="w-full rounded border p-3"
            name="name"
            placeholder="Partner Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <select
            className="w-full rounded border p-3"
            name="partnerType"
            value={form.partnerType}
            onChange={handleChange}
          >
            <option value="PANDIT">Pandit</option>
            <option value="TEMPLE">Temple</option>
            <option value="ORGANIZATION">Organization</option>
          </select>

          <input
            className="w-full rounded border p-3"
            name="organization"
            placeholder="Organization"
            value={form.organization ?? ""}
            onChange={handleChange}
          />

          <input
            className="w-full rounded border p-3"
            name="email"
            placeholder="Email"
            value={form.email ?? ""}
            onChange={handleChange}
          />

          <input
            className="w-full rounded border p-3"
            name="phone"
            placeholder="Phone"
            value={form.phone ?? ""}
            onChange={handleChange}
          />

          <input
            className="w-full rounded border p-3"
            name="city"
            placeholder="City"
            value={form.city ?? ""}
            onChange={handleChange}
          />

          <input
            className="w-full rounded border p-3"
            name="country"
            placeholder="Country"
            value={form.country ?? ""}
            onChange={handleChange}
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="verified"
              checked={form.verified}
              onChange={handleChange}
            />
            Verified
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
            />
            Active
          </label>

          <button
            type="submit"
            disabled={saving}
            className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Partner"}
          </button>

        </form>
      </div>
    </main>
  );
}
