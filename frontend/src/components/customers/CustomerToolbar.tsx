"use client";

export default function CustomerToolbar() {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow">

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Customers
        </h1>

        <p className="mt-1 text-slate-500">
          Manage customer records and enquiries.
        </p>
      </div>

      <button className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
        + Add Customer
      </button>

    </div>
  );
}