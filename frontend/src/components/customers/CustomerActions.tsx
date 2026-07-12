"use client";

import Link from "next/link";

export default function CustomerActions() {
  return (
    <div className="mb-6 flex gap-3">

      <Link
        href="/customers/new"
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        + New Customer
      </Link>

      <button
        className="rounded-lg border px-5 py-2 hover:bg-gray-100"
      >
        Export
      </button>

    </div>
  );
}