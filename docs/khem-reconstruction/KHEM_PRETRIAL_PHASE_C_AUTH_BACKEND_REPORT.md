# KHEM Pre-Trial Phase C — Authentication and Backend Contract Recovery

Date: 2026-08-12  
Canonical web application: `C:\Projects\connect-hub-co\apps\web`  
Canonical surviving backend: `C:\Projects\connect-hub-co\backend`

## Executive result

The active backend owner is an Express 5/TypeScript service on port 5000. Its mounted login route is `POST /api/auth/login`; it accepts `{ email, password }` and returns `{ success, message, token, user }`, with a seven-day JWT containing user id, email and role. It does not set a cookie and exposes no logout, current-user, authentication guard or role guard.

The web client was calling `POST /auth/login` against an active `NEXT_PUBLIC_API_URL` of `http://localhost:5000` and expected a cookie-restorable `{ user }` contract. The independently established path and user-shape mismatches were corrected in `apps/web/src/services/auth.api.ts`: login now calls `/api/auth/login` and maps backend `fullName` to canonical web `name`. The returned JWT is intentionally neither printed nor persisted.

The canonical session model is **SOURCE NOT ESTABLISHED**. Recovery evidence contains two conflicting historical implementations: browser `localStorage` bearer JWT and a separate Next HTTP-only-cookie route. Neither survives in the canonical app, and the active Express server implements only body JWT issuance. No cookie proxy, browser-token storage, middleware, `/auth/me`, `/auth/logout`, or duplicate endpoint was invented.

## 1. Backend ownership

| Field | Verified result |
|---|---|
| Backend project path | `C:\Projects\connect-hub-co\backend` |
| Framework | Express 5, TypeScript, Prisma 6, PostgreSQL |
| Start command | `npm run dev` → `ts-node-dev --respawn --transpile-only src/server.ts` |
| Expected port | `5000`, fixed in `backend/src/server.ts` |
| Auth owner | `backend/src/routes/auth.routes.ts` and `backend/src/controllers/auth.controller.ts` |
| Database owner | `backend/prisma/schema.prisma`, accessed through `backend/src/lib/prisma.ts` |
| Current status | Source compiles, but verified startup does not reach the listen callback; port health and login probes time out |

No NestJS, Fastify, active Next API auth owner, global prefix, or rewrite/proxy was found in the canonical application. Express mounts `authRoutes` directly at `/api/auth`.

## 2. Frontend authentication trace

| Step | File / function | Input | Output / state | Cookie or token expectation | Role source |
|---|---|---|---|---|---|
| Login page | `apps/web/src/app/login/page.tsx`, `submit` | email/password form | calls context `login`; displays API error | none directly | none |
| Context login | `apps/web/src/components/auth/AuthProvider.tsx`, `login` | `LoginInput` | stores returned user in React state; redirects `/` | assumes transport establishes persistence | response user |
| Auth request | `apps/web/src/services/auth.api.ts`, `login` | JSON `{email,password}` | normalized `{user:{id,name,email,role}}` | returned backend token deliberately unused while model is unresolved | backend response role |
| Fetch utility | `apps/web/src/lib/api.ts`, `api` | endpoint and `RequestInit` | JSON or `ApiError`; five-second timeout | always `credentials: include`; no Authorization header | none |
| Startup/current user | `AuthProvider` → `getCurrentUser` | none | sets or clears user | calls `/auth/me`, implying cookie/session restoration | `/auth/me` response, but route absent |
| Dashboard selection | `apps/web/src/app/dashboard/page.tsx` | context user | Founder/Admin, limited partner, or safe customer dashboard | current in-memory user | exact backend-aligned role strings |
| Logout | `AuthProvider` → `logoutRequest` | none | clears React user and redirects `/login` in `finally` | calls `/auth/logout`, implying server session invalidation | none |

No active `localStorage`, `sessionStorage`, bearer header, token variable, or token persistence exists in the canonical web authentication path.

## 3. Backend authentication contract

| Contract field | Exact surviving implementation |
|---|---|
| Route | `/api/auth/login` (`/api/auth` mount plus `/login` router path) |
| Method | POST |
| Request body | `email`, `password` |
| Success body | `success`, `message`, `token`, `user` |
| User fields | `id`, `fullName`, `email`, `role` |
| Status codes | 200 success; 401 missing user or invalid password; 500 caught failure |
| JWT | Yes; signed with `JWT_SECRET`; claims `id`, `email`, `role`; expires in 7 days |
| Cookie | No |
| Refresh token | No |
| Logout route | No |
| Current-user route | No |
| Authentication guard | No |
| Role guard | No |

The controller does not explicitly validate missing login fields before database lookup. No live credential was used and no token value was logged.

## 4. Path mismatch resolution

The active environment files point the web client at `http://localhost:5000`; that base URL does not include `/api`. The Express app explicitly mounts the auth router at `/api/auth`. Historical direct-backend clients also used `http://localhost:5000/api/auth/login`. No active proxy or rewrite was found.

Canonical login route: **`POST http://localhost:5000/api/auth/login`**.  
Resolution: **FIXED** in the sole canonical web auth service; no duplicate backend endpoint was created.

## 5. Session model determination

| Evidence | Model indicated | Authority status |
|---|---|---|
| Active Express controller | body JWT | active backend |
| Active web fetch/provider | `credentials: include`, `/auth/me`, `/auth/logout` | active frontend, but server counterpart absent |
| Recovery legacy `AuthContext` | browser `localStorage` user and JWT | historical competing branch |
| Recovery legacy Next auth route | HTTP-only `connecthub_session` cookie | historical competing branch |

These sources do not establish one end-to-end model. Therefore session persistence remains **SOURCE NOT ESTABLISHED** and no model modification was made. Safe temporary treatment: permit no claim of persistent authentication, keep the JWT out of browser storage, and do not treat client state as API authorization.

## 6. Startup and transport validation

- Backend TypeScript: PASS (`backend/node_modules/.bin/tsc.cmd --noEmit`).
- Verified start command: attempted exactly as declared in `backend/package.json`.
- Startup result: FAIL/BLOCKED. `ts-node-dev` starts but no server listen message appears and `/` plus `/api/auth/health` do not respond before timeout.
- Login transport: FAIL because the backend does not become responsive.
- Login request/response contract: statically established, but live acceptance not tested.
- Session persistence and role extraction: NOT TESTED; no established test account was invented or used.

The database schema and environment secrets were not modified or printed.

## 7. Route protection and data enforcement

| Route family | Intended classification | Page/layout/middleware | Backend/API enforcement | Result |
|---|---|---|---|---|
| `/dashboard` | MIXED authenticated role dispatch | client AuthProvider redirect and client role selection only | no auth/current-user endpoint or guard | PARTIAL |
| `/customers`, `/customers/*` | ERP/ADMIN | client AuthProvider treats as internal | backend customer CRUD has no auth or role guard | FAIL |
| `/partners`, `/partners/*` | ERP/ADMIN | client AuthProvider treats as internal | backend partner list/create has no auth or role guard | FAIL |
| `/bookings`, `/bookings/*` | ERP/ADMIN / future backend | client AuthProvider treats as internal | approved booking backend absent | UNESTABLISHED/FUTURE |
| `/admin`, `/admin/*` | FOUNDER/ADMIN | client-only; an Admin component also retains an email-substring fallback | no backend auth/role guard | FAIL |
| `/requests`, legacy request consoles | ERP/ADMIN | selected routes are client-marked internal | Pitru request list/create has no auth or role guard | FAIL |
| `/reports` | ERP/ADMIN | client AuthProvider treats as internal | no established guarded report API | PARTIAL |
| `/complaint`, `/grievance` | PUBLIC support surfaces | public server-rendered pages | no canonical persistence owner | PASS for page response; persistence future |

A 200 HTML response alone was not treated as an authorization verdict. The decisive defect is that live backend data routes expose CRUD/list operations without authentication or role/object guards.

## 8. Founder-decision boundaries

### FD-03 Partner

**PARTIAL.** The canonical dashboard renders the limited four-category partner surface and does not expose general ERP, other partner records, unrestricted customer records or admin controls. However, the backend has no authentication/role guard and no verified own-assignment API, so own-record enforcement cannot be validated end to end. Functionality was not broadened.

### FD-04 Customer

**PARTIAL.** The safe customer dashboard exposes only the signed-in identity and permitted navigation. `/customers` is correctly treated by the client as internal ERP/Admin rather than customer self-service. The backend `/api/customers` CRUD routes have no authentication, role or object-owner enforcement, so the data boundary is not secure end to end. Booking remains future and was not implemented.

### FD-05 Master-vault

**PASS — ISOLATED / NONCANONICAL.** No auth import or runtime dependency was found, no secret value was exposed, and the file was not modified.

### FD-07 AI / Golden Q&A

**PASS.** This phase did not alter AI sources, publication/provenance boundaries, disclosed fallback, human escalation, or customer/ERP separation.

## 9. Complaint and grievance recheck

| Route | Result | Evidence |
|---|---|---|
| `GET http://localhost:3000/complaint` | PASS | HTTP 200 within 10 seconds |
| `GET http://localhost:3000/grievance` | PASS | HTTP 200 within 10 seconds |

Neither page waited indefinitely for the unavailable backend. Their forms still lack an established persisted case owner; this phase makes no contrary claim.

## 10. Modified files

| File | Why | Evidence | Change | Security impact | Validation |
|---|---|---|---|---|---|
| `apps/web/src/services/auth.api.ts` | Correct independently established login route and user shape | Express `/api/auth` mount, `/login` router, port-5000 environment, backend `fullName`, web `name` | Calls `/api/auth/login`; maps `fullName` to `name`; does not persist returned token | Removes path ambiguity without selecting an unestablished session model or exposing token | Web TypeScript PASS |
| `docs/khem-reconstruction/KHEM_PRETRIAL_PHASE_C_AUTH_BACKEND_REPORT.md` | Required Phase C audit record | Repository and recovery evidence described above | Created this report | None | Content and diff review |

Diagnostic startup output was captured under `tmp/phase-c-backend.*.log`; it contains no credential or token value.

## 11. Final disposition

Authentication path contract is corrected, but the authentication system is not end-to-end releasable. Required future contract work must first establish one canonical session owner and then implement matching current-user/logout semantics plus server-side authentication, role and object authorization. This report does not select that architecture.

No database/schema, Hero, shell, footer, Sidebar, AI content, master-vault, or booking implementation was changed. No file was deleted and no commit, push or deployment was performed.
