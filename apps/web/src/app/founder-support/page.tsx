import type { Metadata } from "next";
import { DedicatedSupportForm } from "@/components/support/DedicatedSupportForm";
import { PublicHeroShell } from "@/features/public-shell";

export const metadata: Metadata = { title: "Founder Support | Connect Hub Co.", description: "Submit a Founder Support escalation request to Connect Hub Co." };

export default function FounderSupportPage() {
  return <PublicHeroShell><main className="min-h-[70vh] bg-amber-50 px-6 py-10 text-stone-900">
    <div className="mx-auto max-w-4xl">
      <section className="mb-6 rounded-2xl border border-orange-200 bg-[#FFF4E6] px-6 py-5 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-800">Founder Escalation</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-stone-900">Founder Support</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-stone-700">
          Direct escalation for unresolved or serious service concerns. Use Founder Support when your issue requires direct Founder-level review.
        </p>
        <p className="mt-2 max-w-3xl text-base leading-7 text-stone-700">
          <span className="font-semibold text-[var(--ritual-gold)]">PLEASE MAKE SURE -</span> Please use the same name, email ID and Reference ID for every purpose.
        </p>
      </section>

      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <DedicatedSupportForm workflow="founder-support" />
      </div>
    </div>
  </main></PublicHeroShell>;
}
