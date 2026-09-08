# KHEM Public Evidence Acceptance Audit v1.0

**Phase:** 1 — audit only  
**Audit date:** 2026-08-18  
**Implementation audited:** `review/khem-prewebsite/apps/web`  
**Control index:** `docs/khem-reconstruction/KHEM_GOLDEN_AUTHORITY_REGISTER_PUBLIC_WEBSITE_v1.0.md`  
**Rule applied:** NO EVIDENCE = NO ACCEPTANCE.

## Executive totals

The audit unit is a separately owned route, shell element, Hero element, source store, shared implementation owner, or public asset class. Where one unresolved ownership failure affects several files, one stable X controls the coupled group and the affected files/routes are listed explicitly.

- **TOTAL PUBLIC ITEMS AUDITED:** 101
- **ACCEPTED WITH COMPLETE EVIDENCE:** 9
- **RESTORE REQUIRED:** 8
- **UNRESOLVED:** 64
- **CONFLICTS:** 8
- **DUPLICATES:** 5
- **ORPHANS:** 2
- **X_REMOVE CANDIDATES:** 5

- **EXISTING X ITEMS:** 12 (`X01`–`X12`)
- **NEW X ITEMS:** 39 (`X13`–`X51`)
- **CLEARED X ITEMS:** 0
- **TOTAL ACTIVE X ITEMS:** 51

Earlier source-recovery connections for X05, X07, X08, X09 and X12 identify current code owners, but the underlying Hero-2 lock does not approve their wording and the completed Golden/Hero-wise Q&A corpus is unavailable. Under this audit's stricter evidence gate, those IDs remain active and unresolved.

## Evidence actually inspected

| Evidence | Provenance / ordering | KHEM status used | Result |
|---|---|---|---|
| Golden Authority Register v1.0 | Current control index | INDEX ONLY | Read completely; never used as sole proof. |
| `stash@{0}^3:docs/Website/SITARAM_HERO_2_RITUAL_SERVICES_v1.1_FINAL_LOCK.md` | Approved 2026-07-23; recovered Aug-5 stash | LOCKED (historical SITARAM name is provenance only) | Directly proves Hero-2 artwork and specified layout invariants. |
| `stash@{0}^3:.codex-validation/.../SITARAM_HERO1_MASTER_LOCK_v1.1.md` | Recovered Aug-5 stash | LOCKED reference | Proves Hero-1 shared-grid, asset separation, eight visible prompts plus a claimed 171-entry approved corpus. |
| `stash@{0}^3:docs/approved-content/Hero_1_Explore_Content_LOCKED_v1.0.md` | Recovered Aug-5 stash; later than basic Hero lock content | LOCKED content | Proves Hero-1 Explore/main-page text, process, FAQ and AI boundaries. |
| Named `KHEM_PitruMoksha_Gaya_Main_Online_Content_Refined_v1.1.xlsx` | Named by register | AUTHORITY SOURCE NOT AVAILABLE IN WORKSPACE | No workbook in working tree, HEAD, `stash@{0}^3`, or listed recovery evidence. |
| Vahi approved DOCX files in `stash@{0}^3:docs/approved-content/vahi/` | Aug-5 recovery evidence | APPROVED-CONTENT evidence | Binary files exist, but no version-selection/complete extraction proves the exact current composite. |
| Six Core Chapters (MEM/AOM/KPL/WPB/DBB/DPB) | Named governance sources | AUTHORITY SOURCE NOT AVAILABLE IN WORKSPACE | `KHEM_MISSING_CONTENT_REGISTER.md` confirms all six primary manuals absent. |
| Completed Golden Q&A / 171-entry Hero-1 corpus | Claimed by locks/register | AUTHORITY SOURCE NOT AVAILABLE IN WORKSPACE | Active stores are smaller and lack publication/version provenance. |
| `KHEM_PROTECTED_IMPLEMENTATION_REGISTER.md` and final disposition register | Reconstruction governance, Aug-2026 | APPROVED BASE / architecture only | Proves architectural constraints, not exact public copy or visual implementation. |
| Current live `apps/web` | Canonical application per register | CURRENT, dirty tree | Comparison candidate only; not accepted by existence. Not modified. |
| Review copy | Recovered implementation | CURRENT RECOVERY CANDIDATE | Exact audited runtime source; current imports do not establish authority. |
| Dated/X_REMOVE backups and recovery files | Aug-2 through Aug-5 | HISTORICAL | Used only for ordering and conflict detection. |
| Review screenshots | Generated verification images | VISUAL CORROBORATION ONLY | Cannot establish owner, approval or route ownership. |
| `PUBLIC_LANDING_PAGE_CORRECTION_MASTER_2026-08-14.docx` | Newer reconstruction document | FOUNDER REVIEW / unproven authority | Newer date did not upgrade it over explicit locks. |

## Complete shell and shared-framework audit

| Item / exact current file | Identity and owner evidence | Dependencies / runtime / visual finding | KHEM status | Decision |
|---|---|---|---|---|
| Canonical review application | Register §4.1 identifies `apps/web`; review copy is an isolated candidate | Next App Router root | APPROVED BASE identity | ACCEPT (application identity only) |
| Root outer composition — `src/app/layout.tsx` | Protected PI-02/03/04 proves one fixed Header/Sidebar/Footer architecture | Header and Footer are global; Sidebar is injected by each `PublicHeroShell`, not root layout | APPROVED BASE architecture; exact composition unproven | UNRESOLVED X13 |
| Header — `src/components/auth/PublicHeader.tsx` | Fixed Header architecture is protected; exact code/copy has no matching primary lock | Hidden on route patterns; mobile links differ from sidebar/config; uses Logo Two while logo governance describes Logo Three as company mark | CURRENT / unproven | CONFLICT + X14 |
| Sidebar — `src/features/public-shell/components/PublicHeroSidebar.tsx` | Component-folder owner is selected by disposition ES-05 | Driven by reconstructed hierarchy; mojibake icons; not present on pages that omit `PublicHeroShell` | APPROVED BASE owner, exact hierarchy unproven | UNRESOLVED X15 |
| Footer/copyright — `src/components/auth/BusinessFooter.tsx` | Fixed Footer and four-column config are protected | Runtime is six columns plus non-persisting Subscribe form; config declares four columns; current-year output is dynamic | APPROVED BASE owner, implementation conflict | CONFLICT + X16 |
| Logo system — `khem-logos.config.ts` and three assets | Config declares roles but underlying Founder brand approval is not available | Header/Footer use Logo Two, contradicting config comment that Logo Three is master company logo | CURRENT claim only | CONFLICT + X17 |
| Global tokens — `globals.css`, navigation token object, CSS modules | Peacock/gold family corroborated by Hero-1 lock/screenshots | Several parallel token values and component-local colours; exact dimensions/alignment not source-traced | APPROVED BASE family only | UNRESOLVED X18 |
| Responsive shell/grid — `PublicHeroShell.module.css` | Hero-1 lock proves master grid principles | Exact breakpoints, heights and spacing derive from current CSS/backups without signed selection evidence | CURRENT / historical candidates | UNRESOLVED X19 |
| Inner Hero owner — `features/hero/*` plus `features/public-shell/components/HeroSlide.tsx` | Disposition demands one canonical owner after comparison | Parallel Hero/public-shell renderers and CSS remain; import activity alone is not authority | APPROVED BASE target | DUPLICATE + X20 |
| AI panel — `HeroAssistantPanel.tsx` → `GenZRitualAIEngine.tsx` | Contextual AI is protected; AOM/KPL absent | `sourceMode="hero"` blocks runtime retrieval for Hero panels, but prompts have no publication metadata | STRUCTURE READY | UNRESOLVED X21 |
| Explore section | Hero-scoped ownership required; H1 has locked Explore evidence | Other Heroes use current data without locks | Mixed LOCKED/current | UNRESOLVED X22 |
| Core-services area | H1 lock proves reusable six-item band; current reconstructed data uses multiple ten-item Hero-specific lists | `GoldenCoreServicesBand` and other band implementations coexist | Conflict with locked shared six-item description | RESTORE_REQUIRED + X23 |
| Carousel/arrows | Hero-1 and Hero-2 locks prove arrows outside combined grid and synchronized Hero/AI/Explore | Current CSS visually implements external arrows, but duplicate implementations and no all-width source match remain | LOCKED invariant / unproven exact code | UNRESOLVED X24 |
| Floating/inner page shell — `StaticBusinessHeroPage`, `BusinessPageShell`, `FuturePathPage` | Fixed inner-page architecture is approved base | Three frameworks compete; route-specific owner selection is not documented | APPROVED BASE target | DUPLICATE + X25 |

## Five-Hero evidence matrix

### Hero 1 — PitruMoksha Gaya

| Element | Exact current owner | Evidence comparison | Decision |
|---|---|---|---|
| Identity and main route | `homepageHeroSlides.ts`; `/pitru-moksha-gaya` | Identity/route and `Daan. Dharma. Moksha.` are locked | ACCEPT |
| Artwork/logo | `Hero_1_Gaya_Temple_Background_v1.0.png`, separate Logo Three | Separate artwork/logo is required by lock; asset identities match named roles, but current artwork has no hash linkage to locked package | UNRESOLVED X26 |
| Hero copy | `homepageHeroSlides.ts` | Current `Distance, Never Stops Devotion.` punctuation differs from locked `Distance Never Stops Devotion.`; Explore sentence also differs | RESTORE_REQUIRED |
| Q&A/prompts | base and homepage Hero datasets | Eight current prompts exist; claimed 171 approved entries and version/publication evidence do not | UNRESOLVED X27 |
| AI opening/guidance | homepage data | Current text is plausible but not found verbatim in inspected locks | UNRESOLVED X28 |
| Explore | homepage data | Exact locked Explore content exists and current wording is not exact | RESTORE_REQUIRED |
| Core services | homepage data / core band | Current ten-item scheme conflicts with locked reusable six-item band | RESTORE_REQUIRED (controlled by X23) |
| Main inner content | `PitruMokshaGayaMainContent` and five data files | Large active composite overlaps locked Explore master but lacks a section-by-section provenance map | UNRESOLVED X29 |
| Online child | `OnlineAncestralPage` | Named refined workbook unavailable; current page uses parent Hero artwork as a full page Hero rather than proven contextual banner | UNRESOLVED X30; artwork coupling RESTORE_REQUIRED |
| Offline child | `FuturePathPage` | Register explicitly says Offline not reviewed | UNRESOLVED X01 |

### Hero 2 — Ritual Services

| Element | Exact current owner | Evidence comparison | Decision |
|---|---|---|---|
| Identity and route | homepage Hero data; `/ritual-services` | Title and required purpose description are evidenced | ACCEPT (identity/route only) |
| Artwork | homepage uses `ihero2-ritual-services.png` | Permanent lock requires `/images/hero/hero2-ritual-services.png` | RESTORE_REQUIRED; exact wrong-version connection |
| Logo | No Hero-specific logo | Lock says other logos unchanged but does not prove a Hero-2 logo | UNRESOLVED X31 |
| Hero content/location layout | `homepageHeroSlides.ts` | Lock proves selected locations in two semantic rows and Nepal-only emphasis; current text has mojibake and approval provenance for list/copy is incomplete | CONFLICT + X32 |
| Q&A answers | exported base prompts connected into homepage data | Direct Hero-2 lock does not approve Q&A wording; runtime has competing wording | UNRESOLVED X04–X11 |
| AI opening guidance | `ritualServicesInitialGuidance` | Current Hero-specific owner exists, but lock/AOM/KPL approval does not | UNRESOLVED X12 |
| Explore/core services | homepage data | No inspected Hero-2 master approves exact values | UNRESOLVED X33 |
| Main inner page | `RitualServicesPage.tsx` | Separate detailed content and a second Q&A set exist with no direct master/version map | CONFLICT + X34 |
| Online child | route-local `BusinessPageShell` data | No route-owned artwork or page master located | UNRESOLVED X02 + X35 |
| Offline child | route-local `BusinessPageShell` data | No route-owned artwork or page master located | UNRESOLVED X03 + X36 |

### Hero 3 — Travel Assistance

| Element | Exact current owner | Evidence comparison | Decision |
|---|---|---|---|
| Identity/route | homepage data; `/travel-assistance` | Broad India/Nepal identity is protected and narrow Pitru-only variant is superseded | ACCEPT (identity/route only) |
| Artwork/logo/copy | `Hero_3_Airport_Arrival_Photo_v2.1_Clean.png`; no logo | Founder Draft may support provenance but cannot lock exact content/art | UNRESOLVED X37 |
| Q&A/AI guidance | homepage prompts plus runtime travel category | Different stores overlap; no published Hero-wise corpus/version | UNRESOLVED X38 |
| Explore/core/navigation | homepage data/config | No direct Hero-3 lock inspected | UNRESOLVED X39 |
| Main inner page | `TravelAssistanceContent.tsx` | Broad destination content is current but exact approval is not established | UNRESOLVED X40 |
| Request/success children | `/travel-assistance/requests`, `/travel-assistance/success` | Request route is private operations data but route-level authorization evidence is absent; success copy unproven | CONFLICT + X41 |

### Hero 4 — Vahi Records

| Element | Exact current owner | Evidence comparison | Decision |
|---|---|---|---|
| Identity/route | homepage data; `/vahi-records` | Five-Hero identity and privacy boundary are protected | ACCEPT (identity/route only) |
| Artwork/logo | `vahi-records-ledger.jpg`, Pitru logo | Approved Vahi DOCX/assets exist in stash, but no evidence selects this ledger image or Pitru logo for Vahi | UNRESOLVED X42 |
| Hero copy/Q&A/AI/Explore/core | homepage data | Exact content has no version/publication record; Vahi provenance classes are not separated in AI data | UNRESOLVED X43 |
| Main inner page | `VahiApprovedContent.tsx` | Name says Approved, but two larger competing Vahi components and several DOCX versions exist; no exact extraction/hash map | DUPLICATE + X44 |
| Child/floating pages | None established | Missing Content MC-11 confirms route contract absent | UNRESOLVED X45 |

### Hero 5 — Religious Partner

| Element | Exact current owner | Evidence comparison | Decision |
|---|---|---|---|
| Identity/route | homepage data uses ID `religious-partner-network`; `/religious-partners` | Register calls this H5 while asset filename says `Hero_6`; identity/route are protected, numbering conflicts | ACCEPT identity; CONFLICT numbering |
| Artwork/logo/copy | `Hero_6_Religious_Partner_Network_Five_Priests_v2.0.png`; no logo | No explicit H5 current asset/content lock available | UNRESOLVED X46 |
| Q&A/AI/Explore/core | homepage data plus runtime partner category | No public publication/version provenance; public/private partner boundary cannot be proved per answer | UNRESOLVED X47 |
| Main inner page | `ReligiousPartnersContent.tsx` | Extensive onboarding content is current only; final public master absent | UNRESOLVED X48 |
| Registration/tracking dependencies | `/register`, `/tracking`, partner APIs | Registration is intentionally unavailable; tracking shares service/registration projection; no approved H5 journey master | UNRESOLVED X49 |

## Every public inner, child and floating route

Hero routes and their children are audited above. The remaining route tree is audited here. `ACCEPT` below applies only to a route identity explicitly established by the register; content requires its own decision.

| Route | Current page/owner | Runtime/coupling and evidence finding | Decision / X |
|---|---|---|---|
| `/` | `BusinessHome` → `PublicHeroShell`/Golden carousel | Correct homepage role; exact shell/Hero composition controlled above | ACCEPT identity; dependent on X13–X24 |
| `/about` | route-local content | Route class is required; no approved exact About source | UNRESOLVED X50 |
| `/contact` | route-local inquiry form | Route class is required; form action/persistence and exact copy are not provenance-backed | UNRESOLVED X51 |
| `/founder-support` | route-local content/form | Required support class; queue/persistence is explicitly unclear in IC-24 | UNRESOLVED X51 |
| `/privacy-policy` | route-local text | Route name required; no legal approval/version/effective-date source | UNRESOLVED X50 |
| `/terms` | route-local text | Route name required; no legal approval/version/effective-date source | UNRESOLVED X50 |
| `/booking-terms` | route-local text | Route name required; no legal approval/version source | UNRESOLVED X50 |
| `/cancellation-policy` | route-local text | Route name required; no approved cancellation/refund authority | UNRESOLVED X50 |
| `/complaint` | route-local form | Required route; persistence/owner unclear per IC-22 | UNRESOLVED X51 |
| `/grievance` | route-local form | Required route; persistence/owner unclear per IC-23 | UNRESOLVED X51 |
| `/services` | public request form + `PublicCatalog` | Public booking identity is accepted, but catalog/pricing source and POST behavior are not; backend booking owner is missing (IC-17) | UNRESOLVED X51 |
| `/services/[slug]` | `PublicServiceDetail` | Dynamic public data is API-coupled without publication/provenance gate | UNRESOLVED X51 |
| `/tracking` | URMS client | Both Track Service Request and Track Registration ID point to the same page despite required separate projections | CONFLICT + X49 |
| `/knowledge-center` | route-local cards | Required class exists, but it is navigation cards rather than a proven published knowledge corpus | UNRESOLVED X51 |
| `/zen-g` | runtime `GenZRitualAIEngine` | Runtime store mixes current knowledge, booking and inquiry prompts without Golden publication metadata | UNRESOLVED X51 |
| `/pitru-moksha` | legacy intake flow | Parallel route is fenced IC-11 and not selected as canonical alias | ORPHAN + X51 |
| `/pitru-moksha/success` | route-local success | Coupled to legacy flow and returns to `/pitru-moksha`; content authority absent | ORPHAN + X51 |
| `/login` | auth flow | Public action is expected; exact pre-trial behavior is architecture-dependent | UNRESOLVED X51 |
| `/register` | `UnavailableAuthFlow` | Intentionally unavailable, but H5 registration CTA dependencies conflict with unavailable flow | CONFLICT + X49 |
| `/forgot-password` | `UnavailableAuthFlow` | Exact public status copy has no approval evidence | UNRESOLVED X51 |
| `/reset-password` | `UnavailableAuthFlow` | Exact public status copy has no approval evidence | UNRESOLVED X51 |
| `/verify-email` | `UnavailableAuthFlow` | Exact public status copy has no approval evidence | UNRESOLVED X51 |
| `/travel-assistance/success` | route-local success | Operational owner/copy unproven | UNRESOLVED X41 |
| `/route-index` | route matrix including internal routes | No public-navigation evidence authorizes publishing internal/ERP route inventory | CONFLICT + X51 |
| `/_not-found`, loading/error states | framework route files | Generic current UI has no KHEM content/visual approval | UNRESOLVED X51 |

### Public/internal boundary routes discovered

The following are not accepted as public website content. They were nevertheless audited because they are present in the same route tree and `/route-index` exposes internal links: `/admin`, `/admin/services`, `/admin/service-categories`, `/dashboard`, `/reports`, `/requests`, `/customers`, `/customers/new`, `/customers/[id]`, `/customers/[id]/edit`, `/bookings`, `/bookings/new`, `/bookings/[id]`, `/bookings/[id]/edit`, `/partners`, `/partners/new`, `/partners/[id]`, `/partners/[id]/edit`, `/pitru-moksha/requests`, and `/travel-assistance/requests`.

No middleware file or server-enforced route guard was found in the review app. Conditional Header/Footer hiding is not authorization. These routes expose or mutate operational/customer/partner data through client services and therefore conflict with PI-08–PI-11 until server authorization is proven. **Decision: CONFLICT, controlled by X51.** The stray `src/app/partners/page.tsxx` is a **DUPLICATE/X_REMOVE_CANDIDATE** after dependency verification.

## AI, Q&A and knowledge ownership audit

| Store/component | Current role | Evidence/provenance result | Decision |
|---|---|---|---|
| `features/hero/data/heroSlides.ts` | Base Hero prompts | Current source; no version/publication fields | UNRESOLVED X27/X38/X43/X47 |
| `features/hero/data/homepageHeroSlides.ts` | Active five-Hero presentation | Layered overrides; current import is not approval | UNRESOLVED |
| `components/business-pages/*` local prompt arrays | Inner-page Q&A | Duplicate answers diverge from base and runtime stores | DUPLICATE |
| `features/ai/knowledge/ai-knowledge.ts` | Runtime category tree | Includes booking/inquiry/private-operation-oriented prompts; not a Golden corpus | UNRESOLVED X51 |
| `semantic-search.ts` | Runtime search index | Hand-authored current data with no published source metadata | UNRESOLVED X51 |
| Golden Q&A | Expected Founder/Admin published dataset | AUTHORITY SOURCE NOT AVAILABLE IN WORKSPACE | UNRESOLVED X27/X51 |
| Knowledge Centre | Expected separately published source | No article corpus or approval metadata present | UNRESOLVED X51 |
| Public-research Q&A | Expected separate source class | No identified dataset/provenance register | UNRESOLVED X51 |
| Runtime fallback | Engine fallback/escalation | Constrained in places, but no AOM and no consistent AI mistake notice across contexts | UNRESOLVED X21/X51 |
| Operational data boundary | Client services | No direct AI imports of ERP stores found, but absence of AOM/security proof prevents acceptance | UNRESOLVED X51 |

## Public asset audit

All 18 files under review `public/` were hashed and reference-searched.

| Asset class | Evidence and runtime result | Decision |
|---|---|---|
| `hero2-ritual-services.png` | Explicitly locked Hero-2 asset; referenced by inner pages but not homepage Hero-2 | ACCEPT asset identity; RESTORE_REQUIRED connection |
| `ihero2-ritual-services.png` | Active homepage Hero-2 image; no lock selecting it | UNRESOLVED / wrong-version connection |
| `Hero_1_Gaya_Temple_Background_v1.0.png` and Pitru logo | Names align with separate locked roles; no locked hash map available | UNRESOLVED X26 |
| `Hero_1_PitruMoksha_Gaya_Final_v2.0.png` | Referenced by Online page as full Hero; route ownership not proven | UNRESOLVED X30 |
| Hero-3 artwork | Current filename/version only; Founder Draft cannot lock it | UNRESOLVED X37 |
| Hero-5 asset named Hero 6 | Numbering conflict and no H5 lock | CONFLICT X46 |
| Vahi ledger and X_REMOVE Vahi representative | Competing candidates; approved DOCX extraction does not select either conclusively | UNRESOLVED X42 |
| Logo Three duplicated in `images/brand` and `images/hero` | Byte-identical SHA-256 `E0A51A...A15A7`; brand copy unused | DUPLICATE |
| Golden lotus SVG / Peacock emblem | Current references/config claims; underlying brand approval unavailable | UNRESOLVED X17 |
| Five root `X_REMOVE_*.svg` starter assets | Zero references; replacement/non-use proven, but physical removal still requires cleanup authorization | X_REMOVE_CANDIDATE (5 items) |
| `X_REMOVE_hero2-ritual-service.png` and `X_REMOVE_Hero_4...png` | Zero active references, but historical evidence/alternative authority not fully closed | HISTORICAL; retain, not counted among current X_REMOVE candidates |
| Fonts | Arial/Helvetica global and Georgia local references; no bundled KHEM font authority | UNRESOLVED X18 |
| Icons | Emoji/mojibake plus inline SVG business icons; exact icon master absent | UNRESOLVED X15/X18 |

## Numbered RED-X control register

### Existing X items preserved

| X-ID | Route | Component/page and exact location | Unproven/missing; expected owner/class | Evidence searched | Current fallback/wrong source; why not accepted |
|---|---|---|---|---|---|
| X01 | `/pitru-moksha-gaya/offline` | Hero media | Offline route-owned image; page-specific APPROVED/LOCKED source | Current assets/config, Hero locks, stash, backups | Marker retained; register says Offline was not reviewed. |
| X02 | `/ritual-services/online` | Hero media | Online route-owned image; route master | Current/stash assets, Hero-2 lock | Marker retained; parent artwork cannot establish child ownership. |
| X03 | `/ritual-services/offline` | Hero media | Offline route-owned image; route master | Same as X02 | Marker retained; no route-owned evidence. |
| X04 | `/`, `/ritual-services` | Hero-2 answer: Which rituals are available? | Published Hero-wise Q&A | Base/homepage/inner/runtime stores, Hero-2 lock, KPL search, stash | No approved answer located; marker remains. |
| X05 | `/`, `/ritual-services` | Hero-2 answer: Which ritual is right for my need? | Published Hero-wise Q&A | Same evidence set | Current base answer lacks publication/lock provenance. |
| X06 | `/`, `/ritual-services` | Hero-2 answer: How does booking work? | Published Hero-wise Q&A | Same evidence set | Related page/runtime steps do not establish the Hero-owned approved answer. |
| X07 | `/`, `/ritual-services` | Hero-2 answer: What information is required? | Published Hero-wise Q&A | Same evidence set | Current base answer lacks publication/lock provenance. |
| X08 | `/`, `/ritual-services` | Hero-2 answer: Are Religious Partners verified? | Published Hero-wise Q&A | Same evidence set | Current base and inner answers conflict and lack publication metadata. |
| X09 | `/`, `/ritual-services` | Hero-2 answer: Can rituals be arranged online? | Published Hero-wise Q&A | Same evidence set | Current base, inner and runtime variants conflict. |
| X10 | `/`, `/ritual-services` | Hero-2 answer: Can I request a custom ritual? | Published Hero-wise Q&A | Same evidence set | Only lower-priority inner/runtime candidates were found; marker remains. |
| X11 | `/`, `/ritual-services` | Hero-2 post-inquiry answer | Published Hero-wise Q&A | Same evidence set | No approved Hero-owned post-inquiry answer located; marker remains. |
| X12 | `/`, `/ritual-services` | Hero-2 initial guidance | Approved Hero-wise opening | Same sources plus AOM search | Route-specific current string exists but has no approval evidence. |

### New X items

| X-ID | Route(s) / component | Exact location and unproven item | Expected owner / authority | Evidence searched | Current fallback / rejection reason |
|---|---|---|---|---|---|
| X13 | All public routes / root layout | Exact outer-shell composition | WPB / LOCKED shell | Locks, protected register, current/live layouts | Architecture proven, exact composition not. |
| X14 | Header | Exact content, links, visibility rules | LOCKED Header/brand master | Configs, locks, screenshots | Current local array/config divergence. |
| X15 | Sidebar | Recovered hierarchy/icons/all-route presence | LOCKED navigation | Current/live configs, tests, recovery source | Self-labelled config and mojibake are insufficient. |
| X16 | Footer | Six-column layout, copyright, Subscribe/social actions | LOCKED footer/legal/support | Config, locks, current/live | Conflicts with approved-base four-column declaration; Subscribe does nothing. |
| X17 | Global logos | Logo One/Two/Three exact placements | Founder brand lock | Logo config/assets/locks | Config comments conflict with Header/Footer use. |
| X18 | Global visual system | Exact tokens/fonts/icons/dimensions | WPB/design lock | CSS/config/screenshots/backups | Colour family only is corroborated. |
| X19 | Responsive shell | Exact grid/breakpoints/alignment | WPB/Hero visual master | CSS versions/screenshots | No signed version selection. |
| X20 | Hero render owner | Competing Hero/public-shell components | Approved consolidation owner | Imports, disposition, backups | One owner target exists; exact consolidation remains unproven. |
| X21 | AI panel | Exact shell, disclosure, fallback behavior | AOM/KPL | Engine/types/tests/locks | AOM absent; publication metadata absent. |
| X22 | H2–H5 Explore | Hero-scoped content | Hero masters | All Hero data/recovery | Only H1 has direct locked Explore evidence. |
| X23 | Core-services band | Six locked shared items versus ten-item active variants | Hero shared lock | Both datasets/components/lock | Wrong content/version coupling. |
| X24 | Carousel | Exact synchronized runtime/all-width visual | Hero lock/WPB | CSS/components/screenshots | Duplicate versions prevent acceptance. |
| X25 | Inner/floating shell | Three competing frameworks | WPB approved owner | Routes/components/CSS | No route-to-framework authority map. |
| X26 | H1 | Exact asset hash/selection | Hero-1 locked package | Current/stash named assets | Role matches, binary identity not proven. |
| X27 | H1 | 171-entry approved knowledge corpus | Published Golden/Hero Q&A | All Q&A stores/stash | Corpus unavailable; active eight prompts are not equivalent. |
| X28 | H1 | AI initial guidance | Hero-1/AOM approved opening | Hero data/locks | No verbatim authority. |
| X29 | H1 main page | Section-by-section composite provenance | Locked page master | Five data files/backups/Explore lock | Partial overlap does not prove full composite. |
| X30 | H1 Online | Contextual banner and page content | Refined v1.1 workbook | Workspace/HEAD/stashes/register | Named workbook unavailable; parent full artwork used. |
| X31 | H2 | Hero-specific logo decision | Hero-2 lock/brand master | Lock/assets/config | No affirmative logo source. |
| X32 | H2 | Exact copy/location list/emphasis | Hero-2 master | Lock/current/backups | Lock proves layout rule, not current mojibake/list provenance. |
| X33 | H2 | Explore/core content | Hero-2 master | Current/backups/lock | No direct approval. |
| X34 | H2 main page | Detailed content and second Q&A set | Approved inner-page master | Component/runtime/base/stash | Competing unversioned sources. |
| X35 | H2 Online | Complete child-page text/data | Route-specific approved master | Current/stash/register | None found. |
| X36 | H2 Offline | Complete child-page text/data | Route-specific approved master | Current/stash/register | None found. |
| X37 | H3 | Artwork/logo/copy authority | Hero-3 LOCKED/APPROVED master | Current/recovery/docs | Founder Draft cannot be promoted. |
| X38 | H3 | Hero-wise Q&A/opening | Published Hero Q&A/AOM | Hero/runtime/page data | Overlapping sources, no publication provenance. |
| X39 | H3 | Explore/core/nav exact content | Hero-3 master | Current configs/data | No lock. |
| X40 | H3 main page | Detailed content | Approved page master | Component/docs/current/live | Current-only evidence. |
| X41 | H3 children | Request/success ownership and authorization | WPB/DPB/security authority | Routes/services/protected register | Private operations route lacks proven guard. |
| X42 | H4 | Artwork/logo selection | Approved Vahi Hero master | Current assets, stash DOCX inventory, recovery image | Multiple candidates; no selection map. |
| X43 | H4 | Hero copy/Q&A/AI/Explore/core provenance | Approved Vahi content/KPL | Hero/runtime/components/DOCX inventory | Provenance classes are merged. |
| X44 | H4 main page | Exact approved composite | Final Vahi approved source | Three components and multiple DOCX versions | Filename `Approved` is not proof. |
| X45 | H4 children | Child/floating route contract | WPB/Vahi privacy master | Route tree/docs/stash | MC-11 confirms absent. |
| X46 | H5 | Artwork/numbering/logo/copy | H5 Religious Partner master | Current assets/data/docs | Hero-6 filename conflicts with five-Hero numbering. |
| X47 | H5 | Public Q&A/AI/Explore/core | Published Hero Q&A/AOM | Hero/runtime/page data | No publication proof or public/private mapping. |
| X48 | H5 main page | Detailed public onboarding content | Approved RPN public master | Component/protected registers | Current-only content; operational boundary unresolved. |
| X49 | H5/customer tracking | Registration and separate tracking journey | WPB/RPN/URMS approved flow | Routes/config/services | Registration unavailable; both tracking links share one projection. |
| X50 | Company/policy pages | Exact About/Privacy/Terms/Booking/Cancellation copy | Separate approved legal/company sources | Page files/docs/stash | Routes are known; content sources absent. |
| X51 | Public flows/knowledge/security | Contact, support, complaint, grievance, services/catalog, Knowledge Centre, Zen G, auth/status pages, route-index and internal guards | WPB/AOM/KPL/DBB/DPB and approved support/legal owners | All routes, services, types, configs, tests, backend references, missing-content register | Primary manuals absent; persistence/publication/authorization cannot be accepted. |

## WRONG/OLDER VERSION CONNECTIONS:

1. **Hero-2 homepage artwork:** `homepageHeroSlides.ts` connects `ihero2-ritual-services.png`; the 2026-07-23 permanent lock requires `hero2-ritual-services.png`.
2. **Hero-1 Online visual:** the child page uses `Hero_1_PitruMoksha_Gaya_Final_v2.0.png` as a full Hero; the control register requires a contextual Online banner and forbids treating the parent Master Hero as child ownership.
3. **Hero-1 locked text:** active punctuation/copy differs from `Distance Never Stops Devotion.` and the locked Explore sentence.
4. **Core services:** active ten-item Hero-specific lists are connected where the inspected Hero-1 master describes a reusable six-item band.
5. **Hero-2 Q&A:** homepage connects base current-code answers; the inspected permanent Hero-2 lock contains no Q&A approval and the completed approved corpus is missing.
6. **Ritual main-page Q&A:** standalone inner page owns a second, more detailed prompt set, creating two unversioned Hero-2 answer authorities.
7. **Vahi main page:** `VahiApprovedContent` is selected while `VahiRecordsPage`/`VahiRecordsContent` and multiple approved-content DOCX versions coexist without an extraction/version map.
8. **Religious Partner numbering:** five-Hero governance calls this H5, while active artwork is named Hero 6.
9. **Footer:** runtime six-column implementation is connected instead of the config-declared approved four-column navigation structure.
10. **Logo placement:** Header/Footer use Logo Two despite logo governance describing Logo Three as the master company logo for those locations.
11. **Tracking:** both customer service tracking and partner registration tracking are connected to the same projection, contrary to the separation rule.
12. **Internal route exposure:** public `/route-index` lists internal operations routes, and client route hiding is used where server authorization must be proven.
13. **Parallel Pitru flow:** `/pitru-moksha` remains active beside canonical `/pitru-moksha-gaya` although IC-11 says its alias/supersession owner is not selected.

## UNPROVEN "AUTHORITATIVE" CLASSIFICATIONS:

The following labels/comments are not accepted as authority without their underlying approval evidence:

- `KHEM HERO MASTER / PERMANENTLY LOCKED` comments in current `PublicHeroShell.tsx`.
- `KHEM NAVIGATION & VISUAL SHELL PROTECTED SOURCE OF TRUTH` in current config, beyond architecture items independently supported by the protected register.
- `LOCKED EXACT SIDEBAR HIERARCHY`, because it is programmatically altered from `PRE_RECOVERY_SIDEBAR_HIERARCHY` and no primary navigation decision file was found.
- `LOCKED APPROVED FOUR-COLUMN FOOTER`, because runtime does not consume it as its complete layout source.
- `HERO_ONE_CORE_SERVICES` Founder-approved claim, where it conflicts with the inspected six-item Hero lock.
- `VahiApprovedContent` filename/class name.
- “Production Hero Artwork — Preserved KHEM Approved Master” UI disclaimers on inner pages without asset hash/provenance.
- “10 APPROVED CORE RITUAL CATEGORIES” in the Ritual inner page without a located page master.
- Active Hero prompt arrays as “approved” merely because `sourceMode="hero"` is used.
- Runtime `ai-knowledge.ts` responses as Golden Q&A or Hero-owned answers.
- Current `semantic-search.ts` entries as published Knowledge Centre material.
- `PUBLIC_LANDING_PAGE_CORRECTION_MASTER_2026-08-14.docx` as a superseding lock; newer date alone is insufficient.
- Generated review screenshots as content, component, asset-owner or version authority.

## Duplicate, orphan and removal dispositions

### Duplicates

1. Hero/public-shell renderer and CSS trees.
2. Three inner/floating page frameworks without an authority map.
3. Ritual Services Q&A in base Hero, homepage override, inner page and runtime stores.
4. Vahi main-page component families.
5. Byte-identical Pitru logo under both `images/brand` and `images/hero`.

### Orphans

1. Parallel `/pitru-moksha` route pending alias/supersession decision.
2. `/pitru-moksha/success`, coupled to that unselected route family.

### X_REMOVE candidates

The five unreferenced starter SVGs already renamed `X_REMOVE_file.svg`, `X_REMOVE_globe.svg`, `X_REMOVE_next.svg`, `X_REMOVE_vercel.svg`, and `X_REMOVE_window.svg`. This is an audit classification only; no deletion is authorized or performed.

## Completion gate

- **ALL FIVE HEROES AUDITED:** YES
- **ALL INNER/CHILD/FLOATING PAGES AUDITED:** YES
- **OUTER SHELL AUDITED:** YES
- **INNER SHELL AUDITED:** YES
- **HEADER AUDITED:** YES
- **SIDEBAR AUDITED:** YES
- **FOOTER AUDITED:** YES
- **AI/Q&A/KNOWLEDGE OWNERSHIP AUDITED:** YES
- **ALL PUBLIC NAVIGATION AUDITED:** YES
- **ALL PUBLIC ASSETS AUDITED:** YES

## FILES MODIFIED:

- `docs/khem-reconstruction/KHEM_PUBLIC_EVIDENCE_ACCEPTANCE_AUDIT_v1.0.md`

No implementation file was modified during this audit phase. Pre-existing working-tree and review-copy changes were observed only and are not part of this phase.

IMPLEMENTATION MODIFIED: NO

READY FOR EVIDENCE REVIEW: YES

READY FOR REPAIR: NO

READY FOR ERP: NO

**STOP AFTER REPORT — WAIT FOR FOUNDER REVIEW.**
