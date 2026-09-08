"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCustomer } from "@/services/customer.api";
import { Customer } from "@/types/customer";
export default function CustomerPage() { const { id } = useParams<{ id: string }>(); const [customer, setCustomer] = useState<Customer | null>(null); const [error, setError] = useState<string | null>(null); useEffect(() => { if (id) getCustomer(id).then(setCustomer).catch((x) => setError(x instanceof Error ? x.message : "Unable to load customer.")); }, [id]); if (error) return <main className="p-8">{error}</main>; if (!customer) return <main className="p-8">Loading...</main>; return <main className="p-8"><div className="flex gap-3"><h1 className="mr-auto text-3xl font-bold">Customer Details</h1><Link href="/customers">Back</Link><Link href={`/customers/${id}/edit`}>Edit</Link></div><p>Name: {customer.name}</p><p>Email: {customer.email ?? "-"}</p><p>Phone: {customer.phone ?? "-"}</p><p>City: {customer.city ?? "-"}</p><p>Country: {customer.country ?? "-"}</p><p>Purpose: {customer.purpose}</p><p>Service Type: {customer.serviceType ?? "-"}</p></main>; }
