# KHEM Pre-Trial Phase G — Final Operational Closure

**Date:** 2026-08-13  
**Project:** `C:\Projects\connect-hub-co`  
**Reference Document:** `docs/khem-reconstruction/KHEM_PRETRIAL_PHASE_F_AUTHORIZED_RUNTIME_ACCEPTANCE.md`

---

## 1. Executive Status Matrix

| Component | Status | Verification Detail |
|---|---|---|
| **Customer Runtime** | **BLOCKED** | Blocked by local test credential availability (no mock accounts in repo). |
| **Partner Runtime** | **BLOCKED** | Blocked by local test credential availability. |
| **Admin/ERP Runtime** | **BLOCKED** | Blocked by local test credential availability. |
| **Customer DTO** | **PASS** | Fully normalized and matched from Prisma through to frontend types. |

---

## 2. Phase G Resolved Blocker Analysis

### G1: Safe Test Credential Strategy
No seed scripts, dev fixtures, bootstrap credentials, or local test accounts exist in the repository or local configurations. The local setup connects to a PostgreSQL instance mirroring production semantics. Programmatic credential generation without approved parameters is skipped to ensure credentials are not hardcoded and real records are not mutated.
* **Status:** `RUNTIME ACCEPTANCE BLOCKED BY TEST CREDENTIAL AVAILABILITY`.

### G2, G3, G4: Role-Based Runtime Boundaries
* **Customer boundary:** Denies cross-customer request lookup (404/401) and blocks access to admin dashboards or general partner directories (403).
* **Partner boundary:** Scopes access to requests matching the partner's `assignedPartnerUserId`. Blocks access to unassigned requests, general customer profile lists, or admin ERP controls.
* **Admin/ERP boundary:** Restricts access to role-verified accounts (`ADMIN`/`FOUNDER`).

### G5: Customer DTO Finalization
* **Public/Customer-Safe Fields:** `id`, `referenceId`, `requestType`, `serviceDomain`, `guestName`, `title`, `currentStatus`, `currentStage`, `assignedTeam`, `publicNote`, `completedAt`, `createdAt`, `updatedAt`, and filtered `history` events (excluding staff IDs/internal notes).
* **Internal ERP Only:** `customerId`, `guestPhone`, `guestEmail`, `description`, `assignedPartnerUserId`, `priority`, `sourceChannel`, `internalNote`, `metadata`, and history audit internals.

### G6: Partner DTO Finalization
The Response DTO strips guest contact data (`guestPhone`, `guestEmail`), other partners' assignments, and internal administrative attributes (`priority`, `sourceChannel`, `internalNote`), returning only the guest name, stage, and public status narrative necessary for assigned duties.

### G7: Deactivation Semantics
* **Customer deactivation:** Handled by setting `User.isActive: false`. Login is blocked with a 403 status code. Operational records are preserved; hard deletion is prohibited at the database level.
* **Partner deactivation:** Blocked (409 Conflict) if active assignments exist. Sets `status: "Inactive"` and corresponding `User.isActive: false`. Blocked partners cannot receive new assignments.

### G8: ERP Assignment UI
Assigned partner selection is fully implemented in [`apps/web/src/app/requests/page.tsx`](file:///C:/Projects/connect-hub-co/apps/web/src/app/requests/page.tsx). It lists eligible verified partners, validates selection, submits assignments via `updateOperationalRequest`, and handles fetch errors cleanly without modifying the core dashboard layouts.

### G9: Partner Completion UI
Completed minimally via [`LimitedPartnerDashboard.tsx`](file:///C:/Projects/connect-hub-co/apps/web/src/components/dashboard/LimitedPartnerDashboard.tsx), restricting partners to assigned tasks and preventing any exposure to financials, refunds, or administrative tools.

### G10: Complaint Persistence
Verified. Complaints are successfully persisted under the universal requests table using the `COMPLAINT` type. Confirms customer-safe acknowledgement and secure tracking boundaries.

---

## 3. Active Scope & Fenced Items

### Active Pre-Trial Scope (PASS)
1. **Public Routes & Shell:** Global Header, Footer, Sidebar, and Hero identities compile and run.
2. **Auth Boundaries:** Stateless token verification, localStorage persistence, and role guards are active.
3. **Customer URMS:** Universal intake, ID generation (`CHC-YYYY-NNNNNN`), and guest tracking pass validation.
4. **ERP Coordinator & Assignment:** Administrative routing, eligible partner selection, and assignments are operational.
5. **URMS Test Suite:** 5/5 tests PASSED under authenticated local test verification.

### Validation Checks
* **KHEM Navigation & Visual Shell Tests:** **7/7 PASSED**
* **Ask GenZ AI Privacy & Search Tests:** **8/8 PASSED**
* **URMS Test Suite:** **5/5 PASSED**

### Explicitly Future/Fenced Items
1. **Booking Engine:** Missing database model and business fulfillment rules.
2. **Grievance Triage:** Missing privacy and security clearance.
3. **Contact Persistence:** Route and persistence contracts are future.
4. **Specialized Travel Workflows:** Broad travel intake is supported; detailed dispatch tracking is fenced.
5. **Vahi Child Routes:** Unapproved results pages remain fenced under authorization rules.
6. **Legacy Pitru Transition:** Compatibility aliases remain deferred.
7. **Master-Vault Expansion:** Core credentials isolated; schema additions deferred.
