import Link from 'next/link';
import type { Metadata } from 'next';
import { ROUTES } from '@/config/navigation';

export const metadata: Metadata = {
  title: 'KHEM Sitemap & Information Architecture | Connect Hub Co.',
  description: 'Complete sitemap, page hierarchy index, and canonical route matrix for Connect Hub Co.',
};

const iaGroups = [
  {
    title: 'Level 1 & Core Service Masters (L2)',
    description: 'Primary public service portals and core masters.',
    links: [
      ['Home (L1)', ROUTES.HOME],
      ['PitruMoksha Gaya Master', ROUTES.PITRU_MOKSHA_GAYA],
      ['Ritual Services Master', ROUTES.RITUAL_SERVICES],
      ['Travel Assistance Master', ROUTES.TRAVEL_ASSISTANCE],
      ['Vahi Records', ROUTES.VAHI_RECORDS],
      ['Religious Partner Network', ROUTES.RELIGIOUS_PARTNERS],
      ['Service Catalog & Booking Entry', ROUTES.BOOKING],
      ['Knowledge Center', ROUTES.KNOWLEDGE_CENTER],
      ['Ask GenZ AI (AI Help)', ROUTES.ASK_GENZ_AI],
      ['Raise Inquiry / Mail', ROUTES.INQUIRY],
      ['URMS Tracking Interface', ROUTES.TRACKING],
    ],
  },
  {
    title: 'Service Sub-Pathways (L3)',
    description: 'Online remote participation and on-site journey pathways.',
    links: [
      ['PitruMoksha Gaya Online', ROUTES.PITRU_MOKSHA_GAYA_ONLINE],
      ['PitruMoksha Gaya Offline', ROUTES.PITRU_MOKSHA_GAYA_OFFLINE],
      ['Ritual Services Online', ROUTES.RITUAL_SERVICES_ONLINE],
      ['Ritual Services Offline', ROUTES.RITUAL_SERVICES_OFFLINE],
    ],
  },
  {
    title: 'Support, Escalation & Legal (L3)',
    description: 'Forms, policies, and founder escalation channels.',
    links: [
      ['Complaint Form', ROUTES.COMPLAINT],
      ['Grievance Form', ROUTES.GRIEVANCE],
      ['Founder Support Escalation', ROUTES.FOUNDER_SUPPORT],
      ['Privacy Policy', ROUTES.PRIVACY_POLICY],
      ['Terms & Conditions', ROUTES.TERMS],
      ['Booking Terms', ROUTES.BOOKING_TERMS],
      ['Cancellation Policy', ROUTES.CANCELLATION_POLICY],
      ['Login / Sign Up', ROUTES.LOGIN],
    ],
  },
  {
    title: 'Internal Operations & ERP (L4)',
    description: 'Authenticated operations workspace (Requires ADMIN / STAFF role).',
    links: [
      ['Operations Dashboard', ROUTES.DASHBOARD],
      ['Religious Partners Management', '/partners'],
      ['Customers Database', '/customers'],
      ['Bookings Management', '/bookings'],
      ['All Customer Requests', '/requests'],
      ['Reports & Analytics', '/reports'],
      ['Admin Services Catalog', '/admin/services'],
      ['Admin Service Categories', '/admin/service-categories'],
    ],
  },
];

export default function RouteIndexPage() {
  return (
    <main className="min-h-screen bg-stone-100 p-6 sm:p-10 text-stone-900">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold tracking-widest uppercase text-orange-900">KHEM Website Master</p>
        <h1 className="mt-1 text-3xl font-serif font-bold sm:text-4xl text-stone-950">
          Sitemap & Information Architecture Matrix
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          Authoritative route hierarchy, canonical URL mapping, and operational workspace index.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {iaGroups.map((group) => (
            <section className="rounded-2xl bg-white p-6 shadow-sm border border-stone-200" key={group.title}>
              <h2 className="text-lg font-bold text-orange-950 font-serif">{group.title}</h2>
              <p className="mt-1 text-xs text-stone-500">{group.description}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.links.map(([label, href]) => (
                  <li className="flex items-center justify-between border-b border-stone-100 pb-1.5" key={href}>
                    <Link className="font-medium text-[var(--peacock-dark,#087F8C)] hover:underline" href={href}>
                      {label}
                    </Link>
                    <code className="text-[11px] text-stone-400 font-mono">{href}</code>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
