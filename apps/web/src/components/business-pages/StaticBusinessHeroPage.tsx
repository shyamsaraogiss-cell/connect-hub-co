import { Suspense, type ReactNode } from 'react';
import { HeroCarousel } from '@/features/hero';
import { PublicHeroShell } from '@/features/public-shell';

export function StaticBusinessHeroPage({ slideId, children }: { slideId: string; children?: ReactNode }) {
  return (
    <PublicHeroShell>
      <Suspense fallback={null}>
        <HeroCarousel carouselMode="static" fixedSlideId={slideId} />
      </Suspense>
      {children}
    </PublicHeroShell>
  );
}
