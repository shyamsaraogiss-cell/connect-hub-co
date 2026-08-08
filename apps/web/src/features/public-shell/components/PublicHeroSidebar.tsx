'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { KHEM_EXACT_SIDEBAR_HIERARCHY } from '@/config/khem-navigation.config';
import styles from '../PublicHeroShell.module.css';

export function PublicHeroSidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

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
        {KHEM_EXACT_SIDEBAR_HIERARCHY.map((item, index) => {
          const icon = item.icon;
          const itemPath = item.href.split('?')[0];
          const active = itemPath === '/' ? path === '/' : path === itemPath || path.startsWith(`${itemPath}/`);

          const isChild = item.isChild;
          const isDividerAfter = item.isDividerAfter;

          return (
            <div
              className={`${isDividerAfter ? styles.spacedItem : ''} ${isChild ? 'pl-4' : ''}`}
              key={`${item.label}-${index}`}
            >
              <Link
                className={`${isChild ? '!min-h-[38px] !py-1 text-xs text-[var(--warm-ivory)] font-medium' : ''} ${active ? styles.activeLink : ''}`}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                <span aria-hidden="true">{icon}</span>
                <span className={styles.linkLabel}>{item.label}</span>
              </Link>
            </div>
          );
        })}
      </nav>
    </>
  );
}
