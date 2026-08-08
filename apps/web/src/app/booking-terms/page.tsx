import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Booking Terms | Connect Hub Co.',
  description: 'Official booking terms, service scope commitments, Muhurat reservation guidelines, and Dakshina transparency rules.',
};

export default function BookingTermsPage() {
  return (
    <PublicHeroShell>
      <main className="bg-amber-50 px-6 py-16 text-stone-900 min-h-[70vh]">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm border border-stone-200">
          <p className="font-semibold tracking-widest text-orange-800 uppercase text-xs">Service Commitment Protocol</p>
          <h1 className="mt-2 text-3xl font-serif font-bold text-stone-900">Booking Terms</h1>
          <div className="mt-6 space-y-6 text-sm text-stone-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-orange-950 font-serif">1. Transparent Upfront Scope</h2>
              <p className="mt-2">
                Every booking is confirmed with an explicit service scope covering priest Dakshina, Sastra-compliant Samagri, venue setup, and travel assistance (if applicable). No unexpected cash demands are permitted.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-orange-950 font-serif">2. Muhurat & Date Reservations</h2>
              <p className="mt-2">
                Auspicious Muhurat dates and Tithis reserved in advance are subject to priest availability verification. Changes to dates can be requested up to 48 hours before the scheduled ritual time.
              </p>
            </section>
          </div>
          <div className="mt-8 border-t border-stone-200 pt-4 text-xs text-stone-500 flex justify-between">
            <span>Last Updated: July 2026</span>
            <Link className="font-semibold text-orange-900 hover:underline" href="/cancellation-policy">Cancellation & Refund Policy</Link>
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}
