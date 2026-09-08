import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { submitAgreementAcceptance, submitCustomerPaymentDetails, submitQuotationDecision } from '../services/urms.api';

const componentPath = path.resolve(process.cwd(), 'apps/web/src/app/tracking/CommercialWorkflowPanel.tsx');
const pagePath = path.resolve(process.cwd(), 'apps/web/src/app/tracking/page.tsx');
const source = fs.readFileSync(componentPath, 'utf8');
const pageSource = fs.readFileSync(pagePath, 'utf8');

const requiredUi = [
  'Commercial Workflow',
  'Service Request ID',
  'Quotation',
  'Accept Quotation',
  'Request Change',
  'Reject Quotation',
  'Client Service Agreement',
  'Accept Client Service Agreement',
  'Available for Acceptance',
  'Please review the complete agreement carefully before accepting.',
  'Awaiting Payment Confirmation',
  'Payment Confirmed',
  'Booking Confirmed',
  'Payment Confirmation',
  'A. Agreed Service',
  'B. Payment',
  'BANK ONLY',
  'We do not accept CASH.',
  'Submit Payment Details',
  'Payment Details Submitted',
  'Verification Pending',
];

for (const text of requiredUi) assert(source.includes(text), `Missing tracking UI: ${text}`);
for (const forbidden of ['Pay Now', 'card number', 'UPI ID', 'checkout', 'payment gateway', 'payment link', 'QR code', 'net-banking', 'payment verification button', 'internalNote', 'confirmedByUserId', 'createdByUserId']) {
  assert(!source.toLowerCase().includes(forbidden.toLowerCase()), `Forbidden customer UI field/control: ${forbidden}`);
}

assert(pageSource.includes('<CommercialWorkflowPanel'));
assert(pageSource.includes("record.requestType === 'SERVICE_REQUEST'"));
assert(source.includes("currentQuotation.status === 'RELEASED'"), 'Actions must require a released quotation');
assert(source.includes('maxLength={1000}'), 'Change request must respect the locked backend limit');
assert(source.includes('changeReason.length} / 1,000'), 'Change request must show a live 1,000-character counter');
assert(source.includes('Briefly explain the change you need. Maximum 1,000 characters.'));
assert(source.includes('Change Requested'));
assert(source.includes("Your request: {currentQuotation.decision.changeRequest}"));
assert(!source.includes("decision.replaceAll('_', ' ')"), 'REQUEST_CHANGE enum text must not be displayed');
assert(source.includes('href="/refund-policy">Refund Policy</Link>'));
assert.equal(source.match(/href="\/refund-policy"/g)?.length, 1, 'CSA must contain exactly one Refund Policy link');
assert(source.indexOf('href="/refund-policy">Refund Policy</Link>') < source.indexOf("currentAgreement.acceptance ? 'Accepted'"), 'Refund Policy must appear immediately before the agreement status badge');
assert(!source.includes('/cancellation-policy'));
assert(!source.includes('Review policy'));
assert(!source.includes('Cancellation / Refund Policy'));
assert(source.includes("workflow.stage === 'BOOKING_CONFIRMED'"));
assert(source.match(/\{referenceId\}/g)?.length && source.match(/\{referenceId\}/g)!.length >= 2, 'Same Service Request ID must remain visible');
assert(source.includes("state === 'Completed' ? completedState"), 'Completed stages must use the parrot-green completed state');
assert(source.includes("state === 'Current' ? attentionState"), 'Current stages must use the bright-yellow attention state');
assert(source.includes(': futureState'), 'Future stages must retain the neutral state');
assert(source.includes("if (stage === 'PAYMENT_CONFIRMED') return 4"), 'Booking must become current after payment confirmation');
assert(source.includes('return 5;'), 'All stages must be completed after booking confirmation');
assert(source.includes('Quotation Accepted'));
assert(source.includes('Your decision: Accept'));
assert(source.includes('customerStatusLabel(currentQuotation.status)'), 'Quotation status must use customer-friendly title case');
assert(source.includes("currentAgreement.acceptance ? 'Accepted' : 'Available for Acceptance'"));
assert(source.includes('Agreement Accepted'));
assert(source.includes('Accepted on:'));
assert(!source.includes('Agreement:</dt>'), 'Accepted agreement card must not repeat the agreement number');
assert(source.includes("['AGREEMENT_ACCEPTED', 'AWAITING_EXTERNAL_PAYMENT'].includes(stage)) return 3"), 'External Payment must become current after agreement acceptance');
assert(source.includes('href="/refund-policy"'), 'Refund Policy must link directly to /refund-policy');
assert(source.includes("customerPaymentTerms(currentQuotation.paymentTerms)"), 'Quotation payment terms must use the customer-facing display wording');
assert(source.includes("? 'Payment is due only after acceptance of the Client Service Agreement.'"));
assert(!source.includes('>{currentQuotation.paymentTerms}</dd>'), 'Raw external-payment wording must not be rendered directly');
assert(source.includes('href="/about"'), 'Bank-details guidance must use the existing About Us page');
assert(source.includes('Bank details are available under <Link'));
assert(source.includes('For assistance, contact us by email or WhatsApp.'));
assert(source.includes("workflow?.stage === 'AWAITING_EXTERNAL_PAYMENT' && currentAgreement.acceptance && !workflow.paymentDetails"), 'Payment form must require accepted CSA and awaiting-payment state');
assert(source.includes('readOnly value={referenceId}'), 'Payment form must retain the same read-only Service Request ID');
for (const requiredPaymentField of ['Amount Paid *', 'Payment Date *', 'Bank Transaction / UTR / Reference No. *', 'Payment Mode *', 'Payer Name *']) {
  assert(source.includes(requiredPaymentField), `Payment form must retain ${requiredPaymentField}`);
}
assert(!source.includes('setRemarks'), 'Payment remarks state must be removed');
assert(!source.includes('remarks:'), 'Payment remarks must not be submitted');
assert(!source.includes('>Remarks'), 'Payment remarks field/display must be removed');
assert(!source.includes('Optional. Maximum 1,000 characters.'), 'Payment remarks guidance must be removed');
assert(!source.includes('remarks.length} / 1,000'), 'Payment remarks counter must be removed');
assert(!source.includes('type="file"'), 'No payment proof or document upload may exist');
assert(!source.includes('>External Payment<'), 'Customer-facing UI must not render External Payment wording');
assert(source.includes("EXTERNAL_PAYMENT: 'Payment Confirmation'"), 'Progress strip must say Payment Confirmation');
for (const removedCsaSection of ['Customer Responsibilities', 'Connect Hub Co. Responsibilities', 'Important Service Disclosures']) {
  assert(!source.includes(removedCsaSection), `CSA must not render ${removedCsaSection}`);
}
for (const retainedCsaField of ['Agreed Scope', 'Inclusions', 'Final Agreed Price']) {
  assert(source.includes(retainedCsaField), `CSA must retain ${retainedCsaField}`);
}
assert(source.includes('lg:grid-cols-2'), 'CSA and payment must use two columns on desktop');
assert(source.includes('lg:border-l lg:border-t-0'), 'Desktop payment column must have a vertical divider that becomes horizontal when stacked');
assert(source.includes('bg-amber-50/40'), 'Quotation must retain a pale-gold section identity');
assert(source.includes('bg-cyan-50/30'), 'CSA must retain a light ice/peacock section identity');
assert(source.includes('bg-violet-50/40'), 'Booking must retain a light lavender section identity');
assert(source.includes('Booking will be confirmed after payment verification by Connect Hub Co.'));

const originalFetch = globalThis.fetch;
const requests: Array<{ url: string; body: Record<string, unknown> }> = [];
globalThis.fetch = (async (input: string | URL | Request, init?: RequestInit) => {
  requests.push({ url: String(input), body: JSON.parse(String(init?.body ?? '{}')) });
  return new Response('{}', { status: 200, headers: { 'content-type': 'application/json' } });
}) as typeof fetch;

async function run() {
  await submitQuotationDecision('chc-2026-123456', {
    quotationId: 'quote-2',
    decision: 'REQUEST_CHANGE',
    changeRequest: 'Please revise the scope.',
    contactVerification: 'registered@example.com',
  });
  await submitAgreementAcceptance('chc-2026-123456', {
    agreementId: 'agreement-1',
    agreementVersion: 1,
    contactVerification: '+919999999999',
  });
  await submitCustomerPaymentDetails('chc-2026-123456', {
    amountPaid: '5100.00',
    paymentDate: '2026-09-01',
    externalReference: 'BANK-UTR-123',
    paymentMode: 'NEFT',
    payerName: 'Customer',
    contactVerification: 'registered@example.com',
  });

  assert.equal(requests[0].url, 'http://localhost:5000/api/urms/universal-requests/CHC-2026-123456/quotation-decision');
  assert.equal(requests[0].body.contactVerification, 'registered@example.com');
  assert.equal(requests[1].url, 'http://localhost:5000/api/urms/universal-requests/CHC-2026-123456/agreement-acceptance');
  assert.equal(requests[1].body.agreementVersion, 1);
  assert.equal(requests[2].url, 'http://localhost:5000/api/urms/universal-requests/CHC-2026-123456/payment-details');
  assert.equal(requests[2].body.paymentMode, 'NEFT');
  assert.equal(requests[2].body.contactVerification, 'registered@example.com');
  console.log(JSON.stringify({ tests: 51, passed: 51, failed: 0 }));
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => {
  globalThis.fetch = originalFetch;
});
