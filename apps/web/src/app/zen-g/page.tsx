'use client';

import Link from 'next/link';
import { PublicHeroShell } from '@/features/public-shell';
import { GenZRitualAIEngine } from '@/features/ai/components/GenZRitualAIEngine';

export default function ZenGPage() {
  return (
    <PublicHeroShell>
      <main className="min-h-screen bg-gradient-to-b from-amber-50/70 to-white px-6 py-16 text-stone-900">
        <div className="mx-auto max-w-5xl space-y-8">
          <div>
            <p className="font-semibold uppercase tracking-widest text-orange-800 text-xs">
              Phase 6 — Ask GenZ AI + Knowledge Center + URMS Engine
            </p>
            <h1 className="mt-2 text-4xl font-serif font-bold text-stone-950 sm:text-5xl">
              Meet Zen G Ritual AI Assistant
            </h1>
            <p className="mt-3 max-w-3xl text-stone-700 text-sm leading-relaxed">
              Zen G helps you understand Connect Hub Co. services, explore Knowledge Center topics, and look up your Universal Reference ID (<code className="bg-amber-100 px-2 py-0.5 rounded font-mono text-orange-950">CHC-2026-XXXXXX</code>) in real-time. It provides informational guidance only and never replaces a verified Acharya or Purohit.
            </p>
          </div>

          {/* AI Panel Container */}
          <div className="rounded-3xl border border-orange-200 bg-white p-6 shadow-sm sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <h2 className="text-xl font-bold font-serif text-stone-950">Ask GenZ Ritual AI & Knowledge Hub</h2>
                <p className="text-xs text-stone-500 mt-0.5">Connected to Knowledge Center & URMS Tracking Registry</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Knowledge Engine
              </span>
            </div>

            {/* Embedded GenZ AI Engine */}
            <GenZRitualAIEngine category="pitru-moksha-gaya" />
          </div>

          {/* Key Principles */}
          <div className="grid gap-5 md:grid-cols-3 text-xs">
            <div className="rounded-2xl bg-white p-5 border border-stone-200 shadow-sm">
              <h3 className="font-bold text-stone-950 text-sm mb-1">✦ Knowledge Base Verified</h3>
              <p className="text-stone-600 leading-relaxed">
                AI assistance is drawn from the current Knowledge Center sources and must not be treated as Founder-approved Golden Q&amp;A unless a response carries separate version and provenance evidence.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 border border-stone-200 shadow-sm">
              <h3 className="font-bold text-stone-950 text-sm mb-1">✦ URMS Reference Tracking</h3>
              <p className="text-stone-600 leading-relaxed">
                Type your Universal Reference ID (<code className="bg-stone-100 px-1 py-0.5 font-mono">CHC-2026-000123</code>) into the chat box to fetch live customer-safe stage and status updates.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 border border-stone-200 shadow-sm">
              <h3 className="font-bold text-stone-950 text-sm mb-1">✦ Human Acharya Authority</h3>
              <p className="text-stone-600 leading-relaxed">
                AI provides guidance only. Final Sankalp, mantra recitation, and ceremonial execution are led by verified Tirth Purohits and Acharyas.
              </p>
            </div>
          </div>

          {/* Quick Route Links */}
          <div className="flex flex-wrap gap-4 text-xs font-semibold pt-4">
            <Link href="/services" className="rounded-xl bg-[var(--peacock-dark,#087F8C)] px-6 py-3 text-white transition hover:opacity-95">
              Explore Service Catalog →
            </Link>
            <Link href="/tracking" className="rounded-xl border border-stone-300 bg-white px-6 py-3 text-stone-800 hover:bg-stone-50">
              Universal Tracking Portal →
            </Link>
            <Link href="/knowledge-center" className="rounded-xl border border-stone-300 bg-white px-6 py-3 text-stone-800 hover:bg-stone-50">
              Knowledge Center Repository →
            </Link>
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}
