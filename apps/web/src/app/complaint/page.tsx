import type { Metadata } from 'next';
import { ComplaintForm } from '@/components/support/ComplaintForm';
import { PublicHeroShell } from '@/features/public-shell';

export const metadata: Metadata = { title: 'Complaint Form | Connect Hub Co.', description: 'File a customer or service complaint with Connect Hub Co.' };

export default function ComplaintPage() {
  return <PublicHeroShell><main className="min-h-[70vh] bg-amber-50 px-6 py-10 text-stone-900">
    <div className="mx-auto max-w-4xl">
      <section className="mb-6 rounded-2xl border border-orange-200 bg-[#FFF4E6] px-6 py-5 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-800">Complaint Form</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-stone-900">Complaint &amp; Resolution Support</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-stone-700">
          Use this form to report or raise a concern requiring formal review. Please provide accurate details and any existing Reference / Service ID so our team can investigate and respond appropriately.
        </p>
        <p className="mt-3 text-sm text-stone-700">
          <span className="font-semibold text-[var(--ritual-gold)]">PLEASE MAKE SURE -</span> To use constant identity, use the same name, email ID and Reference ID for every purpose.
        </p>
        <p className="mt-2 text-sm font-semibold text-orange-900">Fields marked * are mandatory.</p>
      </section>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <ComplaintForm />
      </div>
    </div>
  </main></PublicHeroShell>;
}
