import type { BusinessCategory } from '../types/ai.types';
import type { AIOptionPrompt } from '../types/ai.types';
import { API_BASE_URL } from '../../../lib/api';

export interface FounderKnowledgeRecord {
  excelId: string; question: string; answer: string; category: BusinessCategory; topic: string; aiIntent: string;
  humanEscalationRequired: 'YES' | 'NO'; approvedPageServiceRelationship: string;
  source: 'FOUNDER_PROVIDED_QA_DATABASE'; sourcePath: string; published: boolean; runtimeApproved: boolean; status: string;
}

type FounderDatabase = { runtimeImportAllowed: boolean; automaticallyPublished: boolean; recordCount: number; records: FounderKnowledgeRecord[] };
export const APPROVED_FOUNDER_KNOWLEDGE: readonly FounderKnowledgeRecord[] = Object.freeze([]);

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

export const APPROVED_KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [];

export const APPROVED_KNOWLEDGE_FAQS: KnowledgeFAQ[] = [];

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

const GENERIC_SEARCH_TOKENS = new Set([
  'the', 'and', 'for', 'from', 'with', 'this', 'that', 'what', 'who', 'how', 'why', 'when', 'where', 'which',
  'can', 'could', 'would', 'should', 'does', 'will', 'have', 'has', 'had', 'are', 'was', 'were', 'is', 'may',
  'want', 'need', 'help', 'please', 'tell', 'explain', 'clarify', 'about', 'same', 'both', 'into', 'through',
  'your', 'our', 'their', 'them', 'they', 'you', 'me', 'my', 'we', 'i', 'a', 'an', 'to', 'of', 'or', 'family',
  'kindly', 'thanks', 'simple', 'words', 'guidance', 'know', 'like', 'available', 'apply', 'happens', 'happen',
  'namaste', 'people', 'get', 'receive', 'received', 'come', 'needed', 'required', 'perform', 'performed', 'participate', 'participation',
]);

type SearchIntent = 'comparison' | 'eligibility' | 'identity' | 'definition' | 'procedure' | 'participation' |
  'timing' | 'documents' | 'completion' | 'pricing' | 'booking' | 'tracking' | 'registration' | 'navigation' |
  'privacy' | 'preparation' | 'availability' | 'delivery';

const normalizeText = (text: string) => text.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
const normalizeForMatching = (text: string) => normalizeText(text)
  .replace(/^(?:please\s+explain|i\s+would\s+like\s+to\s+know|could\s+you\s+(?:tell\s+me|clarify)|namaste\s+tell\s+me|need\s+guidance)\s+/, '')
  .replace(/\s+(?:please|in\s+simple\s+words|for\s+my\s+family|kindly|thanks)$/, '')
  .trim();
const stemToken = (token: string) => token.length > 5 && token.endsWith('ies') ? `${token.slice(0, -3)}y`
  : token === 'documentation' ? 'document'
    : token === 'preparation' ? 'prepare'
    : token === 'information' || token === 'details' ? 'detail'
      : token === 'participation' || token === 'participating' ? 'participate'
        : token === 'remotely' ? 'remote'
  : token.length > 5 && token.endsWith('ing') ? token.slice(0, -3)
    : token.length > 4 && token.endsWith('ed') ? token.slice(0, -2)
      : token.length > 4 && token.endsWith('s') && !token.endsWith('ss') ? token.slice(0, -1)
        : token;

function detectSearchIntents(text: string): Set<SearchIntent> {
  const intents = new Set<SearchIntent>();
  if (/\b(?:same\s+as|equal|equivalent|difference|different|compare|comparison|versus|vs)\b/i.test(text)) intents.add('comparison');
  if (/\b(?:who\s+(?:is\s+)?eligible|who\s+can|who\s+may|eligible|eligibility|allowed\s+to|can\s+(?:women|daughters?|sons?))\b/i.test(text)) intents.add('eligibility');
  if (/^\s*who\s+(?!can\b|may\b|(?:is\s+)?eligible\b)/i.test(text) && !intents.has('eligibility')) intents.add('identity');
  if (/\b(?:participate|participation|join|family\s+members?)\b/i.test(text)) intents.add('participation');
  if (/\b(?:price|pricing|cost|dakshina|quote|charges?)\b/i.test(text)) intents.add('pricing');
  if (/\b(?:book|booking|schedule\s+a\s+service)\b/i.test(text)) intents.add('booking');
  if (/\b(?:track|tracking|reference\s+id|request\s+status)\b/i.test(text)) intents.add('tracking');
  if (/\b(?:register|registration|join\s+as|apply\s+as)\b/i.test(text)) intents.add('registration');
  if (/\b(?:date|dates|timing|muhurat|how\s+many\s+days|duration)\b/i.test(text)) intents.add('timing');
  if (/\b(?:document|documents|documentation|certificate|photos?|videos?|proof)\b/i.test(text)) intents.add('documents');
  if (/\b(?:how\s+will\s+.*\s+receiv\w*|sent\s+to|delivered|delivery|dispatch(?:ed)?)\b/i.test(text)) intents.add('delivery');
  if (/\b(?:after\s+(?:ritual\s+)?completion|post\s+ritual|upon\s+completion)\b/i.test(text)) intents.add('completion');
  if (/\b(?:privacy|private|confidential|protected|kept\s+private)\b/i.test(text)) intents.add('privacy');
  if (/\b(?:prepare|preparation|required\s+before)\b/i.test(text)) intents.add('preparation');
  if (/\b(?:where|page|link|navigate|navigation|portal|route)\b/i.test(text)) intents.add('navigation');
  if (/\b(?:what\s+is|what\s+are|meaning|define|definition)\b/i.test(text)) intents.add('definition');
  if (/\b(?:how\s+is|how\s+does|how\s+do|how\s+to|process|steps?|performed)\b/i.test(text)) intents.add('procedure');
  if (/\b(?:is|are|can)\b.*\b(?:available|provided|possible|required|mandatory)\b/i.test(text)) intents.add('availability');
  return intents;
}

export interface PublicKnowledgeSource {
  id: string;
  sourceType: 'public-page' | 'knowledge-guide' | 'policy' | 'service-reference';
  route: string;
  category: BusinessCategory;
  domain: string;
  intent: string;
  questions: readonly string[];
  approvedContent: string;
  action?: { label: string; href: string };
}

// Controlled, customer-facing source units copied from the current approved public pages.
// Exact questions/aliases deliberately avoid turning arbitrary rendered strings into AI knowledge.
export const APPROVED_PUBLIC_KNOWLEDGE_SOURCES: readonly PublicKnowledgeSource[] = [
  {
    id: 'public_company_overview', sourceType: 'public-page', route: '/about', category: 'company-info', domain: 'company', intent: 'definition',
    questions: ['What is Connect Hub Co.?', 'What does Connect Hub Co. do?', 'Tell me about Connect Hub Co.'],
    approvedContent: 'Our mission is to connect families with verified Hindu religious partners and practical pilgrimage support through clear, respectful, auditable workflows.',
  },
  {
    id: 'public_knowledge_center_overview', sourceType: 'knowledge-guide', route: '/knowledge-center', category: 'company-info', domain: 'knowledge-center', intent: 'definition',
    questions: ['What is the Knowledge Center?', 'What information is in the Knowledge Center?'],
    approvedContent: 'Welcome to the Connect Hub Co. Knowledge Center. Explore authentic guidance on Vedic rituals, Gaya Ji Pind Daan, lineage records, and pilgrim assistance.',
  },
  {
    id: 'public_booking_help', sourceType: 'knowledge-guide', route: '/knowledge-center/guides/booking-and-inquiry-help', category: 'booking', domain: 'booking', intent: 'procedure',
    questions: ['How do I begin a service booking?', 'How do I begin a service request?'],
    approvedContent: 'Tell us what you need. We’ll help you choose the right service, participation format, and next steps. After submission, the system automatically generates your Service Request ID.',
    action: { label: 'Book Now', href: '/services' },
  },
  {
    id: 'public_privacy_lineage', sourceType: 'policy', route: '/privacy-policy', category: 'company-info', domain: 'privacy', intent: 'privacy',
    questions: ['How is family lineage information protected?', 'How are Vahi and Panji records protected?'],
    approvedContent: 'Traditional Vahi and Panji lineage records are strictly protected. They are never published for public online search, sold, or shared with unauthorized third parties. Access is restricted to assigned verified Religious Partners and Pandas.',
  },
  {
    id: 'public_cancellation_policy', sourceType: 'policy', route: '/cancellation-policy', category: 'company-info', domain: 'cancellation', intent: 'policy',
    questions: ['What is the cancellation policy?', 'What is the cancellation and refund policy?'],
    approvedContent: 'Ritual service requests cancelled prior to Sastra samagri procurement and priest deployment are eligible for full refund or date rescheduling.',
  },
  {
    id: 'public_terms', sourceType: 'policy', route: '/terms', category: 'company-info', domain: 'terms', intent: 'policy',
    questions: ['What approved service terms apply?', 'What are the service terms?'],
    approvedContent: 'Connect Hub Co. acts as an authorized coordination platform connecting families with verified Religious Partners, qualified priests, and travel support providers. Final ritual formats and traditions are confirmed with verified priests.',
  },
  {
    id: 'public_booking_terms', sourceType: 'policy', route: '/booking-terms', category: 'booking', domain: 'booking', intent: 'policy',
    questions: ['What approved booking terms apply?', 'What are the booking terms?'],
    approvedContent: 'Every booking is confirmed with an explicit service scope covering priest Dakshina, Sastra-compliant Samagri, venue setup, and travel assistance (if applicable). No unexpected cash demands are permitted.',
  },
  {
    id: 'public_offline_ritual', sourceType: 'public-page', route: '/ritual-services/offline', category: 'ritual-services', domain: 'offline-ritual', intent: 'participation',
    questions: ['How does offline ritual participation work?', 'How do offline on-site ritual services work?'],
    approvedContent: 'In-person traditional Vedic ceremonies are conducted at your residence, venue, or sacred temple destinations across India and Nepal, coordinated with verified local Religious Partners, pure Samagri procurement, and complete ground support.',
  },
  {
    id: 'public_online_ritual', sourceType: 'public-page', route: '/ritual-services/online', category: 'ritual-services', domain: 'online-ritual', intent: 'participation',
    questions: ['How does online ritual participation work?', 'How do online ritual services work?'],
    approvedContent: 'Join the live video session as priests guide your family through the Sankalp. Multiple family members can join the secure video link from different locations simultaneously.',
  },
  {
    id: 'public_service_catalog', sourceType: 'service-reference', route: '/services/[slug]', category: 'booking', domain: 'service-catalog', intent: 'definition',
    questions: ['What service information is available in the service catalog?', 'What information is shown for a service?'],
    approvedContent: 'The service catalog provides approved service information, eligibility, materials, duration, and enquiry options. Dates, materials, pricing, and travel needs are confirmed before service.',
    action: { label: 'Explore Service Catalog', href: '/knowledge-center' },
  },
] as const;

export function findApprovedPublicKnowledge(query: string): PublicKnowledgeSource | null {
  const normalizedQuestion = normalizeForMatching(query);
  return APPROVED_PUBLIC_KNOWLEDGE_SOURCES.find((source) =>
    source.questions.some((question) => normalizeForMatching(question) === normalizedQuestion),
  ) ?? null;
}

function tokenDistance(left: string, right: string): number {
  if (left === right) return 0;
  if (Math.abs(left.length - right.length) > 1) return 2;
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i++) {
    const current = [i];
    for (let j = 1; j <= right.length; j++) current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + (left[i - 1] === right[j - 1] ? 0 : 1));
    previous = current;
  }
  return previous[right.length];
}

function meaningfulTokens(text: string): string[] {
  const canonicalToken = (token: string) => {
    const stemmed = stemToken(token);
    if (stemmed === 'arrang') return 'arrange';
    if (stemmed === 'nris') return 'nri';
    if (stemmed === 'abroad' || stemmed === 'country') return 'overseas';
    if (stemmed === 'requir' || stemmed === 'mandatory') return 'require';
    return stemmed;
  };
  return (normalizeText(text).match(/[a-z0-9]+/g) ?? []).map(canonicalToken).filter((token) => token.length > 2 && !GENERIC_SEARCH_TOKENS.has(token) && token !== 'require');
}

function tokenMatchWeight(queryToken: string, candidateTokens: readonly string[]): number {
  if (candidateTokens.includes(queryToken)) return 1;
  if (queryToken.length >= 6 && candidateTokens.some((token) => token.length >= 6 && tokenDistance(queryToken, token) === 1)) return 0.72;
  return 0;
}

function scoreCandidate(query: string, candidate: string, keywords: readonly string[] = [], allowUnknownCandidateIntent = false): number {
  const normalizedQuery = normalizeForMatching(query);
  const normalizedCandidate = normalizeForMatching(candidate);
  if (normalizedQuery === normalizedCandidate) return 10000;

  const queryTokens = [...new Set(meaningfulTokens(normalizedQuery))];
  const candidateTokens = [...new Set(meaningfulTokens(`${normalizedCandidate} ${keywords.join(' ')}`))];
  if (queryTokens.length === 0) return 0;
  const weights = queryTokens.map((token) => tokenMatchWeight(token, candidateTokens));
  const overlap = weights.filter((weight) => weight > 0).length;
  const coverage = weights.reduce((sum, weight) => sum + weight, 0) / queryTokens.length;
  if (overlap === 0) return 0;

  const queryIntents = detectSearchIntents(normalizedQuery);
  const candidateIntents = detectSearchIntents(normalizedCandidate);
  const sharedIntents = [...queryIntents].filter((intent) => candidateIntents.has(intent));
  if (queryIntents.size > 0 && candidateIntents.size > 0 && sharedIntents.length === 0) return 0;
  if (queryIntents.size > 0 && candidateIntents.size === 0 && !allowUnknownCandidateIntent) return 0;
  const requiredIntentMatch: readonly SearchIntent[] = ['comparison', 'eligibility', 'timing', 'delivery', 'pricing', 'booking', 'tracking', 'registration'];
  if (requiredIntentMatch.some((intent) => queryIntents.has(intent) && !candidateIntents.has(intent))) return 0;

  const compoundDomains = [
    /\b(?:vahi|bahi|panji|ledger)\b/i, /\b(?:travel|hotel|pilgrimage)\b/i,
    /\b(?:pind|shraddh|tarpan|ritual|puja|rite)\b/i, /\b(?:partner|purohit|pandit|priest)\b/i,
  ].filter((pattern) => pattern.test(normalizedQuery));
  if (compoundDomains.length > 1 && !compoundDomains.every((pattern) => pattern.test(normalizedCandidate))) return 0;
  if (queryIntents.has('eligibility') && coverage < 0.95) return 0;

  const threshold = queryTokens.length === 1 ? 1 : 0.66;
  if (coverage < threshold && overlap < 3) return 0;
  return coverage * 100 + sharedIntents.length * 24 + overlap * 5 + (normalizedCandidate.includes(normalizedQuery) ? 40 : 0);
}

export function rankApprovedQuestions<T extends Pick<AIOptionPrompt, 'label'>>(query: string, candidates: readonly T[]): T | null {
  const ranked = candidates.map((candidate, index) => ({ candidate, index, score: scoreCandidate(query, candidate.label) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.index - right.index);
  if (!ranked.length) return null;
  if (ranked[0].score < 66) return null;
  return ranked[0].candidate;
}

export function findExactApprovedQuestion<T extends Pick<AIOptionPrompt, 'label'>>(query: string, candidates: readonly T[]): T | null {
  const normalizedQuery = normalizeForMatching(query);
  for (const candidate of candidates) {
    if (normalizeForMatching(candidate.label) === normalizedQuery) return candidate;
  }
  return null;
}

export type FounderKnowledgeMatch = {
  record: FounderKnowledgeRecord;
  provenance: { source: 'FOUNDER_PROVIDED_QA_DATABASE'; excelId: string; sourcePath: string };
};

export type UnderstoodPublicQuestion = { normalized: string; subjects: string[]; intents: string[]; points: string[]; requiresClarification: boolean };

const SUBJECT_PATTERNS: readonly [string, RegExp][] = [
  ['pitru-moksha-gaya', /\b(?:pind|shraddh|tarpan|ancestor|gaya|pitru|asthi)\b/i],
  ['ritual-services', /\b(?:ritual|puja|pooja|havan|sankalp|sampradaya|gotra|priest|pandit)\b/i],
  ['travel-assistance', /\b(?:travel|hotel|airport|station|transport|wheelchair|pilgrimage|darshan)\b/i],
  ['vahi-records', /\b(?:vahi|bahi|panji|ledger|genealog|lineage|family\s+tree)\b/i],
  ['religious-partners', /\b(?:religious\s+partner|purohit|panda|acharya|priest|pandit)\b/i],
  ['booking', /\b(?:book|booking|price|payment|quotation|refund|invoice)\b/i],
  ['support', /\b(?:complaint|grievance|inquiry|support|tracking|reference\s+id)\b/i],
] as const;

export function understandPublicQuestion(query: string): UnderstoodPublicQuestion {
  const normalized = normalizeForMatching(query);
  const subjects = SUBJECT_PATTERNS.filter(([, pattern]) => pattern.test(normalized)).map(([subject]) => subject);
  const intents = [...detectSearchIntents(normalized)];
  const points = query.split(/\?+|\b(?:and\s+(?=(?:how|what|when|where|who|can|is|are|do|does)\b))|;/i).map((part) => part.trim()).filter(Boolean);
  const meaningful = meaningfulTokens(normalized);
  return { normalized, subjects, intents, points: points.length ? points : [query.trim()], requiresClarification: normalized.split(/\s+/).filter(Boolean).length === 1 || (meaningful.length < 2 && intents.length === 0) };
}

export function findExactFounderQuestion(query: string): FounderKnowledgeMatch | null {
  const normalized = normalizeForMatching(query);
  const record = APPROVED_FOUNDER_KNOWLEDGE.find((candidate) => normalizeForMatching(candidate.question) === normalized);
  return record ? { record, provenance: { source: record.source, excelId: record.excelId, sourcePath: record.sourcePath } } : null;
}

export function findFounderKnowledge(query: string, pageContext?: BusinessCategory): FounderKnowledgeMatch | null {
  const exact = findExactFounderQuestion(query);
  if (exact) return exact;
  const understood = understandPublicQuestion(query);
  if (understood.requiresClarification) return null;
  const ranked = APPROVED_FOUNDER_KNOWLEDGE.map((record, index) => ({
    record, index, score: scoreCandidate(query, record.question) + (pageContext === record.category && understood.subjects.length === 0 ? 4 : 0),
  })).filter((entry) => entry.score >= 78).sort((left, right) => right.score - left.score || left.index - right.index);
  if (!ranked.length || (ranked[1] && ranked[0].score < 10000 && ranked[0].score - ranked[1].score < 12)) return null;
  const record = ranked[0].record;
  return { record, provenance: { source: record.source, excelId: record.excelId, sourcePath: record.sourcePath } };
}

export function isReliableQuestionMatch(query: string, candidateQuestion: string, keywords: readonly string[] = []): boolean {
  return scoreCandidate(query, candidateQuestion, keywords) > 0;
}

export function isReliablyRelatedQuestion(query: string, candidateQuestion: string): boolean {
  const queryTokens = [...new Set(meaningfulTokens(query))];
  const candidateTokens = [...new Set(meaningfulTokens(candidateQuestion))];
  if (!queryTokens.length) return false;
  const overlap = queryTokens.filter((token) => tokenMatchWeight(token, candidateTokens) > 0).length;
  return overlap >= 2 || (queryTokens.length === 1 && overlap === 1);
}

const SEARCH_CACHE = new Map<string, {
  matchedPublicSources: PublicKnowledgeSource[];
  matchedArticles: KnowledgeArticle[];
  matchedFAQs: KnowledgeFAQ[];
  matchedRoutes: NavigationRoute[];
  suggestedAnswer?: string;
  categoryMatch?: BusinessCategory;
}>();

export function searchKnowledgeCenter(query: string): {
  matchedPublicSources: PublicKnowledgeSource[];
  matchedArticles: KnowledgeArticle[];
  matchedFAQs: KnowledgeFAQ[];
  matchedRoutes: NavigationRoute[];
  suggestedAnswer?: string;
  categoryMatch?: BusinessCategory;
} {
  const normalized = query.toLowerCase().trim();
  if (!normalized) {
    return { matchedPublicSources: [], matchedArticles: [], matchedFAQs: [], matchedRoutes: [] };
  }

  if (SEARCH_CACHE.has(normalized)) {
    return SEARCH_CACHE.get(normalized)!;
  }

  const meaningfulQueryTokens = meaningfulTokens(normalized);
  const queryIntents = detectSearchIntents(normalized);
  if (meaningfulQueryTokens.length <= 1 && queryIntents.size === 0) {
    return { matchedPublicSources: [], matchedArticles: [], matchedFAQs: [], matchedRoutes: [] };
  }

  const matchedPublicSource = findApprovedPublicKnowledge(query);
  const matchedPublicSources = matchedPublicSource ? [matchedPublicSource] : [];

  const isNavQuery = queryIntents.has('navigation');
  const matchedRoutes = isNavQuery ? SITE_NAVIGATION_MAP
    .map((route, index) => ({ route, index, score: scoreCandidate(normalized, `${route.label} ${route.description}`, [], true) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .map((entry) => entry.route) : [];

  const matchedFAQs = APPROVED_KNOWLEDGE_FAQS
    .map((faq, index) => ({ faq, index, score: scoreCandidate(normalized, faq.question, faq.keywords) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .map((entry) => entry.faq);

  const articleEligible = !queryIntents.has('comparison') && !queryIntents.has('identity') && !queryIntents.has('eligibility') && !queryIntents.has('pricing')
    && queryIntents.size > 0;
  const matchedArticles = articleEligible ? APPROVED_KNOWLEDGE_ARTICLES
    .map((article, index) => ({ article, index, score: scoreCandidate(normalized, `${article.categoryTitle} ${article.title}`, [...article.keywords, ...article.synonyms], true) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .map((entry) => entry.article) : [];

  let suggestedAnswer: string | undefined;
  let categoryMatch: BusinessCategory | undefined;

  if (matchedPublicSources.length > 0) {
    suggestedAnswer = matchedPublicSources[0].approvedContent;
    categoryMatch = matchedPublicSources[0].category;
  } else if (matchedRoutes.length > 0 && isNavQuery) {
    suggestedAnswer = `${matchedRoutes[0].label}: ${matchedRoutes[0].description}`;
    categoryMatch = 'company-info';
  } else if (matchedFAQs.length > 0) {
    suggestedAnswer = `${matchedFAQs[0].answer}`;
    categoryMatch = matchedFAQs[0].category;
  } else if (matchedArticles.length > 0) {
    suggestedAnswer = `${matchedArticles[0].title}: ${matchedArticles[0].summary}`;
    categoryMatch = matchedArticles[0].category;
  }

  const res = {
    matchedPublicSources,
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
    const fetchPublished = async (path: string) => {
      const response = await fetch(`${API_BASE_URL}${path}`);
      if (!response.ok) {
        throw new Error(`Knowledge sync request failed with HTTP ${response.status}.`);
      }
      return response.json();
    };

    const resArticles = await fetchPublished('/api/governance/articles/published');
    const resFAQs = await fetchPublished('/api/governance/faqs/published');

    if (resArticles.success && Array.isArray(resArticles.articles) && resArticles.articles.length > 0) {
      // Clear cache as index changed
      SEARCH_CACHE.clear();
      APPROVED_KNOWLEDGE_ARTICLES.length = 0;
      APPROVED_KNOWLEDGE_ARTICLES.push(...resArticles.articles);
    }
    if (resFAQs.success && Array.isArray(resFAQs.faqs) && resFAQs.faqs.length > 0) {
      SEARCH_CACHE.clear();
      APPROVED_KNOWLEDGE_FAQS.length = 0;
      APPROVED_KNOWLEDGE_FAQS.push(...resFAQs.faqs);
    }
    return true;
  } catch (err) {
    console.error('Failed to sync knowledge from backend:', err);
    return false;
  }
}


