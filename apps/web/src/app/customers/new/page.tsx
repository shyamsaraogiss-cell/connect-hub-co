"use client";
import { useRouter } from "next/navigation";
import CustomerForm from "@/components/customer/CustomerForm";
import { createCustomer } from "@/services/customer.api";
import { CustomerInput } from "@/types/customer";
export default function NewCustomerPage() { const router = useRouter(); async function submit(c: CustomerInput) { await createCustomer(c); router.push("/customers"); } return <main className="p-8"><h1 className="mb-6 text-3xl font-bold">Register Customer</h1><CustomerForm submitLabel="Save Customer" onSubmit={submit} /></main>; }
