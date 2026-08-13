import Link from "next/link";
import { coreServices } from "./data/heroSlides";
import styles from "./HeroCarousel.module.css";

export function CoreServicesBand() {
  return (
    <section className={styles.coreServices} aria-labelledby="core-services-title">
      <h2 id="core-services-title">Our Core Services</h2>
      <div className={styles.serviceGrid}>
        {(coreServices || []).map((service: any, idx: number) => {
          const targetHref = service.href || service.primaryHref || service.exploreRoute || service.route || "#";
          
          return (
            <Link 
              href={targetHref} 
              key={service.id || service.label || idx} 
              title={service.testMode ? "Test-mode, non-transactional destination" : undefined}
            >
              <span aria-hidden="true">{service.icon || "🕉"}</span>
              <strong>{service.label || service.title || "Service"}</strong>
              {service.testMode ? <small>Test mode</small> : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}