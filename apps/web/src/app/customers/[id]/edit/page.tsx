"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CustomerForm from "@/components/customer/CustomerForm";
import { getCustomer, updateCustomer } from "@/services/customer.api";
import { Customer, CustomerInput } from "@/types/customer";
export default function EditCustomerPage() { const { id } = useParams<{ id: string }>(); const router = useRouter(); const [customer, setCustomer] = useState<Customer | null>(null); useEffect(() => { if (id) void getCustomer(id).then(setCustomer); }, [id]); if (!customer) return <main className="p-8">Loading...</main>; const initial: CustomerInput = { name: customer.name, email: customer.email, phone: customer.phone, city: customer.city, country: customer.country, isNRI: customer.isNRI }; async function submit(c: CustomerInput) { await updateCustomer(id, c); router.push(`/customers/${id}`); } return <main className="p-8"><h1 className="mb-6 text-3xl font-bold">Edit Customer</h1><CustomerForm initialValue={initial} submitLabel="Save Changes" onSubmit={submit} /></main>; }
