import type { Metadata } from 'next';
import { BusinessPageShell, type BusinessPageShellProps } from '@/components/business-pages/BusinessPageShell';

export const metadata: Metadata = {
  title: 'Offline On-Site Ritual Services | Connect Hub Co.',
  description: 'In-person Vedic pujas, homams, Griha Pravesh, and sacred ceremonies coordinated at your home or pilgrimage destinations across India & Nepal.',
};

const offlineRitualData: BusinessPageShellProps = {
  breadcrumb: [
    { label: 'Connect Hub Co.', href: '/' },
    { label: 'Ritual Services', href: '/ritual-services' },
    { label: 'Offline Ritual Services' },
  ],
  eyebrow: 'ON-SITE & SACRED DESTINATION PUJAS',
  title: 'Offline On-Site Ritual Services',
  introduction: 'In-person traditional Vedic ceremonies conducted at your residence, venue, or sacred temple destinations across India and Nepal.',
  supportingLine: 'Coordinated with verified local Religious Partners, pure Samagri procurement, and complete ground support.',
  inquiryHref: '/contact?topic=offline-ritual-services',
  journeys: [
    {
      title: 'Home & Residence Pujas',
      supportingLine: 'Griha Pravesh, Vastu & Family Pujas',
      description: 'Verified priests visit your home with pre-arranged pure Sastra samagri for inauguration and family ceremonies.',
      href: '/contact?topic=home-ritual',
      cta: 'Book Home Ritual',
      icon: 'offering',
    },
    {
      title: 'Sacred Destination Pujas',
      supportingLine: 'Ayodhya, Kashi, Nashik, Gaya & Nepal',
      description: 'Conduct specialized pujas at sacred pilgrimage temples with verified local priests and local logistics assistance.',
      href: '/contact?topic=destination-ritual',
      cta: 'Explore Destination Pujas',
      icon: 'offline',
    },
  ],
  overviewTitle: 'Why Choose On-Site Coordination With Connect Hub Co.',
  overviewCopy: 'We take complete responsibility for priest verification, sacred ingredient purity, venue arrangement, and transparent Dakshina.',
  overviewPoints: [
    'Available across 15+ major sacred destinations and cities.',
    'Verified lineage priests experienced in regional Sastras and Sampradayas.',
    'Complete pure Samagri care—descriptive, unadulterated items.',
    'Zero unexpected cash demands on ritual day.',
    'Dedicated support manager for venue and logistics coordination.',
  ],
  steps: [
    { title: 'Share Event Details & Location', description: 'Specify your preferred puja, date, Gotra, and residence or destination city.' },
    { title: 'Receive Complete Service Scope', description: 'Our team confirms priest availability and issues a transparent quotation.' },
    { title: 'In-Person Sacred Execution', description: 'The priest conducts the ritual with Vedic precision and live family Sankalp.' },
    { title: 'Completion Confirmation', description: 'Receive completion proof, photo highlights, and ongoing assistance.' },
  ],
  trustItems: [
    'Verified Local Lineage Priests',
    'Pure Vaidik Samagri Care',
    '15+ Hub Locations in India & Nepal',
    'Transparent Upfront Scope',
  ],
  faqs: [
    { question: 'Which cities and sacred locations are covered?', answer: 'Ayodhya, Pune, Hyderabad, Nashik, Kashi/Varanasi, Patna, Mathura, Vrindavan, Delhi NCR, Lucknow, Gorakhpur, Gaya Ji, Bengaluru, Mumbai, and Nepal.' },
    { question: 'Is samagri brought by the priest?', answer: 'Yes! All essential Sastra-compliant samagri and pure items are pre-arranged and included in your confirmed service scope.' },
  ],
  relatedLinks: [
    { label: 'All Ritual Services', href: '/ritual-services' },
    { label: 'Online Remote Rituals', href: '/ritual-services/online' },
    { label: 'Travel Assistance', href: '/travel-assistance' },
  ],
};

export default function OfflineRitualServicesPage() {
  return <div id="offline-puja-services"><div id="preferred-location-puja"><BusinessPageShell {...offlineRitualData} /></div></div>;
}
