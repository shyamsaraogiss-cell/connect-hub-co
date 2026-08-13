"use client";

import { useEffect, useState } from "react";
import { getPartners } from "@/services/partner.api";
import { ReligiousPartner } from "@/types/partner";

export function usePartners() {
  const [partners, setPartners] = useState<ReligiousPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      setError(null);
      setPartners(await getPartners());
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load partners.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { queueMicrotask(() => void refresh()); }, []);

  return { partners, loading, error, refresh };
}
