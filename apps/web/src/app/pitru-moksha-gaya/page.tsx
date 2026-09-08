import type { Metadata } from "next";

import { PitruMokshaGayaMainContent } from "@/features/pitru-moksha-main/components/PitruMokshaGayaMainContent";
import { PublicHeroShell } from "@/features/public-shell";
import { VahiStyleTopInfoShell } from "@/components/business-pages/VahiStyleTopInfoShell";

export const metadata: Metadata = {
  title: "PitruMoksha Gaya Sacred Coordination | Connect Hub Co.",
  description:
    "Explore PitruMoksha Gaya ancestral ritual guidance, verified Religious Partner coordination, online and offline service pathways, and Vahi Records assistance.",
};

export default function PitruMokshaGayaPage() {
  return (
    <PublicHeroShell>
      <div className="relative -top-1">
        <VahiStyleTopInfoShell imageSrc="/images/heroes/hero-1/pitrumoksha-gaya-info-hero.png" imageAlign="center" imageFit="cover" imageUnmasked>
          <p className="pointer-events-none absolute inset-y-0 right-6 left-[52%] flex items-center justify-center gap-[0.28em] text-center font-serif text-[clamp(1.05rem,2.25vw,2rem)] font-semibold tracking-[0.08em] text-[#d8dde2] before:content-none after:content-none sm:right-10" style={{ textShadow: "-1px -1px 0 rgba(255,255,255,.65), 1px 1px 0 #7c2d12, 2px 2px 2px rgba(8,127,140,.5), 0 0 3px rgba(212,175,55,.28)" }} aria-hidden="true">
            <span>DAAN</span> <span>DHARMA</span> <span>MOKSHA</span>
          </p>
        </VahiStyleTopInfoShell>
      </div>
      <PitruMokshaGayaMainContent />
    </PublicHeroShell>
  );
}

