import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import { KNOWLEDGE_GUIDE_CARDS } from '@/features/knowledge-center/knowledge-guides';
import { PublicCatalog } from '@/components/service-catalog/PublicCatalog';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Knowledge Center | Connect Hub Co.',
  description: 'Authentic guidance, ancestral rites knowledge, Vedic tradition protocols, service explanations, tracking help, and FAQs.',
};

export default function KnowledgeCenterPage() {
  return (
    <PublicHeroShell>
      <main className="bg-amber-50/60 px-6 py-16 text-stone-900 min-h-[70vh]">
        <div className="mx-auto max-w-5xl space-y-10">
          <section className="flex items-center gap-4 rounded-2xl border border-amber-300 bg-white px-5 py-4 shadow-sm" aria-labelledby="knowledge-center-identity-title">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-teal-200 bg-[#064E59]" aria-hidden="true">
              <svg width="35" height="35" viewBox="0 0 24 24">
                <path d="M3 5h6c2 0 3 1 3 3v11c-1-1.5-2.5-2-4-2H3V5Z" fill="#2B72B8" stroke="#7DE7F2" />
                <path d="M21 5h-6c-2 0-3 1-3 3v11c1-1.5 2.5-2 4-2h5V5Z" fill="#C96D2D" stroke="#F4B942" />
              </svg>
            </div>
            <div>
              <h1 id="knowledge-center-identity-title" className="font-serif text-xl font-bold text-[#064E59] sm:text-2xl">Connect Hub Co. Knowledge Center</h1>
              <p className="mt-1 text-sm leading-6 text-stone-600">Founder-approved knowledge, verified guidance, and trusted reference information.</p>
            </div>
          </section>

          <div>
            <p className="font-semibold tracking-widest text-orange-800 uppercase text-xs">Central Knowledge Repository</p>
            <h2 className="mt-2 text-4xl font-serif font-bold text-stone-950 sm:text-5xl">Ancestral Rites & Sacred Guidance</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-stone-700">
              Welcome to the Connect Hub Co. Knowledge Center. Explore authentic guidance on Vedic rituals, Gaya Ji Pind Daan, lineage records, and pilgrim assistance.
            </p>
          </div>

          <aside className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-teal-200 bg-white p-5 shadow-sm">
            <div><h2 className="font-serif text-xl font-bold text-[#064E59]">Need guided help?</h2><p className="mt-1 text-sm text-stone-600">Use the interactive assistant separately for guided search, secure tracking, and authorised review routing.</p></div>
            <Link href="/zen-g" className="rounded-full bg-[#087F8C] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#064E59]">Need guided help? Ask GenZ AI</Link>
          </aside>

          {/* Knowledge Center Article Grid */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-950 mb-6">Knowledge Domains & Topics</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {KNOWLEDGE_GUIDE_CARDS.map((cat) => (
                <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm flex flex-col justify-between" key={cat.title}>
                  <div>
                    <h3 className="font-serif font-bold text-orange-950 text-xl">{cat.title}</h3>
                    <p className="mt-3 text-stone-600 text-sm leading-relaxed">{cat.description}</p>
                  </div>
                  <Link className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--peacock-dark,#087F8C)] hover:underline" href={cat.href}>
                    Read Knowledge Guide 
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <section aria-labelledby="service-catalog-title">
            <h2 id="service-catalog-title" className="text-2xl font-serif font-bold text-stone-950">Browse Service Catalog</h2>
            <PublicCatalog />
          </section>
        </div>
      </main>
    </PublicHeroShell>
  );
}

