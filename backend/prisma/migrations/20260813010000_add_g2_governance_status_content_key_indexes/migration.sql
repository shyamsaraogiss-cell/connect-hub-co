CREATE INDEX IF NOT EXISTS "KnowledgeArticle_governanceStatus_contentKey_idx"
ON "KnowledgeArticle" ("governanceStatus", "contentKey");

CREATE INDEX IF NOT EXISTS "KnowledgeFAQ_governanceStatus_contentKey_idx"
ON "KnowledgeFAQ" ("governanceStatus", "contentKey");
