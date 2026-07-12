"use client";

import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8 shadow-sm">

      <div>

        <h1 className="text-2xl font-bold text-slate-800">
          Connect Hub Co.
        </h1>

        <p className="text-sm text-slate-500">
          Faith • Service • Trust
        </p>

      </div>

      <div className="flex items-center gap-6">

        <input
          placeholder="Search..."
          className="w-72 rounded-lg border px-4 py-2"
        />

        <button className="text-2xl">
          🔔
        </button>

        <div className="text-right">

          <div className="font-semibold">
            Welcome
          </div>

          <div className="text-sm text-slate-500">
            Founder Dashboard
          </div>

        </div>

      </div>

    </header>
  );
}