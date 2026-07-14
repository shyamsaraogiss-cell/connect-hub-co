"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { deactivatePartner, getPartners } from "@/services/partner.api";

type ReligiousPartner = {
  id: string;
  name: string;
  partnerType: string;
  organization?: string | null;
  city?: string | null;
  country?: string | null;
  email?: string | null;
  phone?: string | null;
  verified: boolean;
  active: boolean;
};

export default function PartnersPage() {
  const [partners, setPartners] = useState<ReligiousPartner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPartners();
  }, []);

  async function loadPartners() {
    try {
      const data = await getPartners();
      setPartners(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deactivate(id: string) {
    if (!window.confirm("Deactivate this partner?")) return;

    try {
      await deactivatePartner(id);
      await loadPartners();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to deactivate partner.");
    }
  }

  if (loading) {
    return (
      <main className="p-10">
        <h1 className="text-3xl font-bold">Religious Partners</h1>
        <p className="mt-6">Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl rounded-xl bg-white p-8 shadow">

        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Religious Partners
          </h1>

          <Link
            href="/partners/new"
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            + New Partner
          </Link>
        </div>

        {partners.length === 0 ? (
          <p>No partners found.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="p-3">Actions</th>
                <th className="p-3">Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">City</th>
                <th className="p-3">Email</th>
                <th className="p-3">Verified</th>
                <th className="p-3">Active</th>
              </tr>
            </thead>

            <tbody>
              {partners.map((partner) => (
                <tr
                  key={partner.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Link href={`/partners/${partner.id}`} className="rounded bg-gray-200 px-3 py-1">View</Link>
                      <Link href={`/partners/${partner.id}/edit`} className="rounded bg-blue-600 px-3 py-1 text-white">Edit</Link>
                      {partner.active ? <button onClick={() => void deactivate(partner.id)} className="rounded bg-red-600 px-3 py-1 text-white">Deactivate</button> : null}
                    </div>
                  </td>
                  <td className="p-3 font-medium">{partner.name}</td>
                  <td className="p-3">{partner.partnerType}</td>
                  <td className="p-3">{partner.city ?? "-"}</td>
                  <td className="p-3">{partner.email ?? "-"}</td>
                  <td className="p-3">{partner.verified ? "✅" : "❌"}</td>
                  <td className="p-3">{partner.active ? "✅" : "❌"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
