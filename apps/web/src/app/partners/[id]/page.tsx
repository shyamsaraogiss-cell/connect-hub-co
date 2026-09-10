"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPartner } from "@/services/partner.api";

type ReligiousPartner = {
  id: string;
  name: string;
  partnerType: string;
  organization?: string | null;
  email?: string | null;
  phone?: string | null;
  city?: string | null;
  country?: string | null;
  verified: boolean;
  active: boolean;
};

export default function PartnerDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const [partner, setPartner] =
    useState<ReligiousPartner | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPartner() {
      try {
        const data = await getPartner(id);

        setPartner(data);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadPartner();
    }

  }, [id]);


  if (loading) {
    return (
      <main className="p-8">
        Loading...
      </main>
    );
  }


  if (!partner) {
    return (
      <main className="p-8">
        Priest not found.
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow">

        <div className="mb-6 flex justify-between">

          <h1 className="text-3xl font-bold">
            Priest Details
          </h1>

          <Link
            href="/partners"
            className="rounded bg-gray-200 px-4 py-2"
          >
            Back
          </Link>

          <Link href={`/partners/${partner.id}/edit`} className="rounded bg-blue-600 px-4 py-2 text-white">
            Edit
          </Link>

        </div>


        <div className="space-y-4">

          <p>
            <strong>Name:</strong> {partner.name}
          </p>

          <p>
            <strong>Type:</strong> {partner.partnerType}
          </p>

          <p>
            <strong>Organization:</strong>{" "}
            {partner.organization || "-"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {partner.email || "-"}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {partner.phone || "-"}
          </p>

          <p>
            <strong>City:</strong>{" "}
            {partner.city || "-"}
          </p>

          <p>
            <strong>Country:</strong>{" "}
            {partner.country || "-"}
          </p>

          <p>
            <strong>Verified:</strong>{" "}
            {partner.verified ? "Yes" : "No"}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {partner.active ? "Active" : "Inactive"}
          </p>

        </div>

      </div>

    </main>
  );
}
