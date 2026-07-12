"use client";

import { useMemo, useState } from "react";

import { ReligiousPartner } from "../types/religiousPartner";
import { DashboardStats } from "./DashboardStats";
import { ReligiousPartnerTable } from "./ReligiousPartnerTable";
import { SearchBar } from "./SearchBar";

interface ReligiousPartnerDashboardProps {
  partners: ReligiousPartner[];
}

export function ReligiousPartnerDashboard({
  partners,
}: ReligiousPartnerDashboardProps) {
  const [search, setSearch] = useState("");

  const filteredPartners = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return partners;
    }

    return partners.filter((partner) => {
      return (
        partner.fullName.toLowerCase().includes(query) ||
        partner.mobile.toLowerCase().includes(query) ||
        (partner.city ?? "")
          .toLowerCase()
          .includes(query)
      );
    });
  }, [partners, search]);

  return (
    <>
      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <DashboardStats partners={filteredPartners} />

      <ReligiousPartnerTable
        partners={filteredPartners}
      />
    </>
  );
}