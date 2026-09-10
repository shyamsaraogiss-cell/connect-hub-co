import { APPROVED_AI_KNOWLEDGE_TREES } from '@/features/ai/knowledge/ai-knowledge';
import {
  APPROVED_KNOWLEDGE_ARTICLES,
  APPROVED_KNOWLEDGE_FAQS,
  type KnowledgeArticle,
  type KnowledgeFAQ,
} from '@/features/ai/knowledge/semantic-search';
import type { AIOptionPrompt } from '@/features/ai/types/ai.types';

type GuideDefinition = {
  slug: string;
  title: string;
  description: string;
  articleIds?: readonly string[];
  faqIds?: readonly string[];
  qaIds?: readonly string[];
  action: { label: string; href: string };
};

export type KnowledgeGuide = GuideDefinition & {
  articles: KnowledgeArticle[];
  faqs: KnowledgeFAQ[];
  approvedQuestions: AIOptionPrompt[];
};

const GUIDE_DEFINITIONS: readonly GuideDefinition[] = [
  {
    slug: 'pitrumoksha-gaya',
    title: 'PitruMoksha Gaya Knowledge Guide',
    description: 'Approved reference information about Gaya Ji Pind Daan, Shraddh, Tarpan, sacred locations, participation, and preparation.',
    articleIds: ['art_pmg_overview', 'art_pmg_online'],
    qaIds: ['pmg_shraddh', 'pmg_pind_daan', 'pmg_tarpan', 'pmg_gaya_rituals', 'pmg_prep'],
    action: { label: 'Explore PitruMoksha Gaya', href: '/pitru-moksha-gaya' },
  },
  {
    slug: 'ritual-services',
    title: 'Ritual Services Knowledge Guide',
    description: 'Approved guidance about choosing, preparing for, and participating in Vaidik ritual services.',
    articleIds: ['art_ritual_services'],
    qaIds: ['rit_selection', 'rit_purpose', 'rit_online', 'rit_offline', 'rit_language', 'rit_family_tradition'],
    action: { label: 'Explore Ritual Services', href: '/ritual-services' },
  },
  {
    slug: 'travel-assistance',
    title: 'Travel Assistance Knowledge Guide',
    description: 'Approved reference information for pilgrimage arrival, accommodation, local movement, accessibility, and itinerary support.',
    articleIds: ['art_travel_assist'],
    faqIds: ['faq_3'],
    qaIds: ['trv_arrival', 'trv_local_ground', 'trv_stay', 'trv_elder_eyes', 'trv_journey_plan'],
    action: { label: 'Explore Travel Assistance', href: '/travel-assistance' },
  },
  {
    slug: 'vahi-records',
    title: 'Vahi Records Knowledge Guide',
    description: 'Approved reference information about Vahi and Panji records, lineage terminology, family-information preparation, updates, and confidentiality.',
    articleIds: ['art_vahi_records', 'art_policies'],
    faqIds: ['faq_4'],
    qaIds: ['vahi_meaning', 'vahi_search', 'vahi_updates', 'co_privacy'],
    action: { label: 'Explore Vahi Records', href: '/vahi-records' },
  },
  {
    slug: 'religious-partner-registration',
    title: 'Priest Registration Knowledge Guide',
    description: 'Approved reference information about Priest Eligibility, registration, documentation, verification, and service capability.',
    articleIds: ['art_rpn_registration'],
    qaIds: ['rpn_eligibility', 'rpn_registration', 'rpn_documents', 'rpn_approval', 'rpn_services'],
    action: { label: 'Explore Priest Registration', href: '/religious-partners' },
  },
  {
    slug: 'booking-and-inquiry-help',
    title: 'Booking and Inquiry Help Guide',
    description: 'Approved guidance about submitting a request, the information used for coordination, confirmation, Reference IDs, and subsequent tracking.',
    faqIds: ['faq_2'],
    qaIds: ['bk_quote', 'bk_confirm', 'inq_custom', 'inq_turnaround', 'trk_format', 'trk_lookup'],
    action: { label: 'Book Now', href: '/services' },
  },
  {
    slug: 'tracking-help',
    title: 'Tracking Help Guide',
    description: 'Approved instructions for understanding and using a Universal Reference ID to view customer-safe request status.',
    articleIds: ['art_tracking_urms'],
    qaIds: ['trk_format', 'trk_lookup'],
    action: { label: 'Track a Request', href: '/tracking' },
  },
  {
    slug: 'policies-and-governance',
    title: 'Policies and Governance Knowledge Guide',
    description: 'Approved reference information about confidentiality, privacy governance, public routes, and human-authorised decisions.',
    articleIds: ['art_policies', 'art_navigation'],
    qaIds: ['co_privacy'],
    action: { label: 'Read Privacy Policy', href: '/privacy-policy' },
  },
  {
    slug: 'frequently-asked-questions',
    title: 'Frequently Asked Questions',
    description: 'A read-only repository of approved frequently asked questions covering ancestral rites, booking transparency, travel accessibility, and Vahi Records.',
    faqIds: ['faq_1', 'faq_2', 'faq_3', 'faq_4'],
    action: { label: 'Explore Services', href: '/services' },
  },
] as const;

const approvedPrompts = Object.values(APPROVED_AI_KNOWLEDGE_TREES).flatMap((tree) => tree.initialPrompts);

export const KNOWLEDGE_GUIDE_CARDS = GUIDE_DEFINITIONS.map(({ slug, title, description }) => ({
  title: title.replace(' Knowledge Guide', ''),
  description,
  href: `/knowledge-center/guides/${slug}`,
}));

export const KNOWLEDGE_GUIDE_SLUGS = GUIDE_DEFINITIONS.map((guide) => guide.slug);

export function getKnowledgeGuide(slug: string): KnowledgeGuide | null {
  const definition = GUIDE_DEFINITIONS.find((guide) => guide.slug === slug);
  if (!definition) return null;

  return {
    ...definition,
    articles: APPROVED_KNOWLEDGE_ARTICLES.filter((article) => definition.articleIds?.includes(article.id)),
    faqs: APPROVED_KNOWLEDGE_FAQS.filter((faq) => definition.faqIds?.includes(faq.id)),
    approvedQuestions: approvedPrompts.filter((prompt) => definition.qaIds?.includes(prompt.id)),
  };
}
