import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import { GenZRitualAIEngine } from '@/features/ai/components/GenZRitualAIEngine';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Knowledge Center | Connect Hub Co.',
  description: 'Authentic guidance, ancestral rites knowledge, Vedic tradition protocols, service explanations, tracking help, and FAQs.',
};

export default function KnowledgeCenterPage() {
  const categories = [
    { title: 'PitruMoksha Gaya', desc: 'Understanding the spiritual significance of Gaya Ji ancestral rites, Pind Daan protocols, and Shraddha Karma.', link: '/pitru-moksha-gaya' },
    { title: 'Ritual Services', desc: 'Detailed guidance on Griha Pravesh, Navagraha Shanti, Vivah pujas, and home/destination Vedic ceremonies.', link: '/ritual-services' },
    { title: 'Travel Assistance', desc: 'Pilgrim pickup support, hotel/dharamshala stay, local transport, accessibility, and shadow assist guidance.', link: '/travel-assistance' },
    { title: 'Vahi Records', desc: 'How ancestral Vahi & Panji lineage records are verified, preserved, and updated by lineaged Pandas.', link: '/vahi-records' },
    { title: 'Religious Partner Registration', desc: 'Registration criteria, code of conduct, and verification for lineaged Purohits, Pandas, and Tirth Purohits.', link: '/religious-partners' },
    { title: 'Booking and Inquiry Help', desc: 'How to submit service inquiries, request custom ritual scopes, receive upfront Dakshina quotes, and confirm dates.', link: '/services' },
    { title: 'Tracking Help', desc: 'How to use your Universal Reference ID to track service status, schedule updates, and coordinator assignments.', link: '/tracking' },
    { title: 'Policies & Governance', desc: 'Confidentiality commitment, Vahi privacy protocols, booking terms, and cancellation policies.', link: '/privacy-policy' },
    { title: 'Frequently Asked Questions (FAQ)', desc: 'Answers to common questions about rituals, samagri, Dakshina transparency, and online remote stream pujas.', link: '/contact' },
  ];

  return (
    <PublicHeroShell>
      <main className="bg-amber-50/60 px-6 py-16 text-stone-900 min-h-[70vh]">
        <div className="mx-auto max-w-5xl space-y-10">
          <div>
            <p className="font-semibold tracking-widest text-orange-800 uppercase text-xs">Central Knowledge Repository</p>
            <h1 className="mt-2 text-4xl font-serif font-bold text-stone-950 sm:text-5xl">Ancestral Rites & Sacred Guidance</h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-stone-700">
              Welcome to the Connect Hub Co. Knowledge Center. Explore authentic guidance on Vedic rituals, Gaya Ji Pind Daan, lineage records, and pilgrim assistance.
            </p>
          </div>

          {/* Integrated Interactive GenZ AI & URMS Search Engine */}
          <div className="rounded-3xl border border-orange-200 bg-white p-6 shadow-sm sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 gap-2">
              <div>
                <h2 className="text-xl font-bold font-serif text-stone-950">Ask GenZ Ritual AI & URMS Registry</h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Instant answers from verified Knowledge Trees or real-time Reference ID tracking (<code className="bg-stone-100 px-1 py-0.5 font-mono">CHC-2026-XXXXXX</code>)
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold self-start sm:self-auto">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Knowledge Assistant
              </span>
            </div>
            <GenZRitualAIEngine category="company-info" />
          </div>

          {/* Knowledge Center Article Grid */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-950 mb-6">Knowledge Domains & Topics</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {categories.map((cat) => (
                <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm flex flex-col justify-between" key={cat.title}>
                  <div>
                    <h3 className="font-serif font-bold text-orange-950 text-xl">{cat.title}</h3>
                    <p className="mt-3 text-stone-600 text-sm leading-relaxed">{cat.desc}</p>
                  </div>
                  <Link className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--peacock-dark,#087F8C)] hover:underline" href={cat.link}>
                    Read Knowledge Guide →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}

