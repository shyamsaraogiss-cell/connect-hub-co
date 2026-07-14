"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBooking } from "@/services/booking.api";
import { Booking } from "@/types/booking";
export default function BookingPage() { const { id } = useParams<{ id: string }>(); const [booking, setBooking] = useState<Booking | null>(null); const [error, setError] = useState<string | null>(null); useEffect(() => { if (id) void getBooking(id).then(setBooking).catch((reason) => setError(reason instanceof Error ? reason.message : "Unable to load booking.")); }, [id]); if (error) return <main className="p-8 text-red-700" role="alert">{error}</main>; if (!booking) return <main className="p-8">Loading...</main>; return <main className="p-8"><div className="flex gap-4"><Link href="/bookings">Back</Link><Link href={`/bookings/${id}/edit`}>Edit</Link></div><h1 className="my-6 text-3xl font-bold">Booking Details</h1><div className="grid gap-2"><p>Customer: {booking.customer.name}</p><p>Partner: {booking.religiousPartner?.name ?? "Unassigned"}</p><p>Service: {booking.serviceName}</p><p>Status: {booking.status}</p><p>Scheduled: {new Date(booking.scheduledAt).toLocaleString()}</p><p>Notes: {booking.notes ?? "-"}</p></div></main>; }
