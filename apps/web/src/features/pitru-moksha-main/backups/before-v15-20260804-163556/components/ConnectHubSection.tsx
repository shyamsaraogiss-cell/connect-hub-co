import { connectHubSectionContent } from "../data/mainPageDetailsPartTwo";
import styles from "../PitruMokshaMainPage.module.css";
import {
  BulletList,
  Paragraphs,
} from "./SectionPrimitives";

export function ConnectHubSection() {
  const content = connectHubSectionContent;

  return (
    <div className={styles.sectionBody}>
      <Paragraphs paragraphs={content.introduction} />

      <div className={styles.informationGrid}>
        <article className={styles.informationCard}>
          <h4>{content.mission.title}</h4>
          <p>{content.mission.description}</p>
        </article>

        <article className={styles.informationCard}>
          <h4>{content.purpose.title}</h4>
          <BulletList items={content.purpose.items} />
        </article>
      </div>

      <blockquote className={styles.companyLine}>
        {content.companyLine}
      </blockquote>

      <aside className={styles.limitationNote}>
        {content.boundary}
      </aside>

      <h4 className={styles.groupHeading}>
        {content.operatingModelTitle}
      </h4>

      <div className={styles.informationGrid}>
        {content.operatingModel.map((item) => (
          <article className={styles.informationCard} key={item.title}>
            <h5>{item.title}</h5>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
