import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import { PublicCatalog } from '@/components/service-catalog/PublicCatalog';

export const metadata: Metadata = {
  title: 'Service Booking & Request Entry | Connect Hub Co.',
  description: 'Begin a service request or booking for PitruMoksha Gaya, Vedic Ritual Services, Pilgrim Travel Assistance, and Vahi Lineage Records.',
};

export default function BookingPage() {
  return (
    <PublicHeroShell>
      <main className="bg-amber-50 min-h-[70vh]">
        <section className="bg-stone-950 px-6 py-12 text-center text-white">
          <p className="font-semibold uppercase tracking-widest text-orange-400 text-xs">Official Booking Portal</p>
          <h1 className="text-3xl font-serif font-bold sm:text-5xl mt-2">Begin Your Service Request</h1>
          <p className="mx-auto mt-3 max-w-2xl text-stone-300 text-sm">
            Select your service requirement below. Our team and verified Religious Partners will review your information and issue your transparent service scope.
          </p>
        </section>

        <div className="mx-auto max-w-5xl px-6 py-12">
          {/* Booking Request Form */}
          <div className="rounded-2xl bg-white p-8 shadow-sm border border-stone-200">
            <h2 className="text-2xl font-serif font-bold text-stone-950 mb-2">Service Booking Form</h2>
            <p className="text-xs text-stone-500 mb-6">No immediate payment required. Complete scope and Dakshina are confirmed prior to booking commitment.</p>
            <form className="grid gap-4" action="/contact?mode=booking-submitted" method="POST">
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

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Service *</label>
                  <select required className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600 bg-white">
                    <option value="">Select Service...</option>
                    <option value="pitru-moksha-gaya">PitruMoksha Gaya</option>
                    <option value="pitru-moksha-online">Online PitruMoksha</option>
                    <option value="pitru-moksha-offline">Offline PitruMoksha</option>
                    <option value="ritual-services">Ritual Services</option>
                    <option value="ritual-online">Online Ritual Services</option>
                    <option value="ritual-offline">Offline Ritual Services</option>
                    <option value="customized-ritual">Customized Ritual</option>
                    <option value="travel-assistance">Travel Assistance</option>
                    <option value="vahi-records">Vahi Records</option>
                    <option value="other">Other / Not Sure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Service Category *</label>
                  <input type="text" required placeholder="e.g. Griha Pravesh / Pind Daan" className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Participation Format *</label>
                  <select required className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600 bg-white">
                    <option value="online">Online / Remote Live Stream</option>
                    <option value="offline">Offline / On-Site In-Person</option>
                    <option value="hybrid">Hybrid / Travel & Ritual</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Preferred Location *</label>
                  <input type="text" required placeholder="Gaya, Home City, Destination..." className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Preferred Date *</label>
                  <input type="date" required className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600 bg-white" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Number of Participants *</label>
                  <input type="number" min={1} required defaultValue={1} className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Message / Requirements</label>
                <textarea rows={3} placeholder="Provide Gotra details, specific family traditions, ancestor names, or travel assistance needs..." className="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-orange-600" />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">Preferred Contact Method *</label>
                <div className="mt-2 flex flex-wrap gap-4 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="bookingContactMethod" value="whatsapp" defaultChecked /> WhatsApp</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="bookingContactMethod" value="email" /> Email</label>
                  <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="bookingContactMethod" value="phone" /> Phone Call</label>
                </div>
              </div>

              <div className="mt-2 flex items-start gap-2">
                <input type="checkbox" required id="bookingConsent" className="mt-1 cursor-pointer" />
                <label htmlFor="bookingConsent" className="text-xs text-stone-600 cursor-pointer">
                  I agree to allow Connect Hub Co. to review my booking request and contact me in accordance with the Privacy Policy and Booking Terms.
                </label>
              </div>

              <button type="submit" className="mt-2 rounded-xl bg-orange-900 px-6 py-3 font-semibold text-white transition hover:bg-black">
                Submit Service Booking Request →
              </button>
            </form>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-serif font-bold text-stone-950 mb-4">Browse Service Catalog</h2>
            <PublicCatalog />
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}
