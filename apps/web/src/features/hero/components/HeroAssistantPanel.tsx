'use client';

import type { HeroSlideData } from '../types/hero.types';
import { GenZRitualAIEngine } from '@/features/ai/components/GenZRitualAIEngine';
import type { BusinessCategory } from '@/features/ai/types/ai.types';
import styles from '../HeroCarousel.module.css';

type AssistantSlide = Pick<
  HeroSlideData,
  | 'id'
  | 'title'
  | 'assistantTitle'
  | 'assistantSubtitle'
  | 'assistantIntro'
  | 'assistantPrompts'
  | 'assistantPlaceholder'
  | 'defaultGuidance'
>;

const slideCategoryMap: Record<string, BusinessCategory> = {
  'pitru-moksha-gaya': 'pitru-moksha-gaya',
  'gaya-pitru-moksha': 'pitru-moksha-gaya',
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
  const category: BusinessCategory = slideCategoryMap[slide.id] || 'pitru-moksha-gaya';

  return (
    <aside
      className={`${styles.assistant} ${standalone ? styles.standaloneAssistant : ''} ai-panel-wrapper`}
      aria-labelledby="hero-assistant-title"
    >
      <GenZRitualAIEngine category={category} />
    </aside>
  );
}
