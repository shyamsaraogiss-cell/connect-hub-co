import Link from 'next/link';
import type { BusinessPageIconName } from './BusinessPageIcon';
import { BusinessPageIcon } from './BusinessPageIcon';
import { PublicHeroShell } from '@/features/public-shell';
import styles from './BusinessPageShell.module.css';

export type BusinessJourney = { title: string; supportingLine?: string; description: string; href: string; cta: string; icon: BusinessPageIconName };
export type BusinessStep = { title: string; description: string };
export type BusinessFaq = { question: string; answer: string };
export type BusinessRelatedLink = { label: string; href: string };
export type BusinessPageShellProps = {
  breadcrumb: readonly { label: string; href?: string }[];
  eyebrow: string; title: string; introduction: string; supportingLine: string;
  journeys: readonly BusinessJourney[];
  overviewTitle: string; overviewCopy: string; overviewPoints: readonly string[];
  steps: readonly BusinessStep[]; trustItems: readonly string[]; faqs: readonly BusinessFaq[];
  relatedLinks: readonly BusinessRelatedLink[]; inquiryHref: string; embedded?: boolean;
};

export function BusinessPageFrame({ breadcrumb, children, className = '', embedded = false }: { breadcrumb: BusinessPageShellProps['breadcrumb']; children: React.ReactNode; className?: string; embedded?: boolean }) {
  const content = (
      <main className={`${styles.page} business-inner-page ${className}`}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <ol>
            {breadcrumb.map((item, index) => (
              <li key={item.label}>
                {index ? <span aria-hidden="true">/</span> : null}
                {item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        {children}
      </main>
  );
  return embedded ? content : <PublicHeroShell>{content}</PublicHeroShell>;
}

export function BusinessPageShell(props: BusinessPageShellProps) {
  return (
    <BusinessPageFrame breadcrumb={props.breadcrumb} embedded={props.embedded}>
      <section className={styles.hero} aria-labelledby="business-page-title">
        <div><p className={styles.eyebrow}>{props.eyebrow}</p><h1 id="business-page-title">{props.title}</h1><p className={styles.introduction}>{props.introduction}</p><p className={styles.supportingLine}>{props.supportingLine}</p><div className={styles.heroActions}><Link className={styles.primaryAction} href="#choose-your-journey">Choose Your Journey</Link><Link className={styles.secondaryAction} href={props.inquiryHref}>Raise an Inquiry</Link></div></div>
        <div className={styles.heroMark} aria-hidden="true"><BusinessPageIcon name="guide" /></div>
      </section>
      <section className={styles.section} id="choose-your-journey" aria-labelledby="journey-title"><header className={styles.sectionHeading}><p>PATHWAYS</p><h2 id="journey-title">Choose Your Journey</h2></header><div className={`${styles.journeyGrid} ${props.journeys.length === 2 ? styles.twoJourneys : ''}`}>{props.journeys.map((journey) => <article className={styles.journeyCard} key={journey.href}><span className={styles.cardIcon}><BusinessPageIcon name={journey.icon} /></span><h3>{journey.title}</h3>{journey.supportingLine ? <strong className={styles.journeyLead}>{journey.supportingLine}</strong> : null}<p>{journey.description}</p><Link href={journey.href} aria-label={`${journey.cta}: ${journey.title}`}>{journey.cta}<span aria-hidden="true">→</span></Link></article>)}</div></section>
      <section className={`${styles.section} ${styles.overview}`} aria-labelledby="overview-title"><div><p className={styles.sectionLabel}>OVERVIEW</p><h2 id="overview-title">{props.overviewTitle}</h2><p>{props.overviewCopy}</p></div><ul>{props.overviewPoints.map((point) => <li key={point}><BusinessPageIcon name="check" /><span>{point}</span></li>)}</ul></section>
      <section className={styles.section} aria-labelledby="process-title"><header className={styles.sectionHeading}><p>PROCESS</p><h2 id="process-title">How the Service Works</h2></header><ol className={styles.processGrid}>{props.steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></section>
      <section className={`${styles.section} ${styles.trust}`} aria-labelledby="trust-title"><header className={styles.sectionHeading}><p>TRUST &amp; VERIFICATION</p><h2 id="trust-title">Support Built Around Care and Clarity</h2></header><ul>{props.trustItems.map((item) => <li key={item}><BusinessPageIcon name="check" /><span>{item}</span></li>)}</ul></section>
      <section className={`${styles.section} ${styles.support}`} aria-labelledby="support-title"><div><p className={styles.sectionLabel}>GUIDED SUPPORT</p><h2 id="support-title">Ask GenZ Ritual AI or Raise an Inquiry</h2><p>Use guided assistance to understand available pathways and prepare your request. Final coordination is reviewed by the authorised team and verified Religious Partners.</p></div><div className={styles.supportActions}><Link href="/zen-g">Open GenZ Ritual AI</Link><Link href={props.inquiryHref}>Raise an Inquiry</Link></div></section>
      <section className={styles.section} id="faqs" aria-labelledby="faq-title"><header className={styles.sectionHeading}><p>FAQ PREVIEW</p><h2 id="faq-title">Common Questions</h2></header><div className={styles.faqs}>{props.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
      <section className={styles.cta} aria-labelledby="cta-title"><div><p>READY TO BEGIN?</p><h2 id="cta-title">Choose the Right PitruMoksha Gaya Pathway</h2><p>Share your requirement for guided next steps and verified coordination.</p></div><Link href={props.inquiryHref}>Raise an Inquiry</Link></section>
      <nav className={styles.related} aria-label="Related PitruMoksha Gaya navigation"><strong>Related navigation</strong><div>{props.relatedLinks.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div></nav>
    </BusinessPageFrame>
  );
}
