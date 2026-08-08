import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Service Complaint Submission | Connect Hub Co.',
  description: 'Submit an official service complaint for review by the Connect Hub Co. operations team.',
};

export default function ComplaintPage() {
  return (
    <PublicHeroShell>
      <main className="bg-amber-50 px-6 py-16 text-stone-900 min-h-[70vh]">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm border border-stone-200">
          <p className="font-semibold tracking-widest text-orange-800 uppercase text-xs">Customer Resolution Workflow</p>
          <h1 className="mt-2 text-3xl font-serif font-bold text-stone-900">Submit a Service Complaint</h1>
          <p className="mt-3 text-stone-600 text-sm">
            If your experience with our coordination, travel support, or Religious Partners did not meet our baseline standards, please submit your complaint below.
          </p>

          <form className="mt-6 grid gap-4" action="/contact?mode=complaint-submitted" method="POST">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Full Name *</label>
                <input type="text" required placeholder="Your full name" className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Contact Phone / WhatsApp *</label>
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Complaint Category *</label>
              <select required className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600 bg-white">
                <option value="">Select Category...</option>
                <option value="service-quality">Ritual Execution & Quality</option>
                <option value="travel-logistics">Travel & Accommodation Logistics</option>
                <option value="partner-conduct">Religious Partner / Staff Conduct</option>
                <option value="billing-pricing">Billing & Scope Transparency</option>
                <option value="other">Other Complaint</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Complaint Details *</label>
              <textarea rows={4} required placeholder="Describe your concern with dates, locations, and names..." className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Supporting Document Upload Interface</label>
              <input type="file" multiple className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2 text-xs text-stone-600 outline-none focus:border-orange-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-100 file:text-orange-900" />
              <span className="mt-1 block text-[11px] text-stone-500">Attach receipts, photos, or communication screenshots if available (PDF, PNG, JPG).</span>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Preferred Resolution *</label>
              <input type="text" required placeholder="e.g. Service re-execution, partial refund, priest re-assignment..." className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
            </div>

            <div className="mt-2 flex items-start gap-2">
              <input type="checkbox" required id="complaintConsent" className="mt-1 cursor-pointer" />
              <label htmlFor="complaintConsent" className="text-xs text-stone-600 cursor-pointer">
                I confirm that the information provided is accurate and consent to operational review.
              </label>
            </div>

            <button type="submit" className="mt-2 rounded-xl bg-orange-800 px-6 py-3 font-semibold text-white transition hover:bg-orange-900">
              Submit Official Complaint →
            </button>
          </form>

          <div className="mt-6 border-t border-stone-200 pt-4 text-xs text-stone-500 flex justify-between">
            <span>Need formal legal grievance escalation?</span>
            <Link className="font-semibold text-orange-900 hover:underline" href="/grievance">Grievance Redressal</Link>
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}
