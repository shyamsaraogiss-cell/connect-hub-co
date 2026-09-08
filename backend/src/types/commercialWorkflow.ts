import type { QuotationDecisionType } from "@prisma/client";

export interface CreateQuotationInput {
  serviceName: string;
  serviceScope: string;
  inclusions: string[];
  exclusions: string[];
  basePrice: string | number;
  applicableChargesTaxes?: string | number;
  currency?: string;
  validUntil?: string | null;
  notes?: string | null;
  paymentTerms: string;
  paymentInstructions: string;
}

export interface QuotationDecisionInput {
  quotationId: string;
  decision: QuotationDecisionType;
  changeRequest?: string;
  contactVerification: string;
}

export interface AgreementAcceptanceInput {
  agreementId: string;
  agreementVersion: number;
  contactVerification: string;
}

export type ExternalBankPaymentModeInput = "BANK_TRANSFER" | "NEFT" | "RTGS" | "IMPS";

export interface CustomerPaymentDetailsInput {
  amountPaid: string | number;
  paymentDate: string;
  externalReference: string;
  paymentMode: ExternalBankPaymentModeInput;
  payerName: string;
  remarks?: string | null;
  contactVerification: string;
}

export interface ConfirmExternalPaymentInput {
  amountConfirmed?: string | number | null;
  currency?: string;
  externalReference?: string | null;
  confirmedAt?: string;
  internalNote?: string | null;
}
