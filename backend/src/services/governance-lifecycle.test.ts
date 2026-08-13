import assert from "node:assert/strict";
import test from "node:test";
import { GovernanceAction, GovernanceStatus, UserRole } from "@prisma/client";
import { prisma } from "../lib/prisma";
import * as controller from "../controllers/governance.controller";
import * as service from "./governance.service";

const article = { id: "article-1", category: "Policy", categoryTitle: "Policy", title: "Title", keywords: [], synonyms: [], summary: "Summary", content: "Content", link: "/policy", contentKey: "ART-KEY", governanceStatus: GovernanceStatus.DRAFT, status: "DRAFT", version: 1 };
const faq = { id: "faq-1", category: "Policy", question: "Question?", answer: "Answer", keywords: [], link: "/faq", contentKey: "FAQ-KEY", governanceStatus: GovernanceStatus.DRAFT, status: "DRAFT", version: 1 };

function txDouble() {
  const events: string[] = [];
  const tx: any = {
    knowledgeArticle: { create: async ({ data }: any) => (events.push("article.create"), { ...article, ...data }), findUnique: async () => article, findFirst: async () => null, update: async ({ data }: any) => (events.push("article.update"), { ...article, ...data }) },
    knowledgeArticleHistory: { create: async () => (events.push("article.history"), {}) , findFirst: async () => ({ ...article, articleId: article.id }) },
    knowledgeFAQ: { create: async ({ data }: any) => (events.push("faq.create"), { ...faq, ...data }), findUnique: async () => faq, findFirst: async () => null, update: async ({ data }: any) => (events.push("faq.update"), { ...faq, ...data }) },
    knowledgeFAQHistory: { create: async () => (events.push("faq.history"), {}), findFirst: async () => ({ ...faq, faqId: faq.id }) },
    governanceAuditLog: { create: async () => (events.push("audit"), {}) },
  };
  return { tx, events };
}

async function replace<T extends object, K extends keyof T>(object: T, key: K, value: T[K], action: () => Promise<void>) {
  const original = object[key]; object[key] = value;
  try { await action(); } finally { object[key] = original; }
}

async function withTx(action: (tx: any, events: string[]) => Promise<void>, configure?: (tx: any) => void) {
  const fixture = txDouble(); configure?.(fixture.tx);
  await replace(prisma, "$transaction", (async (callback: any) => callback(fixture.tx)) as any, async () => action(fixture.tx, fixture.events));
}

function prismaError(code: string) { const error = new Error(`private database ${code}`); error.name = "PrismaClientKnownRequestError"; return Object.assign(error, { code, clientVersion: "test" }); }
function responseDouble() { const state = { status: 200, body: undefined as any }; const response = { status(code: number) { state.status = code; return response; }, json(body: unknown) { state.body = body; return response; } }; return { response: response as any, state }; }
function request(body: any, id = "article-1") { return { body, params: { id }, query: {}, auth: { id: "founder-1", email: "founder@test", role: UserRole.FOUNDER } } as any; }

test("article create writes record, history, and audit atomically", async () => withTx(async (_tx, events) => { await service.createArticleDraft({ category: "Policy", categoryTitle: "Policy", title: "Title", summary: "Summary", content: "Content", link: "/policy", contentKey: "ART-KEY" }, "admin-1", UserRole.ADMIN); assert.deepEqual(events, ["article.create", "article.history", "audit"]); }));
test("article edit, approval, lock, and archive enforce lifecycle and record history/audit", async () => {
  for (const [operation, status, expected] of [["edit", GovernanceStatus.DRAFT, GovernanceAction.EDIT], ["approve", GovernanceStatus.DRAFT, GovernanceAction.FOUNDER_APPROVE], ["lock", GovernanceStatus.FOUNDER_APPROVED, GovernanceAction.ERP_LOCK], ["archive", GovernanceStatus.PUBLISHED, GovernanceAction.ARCHIVE]] as const) {
    await withTx(async (_tx, events) => { if (operation === "edit") await service.editArticleDraft(article.id, { title: "Edited" }, "founder-1", UserRole.FOUNDER); else if (operation === "approve") await service.founderApproveArticle(article.id, "founder-1", UserRole.FOUNDER); else if (operation === "lock") await service.erpLockArticle(article.id, "founder-1", UserRole.FOUNDER); else await service.archiveArticle(article.id, "founder-1", UserRole.FOUNDER); assert.equal(events.includes("article.history") && events.includes("audit"), true, expected); }, (tx) => { tx.knowledgeArticle.findUnique = async () => ({ ...article, governanceStatus: status }); });
  }
});
test("article publish supersedes deterministically and repeated publish is rejected", async () => {
  await withTx(async (_tx, events) => { await service.publishArticle(article.id, "admin-1", UserRole.ADMIN); assert.equal(events.filter((event) => event === "article.update").length, 2); assert.equal(events.filter((event) => event === "article.history").length, 2); }, (tx) => { tx.knowledgeArticle.findUnique = async () => ({ ...article, governanceStatus: GovernanceStatus.ERP_LOCKED }); tx.knowledgeArticle.findFirst = async ({ where }: any) => where.governanceStatus === GovernanceStatus.PUBLISHED ? { ...article, id: "old" } : null; });
  await withTx(async () => assert.rejects(() => service.publishArticle(article.id, "admin-1", UserRole.ADMIN), (error: any) => error.code === "INVALID_TRANSITION"), (tx) => { tx.knowledgeArticle.findUnique = async () => ({ ...article, governanceStatus: GovernanceStatus.PUBLISHED }); });
});
test("article rollback creates a draft, history and audit; validates target and missing snapshot", async () => {
  await assert.rejects(() => service.rollbackArticle(article.id, Number.NaN, "founder-1", UserRole.FOUNDER), (error: any) => error.code === "VALIDATION");
  await withTx(async () => assert.rejects(() => service.rollbackArticle(article.id, 1, "founder-1", UserRole.FOUNDER), (error: any) => error.code === "NOT_FOUND"), (tx) => { tx.knowledgeArticle.findUnique = async () => ({ ...article, governanceStatus: GovernanceStatus.PUBLISHED }); tx.knowledgeArticleHistory.findFirst = async () => null; });
  await withTx(async (_tx, events) => { const result = await service.rollbackArticle(article.id, 1, "founder-1", UserRole.FOUNDER); assert.equal(result.rollbackDraftVersion.version, 2); assert.equal(events.filter((event) => event === "article.history").length, 2); assert.equal(events.includes("audit"), true); }, (tx) => { tx.knowledgeArticle.findUnique = async () => ({ ...article, governanceStatus: GovernanceStatus.PUBLISHED }); });
});
test("article invalid transition and superseded-slot conflict are controlled", async () => {
  await withTx(async () => assert.rejects(() => service.founderApproveArticle(article.id, "founder-1", UserRole.FOUNDER), (error: any) => error.code === "INVALID_TRANSITION"), (tx) => { tx.knowledgeArticle.findUnique = async () => ({ ...article, governanceStatus: GovernanceStatus.PUBLISHED }); });
  await withTx(async () => assert.rejects(() => service.publishArticle(article.id, "admin-1", UserRole.ADMIN), (error: any) => error.code === "CONFLICT"), (tx) => { tx.knowledgeArticle.findUnique = async () => ({ ...article, governanceStatus: GovernanceStatus.ERP_LOCKED }); tx.knowledgeArticle.findFirst = async () => ({ ...article, id: "occupied" }); });
});
test("dependent article write failure rejects the transaction", async () => withTx(async () => assert.rejects(() => service.createArticleDraft({ category: "Policy", categoryTitle: "Policy", title: "Title", summary: "Summary", content: "Content", link: "/policy" }, "admin-1", UserRole.ADMIN), /history failed/), (tx) => { tx.knowledgeArticleHistory.create = async () => { throw new Error("history failed"); }; }));
test("Prisma not-found/conflict translate and unknown errors remain unknown", async () => {
  for (const [code, expected] of [["P2025", "NOT_FOUND"], ["P2002", "CONFLICT"]]) await replace(prisma, "$transaction", (async () => { throw prismaError(code); }) as any, async () => assert.rejects(() => service.createArticleDraft({ category: "P", categoryTitle: "P", title: "T", summary: "S", content: "C", link: "/" }, "admin", UserRole.ADMIN), (error: any) => error.code === expected));
  const unknown = new Error("private database detail"); await replace(prisma, "$transaction", (async () => { throw unknown; }) as any, async () => assert.rejects(() => service.createArticleDraft({ category: "P", categoryTitle: "P", title: "T", summary: "S", content: "C", link: "/" }, "admin", UserRole.ADMIN), (error) => error === unknown));
});
test("controller validates article rollback and does not leak unknown errors", async () => {
  let transactionCalled = false; await replace(prisma, "$transaction", (async () => { transactionCalled = true; }) as any, async () => { const { response, state } = responseDouble(); await controller.rollbackArticle(request({ targetVersionId: "NaN" }), response); assert.equal(state.status, 400); assert.equal(transactionCalled, false); });
  await replace(prisma, "$transaction", (async () => { throw new Error("private database detail"); }) as any, async () => { await replace(console, "error", (() => undefined) as any, async () => { const { response, state } = responseDouble(); await controller.publishArticle(request({}), response); assert.equal(state.status, 500); assert.equal(JSON.stringify(state.body).includes("private database detail"), false); }); });
});
test("FAQ create, edit, approval, lock and archive are transactional with history/audit", async () => {
  await withTx(async (_tx, events) => { await service.createFAQDraft({ category: "Policy", question: "Q?", answer: "A", link: "/faq" }, "admin", UserRole.ADMIN); assert.deepEqual(events, ["faq.create", "faq.history", "audit"]); });
  for (const [operation, status] of [["edit", GovernanceStatus.DRAFT], ["approve", GovernanceStatus.DRAFT], ["lock", GovernanceStatus.FOUNDER_APPROVED], ["archive", GovernanceStatus.PUBLISHED]] as const) await withTx(async (_tx, events) => { if (operation === "edit") await service.editFAQDraft(faq.id, { answer: "Edited" }, "founder", UserRole.FOUNDER); else if (operation === "approve") await service.founderApproveFAQ(faq.id, "founder", UserRole.FOUNDER); else if (operation === "lock") await service.erpLockFAQ(faq.id, "founder", UserRole.FOUNDER); else await service.archiveFAQ(faq.id, "founder", UserRole.FOUNDER); assert.equal(events.includes("faq.history") && events.includes("audit"), true); }, (tx) => { tx.knowledgeFAQ.findUnique = async () => ({ ...faq, governanceStatus: status }); });
});
test("FAQ publish supersedes with history/audit and rejects invalid transitions", async () => {
  await withTx(async (_tx, events) => { await service.publishFAQ(faq.id, "admin", UserRole.ADMIN); assert.equal(events.filter((event) => event === "faq.history").length, 2); assert.equal(events.filter((event) => event === "audit").length, 2); }, (tx) => { tx.knowledgeFAQ.findUnique = async () => ({ ...faq, governanceStatus: GovernanceStatus.ERP_LOCKED }); tx.knowledgeFAQ.findFirst = async ({ where }: any) => where.governanceStatus === GovernanceStatus.PUBLISHED ? { ...faq, id: "old" } : null; });
  await withTx(async () => assert.rejects(() => service.publishFAQ(faq.id, "admin", UserRole.ADMIN), (error: any) => error.code === "INVALID_TRANSITION"), (tx) => { tx.knowledgeFAQ.findUnique = async () => ({ ...faq, governanceStatus: GovernanceStatus.PUBLISHED }); });
});
test("FAQ rollback is atomic, validates transition, and records history/audit", async () => {
  await withTx(async (_tx, events) => { const result = await service.rollbackFAQ(faq.id, 1, "founder", UserRole.FOUNDER); assert.equal(result.rollbackDraftVersion.version, 2); assert.equal(events.filter((event) => event === "faq.history").length, 2); assert.equal(events.includes("audit"), true); }, (tx) => { tx.knowledgeFAQ.findUnique = async () => ({ ...faq, governanceStatus: GovernanceStatus.PUBLISHED }); });
  await withTx(async () => assert.rejects(() => service.rollbackFAQ(faq.id, 1, "founder", UserRole.FOUNDER), (error: any) => error.code === "INVALID_TRANSITION"), (tx) => { tx.knowledgeFAQ.findUnique = async () => ({ ...faq, governanceStatus: GovernanceStatus.DRAFT }); });
});
test("FAQ dependent write failure rejects the transaction", async () => withTx(async () => assert.rejects(() => service.createFAQDraft({ category: "P", question: "Q", answer: "A", link: "/" }, "admin", UserRole.ADMIN), /audit failed/), (tx) => { tx.governanceAuditLog.create = async () => { throw new Error("audit failed"); }; }));
