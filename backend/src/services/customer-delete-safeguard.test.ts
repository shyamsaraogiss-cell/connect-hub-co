import assert from "node:assert/strict";
import test from "node:test";
import * as controller from "../controllers/customer.controller";
import { requireAuth, requireRoles, type AuthenticatedRequest, type AuthRole } from "../middleware/auth.middleware";
import * as service from "./customer.service";

const HARD_DELETE_MESSAGE = "Customer hard deletion is disabled. Historical operational records must be preserved.";
const customer = { id: "customer-1", fullName: "Customer", mobile: "9999999999", purpose: "Ritual", status: "New" };

function responseDouble() {
  const state = { status: 200, body: undefined as any };
  const response = {
    status(code: number) { state.status = code; return response; },
    json(body: unknown) { state.body = body; return response; },
  };
  return { response: response as any, state };
}

function request(body: any = {}, role?: AuthRole) {
  return {
    body,
    params: { id: customer.id },
    header: () => undefined,
    auth: role ? { id: `${role.toLowerCase()}-1`, email: `${role.toLowerCase()}@example.test`, role } : undefined,
  } as unknown as AuthenticatedRequest;
}

async function replace<T extends object, K extends keyof T>(object: T, key: K, value: T[K], action: () => Promise<void>) {
  const original = object[key];
  object[key] = value;
  try { await action(); } finally { object[key] = original; }
}

test("customer DELETE returns the explicit hard-delete safeguard response without invoking the service", { concurrency: false }, async () => {
  let deleteInvoked = false;
  await replace(service, "deleteCustomer", (async () => { deleteInvoked = true; }) as any, async () => {
    const { response, state } = responseDouble();
    await controller.deleteCustomer(request() as any, response);
    assert.equal(state.status, 409);
    assert.equal(state.body.success, false);
    assert.equal(state.body.message, HARD_DELETE_MESSAGE);
    assert.equal(deleteInvoked, false);
  });
});

test("unauthenticated customer DELETE is blocked before the handler", async () => {
  const { response, state } = responseDouble();
  let reached = false;
  await requireAuth(request(), response, (() => { reached = true; }) as any);
  assert.equal(state.status, 401);
  assert.equal(reached, false);
});

test("unauthorized customer role is blocked before the DELETE handler", () => {
  const { response, state } = responseDouble();
  let reached = false;
  requireRoles("FOUNDER", "ADMIN")(request({}, "CUSTOMER"), response, () => { reached = true; });
  assert.equal(state.status, 403);
  assert.equal(reached, false);
});

for (const role of ["FOUNDER", "ADMIN"] as const) {
  test(`${role} authorization reaches the protected customer DELETE handler`, () => {
    const { response, state } = responseDouble();
    let reached = false;
    requireRoles("FOUNDER", "ADMIN")(request({}, role), response, () => {
      reached = true;
      void controller.deleteCustomer(request({}, role) as any, response);
    });
    assert.equal(reached, true);
    assert.equal(state.status, 409);
    assert.equal(state.body.message, HARD_DELETE_MESSAGE);
  });
}

test("customer list behavior remains unchanged", { concurrency: false }, async () => {
  await replace(service, "getCustomers", (async () => [customer]) as any, async () => {
    const { response, state } = responseDouble();
    await controller.getCustomers(request() as any, response);
    assert.equal(state.status, 200);
    assert.deepEqual(state.body, { success: true, data: [customer] });
  });
});

test("customer detail behavior remains unchanged", { concurrency: false }, async () => {
  await replace(service, "getCustomer", (async () => customer) as any, async () => {
    const { response, state } = responseDouble();
    await controller.getCustomer(request() as any, response);
    assert.equal(state.status, 200);
    assert.deepEqual(state.body, { success: true, data: customer });
  });
});

test("customer create and update behavior remains unchanged", { concurrency: false }, async () => {
  await replace(service, "createCustomer", (async () => customer) as any, async () => {
    const { response, state } = responseDouble();
    await controller.createCustomer(request(customer) as any, response);
    assert.equal(state.status, 201);
    assert.equal(state.body.success, true);
    assert.equal(state.body.data, customer);
  });
  await replace(service, "updateCustomer", (async () => ({ ...customer, status: "Contacted" })) as any, async () => {
    const { response, state } = responseDouble();
    await controller.updateCustomer(request({ status: "Contacted" }) as any, response);
    assert.equal(state.status, 200);
    assert.equal(state.body.success, true);
    assert.equal(state.body.data.status, "Contacted");
  });
});
