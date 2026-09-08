# KHEM Public Version Connection Map v1.0

**Date:** 2026-08-18  
**Target:** `review/khem-prewebsite/apps/web`  
**Purpose:** evidence-only current-to-authority connection map. No repair authorization.

## Authority keys

- **GR:** `KHEM_GOLDEN_AUTHORITY_REGISTER_PUBLIC_WEBSITE_v1.0.md` — current control index; underlying source still required.
- **PI:** `KHEM_PROTECTED_IMPLEMENTATION_REGISTER.md` — KHEM approved architecture base.
- **FDISP:** `KHEM_FINAL_APPROVED_DISPOSITION_REGISTER.md` — approved architecture disposition, not exact copy approval.
- **FDS:** `KHEM_FINAL_FOUNDER_DECISION_SHEET.md` — states zero actual Founder decisions; conflicts with claims that FD-01–FD-07 were resolved.
- **F51:** commit `f51d9e8bf9d8716d9331703e80669fd4512a750b`, 2026-08-08 — “lock verified shared-shell recovery architecture (Items 1-6).” Strong adoption for ownership/structure; not blanket approval of 32,159 lines of content.
- **GOLDEN-RUNTIME:** commit `800225b54070bfe3d2a2eed9c45e94d943e66ef2`, 2026-08-13 — “restore active Golden KHEM runtime.” Strong connection evidence for selected runtime assets/components.
- **H1-LOCK:** recovered SITARAM Hero-1 Master Lock v1.1 in `stash@{0}^3`; historical provenance adopted only where GR/F51/GOLDEN-RUNTIME corroborate it.
- **H1-EXPLORE:** `stash@{0}^3:docs/approved-content/Hero_1_Explore_Content_LOCKED_v1.0.md`.
- **H2-LOCK:** `stash@{0}^3:docs/Website/SITARAM_HERO_2_RITUAL_SERVICES_v1.1_FINAL_LOCK.md`, approved 2026-07-23.
- **LANDING-20260814:** `PUBLIC_LANDING_PAGE_CORRECTION_MASTER_2026-08-14.docx`; exact provenance for active H1–H4 display copy, but no explicit KHEM lock/sign-off.
- **VAHI-FINAL:** `stash@{0}^3:docs/approved-content/vahi/Connect_Hub_Co_Vahi_Records_Website_Spelling_Corrected.docx` and `Vahi_Hero_Cards_Spelling_Corrected.docx`.

## Version connection map

| Public item | Current connected source | Proven KHEM source / best evidence | Connection result | Notes |
|---|---|---|---|---|
| Canonical public app | review `apps/web` copy | GR §4.1; PI-01 | MATCH identity | Review is an isolated audit candidate, not canonical production ownership. |
| Root outer composition | `src/app/layout.tsx` + per-page `PublicHeroShell` | PI-02–04; F51 | PARTIAL | Fixed Header/Footer are root-owned; Sidebar is page-shell-owned and not universal across all public routes. |
| Header owner | `PublicHeader.tsx` | PI-02; F51; GOLDEN-RUNTIME | MATCH owner / UNRESOLVED exact presentation | Live and review hashes match; exact visual/copy master absent. |
| Header links | local `links` plus direct action links | `khem-navigation.config.ts`; PI-02/07 | WRONG/UNRESOLVED | Mobile local list and global registry are not one source. |
| Sidebar owner | component-folder `PublicHeroSidebar.tsx` | FDISP ES-05; PI-03; F51 | MATCH | Live/review hashes match; root competitor is historical. |
| Sidebar hierarchy | `KHEM_EXACT_SIDEBAR_HIERARCHY` | F51 committed KHEM config; H1-LOCK order corroboration | MATCH with encoding defects | Current icons contain mojibake; labels/routes match selected registry. |
| Footer owner | `BusinessFooter.tsx` | PI-04; F51/GOLDEN-RUNTIME | MATCH owner | Live/review hashes match. |
| Footer structure | six runtime columns + Subscribe/social | config's “approved four-column” block; no primary visual lock | CONFLICT | Same source generation contains contradictory four/six-column claims. |
| Copyright | dynamic current year in Footer | no legal/copyright master located | UNRESOLVED | Runtime existence is not authority. |
| Logo role mapping | Logo Two in Header/Footer | `khem-logos.config.ts` says Logo Three is company mark for Header/Footer | WRONG/CONFLICT | Config and implementation conflict within adopted KHEM runtime. |
| Colour family | globals/CSS module tokens | H1-LOCK; PI shell evidence | MATCH family | Exact token values/dimensions are unresolved. |
| Responsive dimensions | current CSS modules | dated backups + screenshots only | UNRESOLVED | No signed breakpoint/dimension master. |
| Hero runtime owner | `GoldenHeroCarousel` through Hero barrel | FDISP ES-02/03; Controlled Implementation Report; F51/GOLDEN-RUNTIME | MATCH owner | Review component diverges from live after recovery edits; exact review delta lacks a separate lock. |
| Hero slide renderer | public-shell `HeroSlide.tsx` | GOLDEN-RUNTIME selection | MATCH owner / PARTIAL version | Review hash differs from live. |
| AI panel framework | `HeroAssistantPanel` → engine | PI-12/13; F51 | MATCH structure / UNRESOLVED content | AOM/KPL and publication ledger unavailable. |
| Explore framework | active slide data | H1-LOCK/H1-EXPLORE for H1; LANDING-20260814 for H2–H4 | PARTIAL | H2–H4 exact copy provenance exists but lock status is not explicit; H5 source absent. |
| Core-services framework | active slide-specific ten-item data | H1-LOCK describes reusable six-item band; LANDING-20260814 prescribes ten-item H1–H4 bands | CONFLICT | Later correction provenance versus earlier locked model lacks explicit supersession/sign-off. |
| Carousel/arrows | Golden carousel + current CSS | H1/H2 locks; F51/GOLDEN-RUNTIME | MATCH invariant | Exact responsive pixels remain unproven. |
| Inner-page frameworks | `StaticBusinessHeroPage`, `BusinessPageShell`, `FuturePathPage` | F51 introduced all three for distinct route roles | MATCH architecture | Prior “duplicate” classification was too broad; they are not interchangeable owners. |
| H1 identity/route | homepage data; `/pitru-moksha-gaya` | GR §5/6; F51/GOLDEN-RUNTIME | MATCH |
| H1 artwork/logo | separate background/logo assets | H1-LOCK; GOLDEN-RUNTIME added exact assets | MATCH parent Hero | Online/offline ownership is separate. |
| H1 title/tagline | active `Daan. Dharma. Moksha.` and comma form of Distance line | GR exact lines; H1-LOCK; LANDING-20260814 | PARTIAL/WRONG punctuation | GR controls exact no-comma `Distance Never Stops Devotion.`; later correction has comma. |
| H1 Explore | active LANDING-20260814 wording | GR/H1-EXPLORE exact different locked sentence | WRONG VERSION | Direct restoration wording is proven by GR, but later Founder correction provenance conflicts. |
| H1 Q&A | eight in-code prompts | H1-LOCK claims 171 approved entries; corpus absent | UNRESOLVED | Current eight cannot substitute for missing corpus. |
| H1 opening guidance | homepage data | no exact AOM/Hero lock string | UNRESOLVED |
| H1 main page | five current data files/composite | H1-EXPLORE partially overlaps; F51 bulk addition | PARTIAL/UNRESOLVED | No section-level adoption map. |
| H1 Online route | `OnlineAncestralPage` using parent Final v2 artwork | GR names refined v1.1 workbook and contextual banner rule | WRONG VERSION / SOURCE MISSING | Workbook not in tree, archives, refs, reflogs or stashes. |
| H1 Offline route | `FuturePathPage` with X01 | GR says Offline not reviewed | MATCH unresolved gate | No recovery source found. |
| H2 identity/route | homepage data; `/ritual-services` | GR §7; H2-LOCK; LANDING-20260814 | MATCH |
| H2 parent artwork | `ihero2-ritual-services.png` | H2-LOCK + GOLDEN-RUNTIME select `hero2-ritual-services.png` | WRONG VERSION | Disconnected locked asset exists in the review copy. |
| H2 logo | no Hero-specific logo | no source requiring one | MATCH/NOT REQUIRED | X31 was an audit classification error. |
| H2 copy/locations | homepage data | H2-LOCK layout rules + LANDING-20260814 exact copy | MATCH copy with encoding defects | Lock status for later exact wording is not explicit beyond correction master. |
| H2 Q&A/opening | base Hero prompts imported into homepage; runtime and inner variants | no published Hero-2 Q&A/KPL/AOM | UNRESOLVED | No store can be promoted. |
| H2 Explore/core | homepage data | LANDING-20260814 exact source | MATCH provenance / UNRESOLVED final lock | No explicit supersession of older shared-core lock. |
| H2 main inner page | detailed component-local content/Q&A | F51 bulk implementation only | UNRESOLVED | No page-specific approval master located. |
| H2 Online | route-local content + X02 media | no route-specific master | UNRESOLVED |
| H2 Offline | route-local content + X03 media | no route-specific master | UNRESOLVED |
| H3 identity/copy/Explore/core | homepage data | LANDING-20260814 exact display source; PI broad India/Nepal identity | MATCH provenance / PARTIAL authority |
| H3 artwork | `Hero_3_Airport_Arrival_Photo_v2.1_Clean.png` | GOLDEN-RUNTIME adopts exact asset; LANDING says “correct the image” without filename | MATCH KHEM runtime adoption | No earlier signed asset lock. |
| H3 Q&A/opening | homepage and runtime stores | no published Hero-wise source | UNRESOLVED |
| H3 inner page | `TravelAssistanceContent.tsx` | F51 bulk addition; Founder Draft/distributed evidence only | UNRESOLVED exact content |
| H3 request route | private request UI without local route guard | PI-08–11; FDISP ES-07 | WRONG CONNECTION | Internal data surface is in public route tree; client hiding is not authorization. |
| H3 success route | route-local success copy | no approved operational/content source | UNRESOLVED |
| H4 identity/copy/Explore/core | homepage data | VAHI-FINAL + LANDING-20260814 | MATCH exact content provenance | The archived KHEM consolidation is Founder Review only and is superseded as copy candidate by spelling-corrected final files. |
| H4 artwork/logo | ledger image + Pitru logo | VAHI-FINAL specifies representative visual but not file/hash; no Vahi logo mapping | UNRESOLVED |
| H4 Q&A/opening | homepage/current stores | no published Vahi Hero Q&A | UNRESOLVED |
| H4 inner owner | `VahiApprovedContent.tsx` | FDISP ES-09 selects current privacy-controlled architecture; F51 | MATCH owner | Full VAHI-FINAL content is not wholly displayed; deliberate privacy/content gating is plausible but not mapped. |
| H4 child routes | none | PI-18/22; IC-10/MC-11 | MATCH absence | No approved contract exists. |
| H5 identity | Religious Partner is fifth current Hero | GR §5/8; PI-06 | MATCH | Asset's `Hero_6` filename is historical numbering, not current identity authority. |
| H5 artwork/copy | Hero-6-named asset/current data | GOLDEN-RUNTIME adopts asset; F51 bulk content | MATCH asset adoption / UNRESOLVED exact copy |
| H5 Q&A/opening | homepage/runtime/page-local stores | no published H5 source | UNRESOLVED |
| H5 inner page | `ReligiousPartnersContent.tsx` | F51 bulk addition; PI public/private boundary | PARTIAL/UNRESOLVED content |
| H5 registration | `/register` unavailable flow | PI-17 requires verified registration journey; exact public flow master absent | WRONG/PARTIAL |
| Track Service Request | `/tracking` shared UI | GR §11 requires separate customer projection | WRONG CONNECTION |
| Track Registration ID | same `/tracking` projection | GR §11 requires separate partner projection | WRONG CONNECTION |
| Golden Q&A | no governed corpus | GR §11; PI-12; MC-10 | SOURCE MISSING |
| Hero-wise Q&A | unversioned in-code arrays | GR §11 | UNRESOLVED |
| Runtime AI Q&A | `ai-knowledge.ts` | PI-13 allows constrained fallback only; not Golden/Hero ownership | MATCH runtime-only boundary, content unapproved |
| Knowledge Centre | route cards + semantic index | PI-14 requires published-only material | WRONG/PARTIAL | No publication metadata/article corpus. |
| Policy/company content | route-local copy | GR §10 separate owners | UNRESOLVED | Routes are proven; exact content is not. |
| Support/case flows | route-local forms | IC-22–24; no canonical persistence owner | UNRESOLVED/FUTURE |
| Service catalog/booking | client catalog/form | IC-16/17 fenced; PI-08/09 | WRONG/PARTIAL | Public intake exists; approved backend/field boundary absent. |
| Public route index | exposes internal route list | PI-08–11, GR §12 | WRONG CONNECTION | No public evidence authorizes ERP route disclosure. |
| Internal CRUD routes | same App Router tree | FDISP ES-06/07 | WRONG/UNPROVEN GUARDS | Exact limited/customer-safe server enforcement not demonstrated. |
| Parallel `/pitru-moksha` | legacy route family | IC-11 fenced; canonical GR route is `/pitru-moksha-gaya` | ORPHAN/UNRESOLVED |
| Public assets | 18 review assets | locks, GOLDEN-RUNTIME, VAHI-FINAL, asset hashes | PARTIAL | Five starter SVGs are X_REMOVE candidates; duplicate Pitru logo is byte-identical. |

## Connection totals

- **WRONG VERSION CONNECTIONS FOUND:** 13 material connections (including H2 artwork, H1 Online visual, H1 locked copy/Explore, logo role, shared tracking, internal route exposure, and parallel Pitru flow).
- **DISCONNECTED LATEST KHEM SOURCES FOUND:** 3 definite/strong candidates: locked H2 artwork, GR-controlled H1 exact lines/Explore, and selected limited/public-boundary architecture. The H1 Online workbook is not counted because it is unavailable.

This map is evidence only. `MATCH` does not authorize implementation, and `WRONG` does not authorize restoration until the recovery report's authority classification is reviewed.
