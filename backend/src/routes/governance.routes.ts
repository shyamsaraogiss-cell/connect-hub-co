import { Router } from "express";
import { requireAuth, requireRoles } from "../middleware/auth.middleware";
import {
  // Public endpoints
  getPublishedArticles,
  getPublishedArticleById,
  getPublishedFAQs,
  getPublishedFAQById,
  // Admin endpoints
  createArticle,
  updateArticleDraft,
  approveArticle,
  lockArticle,
  publishArticle,
  rollbackArticle,
  archiveArticle,
  getArticlesForAdmin,
  getArticleForAdmin,
  createFAQ,
  getFAQsForAdmin,
  getFAQForAdmin,
  updateFAQDraft,
  approveFAQ,
  lockFAQ,
  publishFAQ,
  rollbackFAQ,
  archiveFAQ,
  getAuditLog,
} from "../controllers/governance.controller";

const router = Router();

// ===== PUBLIC ENDPOINTS (NO AUTH REQUIRED) =====
// These only return PUBLISHED content

// Articles
router.get("/articles/published", getPublishedArticles);
router.get("/articles/published/:id", getPublishedArticleById);

// FAQs
router.get("/faqs/published", getPublishedFAQs);
router.get("/faqs/published/:id", getPublishedFAQById);

// ===== ADMIN/GOVERNANCE ENDPOINTS (AUTH REQUIRED) =====
// These handle the full governance lifecycle

// Admin article management
router.post("/articles", requireAuth, requireRoles("FOUNDER", "ADMIN"), createArticle);
router.put("/articles/:id", requireAuth, requireRoles("FOUNDER", "ADMIN"), updateArticleDraft);
router.post("/articles/:id/approve", requireAuth, requireRoles("FOUNDER"), approveArticle);
router.post("/articles/:id/lock", requireAuth, requireRoles("FOUNDER", "ADMIN"), lockArticle);
router.post("/articles/:id/publish", requireAuth, requireRoles("FOUNDER", "ADMIN"), publishArticle);
router.post("/articles/:id/rollback", requireAuth, requireRoles("FOUNDER"), rollbackArticle);
router.post("/articles/:id/archive", requireAuth, requireRoles("FOUNDER", "ADMIN"), archiveArticle);
router.get("/articles/admin/list", requireAuth, requireRoles("FOUNDER", "ADMIN"), getArticlesForAdmin);
router.get("/articles/admin/:id", requireAuth, requireRoles("FOUNDER", "ADMIN"), getArticleForAdmin);

// Admin FAQ management
router.post("/faqs", requireAuth, requireRoles("FOUNDER", "ADMIN"), createFAQ);
router.get("/faqs/admin/list", requireAuth, requireRoles("FOUNDER", "ADMIN"), getFAQsForAdmin);
router.get("/faqs/admin/:id", requireAuth, requireRoles("FOUNDER", "ADMIN"), getFAQForAdmin);
router.put("/faqs/:id", requireAuth, requireRoles("FOUNDER", "ADMIN"), updateFAQDraft);
router.post("/faqs/:id/approve", requireAuth, requireRoles("FOUNDER"), approveFAQ);
router.post("/faqs/:id/lock", requireAuth, requireRoles("FOUNDER", "ADMIN"), lockFAQ);
router.post("/faqs/:id/publish", requireAuth, requireRoles("FOUNDER", "ADMIN"), publishFAQ);
router.post("/faqs/:id/rollback", requireAuth, requireRoles("FOUNDER"), rollbackFAQ);
router.post("/faqs/:id/archive", requireAuth, requireRoles("FOUNDER", "ADMIN"), archiveFAQ);

// Audit log (admin only)
router.get("/audit-log", requireAuth, requireRoles("FOUNDER", "ADMIN"), getAuditLog);

export default router;
