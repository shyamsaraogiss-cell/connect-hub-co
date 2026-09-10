import type { Metadata } from 'next';
import Link from 'next/link';
import { BusinessPageIcon } from '@/components/business-pages/BusinessPageIcon';
import { FuturePathPage } from '@/components/business-pages/FuturePathPage';
import { PITRU_MOKSHA_GAYA_ROUTE } from '@/features/hero/data/heroRoutes';
import styles from './page.module.css';

export const metadata: Metadata = { title: 'Offline PitruMoksha Gaya Services' };

const supportItems = [
  'Verified Priest coordination',
  'Local ritual planning and preparation',
  'Arrival and on-ground assistance',
  'Travel and accommodation coordination',
  'Guidance at the relevant ritual locations',
  'Available completion documentation',
] as const;
const steps = [
  ['Share Your Requirement', 'Tell us your family circumstances, preferred dates and assistance needs.'],
  ['Receive Guided Assistance', 'Review the appropriate in-person path and preparation requirements.'],
  ['Confirm Your Journey', 'Coordinate the Verified Priest, schedule, travel and local arrangements.'],
  ['Participate in Gaya', 'Attend the confirmed ritual with guided on-ground support.'],
  ['Receive Follow-Up', 'Receive agreed completion information and post-service coordination.'],
] as const;

export default function OfflinePage() {
  return <FuturePathPage eyebrow="OFFLINE ANCESTRAL SERVICES" title="In-Person PitruMoksha Gaya Services" description="The complete Offline service page is being prepared. Families may raise an inquiry now for Verified Priest coordination, ritual planning and local assistance in Gaya." breadcrumb={[{label:'Connect Hub Co.',href:'/'},{label:'PitruMoksha Gaya',href:PITRU_MOKSHA_GAYA_ROUTE},{label:'Offline'}]}>
    <section className={styles.overview} id="pitra-aatma-shanti" aria-labelledby="offline-journey-title">
      <div><p>THE IN-PERSON JOURNEY</p><h2 id="offline-journey-title">Guiding Families on the Path of Ancestral Peace and Moksha.</h2><p>PitruMoksha Gaya provides end-to-end ancestral ritual guidance and local coordination for families travelling to Gaya, delivered through Verified Priests with respectful assistance from preparation through completion.</p></div>
      <ul>{supportItems.map((item)=><li key={item}><BusinessPageIcon name="check" /><span>{item}</span></li>)}</ul>
    </section>
    <section className={styles.who} id="offline-services" aria-labelledby="offline-who-title">
      <div><p>WHO SHOULD CHOOSE OFFLINE</p><h2 id="offline-who-title">For Families Who Wish to Participate in Gaya</h2><p>The Offline path may suit families who prefer to be physically present, visit the relevant ritual locations and receive coordinated local assistance. Ritual suitability and preparation remain subject to family circumstances, tradition and Verified Priest guidance.</p></div>
    </section>
    <section className={styles.process} aria-labelledby="offline-process-title">
      <header><p>GUIDED COORDINATION</p><h2 id="offline-process-title">How the Offline Journey Works</h2></header>
      <ol>{steps.map(([title,description],index)=><li key={title}><span>{String(index+1).padStart(2,'0')}</span><h3>{title}</h3><p>{description}</p></li>)}</ol>
    </section>
    <section className={styles.cta} aria-labelledby="offline-inquiry-title"><div><p>BEGIN WITH GUIDANCE</p><h2 id="offline-inquiry-title">Plan Your In-Person Journey to Gaya</h2><span>Share your preferred dates, family requirement and travel-support needs for authorised review.</span></div><Link href="/contact?topic=pitru-moksha-gaya-offline">Raise an Offline Inquiry</Link></section>
  </FuturePathPage>;
}
