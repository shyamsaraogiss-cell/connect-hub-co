'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from '../PublicHeroShell.module.css';

// SVG Icons matching the PNG Design Specification
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const RobotIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="16" height="12" x="4" y="8" rx="2"/>
    <path d="M12 8V4H8"/>
    <path d="M2 14h2"/>
    <path d="M20 14h2"/>
    <path d="M15 13v2"/>
    <path d="M9 13v2"/>
  </svg>
);

const DiyaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3c1.5 3 3.5 4 3.5 6.5a3.5 3.5 0 0 1-7 0C8.5 7 10.5 4 12 3z"/>
    <path d="M3 14c0 4 3 6 9 6s9-2 9-6H3z"/>
  </svg>
);

const SparklesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const CarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
    <circle cx="7" cy="17" r="2"/>
    <path d="M9 17h6"/>
    <circle cx="17" cy="17" r="2"/>
  </svg>
);

const DocIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const PartnersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const BookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="m9 11 2 2 4-4"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const LaptopIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="12" x="3" y="4" rx="2" ry="2"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
    <line x1="12" y1="20" x2="12" y2="16"/>
  </svg>
);

const TempleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 2 10 7H2Z"/>
    <path d="M4 22V9h16v13H4Z"/>
    <path d="M9 22v-6a3 3 0 0 1 6 0v6"/>
  </svg>
);

export function PublicHeroSidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (targetPath: string) => {
    return targetPath === '/' ? path === '/' : path === targetPath || path.startsWith(`${targetPath}/`);
  };

  const sidebarContent = (
    <>
      {/* Navigation Items */}
      <div className={styles.navContainer}>
        {/* Home */}
        <Link href="/" className={`${styles.navItem} ${isActive('/') ? styles.activeItem : ''}`}>
          <span className={styles.navIcon}><HomeIcon /></span>
          <span className={styles.navLabel}>Home</span>
        </Link>

        {/* Ask GenZ AI */}
        <Link href="/zen-g" className={`${styles.navItem} ${isActive('/zen-g') ? styles.activeItem : ''}`}>
          <span className={styles.navIcon}><RobotIcon /></span>
          <span className={styles.navLabel}>Ask GenZ AI</span>
        </Link>

        {/* PitruMoksha Gaya */}
        <div className={styles.groupWrapper}>
          <Link href="/pitru-moksha-gaya" className={`${styles.navItem} ${isActive('/pitru-moksha-gaya') && !isActive('/pitru-moksha-gaya/online') && !isActive('/pitru-moksha-gaya/offline') ? styles.activeItem : ''}`}>
            <span className={styles.navIcon}><DiyaIcon /></span>
            <span className={styles.navLabel}>PitruMoksha Gaya</span>
          </Link>
          <div className={styles.toggleRow}>
            <Link href="/pitru-moksha-gaya/online" className={`${styles.toggleTab} ${isActive('/pitru-moksha-gaya/online') ? styles.toggleTabActive : ''}`}>
              <GlobeIcon />
              <span>Virtual</span>
            </Link>
            <Link href="/pitru-moksha-gaya/offline" className={`${styles.toggleTab} ${isActive('/pitru-moksha-gaya/offline') ? styles.toggleTabActive : ''}`}>
              <LocationIcon />
              <span>Offline</span>
            </Link>
          </div>
        </div>

        {/* Ritual Services */}
        <div className={styles.groupWrapper}>
          <Link href="/ritual-services" className={`${styles.navItem} ${isActive('/ritual-services') && !isActive('/ritual-services/online') && !isActive('/ritual-services/offline') ? styles.activeItem : ''}`}>
            <span className={styles.navIcon}><SparklesIcon /></span>
            <span className={styles.navLabel}>Ritual Services</span>
          </Link>
          <div className={styles.toggleRow}>
            <Link href="/ritual-services/online" className={`${styles.toggleTab} ${isActive('/ritual-services/online') ? styles.toggleTabActive : ''}`}>
              <LaptopIcon />
              <span>Virtual</span>
            </Link>
            <Link href="/ritual-services/offline" className={`${styles.toggleTab} ${isActive('/ritual-services/offline') ? styles.toggleTabActive : ''}`}>
              <TempleIcon />
              <span>Offline</span>
            </Link>
          </div>
        </div>

        {/* Travel Assistance */}
        <Link href="/travel-assistance" className={`${styles.navItem} ${isActive('/travel-assistance') ? styles.activeItem : ''}`}>
          <span className={styles.navIcon}><CarIcon /></span>
          <span className={styles.navLabel}>Travel Assistance</span>
        </Link>

        {/* Vahi Records */}
        <Link href="/vahi-records" className={`${styles.navItem} ${isActive('/vahi-records') ? styles.activeItem : ''}`}>
          <span className={styles.navIcon}><DocIcon /></span>
          <span className={styles.navLabel}>Vahi Records</span>
        </Link>

        {/* Religious Partner Registration */}
        <Link href="/religious-partners" className={`${styles.navItem} ${isActive('/religious-partners') ? styles.activeItem : ''}`}>
          <span className={styles.navIcon}><PartnersIcon /></span>
          <span className={styles.navLabel}>Religious Partner Registration</span>
        </Link>

        {/* Mail / Raise Inquiry */}
        <Link href="/contact?topic=inquiry" className={`${styles.navItem} ${isActive('/contact') ? styles.activeItem : ''}`}>
          <span className={styles.navIcon}><MailIcon /></span>
          <span className={styles.navLabel}>Raise Inquiry</span>
        </Link>

        {/* Knowledge Center */}
        <Link href="/knowledge-center" className={`${styles.navItem} ${isActive('/knowledge-center') ? styles.activeItem : ''}`}>
          <span className={styles.navIcon}><BookIcon /></span>
          <span className={styles.navLabel}>Knowledge Center</span>
        </Link>
      </div>

      {/* Footer Branding & Trust Block */}
      <div className={styles.brandFooter}>
        {/* Diamond Separator */}
        <div className={styles.diamondSeparator}>
          <span className={styles.separatorLine}></span>
          <span className={styles.diamondSymbol}>✧</span>
          <span className={styles.separatorLine}></span>
        </div>
        <div className={styles.trustBadge}>
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
        <span aria-hidden="true">☰</span>
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
            ×
          </button>
        </div>
        {sidebarContent}
      </nav>
    </>
  );
}
