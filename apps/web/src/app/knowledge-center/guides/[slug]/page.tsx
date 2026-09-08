import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PublicHeroShell } from '@/features/public-shell';
import {
  getKnowledgeGuide,
  KNOWLEDGE_GUIDE_SLUGS,
} from '@/features/knowledge-center/knowledge-guides';

type GuidePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return KNOWLEDGE_GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const guide = getKnowledgeGuide((await params).slug);
  return guide
    ? { title: `${guide.title} | Connect Hub Co.`, description: guide.description }
    : { title: 'Knowledge Guide | Connect Hub Co.' };
}

export default async function KnowledgeGuidePage({ params }: GuidePageProps) {
  const guide = getKnowledgeGuide((await params).slug);
  if (!guide) notFound();

  return (
    <PublicHeroShell>
      <main className="min-h-[70vh] bg-amber-50/60 px-6 py-14 text-stone-900">
        <article className="mx-auto max-w-4xl">
          <Link href="/knowledge-center" className="text-sm font-semibold text-[#087F8C] hover:underline">← Knowledge Center</Link>
          <header className="mt-6 border-b border-amber-200 pb-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-800">Approved Knowledge Guide</p>
            <h1 className="mt-2 font-serif text-4xl font-bold text-stone-950 sm:text-5xl">{guide.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-700">{guide.description}</p>
          </header>

          <div className="mt-8 space-y-6">
            {guide.articles.map((article) => (
              <section key={article.id} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-[#064E59]">{article.title}</h2>
                <p className="mt-3 font-medium leading-7 text-stone-700">{article.summary}</p>
                <p className="mt-3 leading-7 text-stone-600">{article.content}</p>
              </section>
            ))}

            {guide.approvedQuestions.length > 0 ? (
              <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-[#064E59]">Approved Questions and Guidance</h2>
                <div className="mt-4 divide-y divide-stone-200">
                  {guide.approvedQuestions.map((item) => (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                      <h3 className="font-semibold text-stone-900">{item.label}</h3>
                      <p className="mt-2 leading-7 text-stone-600">{item.response}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {guide.faqs.length > 0 ? (
              <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-[#064E59]">Approved FAQs</h2>
                <div className="mt-4 divide-y divide-stone-200">
                  {guide.faqs.map((faq) => (
                    <div key={faq.id} className="py-4 first:pt-0 last:pb-0">
                      <h3 className="font-semibold text-stone-900">{faq.question}</h3>
                      <p className="mt-2 leading-7 text-stone-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-teal-200 bg-teal-50/70 p-5">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#064E59]">Ready for the next step?</h2>
              <p className="mt-1 text-sm text-stone-600">Continue to the relevant official service or application page.</p>
            </div>
            <Link href={guide.action.href} className="rounded-full bg-[#087F8C] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#064E59]">{guide.action.label}</Link>
          </aside>

        </article>
      </main>
    </PublicHeroShell>
  );
}
