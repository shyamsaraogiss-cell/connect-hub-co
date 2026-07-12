"use client";

export default function DashboardActions() {
  const actions = [
    "New Booking",
    "Register Religious Partner",
    "Travel Request",
    "Customer Search",
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        {actions.map((action) => (
          <button
            key={action}
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            {action}
          </button>
        ))}

      </div>

    </div>
  );
}