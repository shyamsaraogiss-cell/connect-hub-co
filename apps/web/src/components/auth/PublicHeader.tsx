"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "./AuthProvider";

const links=[["Home","/"],["About","/about"],["Services","/services"],["Pitru Moksha","/pitru-moksha"],["Travel","/travel-assistance"],["GenZ AI","/zen-g"],["Contact","/contact"]] as const;

export function PublicHeader(){
  const path=usePathname();
  const {user}=useAuth();
  const [open,setOpen]=useState(false);
  const show=["/","/about","/contact","/login","/pitru-moksha","/travel-assistance","/services","/zen-g"].includes(path)||path.startsWith("/services/")||path.endsWith("/success");
  if(!show)return null;
  return <header className="sticky top-0 z-50 min-h-[96px] border-b border-[var(--border-soft)] bg-[linear-gradient(180deg,var(--shell-peacock-top)_0%,var(--shell-peacock)_55%,var(--shell-peacock-bottom)_100%)] text-[var(--text-on-peacock)] shadow-sm">
    <nav className="mx-auto max-w-[1536px] px-4 py-2" aria-label="Primary navigation">
      <div className="flex min-h-[78px] items-center gap-4">
        <Link className="mr-auto block rounded-md px-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--ritual-gold)]" href="/" onClick={()=>setOpen(false)} aria-label="Connect Hub Co. — The Authentic Ancestral Rites — home">
          <strong className="block font-serif text-[30px] leading-tight xl:text-[34px]">Connect Hub Co.</strong>
          <small className="mt-1 block text-[14px] leading-snug text-[var(--gold-bright)] xl:text-[15px]">The Authentic Ancestral Rites | Verified Lineage | Vedic Precision</small>
        </Link>
        <Link className="hidden rounded-full border border-white/70 px-4 py-2 text-base font-semibold lg:inline-flex" href="/contact">Contact</Link>
        <Link className="hidden rounded-full border border-[var(--ritual-gold)] px-4 py-2 text-base font-semibold text-white lg:inline-flex" href="/contact?mode=test&channel=whatsapp" title="Test-mode WhatsApp guidance">WhatsApp</Link>
        <Link className="hidden rounded-xl bg-[var(--ritual-gold)] px-5 py-2.5 font-semibold text-[var(--royal-navy)] sm:inline-flex" href={user?"/dashboard":"/login"}>{user?"Dashboard":"Login / Sign Up"}</Link>
        <button className="rounded-lg border border-white/70 px-3 py-2 sm:hidden" type="button" aria-expanded={open} aria-controls="public-mobile-menu" aria-label={open?"Close navigation menu":"Open navigation menu"} onClick={()=>setOpen(value=>!value)}>{open?"Close":"Menu"}</button>
      </div>
      {open?<div id="public-mobile-menu" className="mt-2 grid gap-1 border-t border-white/25 bg-[var(--shell-peacock)] pt-3 sm:hidden">{links.map(([label,href])=><Link className="rounded-lg px-3 py-2 hover:bg-white/15 focus:bg-white/15" href={href} key={href} onClick={()=>setOpen(false)}>{label}</Link>)}<Link className="rounded-lg px-3 py-2 hover:bg-white/15" href="/contact?mode=test&channel=whatsapp" onClick={()=>setOpen(false)}>WhatsApp</Link><Link className="mt-1 rounded-lg bg-[var(--ritual-gold)] px-3 py-2 font-semibold text-[var(--royal-navy)]" href={user?"/dashboard":"/login"} onClick={()=>setOpen(false)}>{user?"Dashboard":"Login / Sign Up"}</Link></div>:null}
    </nav>
  </header>
}
