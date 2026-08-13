import type { BusinessCategory } from '../types/ai.types';
import { API_BASE_URL } from '../../../lib/api';

export interface KnowledgeArticle {
  id: string;
  category: BusinessCategory;
  categoryTitle: string;
  title: string;
  keywords: string[];
  synonyms: string[];
  summary: string;
  content: string;
  link: string;
}

export interface KnowledgeFAQ {
  id: string;
  category: BusinessCategory;
  question: string;
  answer: string;
  keywords: string[];
  link: string;
}

export const APPROVED_KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'art_pmg_overview',
    category: 'pitru-moksha-gaya',
    categoryTitle: 'PitruMoksha Gaya Rites',
    title: 'Gaya Ji Pind Daan & Ancestral Rites Protocol',
    keywords: ['pind daan', 'pind dan', 'shraddha', 'tarpan', 'phalgu', 'vishnupad', 'akshayavat', 'pitru paksha'],
    synonyms: ['ancestor rites', 'afterlife offerings', 'shradh', 'gaya trip', 'pinda pradan'],
    summary: 'Understanding the sacred significance of Gaya Ji Pind Daan, Phalgu River rituals, Vishnupad Temple offerings, and Akshayavat final blessings.',
    content: 'Performing Pind Daan at Gaya Ji provides liberation to 101 generations of ancestors. The ritual involves sacred baths at Phalgu River, Pind offering at Vishnupad, and unknotting the sacred thread under the immortal Akshayavat banyan tree.',
    link: '/pitru-moksha-gaya',
  },
  {
    id: 'art_pmg_online',
    category: 'pitru-moksha-gaya',
    categoryTitle: 'PitruMoksha Gaya Rites',
    title: 'Remote Live Stream Pind Daan for NRIs & Global Families',
    keywords: ['online pind daan', 'nri tarpan', 'live stream puja', 'remote sankalp', 'virtual shradh'],
    synonyms: ['nri shradh', 'zoom puja', 'remote ritual', 'online panda'],
    summary: 'Authentic remote Pind Daan conducted in Gaya Ji by verified Tirth Purohits via interactive high-definition live video stream.',
    content: 'For families residing overseas or unable to travel, lineaged Pandas perform live Sankalp in your family name at authentic Gaya Vedis, streaming the complete ceremonial recitations in real-time.',
    link: '/pitru-moksha-gaya',
  },
  {
    id: 'art_ritual_services',
    category: 'ritual-services',
    categoryTitle: 'Vaidik Ritual Services',
    title: 'Authentic Home Pujas, Havan & Vastu Shanti',
    keywords: ['griha pravesh', 'havan', 'vastu shanti', 'navagraha', 'satyanarayan', 'pandit ji', 'puja samagri'],
    synonyms: ['house warming', 'fire ritual', 'priest booking', 'home priest', 'pooja'],
    summary: 'Booking qualified Pandits for Griha Pravesh, Navagraha Shanti, Maha Mritunjay Havan, and family ceremonies with verified pure Samagri.',
    content: 'Our Vaidik Ritual Network connects households with certified Pandits who bring pure ritual Samagri and conduct authentic Vedic chants according to your family Sampradaya.',
    link: '/ritual-services',
  },
  {
    id: 'art_travel_assist',
    category: 'travel-assistance',
    categoryTitle: 'Pilgrimage Travel Assistance',
    title: 'Elder-Friendly Pilgrimage Pickups, Stays & Shadow Escort',
    keywords: ['hotel stay', 'dharamshala', 'airport pickup', 'station transfer', 'wheelchair', 'senior citizen escort'],
    synonyms: ['cab service', 'elderly travel', 'gaya hotels', 'transport', 'pilgrim assist'],
    summary: 'Private station/airport transfers, elder-friendly accommodation near Vishnupad Temple, and dedicated shadow escort assistants.',
    content: 'We provide dedicated pilgrimage logistics including air-conditioned station pickups, sanitized hotels near temples with elevator access, and on-ground wheelchair assistants for elderly pilgrims.',
    link: '/travel-assistance',
  },
  {
    id: 'art_vahi_records',
    category: 'vahi-records',
    categoryTitle: 'Vahi Lineage & Ledger Records',
    title: 'Ancestral Vahi & Panji Ledger Verification',
    keywords: ['vahi records', 'panji', 'genealogy', 'gotra lookup', 'ancestral ledger', 'tirth purohit vahi'],
    synonyms: ['family tree', 'family records', 'lineage search', 'panda ledger', 'gotra verification'],
    summary: 'Tracing multi-generational family trees and Gotra records preserved by traditional lineaged Gaya Pandas.',
    content: 'Hand-written Vahi ledgers record ancestral visits, Gotra lineages, native villages, and family seals dating back centuries. Verified Pandas assist in locating authentic family signatures.',
    link: '/vahi-records',
  },
  {
    id: 'art_rpn_registration',
    category: 'religious-partners',
    categoryTitle: 'Religious Partner Network',
    title: 'Purohit & Panda Registration & Conduct Standards',
    keywords: ['partner registration', 'purohit join', 'panda network', 'tirth purohit code', ' आचार्य '],
    synonyms: ['priest join', 'partner onboarding', 'pandit registration', 'code of conduct'],
    summary: 'Verification criteria, code of conduct, and onboarding pathways for lineaged Purohits, Tirth Pandas, and Acharyas.',
    content: 'We invite authentic Tirth Purohits and Vedic Pandits who commit to transparent Dakshina pricing, ethical pilgrim treatment, and strict ceremonial accuracy.',
    link: '/religious-partners',
  },
  {
    id: 'art_tracking_urms',
    category: 'tracking',
    categoryTitle: 'URMS Tracking Engine',
    title: 'Universal Reference ID Tracking & Status Transparency',
    keywords: ['chc reference id', 'urms tracking', 'status check', 'request stage', 'tracking portal'],
    synonyms: ['track inquiry', 'booking status', 'ref id lookup', 'order tracking'],
    summary: 'How to monitor your service request, coordinator assignment, and ceremony schedule using CHC-2026-XXXXXX IDs.',
    content: 'Every customer submission generates a Universal Reference ID (CHC-2026-XXXXXX). Enter your reference ID on /tracking or inside Ask GenZ AI to check live status updates without private internal notes.',
    link: '/tracking',
  },
  {
    id: 'art_policies',
    category: 'company-info',
    categoryTitle: 'Policies & Privacy Governance',
    title: 'Confidentiality Commitment, Vahi Privacy & Booking Policies',
    keywords: ['privacy policy', 'vahi confidentiality', 'booking terms', 'cancellation', 'refund policy', 'data protection'],
    synonyms: ['privacy', 'terms', 'cancellation terms', 'security', 'confidentiality'],
    summary: 'Strict data protection guidelines, ancestral record privacy protocols, and transparent booking refund rules.',
    content: 'Connect Hub Co. strictly safeguards family lineage records and Gotra history. Ancestral ledgers are accessible only to lineaged Pandas and verified heirs under explicit authorization.',
    link: '/privacy-policy',
  },
  {
    id: 'art_navigation',
    category: 'company-info',
    categoryTitle: 'Website Navigation & Portal Guide',
    title: 'Navigating Connect Hub Co. Portals & Services',
    keywords: ['navigation', 'pages', 'sitemap', 'services catalog', 'contact desk', 'where to find'],
    synonyms: ['menu', 'pages list', 'site map', 'browse website'],
    summary: 'Direct routes to PitruMoksha Gaya (/pitru-moksha-gaya), Ritual Services (/ritual-services), Travel (/travel-assistance), Vahi Ledgers (/vahi-records), and Tracking (/tracking).',
    content: 'Explore our core service verticals from the header navigation or visit /services for the full catalog, /tracking for live URMS updates, and /knowledge-center for Vedic guidance.',
    link: '/route-index',
  },
  {
    id: 'art_complaint_guide',
    category: 'complaint',
    categoryTitle: 'Quality & Complaint Desk',
    title: 'Service Quality Assurance & Resolution Guidelines',
    keywords: ['complaint', 'quality issue', 'unsatisfied', 'service escalation', 'report error'],
    synonyms: ['dispute', 'issue', 'bad service', 'complain'],
    summary: 'How to report service issues for immediate high-priority audit by our operations escalation team.',
    content: 'Service issues are logged into URMS with HIGH priority and reviewed within 12 hours. Dedicated coordinators contact the customer directly to resolve any ceremonial or logistical concerns.',
    link: '/contact?topic=complaint',
  },
  {
    id: 'art_founder_support',
    category: 'founder-support',
    categoryTitle: 'Founder Desk',
    title: 'Founder Desk Priority Escalation Guidelines',
    keywords: ['founder support', 'executive escalation', 'nri emergency', 'high priority', 'founder desk'],
    synonyms: ['founder', 'director assist', 'emergency escalation'],
    summary: 'Direct escalation to Founder Support for urgent NRI travel emergencies, complex family lineage disputes, or critical service delays.',
    content: 'Founder Support handles executive-level escalations for urgent NRI arrivals, multi-family lineage verifications, or unresolved high-priority requests requiring senior decision-making.',
    link: '/contact?topic=founder-support',
  },
];

export const APPROVED_KNOWLEDGE_FAQS: KnowledgeFAQ[] = [
  {
    id: 'faq_1',
    category: 'pitru-moksha-gaya',
    question: 'Who is eligible to perform Gaya Ji Pind Daan?',
    answer: 'Eldest sons, sons, daughters, wives, or close family relatives can perform Pind Daan for deceased parents and ancestors. If no immediate family member is present, a proxy Sankalp can be taken.',
    keywords: ['who can perform', 'eligibility', 'son daughter', 'woman pind daan', 'family eligibility'],
    link: '/pitru-moksha-gaya',
  },
  {
    id: 'faq_2',
    category: 'booking',
    question: 'Is Dakshina fixed or are there hidden extra demands?',
    answer: 'Dakshina and service costs are 100% upfront and transparent. We prohibit extortion or unexpected money demands during rituals.',
    keywords: ['dakshina price', 'cost', 'hidden charges', 'transparent quote', 'extra money'],
    link: '/services',
  },
  {
    id: 'faq_3',
    category: 'travel-assistance',
    question: 'Can wheelchair support be arranged for elderly parents at Vishnupad temple?',
    answer: 'Yes, dedicated ground support escorts and wheelchair access can be booked along with your pilgrimage travel assistance package.',
    keywords: ['wheelchair', 'elderly support', 'senior citizen', 'temple assistance', 'handicapped accessibility'],
    link: '/travel-assistance',
  },
  {
    id: 'faq_4',
    category: 'vahi-records',
    question: 'How do I locate our family Panda if I only know our native village and Gotra?',
    answer: 'Provide your Gotra, native district/village, and grandfather or great-grandfather name. Our Vahi team will cross-reference regional ledger indices.',
    keywords: ['find panda', 'locate ledger', 'native village', 'gotra search', 'family panda'],
    link: '/vahi-records',
  },
];

export interface NavigationRoute {
  label: string;
  href: string;
  category: string;
  description: string;
}

export const SITE_NAVIGATION_MAP: NavigationRoute[] = [
  { label: 'PitruMoksha Gaya Rites', href: '/pitru-moksha-gaya', category: 'Services Page', description: 'Sacred Gaya Ji Pind Daan, Shraddha & Tarpan services' },
  { label: 'Vaidik Ritual Services', href: '/ritual-services', category: 'Services Page', description: 'Griha Pravesh, Navagraha Shanti, and home pujas' },
  { label: 'Pilgrimage Travel Assist', href: '/travel-assistance', category: 'Services Page', description: 'Station pickup, hotel accommodation, and senior citizen escort' },
  { label: 'Vahi Lineage Records', href: '/vahi-records', category: 'Services Page', description: 'Ancestral Vahi & Panji ledger verification' },
  { label: 'Religious Partner Portal', href: '/religious-partners', category: 'Services Page', description: 'Registration for Tirth Pandas, Purohits & Acharyas' },
  { label: 'Services Catalog', href: '/services', category: 'Catalog Page', description: 'Complete service catalog with transparent Dakshina pricing' },
  { label: 'URMS Tracking Portal', href: '/tracking', category: 'Tracking & Forms', description: 'Live status tracking via Universal Reference ID (CHC-2026-XXXXXX)' },
  { label: 'Knowledge Center', href: '/knowledge-center', category: 'Repository', description: 'Central repository for Vedic guides, articles & FAQs' },
  { label: 'Inquiry & Contact Form', href: '/contact', category: 'Forms', description: 'Submit custom inquiries, bookings, or quality complaints' },
  { label: 'Policies & Data Privacy', href: '/privacy-policy', category: 'Policies', description: 'Vahi record privacy, data protection, and booking terms' },
  { label: 'Route Directory Index', href: '/route-index', category: 'Navigation Index', description: 'Complete site index of all public pages and portals' },
];

const SYNONYM_MAP: Record<string, string[]> = {
  'pind dan': ['pind daan', 'shraddha', 'tarpan', 'gaya'],
  'pinda daan': ['pind daan', 'shraddha', 'tarpan'],
  'shradh': ['shraddha', 'pind daan'],
  'price': ['dakshina', 'cost', 'quote'],
  'cost': ['dakshina', 'price', 'quote'],
  'priest': ['pandit ji', 'purohit', 'panda', 'acharya'],
  'pandit': ['purohit', 'panda', 'acharya'],
  'hotel': ['dharamshala', 'stay', 'accommodation'],
  'ledger': ['vahi', 'panji', 'genealogy'],
  'track': ['urms', 'reference id', 'status'],
  'page': ['navigation', 'pages', 'where to find', 'link'],
  'form': ['contact', 'inquiry form', 'booking form'],
  'policy': ['privacy', 'terms', 'governance'],
};

const SEARCH_CACHE = new Map<string, {
  matchedArticles: KnowledgeArticle[];
  matchedFAQs: KnowledgeFAQ[];
  matchedRoutes: NavigationRoute[];
  suggestedAnswer?: string;
  categoryMatch?: BusinessCategory;
}>();

export function searchKnowledgeCenter(query: string): {
  matchedArticles: KnowledgeArticle[];
  matchedFAQs: KnowledgeFAQ[];
  matchedRoutes: NavigationRoute[];
  suggestedAnswer?: string;
  categoryMatch?: BusinessCategory;
} {
  const normalized = query.toLowerCase().trim();
  if (!normalized) {
    return { matchedArticles: [], matchedFAQs: [], matchedRoutes: [] };
  }

  if (SEARCH_CACHE.has(normalized)) {
    return SEARCH_CACHE.get(normalized)!;
  }

  // Expand synonyms
  const queryTokens = normalized.split(/\s+/);
  const expandedTokens = new Set<string>(queryTokens);
  for (const token of queryTokens) {
    if (SYNONYM_MAP[token]) {
      SYNONYM_MAP[token].forEach((syn) => expandedTokens.add(syn));
    }
  }

  // Navigation Route Matching
  const isNavQuery = ['where', 'find', 'page', 'link', 'form', 'navigate', 'policy', 'tracking', 'catalog', 'sitemap', 'menu'].some(
    (kw) => normalized.includes(kw)
  );

  const matchedRoutes = isNavQuery
    ? SITE_NAVIGATION_MAP.filter(
        (nav) =>
          nav.label.toLowerCase().includes(normalized) ||
          nav.description.toLowerCase().includes(normalized) ||
          Array.from(expandedTokens).some((t) => t.length > 2 && (nav.label.toLowerCase().includes(t) || nav.description.toLowerCase().includes(t)))
      )
    : [];

  // FAQ Matching
  const matchedFAQs = APPROVED_KNOWLEDGE_FAQS.filter((faq) => {
    const qLower = faq.question.toLowerCase();
    const aLower = faq.answer.toLowerCase();
    return (
      qLower.includes(normalized) ||
      faq.keywords.some((kw) => normalized.includes(kw) || kw.includes(normalized)) ||
      Array.from(expandedTokens).some((t) => t.length > 2 && (qLower.includes(t) || aLower.includes(t)))
    );
  });

  // Article Matching
  const matchedArticles = APPROVED_KNOWLEDGE_ARTICLES.filter((art) => {
    const titleLower = art.title.toLowerCase();
    const summaryLower = art.summary.toLowerCase();
    return (
      titleLower.includes(normalized) ||
      art.keywords.some((kw) => normalized.includes(kw) || kw.includes(normalized)) ||
      art.synonyms.some((syn) => normalized.includes(syn) || syn.includes(normalized)) ||
      Array.from(expandedTokens).some((t) => t.length > 2 && (titleLower.includes(t) || summaryLower.includes(t)))
    );
  });

  let suggestedAnswer: string | undefined;
  let categoryMatch: BusinessCategory | undefined;

  if (matchedRoutes.length > 0 && isNavQuery) {
    suggestedAnswer = `Website Navigation Guide: Found ${matchedRoutes.length} matching site destination(s) for "${query}".`;
    categoryMatch = 'company-info';
  } else if (matchedFAQs.length > 0) {
    suggestedAnswer = `${matchedFAQs[0].answer}`;
    categoryMatch = matchedFAQs[0].category;
  } else if (matchedArticles.length > 0) {
    suggestedAnswer = `${matchedArticles[0].title}: ${matchedArticles[0].summary}`;
    categoryMatch = matchedArticles[0].category;
  }

  const res = {
    matchedArticles,
    matchedFAQs,
    matchedRoutes: matchedRoutes.length > 0 ? matchedRoutes : isNavQuery ? SITE_NAVIGATION_MAP.slice(0, 4) : [],
    suggestedAnswer,
    categoryMatch,
  };

  SEARCH_CACHE.set(normalized, res);
  return res;
}

export async function syncKnowledgeFromBackend() {
  try {
    const resArticles = await fetch(`${API_BASE_URL}/api/governance/articles?status=APPROVED`).then((r) => r.json());
    const resFAQs = await fetch(`${API_BASE_URL}/api/governance/faqs?status=APPROVED`).then((r) => r.json());
    
    if (resArticles.success && Array.isArray(resArticles.articles)) {
      // Clear cache as index changed
      SEARCH_CACHE.clear();
      APPROVED_KNOWLEDGE_ARTICLES.length = 0;
      APPROVED_KNOWLEDGE_ARTICLES.push(...resArticles.articles);
    }
    if (resFAQs.success && Array.isArray(resFAQs.faqs)) {
      SEARCH_CACHE.clear();
      APPROVED_KNOWLEDGE_FAQS.length = 0;
      APPROVED_KNOWLEDGE_FAQS.push(...resFAQs.faqs);
    }
  } catch (err) {
    console.error('Failed to sync knowledge from backend:', err);
  }
}
