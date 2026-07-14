"use client";

import Link from "next/link";
import { deactivatePartner } from "@/services/partner.api";
import { ReligiousPartner } from "@/types/partner";

interface Props { partners: ReligiousPartner[]; onDeactivated: () => Promise<void>; }

export default function PartnerTable({ partners, onDeactivated }: Props) {
  async function deactivate(id: string) {
    if (!window.confirm("Deactivate this partner?")) return;
    try { await deactivatePartner(id); await onDeactivated(); }
    catch (error) { alert(error instanceof Error ? error.message : "Unable to deactivate partner."); }
  }

  return <table className="w-full border-collapse"><thead><tr className="border-b bg-gray-100"><th className="p-3 text-left">Name</th><th className="p-3 text-left">Type</th><th className="p-3 text-left">City</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Verified</th><th className="p-3 text-left">Status</th><th className="p-3 text-left">Actions</th></tr></thead><tbody>
    {partners.map((partner) => <tr key={partner.id} className="border-b hover:bg-gray-50"><td className="p-3">{partner.name}</td><td className="p-3">{partner.partnerType}</td><td className="p-3">{partner.city ?? "-"}</td><td className="p-3">{partner.email ?? "-"}</td><td className="p-3">{partner.verified ? "Yes" : "No"}</td><td className="p-3">{partner.active ? "Active" : "Inactive"}</td><td className="p-3"><div className="flex gap-2"><Link href={`/partners/${partner.id}`} className="rounded bg-gray-200 px-3 py-1">View</Link><Link href={`/partners/${partner.id}/edit`} className="rounded bg-blue-600 px-3 py-1 text-white">Edit</Link>{partner.active ? <button onClick={() => void deactivate(partner.id)} className="rounded bg-red-600 px-3 py-1 text-white">Deactivate</button> : null}</div></td></tr>)}
  </tbody></table>;
}
