import Image from 'next/image';
import { VahiPriceMatrixAccess } from './VahiPriceMatrixAccess';
import styles from './VahiApprovedContent.module.css';
import cardStyles from './VahiCards.module.css';

const workflow = [
  {
    title: 'Submit Information',
    sourceTitle: 'Information Submission',
    text: "Complete the comprehensive search initiation form under our 'Book Now' tab. Key details required include: applicant details, ancestor names, father, grandfather, family surnames or aliases, earlier known lineage including adoptions (if any), Gotra (if known), native village, district, state, country, previous pilgrimage details & historical migration paths (family movements, native villages if known), and supporting documents or references (where available).",
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

const trustItems = [
  ['Confidential Family Information', 'Family details are handled privately and used only for the approved Vahi inquiry and coordination process.'],
  ['Verified Custodian Guidance', 'Coordination is provided through verified Religious Partners and the relevant traditional record custodian.'],
  ['Traditional Lineage Assistance', 'Guidance helps families understand lineage references, family branches, Gotra, native place and historical visits where available.'],
  ['No False Discovery Guarantee', 'Record availability is subject to verification; Connect Hub Co. does not promise that every family record will be found.'],
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

export function VahiApprovedContent() {
  return (
    <div className={`${styles.page} business-inner-page`}>
      <section className={styles.intro} aria-labelledby="vahi-content-title">
        <p>CONNECT HUB CO.</p>
        <h1 id="vahi-content-title">Unearth Your Ancestral Lineage</h1>
      </section>

      <section className={styles.section} aria-labelledby="what-vahi-title">
        <h2 id="what-vahi-title">What are Vahi (Panji) Records?</h2>
        <p>Vahi (Panji) are centuries-old, handwritten sacred genealogical records that document ancestral family lineages, pilgrimage histories, and sacred ritual timelines. Historically preserved on Tamra Patra (copper plates) or Bhojpatra (birch bark), modern records are maintained meticulously on paper, typically spanning up to six generations or more. This uninterrupted custom has been preserved continuously since around 1700 CE by the Gayawal Pandas, a hereditary Brahmin community centered in the holy city of Gaya Ji, Bihar, India.</p>
        <p>Connect Hub Co. provides dedicated guidance, technology-enabled coordination, and facilitation through verified traditional Pandas. Our mission is to bridge age-old tradition with modern accessibility—helping families transparently explore their ancestral roots, map their heritage, and pass down invaluable lineage clarity to future generations, while completely honoring established religious customs and the absolute authority of the original custodians.</p>
      </section>

      <section className={styles.section} aria-labelledby="vahi-trust-title">
        <h2 id="vahi-trust-title">Connecting Families with Their Ancestral Lineage</h2>
        <div className={cardStyles.cardGrid}>
          {trustItems.map(([title, description]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="support-categories" aria-labelledby="services-title">
        <h2 id="services-title">Discover Before It Gets Lost</h2>
        <div className={cardStyles.cardGrid}>
          {services.map(([title, description], index) => (
            <article key={title}>
              <div className={cardStyles.cardHeader}>
                <span className={cardStyles.cardNumber}>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.note}`} aria-labelledby="please-note-title">
        <h2 id="please-note-title">Please Note</h2>
        <h3>Service Scope, Limitations &amp; Disclaimers</h3>
        <ul>
          <li><strong>No Legal/Property Standing:</strong> The lineage history and records discovered within the Vahi are for personal, historical, and spiritual awareness only. They do not constitute legally binding evidence and cannot be used to claim lineage rights, titles, or settle property disputes.</li>
          <li><strong>No Guarantee of Discovery:</strong> We do not guarantee that every search will locate a matching record. Successful discovery depends entirely on whether a family record exists, its physical condition, and the historical accuracy of the details provided.</li>
          <li><strong>Nature of Traditional Archives:</strong> Vahi records are not official government identity documents. Some volumes may be incomplete, partial, or permanently damaged due to the passage of time. Search durations vary, and older entries frequently present spelling variations that require careful interpretation.</li>
          <li><strong>Role Definition:</strong> Connect Hub Co. operates purely as a logistics and coordination facilitator. We respect the absolute ownership of the original traditional custodians. We do not alter, create, recreate, certify, or authenticate these historical records for any purpose.</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="information-title">
        <h2 id="information-title">Vahi Information &amp; Its Importance</h2>
        <h3>Understanding Vahi Records</h3>
        <p>Vahi Records are not government identity records. Some records may be complete, while others may be partial or unavailable. Customers should understand that successful identification depends on the availability of records, the accuracy of the information provided, and respecting the integrity of the original records.</p>
        <p>Searching for ancestral lineage records often involves sharing family information, interacting with traditional record custodians, and understanding historical documents preserved over generations.</p>
        <p>Where records are unavailable, incomplete, damaged, or cannot be verified, this is communicated honestly.</p>
        <p>Connect Hub Co. coordinates inquiries, facilitates communication, and explains available findings, while respecting the ownership and custodianship of the original records. Hereby:</p>
        <ul>
          <li>Information is presented only as available from the original sources.</li>
          <li>Verification depends on the records maintained by traditional custodians.</li>
          <li>Where information cannot be confirmed, customers will be informed transparently.</li>
          <li>The company does not guarantee that every search will locate an ancestral record.</li>
          <li>Detailed obligations regarding collection, storage, sharing, retention, and customer rights are governed by the company&apos;s Privacy Policy.</li>
        </ul>
        <h3 id="what-hold-title">What Does It Hold?</h3>
        <p>Customers can trace an unbroken family tree and can fulfill the informational details that may have been lost over time.</p>
        <p>These records can be considered as connecting the present with the past: after tracing years-old entries, the actual signature/thumb impressions of the great-grandfather connect you to a deeply emotional link.</p>
        <p>Reflects cultural continuity path, family memory, and religious heritage.</p>
        <h3>Its Importance</h3>
        <p>A verified search unlocks access to:</p>
        <ul>
          <li><strong>Comprehensive Family Genealogy:</strong> Map an unbroken family tree across multiple generations, Ancestor’s name &amp; Gotra of the returned pilgrim, Connect families with their ancestral preserved heritage, customs and traditional roots.</li>
          <li><strong>Pilgrimage &amp; Ritual Timelines:</strong> Preserve date of ritual history, Ancestors for whom Pind Daan was performed by your ancestors, during pilgrimage, tells presiding priests.</li>
          <li><strong>Identity Verification:</strong> The exact names, Gotras, native villages, districts, and regions of origin documented from the time of the original journey.</li>
          <li><strong>Authentic Signatures &amp; Validation:</strong> Physical signatures, marks, or thumbprints of the visiting ancestor alongside the validation stamp or signature of the presiding Gayawal Panda.</li>
        </ul>
      </section>

      <section className={styles.section} id="vahi-workflow" aria-labelledby="workflow-title">
        <h2 id="workflow-title">Vahi Search Participation Workflow</h2>
        <ol className={styles.workflow}>
          {workflow.map((step, index) => (
            <li key={step.title}>
              <span>{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <strong>{step.sourceTitle}</strong>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <VahiPriceMatrixAccess />
    </div>
  );
}

