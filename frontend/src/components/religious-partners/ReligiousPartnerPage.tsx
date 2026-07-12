"use client";

import { useEffect, useState } from "react";

import ReligiousPartnerForm from "@/components/religious-partners/ReligiousPartnerForm";
import ReligiousPartnerTable from "@/components/religious-partners/ReligiousPartnerTable";

import {
  getReligiousPartners,
} from "@/lib/religiousPartner";

import { ReligiousPartner } from "@/types/religiousPartner";

export default function ReligiousPartnerPage() {

  const [partners, setPartners] = useState<ReligiousPartner[]>([]);

  const [loading, setLoading] = useState(true);

  async function loadPartners() {

    setLoading(true);

    try {

      const result = await getReligiousPartners();

      if (result.success) {
        setPartners(result.data);
      } else {
        setPartners([]);
      }

    } catch (error) {

      console.error(error);
      setPartners([]);

    }

    setLoading(false);

  }

  useEffect(() => {

    loadPartners();

  }, []);

  return (

    <div className="space-y-8">

      <ReligiousPartnerForm
        onSaved={loadPartners}
      />

      <ReligiousPartnerTable
        partners={partners}
        loading={loading}
        onRefresh={loadPartners}
      />

    </div>

  );

}