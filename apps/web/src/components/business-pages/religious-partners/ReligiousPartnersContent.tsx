import Link from 'next/link';
import { MulticolourAiBrainIcon } from '@/features/public-shell/components/PublicHeroSidebar';
import Image from 'next/image';
import { BusinessPageIcon, type BusinessPageIconName } from '../BusinessPageIcon';
import { HeroAssistantPanel } from '@/features/hero/components/HeroAssistantPanel';
import { PITRU_MOKSHA_GAYA_ROUTE, VAHI_RECORDS_ROUTE } from '@/features/hero/data/heroRoutes';
import styles from './ReligiousPartnersPage.module.css';

const inquiryHref = '/contact?mode=test&topic=religious-partner-registration';

export type RpnPathwayCard = {
  id: string;
  letter: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaTopic: string;
  icon: BusinessPageIconName;
};

const pathwayCards: readonly RpnPathwayCard[] = [
  {
    id: 'ritual-puja-partner',
    letter: 'A',
    title: 'Ritual and Puja Priest',
    subtitle: 'Vaidik Rites & Home Ceremonies',
    description: 'For qualified ritual practitioners seeking to provide approved ritual services according to their tradition, competence, location, and experience.',
    ctaText: 'Apply as Ritual Priest',
    ctaTopic: 'ritual-partner-apply',
    icon: 'offering',
  },
  {
    id: 'gaya-partner',
    letter: 'B',
    title: 'PitruMoksha Gaya Priest',
    subtitle: 'Gaya Ji Ancestral Coordination',
    description: 'For eligible Verified Priests providing ancestral ritual guidance and coordination in Gaya Ji under approved processes.',
    ctaText: 'Apply as Gaya Priest',
    ctaTopic: 'gaya-partner-apply',
    icon: 'sankalp',
  },
  {
    id: 'location-partner',
    letter: 'C',
    title: 'Location-Based Verified Priest',
    subtitle: 'Sacred City & Venue Practice',
    description: 'For practitioners serving approved temples, sacred cities, homes, venues, or selected service locations.',
    ctaText: 'Apply as Location Priest',
    ctaTopic: 'location-partner-apply',
    icon: 'offline',
  },
  {
    id: 'online-partner',
    letter: 'D',
    title: 'Online Ritual Priest',
    subtitle: 'Virtual & Hybrid Ceremonies',
    description: 'For qualified practitioners capable of conducting approved online participation with clear communication and appropriate technical readiness.',
    ctaText: 'Apply as Online Priest',
    ctaTopic: 'online-partner-apply',
    icon: 'virtual',
  },
  {
    id: 'lineage-partner',
    letter: 'E',
    title: 'Vahi Records and Lineage Guidance Priest',
    subtitle: 'Traditional Ledger Coordination',
    description: 'For relevant traditional custodians or Verified Priests associated with lineage-record guidance, where applicable and verified.',
    ctaText: 'Apply as Lineage Priest',
    ctaTopic: 'lineage-partner-apply',
    icon: 'records',
  },
  {
    id: 'local-coordination-partner',
    letter: 'F',
    title: 'Travel and Local Coordination Priest',
    subtitle: 'Ground & Logistics Coordination',
    description: 'For Verified Priests participating in local ritual-linked coordination and ground support at sacred destinations.',
    ctaText: 'Apply as Local Priest',
    ctaTopic: 'local-partner-apply',
    icon: 'partner',
  },
];

export type RpnBenefit = {
  title: string;
  description: string;
  icon: BusinessPageIconName;
};

const benefits: readonly RpnBenefit[] = [
  {
    title: 'Structured Customer Inquiries',
    description: 'Receive serious, pre-screened ritual inquiries matched according to your tradition, location, and specialization.',
    icon: 'check',
  },
  {
    title: 'Technology-Assisted Coordination',
    description: 'Access digital scheduling tools and communication platforms to streamline ritual logistics and client updates.',
    icon: 'virtual',
  },
  {
    title: 'Transparent Communication',
    description: 'Clear service terms, confirmed scopes, and transparent guidelines established prior to every booking.',
    icon: 'details',
  },
  {
    title: 'Wider Digital Reach',
    description: 'Connect with seeking families across India and overseas NRI communities seeking authentic Vaidik services.',
    icon: 'partner',
  },
  {
    title: 'Respect for Tradition and Expertise',
    description: 'Your traditional knowledge, scriptural training, and ceremonial experience are recognized and respected.',
    icon: 'sankalp',
  },
  {
    title: 'Administrative Support',
    description: 'Focus entirely on performing sacred rites while Connect Hub Co. handles scheduling, logistics, and client support.',
    icon: 'consultation',
  },
  {
    title: 'Long-Term Network Opportunity',
    description: 'Build a verified professional presence within an expanding nation-wide network of traditional Verified Priests.',
    icon: 'followup',
  },
  {
    title: 'Clear Service Requirements',
    description: 'Upfront transparency regarding service scope, ritual requirements, family preferences, and operational expectations.',
    icon: 'details',
  },
];

const eligibilityFactors = [
  {
    title: 'Relevant Ritual Knowledge or Traditional Practice',
    description: 'Demonstrated training and competence in performing authentic Vaidik mantras, pujas, or ancestral rites according to established tradition.',
  },
  {
    title: 'Proven Experience in Offered Services',
    description: 'Verified track record of conducting sacred ceremonies, home pujas, or destination rituals with care and integrity.',
  },
  {
    title: 'Ability to Explain Service Scope Clearly',
    description: 'Clear, transparent communication explaining ritual steps, samagri preparation, and family participation expectations.',
  },
  {
    title: 'Respectful Conduct & Timely Communication',
    description: 'Punctuality, cleanliness, ceremonial decorum, and responsive communication with seeking families.',
  },
  {
    title: 'Accurate Availability & Location Details',
    description: 'Providing genuine operational locations, languages spoken, and accurate service schedule availability.',
  },
  {
    title: 'Transparent Pricing & Inclusions',
    description: 'Adherence to fixed confirmed pricing and scope without unexpected demands or unauthorized charges.',
  },
  {
    title: 'Identity & Contact Verification',
    description: 'Willingness to complete basic identity, address, and contact verification prior to network participation.',
  },
  {
    title: 'Required References & Supporting Info',
    description: 'Providing traditional training references or supporting information relevant to your ritual domain.',
  },
  {
    title: 'Willingness to Follow Service Standards',
    description: 'Commitment to maintaining approved quality, cleanliness, and ethical service guidelines across all engagements.',
  },
  {
    title: 'Confidentiality & Information Handling',
    description: 'Responsible, privacy-first handling of customer family details, Gotra information, and ritual records.',
  },
  {
    title: 'Online & Offline Coordination Ability',
    description: 'Capability to conduct in-person physical rites or participate in approved live-streamed online formats where applicable.',
  },
] as const;

const eightSteps = [
  {
    num: '01',
    title: 'Select Priest Category',
    description: 'Choose the approved Priest Pathway matching your traditional training, service format, and practice location.',
  },
  {
    num: '02',
    title: 'Submit Basic Profile',
    description: 'Provide your full name, traditional title, contact details, primary location, and languages spoken.',
  },
  {
    num: '03',
    title: 'Provide Service and Location Details',
    description: 'Detail your operational cities, sacred hubs, temples, home puja services, or online participation capabilities.',
  },
  {
    num: '04',
    title: 'Share Experience and Supporting Information',
    description: 'Provide details of your years of practice, ritual specializations, and traditional references or credentials.',
  },
  {
    num: '05',
    title: 'Initial Administrative Review',
    description: 'Our Priest Onboarding team reviews the submitted profile for clarity, completeness, and initial suitability.',
  },
  {
    num: '06',
    title: 'Verification and Clarification',
    description: 'Conduct identity verification, document check, and follow-up communication to clarify service scope.',
  },
  {
    num: '07',
    title: 'Service Scope and Terms Confirmation',
    description: 'Confirm approved ritual service categories, transparent pricing guidelines, and ethical conduct standards.',
  },
  {
    num: '08',
    title: 'Approval, Onboarding, or Further Review',
    description: 'Receive official network approval, complete profile orientation, or receive guidance on pending review requirements.',
  },
] as const;

const requirements = [
  { title: 'Full Name & Title', description: 'Official full name and traditional title (Pandit, Acharya, Purohit, Panda).' },
  { title: 'Phone Number', description: 'Active phone number for scheduling and coordination updates.' },
  { title: 'Email Address', description: 'Primary email address for official Priest Communication.' },
  { title: 'Address & Service Location', description: 'Primary residential address and operational service base.' },
  { title: 'City, State & Country', description: 'Operational city, state, and country of practice.' },
  { title: 'Languages Spoken', description: 'Hindi, Sanskrit, English, or regional language capabilities.' },
  { title: 'Priest Category', description: 'Selected Priest Pathway (Ritual, Gaya, Location, Online, Vahi, Local).' },
  { title: 'Rituals / Services Offered', description: 'Specific Puja, Shraddh, Havan, or guidance capabilities.' },
  { title: 'Years of Experience', description: 'Proven years of experience conducting Vaidik ceremonies.' },
  { title: 'Preferred Service Mode', description: 'In-person physical presence, virtual live-stream, or hybrid format.' },
  { title: 'Online / Offline Availability', description: 'Operational schedule and mode availability.' },
  { title: 'Service Locations & Hubs', description: 'Cities, temples, or sacred pilgrim hubs served.' },
  { title: 'Identity Details (Where Approved)', description: 'Government identity proof details for background verification.' },
  { title: 'References (Where Approved)', description: 'Traditional references or credentials from verified priests.' },
  { title: 'Bank / Payment Details (If Approved)', description: 'Disbursement account details collected only after formal onboarding approval.' },
  { title: 'Photographs / Supporting Docs', description: 'Profile photograph and credential verification documents.' },
  { title: 'Availability & Preferred Contact', description: 'Schedule availability and preferred contact method.' },
  { title: 'Declaration & Consent', description: 'Agreement to follow approved ethical standards and application consent.' },
] as const;

const verificationPoints = [
  {
    title: 'Identity and Contact Review',
    description: 'Neutral review of submitted identity details, contact numbers, email address, and primary operational location.',
  },
  {
    title: 'Service-Category Review',
    description: 'Evaluation of selected Priest Pathway against proven traditional experience, ritual capabilities, and location feasibility.',
  },
  {
    title: 'Experience and Reference Checks',
    description: 'Background verification of traditional credentials, Gurukul training, and professional references where applicable.',
  },
  {
    title: 'Location and Availability Confirmation',
    description: 'Cross-checking operational service locations, travel reach, and accurate schedule availability.',
  },
  {
    title: 'Communication and Conduct Expectations',
    description: 'Alignment on professional decorum, punctuality, transparent pricing, and respectful family interaction.',
  },
  {
    title: 'Document Clarification Where Required',
    description: 'Follow-up communication to clarify incomplete details or request additional supporting information where needed.',
  },
  {
    title: 'Onboarding Guidance',
    description: 'Structured orientation covering platform coordination processes, customer communication protocols, and service standards.',
  },
  {
    title: 'Ongoing Quality Review',
    description: 'Continuous feedback monitoring, service quality evaluations, and compliance reviews to maintain network excellence.',
  },
] as const;

const standards = [
  {
    title: 'Respectful Ritual Conduct',
    description: 'Conducting every sacred ceremony with deep reverence, purity, proper Vaidik mantras, and respectful family decorum.',
  },
  {
    title: 'Accurate Representation of Services',
    description: 'Truthfully presenting traditional training, experience, service capabilities, and operational locations without exaggeration.',
  },
  {
    title: 'No False Guarantees',
    description: 'Providing honest, traditional guidance without making unapproved, unverified, or unrealistic outcome guarantees.',
  },
  {
    title: 'No Unauthorized Extra Charges',
    description: 'Adhering strictly to confirmed service scope and transparent pricing without demanding unexpected extra fees.',
  },
  {
    title: 'Timely Communication',
    description: 'Maintaining prompt, clear, and courteous communication regarding schedules, preparations, and updates.',
  },
  {
    title: 'Confidentiality & Privacy',
    description: 'Protecting family details, Gotra information, and ritual records under strict Privacy-First confidentiality standards.',
  },
  {
    title: 'Customer Dignity & Compassion',
    description: 'Treating every family with empathy, cultural respect, and dignity during sacred and emotional moments.',
  },
  {
    title: 'Adherence to Agreed Scope',
    description: 'Performing all included Vaidik steps, samagri arrangements, and duration commitments as specified in the service plan.',
  },
  {
    title: 'Transparent Completion Updates',
    description: 'Providing clear, honest completion feedback, digital photos, or live-stream updates for remote family ceremonies.',
  },
  {
    title: 'Responsible Use of Information',
    description: 'Using customer data exclusively for authorized ritual execution and never sharing or misusing platform records.',
  },
  {
    title: 'Cooperation With Review & Resolution',
    description: 'Cooperating constructively with administrative quality reviews, feedback evaluations, and resolution processes.',
  },
  {
    title: 'Compliance With Policies & Applicable Law',
    description: 'Strict adherence to applicable laws, ethical guidelines, and approved platform policies at all times.',
  },
] as const;

const categories = [
  { title: 'PitruMoksha Gaya', description: 'Pind Daan, Tarpan, and ancestral rites in Gaya Ji, Bihar.' },
  { title: 'Ancestral Rituals', description: 'Annual Shraddh, Pitru Dosh Shanti, and riverbank Tarpan rites.' },
  { title: 'Customized Puja', description: 'Tailored Vaidik pujas, Sankalp rites, and special devotion ceremonies.' },
  { title: 'Graha Shanti', description: 'Navagraha Shanti, Dosha remedies, and planetary peace pujas.' },
  { title: 'Hawan and Yagya', description: 'Sacred fire rituals, Homam, and Vaidik Yagyas for family well-being.' },
  { title: 'Marriage and Family Rituals', description: 'Vivah Sanskar, Upanayan, Namkaran, and family milestone rites.' },
  { title: 'Home Puja', description: 'Griha Pravesh, Vastu Shanti, Satyanarayan Katha, and domestic pujas.' },
  { title: 'Preferred Location Puja', description: 'Pujas conducted at customer-selected homes, halls, or sacred venues.' },
  { title: 'Online Ritual Participation', description: 'Virtual live-streamed ceremonies for remote and overseas NRI families.' },
  { title: 'Asthi Visarjan', description: 'Sacred ash immersion rites performed across holy riverbanks.' },
  { title: 'Memorial and Annual Rituals', description: 'Annual death anniversary rites, Barsi, and remembrance ceremonies.' },
  { title: 'Vahi Records Coordination', description: 'Guidance and updates with traditional Panda record custodians.' },
  { title: 'Temple and Venue Puja', description: 'Ceremonies performed at approved temples and sacred pilgrimage hubs.' },
  { title: 'Language-Specific Ritual Assistance', description: 'Rituals conducted in Hindi, Sanskrit, English, or regional languages.' },
  { title: 'Destination Ritual Coordination', description: 'Specialized coordination at major pilgrimage hubs across India.' },
  { title: 'Others / Verified Priest Services', description: 'Specialized religious guidance and custom Vaidik Priest services.' },
] as const;

const knowledgeCards = [
  {
    title: 'Who can apply as a Verified Priest?',
    description: 'Qualified Pandits, Purohits, Pandas, Acharyas, Vaidik Scholars, and traditional specialists with verified background credentials and traditional experience.',
  },
  {
    title: 'How verification works',
    description: 'Identity checks, document verification, background screening, and reference checks conducted neutrally by our Priest Onboarding team.',
  },
  {
    title: 'Information required before registration',
    description: 'Basic contact details, service locations, languages spoken, ritual specializations, experience years, and identity details.',
  },
  {
    title: 'Online versus offline service readiness',
    description: 'Guidelines for conducting physical in-person rites vs technical readiness required for live-streamed remote family participation.',
  },
  {
    title: 'Priest Responsibilities',
    description: 'Maintaining authentic Vaidik Vidhi, punctuality, transparent pricing, respectful conduct, customer confidentiality, and ethical service standards.',
  },
  {
    title: 'How customer inquiries are coordinated',
    description: 'Matching algorithms based on tradition, location, language preference, Gotra requirement (for Panda Vahi ledgers), and Priest availability.',
  },
  {
    title: 'Pricing and service-scope transparency',
    description: 'Fixed confirmed pricing established upfront without unauthorized extra demands, hidden fees, or high-pressure tactics.',
  },
  {
    title: 'What happens after application',
    description: 'Administrative review, credential verification, profile orientation, service terms confirmation, and active network onboarding.',
  },
] as const;

const faqs = [
  {
    question: 'Does registration guarantee approval?',
    answer: 'No. Registration is an initial application process. Network membership and service assignments depend on verified credentials, location feasibility, and adherence to approved ethical standards.',
  },
  {
    question: 'Who can apply as a Verified Priest?',
    answer: 'Qualified Pandits, Purohits, Pandas, Acharyas, and Vaidik Scholars who possess verified traditional training, proven ritual experience, and valid identity documentation.',
  },
  {
    question: 'What information is required to begin?',
    answer: 'Basic details including full name, traditional title, phone number, email, service locations, languages spoken, ritual specializations, experience years, and identity proof details.',
  },
  {
    question: 'Can I offer multiple ritual services?',
    answer: 'Yes. Verified Priests may list all ritual domains in which they possess verified traditional competence—such as Pind Daan, Havan, Griha Pravesh, or Vahi Records guidance.',
  },
  {
    question: 'Can I serve more than one city?',
    answer: 'Yes. Verified Priests can indicate all operational cities, states, or sacred pilgrimage hubs where they can travel or maintain physical service capabilities.',
  },
  {
    question: 'Can I provide online rituals?',
    answer: 'Yes. Qualified Verified Priests with appropriate technical readiness and clear communication skills can conduct approved live-streamed online ceremonies.',
  },
  {
    question: 'How are customer inquiries assigned?',
    answer: 'Inquiries are matched objectively based on customer location, language preference, specific ritual specialization, Gotra requirements (for Panda Vahi ledgers), and Priest availability.',
  },
  {
    question: 'Is income or booking volume guaranteed?',
    answer: 'No. Connect Hub Co. does not promise guaranteed bookings, fixed income, commissions, or automatic customer assignments. Inquiries depend on customer demand and suitability.',
  },
  {
    question: 'How are prices and inclusions handled?',
    answer: 'All service prices, samagri inclusions, and ritual steps are confirmed transparently with families upfront. Verified Priests must adhere strictly to agreed terms without extra demands.',
  },
  {
    question: 'What happens if documents are incomplete?',
    answer: 'Our Priest Onboarding team will contact you to request missing supporting details or clarify incomplete information before completing your review.',
  },
  {
    question: 'Can an application be reviewed again?',
    answer: 'Yes. If an application requires additional credentials or location updates, Verified Priests may re-submit updated information for administrative review.',
  },
  {
    question: 'How is Priest performance evaluated?',
    answer: 'Priest evaluation is based on customer feedback, punctuality, adherence to Vaidik standards, transparent pricing compliance, and professional conduct.',
  },
] as const;

export function ReligiousPartnersContent() {
  return (
    <div className={`${styles.rpnContent} business-inner-page`}>
      <section className={styles.masterStrip} aria-labelledby="partner-master-title">
        <div>
          <p>CONNECT HUB CO.</p>
          <h1 id="partner-master-title">Serve With Tradition. Grow With Trust.</h1>
        </div>
        <div className={styles.masterEntries}>
          <Link className={styles.registrationEntry} href="/religious-partners/register">Priest Registration Form</Link>
          <Link className={styles.aiEntry} href="/zen-g"><span className={styles.aiIcon}><MulticolourAiBrainIcon /></span>Ask for Help</Link>
        </div>
      </section>

      {/* SECTION 1: BECOME A RELIGIOUS PARTNER */}
      <section className={styles.section} id="become-partner" aria-labelledby="benefits-title">
        <header>
          <p>SECTION 1 — BECOME A VERIFIED PRIEST</p>
          <h2 id="benefits-title">
            <span>Serve With Tradition. Grow With Trust.</span>
          </h2>
          <span>
            The Verified Priest Network connects qualified Pandits, Purohits, Pandas, Acharyas, Vaidik Scholars, and traditional ritual specialists with seeking families across India and worldwide.
          </span>
        </header>
        <div className={styles.sectionBox}>
          <div className={styles.sectionGrid}>
            <div className={styles.sectionItem}>
              <h3>Who the Network is For</h3>
              <p>
                Qualified ritual practitioners, tradition-guided priests, traditional Panda record custodians, and Vaidik scholars dedicated to sacred service, authentic mantras, and ceremonial integrity.
              </p>
            </div>
            <div className={styles.sectionItem}>
              <h3>Role in Ritual Delivery</h3>
              <p>
                Verified Priests conduct authentic Vaidik rites for seeking families while Connect Hub Co. manages scheduling, client communication, travel logistics, and administrative support.
              </p>
            </div>
            <div className={styles.sectionItem}>
              <h3>Core Pillars of Service</h3>
              <p>
                We uphold the importance of traditional Vaidik Vidhi, demonstrated competence, punctuality, respectful conduct, and clear, compassionate communication with every family.
              </p>
            </div>
            <div className={styles.sectionItem}>
              <h3>Application & Verification Standard</h3>
              <p>
                Submitting registration details constitutes an initial application. Final onboarding requires human review, background check, and document verification. No automatic approval or customer assignments are guaranteed.
              </p>
            </div>
          </div>
          <div className={styles.noticeAlert}>
            <strong>Transparent Application Standard</strong>
            <p>
              Registration is an initial application and review process. Network membership and service assignments depend on verified credentials, location feasibility, and adherence to approved ethical standards. No approval or customer assignment is promised prior to verification.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: CHOOSE YOUR PARTNER PATH (6 Responsive Pathway Cards) */}
      <section className={styles.section} id="partner-pathways" aria-labelledby="pathways-title">
        <header>
          <p>SECTION 2 — PRIEST PATHWAYS</p>
          <h2 id="who-can-join">
            <span>Who Can Register?</span>
          </h2>
          <span>
            Select the pathway that matches your traditional training, service format, and operational location.
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
              <Link href={`/contact?mode=test&topic=${card.ctaTopic}`}>{card.ctaText}</Link>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 3: WHY JOIN THE RELIGIOUS PARTNER NETWORK */}
      <section className={styles.section} id="why-join" aria-labelledby="trust-title">
        <header>
          <p>SECTION 3 — NETWORK BENEFITS</p>
          <h2 id="partner-categories">
            <span>Priest Categories</span>
          </h2>
          <span>
            Built around tradition, technology-assisted coordination, transparent communication, and wider digital reach.
          </span>
        </header>
        <div className={styles.benefitsGrid}>
          {benefits.map((item) => (
            <article key={item.title} className={styles.benefitCard}>
              <span>
                <BusinessPageIcon name={item.icon} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 4: ELIGIBILITY AND EXPECTATIONS */}
      <section className={`${styles.section} ${styles.eligibilitySection}`} id="eligibility" aria-labelledby="eligibility-title">
        <header>
          <p>SECTION 4 — ELIGIBILITY & EXPECTATIONS</p>
          <h2 id="how-it-works">
            <span>How Onboarding Works</span>
          </h2>
          <span>
            Key standards for qualified practitioners seeking to join our verified network.
          </span>
        </header>
        <div className={styles.eligibilityGrid}>
          {eligibilityFactors.map((item) => (
            <div className={styles.eligibilityCard} key={item.title}>
              <BusinessPageIcon name="check" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: RELIGIOUS PARTNER REGISTRATION PROCESS (8-Step Process) */}
      <section className={styles.section} id="registration-process" aria-labelledby="rpn-process-title">
        <header>
          <p>SECTION 5 — REGISTRATION PROCESS</p>
          <h2 id="documents-required">
            <span>Documents & Details Required</span>
          </h2>
          <span>
            An 8-step structured onboarding pathway from initial application submission to active network participation.
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
        <div className={styles.noticeAlert} style={{ marginTop: '24px' }}>
          <strong>Mandatory Onboarding Clarifications</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: '20px', color: '#4a5568', fontSize: '0.9rem', lineHeight: '1.6' }}>
            <li>Application submission does not guarantee approval.</li>
            <li>Incomplete profile details may require follow-up clarification.</li>
            <li>Final approval requires human review and credential verification.</li>
            <li>Service activation occurs exclusively after approved onboarding completion.</li>
            <li>Future customer assignments depend on business need, Priest availability, performance, and suitability.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 6: INFORMATION REQUIRED (18-Point Checklist) */}
      <section className={`${styles.section} ${styles.reqSection}`} id="info-required" aria-labelledby="req-title">
        <header>
          <p>SECTION 6 — CHECKLIST</p>
          <h2 id="verification-governance">
            <span>Verification & Governance Standards</span>
          </h2>
          <span>
            Prepare the following details using this 18-point checklist when submitting your Priest Registration application.
          </span>
        </header>
        <div className={styles.reqGrid}>
          {requirements.map((req) => (
            <div key={req.title} className={styles.reqCard}>
              <BusinessPageIcon name="check" />
              <div>
                <h3>{req.title}</h3>
                <p>{req.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: VERIFICATION AND ONBOARDING */}
      <section className={`${styles.section} ${styles.verificationSection}`} id="verification" aria-labelledby="verification-title">
        <header>
          <p>SECTION 7 — VERIFICATION & ONBOARDING</p>
          <h2 id="code-of-conduct">
            <span>Professional Code of Conduct</span>
          </h2>
          <span>
            A neutral, structured evaluation of Priest credentials, operational reach, onboarding guidance, and ongoing quality review.
          </span>
        </header>
        <div className={styles.verificationGrid}>
          {verificationPoints.map((point) => (
            <div key={point.title} className={styles.verificationCard}>
              <BusinessPageIcon name="partner" />
              <div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: RELIGIOUS PARTNER STANDARDS */}
      <section className={styles.section} id="partner-standards" aria-labelledby="standards-title">
        <header>
          <p>SECTION 8 — PRIEST STANDARDS</p>
          <h2 id="technology-support">
            <span>Technology & Operational Support</span>
          </h2>
          <span>
            Clear ethical and professional standards governing all network activities and family engagements.
          </span>
        </header>
        <div className={styles.standardsBox}>
          <div className={styles.standardsGrid}>
            {standards.map((std) => (
              <div key={std.title} className={styles.standardItem}>
                <h3>{std.title}</h3>
                <p>{std.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: PARTNER CATEGORIES */}
      <section className={styles.section} id="partner-categories" aria-labelledby="categories-title">
        <header>
          <p>SECTION 9 — PRIEST CATEGORIES</p>
          <h2 id="service-coverage">
            <span>Service Coverage Areas</span>
          </h2>
          <span>
            Explore the 16 approved, responsive Priest Categories supported across our service framework.
          </span>
        </header>
        <div className={styles.categoriesGrid}>
          {categories.map((cat) => (
            <div key={cat.title} className={styles.categoryCard}>
              <h3>{cat.title}</h3>
              <p>{cat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10: KNOWLEDGE CENTRE PREVIEW */}
      <section className={`${styles.section} ${styles.knowledgeSection}`} id="knowledge-centre" aria-labelledby="knowledge-title">
        <header>
          <p>SECTION 10 — KNOWLEDGE CENTRE PREVIEW</p>
          <h2 id="partner-faqs">
            <span>Priest Frequently Asked Questions</span>
          </h2>
          <span>
            Essential insights and guides for qualified practitioners considering network registration.
          </span>
        </header>
        <div className={styles.knowledgeGrid}>
          {knowledgeCards.map((card) => (
            <article key={card.title} className={styles.knowledgeCard}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 11: COMMON QUESTIONS (12 Factual FAQs) */}
      <section className={styles.section} id="faqs" aria-labelledby="rpn-faq-title">
        <header>
          <p>SECTION 11 — FAQ</p>
          <h2 id="registration-form">
            <span>Register as a Verified Priest</span>
          </h2>
          <span>
            Factual and neutral answers to key questions regarding Priest Application, verification, inquiry assignment, and performance.
          </span>
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

      {/* AI Panel Section */}
      <section className={styles.section} aria-labelledby="ai-rpn-title">
        <HeroAssistantPanel
          standalone
          slide={{ id: 'religious-partner-network' }}
        />
      </section>

      {/* SECTION 12: FINAL REGISTRATION CTA */}
      <section className={styles.inquiry} id="inquiry" aria-labelledby="rpn-inquiry-title">
        <div>
          <p>SECTION 12 — REGISTRATION APPLICATION</p>
          <h2 id="why-choose-connect-hub">
            <span>Why Join Connect Hub Co.?</span>
          </h2>
          <span>
            Submit your profile, service expertise, locations, and availability for administrative review and verification.
          </span>
        </div>
        <div className={styles.inquiryActions}>
          <Link href={inquiryHref}>Start Priest Registration</Link>
          <Link href="#eligibility">Review Eligibility</Link>
          <Link href="#partner-categories">Explore Priest Categories</Link>
        </div>
      </section>

      {/* Related Navigation */}
      <nav className={styles.related} aria-label="Related navigation">
        <strong>Related navigation</strong>
        <div>
          <Link href={PITRU_MOKSHA_GAYA_ROUTE}>PitruMoksha Gaya</Link>
          <Link href="/ritual-services">Ritual Services</Link>
          <Link href="/travel-assistance">Travel Assistance</Link>
          <Link href={VAHI_RECORDS_ROUTE}>Vahi Records</Link>
          <Link href="/services">Service Catalog</Link>
        </div>
      </nav>
    </div>
  );
}
