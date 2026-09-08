import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicHeroShell } from '@/features/public-shell';

export const metadata: Metadata = {
  title: 'Refund Policy | Connect Hub Co.',
  description: 'Draft cancellation, refund, and rescheduling policy for Connect Hub Co., pending legal review.',
};

const headingClass = 'text-lg font-bold text-orange-950 font-serif';
const paragraphClass = 'mt-2';

export default function RefundPolicyPage() {
  return (
    <PublicHeroShell>
      <main className="bg-amber-50 px-6 py-16 text-stone-900 min-h-[70vh]">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm border border-stone-200">
          <p className="font-semibold tracking-widest text-orange-800 uppercase text-xs">DRAFT — Pending Legal Review</p>
          <h1 className="mt-2 text-3xl font-serif font-bold text-stone-900">Refund Policy</h1>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            This draft explains how cancellation, refund, and rescheduling requests are assessed. Eligibility is not automatic and remains subject to the applicable Client Service Agreement, service circumstances, non-recoverable costs, and applicable law.
          </p>

          <div className="mt-6 space-y-6 text-sm text-stone-700 leading-relaxed">
            <section>
              <h2 className={headingClass}>1. Cancellation Before Service Commitments</h2>
              <p className={paragraphClass}>
                A cancellation made before materials are procured, Religious Partners or other providers are committed, reservations are made, travel arrangements are incurred, or service preparation begins may be eligible for a full or partial refund, subject to verification of the circumstances and the applicable Client Service Agreement.
              </p>
            </section>
            <section>
              <h2 className={headingClass}>2. Seven-Day Cancellation Eligibility</h2>
              <p className={paragraphClass}>
                A customer cancelling within seven (7) calendar days from Booking Confirmation may be eligible for a 100% refund, subject to this Refund Policy, the applicable Client Service Agreement, and applicable law. The seven-day period does not create an automatic or unconditional right to a full refund.
              </p>
            </section>
            <section>
              <h2 className={headingClass}>3. Full-Refund Eligibility — Where Applicable</h2>
              <p className={paragraphClass}>Any full-refund assessment must take account of:</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>proximity to the scheduled service date;</li>
                <li>whether service preparations have commenced;</li>
                <li>ritual or service materials already procured or committed;</li>
                <li>priest, Gayawal Panda, Religious Partner, or service-provider commitments;</li>
                <li>travel, transport, or accommodation arrangements;</li>
                <li>venue, reservation, or permit costs;</li>
                <li>third-party cancellation costs; and</li>
                <li>other service-specific non-recoverable costs or commitments.</li>
              </ul>
              <div className="mt-3 rounded-xl border border-stone-200 bg-stone-50 p-4">
                <p><strong>Illustrative example:</strong> Booking Confirmation on 5 October; scheduled service on 9 October; cancellation requested on 8 October.</p>
                <p className={paragraphClass}>
                  The customer would not automatically receive a 100% refund merely because cancellation occurred within seven days of Booking Confirmation. Eligibility would be assessed against the applicable conditions, commitments, non-recoverable costs, service-preparation stage, and Client Service Agreement.
                </p>
              </div>
            </section>
            <section>
              <h2 className={headingClass}>4. Non-Recoverable Costs</h2>
              <p className={paragraphClass}>
                Amounts already paid, incurred, or irreversibly committed for materials, provider commitments, venue or permit charges, travel, transport, accommodation, reservations, taxes, or third-party cancellation charges may be deducted where allowed by the applicable agreement and law. The assessment will depend on documented service-specific circumstances.
              </p>
            </section>
            <section>
              <h2 className={headingClass}>5. Cancellation After Commitments or Service Commencement</h2>
              <p className={paragraphClass}>
                Where substantial preparation or binding commitments have begun, or the service has commenced or been partly delivered, a full refund may not be available. Any eligible amount will be assessed after considering work performed, committed resources, recoverable amounts, and the accepted Client Service Agreement.
              </p>
            </section>
            <section>
              <h2 className={headingClass}>6. Rescheduling</h2>
              <p className={paragraphClass}>
                Rescheduling may be requested but is not guaranteed and is not unconditionally penalty-free. It is subject to the nature of the service, service-date or religious requirements, priest or service-provider availability, existing arrangements, third-party conditions, and additional or non-recoverable costs.
              </p>
            </section>
            <section>
              <h2 className={headingClass}>7. Unforeseen Circumstances</h2>
              <p className={paragraphClass}>
                Weather, access restrictions, safety concerns, government directions, transport disruption, illness, sacred-site conditions, provider unavailability, or events outside reasonable control may require postponement, substitution, scope adjustment, or cancellation. Available remedies depend on the circumstances, recoverable third-party amounts, and the Client Service Agreement.
              </p>
            </section>
            <section>
              <h2 className={headingClass}>8. Refund Request and Review Process</h2>
              <p className={paragraphClass}>
                Customers should submit a request through an authorized Connect Hub Co. support channel and provide the same Service Request ID, registered contact details, reason, and relevant evidence. Connect Hub Co. will review the accepted scope, timing, preparation stage, commitments, non-recoverable costs, and applicable terms before communicating an authorized decision. No AI system automatically approves refund eligibility.
              </p>
            </section>
            <section>
              <h2 className={headingClass}>9. External Refund Method</h2>
              <p className={paragraphClass}>
                Payment and any approved refund are handled through the appropriate external financial process. This website does not process payments, collect payment credentials, maintain a refund wallet, automatically approve refunds, or execute automated refunds. Timing may depend on the external financial channel and information reasonably required to complete the approved refund.
              </p>
            </section>
            <section>
              <h2 className={headingClass}>10. Relationship With the Client Service Agreement</h2>
              <p className={paragraphClass}>
                This policy must be read with the customer&apos;s accepted Client Service Agreement, released quotation, Booking Confirmation, authorized Connect Hub Co. communications, and applicable law. Service-specific agreed terms may affect eligibility and calculation, subject to applicable law. The same Service Request ID remains the customer-facing reference throughout the applicable workflow.
              </p>
            </section>
          </div>

          <div className="mt-8 border-t border-stone-200 pt-4 text-xs text-stone-500 flex justify-between gap-4">
            <span>DRAFT — Pending Legal Review</span>
            <Link className="font-semibold text-orange-900 hover:underline" href="/contact">Refund or Rescheduling Inquiry</Link>
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}

