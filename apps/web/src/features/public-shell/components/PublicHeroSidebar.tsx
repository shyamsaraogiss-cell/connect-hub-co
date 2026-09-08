'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from '../PublicHeroShell.module.css';

// SVG Icons matching the PNG Design Specification
const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 10 12 3l9 7" fill="none" stroke="#FFD76A" strokeWidth="2" strokeLinecap="round"/>
    <path d="M5 9v11h14V9" fill="#C96D2D" stroke="#F4B942" strokeWidth="1.3"/>
    <path d="M10 20v-6h4v6" fill="#6E351D"/>
    <circle cx="12" cy="8" r="1.5" fill="#FFE49A"/>
  </svg>
);

export const MulticolourAiBrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    {/* luminous multicolour AI orbit */}
    <ellipse
      cx="12" cy="12" rx="9" ry="4.2"
      fill="none" stroke="#25D9FF" strokeWidth="2"
      transform="rotate(28 12 12)"
    />
    <ellipse
      cx="12" cy="12" rx="9" ry="4.2"
      fill="none" stroke="#F238D5" strokeWidth="2"
      transform="rotate(-28 12 12)"
    />
    <ellipse
      cx="12" cy="12" rx="8.5" ry="4"
      fill="none" stroke="#FFD447" strokeWidth="1.4"
      transform="rotate(90 12 12)"
    />

    {/* intelligence spark */}
    <path
      d="M12 5.2 13.6 10.4 18.8 12 13.6 13.6 12 18.8 10.4 13.6 5.2 12 10.4 10.4Z"
      fill="#FFD447"
      stroke="#FFF3A6"
      strokeWidth=".7"
    />

    {/* orbit nodes */}
    <circle cx="5.1" cy="8.1" r="1.45" fill="#20E5FF" stroke="#E8FFFF" strokeWidth=".5"/>
    <circle cx="18.8" cy="7.8" r="1.45" fill="#B94CFF" stroke="#F6DFFF" strokeWidth=".5"/>
    <circle cx="6.2" cy="17.1" r="1.35" fill="#FF3CB7" stroke="#FFE2F6" strokeWidth=".5"/>
    <circle cx="18" cy="17.2" r="1.35" fill="#FFB629" stroke="#FFF0B5" strokeWidth=".5"/>
  </svg>
);

export const DiyaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2c3 3.4 3.4 6.2 0 8.5-3.4-2.3-3-5.1 0-8.5Z" fill="#FFD54A" stroke="#FF8A24"/>
    <path d="M4 13c1 5 4 7 8 7s7-2 8-7H4Z" fill="#C96D2D" stroke="#F4B942" strokeWidth="1.3"/>
  </svg>
);

export const MandalaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" fill="#7B3FA1" stroke="#F4B942" strokeWidth="1.2"/>
    <path d="M12 4.5 14 9l4.5 3-4.5 3-2 4.5-2-4.5-4.5-3 4.5-3 2-4.5Z" fill="#E85D8A" stroke="#FFD76A"/>
    <circle cx="12" cy="12" r="2.2" fill="#FFD76A"/>
  </svg>
);

export const CompassIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="#166B78" stroke="#F4B942" strokeWidth="1.4"/>
    <circle cx="12" cy="12" r="6.5" fill="#103F51" stroke="#7DE7F2"/>
    <path d="m15.8 8.2-2.2 5.4-5.4 2.2 2.2-5.4 5.4-2.2Z" fill="#FF7043" stroke="#FFD76A"/>
  </svg>
);

export const ScrollQuillIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="tamrapatraCopper" x1="3" y1="3" x2="21" y2="21">
        <stop offset="0%" stopColor="#FFD76A"/>
        <stop offset="35%" stopColor="#C97A32"/>
        <stop offset="70%" stopColor="#8E451F"/>
        <stop offset="100%" stopColor="#F4B942"/>
      </linearGradient>
    </defs>

    <rect
      x="4"
      y="5"
      width="16"
      height="14"
      rx="2"
      fill="url(#tamrapatraCopper)"
      stroke="#FFD76A"
      strokeWidth="1"
    />

    <circle cx="6.5" cy="7.5" r="1" fill="#6E351D"/>
    <circle cx="17.5" cy="7.5" r="1" fill="#6E351D"/>

    <path
      d="M8 10h8M7 13h10M8 16h8"
      stroke="#5B2D1A"
      strokeWidth="1"
      strokeLinecap="round"
    />

    <path
      d="M5 6.5h14"
      stroke="#FFE49A"
      strokeWidth=".7"
      opacity=".8"
    />
  </svg>
);

export const PartnerUserPlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="8" cy="7" r="3" fill="#FFD76A"/>
    <circle cx="16" cy="7" r="3" fill="#65D6C4"/>
    <path d="M3 19c.5-4 2.5-6 5-6s4.5 2 5 6" fill="#C96D2D" stroke="#F4B942"/>
    <path d="M11 19c.5-4 2.5-6 5-6s4.5 2 5 6" fill="#167F89" stroke="#65D6C4"/>
  </svg>
);

export const QuestionCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="#A64B38" stroke="#FFD76A" strokeWidth="1.4"/>
    <path d="M9.5 9a2.7 2.7 0 1 1 4.5 2c-1.5 1.1-2 1.5-2 3" fill="none" stroke="#FFF4C7" strokeWidth="1.7" strokeLinecap="round"/>
    <circle cx="12" cy="17" r="1" fill="#FFD76A"/>
  </svg>
);

export const BookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 5h6c2 0 3 1 3 3v11c-1-1.5-2.5-2-4-2H3V5Z" fill="#2B72B8" stroke="#7DE7F2"/>
    <path d="M21 5h-6c-2 0-3 1-3 3v11c1-1.5 2.5-2 4-2h5V5Z" fill="#C96D2D" stroke="#F4B942"/>
    <path d="M12 7v12" stroke="#FFD76A"/>
  </svg>
);

export const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2 20 5v6c0 5.4-3.2 8.7-8 11-4.8-2.3-8-5.6-8-11V5l8-3Z" fill="#B86B2F" stroke="#FFD76A" strokeWidth="1.3"/>
    <path d="m8.5 11.5 2.2 2.2 4.8-5" fill="none" stroke="#FFF4C7" strokeWidth="1.7"/>
  </svg>
);

export const GlobeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="#167F89" stroke="#FFD76A" strokeWidth="1.3"/>
    <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" fill="none" stroke="#7DE7F2"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 22S5 16 5 10a7 7 0 1 1 14 0c0 6-7 12-7 12Z" fill="#C84B45" stroke="#FFD76A" strokeWidth="1.3"/>
    <circle cx="12" cy="10" r="2.5" fill="#FFF4C7"/>
  </svg>
);

export function PublicHeroSidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const getActiveMainTab = () => {
    if (!path) return '';
    const normPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;

    if (normPath === '/') return 'home';
    if (normPath === '/zen-g') return 'zen-g';
    if (normPath === '/pitru-moksha-gaya' || normPath.startsWith('/pitru-moksha-gaya/')) return 'pitru-moksha-gaya';
    if (normPath === '/ritual-services' || normPath.startsWith('/ritual-services/')) return 'ritual-services';
    if (normPath === '/travel-assistance' || normPath.startsWith('/travel-assistance/')) return 'travel-assistance';
    if (normPath === '/vahi-records' || normPath.startsWith('/vahi-records/')) return 'vahi-records';
    if (normPath === '/religious-partners' || normPath.startsWith('/religious-partners/')) return 'religious-partners';
    if (normPath === '/contact' || normPath.startsWith('/contact/')) return 'contact';
    if (normPath === '/knowledge-center' || normPath.startsWith('/knowledge-center/')) return 'knowledge-center';

    return '';
  };

  const activeMainTab = getActiveMainTab();

  const sidebarContent = (
    <>
      {/* Navigation Items */}
      <div className={styles.navContainer}>
        {/* Home */}
        <Link href="/" className={`${styles.navItem} ${activeMainTab === 'home' ? styles.activeItem : ''}`}>
          <span className={styles.navIcon}><HomeIcon /></span>
          <span className={styles.navLabel}>Home</span>
        </Link>

        {/* Ask GenZ AI */}
        <Link href="/zen-g" className={`${styles.navItem} ${activeMainTab === 'zen-g' ? styles.activeItem : ''}`}>
          <span className={styles.navIcon}><MulticolourAiBrainIcon /></span>
          <span className={styles.navLabel}>Ask GenZ AI</span>
        </Link>

        {/* PitruMoksha Gaya */}
        <div className={styles.groupWrapper}>
          <Link href="/pitru-moksha-gaya" className={`${styles.navItem} ${styles.mainLabelRow} ${activeMainTab === 'pitru-moksha-gaya' ? styles.activeItem : ''}`}>
            <span className={styles.navIcon}><DiyaIcon /></span>
            <span className={styles.navLabel}>PitruMoksha Gaya</span>
          </Link>
          <div className={`${styles.toggleRow} ${styles.subRow}`}>
            <Link href="/pitru-moksha-gaya/online" className={`${styles.toggleTab} ${path === '/pitru-moksha-gaya/online' ? styles.toggleTabActive : ''}`}>
              <GlobeIcon />
              <span>Virtual</span>
            </Link>
            <Link href="/pitru-moksha-gaya/offline" className={`${styles.toggleTab} ${path === '/pitru-moksha-gaya/offline' ? styles.toggleTabActive : ''}`}>
              <LocationIcon />
              <span>Offline</span>
            </Link>
          </div>
        </div>

        {/* Ritual Services */}
        <div className={styles.groupWrapper}>
          <Link href="/ritual-services" className={`${styles.navItem} ${styles.mainLabelRow} ${activeMainTab === 'ritual-services' ? styles.activeItem : ''}`}>
            <span className={styles.navIcon}><MandalaIcon /></span>
            <span className={styles.navLabel}>Ritual Services</span>
          </Link>
          <div className={`${styles.toggleRow} ${styles.subRow}`}>
            <Link href="/ritual-services/online" className={`${styles.toggleTab} ${path === '/ritual-services/online' ? styles.toggleTabActive : ''}`}>
              <GlobeIcon />
              <span>Virtual</span>
            </Link>
            <Link href="/ritual-services/offline" className={`${styles.toggleTab} ${path === '/ritual-services/offline' ? styles.toggleTabActive : ''}`}>
              <LocationIcon />
              <span>Offline</span>
            </Link>
          </div>
        </div>

        {/* Travel Assistance */}
        <Link href="/travel-assistance" className={`${styles.navItem} ${activeMainTab === 'travel-assistance' ? styles.activeItem : ''}`}>
          <span className={styles.navIcon}><CompassIcon /></span>
          <span className={styles.navLabel}>Travel Assistance</span>
        </Link>

        {/* Vahi Records */}
        <Link href="/vahi-records" className={`${styles.navItem} ${activeMainTab === 'vahi-records' ? styles.activeItem : ''}`}>
          <span className={styles.navIcon}><ScrollQuillIcon /></span>
          <span className={styles.navLabel}>Vahi Records</span>
        </Link>

        <div className={styles.sidebarDivider} aria-hidden="true" />

        {/* Religious Partner Registration */}
        <Link href="/religious-partners" className={`${styles.navItem} ${activeMainTab === 'religious-partners' ? styles.activeItem : ''}`}>
          <span className={styles.navIcon}><PartnerUserPlusIcon /></span>
          <span className={styles.navLabel}>Religious Partner Registration</span>
        </Link>

        {/* Mail / Raise Inquiry */}
        <Link href="/contact?topic=inquiry" className={`${styles.navItem} ${activeMainTab === 'contact' ? styles.activeItem : ''}`}>
          <span className={styles.navIcon}><QuestionCircleIcon /></span>
          <span className={styles.navLabel}>Raise Inquiry</span>
        </Link>

        {/* Knowledge Center */}
        <Link href="/knowledge-center" className={`${styles.navItem} ${activeMainTab === 'knowledge-center' ? styles.activeItem : ''}`}>
          <span className={styles.navIcon}><BookIcon /></span>
          <span className={styles.navLabel}>Knowledge Center</span>
        </Link>
      </div>

      {/* Footer Branding & Trust Block */}
      <div className={`${styles.brandFooter} ${styles.sidebarFooter}`}>
        {/* Diamond Separator */}
        <div className={styles.diamondSeparator}>
          <span className={styles.separatorLine}></span>
          <span className={styles.diamondSymbol}>✧</span>
          <span className={styles.separatorLine}></span>
        </div>
        <div className={`${styles.trustBadge} ${styles.trustBlock}`}>
          <ShieldIcon />
          <span>Trusted. Private. Sacred.</span>
        </div>
        <p className={styles.trustDescription}>We respect your faith and privacy.</p>
      </div>
    </>
  );

  return (
    <>
      <button
        className={styles.mobileTrigger}
        type="button"
        aria-expanded={open}
        aria-controls="public-hero-sidebar"
        onClick={() => setOpen((value) => !value)}
      >
        <span aria-hidden="true">â˜°</span>
        {open ? 'Close Explore menu' : 'Explore menu'}
      </button>
      {open ? (
        <button
          className={styles.backdrop}
          type="button"
          aria-label="Close Explore menu"
          onClick={() => setOpen(false)}
        />
      ) : null}
      <nav
        id="public-hero-sidebar"
        className={`${styles.sidebar} ${open ? styles.open : ''}`}
        aria-label="Explore Connect Hub Co"
      >
        <div className={styles.mobileHeading}>
          <strong>Explore</strong>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close Explore menu">
            Ã—
          </button>
        </div>
        {sidebarContent}
      </nav>
    </>
  );
}












