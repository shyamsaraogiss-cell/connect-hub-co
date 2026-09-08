# KHEM Founder Evidence Decision Matrix v1.0

**Date:** 2026-08-18  
**Mode:** Founder evidence review only — no repair, ERP, redesign, deletion, rename or implementation change.  
**Target inspected:** `review/khem-prewebsite/apps/web`  
**Control:** `KHEM_GOLDEN_AUTHORITY_REGISTER_PUBLIC_WEBSITE_v1.0.md`

## Decision rules applied

- **GREEN:** owner, exact source, version/order, KHEM authority and intended connection are all proved. Green may mean “retain as correct”; it does not automatically mean a file must change.
- **AMBER:** evidence presents multiple legitimate choices, exact provenance lacks a final KHEM re-freeze, or a controlling boundary is known but the exact intended implementation connection is not.
- **RED:** the expected authority source is unavailable or never existed in recoverable evidence. Stable X-ID remains active; no fallback is permitted.

The 51 X items resolve to **9 Green, 12 Amber and 30 Red**. Of the Green items, only one separate wrong-version connection—the H2 parent artwork—is a fully proven safe restoration action. Other Green items are verified retain/no-change or classification corrections.

## GREEN — proven disposition

| Item ID | Route / component | Current implementation | Proven authority source | Version / date / commit | KHEM status | Why current is right/wrong | Dependencies | Risk | Final bucket |
|---|---|---|---|---|---|---|---|---|---|
| X15 | Public Sidebar | Component-folder `PublicHeroSidebar` driven by KHEM hierarchy | PI-03; FDISP ES-05; F51 KHEM navigation config | `f51d9e8b`, 2026-08-08 | APPROVED BASE owner | Right owner and intended registry connection; encoding defects are separate | navigation config, shell | Low if retained; high if duplicate reactivated | GREEN |
| X20 | Hero runtime owner | Golden barrel → `GoldenHeroCarousel`; competitors inactive | FDISP ES-02/03; F51; GOLDEN-RUNTIME | `f51d9e8b`; `800225b5`, 2026-08-13 | Adopted Golden runtime owner | Right owner; review-copy content deltas do not change ownership | Hero barrel, public-shell renderer | High if owner is swapped | GREEN |
| X24 | Carousel/arrows | Synchronized active state; arrows outside combined grid | Adopted H1/H2 locks + F51/GOLDEN-RUNTIME | H2 lock 2026-07-23; KHEM adoption 2026-08-08/13 | LOCKED invariant | Right invariant-level connection | Hero state, CSS, AI/Explore | Medium visual regression risk | GREEN |
| X25 | Inner/floating frameworks | `StaticBusinessHeroPage`, `BusinessPageShell`, `FuturePathPage` serve distinct route roles | PI-07 and F51 route/component composition | `f51d9e8b`, 2026-08-08 | APPROVED BASE architecture | Right: these are complementary frameworks, not duplicate owners | route imports, business shells | High if consolidated by assumption | GREEN |
| X26 | H1 parent artwork/logo | Separate Gaya background and Pitru logo | GR §6; adopted H1 lock; GOLDEN-RUNTIME exact assets | `800225b5`, 2026-08-13 | Adopted Golden runtime | Right for parent H1; does not authorize child reuse | Hero data, asset paths | High if parent/child ownership is merged | GREEN |
| X31 | H2 logo requirement | No H2-specific logo connected | H2 lock and asset inventory contain no requirement for a distinct H2 logo | H2 lock 2026-07-23 | No missing requirement | Right/not required; prior X was created from an assumption | H2 layout | Low | GREEN |
| X43 | H4 Hero/Explore/core display | “I am Vahi” and ordered ten-card display | `Vahi_Hero_Cards_Spelling_Corrected.docx`; LANDING-20260814 | Aug-5 stash final path; 2026-08-14 correction | APPROVED-CONTENT evidence | Right for display copy/order; Q&A remains outside this clearance | H4 data, Vahi privacy | Medium if mixed with archived draft | GREEN |
| X44 | H4 main-page owner | `VahiApprovedContent.tsx`; rich alternatives inactive | FDISP ES-09 + VAHI-FINAL + F51 | F51 2026-08-08; later approved disposition | APPROVED privacy-controlled owner | Right owner; large legacy page is historical wholesale | Vahi privacy, inquiry routing | High privacy risk if legacy owner restored wholesale | GREEN |
| X46 | H5 identity/asset numbering | Fifth current Hero uses historically `Hero_6_*`-named asset | GR five-Hero identity; PI-06; GOLDEN-RUNTIME asset adoption | `800225b5`, 2026-08-13 | Adopted asset/current H5 identity | Right: filename retains historical ordinal and does not redefine current identity | Hero data/assets | Low if retained; medium if renamed without approval | GREEN |

### GREEN safe restoration action

| Action ID | Public item | Current connected source | Proven restoration source | Owner/source/version/status/intended connection | Dependencies | Risk | Safe result |
|---|---|---|---|---|---|---|---|
| G-R01 | H2 parent Hero artwork | `ihero2-ritual-services.png` | `/images/hero/hero2-ritual-services.png` | H2 parent owner; permanent H2 lock approved 2026-07-23; exact asset adopted by GOLDEN-RUNTIME `800225b5`; intended parent connection explicit | H2 object positioning, responsive layout, screenshots | Medium visual regression; no content/data risk | **PROVEN SAFE TO RESTORE after separate repair authorization** |

No other implementation restoration is Green. X15/X20/X24/X25/X26/X31/X43/X44/X46 are Green evidence dispositions to retain or correct the audit classification, not instructions to rewrite working code.

## AMBER — Founder decision required

Every Amber item has **YOUR RECOMMENDATION: NONE** and **FOUNDER DECISION REQUIRED: YES**.

### Founder decision record

| Item ID | Founder decision | Recorded status | Implementation authorization |
|---|---|---|---|
| X13 | **OPTION B:** Require the approved master outer-shell composition consistently across every applicable public/customer-facing route. Header, Sidebar and Footer remain independently owned components. Shared shell composition does not mean shared component state or behaviour. | FINAL | CONTROLLED REPAIR AUTHORIZED |
| X16 | **OPTION B:** Enforce the approved `KHEM_FOOTER_NAVIGATION` four-column Footer. Do not include six-column additions, Subscribe or social blocks unless separately approved. Preserve copyright only according to proven KHEM evidence. | FINAL | CONTROLLED REPAIR AUTHORIZED |
| X17 | **OPTION B:** Header and Footer use KHEM Logo Three. Logo Two must not remain in those placements merely because GOLDEN-RUNTIME currently uses it. | FINAL | CONTROLLED REPAIR AUTHORIZED |
| X22 | **OPTION A:** Hero 2–Hero 4 Explore use the exact LANDING-20260814 / VAHI-FINAL evidence. Hero 5 Explore remains RED-X unresolved; do not borrow or invent copy. | FINAL | CONTROLLED REPAIR AUTHORIZED |
| X23 | **OPTION B:** Preserve/restore the locked reusable six-item shared Core Services band. Do not adopt the later ten-item Hero-specific lists unless a proven KHEM supersession/re-lock is found. | FINAL | CONTROLLED REPAIR AUTHORIZED |
| X29 | **OPTION A:** Accept only Hero 1 sections matching the locked H1-EXPLORE authority and gate the remaining mixed-provenance composite content. | FINAL | CONTROLLED REPAIR AUTHORIZED |
| X32 | **OPTION A:** Adopt the exact LANDING-20260814 Hero 2 parent wording and locations as final KHEM content. | FINAL | CONTROLLED REPAIR AUTHORIZED |
| X33 | **OPTION B:** Preserve the earlier locked shared Core Services model for Hero 2. Founder-approved X22 wording remains governed separately. | FINAL | CONTROLLED REPAIR AUTHORIZED |
| X39 | **HYBRID:** Approve the later 2026-08-14 Travel Explore wording while preserving the locked reusable six-item shared Core Services model. | FINAL | CONTROLLED REPAIR AUTHORIZED |
| X41 | **OPTION A:** Keep Travel request management internal with server-enforced guards; approve the public success route separately. | FINAL | CONTROLLED REPAIR AUTHORIZED subject to the proven security contract; no guard mechanism may be invented |
| X49 | **OPTION A:** Maintain separate customer and Religious Partner tracking projections under the KHEM separation rule. | FINAL | CONTROLLED REPAIR AUTHORIZED subject to proven route/API contracts; no endpoint may be invented |
| X51 | **OPTION A:** Split the umbrella item into separately owned WPB, AOM, KPL, DBB and DPB controls before repair decisions. | FINAL | CONTROL DECOMPOSITION AUTHORIZED; each repair remains authority-gated |

| Item ID | Route / component | Current implementation | Option A | Option B | Source for A | Source for B | Which is newer | Which is locked | Customer-facing impact | Technical impact | Security/data impact | Dependencies | Risk | Final bucket |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| X13 | All public routes / outer shell | Header/Footer root-owned; Sidebar page-shell-owned | Treat recovered owner architecture as sufficient and split route-coverage defects separately | Require one universal outer-shell composition before clearance | PI-02–04, F51 | GR outer-shell wording and actual route coverage | GR/audit framing newer; F51 implementation older | PI is approved base; no exact universal placement lock | Inconsistent navigation across routes | Layout ownership/refactor scope | Low direct data risk | layout, every public route | High scope ambiguity | AMBER |
| X16 | Footer/copyright | Six columns, Subscribe/social, dynamic copyright | Retain six-column runtime Footer | Enforce four-column config structure and separately approve extra blocks | `BusinessFooter.tsx`, GOLDEN-RUNTIME/current | `KHEM_FOOTER_NAVIGATION` “approved four-column” config | Runtime evolution is newer in Git; both same KHEM lineage | Fixed Footer owner locked; exact structure not | Footer density, links, trust | Component/config divergence | Subscribe may imply collection without persistence/consent | legal, navigation, contact | High representation risk | AMBER |
| X17 | Global logos | Logo Two in Header/Footer | Keep current Logo Two company-shell placement | Apply config role: Logo Three in Header/Footer | Active Header/Footer, GOLDEN-RUNTIME | `khem-logos.config.ts` | Runtime and config coexisted; no clear supersession | Neither exact placement has a higher signed brand lock | Brand identity changes globally | Asset sizing/layout | No material data risk | Header, Footer, Hero | High brand risk | AMBER |
| X22 | H2–H5 Explore | H2–H4 exact correction copy; H5 current-only | Adopt LANDING-20260814/VAHI-FINAL exact H2–H4 copy and commission H5 evidence | Retain pre-correction/current KHEM bases until explicit re-freeze | LANDING-20260814; VAHI-FINAL | F51/GOLDEN-RUNTIME base data | Correction master is newer | H1 Explore is locked; H2–H5 correction copy is not explicitly re-frozen | Visible Hero CTA/copy differences | Data-only changes but all Hero states affected | No direct data risk | Hero data, routes | Medium content-authority risk | AMBER |
| X23 | Core Services | Hero-specific ten-item bands | Use later ten-item H1–H4 correction lists | Restore earlier reusable six-item shared band | LANDING-20260814 | H1-LOCK adopted by early KHEM | Ten-item correction is newer | Six-item model is explicitly locked historically; later supersession unproved | Major service-card content/navigation change | Renderer/data contract and responsive width | May expose unapproved service claims | all Heroes, Core band | High | AMBER |
| X29 | H1 main page | Large composite from several data versions | Accept only sections matching H1-EXPLORE and gate the rest | Adopt current full composite as KHEM approved page | H1-EXPLORE lock | F51 bulk implementation/current composite | F51 adoption later than source snapshots; exact sections mixed | H1-EXPLORE is locked; full composite is not | Large amount of public ritual guidance | Section-level data mapping | Sensitive ritual claims/privacy | H1 inner page, AI, inquiry | High | AMBER |
| X32 | H2 parent copy/locations | Matches correction master, with encoding defects | Adopt correction-master copy as final KHEM wording | Retain only H2-lock-proven baseline/layout and hold later wording | LANDING-20260814 | H2-LOCK 2026-07-23 | A is newer | B is permanently locked; A lacks explicit re-freeze | Visible copy/location list | Data/encoding correction scope | Verification claims may change | H2 card/trust/location | Medium | AMBER |
| X33 | H2 Explore/core | Exact correction-master content active | Confirm later H2-specific Explore/core as final | Revert/hold under earlier shared-core model | LANDING-20260814 | H2-LOCK + H1 shared-core lock | A newer | Earlier model locked; A not explicitly locked | Service discovery changes | Hero data/core rendering | Unapproved service-scope risk | X23, H2 data | High | AMBER |
| X39 | H3 Explore/core/navigation | Exact correction-master Travel values active | Confirm 2026-08-14 H3 copy/list | Retain only broad India/Nepal identity and hold exact copy | LANDING-20260814 | PI broad Travel identity; GOLDEN-RUNTIME asset | A newer | Neither exact H3 copy set is explicitly locked | Travel positioning/services | Data/navigation changes | Service representation risk | H3 page/AI | Medium | AMBER |
| X41 | Travel request/success boundary | Operational request route exists without proven review-app middleware | Make request route internal with server-enforced guards; separately approve public success | Preserve route unchanged until DPB/guard contract is produced | PI-08–11; FDISP ES-07 | Current route/services | KHEM boundary controls are newer than trial route | Boundary is approved base; exact guard design not locked | Public availability of request management changes | Auth/middleware/backend work | High PII/provider/admin-note exposure risk | auth, backend, DPB | Critical | AMBER |
| X49 | Registration/tracking | Both tracking labels share `/tracking`; registration unavailable | Create separate customer and partner projections under KHEM rule | Keep shared projection temporarily but label/gate it explicitly | GR §11, PI-15–17 | Current Footer/tracking implementation | GR control is newer | Separation rule is current KHEM control; exact endpoints not locked | Tracking journey changes | New route/projection/API contracts | High cross-customer/partner enumeration risk | URMS, RPN, auth | Critical | AMBER |
| X51 | Multiple public/security/knowledge flows | One X aggregates unrelated route, persistence, publication and guard issues | Split into separately owned controls before decisions | Retain X51 as one umbrella blocker | Recovery report/version map | Acceptance audit aggregation | Split analysis is newer | Neither aggregation model is a content lock | Makes review clearer but increases decision count | Requires control-register revision only, then separate repairs | Critical issues may be obscured if umbrella remains | WPB/AOM/KPL/DBB/DPB | High governance risk | AMBER |

For each row above: **YOUR RECOMMENDATION: NONE. FOUNDER DECISION REQUIRED: YES.**

### Amber authority/status supplement

This supplement completes the mandatory per-item authority fields; it is read together with the Option A/B table above.

| Item ID | Proven authority source | Version / date / commit | KHEM status | Why current is wrong / right | Your recommendation | Founder decision required |
|---|---|---|---|---|---|---|
| X13 | PI-02–04 and F51 for owner architecture; GR for outer-shell scope | F51 `f51d9e8b`, 2026-08-08; current GR | APPROVED BASE owner / unresolved universal coverage | Fixed owners are right; the single X incorrectly combines ownership with route coverage | NONE | YES |
| X16 | PI-04/F51 owner; runtime Footer and four-column config compete | F51 2026-08-08; GOLDEN-RUNTIME 2026-08-13 | APPROVED owner / exact structure conflict | Owner is right; six-versus-four-column presentation is unresolved | NONE | YES |
| X17 | KHEM logo config versus adopted Header/Footer | F51 2026-08-08; GOLDEN-RUNTIME 2026-08-13 | KHEM internal conflict | Current placement contradicts the adopted role declaration | NONE | YES |
| X22 | LANDING-20260814/VAHI-FINAL versus earlier Hero bases | 2026-08-14; Aug-5 stash; F51 2026-08-08 | Founder correction/approved Vahi evidence; mixed final lock | H2–H4 provenance is exact, H5 and re-freeze are missing | NONE | YES |
| X23 | H1-LOCK six-item model versus LANDING-20260814 ten-item lists | H2/H1 historical lock lineage; 2026-08-14 correction | LOCKED historical model versus unsigned later correction | Current ten-item model may be later intent but supersession is unproved | NONE | YES |
| X29 | H1-EXPLORE lock versus F51 composite/current variants | Aug-5 locked content; F51 2026-08-08 | Mixed LOCKED/current/historical | Some sections match authority; whole composite does not have one provenance chain | NONE | YES |
| X32 | H2-LOCK plus LANDING-20260814 | H2 approved 2026-07-23; correction 2026-08-14 | Locked invariant / correction provenance not re-frozen | Current matches later copy but later KHEM status is incomplete | NONE | YES |
| X33 | LANDING-20260814 versus shared-core lock | 2026-08-14 versus earlier adopted lock | Exact correction provenance / supersession conflict | Current matches correction source but global Core authority is unresolved | NONE | YES |
| X39 | LANDING-20260814 plus PI broad Travel identity | 2026-08-14; PI current control | Founder correction provenance / no exact H3 lock | Current exact copy is traceable but not explicitly re-frozen | NONE | YES |
| X41 | PI-08–11 and FDISP ES-07 | Approved reconstruction controls 2026-08-12/13 | APPROVED BASE boundary | Current operational route lacks proven enforcement; exact guard design absent | NONE | YES |
| X49 | GR §11 and PI-15–17 | Current GR/approved base controls | Controlling KHEM separation rule | Shared projection is wrong; exact destinations/contracts are not specified | NONE | YES |
| X51 | Recovery report and version map prove mixed owners/statuses | 2026-08-18 evidence pass | Mixed APPROVED/FENCED/FUTURE/UNRESOLVED | Current umbrella classification is invalid as one atomic control | NONE | YES |

## RED — genuinely unresolved; retain stable X

No fallback, parent asset, runtime Q&A, current implementation, visual analogue or newer timestamp may substitute for these sources.

| Item ID | Route / component | Current implementation | Proven authority source | Version / date / commit | KHEM status | Why current is wrong/right | Dependencies | Risk | Final bucket |
|---|---|---|---|---|---|---|---|---|---|
| X01 | H1 Offline media | X01 marker | None; GR says Offline not reviewed | None | UNRESOLVED | Right to retain marker; no route-owned asset | H1 Offline | Parent-image contamination | RED |
| X02 | H2 Online media | X02 marker | None | None | UNRESOLVED | Right to retain marker | H2 Online | Parent-image contamination | RED |
| X03 | H2 Offline media | X03 marker | None | None | UNRESOLVED | Right to retain marker | H2 Offline | Parent-image contamination | RED |
| X04 | H2 available-rituals answer | X04 marker | Published Hero-2 Q&A absent | None | UNRESOLVED | Right to retain marker | KPL/Golden Q&A | Religious misinformation | RED |
| X05 | H2 right-ritual answer | Current base answer | Published/versioned source absent | F51 implementation only | CURRENT, not approved | Current cannot be called authority | Q&A publication | Ritual recommendation risk | RED |
| X06 | H2 booking answer | X06 marker | Published Hero-2 Q&A absent | None | UNRESOLVED | Related process copy is not Hero Q&A | booking owner | Process misrepresentation | RED |
| X07 | H2 required-information answer | Current base answer | Published source absent | F51 only | CURRENT, not approved | Source owner known; authority missing | privacy/forms | Overcollection/privacy risk | RED |
| X08 | H2 partner-verification answer | Current base answer | Published source absent | F51 only | CURRENT, not approved | Multiple variants conflict | RPN verification | Trust/legal risk | RED |
| X09 | H2 online-arrangement answer | Current base answer | Published source absent | F51 only | CURRENT, not approved | Runtime/inner variants cannot substitute | online service rules | Service promise risk | RED |
| X10 | H2 custom-ritual answer | X10 marker | Published Hero Q&A absent | None | UNRESOLVED | Runtime candidates are wrong class | custom inquiry | Sensitive ritual risk | RED |
| X11 | H2 post-inquiry answer | X11 marker | Published answer absent | None | UNRESOLVED | Timing/process candidates conflict | CRM/URMS | False turnaround promise | RED |
| X12 | H2 AI opening | Current route-specific string | AOM/H2 approved opening absent | F51 only | CURRENT, not approved | Three greetings compete | AI panel | Representation risk | RED |
| X14 | Header exact presentation | Current Header | Exact Header visual/copy master absent | Owner adopted 2026-08-08/13 | APPROVED owner only | Owner right; exact presentation unproved | brand/nav | Site-wide conversion/accessibility risk | RED |
| X18 | Exact visual tokens/fonts/icons | Mixed current tokens | Complete WPB/design master absent | None | APPROVED family only | Peacock/gold family right; exact system unknown | all CSS | Broad redesign drift | RED |
| X19 | Responsive geometry | Current CSS | Signed responsive/dimension master absent | Dated historical snapshots only | UNRESOLVED | Cannot select by screenshot/date | shell CSS | Overflow/layout regression | RED |
| X21 | AI governance/content framework | Disclosed engine | AOM/KPL/publication ledger absent | PI boundary only | STRUCTURE READY | Safety structure partly right; full authority missing | AI/knowledge | Misinformation/data boundary | RED |
| X27 | H1 171-entry corpus | Eight prompts/smaller tree | Claimed corpus unavailable | H1 lock reference only | AUTHORITY SOURCE NOT AVAILABLE | Current corpus is not equivalent | Golden Q&A | Missing/incorrect guidance | RED |
| X28 | H1 AI opening | Current string | Approved H1/AOM opening absent | None | UNRESOLVED | No exact adoption | AI panel | Representation risk | RED |
| X30 | H1 Online page/banner | Full parent-style Hero | Named refined v1.1 workbook unavailable | Source absent from all refs/archives | AUTHORITY SOURCE NOT AVAILABLE | Current violates indexed contextual-banner rule; replacement unknown | child shell/art | High wrong-page restoration risk | RED |
| X34 | H2 detailed inner page/Q&A | Current detailed component | Approved inner-page master absent | F51 bulk implementation only | CURRENT | Architecture commit does not approve copy | H2 page/AI | Religious/service claims | RED |
| X35 | H2 Online content | Current route-local copy | Route master absent | F51 only | UNRESOLVED | Current-only evidence | child page | Service promise risk | RED |
| X36 | H2 Offline content | Current route-local copy | Route master absent | F51 only | UNRESOLVED | Current-only evidence | child page | Service promise risk | RED |
| X37 | H3 full artwork/logo/copy package | Adopted asset + correction copy | Complete approved H3 master absent | Asset adopted 2026-08-13 | PARTIAL | Asset trace exists; bundled full authority does not | H3 Hero | Brand/service positioning | RED |
| X38 | H3 Q&A/opening | Hero/runtime arrays | Published H3 Q&A/AOM absent | F51 only | CURRENT | Stores conflict and lack publication | AI/Travel | Travel guidance risk | RED |
| X40 | H3 detailed page | Current broad page | Approved detailed master absent | F51 only | CURRENT/DRAFT support | Broad identity proven, exact copy not | Travel page | Commercial promise risk | RED |
| X42 | H4 artwork/logo | Ledger image + Pitru logo | Exact Vahi asset/hash/logo mapping absent | Visual direction only | UNRESOLVED | Similarity cannot establish ownership | Vahi Hero | Privacy/false-record implication | RED |
| X45 | H4 children | No routes | Approved route contract absent | IC-10/MC-11 fenced | UNRESOLVED | Right not to invent; source remains missing | Vahi privacy | Severe privacy/invention risk | RED |
| X47 | H5 Q&A/AI/Explore/core | Current arrays | Published H5 master/Q&A absent | F51 only | CURRENT | Public/private claims unapproved | RPN/AI | Partner/customer trust risk | RED |
| X48 | H5 detailed onboarding | Current extensive page | Approved public RPN master absent | F51 only | CURRENT | Boundary known; exact content not | RPN verification | Security/eligibility representation | RED |
| X50 | Company/legal content | Current static pages | Approved legal/company masters absent | F51 only | Routes approved; copy unresolved | Route identity right; legal text unproved | legal/support | High legal/compliance risk | RED |

## Review of recovery classifications

### All 10 `RECOVERED_EXACT`

| Original item | Decision-matrix result | Reason |
|---|---|---|
| X15 | GREEN | Owner, registry and adoption chain proven. |
| X20 | GREEN | Golden runtime owner proven. |
| X24 | GREEN | Locked/adopted synchronization and arrow invariant proven. |
| X25 | GREEN | Prior duplicate claim disproved; distinct framework roles proven. |
| X26 | GREEN | Parent H1 assets and KHEM adoption proven. |
| X32 | AMBER | Exact correction provenance exists, but final KHEM re-freeze does not. |
| X33 | AMBER | Exact H2 content source exists, but conflicts with locked shared-core model. |
| X39 | AMBER | Exact H3 correction provenance exists, but final lock does not. |
| X43 | GREEN | Final spelling-corrected Vahi display source and order proven. |
| X44 | GREEN | Privacy-controlled Vahi owner selected by approved disposition. |

### Both `RECOVERED_RESTORE_REQUIRED`

| Item | Result | Reason |
|---|---|---|
| X41 | AMBER | Public/internal boundary proven, exact guard/route implementation not proven. |
| X49 | AMBER | Separate projections required, exact endpoints/UI not proven. |

### All 4 `AUDIT_CLASSIFICATION_ERROR`

| Item | Corrected result | Correction |
|---|---|---|
| X13 | AMBER | Split recovered shell owner from unresolved all-route coverage; one atomic X was invalid. |
| X31 | GREEN | No evidence requires a distinct H2 logo; absence is not a defect. |
| X46 | GREEN | Historical Hero-6 filename does not conflict with current H5 identity. |
| X51 | AMBER | Umbrella X combines unrelated owners/statuses; Founder must authorize control decomposition. |

### All 5 `CONFLICT_FOUNDER_DECISION`

X16, X17, X22, X23 and X29 remain **AMBER**. No evidence source resolves them without a Founder choice.

### All 30 `GENUINELY_MISSING`

Confirmed **RED**: X01–X12, X14, X18, X19, X21, X27, X28, X30, X34–X38, X40, X42, X45, X47, X48 and X50. The complete repository/archive/Git search recovered no controlling exact source sufficient for Green or a legitimate two-source choice sufficient for Amber.

## All 13 wrong-version connections

| # | Public item | Current connection | Proven/expected source | Decision bucket |
|---:|---|---|---|---|
| 1 | H2 parent artwork | `ihero2-ritual-services.png` | Locked/adopted `hero2-ritual-services.png` | GREEN safe restoration G-R01 |
| 2 | H1 Online visual | Parent Final-v2 full Hero | Missing contextual Online banner/workbook | RED X30 |
| 3 | H1 Distance line | Comma form | GR exact no-comma line, but later correction conflicts | AMBER via X29/content decision |
| 4 | H1 Explore | LANDING-20260814 wording | GR/H1-EXPLORE locked wording, but later correction conflicts | AMBER X22/X29 |
| 5 | Core Services | Per-Hero ten items | Earlier locked shared six items versus later correction | AMBER X23 |
| 6 | Header navigation | Local mobile list | One global approved registry expected | RED X14 / AMBER X13 scope |
| 7 | Footer structure | Six runtime columns | Config-declared four columns | AMBER X16 |
| 8 | Logo roles | Logo Two in Header/Footer | Config assigns Logo Three | AMBER X17 |
| 9 | H2 Q&A | Base/current answers | Published Hero-2 Q&A absent | RED X04–X12 |
| 10 | Vahi main-page alternatives | Rich inactive alternatives coexist | Privacy-controlled owner is proven | GREEN retain X44; do not restore rich page |
| 11 | H5 numbering interpretation | Hero-6 filename read as live conflict | Current H5 governance controls | GREEN correction X46 |
| 12 | Tracking | One shared projection | Separate customer/partner projections | AMBER X49 |
| 13 | Internal route exposure/parallel Pitru | Public route index and unselected route family | Protected public/internal boundary and canonical H1 route | AMBER X41/X51; exact repair not Green |

## All 3 disconnected latest KHEM sources

| # | Source | Disconnected from | Authority result | Bucket |
|---:|---|---|---|---|
| 1 | `hero2-ritual-services.png` | H2 parent currently uses `ihero2-ritual-services.png` | Exact owner/version/status/connection proven | GREEN G-R01 |
| 2 | GR/H1-EXPLORE exact H1 lines | Active 2026-08-14 corrected copy differs | Both are legitimate evidence; supersession not recorded | AMBER |
| 3 | PI/FDISP limited public/internal and separate-tracking architecture | Current route/index/tracking connections | Boundary/separation proven, exact repair topology absent | AMBER |

## Final summary

GREEN SAFE RESTORES: 1

GREEN VERIFIED RETAIN / CLASSIFICATION CORRECTIONS: 9 X items

AMBER FOUNDER DECISIONS: 12 X items

RED ACTIVE X ITEMS: 30

AUDIT CLASSIFICATION ERRORS CORRECTED: 4/4

WRONG VERSION CONNECTIONS: 13/13 explicitly reviewed

DISCONNECTED LATEST KHEM SOURCES: 3/3 explicitly reviewed

READY FOR FOUNDER DECISION REVIEW: YES

READY FOR CONTROLLED GREEN REPAIR: NO

READY FOR ERP: NO

## Files created/modified in this phase

- `docs/khem-reconstruction/KHEM_FOUNDER_EVIDENCE_DECISION_MATRIX_v1.0.md`

LIVE `apps/web` MODIFIED: NO  
REVIEW COPY MODIFIED: NO  
IMPLEMENTATION FILES MODIFIED: NO  
ERP STARTED: NO

**STOP AFTER REPORT.**
