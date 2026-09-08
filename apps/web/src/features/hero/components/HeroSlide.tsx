import type { CSSProperties } from 'react';

import type { HeroSlideData } from '@/features/hero/types/hero.types';
import styles from '@/features/public-shell/components/HeroCarousel.module.css';

export interface HeroSlideProps {
  readonly slide: HeroSlideData;
}

export function HeroSlide({ slide }: HeroSlideProps) {
  const backgroundStyle: CSSProperties | undefined = slide.backgroundAsset?.runtimePath
    ? {
        backgroundImage: `url(${slide.backgroundAsset.runtimePath})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }
    : undefined;

  return (
    <article
      aria-label={slide.accessibility.label}
      data-hero-id={slide.id}
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        minWidth: 0,
        minHeight: 0,
        flexDirection: 'column',
      }}
    >
      <div
        className={styles.slide}
        style={{ ...backgroundStyle, flex: '1 1 auto', minHeight: 0 }}
      >
        <div className={styles.heroCopy} style={{ minHeight: 0 }}>
          {slide.brand ? <p>{slide.brand}</p> : null}
          {slide.philosophy ? <p className={styles.tagline}>{slide.philosophy}</p> : null}
          <h1>{slide.title}</h1>
          {slide.promise ? <p className={styles.tagline}>{slide.promise}</p> : null}
          {slide.body ? <p className={styles.supportingCopy}>{slide.body}</p> : null}
          {slide.bullets.length > 0 ? (
            <ul className={styles.servicePoints}>
              {slide.bullets.map((bullet) => (
                <li key={bullet}>
                  <span aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
          {slide.representativeLabel ? (
            <p className={styles.supportingCopy}>{slide.representativeLabel}</p>
          ) : null}
          {slide.closingLine ? (
            <p className={styles.supportingCopy}>{slide.closingLine}</p>
          ) : null}
        </div>
      </div>

      {slide.trustItems.length > 0 ? (
        <footer className={styles.heroTrustFooter}>
          {slide.trustItems.map((trustItem) => (
            <span className={styles.trustCell} key={trustItem}>
              <span className={styles.trustLabel}>{trustItem}</span>
            </span>
          ))}
        </footer>
      ) : null}
    </article>
  );
}
