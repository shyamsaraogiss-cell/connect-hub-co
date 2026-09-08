# KHEM Pre-Trial Phase E — Runtime Backbone Implementation

Date: 2026-08-12  
Canonical web: `apps/web`  
Canonical backend: `backend`

## Outcome

Phase E implements one coherent bearer-JWT and server-backed request backbone without changing approved visuals, Heroes, shell, Vahi routes, Golden Q&A authority or master-vault isolation.

The active Express controller already issued a seven-day JWT in the response body. The matching historical direct-backend frontend persisted and sent that JWT; the competing HTTP-only-cookie implementation belonged to a separate Next/Prisma auth owner. Bearer JWT is therefore the selected canonical transport. The web stores it under a single local browser key, sends `Authorization: Bearer`, restores identity through `/api/auth/me`, and removes it on logout or 401. Logout is stateless token disposal; no unsupported revocation system was invented.

The new `UniversalRequest` and `UniversalRequestStatusHistory` models provide server-issued references, optional customer ownership, role-controlled ERP processing, optional partner-user assignment, controlled status transitions, persisted audit history and contact-verified customer tracking. Client-generated authoritative references and offline-success acknowledgement were removed from active submission behavior.

End-to-end status remains **PARTIAL** because no approved test credentials were available for valid customer, partner and Admin runtime journeys, several specialized intake contracts remain future, and older customer/partner DTOs still require a separate mapping decision.

## Authentication contract

| Area | Implemented contract | Runtime validation | Status |
|---|---|---|---|
| Login | `POST /api/auth/login`; body JWT plus user/role; frontend maps `fullName` to `name` and persists token | safe invalid request returns controlled 401; no token printed | PASS transport / valid credential not tested |
| Current user | `GET /api/auth/me`; bearer required; active user reloaded from database | unauthenticated request returns 401 | PARTIAL — valid token not tested |
| Logout | `POST /api/auth/logout`; bearer required; frontend always clears local token | unauthenticated request returns 401 | PARTIAL — valid token not tested |
| Persistence | browser token restored by auth provider through current-user endpoint | source and TypeScript verified | IMPLEMENTED / runtime valid-session pending |
| Authentication guard | JWT signature/expiry verification middleware | protected requests return 401 without token | PASS for unauthenticated denial |
| Role guard | exact `FOUNDER`, `ADMIN`, `CUSTOMER`, `RELIGIOUS_PARTNER` roles | source verified; no safe role credentials | PARTIAL runtime acceptance |
| Failure semantics | 401 missing/invalid/expired authentication; 403 wrong role; 404 ownership/verification miss; 409 invalid transition | 401 and 404 paths runtime-proven | PASS for tested paths |

### Founder decision: stateless logout limitation accepted for G.2 / pre-trial

Current authentication uses stateless JWT access tokens. Logout removes client-side authentication state but does not immediately invalidate an already-issued token. An existing token remains usable only until its configured expiry and is rejected earlier for an invalid signature, expiration, issuer mismatch, audience mismatch, a missing or deleted user, an inactive account, or a mismatch between its role claim and the user's current database role.

Immediate server-side token revocation is deferred as a future security architecture decision. Any future implementation requires explicit Founder approval and must evaluate a session store, token-version mechanism, denylist, or equivalent architecture before any schema or storage change.

## Security boundaries

### FD-03 Partner

**PARTIAL.** Backend contracts now restrict partner operations to a request whose `assignedPartnerUserId` equals the authenticated partner user. Partner status updates allow only `IN_PROGRESS` and `COMPLETED`, require valid preceding states, and cannot change pricing, refunds, customer ownership, internal notes or arbitrary ERP status. General customer, partner, dashboard and Pitru databases are Founder/Admin guarded. The limited partner UI remains unchanged. A valid partner-account runtime test was unavailable.

### FD-04 Customer

**PARTIAL.** Authenticated customer lookup requires matching `customerId`; public/guest tracking requires both the server reference and the original email or phone. Wrong contact verification returns 404. Returned tracking data excludes internal notes, raw metadata, private contact fields and partner identity. `/customers` remains Founder/Admin-only at the backend. A valid customer-account own-versus-cross-account runtime test was unavailable.

### FD-05 and FD-07

- FD-05: **PASS — ISOLATED / NONCANONICAL.** No dependency or secret exposure was introduced.
- FD-07: **PASS.** Golden Q&A publication, provenance, fallback and human escalation were not changed.

## Runtime chain

| Stage | Phase E result | Status |
|---|---|---|
| Customer → CRM/URMS | approved unified inquiry forms create `UniversalRequest`; reference is issued only after database persistence | PASS for runtime contract test |
| CRM/URMS → ERP | Founder/Admin list, get, assignment and controlled transition endpoints implemented; internal note retained only in privileged record | PARTIAL — Admin credential runtime test pending |
| ERP → Partner | Admin may assign only an active `RELIGIOUS_PARTNER` user; partner can fetch only assigned reference | PARTIAL — contract implemented, role runtime test pending |
| Partner → Completion | assigned partner can move permitted work to in-progress/completed; audit history persisted | PARTIAL — contract implemented, role runtime test pending |
| Customer tracking return | reference plus contact verification; server record; customer-safe select and public history | PASS for guest verification path |

## API contract normalization

- All web service paths now receive the canonical `/api` prefix once.
- Auth uses `/api/auth/login`, `/api/auth/me`, `/api/auth/logout`.
- Unified URMS create/list/get/track/update paths match Express routes.
- Partner base path now matches `/api/religious-partners`; verified get/update routes were restored from surviving controller/service semantics.
- Admin email-substring authorization fallback was removed; exact Founder/Admin role checks remain.
- Generic customer and partner DTO field-shape differences are not silently guessed and remain a documented next contract task.
- Legacy PitruMoksha compatibility and dedicated travel endpoints were not aliased to unrelated handlers.

## Canonical request and tracking data

`UniversalRequest` stores:

- unique server-issued `CHC-YYYY-NNNNNN` reference;
- request type and business domain;
- optional authenticated customer owner;
- guest contact used only for verified lookup;
- status, stage, assigned team and optional partner user;
- public and internal notes separated at selection time;
- source, priority, metadata, completion and timestamps.

`UniversalRequestStatusHistory` stores initial submission and later permitted status changes, including actor id/role, prior/new status and stage, separated public/internal notes and timestamp. Customer tracking selects no internal note.

## Future-feature reclassification

| Phase D feature | Phase E classification | Reason |
|---|---|---|
| Booking backend | **FUTURE — BUSINESS CONTRACT MISSING** | booking commercial lifecycle, pricing and confirmation authority remain unestablished |
| Ritual Services persistence | **IMPLEMENTED NOW** | approved unified form persists a canonical server request; booking remains separate |
| Travel Assistance persistence | **IMPLEMENTED NOW** for unified intake; **READY NEXT** for dedicated travel workflow | generic request fields established; specialized processing model remains absent |
| Approved Vahi inquiry persistence | **IMPLEMENTED NOW** | canonical request persists; private metadata is not returned through tracking |
| Contact routing/persistence | **FUTURE — BUSINESS CONTRACT MISSING** | canonical routing owner and service semantics are not established |
| Complaint persistence | **READY NEXT** | request type exists, but upload/evidence and resolution field contract must be finalized |
| Restricted grievance persistence | **FUTURE — PRIVACY/SECURITY APPROVAL REQUIRED** | restricted evidence, officer access and retention need explicit approval |
| Partner assignment-to-completion | **IMPLEMENTED NOW** at backend contract level; runtime role acceptance pending | ownership and permitted transitions are represented and enforced |

## Business-flow status

| Flow | Status |
|---|---|
| PitruMoksha Gaya unified intake | PASS for canonical request creation; legacy compatibility endpoint remains separate |
| Ritual Services | PARTIAL — persisted service request passes; booking lifecycle future |
| Travel Assistance | PARTIAL — unified intake persists; dedicated processing future |
| Approved Vahi | PARTIAL — privacy-safe inquiry persistence passes; specialist processing future |
| Religious Partner | PARTIAL — unified registration persists and ERP partner APIs are guarded; verified-profile/user linkage remains next |
| Contact | FUTURE — business routing contract missing |
| Complaint | READY NEXT; page availability passes, persistence not connected |
| Grievance | FUTURE — privacy/security approval required; page availability passes |
| Booking | FUTURE — business contract missing |

## Database changes

Two additive migrations were reviewed before deployment:

1. `20260812193000_add_universal_request_backbone`: creates `UniversalRequest`, indexes and `SET NULL` User relations.
2. `20260812201500_add_universal_request_status_history`: creates status-history table, index and cascading child-to-request relation.

No table, column or data was dropped, truncated, deleted or rewritten. Deployment first exposed pre-existing migration metadata drift: the initial schema existed while `20260706135901_init` was unrecorded. Prisma stopped before Phase E migration. The existing initial migration was marked applied (metadata-only), after which both additive migrations deployed successfully.

Database verification inserted non-production records explicitly titled Phase E contract/history verification. They contain only dummy `.invalid` contacts and establish reference issuance, verification denial and safe tracking behavior.

## Validation

| Check | Result |
|---|---|
| Web TypeScript | PASS |
| Backend TypeScript | PASS |
| Backend health | PASS — 200 |
| Login transport | PASS — controlled 401 |
| Current-user unauthenticated | PASS — 401 |
| Logout unauthenticated | PASS — 401 |
| Protected customer database unauthenticated | PASS — 401 |
| Protected URMS list unauthenticated | PASS — 401 |
| Server reference creation | PASS — valid reference issued after persistence |
| Wrong contact / cross-customer-style tracking denial | PASS — 404 |
| Correct contact tracking | PASS — 200, customer-safe fields |
| Initial audit history | PASS — persisted and returned without internal note |
| Complaint page | PASS — 200 |
| Grievance page | PASS — 200 |
| GenZ/privacy suite | PASS — 8/8 |
| Legacy URMS test script | 4/5; Admin fetch/update case now correctly requires authentication and cannot pass without approved Admin credentials |
| Valid customer/partner/Admin runtime journeys | NOT TESTED — no established safe credentials |

## Remaining blockers (4)

1. Valid customer, partner and Admin role/ownership runtime acceptance requires approved local test credentials.
2. Generic Customer and ReligiousPartner frontend/backend DTO mapping and deactivation semantics require a confirmed data contract.
3. Specialized partner-profile linkage and ERP assignment UI are not complete, although backend assignment enforcement exists.
4. Contact, complaint, restricted grievance, booking and specialized travel processing contracts remain as classified above.

## Files modified

### Backend

- `backend/prisma/schema.prisma`
- `backend/prisma/migrations/20260812193000_add_universal_request_backbone/migration.sql`
- `backend/prisma/migrations/20260812201500_add_universal_request_status_history/migration.sql`
- `backend/src/middleware/auth.middleware.ts`
- `backend/src/controllers/auth.controller.ts`
- `backend/src/routes/auth.routes.ts`
- `backend/src/controllers/universalRequest.controller.ts`
- `backend/src/routes/universalRequest.routes.ts`
- `backend/src/services/universalRequest.service.ts`
- `backend/src/server.ts`
- `backend/src/controllers/religiousPartner.controller.ts`
- `backend/src/routes/religiousPartner.routes.ts`

### Web

- `apps/web/src/lib/api.ts`
- `apps/web/src/services/auth.api.ts`
- `apps/web/src/services/urms.api.ts`
- `apps/web/src/services/inquiry.api.ts`
- `apps/web/src/services/partner.api.ts`
- `apps/web/src/app/tracking/page.tsx`
- `apps/web/src/components/admin/AdminDashboard.tsx`

### Report

- `docs/khem-reconstruction/KHEM_PRETRIAL_PHASE_E_RUNTIME_BACKBONE_REPORT.md`

Generated Prisma client output is ignored runtime build output and is not listed as source architecture. No file was deleted. No commit, push or deployment occurred.

## 2026-08-13 authorized test-side-effect cleanup

- Cause: the customer hard-delete regression test's ineffective ESM namespace replacement allowed its create regression case to reach the configured database.
- Proven test-created Customer: `cmsrlaxno0000usxoxpwjqrmo`; `Customer`; mobile `9999999999`; purpose `Ritual`; status `New`; created and updated `2026-08-13T14:04:44.388Z`.
- Founder-authorized action: re-read the exact ID, reconfirm every identifying field and timestamp, verify the `Customer` model has no dependent relations, then delete only that exact record.
- Verification: the exact ID no longer exists; Customer count changed from 4 to 3. User remained 5, UniversalRequest remained 15, UniversalRequestStatusHistory remained 14, and PitruMokshaRequest remained 3.
- No URMS, Pitru Moksha, User, history, schema, or migration record was modified by the cleanup.
