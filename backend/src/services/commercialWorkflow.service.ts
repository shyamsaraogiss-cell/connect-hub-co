import { Prisma, QuotationDecisionType } from "@prisma/client";
import { prisma } from "../lib/prisma";
import type {
  AgreementAcceptanceInput,
  ConfirmExternalPaymentInput,
  CreateQuotationInput,
  CustomerPaymentDetailsInput,
  QuotationDecisionInput,
} from "../types/commercialWorkflow";

export class CommercialWorkflowError extends Error {
  constructor(public readonly code: string, public readonly status: number) {
    super(code);
  }
}

const CUSTOMER_RESPONSIBILITIES = [
  "Provide accurate customer, participant, service, and scheduling information.",
  "Follow agreed preparation, conduct, and external payment instructions.",
  "Notify Connect Hub Co. promptly of material changes or cancellation requests.",
];
const CONNECT_HUB_RESPONSIBILITIES = [
  "Coordinate the agreed service scope with the assigned service team or partner.",
  "Communicate material scheduling or scope changes through the registered contact details.",
  "Maintain customer-visible status updates under the Service Request ID.",
];
const IMPORTANT_DISCLOSURES = [
  "Service delivery is subject to availability, local conditions, and timely customer cooperation.",
  "Religious guidance and ritual decisions remain with appropriately qualified Verified Priests.",
  "Payment is completed externally; this website does not collect or process payment credentials.",
];
const EXTERNAL_BANK_PAYMENT_MODES = new Set(["BANK_TRANSFER", "NEFT", "RTGS", "IMPS"]);

function cleanText(value: unknown, field: string, max = 4000): string {
  if (typeof value !== "string" || !value.trim()) throw new CommercialWorkflowError(`INVALID_${field.toUpperCase()}`, 400);
  return value.trim().slice(0, max);
}

function cleanList(value: unknown, field: string): string[] {
  if (!Array.isArray(value)) throw new CommercialWorkflowError(`INVALID_${field.toUpperCase()}`, 400);
  return value.map((item) => cleanText(item, field, 1000)).slice(0, 100);
}

function money(value: string | number | null | undefined, field: string, optional = false): Prisma.Decimal | null {
  if ((value === undefined || value === null || value === "") && optional) return null;
  try {
    const decimal = new Prisma.Decimal(value as string | number);
    if (decimal.isNegative()) throw new Error();
    return decimal;
  } catch {
    throw new CommercialWorkflowError(`INVALID_${field.toUpperCase()}`, 400);
  }
}

function dateOrNull(value?: string | null): Date | null {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) throw new CommercialWorkflowError("INVALID_VALID_UNTIL", 400);
  return parsed;
}

async function serviceRequest(referenceId: string) {
  const request = await prisma.universalRequest.findUnique({ where: { referenceId: referenceId.toUpperCase() } });
  if (!request || request.requestType !== "SERVICE_REQUEST") throw new CommercialWorkflowError("SERVICE_REQUEST_NOT_FOUND", 404);
  return request;
}

async function verifiedServiceRequest(referenceId: string, contactVerification: string) {
  const value = cleanText(contactVerification, "contact_verification", 320);
  const request = await prisma.universalRequest.findFirst({
    where: {
      referenceId: referenceId.toUpperCase(),
      requestType: "SERVICE_REQUEST",
      OR: [{ guestEmail: { equals: value.toLowerCase(), mode: "insensitive" } }, { guestPhone: value }],
    },
  });
  if (!request) throw new CommercialWorkflowError("REQUEST_NOT_FOUND_OR_VERIFICATION_FAILED", 404);
  return request;
}

export async function createQuotation(referenceId: string, input: CreateQuotationInput, actorUserId: string) {
  const request = await serviceRequest(referenceId);
  const basePrice = money(input.basePrice, "base_price")!;
  const charges = money(input.applicableChargesTaxes ?? 0, "applicable_charges_taxes")!;
  const validUntil = dateOrNull(input.validUntil);
  if (validUntil && validUntil <= new Date()) throw new CommercialWorkflowError("VALIDITY_MUST_BE_FUTURE", 400);

  return prisma.$transaction(async (tx) => {
    const workflow = await tx.serviceCommercialWorkflow.upsert({
      where: { requestId: request.id },
      create: { requestId: request.id, stage: "NOT_STARTED" },
      update: {},
    });
    if (!["NOT_STARTED", "QUOTATION_CHANGE_REQUESTED", "QUOTATION_REJECTED"].includes(workflow.stage)) {
      throw new CommercialWorkflowError("QUOTATION_CREATION_NOT_PERMITTED", 409);
    }
    const latest = await tx.serviceQuotation.findFirst({ where: { requestId: request.id }, orderBy: { version: "desc" }, select: { version: true } });
    const quotation = await tx.serviceQuotation.create({
      data: {
        workflowId: workflow.id,
        requestId: request.id,
        version: (latest?.version ?? 0) + 1,
        serviceName: cleanText(input.serviceName, "service_name", 300),
        serviceScope: cleanText(input.serviceScope, "service_scope"),
        inclusions: cleanList(input.inclusions, "inclusions"),
        exclusions: cleanList(input.exclusions, "exclusions"),
        basePrice,
        applicableChargesTaxes: charges,
        finalPrice: basePrice.add(charges),
        currency: (input.currency ?? "INR").trim().toUpperCase().slice(0, 3),
        validUntil,
        notes: input.notes?.trim().slice(0, 4000) || null,
        paymentTerms: cleanText(input.paymentTerms, "payment_terms"),
        paymentInstructions: cleanText(input.paymentInstructions, "payment_instructions"),
        createdByUserId: actorUserId,
      },
    });
    await tx.serviceCommercialWorkflow.update({ where: { id: workflow.id }, data: { stage: "QUOTATION_DRAFT" } });
    return quotation;
  });
}

export async function releaseQuotation(referenceId: string, quotationId: string, actorUserId: string, actorRole = "ADMIN") {
  const request = await serviceRequest(referenceId);
  return prisma.$transaction(async (tx) => {
    const quotation = await tx.serviceQuotation.findFirst({ where: { id: quotationId, requestId: request.id, status: "DRAFT" } });
    if (!quotation) throw new CommercialWorkflowError("DRAFT_QUOTATION_NOT_FOUND", 404);
    const newer = await tx.serviceQuotation.findFirst({ where: { requestId: request.id, version: { gt: quotation.version } } });
    if (newer) throw new CommercialWorkflowError("ONLY_LATEST_QUOTATION_CAN_BE_RELEASED", 409);
    await tx.serviceQuotation.updateMany({ where: { requestId: request.id, status: "RELEASED" }, data: { status: "SUPERSEDED" } });
    const released = await tx.serviceQuotation.update({
      where: { id: quotation.id },
      data: { status: "RELEASED", releasedAt: new Date(), releasedByUserId: actorUserId },
    });
    await tx.serviceCommercialWorkflow.update({ where: { id: quotation.workflowId }, data: { stage: "QUOTATION_RELEASED" } });
    await tx.universalRequestStatusHistory.create({ data: {
      requestId: request.id, previousStatus: request.currentStatus, newStatus: request.currentStatus,
      previousStage: request.currentStage, newStage: "Quotation Released", changedByUserId: actorUserId,
      changedByRole: actorRole, publicNote: `Quotation version ${quotation.version} is available for review.`,
    } });
    return released;
  });
}

export async function reviseQuotation(referenceId: string, priorQuotationId: string, input: CreateQuotationInput, actorUserId: string) {
  const request = await serviceRequest(referenceId);
  const prior = await prisma.serviceQuotation.findFirst({
    where: { id: priorQuotationId, requestId: request.id, status: { in: ["CHANGE_REQUESTED", "REJECTED"] } },
    select: { id: true },
  });
  if (!prior) throw new CommercialWorkflowError("QUOTATION_REVISION_NOT_PERMITTED", 409);
  return createQuotation(referenceId, input, actorUserId);
}

export async function recordQuotationDecision(referenceId: string, input: QuotationDecisionInput, customerUserId?: string) {
  const request = await verifiedServiceRequest(referenceId, input.contactVerification);
  if (!Object.values(QuotationDecisionType).includes(input.decision)) throw new CommercialWorkflowError("INVALID_QUOTATION_DECISION", 400);
  if (input.decision === "REQUEST_CHANGE" && typeof input.changeRequest === "string" && input.changeRequest.trim().length > 1000) {
    throw new CommercialWorkflowError("INVALID_CHANGE_REQUEST", 400);
  }
  const changeRequest = input.decision === "REQUEST_CHANGE" ? cleanText(input.changeRequest, "change_request", 1000) : null;

  return prisma.$transaction(async (tx) => {
    const quotation = await tx.serviceQuotation.findFirst({ where: { id: input.quotationId, requestId: request.id }, include: { decisions: true } });
    if (!quotation) throw new CommercialWorkflowError("QUOTATION_NOT_FOUND", 404);
    const existing = quotation.decisions[0];
    if (existing) {
      if (existing.decision === input.decision && (existing.changeRequest ?? null) === changeRequest) return existing;
      throw new CommercialWorkflowError("QUOTATION_ALREADY_DECIDED", 409);
    }
    if (quotation.status !== "RELEASED") throw new CommercialWorkflowError("QUOTATION_NOT_ACTIONABLE", 409);
    if (quotation.validUntil && quotation.validUntil <= new Date()) {
      await tx.serviceQuotation.update({ where: { id: quotation.id }, data: { status: "EXPIRED" } });
      throw new CommercialWorkflowError("QUOTATION_EXPIRED", 409);
    }
    const status = input.decision === "ACCEPT" ? "ACCEPTED" : input.decision === "REJECT" ? "REJECTED" : "CHANGE_REQUESTED";
    const stage = input.decision === "ACCEPT" ? "QUOTATION_ACCEPTED" : input.decision === "REJECT" ? "QUOTATION_REJECTED" : "QUOTATION_CHANGE_REQUESTED";
    const decision = await tx.quotationCustomerDecision.create({ data: {
      requestId: request.id, quotationId: quotation.id, decision: input.decision, changeRequest, customerUserId,
    } });
    await tx.serviceQuotation.update({ where: { id: quotation.id }, data: {
      status, acceptedAt: input.decision === "ACCEPT" ? new Date() : undefined, rejectedAt: input.decision === "REJECT" ? new Date() : undefined,
    } });
    await tx.serviceCommercialWorkflow.update({ where: { id: quotation.workflowId }, data: { stage } });
    if (input.decision === "ACCEPT") {
      const latestAgreement = await tx.clientServiceAgreement.findFirst({ where: { requestId: request.id }, orderBy: { version: "desc" }, select: { version: true } });
      await tx.clientServiceAgreement.create({ data: {
        workflowId: quotation.workflowId, requestId: request.id, quotationId: quotation.id,
        version: (latestAgreement?.version ?? 0) + 1, customerName: request.guestName,
        customerEmail: request.guestEmail, customerPhone: request.guestPhone,
        selectedService: quotation.serviceName, agreedScope: quotation.serviceScope,
        inclusions: quotation.inclusions, exclusions: quotation.exclusions,
        finalAgreedPrice: quotation.finalPrice, currency: quotation.currency,
        paymentTerms: quotation.paymentTerms, paymentInstructions: quotation.paymentInstructions,
        customerResponsibilities: CUSTOMER_RESPONSIBILITIES,
        connectHubResponsibilities: CONNECT_HUB_RESPONSIBILITIES,
        cancellationRefundPolicyReference: "/cancellation-policy",
        importantServiceDisclosures: IMPORTANT_DISCLOSURES,
      } });
      await tx.serviceCommercialWorkflow.update({ where: { id: quotation.workflowId }, data: { stage: "AGREEMENT_AVAILABLE" } });
    }
    return decision;
  });
}

export async function acceptAgreement(referenceId: string, input: AgreementAcceptanceInput, customerUserId?: string) {
  const request = await verifiedServiceRequest(referenceId, input.contactVerification);
  return prisma.$transaction(async (tx) => {
    const agreement = await tx.clientServiceAgreement.findFirst({ where: { id: input.agreementId, requestId: request.id }, include: { acceptance: true } });
    if (!agreement) throw new CommercialWorkflowError("AGREEMENT_NOT_FOUND", 404);
    if (agreement.acceptance) {
      if (agreement.acceptance.agreementVersion === input.agreementVersion) return agreement.acceptance;
      throw new CommercialWorkflowError("AGREEMENT_ALREADY_ACCEPTED", 409);
    }
    if (agreement.status !== "AVAILABLE" || agreement.version !== input.agreementVersion) throw new CommercialWorkflowError("AGREEMENT_NOT_ACTIONABLE", 409);
    const acceptance = await tx.clientAgreementAcceptance.create({ data: {
      requestId: request.id, agreementId: agreement.id, agreementVersion: agreement.version, customerUserId,
    } });
    await tx.clientServiceAgreement.update({ where: { id: agreement.id }, data: { status: "ACCEPTED" } });
    await tx.externalPaymentConfirmation.create({ data: {
      workflowId: agreement.workflowId, requestId: request.id, agreementId: agreement.id,
      status: "AWAITING_EXTERNAL_PAYMENT", currency: agreement.currency,
    } });
    await tx.serviceCommercialWorkflow.update({ where: { id: agreement.workflowId }, data: { stage: "AWAITING_EXTERNAL_PAYMENT" } });
    return acceptance;
  });
}

export async function submitCustomerPaymentDetails(referenceId: string, input: CustomerPaymentDetailsInput, customerUserId?: string) {
  const request = await verifiedServiceRequest(referenceId, input.contactVerification);
  const amountPaid = money(input.amountPaid, "amount_paid")!;
  if (amountPaid.lte(0)) throw new CommercialWorkflowError("INVALID_AMOUNT_PAID", 400);
  const paymentDate = new Date(input.paymentDate);
  if (Number.isNaN(paymentDate.getTime()) || paymentDate > new Date()) throw new CommercialWorkflowError("INVALID_PAYMENT_DATE", 400);
  if (!EXTERNAL_BANK_PAYMENT_MODES.has(input.paymentMode)) throw new CommercialWorkflowError("INVALID_PAYMENT_MODE", 400);
  const externalReference = cleanText(input.externalReference, "external_reference", 200);
  const payerName = cleanText(input.payerName, "payer_name", 200);
  if (typeof input.remarks === "string" && input.remarks.trim().length > 1000) throw new CommercialWorkflowError("INVALID_REMARKS", 400);
  const remarks = input.remarks?.trim() || null;

  try {
    const submission = await prisma.$transaction(async (tx) => {
      const workflow = await tx.serviceCommercialWorkflow.findUnique({ where: { requestId: request.id } });
      if (!workflow || workflow.stage !== "AWAITING_EXTERNAL_PAYMENT") throw new CommercialWorkflowError("PAYMENT_DETAILS_NOT_PERMITTED", 409);
      const agreement = await tx.clientServiceAgreement.findFirst({ where: { requestId: request.id, status: "ACCEPTED", acceptance: { isNot: null } } });
      if (!agreement || agreement.workflowId !== workflow.id) throw new CommercialWorkflowError("PAYMENT_DETAILS_NOT_PERMITTED", 409);
      const existing = await tx.customerPaymentDetailSubmission.findUnique({ where: { requestId: request.id } });
      if (existing) throw new CommercialWorkflowError("PAYMENT_DETAILS_ALREADY_SUBMITTED", 409);
      return tx.customerPaymentDetailSubmission.create({ data: {
        workflowId: workflow.id, requestId: request.id, agreementId: agreement.id,
        amountPaid, currency: agreement.currency, paymentDate, externalReference,
        paymentMode: input.paymentMode, payerName, remarks, submittedByCustomerUserId: customerUserId,
      } });
    });
    return {
      amountPaid: submission.amountPaid.toString(), currency: submission.currency,
      paymentDate: submission.paymentDate, externalReference: submission.externalReference,
      paymentMode: submission.paymentMode, payerName: submission.payerName,
      remarks: submission.remarks, submittedAt: submission.submittedAt,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw new CommercialWorkflowError("PAYMENT_DETAILS_ALREADY_SUBMITTED", 409);
    }
    throw error;
  }
}

export async function confirmExternalPayment(referenceId: string, input: ConfirmExternalPaymentInput, actorUserId: string) {
  const request = await serviceRequest(referenceId);
  const amount = money(input.amountConfirmed, "amount_confirmed", true);
  const confirmedAt = input.confirmedAt ? new Date(input.confirmedAt) : new Date();
  if (Number.isNaN(confirmedAt.getTime())) throw new CommercialWorkflowError("INVALID_CONFIRMATION_TIME", 400);
  return prisma.$transaction(async (tx) => {
    const workflow = await tx.serviceCommercialWorkflow.findUnique({ where: { requestId: request.id } });
    if (!workflow || workflow.stage !== "AWAITING_EXTERNAL_PAYMENT") throw new CommercialWorkflowError("PAYMENT_CONFIRMATION_NOT_PERMITTED", 409);
    const payment = await tx.externalPaymentConfirmation.findUnique({ where: { requestId: request.id } });
    if (!payment || payment.status !== "AWAITING_EXTERNAL_PAYMENT") throw new CommercialWorkflowError("PAYMENT_CONFIRMATION_NOT_PERMITTED", 409);
    const submittedDetails = await tx.customerPaymentDetailSubmission.findUnique({ where: { requestId: request.id } });
    if (!submittedDetails) throw new CommercialWorkflowError("PAYMENT_DETAILS_REQUIRED", 409);
    const confirmed = await tx.externalPaymentConfirmation.update({ where: { id: payment.id }, data: {
      status: "PAYMENT_CONFIRMED", amountConfirmed: amount,
      currency: (input.currency ?? payment.currency).trim().toUpperCase().slice(0, 3),
      externalReference: input.externalReference?.trim().slice(0, 200) || null,
      confirmedAt, confirmedByUserId: actorUserId, internalNote: input.internalNote?.trim().slice(0, 4000) || null,
    } });
    await tx.serviceCommercialWorkflow.update({ where: { id: workflow.id }, data: { stage: "PAYMENT_CONFIRMED" } });
    return confirmed;
  });
}

export async function confirmBooking(referenceId: string, actorUserId: string, actorRole = "ADMIN") {
  const request = await serviceRequest(referenceId);
  return prisma.$transaction(async (tx) => {
    const workflow = await tx.serviceCommercialWorkflow.findUnique({ where: { requestId: request.id } });
    if (!workflow) throw new CommercialWorkflowError("COMMERCIAL_WORKFLOW_NOT_FOUND", 404);
    if (workflow.stage === "BOOKING_CONFIRMED") return workflow;
    if (workflow.stage !== "PAYMENT_CONFIRMED") throw new CommercialWorkflowError("BOOKING_CONFIRMATION_NOT_PERMITTED", 409);
    const quotation = await tx.serviceQuotation.findFirst({ where: { requestId: request.id, status: "ACCEPTED" } });
    const agreement = await tx.clientServiceAgreement.findFirst({ where: { requestId: request.id, status: "ACCEPTED", acceptance: { isNot: null } } });
    const payment = await tx.externalPaymentConfirmation.findUnique({ where: { requestId: request.id } });
    if (!quotation || !agreement || agreement.quotationId !== quotation.id || !payment || payment.agreementId !== agreement.id || payment.status !== "PAYMENT_CONFIRMED") {
      throw new CommercialWorkflowError("BOOKING_PREREQUISITES_NOT_MET", 409);
    }
    const confirmedAt = new Date();
    const updated = await tx.serviceCommercialWorkflow.update({ where: { id: workflow.id }, data: {
      stage: "BOOKING_CONFIRMED", bookingConfirmedAt: confirmedAt, bookingConfirmedByUserId: actorUserId,
    } });
    await tx.universalRequest.update({ where: { id: request.id }, data: { currentStage: "Booking Confirmed", publicNote: "Booking confirmed." } });
    await tx.universalRequestStatusHistory.create({ data: {
      requestId: request.id, previousStatus: request.currentStatus, newStatus: request.currentStatus,
      previousStage: request.currentStage, newStage: "Booking Confirmed", changedByUserId: actorUserId,
      changedByRole: actorRole, publicNote: "Booking confirmed.",
    } });
    return updated;
  });
}

export async function getInternalWorkflow(referenceId: string) {
  const request = await serviceRequest(referenceId);
  return prisma.serviceCommercialWorkflow.findUnique({
    where: { requestId: request.id },
    include: { quotations: { orderBy: { version: "desc" }, include: { decisions: true } }, agreements: { orderBy: { version: "desc" }, include: { acceptance: true } }, externalPaymentConfirmation: true, customerPaymentDetailSubmission: true },
  });
}

export async function getCustomerSafeWorkflow(referenceId: string, verifiedRequest?: { id: string; requestType: string }) {
  const request = verifiedRequest ?? await prisma.universalRequest.findUnique({ where: { referenceId: referenceId.toUpperCase() }, select: { id: true, requestType: true } });
  if (!request || request.requestType !== "SERVICE_REQUEST") return null;
  const workflow = await prisma.serviceCommercialWorkflow.findUnique({
    where: { requestId: request.id },
    include: {
      quotations: { where: { status: { in: ["RELEASED", "CHANGE_REQUESTED", "ACCEPTED", "REJECTED", "EXPIRED", "SUPERSEDED"] } }, orderBy: { version: "desc" }, include: { decisions: { select: { decision: true, changeRequest: true, decidedAt: true } } } },
      agreements: { where: { status: { in: ["AVAILABLE", "ACCEPTED"] } }, orderBy: { version: "desc" }, include: { acceptance: { select: { agreementVersion: true, acceptedAt: true } } } },
      externalPaymentConfirmation: { select: { status: true, amountConfirmed: true, currency: true, externalReference: true, confirmedAt: true } },
      customerPaymentDetailSubmission: { select: { amountPaid: true, currency: true, paymentDate: true, externalReference: true, paymentMode: true, payerName: true, remarks: true, submittedAt: true } },
    },
  });
  if (!workflow) return null;
  return {
    stage: workflow.stage,
    bookingConfirmedAt: workflow.bookingConfirmedAt,
    quotations: workflow.quotations.map(({ decisions, ...quote }) => ({
      id: quote.id, version: quote.version, status: quote.status, serviceName: quote.serviceName,
      serviceScope: quote.serviceScope, inclusions: quote.inclusions, exclusions: quote.exclusions,
      basePrice: quote.basePrice.toString(), applicableChargesTaxes: quote.applicableChargesTaxes.toString(),
      finalPrice: quote.finalPrice.toString(), currency: quote.currency, validUntil: quote.validUntil,
      notes: quote.notes, paymentTerms: quote.paymentTerms, paymentInstructions: quote.paymentInstructions,
      releasedAt: quote.releasedAt, acceptedAt: quote.acceptedAt, rejectedAt: quote.rejectedAt, decision: decisions[0] ?? null,
    })),
    agreements: workflow.agreements.map((agreement) => ({
      id: agreement.id, version: agreement.version, status: agreement.status,
      serviceRequestId: referenceId.toUpperCase(), customerName: agreement.customerName,
      customerEmail: agreement.customerEmail, customerPhone: agreement.customerPhone,
      selectedService: agreement.selectedService, agreedScope: agreement.agreedScope,
      inclusions: agreement.inclusions, exclusions: agreement.exclusions,
      finalAgreedPrice: agreement.finalAgreedPrice.toString(), currency: agreement.currency,
      paymentTerms: agreement.paymentTerms, paymentInstructions: agreement.paymentInstructions,
      customerResponsibilities: agreement.customerResponsibilities,
      connectHubResponsibilities: agreement.connectHubResponsibilities,
      cancellationRefundPolicyReference: agreement.cancellationRefundPolicyReference,
      importantServiceDisclosures: agreement.importantServiceDisclosures,
      generatedAt: agreement.generatedAt, acceptance: agreement.acceptance,
    })),
    externalPayment: workflow.externalPaymentConfirmation,
    paymentDetails: workflow.customerPaymentDetailSubmission ? {
      amountPaid: workflow.customerPaymentDetailSubmission.amountPaid.toString(),
      currency: workflow.customerPaymentDetailSubmission.currency,
      paymentDate: workflow.customerPaymentDetailSubmission.paymentDate,
      externalReference: workflow.customerPaymentDetailSubmission.externalReference,
      paymentMode: workflow.customerPaymentDetailSubmission.paymentMode,
      payerName: workflow.customerPaymentDetailSubmission.payerName,
      remarks: workflow.customerPaymentDetailSubmission.remarks,
      submittedAt: workflow.customerPaymentDetailSubmission.submittedAt,
    } : null,
  };
}
