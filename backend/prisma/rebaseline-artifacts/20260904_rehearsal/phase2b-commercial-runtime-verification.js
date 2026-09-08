require("ts-node/register");

const assert = require("node:assert/strict");
const { PrismaClient } = require("@prisma/client");
const commercial = require("../../../src/services/commercialWorkflow.service.ts");

const prisma = new PrismaClient();
const marker = `CHC-TEST-${Date.now()}`;
let requestId;

const quoteInput = (suffix, basePrice) => ({
  serviceName: `Runtime Verification ${suffix}`,
  serviceScope: `Isolated commercial workflow verification ${suffix}`,
  inclusions: ["Test inclusion"],
  exclusions: ["Test exclusion"],
  basePrice,
  applicableChargesTaxes: "180.00",
  currency: "INR",
  validUntil: new Date(Date.now() + 86400000).toISOString(),
  notes: "Customer-visible test note",
  paymentTerms: "External payment after agreement acceptance",
  paymentInstructions: "Pay outside the website and await internal confirmation",
});

async function expectCode(action, code) {
  await assert.rejects(action, (error) => error && error.code === code);
}

async function main() {
  const actor = await prisma.user.findFirst({
    where: { role: { in: ["FOUNDER", "ADMIN"] } },
    select: { id: true, role: true },
  });
  assert(actor, "A Founder/Admin actor is required for runtime verification");

  const request = await prisma.universalRequest.create({
    data: {
      referenceId: marker,
      requestType: "SERVICE_REQUEST",
      serviceDomain: "RUNTIME_TEST_ONLY",
      guestName: "Commercial Runtime Test",
      guestPhone: "+910000000099",
      guestEmail: "commercial-runtime-test@example.invalid",
      title: "Commercial workflow runtime verification",
      description: "Isolated record; safe to delete after verification",
      sourceChannel: "RUNTIME_TEST",
      metadata: { isolatedTest: true, marker },
    },
  });
  requestId = request.id;

  assert.equal(await commercial.getCustomerSafeWorkflow(marker, request), null);

  const quote1 = await commercial.createQuotation(marker, quoteInput("v1", "1000.00"), actor.id);
  let publicDto = await commercial.getCustomerSafeWorkflow(marker, request);
  assert.equal(publicDto.quotations.length, 0, "Draft quotation leaked publicly");
  await expectCode(() => commercial.confirmBooking(marker, actor.id, actor.role), "BOOKING_CONFIRMATION_NOT_PERMITTED");

  await commercial.releaseQuotation(marker, quote1.id, actor.id, actor.role);
  publicDto = await commercial.getCustomerSafeWorkflow(marker, request);
  assert.equal(publicDto.quotations.length, 1);
  assert.equal(publicDto.quotations[0].version, 1);
  assert.equal(publicDto.quotations[0].status, "RELEASED");

  await commercial.recordQuotationDecision(marker, {
    quotationId: quote1.id,
    decision: "REQUEST_CHANGE",
    changeRequest: "Please revise the test scope",
    contactVerification: request.guestEmail,
  });

  const quote2 = await commercial.reviseQuotation(marker, quote1.id, quoteInput("v2", "1200.00"), actor.id);
  publicDto = await commercial.getCustomerSafeWorkflow(marker, request);
  assert(!publicDto.quotations.some((q) => q.id === quote2.id), "Unreleased revision leaked publicly");

  await commercial.releaseQuotation(marker, quote2.id, actor.id, actor.role);
  await commercial.recordQuotationDecision(marker, {
    quotationId: quote2.id,
    decision: "ACCEPT",
    contactVerification: request.guestPhone,
  });

  publicDto = await commercial.getCustomerSafeWorkflow(marker, request);
  assert.equal(publicDto.stage, "AGREEMENT_AVAILABLE");
  assert.equal(publicDto.agreements.length, 1);
  assert.equal(publicDto.agreements[0].version, 1);
  assert.equal(publicDto.agreements[0].serviceRequestId, marker);
  assert.equal(publicDto.agreements[0].finalAgreedPrice, "1380");

  const agreement = publicDto.agreements[0];
  await expectCode(() => commercial.confirmBooking(marker, actor.id, actor.role), "BOOKING_CONFIRMATION_NOT_PERMITTED");
  await commercial.acceptAgreement(marker, {
    agreementId: agreement.id,
    agreementVersion: agreement.version,
    contactVerification: request.guestEmail,
  });

  publicDto = await commercial.getCustomerSafeWorkflow(marker, request);
  assert.equal(publicDto.stage, "AWAITING_EXTERNAL_PAYMENT");
  assert.equal(publicDto.externalPayment.status, "AWAITING_EXTERNAL_PAYMENT");
  assert.equal(publicDto.agreements[0].acceptance.agreementVersion, 1);
  assert(publicDto.agreements[0].acceptance.acceptedAt);
  await expectCode(() => commercial.confirmBooking(marker, actor.id, actor.role), "BOOKING_CONFIRMATION_NOT_PERMITTED");

  await commercial.confirmExternalPayment(marker, {
    amountConfirmed: "1380.00",
    currency: "INR",
    externalReference: "RUNTIME-EXTERNAL-REFERENCE",
    internalNote: "Must remain internal",
  }, actor.id);

  publicDto = await commercial.getCustomerSafeWorkflow(marker, request);
  assert.equal(publicDto.stage, "PAYMENT_CONFIRMED");
  assert.equal(publicDto.externalPayment.status, "PAYMENT_CONFIRMED");
  assert.equal(Object.prototype.hasOwnProperty.call(publicDto.externalPayment, "internalNote"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(publicDto.externalPayment, "confirmedByUserId"), false);

  await commercial.confirmBooking(marker, actor.id, actor.role);
  publicDto = await commercial.getCustomerSafeWorkflow(marker, request);
  assert.equal(publicDto.stage, "BOOKING_CONFIRMED");

  const persisted = await prisma.universalRequest.findUnique({ where: { id: requestId } });
  assert.equal(persisted.referenceId, marker);
  assert.equal(persisted.currentStage, "Booking Confirmed");

  const serialized = JSON.stringify(publicDto);
  for (const forbidden of ["createdByUserId", "releasedByUserId", "confirmedByUserId", "bookingConfirmedByUserId", "internalNote", "actorRole", "authorization"]) {
    assert.equal(serialized.includes(forbidden), false, `Public DTO exposed ${forbidden}`);
  }

  console.log(JSON.stringify({
    passed: true,
    sameServiceRequestId: true,
    quotationVersions: [quote1.version, quote2.version],
    finalStage: publicDto.stage,
    externalPaymentState: publicDto.externalPayment.status,
    draftLeak: false,
    internalFieldLeak: false,
  }));
}

main()
  .finally(async () => {
    if (requestId) {
      const candidate = await prisma.universalRequest.findUnique({ where: { id: requestId }, select: { referenceId: true, metadata: true } });
      if (candidate && candidate.referenceId === marker && candidate.metadata && candidate.metadata.isolatedTest === true) {
        await prisma.universalRequest.delete({ where: { id: requestId } });
      }
    }
    await prisma.$disconnect();
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
