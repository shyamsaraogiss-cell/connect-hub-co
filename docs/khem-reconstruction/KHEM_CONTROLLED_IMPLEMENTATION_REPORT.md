# KHEM Controlled Implementation Report

Date: 2026-08-12  
Scope: 24 released controls only.  
Canonical application: `apps/web`.

## Evidence-based recovery pass

This section supersedes earlier asset/build counts where they differ.

### Architecture fence resolutions

| Control | Evidence-based resolved architecture | Remaining implementation state |
|---|---|---|
| IC-10 | `/vahi-records` through `VahiApprovedContent.tsx` is the complete canonical public Vahi landing. No independently approved child-route inventory was found. Privacy-sensitive record/search work remains controlled inquiry/human review; legacy Vahi components remain inactive evidence. | FENCED; no architecture blocker |
| IC-11 | `/pitru-moksha-gaya` is the canonical business identity. `/pitru-moksha`, `/pitru-moksha/requests`, `/pitru-moksha/success`, `EnquiryForm`, `pitru-moksha.api.ts`, and request types form an extant operational compatibility flow. | Preserve unchanged; do not add to new navigation or redirect |
| IC-16/IC-17 | Customer/ERP booking separation remains approved, but no booking route/controller/service or booking model was found under the live `backend`. | BOOKING BACKEND = IMPLEMENTATION PENDING; unrelated work released |
| IC-30 | Repository search found no import/consumer of `khem-master-vault.ts`; the file only exports its own object. | Isolated, noncanonical, no expansion/removal/dependency |

Architecture blockers after fence review: **0**.

### Verified asset recovery

| Source path | Destination path | Referenced by | SHA-256 | Identity evidence |
|---|---|---|---|---|
| `C:\Projects\connect-hub-co-recovery-review\stash-49106b-source\apps\web\public\images\hero\Hero_1_PitruMoksha_Gaya_Final_v2.0.png` | `apps/web/public/images/hero/Hero_1_PitruMoksha_Gaya_Final_v2.0.png` | `components/business-pages/online/OnlineAncestralPage.tsx` | `6A8D65D24C0BDDBA7190DA4F9E08A5CD383244B0297D86256A9AB973A40E8F3F` | Exact historical component filename/path, exact recovery-tree filename, Hero 1/online ancestral ownership, preserved hash |

Assets recovered: **1**.

`/images/hero/PitruMoksha_Gaya_Logo_v1.0.png` remains `SOURCE NOT ESTABLISHED — ASSET`. It was not found in the five approved search roots, Git object search, stash listing, or project-wide filename search. It is referenced only by inactive competing public-shell datasets; no substitute was made and canonical Hero data uses the established master logo.

Assets source not established: **1**.

### Geometry evidence applied

The exact `--hero-panel-top-inset:.5rem` token was recovered from `features/public-shell/backups/before-final-shared-hero-vertical-alignment-20260804-220128/HeroCarousel.module.css` into the canonical Hero carousel variable set. No zoom, global scale, global font shrink, or overflow masking was added.

### Updated release totals

- Ready controls cleared/implemented or already correct: **14**.
- Implementation pending/partial controls: **10**.
- Fenced controls: **5**.
- Architecture blockers: **0**.
- Files changed in the combined controlled pass: **15**, including this report and the recovered binary asset.

## Executive result

Eleven controls received evidence-backed implementation changes, three were already structurally correct and required no change, and ten remain implementation holds or partial because completing them requires missing source, verified assets, server contracts, publication metadata, persistence owners, or Founder desktop review. No fenced item was intentionally modified. The worktree contained extensive pre-existing changes—including edits within fenced Vahi files and deletion of the historical `frontend` tree—before this operation; they were preserved and not reverted.

## Control results

| Control | Result | Implementation outcome |
|---|---|---|
| IC-01 | ALREADY CORRECT | `features/public-shell/index.ts` exports the component-folder shell; the root competing shell has no canonical import. |
| IC-02 | IMPLEMENTED | Retained the exported Golden Hero owner and synchronized verified trust/Core data with active Hero state. Competing files remain as evidence. |
| IC-03 | ALREADY CORRECT | Public-shell index exports the component-folder Sidebar; KHEM hierarchy drives it and excludes WhatsApp. |
| IC-04 | IMPLEMENTED | Canonical public Header retains brand/logo/tagline, labelled WhatsApp, identity action and Book Now; legacy Pitru navigation was removed from new header navigation. |
| IC-05 | IMPLEMENTED | Footer links now resolve to actual tracking, complaint, grievance, policy and support routes instead of test-topic fallbacks. |
| IC-06 | IMPLEMENTED | Trust and Core Services now derive from the active Hero; AI and Explore already use the same active slide. |
| IC-07 | IMPLEMENTED/PARTIAL | The exact missing online Hero 1 asset was recovered from verified recovery evidence. One inactive competing-data logo remains source-not-established and was not substituted. |
| IC-08 | ALREADY CORRECT | Five fixed landing routes already use business-page/static-Hero composition. Fenced Vahi children were not activated. |
| IC-09 | IMPLEMENTED | Verified PMG/Ritual child pages remain routed; the AI disclosure boundary applies wherever the shared engine renders. No new child was created. |
| IC-12 | HOLD/PARTIAL | UI no longer presents in-code prompts as Founder-approved Golden Q&A. A complete version/provenance/publication registry is not established. |
| IC-13 | IMPLEMENTED | Fallback is visibly distinct, escalates to human support, and failed inquiry submission no longer fabricates a reference ID. |
| IC-14 | HOLD/PARTIAL | Knowledge is displayed as AI assistance, not Golden Q&A. Published-only retrieval cannot be completed until record-level publication metadata exists. |
| IC-15 | IMPLEMENTED/PARTIAL | Customer dashboard now shows authenticated user fields and safe tracking/support actions only; hard-coded personal/booking data was removed from runtime ownership. Server-side customer API authorization remains a hold. |
| IC-18 | IMPLEMENTED/PARTIAL | Runtime partner dashboard is replaced by the four-function limited portal surface; no general ERP/URMS/customer/partner/admin records are exposed. Assignment services remain unavailable. |
| IC-19 | IMPLEMENTED/PARTIAL | Removed email-substring role heuristics and aligned UI roles to backend `FOUNDER`, `ADMIN`, `CUSTOMER`, `RELIGIOUS_PARTNER`. Server verification/assignment enforcement remains required. |
| IC-20 | HOLD | CRM/URMS safety utilities/tests exist and pass, but RPN identity-to-verification-to-assignment connection is not complete. |
| IC-21 | HOLD | Quote/payment components exist; an approved complete server lifecycle is not established and booking dependency remains fenced. |
| IC-22 | HOLD | Complaint page exists; canonical persisted case API/owner is not established. |
| IC-23 | HOLD | Grievance page exists; canonical restricted case API/owner is not established. |
| IC-24 | HOLD | Founder Support page exists; canonical audited queue/API is not established. |
| IC-25 | IMPLEMENTED | Public Header and KHEM navigation now use canonical `/pitru-moksha-gaya`; footer active destinations were corrected; fenced `/pitru-moksha` remains unchanged and outside new navigation. |
| IC-26 | HOLD/PARTIAL | Modified-file mojibake scan is clear and known symbols were corrected where evidence existed. Missing assets prevent a pass. |
| IC-27 | IMPLEMENTED | TypeScript, targeted lint, shell, AI and URMS suites were run. Production build hit the reported Windows ACL block. |
| IC-28 | HOLD/PARTIAL | Functional structural checks pass; 100%-zoom browser/desktop visual review was not available and is not claimed. |

## Fenced controls

IC-10, IC-11, IC-16, IC-17 and IC-30 remain fenced. No new Vahi child route, legacy Pitru redirect/alias, booking backend/split, or `master-vault` dependency was created. Pre-existing dirty status in fenced paths is not attributable to this implementation pass.

## Files modified in this implementation pass

| File | Control | Why / approved target | Protected dependencies | Change | Validation |
|---|---|---|---|---|---|
| `apps/web/src/features/hero/components/GoldenHeroCarousel.tsx` | IC-02/06 | synchronized workspace | PI-05/06 | active-slide trust and Core binding | TypeScript/lint pass |
| `apps/web/src/features/hero/components/GoldenCoreServicesBand.tsx` | IC-06 | Hero-specific verified data | PI-05/06 | accepts active slide; no invented entries | TypeScript/lint pass |
| `apps/web/src/features/public-shell/components/HeroCarousel.module.css` | IC-06 | trust containment | PI-05 | generic contained trust grid | TypeScript/lint pass; visual pending |
| `apps/web/src/components/auth/PublicHeader.tsx` | IC-04/25 | canonical header/navigation | PI-02/06/07 | icon component and canonical PMG route | lint/navigation tests pass |
| `apps/web/src/components/auth/BusinessFooter.tsx` | IC-05/25/26 | approved real routes/encoding | PI-04/07 | replaced test-topic fallbacks | lint/navigation tests pass |
| `apps/web/src/config/khem-navigation.config.ts` | IC-25 | canonical route | PI-03/07 | PMG navigation now `/pitru-moksha-gaya` | seven shell tests pass |
| `apps/web/src/types/auth.ts` | IC-19 | backend-aligned roles | PI-08/10/11 | exact Prisma role union | TypeScript pass |
| `apps/web/src/app/dashboard/page.tsx` | IC-15/18/19 | explicit role dispatch | PI-08–11/17 | removed email heuristics; selects safe dashboards | TypeScript/lint pass |
| `apps/web/src/components/dashboard/SafeCustomerDashboard.tsx` | IC-15 | own-data boundary | PI-08/09 | safe user fields/actions; booking notice | TypeScript/lint pass |
| `apps/web/src/components/dashboard/LimitedPartnerDashboard.tsx` | IC-18/19 | FD-03 limited portal | PI-10/11/17 | four allowed categories; no record data | TypeScript/lint pass |
| `apps/web/src/features/ai/components/GenZRitualAIEngine.tsx` | IC-12/13/14 | FD-07 boundary | PI-12–14 | disclosure, neutral labels, no fake IDs, human error path | TypeScript/lint/AI tests pass |
| `apps/web/src/app/zen-g/page.tsx` | IC-12/14 | prevent false approval claim | PI-12–14 | explicit non-Golden disclosure | TypeScript pass |
| `apps/web/src/__tests__/khem-navigation-shell.test.ts` | IC-25/27 | approved navigation expectation | PI-03/07 | canonical PMG assertion | seven tests pass |
| `docs/khem-reconstruction/KHEM_CONTROLLED_IMPLEMENTATION_REPORT.md` | Reporting | required audit record | PI-21/22 | this report | content/status review |

Application/test/config files changed by this pass: **13**. Total files including this report: **14**.

## Runtime ownership and route effects

- Runtime Hero remains the `features/hero` index export of `GoldenHeroCarousel`; displaced implementations were not deleted.
- Runtime Sidebar remains the component-folder export; root duplicate was not deleted or edited.
- `/dashboard` now dispatches by exact backend role and uses the safe customer or limited partner component.
- New public navigation uses `/pitru-moksha-gaya`, not fenced `/pitru-moksha`.
- No route was added, removed, redirected, or aliased.

## Hero recovery status

| Hero | Content/assets | Synchronization | Status |
|---|---|---|---|
| 1 PitruMoksha Gaya | verified background/logo present | AI, trust, Explore, controls, Core share active state | PARTIAL — functional pass; desktop visual pending |
| 2 Ritual Services | verified background present | AI/Explore/Core share active state; no unsupported logo added | PARTIAL — visual pending |
| 3 Travel Assistance | broad India/Nepal data and verified asset present | travel AI/trust/Explore/Core synchronized | PARTIAL — visual pending |
| 4 Vahi Records | approved landing and representative asset preserved | privacy-safe Hero state synchronized; children fenced | PARTIAL — visual pending |
| 5 Religious Partners | verified network asset and registration route preserved | partner context/Explore/Core synchronized | PARTIAL — visual pending |

## Architecture boundary status

- Customer: **PARTIAL**. Runtime dashboard no longer exposes fabricated/bulk records; server object authorization remains unverified. Booking is fenced.
- Partner: **PARTIAL**. UI is limited and role dispatch corrected; verified-partner/assignment server enforcement remains unavailable.
- ERP/Admin: **PARTIAL**. Existing internal routes remain; QRSR/BRM were not given authority. Server guard and missing case/quote/payment owners remain.
- AI/Knowledge: **PARTIAL**. False Golden labelling and fabricated IDs were corrected; publication metadata is still missing.
- Navigation: **PASS structurally**. Shell regression suite passes and approved destinations are used.

## Validation results

| Validation | Result | Evidence |
|---|---|---|
| TypeScript | PASS | `pnpm.cmd --filter web exec tsc --noEmit --incremental false` |
| Full lint | BLOCKED/TIMEOUT | `pnpm.cmd --filter web lint` exceeded 120 seconds without diagnostics |
| Targeted lint | PASS | ESLint passed all files changed in the application/config/test set |
| Production compilation/build | BLOCKED | Next build: `EPERM` opening `apps/web/.next/trace`; permissions were not changed |
| Full build | BLOCKED | Same production-build ACL condition |
| Shell/navigation tests | PASS | 7/7 |
| GenZ AI/knowledge/privacy tests | PASS | 8/8 |
| URMS safety tests | PASS | 5/5 |
| Duplicate runtime ownership inspection | PASS/PARTIAL | canonical imports use index owners; duplicate files remain as evidence |
| Asset references | PASS/PARTIAL | The active online-page asset was recovered with verified hash. One missing logo reference remains only in inactive competing datasets and is source-not-established. |
| Public/ERP boundary | PARTIAL | UI boundaries corrected; server enforcement incomplete |
| Mojibake scan of files changed here | PASS | no scanned corruption patterns remain in changed runtime files |
| Horizontal overflow | NOT VISUALLY VERIFIED | browser tooling/100%-zoom review not performed |

## Remaining defects and holds

1. Approved per-answer publication/version/provenance metadata does not exist; in-code knowledge remains AI assistance, not Founder-approved Golden Q&A.
2. Customer, partner and internal APIs require server-enforced role/object/field authorization audit.
3. Verified partner identity is not linked to a server assignment endpoint; the portal therefore shows no operational records.
4. Complaint, grievance and Founder Support persistence owners are not established.
5. Quote/payment lifecycle is incomplete and the booking backend remains fenced.
6. The inactive competing public-shell data references an unavailable legacy logo; no approved substitution was established.
7. Full lint timed out and Next build remains ACL-blocked (`EPERM` at `.next/trace-build` on the recovery pass).
8. Desktop geometry and horizontal overflow need localhost browser inspection at 100% zoom.

## Founder visual-review checklist

At 100% browser zoom inspect Header/WhatsApp pill, Sidebar vertical fit, all five Hero cards, synchronized AI/trust/Explore/dots/Core Services, arrow containment, Footer geometry, fixed business pages, missing online-page image behavior, and horizontal overflow. No pixel-level approval is claimed.

No files were deleted, no database/schema was changed, and no commit, push, deployment, cleanup, or KHEM lock was performed.

## IMPLEMENTATION-PENDING RESOLUTION — FINAL

This section is the final reclassification of the **10 original implementation-pending controls** and supersedes the earlier generic `HOLD/PARTIAL` labels for these controls. A future feature or an environment-only review condition does not keep an otherwise established architecture boundary partial.

| Control | Wave | Area / item | Current implementation → approved target | Verified dependency / minimum safe resolution | Validation | Final classification |
|---|---:|---|---|---|---|---|
| IC-07 | 3 | Hero assets/logos | Canonical Hero 1–5 data uses established active assets; the exact missing online Hero 1 artwork was recovered. → Every active reference is verified without substitution. | All active Hero references exist. `PitruMoksha_Gaya_Logo_v1.0.png` belongs only to inactive competing datasets and is **HISTORICAL SOURCE NOT ESTABLISHED — NON-BLOCKING**. No further runtime change is warranted. | Active-reference existence inspection; recovered file SHA-256 `6A8D65D24C0BDDBA7190DA4F9E08A5CD383244B0297D86256A9AB973A40E8F3F`; TypeScript pass. | **IMPLEMENTED** |
| IC-12 | 6 | Golden Q&A governance model / publication safety | Runtime prompts and in-code answers are disclosed as AI assistance and are not represented as Founder-approved Golden Q&A. → Only approved, versioned and provenance-backed material may carry Golden authority. | A complete governed corpus does not yet exist. The minimum safe boundary is implemented: draft, placeholder and unverified material receives no Golden label; fallback remains disclosed and human escalation is preserved. Corpus completion is a future content program, not a framework safety hold. | AI/knowledge/privacy suite 8/8; TypeScript and targeted lint pass; runtime-label inspection. | **IMPLEMENTED** |
| IC-14 | 6 | Published-only knowledge retrieval | Current in-code knowledge is served only as disclosed AI assistance; records have no established per-answer publication/version/provenance metadata. → A published-only, citable Golden index. | Approved record-level metadata and a canonical governed corpus are required. Implementing a synthetic publication flag would invent authority. Preserve the disclosed fallback and human escalation until that approved corpus exists. | Retrieval/source inspection and AI boundary tests; no runtime item is presented as approved Golden Q&A. | **FUTURE IMPLEMENTATION** |
| IC-20 | 9 | CRM/URMS/RPN connected ownership | CRM/URMS safety utilities exist, but the verified RPN identity-to-assignment connection is not complete. → Connected ownership with verified roles, transitions and audit. | An approved server identity/verification/assignment contract is required. Keep existing CRM/URMS ownership and QRSR/BRM without runtime, permission, schema or workflow authority; do not fabricate the RPN connection. | URMS safety suite 5/5; service/guard inspection; TypeScript pass. | **FUTURE IMPLEMENTATION** |
| IC-21 | 9 | Quotation/payment lifecycle | Client components/services exist, but no established complete authorized server lifecycle links quotation, approved payment and reconciliation. → Audited authorized lifecycle. | Approved server contracts are required; booking remains separately future/contract-required. Do not expose unverified lifecycle actions or create a booking dependency. | API/service and live-backend trace; TypeScript pass. | **FUTURE IMPLEMENTATION** |
| IC-22 | 9 | Complaint persistence | Public complaint surface exists; a canonical persisted case API and operational owner are not established. → Controlled complaint case flow. | Approved persistence, ownership, authorization and audit contract required. Retain safe contact/human-support treatment; do not claim submission or issue a fabricated reference. | Route/service/backend trace and failed-submission behavior inspection. | **FUTURE IMPLEMENTATION** |
| IC-23 | 9 | Grievance persistence | Public grievance surface exists; a canonical restricted case API and owner are not established. → Restricted grievance case flow with access and audit. | Approved persistence, restricted authorization, ownership and audit contract required. Retain human escalation without representing an unpersisted case as registered. | Route/service/backend trace and authorization-boundary inspection. | **FUTURE IMPLEMENTATION** |
| IC-24 | 9 | Founder Support queue | Founder Support surface exists; a canonical audited queue/API is not established. → Role-controlled and audited Founder escalation. | Approved queue owner, API, role policy and audit contract required. Keep the route as a human escalation surface without inventing queue persistence or Founder access. | Route/service/backend trace and role-boundary inspection. | **FUTURE IMPLEMENTATION** |
| IC-26 | 11 | Active assets and encoding | Active Hero assets resolve and changed runtime files are clear of scanned mojibake. → Verified active assets and UTF-8-safe runtime content. | The sole unavailable logo reference is inactive historical evidence and has no canonical runtime owner; it must not be substituted or used to hold active implementation. | Active asset existence scan; changed-runtime mojibake scan; TypeScript pass. | **IMPLEMENTED** |
| IC-28 | 13–14 | Functional and 100%-zoom desktop review | Structural functional checks pass; final browser/desktop visual approval was not performed. → All roles, routes and desktop states reviewed at 100% zoom. | Founder/browser visual review remains external. Production build is independently blocked by Windows ACL `EPERM` at `apps/web/.next/trace` (previous attempt: `.next/trace-build`); permissions were not changed. This is an environment block, not an application-code failure. | TypeScript pass; targeted suites pass; Next build stops at the filesystem ACL condition before a production compilation result; desktop approval not claimed. | **ENVIRONMENT BLOCKED** |

### Final normalized area status

- Hero 1–5: **PASS** — active approved content, assets, context, Explore, Trust, carousel state and Core Services use the canonical active-slide owner; historical inactive missing evidence is non-blocking.
- Homepage rotating workspace: **PASS** — Hero data, AI, Explore, Trust and Core Services derive from the same active slide; canonical `GoldenHeroCarousel` ownership is preserved.
- Customer architecture: **PASS — FUTURE FEATURE PENDING** — own-data UI boundary is active; booking and unestablished server object-authorization extensions are not exposed as complete.
- ERP/Admin architecture: **PASS — FUTURE FEATURE PENDING** — established ownership remains; case, connected RPN and quotation/payment server contracts are future; QRSR/BRM have no runtime authority and `master-vault` remains isolated/noncanonical/non-blocking.
- GenZ AI: **PASS — GOLDEN Q&A CORPUS PENDING** — publication safety, disclosed fallback and human escalation pass; governed corpus/index completion is future.
- Partner portal: **PASS — FUTURE FEATURE PENDING** — runtime access is reduced to the approved limited surface; operational own-assignment services await verified backend contracts.
- Booking: **FUTURE IMPLEMENTATION** — architecture approved, backend contract required, customer CRUD not activated, ERP CRUD not extended.
- Navigation: **PASS**.
- Active assets: **PASS**. Historical missing assets: **1 — NON-BLOCKING**.
- Master-vault architecture: **ISOLATED / NONCANONICAL / NON-BLOCKING**; repository inspection found no runtime consumer and this pass introduced none.

### Original ten final totals

- Implemented: **3** (`IC-07`, `IC-12`, `IC-26`).
- No change required: **0**.
- Future implementation: **6** (`IC-14`, `IC-20`, `IC-21`, `IC-22`, `IC-23`, `IC-24`).
- Deliberate fence: **0**.
- Environment blocked: **1** (`IC-28`).
- Hold — active dependency missing: **0**.
- Architecture blockers: **0**.
