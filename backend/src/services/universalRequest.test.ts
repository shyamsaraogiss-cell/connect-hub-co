import assert from "node:assert/strict";
import test from "node:test";
import { prisma } from "../lib/prisma";
import { requireRoles, type AuthenticatedRequest } from "../middleware/auth.middleware";
import * as controller from "../controllers/universalRequest.controller";
import * as service from "./universalRequest.service";

const safeRecord = {
  id: "request-1",
  referenceId: "CHC-2026-123456",
  requestType: "INQUIRY",
  serviceDomain: "RITUAL",
  guestName: "Customer",
  title: "Question",
  currentStatus: "SUBMITTED",
  currentStage: "Submitted",
  assignedTeam: "Operations",
  publicNote: "Request received.",
  completedAt: null,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
  history: [],
};

function responseDouble() {
  const state = { status: 200, body: undefined as any, sent: false };
  const response = {
    status(code: number) { state.status = code; return response; },
    json(body: unknown) { state.body = body; return response; },
    send() { state.sent = true; return response; },
  };
  return { response: response as any, state };
}

function request(body: any = {}, auth?: AuthenticatedRequest["auth"], params: any = {}) {
  return { body, auth, params } as AuthenticatedRequest;
}

async function replace<T extends object, K extends keyof T>(object: T, key: K, value: T[K], action: () => Promise<void>) {
  const original = object[key];
  object[key] = value;
  try { await action(); } finally { object[key] = original; }
}

test("public intake accepts valid input without authentication and returns a safe projection", { concurrency: false }, async () => {
  await replace(prisma.universalRequest, "findUnique", (async () => null) as any, async () => {
    await replace(prisma.universalRequest, "create", (async ({ data }: any) => {
      assert.equal(data.customerId, undefined);
      return safeRecord as any;
    }) as any, async () => {
      const { response, state } = responseDouble();
      await controller.createUniversalRequest(request({ requestType: "INQUIRY", guestName: "Customer", title: "Question", description: "Details" }), response);
      assert.equal(state.status, 201);
      assert.equal(state.body.referenceId, safeRecord.referenceId);
      assert.equal("internalNote" in state.body, false);
      assert.equal("guestEmail" in state.body, false);
    });
  });
});

test("public intake rejects invalid required input", { concurrency: false }, async () => {
  const { response, state } = responseDouble();
  await controller.createUniversalRequest(request({ requestType: "UNKNOWN" }), response);
  assert.equal(state.status, 400);
});

test("public tracking succeeds with matching contact and does not disclose unsafe fields", { concurrency: false }, async () => {
  await replace(prisma.universalRequest, "findFirst", (async ({ where }: any) => {
    assert.equal(where.referenceId, safeRecord.referenceId);
    assert.equal(where.OR[0].guestEmail.equals, "customer@example.test");
    return safeRecord as any;
  }) as any, async () => {
    const { response, state } = responseDouble();
    await controller.trackUniversalRequest(request({ referenceId: safeRecord.referenceId.toLowerCase(), contactVerification: "customer@example.test" }), response);
    assert.equal(state.status, 200);
    assert.equal("internalNote" in state.body, false);
  });
});

test("public tracking rejects incorrect contact without disclosure", { concurrency: false }, async () => {
  await replace(service, "trackGuestRequest", (async () => null) as any, async () => {
    const { response, state } = responseDouble();
    await controller.trackUniversalRequest(request({ referenceId: safeRecord.referenceId, contactVerification: "wrong@example.test" }), response);
    assert.equal(state.status, 404);
    assert.equal(state.body.referenceId, undefined);
  });
});

test("customer reads are constrained to the authenticated customer id", { concurrency: false }, async () => {
  await replace(prisma.universalRequest, "findFirst", (async ({ where }: any) => where.customerId === "customer-1" ? safeRecord : null) as any, async () => {
    assert.equal(await service.getCustomerRequest(safeRecord.referenceId, "customer-1"), safeRecord);
    assert.equal(await service.getCustomerRequest(safeRecord.referenceId, "customer-2"), null);
  });
});

test("partner reads are constrained to the assigned partner id", { concurrency: false }, async () => {
  await replace(prisma.universalRequest, "findFirst", (async ({ where }: any) => where.assignedPartnerUserId === "partner-1" ? safeRecord : null) as any, async () => {
    assert.equal(await service.getPartnerRequest(safeRecord.referenceId, "partner-1"), safeRecord);
    assert.equal(await service.getPartnerRequest(safeRecord.referenceId, "partner-2"), null);
  });
});

test("Founder and Admin pass the privileged allowlist while Customer is rejected", { concurrency: false }, async () => {
  for (const role of ["FOUNDER", "ADMIN"] as const) {
    let continued = false;
    const { response } = responseDouble();
    requireRoles("FOUNDER", "ADMIN")(request({}, { id: role, email: `${role}@example.test`, role }), response, (() => { continued = true; }) as any);
    assert.equal(continued, true);
  }
  const { response, state } = responseDouble();
  requireRoles("FOUNDER", "ADMIN")(request({}, { id: "customer", email: "customer@example.test", role: "CUSTOMER" }), response, (() => assert.fail("must not continue")) as any);
  assert.equal(state.status, 403);
});

test("ineligible partner assignment is rejected", { concurrency: false }, async () => {
  await replace(prisma.universalRequest, "findUnique", (async () => ({ currentStatus: "ACKNOWLEDGED", currentStage: "Acknowledged" })) as any, async () => {
    await replace(prisma.user, "findFirst", (async () => null) as any, async () => {
      await assert.rejects(() => service.updateRequestByAdmin(safeRecord.referenceId, { assignedPartnerUserId: "ineligible" }), /ASSIGNED_PARTNER_NOT_ELIGIBLE/);
    });
  });
});

test("valid status transition updates record and history in one transaction", { concurrency: false }, async () => {
  let historyCreated = false;
  await replace(prisma.universalRequest, "findUnique", (async () => ({ currentStatus: "SUBMITTED", currentStage: "Submitted" })) as any, async () => {
    await replace(prisma, "$transaction", (async (callback: any) => callback({
      universalRequest: { update: async () => ({ ...safeRecord, currentStatus: "ACKNOWLEDGED", currentStage: "Acknowledged" }) },
      universalRequestStatusHistory: { create: async ({ data }: any) => { historyCreated = data.previousStatus === "SUBMITTED" && data.newStatus === "ACKNOWLEDGED"; } },
    })) as any, async () => {
      const updated = await service.updateRequestByAdmin(safeRecord.referenceId, { currentStatus: "ACKNOWLEDGED", currentStage: "Acknowledged" }, { id: "admin-1", role: "ADMIN" });
      assert.equal(updated.currentStatus, "ACKNOWLEDGED");
      assert.equal(historyCreated, true);
    });
  });
});

test("invalid status transition is rejected before transaction", { concurrency: false }, async () => {
  let transactionCalled = false;
  await replace(prisma.universalRequest, "findUnique", (async () => ({ currentStatus: "SUBMITTED", currentStage: "Submitted" })) as any, async () => {
    await replace(prisma, "$transaction", (async () => { transactionCalled = true; }) as any, async () => {
      await assert.rejects(() => service.updateRequestByAdmin(safeRecord.referenceId, { currentStatus: "COMPLETED" }), /INVALID_STATUS_TRANSITION/);
      assert.equal(transactionCalled, false);
    });
  });
});

test("reference generation follows contract and retries a collision", { concurrency: false }, async () => {
  let lookups = 0;
  let createdReference = "";
  await replace(prisma.universalRequest, "findUnique", (async () => (++lookups === 1 ? { id: "collision" } : null)) as any, async () => {
    await replace(prisma.universalRequest, "create", (async ({ data }: any) => { createdReference = data.referenceId; return safeRecord; }) as any, async () => {
      await service.createUniversalRequest({ requestType: "INQUIRY", guestName: "Customer", title: "Question", description: "Details" });
      assert.equal(lookups, 2);
      assert.match(createdReference, /^CHC-\d{4}-\d{6}$/);
    });
  });
});
