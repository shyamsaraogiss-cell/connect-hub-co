-- CreateEnum GovernanceStatus
CREATE TYPE "GovernanceStatus" AS ENUM ('DRAFT', 'FOUNDER_APPROVED', 'ERP_LOCKED', 'PUBLISHED', 'SUPERSEDED', 'ARCHIVED');

-- CreateEnum GovernanceAction
CREATE TYPE "GovernanceAction" AS ENUM ('CREATE', 'EDIT', 'FOUNDER_APPROVE', 'ERP_LOCK', 'PUBLISH', 'SUPERSEDE', 'ROLLBACK', 'ARCHIVE');

-- CreateTable KnowledgeArticle
CREATE TABLE "KnowledgeArticle" (
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
    "governanceStatus" "GovernanceStatus" NOT NULL DEFAULT 'DRAFT',
    "version" INTEGER NOT NULL DEFAULT 1,
    "publishedAt" TIMESTAMP(3),
    "contentKey" TEXT,
    "founderApprovedAt" TIMESTAMP(3),
    "founderApprovedBy" TEXT,
    "erpLockedAt" TIMESTAMP(3),
    "erpLockedBy" TEXT,
    "publishedVersionId" TEXT,
    "createdBy" TEXT,
    "lastEditedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable KnowledgeFAQ
CREATE TABLE "KnowledgeFAQ" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "keywords" TEXT[],
    "link" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "governanceStatus" "GovernanceStatus" NOT NULL DEFAULT 'DRAFT',
    "version" INTEGER NOT NULL DEFAULT 1,
    "publishedAt" TIMESTAMP(3),
    "contentKey" TEXT,
    "founderApprovedAt" TIMESTAMP(3),
    "founderApprovedBy" TEXT,
    "erpLockedAt" TIMESTAMP(3),
    "erpLockedBy" TEXT,
    "publishedVersionId" TEXT,
    "createdBy" TEXT,
    "lastEditedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeFAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable KnowledgeArticleHistory
CREATE TABLE "KnowledgeArticleHistory" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "changedBy" TEXT NOT NULL,
    "action" "GovernanceAction",
    "changedByRole" "UserRole",
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KnowledgeArticleHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable KnowledgeFAQHistory
CREATE TABLE "KnowledgeFAQHistory" (
    "id" TEXT NOT NULL,
    "faqId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "changedBy" TEXT NOT NULL,
    "action" "GovernanceAction",
    "changedByRole" "UserRole",
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KnowledgeFAQHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable GovernanceAuditLog
CREATE TABLE "GovernanceAuditLog" (
    "id" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "contentKey" TEXT,
    "version" INTEGER NOT NULL,
    "action" "GovernanceAction" NOT NULL,
    "actorUserId" TEXT,
    "actorRole" "UserRole" NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GovernanceAuditLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey KnowledgeArticleHistory
ALTER TABLE "KnowledgeArticleHistory" ADD CONSTRAINT "KnowledgeArticleHistory_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "KnowledgeArticle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey KnowledgeFAQHistory
ALTER TABLE "KnowledgeFAQHistory" ADD CONSTRAINT "KnowledgeFAQHistory_faqId_fkey" FOREIGN KEY ("faqId") REFERENCES "KnowledgeFAQ"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateIndex KnowledgeArticle
CREATE INDEX "KnowledgeArticle_category_status_idx" ON "KnowledgeArticle"("category", "status");
CREATE INDEX "KnowledgeArticle_contentKey_idx" ON "KnowledgeArticle"("contentKey");
CREATE UNIQUE INDEX "KnowledgeArticle_contentKey_governanceStatus_key" ON "KnowledgeArticle"("contentKey", "governanceStatus");

-- CreateIndex KnowledgeFAQ
CREATE INDEX "KnowledgeFAQ_category_status_idx" ON "KnowledgeFAQ"("category", "status");
CREATE INDEX "KnowledgeFAQ_contentKey_idx" ON "KnowledgeFAQ"("contentKey");
CREATE UNIQUE INDEX "KnowledgeFAQ_contentKey_governanceStatus_key" ON "KnowledgeFAQ"("contentKey", "governanceStatus");

-- CreateIndex KnowledgeArticleHistory
CREATE INDEX "KnowledgeArticleHistory_articleId_version_idx" ON "KnowledgeArticleHistory"("articleId", "version");
CREATE INDEX "KnowledgeArticleHistory_articleId_createdAt_idx" ON "KnowledgeArticleHistory"("articleId", "createdAt");

-- CreateIndex KnowledgeFAQHistory
CREATE INDEX "KnowledgeFAQHistory_faqId_version_idx" ON "KnowledgeFAQHistory"("faqId", "version");
CREATE INDEX "KnowledgeFAQHistory_faqId_createdAt_idx" ON "KnowledgeFAQHistory"("faqId", "createdAt");

-- CreateIndex GovernanceAuditLog
CREATE INDEX "GovernanceAuditLog_contentType_contentId_createdAt_idx" ON "GovernanceAuditLog"("contentType", "contentId", "createdAt");
CREATE INDEX "GovernanceAuditLog_actorUserId_createdAt_idx" ON "GovernanceAuditLog"("actorUserId", "createdAt");
CREATE INDEX "GovernanceAuditLog_action_createdAt_idx" ON "GovernanceAuditLog"("action", "createdAt");
