import Link from "next/link";

import { heritageSectionContent } from "../data/mainPageDetailsPartOne";
import styles from "../PitruMokshaMainPage.module.css";
import { Paragraphs } from "./SectionPrimitives";

export function HeritageSection() {
  const content = heritageSectionContent;

  return (
    <div className={styles.sectionBody}>
      <Paragraphs paragraphs={content.introduction} />

      <section className={styles.innerPanel}>
        <h4>{content.ritualSignificance.title}</h4>

        <Paragraphs
          paragraphs={content.ritualSignificance.paragraphs}
        />
      </section>

      <section className={styles.innerPanel}>
        <h4>{content.vahiRecords.title}</h4>

        <Paragraphs paragraphs={content.vahiRecords.paragraphs} />

        <aside className={styles.limitationNote}>
          {content.vahiRecords.limitation}
        </aside>

        <Link
          className={styles.inlineLink}
          href={content.vahiRecords.action.href}
        >
          {content.vahiRecords.action.label}
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <section className={styles.innerPanel}>
        <h4>{content.whyGaya.title}</h4>

        <Paragraphs paragraphs={content.whyGaya.paragraphs} />
      </section>
    </div>
  );
}
