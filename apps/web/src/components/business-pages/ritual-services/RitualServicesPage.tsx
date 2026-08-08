import Image from 'next/image';
import Link from 'next/link';
import { BusinessPageFrame, type BusinessStep } from '../BusinessPageShell';
import { BusinessPageIcon, type BusinessPageIconName } from '../BusinessPageIcon';
import { HeroAssistantPanel } from '@/features/hero/components/HeroAssistantPanel';
import type { AssistantPrompt } from '@/features/hero/types/hero.types';
import { PITRU_MOKSHA_GAYA_ROUTE, VAHI_RECORDS_ROUTE } from '@/features/hero/data/heroRoutes';
import styles from './RitualServicesPage.module.css';

const inquiryHref = '/contact?topic=ritual-services';

export type CoreRitualCategory = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: BusinessPageIconName;
  badge?: string;
};

const coreRituals: readonly CoreRitualCategory[] = [
  {
    id: 'griha-pravesh',
    title: '1. Griha Pravesh',
    subtitle: 'Housewarming & Vastu Shanti',
    description: 'Auspicious home inauguration rituals, Vastu Shanti, and Ganesha Pujan for peace, health, and prosperity in your new home.',
    icon: 'offering',
    badge: 'Popular',
  },
  {
    id: 'marriage-rituals',
    title: '2. Marriage Rituals',
    subtitle: 'Vedic Vivah Sanskar & Blessings',
    description: 'Traditional Vedic wedding ceremonies, Kanyadaan, Saptapadi, and pre-wedding pujas led by experienced lineage priests.',
    icon: 'family',
    badge: 'Sacred Sanskar',
  },
  {
    id: 'customized-puja',
    title: '3. Customized Puja',
    subtitle: 'Family Traditions & Sankalpa',
    description: 'Tailored pujas performed strictly per your family Sastras, Sampradaya, preferred deity, and Gotra Sankalpa.',
    icon: 'sankalp',
    badge: 'Bespoke',
  },
  {
    id: 'upanayan-sanskar',
    title: '4. Upanayan Sanskar',
    subtitle: 'Sacred Thread Ceremony (Janeu)',
    description: 'Traditional rite of passage for young initiates, accompanied by Gayatri Upadesh and authentic Vedic mantle rites.',
    icon: 'details',
  },
  {
    id: 'havan-homam',
    title: '5. Havan & Homam',
    subtitle: 'Sacred Fire Rituals',
    description: 'Powerful fire offerings including Chandi Homam, Mahamrityunjaya, Sudarshana, and Ganapathi Homam for protection and energy.',
    icon: 'offering',
    badge: 'Vedic Fire',
  },
  {
    id: 'preferred-location',
    title: '6. Preferred Location Puja',
    subtitle: 'Home, Temple, or Sacred Destination',
    description: 'Conduct sacred ceremonies at your residence, ancestral home, community venue, or designated pilgrimage temple.',
    icon: 'offline',
  },
  {
    id: 'navagraha-shanti',
    title: '7. Navagraha Shanti',
    subtitle: 'Planetary Harmony & Graha Pujas',
    description: 'Specific planetary alignment pujas and Japam to harmonize malefic planetary influences and enhance wellbeing.',
    icon: 'timezone',
  },
  {
    id: 'dosha-remedies',
    title: '8. Dosha Remedies',
    subtitle: 'Kaal Sarp, Pitra & Vedic Remedies',
    description: 'Sastra-prescribed remedial rites for Kaal Sarp Dosha, Pitra Dosha, Rahu-Ketu Shanti, and specific birth-chart remedies.',
    icon: 'records',
    badge: 'Specialized',
  },
  {
    id: 'festival-rituals',
    title: '9. Festival Rituals',
    subtitle: 'Diwali, Navratri & Seasonal Pujas',
    description: 'Grand seasonal and festive ceremonies including Lakshmi Pujan, Chandi Path, Maha Shivratri, and Ganesh Chaturthi.',
    icon: 'virtual',
  },
  {
    id: 'others-rituals',
    title: '10. Others / Rituals',
    subtitle: 'Special Devotional & Ancestral Rites',
    description: 'Custom ancestral remembrance, Ayushya Homam, Nakshatra Shanti, Satyanarayan Katha, and specialized Vedic rites.',
    icon: 'consultation',
  },
];

const serviceLocations: readonly { name: string; isHighlight?: boolean }[] = [
  { name: 'Ayodhya' },
  { name: 'Pune' },
  { name: 'Hyderabad' },
  { name: 'Nashik' },
  { name: 'Kashi / Varanasi' },
  { name: 'Patna' },
  { name: 'Mathura' },
  { name: 'Vrindavan' },
  { name: 'Delhi NCR' },
  { name: 'Lucknow' },
  { name: 'Gorakhpur' },
  { name: 'Gaya Ji' },
  { name: 'Bengaluru' },
  { name: 'Mumbai' },
  { name: 'Nepal', isHighlight: true },
];

const nriRemoteFeatures = [
  'Scheduled live HD video streaming across global time zones (USA, UK, Gulf, Singapore, Australia).',
  'Direct live Sankalp guided by verified priests with family names and Gotra.',
  'Complete venue setup, authentic Sastra-compliant Samagri, and sacred fire preparation.',
  'Verified documentation: ritual completion proof, high-resolution photographs, and video clips.',
  'Prasadam and sacred dry offerings dispatch advice to international or local Indian addresses.',
  '24×7 multi-lingual coordination team (English, Hindi, Regional languages).',
] as const;

const samagriHighlights = [
  {
    title: 'Unadulterated Samagri Procurement',
    description: 'Pure Desi Ghee, authentic herbs, dry fruits, sacred woods (Samidha), pure Gangajal, and unblemished puja items sourced from verified vendors.',
  },
  {
    title: 'Sastra & Sampradaya Compliance',
    description: 'Every ingredient is checked against Vedic literature and specific puja guidelines to ensure complete ritual sanctity.',
  },
  {
    title: 'Pre-Arranged Priest Dakshina',
    description: 'All priest offerings and samagri charges are transparently covered in your official quotation—no unexpected cash demands on ritual day.',
  },
  {
    title: 'Sanitized & Sacred Venue Setup',
    description: 'Complete assistance with Yajna Kunda preparation, mandap arrangement, and ritual vessel cleaning.',
  },
] as const;

const steps: readonly BusinessStep[] = [
  {
    title: 'Select Ritual & Share Details',
    description: 'Choose your desired ritual category, preferred date, Gotra, location, or remote live participation preference.',
  },
  {
    title: 'Receive Custom Scope & Pricing',
    description: 'Our team verifies Religious Partner availability, venue requirements, and issues a transparent upfront service scope.',
  },
  {
    title: 'Sacred Ritual Execution',
    description: 'The ritual is conducted by verified lineage priests with live Sankalp, Vedic precision, and complete guidance.',
  },
  {
    title: 'Completion & Prasadam Guidance',
    description: 'Receive completion confirmation, high-res photos/video, and guidance on prasadam and follow-up offerings.',
  },
];

const trustItems = [
  'Verified Lineage Priests & Religious Partners',
  'Vedic Sastra Precision & Authentic Recitation',
  'Transparent Scope & Upfront Clear Pricing',
  'NRI Remote Live Stream & Global Time-Zone Support',
  'Pure Samagri Care & Pure Ingredient Guarantee',
  '24×7 Guided Support via GenZ Ritual AI & Human Team',
] as const;

const assistantPrompts: readonly AssistantPrompt[] = [
  {
    id: 'recommended-ritual',
    label: 'Which ritual is recommended for my situation?',
    response: 'Share your occasion (e.g. housewarming, planetary harmony, marriage, or ancestral rites) with GenZ Ritual AI or our team. We review your family tradition with verified Religious Partners to suggest the exact prescribed puja.',
  },
  {
    id: 'verified-experts',
    label: 'Are the Religious Partners verified and experienced?',
    response: 'Yes. All Religious Partners are identity-verified, experienced in Vedic traditions, and subject to strict background, lineage, and service capability checks.',
  },
  {
    id: 'nearby-ritual',
    label: 'Can I arrange a ritual near my location?',
    response: 'We coordinate services across 15+ major sacred destinations and cities including Ayodhya, Pune, Hyderabad, Kashi, Delhi NCR, Mumbai, Bengaluru, and Nepal.',
  },
  {
    id: 'samagri',
    label: 'Is the required samagri included?',
    response: 'Yes! All essential Sastra-compliant samagri, pure Desi Ghee, sacred wood, and puja materials are gathered and included in your confirmed service scope.',
  },
  {
    id: 'online-ritual',
    label: 'Can the ritual be performed online?',
    response: 'Yes. Families worldwide can participate live via HD video stream with a dedicated live Sankalp led by our verified priests.',
  },
  {
    id: 'language-tradition',
    label: 'Can I choose language and regional tradition?',
    response: 'Absolutely. Priests can be assigned based on your regional tradition (North Indian, South Indian, Maharashtrian, South Asian) and language preferences.',
  },
  {
    id: 'future-date',
    label: 'Can I book for a future date?',
    response: 'Yes. You can reserve auspicious Muhurat dates in advance. Our team coordinates priest availability for your specific date and Tithi.',
  },
  {
    id: 'family-tradition',
    label: 'Can rituals follow my Sampradaya or family tradition?',
    response: 'Yes. You can provide your specific Gotra, Veda, and family custom requirements during inquiry, and our priests will adapt the Sankalp accordingly.',
  },
];

const faqs = [
  {
    question: 'How do I know which puja is appropriate for my family situation?',
    answer: 'You can select from our 10 Core Ritual Categories or consult GenZ Ritual AI for guidance. Our human team and verified Religious Partners will review your family tradition, Gotra, and purpose to confirm the exact prescribed Vedic ritual.',
  },
  {
    question: 'Can remote pujas be arranged for NRI & international families?',
    answer: 'Yes! Remote Sankalp and live virtual participation are available and scheduled across global time zones (USA, Canada, Europe, Gulf, Australia, Singapore). Family members join live via video link while the priest performs the rites.',
  },
  {
    question: 'What is included in the ritual service quotation?',
    answer: 'Your official quotation includes priest Dakshina, pure Sastra-compliant Samagri procurement, venue preparation, live streaming setup (if remote), and completion documentation. There are no mandatory extra cash demands.',
  },
  {
    question: 'Where can the physical rituals be performed?',
    answer: 'Physical rituals can be conducted at your home, a local venue, or at sacred temple locations across our 15 service hubs, including Ayodhya, Kashi, Nashik, Pune, Delhi NCR, Hyderabad, Gaya Ji, Bengaluru, Mumbai, and Nepal.',
  },
  {
    question: 'How far in advance should I book an auspicious Muhurat ritual?',
    answer: 'We recommend booking 1 to 3 weeks in advance for major Muhurat dates (like Griha Pravesh or Marriage pujas). However, urgent or short-notice requests can also be accommodated based on priest availability.',
  },
  {
    question: 'Will I receive proof of completion or photos/videos of the ritual?',
    answer: 'Yes. All confirmed service plans include ritual completion confirmation, high-resolution photographs, and video highlights of key Sankalp and Havan moments.',
  },
] as const;

export function RitualServicesPage({ embedded = false }: { embedded?: boolean }) {
  return (
    <BusinessPageFrame
      breadcrumb={[
        { label: 'Connect Hub Co.', href: '/' },
        { label: 'Ritual Services' },
      ]}
      className={styles.ritualPage}
      embedded={embedded}
    >
      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="ritual-page-title">
        <Image
          src="/images/hero/hero2-ritual-services.png"
          alt="Representative sacred fire Havan and Vedic Puja setup with verified Religious Partners"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 75vw"
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>AUTHORED VEDIC PUJA & HOMAM SERVICES</p>
          <h1 id="ritual-page-title">Vedic Ritual Services & Sacred Coordination</h1>
          <h2>Ancient Tradition with Modern Peace of Mind.</h2>
          <p>
            Traditional, authentic, and fully guided Vedic pujas, homams, and sacred ceremonies coordinated with verified Religious Partners. Arranged on-site at your home or sacred destinations across India & Nepal, or via live remote participation for families worldwide.
          </p>
          <div className={styles.heroActions}>
            <Link href="#core-rituals">Explore 10 Core Rituals</Link>
            <Link href={inquiryHref}>Raise an Inquiry</Link>
          </div>
          <small>
            Verified Religious Partners | Vedic Sastra Precision | Pure Samagri Procurement | On-Site & Remote Sankalp
          </small>
        </div>
        <p className={styles.disclaimer}>Production Hero Artwork — Preserved SITARAM Approved Master v1.1</p>
      </section>

      {/* 10 Core Ritual Services Grid */}
      <section className={styles.section} id="core-rituals" aria-labelledby="core-rituals-title">
        <header>
          <p>10 APPROVED CORE RITUAL CATEGORIES</p>
          <h2 id="core-rituals-title">Prescribed Vedic Pujas & Sacred Ceremonies</h2>
          <span>
            Every ritual carries its own purpose, tradition, and prescribed method. Choose from our 10 approved ritual categories for guided coordination.
          </span>
        </header>
        <div className={styles.coreGrid}>
          {coreRituals.map((ritual) => (
            <article key={ritual.id}>
              <span>
                <BusinessPageIcon name={ritual.icon} />
              </span>
              <h3>{ritual.title}</h3>
              <strong style={{ color: '#b47800', fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>
                {ritual.subtitle}
              </strong>
              <p>{ritual.description}</p>
              {ritual.badge ? <span className={styles.badge}>{ritual.badge}</span> : null}
            </article>
          ))}
        </div>
      </section>

      {/* Locations Coverage Section */}
      <section className={`${styles.section} ${styles.locationSection}`} aria-labelledby="locations-title">
        <header>
          <p>SERVICE COVERAGE ACROSS SACRED DESTINATIONS</p>
          <h2 id="locations-title">Available Across 15+ Destinations in India & Nepal</h2>
          <span>
            We connect your family with verified local Religious Partners, qualified lineage priests, and venue arrangements across major spiritual hubs.
          </span>
        </header>
        <div className={styles.locationGrid}>
          {serviceLocations.map((loc) => (
            <span
              key={loc.name}
              className={`${styles.locationChip} ${loc.isHighlight ? styles.locationChipHighlight : ''}`}
            >
              <BusinessPageIcon name="offline" />
              <span>{loc.name}</span>
              {loc.isHighlight ? <span style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>(Sacred Destination)</span> : null}
            </span>
          ))}
        </div>
      </section>

      {/* NRI Remote Sankalp & Live Stream */}
      <section className={styles.virtualFeature} id="remote-sankalp" aria-labelledby="remote-title">
        <div>
          <p>GLOBAL FAMILY PARTICIPATION</p>
          <h2 id="remote-title">Remote Live Sankalp for NRIs & International Families</h2>
          <strong>Distance should never be a barrier to fulfilling sacred family vows.</strong>
          <ul>
            {nriRemoteFeatures.map((feature) => (
              <li key={feature}>
                <BusinessPageIcon name="check" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/contact?topic=nri-remote-ritual">Inquire for Remote Rituals</Link>
      </section>

      {/* Sacred Samagri Care */}
      <section className={`${styles.section} ${styles.samagriSection}`} aria-labelledby="samagri-title">
        <header>
          <p>VAIDIK SAMAGRI CARE</p>
          <h2 id="samagri-title">Pure Ingredients & Sastra Compliance</h2>
          <span>
            Ritual sanctity starts with pure offerings. We ensure end-to-end procurement of unadulterated items per Sastra guidelines.
          </span>
        </header>
        <div className={styles.samagriGrid}>
          {samagriHighlights.map((item) => (
            <div className={styles.samagriCard} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step Process */}
      <section className={styles.section} aria-labelledby="process-title">
        <header>
          <p>TRANSPARENT PROCESS</p>
          <h2 id="process-title">How the Service Works</h2>
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

      {/* Trust & Verification */}
      <section className={`${styles.section} ${styles.trust}`} aria-labelledby="trust-title">
        <header>
          <p>TRUST AND VERIFICATION</p>
          <h2 id="trust-title">Vedic Accuracy, Transparency & Dedicated Care</h2>
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
      <section className={styles.aiSection} aria-labelledby="ai-section-title">
        <div>
          <p>GUIDED ASSISTANCE</p>
          <h2 id="ai-section-title">GenZ Ritual AI Assistant</h2>
          <p>
            Ask about ritual recommendations, Muhurat selection, samagri care, priest verification, location coverage, or remote participation.
          </p>
        </div>
        <HeroAssistantPanel
          standalone
          slide={{
            id: 'ritual-services',
            title: 'Ritual Services',
            assistantTitle: 'GenZ Ritual AI',
            assistantSubtitle: 'Your Ritual Assistant',
            assistantIntro: 'Namaste! How can I help you understand and plan your ritual services today?',
            assistantPrompts: assistantPrompts,
            assistantPlaceholder: 'Ask about Ritual Services...',
            defaultGuidance:
              'Select a question or enter your query for clear, verified guidance about ritual options, location coverage, NRI remote participation, samagri care, and booking steps.',
          }}
        />
      </section>

      {/* FAQ Section */}
      <section className={styles.section} id="faqs" aria-labelledby="faq-title">
        <header>
          <p>FAQ</p>
          <h2 id="faq-title">Frequently Asked Questions</h2>
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

      {/* Inquiry Banner */}
      <section className={styles.inquiry} id="inquiry" aria-labelledby="inquiry-title">
        <div>
          <p>GUIDED ASSISTANCE</p>
          <h2 id="inquiry-title">Ready to Begin Your Sacred Ceremony?</h2>
          <span>
            Share your family’s requirement and receive a custom service scope with verified Religious Partner coordination.
          </span>
        </div>
        <div className={styles.inquiryActions}>
          <Link href={inquiryHref}>Raise an Inquiry</Link>
          <Link href="/services">View Service Catalog</Link>
        </div>
      </section>

      {/* Related Navigation */}
      <nav className={styles.related} aria-label="Related navigation">
        <strong>Related navigation</strong>
        <div>
          <Link href={PITRU_MOKSHA_GAYA_ROUTE}>PitruMoksha Gaya</Link>
          <Link href="/travel-assistance">Travel Assistance</Link>
          <Link href={VAHI_RECORDS_ROUTE}>Vahi Lineage Records</Link>
          <Link href="/services">Service Catalog</Link>
        </div>
      </nav>
    </BusinessPageFrame>
  );
}
