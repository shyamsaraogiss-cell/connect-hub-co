import type { Metadata } from 'next';
import { GrievanceForm } from '@/components/support/GrievanceForm';
import { PublicHeroShell } from '@/features/public-shell';

export const metadata: Metadata = { title: 'Grievance Form | Connect Hub Co.', description: 'Escalate an existing complaint or service matter to Connect Hub Co.' };

export default function GrievancePage() {
  return <PublicHeroShell><main className="min-h-[70vh] bg-amber-50 px-6 py-10 text-stone-900">
    <div className="mx-auto max-w-4xl">
      <section className="mb-6 rounded-2xl border border-orange-200 bg-[#FFF4E6] px-6 py-5 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-800">Grievance Form</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-stone-900">Grievance Redressal</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-stone-700">
          Use this form to formally escalate an unresolved complaint or service issue that has already been raised through the normal support process. Provide the existing complaint/service reference, relevant dates, grievance category, and supporting details so the matter can be reviewed through the grievance process.
        </p>
        <p className="mt-3 text-sm font-semibold text-orange-900">PLEASE MAKE SURE - Fields marked * are mandatory.</p>
      </section>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <GrievanceForm />
      </div>
    </div>
  </main></PublicHeroShell>;
}
