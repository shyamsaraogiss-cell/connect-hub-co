-- CreateTable
CREATE TABLE "UniversalRequestStatusHistory" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "previousStatus" TEXT,
    "newStatus" TEXT NOT NULL,
    "previousStage" TEXT,
    "newStage" TEXT NOT NULL,
    "changedByUserId" TEXT,
    "changedByRole" TEXT NOT NULL,
    "publicNote" TEXT,
    "internalNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UniversalRequestStatusHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UniversalRequestStatusHistory_requestId_createdAt_idx" ON "UniversalRequestStatusHistory"("requestId", "createdAt");

-- AddForeignKey
ALTER TABLE "UniversalRequestStatusHistory" ADD CONSTRAINT "UniversalRequestStatusHistory_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "UniversalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
