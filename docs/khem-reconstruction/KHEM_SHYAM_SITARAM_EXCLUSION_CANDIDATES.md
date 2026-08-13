# KHEM SHYAM/SITARAM Exclusion Candidate Register

No deletion is authorized by this register.

| ID | Item | Original purpose/source | Current implementation | Latest KHEM conflict | Dependencies/impact | Recommendation |
|---|---|---|---|---|---|---|
| EX-01 | Root `features/hero/*` duplicate tree | Earlier carousel implementation; stash/f51 | Runtime barrel selects `components/GoldenHeroCarousel` | Duplicate ownership | Compile/import confusion | EXCLUDE FROM RUNTIME; KEEP AS HISTORICAL EVIDENCE |
| EX-02 | `features/hero/components/HeroCarousel.tsx` | f51 shared carousel | Not runtime owner | Superseded by recovered Golden owner | Tests/imports may reference | REVIEW |
| EX-03 | Root `features/public-shell/PublicHeroShell.tsx` | Alternate hard-coded shell | Barrel selects `components/PublicHeroShell` | Duplicates global header/AI/footer ownership | High visual/auth risk if imported | EXCLUDE FROM RUNTIME |
| EX-04 | Root public-shell sidebar duplicate | Alternate sidebar | Component-folder sidebar is active | Duplicate ownership | Navigation risk | REVIEW |
| EX-05 | Legacy `frontend/` application | Original SHYAM trial frontend | Deleted in working tree; recovery copy exists | Canonical app is `apps/web` | Historical reference only | KEEP AS HISTORICAL EVIDENCE |
| EX-06 | Partner dashboard/account assumptions | Original role-based dashboard | Partner dashboard components/routes exist | Later KHEM access decision not found | Security and workflow impact | REVIEW |
| EX-07 | Direct customer booking CRUD routes | Trial operational UI | `/bookings/*` currently present | Public-vs-internal ownership unresolved | Authorization/commercial risk | REVIEW |
| EX-08 | Generic Pitru-only Travel page | Trial Travel request implementation | Superseded by full Travel landing route; request pages remain | KHEM Travel is India/Nepal-wide | Customer positioning | SUPERSEDE |
| EX-09 | Large legacy VahiRecordsPage | Earlier full Vahi page | Approved-content route is active | f51/Aug-5 selected different owner | Content/privacy duplication | KEEP AS HISTORICAL EVIDENCE; REVIEW |
| EX-10 | Master-vault secret service | Standalone cryptographic vault | Separate project, not app runtime | No evidence it is the KHEM content vault | Security architecture ambiguity | REVIEW |

Candidate count: 10.
