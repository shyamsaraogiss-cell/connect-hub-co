import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import { MulticolourAiBrainIcon } from "@/features/public-shell/components/PublicHeroSidebar";
import { HeaderMailIcon } from '@/components/auth/PublicHeader';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { GeneralInquiryForm } from '@/components/inquiry/GeneralInquiryForm';

export const metadata: Metadata = {
  title: 'Inquiry & Support | Connect Hub Co.',
  description: 'General inquiries, support requests, service questions, and mail assistance for Connect Hub Co.',
};

export default function InquiryPage() {
  return (
    <PublicHeroShell>
      <main className="business-inner-page bg-amber-50 px-6 py-8 sm:py-10 text-stone-900 rounded-2xl">
        <div className="mx-auto max-w-4xl">          <section className="rounded-2xl border border-orange-200 bg-[#FFF4E6] px-6 py-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold tracking-widest text-orange-800 uppercase text-xl sm:text-2xl">
                General Support & Inquiries
              </p>

              <a
                href="/zen-g"
                className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37] bg-[#0A4F56] px-4 py-2 font-semibold text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center [&>svg]:h-8 [&>svg]:w-8">
                  <MulticolourAiBrainIcon />
                </span>
                <span>May I Assist?</span>
              </a>
            </div>

            <p className="mt-4 max-w-2xl text-lg text-stone-700 leading-relaxed">
              Have a question about our services, tradition protocols, or pilgrim support? Use the approved email channel or review the inquiry form below.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-sky-300 bg-[#064E59] text-sky-200">
                  <HeaderMailIcon className="h-6 w-6" />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-stone-500">Official Company Email</strong>
                  <a className="text-sm font-semibold text-stone-900 hover:text-orange-900" href="mailto:support@connecthubco.com">
                    support@connecthubco.com
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#25D366] bg-[#064E59] text-[#5BE58B]">
                  <WhatsAppIcon className="h-6 w-6" />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-stone-500">WhatsApp Contact</strong>
                  <span className="text-sm font-semibold text-stone-600">+91-9334455665</span>
                </div>
              </div>
            </div>
          </section>
{/* General Inquiry Form */}
          <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm border border-stone-200">
            <h2 className="text-2xl font-serif font-bold text-stone-950 mb-2">General Inquiry Form</h2>
            <p className="text-xs text-stone-500 mb-6">For service bookings, please use our dedicated Booking Page.</p>
            <GeneralInquiryForm />
          </div>
          </div>
      </main>
    </PublicHeroShell>
  );
}
