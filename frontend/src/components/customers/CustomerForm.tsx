"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

export default function CustomerForm() {

  const [name, setName] = useState("");

  return (

    <div className="space-y-4 rounded-xl bg-white p-6 shadow">

      <Input
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input placeholder="Mobile Number" />

      <Input placeholder="WhatsApp" />

      <Input placeholder="Email" />

      <Textarea
        rows={4}
        placeholder="Remarks"
      />

      <button className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">

        Save Customer

      </button>

    </div>

  );

}