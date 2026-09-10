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
    <footer className="relative z-10 w-full border-t-2 border-b-2 border-[#D4AF37] bg-[#04282F] px-4 pt-4 pb-8 text-white">
      {/* SIX FOOTER COLUMNS */}
      <div className="mx-auto grid max-w-[1536px] grid-cols-1 items-start gap-x-6 md:grid-cols-[1.45fr_repeat(5,minmax(0,1fr))]">

        {/* COLUMN 1 â€” BRAND */}
        <div className="flex flex-col items-center pr-6 text-center md:border-r md:border-[#087F8C]/40">
          <Image
            src="/images/brand/golden-lotus-mark.svg"
            alt="Connect Hub Co. Logo"
            width={60}
            height={50}
            className="mb-1 h-[50px] w-[60px] shrink-0"
          />

          <h2 className="whitespace-nowrap font-serif text-2xl font-bold tracking-tight text-white">
            Connect Hub Co.
          </h2>

          <div className="my-1 flex items-center justify-center gap-2">
            <span className="h-[1px] w-10 bg-[#D4AF37]" />
            <span className="text-[10px] text-[#D4AF37]">&#9830;</span>
            <span className="h-[1px] w-10 bg-[#D4AF37]" />
          </div>

          <p className="text-xs leading-relaxed text-[#F4B942]">
            <span className="block whitespace-nowrap">
              The Authentic Ancestral Rites
            </span>
            <span className="block whitespace-nowrap">
              Verified Lineage | Vedic Precision
            </span>
          </p>

          <div className="mt-2 space-y-1 text-[11px] text-gray-300">
            <p className="whitespace-nowrap">&#128737;&#65039; Govt. Registered @2026</p>
<p className="whitespace-nowrap">&copy; All rights reserved.</p>
          </div>
        </div>

        {/* COLUMN 2 â€” OUR SERVICES */}
        <div className="mx-auto flex w-[170px] flex-col space-y-1">
          <h3 className="mb-1 text-left text-[14px] font-semibold tracking-wider text-[#F4B942] -translate-x-[8px] ml-[19px]">
            Our Services
          </h3>

          <Link
            href="/pitru-moksha-gaya"
            aria-current={path === "/pitru-moksha-gaya" ? "page" : undefined}
            className="ml-1 rounded-r-md border-l-[3px] border-l-transparent px-2 py-[2px] text-[14px] text-gray-300/90 transition-colors hover:text-white [&[aria-current=page]]:border-l-[#F4B942] [&[aria-current=page]]:bg-[#1599A6] [&[aria-current=page]]:text-white"
          >
            PitruMoksha Gaya
          </Link>

          <Link
            href="/ritual-services"
            aria-current={path === "/ritual-services" ? "page" : undefined}
            className="ml-1 rounded-r-md border-l-[3px] border-l-transparent px-2 py-[2px] text-[14px] text-gray-300/90 transition-colors hover:text-white [&[aria-current=page]]:border-l-[#F4B942] [&[aria-current=page]]:bg-[#1599A6] [&[aria-current=page]]:text-white"
          >
            Ritual Services
          </Link>

          <Link
            href="/travel-assistance"
            aria-current={path === "/travel-assistance" ? "page" : undefined}
            className="ml-1 rounded-r-md border-l-[3px] border-l-transparent px-2 py-[2px] text-[14px] text-gray-300/90 transition-colors hover:text-white [&[aria-current=page]]:border-l-[#F4B942] [&[aria-current=page]]:bg-[#1599A6] [&[aria-current=page]]:text-white"
          >
            Travel Assistance
          </Link>

          <Link
            href="/vahi-records"
            aria-current={path === "/vahi-records" ? "page" : undefined}
            className="ml-1 rounded-r-md border-l-[3px] border-l-transparent px-2 py-[2px] text-[14px] text-gray-300/90 transition-colors hover:text-white [&[aria-current=page]]:border-l-[#F4B942] [&[aria-current=page]]:bg-[#1599A6] [&[aria-current=page]]:text-white"
          >
            Vahi Records
          </Link>
        </div>

        {/* COLUMN 3 â€” QUICK LINKS */}
        <div className="mx-auto flex w-[170px] flex-col space-y-1">
          <h3 className="mb-1 text-left text-[14px] font-semibold tracking-wider text-[#F4B942] -translate-x-[9px] ml-[18px]">
            Quick Links
          </h3>

          <Link
            href="/tracking"
            aria-current={path === "/tracking" ? "page" : undefined}
            className="rounded-r-md border-l-[3px] border-l-transparent px-2 py-[2px] text-[14px] text-gray-300/90 transition-colors hover:text-white [&[aria-current=page]]:border-l-[#F4B942] [&[aria-current=page]]:bg-[#1599A6] [&[aria-current=page]]:text-white"
          >
            Track Service Request
          </Link>

          <Link
            href="/religious-partners/register"
            aria-current={path === "/religious-partners/register" ? "page" : undefined}
            className="rounded-r-md border-l-[3px] border-l-transparent px-2 py-[2px] text-[14px] text-gray-300/90 transition-colors hover:text-white [&[aria-current=page]]:border-l-[#F4B942] [&[aria-current=page]]:bg-[#1599A6] [&[aria-current=page]]:text-white"
          >
            Priest Registration
          </Link>

        </div>

        {/* COLUMN 4 â€” COMPANY */}
        <div className="mx-auto flex w-[190px] flex-col space-y-1">
          <h3 className="mb-1 text-left text-[14px] font-semibold tracking-wider text-[#F4B942] -translate-x-[10px] ml-[22px]">
            Company
          </h3>

          <Link
            href="/about"
            aria-current={path === "/about" ? "page" : undefined}
            className="ml-[10px] rounded-r-md border-l-[3px] border-l-transparent px-2 py-[2px] text-[14px] text-gray-300/90 transition-colors hover:text-white [&[aria-current=page]]:border-l-[#F4B942] [&[aria-current=page]]:bg-[#1599A6] [&[aria-current=page]]:text-white"
          >
            About Us
          </Link>

          <Link
            href="/contact"
            aria-current={path === "/contact" ? "page" : undefined}
            className="ml-[10px] rounded-r-md border-l-[3px] border-l-transparent px-2 py-[2px] text-[14px] text-gray-300/90 transition-colors hover:text-white [&[aria-current=page]]:border-l-[#F4B942] [&[aria-current=page]]:bg-[#1599A6] [&[aria-current=page]]:text-white"
          >
            Contact Us
          </Link>

          <Link
            href="/policies-and-legal-terms"
            aria-current={path === "/policies-and-legal-terms" ? "page" : undefined}
            className="ml-[10px] whitespace-nowrap rounded-r-md border-l-[3px] border-l-transparent px-2 py-[2px] text-[14px] text-gray-300/90 transition-colors hover:text-white [&[aria-current=page]]:border-l-[#F4B942] [&[aria-current=page]]:bg-[#1599A6] [&[aria-current=page]]:text-white"
          >
            Policies &amp; Legal Terms
          </Link>

          <Link
            href="/refund-policy"
            aria-current={path === "/refund-policy" ? "page" : undefined}
            className="ml-[10px] rounded-r-md border-l-[3px] border-l-transparent px-2 py-[2px] text-[14px] text-gray-300/90 transition-colors hover:text-white [&[aria-current=page]]:border-l-[#F4B942] [&[aria-current=page]]:bg-[#1599A6] [&[aria-current=page]]:text-white"
          >
            Refund Policy
          </Link>
        </div>

        {/* COLUMN 5 â€” SUPPORT */}
        <div className="mx-auto flex w-[170px] flex-col space-y-1">
          <h3 className="mb-1 text-left text-[14px] font-semibold tracking-wider text-[#F4B942] -translate-x-[10px] ml-[19px]">
            Support
          </h3>

          <Link
            href="/complaint"
            aria-current={path === "/complaint" ? "page" : undefined}
            className="rounded-r-md border-l-[3px] border-l-transparent px-2 py-[2px] text-[14px] text-gray-300/90 transition-colors hover:text-white [&[aria-current=page]]:border-l-[#F4B942] [&[aria-current=page]]:bg-[#1599A6] [&[aria-current=page]]:text-white"
          >
            Complaint
          </Link>

          <Link
            href="/grievance"
            aria-current={path === "/grievance" ? "page" : undefined}
            className="rounded-r-md border-l-[3px] border-l-transparent px-2 py-[2px] text-[14px] text-gray-300/90 transition-colors hover:text-white [&[aria-current=page]]:border-l-[#F4B942] [&[aria-current=page]]:bg-[#1599A6] [&[aria-current=page]]:text-white"
          >
            Grievance
          </Link>

          <Link
            href="/founder-support"
            aria-current={path === "/founder-support" ? "page" : undefined}
            className="rounded-r-md border-l-[3px] border-l-transparent px-2 py-[2px] text-[14px] text-gray-300/90 transition-colors hover:text-white [&[aria-current=page]]:border-l-[#F4B942] [&[aria-current=page]]:bg-[#1599A6] [&[aria-current=page]]:text-white"
          >
            Founder Support
          </Link>

          <Link
            href="/zen-g"
            aria-current={path === "/zen-g" ? "page" : undefined}
            className="rounded-r-md border-l-[3px] border-l-transparent px-2 py-[2px] text-[14px] text-gray-300/90 transition-colors hover:text-white [&[aria-current=page]]:border-l-[#F4B942] [&[aria-current=page]]:bg-[#1599A6] [&[aria-current=page]]:text-white"
          >
            AI Help
          </Link>

        </div>

        {/* COLUMN 6 â€” REQUEST UPDATES */}
        <div className="mx-auto flex w-[170px] flex-col space-y-1">
          <h3 className="mb-1 text-center text-[14px] font-semibold tracking-wider text-[#F4B942]">
            Request Updates
          </h3>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-1"
          >
            <input
              type="email"
              placeholder="Enter email or phone..."
              className="w-full rounded-md border border-[#D4AF37]/50 bg-[#032126] px-3 py-1.5 text-[11px] text-white placeholder-gray-400 focus:border-[#D4AF37] focus:outline-none"
            />

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#F4B942] py-1.5 text-[11px] font-semibold text-[#04282F] transition-colors hover:bg-[#d49f32]"
            >
              Subscribe &#8594;</button>
          </form>

          <div className="pt-0">
            <div className="my-1 flex items-center gap-2">
              <div className="h-[1px] flex-1 bg-[#D4AF37]/50" />

              <p className="whitespace-nowrap text-[11px] tracking-wide text-[#F4B942]">
                Connect with us
              </p>

              <div className="h-[1px] flex-1 bg-[#D4AF37]/50" />
            </div>

            <div className="flex items-center justify-between px-2 pt-0">
              <a
                href={contactTopic("social-facebook")}
                aria-label="Facebook"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D4AF37] text-xs font-bold text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#04282F]"
              >
                f
              </a>

              <a
                href={contactTopic("social-x")}
                aria-label="X"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D4AF37] text-xs font-bold text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#04282F]"
              >X</a>

              <a
                href={contactTopic("social-youtube")}
                aria-label="YouTube"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D4AF37] text-xs font-bold text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#04282F]"
              >&#9654;</a>

              <a
                href={contactTopic("social-linkedin")}
                aria-label="LinkedIn"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D4AF37] text-xs font-bold text-[#D4AF37] transition-colors hover:bg-[#D4AF37] hover:text-[#04282F]"
              >
                in
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MADE WITH LOVE â€” MOVED UP + 14PX */}
      <div className="absolute bottom-[30px] left-[22%] right-[18%] flex items-center justify-center gap-2">
        
        <span className="h-[1px] w-8 shrink-0 bg-[#D4AF37]/60" />

        <span className="shrink-0 text-[10px] text-[#D4AF37]">&#9830;</span>

        <p className="whitespace-nowrap text-[20px] font-semibold tracking-wide text-[#FFF4D6]">
          Made with{" "}
          <span className="text-[35px] text-red-500">&#9829;</span>{" "}
          for Dharma, Devotion & Digital India
        </p>

        <span className="shrink-0 text-[10px] text-[#D4AF37]">&#9830;</span>

        <span className="h-[1px] w-8 shrink-0 bg-[#D4AF37]/60" />
      </div>

      {/* MAIN TAGLINE â€” 14PX + COMPACT */}
      <div className="absolute bottom-[4px] left-[26%] right-[22%] flex items-center justify-center gap-1">
        <span className="h-[1px] w-10 shrink-0 bg-[#D4AF37] sm:w-16" />

        <span className="shrink-0 text-[10px] text-[#D4AF37]">&#9830;</span>

        <p className="whitespace-nowrap px-1 text-center text-[12px] font-semibold tracking-wide text-[#F4B942]">
          Combining tradition with technology to make your spiritual journey smooth, transparent, and meaningful.
        </p>

        <span className="shrink-0 text-[10px] text-[#D4AF37]">&#9830;</span>

        <span className="h-[1px] w-10 shrink-0 bg-[#D4AF37] sm:w-16" />
      </div>
    </footer>
  );
}




















































