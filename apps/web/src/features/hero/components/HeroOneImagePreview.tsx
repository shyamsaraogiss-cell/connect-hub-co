'use client';

import Image from 'next/image';
import { useState } from 'react';

const HERO_ONE_OPTIONS = [
  '/images/heroes/hero-1/Hero_1_PitruMoksha_Gaya_v2.0.png',
  '/images/heroes/hero-2/Hero_2_Ritual_Services_v1.0.png',
  '/images/heroes/hero-3/Hero_3_Travel_Assistance_v1.0.png',
  '/images/heroes/hero-4/Hero_4_Vahi_Records_v1.0.png',
  '/images/heroes/hero-5/Hero_5_Religious_Partner_Network_v1.0.png',
] as const;

export function HeroOneImagePreview() {
  const [activeIndex, setActiveIndex] = useState(0);

  const showPrevious = () => {
    setActiveIndex((current) =>
      (current - 1 + HERO_ONE_OPTIONS.length) % HERO_ONE_OPTIONS.length,
    );
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % HERO_ONE_OPTIONS.length);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        alt={`Hero 1 visual candidate option ${activeIndex + 1}`}
        className={activeIndex >= 2 ? 'object-cover' : 'object-contain'}
        fill
        priority={activeIndex === 0}
        sizes="818px"
        src={HERO_ONE_OPTIONS[activeIndex]}
      />

      <button
        aria-label="Show previous Hero 1 image"
        className="absolute left-2 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-black/45 text-lg leading-none text-white shadow-sm hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        onClick={showPrevious}
        type="button"
      >
        ‹
      </button>

      <button
        aria-label="Show next Hero 1 image"
        className="absolute right-2 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-black/45 text-lg leading-none text-white shadow-sm hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        onClick={showNext}
        type="button"
      >
        ›
      </button>
    </div>
  );
}
