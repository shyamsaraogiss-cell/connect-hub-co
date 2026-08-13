# KHEM Source Evidence Index

## Evidence ranking used

1. Explicit lock/approval document with matching code/assets.
2. Dated Aug-4/Aug-5 backup or stash source.
3. f51 consolidation commit and current canonical `apps/web` source.
4. KHEM Master Vault extraction.
5. Legacy recovery-review source.
6. Filename/reference only.

## Primary sources

| Source | Contents | Classification / caveat |
|---|---|---|
| Current `apps/web/src/app` | App Router public, account and internal routes | FOUND — CANONICAL, dirty tree |
| Current `apps/web/src/features` | Hero, public shell, AI, Pitru content | FOUND — CANONICAL plus duplicates/backups |
| Current `apps/web/src/services` and `types` | URMS, CRM, quote, payment, booking, communication | FOUND — CANONICAL client architecture |
| `backend/prisma/schema.prisma` | User, Customer, ReligiousPartner, PitruMokshaRequest | FOUND — CANONICAL but narrower than web model |
| `stash@{0}^3` / commit `49106b40` | Untracked Aug-5 source, docs, assets, Vahi material | FOUND — STASH |
| commit `f51d9e8b` | Shared-shell consolidation and 206-file architecture | FOUND — GIT HISTORY |
| `connect-hub-co-recovery-review/stash-49106b-source` | Extracted Aug-5 source | FOUND — HISTORICAL |
| `KHEM_MASTER_VAULT` | Repeated thematic extracts for shell, Heroes, pages, AI, knowledge, schemas | FOUND — VAULT; timestamps do not prove approval |
| dated public-shell/pitru backups | Aug-3/Aug-4 visual and content snapshots | FOUND — BACKUP |
| `SITARAM_HERO1_MASTER_LOCK_v1.1.md` in stash package | Hero 1 lock and integration guidance | FOUND — LOCKED reference |
| `SITARAM_HERO_2_RITUAL_SERVICES_v1.1_FINAL_LOCK.md` in stash docs | Ritual Hero lock | FOUND — LOCKED reference |
| Vahi approved-content DOCX files in stash | Vahi website/cards/consolidation content | FOUND — APPROVED-CONTENT evidence; binary review limited |
| `master-vault/ARCHITECTURE.md` | Standalone secrets microservice | FOUND — HISTORICAL; relationship conflict |
| `connect-hub-co - Copy` | Only an AutoRecovery editor file | NO USEFUL PROJECT SOURCE FOUND |

## Recovery provenance records

| Evidence | Status | Source | Runtime authority |
|---|---|---|---|
| Marker: `1.0.0-PROD_2026_PHASE_6A1` | HISTORICAL / RECOVERY PROVENANCE | `apps/web/src/config/khem-master-vault.ts` | NONE |
| `Pawan Dham` / `Heritage Centre` | STATUS UNCERTAIN | recovery-only Hero 1 snapshot | Active Golden Hero authority: NONE |

### Relocated recovery evidence

| Original source path | Preserved evidence path | Git blob hash |
|---|---|---|
| `apps/web/public/images/hero/Hero_4_Solemn_Shraddh_Pind_Daan_v2.0.png` | `docs/khem-reconstruction/KHEM_RECOVERY_apps-web_public-images-hero_Hero_4_Solemn_Shraddh_Pind_Daan_v2.0.png` | `6b9bfa5423bcf4c43f4104a73c17afc5bd8cb813` |
| `apps/web/src/features/hero/CoreServicesBand.tsx` | `docs/khem-reconstruction/KHEM_RECOVERY_apps-web_src-features-hero_CoreServicesBand.tsx` | `8f8721bc3ed9af28840116209da2f6c04e9418b4` |
| `apps/web/src/features/public-shell/PublicHeroShell.tsx` | `docs/khem-reconstruction/KHEM_RECOVERY_apps-web_src-features-public-shell_PublicHeroShell.tsx` | `2209935c05dcf7d5fbfff9262e3825f754824c9c` |
| `apps/web/src/config/khem-master-vault.ts` | `docs/khem-reconstruction/KHEM_RECOVERY_apps-web_src-config_khem-master-vault.ts` | `acb1e9763d39422bece648cc1f15f326cd53510a` |
| `apps/web/src/features/public-shell/data/homepageHeroSlides.ts` | `docs/khem-reconstruction/KHEM_RECOVERY_apps-web_src-features-public-shell-data_homepageHeroSlides.ts` | `f6854176330ccf8f2ac36e87f05cbd0a950b7bd7` |

## Chronology

- Pre-trial: Founder premise places governance and 24 planning rounds before trial implementation; primary manuals unavailable.
- SHYAM: earliest trial application/ERP baseline, represented by legacy `frontend` and backend CRUD/auth flows.
- SITARAM: website shell, Hero 1/2 masters, visual locks and content integration packages.
- Aug 3–4: Pitru main-page and public-shell dated backups; Golden Base visual alignment.
- Aug 5: stash commits `afdcd580`, `44471ebc`, `49106b40`; Vahi pricing/content and untracked consolidated web architecture.
- KHEM: broader vault organization, five-business Hero system, AI/URMS/CRM consolidation and recovery governance.
- f51: `chore(khem): lock verified shared-shell recovery architecture (Items 1-6)`.
- Later: mixed duplicate component trees, deleted legacy frontend, recovery attempts and current canonical `apps/web` selection.

## Status vocabulary

`LOCKED` is used only where lock evidence exists. `APPROVED` requires explicit approved-content/lock evidence. `CURRENT` means present, not approved. `SUPERSEDED` requires a later implementation or rule. Otherwise the report uses `CONFLICTING`, `UNKNOWN`, or `SOURCE NOT ESTABLISHED`.
