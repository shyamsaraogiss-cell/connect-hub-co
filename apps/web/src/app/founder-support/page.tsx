import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Founder Support & Direct Escalation | Connect Hub Co.',
  description: 'Direct escalation channel for critical issues requiring Founder and Executive Leadership resolution.',
};

export default function FounderSupportPage() {
  return (
    <PublicHeroShell>
      <main className="bg-amber-50 px-6 py-16 text-stone-900 min-h-[70vh]">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm border border-stone-200">
          <p className="font-semibold tracking-widest text-orange-800 uppercase text-xs">Executive Leadership Escalation</p>
          <h1 className="mt-2 text-3xl font-serif font-bold text-stone-900">Founder Support</h1>
          <p className="mt-3 text-stone-600 text-sm leading-relaxed">
            Direct escalation channel for serious, unresolved, or sensitive issues requiring Admin / Founder intervention.
          </p>

          <form className="mt-6 grid gap-4" action="/contact?mode=founder-support-submitted" method="POST">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Full Name *</label>
                <input type="text" required placeholder="Your full name" className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Contact Phone / Mobile *</label>
                <input type="tel" required placeholder="+91 9876543210" className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Email Address *</label>
                <input type="email" required placeholder="name@example.com" className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Existing Universal Reference ID (Optional)</label>
                <input type="text" placeholder="e.g. REQ-2026-8841" className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600 font-mono text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Issue Category *</label>
              <select required className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600 bg-white">
                <option value="">Select Issue Category...</option>
                <option value="unresolved-service">Unresolved Service Issue</option>
                <option value="sensitive-ancestral">Sensitive Ancestral / Gotra Concern</option>
                <option value="partner-dispute">Religious Partner Network Dispute</option>
                <option value="emergency-travel">Urgent Pilgrim Travel Escalation</option>
                <option value="other">Other Executive Escalation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Detailed Description of Issue *</label>
              <textarea rows={4} required placeholder="Describe the situation in detail..." className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Previous Actions Taken *</label>
              <textarea rows={2} required placeholder="Detail previous inquiries, support tickets, or communication with team..." className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Why Founder Intervention Is Required *</label>
              <textarea rows={2} required placeholder="Explain why standard support channels were insufficient..." className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Supporting Document Upload Interface</label>
              <input type="file" multiple className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2 text-xs text-stone-600 outline-none focus:border-orange-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-100 file:text-orange-900" />
              <span className="mt-1 block text-[11px] text-stone-500">Attach relevant documentation or communication records (PDF, PNG, JPG).</span>
            </div>

            <div className="mt-2 flex items-start gap-2">
              <input type="checkbox" required id="founderConsent" className="mt-1 cursor-pointer" />
              <label htmlFor="founderConsent" className="text-xs text-stone-600 cursor-pointer">
                I understand this escalation goes directly to Executive Founder review and consent to personal contact.
              </label>
            </div>

            <button type="submit" className="mt-2 rounded-xl bg-orange-950 px-6 py-3 font-semibold text-white transition hover:bg-black">
              Submit Direct Message to Founder →
            </button>
          </form>

          <div className="mt-6 border-t border-stone-200 pt-4 text-xs text-stone-500 flex justify-between">
            <span>Direct Email: <a className="font-semibold text-orange-900 hover:underline" href="mailto:shyamsaraogi@yahoo.co.in">shyamsaraogi@yahoo.co.in</a></span>
            <Link className="font-semibold text-orange-900 hover:underline" href="/contact">Standard Inquiry</Link>
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}
