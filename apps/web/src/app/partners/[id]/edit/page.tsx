"use client";
import { priestErrorMessage } from "@/lib/priest-terminology";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PartnerForm from "@/components/partner/PartnerForm";
import { getPartner, updatePartner } from "@/services/partner.api";
import { ReligiousPartner, ReligiousPartnerInput } from "@/types/partner";

export default function EditPartnerPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [partner, setPartner] = useState<ReligiousPartner | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setPartner(await getPartner(params.id));
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Unable to load Priest.");
      }
    }
    if (params.id) void load();
  }, [params.id]);

  async function submit(values: ReligiousPartnerInput) {
    await updatePartner(params.id, values);
    router.push(`/partners/${params.id}`);
    router.refresh();
  }

  if (error) return <main className="p-8"><p role="alert">{priestErrorMessage(error)}</p><Link href="/partners">Back to Verified Priests</Link></main>;
  if (!partner) return <main className="p-8">Loading...</main>;

  const initialValue: ReligiousPartnerInput = {
    name: partner.name, partnerType: partner.partnerType, organization: partner.organization, email: partner.email,
    phone: partner.phone, city: partner.city, country: partner.country, verified: partner.verified, active: partner.active,
  };

  return <main className="min-h-screen bg-gray-100 p-8"><div className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow"><h1 className="mb-8 text-3xl font-bold">Edit Verified Priest</h1><PartnerForm initialValue={initialValue} submitLabel="Save Changes" onSubmit={submit} /></div></main>;
}
