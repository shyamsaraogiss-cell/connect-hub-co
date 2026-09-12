'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { homeLandingContent } from '../content';
import styles from '../HomeLanding.module.css';
import { nextOpenPanelId } from '../whyUsAccordion';

export function WhyUsSection() {
  const { whyUs } = homeLandingContent;
  const [openId, setOpenId] = useState<string | null>(whyUs.defaultOpenId);

  return (
    <section className={styles.whyUs} aria-labelledby="home-why-us-title">
      <div className={styles.whyUsInner}>
        <p className={styles.whyUsEyebrow}>{whyUs.eyebrow}</p>
        <h2 id="home-why-us-title" className={styles.whyUsTitle}>
          {whyUs.title}
        </h2>
        <p className={styles.whyUsSupport}>{whyUs.support}</p>

        <div className={styles.whyUsAccordion}>
          {whyUs.panels.map((panel) => {
            const isOpen = openId === panel.id;
            const panelBodyId = `why-us-panel-${panel.id}`;

            return (
              <div key={panel.id} className={styles.whyUsRow}>
                <button
                  type="button"
                  className={styles.whyUsTrigger}
                  aria-expanded={isOpen}
                  aria-controls={panelBodyId}
                  onClick={() => setOpenId((current) => nextOpenPanelId(current, panel.id))}
                >
                  <span className={styles.whyUsNumber} aria-hidden="true">
                    ({panel.number})
                  </span>
                  <span className={styles.whyUsRowTitle}>{panel.title}</span>
                  <span className={styles.whyUsIcon} aria-hidden="true">
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      +
                    </motion.span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelBodyId}
                      className={styles.whyUsPanel}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className={styles.whyUsPanelInner}>
                        <p className={styles.whyUsBody}>{panel.body}</p>
                        <p className={styles.whyUsMeaningsLabel}>What this means</p>
                        <ul className={styles.whyUsMeanings}>
                          {panel.meanings.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
