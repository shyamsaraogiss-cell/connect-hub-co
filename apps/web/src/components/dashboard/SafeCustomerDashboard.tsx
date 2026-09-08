'use client';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
export function SafeCustomerDashboard() {
  const { user, logout } = useAuth();
  if (user?.role !== 'CUSTOMER') return <main className="grid min-h-[60vh] place-items-center p-6"><p role="alert">Customer account access is not authorized for this account.</p></main>;
  return <main className="min-h-screen bg-stone-50 p-4 text-stone-900 sm:p-8"><section className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-teal-900/20 bg-white shadow-sm">
    <header className="flex flex-wrap items-center justify-between gap-4 bg-teal-950 px-6 py-5 text-white"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-300">Customer Account</p><h1 className="mt-1 font-serif text-2xl">Namaste, {user.name}</h1></div><button className="rounded-lg border border-white/40 px-3 py-2 text-sm" onClick={() => void logout()}>Sign out</button></header>
    <div className="grid gap-5 p-6 md:grid-cols-2"><section className="rounded-xl border border-stone-200 p-5"><h2 className="font-serif text-xl text-teal-950">Your account</h2><dl className="mt-4 grid gap-3 text-sm"><div><dt className="font-semibold">Name</dt><dd>{user.name}</dd></div><div><dt className="font-semibold">Email</dt><dd>{user.email}</dd></div></dl><p className="mt-4 text-xs leading-5 text-stone-600">Only data returned for this authenticated account may be displayed. Bulk customer and internal ERP fields are unavailable here.</p></section>
    <section className="rounded-xl border border-stone-200 p-5"><h2 className="font-serif text-xl text-teal-950">Customer-safe actions</h2><div className="mt-4 grid gap-2 text-sm font-semibold"><Link className="rounded-lg bg-teal-800 px-4 py-2 text-white" href="/tracking">Track a request</Link><Link className="rounded-lg border border-teal-800 px-4 py-2 text-teal-900" href="/contact?topic=customer-support">Contact support</Link><Link className="rounded-lg border border-teal-800 px-4 py-2 text-teal-900" href="/complaint">Submit a complaint</Link><Link className="rounded-lg border border-teal-800 px-4 py-2 text-teal-900" href="/grievance">Raise a grievance</Link></div></section></div>
    <p className="border-t bg-amber-50 px-6 py-4 text-sm text-amber-950">Booking self-service remains unavailable because the authorized booking backend contract is fenced.</p>
  </section></main>;
}
