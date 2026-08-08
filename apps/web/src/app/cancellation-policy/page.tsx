import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cancellation Policy | Connect Hub Co.',
  description: 'Fair, transparent cancellation guidelines and refund policy for sacred service bookings and pilgrim travel assistance.',
};

export default function CancellationPolicyPage() {
  return (
    <PublicHeroShell>
      <main className="bg-amber-50 px-6 py-16 text-stone-900 min-h-[70vh]">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm border border-stone-200">
          <p className="font-semibold tracking-widest text-orange-800 uppercase text-xs">Customer Protection Guarantee</p>
          <h1 className="mt-2 text-3xl font-serif font-bold text-stone-900">Cancellation & Refund Policy</h1>
          <div className="mt-6 space-y-6 text-sm text-stone-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-orange-950 font-serif">1. Ritual Service Cancellations</h2>
              <p className="mt-2">
                Ritual service requests cancelled prior to Sastra samagri procurement and priest deployment are eligible for full refund or date rescheduling.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-orange-950 font-serif">2. Rescheduling & Unforeseen Circumstances</h2>
              <p className="mt-2">
                In cases of emergency, weather disruptions at sacred sites, or family requirements, ritual dates can be rescheduled without penalty in consultation with your assigned Religious Partner.
              </p>
            </section>
          </div>
          <div className="mt-8 border-t border-stone-200 pt-4 text-xs text-stone-500 flex justify-between">
            <span>Last Updated: July 2026</span>
            <Link className="font-semibold text-orange-900 hover:underline" href="/contact">Request Refund / Reschedule</Link>
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}
