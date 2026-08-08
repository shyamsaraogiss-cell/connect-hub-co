import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Connect Hub Co.',
  description: 'Confidentiality-first privacy policy governing ancestral records, ritual details, family Gotra data, and personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <PublicHeroShell>
      <main className="bg-amber-50 px-6 py-16 text-stone-900 min-h-[70vh]">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm border border-stone-200">
          <p className="font-semibold tracking-widest text-orange-800 uppercase text-xs">Confidentiality-First Principle</p>
          <h1 className="mt-2 text-3xl font-serif font-bold text-stone-900">Privacy Policy</h1>
          <div className="mt-6 space-y-6 text-sm text-stone-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-orange-950 font-serif">1. Privacy Commitment</h2>
              <p className="mt-2">
                Connect Hub Co. respects the sacred and sensitive nature of ancestral rites, family Gotra information, lineage records, and personal travel details. Only essential information required for ritual execution and journey management is collected.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-orange-950 font-serif">2. Vahi & Ancestral Records Confidentiality</h2>
              <p className="mt-2">
                Traditional Vahi and Panji lineage records are strictly protected. They are never published for public online search, sold, or shared with unauthorized third parties. Access is restricted to assigned verified Religious Partners and Pandas.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-orange-950 font-serif">3. Data Usage & Protection</h2>
              <p className="mt-2">
                Your personal details are stored securely in encrypted databases and accessible only to authorized operational staff for coordination of your requested services.
              </p>
            </section>
          </div>
          <div className="mt-8 border-t border-stone-200 pt-4 text-xs text-stone-500 flex justify-between">
            <span>Last Updated: July 2026</span>
            <Link className="font-semibold text-orange-900 hover:underline" href="/contact">Privacy Inquiry</Link>
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}
