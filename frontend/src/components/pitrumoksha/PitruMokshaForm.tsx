"use client";

import { useState } from "react";
import { createPitruRequest } from "../../lib/pitrumoksha";
import { PitruMokshaRequest } from "../../types/pitrumoksha";

export default function PitruMokshaForm() {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<PitruMokshaRequest>({
    customerName: "",
    mobile: "",
    whatsapp: "",
    email: "",
    country: "India",
    state: "",
    city: "",
    serviceMode: "Offline",
    ritualType: "",
    preferredDate: "",
    preferredTime: "",
    language: "",
    samagriRequired: false,
    documentationRequired: false,
    travelAssistance: false,
    specialRequirements: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) {

    const target = e.target;

    const value =
      target instanceof HTMLInputElement &&
      target.type === "checkbox"
        ? target.checked
        : target.value;

    setForm({
      ...form,
      [target.name]: value,
    });

  }

  async function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setLoading(true);

    try {

      const result =
        await createPitruRequest(form);

      if (result.success) {

        alert("PitruMoksha Request Created Successfully");

      } else {

        alert(result.message);

      }

    } catch {

      alert("Server Error");

    }

    setLoading(false);

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-xl bg-white p-6 shadow"
    >

      <h2 className="text-2xl font-bold">
        PitruMoksha Request
      </h2>

      <input
        name="customerName"
        placeholder="Customer Name"
        className="w-full rounded border p-3"
        value={form.customerName}
        onChange={handleChange}
        required
      />

      <input
        name="mobile"
        placeholder="Mobile"
        className="w-full rounded border p-3"
        value={form.mobile}
        onChange={handleChange}
        required
      />

      <select
        name="serviceMode"
        className="w-full rounded border p-3"
        value={form.serviceMode}
        onChange={handleChange}
      >
        <option>Online</option>
        <option>Offline</option>
      </select>

      <input
        name="ritualType"
        placeholder="Ritual Type"
        className="w-full rounded border p-3"
        value={form.ritualType}
        onChange={handleChange}
        required
      />

      <button
        disabled={loading}
        className="rounded bg-blue-600 px-6 py-3 text-white"
      >
        {loading ? "Saving..." : "Save Request"}
      </button>

    </form>

  );

}