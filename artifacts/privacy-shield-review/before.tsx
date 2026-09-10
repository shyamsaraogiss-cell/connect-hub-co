'use client';

import Link from 'next/link';
import { BusinessPageFrame } from '../BusinessPageShell';
import { PITRU_MOKSHA_GAYA_OFFLINE_ROUTE, PITRU_MOKSHA_GAYA_ROUTE, VAHI_RECORDS_ROUTE } from '@/features/hero/data/heroRoutes';
import styles from './OnlineAncestralPage.module.css';

const inquiryHref = '/contact?topic=online-ancestral-services';
const privateHref = '/contact?topic=private-ritual';
// Page-specific, three-colour symbols; independent of the shared sidebar icons.
const desktopCircumstances = [
  { label: 'Adoptive Families', paths: ['M3 13q0 8 9 8t9-8', 'M8 7a4 4 0 1 0 8 0a4 4 0 1 0-8 0', 'M8 16l4 3 4-3'] },
  { label: 'Blended Families', paths: ['M3 5h7v7H3z', 'M14 12h7v7h-7z', 'M7 16h3q7 0 7-8V5'] },
  { label: 'Remarried Families', paths: ['M9 7a6 6 0 1 0 0 10', 'M15 7a6 6 0 1 1 0 10', 'M8 12h8m-3-3 3 3-3 3'] },
  { label: 'Biological Relationships', paths: ['M6 3c12 5 0 13 12 18', 'M18 3C6 8 18 16 6 21', 'M9 6h6M9 12h6M9 18h6'] },
  { label: 'Divorced Family', paths: ['M8 4H3v16h5', 'M16 4h5v16h-5', 'M13 4l-3 6 4 4-3 6'] },
  { label: 'Ex-Marriage Relations', paths: ['M8 8a5 5 0 1 0 0 10', 'M16 6a5 5 0 1 1 0 10', 'M8 4h7m-3-2 3 2-3 2'] },
  { label: 'Live-in Relations', paths: ['M3 11l5-6 4 4', 'M12 9l4-4 5 6', 'M5 13v7h14v-7M10 20v-5h4v5'] },
  { label: 'Break-up Relationships', paths: ['M10 5C3 0 0 10 9 17', 'M15 5c7-5 10 5 1 12', 'M13 3l-3 7 5 3-3 8'] },
  { label: 'Others', paths: ['M4 5h5v5H4z', 'M15 14h5v5h-5z', 'M16 4v6m-3-3h6M4 17h6'] },
  { label: 'Customized', paths: ['M3 6h18M3 18h18', 'M7 3v6M17 15v6', 'M3 12h18M13 9v6'] },
];
function CircumstanceIcon({ index }: { index: number }) {
  const colors = ['#70e8ff', '#edc578', '#f078dc'];
  return <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{desktopCircumstances[index].paths.map((path, part) => <path key={path} d={path} stroke={colors[(part + index) % colors.length]} />)}</svg>;
}
function NetworkIcon({ kind }: { kind: 'globe' | 'travel' | 'family' | 'lock' | 'guidance' | 'information' | 'flame' | 'mobility' | 'clock' }) {
  const paths = {
    globe: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M2 12h20M12 2c-5 5-5 15 0 20 5-5 5-15 0-20',
    travel: 'M3 17h18M6 17V8l6-5 6 5v9M10 17v-5h4v5M3 21h18',
    family: 'M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6M16 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6M2 20v-3a5 5 0 0 1 10 0v3M12 17a5 5 0 0 1 10 0v3M6 15l6 5 6-5',
    lock: 'M7 10V7a5 5 0 0 1 10 0v3M5 10h14v11H5zM12 14v3',
    guidance: 'M4 4h16v12H9l-5 4zM8 8h8M8 12h5',
    information: 'M6 2h9l4 4v16H6zM14 2v5h5M9 11h7M9 15h7M9 19h4',
    flame: 'M12 2c2 5 7 7 7 12a7 7 0 0 1-14 0c0-3 2-6 4-8 0 4 1 5 2 5 2-2 2-5 1-9M3 22h18',
    mobility: 'M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4M11 9v5h6l3 6 2-1M11 10H7M8 12a5 5 0 1 0 7 6',
    clock: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M12 6v6l4 2M3 3l3 1M21 3l-3 1',
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind]} /></svg>;
}
function AccessGlobe() { return <NetworkIcon kind="globe" />; }
function AccessTravel() { return <NetworkIcon kind="travel" />; }
function FamilyConnection() { return <NetworkIcon kind="family" />; }
function PrivateLock() { return <NetworkIcon kind="lock" />; }
function PrivateGuidance() { return <NetworkIcon kind="guidance" />; }
function RitualInformation() { return <NetworkIcon kind="information" />; }
function SacredFlame() { return <NetworkIcon kind="flame" />; }
function MobilityAccess() { return <NetworkIcon kind="mobility" />; }
function TimeCoordination() { return <NetworkIcon kind="clock" />; }

const remoteSituations = [
  { label: 'NRI & International Families', Icon: AccessGlobe },
  { label: 'Unable to Travel', Icon: AccessTravel },
  { label: 'Elderly Participants', Icon: FamilyConnection },
  { label: 'Mobility Requirements', Icon: MobilityAccess },
  { label: 'Families in Different Cities or Countries', Icon: AccessGlobe },
  { label: 'Hybrid Family Participation', Icon: FamilyConnection },
  { label: 'Time-Zone Coordinated Participation', Icon: TimeCoordination },
];
const privateSituations = [
  { label: 'Adoptive & Biological Relationships', Icon: FamilyConnection },
  { label: 'Blended & Remarried Families', Icon: FamilyConnection },
  { label: 'Separated or Divorced Families', Icon: PrivateLock },
  { label: 'Past Relationships & Break-ups', Icon: SacredFlame },
  { label: 'Relationships Outside Marriage', Icon: PrivateLock },
  { label: 'Estranged Family Relationships', Icon: RitualInformation },
  { label: 'A Person Whose Family You Cannot Approach', Icon: PrivateGuidance },
  { label: 'Someone You Loved, Cared For or Feel a Sacred Duty Toward', Icon: SacredFlame },
  { label: 'Other Sensitive Family or Personal Circumstances', Icon: PrivateLock },
];
const privacyStages = [
  { title: 'Your Circumstance', note: 'Begin with a private request.', Icon: FamilyConnection },
  { title: 'Confidential Pre-Guidance', note: 'A private conversation about your sacred intention.', Icon: PrivateGuidance },
  { title: 'Mutual Confidentiality & Consent', note: 'Establish what may proceed, with your consent.', Icon: PrivateLock },
  { title: 'Only Ritual-Required Information Proceeds', note: 'Ritual-required information is identified for Sankalp / prescribed Vidhi.', Icon: RitualInformation },
  { title: 'Guided Ritual Path', note: 'A prescribed way to fulfil your sacred duty.', Icon: SacredFlame },
];
const rituals = ['Pind Daan, Shraddha & Tarpan', 'Pitra Aatma Shanti', 'Narayan Bali', 'Nag Bali', 'Tripindi Shraddha', 'Shared Sankalp', 'Complete Gaya Shraddha', 'Customized Pitru Rituals'];
const circumstances = ['Annual / Tithi Rite', 'Missed Ancestral Rites', 'Special Ancestral Circumstances', 'General Ancestral Prayer', 'Complete Gaya Ji Rite', 'Sensitive / Private Circumstance', 'Not Sure'];
const preparation = [
  { title: 'Tell Us', items: ['Person remembered', 'Relationship', 'Available ancestral details', 'Gotra where known', 'Tithi/date where applicable', 'Relevant ritual circumstances'] },
  { title: 'Establish', items: ['Ritual', 'Karta / Participant', 'Participation mode', 'Sankalp', 'Ritual Proxy where required', 'Applicable Vedis'] },
  { title: 'Prepare', items: ['Sankalp preparation', 'Tarpan preparation', 'Required items', 'Family participants', 'Joining instructions'] },
  { title: 'Join', items: ['Confirmed date', 'Gaya Ji time', 'Your local time', 'Required live participation stages'] },
];
const homeOffering = [
  { title: 'Prepare', text: 'Your family prepares the specified items, which may include a coin, raw rice and designated offerings.' },
  { title: 'Touch', text: 'Personally touch or handle the items, creating a connection with your sacred intention.' },
  { title: 'Send', text: 'After booking confirmation, send them to the shared receiving address supplied for your service.' },
];
const gayaOffering = [
  { title: 'Receive', text: 'Your items are received for your confirmed Service Request.' },
  { title: 'Incorporate', text: 'Applicable items are incorporated into the prescribed ritual in Gaya Ji.' },
  { title: 'Offer', text: 'The applicable offerings are made where prescribed in your confirmed ritual.' },
];
const journey = [
  { title: 'Raise Request', text: 'Begin with your sacred intention and preferred participation mode.' },
  { title: 'Ritual Guidance', text: 'Establish the prescribed rite and participation requirements.' },
  { title: 'Quotation', text: 'Accept / Request Change / Reject' },
  { title: 'Client Service Agreement', text: 'Review / Accept' },
  { title: 'External Payment', text: 'Payment takes place completely outside this website.' },
  { title: 'Payment Confirmation', text: 'Founder/Admin records internal Payment Confirmation.' },
  { title: 'Booking Confirmed', text: 'Your ritual is confirmed. Any hand-touched items may now be sent as instructed.' },
  { title: 'Virtual Ritual', text: 'Virtual Sankalp → Traditional Tarpan → Live Participation → Physical Rites in Gaya Ji' },
  { title: 'Completion', text: 'Your ritual concludes under the same Service Request ID.' },
];

function SectionHeading({ number, title, id, subtitle }: { number: string; title: string; id: string; subtitle?: string }) {
  return <header className={styles.sectionHeading}><span className={styles.sectionNumber}>{number}</span><div><h2 id={id}>{title}</h2>{subtitle ? <p>{subtitle}</p> : null}</div></header>;
}

function Markers({ items }: { items: readonly string[] }) {
  return <ul className={styles.markers}>{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

function NeonOrbits() {
  return <div className={styles.neonOrbits} aria-hidden="true"><span className={styles.neonHalo} /><span className={styles.neonPulse} /><span className={styles.neonOrbit} /><span className={styles.neonCounterOrbit} /></div>;
}

export function OnlineAncestralPage() {
  return (
    <BusinessPageFrame breadcrumb={[{ label: 'Connect Hub Co.', href: '/' }, { label: 'PitruMoksha Gaya', href: PITRU_MOKSHA_GAYA_ROUTE }, { label: 'Online' }]} className={styles.onlinePage} showBreadcrumb={false} showSidebar={false}>
      <section className={`${styles.hero} ${styles.introStrip}`} aria-labelledby="online-page-title">
        <h1 id="online-page-title">Distance Never Stops Devotion.</h1>
      </section>

      <div className={styles.neonJourney}>
        <header className={styles.sharedPrivacyHeading}>
          <h2>Your personal story remains private.</h2>
          <p>Someone You Loved, Cared For You, or You Feel a Sacred Duty Towards</p>
        </header>
        <div className={styles.neonStars} aria-hidden="true">{Array.from({ length: 8 }, (_, index) => <span key={index} />)}</div>
        <section className={styles.neonRecognition} id="online-services" aria-labelledby="intention-title">
          <header className={`${styles.neonHeading} ${styles.mobilePrivacyPresentation}`}><h2 id="intention-title">For Whom?</h2></header>
          <div className={styles.remoteNetwork}>
            <div className={styles.neonRays} aria-hidden="true">{remoteSituations.map(({ label }) => <span className={styles.neonRay} key={label} />)}<span className={styles.privateRay} /></div>
            <div className={styles.remoteFocus}>
              <NeonOrbits />
              <div className={styles.neonCore} aria-hidden="true">
                <span className={styles.hubAura} />
                <span className={styles.hubParticles} />
              </div>
            </div>
            <ul className={styles.remoteNodes}>{remoteSituations.map(({ label, Icon }) => <li className={styles.recognitionNode} key={label}><span className={styles.nodeIcon} aria-hidden="true"><Icon /></span><span>{label}</span></li>)}</ul>
          </div>
          <Link className={styles.privateGateway} href="#private-ritual" aria-label="Explore Private Sacred Duty rituals">
            <span className={styles.gatewayIcon} aria-hidden="true"><PrivateLock /></span>
            <strong>Private / Sensitive<br />Circumstances</strong>
            <span className={styles.sectionEnergyLink} aria-hidden="true"><span /></span>
          </Link>
        </section>

        <section className={styles.neonPrivate} id="private-ritual" aria-labelledby="connection-title">
          <span className={styles.neonCompatibilityAnchor} id="live-connection" aria-hidden="true" />
          <ul className={styles.desktopCircumstances} aria-label="Private service circumstances">{desktopCircumstances.map(({ label }, index) => <li key={label}><span className={styles.circumstanceSymbol}><CircumstanceIcon index={index} /></span><span>{label}</span></li>)}</ul>
          <div className={styles.mobilePrivacyPresentation}>
          <header className={`${styles.neonHeading} ${styles.privateHeading}`}><h2 id="connection-title">Private Sacred Duty</h2></header>
          <div className={styles.protectedNetwork}>
            <ul className={styles.circumstanceNetwork}>{privateSituations.map(({ label, Icon }) => <li key={label}><span className={styles.nodeIcon} aria-hidden="true"><Icon /></span><span>{label}</span></li>)}</ul>
            <ol className={styles.protectedPath} aria-label="Protected ritual pathway">{privacyStages.map(({ title, Icon }) => <li key={title}><span className={styles.privacyStageIcon} aria-hidden="true"><Icon /></span><h3>{title}</h3></li>)}</ol>
          </div>
          <div className={styles.neonTrust}><span className={styles.trustLight} aria-hidden="true"><PrivateLock /></span><h3>Your personal story remains private.</h3><p>Only the information required to fulfil your sacred intention <br />is used for the ritual.</p></div>
          <div className={styles.privateEntry}><Link className={styles.neonCta} href={privateHref}>Begin Privately <span aria-hidden="true">&rarr;</span></Link></div>
          </div>
        </section>
        <div className={styles.privacyBridge}>
          <h3>PRIVACY</h3>
          <p>Confidential Services</p>
          <p>Only share required intention.</p>
          <Link className={styles.neonCta} href={privateHref}>BEGIN PRIVATELY <span aria-hidden="true">&rarr;</span></Link>
          <div className={styles.privacyActions}><Link href="/services">Book Now</Link><Link href={inquiryHref}>Raise Inquiry</Link></div>
        </div>
      </div>

      <section className={`${styles.section} ${styles.choiceSection}`} aria-labelledby="choice-title">
        <SectionHeading number="03" title="Choose the Rite for Your Sacred Intention" id="choice-title" />
        <div className={styles.choicePanels}>
          <div><h3>I Know My Ritual</h3><Link className={styles.textAction} href="#ritual-catalogue">Explore Rituals <span aria-hidden="true">→</span></Link></div>
          <div><h3>Guide Me</h3><Link className={styles.textAction} href={inquiryHref}>Get Ritual Guidance <span aria-hidden="true">→</span></Link><p>Private situation? <Link href={privateHref}>Private Ritual</Link></p></div>
        </div>
        <div className={styles.catalogue} id="ritual-catalogue"><h3>Rituals for Your Sacred Intention</h3><ul>{rituals.map(ritual => <li key={ritual}>{ritual}</li>)}</ul></div>
        <div className={styles.circumstances}><p>Not sure where to begin? Share what brings you here.</p><Markers items={circumstances} /></div>
      </section>

      <section className={`${styles.section} ${styles.preparation}`} aria-labelledby="preparation-title">
        <SectionHeading number="04" title="Before We Begin" subtitle="Pre-Ritual Guidance & Preparation" id="preparation-title" />
        <ol className={styles.preparationFlow}>{preparation.map((step, index) => <li key={step.title}><span className={styles.stepLabel}>0{index + 1}</span><h3>{step.title}</h3><ul>{step.items.map(item => <li key={item}>{item}</li>)}</ul></li>)}</ol>
        <Markers items={['Time-Zone Coordination', 'Elderly Participation', 'Mobility Needs', 'Multiple Locations', 'Language Assistance', 'Private Participation']} />
        <p className={styles.smallNote}>For Private Ritual, only ritual-required information proceeds after the confidentiality and consent stage.</p>
      </section>

      <section className={`${styles.section} ${styles.handConnection}`} aria-labelledby="hand-title">
        <SectionHeading number="05" title="A Hand-Touched Sacred Connection" subtitle="From Your Hands to Your Offering in Gaya Ji" id="hand-title" />
        <div className={styles.offeringJourney}>
          <div><p className={styles.worldLabel}>YOUR HOME</p><ol className={styles.offeringSteps}>{homeOffering.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></div>
          <div className={styles.offeringBridge}><span aria-hidden="true">→</span><strong>From Your Hands <br />to Gaya Ji</strong><span aria-hidden="true">→</span></div>
          <div><p className={styles.worldLabel}>GAYA JI</p><ol className={styles.offeringSteps} start={4}>{gayaOffering.map((step, index) => <li key={step.title}><span>0{index + 4}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol></div>
        </div>
        <p className={styles.bookingNote}>Send only after booking confirmation, using the receiving address and preparation instructions supplied for your service.</p>
        <Markers items={['Personally Touched', 'Service Request Linked', 'Received for Your Ritual', 'Incorporated Where Prescribed', 'Confidentiality-First Handling']} />
      </section>

      <section className={`${styles.section} ${styles.liveSection}`} aria-labelledby="live-title">
        <SectionHeading number="06" title="Join the Ritual Live" subtitle="Virtual Sankalp · Traditional Tarpan · Guided Family Participation" id="live-title" />
        <ol className={styles.liveProgress}>{['Join', 'Sankalp', 'Tarpan', 'Gaya Rites', 'Required Family Participation', 'Completion'].map(stage => <li key={stage}>{stage}</li>)}</ol>
        <div className={styles.liveDetails}><p><strong>Virtual Sankalp</strong>Mandatory prescribed family ritual connection.</p><p><strong>Traditional Virtual Tarpan</strong>Your family performs the applicable Tarpan remotely under guidance.</p><p><strong>Gaya Ji</strong>Eligible Ritual Proxy + Gayawal Panda/Priest perform the physical rites requiring presence.</p></div>
        <p className={styles.participateLine}>More Than Watching. You Participate.</p><p className={styles.smallNote}>Your family does not need to remain continuously on video when the selected ritual does not require it.</p>
      </section>

      <section className={`${styles.section} ${styles.assurance}`} aria-labelledby="assurance-title">
        <SectionHeading number="07" title="Live. Private. Connected." id="assurance-title" />
        <Markers items={['Live Participation', 'Time-Zone Coordinated', 'Multi-Location Family Participation', 'Private Participation', 'Strict Confidentiality', 'Documented Completion']} />
        <p className={styles.smallNote}>Hybrid Participation Available Where Applicable</p>
      </section>

      <section className={`${styles.section} ${styles.sacredRoute}`} aria-labelledby="gaya-title">
        <SectionHeading number="08" title="Your Ritual in Gaya Ji" id="gaya-title" />
        <ol className={styles.routeStrip}>{['Falgu', 'Vishnupad', 'Akshay Vat', 'Visarjan'].map(place => <li key={place}>{place}</li>)}</ol>
        <p className={styles.additionalVedis}>+ Applicable Additional Vedis Where Prescribed</p>
        <p>Your confirmed ritual follows its prescribed Vidhi and applicable sacred Vedis in Gaya Ji.</p>
        <Link className={styles.textAction} href={PITRU_MOKSHA_GAYA_ROUTE}>Explore the Sacred Journey <span aria-hidden="true">→</span></Link>
      </section>

      <section className={`${styles.section} ${styles.journeySection}`} id="inquiry" aria-labelledby="journey-title">
        <SectionHeading number="09" title="One Service Request. One Continuous Journey." id="journey-title" />
        <div className={styles.masterReference}><span>YOUR MASTER REFERENCE</span><strong>The Same Service Request ID</strong><p>From your first request through ritual completion, the same Service Request ID remains your customer-facing master reference.</p></div>
        <div className={styles.commercialJourney}>
          <aside className={styles.privateBranch} aria-labelledby="private-branch-title"><p className={styles.eyebrow}>A DISCREET BEGINNING</p><h3 id="private-branch-title">Private Ritual</h3><ol><li>Private Request</li><li>Confidential Pre-Guidance</li><li>Mutual Confidentiality &amp; Consent</li></ol><p className={styles.branchJoin}>Then join the same standard commercial journey <span aria-hidden="true">→</span></p><p>One Service Request ID continues with you.</p><Link className={styles.primaryAction} href={privateHref}>Begin Privately</Link></aside>
          <ol className={styles.serviceTimeline}>{journey.map((step, index) => <li key={step.title} className={index === 6 ? styles.confirmedStep : undefined}><span className={styles.timelineNumber}>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div></li>)}</ol>
        </div>
        <div className={styles.completion}><h3>Completion &amp; Follow-Up</h3><Markers items={['Ritual Completion Certificate', 'Private Documentation', 'Photos/Video where included/permitted', 'Prasad / applicable sacred materials', 'Dispatch/Tracking where applicable', 'Follow-Up']} /></div>
        <div className={styles.journeyActions}><div><h3>Begin Your Sacred Intention</h3><p>Start with guidance for your family or a private conversation.</p></div><div className={styles.actions}><Link className={styles.primaryAction} href={inquiryHref}>Raise Request</Link><Link className={styles.outlineAction} href={privateHref}>Private Ritual</Link></div></div>
      </section>

      <nav className={styles.related} aria-label="Related navigation"><Link href={PITRU_MOKSHA_GAYA_ROUTE}>PitruMoksha Gaya Overview</Link><Link href={PITRU_MOKSHA_GAYA_OFFLINE_ROUTE}>Offline Services</Link><Link href={VAHI_RECORDS_ROUTE}>Vahi Records</Link></nav>
    </BusinessPageFrame>
  );
}
