"use client";

import Link from "next/link";
import { useState } from "react";

import { mainInformationContent } from "../data/mainInformationContent";
import styles from "../MainInformationAccordion.module.css";

export function MainInformationAccordion() {
  const [activeId, setActiveId] = useState<string | null>(null);

  function toggleItem(id: string) {
    setActiveId((currentId) => (currentId === id ? null : id));
  }

  return (
    <section
      className={styles.workspace}
      id="main-information"
      aria-labelledby="main-information-title"
    >
      <header className={styles.workspaceHeader}>
        <p className={styles.eyebrow}>EXPLORE PITRUMOKSHA GAYA</p>

        <h2 id="main-information-title">
          Guidance, Heritage, Trust and Service Clarity
        </h2>

        <p className={styles.introduction}>
          Open a subject to understand the service without having to read the
          complete page at once. Each section explains its own purpose,
          boundaries and next step.
        </p>
      </header>

      <div className={styles.accordion}>
        {mainInformationContent.map((item) => {
          const isOpen = activeId === item.id;
          const triggerId = `${item.id.toLowerCase()}-trigger`;
          const panelId = `${item.id.toLowerCase()}-panel`;

          return (
            <article
              className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
              id={item.id.toLowerCase()}
              key={item.id}
            >
              <h3 className={styles.itemHeading}>
                <button
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  className={styles.trigger}
                  id={triggerId}
                  onClick={() => toggleItem(item.id)}
                  type="button"
                >
                  <span className={styles.titleGroup}>
                    <span className={styles.itemNumber}>{item.id}</span>

                    <span className={styles.titleText}>
                      <span className={styles.title}>{item.title}</span>
                      <span className={styles.summary}>{item.summary}</span>
                    </span>
                  </span>

                  <span className={styles.indicator} aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      focusable="false"
                      role="presentation"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
              </h3>

              {isOpen ? (
                <div
                  aria-labelledby={triggerId}
                  className={styles.panel}
                  id={panelId}
                  role="region"
                >
                  <div className={styles.panelInner}>
                    <h4 className={styles.expandedHeading}>
                      {item.expandedHeading}
                    </h4>

                    <div className={styles.content}>
                      {item.sections.map((section, sectionIndex) => (
                        <section
                          className={styles.contentSection}
                          key={`${item.id}-section-${sectionIndex}`}
                        >
                          {section.heading ? (
                            <h5>{section.heading}</h5>
                          ) : null}

                          {section.paragraphs?.map(
                            (paragraph, paragraphIndex) => (
                              <p
                                key={`${item.id}-paragraph-${sectionIndex}-${paragraphIndex}`}
                              >
                                {paragraph}
                              </p>
                            ),
                          )}

                          {section.bullets?.length ? (
                            <ul>
                              {section.bullets.map(
                                (bullet, bulletIndex) => (
                                  <li
                                    key={`${item.id}-bullet-${sectionIndex}-${bulletIndex}`}
                                  >
                                    {bullet}
                                  </li>
                                ),
                              )}
                            </ul>
                          ) : null}
                        </section>
                      ))}
                    </div>

                    <aside className={styles.limitation}>
                      <strong>Scope and limitation</strong>
                      <p>{item.limitation}</p>
                    </aside>

                    <nav
                      aria-label={`${item.title} actions`}
                      className={styles.actions}
                    >
                      {item.actions.map((action, actionIndex) => (
                        <Link
                          className={
                            actionIndex === 0
                              ? styles.primaryAction
                              : styles.secondaryAction
                          }
                          href={action.href}
                          key={`${item.id}-${action.href}`}
                        >
                          {action.label}
                          <span aria-hidden="true">→</span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <p className={styles.guidanceNote}>
        Religious guidance, service availability, pricing and deliverables are
        confirmed through the applicable authorised review and written service
        scope.
      </p>
    </section>
  );
}
