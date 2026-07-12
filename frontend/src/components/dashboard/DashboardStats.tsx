"use client";

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-700">
          Total Customers
        </h2>

        <p className="mt-4 text-4xl font-bold text-blue-600">
          0
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-700">
          Religious Partners
        </h2>

        <p className="mt-4 text-4xl font-bold text-green-600">
          0
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-700">
          Active Bookings
        </h2>

        <p className="mt-4 text-4xl font-bold text-orange-600">
          0
        </p>
      </div>

    </div>
  );
}