'use client';

import { GenZRitualAIEngine } from '@/features/ai/components/GenZRitualAIEngine';
import type { BusinessCategory } from '@/features/ai/types/ai.types';
import styles from '../../public-shell/components/HeroCarousel.module.css';

type AssistantSlide = {
  id: string;
};

const slideCategoryMap: Record<string, BusinessCategory> = {
  'pitru-moksha-gaya': 'pitru-moksha-gaya',
  'gaya-pitru-moksha': 'pitru-moksha-gaya',
  'pitru-moksha-online': 'pitru-moksha-gaya',
  'ritual-services': 'ritual-services',
  'travel-assistance': 'travel-assistance',
  'vahi-records': 'vahi-records',
  'religious-partner-network': 'religious-partners',
};

export function HeroAssistantPanel({
  slide,
  standalone = false,
}: {
  slide: AssistantSlide;
  standalone?: boolean;
}) {
  const category = slideCategoryMap[slide.id];

  if (!category) return null;

  return (
    <aside
      className={`${styles.assistant} ${standalone ? styles.standaloneAssistant : ''} ai-panel-wrapper`}
      aria-labelledby="hero-assistant-title"
    >
      <GenZRitualAIEngine key={category} category={category} />
    </aside>
  );
}


