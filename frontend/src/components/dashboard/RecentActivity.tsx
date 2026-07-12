"use client";

export default function RecentActivity() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-semibold">
        Recent Activity
      </h2>

      <div className="rounded-lg border border-dashed border-gray-300 p-10 text-center text-gray-500">
        No recent activity available.
      </div>

    </div>
  );
}