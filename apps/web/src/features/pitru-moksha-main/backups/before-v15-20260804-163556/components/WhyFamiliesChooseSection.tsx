import { whyFamiliesChooseSectionContent } from "../data/mainPageDetailsPartOne";
import styles from "../PitruMokshaMainPage.module.css";
import { Paragraphs } from "./SectionPrimitives";

export function WhyFamiliesChooseSection() {
  const content = whyFamiliesChooseSectionContent;

  return (
    <div className={styles.sectionBody}>
      <Paragraphs paragraphs={content.introduction} />

      <h4 className={styles.groupHeading}>
        {content.familyReceivesTitle}
      </h4>

      <div className={styles.informationGrid}>
        {content.familyReceives.map((item) => (
          <article className={styles.informationCard} key={item.title}>
            <h5>{item.title}</h5>
            <p>{item.description}</p>
          </article>
        ))}
      </div>

      <h4 className={styles.groupHeading}>
        {content.supportPillarsTitle}
      </h4>

      <div className={styles.pillarGrid}>
        {content.supportPillars.map((pillar) => (
          <article className={styles.pillarCard} key={pillar.title}>
            <h5>{pillar.title}</h5>
            <p>{pillar.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
