# KHEM Final Implementation Plan

Scope: implementation planning only. No source, route, schema, auth, runtime, evidence, or Git state was changed. Founder decisions FD-01–FD-07 and the 22 protected implementation items govern this plan.

## 1. Canonical ownership map

| Area | Canonical file/component/config | Current owner | Expected owner | Status | Dependencies | Protected | Action required |
|---|---|---|---|---|---|---|---|
| Header | `components/auth/BusinessHeader.tsx` plus approved shell composition | shell ownership is split; root `features/public-shell/PublicHeroShell.tsx` embeds another header | one `apps/web` shell Header | CORRECT | visual baseline, layout imports | PI-01/02 | trace actual render; retain verified Header only |
| Sidebar | `features/public-shell/components/PublicHeroSidebar.tsx` | component and root duplicates coexist | component-folder shell Sidebar | RECONNECT | navigation config, FD-02 comparison | PI-03 | reconcile verified differences; remove duplicate runtime imports later |
| Footer | `components/auth/BusinessFooter.tsx` | referenced by root duplicate shell; canonical shell composition needs verification | one fixed Footer | RECONNECT | footer config, layout imports | PI-04 | connect once through canonical shell |
| Public shell | `features/public-shell/components/PublicHeroShell.tsx` via `features/public-shell/index.ts` | index already exports component-folder shell; root duplicate remains | component-folder/application-shell composition | CORRECT | Header/Footer integration | PI-01–04 | consolidate verified shell behavior without activating root duplicate |
| HeroCarousel | `features/hero/index.ts` currently exports `components/GoldenHeroCarousel.tsx` | multiple implementations/data trees | one verified consolidated Hero owner | CORRECT | FD-01 behavioral/visual diff | PI-05 | compare, extract verified behavior, update one export/import graph |
| Hero data | target selected after comparing `features/hero/data/homepageHeroSlides.ts` and competing hero data files | at least five sources exist | one typed five-Hero dataset | CORRECT | content/route/asset verification | PI-05/06 | consolidate without inventing content |
| AI panel | `features/hero/components/HeroAssistantPanel.tsx`; full engine at `features/ai/components/GenZRitualAIEngine.tsx` | page and Hero-specific paths coexist | context-synchronized UI using governed answer service | CORRECT | FD-07 publication model | PI-12–14 | separate presentation from approved/fallback provenance |
| Trust | currently embedded in `GoldenHeroCarousel.tsx` for Hero 1 and slide data elsewhere | inconsistent/per-Hero coverage | active-Hero trust data | RECOVER/CORRECT | verified Hero sources | PI-05/06 | map verified trust per Hero; do not synthesize missing values |
| Explore | Hero carousel and slide `primaryHref` | mostly synchronized | active-Hero Explore | KEEP/CORRECT | single slide state | PI-05/07 | validate all five CTA routes |
| Carousel controls | `GoldenHeroCarousel.tsx` and competing carousel/navigation files | duplicate owners | single Hero owner | CORRECT | FD-01 | PI-05 | retain verified keyboard/arrows/dots behavior |
| Core Services | `components/GoldenCoreServicesBand.tsx`, competing `CoreServicesBand.tsx`, config data | current band is not demonstrably Hero-specific | active-Hero Core Services | CORRECT | verified per-Hero sources | PI-05/06 | bind to active slide; leave absent material absent |
| Navigation | `config/khem-navigation.config.ts`; also `config/navigation.ts` | two configs and encoded glyph defects | one approved public/internal route registry | CORRECT | full route inventory | PI-03/07 | reconcile consumers, repair encoding, validate active links |
| Logos | `config/khem-logos.config.ts` and `public/images/brand|hero` | multiple locations/variants | approved contextual logo mapping | KEEP/CORRECT | asset provenance | PI-06 | validate paths, dimensions and use; no asset deletion |
| Knowledge Center | `app/knowledge-center/page.tsx`, AI engine/knowledge/search | page exists; publication metadata absent | published knowledge-only public surface | CORRECT | FD-07 | PI-12–14 | introduce evidence-backed publication filter in later implementation |
| Customer account | `components/dashboard/CustomerDashboard.tsx`, `/dashboard` role dispatch | dashboard exists | authenticated own-data projection | CORRECT | auth and customer-safe APIs | PI-08/09 | remove reliance on broad CRUD endpoints |
| Partner portal | `components/dashboard/PartnerDashboard.tsx`, `/dashboard` role dispatch | full partner dashboard path exists | limited assignment-scoped portal | SUPERSEDE | role, assignment, field authorization | PI-10/11/17 | retain only approved functions; add negative controls |
| ERP/Admin shell | `components/auth/InternalSidebar.tsx`, admin/dashboard/pages | internal wrapper is pathname-driven | authenticated role-guarded internal shell | CORRECT | server-enforced auth | PI-08 | verify every internal route and API guard |
| CRM | `components/crm/CRMLeadManager.tsx`, `services/crm.api.ts`, `/requests` | present | verified CRM owner | KEEP/CORRECT | request API and roles | PI-15 | retain; validate internal-only mutations |
| URMS | `services/urms.api.ts`, types/tests, `/tracking` | present with role-aware projection | verified request/tracking owner | KEEP/CORRECT | API persistence and auth | PI-16 | retain public-safe filtering; validate server authority |
| RPN | religious-partner pages, partner service/hooks, backend partner controller/service/repository | fragmented web/backend implementation | verification and partner-network owner | RECONNECT | FD-03, auth, assignments | PI-17 | connect verification state to portal access |
| Booking | `/bookings/*`, `BookingForm.tsx`, `services/booking.api.ts` | unrestricted internal-style CRUD pages | separate customer-safe booking and ERP CRUD | SUPERSEDE | FD-04, server APIs | PI-08/09 | split surfaces and contracts |
| Customer records | `/customers/*`, `CustomerForm.tsx`, customer service/backend routes | bulk internal-style CRUD | separate customer account projection and ERP CRUD | SUPERSEDE | FD-04, object authorization | PI-08/09 | separate routes/components/APIs without data migration assumption |
| Quotation | `QuoteGeneratorModal.tsx`, `services/quote.api.ts` | partial UI/service | authorized internal issue plus customer approval | RECONNECT | request/booking state | PI-08 | map approval and immutable versions |
| Payment | `PaymentCheckoutModal.tsx`, `services/payment.api.ts` | component/service present; route inventory incomplete | scoped checkout and finance reconciliation | RECONNECT | booking, provider callbacks | PI-08 | verify endpoints, secrets and role boundaries |
| Support/contact | contact and inquiry components/services | multiple public forms/channels | validated intake to CRM/URMS | KEEP/CORRECT | consent and identifiers | PI-08 | connect submission, confirmation and audit |
| Tracking | `app/tracking/page.tsx`, `services/urms.api.ts` | public role-aware lookup implemented client-side | secure server-enforced customer-safe projection | CORRECT | rate limiting/object disclosure | PI-09/16 | validate backend enforcement and enumeration resistance |
| Complaint | `app/complaint/page.tsx` | primarily visible form/content | persisted controlled case flow | RECONNECT | support API/status/auth | PI-08 | connect validated submission and own-case tracking |
| Grievance | `app/grievance/page.tsx` | primarily visible form/content | restricted grievance case flow | RECONNECT | case authority/audit | PI-08 | connect without leaking case data |
| Founder Support | `app/founder-support/page.tsx` | visible escalation page | restricted audited escalation queue | RECONNECT | identity/validation/role | PI-08 | connect intake and safe status |
| `master-vault` | `config/khem-master-vault.ts` | local config object exists despite unestablished external relationship | isolated, noncanonical | BLOCKED / SOURCE NOT ESTABLISHED | consumer graph, owner, threat model | PI-19 | investigate only; no dependency/removal |

Paths above are relative to `apps/web/src` unless prefixed otherwise.

## 2. Customer-facing route plan

| Route | Current status | Approved target | Current → target component | Data / AI / asset / navigation source | Action and dependencies |
|---|---|---|---|---|---|
| `/` | Active through `BusinessHome` | synchronized five-Hero workspace inside fixed shell | `BusinessHome` + exported `GoldenHeroCarousel` → verified consolidated Hero | Hero data candidates; approved images; KHEM navigation | CORRECT after FD-01 comparison |
| Hero 1 | Active | PitruMoksha Gaya context | consolidated Hero | verified slide/PMG assets; Pitru AI | KEEP/CORRECT trust/Core Services sync |
| Hero 2 | Active | Ritual Services context | consolidated Hero | verified slide/ritual image; ritual AI | KEEP/CORRECT sync |
| Hero 3 | Active | broad India/Nepal Travel | consolidated Hero | verified travel slide/image; travel AI | SUPERSEDE any narrow Pitru-only data |
| Hero 4 | Active | privacy-safe Vahi | consolidated Hero | verified Vahi image/content; Vahi AI | CORRECT content/image provenance and privacy |
| Hero 5 | Active | Religious Partner registration | consolidated Hero | verified partner image/content; partner AI | CORRECT label/route and limited-portal handoff |
| `/pitru-moksha-gaya` | Active | fixed landing plus verified detail | `StaticBusinessHeroPage` + `PitruMokshaGayaMainContent` | main content/data; Hero 1 context/assets/nav | KEEP; validate against approved content |
| `/pitru-moksha-gaya/online` | Active | verified online inner page | `OnlineAncestralPage` | embedded prompts/content | CORRECT Q&A publication classification |
| `/pitru-moksha-gaya/offline` | Active | verified offline inner page | `FuturePathPage` | local content/CSS; route constant | KEEP/CORRECT links |
| `/pitru-moksha` and request/success | Parallel legacy/business flow | either reconnect as approved intake alias or supersede after route analysis | page + `EnquiryForm` + request pages | pitru API/types | BLOCKED pending redirect/data-flow compatibility; do not delete |
| `/ritual-services` | Active | fixed landing | `StaticBusinessHeroPage` + `RitualServicesPage` | ritual content, Hero 2 context | KEEP/CORRECT shell/Q&A |
| `/ritual-services/online` | Active | verified online child | `BusinessPageShell` | page-local content | KEEP; validate AI and forms |
| `/ritual-services/offline` | Active | verified offline child | `BusinessPageShell` | page-local content | KEEP; validate AI and forms |
| `/travel-assistance` | Active | broad fixed landing | `StaticBusinessHeroPage` + `TravelAssistanceContent` | broad travel content and Hero 3 | KEEP; remove narrow competing ownership later |
| `/travel-assistance/requests`, `/success` | Active internal/success | authorized ERP request processing and public confirmation | current pages/services | travel API/types | CORRECT auth and transitions |
| `/vahi-records` | Active concise approved content | privacy-controlled landing plus only verified Aug-5 sections | `StaticBusinessHeroPage` + `VahiApprovedContent` | current approved component; legacy Vahi evidence; Hero 4 | RECOVER only section-by-section after content/privacy verification |
| Vahi child/floating pages | No verified live inventory | only evidence-established privacy-safe children | none selected | Aug-5 evidence and current Vahi components | BLOCKED until route/content approval; do not create |
| `/religious-partners` | Active | registration/verification entry | `StaticBusinessHeroPage` + `ReligiousPartnersContent` | Hero 5, form/partner APIs | KEEP/CORRECT verification handoff |
| `/zen-g` | Active | governed GenZ AI | `GenZRitualAIEngine` | knowledge trees/search/URMS | CORRECT FD-07 metadata and fallback disclosure |
| `/knowledge-center` | Active | approved Knowledge Center | page + AI engine | knowledge/search | CORRECT publication filtering |
| `/dashboard` customer | role-dispatched | authenticated own-data account | `CustomerDashboard` | dashboard/customer-safe services | CORRECT FD-04 |
| `/tracking` | Active | scoped safe status | page + URMS service | reference ID/role filter | CORRECT server enforcement/rate limits |
| Customer booking/payment | current CRUD and modals | own booking/actions plus scoped checkout | new customer-safe composition using existing components where verified | booking/payment services | CORRECT/SPLIT; depends on server contracts |
| `/contact` and query variants | Active | validated contact/mail/WhatsApp intake | contact page | navigation config; inquiry service | RECONNECT real submission/audit |
| `/complaint` | Active UI | persisted own-case flow | page → support service | no canonical API established | BLOCKED until case API/owner mapped |
| `/grievance` | Active UI | restricted persisted flow | page → grievance service | no canonical API established | BLOCKED until case API/owner mapped |
| `/founder-support` | Active UI | audited escalation flow | page → Founder queue | no canonical API established | BLOCKED until queue/role mapped |

## 3. Rotating homepage synchronization

The required atomic state is: **Hero Card + Hero AI context + Trust + Explore + arrows/dots + Hero-specific Core Services**. Header, Sidebar and Footer remain outside rotation.

Current break sources requiring later change:

- `features/hero/components/GoldenHeroCarousel.tsx`: current exported owner, but Hero 1 trust is hard-coded and `GoldenCoreServicesBand` is not passed the active slide.
- `features/hero/HeroCarousel.tsx`: competing implementation with different data imports/layout.
- `features/hero/components/HeroCarousel.tsx`: additional competing implementation.
- `features/hero/data/homepageHeroSlides.ts`, `features/hero/data/heroSlides.ts`, `features/hero/heroSlides.ts`, `features/public-shell/data/heroSlides.ts`, `features/public-shell/data/homepageHeroSlides.ts`: competing datasets.
- `features/hero/CoreServicesBand.tsx`, `features/hero/components/CoreServicesBand.tsx`, and `features/hero/components/GoldenCoreServicesBand.tsx`: competing/static bands.
- `features/public-shell/PublicHeroShell.tsx`: competing root shell embeds a Hero and fixed Hero-1 AI panel, breaking synchronized ownership if imported.
- duplicate `features/public-shell/PublicHeroSidebar.tsx` and component-folder Sidebar.

Implementation order: capture behavior/visual fixtures → compare implementations → choose verified state/data contract → make Trust/Core Services slide-derived → consolidate one export/import path → validate five states and fixed shell → only then exclude competing runtime ownership.

## 4. Hero 1–5 implementation matrix

| Hero | Approved content / image / logo source | Component / AI / Trust / Explore / Core source | CTA | Discrepancy | Required action |
|---|---|---|---|---|---|
| 1 PitruMoksha | verified slide data; `Hero_1_Gaya_Temple_Background_v1.0.png`; PMG logos | consolidated Hero; PMG AI tree; current hard-coded trust; verified Core config | `/pitru-moksha-gaya` | trust special-cased; duplicate PMG logo locations | preserve verified design; normalize provenance and active-slide model |
| 2 Ritual | verified slide data; `hero2-ritual-services.png`; no verified separate logo in current slide | consolidated Hero; ritual AI; trust/Core evidence incomplete | `/ritual-services` | missing/empty logo and per-Hero trust/Core mapping | use only verified assets/content; leave unsupported fields absent |
| 3 Travel | broad slide content; `Hero_3_Airport_Arrival_Photo_v2.1_Clean.png` | consolidated Hero; travel AI; travel trust in slide; Core evidence partial | `/travel-assistance` | competing narrow Pitru travel evidence | retain broad identity; supersede narrow source after validation |
| 4 Vahi | verified Vahi representative image preferred after visual check; current also has solemn Shraddh image | consolidated Hero; Vahi context from governed dataset; privacy trust | `/vahi-records` | image/content variants and legacy large page | select only proven image/content; privacy review |
| 5 Religious Partner | verified five-priests image; approved registration identity | consolidated Hero; registration AI; verification trust | `/religious-partners` | filename says Hero 6; portal target now limited | preserve asset if visually approved; align wording and FD-03 handoff |

## 5. Business landing, inner-page and Vahi plan

PitruMoksha Gaya retains its fixed static Hero, main content, online/offline pages, inquiry and CRM/URMS handoff. The parallel `/pitru-moksha` request flow requires compatibility mapping before any redirect or supersession.

Ritual Services retains its landing and online/offline children. Inline/prompt answers must enter the FD-07 content-status inventory before being represented as approved.

Travel Assistance retains the broad landing and request/success flow. Internal request processing must be role-guarded; the generic Pitru-only page/data is superseded only after route and link replacement is proven.

Vahi Records deep mapping:

- Runtime landing: `app/vahi-records/page.tsx` → `VahiApprovedContent.tsx` inside `StaticBusinessHeroPage`.
- Other live components to compare, not wholesale activate: `VahiRecordsContent.tsx`, `VahiRecordsPage.tsx`, `VahiCards.*`, `VahiPriceMatrixAccess.tsx`.
- Aug-5/large legacy evidence may supply only independently verified sections. Each section needs source citation, privacy classification, owner authorization, route decision, and visual review.
- No public bulk Vahi search, lineage enumeration, private record result, price matrix, custodian data, or family details without explicit access policy.
- Child/floating routes remain blocked until exact evidence and privacy approval are established.

Religious Partners retains registration content and forms. Registration state must connect to RPN/Admin verification; only verified users reach the limited portal.

## 6. Customer/ERP data boundary (FD-04)

Current blurred surface:

- `/customers`, `/customers/new`, `/customers/[id]`, `/customers/[id]/edit` use `services/customer.api.ts` (`/customers`) and expose list/create/read/update/delete-style UI.
- `/bookings`, `/bookings/new`, `/bookings/[id]`, `/bookings/[id]/edit` use `services/booking.api.ts` (`/bookings`) and expose list/create/read/update/cancel/delete, customer identity, partner, notes, status and assignment-related fields.
- `PageContent.tsx` places routes not listed as public under `InternalSidebar`, but pathname composition is not a substitute for server authorization.
- Backend explicitly mounts `/api/customers`; booking backend implementation was not present in the inventoried backend source and must be located/established before changes.

Target split:

- Customer self-service: authenticated subject-bound endpoints/components for own profile, bookings, permitted documents, statuses and supported actions.
- ERP/Admin CRUD: bulk list, create/on-behalf-of, internal fields, pricing, assignment, internal status, cancellation/refund authority and deletion under explicit roles.
- Required validation: server object-level authorization, field allowlists, negative cross-account tests, role tests, audit, CSRF/session controls, and data-retention behavior.

## 7. Limited Partner Portal (FD-03)

Current entry is `/dashboard`, which selects `PartnerDashboard.tsx` by role/email heuristic. Partner management CRUD also exists at `/partners/*`, services/hooks, backend controller/service, and a repository under `apps/web/apps/api`.

Retain only: own explicit assignments; own task status/actions; permitted assignment documents; approved communications; own profile/verification state. Exclude: general ERP, URMS/database access, unrestricted/full customer records, other-partner data, admin controls, bulk partner/customer/booking lists, pricing authority, and assignments not explicitly owned.

Files/permissions affected: `app/dashboard/page.tsx`, `components/dashboard/PartnerDashboard.tsx`, `components/auth/AuthProvider.tsx`, `components/auth/InternalSidebar.tsx`, `services/dashboard.api.ts`, `services/partner.api.ts`, `hooks/usePartners.ts`, backend auth/partner controllers/services/routes/types, and the partner repository. Replace email-substring authorization with verified server role plus assignment checks. Do not grant access merely because the UI hides a link.

## 8. GenZ AI / Golden Q&A plan

| Current source | Current evidence class | Required treatment |
|---|---|---|
| `features/ai/knowledge/ai-knowledge.ts` | UNVERIFIED as Golden approval: constant name says approved, but per-answer version/provenance/publication records are absent | inventory every answer; only separately proven records become APPROVED GOLDEN Q&A; otherwise DRAFT/UNVERIFIED |
| `features/ai/knowledge/semantic-search.ts` | UNVERIFIED retrieval path | restrict index to published approved Knowledge records; return source/version |
| `GenZRitualAIEngine.tsx` local Hero prompts | mixed UNVERIFIED/possible approved | require status/provenance before authoritative presentation |
| `GenZRitualAIEngine.tsx` no-answer response | CONSTRAINED FALLBACK candidate | retain non-fabrication behavior; add explicit AI disclosure and audited human escalation |
| `HeroAssistantPanel.tsx` and page-local `assistantPrompts` | mixed UNVERIFIED | route through governed answer contract; no status-by-variable-name |
| page/content FAQs and `exploreContent.ts` | content, not automatically Golden Q&A | classify and approve independently before AI retrieval |
| placeholder strings/forms | PLACEHOLDER UI or content | distinguish input placeholders from answer placeholders; block answer placeholders from approved path |

No Q&A is generated in this plan.

## 9. Approved disposition implementation schedule

| Item | Current location/status | Dependencies | Target/replacement | Safe point | Later physical action |
|---|---|---|---|---|---|
| Full partner dashboard | `PartnerDashboard.tsx`, active by role | FD-03 auth/assignment tests | limited portal | after server guards and parity | preserve/archive; no delete without approval |
| Shared unrestricted customer/booking CRUD | route/service families, internal-style active | FD-04 APIs and tests | split customer/ERP surfaces | after data/API migration and rollback proof | preserve evidence; later active-tree cleanup |
| Generic Pitru-only travel | historical/competing sources | route/content/link audit | broad Travel Assistance | after no incoming runtime references | archive |
| Root Hero duplicate tree | root/duplicate Hero paths | FD-01 consolidation | one Hero owner | after five-state visual/functional parity | remove from active tree after approval |
| Root hard-coded `PublicHeroShell` | `features/public-shell/PublicHeroShell.tsx`, not index owner | shell parity/import audit | component-folder shell | after zero runtime imports | remove from active tree after approval |
| Root Sidebar duplicate | `features/public-shell/PublicHeroSidebar.tsx` | FD-02 reconciliation | component-folder Sidebar | after nav/visual parity | remove from active tree after approval |
| Placeholder Golden Q&A | mixed AI content paths | publication registry/filter | approved answers + disclosed fallback | after negative retrieval tests | archive/restrict editorial evidence |
| Legacy frontend | recovery/history | none for runtime | current `apps/web` | never restore wholesale | archive |
| Competing HeroCarousel | multiple component paths | FD-01 comparison | consolidated Hero | after parity | archive inactive implementation |
| Large legacy Vahi page | Vahi components/evidence | section/privacy approval | current concise landing + verified extracts | section-by-section only | archive wholesale page |
| QRSR/BRM | labels/reports | explicit future definition | CRM/URMS only where verified | no runtime use | preserve terminology evidence |
| Older Hero images | `public/images/hero` and evidence | visual provenance | approved selected assets | after asset mapping | archive unused variants |
| Aug-5 broken stash | historical/recovery | none | never runtime owner | never wholesale restore | archive |

## 10. Protected implementation register expansion

`apps/web/src` is abbreviated as `web`; report files and historical evidence are never allowed change targets during implementation unless separately approved.

| ID / item | Canonical owner; lock reason | Dependencies | Files allowed to change | Files not allowed to change | Validation |
|---|---|---|---|---|---|
| PI-01 apps/web | `apps/web`; prevent root/recovery takeover | build/import graph | canonical web source per approved task | historical/root copies as replacement owners | build and bundle ownership |
| PI-02 Header | canonical shell/Header; fixed global identity | layout/nav/logo | shell/Header/config after visual approval | Hero data/components for Header ownership | all-route shell visual |
| PI-03 Sidebar | component-folder Sidebar; single navigation owner | FD-02/nav | canonical Sidebar/config | root duplicate except later approved exclusion | link/role/visual tests |
| PI-04 Footer | `BusinessFooter`; fixed global close | footer config | footer/shell/config | Hero components for Footer ownership | all-route links/visual |
| PI-05 Hero workspace | consolidated Hero; atomic rotation | FD-01/data/assets | selected Hero components/data/CSS | inactive competitor after consolidation | five-state desktop + interaction |
| PI-06 five identities | canonical slide data; business identity | approved sources/assets | selected slide data/assets references | unsupported content | content/route matrix |
| PI-07 business pages | route page + business component; fixed landings | route inventory | verified page/components | unverified new child routes | route/shell/content review |
| PI-08 public/ERP | server auth/policy; prevent internal exposure | API/auth/schema | guards, split routes/services | public components as authority source | positive/negative role tests |
| PI-09 customer own data | customer-safe APIs; object isolation | identity/ownership | account components/API guards | broad CRUD reused unchanged | cross-account tests |
| PI-10 partner portal | limited portal; FD-03 | verification/assignment | portal and server guards | general ERP/URMS UI as portal | assignment isolation tests |
| PI-11 unverified partner | auth/policy; no operational access | verification state | guards/tests | public registration content unless needed | negative tests |
| PI-12 Golden Q&A | publication registry; prevent false approval | metadata/provenance | AI content model/retrieval/UI | historical Q&A evidence | status/provenance tests |
| PI-13 fallback | AI engine; disclosure/no drafts | FD-07/escalation | engine/UI/service | approved answer text without content approval | fallback/red-team tests |
| PI-14 Knowledge | Knowledge owner; published-only | content status | knowledge page/index/service | draft corpus as public source | retrieval/access tests |
| PI-15 CRM | CRM components/services; verified responsibility | request API/roles | CRM flow/guards | QRSR/BRM mapping by assumption | workflow tests |
| PI-16 URMS | URMS service; verified request/tracking | persistence/auth | URMS API/projection/tests | QRSR/BRM authority | public-safe tracking tests |
| PI-17 RPN verification | partner/RPN owner; gate portal | auth/admin | partner verification/portal guards | registration approval bypass | lifecycle tests |
| PI-18 Vahi privacy | Vahi owner; sensitive lineage protection | owner/purpose/access | approved Vahi page/API/privacy controls | legacy page wholesale | enumeration/object/privacy tests |
| PI-19 master-vault | isolated file; unknown operational relationship | investigation | documentation/tests only if authorized | config consumers/runtime dependency/removal | dependency/security review |
| PI-20 QRSR/BRM | no owner; no authority | future Founder definition | documentation labels only | routes/roles/schema/workflows/reports based on terms | repository authority search |
| PI-21 evidence | docs/backups/stashes; provenance | cleanup approval | none during waves 1–14 | all evidence files | evidence inventory/hash |
| PI-22 no assumption | evidence-control process | citations | only evidence-backed targets | newly invented routes/content/modules | traceability review |

## 11. Source not established

Item: `master-vault` operational relationship. A local `config/khem-master-vault.ts` object exists, but the authoritative owner, real consumers, external-secret relationship, threat model, inventory, and rotation/recovery contract are not established. Nothing new may depend on it; it must not be expanded, removed, or made canonical. It does **not** block shell, Hero, page, data-boundary, portal, or AI work if those waves avoid it. It blocks only vault-dependent implementation and cleanup.

## 12. Implementation waves

| Wave | Objective | Files/areas | Preconditions / actions | Do not touch | Validation | Stop condition |
|---:|---|---|---|---|---|---|
| 1 | Canonical ownership/runtime duplicates | shell/Hero/sidebar import graphs | snapshot; diff; select verified owners | physical deletion/evidence | dependency and bundle graph | ambiguity documented and rollback ready |
| 2 | Shared public shell | layout, Header, Sidebar, Footer, configs | Wave 1; connect fixed owners once | business content | all public routes at desktop widths | no duplicate shell render/import |
| 3 | Hero 1–5 synchronization | Hero components/data/CSS/assets | behavioral/visual matrix | unsupported content | five Hero states, keyboard/dots, atomic context | every rotating region matches active Hero |
| 4 | Business landings | five landing routes/components | Waves 2–3 | inner routes | content, route, shell, CTA tests | five landings approved |
| 5 | Inner/child/floating | verified children; Vahi evidence | exact source/privacy approval | unverified new pages | route and Vahi privacy review | all implemented children evidenced |
| 6 | AI/Knowledge/Q&A | engine, prompts, knowledge/search | publication/provenance model | Q&A text invention | approved/draft/placeholder/fallback negative tests | no false-approved answer path |
| 7 | Customer account/booking separation | customer/bookings pages/services/backend | server identity/role plan | schema destructive changes | object/field/cross-account tests | strict self-service/ERP split passes |
| 8 | Limited Partner Portal | dashboard/auth/partner/assignment | verified partner lifecycle | general ERP/URMS exposure | role/assignment/other-partner negative tests | only approved portal functions reachable |
| 9 | ERP/Admin operations | internal shell, CRM/URMS/RPN, CRUD, quote/payment/support | Waves 7–8 | QRSR/BRM and vault assumptions | workflow, approval, audit tests | approved internal flow works |
| 10 | Navigation/interlinking/buttons | navigation configs, CTAs, sitemap/route index | routes stabilized | historical paths without redirect plan | crawler/link/active-state tests | zero broken approved link |
| 11 | Assets/encoding/references | public assets, CSS/text glyphs | asset inventory | asset deletion | missing asset, encoding, alt/dimension checks | zero broken reference/known mojibake |
| 12 | Technical validation | whole repo | Waves 1–11 | cleanup | lint, typecheck, unit/integration/build/security | all required checks pass |
| 13 | Functional review | end-to-end roles/flows | Wave 12 | cleanup | customer/admin/partner journey tests | no material workflow defect |
| 14 | 100% desktop visual review | every approved public/internal screen | stable build/fixtures | cleanup | screenshot matrix and Founder comparisons | every desktop state reviewed |
| 15 | Founder approval/cleanup/KHEM lock | dispositions/evidence/lock | explicit Founder sign-off | anything not specifically approved | final inventory, regression suite, rollback | Founder authorizes cleanup and lock |

## 13. Material risk register

| Risk | Affected area | Prevention | Validation |
|---|---|---|---|
| Data loss | customer/booking/Vahi/cleanup | migrations/backups/rollback; no deletion in early waves | restore drill and record counts |
| Route breakage | shell, nav, landings, children | route inventory and redirects before consolidation | crawler, sitemap and CTA suite |
| Auth regression | internal/customer/partner | server-enforced role/object policies | positive and negative matrix |
| Customer-data exposure | customer CRUD, tracking, partner portal | own-record projections, field minimization | cross-account/enumeration tests |
| Partner-data exposure | portal/partners | assignment and tenant scope | other-partner negative tests |
| Hero/content regression | carousel/data/CSS | fixture diff and evidence matrix | five-state screenshots/interactions |
| Asset loss | Hero/logo/Vahi images | immutable inventory; no deletion | path/hash/render checks |
| Q&A publication risk | AI/Knowledge | metadata/provenance gate | draft/placeholder/fallback tests |
| ERP/public boundary regression | PageContent/routes/APIs | split contracts and server guards | route/API authorization scan |
| Duplicate runtime ownership | shell/Hero/sidebar/config | single export/import owner; bundle scan | dependency graph and runtime DOM checks |

Detailed executable items and initial statuses are in `KHEM_IMPLEMENTATION_CONTROL_TABLE.md`.

## 14. Implementation gate release set

Gate review fences IC-10 (unapproved Vahi children), IC-11 (parallel legacy `/pitru-moksha` disposition), IC-17 (booking backend owner/contract), and IC-30 (`master-vault`). None is a global blocker. IC-16 is also fenced because the customer/ERP booking split cannot be implemented securely without IC-17's server contract.

The other **24** controls are ready for controlled implementation. They must not import, call, recreate, remove, or otherwise depend on a fenced item. Customer and ERP/Admin implementation remain partial at the release level because the booking split is fenced; the end-to-end implementation is partial until that booking transition has an authorized backend. Shell, Hero, five landings, verified children, AI/Knowledge governance, customer record separation, limited Partner portal, established CRM/URMS/RPN, navigation, assets, and validation work may proceed within their stated dependencies.
