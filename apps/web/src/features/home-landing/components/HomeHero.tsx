'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { homeLandingContent } from '../content';
import styles from '../HomeLanding.module.css';

const AUTOPLAY_MS = 6000;

export function HomeHero() {
  const { brand, slides } = homeLandingContent;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const slide = slides[index] ?? slides[0];
  const count = slides.length;

  const goTo = useEffectEvent((next: number) => {
    setIndex(((next % count) + count) % count);
  });

  const goNext = useEffectEvent(() => {
    goTo(index + 1);
  });

  const goPrev = useEffectEvent(() => {
    goTo(index - 1);
  });

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || count < 2) return;
    const id = window.setInterval(() => goNext(), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, count, index]);

  return (
    <section
      className={styles.hero}
      aria-label="Connect Hub Co. service carousel"
      aria-roledescription="carousel"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          goNext();
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          goPrev();
        }
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchStartX.current;
        const end = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (start == null || end == null) return;
        const delta = end - start;
        if (Math.abs(delta) < 48) return;
        if (delta < 0) goNext();
        else goPrev();
      }}
    >
      {slides.map((item, i) => (
        <div
          key={item.id}
          className={`${styles.heroMedia} ${i === index ? styles.heroMediaActive : ''}`}
          aria-hidden={i !== index}
        >
          <Image
            src={item.image.src}
            alt={i === index ? item.image.alt : ''}
            fill
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      <div className={styles.heroOverlay} aria-hidden="true" />

      <div className={styles.heroInner} aria-live="polite">
        <p className={styles.brand}>{brand}</p>
        <h1 className={styles.headline}>{slide.headline}</h1>
        <p className={styles.support}>{slide.support}</p>
        <Link className={styles.cta} href={slide.cta.href}>
          {slide.cta.label}
        </Link>
      </div>

      <div className={styles.heroControls}>
        <button type="button" className={styles.heroArrow} aria-label="Previous slide" onClick={goPrev}>
          ‹
        </button>
        <div className={styles.heroDots} role="tablist" aria-label="Slide selectors">
          {slides.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${item.headline}`}
              className={`${styles.heroDot} ${i === index ? styles.heroDotActive : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button type="button" className={styles.heroArrow} aria-label="Next slide" onClick={goNext}>
          ›
        </button>
      </div>
    </section>
  );
}
