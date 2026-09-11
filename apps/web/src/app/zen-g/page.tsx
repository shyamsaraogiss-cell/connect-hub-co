'use client';

import { PublicHeroShell } from '@/features/public-shell';
import { GenZRitualAIEngine } from '@/features/ai/components/GenZRitualAIEngine';

export default function ZenGPage() {
  return (
    <PublicHeroShell>
      <main className="min-h-[calc(100vh-4.5rem)] bg-gradient-to-b from-[#eef6f8] via-[#fffdfa] to-[#f7f1e4] px-3 py-3 text-stone-900 sm:px-5 sm:py-4">
        <div className="mx-auto flex h-[min(820px,calc(100vh-5.5rem))] max-w-5xl flex-col">
          <GenZRitualAIEngine category="pitru-moksha-gaya" />
        </div>
      </main>
    </PublicHeroShell>
  );
}
