import { founderSectionContent } from "../data/mainPageDetailsPartTwo";
import styles from "../PitruMokshaMainPage.module.css";
import {
  ActionLinks,
  BulletList,
  Paragraphs,
} from "./SectionPrimitives";

export function FounderSection() {
  const content = founderSectionContent;

  return (
    <div className={styles.sectionBody}>
      <Paragraphs paragraphs={content.introduction} />

      <section className={styles.innerPanel}>
        <h4>{content.commitmentTitle}</h4>
        <BulletList items={content.commitments} />
      </section>

      <section className={styles.assurancePanel}>
        <h4>Founder Assurance</h4>
        <BulletList items={content.assurance} />
      </section>

      <section className={styles.protectedPanel}>
        <h4>{content.publicVerification.title}</h4>
        <p>{content.publicVerification.description}</p>

        <div className={styles.statusList}>
          {content.publicVerification.permittedStatuses.map(
            (status) => (
              <span key={status}>{status}</span>
            ),
          )}
        </div>
      </section>

      <ActionLinks actions={content.actions} />
    </div>
  );
}
