"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { KHEM_PUBLIC_NAVIGATION, KHEM_INTERNAL_NAVIGATION, KHEM_BRAND_TAGLINE } from "@/config/khem-navigation.config";

const publicLinks = KHEM_PUBLIC_NAVIGATION;
const internalLinks = KHEM_INTERNAL_NAVIGATION;
export function BusinessHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const isPublic =
    ["/", "/about", "/contact", "/login", "/pitru-moksha", "/travel-assistance", "/services", "/zen-g"].includes(pathname) ||
    pathname.startsWith("/services/") ||
    pathname.endsWith("/success");

  const links = isPublic ? publicLinks : internalLinks;

  if (!isPublic && !user) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-[#fffdf8]/95 shadow-sm backdrop-blur">
      <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6" aria-label={isPublic ? "Main navigation" : "ERP navigation"}>
        <div className="flex items-center">
          {/* Brand Mark & Title Link to Homepage */}
          <div className="mr-auto flex items-center gap-3">
            <Link
              href={isPublic ? "/" : "/dashboard"}
              className="flex items-center gap-3 font-bold text-[#6f1d1b]"
              onClick={() => setOpen(false)}
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#9a3412] text-lg text-white" aria-hidden>
                ॐ
              </span>
              <span className="block leading-4 text-stone-900 font-serif font-bold text-base">Connect Hub Co</span>
            </Link>

            {/* Non-Clickable Display-Only Tagline */}
            <span className="hidden lg:inline-block border-l border-stone-300 pl-3 text-[10px] font-medium uppercase tracking-widest text-stone-500 pointer-events-none select-none">
              {KHEM_BRAND_TAGLINE}
            </span>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="rounded-lg border px-3 py-2 md:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>

          {/* Desktop Links */}
          <div className="hidden items-center gap-4 md:flex">
            {links.map(([label, href]) => (
              <Link
                className={pathname === href ? "font-semibold text-[#9a3412]" : "text-stone-700 hover:text-[#9a3412]"}
                key={href}
                href={href}
              >
                {label}
              </Link>
            ))}

            {isPublic ? (
              user ? (
                <Link className="rounded-lg bg-[#7c2d12] px-4 py-2 text-white text-sm font-semibold" href="/dashboard">
                  Dashboard
                </Link>
              ) : (
                <Link className="rounded-lg bg-[#7c2d12] px-4 py-2 text-white text-sm font-semibold" href="/login">
                  Login
                </Link>
              )
            ) : (
              <button className="rounded-lg border px-3 py-2 text-sm font-semibold" onClick={() => void logout()}>
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {open ? (
          <div id="site-menu" className="mt-3 grid gap-1 border-t pt-3 md:hidden">
            {links.map(([label, href]) => (
              <Link
                className="rounded-lg px-3 py-2 hover:bg-orange-50 text-sm font-medium"
                key={href}
                href={href}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            {isPublic ? (
              user ? (
                <Link className="rounded-lg bg-[#7c2d12] px-3 py-2 text-white text-sm font-semibold" href="/dashboard">
                  Dashboard
                </Link>
              ) : (
                <Link className="rounded-lg bg-[#7c2d12] px-3 py-2 text-white text-sm font-semibold" href="/login">
                  Login
                </Link>
              )
            ) : (
              <button className="rounded-lg border px-3 py-2 text-left text-sm font-semibold" onClick={() => void logout()}>
                Logout
              </button>
            )}
          </div>
        ) : null}
      </nav>
    </header>
  );
}
