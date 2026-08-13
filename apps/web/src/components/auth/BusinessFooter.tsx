"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const contactTopic = (topic: string) => `/contact?topic=${topic}`;

export function BusinessFooter() {
  const path = usePathname();
  const show =
    !path.startsWith("/admin") &&
    !path.startsWith("/dashboard") &&
    path !== "/login" &&
    path !== "/register" &&
    !path.includes("/requests");
  if (!show) return null;

  return (
    <footer className="relative z-10 w-full border-t border-[var(--border-soft)] bg-[linear-gradient(180deg,var(--shell-peacock-top)_0%,var(--shell-peacock)_55%,var(--shell-peacock-bottom)_100%)] px-5 py-7 text-[var(--text-on-peacock)]">
      <div className="mx-auto grid max-w-[1500px] gap-6 sm:grid-cols-2 lg:grid-cols-6">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/brand/golden-lotus-mark.svg"
              alt="Connect Hub Co. Logo"
              width={40}
              height={30}
              className="shrink-0"
            />
            <h2 className="font-serif text-2xl font-bold">Connect Hub Co.</h2>
          </div>
          <p className="mt-1.5 text-xs text-[var(--ritual-gold)] font-medium">
            The Authentic Ancestral Rites | Verified Lineage | Vedic Precision
          </p>
          <p className="mt-3 text-xs leading-5 text-white/80">
            Combining tradition with technology to make your spiritual journey smooth, transparent, and meaningful.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-sm text-[var(--ritual-gold)]">Our Services</h3>
          <div className="mt-2.5 grid gap-1.5 text-xs">
            <Link href="/pitru-moksha-gaya">PitruMoksha Gaya</Link>
            <Link href="/ritual-services">Ritual Services</Link>
            <Link href="/travel-assistance">Travel Assistance</Link>
            <Link href="/vahi-records">Vahi Records</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-sm text-[var(--ritual-gold)]">Quick Links</h3>
          <div className="mt-2.5 grid gap-1.5 text-xs">
            <Link href="/tracking" title="Track your service request">Track Service Request</Link>
            <Link href="/tracking" title="Track registration ID">Track Registration ID</Link>
            <Link href="/zen-g">AI Help</Link>
            <Link href="/complaint" title="Lodge a complaint">Complaint</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-sm text-[var(--ritual-gold)]">Company</h3>
          <div className="mt-2.5 grid gap-1.5 text-xs">
            <Link href="/about">About Us</Link>
            <Link href="/grievance" title="Grievance redressal">Grievance</Link>
            <Link href="/privacy-policy" title="Privacy policy">Privacy Policy</Link>
            <Link href="/terms" title="Terms & conditions">Terms & Conditions</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-sm text-[var(--ritual-gold)]">Support</h3>
          <div className="mt-2.5 grid gap-1.5 text-xs">
            <Link href="/contact">Contact Us</Link>
            <Link href="/founder-support" title="Founder support">Founder Support</Link>
            <Link href="/booking-terms" title="Information only">Booking Terms</Link>
            <Link href="/cancellation-policy" title="Information only">Cancellation Policy</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-sm text-[var(--ritual-gold)]">Request Updates</h3>
          <form className="mt-2.5 grid gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Enter email or phone..."
              className="w-full rounded-lg border border-[var(--border-soft)] bg-white/10 px-3 py-1.5 text-xs text-white placeholder:text-white/60 focus:outline-none focus:ring-1 focus:ring-[var(--ritual-gold)]"
            />
            <button
              className="rounded-lg bg-[var(--ritual-gold)] px-3 py-1.5 text-xs font-semibold text-[var(--royal-navy)] transition-colors hover:brightness-110"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mx-auto mt-6 flex max-w-[1500px] flex-col items-center justify-between gap-3 border-t border-[var(--border-soft)] pt-4 text-xs text-white/70 sm:flex-row">
        <div className="hidden sm:block sm:w-1/4" />
        <div className="text-center font-medium sm:w-1/2">
          © {new Date().getFullYear()} Connect Hub Co. All rights reserved.
        </div>
        <nav className="flex items-center justify-end gap-2 sm:w-1/4" aria-label="Social links">
          {[["Facebook", "f"], ["Instagram", "◎"], ["YouTube", "▶"], ["LinkedIn", "in"]].map(([label, icon]) => (
            <Link
              className="grid h-7 w-7 place-items-center rounded-full border border-[var(--ritual-gold)] text-xs font-bold text-[var(--ritual-gold)] transition-colors hover:bg-white/10"
              href={contactTopic(`social-${label.toLowerCase()}`)}
              aria-label={`${label} contact`}
              key={label}
            >
              {icon}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
