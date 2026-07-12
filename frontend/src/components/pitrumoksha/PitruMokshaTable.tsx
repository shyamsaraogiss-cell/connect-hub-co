"use client";

import { useEffect, useState } from "react";
import { getPitruRequests } from "../../lib/getPitruRequests";

export default function PitruMokshaTable() {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const result = await getPitruRequests();

    if (result.success) {
      setRows(result.data);
    }
  }

  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">
        PitruMoksha Requests
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 text-left">Customer</th>
            <th className="border p-3 text-left">Mobile</th>
            <th className="border p-3 text-left">Mode</th>
            <th className="border p-3 text-left">Ritual</th>
            <th className="border p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="border p-3">{row.customerName}</td>
              <td className="border p-3">{row.mobile}</td>
              <td className="border p-3">{row.serviceMode}</td>
              <td className="border p-3">{row.ritualType}</td>
              <td className="border p-3">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}