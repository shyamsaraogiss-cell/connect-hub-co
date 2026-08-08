import type { Metadata } from 'next';
import { BusinessPageShell, type BusinessPageShellProps } from '@/components/business-pages/BusinessPageShell';

export const metadata: Metadata = {
  title: 'Online Ritual Services & Remote Live Sankalp | Connect Hub Co.',
  description: 'Participate remotely in authentic Vedic pujas with live HD video streaming and guided Sankalp led by verified Religious Partners.',
};

const onlineRitualData: BusinessPageShellProps = {
  breadcrumb: [
    { label: 'Connect Hub Co.', href: '/' },
    { label: 'Ritual Services', href: '/ritual-services' },
    { label: 'Online Ritual Services' },
  ],
  eyebrow: 'GLOBAL REMOTE PARTICIPATION',
  title: 'Online Ritual Services & Live Sankalp',
  introduction: 'Connect your family worldwide with live HD streaming and authentic Sastra-compliant Sankalp led by verified priests.',
  supportingLine: 'Participate live across global time zones (USA, UK, Gulf, Australia, Singapore) with full ritual documentation.',
  inquiryHref: '/contact?topic=online-ritual-services',
  journeys: [
    {
      title: 'Scheduled Live Video Stream',
      supportingLine: 'Join Live with Family Members',
      description: 'HD live stream connection scheduled to suit your time zone, allowing all family members to participate together.',
      href: '/contact?topic=live-stream-ritual',
      cta: 'Inquire for Live Stream',
      icon: 'virtual',
    },
    {
      title: 'Remote Sankalp & Gotra Recitation',
      supportingLine: 'Authentic Lineage Recitation',
      description: 'Priests recite your specific family names, Gotra, and intentions live during the sacred ceremony.',
      href: '/contact?topic=remote-sankalp',
      cta: 'Request Remote Sankalp',
      icon: 'sankalp',
    },
  ],
  overviewTitle: 'Why Families Choose Remote Ritual Coordination',
  overviewCopy: 'Distance never stops devotion. Our verified online ritual services ensure complete ritual purity, transparent Dakshina, and verified completion proof.',
  overviewPoints: [
    'Live HD Video Stream across international time zones.',
    'Verified Lineage Priests conducting Sastra-compliant Sankalp.',
    'Pure Samagri Procurement and sanitized venue setup included.',
    'Prasadam and sacred offerings dispatched to your address.',
    'Completion confirmation and high-resolution photo/video highlights.',
  ],
  steps: [
    { title: 'Select Ritual & Preferred Date', description: 'Choose your desired ritual, Gotra, and convenient global time zone.' },
    { title: 'Receive Service Scope & Confirmation', description: 'Receive full transparent scope including priest Dakshina and live connection link.' },
    { title: 'Participate Live Online', description: 'Join the live video session as priests guide your family through the Sankalp.' },
    { title: 'Receive Confirmation & Prasadam', description: 'Access ritual documentation and receive dispatched sacred prasadam.' },
  ],
  trustItems: [
    'Verified Lineage Priests',
    'Pure Sastra Samagri Guarantee',
    'Global Time Zone Live Video Stream',
    'Transparent Pricing without Hidden Cash Demands',
  ],
  faqs: [
    { question: 'Can family members from multiple countries join the live stream?', answer: 'Yes! Multiple family members can join the secure video link from different locations simultaneously.' },
    { question: 'How is Sankalp performed remotely?', answer: 'The priest recites the Sankalp live over the video connection while guiding you through the spoken responses and intention.' },
  ],
  relatedLinks: [
    { label: 'All Ritual Services', href: '/ritual-services' },
    { label: 'Offline On-Site Rituals', href: '/ritual-services/offline' },
    { label: 'PitruMoksha Gaya Online', href: '/pitru-moksha-gaya/online' },
  ],
};

export default function OnlineRitualServicesPage() {
  return <div id="online-puja"><BusinessPageShell {...onlineRitualData} /></div>;
}
