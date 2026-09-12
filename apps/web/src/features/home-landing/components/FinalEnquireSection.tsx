import Link from 'next/link';
import { homeLandingContent } from '../content';
import styles from '../HomeLanding.module.css';

export function FinalEnquireSection() {
  const { finalEnquire } = homeLandingContent;

  return (
    <section className={styles.finalBand} aria-labelledby="home-final-enquire-title">
      <div className={styles.section}>
        <h2 id="home-final-enquire-title" className={styles.sectionTitle}>
          {finalEnquire.title}
        </h2>
        <p className={styles.sectionBody}>{finalEnquire.body}</p>
        <Link className={styles.cta} href={finalEnquire.cta.href}>
          {finalEnquire.cta.label}
        </Link>
      </div>
    </section>
  );
}
