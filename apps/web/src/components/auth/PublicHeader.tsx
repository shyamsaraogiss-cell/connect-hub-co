"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["PitruMoksha Gaya", "/pitru-moksha-gaya"],
  ["Travel", "/travel-assistance"],
  ["GenZ AI", "/zen-g"],
  ["Contact", "/contact"],
] as const;

export function HeaderMailIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function PublicHeader() {
  const path = usePathname();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("EN-IN");

  const show =
    !path.startsWith("/admin") &&
    !path.startsWith("/dashboard") &&
    path !== "/login" &&
    path !== "/register" &&
    !path.includes("/requests");

  if (!show) return null;

  return (
    <header className="sticky top-0 z-50 min-h-[96px] border-b border-[var(--border-soft)] bg-[linear-gradient(180deg,var(--shell-peacock-top)_0%,var(--shell-peacock)_55%,var(--shell-peacock-bottom)_100%)] text-[var(--text-on-peacock)] shadow-[0_4px_18px_rgba(8,127,140,0.28)]">
      <nav
        className="mx-auto max-w-[1500px] px-3 py-2"
        aria-label="Primary navigation"
      >
        <div className="flex min-h-[78px] items-center gap-3">
          {/* BRAND */}
          <Link
            className="mr-auto flex items-center gap-3 rounded-md px-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ritual-gold)]"
            href="/"
            onClick={() => setOpen(false)}
            aria-label="Connect Hub Co. — The Authentic Ancestral Rites — home"
          >
            <Image
              src="/images/brand/golden-lotus-mark.svg"
              alt="Golden Lotus Logo"
              width={60}
              height={50}
              priority
              className="h-[50px] w-[60px] shrink-0"
            />

            <div>
              <strong className="block font-serif text-[28px] leading-tight xl:text-[31px]">
                Connect Hub Co.
              </strong>

              <small className="mt-1 block text-[12px] leading-snug text-[var(--gold-bright)] xl:text-[13px]">
                The Authentic Ancestral Rites | Verified Lineage | Vedic Precision
              </small>
            </div>
          </Link>

          {/* DESKTOP HEADER CONTROLS */}
          <div className="hidden items-center gap-2 self-end mb-[2px] lg:flex">
            {/* MAIL */}
            <Link
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-sky-300 bg-sky-500/15 text-sky-200 shadow-sm transition-[transform,background-color,color,box-shadow] hover:bg-sky-500/25 hover:text-white active:translate-y-px active:scale-95 active:shadow-inner focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              href="/contact?topic=inquiry"
              title="Raise Inquiry"
            >
              <HeaderMailIcon className="h-[18px] w-[18px]" />
            </Link>

            {/* WHATSAPP */}
            <Link
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#25D366] bg-[#25D366]/15 text-[#5BE58B] shadow-sm transition-[transform,background-color,color,box-shadow] hover:bg-[#25D366]/25 hover:text-white active:translate-y-px active:scale-95 active:shadow-inner focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5BE58B]"
              href="/contact"
              title="Contact options"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
            </Link>

            {/* LANGUAGE */}
            <div className="relative flex h-7 items-center rounded-lg border border-[var(--ritual-gold)] bg-transparent px-2 text-[13px] font-semibold text-[var(--ritual-gold)] transition-colors hover:bg-white/10">
              <span aria-hidden="true" className="mr-1">
                🌐</span>

              <select
                aria-label="Select language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="cursor-pointer appearance-none bg-transparent pr-4 font-semibold text-[var(--ritual-gold)] outline-none"
              >
                <option value="EN-IN" className="text-black">
                  EN-IN
                </option>

                <option value="HI-IN" className="text-black">
                  हिन्दी</option>

                <option value="EN" className="text-black">
                  English
                </option>
              </select>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-2"
              >
                ▾</span>
            </div>

            {/* LOGIN / SIGN UP */}
            <Link
              className="inline-flex h-7 items-center justify-center rounded-lg border border-[var(--ritual-gold)] bg-transparent px-3 text-[13px] font-semibold text-[var(--ritual-gold)] transition-[transform,background-color,box-shadow] hover:bg-white/10 active:translate-y-px active:scale-[0.97] active:shadow-inner focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-bright)]"
              href={user ? "/dashboard" : "/login"}
            >
              {user ? "Dashboard" : "Login / Sign Up"}
            </Link>

            {/* BOOK NOW */}
            <Link
              className="inline-flex h-7 items-center justify-center gap-1.5 rounded-lg bg-[var(--ritual-gold)] px-3 text-[13px] font-semibold text-[var(--royal-navy)] transition-[transform,filter,box-shadow] hover:brightness-105 active:translate-y-px active:scale-[0.97] active:shadow-inner focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-bright)]"
              href="/services"
            >
              <span aria-hidden="true">📅</span>
              <span>Book Now</span>
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="rounded-lg border border-white/70 px-3 py-2 lg:hidden"
            type="button"
            aria-expanded={open}
            aria-controls="public-mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open ? (
          <div
            id="public-mobile-menu"
            className="mt-2 grid gap-1 border-t border-white/25 bg-[var(--shell-peacock)] pt-3 lg:hidden"
          >
            {links.map(([label, href]) => (
              <Link
                className="rounded-lg px-3 py-2 hover:bg-white/15 focus:bg-white/15"
                href={href}
                key={href}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}

            <Link
              className="rounded-lg px-3 py-2 hover:bg-white/15"
              href="/contact"
              onClick={() => setOpen(false)}
            >
              Contact options
            </Link>

            <Link
              className="mt-1 rounded-lg bg-[var(--ritual-gold)] px-3 py-2 font-semibold text-[var(--royal-navy)] transition-[transform,box-shadow] active:translate-y-px active:scale-[0.99] active:shadow-inner focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-bright)]"
              href={user ? "/dashboard" : "/login"}
              onClick={() => setOpen(false)}
            >
              {user ? "Dashboard" : "Login / Sign Up"}
            </Link>

            <Link
              className="rounded-lg bg-[var(--ritual-gold)] px-3 py-2 font-semibold text-[var(--royal-navy)] transition-[transform,box-shadow] active:translate-y-px active:scale-[0.99] active:shadow-inner focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold-bright)]"
              href="/services"
              onClick={() => setOpen(false)}
            >
              ?? Book Now
            </Link>
          </div>
        ) : null}
      </nav>
    </header>
  );
}




