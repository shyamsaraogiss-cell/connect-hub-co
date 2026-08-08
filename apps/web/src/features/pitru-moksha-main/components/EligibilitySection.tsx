import { eligibilitySectionContent } from "../data/mainPageDetailsPartOne";
import styles from "../PitruMokshaMainPage.module.css";
import {
  ActionLinks,
  BulletList,
  Paragraphs,
} from "./SectionPrimitives";

export function EligibilitySection() {
  const content = eligibilitySectionContent;

  return (
    <div className={styles.sectionBody}>
      <Paragraphs paragraphs={content.introduction} />

      <section className={styles.innerPanel}>
        <h4>{content.sankalp.title}</h4>
        <p>{content.sankalp.description}</p>

        <BulletList items={content.sankalp.requirements} />

        <aside className={styles.guidanceNote}>
          {content.sankalp.unknownInformation}
        </aside>
      </section>

      <section className={styles.innerPanel}>
        <h4>{content.timing.title}</h4>
        <Paragraphs paragraphs={content.timing.paragraphs} />
      </section>

      <section className={styles.innerPanel}>
        <h4>{content.samagri.title}</h4>
        <Paragraphs paragraphs={content.samagri.paragraphs} />

        <aside className={styles.limitationNote}>
          {content.samagri.caution}
        </aside>
      </section>

      <section className={styles.innerPanel}>
        <h4>{content.confirmedBeforePerformance.title}</h4>

        <BulletList
          items={content.confirmedBeforePerformance.items}
        />
      </section>

      <ActionLinks actions={[content.action]} />
    </div>
  );
}
