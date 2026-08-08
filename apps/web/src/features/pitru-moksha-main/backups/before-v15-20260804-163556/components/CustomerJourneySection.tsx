import { customerJourneySectionContent } from "../data/mainPageDetailsPartTwo";
import styles from "../PitruMokshaMainPage.module.css";
import {
  ActionLinks,
  BulletList,
} from "./SectionPrimitives";

export function CustomerJourneySection() {
  const content = customerJourneySectionContent;

  return (
    <div className={styles.sectionBody}>
      <p>{content.introduction}</p>

      <div className={styles.journeyGrid}>
        {content.steps.map((step) => (
          <article className={styles.journeyCard} key={step.number}>
            <span>{step.number}</span>

            <div>
              <h5>{step.title}</h5>
              <p>{step.description}</p>
            </div>
          </article>
        ))}
      </div>

      <section className={styles.innerPanel}>
        <h4>{content.informationTitle}</h4>
        <BulletList items={content.information} />
      </section>

      <ActionLinks actions={content.actions} />
    </div>
  );
}
