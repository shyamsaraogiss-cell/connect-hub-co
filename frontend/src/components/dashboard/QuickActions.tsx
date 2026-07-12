"use client";

export default function QuickActions() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="flex flex-wrap gap-4">

        <button className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
          New Booking
        </button>

        <button className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700">
          Add Religious Partner
        </button>

        <button className="rounded-lg bg-purple-600 px-6 py-3 text-white hover:bg-purple-700">
          View Customers
        </button>

      </div>

    </div>
  );
}