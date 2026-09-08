import test from "node:test";
import assert from "node:assert/strict";
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import * as service from "./commercialWorkflow.service";

async function replace<T extends object, K extends keyof T>(object: T, key: K, value: T[K], action: () => Promise<void>) {
  const original = object[key];
  object[key] = value;
  try { await action(); } finally { object[key] = original; }
}

const request = {
  id: "request-1", referenceId: "CHC-2026-123456", requestType: "SERVICE_REQUEST",
  guestName: "Customer", guestEmail: "customer@example.test", guestPhone: "+919999999999",
  currentStatus: "UNDER_REVIEW", currentStage: "Review",
};

test("commercial workflow rejects non-service Universal Requests", { concurrency: false }, async () => {
  await replace(prisma.universalRequest, "findUnique", (async () => ({ ...request, requestType: "PARTNER_REGISTRATION" })) as never, async () => {
    await assert.rejects(
      () => service.createQuotation(request.referenceId, {
        serviceName: "Service", serviceScope: "Scope", inclusions: [], exclusions: [], basePrice: 100,
        paymentTerms: "Terms", paymentInstructions: "External payment instructions",
      }, "admin-1"),
      (error: unknown) => error instanceof service.CommercialWorkflowError && error.code === "SERVICE_REQUEST_NOT_FOUND",
    );
  });
});

test("customer-safe DTO excludes drafts and internal payment fields", { concurrency: false }, async () => {
  await replace(prisma.universalRequest, "findUnique", (async () => ({ id: request.id, requestType: request.requestType })) as never, async () => {
    await replace(prisma.serviceCommercialWorkflow, "findUnique", (async ({ include }: any) => {
      assert.deepEqual(include.quotations.where.status.in, ["RELEASED", "CHANGE_REQUESTED", "ACCEPTED", "REJECTED", "EXPIRED", "SUPERSEDED"]);
      assert.deepEqual(Object.keys(include.externalPaymentConfirmation.select).sort(), ["amountConfirmed", "confirmedAt", "currency", "externalReference", "status"].sort());
      return {
        stage: "AWAITING_EXTERNAL_PAYMENT", bookingConfirmedAt: null,
        quotations: [{
          id: "quote-1", version: 1, status: "ACCEPTED", serviceName: "Service", serviceScope: "Scope",
          inclusions: ["Included"], exclusions: ["Excluded"], basePrice: new Prisma.Decimal(100),
          applicableChargesTaxes: new Prisma.Decimal(5), finalPrice: new Prisma.Decimal(105), currency: "INR",
          validUntil: null, notes: null, paymentTerms: "Terms", paymentInstructions: "Pay externally",
          releasedAt: new Date(), acceptedAt: new Date(), rejectedAt: null, decisions: [{ decision: "ACCEPT", changeRequest: null, decidedAt: new Date() }],
          createdByUserId: "secret", releasedByUserId: "secret", workflowId: "workflow-1", requestId: request.id,
          createdAt: new Date(), updatedAt: new Date(),
        }],
        agreements: [],
        externalPaymentConfirmation: { status: "AWAITING_EXTERNAL_PAYMENT", amountConfirmed: null, currency: "INR", externalReference: null, confirmedAt: null },
        customerPaymentDetailSubmission: {
          id: "secret", workflowId: "secret", requestId: request.id, agreementId: "agreement-1",
          amountPaid: new Prisma.Decimal(105), currency: "INR", paymentDate: new Date("2026-09-01"),
          externalReference: "BANK-123", paymentMode: "NEFT", payerName: "Customer", remarks: null,
          submittedByCustomerUserId: "secret", submissionChannel: "PUBLIC_TRACKING", submittedAt: new Date(),
        },
      };
    }) as never, async () => {
      const dto = await service.getCustomerSafeWorkflow(request.referenceId) as any;
      assert.equal(dto.quotations[0].createdByUserId, undefined);
      assert.equal(dto.quotations[0].releasedByUserId, undefined);
      assert.equal(dto.externalPayment.internalNote, undefined);
      assert.equal(dto.externalPayment.confirmedByUserId, undefined);
      assert.equal(dto.paymentDetails.amountPaid, "105");
      assert.equal(dto.paymentDetails.id, undefined);
      assert.equal(dto.paymentDetails.submittedByCustomerUserId, undefined);
      assert.equal(dto.paymentDetails.submissionChannel, undefined);
    });
  });
});

test("public quotation decision requires matching registered contact", { concurrency: false }, async () => {
  await replace(prisma.universalRequest, "findFirst", (async () => null) as never, async () => {
    await assert.rejects(
      () => service.recordQuotationDecision(request.referenceId, { quotationId: "quote-1", decision: "ACCEPT", contactVerification: "wrong@example.test" }),
      (error: unknown) => error instanceof service.CommercialWorkflowError && error.code === "REQUEST_NOT_FOUND_OR_VERIFICATION_FAILED" && error.status === 404,
    );
  });
});

test("agreement acceptance creates only an awaiting external-payment confirmation", { concurrency: false }, async () => {
  await replace(prisma.universalRequest, "findFirst", (async () => request) as never, async () => {
    let paymentData: any;
    await replace(prisma, "$transaction", (async (callback: any) => callback({
      clientServiceAgreement: {
        findFirst: async () => ({ id: "agreement-1", requestId: request.id, workflowId: "workflow-1", version: 1, status: "AVAILABLE", currency: "INR", acceptance: null }),
        update: async () => undefined,
      },
      clientAgreementAcceptance: { create: async ({ data }: any) => ({ id: "acceptance-1", ...data }) },
      externalPaymentConfirmation: { create: async ({ data }: any) => { paymentData = data; return data; } },
      serviceCommercialWorkflow: { update: async () => undefined },
    })) as never, async () => {
      await service.acceptAgreement(request.referenceId, {
        agreementId: "agreement-1", agreementVersion: 1, contactVerification: request.guestEmail,
      });
      assert.equal(paymentData.status, "AWAITING_EXTERNAL_PAYMENT");
      assert.equal(paymentData.gatewayReference, undefined);
      assert.equal(paymentData.paymentMethod, undefined);
    });
  });
});

test("manual external-payment confirmation stores the authenticated actor", { concurrency: false }, async () => {
  await replace(prisma.universalRequest, "findUnique", (async () => request) as never, async () => {
    let updateData: any;
    await replace(prisma, "$transaction", (async (callback: any) => callback({
      serviceCommercialWorkflow: {
        findUnique: async () => ({ id: "workflow-1", stage: "AWAITING_EXTERNAL_PAYMENT" }),
        update: async () => undefined,
      },
      externalPaymentConfirmation: {
        findUnique: async () => ({ id: "payment-1", status: "AWAITING_EXTERNAL_PAYMENT", currency: "INR" }),
        update: async ({ data }: any) => { updateData = data; return data; },
      },
      customerPaymentDetailSubmission: { findUnique: async () => ({ id: "submitted-details-1" }) },
    })) as never, async () => {
      await service.confirmExternalPayment(request.referenceId, { amountConfirmed: "105.00", externalReference: "UTR-123" }, "admin-from-auth");
      assert.equal(updateData.status, "PAYMENT_CONFIRMED");
      assert.equal(updateData.confirmedByUserId, "admin-from-auth");
      assert.equal(updateData.externalReference, "UTR-123");
    });
  });
});

test("customer payment details remain verification-pending and do not confirm payment", { concurrency: false }, async () => {
  await replace(prisma.universalRequest, "findFirst", (async () => request) as never, async () => {
    let createdData: any;
    let workflowUpdated = false;
    await replace(prisma, "$transaction", (async (callback: any) => callback({
      serviceCommercialWorkflow: { findUnique: async () => ({ id: "workflow-1", stage: "AWAITING_EXTERNAL_PAYMENT" }), update: async () => { workflowUpdated = true; } },
      clientServiceAgreement: { findFirst: async () => ({ id: "agreement-1", workflowId: "workflow-1", currency: "INR" }) },
      customerPaymentDetailSubmission: {
        findUnique: async () => null,
        create: async ({ data }: any) => { createdData = data; return { id: "details-1", ...data }; },
      },
    })) as never, async () => {
      const result = await service.submitCustomerPaymentDetails(request.referenceId, {
        amountPaid: "5100.00", paymentDate: "2026-09-01", externalReference: "BANK-UTR-123",
        paymentMode: "NEFT", payerName: "Customer", remarks: "Reported payment", contactVerification: request.guestEmail,
      });
      assert.equal(createdData.requestId, request.id);
      assert.equal(createdData.paymentMode, "NEFT");
      assert.equal(workflowUpdated, false);
      assert.equal(createdData.status, undefined);
      assert.equal(createdData.confirmedAt, undefined);
      assert.equal((result as any).id, undefined);
      assert.equal((result as any).requestId, undefined);
      assert.equal((result as any).submittedByCustomerUserId, undefined);
    });
  });
});

test("customer payment details enforce required lifecycle and safe field limits", { concurrency: false }, async () => {
  await replace(prisma.universalRequest, "findFirst", (async () => request) as never, async () => {
    await assert.rejects(
      () => service.submitCustomerPaymentDetails(request.referenceId, {
        amountPaid: 0, paymentDate: "2026-09-01", externalReference: "BANK-1", paymentMode: "NEFT",
        payerName: "Customer", contactVerification: request.guestEmail,
      }),
      (error: unknown) => error instanceof service.CommercialWorkflowError && error.code === "INVALID_AMOUNT_PAID",
    );
    await assert.rejects(
      () => service.submitCustomerPaymentDetails(request.referenceId, {
        amountPaid: 1, paymentDate: "2026-09-01", externalReference: "BANK-1", paymentMode: "NEFT",
        payerName: "Customer", remarks: "x".repeat(1001), contactVerification: request.guestEmail,
      }),
      (error: unknown) => error instanceof service.CommercialWorkflowError && error.code === "INVALID_REMARKS",
    );
  });
});

test("booking confirmation is blocked before internally confirmed external payment", { concurrency: false }, async () => {
  await replace(prisma.universalRequest, "findUnique", (async () => request) as never, async () => {
    await replace(prisma, "$transaction", (async (callback: any) => callback({
      serviceCommercialWorkflow: { findUnique: async () => ({ id: "workflow-1", stage: "AWAITING_EXTERNAL_PAYMENT" }) },
    })) as never, async () => {
      await assert.rejects(
        () => service.confirmBooking(request.referenceId, "admin-1"),
        (error: unknown) => error instanceof service.CommercialWorkflowError && error.code === "BOOKING_CONFIRMATION_NOT_PERMITTED",
      );
    });
  });
});

test("booking confirmation requires accepted quote, accepted agreement, and matching confirmed payment", { concurrency: false }, async () => {
  await replace(prisma.universalRequest, "findUnique", (async () => request) as never, async () => {
    let bookingData: any;
    await replace(prisma, "$transaction", (async (callback: any) => callback({
      serviceCommercialWorkflow: {
        findUnique: async () => ({ id: "workflow-1", stage: "PAYMENT_CONFIRMED" }),
        update: async ({ data }: any) => { bookingData = data; return { id: "workflow-1", ...data }; },
      },
      serviceQuotation: { findFirst: async () => ({ id: "quote-1" }) },
      clientServiceAgreement: { findFirst: async () => ({ id: "agreement-1", quotationId: "quote-1" }) },
      externalPaymentConfirmation: { findUnique: async () => ({ agreementId: "agreement-1", status: "PAYMENT_CONFIRMED" }) },
      universalRequest: { update: async () => undefined },
      universalRequestStatusHistory: { create: async () => undefined },
    })) as never, async () => {
      await service.confirmBooking(request.referenceId, "admin-1");
      assert.equal(bookingData.stage, "BOOKING_CONFIRMED");
      assert.equal(bookingData.bookingConfirmedByUserId, "admin-1");
    });
  });
});

test("quotation change request rejects more than 1,000 characters", { concurrency: false }, async () => {
  await replace(prisma.universalRequest, "findFirst", (async () => request) as never, async () => {
    await assert.rejects(
      () => service.recordQuotationDecision(request.referenceId, {
        quotationId: "quote-1",
        decision: "REQUEST_CHANGE",
        changeRequest: "x".repeat(1001),
        contactVerification: request.guestEmail,
      }),
      (error: unknown) => error instanceof service.CommercialWorkflowError
        && error.code === "INVALID_CHANGE_REQUEST"
        && error.status === 400,
    );
  });
});

test("quotation change request accepts exactly 1,000 characters", { concurrency: false }, async () => {
  await replace(prisma.universalRequest, "findFirst", (async () => request) as never, async () => {
    let storedChangeRequest = "";
    await replace(prisma, "$transaction", (async (callback: any) => callback({
      serviceQuotation: {
        findFirst: async () => ({ id: "quote-1", workflowId: "workflow-1", status: "RELEASED", validUntil: null, decisions: [] }),
        update: async () => undefined,
      },
      quotationCustomerDecision: { create: async ({ data }: any) => { storedChangeRequest = data.changeRequest; return data; } },
      serviceCommercialWorkflow: { update: async () => undefined },
      universalRequestStatusHistory: { create: async () => undefined },
    })) as never, async () => {
      const exactLimit = "x".repeat(1000);
      await service.recordQuotationDecision(request.referenceId, {
        quotationId: "quote-1",
        decision: "REQUEST_CHANGE",
        changeRequest: exactLimit,
        contactVerification: request.guestEmail,
      });
      assert.equal(storedChangeRequest, exactLimit);
    });
  });
});
