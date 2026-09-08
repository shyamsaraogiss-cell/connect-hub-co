import { GovernanceAction, GovernanceStatus, Prisma, UserRole } from "@prisma/client";
import { prisma } from "../lib/prisma";

type Tx = Prisma.TransactionClient;
type Kind = "ARTICLE" | "FAQ";
type ErrorCode = "VALIDATION" | "FORBIDDEN" | "NOT_FOUND" | "INVALID_TRANSITION" | "CONFLICT";

export class GovernanceServiceError extends Error {
  constructor(public readonly code: ErrorCode, message: string) {
    super(message);
    this.name = "GovernanceServiceError";
  }
}

export interface CreateArticleInput {
  category: string; categoryTitle: string; title: string; keywords?: string[];
  synonyms?: string[]; summary: string; content: string; link: string; contentKey?: string;
}
export interface UpdateArticleInput {
  title?: string; summary?: string; content?: string; keywords?: string[]; synonyms?: string[]; link?: string;
}
export interface CreateFAQInput {
  category: string; question: string; answer: string; keywords?: string[]; link: string; contentKey?: string;
}
export interface UpdateFAQInput { question?: string; answer?: string; keywords?: string[]; link?: string; }

function fail(code: ErrorCode, message: string): never { throw new GovernanceServiceError(code, message); }
function id(value: string, label: string) {
  if (typeof value !== "string" || !value.trim()) fail("VALIDATION", `${label} is required.`);
  return value.trim();
}
function text(value: unknown, label: string) {
  if (typeof value !== "string" || !value.trim()) fail("VALIDATION", `${label} is required.`);
  return value.trim();
}
function strings(value: unknown, label: string): string[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) fail("VALIDATION", `${label} must be an array of strings.`);
  return value as string[];
}
function manager(role: UserRole) {
  if (role !== UserRole.FOUNDER && role !== UserRole.ADMIN) fail("FORBIDDEN", "Founder or Admin authorization is required.");
}
function founder(role: UserRole) { if (role !== UserRole.FOUNDER) fail("FORBIDDEN", "Founder authorization is required."); }
function state(actual: GovernanceStatus, expected: GovernanceStatus, operation: string) {
  if (actual !== expected) fail("INVALID_TRANSITION", `Cannot ${operation} from ${actual}; expected ${expected}.`);
}
function knownPrisma(error: unknown): error is Error & { code: string; clientVersion: string } {
  if (!(error instanceof Error)) return false;
  const candidate = error as Error & { code?: unknown; clientVersion?: unknown };
  return candidate.name === "PrismaClientKnownRequestError" && typeof candidate.code === "string"
    && /^P\d{4}$/.test(candidate.code) && typeof candidate.clientVersion === "string";
}
function translate(error: unknown): never {
  if (error instanceof GovernanceServiceError) throw error;
  if (knownPrisma(error) && error.code === "P2025") fail("NOT_FOUND", "Governance content was not found.");
  if (knownPrisma(error) && error.code === "P2002") fail("CONFLICT", "A governance lifecycle version already exists.");
  throw error;
}
async function atomic<T>(work: (tx: Tx) => Promise<T>): Promise<T> {
  try { return await prisma.$transaction(work); } catch (error) { translate(error); }
}
function model(tx: Tx, kind: Kind): any { return kind === "ARTICLE" ? tx.knowledgeArticle : tx.knowledgeFAQ; }
function historyModel(tx: Tx, kind: Kind): any { return kind === "ARTICLE" ? tx.knowledgeArticleHistory : tx.knowledgeFAQHistory; }
function generatedKey(kind: Kind, supplied?: string) {
  if (supplied !== undefined) return text(supplied, "contentKey");
  return `${kind === "ARTICLE" ? "ART" : "FAQ"}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
function historyData(kind: Kind, record: any, action: GovernanceAction, userId: string, role: UserRole, metadata?: Prisma.InputJsonValue) {
  const common = { version: record.version, status: record.governanceStatus, changedBy: userId, action, changedByRole: role, metadata };
  return kind === "ARTICLE"
    ? { ...common, articleId: record.id, title: record.title, summary: record.summary, content: record.content, link: record.link }
    : { ...common, faqId: record.id, question: record.question, answer: record.answer, link: record.link };
}
async function history(tx: Tx, kind: Kind, record: any, action: GovernanceAction, userId: string, role: UserRole, metadata?: Prisma.InputJsonValue) {
  return historyModel(tx, kind).create({ data: historyData(kind, record, action, userId, role, metadata) });
}
async function audit(tx: Tx, kind: Kind, record: any, action: GovernanceAction, userId: string, role: UserRole, metadata?: Prisma.InputJsonValue) {
  return tx.governanceAuditLog.create({ data: { contentType: kind, contentId: record.id, contentKey: record.contentKey ?? undefined, version: record.version, action, actorUserId: userId, actorRole: role, metadata: metadata ?? {} } });
}
async function available(tx: Tx, kind: Kind, contentKey: string, governanceStatus: GovernanceStatus, excludedIds: string[] = []) {
  const existing = await model(tx, kind).findFirst({ where: { contentKey, governanceStatus, id: { notIn: excludedIds } }, select: { id: true } });
  if (existing) fail("CONFLICT", `A ${kind.toLowerCase()} version already occupies ${governanceStatus} for this contentKey.`);
}
async function transition(kind: Kind, recordId: string, userId: string, role: UserRole, from: GovernanceStatus, to: GovernanceStatus, action: GovernanceAction, operation: string, extra: Record<string, unknown> = {}) {
  recordId = id(recordId, kind === "ARTICLE" ? "articleId" : "faqId"); id(userId, "actorUserId");
  return atomic(async (tx) => {
    const existing = await model(tx, kind).findUnique({ where: { id: recordId } });
    if (!existing) fail("NOT_FOUND", `${kind === "ARTICLE" ? "Article" : "FAQ"} not found.`);
    state(existing.governanceStatus, from, operation);
    const updated = await model(tx, kind).update({ where: { id: recordId }, data: { governanceStatus: to, status: to, ...extra } });
    await history(tx, kind, updated, action, userId, role);
    await audit(tx, kind, updated, action, userId, role);
    return updated;
  });
}

export async function createArticleDraft(input: CreateArticleInput, userId: string, role: UserRole) {
  manager(role); id(userId, "actorUserId");
  const data = { category: text(input.category, "category"), categoryTitle: text(input.categoryTitle, "categoryTitle"), title: text(input.title, "title"), keywords: strings(input.keywords, "keywords") ?? [], synonyms: strings(input.synonyms, "synonyms") ?? [], summary: text(input.summary, "summary"), content: text(input.content, "content"), link: text(input.link, "link"), contentKey: generatedKey("ARTICLE", input.contentKey) };
  return atomic(async (tx) => {
    const record = await tx.knowledgeArticle.create({ data: { ...data, governanceStatus: GovernanceStatus.DRAFT, status: "DRAFT", version: 1, createdBy: userId, lastEditedBy: userId } });
    await history(tx, "ARTICLE", record, GovernanceAction.CREATE, userId, role); await audit(tx, "ARTICLE", record, GovernanceAction.CREATE, userId, role); return record;
  });
}
export async function editArticleDraft(articleId: string, input: UpdateArticleInput, userId: string, role: UserRole) {
  manager(role); articleId = id(articleId, "articleId"); id(userId, "actorUserId");
  const changes = Object.keys(input); if (!changes.length || changes.some((key) => !["title", "summary", "content", "keywords", "synonyms", "link"].includes(key))) fail("VALIDATION", "Article update contains no valid fields.");
  return atomic(async (tx) => {
    const existing = await tx.knowledgeArticle.findUnique({ where: { id: articleId } }); if (!existing) fail("NOT_FOUND", "Article not found."); state(existing.governanceStatus, GovernanceStatus.DRAFT, "edit article");
    const record = await tx.knowledgeArticle.update({ where: { id: articleId }, data: { title: input.title === undefined ? undefined : text(input.title, "title"), summary: input.summary === undefined ? undefined : text(input.summary, "summary"), content: input.content === undefined ? undefined : text(input.content, "content"), keywords: strings(input.keywords, "keywords"), synonyms: strings(input.synonyms, "synonyms"), link: input.link === undefined ? undefined : text(input.link, "link"), lastEditedBy: userId } });
    await history(tx, "ARTICLE", record, GovernanceAction.EDIT, userId, role, { changes }); await audit(tx, "ARTICLE", record, GovernanceAction.EDIT, userId, role, { changes }); return record;
  });
}
export function founderApproveArticle(articleId: string, userId: string, role: UserRole) { founder(role); return transition("ARTICLE", articleId, userId, role, GovernanceStatus.DRAFT, GovernanceStatus.FOUNDER_APPROVED, GovernanceAction.FOUNDER_APPROVE, "approve article", { founderApprovedAt: new Date(), founderApprovedBy: userId }); }
export function erpLockArticle(articleId: string, userId: string, role: UserRole) { manager(role); return transition("ARTICLE", articleId, userId, role, GovernanceStatus.FOUNDER_APPROVED, GovernanceStatus.ERP_LOCKED, GovernanceAction.ERP_LOCK, "lock article", { erpLockedAt: new Date(), erpLockedBy: userId }); }

async function publish(kind: Kind, recordId: string, userId: string, role: UserRole) {
  manager(role); recordId = id(recordId, kind === "ARTICLE" ? "articleId" : "faqId"); id(userId, "actorUserId");
  return atomic(async (tx) => {
    const delegate = model(tx, kind); const current = await delegate.findUnique({ where: { id: recordId } }); if (!current) fail("NOT_FOUND", `${kind === "ARTICLE" ? "Article" : "FAQ"} not found.`); state(current.governanceStatus, GovernanceStatus.ERP_LOCKED, `publish ${kind.toLowerCase()}`);
    if (current.contentKey) {
      const previous = await delegate.findFirst({ where: { contentKey: current.contentKey, governanceStatus: GovernanceStatus.PUBLISHED, id: { not: recordId } } });
      if (previous) { await available(tx, kind, current.contentKey, GovernanceStatus.SUPERSEDED, [previous.id]); const superseded = await delegate.update({ where: { id: previous.id }, data: { governanceStatus: GovernanceStatus.SUPERSEDED, status: "SUPERSEDED" } }); const metadata = { supersededBy: recordId }; await history(tx, kind, superseded, GovernanceAction.SUPERSEDE, userId, role, metadata); await audit(tx, kind, superseded, GovernanceAction.SUPERSEDE, userId, role, metadata); }
    }
    const record = await delegate.update({ where: { id: recordId }, data: { governanceStatus: GovernanceStatus.PUBLISHED, status: "PUBLISHED", publishedAt: new Date(), publishedVersionId: recordId } }); await history(tx, kind, record, GovernanceAction.PUBLISH, userId, role); await audit(tx, kind, record, GovernanceAction.PUBLISH, userId, role); return record;
  });
}
export function publishArticle(articleId: string, userId: string, role: UserRole) { return publish("ARTICLE", articleId, userId, role); }

async function rollback(kind: Kind, recordId: string, targetVersion: number, userId: string, role: UserRole) {
  founder(role); recordId = id(recordId, kind === "ARTICLE" ? "articleId" : "faqId"); id(userId, "actorUserId"); if (!Number.isSafeInteger(targetVersion) || targetVersion < 1) fail("VALIDATION", "targetVersion must be a positive integer.");
  return atomic(async (tx) => {
    const delegate = model(tx, kind); const current = await delegate.findUnique({ where: { id: recordId } }); if (!current) fail("NOT_FOUND", `${kind === "ARTICLE" ? "Article" : "FAQ"} not found.`); state(current.governanceStatus, GovernanceStatus.PUBLISHED, `rollback ${kind.toLowerCase()}`);
    const key = kind === "ARTICLE" ? "articleId" : "faqId"; const snapshot = await historyModel(tx, kind).findFirst({ where: { [key]: recordId, version: targetVersion } }); if (!snapshot) fail("NOT_FOUND", `Target ${kind.toLowerCase()} version not found.`);
    if (current.contentKey) { await available(tx, kind, current.contentKey, GovernanceStatus.DRAFT); await available(tx, kind, current.contentKey, GovernanceStatus.SUPERSEDED, [recordId]); }
    const superseded = await delegate.update({ where: { id: recordId }, data: { governanceStatus: GovernanceStatus.SUPERSEDED, status: "SUPERSEDED" } });
    const base = { category: current.category, keywords: current.keywords, link: snapshot.link, contentKey: current.contentKey, governanceStatus: GovernanceStatus.DRAFT, status: "DRAFT", version: current.version + 1, createdBy: userId, lastEditedBy: userId };
    const createData = kind === "ARTICLE" ? { ...base, categoryTitle: current.categoryTitle, title: snapshot.title, synonyms: current.synonyms, summary: snapshot.summary, content: snapshot.content } : { ...base, question: snapshot.question, answer: snapshot.answer };
    const draft = await delegate.create({ data: createData }); const metadata = { targetVersion, newDraftId: draft.id }; await history(tx, kind, superseded, GovernanceAction.ROLLBACK, userId, role, metadata); await history(tx, kind, draft, GovernanceAction.CREATE, userId, role, { rollbackFrom: recordId, targetVersion }); await audit(tx, kind, superseded, GovernanceAction.ROLLBACK, userId, role, metadata); return { supersededVersion: superseded, rollbackDraftVersion: draft };
  });
}
export function rollbackArticle(articleId: string, targetVersion: number, userId: string, role: UserRole) { return rollback("ARTICLE", articleId, targetVersion, userId, role); }

async function archive(kind: Kind, recordId: string, userId: string, role: UserRole) {
  manager(role); recordId = id(recordId, kind === "ARTICLE" ? "articleId" : "faqId"); id(userId, "actorUserId");
  return atomic(async (tx) => { const delegate = model(tx, kind); const existing = await delegate.findUnique({ where: { id: recordId } }); if (!existing) fail("NOT_FOUND", `${kind === "ARTICLE" ? "Article" : "FAQ"} not found.`); if (existing.governanceStatus === GovernanceStatus.ARCHIVED) fail("INVALID_TRANSITION", `${kind === "ARTICLE" ? "Article" : "FAQ"} is already archived.`); if (existing.contentKey) await available(tx, kind, existing.contentKey, GovernanceStatus.ARCHIVED, [recordId]); const record = await delegate.update({ where: { id: recordId }, data: { governanceStatus: GovernanceStatus.ARCHIVED, status: "ARCHIVED" } }); await history(tx, kind, record, GovernanceAction.ARCHIVE, userId, role); await audit(tx, kind, record, GovernanceAction.ARCHIVE, userId, role); return record; });
}
export function archiveArticle(articleId: string, userId: string, role: UserRole) { return archive("ARTICLE", articleId, userId, role); }

export function getPublishedArticles(category?: string) { return prisma.knowledgeArticle.findMany({ where: { governanceStatus: GovernanceStatus.PUBLISHED, ...(category && { category }) }, orderBy: { publishedAt: "desc" } }); }
export function getPublishedArticleById(articleId: string) { return prisma.knowledgeArticle.findFirst({ where: { id: id(articleId, "articleId"), governanceStatus: GovernanceStatus.PUBLISHED } }); }
export function getPublishedArticleByContentKey(contentKey: string) { return prisma.knowledgeArticle.findFirst({ where: { contentKey: id(contentKey, "contentKey"), governanceStatus: GovernanceStatus.PUBLISHED } }); }
export function getArticleForAdmin(articleId: string) { return prisma.knowledgeArticle.findUnique({ where: { id: id(articleId, "articleId") }, include: { history: { orderBy: { version: "desc" } } } }); }
export function getArticlesForAdmin() { return prisma.knowledgeArticle.findMany({ orderBy: { updatedAt: "desc" } }); }

export async function createFAQDraft(input: CreateFAQInput, userId: string, role: UserRole) {
  manager(role); id(userId, "actorUserId"); const data = { category: text(input.category, "category"), question: text(input.question, "question"), answer: text(input.answer, "answer"), keywords: strings(input.keywords, "keywords") ?? [], link: text(input.link, "link"), contentKey: generatedKey("FAQ", input.contentKey) };
  return atomic(async (tx) => { const record = await tx.knowledgeFAQ.create({ data: { ...data, governanceStatus: GovernanceStatus.DRAFT, status: "DRAFT", version: 1, createdBy: userId, lastEditedBy: userId } }); await history(tx, "FAQ", record, GovernanceAction.CREATE, userId, role); await audit(tx, "FAQ", record, GovernanceAction.CREATE, userId, role); return record; });
}
export async function editFAQDraft(faqId: string, input: UpdateFAQInput, userId: string, role: UserRole) {
  manager(role); faqId = id(faqId, "faqId"); id(userId, "actorUserId"); const changes = Object.keys(input); if (!changes.length || changes.some((key) => !["question", "answer", "keywords", "link"].includes(key))) fail("VALIDATION", "FAQ update contains no valid fields.");
  return atomic(async (tx) => { const existing = await tx.knowledgeFAQ.findUnique({ where: { id: faqId } }); if (!existing) fail("NOT_FOUND", "FAQ not found."); state(existing.governanceStatus, GovernanceStatus.DRAFT, "edit FAQ"); const record = await tx.knowledgeFAQ.update({ where: { id: faqId }, data: { question: input.question === undefined ? undefined : text(input.question, "question"), answer: input.answer === undefined ? undefined : text(input.answer, "answer"), keywords: strings(input.keywords, "keywords"), link: input.link === undefined ? undefined : text(input.link, "link"), lastEditedBy: userId } }); await history(tx, "FAQ", record, GovernanceAction.EDIT, userId, role, { changes }); await audit(tx, "FAQ", record, GovernanceAction.EDIT, userId, role, { changes }); return record; });
}
export function founderApproveFAQ(faqId: string, userId: string, role: UserRole) { founder(role); return transition("FAQ", faqId, userId, role, GovernanceStatus.DRAFT, GovernanceStatus.FOUNDER_APPROVED, GovernanceAction.FOUNDER_APPROVE, "approve FAQ", { founderApprovedAt: new Date(), founderApprovedBy: userId }); }
export function erpLockFAQ(faqId: string, userId: string, role: UserRole) { manager(role); return transition("FAQ", faqId, userId, role, GovernanceStatus.FOUNDER_APPROVED, GovernanceStatus.ERP_LOCKED, GovernanceAction.ERP_LOCK, "lock FAQ", { erpLockedAt: new Date(), erpLockedBy: userId }); }
export function publishFAQ(faqId: string, userId: string, role: UserRole) { return publish("FAQ", faqId, userId, role); }
export function rollbackFAQ(faqId: string, targetVersion: number, userId: string, role: UserRole) { return rollback("FAQ", faqId, targetVersion, userId, role); }
export function archiveFAQ(faqId: string, userId: string, role: UserRole) { return archive("FAQ", faqId, userId, role); }
export function getPublishedFAQs(category?: string) { return prisma.knowledgeFAQ.findMany({ where: { governanceStatus: GovernanceStatus.PUBLISHED, ...(category && { category }) }, orderBy: { publishedAt: "desc" } }); }
export function getPublishedFAQById(faqId: string) { return prisma.knowledgeFAQ.findFirst({ where: { id: id(faqId, "faqId"), governanceStatus: GovernanceStatus.PUBLISHED } }); }
export function getFAQForAdmin(faqId: string) { return prisma.knowledgeFAQ.findUnique({ where: { id: id(faqId, "faqId") }, include: { history: { orderBy: { version: "desc" } } } }); }
export function getFAQsForAdmin() { return prisma.knowledgeFAQ.findMany({ orderBy: { updatedAt: "desc" } }); }
export function getAuditLog(input: { contentType?: string; contentId?: string; action?: GovernanceAction; limit: number; offset: number }) { return prisma.governanceAuditLog.findMany({ where: { contentType: input.contentType, contentId: input.contentId, action: input.action }, orderBy: { createdAt: "desc" }, take: input.limit, skip: input.offset }); }
