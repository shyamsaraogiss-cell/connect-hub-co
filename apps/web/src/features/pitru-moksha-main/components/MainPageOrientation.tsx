import Link from "next/link";

import { mainPageOpening } from "../data/mainPageContent";
import styles from "../PitruMokshaMainPage.module.css";

export function MainPageOrientation() {
  return (
    <section
      className={styles.orientation}
      aria-labelledby="pitru-main-orientation-title"
    >
      <div className={styles.orientationHeading}>
        <p className={styles.eyebrow}>{mainPageOpening.eyebrow}</p>

        <h2 id="pitru-main-orientation-title">
          {mainPageOpening.title}
        </h2>

        <p className={styles.orientationSubtitle}>
          {mainPageOpening.subtitle}
        </p>

        <p className={styles.promise}>
          {mainPageOpening.promise}
        </p>
      </div>

      <div className={styles.orientationIntroduction}>
        {mainPageOpening.introduction.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <aside className={styles.orientationCaution}>
        <strong>{mainPageOpening.cautionTitle}</strong>
        <p>{mainPageOpening.caution}</p>
      </aside>

      <p className={styles.ritualOverview}>
        {mainPageOpening.ritualOverview}
      </p>

      <div className={styles.pathwayWorkspace}>
        <div className={styles.pathwayHeading}>
          <h3>{mainPageOpening.pathwayIntroduction}</h3>
          <p>{mainPageOpening.guidance}</p>
        </div>

        <div className={styles.pathwayGrid}>
          {mainPageOpening.pathways.map((pathway) => (
            <article className={styles.pathwayCard} key={pathway.title}>
              <h4>{pathway.title}</h4>
              <p>{pathway.description}</p>

              <Link href={pathway.href}>
                Explore {pathway.title}
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <nav
        className={styles.orientationActions}
        aria-label="PitruMoksha Gaya pathway actions"
      >
        {mainPageOpening.actions.map((action, index) => (
          <Link
            className={
              index === 0
                ? styles.primaryButton
                : styles.secondaryButton
            }
            href={action.href}
            key={action.href}
          >
            {action.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
