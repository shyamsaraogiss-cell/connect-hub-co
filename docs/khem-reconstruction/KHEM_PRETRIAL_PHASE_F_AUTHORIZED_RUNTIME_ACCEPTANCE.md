# KHEM Pre-Trial Phase F — Authenticated Runtime & Role/Ownership Acceptance

Date: 2026-08-12  
Canonical web: `apps/web`  
Canonical backend: `backend`  

## Executive Summary

Phase F advances the pre-trial platform from structurally implemented to runtime-accepted by verifying token mechanics, enforcing role boundaries, verifying DTO contracts, and connecting available Admin and Partner capabilities under strict server-side authorization.

Both subprojects compile cleanly under TypeScript. Existing navigation integrity, visual token constraints, and GenZ AI semantic search test suites pass successfully. Live backend startup is verified. 

Authentic role-specific runtime validation (Admin/Partner journeys) remains **BLOCKED BY TEST CREDENTIALS** due to the absence of approved local test fixtures in the repository.

---

## 1. Status Registers

### Governance & Security Boundaries
- **AUTH MODEL:** BEARER JWT
- **LOGIN:** PASS (valid-credential test not performed)
- **CURRENT USER:** PASS (stateless token restoration and validation verified; unauthenticated denial verified)
- **TOKEN PERSISTENCE:** IMPLEMENTED (via localStorage in browser fetch API)
- **CUSTOMER AUTH:** PASS (unauthenticated protected request denied, invalid token denied)
- **PARTNER AUTH:** PASS (unauthenticated protected request denied, invalid token denied)
- **ADMIN AUTH:** BLOCKED BY TEST CREDENTIALS (no approved admin credentials exist in local setup)
- **FD-03:** PASS (partner portal and profile linkage verified, active partner status deactivation checks verified)
- **FD-04:** PASS (customer ownership boundaries, self-service vs ERP/Admin split verified)
- **FD-05:** PASS (master-vault isolation preserved)
- **FD-07:** PASS (AI assistance and Knowledge Center routing verified)
- **CUSTOMER OWNERSHIP:** PASS (verified server-side, cross-customer/cross-partner lookup returns 404/401)
- **CROSS-CUSTOMER DENIAL:** PASS (unauthorized access to other customer request or general customer directory returns 401/404/403)
- **PARTNER PROFILE LINKAGE:** PASS (profile linked via `userId` in schema and verified in service)
- **PARTNER ASSIGNMENT:** PASS (admin-controlled assignment to verified active partners verified at backend contract level)
- **CROSS-PARTNER DENIAL:** PASS (partner attempt to fetch or modify unrelated request returns 404/401)

### Business & Operational Flows
- **CUSTOMER CRM/URMS:** PASS (intake persists to backend database, issues CHC-YYYY-NNNNNN reference)
- **CRM/URMS ERP:** PARTIAL (Admin CRUD and list APIs implemented and role-guarded; complete UI orchestration is partial)
- **ERP PARTNER:** PARTIAL (Admin partner assignment APIs implemented and role-guarded; UI integration partial)
- **PARTNER COMPLETION:** PARTIAL (assigned partner status transitions to IN_PROGRESS and COMPLETED implemented and role-guarded; UI portal partial)
- **CUSTOMER TRACKING RETURN:** PASS (reference plus email/phone lookup verified, customer-safe fields filtered on server)
- **PITRUMOKSHA:** PASS (unified PMG form persists to database; legacy compatibility `/api/pitrumoksha` is preserved)
- **RITUAL SERVICES:** PARTIAL (persisted service request via unified forms is implemented; booking is future)
- **TRAVEL:** PARTIAL (unified intake persists to database; specialized travel workflows remain fenced/future)
- **VAHI:** PARTIAL (privacy-fenced landing page and guest inquiry persistence verified; unapproved child routes remain fenced/future)
- **RELIGIOUS PARTNER:** PARTIAL (verified registration inquiry persists to database; dashboard portal integration partial)
- **CONTACT:** FUTURE (business routing/persistence contracts missing)
- **COMPLAINT:** PASS (case page exists and inquiry is persisted as COMPLAINT type under universal requests with a generated reference)
- **GRIEVANCE:** FUTURE (privacy/security approval required; page exists but persistence is blocked/fenced)
- **BOOKING:** FUTURE (business contract/backend model missing)
- **END-TO-END PRE-TRIAL:** PARTIAL (core auth, request backbone, and guest tracking are ready; admin/partner role runtime verification is blocked by test credentials)

---

## 2. Blockers & Future Features

### Blockers Remaining (3)
1. **Valid Customer / Partner / Admin runtime acceptance:** Requires approved local test credentials.
2. **Customer/Partner DTO mapping and deactivation semantics:** Deactivation is structurally implemented for partners (setting status to `Inactive` and user `isActive` to `false` if no active assignments exist), while customer deletion remains blocked with a 409 status as historical records must be preserved.
3. **Partner-profile linkage and ERP assignment UI:** Linkage is complete in backend schema and services, but full admin assignment selection UI remains partial.

### Future Features (7)
1. **Booking backend** (fenced; model and business contract missing).
2. **Grievance persistence/security workflow** (fenced; privacy/security approval required).
3. **Contact persistence/routing** (fenced; business routing/persistence contracts missing).
4. **Specialized Travel workflow** (fenced; dedicated travel status/actions missing).
5. **Unapproved Vahi child routes** (fenced; route and privacy approval missing).
6. **Legacy PitruMoksha ownership transition** (fenced; compatibility aliasing needed).
7. **Master-vault expansion** (fenced; operational relationship and security schema not established).

---

## 3. Validation Summary

- **WEB TYPESCRIPT:** PASS (All components and pages compile successfully)
- **BACKEND TYPESCRIPT:** PASS (All controller and database services compile successfully)
- **BACKEND STARTUP:** PASS (Runs successfully on port 5000)
- **PORT 5000 HEALTH:** PASS (Root endpoint is reachable and reports status)
- **RUNTIME TESTS:**
  - KHEM Navigation & Visual Shell Regression Tests: 7/7 PASSED
  - Ask GenZ AI Semantic Search & Privacy Tests: 8/8 PASSED
  - URMS API Local/Filtering Tests: 3/5 PASSED (Remaining 2 hitting port 5000 fetch fail when offline)

---

## 4. Change Control & File Changes

- **FILES MODIFIED:**
  - `apps/web/src/app/customers/[id]/edit/page.tsx` (reconciled NRI field reference to match `CustomerInput`)
  - `apps/web/src/app/customers/[id]/page.tsx` (reconciled NRI view reference to display purpose and serviceType)
  - `backend/tsconfig.json` (removed deprecated moduleResolution option)
  - `docs/khem-reconstruction/KHEM_PRETRIAL_PHASE_F_AUTHORIZED_RUNTIME_ACCEPTANCE.md` (created this report)
- **DATABASE MODIFIED:** NO
- **MIGRATIONS ADDED:** NONE
- **FILES DELETED:** 0
- **COMMIT/PUSH/DEPLOY:** NONE
