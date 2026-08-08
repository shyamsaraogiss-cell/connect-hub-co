import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Connect Hub Co.',
  description: 'Learn how Connect Hub Co. coordinates sacred services and pilgrim travel assistance in Gaya Ji and pan-India with verified Religious Partners.',
};

export default function AboutPage() {
  return (
    <PublicHeroShell>
      <main className="bg-amber-50 px-6 py-16 text-stone-900 min-h-[70vh]">
        <div className="mx-auto max-w-4xl">
          <p className="font-semibold tracking-widest text-orange-800 uppercase text-xs">About Connect Hub Co.</p>
          <h1 className="mt-3 text-4xl font-serif font-bold text-stone-950 sm:text-5xl">Local Care, Clear Coordination</h1>
          <p className="mt-6 text-lg leading-8 text-stone-700">
            Connect Hub Co. helps families coordinate sacred ancestral services, Vedic pujas, and pilgrim travel assistance with dependable local partners and practical ground support. We bring ritual requirements, schedules, customer communication, and journey arrangements into one managed process.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {[
              ['Respect', 'Family traditions, Gotra details, and sensitive ancestral rites are handled thoughtfully.'],
              ['Accountability', 'Each service request is assigned a Universal Reference ID and tracked through completion.'],
              ['Clarity', 'Families receive clear, transparent upfront service scopes with pre-arranged Dakshina.'],
            ].map(([title, text]) => (
              <article className="rounded-2xl bg-white p-6 shadow-sm border border-stone-200" key={title}>
                <h2 className="font-bold text-orange-950 font-serif text-lg">{title}</h2>
                <p className="mt-2 text-stone-600 text-sm leading-relaxed">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link className="rounded-xl bg-[var(--peacock-dark,#087F8C)] px-6 py-3 font-semibold text-white" href="/services">
              Explore Our Services
            </Link>
            <Link className="rounded-xl border border-[var(--peacock-dark,#087F8C)] px-6 py-3 font-semibold text-[var(--peacock-dark,#087F8C)]" href="/contact">
              Contact Support
            </Link>
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}
