# KHEM Frontend Recovery Cleanup Snapshot — 2026-08-13

This manifest was captured before the Founder-authorized recovery cleanup. It records provenance only and grants no runtime authority.

## Git snapshot

- HEAD: `8b60fb9f9900dd685ab20672905d62257cb483ef`
- Normal index file Git hash: `96fbe74a6b0230c0f2c5fceff8e44307a458b097`
- Normal index staged-entry listing SHA-256: `4ef13eafc9021fe08257103d24d0a3a5035af3aa59cf33ccd28e8b7ed4a781b9`
- Normal index entry count: `485`
- Staged path count: `0`
- Full porcelain status SHA-256: `deb515003f6c04ba939ca4d7726efeee4260830e68a1d8b6f6b6ca119a2ff5c0`
- Full porcelain status line count: `5620`

## Recovery file manifest

| Disposition | Original path | Git blob hash |
|---|---|---|
| ARCHIVE | `apps/web/public/images/hero/Hero_4_Solemn_Shraddh_Pind_Daan_v2.0.png` | `6b9bfa5423bcf4c43f4104a73c17afc5bd8cb813` |
| KEEP EVIDENCE / RELOCATE | `apps/web/src/config/khem-master-vault.ts` | `acb1e9763d39422bece648cc1f15f326cd53510a` |
| ARCHIVE | `apps/web/src/features/hero/CoreServicesBand.tsx` | `8f8721bc3ed9af28840116209da2f6c04e9418b4` |
| REMOVE | `apps/web/src/features/hero/HeroCarousel.tsx` | `37ba93d1bd6133ebfa99d62202a31e3c539696c1` |
| REMOVE | `apps/web/src/features/hero/HeroNavigation.tsx` | `748dac65ee3e52bfc96eaeb188c3e141e04c40d6` |
| REMOVE | `apps/web/src/features/hero/HeroSlide.tsx` | `f0307d33f3ac53038e86aa1776e3b9a91cd425ef` |
| REMOVE | `apps/web/src/features/hero/heroSlides.ts` | `5dfc65f530b3c099345348a7a47a7f784a891900` |
| ARCHIVE | `apps/web/src/features/public-shell/PublicHeroShell.tsx` | `2209935c05dcf7d5fbfff9262e3825f754824c9c` |
| REMOVE | `apps/web/src/features/public-shell/PublicHeroSidebar.tsx` | `eabc248f46e2cb83aa0dc12e80f638578dd8fa45` |
| REMOVE | `apps/web/src/features/public-shell/data/heroSlides.ts` | `f6854176330ccf8f2ac36e87f05cbd0a950b7bd7` |
| KEEP EVIDENCE / RELOCATE | `apps/web/src/features/public-shell/data/homepageHeroSlides.ts` | `f6854176330ccf8f2ac36e87f05cbd0a950b7bd7` |

## Legacy frontend deletion manifest

- Deleted path count: `149`
- Committed source tree: `HEAD:frontend`
- Git tree object: `acc36f9e153f1ae6be44811330337079103d55d9`
- The tree object is the complete path-and-blob manifest for all 149 legacy files and can be expanded with `git ls-tree -r 8b60fb9f9900dd685ab20672905d62257cb483ef frontend`.
- Preserved `AGENTS.md` blob: `8bd0e39085d5260e7f8faffcad2fdc45e10aef33`
- Preserved `CLAUDE.md` blob: `43c994c2d3617f947bcb5adf1933e21dabe46bb5`

## Safety gates

- Active Golden imports referenced no cleanup candidate outside the inactive recovery cluster.
- `apps/web/AGENTS.md` and `apps/web/CLAUDE.md` exactly matched their committed legacy blobs.
- Recovery-only `Pawan Dham` / `Heritage Centre` labels remained non-active and status uncertain.
