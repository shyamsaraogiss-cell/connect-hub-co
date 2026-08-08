import Link from 'next/link';
import { BusinessPageIcon, type BusinessPageIconName } from '../BusinessPageIcon';
import { PITRU_MOKSHA_GAYA_ROUTE } from '@/features/hero/data/heroRoutes';
import styles from './VahiRecordsPage.module.css';

const inquiryHref = '/contact?topic=vahi-records';

export type VahiPathwayCard = {
  id: string;
  letter: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaTopic: string;
  icon: BusinessPageIconName;
};

const pathwayCards: readonly VahiPathwayCard[] = [
  {
    id: 'lineage-inquiry',
    letter: 'A',
    title: 'Family Lineage Inquiry',
    subtitle: 'Known Ancestor & Origin Guidance',
    description: 'For families seeking guidance based on known ancestor names, native place, Gotra, family branch, or previous pilgrimage details.',
    ctaText: 'Inquire About Lineage',
    ctaTopic: 'vahi-lineage-inquiry',
    icon: 'records',
  },
  {
    id: 'existing-followup',
    letter: 'B',
    title: 'Existing Record Follow-Up',
    subtitle: 'Reference & Note Follow-Up',
    description: 'For families who already know of a prior Vahi entry or possess references, photographs, notes, or family information.',
    ctaText: 'Follow Up on Record',
    ctaTopic: 'vahi-record-followup',
    icon: 'details',
  },
  {
    id: 'nri-assistance',
    letter: 'C',
    title: 'NRI and Remote Family Assistance',
    subtitle: 'Overseas Lineage Collection',
    description: 'For families outside India who need guided information collection and human-coordinated follow-up.',
    ctaText: 'Inquire for Remote Assistance',
    ctaTopic: 'vahi-nri-assistance',
    icon: 'virtual',
  },
  {
    id: 'onsite-guidance',
    letter: 'D',
    title: 'On-Site Record Guidance',
    subtitle: 'Sacred Location Coordination',
    description: 'For families planning to visit the relevant sacred location and seeking local coordination.',
    ctaText: 'Request On-Site Guidance',
    ctaTopic: 'vahi-onsite-guidance',
    icon: 'offline',
  },
  {
    id: 'uncertain-details',
    letter: 'E',
    title: 'Uncertain or Incomplete Family Details',
    subtitle: 'Initial Review & Preparation',
    description: 'For families with limited information who require initial human review before any search or guidance is attempted.',
    ctaText: 'Request Initial Review',
    ctaTopic: 'vahi-initial-review',
    icon: 'consultation',
  },
];

const trustPoints = [
  {
    title: 'Human Review Before Search',
    description: 'Every inquiry undergoes thorough initial completeness review and feasibility evaluation by qualified human coordinators before any record search is attempted.',
    icon: 'partner' as BusinessPageIconName,
  },
  {
    title: 'Confidential Family Information Handling',
    description: 'All submitted names, Gotra, ancestral locations, and notes are collected strictly for authorised review under Privacy-First confidentiality standards.',
    icon: 'check' as BusinessPageIconName,
  },
  {
    title: 'Clear Scope and Expectations',
    description: 'Transparent communication regarding search feasibility, required information, process steps, and official quotation before any commitment.',
    icon: 'details' as BusinessPageIconName,
  },
  {
    title: 'Remote and On-Site Coordination',
    description: 'Structured coordination for overseas NRI families seeking remote information collection or families visiting sacred destinations in person.',
    icon: 'virtual' as BusinessPageIconName,
  },
  {
    title: 'Verified Partner-Based Assistance',
    description: 'Guidance and verification are facilitated strictly through identity-verified traditional Panda families, record custodians, and Religious Partners.',
    icon: 'records' as BusinessPageIconName,
  },
];

const eightSteps = [
  {
    num: '01',
    title: 'Share Known Family Details',
    description: 'Submit your known family surname, ancestor names, and preliminary lineage information through our inquiry channel.',
  },
  {
    num: '02',
    title: 'Provide Ancestor, Place, and Gotra Information',
    description: 'Share father and grandfather names, native village/district/state, Gotra (if known), family branch, and past pilgrimage details.',
  },
  {
    num: '03',
    title: 'Initial Completeness Review',
    description: 'Our team evaluates the submitted details for clarity and completeness to determine if sufficient reference points exist.',
  },
  {
    num: '04',
    title: 'Human Verification and Feasibility Check',
    description: 'Qualified coordinators and traditional Panda record custodians perform a human feasibility check against protected ledgers.',
  },
  {
    num: '05',
    title: 'Relevant Partner or Location Coordination',
    description: 'Connect with the authorised traditional Panda custodian connected to your Gotra, native village, or pilgrimage destination.',
  },
  {
    num: '06',
    title: 'Scope, Schedule, and Quotation Confirmation',
    description: 'Receive an official quotation stating the approved service scope, inclusions, schedule, and charges before booking.',
  },
  {
    num: '07',
    title: 'Record Guidance or On-Site Assistance',
    description: 'Participate in guided record verification remotely or receive on-site accompaniment during your sacred location visit.',
  },
  {
    num: '08',
    title: 'Completion Update and Further Guidance',
    description: 'Receive structured status updates, confirmed record notes (where matched), and guidance for recording new family rites.',
  },
] as const;

const requiredChecklist = [
  { title: 'Family Surname', description: 'Primary family surname used across generations.' },
  { title: 'Alternative Spellings', description: 'Regional, historical, or phonetic spelling variations.' },
  { title: 'Ancestor Names', description: 'Full names of key departed ancestors.' },
  { title: 'Fathers & Grandfathers Names', description: 'Names of father, grandfather, and great-grandfather.' },
  { title: 'Native Village, Town, District & State', description: 'Ancestral village or regional origin in India.' },
  { title: 'Gotra, if Known', description: 'Paternal or family Gotra lineage.' },
  { title: 'Family Branch / Traditional Identifier', description: 'Sub-caste, lineage title, or family branch name.' },
  { title: 'Previous Pilgrimage Details', description: 'Known past visits to Gaya Ji, Kashi, Haridwar, etc.' },
  { title: 'Approximate Years or Generations', description: 'Historical timelines or generation counts.' },
  { title: 'Known Priest, Panda, or Contact Reference', description: 'Names, references, or ledger notes from prior visits.' },
  { title: 'Current Family Contact Details', description: 'Contact details of the person requesting guidance.' },
  { title: 'Preferred Mode: Remote or On-Site', description: 'Preference for virtual coordination or in-person visit.' },
  { title: 'Language Preference', description: 'Hindi, English, or regional language requirement.' },
  { title: 'Special Clarification Notes', description: 'Specific lineage questions, adoption, or family history notes.' },
] as const;

const supportCategories = [
  { title: 'Lineage Information Collection', description: 'Gathering and organizing ancestral reference details.' },
  { title: 'Existing Entry Reference Review', description: 'Reviewing photographs, notes, or prior Panda references.' },
  { title: 'Family Branch Clarification', description: 'Clarifying sub-branches, titles, or migrated lineage arms.' },
  { title: 'Native-Place-Based Guidance', description: 'Location-based cross-referencing by village or district.' },
  { title: 'Gotra & Ancestor Detail Collection', description: 'Structuring paternal Gotra and multi-generational names.' },
  { title: 'Remote Family Coordination', description: 'Coordinating verification for families residing across cities.' },
  { title: 'NRI Assistance', description: 'Overseas inquiry support across international time zones.' },
  { title: 'On-Site Visit Guidance', description: 'Local accompaniment and custodian meeting coordination.' },
  { title: 'Record Reference Follow-Up', description: 'Following up on pending historical references or notes.' },
  { title: 'Family Document Preparation', description: 'Organizing family information into a clear inquiry dossier.' },
  { title: 'Multi-Generation Information Organization', description: 'Structuring ancestral trees across multiple generations.' },
  { title: 'Language Assistance', description: 'Multi-lingual translation and communication support.' },
  { title: 'Religious Partner Coordination', description: 'Connecting lineage records with upcoming ritual plans.' },
  { title: 'Vahi Custodian Coordination', description: 'Connecting with authorised Panda ledgers where applicable.' },
  { title: 'Uncertain Lineage Inquiry', description: 'Initial guidance when family information is partial or unclear.' },
  { title: 'Others / Vahi Records Guidance', description: 'Custom ancestral record inquiries and special assistance.' },
] as const;

const limitationsPoints = [
  {
    title: 'Not Every Family Has an Identifiable Record',
    description: 'Matching depends on past family visits and physical ledger preservation. Unrecorded historical migrations or missing visits mean that not every family record exists or can be identified.',
  },
  {
    title: 'Multiple Name & Place Spellings',
    description: 'Historical ledgers contain regional scripts and phonetic variations. Reassuring human review helps evaluate multiple spellings of surnames, ancestor names, and villages.',
  },
  {
    title: 'Incomplete Family Details Require Review',
    description: 'When key details (such as Gotra or native district) are partial, initial completeness review helps organize what information is available before proceeding.',
  },
  {
    title: 'Location-Specific Ledgers',
    description: 'Vahi ledgers are preserved locally at specific pilgrim hubs (such as Gaya Ji, Kashi, Haridwar, and Nashik). Registers are not combined in a single central repository.',
  },
  {
    title: 'Matching Requires Human Examination',
    description: 'Examining ancient hand-written scripts requires careful human review by experienced traditional custodians. Timelines may vary based on ledger complexity.',
  },
  {
    title: 'Custodian Access & Feasibility',
    description: 'Access and verification depend on the relevant authorised traditional Panda custodian. No result should be guaranteed prior to formal human verification.',
  },
] as const;

const knowledgeCards = [
  {
    title: 'What are Vahi records?',
    description: 'Learn about ancient hand-written ledgers preserved by traditional Panda families at sacred pilgrim destinations and how they record family visits across generations.',
  },
  {
    title: 'Why native place and ancestor names matter',
    description: 'Understand how ancestral village names, districts, and father/grandfather names provide essential reference points for matching traditional registers.',
  },
  {
    title: 'How Gotra information may assist',
    description: 'Discover how paternal Gotra details help connect your family inquiry with the specific traditional Panda lineage guarding your ancestral records.',
  },
  {
    title: 'What to prepare before making an inquiry',
    description: 'Review the 14-item preparation checklist to organize known names, places, and prior pilgrimage notes before submitting your request.',
  },
  {
    title: 'Guidance vs. confirmed record identification',
    description: 'Understand the distinction between preliminary information organization and formal human verification by authorised Panda custodians.',
  },
  {
    title: 'How NRI families can organize information remotely',
    description: 'Explore step-by-step guidance for overseas families seeking to collect, structure, and submit family history for human-coordinated review.',
  },
] as const;

const faqs = [
  {
    question: 'What is a Vahi record?',
    answer: 'A Vahi (Panji) record is a traditional, hand-written ledger preserved across generations by qualified Panda families at sacred pilgrim destinations like Gaya Ji, Kashi, Haridwar, and Nashik, recording family visits, Gotra lineages, and sacred rites.',
  },
  {
    question: 'Can every family find its lineage record?',
    answer: 'Not every family has an available or identifiable record. Identification depends on whether previous generations visited the destination, recorded their details, and whether ledgers remain preserved.',
  },
  {
    question: 'What information is needed to begin?',
    answer: 'Basic information includes your family surname, ancestor names (father, grandfather), ancestral native village/district, and Gotra if known.',
  },
  {
    question: 'Can NRIs make an inquiry remotely?',
    answer: 'Yes. Overseas families can submit their available details online for initial organization, human review, and remote coordination with record custodians.',
  },
  {
    question: 'What happens if Gotra is unknown?',
    answer: 'If Gotra is unknown, our team conducts an initial completeness review using your ancestral village, district, surname, and family branch details to assist the preliminary search.',
  },
  {
    question: 'Can old photographs or notes help?',
    answer: 'Yes! References, handwritten notes, photographs of old receipts, or names of past Pandas provide valuable reference points during human verification.',
  },
  {
    question: 'Who maintains or examines the records?',
    answer: 'Vahi ledgers are maintained and examined exclusively by authorised traditional Panda custodians who possess traditional rights to the ledgers.',
  },
  {
    question: 'Is record identification guaranteed?',
    answer: 'No. Record identification cannot be guaranteed before formal human verification by authorised custodians. We provide honest, guided feedback based on actual source records.',
  },
  {
    question: 'Can an on-site visit be coordinated?',
    answer: 'Yes. If your family plans to visit the sacred destination, we can coordinate on-site accompaniment and local meeting arrangements with authorised Pandas.',
  },
  {
    question: 'How are charges and timelines confirmed?',
    answer: 'After initial completeness review and feasibility evaluation, an official quotation stating the approved scope, timeline, and charges is provided before any booking commitment.',
  },
] as const;

export function VahiRecordsContent() {
  return (
    <div className={styles.vahiContent}>
      {/* SECTION 1: UNDERSTAND VAHI RECORDS */}
      <section className={styles.section} id="understand-vahi" aria-labelledby="understand-title">
        <header>
          <p>SECTION 1 — ANCESTRAL HERITAGE</p>
          <h2 id="understand-title">Understand Vahi Records</h2>
          <span>
            A neutral, traditional explanation of family lineage documentation, traditional Panda registers, and realistic guidance standards.
          </span>
        </header>
        <div className={styles.understandBox}>
          <div className={styles.understandGrid}>
            <div className={styles.understandItem}>
              <h3>What Vahi Records Are</h3>
              <p>
                Vahi (Panji) records are traditional, hand-written ledgers maintained across generations by qualified Panda families at sacred pilgrim destinations such as Gaya Ji, Kashi (Varanasi), Haridwar, and Nashik.
              </p>
            </div>
            <div className={styles.understandItem}>
              <h3>Traditional Role in Family Lineage</h3>
              <p>
                These registers document ancestral visits, Gotra lineages, family origins, and major sacred rites (such as Pind Daan and Shraddh), preserving a multi-generational record of family heritage.
              </p>
            </div>
            <div className={styles.understandItem}>
              <h3>Why Family Details & Gotra Matter</h3>
              <p>
                Because traditional Pandas organize Vahis by region, village, and Gotra, providing family names, native village/district, Gotra, and past travel years provides the reference points needed to locate the custodian family.
              </p>
            </div>
            <div className={styles.understandItem}>
              <h3>Seeking Guidance & Human Verification</h3>
              <p>
                Families seeking guidance can submit available details for review. Availability and matching depend on actual records and human verification by authorised custodians. No promise is made that every record exists or can be found.
              </p>
            </div>
          </div>
          <div className={styles.protectionAlert}>
            <strong>Protected Heritage & Online Search Policy</strong>
            <p>
              Vahi ledgers are sacred historical ledgers strictly protected by traditional Pandas. To preserve family privacy and sacred tradition, Vahi records are <strong>NEVER published for general online public search or open database downloading</strong>. Guidance is provided exclusively through authorised human review.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: CHOOSE YOUR VAHI RECORDS PATH (5 Responsive Pathway Cards) */}
      <section className={styles.section} id="vahi-pathways" aria-labelledby="pathways-title">
        <header>
          <p>SECTION 2 — GUIDANCE PATHWAYS</p>
          <h2 id="pathways-title">Choose Your Vahi Records Path</h2>
          <span>
            Select the pathway that best matches your family’s current information and guidance requirements.
          </span>
        </header>
        <div className={styles.pathwayGrid}>
          {pathwayCards.map((card) => (
            <article className={styles.pathwayCard} key={card.id}>
              <span>
                <BusinessPageIcon name={card.icon} />
              </span>
              <h3>
                Path {card.letter}: {card.title}
              </h3>
              <strong>{card.subtitle}</strong>
              <p>{card.description}</p>
              <Link href={`/contact?topic=${card.ctaTopic}`}>{card.ctaText}</Link>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 3: WHY FAMILIES USE VAHI RECORDS GUIDANCE */}
      <section className={`${styles.section} ${styles.trustSection}`} id="why-guidance" aria-labelledby="trust-title">
        <header>
          <p>SECTION 3 — BUSINESS-SPECIFIC TRUST</p>
          <h2 id="trust-title">Why Families Use Vahi Records Guidance</h2>
          <span>
            Built around human review, confidentiality, clear scope, and verified partner coordination.
          </span>
        </header>
        <div className={styles.trustGrid}>
          {trustPoints.map((item) => (
            <div className={styles.trustCard} key={item.title}>
              <BusinessPageIcon name={item.icon} />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: HOW VAHI RECORDS ASSISTANCE WORKS (8-Step Process) */}
      <section className={styles.section} id="how-vahi-works" aria-labelledby="process-title">
        <header className={styles.processHeader}>
          <p>SECTION 4 — PROCESS</p>
          <h2 id="process-title">How Vahi Records Assistance Works</h2>
          <span>
            An 8-step structured process from initial detail collection to record guidance and completion follow-up.
          </span>
        </header>
        <ol className={styles.stepsGrid}>
          {eightSteps.map((step) => (
            <li key={step.num}>
              <span>{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
        <div className={styles.processNotice}>
          <strong>Mandatory Protocol Clarifications</strong>
          <ul>
            <li>GenZ Ritual AI may help collect and organize initial information only.</li>
            <li>Human review by qualified coordinators and authorised custodians is mandatory.</li>
            <li>Record availability and lineage matching cannot be guaranteed.</li>
            <li>Final information depends on actual source records and relevant authorised custodians or Religious Partners.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 5: INFORMATION REQUIRED (14-Point Checklist) */}
      <section className={`${styles.section} ${styles.checklistSection}`} id="info-required" aria-labelledby="checklist-title">
        <header>
          <p>SECTION 5 — CHECKLIST</p>
          <h2 id="checklist-title">Information Required for Vahi Guidance</h2>
          <span>
            Prepare what information you have using this 14-point structured checklist for initial review.
          </span>
        </header>
        <div className={styles.checklistGrid}>
          {requiredChecklist.map((item) => (
            <div className={styles.checklistItem} key={item.title}>
              <BusinessPageIcon name="check" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: VAHI RECORDS SUPPORT CATEGORIES */}
      <section className={`${styles.section} ${styles.categoriesSection}`} id="support-categories" aria-labelledby="categories-title">
        <header>
          <p>SECTION 6 — SUPPORT CATEGORIES</p>
          <h2 id="categories-title">Vahi Records Support Categories</h2>
          <span>
            Neutral, approved categories for lineage inquiry, document preparation, and custodian coordination.
          </span>
        </header>
        <div className={styles.categoriesGrid}>
          {supportCategories.map((item) => (
            <div className={styles.categoryCard} key={item.title}>
              <BusinessPageIcon name="records" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: RECORD AVAILABILITY AND LIMITATIONS */}
      <section className={`${styles.section} ${styles.limitationsSection}`} id="limitations" aria-labelledby="limitations-title">
        <header>
          <p>SECTION 7 — AVAILABILITY & LIMITATIONS</p>
          <h2 id="limitations-title">Record Availability & Practical Limitations</h2>
          <span>
            Reassuring, realistic guidance regarding physical ledgers, spelling variations, and custodian verification.
          </span>
        </header>
        <div className={styles.limitationsBox}>
          <div className={styles.limitationsGrid}>
            {limitationsPoints.map((point) => (
              <div className={styles.limitationItem} key={point.title}>
                <BusinessPageIcon name="check" />
                <div>
                  <h4>{point.title}</h4>
                  <p>{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: KNOWLEDGE CENTRE PREVIEW */}
      <section className={`${styles.section} ${styles.knowledgeSection}`} id="knowledge-centre" aria-labelledby="knowledge-title">
        <header>
          <p>SECTION 8 — KNOWLEDGE CENTRE PREVIEW</p>
          <h2 id="knowledge-title">Educational Resources & Guidance Articles</h2>
          <span>
            Explore key topics to help your family understand traditional Vahi registers and lineage verification.
          </span>
        </header>
        <div className={styles.knowledgeGrid}>
          {knowledgeCards.map((card) => (
            <div className={styles.knowledgeCard} key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: COMMON QUESTIONS (10 Accessible FAQs) */}
      <section className={styles.section} id="faqs" aria-labelledby="faq-title">
        <header>
          <p>SECTION 9 — COMMON QUESTIONS</p>
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

      {/* SECTION 10: FINAL GUIDANCE CTA */}
      <section className={styles.inquiry} id="inquiry" aria-labelledby="inquiry-title">
        <div>
          <p>SECTION 10 — NEXT STEPS</p>
          <h2 id="inquiry-title">Need Guidance About Your Family’s Vahi Records?</h2>
          <span>
            Share the family details currently available for initial organization, human review, and appropriate partner or location coordination.
          </span>
        </div>
        <div className={styles.inquiryActions}>
          <Link href={inquiryHref}>Start a Vahi Records Inquiry</Link>
          <Link href="/contact?topic=vahi-organize-details">Organize Family Details</Link>
          <Link href="/zen-g">Ask for Initial Guidance</Link>
        </div>
      </section>

      {/* SECTION 11: RELATED NAVIGATION */}
      <nav className={styles.related} aria-label="Related navigation">
        <strong>Related navigation</strong>
        <div>
          <Link href={PITRU_MOKSHA_GAYA_ROUTE}>PitruMoksha Gaya</Link>
          <Link href="/ritual-services">Ritual Services</Link>
          <Link href="/travel-assistance">Travel Assistance</Link>
          <Link href="/religious-partners">Religious Partners</Link>
        </div>
      </nav>
    </div>
  );
}
