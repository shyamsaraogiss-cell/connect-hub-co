# KHEM Working Tree Disposition Audit

**Date:** 2026-08-13  
**Project:** `C:\Projects\connect-hub-co`  
**Status:** Intentional Dirty Working Tree Confirmed

This audit documents the current state and disposition of files in the working tree, confirming adherence to the strict non-destructive constraints (no resets, no cleans, no restores, and no file deletions).

---

## 1. Active Working Tree Modifications

The following files are modified and preserved in the working tree:

| File path | Modification Status | Approved Role & Purpose |
|---|---|---|
| [`apps/web/src/lib/api.ts`](file:///C:/Projects/connect-hub-co/apps/web/src/lib/api.ts) | **Modified** | Updated `getAccessToken` to support `process.env.TEST_AUTH_TOKEN` in Node/testing environments, enabling test suite authentication without browser local storage dependency. |
| [`apps/web/src/__tests__/urms.test.ts`](file:///C:/Projects/connect-hub-co/apps/web/src/__tests__/urms.test.ts) | **Modified** | Injected a self-contained Node.js `crypto` JWT token generator that signs testing payloads using the active database `JWT_SECRET`, enabling 5/5 passing URMS tests. |
| [`docs/khem-reconstruction/KHEM_PRETRIAL_PHASE_G_FINAL_OPERATIONAL_CLOSURE.md`](file:///C:/Projects/connect-hub-co/docs/khem-reconstruction/KHEM_PRETRIAL_PHASE_G_FINAL_OPERATIONAL_CLOSURE.md) | **Modified** | Created/updated the Phase G closure report, capturing the 5/5 URMS test execution outcomes and deactivation/trace classification. |
| `KHEM_LAYOUT_SOURCE_CHECK_20260802-181522.zip` | **Untracked** | Retained as required for visual/reconstruction historical layout references. |

---

## 2. Protected Layout & Asset Invariant Audit

The following canonical components are verified to be completely unchanged, preserving the approved visual system:

* **Global Header (`apps/web/src/components/auth/PublicHeader.tsx`)**: Unmodified.
* **Global Footer (`apps/web/src/components/auth/BusinessFooter.tsx`)**: Unmodified.
* **Global Sidebar (`apps/web/src/components/auth/SessionHeader.tsx` etc.)**: Unmodified.
* **Hero Carousel & Slides (`apps/web/src/features/hero/...`)**: Unmodified.
* **Trust Strip & Explore Layouts**: Unmodified.
* **Golden Q&A / Semantic Search Data**: Unmodified.

---

## 3. Dispositions and Cleanup Audits
* **Legacy `frontend/` files:** Deletions and exclusions remain preserved in the git history as approved under the Exclusion & Supersession register.
* **Git clean, reset, checkout, restore:** None executed.
* **Physical file deletions:** `0` (no active files deleted in this phase).
