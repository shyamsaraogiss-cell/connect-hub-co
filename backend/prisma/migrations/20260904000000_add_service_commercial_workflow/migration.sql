-- CreateEnum
CREATE TYPE "CommercialWorkflowStage" AS ENUM ('NOT_STARTED', 'QUOTATION_DRAFT', 'QUOTATION_RELEASED', 'QUOTATION_CHANGE_REQUESTED', 'QUOTATION_REJECTED', 'QUOTATION_ACCEPTED', 'AGREEMENT_AVAILABLE', 'AGREEMENT_ACCEPTED', 'AWAITING_EXTERNAL_PAYMENT', 'PAYMENT_CONFIRMED', 'BOOKING_CONFIRMED');

-- CreateEnum
CREATE TYPE "ServiceQuotationStatus" AS ENUM ('DRAFT', 'RELEASED', 'CHANGE_REQUESTED', 'ACCEPTED', 'REJECTED', 'EXPIRED', 'SUPERSEDED');

-- CreateEnum
CREATE TYPE "QuotationDecisionType" AS ENUM ('ACCEPT', 'REQUEST_CHANGE', 'REJECT');

-- CreateEnum
CREATE TYPE "ClientAgreementStatus" AS ENUM ('AVAILABLE', 'ACCEPTED', 'SUPERSEDED');

-- CreateEnum
CREATE TYPE "ExternalPaymentStatus" AS ENUM ('AWAITING_EXTERNAL_PAYMENT', 'PAYMENT_CONFIRMED');

-- CreateTable
CREATE TABLE "ServiceCommercialWorkflow" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "stage" "CommercialWorkflowStage" NOT NULL DEFAULT 'NOT_STARTED',
    "bookingConfirmedAt" TIMESTAMP(3),
    "bookingConfirmedByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceCommercialWorkflow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceQuotation" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "status" "ServiceQuotationStatus" NOT NULL DEFAULT 'DRAFT',
    "serviceName" TEXT NOT NULL,
    "serviceScope" TEXT NOT NULL,
    "inclusions" TEXT[],
    "exclusions" TEXT[],
    "basePrice" DECIMAL(12,2) NOT NULL,
    "applicableChargesTaxes" DECIMAL(12,2) NOT NULL,
    "finalPrice" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "validUntil" TIMESTAMP(3),
    "notes" TEXT,
    "paymentTerms" TEXT NOT NULL,
    "paymentInstructions" TEXT NOT NULL,
    "createdByUserId" TEXT NOT NULL,
    "releasedByUserId" TEXT,
    "releasedAt" TIMESTAMP(3),
    "acceptedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceQuotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuotationCustomerDecision" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "quotationId" TEXT NOT NULL,
    "decision" "QuotationDecisionType" NOT NULL,
    "changeRequest" TEXT,
    "customerUserId" TEXT,
    "decidedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuotationCustomerDecision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientServiceAgreement" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "quotationId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "status" "ClientAgreementStatus" NOT NULL DEFAULT 'AVAILABLE',
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "selectedService" TEXT NOT NULL,
    "agreedScope" TEXT NOT NULL,
    "inclusions" TEXT[],
    "exclusions" TEXT[],
    "finalAgreedPrice" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "paymentTerms" TEXT NOT NULL,
    "paymentInstructions" TEXT NOT NULL,
    "customerResponsibilities" TEXT[],
    "connectHubResponsibilities" TEXT[],
    "cancellationRefundPolicyReference" TEXT NOT NULL,
    "importantServiceDisclosures" TEXT[],
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientServiceAgreement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientAgreementAcceptance" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "agreementId" TEXT NOT NULL,
    "agreementVersion" INTEGER NOT NULL,
    "customerUserId" TEXT,
    "acceptanceChannel" TEXT NOT NULL DEFAULT 'PUBLIC_TRACKING',
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientAgreementAcceptance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalPaymentConfirmation" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "agreementId" TEXT NOT NULL,
    "status" "ExternalPaymentStatus" NOT NULL DEFAULT 'AWAITING_EXTERNAL_PAYMENT',
    "amountConfirmed" DECIMAL(12,2),
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "externalReference" TEXT,
    "confirmedAt" TIMESTAMP(3),
    "confirmedByUserId" TEXT,
    "internalNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalPaymentConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceCommercialWorkflow_requestId_key" ON "ServiceCommercialWorkflow"("requestId");

-- CreateIndex
CREATE INDEX "ServiceCommercialWorkflow_stage_idx" ON "ServiceCommercialWorkflow"("stage");

-- CreateIndex
CREATE INDEX "ServiceQuotation_requestId_status_idx" ON "ServiceQuotation"("requestId", "status");

-- CreateIndex
CREATE INDEX "ServiceQuotation_workflowId_version_idx" ON "ServiceQuotation"("workflowId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceQuotation_requestId_version_key" ON "ServiceQuotation"("requestId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "QuotationCustomerDecision_quotationId_key" ON "QuotationCustomerDecision"("quotationId");

-- CreateIndex
CREATE INDEX "QuotationCustomerDecision_requestId_decidedAt_idx" ON "QuotationCustomerDecision"("requestId", "decidedAt");

-- CreateIndex
CREATE INDEX "ClientServiceAgreement_requestId_status_idx" ON "ClientServiceAgreement"("requestId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ClientServiceAgreement_requestId_version_key" ON "ClientServiceAgreement"("requestId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "ClientAgreementAcceptance_agreementId_key" ON "ClientAgreementAcceptance"("agreementId");

-- CreateIndex
CREATE INDEX "ClientAgreementAcceptance_requestId_acceptedAt_idx" ON "ClientAgreementAcceptance"("requestId", "acceptedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ExternalPaymentConfirmation_workflowId_key" ON "ExternalPaymentConfirmation"("workflowId");

-- CreateIndex
CREATE UNIQUE INDEX "ExternalPaymentConfirmation_requestId_key" ON "ExternalPaymentConfirmation"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "ExternalPaymentConfirmation_agreementId_key" ON "ExternalPaymentConfirmation"("agreementId");

-- CreateIndex
CREATE INDEX "ExternalPaymentConfirmation_status_confirmedAt_idx" ON "ExternalPaymentConfirmation"("status", "confirmedAt");

-- AddForeignKey
ALTER TABLE "ServiceCommercialWorkflow" ADD CONSTRAINT "ServiceCommercialWorkflow_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "UniversalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceCommercialWorkflow" ADD CONSTRAINT "ServiceCommercialWorkflow_bookingConfirmedByUserId_fkey" FOREIGN KEY ("bookingConfirmedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceQuotation" ADD CONSTRAINT "ServiceQuotation_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "ServiceCommercialWorkflow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceQuotation" ADD CONSTRAINT "ServiceQuotation_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "UniversalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceQuotation" ADD CONSTRAINT "ServiceQuotation_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceQuotation" ADD CONSTRAINT "ServiceQuotation_releasedByUserId_fkey" FOREIGN KEY ("releasedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuotationCustomerDecision" ADD CONSTRAINT "QuotationCustomerDecision_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "UniversalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuotationCustomerDecision" ADD CONSTRAINT "QuotationCustomerDecision_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "ServiceQuotation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuotationCustomerDecision" ADD CONSTRAINT "QuotationCustomerDecision_customerUserId_fkey" FOREIGN KEY ("customerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientServiceAgreement" ADD CONSTRAINT "ClientServiceAgreement_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "ServiceCommercialWorkflow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientServiceAgreement" ADD CONSTRAINT "ClientServiceAgreement_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "UniversalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientServiceAgreement" ADD CONSTRAINT "ClientServiceAgreement_quotationId_fkey" FOREIGN KEY ("quotationId") REFERENCES "ServiceQuotation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientAgreementAcceptance" ADD CONSTRAINT "ClientAgreementAcceptance_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "UniversalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientAgreementAcceptance" ADD CONSTRAINT "ClientAgreementAcceptance_agreementId_fkey" FOREIGN KEY ("agreementId") REFERENCES "ClientServiceAgreement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientAgreementAcceptance" ADD CONSTRAINT "ClientAgreementAcceptance_customerUserId_fkey" FOREIGN KEY ("customerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalPaymentConfirmation" ADD CONSTRAINT "ExternalPaymentConfirmation_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "ServiceCommercialWorkflow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalPaymentConfirmation" ADD CONSTRAINT "ExternalPaymentConfirmation_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "UniversalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalPaymentConfirmation" ADD CONSTRAINT "ExternalPaymentConfirmation_agreementId_fkey" FOREIGN KEY ("agreementId") REFERENCES "ClientServiceAgreement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalPaymentConfirmation" ADD CONSTRAINT "ExternalPaymentConfirmation_confirmedByUserId_fkey" FOREIGN KEY ("confirmedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
