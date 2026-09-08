-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."GovernanceAction" AS ENUM ('CREATE', 'EDIT', 'FOUNDER_APPROVE', 'ERP_LOCK', 'PUBLISH', 'SUPERSEDE', 'ROLLBACK', 'ARCHIVE');

-- CreateEnum
CREATE TYPE "public"."GovernanceStatus" AS ENUM ('DRAFT', 'FOUNDER_APPROVED', 'ERP_LOCKED', 'PUBLISHED', 'SUPERSEDED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('FOUNDER', 'ADMIN', 'CUSTOMER', 'RELIGIOUS_PARTNER');

-- CreateTable
CREATE TABLE "public"."Customer" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "country" TEXT,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "assignedTo" TEXT,
    "fullName" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "remarks" TEXT,
    "serviceType" TEXT,
    "state" TEXT,
    "status" TEXT NOT NULL DEFAULT 'New',
    "whatsapp" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GovernanceAuditLog" (
    "id" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "contentKey" TEXT,
    "version" INTEGER NOT NULL,
    "action" "public"."GovernanceAction" NOT NULL,
    "actorUserId" TEXT,
    "actorRole" "public"."UserRole" NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GovernanceAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."KnowledgeArticle" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "categoryTitle" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "keywords" TEXT[],
    "synonyms" TEXT[],
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "version" INTEGER NOT NULL DEFAULT 1,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contentKey" TEXT,
    "createdBy" TEXT,
    "erpLockedAt" TIMESTAMP(3),
    "erpLockedBy" TEXT,
    "founderApprovedAt" TIMESTAMP(3),
    "founderApprovedBy" TEXT,
    "governanceStatus" "public"."GovernanceStatus" NOT NULL DEFAULT 'DRAFT',
    "lastEditedBy" TEXT,
    "publishedVersionId" TEXT,

    CONSTRAINT "KnowledgeArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."KnowledgeArticleHistory" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "changedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" "public"."GovernanceAction",
    "changedByRole" "public"."UserRole",
    "metadata" JSONB,

    CONSTRAINT "KnowledgeArticleHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."KnowledgeFAQ" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "keywords" TEXT[],
    "link" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "version" INTEGER NOT NULL DEFAULT 1,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contentKey" TEXT,
    "createdBy" TEXT,
    "erpLockedAt" TIMESTAMP(3),
    "erpLockedBy" TEXT,
    "founderApprovedAt" TIMESTAMP(3),
    "founderApprovedBy" TEXT,
    "governanceStatus" "public"."GovernanceStatus" NOT NULL DEFAULT 'DRAFT',
    "lastEditedBy" TEXT,
    "publishedVersionId" TEXT,

    CONSTRAINT "KnowledgeFAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."KnowledgeFAQHistory" (
    "id" TEXT NOT NULL,
    "faqId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "changedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "action" "public"."GovernanceAction",
    "changedByRole" "public"."UserRole",
    "metadata" JSONB,

    CONSTRAINT "KnowledgeFAQHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PitruMokshaRequest" (
    "id" TEXT NOT NULL,
    "specialRequirements" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "assignedPartner" TEXT,
    "city" TEXT,
    "country" TEXT,
    "customerName" TEXT NOT NULL,
    "documentationRequired" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT,
    "founderRemarks" TEXT,
    "language" TEXT,
    "mobile" TEXT NOT NULL,
    "preferredDate" TIMESTAMP(3),
    "preferredTime" TEXT,
    "quotationStatus" TEXT NOT NULL DEFAULT 'Pending',
    "ritualType" TEXT NOT NULL,
    "samagriRequired" BOOLEAN NOT NULL DEFAULT false,
    "serviceMode" TEXT NOT NULL,
    "state" TEXT,
    "status" TEXT NOT NULL DEFAULT 'New',
    "travelAssistance" BOOLEAN NOT NULL DEFAULT false,
    "whatsapp" TEXT,

    CONSTRAINT "PitruMokshaRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReligiousPartner" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "city" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "addressVerified" BOOLEAN NOT NULL DEFAULT false,
    "category" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "identityVerified" BOOLEAN NOT NULL DEFAULT false,
    "mobile" TEXT NOT NULL,
    "offlineAvailable" BOOLEAN NOT NULL DEFAULT true,
    "onlineAvailable" BOOLEAN NOT NULL DEFAULT true,
    "preferredServiceArea" TEXT,
    "qualificationVerified" BOOLEAN NOT NULL DEFAULT false,
    "relocationAvailable" BOOLEAN NOT NULL DEFAULT false,
    "remarks" TEXT,
    "state" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "verificationDate" TIMESTAMP(3),
    "whatsapp" TEXT,
    "userId" TEXT,

    CONSTRAINT "ReligiousPartner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UniversalRequest" (
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

-- CreateTable
CREATE TABLE "public"."UniversalRequestStatusHistory" (
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

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GovernanceAuditLog_action_createdAt_idx" ON "public"."GovernanceAuditLog"("action" ASC, "createdAt" ASC);

-- CreateIndex
CREATE INDEX "GovernanceAuditLog_actorUserId_createdAt_idx" ON "public"."GovernanceAuditLog"("actorUserId" ASC, "createdAt" ASC);

-- CreateIndex
CREATE INDEX "GovernanceAuditLog_contentType_contentId_createdAt_idx" ON "public"."GovernanceAuditLog"("contentType" ASC, "contentId" ASC, "createdAt" ASC);

-- CreateIndex
CREATE INDEX "KnowledgeArticle_category_status_idx" ON "public"."KnowledgeArticle"("category" ASC, "status" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeArticle_contentKey_governanceStatus_key" ON "public"."KnowledgeArticle"("contentKey" ASC, "governanceStatus" ASC);

-- CreateIndex
CREATE INDEX "KnowledgeArticle_contentKey_idx" ON "public"."KnowledgeArticle"("contentKey" ASC);

-- CreateIndex
CREATE INDEX "KnowledgeArticle_governanceStatus_contentKey_idx" ON "public"."KnowledgeArticle"("governanceStatus" ASC, "contentKey" ASC);

-- CreateIndex
CREATE INDEX "KnowledgeArticleHistory_articleId_createdAt_idx" ON "public"."KnowledgeArticleHistory"("articleId" ASC, "createdAt" ASC);

-- CreateIndex
CREATE INDEX "KnowledgeArticleHistory_articleId_version_idx" ON "public"."KnowledgeArticleHistory"("articleId" ASC, "version" ASC);

-- CreateIndex
CREATE INDEX "KnowledgeFAQ_category_status_idx" ON "public"."KnowledgeFAQ"("category" ASC, "status" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeFAQ_contentKey_governanceStatus_key" ON "public"."KnowledgeFAQ"("contentKey" ASC, "governanceStatus" ASC);

-- CreateIndex
CREATE INDEX "KnowledgeFAQ_contentKey_idx" ON "public"."KnowledgeFAQ"("contentKey" ASC);

-- CreateIndex
CREATE INDEX "KnowledgeFAQ_governanceStatus_contentKey_idx" ON "public"."KnowledgeFAQ"("governanceStatus" ASC, "contentKey" ASC);

-- CreateIndex
CREATE INDEX "KnowledgeFAQHistory_faqId_createdAt_idx" ON "public"."KnowledgeFAQHistory"("faqId" ASC, "createdAt" ASC);

-- CreateIndex
CREATE INDEX "KnowledgeFAQHistory_faqId_version_idx" ON "public"."KnowledgeFAQHistory"("faqId" ASC, "version" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "ReligiousPartner_userId_key" ON "public"."ReligiousPartner"("userId" ASC);

-- CreateIndex
CREATE INDEX "UniversalRequest_assignedPartnerUserId_currentStatus_idx" ON "public"."UniversalRequest"("assignedPartnerUserId" ASC, "currentStatus" ASC);

-- CreateIndex
CREATE INDEX "UniversalRequest_customerId_createdAt_idx" ON "public"."UniversalRequest"("customerId" ASC, "createdAt" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "UniversalRequest_referenceId_key" ON "public"."UniversalRequest"("referenceId" ASC);

-- CreateIndex
CREATE INDEX "UniversalRequest_requestType_currentStatus_idx" ON "public"."UniversalRequest"("requestType" ASC, "currentStatus" ASC);

-- CreateIndex
CREATE INDEX "UniversalRequestStatusHistory_requestId_createdAt_idx" ON "public"."UniversalRequestStatusHistory"("requestId" ASC, "createdAt" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email" ASC);

-- AddForeignKey
ALTER TABLE "public"."KnowledgeArticleHistory" ADD CONSTRAINT "KnowledgeArticleHistory_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "public"."KnowledgeArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."KnowledgeFAQHistory" ADD CONSTRAINT "KnowledgeFAQHistory_faqId_fkey" FOREIGN KEY ("faqId") REFERENCES "public"."KnowledgeFAQ"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReligiousPartner" ADD CONSTRAINT "ReligiousPartner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UniversalRequest" ADD CONSTRAINT "UniversalRequest_assignedPartnerUserId_fkey" FOREIGN KEY ("assignedPartnerUserId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UniversalRequest" ADD CONSTRAINT "UniversalRequest_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UniversalRequestStatusHistory" ADD CONSTRAINT "UniversalRequestStatusHistory_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "public"."UniversalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
