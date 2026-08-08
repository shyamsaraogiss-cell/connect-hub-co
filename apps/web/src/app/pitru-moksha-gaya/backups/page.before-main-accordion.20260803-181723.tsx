import type { Metadata } from 'next';
import { BusinessPageShell, type BusinessPageShellProps } from '@/components/business-pages/BusinessPageShell';
import { StaticBusinessHeroPage } from '@/components/business-pages/StaticBusinessHeroPage';

export const metadata: Metadata = {
  title: 'PitruMoksha Gaya Sacred Coordination | Connect Hub Co.',
  description: 'Explore online, offline and Vahi Records pathways with verified Religious Partners and guided PitruMoksha Gaya coordination.',
};

const pitruMokshaGayaPageData: BusinessPageShellProps = {
  breadcrumb: [
    { label: 'Connect Hub Co.', href: '/' },
    { label: 'PitruMoksha Gaya' },
  ],
  eyebrow: 'ANCESTRAL RITES & PITRU DOSHA REMEDIES',
  title: 'PitruMoksha Gaya Sacred Coordination',
  introduction: 'Respectful, traditional, and fully transparent ritual coordination in Gaya Ji for your departed ancestors.',
  supportingLine: 'Participate in person or remotely with qualified Religious Partners and complete guidance.',
  inquiryHref: '/contact?topic=pitru-moksha-gaya',
  journeys: [
    {
      title: 'Online Ancestral Rituals',
      supportingLine: 'Remote Participation with Live Sankalp',
      description: 'Participate live from anywhere in the world while verified priests perform prescribed Pind Daan and Tarpan in Gaya Ji.',
      href: '/pitru-moksha-gaya/online',
      cta: 'Explore Online Pathway',
      icon: 'virtual',
    },
    {
      title: 'On-Site Gaya Ritual Journey',
      supportingLine: 'In-Person Guidance & Travel Support',
      description: 'Complete end-to-end travel assistance, local transport, stay coordination, and verified priest guidance at Gaya Ji sacred sites.',
      href: '/pitru-moksha-gaya/offline',
      cta: 'Explore On-Site Pathway',
      icon: 'offline',
    },
  ],
  overviewTitle: 'Why Families Choose Connect Hub Co.',
  overviewCopy: 'Performing sacred ancestral rites and planning travel to Gaya Ji require trust, clarity, and deep respect for Vedic tradition. We replace uncertainty with verified Religious Partners, clear service scopes, and 24×7 guided support.',
  overviewPoints: [
    'Verified Religious Partners: Every ritual is coordinated through carefully verified Religious Partners.',
    'Transparent Guidance: Clear process, service scope, and expectations before booking.',
    'Privacy First: Family and ancestor information is handled with confidentiality.',
    'Technology with Tradition: AI-assisted guidance combined with human verification.',
    'Dedicated Human Support: Personal assistance before, during, and after the ritual.',
    'End-to-End Coordination: From enquiry to completion, everything is managed through a single coordinated process.',
  ],
  steps: [
    {
      title: 'Share Your Family Requirement',
      description: 'Provide ancestral details, Gotra, preferred ritual dates, and whether your family prefers online remote participation or an on-site journey to Gaya Ji.',
    },
    {
      title: 'Receive Guided Authorised Scope',
      description: 'Our team reviews your tradition requirements, verifies Religious Partner availability, and prepares a transparent service scope before any commitment.',
    },
    {
      title: 'Sacred Ritual Execution',
      description: 'Perform the ritual with live Sankalp, qualified priest coordination, and complete guidance at the sacred Gaya Ji ritual sites or via arranged live stream.',
    },
    {
      title: 'Completion & Follow-Up Support',
      description: 'Receive agreed ritual completion confirmation, photographs/videos (as per plan), and ongoing post-service assistance.',
    },
  ],
  trustItems: [
    'Confidentiality & Privacy-First Support Guarantee',
    'Verified Local Priests & Pandas across Gaya Ji Sacred Sites',
    'Transparent Upfront Pricing without Unconfirmed Cash Demands',
  ],
  faqs: [
    {
      question: 'Can NRI families participate remotely from another country?',
      answer: 'Yes. Remote Sankalp and live virtual participation are available and coordinated across international time zones.',
    },
    {
      question: 'What details are required to begin the inquiry?',
      answer: 'Family names, Gotra, departed ancestor details, and preferred ritual dates.',
    },
    {
      question: 'Is accommodation and local travel included for on-site journeys?',
      answer: 'Yes. On-site journey coordination includes local Gaya transportation, stay arrangements, and priest assistance as detailed in your approved plan.',
    },
  ],
  relatedLinks: [
    { label: 'Explore Online Pathway', href: '/pitru-moksha-gaya/online' },
    { label: 'Explore On-Site Pathway', href: '/pitru-moksha-gaya/offline' },
    { label: 'Vahi Lineage Records', href: '/vahi-records' },
  ],
};

export default function PitruMokshaGayaPage() {
  return <StaticBusinessHeroPage slideId="pitru-moksha-gaya"><BusinessPageShell {...pitruMokshaGayaPageData} embedded /></StaticBusinessHeroPage>;
}
