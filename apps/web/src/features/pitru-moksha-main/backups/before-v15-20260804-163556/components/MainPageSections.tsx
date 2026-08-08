"use client";

import { useState } from "react";

import { mainPageSections } from "../data/mainPageContent";
import styles from "../PitruMokshaMainPage.module.css";
import { MainPageSectionBody } from "./MainPageSectionBody";

const initiallyOpen = mainPageSections
  .filter((section) => section.initiallyExpanded)
  .map((section) => section.id);

export function MainPageSections() {
  const [openSections, setOpenSections] =
    useState<readonly string[]>(initiallyOpen);

  function isOpen(sectionId: string) {
    return openSections.includes(sectionId);
  }

  function toggleSection(sectionId: string) {
    setOpenSections((current) =>
      current.includes(sectionId)
        ? current.filter((id) => id !== sectionId)
        : [...current, sectionId],
    );
  }

  function expandAll() {
    setOpenSections(mainPageSections.map((section) => section.id));
  }

  function collapseAll() {
    setOpenSections([]);
  }

  return (
    <section
      className={styles.sectionsWorkspace}
      aria-labelledby="main-page-sections-title"
    >
      <header className={styles.sectionsHeader}>
        <div>
          <p className={styles.eyebrow}>Explore by Subject</p>

          <h2 id="main-page-sections-title">
            PitruMoksha Gaya Information Guide
          </h2>

          <p>
            Every subject remains visible at a glance. Open the sections
            you wish to read; several sections may remain open together.
          </p>
        </div>

        <div
          className={styles.accordionControls}
          aria-label="Information section controls"
        >
          <button type="button" onClick={expandAll}>
            Expand All
          </button>

          <button type="button" onClick={collapseAll}>
            Collapse All
          </button>
        </div>
      </header>

      <div className={styles.sectionList}>
        {mainPageSections.map((section) => {
          const open = isOpen(section.id);
          const triggerId = `${section.id}-trigger`;
          const panelId = `${section.id}-panel`;

          return (
            <article
              className={[
                styles.expandableSection,
                styles[section.tone],
                open ? styles.expandableSectionOpen : "",
              ]
                .filter(Boolean)
                .join(" ")}
              id={section.id}
              key={section.id}
            >
              <h3 className={styles.expandableHeading}>
                <button
                  aria-controls={panelId}
                  aria-expanded={open}
                  className={styles.expandableTrigger}
                  id={triggerId}
                  onClick={() => toggleSection(section.id)}
                  type="button"
                >
                  <span className={styles.sectionNumber}>
                    {section.number}
                  </span>

                  <span className={styles.sectionTitleGroup}>
                    <span className={styles.sectionTitle}>
                      {section.title}
                    </span>

                    <span className={styles.sectionSubtitle}>
                      {section.subtitle}
                    </span>

                    <span className={styles.sectionSummary}>
                      {section.summary}
                    </span>
                  </span>

                  <span
                    className={styles.expandableIndicator}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
              </h3>

              {open ? (
                <div
                  aria-labelledby={triggerId}
                  className={styles.expandablePanel}
                  id={panelId}
                  role="region"
                >
                  <MainPageSectionBody sectionId={section.id} />
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
