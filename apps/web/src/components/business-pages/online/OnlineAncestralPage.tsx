import Image from 'next/image';
import Link from 'next/link';
import { BusinessPageFrame, type BusinessStep } from '../BusinessPageShell';
import { BusinessPageIcon, type BusinessPageIconName } from '../BusinessPageIcon';
import { HeroAssistantPanel } from '@/features/hero/components/HeroAssistantPanel';
import { PITRU_MOKSHA_GAYA_OFFLINE_ROUTE, PITRU_MOKSHA_GAYA_ROUTE, VAHI_RECORDS_ROUTE } from '@/features/hero/data/heroRoutes';
import styles from './OnlineAncestralPage.module.css';

const inquiryHref = '/contact?topic=online-ancestral-services';
const services: readonly { title: string; description: string; icon: BusinessPageIconName }[] = [
  { title: 'Virtual Shraddh', description: 'Participate remotely in a guided Shraddh ritual coordinated through a verified Religious Partner.', icon: 'virtual' },
  { title: 'Online Pind Daan Participation', description: 'Receive guided remote participation and ritual coordination when physical travel is not possible.', icon: 'offering' },
  { title: 'Live Family Participation', description: 'Allow eligible family members to join the ritual through an arranged live video session.', icon: 'family' },
  { title: 'Online Sankalp Guidance', description: 'Receive step-by-step guidance for Sankalp and required family or ancestor details.', icon: 'sankalp' },
  { title: 'Religious Partner Coordination', description: 'Coordinate ritual requirements, timing and preparation through verified Religious Partners.', icon: 'partner' },
  { title: 'Photos and Video Documentation', description: 'Receive available ritual-completion photographs, videos or supporting documentation according to the service plan.', icon: 'camera' },
  { title: 'Time-Zone Scheduling', description: 'Coordinate participation timing for NRI and international families where feasible.', icon: 'timezone' },
  { title: 'Online Consultation', description: 'Discuss the appropriate ritual, required information and service process before booking.', icon: 'consultation' },
  { title: 'Family Detail Collection', description: 'Submit ancestor names, Gotra, family details and preferred ritual date through a guided process.', icon: 'details' },
  { title: 'Completion and Follow-Up Support', description: 'Receive post-service communication, documentation and assistance with approved follow-up questions.', icon: 'followup' },
];
const steps: readonly BusinessStep[] = [
  { title: 'Share Your Requirement', description: 'Tell us your purpose, location and preferred participation format.' },
  { title: 'Provide Ancestor and Family Details', description: 'Share the requested names, Gotra and relevant family information privately.' },
  { title: 'Receive Ritual Guidance', description: 'Understand suitable options based on tradition and Religious Partner guidance.' },
  { title: 'Confirm Date and Religious Partner', description: 'Review the proposed timing, preparation and verified Religious Partner.' },
  { title: 'Join the Guided Online Participation', description: 'Use the arranged live connection and follow the participation guidance.' },
  { title: 'Receive Documentation and Follow-Up', description: 'Receive agreed documentation and approved follow-up assistance.' },
];
const virtualShraddhPoints = [
  'Virtual Shraddh is part of PitruMoksha Gaya Online services.',
  'The family first raises an inquiry.',
  'Required ancestor and family details are collected.',
  'A verified Religious Partner is coordinated.',
  'The ritual date and participation method are confirmed.',
  'Eligible family members may join through a live online session.',
  'Available photographs, video or completion documentation may be shared according to the selected service plan.',
] as const;
const beneficiaryGroups = ['NRIs and international families', 'Families unable to travel', 'Elderly participants', 'Participants with mobility constraints', 'Families located in different cities or countries', 'Users seeking guidance before choosing Online or Offline participation'] as const;
const trustItems = ['Verified Religious Partners', 'Guided Participation', 'Transparent Communication', 'Confidentiality-First Support', 'Family and Ancestor Detail Review', 'Available Completion Documentation', 'NRI-Friendly Coordination', 'Post-Service Follow-Up'] as const;
const faqs = [
  ['What is the difference between Online and Offline participation?', 'Online participation is remotely coordinated; Offline participation involves travelling to Gaya for in-person services. Suitability depends on the family’s circumstances and guidance.'],
  ['Is the ritual shown live?', 'A live session may be arranged when included in the confirmed service plan and practical conditions permit.'],
  ['Can multiple family members join?', 'Yes, eligible family members may join when access and participation arrangements are confirmed beforehand.'],
  ['Can NRIs book the service?', 'Yes. NRI and international families may request online coordination, subject to timing and service suitability.'],
  ['Which details are required before confirmation?', 'Common details include ancestor names, Gotra, family relationship, purpose, location and preferred date.'],
  ['Are photos and videos provided?', 'Available documentation is confirmed before booking and depends on the selected service plan.'],
  ['How is the Religious Partner selected?', 'Selection considers the requested service, tradition, timing, location and verified capability.'],
  ['How can I raise an inquiry?', 'Use the inquiry link on this page and provide your contact details and preferred online service.'],
] as const;

export function OnlineAncestralPage() {
  return <BusinessPageFrame breadcrumb={[{ label: 'Connect Hub Co.', href: '/' }, { label: 'PitruMoksha Gaya', href: PITRU_MOKSHA_GAYA_ROUTE }, { label: 'Online' }]} className={styles.onlinePage}>
    <section className={styles.hero} aria-labelledby="online-page-title">
      <Image src="/images/hero/Hero_1_PitruMoksha_Gaya_Final_v2.0.png" alt="Representative river and ghat scene with a Religious Partner performing ancestral rites while a family participates remotely" fill priority sizes="(max-width: 1023px) 100vw, 75vw" />
      <div className={styles.heroOverlay} aria-hidden="true" />
      <div className={styles.heroContent}><p className={styles.eyebrow}>ONLINE ANCESTRAL SERVICES</p><h1 id="online-page-title">Distance Never Stops Devotion.</h1><h2>Participate from Anywhere in the World.</h2><p>Join guided ancestral rituals remotely through verified Religious Partners, live family participation, transparent coordination and documented completion.</p><strong>Designed for NRIs, travelling families, elderly participants and families unable to visit Gaya in person.</strong><div className={styles.heroActions}><Link href="#online-services">Explore Online Services</Link><Link href="#inquiry">Raise an Inquiry</Link></div><small>Verified Religious Partners | Guided Participation | Completion Documentation</small></div>
      <p className={styles.disclaimer}>Representative image — actual ritual and participation arrangements may vary.</p>
    </section>
    <section className={styles.section} id="online-services" aria-labelledby="services-title"><header><p>ONLINE PATHWAYS</p><h2 id="services-title">Explore Online Ancestral Services</h2><span>Choose the service that best matches your family’s circumstances and participation needs.</span></header><div className={styles.serviceGrid}>{services.map(service => <article key={service.title}><span className={styles.serviceIcon}><BusinessPageIcon name={service.icon} /></span><h3>{service.title}</h3><p>{service.description}</p></article>)}</div></section>
    <section className={`${styles.section} ${styles.virtualFeature}`}><div><p>FEATURED ONLINE SERVICE</p><h2>Virtual Shraddh</h2><strong>Guided ancestral ritual participation when distance prevents physical presence.</strong><ul>{virtualShraddhPoints.map(point=><li key={point}><BusinessPageIcon name="check" /><span>{point}</span></li>)}</ul><p className={styles.featureNote}>Ritual suitability, procedure and participation method depend on tradition, family circumstances and Religious Partner guidance.</p></div><Link href="#inquiry">Learn About Virtual Shraddh</Link></section>
    <section className={styles.section} aria-labelledby="process-title"><header><p>PROCESS</p><h2 id="process-title">How Online Participation Works</h2></header><ol className={styles.steps}>{steps.map((step,index)=><li key={step.title}><span>{index+1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></section>
    <section className={`${styles.section} ${styles.benefit}`} aria-labelledby="benefit-title"><header><p>ACCESSIBLE PARTICIPATION</p><h2 id="benefit-title">Who May Benefit from Online Participation?</h2></header><ul>{beneficiaryGroups.map(item=><li key={item}><BusinessPageIcon name="check" /><span>{item}</span></li>)}</ul></section>
    <section className={`${styles.section} ${styles.trust}`} aria-labelledby="trust-title"><header><p>TRUST AND DOCUMENTATION</p><h2 id="trust-title">Guided, Verified and Documented</h2></header><ul>{trustItems.map(item=><li key={item}><BusinessPageIcon name="check" /><span>{item}</span></li>)}</ul></section>
    <section className={`${styles.section} ${styles.aiSection}`}><div><p>GUIDED ANSWERS</p><h2>Ask GenZ AI</h2><p>Ask about online participation, Virtual Shraddh, required details, scheduling and documentation.</p></div><HeroAssistantPanel standalone slide={{id:'pitru-moksha-online'}} /></section>
    <section className={styles.section} id="faqs"><header><p>FAQ</p><h2>Frequently Asked Questions</h2></header><div className={styles.faqs}>{faqs.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
    <section className={styles.inquiry} id="inquiry" aria-labelledby="inquiry-title"><div><p>GUIDED ASSISTANCE</p><h2 id="inquiry-title">Begin with Guided Assistance</h2><span>Share your family’s requirement and receive guidance on the appropriate Online or Offline service path.</span></div><div className={styles.inquiryActions}><Link href={inquiryHref}>Raise an Inquiry</Link><Link href={PITRU_MOKSHA_GAYA_OFFLINE_ROUTE}>Explore Offline Services</Link></div></section>
    <nav className={styles.related} aria-label="Related navigation"><strong>Related navigation</strong><div><Link href={PITRU_MOKSHA_GAYA_ROUTE}>PitruMoksha Gaya Overview</Link><Link href={PITRU_MOKSHA_GAYA_OFFLINE_ROUTE}>Offline Services</Link><Link href={VAHI_RECORDS_ROUTE}>Vahi Records</Link></div></nav>
  </BusinessPageFrame>;
}
