import assert from "node:assert/strict";
import test from "node:test";
import * as controller from "../controllers/customer.controller";
import { requireAuth, requireRoles, type AuthenticatedRequest, type AuthRole } from "../middleware/auth.middleware";

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

function isolatedHandlers(overrides: Record<string, unknown> = {}) {
  const databaseAccessBlocked = async () => {
    throw new Error("TEST ISOLATION FAILURE: unexpected customer database access");
  };
  return controller.createCustomerHandlers({
    getCustomers: databaseAccessBlocked,
    getCustomer: databaseAccessBlocked,
    createCustomer: databaseAccessBlocked,
    updateCustomer: databaseAccessBlocked,
    ...overrides,
  } as any);
}

test("customer DELETE returns the explicit hard-delete safeguard response without invoking the service", { concurrency: false }, async () => {
  let deleteInvoked = false;
  const handlers = isolatedHandlers({ deleteCustomer: async () => { deleteInvoked = true; } });
  const { response, state } = responseDouble();
  await handlers.deleteCustomer(request() as any, response);
  assert.equal(state.status, 409);
  assert.equal(state.body.success, false);
  assert.equal(state.body.message, HARD_DELETE_MESSAGE);
  assert.equal(deleteInvoked, false);
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
  const handlers = isolatedHandlers({ getCustomers: async () => [customer] });
  const { response, state } = responseDouble();
  await handlers.getCustomers(request() as any, response);
  assert.equal(state.status, 200);
  assert.deepEqual(state.body, { success: true, data: [customer] });
});

test("customer detail behavior remains unchanged", { concurrency: false }, async () => {
  const handlers = isolatedHandlers({ getCustomer: async () => customer });
  const { response, state } = responseDouble();
  await handlers.getCustomer(request() as any, response);
  assert.equal(state.status, 200);
  assert.deepEqual(state.body, { success: true, data: customer });
});

test("customer create and update behavior remains unchanged", { concurrency: false }, async () => {
  const handlers = isolatedHandlers({
    createCustomer: async () => customer,
    updateCustomer: async () => ({ ...customer, status: "Contacted" }),
  });
  const createResponse = responseDouble();
  await handlers.createCustomer(request(customer) as any, createResponse.response);
  assert.equal(createResponse.state.status, 201);
  assert.equal(createResponse.state.body.success, true);
  assert.equal(createResponse.state.body.data, customer);

  const updateResponse = responseDouble();
  await handlers.updateCustomer(request({ status: "Contacted" }) as any, updateResponse.response);
  assert.equal(updateResponse.state.status, 200);
  assert.equal(updateResponse.state.body.success, true);
  assert.equal(updateResponse.state.body.data.status, "Contacted");
});
