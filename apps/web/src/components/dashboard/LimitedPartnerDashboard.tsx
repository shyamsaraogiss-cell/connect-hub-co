'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
type Tab = 'assignments' | 'status' | 'documents' | 'communications';
const tabs: readonly { id: Tab; label: string; description: string }[] = [
  { id: 'assignments', label: 'My Assignments', description: 'Only work explicitly assigned to this verified partner may appear here.' },
  { id: 'status', label: 'Operational Status', description: 'Only status actions for an explicitly assigned item may appear here.' },
  { id: 'documents', label: 'Permitted Documents', description: 'Only documents permitted for an explicitly assigned item may appear here.' },
  { id: 'communications', label: 'Approved Communications', description: 'Only approved communications linked to an explicit assignment may appear here.' },
];
export function LimitedPartnerDashboard() {
  const { user, logout } = useAuth();
  const [active, setActive] = useState<Tab>('assignments');
  if (user?.role !== 'RELIGIOUS_PARTNER') return <main className="grid min-h-[60vh] place-items-center p-6"><p role="alert">Partner access is not authorized for this account.</p></main>;
  const tab = tabs.find((item) => item.id === active) ?? tabs[0];
  return <main className="min-h-screen bg-stone-50 p-4 text-stone-900 sm:p-8"><section className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-teal-900/20 bg-white shadow-sm">
    <header className="flex flex-wrap items-center justify-between gap-4 bg-teal-950 px-6 py-5 text-white"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-300">Limited Religious Partner Portal</p><h1 className="mt-1 font-serif text-2xl">{user.name}</h1></div><button className="rounded-lg border border-white/40 px-3 py-2 text-sm" onClick={() => void logout()}>Sign out</button></header>
    <p className="border-b border-amber-200 bg-amber-50 px-6 py-4 text-sm leading-6 text-amber-950">No general ERP, URMS/database, unrestricted customer-record, other-partner, or administrative access is available. Operational data remains unavailable until server-side verification and assignment scope are confirmed.</p>
    <nav className="flex flex-wrap gap-2 border-b p-4" aria-label="Limited partner functions">{tabs.map((item) => <button key={item.id} type="button" onClick={() => setActive(item.id)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${active === item.id ? 'bg-teal-800 text-white' : 'bg-stone-100 text-stone-700'}`}>{item.label}</button>)}</nav>
    <section className="p-6" aria-live="polite"><h2 className="font-serif text-xl text-teal-950">{tab.label}</h2><p className="mt-2 text-sm text-stone-600">{tab.description}</p><div className="mt-5 rounded-xl border border-dashed border-stone-300 bg-stone-50 p-6 text-sm text-stone-600">No verified assignment-scoped records are available from the current approved services.</div><Link className="mt-5 inline-block text-sm font-semibold text-teal-800 underline" href="/contact?topic=partner-support">Contact Partner Support</Link></section>
  </section></main>;
}
