'use client';

import dynamic from 'next/dynamic';
import type { GenZRitualAIEngineProps } from './GenZRitualAIEngine';

export const LazyGenZRitualAIEngine = dynamic<GenZRitualAIEngineProps>(
  () => import('./GenZRitualAIEngine').then((mod) => mod.GenZRitualAIEngine),
  {
    loading: () => (
      <div className="w-full p-6 rounded-2xl bg-amber-50/50 border border-stone-200 animate-pulse text-stone-500 text-xs">
        Loading Ask GenZ AI Engine…
      </div>
    ),
    ssr: false,
  }
);
