import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Inquiry & Support | Connect Hub Co.',
  description: 'General inquiries, support requests, service questions, and mail assistance for Connect Hub Co.',
};

export default function InquiryPage() {
  return (
    <PublicHeroShell>
      <main className="bg-amber-50 px-6 py-16 text-stone-900 min-h-[70vh]">
        <div className="mx-auto max-w-4xl">
          <p className="font-semibold tracking-widest text-orange-800 uppercase text-xs">General Support & Inquiries</p>
          <h1 className="mt-2 text-4xl font-serif font-bold text-stone-950 sm:text-5xl">Inquiry & Assistance</h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-700 leading-relaxed">
            Have a question about our services, tradition protocols, or pilgrim support? Connect with our team via email, WhatsApp, or submit your inquiry below.
          </p>

          {/* Official Contact Options */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-orange-100 text-orange-900 font-bold text-xl">✉</div>
              <div>
                <strong className="block text-xs uppercase tracking-wider text-stone-500">Official Company Email</strong>
                <a className="text-sm font-semibold text-stone-900 hover:text-orange-900" href="mailto:support@connecthubco.com">
                  support@connecthubco.com
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-100 text-emerald-800"><WhatsAppIcon className="h-6 w-6" /></div>
              <div>
                <strong className="block text-xs uppercase tracking-wider text-stone-500">Direct WhatsApp Assistance</strong>
                <Link className="text-sm font-semibold text-emerald-800 hover:underline" href="/contact?channel=whatsapp">
                  Connect on WhatsApp →
                </Link>
              </div>
            </div>
          </div>

          {/* General Inquiry Form */}
          <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm border border-stone-200">
            <h2 className="text-2xl font-serif font-bold text-stone-950 mb-2">General Inquiry Form</h2>
            <p className="text-xs text-stone-500 mb-6">For service bookings, please use our dedicated Booking Page.</p>
            <form className="grid gap-4" action="/contact?mode=inquiry-submitted" method="POST">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Full Name *</label>
                  <input type="text" required placeholder="Your full name" className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Country *</label>
                  <input type="text" required placeholder="India, USA, UK, etc." className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Mobile / WhatsApp Number *</label>
                  <input type="tel" required placeholder="+91 9876543210" className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Email Address *</label>
                  <input type="email" required placeholder="name@example.com" className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Inquiry Category *</label>
                  <select required className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600 bg-white">
                    <option value="">Select Category...</option>
                    <option value="general">General Information</option>
                    <option value="service-question">Service Question</option>
                    <option value="travel-support">Pilgrim Travel Support</option>
                    <option value="partner-inquiry">Partner Network Inquiry</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Related Service (Optional)</label>
                  <select className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600 bg-white">
                    <option value="none">None / Not Applicable</option>
                    <option value="pitru-moksha">PitruMoksha Gaya</option>
                    <option value="ritual-services">Ritual Services</option>
                    <option value="travel-assistance">Travel Assistance</option>
                    <option value="vahi-records">Vahi Records</option>
                    <option value="religious-partners">Religious Partner Registration</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Message / Question *</label>
                <textarea rows={4} required placeholder="Write your question or request in detail..." className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Preferred Contact Method *</label>
                <div className="mt-2 flex flex-wrap gap-4 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="contactMethod" value="whatsapp" defaultChecked /> WhatsApp</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="contactMethod" value="email" /> Email</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="contactMethod" value="phone" /> Phone Call</label>
                </div>
              </div>
              <div className="mt-2 flex items-start gap-2">
                <input type="checkbox" required id="inquiryConsent" className="mt-1 cursor-pointer" />
                <label htmlFor="inquiryConsent" className="text-xs text-stone-600 cursor-pointer">
                  I agree to allow Connect Hub Co. to contact me regarding this inquiry in accordance with the Privacy Policy.
                </label>
              </div>
              <button type="submit" className="mt-2 rounded-xl bg-[var(--peacock-dark,#087F8C)] px-6 py-3 font-semibold text-white transition hover:opacity-95">
                Submit Inquiry →
              </button>
            </form>
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}
