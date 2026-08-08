import Link from 'next/link';
import { BusinessPageIcon, type BusinessPageIconName } from '../BusinessPageIcon';
import { BusinessStep } from '../BusinessPageShell';
import { PITRU_MOKSHA_GAYA_ROUTE, VAHI_RECORDS_ROUTE } from '@/features/hero/data/heroRoutes';
import styles from './TravelAssistancePage.module.css';

const inquiryHref = '/contact?topic=travel-assistance';

export type CoreTravelService = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: BusinessPageIconName;
  badge?: string;
};

const travelServices: readonly CoreTravelService[] = [
  {
    id: 'shadow-assistance',
    title: '1. Shadow Assistance',
    subtitle: 'Your Shadow Traveler',
    description: 'Discreet, continuous background or side-by-side companion support—always with you, always for you throughout your journey.',
    icon: 'family',
    badge: 'Signature',
  },
  {
    id: 'emergency-support',
    title: '2. Emergency Family & Personal Support',
    subtitle: 'Immediate Priority Assistance',
    description: 'Round-the-clock safety monitoring, emergency family coordination, medical standby, and priority traveler support.',
    icon: 'check',
    badge: '24×7 Emergency',
  },
  {
    id: 'on-trip-support',
    title: '3. 24×7 On-Trip Support',
    subtitle: 'Live Round-the-Clock Help',
    description: 'Immediate live communication and helpline assistance for schedule changes, unexpected delays, or special on-trip requests.',
    icon: 'followup',
    badge: '24×7 Active',
  },
  {
    id: 'safari-assistance',
    title: '4. Safari Assistance',
    subtitle: 'Outdoor & Wildlife Excursions',
    description: 'Specialized coordination for wildlife safaris, sanctuary permits, local guides, and regional transport in eco-destination hubs.',
    icon: 'guide',
  },
  {
    id: 'beach-assistance',
    title: '5. Beach Assistance',
    subtitle: 'Coastal Destination Support',
    description: 'Assistance for coastal and beach destinations, covering local transfers, stay arrangements, and coastal activity guidance.',
    icon: 'online',
  },
  {
    id: 'local-ground',
    title: '6. Local Ground Assistance',
    subtitle: 'Station, Airport & City Transfers',
    description: 'Pre-arranged pickup from airports/railway stations, verified local vehicles, and ground escort for peace of mind.',
    icon: 'timezone',
  },
  {
    id: 'customized-planning',
    title: '7. Customized Travel Planning',
    subtitle: 'Tailored Itinerary Execution',
    description: 'Personalized travel planning for domestic families, NRIs, and international visitors across pilgrimage and cultural hubs.',
    icon: 'details',
  },
  {
    id: 'nepal-jungle-ride',
    title: '8. Nepal Jungle Ride & Stay',
    subtitle: 'Nepal Eco & Wildlife Excursions',
    description: 'Exclusive assistance for Chitwan and Nepal eco-tourism, safari bookings, jungle lodge stays, and cross-border transport.',
    icon: 'guide',
    badge: 'Nepal Hub',
  },
  {
    id: 'customized-others',
    title: '9. Customized & Others',
    subtitle: 'Bespoke Travel Assistance',
    description: 'Custom travel requests, special mobility assistance for seniors/children, and tailored travel support for unique itineraries.',
    icon: 'offline',
  },
];

const travelLocations: readonly { name: string; isHighlight?: boolean }[] = [
  { name: 'Gaya Ji' },
  { name: 'Kashi / Varanasi' },
  { name: 'Ayodhya' },
  { name: 'Mathura' },
  { name: 'Vrindavan' },
  { name: 'Delhi NCR' },
  { name: 'Lucknow' },
  { name: 'Gorakhpur' },
  { name: 'Pune' },
  { name: 'Hyderabad' },
  { name: 'Nashik' },
  { name: 'Bengaluru' },
  { name: 'Mumbai' },
  { name: 'Patna' },
  { name: 'Nepal', isHighlight: true },
];

const partnerTrustItems = [
  'Background Screened & Identity Verified Travel Partners',
  'Service Certified & Experience Verified Local Guides',
  '24×7 Complete Journey Management & On-Trip Monitoring',
  'Pre-Arranged Transparent Pricing without Hidden Demands',
  'Dedicated Support for NRIs, Senior Citizens & Families',
  'Seamless Integration with Ritual Services & Pilgrimage Stays',
] as const;

const steps: readonly BusinessStep[] = [
  {
    title: '01. Share Your Travel Plan',
    description: 'Tell us your arrival city, dates, traveler count, mode of arrival, and specific stay or local assistance needs.',
  },
  {
    title: '02. Receive Custom Travel Scope',
    description: 'Our travel team reviews your route, verifies partner availability, and prepares a transparent service plan.',
  },
  {
    title: '03. On-Trip Shadow Assistance',
    description: 'Enjoy dedicated airport/station pickup, local ground transfers, hotel stay coordination, and Shadow Assist.',
  },
  {
    title: '04. Safe Departure & Support',
    description: 'Receive 24×7 live support throughout your stay until your safe departure and journey completion.',
  },
];

const faqs = [
  {
    question: 'What is the Shadow Traveler concept?',
    answer: 'Our Shadow Traveler approach means we act as your local ground companion—always with you, always for you. We manage pickups, stays, local navigation, and unexpected needs while you focus on your journey.',
  },
  {
    question: 'Can you arrange airport or railway station pickups?',
    answer: 'Yes! Airport and railway station pickups can be coordinated after you share your arrival details, passenger count, destination, and timing.',
  },
  {
    question: 'Is travel assistance available for NRIs and international visitors?',
    answer: 'Yes. We provide complete travel assistance for NRIs and international families visiting India and Nepal, including airport connection, multi-lingual coordination, and stay management.',
  },
  {
    question: 'How are Travel Assistance Partners verified?',
    answer: 'All partners undergo mandatory background screening, identity verification, experience checks, and service certification before joining our network.',
  },
  {
    question: 'Can travel assistance be combined with PitruMoksha or Ritual Services?',
    answer: 'Yes. Travel assistance can be seamlessly combined with your ancestral rites or puja ceremonies so that local transport, stay, and priest coordination are unified.',
  },
  {
    question: 'What happens if my travel dates or arrival times change during the trip?',
    answer: 'Our 24×7 On-Trip Support team handles live itinerary adjustments, flight/train delay tracking, and rescheduled local pickups.',
  },
] as const;

export function TravelAssistanceContent() {
  return (
    <div className={`${styles.travelContent} business-inner-page`}>
      {/* SECTION 1 */}
      <section className={styles.section} aria-labelledby="travel-confidence-title">
        <header>
          <p>DEDICATED JOURNEY MANAGEMENT</p>
          <h2 id="travel-confidence-title">Travel with Confidence. Return with Peace of Mind.</h2>
          <span>
            Connect Hub Co. is not a traditional travel agency or tour operator selling packaged itineraries. At Connect Hub Co., we believe every traveler deserves more than just transportation and accommodation—they deserve confidence, reliable guidance, and a trusted helping hand throughout their journey. Through our verified network of partners and dedicated local coordinators, we help travelers navigate unfamiliar destinations across India and Nepal with ease, without compromising their independence.
          </span>
        </header>
      </section>

      {/* SECTION 2 */}
      <section className={`${styles.section} ${styles.locationSection}`} aria-labelledby="travel-framework-title">
        <header>
          <p>SERVICE BOUNDARIES & STANDARDS</p>
          <h2 id="travel-framework-title">Critical Engagement Framework & Boundaries</h2>
          <span>
            Connect Hub Co. operates under strict operational boundaries, transparent service terms, and verified background screening.
          </span>
        </header>
        <ul className={styles.frameworkList}>
          <li>
            <BusinessPageIcon name="check" />
            <div>
              <strong>Customer-Defined Boundaries:</strong>
              <p>The customer establishes and explicitly defines the limitations, scope, and authorized boundaries of the assistant&apos;s role before the service plan is finalized.</p>
            </div>
          </li>
          <li>
            <BusinessPageIcon name="check" />
            <div>
              <strong>Logistics & Arrangements:</strong>
              <p>The customer is responsible for arranging, booking, and providing all meals, accommodation, and travel tickets for the assigned assistant throughout the trip.</p>
            </div>
          </li>
          <li>
            <BusinessPageIcon name="check" />
            <div>
              <strong>Employment Status:</strong>
              <p>Connect Hub Co. operates as an independent service provider. The assigned assistant is not an employee of the customer.</p>
            </div>
          </li>
        </ul>
      </section>

      {/* SECTION 3 */}
      <section className={styles.section} aria-labelledby="why-choose-title">
        <header>
          <p>DEDICATED SUPPORT</p>
          <h2 id="why-choose-title">Why Choose Connect Hub Co.?</h2>
          <span>
            Modern travel is highly accessible, yet unforeseen challenges such as missed connections, unfamiliar local regulations, language barriers, and sudden medical emergencies can disrupt a well-planned journey. Connect Hub Co. bridges this gap. Customers continue to book their preferred airlines, hotels, and tour operators, while our trained coordinators provide background management and ground assistance. Whether the customer is a newly married couple, senior citizen, NRI family visiting India, family traveler, or solo traveler, the framework ensures physical support is available when required. We act as Your Shadow Traveler—always nearby when needed and never intrusive when not required.
          </span>
        </header>
        <div className={styles.importantNote}>
          <strong>Important Note:</strong>
          <p>
            Connect Hub Co. is not a traditional travel agency or tour operator selling packaged itineraries. We provide 24×7 journey management, Shadow Traveler assistance, local ground coordination, and emergency traveler support across major destinations in India and Nepal.
          </p>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className={`${styles.section} ${styles.locationSection}`} aria-labelledby="specialized-services-title">
        <header>
          <p>TAILORED TRAVEL ASSISTANCE</p>
          <h2 id="specialized-services-title">Our Specialized Services</h2>
          <span>
            Explore our specialized travel assistance services designed for high-touch, privacy-first, and emergency journey support.
          </span>
        </header>
        <div className={styles.specializedGrid}>
          <article className={styles.specializedCard} id="shadow-assistance">
            <BusinessPageIcon name="family" />
            <h3>1. Shadow Assistance</h3>
            <p>
              Designed for travelers who value independence but also want reliable local backup. We coordinate logistics, remain ready to respond, respect customer privacy, and help keep family members reassured.
            </p>
          </article>
          <article className={styles.specializedCard}>
            <BusinessPageIcon name="check" />
            <h3>2. Emergency Family & Personal Support</h3>
            <p>
              Provides compassionate on-site crisis coordination when a traveler or family member faces hospitalization or a medical emergency away from home. Representatives may assist with hospital formalities, medical-administration coordination, essential purchases, attendant logistics, family communication, and transparent status updates.
            </p>
          </article>
          <article className={styles.specializedCard}>
            <BusinessPageIcon name="followup" />
            <h3>3. 24×7 On-Trip Support</h3>
            <p>
              Provides an active round-the-clock helpline and rapid-response mechanism for updates, urgent guidance, coordination, and emergency support throughout India and Nepal.
            </p>
          </article>
          <article className={styles.specializedCard}>
            <BusinessPageIcon name="guide" />
            <h3>4. Safari & Wildlife Assistance</h3>
            <p>
              Supports wildlife journeys through permit coordination, local transport assistance, verified partner coordination, and ground-level execution.
            </p>
          </article>
          <article className={styles.specializedCard}>
            <BusinessPageIcon name="online" />
            <h3>5. Coastal & Beach Journey Assistance</h3>
            <p>
              Provides localized coordination, destination guidance, and safety-focused activity planning for coastal and beach journeys.
            </p>
          </article>
          <article className={styles.specializedCard}>
            <BusinessPageIcon name="details" />
            <h3>6. Customized Theme-Based Travel Planning</h3>
            <p>
              Offers tailored journey planning and execution for specific travel themes, pilgrimage circuits, and cultural itineraries across India &amp; Nepal. Support may be customized for:
            </p>
            <ul style={{ marginTop: '8px', paddingLeft: '18px', fontSize: '0.86rem', color: '#4a5568', lineHeight: '1.5' }}>
              <li>Religious and spiritual journeys</li>
              <li>Heritage and cultural circuits</li>
              <li>Adventure travel</li>
              <li>Senior-citizen journeys</li>
              <li>Family holidays</li>
              <li>Educational or research visits</li>
            </ul>
          </article>
          <article className={styles.specializedCard}>
            <BusinessPageIcon name="guide" />
            <h3>7. Nepal Jungle Ride &amp; Stay Coordination</h3>
            <p>
              Provides specialized regional coordination for jungle rides, wilderness stays, and safari experiences across Nepal through verified partners.
            </p>
          </article>
          <article className={styles.specializedCard}>
            <BusinessPageIcon name="offline" />
            <h3>8. Bespoke Custom Solutions</h3>
            <p>
              Travel requirements outside the standard offerings are reviewed and custom-coordinated with authorized team approval.
            </p>
          </article>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className={styles.section} aria-labelledby="core-commitments-title">
        <header>
          <p>OUR CORE VALUES</p>
          <h2 id="core-commitments-title">Our Core Commitments</h2>
          <span>
            At Connect Hub Co., every journey is backed by structured coordination, strict standards, and transparent accountability.
          </span>
        </header>
        <ul className={styles.frameworkList}>
          <li>
            <BusinessPageIcon name="check" />
            <div>
              <strong>Care &amp; Responsibility</strong>
              <p>Coordinate every journey with care, accountability, and responsibility.</p>
            </div>
          </li>
          <li>
            <BusinessPageIcon name="check" />
            <div>
              <strong>Verified Network</strong>
              <p>Connect travelers with verified local partners and coordinators.</p>
            </div>
          </li>
          <li>
            <BusinessPageIcon name="check" />
            <div>
              <strong>24×7 Responsiveness</strong>
              <p>Respond during planned operations and unexpected situations.</p>
            </div>
          </li>
          <li>
            <BusinessPageIcon name="check" />
            <div>
              <strong>Privacy &amp; Boundaries</strong>
              <p>Respect customer privacy and authorized service boundaries.</p>
            </div>
          </li>
          <li>
            <BusinessPageIcon name="check" />
            <div>
              <strong>Honesty &amp; Professionalism</strong>
              <p>Provide clear, practical assistance with honesty and professionalism.</p>
            </div>
          </li>
        </ul>
      </section>

      {/* 9 Core Services Grid */}
      <section className={styles.section} id="core-services" aria-labelledby="travel-services-title">
        <header>
          <p>9 APPROVED TRAVEL ASSISTANCE SERVICES</p>
          <h2 id="travel-services-title">24×7 Complete Journey Management</h2>
          <span>
            Explore our 9 verified travel assistance services designed to make your journey safe, comfortable, and completely hassle-free across India & Nepal.
          </span>
        </header>
        <div className={styles.servicesGrid}>
          {travelServices.map((service) => (
            <article key={service.id}>
              <span>
                <BusinessPageIcon name={service.icon} />
              </span>
              <h3>{service.title}</h3>
              <strong style={{ color: '#b47800', fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>
                {service.subtitle}
              </strong>
              <p>{service.description}</p>
              {service.badge ? <span className={styles.badge}>{service.badge}</span> : null}
            </article>
          ))}
        </div>
      </section>

      {/* Service Locations Coverage Grid */}
      <section className={`${styles.section} ${styles.locationSection}`} aria-labelledby="travel-locations-title">
        <header>
          <p>SERVICE COVERAGE ACROSS INDIA & NEPAL</p>
          <h2 id="travel-locations-title">Available Across 15+ Destinations</h2>
          <span>
            Our travel assistance network supports domestic travelers, NRIs, and international visitors across major pilgrimage destinations and urban hubs.
          </span>
        </header>
        <div className={styles.locationGrid}>
          {travelLocations.map((loc) => (
            <span
              key={loc.name}
              className={`${styles.locationChip} ${loc.isHighlight ? styles.locationChipHighlight : ''}`}
            >
              <BusinessPageIcon name="offline" />
              <span>{loc.name}</span>
              {loc.isHighlight ? <span style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>(International Hub)</span> : null}
            </span>
          ))}
        </div>
      </section>

      {/* Background Screened & Certified Partners */}
      <section className={`${styles.section} ${styles.trust}`} aria-labelledby="travel-trust-title">
        <header>
          <p>PARTNER VERIFICATION STANDARDS</p>
          <h2 id="travel-trust-title">Background Screened & Certified Partners</h2>
          <span>
            Every travel partner is thoroughly vetted to ensure total safety, reliability, and dedicated care.
          </span>
        </header>
        <ul>
          {partnerTrustItems.map((item) => (
            <li key={item}>
              <BusinessPageIcon name="check" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4-Step Travel Process */}
      <section className={styles.section} aria-labelledby="travel-process-title">
        <header>
          <p>TRANSPARENT PROCESS</p>
          <h2 id="travel-process-title">How Travel Assistance Works</h2>
        </header>
        <ol className={styles.steps}>
          {steps.map((step) => (
            <li key={step.title}>
              <span>{step.title.slice(0, 2)}</span>
              <h3>{step.title.slice(4)}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ Accordions */}
      <section className={styles.section} id="faqs" aria-labelledby="travel-faq-title">
        <header>
          <p>FAQ</p>
          <h2 id="travel-faq-title">Frequently Asked Questions</h2>
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
      <section className={styles.inquiry} id="inquiry" aria-labelledby="travel-inquiry-title">
        <div>
          <p>GUIDED ASSISTANCE</p>
          <h2 id="travel-inquiry-title">Planning a Journey to India or Nepal?</h2>
          <span>
            Share your itinerary and arrival details for custom travel planning and 24×7 Shadow Traveler assistance.
          </span>
        </div>
        <div className={styles.inquiryActions}>
          <Link href={inquiryHref}>Raise a Travel Inquiry</Link>
          <Link href="/services">Browse All Services</Link>
        </div>
      </section>

      {/* Related Navigation */}
      <nav className={styles.related} aria-label="Related navigation">
        <strong>Related navigation</strong>
        <div>
          <Link href={PITRU_MOKSHA_GAYA_ROUTE}>PitruMoksha Gaya</Link>
          <Link href="/ritual-services">Ritual Services</Link>
          <Link href={VAHI_RECORDS_ROUTE}>Vahi Lineage Records</Link>
          <Link href="/services">Service Catalog</Link>
        </div>
      </nav>
    </div>
  );
}
