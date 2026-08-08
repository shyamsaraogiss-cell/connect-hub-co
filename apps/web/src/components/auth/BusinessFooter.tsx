"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const testContact=(topic:string)=>`/contact?mode=test&topic=${topic}`;

export function BusinessFooter(){
  const path=usePathname();
  const show=["/","/about","/contact","/login","/pitru-moksha","/travel-assistance","/services","/zen-g"].includes(path)||path.startsWith("/services/")||path.endsWith("/success");
  if(!show)return null;
  return <footer className="relative z-10 w-full border-t border-[var(--border-soft)] bg-[linear-gradient(180deg,var(--shell-peacock-top)_0%,var(--shell-peacock)_55%,var(--shell-peacock-bottom)_100%)] px-5 py-9 text-[var(--text-on-peacock)]">
    <div className="mx-auto grid max-w-[1500px] gap-8 sm:grid-cols-2 lg:grid-cols-6">
      <div><h2 className="font-serif text-2xl font-bold">Connect Hub Co.</h2><p className="mt-1 text-sm text-[var(--ritual-gold)]">The Authentic Ancestral Rites | Verified Lineage | Vedic Precision</p><p className="mt-4 text-sm leading-6 text-white/90">We combine tradition with technology to make your spiritual journey smooth, transparent, and meaningful.</p></div>
      <div><h3 className="font-semibold text-[var(--ritual-gold)]">Our Services</h3><div className="mt-3 grid gap-2 text-sm"><Link href="/pitru-moksha">PitruMoksha Gaya</Link><Link href="/services">Ritual Services</Link><Link href="/travel-assistance">Travel Assistance</Link><Link href={testContact("virtual-shraddh")} title="Test-mode destination">Virtual Shraddh</Link></div></div>
      <div><h3 className="font-semibold text-[var(--ritual-gold)]">Quick Links</h3><div className="mt-3 grid gap-2 text-sm"><Link href="/about">Knowledge Centre</Link><Link href={testContact("religious-partner-registration")} title="Test-mode destination">Religious Partner Registration</Link><Link href={testContact("vahi-records")} title="Test-mode destination">Vahi (Panji) Records</Link><Link href="/contact">Help / Info</Link></div></div>
      <div><h3 className="font-semibold text-[var(--ritual-gold)]">Company</h3><div className="mt-3 grid gap-2 text-sm"><Link href="/about">About Us</Link><Link href={testContact("careers")} title="Test-mode destination">Careers</Link><Link href={testContact("privacy-policy")} title="Test-mode destination">Privacy Policy</Link><Link href={testContact("terms")} title="Test-mode destination">Terms & Conditions</Link></div></div>
      <div><h3 className="font-semibold text-[var(--ritual-gold)]">Support</h3><div className="mt-3 grid gap-2 text-sm"><Link href="/contact">Contact Us</Link><Link href="/pitru-moksha#faqs">FAQ</Link><Link href={testContact("booking-terms")} title="Information only">Booking Terms</Link><Link href={testContact("cancellation-policy")} title="Information only">Cancellation Policy</Link></div></div>
      <div><h3 className="font-semibold text-[var(--ritual-gold)]">Stay Updated</h3><p className="mt-3 text-sm text-white/90">Updates are available in test mode only.</p><Link className="mt-3 block rounded-lg bg-[var(--warm-ivory-soft)] px-3 py-2 text-sm font-semibold text-[var(--royal-navy)]" href={testContact("stay-updated")}>Request updates →</Link><nav className="mt-4 flex flex-wrap gap-2" aria-label="Social links">{[["Facebook","f"],["Instagram","◎"],["YouTube","▶"],["LinkedIn","in"]].map(([label,icon])=><Link className="grid h-9 min-w-9 place-items-center rounded-full border border-[var(--ritual-gold)] px-2 text-sm font-bold text-[var(--ritual-gold)]" href={testContact(`social-${label.toLowerCase()}`)} aria-label={`${label} — test-mode destination`} key={label}>{icon}</Link>)}</nav></div>
    </div>
    <div className="mx-auto mt-8 max-w-[1500px] border-t border-[var(--border-soft)] pt-5 text-center text-sm">© {new Date().getFullYear()} Connect Hub Co. All rights reserved.</div>
  </footer>
}
