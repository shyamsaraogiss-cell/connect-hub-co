import { sacredJourneySectionContent } from "../data/mainPageDetailsPartOne";
import styles from "../PitruMokshaMainPage.module.css";
import { Paragraphs } from "./SectionPrimitives";

export function SacredJourneySection() {
  const content = sacredJourneySectionContent;

  return (
    <div className={styles.sectionBody}>
      <Paragraphs paragraphs={content.introduction} />

      <aside className={styles.limitationNote}>
        {content.caution}
      </aside>

      <div className={styles.innerHeading}>
        <h4>{content.sequenceTitle}</h4>
        <p>{content.sequenceSubtitle}</p>
      </div>

      <div
        className={styles.sequenceTable}
        role="table"
        aria-label="Illustrative sacred-location sequence"
      >
        <div className={styles.sequenceHeader} role="row">
          <span role="columnheader">Stage and Location</span>
          <span role="columnheader">Ritual Activity</span>
          <span role="columnheader">Traditional Significance</span>
        </div>

        {content.sequence.map((stage) => (
          <article
            className={styles.sequenceRow}
            role="row"
            key={stage.stage}
          >
            <div className={styles.sequenceLocation} role="cell">
              <span>{stage.stage}</span>
              <strong>{stage.location}</strong>
            </div>

            <p role="cell">{stage.ritual}</p>
            <p role="cell">{stage.significance}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
