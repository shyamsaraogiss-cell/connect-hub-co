/**
 * CONNECT HUB CO. â€” KHEM NAVIGATION & VISUAL SHELL PROTECTED SOURCE OF TRUTH
 * 
 * LOCKED COMPONENT & NAVIGATION CONFIGURATION
 * DO NOT MODIFY WITHOUT EXPLICIT FOUNDER APPROVAL.
 */

export interface NavigationLink {
  readonly label: string;
  readonly href: string;
}

export interface SidebarGroup {
  readonly title: string;
  readonly links: readonly (readonly [string, string, string])[];
}

export interface VisualShellLock {
  readonly componentName: string;
  readonly isLocked: boolean;
  readonly category: string;
}

/**
 * 1. LOCKED PUBLIC NAVIGATION LINKS
 */
export const KHEM_PUBLIC_NAVIGATION: readonly (readonly [string, string])[] = Object.freeze([
  ['About Us', '/about'],
  ['Services', '/services'],
  ['PitruMoksha Gaya', '/pitru-moksha-gaya'],
  ['Travel', '/travel-assistance'],
  ['Knowledge Hub', '/knowledge-center'],
  ['Ask GenZ AI', '/zen-g'],
  ['Support', '/contact?topic=human-support'],
  ['Contact Us', '/contact'],
]);

/**
 * 2. LOCKED INTERNAL ERP NAVIGATION LINKS
 */
export const KHEM_INTERNAL_NAVIGATION: readonly (readonly [string, string])[] = Object.freeze([
  ['Dashboard', '/dashboard'],
  ['Verified Priests', '/partners'],
  ['Customers', '/customers'],
  ['Bookings', '/bookings'],
  ['Services', '/admin/services'],
  ['Categories', '/admin/service-categories'],
  ['Pitru Requests', '/pitru-moksha/requests'],
  ['Travel Requests', '/travel-assistance/requests'],
]);

export interface SidebarItem {
  readonly label: string;
  readonly href: string;
  readonly icon?: string;
  readonly isChild?: boolean;
  readonly isDividerAfter?: boolean;
}

/**
 * 3. LOCKED EXACT SIDEBAR HIERARCHY
 * Strictly contains no category headings or generic Services/Support.
 */
const PRE_RECOVERY_SIDEBAR_HIERARCHY: readonly SidebarItem[] = Object.freeze([
  { label: 'Ask GenZ AI', href: '/zen-g', icon: 'ðŸ¤–' },
  { label: 'PitruMoksha Gaya', href: '/pitru-moksha-gaya', icon: 'ðŸª”' },
  { label: 'Online Services', href: '/pitru-moksha-gaya/online', icon: 'ðŸŒ', isChild: true },
  { label: 'Offline Services', href: '/pitru-moksha-gaya/offline', icon: 'ðŸ“', isChild: true },
  { label: 'Ritual Services', href: '/ritual-services', icon: '✨' },
  { label: 'Online Ritual Services', href: '/ritual-services/online', icon: 'ðŸ’»', isChild: true },
  { label: 'Offline Ritual Services', href: '/ritual-services/offline', icon: 'ðŸ›ï¸', isChild: true },
  { label: 'Travel Assistance', href: '/travel-assistance', icon: 'ðŸš—' },
  { label: 'Vahi Records', href: '/vahi-records', icon: 'ðŸ“œ' },
  { label: 'Priest Registration', href: '/religious-partners', icon: 'ðŸ¤', isDividerAfter: true },
  { label: 'WhatsApp', href: '/contact?channel=whatsapp', icon: 'ðŸ’¬' },
  { label: 'Mail / Raise Inquiry', href: '/contact?topic=inquiry', icon: '✉️' },
  { label: 'Knowledge Center', href: '/knowledge-center', icon: 'ðŸ“š' },
]);

const recoveredSidebarItems = PRE_RECOVERY_SIDEBAR_HIERARCHY.filter(
  (item) => item.label !== 'Ask GenZ AI' && item.label !== 'WhatsApp',
);
const partnerIndex = recoveredSidebarItems.findIndex((item) => item.label === 'Priest Registration');

export const KHEM_EXACT_SIDEBAR_HIERARCHY: readonly SidebarItem[] = Object.freeze([
  { label: 'Home', href: '/', icon: '⌂' },
  ...recoveredSidebarItems.slice(0, partnerIndex + 1),
  { label: 'Ask GenZ AI', href: '/zen-g', icon: 'ðŸ¤–' },
  ...recoveredSidebarItems.slice(partnerIndex + 1),
]);

export const KHEM_SIDEBAR_GROUPS = KHEM_EXACT_SIDEBAR_HIERARCHY;

export interface FooterColumn {
  readonly title: string;
  readonly links: readonly (readonly [string, string])[];
}

/**
 * 4. LOCKED APPROVED FOUR-COLUMN FOOTER NAVIGATION
 */
export const KHEM_FOOTER_NAVIGATION: readonly FooterColumn[] = Object.freeze([
  {
    title: 'OUR SERVICES',
    links: [
      ['PitruMoksha Gaya', '/pitru-moksha-gaya'] as const,
      ['Ritual Services', '/ritual-services'] as const,
      ['Travel Assistance', '/travel-assistance'] as const,
      ['Vahi Records', '/vahi-records'] as const,
    ],
  },
  {
    title: 'QUICK LINKS',
    links: [
      ['Track Service Request', '/tracking?type=service'] as const,
      ['Priest Registration', '/religious-partners/register'] as const,
    ],
  },
  {
    title: 'COMPANY',
    links: [
      ['About Us', '/about'] as const,
      ['Contact Us', '/contact'] as const,
      ['Policies & Legal Terms', '/policies-legal-terms'] as const,
      ['Refund Policy', '/refund-policy'] as const,
    ],
  },
  {
    title: 'SUPPORT',
    links: [
      ['Complaint', '/complaint'] as const,
      ['Grievance', '/grievance'] as const,
      ['Founder Support', '/founder-support'] as const,
      ['AI Help', '/zen-g'] as const,
    ],
  },
]);


/**
 * 4. LOCKED VISUAL SHELL COMPONENT REGISTRY & COLOR TOKENS
 */
export const KHEM_VISUAL_SHELL_TOKENS = Object.freeze({
  peacockBluePrimary: '#087F8C',
  peacockBlueLight: '#1599A6',
  sacredGoldSecondary: '#D4AF37',
  sacredGoldHex: '#F4B942',
  sacredGoldAccent: '#9a3412',
  sacredGoldDark: '#7c2d12',
  tealDivider: '#055B66',
  operationalSidebarBg: '#201a17',
  sacredBackground: '#fffdf8',
});

export const KHEM_LOCKED_SHELL_COMPONENTS: readonly VisualShellLock[] = Object.freeze([
  { componentName: 'Header', isLocked: true, category: 'Outer Shell (Global Navigation)' },
  { componentName: 'Sidebar', isLocked: true, category: 'Outer Shell (Global Navigation)' },
  { componentName: 'Footer', isLocked: true, category: 'Outer Shell & Footer (Universal Layout)' },
  { componentName: 'Hero framework', isLocked: true, category: 'Inner Shell & Master Framework' },
  { componentName: 'Approved Hero Masters', isLocked: true, category: 'Content Masters' },
  { componentName: 'Peacock Blue and Sacred Gold design system', isLocked: true, category: 'Design Tokens' },
  { componentName: 'Logo System (Logo TWO & Logo THREE)', isLocked: true, category: 'Brand Assets & Logo Governance' },
  { componentName: 'AI Panel shell', isLocked: false, category: 'Ask GenZ AI Ecosystem (PENDING FOUNDER ALIGNMENT)' },
]);

export const KHEM_BRAND_TAGLINE = 'The Authentic Ancestral Rites | Verified Lineage | Vedic Precision';
export const KHEM_NAVIGATION_LOCK_SEAL = 'KHEM_FOUNDER_LOCK_SEAL_2026_PHASE_6A1';

/**
 * 5. KHEM CHANGE REQUEST LOCK v1.0 â€” ARCHITECTURE RULES
 */
export const KHEM_ARCHITECTURE_LOCK_V1 = Object.freeze({
  rule1_sharedFooterSystem: 'Universal Shared Footer across all Heroes and business pages with 2-line Connect Hub Co. branding and Request Updates block.',
  rule2_sidebarPrimaryNav: 'Sidebar is the permanent, fixed Primary Navigation for all 9 primary service modules.',
  rule3_breadcrumbSecondaryNav: 'Breadcrumb is for location awareness only. Must always start with "Connect Hub Co." (linking to "/"), never "Home".',
  rule4_navigationResponsibilities: 'Header = Brand & Global actions; Sidebar = Primary nav; Breadcrumb = Location awareness; Footer = Corporate/Support/Policies.',
  rule5_protectionLock: 'KHEM ARCHITECTURE LOCK v1.0. Future changes require explicit Unlock -> Modify -> Founder Review -> Approval -> Re-freeze.',
});

/**
 * 6. HERO 1 FOUNDER-APPROVED CORE SERVICES (10 TILES WITH UNIQUE SACRED ICONS)
 */
export interface CoreServiceItem {
  readonly label: string;
  readonly icon: string;
}

const PREVIOUS_HERO_ONE_CORE_SERVICES: readonly CoreServiceItem[] = Object.freeze([
  { label: 'Pitra Aatma Shanti', icon: '🪔' },
  { label: 'Unnatural Death Shanti', icon: '🔱' },
  { label: 'Pitra Dosh Shanti', icon: '☀️' },
  { label: 'Platinum (Bespoke) Services', icon: '◆' },
  { label: 'Live Ritual Participation', icon: '📡' },
  { label: 'Virtual Shraddh & Tarpan', icon: '🏺' },
  { label: 'Proxy Ritual Assistance', icon: '🤝' },
  { label: 'Prasad Dispatch', icon: '📦' },
  { label: 'Completion Documentation', icon: '📜' },
  { label: 'Family & Elder Safety Support', icon: '🛡️' },
]);
void PREVIOUS_HERO_ONE_CORE_SERVICES;

export const HERO_ONE_CORE_SERVICES: readonly CoreServiceItem[] = Object.freeze([
  { label: 'Pitra Aatma Shanti', icon: '🪔' },
  { label: 'Unnatural Death Shanti', icon: '🔱' },
  { label: 'Pitra Dosh Shanti', icon: '☀️' },
  { label: 'Platinum (Bespoke) Services', icon: '◆' },
  { label: 'Live Ritual Participation', icon: '📡' },
  { label: 'Virtual Shraddh & Tarpan', icon: '🏺' },
  { label: 'Proxy Ritual Assistance', icon: '🤝' },
  { label: 'Prasad Dispatch', icon: '📦' },
  { label: 'Completion Documentation', icon: '📜' },
  { label: 'Family & Elder Safety Support', icon: '🛡️' },
]);


