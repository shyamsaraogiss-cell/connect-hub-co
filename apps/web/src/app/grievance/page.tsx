import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Grievance Redressal Portal | Connect Hub Co.',
  description: 'Formal grievance submission and legal compliance escalation channel for Connect Hub Co.',
};

export default function GrievancePage() {
  return (
    <PublicHeroShell>
      <main className="bg-amber-50 px-6 py-16 text-stone-900 min-h-[70vh]">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm border border-stone-200">
          <p className="font-semibold tracking-widest text-orange-800 uppercase text-xs">Official Grievance Officer Channel</p>
          <h1 className="mt-2 text-3xl font-serif font-bold text-stone-900">Grievance Redressal Portal</h1>
          <p className="mt-3 text-stone-600 text-sm">
            Formal grievance submission for unresolved service disputes, compliance concerns, privacy matters, or partner network violations.
          </p>

          <form className="mt-6 grid gap-4" action="/contact?mode=grievance-submitted" method="POST">
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Grievance Category *</label>
              <select required className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600 bg-white">
                <option value="">Select Grievance Category...</option>
                <option value="conduct">Priest Lineage / Conduct Violation</option>
                <option value="billing">Financial & Dakshina Discrepancy</option>
                <option value="privacy">Privacy & Lineage Record Infringement</option>
                <option value="compliance">RPN Partner Network Non-Compliance</option>
                <option value="other">Other Legal / Operational Grievance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Detailed Statement of Grievance *</label>
              <textarea rows={4} required placeholder="State your grievance clearly with dates, times, and specific details..." className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Previous Complaint or Communication Reference</label>
              <input type="text" placeholder="e.g. Previous ticket ID, email subject line, or complaint ref..." className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Supporting Document Upload Interface</label>
              <input type="file" multiple className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2 text-xs text-stone-600 outline-none focus:border-orange-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-100 file:text-orange-900" />
              <span className="mt-1 block text-[11px] text-stone-500">Attach supporting evidence documents or formal notices (PDF, PNG, JPG).</span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Requested Resolution *</label>
              <input type="text" required placeholder="State the specific resolution or remedy requested..." className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
            </div>

            <div className="mt-2 flex items-start gap-2">
              <input type="checkbox" required id="grievanceConsent" className="mt-1 cursor-pointer" />
              <label htmlFor="grievanceConsent" className="text-xs text-stone-600 cursor-pointer">
                I declare that this grievance is submitted in good faith and consent to formal officer review.
              </label>
            </div>

            <button type="submit" className="mt-2 rounded-xl bg-orange-900 px-6 py-3 font-semibold text-white transition hover:bg-black">
              Submit Formal Grievance →
            </button>
          </form>

          <div className="mt-6 border-t border-stone-200 pt-4 text-xs text-stone-500 flex justify-between">
            <span>Grievance Redressal Officer: Shyam Kumar Saraogi</span>
            <Link className="font-semibold text-orange-900 hover:underline" href="/founder-support">Founder Support Escalation</Link>
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}
