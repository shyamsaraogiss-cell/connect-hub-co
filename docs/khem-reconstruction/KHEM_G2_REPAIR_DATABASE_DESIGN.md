# KHEM Phase G.2 — Database Design & Migration Plan

**Date:** 2026-08-13  
**Status:** PRE-IMPLEMENTATION DESIGN

---

## 1. Safety Principles

- **ADDITIVE ONLY** — No destructive schema changes
- **BACKWARD COMPATIBLE** — Existing rows continue to function
- **MINIMAL FOOTPRINT** — Smallest coherent implementation
- **NO RESET/RESEED** — Preserve all existing data
- **TRANSACTIONAL INTENT** — Document each step

---

## 2. Current Issues

| Issue | Severity | Root Cause |
|-------|----------|-----------|
| Public API exposes drafts | CRITICAL | No PUBLISHED filtering |
| Wrong lifecycle states | CRITICAL | Free-form status strings |
| Live record updated in place | HIGH | No version immutability |
| Incomplete audit trails | HIGH | Missing action tracking |
| No rollback mechanism | HIGH | No version restore logic |
| Admin can approve as Founder | HIGH | No role separation |
| Unapproved seed content | MEDIUM | Generated content marked APPROVED |

---

## 3. Proposed Schema Changes

### A. New Enum: `GovernanceStatus`

**REPLACE** free-form status strings with strict enum:

```prisma
enum GovernanceStatus {
  DRAFT                // Editable, not public
  FOUNDER_APPROVED     // Founder approved, awaiting ERP lock
  ERP_LOCKED           // Locked, ready to publish
  PUBLISHED            // Active public content
  SUPERSEDED           // Replaced by newer version
  ARCHIVED             // Withdrawn from circulation
}
```

### B. New Enum: `GovernanceAction`

**Track all governance operations:**

```prisma
enum GovernanceAction {
  CREATE
  EDIT
  FOUNDER_APPROVE
  ERP_LOCK
  PUBLISH
  SUPERSEDE
  ROLLBACK
  ARCHIVE
}
```

### C. New Table: `GovernanceAuditLog`

**Immutable audit trail for all governance operations:**

```prisma
model GovernanceAuditLog {
  id                String             @id @default(cuid())
  
  // Reference
  contentType       String             // "ARTICLE" | "FAQ"
  contentId         String             // The specific article/faq id
  contentKey        String?            // Stable content identifier (optional)
  version           Int                // Version number at time of action
  
  // Action
  action            GovernanceAction
  
  // Actor
  actorUserId       String?            // User who performed action
  actorRole         UserRole           // FOUNDER, ADMIN, CUSTOMER, RELIGIOUS_PARTNER
  
  // Metadata
  metadata          Json?              // Additional context (prior status, reason, etc.)
  
  // Timestamp
  createdAt         DateTime           @default(now())
  
  @@index([contentType, contentId, createdAt])
  @@index([actorUserId, createdAt])
  @@index([action, createdAt])
}
```

### D. Enhance `KnowledgeArticle`

**Add governance workflow tracking:**

```prisma
model KnowledgeArticle {
  // Existing fields — PRESERVE
  id            String   @id @default(cuid())
  category      String
  categoryTitle String
  title         String
  keywords      String[]
  synonyms      String[]
  summary       String
  content       String
  link          String
  version       Int      @default(1)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  history       KnowledgeArticleHistory[]
  
  // NEW: Governance fields
  contentKey    String?                    // Stable identifier (e.g., "PMG-QA-001")
  status        GovernanceStatus @default(DRAFT)  // Enum instead of string
  
  // NEW: Approval tracking
  founderApprovedAt    DateTime?
  founderApprovedBy    String?           // userId of approver
  
  // NEW: Lock tracking
  erpLockedAt          DateTime?
  erpLockedBy          String?           // userId of locker
  
  // NEW: Publication tracking
  publishedAt          DateTime?
  publishedVersionId   String?           // ID of published version snapshot
  
  // NEW: Authorship
  createdBy            String?           // userId
  lastEditedBy         String?           // userId
  
  // Backward compat
  // OLD status field can remain as string for migration
  statusLegacy         String?           @default("DRAFT")
  
  @@index([contentKey])
  @@index([status, contentKey])
  @@index([category, status])
  @@unique([contentKey, status]) // Only one PUBLISHED per key
}
```

### E. Enhance `KnowledgeFAQ`

**Identical pattern to KnowledgeArticle:**

```prisma
model KnowledgeFAQ {
  // Existing fields — PRESERVE
  id        String   @id @default(cuid())
  category  String
  question  String
  answer    String
  keywords  String[]
  link      String
  version   Int      @default(1)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  history   KnowledgeFAQHistory[]
  
  // NEW: Governance fields
  contentKey       String?
  status           GovernanceStatus @default(DRAFT)
  
  // NEW: Approval/Lock/Publication tracking
  founderApprovedAt DateTime?
  founderApprovedBy String?
  erpLockedAt       DateTime?
  erpLockedBy       String?
  publishedAt       DateTime?
  publishedVersionId String?
  
  // NEW: Authorship
  createdBy        String?
  lastEditedBy     String?
  
  // Backward compat
  statusLegacy     String?          @default("DRAFT")
  
  @@index([contentKey])
  @@index([status, contentKey])
  @@index([category, status])
  @@unique([contentKey, status])
}
```

### F. Enhance `KnowledgeArticleHistory`

**Add governance action tracking:**

```prisma
model KnowledgeArticleHistory {
  // Existing fields — PRESERVE
  id          String            @id @default(cuid())
  articleId   String
  article     KnowledgeArticle  @relation(fields: [articleId], references: [id], onDelete: Cascade)
  version     Int
  title       String
  summary     String
  content     String
  link        String
  status      String
  changedBy   String
  createdAt   DateTime          @default(now())
  
  // NEW: Action tracking
  action      GovernanceAction?
  changedByRole UserRole?
  metadata    Json?             // Additional context
  
  @@index([articleId, version])
  @@index([articleId, createdAt])
}
```

### G. Enhance `KnowledgeFAQHistory`

**Identical pattern to ArticleHistory:**

```prisma
model KnowledgeFAQHistory {
  id        String           @id @default(cuid())
  faqId     String
  faq       KnowledgeFAQ     @relation(fields: [faqId], references: [id], onDelete: Cascade)
  version   Int
  question  String
  answer    String
  link      String
  status    String
  changedBy String
  createdAt DateTime         @default(now())
  
  // NEW: Action tracking
  action      GovernanceAction?
  changedByRole UserRole?
  metadata    Json?
  
  @@index([faqId, version])
  @@index([faqId, createdAt])
}
```

---

## 4. Migration Strategy

### Phase 1: Add New Fields
- Add all new columns to KnowledgeArticle
- Add all new columns to KnowledgeFAQ
- Add GovernanceStatus enum
- Add GovernanceAction enum
- Create GovernanceAuditLog table

**Impact:** Additive only. Existing queries continue.

### Phase 2: Backfill Legacy Data
- Set `contentKey = "${category}-${version}-${id.substring(0,6)}"` for existing articles
- Set `status = DRAFT` (default)
- Set `createdBy = NULL`
- Existing `statusLegacy` preserved

**Impact:** No data loss. Establishes governance baseline.

### Phase 3: Validation
- Verify TypeScript compilation
- Verify backward compatibility with existing URMS
- Test public/private boundary

---

## 5. Data Safety

| Table | Existing Rows | Change | Risk | Mitigation |
|-------|---------------|--------|------|-----------|
| KnowledgeArticle | ~10 | Add columns | LOW | Columns nullable, default values provided |
| KnowledgeFAQ | ~5 | Add columns | LOW | Columns nullable, default values provided |
| KnowledgeArticleHistory | ~0 | Add columns | LOW | Additive |
| KnowledgeFAQHistory | ~0 | Add columns | LOW | Additive |
| (NEW) GovernanceAuditLog | 0 | Create table | NONE | New table, no dependencies |

**Database Reset Required:** NO  
**Destructive Operations:** NONE  
**Data Loss Risk:** NONE  

---

## 6. Backward Compatibility

**Existing code paths** (e.g., URMS, requests) continue unchanged.

**New governance logic** uses new fields alongside legacy fields during transition.

**Deprecation Path:**
- Phase G.2: Use enum `status` for new logic
- Legacy `statusLegacy` remains for audit
- Phase H: Consider removal after full cutover

---

## 7. TypeScript Impact

**New models:**
- `GovernanceStatus` type
- `GovernanceAction` type
- `GovernanceAuditLog` Prisma type

**Updated models:**
- `KnowledgeArticle` type (new optional fields)
- `KnowledgeFAQ` type (new optional fields)

**No breaking changes** to existing request/response types.

---

## 8. Final Verification

After migration:
1. `prisma migrate status` → "Database schema is up to date"
2. `npx tsc --noEmit -p backend/tsconfig.json` → PASS
3. `GET /api/governance/articles` → Returns PUBLISHED only (after controller fix)
4. Existing URMS/request flows → No regression

---

**STATUS:** Ready for implementation  
**APPROVED FOR APPLICATION:** YES  
**REQUIRES ADDITIONAL REVIEW:** NO
