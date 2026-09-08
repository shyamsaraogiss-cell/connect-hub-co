CREATE TYPE "ExternalBankPaymentMode" AS ENUM ('BANK_TRANSFER', 'NEFT', 'RTGS', 'IMPS');

CREATE TABLE "CustomerPaymentDetailSubmission" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "agreementId" TEXT NOT NULL,
    "amountPaid" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "paymentDate" DATE NOT NULL,
    "externalReference" TEXT NOT NULL,
    "paymentMode" "ExternalBankPaymentMode" NOT NULL,
    "payerName" TEXT NOT NULL,
    "remarks" TEXT,
    "submittedByCustomerUserId" TEXT,
    "submissionChannel" TEXT NOT NULL DEFAULT 'PUBLIC_TRACKING',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "CustomerPaymentDetailSubmission_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CustomerPaymentDetailSubmission_workflowId_key" ON "CustomerPaymentDetailSubmission"("workflowId");
CREATE UNIQUE INDEX "CustomerPaymentDetailSubmission_requestId_key" ON "CustomerPaymentDetailSubmission"("requestId");
CREATE UNIQUE INDEX "CustomerPaymentDetailSubmission_agreementId_key" ON "CustomerPaymentDetailSubmission"("agreementId");
CREATE INDEX "CustomerPaymentDetailSubmission_requestId_submittedAt_idx" ON "CustomerPaymentDetailSubmission"("requestId", "submittedAt");
CREATE INDEX "CustomerPaymentDetailSubmission_paymentMode_paymentDate_idx" ON "CustomerPaymentDetailSubmission"("paymentMode", "paymentDate");

ALTER TABLE "CustomerPaymentDetailSubmission" ADD CONSTRAINT "CustomerPaymentDetailSubmission_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "ServiceCommercialWorkflow"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CustomerPaymentDetailSubmission" ADD CONSTRAINT "CustomerPaymentDetailSubmission_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "UniversalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "CustomerPaymentDetailSubmission" ADD CONSTRAINT "CustomerPaymentDetailSubmission_agreementId_fkey" FOREIGN KEY ("agreementId") REFERENCES "ClientServiceAgreement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "CustomerPaymentDetailSubmission" ADD CONSTRAINT "CustomerPaymentDetailSubmission_submittedByCustomerUserId_fkey" FOREIGN KEY ("submittedByCustomerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
