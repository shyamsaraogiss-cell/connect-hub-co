"use client";
import { useRouter } from "next/navigation";
import BookingForm from "@/components/booking/BookingForm";
import { createBooking } from "@/services/booking.api";
import { BookingInput } from "@/types/booking";
export default function NewBookingPage() { const router = useRouter(); async function submit(v: BookingInput) { await createBooking({ ...v, scheduledAt: new Date(v.scheduledAt).toISOString() }); router.push("/bookings"); } return <main className="p-8"><h1 className="text-3xl font-bold">New Booking</h1><BookingForm label="Create Booking" onSubmit={submit} /></main>; }
