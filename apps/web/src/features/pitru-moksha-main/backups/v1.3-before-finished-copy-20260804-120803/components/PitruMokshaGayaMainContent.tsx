import Link from "next/link";

import { BusinessPageFrame } from "@/components/business-pages/BusinessPageShell";

import styles from "../PitruMokshaGayaMainContent.module.css";
import { MainInformationAccordion } from "./MainInformationAccordion";

const breadcrumb = [
  { label: "Connect Hub Co.", href: "/" },
  { label: "PitruMoksha Gaya" },
] as const;

const relatedLinks = [
  {
    label: "Explore Online Services",
    href: "/pitru-moksha-gaya/online",
  },
  {
    label: "Explore Offline Services",
    href: "/pitru-moksha-gaya/offline",
  },
  {
    label: "Explore Vahi Records",
    href: "/vahi-records",
  },
] as const;

export function PitruMokshaGayaMainContent() {
  return (
    <BusinessPageFrame breadcrumb={breadcrumb} embedded>
      <div className={styles.mainContent}>
        <MainInformationAccordion />

        <section
          className={styles.closingSection}
          aria-labelledby="pitru-moksha-closing-title"
        >
          <div className={styles.closingInner}>
            <div>
              <p className={styles.closingEyebrow}>Guided Next Step</p>

              <h2
                className={styles.closingTitle}
                id="pitru-moksha-closing-title"
              >
                Choose the Appropriate PitruMoksha Gaya Pathway
              </h2>

              <p className={styles.closingCopy}>
                Share your family requirement for guided review. The available
                ritual scope, participation mode, Religious Partner
                availability, preparation requirements and service inclusions
                are explained before confirmation.
              </p>
            </div>

            <div className={styles.closingActions}>
              <Link
                className={styles.primaryAction}
                href="/contact?topic=pitru-moksha-gaya"
              >
                Raise an Inquiry
              </Link>

              <Link className={styles.secondaryAction} href="/zen-g">
                Ask GenZ Ritual AI
              </Link>
            </div>
          </div>
        </section>

        <nav
          className={styles.relatedNavigation}
          aria-label="Related PitruMoksha Gaya navigation"
        >
          <div className={styles.relatedInner}>
            <strong className={styles.relatedLabel}>
              Continue to a service pathway
            </strong>

            <div className={styles.relatedLinks}>
              {relatedLinks.map((link) => (
                <Link
                  className={styles.relatedLink}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <p className={styles.scopeNotice}>
          <strong>Scope notice:</strong> Ritual descriptions explain traditional
          customs, beliefs and service coordination. They do not guarantee
          Moksha, liberation, cosmic tranquillity, spiritual potency or any
          particular spiritual outcome. Final services remain subject to the
          approved scope, required information, applicable tradition,
          Religious Partner availability and operating conditions.
        </p>
      </div>
    </BusinessPageFrame>
  );
}
