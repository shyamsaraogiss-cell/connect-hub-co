import Link from 'next/link';
import { BusinessPageFrame, type BusinessStep } from '../BusinessPageShell';
import { BusinessPageIcon, type BusinessPageIconName } from '../BusinessPageIcon';
import { HeroAssistantPanel } from '@/features/hero/components/HeroAssistantPanel';
import type { AssistantPrompt } from '@/features/hero/types/hero.types';
import { PITRU_MOKSHA_GAYA_ROUTE } from '@/features/hero/data/heroRoutes';
import styles from './VahiRecordsPage.module.css';

const inquiryHref = '/contact?topic=vahi-records';

export type VahiService = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: BusinessPageIconName;
};

const vahiServices: readonly VahiService[] = [
  {
    id: 'lineage-tracing',
    title: '1. Ancestral Lineage Tracing',
    subtitle: 'Historical Ledger Assistance',
    description: 'Guided support for tracing ancient family records maintained across generations by traditional Panda custodians in Gaya Ji, Kashi, and sacred pilgrimage hubs.',
    icon: 'records',
  },
  {
    id: 'gotra-matching',
    title: '2. Gotra & Native Origin Matching',
    subtitle: 'Traditional Panda Verification',
    description: 'Matching your paternal Gotra, ancestral village, and family deity (Kuldevta) with the authorised traditional priest lineage connected with your family.',
    icon: 'sankalp',
  },
  {
    id: 'ledger-updation',
    title: '3. Sacred Ledger Entry & Updation',
    subtitle: 'Recording New Rituals',
    description: 'Coordinating the official entry of newly performed Pind Daan, Tarpan, or ancestral rites into your family’s traditional hand-written Vahi ledger.',
    icon: 'offering',
  },
  {
    id: 'family-tree',
    title: '4. Family Tree Verification Support',
    subtitle: 'Multi-Generational Record Guidance',
    description: 'Structured assistance for families seeking to understand multi-generational ancestral entries, historical signatures, and pilgrim records.',
    icon: 'details',
  },
  {
    id: 'nri-lineage',
    title: '5. NRI Overseas Lineage Inquiry',
    subtitle: 'Global Roots Verification',
    description: 'Dedicated guidance for NRIs and overseas families seeking to locate and connect with their ancestral roots in India with complete confidentiality.',
    icon: 'virtual',
  },
];

const requiredInfo = [
  {
    title: 'Paternal & Maternal Gotra',
    description: 'Your family Gotra (when known) helps narrow the search to the specific traditional Panda lineage.',
  },
  {
    title: 'Ancestor Names',
    description: 'Names of departed father, grandfather, great-grandfather, and key maternal ancestors.',
  },
  {
    title: 'Ancestral Village & District',
    description: 'Native village, town, district, or state of origin in India prior to migration.',
  },
  {
    title: 'Past Pilgrimage Details',
    description: 'Approximate years or details of previous family visits to Gaya Ji, Kashi, Haridwar, or Nashik.',
  },
] as const;

const steps: readonly BusinessStep[] = [
  {
    title: 'Submit Family Details',
    description: 'Provide your known ancestor names, Gotra, native village/district, and past pilgrimage details privately.',
  },
  {
    title: 'Custodian Review',
    description: 'Our team and authorised traditional Pandas review protected archives and cross-verify family records.',
  },
  {
    title: 'Verification & Guidance',
    description: 'Receive guided feedback on matched lineage ledgers and traditional custodian availability.',
  },
  {
    title: 'Ritual Entry & Record Protection',
    description: 'Record new ancestral rites into traditional Vahis during confirmed rituals with complete privacy.',
  },
];

const trustItems = [
  'Protected Hand-Written Heritage Ledgers',
  'Authorised Custodians & Traditional Pandas',
  'Gotra & Ancestral Origin Verification',
  'Strict Privacy-First Confidentiality Standard',
  'Multi-Generational Ancestral Record Guidance',
  '24×7 Support via GenZ Ritual AI & Human Team',
] as const;

const assistantPrompts: readonly AssistantPrompt[] = [
  {
    id: 'vahi-online-search',
    label: 'Are Vahi or Panji records available for online search?',
    response: 'No. Vahi records are sacred, hand-written ledgers owned by traditional Pandas and are strictly protected. They are never published for open online searching.',
  },
  {
    id: 'gotra-matching',
    label: 'How does Gotra matching work for Vahi records?',
    response: 'We match your Gotra, ancestral village, and family details with traditional priest ledgers to locate the custodian family connected with your lineage.',
  },
  {
    id: 'nri-lineage-inquiry',
    label: 'Can NRI families request lineage verification?',
    response: 'Yes. Overseas families can submit their ancestor names and origin details for confidential guided review by authorised custodians.',
  },
  {
    id: 'new-entry',
    label: 'How are new family entries recorded in the Vahi?',
    response: 'When an ancestral ritual is performed by a verified Religious Partner, your family details and rite particulars are entered into the traditional ledger.',
  },
];

const faqs = [
  {
    question: 'Can I search or view Vahi records online?',
    answer: 'No. Vahi ledgers are private historical registers maintained by traditional Pandas. To protect family privacy and sacred tradition, they are never digitized into open public search databases.',
  },
  {
    question: 'What details are required to locate our family Vahi ledger?',
    answer: 'Providing your Gotra, father’s and grandfather’s names, ancestral native village/district, and approximate dates of previous family visits to Gaya Ji or Kashi greatly assists the search.',
  },
  {
    question: 'Who maintains the authentic Vahi records?',
    answer: 'Vahi ledgers are maintained by authorised, traditional Panda families who have preserved genealogical registers across generations at sacred pilgrimage sites.',
  },
  {
    question: 'Can NRIs or overseas families trace their lineage records?',
    answer: 'Yes. Distance does not prevent lineage verification. Overseas families can share their available details for guided review by authorised custodians.',
  },
  {
    question: 'Is my family information kept confidential?',
    answer: 'Yes. Connect Hub Co. operates on a Privacy-First standard. Only essential details required for custodian verification are shared with authorised partners.',
  },
  {
    question: 'How do I begin a Vahi record inquiry?',
    answer: 'Click "Raise a Vahi Inquiry" on this page, share your available ancestor names, Gotra, and native place details, and our human team will guide your request.',
  },
] as const;

export function VahiRecordsPage() {
  return (
    <BusinessPageFrame
      breadcrumb={[
        { label: 'Connect Hub Co.', href: '/' },
        { label: 'Vahi Records' },
      ]}
      className={styles.vahiPage}
    >
      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="vahi-page-title">
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>ANCESTRAL LINEAGE & VAHI (PANJI) RECORD GUIDANCE</p>
          <h1 id="vahi-page-title">Vahi (Panji) Ancestral Lineage Records</h1>
          <h2>Ancient Family Records & Traditional Lineage Verification.</h2>
          <p>
            Guiding Hindu families in tracing, verifying, and preserving ancestral lineage records maintained across sacred pilgrim destinations by authorised traditional Pandas and record custodians.
          </p>
          <div className={styles.heroActions}>
            <Link href="#protection-policy">Learn About Protection Policy</Link>
            <Link href={inquiryHref}>Raise a Vahi Inquiry</Link>
          </div>
          <small>
            Protected Hand-Written Ledgers | Authorised Pandas | Gotra Matching | Privacy-First Verification
          </small>
        </div>
      </section>

      {/* Protection Policy Callout */}
      <section className={styles.section} id="protection-policy" aria-labelledby="protection-title">
        <div className={styles.protectionCallout}>
          <h3 id="protection-title">Sacred Heritage & Record Protection Policy</h3>
          <p>
            Vahi (Panji) records are ancient, hand-written genealogical ledgers maintained over centuries by traditional Panda families at sacred sites like Gaya Ji, Kashi, Haridwar, and Nashik.
            <strong>
              {' '}To protect sacred tradition and family privacy, Vahi ledgers are NOT available for general online public search.
            </strong>{' '}
            Search and verification are conducted exclusively through authorised human review when sufficient family details (Gotra, ancestor names, native place) are provided.
          </p>
        </div>
      </section>

      {/* 5 Services Grid */}
      <section className={styles.section} id="vahi-services" aria-labelledby="vahi-services-title">
        <header>
          <p>5 APPROVED VAHI RECORD SERVICES</p>
          <h2 id="vahi-services-title">Lineage Tracing & Record Guidance</h2>
          <span>
            Explore our 5 approved Vahi record pathways designed to help your family discover and preserve your sacred ancestral lineage.
          </span>
        </header>
        <div className={styles.grid}>
          {vahiServices.map((service) => (
            <article key={service.id}>
              <span>
                <BusinessPageIcon name={service.icon} />
              </span>
              <h3>{service.title}</h3>
              <strong style={{ color: '#b47800', fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>
                {service.subtitle}
              </strong>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Required Information Section */}
      <section className={`${styles.section} ${styles.infoSection}`} aria-labelledby="info-title">
        <header>
          <p>PREPARATION GUIDANCE</p>
          <h2 id="info-title">Information Helpful for Vahi Verification</h2>
          <span>
            Please gather what details you know. Do not worry if some details are unknown—share what you have for authorised custodian review.
          </span>
        </header>
        <div className={styles.infoGrid}>
          {requiredInfo.map((item) => (
            <div key={item.title} className={styles.infoCard}>
              <BusinessPageIcon name="check" />
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step Process */}
      <section className={styles.section} aria-labelledby="vahi-process-title">
        <header>
          <p>TRANSPARENT PROCESS</p>
          <h2 id="vahi-process-title">How Vahi Guidance Works</h2>
        </header>
        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Trust & Privacy */}
      <section className={`${styles.section} ${styles.trust}`} aria-labelledby="vahi-trust-title">
        <header>
          <p>TRUST AND CONFIDENTIALITY</p>
          <h2 id="vahi-trust-title">Privacy-First Lineage Support</h2>
        </header>
        <ul>
          {trustItems.map((item) => (
            <li key={item}>
              <BusinessPageIcon name="check" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* AI Panel Section */}
      <section className={styles.aiSection} aria-labelledby="ai-vahi-title">
        <div>
          <p>GUIDED ASSISTANCE</p>
          <h2 id="ai-vahi-title">GenZ Ritual AI Assistant</h2>
          <p>
            Ask about Vahi records, Gotra matching, Panda ledgers, privacy protection, or lineage verification.
          </p>
        </div>
        <HeroAssistantPanel
          standalone
          slide={{
            id: 'vahi-records',
            title: 'Vahi Records',
            assistantTitle: 'GenZ Ritual AI',
            assistantSubtitle: 'Your Lineage Assistant',
            assistantIntro: 'Namaste! How can I help you understand Vahi records and ancestral lineage verification?',
            assistantPrompts: assistantPrompts,
            assistantPlaceholder: 'Ask about Vahi records...',
            defaultGuidance:
              'Select an approved question or enter your query for clear, verified guidance about Vahi (Panji) lineage records, privacy protection, and custodian review steps.',
          }}
        />
      </section>

      {/* FAQ Section */}
      <section className={styles.section} id="faqs" aria-labelledby="vahi-faq-title">
        <header>
          <p>FAQ</p>
          <h2 id="vahi-faq-title">Frequently Asked Questions</h2>
        </header>
        <div className={styles.faqs}>
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Inquiry Section */}
      <section className={styles.inquiry} id="inquiry" aria-labelledby="vahi-inquiry-title">
        <div>
          <p>GUIDED ASSISTANCE</p>
          <h2 id="vahi-inquiry-title">Begin Your Lineage Verification Journey</h2>
          <span>
            Share your available ancestor details and receive guided support from authorised record custodians.
          </span>
        </div>
        <div className={styles.inquiryActions}>
          <Link href={inquiryHref}>Raise a Vahi Inquiry</Link>
          <Link href="/services">View Service Catalog</Link>
        </div>
      </section>

      {/* Related Navigation */}
      <nav className={styles.related} aria-label="Related navigation">
        <strong>Related navigation</strong>
        <div>
          <Link href={PITRU_MOKSHA_GAYA_ROUTE}>PitruMoksha Gaya</Link>
          <Link href="/ritual-services">Ritual Services</Link>
          <Link href="/travel-assistance">Travel Assistance</Link>
          <Link href="/services">Service Catalog</Link>
        </div>
      </nav>
    </BusinessPageFrame>
  );
}
