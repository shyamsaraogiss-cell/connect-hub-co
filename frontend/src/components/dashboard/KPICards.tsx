"use client";

import { useEffect, useState } from "react";
import { getDashboardSummary } from "@/lib/dashboard";

export default function KPICards() {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    async function loadDashboard() {
      const result = await getDashboardSummary();

      if (result.success) {
        setSummary(result.data);
      }
    }

    loadDashboard();
  }, []);

  if (!summary) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* KPI Cards */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Customers
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {summary.customers}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Religious Partners
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {summary.religiousPartners}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            PitruMoksha Requests
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {summary.pitruRequests}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Users
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {summary.users}
          </h2>
        </div>

      </div>

      {/* Recent Customers */}

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-4 text-2xl font-bold">
          Recent Customers
        </h2>

        <table className="w-full border-collapse">

          <thead>

            <tr className="border-b">

              <th className="py-2 text-left">
                Name
              </th>

              <th className="py-2 text-left">
                Mobile
              </th>

              <th className="py-2 text-left">
                Purpose
              </th>

              <th className="py-2 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {(summary.recentCustomers ?? []).map((c: any) => (

              <tr
                key={c.id}
                className="border-b"
              >

                <td className="py-2">
                  {c.fullName}
                </td>

                <td className="py-2">
                  {c.mobile}
                </td>

                <td className="py-2">
                  {c.purpose}
                </td>

                <td className="py-2">
                  {c.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Recent Religious Partners */}

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-4 text-2xl font-bold">
          Recent Religious Partners
        </h2>

        <table className="w-full border-collapse">

          <thead>

            <tr className="border-b">

              <th className="py-2 text-left">
                Name
              </th>

              <th className="py-2 text-left">
                Category
              </th>

              <th className="py-2 text-left">
                Mobile
              </th>

              <th className="py-2 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {(summary.recentReligiousPartners ?? []).map((p: any) => (

              <tr
                key={p.id}
                className="border-b"
              >

                <td className="py-2">
                  {p.fullName}
                </td>

                <td className="py-2">
                  {p.category}
                </td>

                <td className="py-2">
                  {p.mobile}
                </td>

                <td className="py-2">
                  {p.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Latest PitruMoksha Requests */}

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-4 text-2xl font-bold">
          Latest PitruMoksha Requests
        </h2>

        <table className="w-full border-collapse">

          <thead>

            <tr className="border-b">

              <th className="py-2 text-left">
                Customer
              </th>

              <th className="py-2 text-left">
                Ritual
              </th>

              <th className="py-2 text-left">
                Mode
              </th>

              <th className="py-2 text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {(summary.recentPitruRequests ?? []).map((r: any) => (

              <tr
                key={r.id}
                className="border-b"
              >

                <td className="py-2">
                  {r.customerName}
                </td>

                <td className="py-2">
                  {r.ritualType}
                </td>

                <td className="py-2">
                  {r.serviceMode}
                </td>

                <td className="py-2">
                  {r.status}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}