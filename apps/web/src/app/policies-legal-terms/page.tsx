import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicHeroShell } from '@/features/public-shell';

export const metadata: Metadata = {
  title: 'Policies & Legal Terms | Connect Hub Co.',
  description: 'Draft terms, privacy, booking, and AI-information policies for Connect Hub Co., pending legal review.',
};

const sectionClass = 'scroll-mt-6';
const headingClass = 'text-lg font-bold text-orange-950 font-serif';
const paragraphClass = 'mt-2';

export default function PoliciesLegalTermsPage() {
  return (
    <PublicHeroShell>
      <main className="bg-amber-50 px-6 py-16 text-stone-900 min-h-[70vh]">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm border border-stone-200">
          <p className="font-semibold tracking-widest text-orange-800 uppercase text-xs">DRAFT — Pending Legal Review</p>
          <h1 className="mt-2 text-3xl font-serif font-bold text-stone-900">Policies &amp; Legal Terms</h1>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            These draft policies describe the current customer-facing terms for use of the Connect Hub Co. website and coordinated services. They remain subject to professional legal review and the terms of any applicable accepted Client Service Agreement.
          </p>

          <div className="mt-6 space-y-8 text-sm text-stone-700 leading-relaxed">
            <section id="terms-and-conditions" className={sectionClass}>
              <h2 className={headingClass}>1. Terms &amp; Conditions</h2>
              <h3 className="mt-4 font-bold text-stone-900">About Connect Hub Co.</h3>
              <p className={paragraphClass}>
                Connect Hub Co. provides a coordination and information platform for approved religious services, ancestral-rite assistance, pilgrimage and travel assistance, Vahi Records-related coordination, and other services expressly approved and offered by Connect Hub Co.
              </p>
              <h3 className="mt-4 font-bold text-stone-900">Service role and customer information</h3>
              <p className={paragraphClass}>
                Connect Hub Co. may coordinate customers with verified Religious Partners, qualified priests, travel or service providers, and operational teams. Customers must provide accurate contact, service, family, Gotra, ancestral, scheduling, and travel information where relevant. Final ritual formats, religious practices, and traditions must be confirmed with an appropriately qualified Religious Partner.
              </p>
              <h3 className="mt-4 font-bold text-stone-900">Third-Party Services</h3>
              <p className={paragraphClass}>
                Some services may depend on independent Religious Partners, transport operators, accommodation providers, venues, or other third parties. Their services may also be subject to availability, their applicable terms, and applicable law. Connect Hub Co. does not authorize any third party to make commitments outside an approved quotation, accepted Client Service Agreement, Booking Confirmation, applicable policy, or authorized Connect Hub Co. communication.
              </p>
              <h3 className="mt-4 font-bold text-stone-900">Acceptable use</h3>
              <p className={paragraphClass}>
                Customers must not misuse the website, submit unlawful or misleading information, interfere with its operation, impersonate another person, or attempt unauthorized access to customer, partner, service, or company records.
              </p>
            </section>

            <section id="privacy-policy" className={sectionClass}>
              <h2 className={headingClass}>2. Privacy Policy</h2>
              <p className={paragraphClass}>
                Connect Hub Co. respects the sensitive nature of customer identity and contact details, ancestral rites, family Gotra information, lineage records, service requirements, and travel information. Information should be collected and used only where reasonably required to review, coordinate, communicate about, deliver, support, or administer a requested service and to comply with applicable obligations.
              </p>
              <p className={paragraphClass}>
                Traditional Vahi and Panji lineage information must not be published for unrestricted public search, sold, or disclosed to unauthorized parties. Access should be limited to authorized personnel and assigned service or Religious Partners where reasonably necessary for the requested service.
              </p>
              <p className={paragraphClass}>
                Reasonable administrative and technical safeguards should be used for personal information. Information may be disclosed to authorized service participants, professional advisers, or public authorities where reasonably necessary, consented to, contractually required, or required by applicable law. Retention depends on the service, operational, legal, accounting, dispute, and security purposes for which the information is required.
              </p>
              <p className={paragraphClass}>
                A customer may contact Connect Hub Co. to ask about relevant personal information, correction, or a privacy concern. Requests remain subject to identity verification and any lawful retention or restriction that applies.
              </p>
            </section>

            <section id="booking-terms" className={sectionClass}>
              <h2 className={headingClass}>3. Booking Terms</h2>
              <p className={paragraphClass}>
                A request or inquiry is not a confirmed booking. The customer should review the released quotation, including the selected service, agreed scope, inclusions, exclusions, applicable charges and taxes, validity, and notes. A Client Service Agreement is made available only after quotation acceptance and must be explicitly accepted before external payment confirmation can be recorded.
              </p>
              <p className={paragraphClass}>
                Payment takes place outside the website under the approved payment terms and instructions. The website does not collect card, UPI, banking, or other payment credentials. Connect Hub Co. must verify the external payment internally before a booking can be marked confirmed.
              </p>
              <p className={paragraphClass}>
                A booking becomes confirmed only after quotation acceptance, Client Service Agreement acceptance, and internal confirmation of the external payment. Dates, Muhurat or Tithi requirements, Religious Partner availability, venue, materials, travel arrangements, and other dependencies remain subject to the accepted scope and Booking Confirmation. The same Service Request ID remains the customer-facing reference throughout this workflow.
              </p>
              <p className={paragraphClass}>
                Cancellation, refund, and rescheduling questions are governed by the separate <Link className="font-semibold text-orange-900 hover:underline" href="/refund-policy">Refund Policy</Link>, the applicable accepted Client Service Agreement, and applicable law.
              </p>
            </section>

            <section id="ai-help" className={sectionClass}>
              <h2 className={headingClass}>4. AI Help &amp; Automated Information / AI Limitations</h2>
              <p className={paragraphClass}>
                AI Help is an assistance and information layer only. AI-generated information may be incomplete, inaccurate, outdated, or unsuitable for a customer&apos;s particular circumstances and should be independently checked where appropriate. AI does not replace authorized human review, professional advice, or qualified religious guidance.
              </p>
              <p className={paragraphClass}>AI must not:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>approve or issue binding quotations;</li>
                <li>accept a Client Service Agreement;</li>
                <li>confirm external payment or confirm a booking;</li>
                <li>approve cancellation or refund eligibility;</li>
                <li>make binding commitments for Connect Hub Co.;</li>
                <li>guarantee ritual, religious, or spiritual outcomes;</li>
                <li>guarantee Vahi Records or ancestral-record findings; or</li>
                <li>guarantee service-provider availability.</li>
              </ul>
              <p className={paragraphClass}>
                Official quotations, accepted Client Service Agreements, Booking Confirmations, applicable policies, and authorized Connect Hub Co. communications prevail over conflicting AI-generated information.
              </p>
            </section>
          </div>

          <div className="mt-8 border-t border-stone-200 pt-4 text-xs text-stone-500 flex justify-between gap-4">
            <span>DRAFT — Pending Legal Review</span>
            <Link className="font-semibold text-orange-900 hover:underline" href="/contact">Policy Inquiry</Link>
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}
