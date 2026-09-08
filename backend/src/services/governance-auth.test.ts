import assert from "node:assert/strict";
import test from "node:test";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { optionalAuth, requireAuth, requireRoles, type AuthenticatedRequest, type AuthRole } from "../middleware/auth.middleware";

const SECRET = "governance-test-secret";
const ISSUER = "connect-hub-co-auth";
const AUDIENCE = "connect-hub-co-api";
const ACTIVE_FOUNDER = { id: "founder-1", email: "founder@example.test", role: "FOUNDER" as const, isActive: true };

function responseDouble() {
  const state = { status: 200, body: undefined as unknown };
  const response = {
    status(code: number) { state.status = code; return response; },
    json(body: unknown) { state.body = body; return response; },
  };
  return { response: response as any, state };
}

function requestWithToken(token?: string) {
  return { header: () => token ? `Bearer ${token}` : undefined } as unknown as AuthenticatedRequest;
}

function setJwtConfig() {
  process.env.JWT_SECRET = SECRET;
  process.env.JWT_ISSUER = ISSUER;
  process.env.JWT_AUDIENCE = AUDIENCE;
}

function sign(
  claims: Record<string, unknown> = ACTIVE_FOUNDER,
  secret = SECRET,
  expiresIn: jwt.SignOptions["expiresIn"] = "1h",
  issuer = ISSUER,
  audience = AUDIENCE
) {
  return jwt.sign(claims, secret, { expiresIn, issuer, audience });
}

async function withUser(user: typeof ACTIVE_FOUNDER | { id: string; email: string; role: AuthRole; isActive: boolean } | null, action: () => Promise<void>) {
  const findUnique = prisma.user.findUnique;
  (prisma.user.findUnique as any) = async () => user;
  try { await action(); } finally { (prisma.user.findUnique as any) = findUnique; }
}

async function authenticate(token: string) {
  const req = requestWithToken(token);
  const { response, state } = responseDouble();
  let continued = false;
  await optionalAuth(req, response, (() => { continued = true; }) as any);
  return { req, state, continued };
}

test("valid authenticated user uses current database identity", { concurrency: false }, async () => {
  setJwtConfig();
  await withUser(ACTIVE_FOUNDER, async () => {
    const result = await authenticate(sign());
    assert.equal(result.continued, true);
    assert.deepEqual(result.req.auth, { id: ACTIVE_FOUNDER.id, email: ACTIVE_FOUNDER.email, role: ACTIVE_FOUNDER.role });
  });
});

for (const [name, token] of [
  ["malformed token", "not-a-jwt"],
  ["expired token", sign(ACTIVE_FOUNDER, SECRET, -1)],
  ["invalid signature", sign(ACTIVE_FOUNDER, "different-secret")],
  ["missing required claims", sign({ id: "founder-1", role: "FOUNDER" })],
  ["missing expiration claim", jwt.sign(ACTIVE_FOUNDER, SECRET, { issuer: ISSUER, audience: AUDIENCE })],
  ["unrecognized role", sign({ ...ACTIVE_FOUNDER, role: "SUPERUSER" })],
] as const) {
  test(`rejects ${name}`, { concurrency: false }, async () => {
    setJwtConfig();
    const result = await authenticate(token);
    assert.equal(result.continued, false);
    assert.equal(result.state.status, 401);
  });
}

test("rejects a deleted user", { concurrency: false }, async () => {
  setJwtConfig();
  await withUser(null, async () => assert.equal((await authenticate(sign())).state.status, 401));
});

test("rejects a role changed after token issuance", { concurrency: false }, async () => {
  setJwtConfig();
  await withUser({ ...ACTIVE_FOUNDER, role: "ADMIN" }, async () => assert.equal((await authenticate(sign())).state.status, 401));
});

test("rejects a deactivated user", { concurrency: false }, async () => {
  setJwtConfig();
  await withUser({ ...ACTIVE_FOUNDER, isActive: false }, async () => assert.equal((await authenticate(sign())).state.status, 401));
});

test("rejects authentication when JWT_SECRET is missing", { concurrency: false }, async () => {
  setJwtConfig();
  delete process.env.JWT_SECRET;
  assert.equal((await authenticate(sign())).state.status, 401);
});

test("accepts the configured issuer and audience", { concurrency: false }, async () => {
  setJwtConfig();
  await withUser(ACTIVE_FOUNDER, async () => assert.equal((await authenticate(sign())).continued, true));
});

test("rejects an incorrect issuer", { concurrency: false }, async () => {
  setJwtConfig();
  assert.equal((await authenticate(sign(ACTIVE_FOUNDER, SECRET, "1h", "wrong-issuer"))).state.status, 401);
});

test("rejects an incorrect audience", { concurrency: false }, async () => {
  setJwtConfig();
  assert.equal((await authenticate(sign(ACTIVE_FOUNDER, SECRET, "1h", ISSUER, "wrong-audience"))).state.status, 401);
});

test("rejects authentication when JWT_ISSUER is missing", { concurrency: false }, async () => {
  setJwtConfig();
  delete process.env.JWT_ISSUER;
  assert.equal((await authenticate(sign())).state.status, 401);
});

test("rejects authentication when JWT_AUDIENCE is missing", { concurrency: false }, async () => {
  setJwtConfig();
  delete process.env.JWT_AUDIENCE;
  assert.equal((await authenticate(sign())).state.status, 401);
});

test("requireAuth rejects a request without authentication", { concurrency: false }, async () => {
  const req = requestWithToken();
  const { response, state } = responseDouble();
  await requireAuth(req, response, (() => assert.fail("must not continue")) as any);
  assert.equal(state.status, 401);
});

test("requireRoles rejects an authenticated user lacking the required role", { concurrency: false }, () => {
  const req = { auth: { id: "admin-1", email: "admin@example.test", role: "ADMIN" } } as AuthenticatedRequest;
  const { response, state } = responseDouble();
  requireRoles("FOUNDER")(req, response, (() => assert.fail("must not continue")) as any);
  assert.equal(state.status, 403);
});

test("requireRoles permits Founder and Admin allowlist members", { concurrency: false }, () => {
  for (const role of ["FOUNDER", "ADMIN"] as const) {
    const req = { auth: { id: `${role}-1`, email: `${role}@example.test`, role } } as AuthenticatedRequest;
    const { response } = responseDouble();
    let continued = false;
    requireRoles("FOUNDER", "ADMIN")(req, response, (() => { continued = true; }) as any);
    assert.equal(continued, true);
  }
});
