import Image from 'next/image';
import { VahiPriceMatrixAccess } from './VahiPriceMatrixAccess';
import styles from './VahiApprovedContent.module.css';

const workflow = [
  {
    title: 'Submit Information',
    intro: "Complete the comprehensive search initiation form under our 'Book Now' tab.",
    sourceTitle: 'Key details required include:',
    text: 'applicant details, ancestor names, father, grandfather, family surnames or aliases, earlier known lineage including adoptions (if any), Gotra (if known), native village, district, state, country, previous pilgrimage details & historical migration paths (family movements, native villages if known), and supporting documents or references (where available).',
  },
  {
    title: 'Information Review',
    sourceTitle: 'Data Validation & Completeness Review',
    text: 'Our team reviews the provided material for internal consistency and completeness. If details require further clarification or exhibit ambiguity, we will contact you directly before passing the parameters to the ground team.',
  },
  {
    title: 'Search Coordination',
    sourceTitle: 'On-Ground Search Coordination',
    text: "Once validated, your request is safely mapped to the specific traditional record custodian (from the Gayawal Panda Sabha) who holds hereditary jurisdiction over your family's native geographic region, Gotra, or surname.",
  },
  {
    title: 'Findings & Verification',
    sourceTitle: 'Findings Verification & Evaluation',
    text: 'Available findings are thoroughly examined on-site. The outcomes are governed strictly by the preservation status, legibility, and existence of the document. If information cannot be successfully verified or cross-referenced, we share these details transparently.',
  },
  {
    title: 'Customer Communication, Completion & Deliverables',
    sourceTitle: 'Deliverables & Guidance Briefing',
    text: 'Upon conclusion, you will receive the agreed-upon deliverables along with an interpretive guide explaining the historical findings and outlining any recommended follow-up actions.',
  },
] as const;

const services = [
  ['Ancestor’s Name & Family Tree', 'Coordinate a search using available ancestor names, family branches, Gotra, native place and earlier family history.'],
  ['Know Your Lineage Tree', 'Map an unbroken family tree across multiple generations, ancestor names, and traditional lineage entries.'],
  ['Preserve for the Future', 'Help preserve date of ritual history, family memories, and traditional roots for upcoming generations.'],
  ['Place of Origin & Native Place', 'Identify and verify native village, district, state, country, and historical family migration paths.'],
  ['Find Ritual History', 'Locate preserved dates and entries of previous pilgrimages and ancestral Pind Daan rituals.'],
  ['Interpretation & Translation Support', 'Help explain traditional handwritten entries and terminology in a form the family can understand.'],
  ['NRI & Remote Family Assistance', 'Provide inquiry and coordination support for families who cannot initially visit Gaya Ji in person.'],
  ['Vahi-linked Ritual Guidance', 'Explain how available lineage or pilgrimage references may support a related PitruMoksha Gaya inquiry, without treating the Vahi search as ritual performance.'],
  ['Digital Access', 'Support families in responsibly viewing, receiving, and understanding available ancestral record entries.'],
  ['Authentic & Verified', 'Assist in identifying and coordinating with relevant traditional record custodians through verified Religious Partners.'],
] as const;

const cardServices = [services[0], services[1], services[2], services[3], services[4], services[7]] as const;
const stripServices = [
  { marker: '文', service: services[5] },
  { marker: '⌂', service: services[6] },
  { marker: '▣', service: services[8] },
  { marker: '', service: services[9] },
] as const;

const initialReviewChecklist = [
  ['Family Surname', 'Primary family surname used across generations.'],
  ['Alternative Spellings', 'Regional, historical, or phonetic spelling variations.'],
  ['Gotra, if Known', 'Paternal or family Gotra lineage.'],
  ['Family Branch / Traditional Identifier', 'Sub-caste, lineage title, or family branch name.'],
  ['Previous Pilgrimage Details', 'Known past visits to Gaya Ji.'],
  ['Approximate Years or Generations', 'Historical timelines or generation counts.'],
  ['If Known Panda Contact Reference', 'Names, references, or ledger notes from prior visits.'],
  ['Current Family Contact Details', 'Contact details of the person requesting guidance.'],
  ['Special Clarification Notes', 'Specific lineage questions, adoption, or family history notes.'],
] as const;

const availabilityLimitations = [
  ['Not Every Family Has an Identifiable Record', 'Matching depends on past family visits and physical ledger preservation. Unrecorded historical migrations or missing visits mean that not every family record exists or can be identified.'],
  ['Multiple Name & Place Spellings', 'Historical ledgers contain regional scripts and phonetic variations. Reassuring human review helps evaluate multiple spellings of surnames, ancestor names, and villages.'],
  ['Incomplete Family Details Require Review', 'When key details (such as Gotra or native district) are partial, initial completeness review helps organize what information is available before proceeding.'],
  ['Location-Specific Ledgers', 'Registers are not combined in a single central repository.'],
] as const;

export function VahiApprovedContent() {
  return (
    <div className={`${styles.page} business-inner-page`}>
      <section className={`${styles.intro} ${styles.vahiHeroBanner}`} aria-labelledby="vahi-content-title">
        <Image className={styles.vahiHeroImage} src="/images/heroes/hero-4/vahi-records-page-hero.png" alt="Traditional Vahi ancestral records" fill sizes="100vw" priority />
        <div className={styles.vahiHeroShade} aria-hidden="true" />
        <div className={styles.vahiHeroCopy}><h1 id="vahi-content-title"><span>Wisdom Preserved by Tradition</span><span>Rediscovered by You.</span></h1></div>
        <svg className={styles.heritageEmblem} viewBox="0 0 120 120" aria-hidden="true">
          <circle className={styles.emblemPulse} cx="60" cy="60" r="27" />
          <circle className={`${styles.energyRing} ${styles.energyRingOuter}`} cx="60" cy="60" r="42" />
          <circle className={`${styles.energyRing} ${styles.energyRingInner}`} cx="60" cy="60" r="34" />
          <g className={styles.lotusMark}>
            <path d="M60 78C48 68 45 54 60 36C75 54 72 68 60 78Z" />
            <path d="M57 79C42 76 33 66 35 49C51 53 59 64 57 79Z" />
            <path d="M63 79C78 76 87 66 85 49C69 53 61 64 63 79Z" />
            <path d="M53 82C37 84 27 78 22 65C39 63 50 69 53 82Z" />
            <path d="M67 82C83 84 93 78 98 65C81 63 70 69 67 82Z" />
            <path d="M28 86C45 91 75 91 92 86" />
          </g>
          <path className={styles.energyFlow} d="M18 61C29 48 34 38 38 23M102 61C91 48 86 38 82 23" />
          <g className={styles.sparkles}>
            <circle cx="27" cy="39" r="1.7" /><circle cx="91" cy="33" r="1.4" /><circle cx="99" cy="72" r="1.6" /><circle cx="42" cy="18" r="1.2" />
          </g>
        </svg>
      </section>

      <section className={styles.section} aria-labelledby="what-vahi-title">
        <h2 className={styles.aboutHeading} id="what-vahi-title">About Vahi (Panji) Records</h2>
        <p>Vahi (Panji) are centuries-old, handwritten sacred genealogical records that document ancestral family lineages, pilgrimage histories, and sacred ritual timelines. Historically preserved on Tamra Patra (copper plates) or Bhojpatra (birch bark), modern records are maintained meticulously on paper, typically spanning up to six generations or more. This uninterrupted custom has been preserved continuously since around 1700 CE by the Gayawal Pandas, a hereditary Brahmin community centered in the holy city of Gaya Ji, Bihar, India.</p>
        <p>Connect Hub Co. provides dedicated guidance, technology-enabled coordination, and facilitation through verified traditional Pandas. Our mission is to bridge age-old tradition with modern accessibility—helping families transparently explore their ancestral roots, map their heritage, and pass down invaluable lineage clarity to future generations, while completely honoring established religious customs and the absolute authority of the original custodians.</p>
      </section>

      <details className={styles.scopeDisclosure}>
        <summary>Service Scope, Limitations &amp; Disclaimers</summary>
        <ul>
          <li><strong>No Legal/Property Standing:</strong> The lineage history and records discovered within the Vahi are for personal, historical, and spiritual awareness only. They do not constitute legally binding evidence and cannot be used to claim lineage rights, titles, or settle property disputes.</li>
          <li><strong>No Guarantee of Discovery:</strong> We do not guarantee that every search will locate a matching record. Successful discovery depends entirely on whether a family record exists, its physical condition, and the historical accuracy of the details provided.</li>
          <li><strong>Nature of Traditional Archives:</strong> Vahi records are not official government identity documents. Some volumes may be incomplete, partial, or permanently damaged due to the passage of time. Search durations vary, and older entries frequently present spelling variations that require careful interpretation.</li>
        </ul>
      </details>

      <section className={`${styles.section} ${styles.understandingBox}`} aria-labelledby="information-title">
        <h3 id="information-title">Understanding Vahi Records</h3>
        <p className={styles.informationStrip}><strong>Role Definition:</strong> Connect Hub Co. operates purely as a logistics and coordination facilitator. We respect the absolute ownership of the original traditional custodians. We do not alter, create, recreate, certify, or authenticate these historical records for any purpose.</p>
          <p className={styles.informationStrip}>Where records are unavailable, incomplete, damaged, or cannot be verified, this is communicated honestly.</p>
          <ul className={styles.informationBoxGrid}>
          <li>Information is presented only as available from the original sources.</li>
          <li>Verification depends on the records maintained by traditional custodians.</li>
          <li>Where information cannot be confirmed, customers will be informed transparently.</li>
          <li>The company does not guarantee that every search will locate an ancestral record.</li>
          </ul>
          <p>Detailed obligations regarding collection, storage, sharing, retention, and customer rights are governed by the company&apos;s Privacy Policy.</p>
        </section>

      <section className={styles.section} aria-labelledby="what-hold-title">
        <h3 id="what-hold-title">What the Records Hold</h3>
        <p className={styles.informationStrip}>Customers can trace an unbroken family tree and can fulfill the informational details that may have been lost over time.</p>
        <p className={styles.informationStrip}>These records can be considered as connecting the present with the past: after tracing years-old entries, the actual signature/thumb impressions of the great-grandfather connect you to a deeply emotional link.</p>
        <p className={styles.informationStrip}>Reflects cultural continuity path, family memory, and religious heritage.</p>
        <h3>A verified search unlocks access to</h3>
        <ul className={styles.fourBoxGrid}>
          <li><strong>Comprehensive Family Genealogy:</strong> Map an unbroken family tree across multiple generations, identify the ancestor&apos;s name and Gotra of the returning pilgrim, and connect families with their preserved ancestral heritage, customs, and traditional roots.</li>
          <li><strong>Pilgrimage &amp; Ritual Timelines:</strong> Preserve dates from ritual history, identify ancestors for whom Pind Daan was performed during pilgrimage, and identify the presiding priests.</li>
          <li><strong>Identity Verification:</strong> The exact names, Gotras, native villages, districts, and regions of origin documented from the time of the original journey.</li>
          <li><strong>Authentic Signatures &amp; Validation:</strong> Physical signatures, marks, or thumbprints of the visiting ancestor alongside the validation stamp or signature of the presiding Gayawal Panda.</li>
        </ul>
      </section>

      <section className={styles.section} id="approved-vahi-services" aria-labelledby="services-title">
        <h2 id="services-title">Discover Before It Gets Lost</h2>
        <div className={styles.serviceCardGrid}>
          {cardServices.map(([title, description]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className={styles.serviceStrips}>
          {stripServices.map(({ marker, service: [title, description] }) => (
            <article className={styles.serviceStrip} key={title}>
              <span aria-hidden="true">{marker}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="vahi-workflow" aria-labelledby="workflow-title">
        <h2 id="workflow-title">Vahi Search Participation Workflow</h2>
        <ol className={styles.workflow}>
          {workflow.map((step, index) => (
            <li key={step.title}>
                <span>{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  {'intro' in step && <p>{step.intro}</p>}
                  <strong>{step.sourceTitle}</strong>
                  <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="protocol-clarifications-title">
        <h2 id="protocol-clarifications-title">Mandatory Protocol Clarifications</h2>
        <div className={styles.protocolStrips}>
          <p className={styles.informationStrip}>Ask GenZ AI may help collect and organize initial information only.</p>
          <p className={styles.informationStrip}>Human review by qualified coordinators.</p>
          <p className={styles.informationStrip}>Authorized custodians are mandatory.</p>
          <p className={styles.informationStrip}><strong>Scope, Schedule, and Quotation Confirmation</strong><br />Receive an official quotation stating the approved service scope and charges before booking.</p>
          <p className={styles.informationStrip}><strong>Completion Update and Further Guidance</strong><br />Receive structured status updates, confirmed record notes (where matched).</p>
          <p className={styles.informationStrip}>Guidance for recording new family rites.</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="initial-review-title">
        <h2 id="initial-review-title">Checklist for Initial Review</h2>
        <div className={styles.initialReviewGrid}>
          {initialReviewChecklist.map(([title, description]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="availability-limitations-title">
        <h2 id="availability-limitations-title">AVAILABILITY &amp; LIMITATIONS</h2>
        <p className={styles.informationStrip}>Reassuring, realistic guidance regarding physical ledgers, spelling variations, and custodian verification.</p>
        <div className={styles.availabilityGrid}>
          {availabilityLimitations.map(([title, description]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <VahiPriceMatrixAccess />
    </div>
  );
}

