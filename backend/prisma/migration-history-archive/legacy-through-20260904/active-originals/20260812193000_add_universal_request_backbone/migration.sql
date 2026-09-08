-- CreateTable
CREATE TABLE "UniversalRequest" (
    "id" TEXT NOT NULL,
    "referenceId" TEXT NOT NULL,
    "requestType" TEXT NOT NULL,
    "serviceDomain" TEXT,
    "customerId" TEXT,
    "guestName" TEXT NOT NULL,
    "guestPhone" TEXT NOT NULL,
    "guestEmail" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "currentStatus" TEXT NOT NULL DEFAULT 'SUBMITTED',
    "currentStage" TEXT NOT NULL DEFAULT 'Submitted',
    "assignedTeam" TEXT,
    "assignedPartnerUserId" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
    "sourceChannel" TEXT NOT NULL DEFAULT 'WEBSITE_FORM',
    "publicNote" TEXT,
    "internalNote" TEXT,
    "metadata" JSONB,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UniversalRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UniversalRequest_referenceId_key" ON "UniversalRequest"("referenceId");

-- CreateIndex
CREATE INDEX "UniversalRequest_customerId_createdAt_idx" ON "UniversalRequest"("customerId", "createdAt");

-- CreateIndex
CREATE INDEX "UniversalRequest_assignedPartnerUserId_currentStatus_idx" ON "UniversalRequest"("assignedPartnerUserId", "currentStatus");

-- CreateIndex
CREATE INDEX "UniversalRequest_requestType_currentStatus_idx" ON "UniversalRequest"("requestType", "currentStatus");

-- AddForeignKey
ALTER TABLE "UniversalRequest" ADD CONSTRAINT "UniversalRequest_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversalRequest" ADD CONSTRAINT "UniversalRequest_assignedPartnerUserId_fkey" FOREIGN KEY ("assignedPartnerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
