"use client";

import { useState } from "react";

import Container from "@/components/ui/Container";

import CustomerHeader from "./CustomerHeader";
import CustomerKPIs from "./CustomerKPIs";
import CustomerSearch from "./CustomerSearch";
import CustomerActions from "./CustomerActions";
import CustomerTable from "./CustomerTable";

export default function CustomerPage() {

  const [search, setSearch] = useState("");

  return (

    <Container>

      <CustomerHeader />

      <CustomerKPIs />

      <CustomerActions />

      <CustomerSearch
        value={search}
        onChange={setSearch}
      />

      <CustomerTable customers={[]} />

    </Container>

  );

}