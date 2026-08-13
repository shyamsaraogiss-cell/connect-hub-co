import { HERO_ONE_CORE_SERVICES } from "@/config/khem-navigation.config";
import type { HeroSlideData } from "../types/hero.types";
import styles from "../../public-shell/components/HeroCarousel.module.css";

export function GoldenCoreServicesBand({ slide }: { slide: HeroSlideData }) {
  const services = slide.id === "pitru-moksha-gaya"
    ? HERO_ONE_CORE_SERVICES
    : (slide.featureItems?.length ? slide.featureItems : slide.servicePoints.map((item) => item.label))
        .slice(0, 8)
        .map((label) => ({ label, icon: "•" }));

  if (!services.length) return null;

  return (
    <section className={styles.coreServices} aria-labelledby={`core-services-${slide.id}`}>
      <h2 id={`core-services-${slide.id}`}>Our Core Services</h2>
      <div className={`${styles.serviceGrid} ${styles.heroOneServiceGrid}`}>
        {HERO_ONE_CORE_SERVICES.map((service) => (
          <div className={styles.serviceCard} key={service.label}>
            <span aria-hidden="true">{service.icon}</span>
            <strong>{service.label}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
