"use client";

import PitruMokshaForm from "./PitruMokshaForm";
import PitruMokshaTable from "./PitruMokshaTable";

export default function PitruMokshaPage() {
  return (
    <div className="space-y-8">
      <PitruMokshaForm />
      <PitruMokshaTable />
    </div>
  );
}