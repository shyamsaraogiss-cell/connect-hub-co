import type { Metadata } from "next";

import { StaticBusinessHeroPage } from "@/components/business-pages/StaticBusinessHeroPage";
import { PitruMokshaGayaMainContent } from "@/features/pitru-moksha-main/components/PitruMokshaGayaMainContent";

export const metadata: Metadata = {
  title: "PitruMoksha Gaya Sacred Coordination | Connect Hub Co.",
  description:
    "Explore PitruMoksha Gaya ancestral ritual guidance, verified Religious Partner coordination, online and offline service pathways, and Vahi Records assistance.",
};

export default function PitruMokshaGayaPage() {
  return (
    <StaticBusinessHeroPage slideId="pitru-moksha-gaya">
      <PitruMokshaGayaMainContent />
    </StaticBusinessHeroPage>
  );
}
