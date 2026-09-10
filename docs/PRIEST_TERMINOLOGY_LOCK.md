# Priest onboarding terminology lock

Priest-onboarding copy now uses Verified Priest / Verified Priests, Priest Registration, Priest Application, and the associated approved labels across navigation, forms, tracking, dashboards, AI, knowledge content, legal pages, API messages, content-library entries, notifications, and quote email/PDF output.

Routes, API function names, model names, enum values, database schema, DOM identifiers, and stored form/assignment values are unchanged. In particular, `/religious-partners`, `PARTNER_REGISTRATION`, `RELIGIOUS_PARTNER`, and the stored `Religious Partner Team` value remain technical contracts. Display formatters translate legacy labels only when presenting them. Travel-provider and general commercial uses of partner remain outside this priest-onboarding lock.

The approved legal DOCX masters remain unchanged. Legal generation applies only the explicit terminology rules and retains every original section anchor. The verification script compares output against the masters plus this authorized overlay.

Validation:

- Frontend and backend TypeScript checks passed during implementation.
- Three targeted terminology/notification/PDF tests passed, including checks that input records, IDs, pricing, and status are unchanged.
- Priest onboarding, role authorization, and commercial workflow tests passed. Assignment/tracking tests passed with the backend CommonJS runner (11 tests); the initial alternative runner had a module-mocking incompatibility.
- Offline legal paragraph fidelity and original route/DOM ID/enum preservation checks passed.
- Full web ESLint retains its existing `no-require-imports` error in `src/__tests__/css-module-stub.cjs` and existing warnings.
- The broad AI suite remains limited by its empty approved-knowledge dataset / 150-versus-895 query-count mismatch. Its action-route checks had no failures. Legacy query input fixtures were retained.
- Final rendered-page verification is incomplete: the local server reported a UTF-8 BOM parsing error in the unchanged root `package.json`; automatic approval review then blocked the retry because its usage limit was reached. The configuration was not edited as part of this terminology-only task.

Run targeted checks from `apps/web` with `node --import tsx --test src/__tests__/priest-terminology.test.ts`. Run `python scripts/generate-legal-documents.py --check` from the project root to detect generated legal-content drift.
