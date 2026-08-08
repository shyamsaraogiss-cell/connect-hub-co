import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Connect Hub Co.',
  description: 'Official Terms & Conditions governing the use of Connect Hub Co. platform and religious service coordination.',
};

export default function TermsPage() {
  return (
    <PublicHeroShell>
      <main className="bg-amber-50 px-6 py-16 text-stone-900 min-h-[70vh]">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm border border-stone-200">
          <p className="font-semibold tracking-widest text-orange-800 uppercase text-xs">Platform Protocol & Agreement</p>
          <h1 className="mt-2 text-3xl font-serif font-bold text-stone-900">Terms & Conditions</h1>
          <div className="mt-6 space-y-6 text-sm text-stone-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-orange-950 font-serif">1. Service Scope & Role</h2>
              <p className="mt-2">
                Connect Hub Co. acts as an authorized coordination platform connecting families with verified Religious Partners, qualified priests, and travel support providers. Final ritual formats and traditions are confirmed with verified priests.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-orange-950 font-serif">2. User Conduct & Transparency</h2>
              <p className="mt-2">
                Customers must provide accurate Gotra, ancestral, and date details. All Dakshina and service fees are transparently outlined in the confirmed service scope.
              </p>
            </section>
          </div>
          <div className="mt-8 border-t border-stone-200 pt-4 text-xs text-stone-500 flex justify-between">
            <span>Last Updated: July 2026</span>
            <Link className="font-semibold text-orange-900 hover:underline" href="/contact">Terms Inquiry</Link>
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}
