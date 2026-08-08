import { serviceFrameworkSectionContent } from "../data/mainPageDetailsPartTwo";
import styles from "../PitruMokshaMainPage.module.css";
import {
  ActionLinks,
  BulletList,
} from "./SectionPrimitives";

export function ServiceFrameworkSection() {
  const content = serviceFrameworkSectionContent;

  return (
    <div className={styles.sectionBody}>
      <p>{content.introduction}</p>

      <h4 className={styles.groupHeading}>
        {content.principalRitesTitle}
      </h4>

      <div className={styles.ritualGrid}>
        {content.principalRites.map((ritual) => (
          <article className={styles.ritualCard} key={ritual.title}>
            <h5>{ritual.title}</h5>
            <p>{ritual.description}</p>
            <span>{ritual.suitability}</span>
          </article>
        ))}
      </div>

      <section className={styles.innerPanel}>
        <h4>{content.additionalRites.title}</h4>
        <p>{content.additionalRites.description}</p>

        <aside className={styles.limitationNote}>
          {content.additionalRites.limitation}
        </aside>
      </section>

      <h4 className={styles.groupHeading}>
        {content.participationTitle}
      </h4>

      <div className={styles.participationGrid}>
        {content.participationModes.map((mode) => (
          <article
            className={styles.participationCard}
            key={mode.title}
          >
            <h5>{mode.title}</h5>
            <p>{mode.description}</p>
          </article>
        ))}
      </div>

      <aside className={styles.guidanceNote}>
        {content.participationNotice}
      </aside>

      <section className={styles.innerPanel}>
        <h4>{content.assistanceTitle}</h4>
        <BulletList items={content.assistanceFeatures} />
      </section>

      <ActionLinks actions={content.actions} />
    </div>
  );
}
