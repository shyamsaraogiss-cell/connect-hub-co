"use client";

export default function CustomerFilters() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <div className="grid gap-4 md:grid-cols-3">

        <input
          className="rounded-lg border p-3"
          placeholder="Search customer..."
        />

        <select className="rounded-lg border p-3">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <select className="rounded-lg border p-3">
          <option>All Services</option>
          <option>PitruMoksha</option>
          <option>Ritual Service</option>
          <option>Travel Assistance</option>
        </select>

      </div>

    </div>
  );
}