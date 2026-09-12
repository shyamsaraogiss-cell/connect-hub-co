"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useServicesDrawer } from "@/components/auth/ServicesDrawerContext";
import { ROUTES } from "@/config/navigation";
import styles from "./PublicHeader.module.css";

export function HeaderMailIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ServicesChevron({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const centerLinks = [["About", "/about"]] as const;

export function PublicHeader() {
  const path = usePathname();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { open: servicesOpen, toggleDrawer } = useServicesDrawer();

  const show =
    !path.startsWith("/admin") &&
    !path.startsWith("/dashboard") &&
    path !== "/login" &&
    path !== "/register" &&
    !path.includes("/requests");

  if (!show) return null;

  const loginHref = user ? ROUTES.DASHBOARD : ROUTES.LOGIN;
  const loginLabel = user ? "Dashboard" : "Login";

  return (
    <header className={styles.header}>
      <nav className={styles.bar} aria-label="Primary navigation">
        <Link
          className={styles.brand}
          href={ROUTES.HOME}
          onClick={() => setOpen(false)}
          aria-label="Connect Hub Co. home"
        >
          <Image
            src="/images/brand/golden-lotus-mark.svg"
            alt=""
            width={34}
            height={28}
            priority
            className={styles.brandMark}
          />
          <span className={styles.brandName}>Connect Hub Co.</span>
        </Link>

        <div className={styles.navCluster}>
          <button
            type="button"
            className={`${styles.link} ${servicesOpen ? styles.linkActive : ""}`}
            aria-expanded={servicesOpen}
            aria-controls="public-services-drawer"
            aria-label={servicesOpen ? "Close services menu" : "Open services menu"}
            onClick={toggleDrawer}
          >
            Services
            <ServicesChevron className={styles.chevron} />
          </button>

          {centerLinks.map(([label, href]) => {
            const active = path === href || path.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={`${styles.link} ${active ? styles.linkActive : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className={styles.actions}>
          <Link href={loginHref} className={styles.pillSoft}>
            {loginLabel}
          </Link>
          <Link href={ROUTES.INQUIRY} className={styles.pillPrimary}>
            Talk to a coordinator
          </Link>
        </div>

        <div className={styles.mobileActions}>
          <button
            type="button"
            className={`${styles.link} ${servicesOpen ? styles.linkActive : ""}`}
            aria-expanded={servicesOpen}
            aria-controls="public-services-drawer"
            onClick={toggleDrawer}
          >
            Services
            <ServicesChevron className={styles.chevron} />
          </button>
          <button
            type="button"
            className={styles.pillSoft}
            aria-expanded={open}
            aria-controls="public-mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="public-mobile-menu" className={styles.menuPanel}>
          {centerLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={styles.menuLink}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className={styles.menuCtas}>
            <Link href={loginHref} className={styles.pillSoft} onClick={() => setOpen(false)}>
              {loginLabel}
            </Link>
            <Link href={ROUTES.INQUIRY} className={styles.pillPrimary} onClick={() => setOpen(false)}>
              Talk to a coordinator
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
