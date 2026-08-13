import { GovernanceAction } from "@prisma/client";
import { Request, Response } from "express";
import { type AuthenticatedRequest } from "../middleware/auth.middleware";
import * as service from "../services/governance.service";

function param(value: string | string[]): string { return Array.isArray(value) ? value[0] : value; }
function bodyFields(body: unknown, allowed: readonly string[]) {
  if (!body || typeof body !== "object" || Array.isArray(body)) throw new service.GovernanceServiceError("VALIDATION", "Request body must be an object.");
  const entries = Object.entries(body as Record<string, unknown>);
  if (entries.some(([key]) => !allowed.includes(key))) throw new service.GovernanceServiceError("VALIDATION", "Request body contains unsupported fields.");
  return Object.fromEntries(entries);
}
function actor(req: AuthenticatedRequest) {
  if (!req.auth) throw new service.GovernanceServiceError("FORBIDDEN", "Authentication is required.");
  return req.auth;
}
function errorResponse(error: unknown, res: Response) {
  if (error instanceof service.GovernanceServiceError) {
    const status = error.code === "VALIDATION" ? 400 : error.code === "FORBIDDEN" ? 403 : error.code === "NOT_FOUND" ? 404 : 409;
    return res.status(status).json({ success: false, message: error.message });
  }
  console.error(error);
  return res.status(500).json({ success: false, message: "Governance operation failed." });
}
async function execute(res: Response, action: () => Promise<unknown>, status = 200, key?: string) {
  try {
    const result = await action();
    return res.status(status).json(key ? { success: true, [key]: result } : { success: true, result });
  } catch (error) { return errorResponse(error, res); }
}

export function getPublishedArticles(req: Request, res: Response) {
  return execute(res, () => service.getPublishedArticles(req.query.category ? String(req.query.category) : undefined), 200, "articles");
}
export function getPublishedArticleById(req: Request, res: Response) {
  return execute(res, async () => { const record = await service.getPublishedArticleById(param(req.params.id)); if (!record) throw new service.GovernanceServiceError("NOT_FOUND", "Article not found."); return record; }, 200, "article");
}
export function createArticle(req: AuthenticatedRequest, res: Response) {
  return execute(res, () => { const auth = actor(req); const input = bodyFields(req.body, ["category", "categoryTitle", "title", "keywords", "synonyms", "summary", "content", "link", "contentKey"]); return service.createArticleDraft(input as any, auth.id, auth.role); }, 201, "article");
}
export function updateArticleDraft(req: AuthenticatedRequest, res: Response) {
  return execute(res, () => { const auth = actor(req); const input = bodyFields(req.body, ["title", "summary", "content", "keywords", "synonyms", "link"]); return service.editArticleDraft(param(req.params.id), input, auth.id, auth.role); }, 200, "article");
}
export function approveArticle(req: AuthenticatedRequest, res: Response) { return execute(res, () => { const auth = actor(req); return service.founderApproveArticle(param(req.params.id), auth.id, auth.role); }, 200, "article"); }
export function lockArticle(req: AuthenticatedRequest, res: Response) { return execute(res, () => { const auth = actor(req); return service.erpLockArticle(param(req.params.id), auth.id, auth.role); }, 200, "article"); }
export function publishArticle(req: AuthenticatedRequest, res: Response) { return execute(res, () => { const auth = actor(req); return service.publishArticle(param(req.params.id), auth.id, auth.role); }, 200, "article"); }
export function rollbackArticle(req: AuthenticatedRequest, res: Response) {
  return execute(res, () => { const auth = actor(req); const input = bodyFields(req.body, ["targetVersionId"]); const target = Number(input.targetVersionId); if (!Number.isSafeInteger(target) || target < 1) throw new service.GovernanceServiceError("VALIDATION", "targetVersionId must be a positive integer."); return service.rollbackArticle(param(req.params.id), target, auth.id, auth.role); });
}
export function archiveArticle(req: AuthenticatedRequest, res: Response) { return execute(res, () => { const auth = actor(req); return service.archiveArticle(param(req.params.id), auth.id, auth.role); }, 200, "article"); }
export function getArticlesForAdmin(req: AuthenticatedRequest, res: Response) { return execute(res, () => { actor(req); return service.getArticlesForAdmin(); }, 200, "articles"); }
export function getArticleForAdmin(req: AuthenticatedRequest, res: Response) { return execute(res, async () => { actor(req); const record = await service.getArticleForAdmin(param(req.params.id)); if (!record) throw new service.GovernanceServiceError("NOT_FOUND", "Article not found."); return record; }, 200, "article"); }

export function getPublishedFAQs(req: Request, res: Response) { return execute(res, () => service.getPublishedFAQs(req.query.category ? String(req.query.category) : undefined), 200, "faqs"); }
export function getPublishedFAQById(req: Request, res: Response) { return execute(res, async () => { const record = await service.getPublishedFAQById(param(req.params.id)); if (!record) throw new service.GovernanceServiceError("NOT_FOUND", "FAQ not found."); return record; }, 200, "faq"); }
export function createFAQ(req: AuthenticatedRequest, res: Response) { return execute(res, () => { const auth = actor(req); const input = bodyFields(req.body, ["category", "question", "answer", "keywords", "link", "contentKey"]); return service.createFAQDraft(input as any, auth.id, auth.role); }, 201, "faq"); }
export function updateFAQDraft(req: AuthenticatedRequest, res: Response) { return execute(res, () => { const auth = actor(req); const input = bodyFields(req.body, ["question", "answer", "keywords", "link"]); return service.editFAQDraft(param(req.params.id), input, auth.id, auth.role); }, 200, "faq"); }
export function approveFAQ(req: AuthenticatedRequest, res: Response) { return execute(res, () => { const auth = actor(req); return service.founderApproveFAQ(param(req.params.id), auth.id, auth.role); }, 200, "faq"); }
export function lockFAQ(req: AuthenticatedRequest, res: Response) { return execute(res, () => { const auth = actor(req); return service.erpLockFAQ(param(req.params.id), auth.id, auth.role); }, 200, "faq"); }
export function publishFAQ(req: AuthenticatedRequest, res: Response) { return execute(res, () => { const auth = actor(req); return service.publishFAQ(param(req.params.id), auth.id, auth.role); }, 200, "faq"); }
export function rollbackFAQ(req: AuthenticatedRequest, res: Response) {
  return execute(res, () => { const auth = actor(req); const input = bodyFields(req.body, ["targetVersion"]); const target = Number(input.targetVersion); if (!Number.isSafeInteger(target) || target < 1) throw new service.GovernanceServiceError("VALIDATION", "targetVersion must be a positive integer."); return service.rollbackFAQ(param(req.params.id), target, auth.id, auth.role); });
}
export function archiveFAQ(req: AuthenticatedRequest, res: Response) { return execute(res, () => { const auth = actor(req); return service.archiveFAQ(param(req.params.id), auth.id, auth.role); }, 200, "faq"); }
export function getFAQsForAdmin(req: AuthenticatedRequest, res: Response) { return execute(res, () => { actor(req); return service.getFAQsForAdmin(); }, 200, "faqs"); }
export function getFAQForAdmin(req: AuthenticatedRequest, res: Response) { return execute(res, async () => { actor(req); const record = await service.getFAQForAdmin(param(req.params.id)); if (!record) throw new service.GovernanceServiceError("NOT_FOUND", "FAQ not found."); return record; }, 200, "faq"); }

export function getAuditLog(req: AuthenticatedRequest, res: Response) {
  return execute(res, () => {
    actor(req);
    const limit = req.query.limit === undefined ? 50 : Number(req.query.limit);
    const offset = req.query.offset === undefined ? 0 : Number(req.query.offset);
    if (!Number.isSafeInteger(limit) || limit < 1 || limit > 100 || !Number.isSafeInteger(offset) || offset < 0) throw new service.GovernanceServiceError("VALIDATION", "Audit pagination is invalid.");
    const action = req.query.action === undefined ? undefined : String(req.query.action) as GovernanceAction;
    if (action && !Object.values(GovernanceAction).includes(action)) throw new service.GovernanceServiceError("VALIDATION", "Audit action is invalid.");
    return service.getAuditLog({ contentType: req.query.contentType ? String(req.query.contentType) : undefined, contentId: req.query.contentId ? String(req.query.contentId) : undefined, action, limit, offset });
  }, 200, "logs");
}
