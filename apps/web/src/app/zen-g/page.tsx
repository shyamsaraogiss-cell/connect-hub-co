'use client';

import { PublicHeroShell } from '@/features/public-shell';
import { MulticolourAiBrainIcon } from '@/features/public-shell/components/PublicHeroSidebar';
import { GenZRitualAIEngine } from '@/features/ai/components/GenZRitualAIEngine';

export default function ZenGPage() {
  return (
    <PublicHeroShell>
      <main className="min-h-screen bg-gradient-to-b from-amber-50/70 to-white px-6 py-4 text-stone-900 sm:py-5">
        <div className="mx-auto max-w-5xl">
          <section className="flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-xl border border-amber-200 bg-white/90 px-4 py-2 text-center text-sm text-stone-700 shadow-sm lg:flex-nowrap" aria-label="Welcome to Ask GenZ AI">
            <span className="whitespace-nowrap font-bold text-[#064E59]"><span aria-hidden="true">🙏</span> Namaste</span>
            <span className="hidden text-amber-500 sm:inline" aria-hidden="true">|</span>
            <span className="font-medium">Welcome. I’m here to guide you through your journey.</span>
            <span className="hidden text-amber-500 sm:inline" aria-hidden="true">|</span>
            <span className="whitespace-nowrap font-bold text-[#087F8C]">How can I help?</span>
          </section>

          <section className="mt-3 overflow-hidden rounded-2xl border-2 border-[#D4AF37] shadow-sm">
            <div className="grid md:grid-cols-[150px_1fr]">

              <div className="flex min-h-[145px] items-center justify-center border-b-2 border-[#D4AF37] bg-gradient-to-br from-[#D8D4CC] via-[#B58A68] to-[#8B5E3C] md:border-b-0 md:border-r-2">
                <div className="flex h-[92px] w-[92px] items-center justify-center rounded-2xl border border-[#E8C85A] bg-[#064E59] shadow-inner">
                  <span className="flex h-[55px] w-[55px] items-center justify-center [&>svg]:h-[55px] [&>svg]:w-[55px]">
                    <MulticolourAiBrainIcon />
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-center bg-gradient-to-r from-[#064E59] to-[#075A63] px-6 py-5 text-white">
                <p className="text-[16px] font-bold text-[#FFD84D]">
                  Powered by Connect Hub Co.
                </p>

                <p className="mt-3 text-[16px] leading-6 text-white">
                  Helping you find trusted information, understand your options, and move confidently toward the right next step.
                </p>

                <p className="mt-2 text-[15px] leading-6 text-amber-50">
                  <span className="font-normal text-[#FFBF47]">PLEASE MAKE SURE -</span> GenZ AI can make mistakes. Its guidance is informational and supportive. Religious decisions, final service guidance, sensitive matters, and matters requiring professional judgment remain human-led.
                </p>
              </div>

            </div>
          </section>

          {/* AI Panel Container */}
          <div className="mt-4 rounded-3xl border border-orange-200 bg-white p-4 shadow-sm sm:p-5">
            {/* Embedded GenZ AI Engine */}
            <GenZRitualAIEngine category="pitru-moksha-gaya" />
          </div>

        </div>
      </main>
    </PublicHeroShell>
  );
}
