"use client";

import Link from "next/link";
import { useState } from "react";
import { heroSlides } from "../data/homepageHeroSlides";
import { GoldenCoreServicesBand } from "./GoldenCoreServicesBand";
import { HeroAssistantPanel } from "./HeroAssistantPanel";
import { HeroSlide } from "../../public-shell/components/HeroSlide";
import styles from "../../public-shell/components/HeroCarousel.module.css";

const heroOneTrust = [
  "Guiding Families on the Path of Ancestral Peace and Moksha",
  "Confidentiality-First Support",
  "Complete Privacy",
  "Verified Pandas",
] as const;

function trustItemsFor(slide: (typeof heroSlides)[number]) {
  if (slide.id === "pitru-moksha-gaya") return heroOneTrust;
  return slide.trustItems?.length ? slide.trustItems : slide.keyBenefits ?? [];
}

export function GoldenHeroCarousel({ carouselMode, fixedSlideId }: { carouselMode?: string; fixedSlideId?: string } = {}) {
  const isStatic = carouselMode === "static";
  const initialIndex = fixedSlideId ? Math.max(0, heroSlides.findIndex((item) => item.id === fixedSlideId)) : 0;
  const [current, setCurrent] = useState(initialIndex);
  const total = heroSlides.length;
  const slide = heroSlides[current] ?? heroSlides[0];
  const isHeroOne = slide.id === "pitru-moksha-gaya";
  const trustItems = trustItemsFor(slide);
  const variant = isHeroOne ? styles.heroOneCarousel : slide.id === "ritual-services" ? styles.ritualCarousel : slide.id === "travel-assistance" ? styles.travelCarousel : "";
  const move = (direction: -1 | 1) => { if (!isStatic && total > 1) setCurrent((index) => (index + direction + total) % total); };

  return (
    <section className={`${styles.carouselRegion} ${variant} sitaram-carousel-region ${isHeroOne ? "sitaram-hero-one" : ""}`} aria-roledescription="carousel" aria-label="Featured sacred services" tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); }}>
      <div className={`${styles.rotatingHeroUnit} sitaram-rotating-unit`} role="group" aria-roledescription="slide" aria-label={`${current + 1} of ${total}`}>
        <div className={`${styles.upperHeroGrid} sitaram-upper-hero-grid`}>
          <div className={styles.heroMainColumn}>
            <div className={styles.heroCardWithFooter}>
              {!isStatic ? <><button className={`${styles.carouselArrow} ${styles.previous}`} type="button" onClick={() => move(-1)} aria-label="Show previous hero">‹</button><button className={`${styles.carouselArrow} ${styles.next}`} type="button" onClick={() => move(1)} aria-label="Show next hero">›</button></> : null}
              <HeroSlide slide={slide} />
              {trustItems.length ? <div className={`${styles.heroTrustFooter} ${isHeroOne ? styles.heroOneTrustFooter : ""}`} aria-label={slide.trustTitle ?? `${slide.title} trust information`}>{trustItems.map((item) => <span className={styles.trustCell} key={item}><i aria-hidden="true">✓</i>{item}</span>)}</div> : null}
            </div>
          </div>
          <HeroAssistantPanel slide={slide} />
        </div>
        <Link className={`${styles.exploreBar} sitaram-explore-bar`} href={slide.primaryHref}><span className={styles.exploreIcon} aria-hidden="true">♜</span><span><strong>{slide.exploreTitle}</strong><small>{slide.exploreCopy}</small></span><b aria-hidden="true">›</b></Link>
        {!isStatic ? <div className={`${styles.dots} sitaram-carousel-dots`} aria-label={`Hero ${current + 1} of ${total}`}>{heroSlides.map((_, index) => <span className={index === current ? styles.activeDot : ""} key={index} />)}</div> : null}
        <div className={`${styles.heroCoreServices} sitaram-core-services-region`}><GoldenCoreServicesBand slide={slide} /></div>
      </div>
    </section>
  );
}
