# KHEM Pre-Trial Phase D — End-to-End Acceptance

Date: 2026-08-12  
Canonical web: `apps/web`  
Canonical backend: `backend`  
Scope: live contract verification and evidence-only flow trace; no architecture redesign.

## Executive result

The backend is currently live on `http://localhost:5000`. Root and auth-health probes return HTTP 200. A deliberately invalid, non-secret login probe reaches `POST /api/auth/login` and returns controlled HTTP 401 without a `Set-Cookie` header. Backend startup, port reachability, login path and login transport therefore pass.

End-to-end pre-trial acceptance remains **PARTIAL**. The surviving Express/Prisma backend implements users, customers, religious partners and PitruMoksha requests, but most active web services target different paths and response shapes. The apparent CRM/URMS, reference lifecycle, status transitions, tracking, quotation, payment and booking behavior is predominantly browser `localStorage` or in-memory fallback data. `submitUnifiedInquiry` can report success and issue a randomly generated reference even after both server attempts fail. Such a reference is not proof of persisted intake.

## 1. Live backend and login contract

| Check | Evidence | Result |
|---|---|---|
| Port 5000 | `GET http://localhost:5000/` returned 200 and “Connect Hub Co Backend Running” | PASS |
| Auth health | `GET /api/auth/health` returned 200 | PASS |
| Login transport | safe invalid probe returned 401 rather than refusal/timeout | PASS |
| Login path | frontend and backend both use `/api/auth/login` | PASS |
| Login response | active controller returns body JWT plus user `{id,fullName,email,role}`; JWT expires in seven days | PARTIAL |
| Cookie | runtime invalid response and active source set no cookie | NONE |
| Frontend handling | maps `fullName` to `name`, retains user only in React state, does not persist or send returned token | PARTIAL |
| Current user/logout | frontend calls `/auth/me` and `/auth/logout`; backend exposes neither | FAIL |
| Session model | active frontend cookie assumptions conflict with active body-JWT backend and historical competing models | SOURCE NOT ESTABLISHED |

No credential, password or token value was printed or persisted during testing.

## 2. Implemented end-to-end chain

| Stage | Actual implementation | Authorization boundary | Status |
|---|---|---|---|
| Customer → CRM/URMS | Unified forms call `createUniversalRequest`; `/urms/universal-requests` is absent from Express, so the web service falls back to browser/in-memory records and locally generated `CHC-YYYY-NNNNNN` references. | no server ownership/authentication | PARTIAL |
| CRM/URMS → ERP | Admin surfaces read the same local fallback registry; no canonical backend CRM or URMS route/model exists. | client-only; local records accessible in browser context | PARTIAL |
| ERP → Partner | UI types and mock records represent assignment; surviving backend has no assignment route/model/link. | no own-assignment API or guard | FUTURE |
| Partner → Completion | Limited portal is safely constrained, but no server assignment, permitted status mutation or completion contract exists. | no partner guard/object owner | FUTURE |
| Customer tracking return | `/tracking` filters local records with `getCustomerSafeRecord`; backend tracking route/model is absent. Guessable reference alone is accepted; no customer/contact ownership check exists. | client-side field filtering only | PARTIAL |

## 3. Customer intake acceptance matrix

| Intake | Customer page / form | Frontend service and endpoint | Backend controller / model | Reference, ERP, handoff and return | Status |
|---|---|---|---|---|---|
| PitruMoksha Gaya unified inquiry | business-page `PitruMokshaGayaInquiryForm`; GenZ form | `submitUnifiedInquiry` → `/urms/universal-requests`; fallback `/public/pitru-moksha/requests` | neither route exists. Express instead has unguarded `/api/pitrumoksha` → `PitruMokshaRequest` | local/random CHC reference; local URMS ERP view; no real partner handoff; local tracking only | PARTIAL |
| Legacy PitruMoksha request | `/pitru-moksha` → `EnquiryForm` | `submitPitruMokshaRequest` → `/public/pitru-moksha/requests` | route mismatch with `/api/pitrumoksha`; response shape also differs (`{success,data}` versus expected IDs) | no accepted live web-to-backend persistence contract | FAIL |
| Ritual Services inquiry | `RitualServicesInquiryForm` | unified inquiry maps type to `BOOKING`, then local URMS; generic `/public/inquiries` fallback | no inquiry/booking route or model | locally issued reference only; booking and assignment absent | PARTIAL |
| Travel Assistance inquiry | business form and legacy `TravelForm` | unified local URMS; fallback `/public/travel-assistance/requests`; legacy service uses same missing route | no travel route/model | local reference only; no ERP processing or provider handoff | PARTIAL |
| Vahi approved inquiry | approved Vahi landing → `VahiRecordsInquiryForm` | unified local URMS; generic `/public/inquiries` fallback | no Vahi/inquiry route/model | privacy-fenced landing preserved; local reference only | PARTIAL |
| Religious Partner registration/inquiry | approved partner landing → `ReligiousPartnersInquiryForm` | unified local URMS as `PARTNER_REGISTRATION`; generic fallback | Express `/api/religious-partners` exists but active unified form does not call it | local application reference; no verified identity/user/assignment linkage | PARTIAL |
| Contact | `/contact` | presentation/query-topic surface; no established canonical persistence service | none | human-contact intent only; no server reference/workflow | PARTIAL |
| Complaint | `/complaint` form posts to `/contact?mode=complaint-submitted` | no canonical case service | no complaint route/model | page responds, but no persisted complaint, owner or auditable reference | FAIL as flow |
| Grievance | `/grievance` form posts to `/contact?mode=grievance-submitted` | no canonical case service | no grievance route/model | page responds, but no restricted persisted case, owner or reference | FAIL as flow |
| Tracking | `/tracking` | `getUniversalRequestByReferenceId` → missing `/urms/...`; local fallback | no tracking/URMS backend | customer-safe field filter exists, but lookup is local and lacks ownership/contact verification | PARTIAL |
| Booking | internal booking pages/services | `/bookings/*` | no route/model | no approved backend contract | FUTURE |

No speculative Vahi child or floating route was restored.

## 4. CRM and URMS evidence

`apps/web/src/services/urms.api.ts` defines status, history, communications, documents, assignment-team and customer-safe filtering structures. It also ships example people, references, communications and documents. Creation first attempts a missing API and then saves locally. Status mutation operates directly on the local registry and labels the actor as admin without server authentication. Listing and tracking similarly fall back locally.

`apps/web/src/services/crm.api.ts` attempts missing `/crm/leads` routes, then reads/writes seeded browser leads. Conversion calls the unimplemented booking service. Therefore:

- customer/request persistence: **PARTIAL**, local only for unified forms;
- immutable/server reference ID: **FAIL**;
- category/status/timestamps: **PARTIAL**, client-generated;
- server ownership and audit: **FAIL**;
- CRM/URMS internal workflow: **PARTIAL**, demonstrative UI rather than canonical server flow;
- intake paths bypassing canonical CRM/URMS: all current unified intakes, contact, complaint and grievance at the server level.

Critical safety defect: `submitUnifiedInquiry` returns `success: true` with a random `CHC-2026-NNNNNN` identifier after its URMS and endpoint requests both fail. This can create a customer-visible acknowledgement that has no persisted operational record.

## 5. ERP/Admin operational acceptance

| Capability | Actual evidence | Status |
|---|---|---|
| Request viewing | local URMS registry; Express can list Pitru requests only through differently named, unguarded route | PARTIAL |
| Customer viewing/CRUD | Express Prisma CRUD exists at `/api/customers`; web uses `/customers`; response/method mismatches remain | PARTIAL |
| Assessment | UI concepts only; no canonical assessed-state backend | FUTURE |
| Status management | local URMS transitions; no guarded backend mutation | PARTIAL |
| Quotation | browser/service implementation with missing `/quotes` backend | FUTURE |
| Assignment | mock/local fields; no backend relationship or endpoint | FUTURE |
| Booking | web surfaces only; backend absent | FUTURE |
| Complaint/grievance handling | public pages only; no case persistence/queue | FUTURE |
| Partner management | Express list/create exists at `/api/religious-partners`; web uses different `/partners` contract; no guards | PARTIAL |
| Completion | local status transition only; no guarded delivery/completion backend | FUTURE |

The web dashboard service also calls `/dashboard/summary`, whereas Express mounts `/api/dashboard/summary` and wraps its result in `{success,data}`. The web expects a direct summary. This is another unaccepted transport/shape contract.

## 6. FD-04 customer security

**PARTIAL.** `/customers` is classified as internal ERP/Admin by the active AuthProvider and was not converted into customer self-service. The safe customer dashboard does not show bulk customer data. However:

- Express customer CRUD has no authentication, role guard or object-owner check;
- Pitru request listing/creation is unguarded;
- tracking accepts a reference alone and has no customer/contact ownership verification;
- localStorage/in-memory records are not a server authorization boundary;
- mutation authorization is not established.

UI restrictions do not satisfy backend/API ownership enforcement.

## 7. FD-03 partner security

**PARTIAL.** The runtime limited partner portal preserves the approved surface and does not expose general ERP, unrestricted customer records, other partner data or admin controls. No server endpoint, however, binds an authenticated partner user to a verified partner profile, own assignments, permitted documents, approved communications or permitted status transitions. Express partner list/create routes are completely unguarded. No functionality was broadened.

## 8. FD-05 and FD-07

- FD-05: **PASS — ISOLATED / NONCANONICAL.** No auth/data-flow dependency or secret exposure was introduced.
- FD-07: **PASS.** No AI/Q&A source, publication, provenance, fallback or human-escalation behavior was changed.

## 9. Customer tracking privacy

`getCustomerSafeRecord` removes `assignedUser` and internal history notes and filters timeline, communications and documents by public visibility. That field-level filter is useful and passes structural tests. It is not object authorization: a guest who knows a locally available reference can request that record without proving ownership. Also, a locally generated reference is not linked to the Express database or an internal processing lifecycle.

Customer tracking return is therefore **PARTIAL**, not pass. Internal notes are filtered in the intended guest code path, but server-side enforcement and persistent linkage are absent.

## 10. Validation

| Validation | Result |
|---|---|
| Web TypeScript | PASS — `pnpm.cmd --filter web exec tsc --noEmit --incremental false` |
| Backend TypeScript | PASS — `backend/node_modules/.bin/tsc.cmd --noEmit -p backend/tsconfig.json` |
| Backend root | PASS — HTTP 200 |
| Auth health | PASS — HTTP 200 |
| Login transport | PASS — controlled HTTP 401; no `Set-Cookie` |
| Complaint page | PASS — HTTP 200 within ten seconds |
| Grievance page | PASS — HTTP 200 within ten seconds |
| Database mutation | none performed |

## 11. Remaining blockers and future features

### Remaining blockers (6)

1. Canonical session model plus matching current-user/logout contract is not established.
2. Backend authentication, role and object-level authorization guards are absent.
3. Active web/backend API namespaces, methods and response envelopes are mismatched across operational services.
4. Canonical server CRM/URMS persistence and non-fabricated reference issuance are absent.
5. Verified partner identity, assignment and permitted completion contract is absent.
6. Customer tracking is not persistently linked or ownership-verified at the server.

### Future features (8)

1. Booking backend.
2. Ritual Services persisted workflow.
3. Travel Assistance persisted workflow.
4. Approved Vahi inquiry persistence.
5. Contact persistence/routing owner.
6. Complaint case persistence.
7. Restricted grievance case persistence.
8. Partner assignment-to-completion workflow.

## 12. Files modified

| File | Change |
|---|---|
| `docs/khem-reconstruction/KHEM_PRETRIAL_PHASE_D_END_TO_END_ACCEPTANCE.md` | Created this evidence-backed Phase D acceptance report. |

No application, backend, database/schema, visual, AI, Vahi route, or authentication implementation was modified in Phase D. No file was deleted and no commit, push or deployment was performed.
