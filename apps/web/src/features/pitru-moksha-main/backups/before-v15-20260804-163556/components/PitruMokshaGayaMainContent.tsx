import Link from "next/link";

import { BusinessPageFrame } from "@/components/business-pages/BusinessPageShell";

import { mainPageClosing } from "../data/mainPageContent";
import styles from "../PitruMokshaMainPage.module.css";
import { MainPageOrientation } from "./MainPageOrientation";
import { MainPageSections } from "./MainPageSections";

const breadcrumb = [
  { label: "Connect Hub Co.", href: "/" },
  { label: "PitruMoksha Gaya" },
] as const;

export function PitruMokshaGayaMainContent() {
  return (
    <BusinessPageFrame breadcrumb={breadcrumb} embedded>
      <main className={styles.mainPage}>
        <MainPageOrientation />

        <MainPageSections />

        <section
          className={styles.closingSection}
          aria-labelledby="pitru-moksha-closing-title"
        >
          <div className={styles.closingInner}>
            <div>
              <p className={styles.closingEyebrow}>
                {mainPageClosing.eyebrow}
              </p>

              <h2
                className={styles.closingTitle}
                id="pitru-moksha-closing-title"
              >
                {mainPageClosing.title}
              </h2>

              <p className={styles.closingCopy}>
                {mainPageClosing.description}
              </p>
            </div>

            <div className={styles.closingActions}>
              <Link
                className={styles.primaryButton}
                href={mainPageClosing.primaryAction.href}
              >
                {mainPageClosing.primaryAction.label}
              </Link>

              <Link
                className={styles.secondaryButton}
                href={mainPageClosing.secondaryAction.href}
              >
                {mainPageClosing.secondaryAction.label}
              </Link>
            </div>
          </div>
        </section>

        <p className={styles.scopeNotice}>
          <strong>Scope notice: </strong>
          {mainPageClosing.scopeNotice}
        </p>
      </main>
    </BusinessPageFrame>
  );
}
