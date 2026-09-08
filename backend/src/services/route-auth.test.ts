import assert from "node:assert/strict";
import test from "node:test";
import type { AuthenticatedRequest } from "../middleware/auth.middleware";
import religiousPartnerRoutes from "../routes/religiousPartner.routes";
import pitruMokshaRoutes from "../routes/pitrumoksha.routes";

type RouteLayer = {
  route?: {
    path: string;
    methods: Record<string, boolean>;
    stack: Array<{ handle: Function }>;
  };
};

function handlers(router: any, method: string, path: string) {
  const layer = (router.stack as RouteLayer[]).find((item) => item.route?.path === path && item.route.methods[method]);
  assert.ok(layer?.route, `${method.toUpperCase()} ${path} route must exist`);
  return layer.route.stack.map((item) => item.handle);
}

function responseDouble() {
  const state = { status: 200 };
  const response = {
    status(code: number) { state.status = code; return response; },
    json() { return response; },
  };
  return { response: response as any, state };
}

test("Religious Partner registration remains public", () => {
  const routeHandlers = handlers(religiousPartnerRoutes, "post", "/");
  assert.equal(routeHandlers.length, 1);
  assert.equal(routeHandlers[0].name, "createReligiousPartner");
});

test("Religious Partner management routes require authentication and role authorization", () => {
  for (const [method, path] of [["get", "/"], ["get", "/:id"], ["put", "/:id"], ["patch", "/:id/deactivate"], ["patch", "/:id/link-user"]]) {
    const routeHandlers = handlers(religiousPartnerRoutes, method, path);
    assert.equal(routeHandlers.length, 3);
    assert.equal(routeHandlers[0].name, "requireAuth");
  }
});

test("unauthorized role cannot access Religious Partner management", () => {
  const roleGuard = handlers(religiousPartnerRoutes, "get", "/")[1];
  const req = { auth: { id: "customer-1", email: "customer@example.test", role: "CUSTOMER" } } as AuthenticatedRequest;
  const { response, state } = responseDouble();
  roleGuard(req, response, () => assert.fail("must not continue"));
  assert.equal(state.status, 403);
});

test("Pitru Moksha request intake remains public", () => {
  const routeHandlers = handlers(pitruMokshaRoutes, "post", "/");
  assert.equal(routeHandlers.length, 1);
  assert.equal(routeHandlers[0].name, "createRequest");
});

test("Pitru Moksha internal listing rejects unauthenticated access", async () => {
  const authGuard = handlers(pitruMokshaRoutes, "get", "/")[0];
  const req = { header: () => undefined } as unknown as AuthenticatedRequest;
  const { response, state } = responseDouble();
  await authGuard(req, response, () => assert.fail("must not continue"));
  assert.equal(state.status, 401);
});

test("Founder and Admin can access protected Pitru Moksha listing", () => {
  const roleGuard = handlers(pitruMokshaRoutes, "get", "/")[1];
  for (const role of ["FOUNDER", "ADMIN"] as const) {
    const req = { auth: { id: `${role}-1`, email: `${role}@example.test`, role } } as AuthenticatedRequest;
    const { response } = responseDouble();
    let continued = false;
    roleGuard(req, response, () => { continued = true; });
    assert.equal(continued, true);
  }
});
