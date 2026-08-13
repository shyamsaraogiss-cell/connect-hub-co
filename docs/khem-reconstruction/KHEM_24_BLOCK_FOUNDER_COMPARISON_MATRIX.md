# KHEM 24-Block Founder Comparison Matrix

Evidence vocabulary is restricted to: **DIRECT LOCKED EVIDENCE**, **DIRECT IMPLEMENTATION EVIDENCE**, **DISTRIBUTED EVIDENCE**, **FOUNDER-CONFIRMED PREMISE**, **PARTIAL EVIDENCE**, **CONFLICTING EVIDENCE**, and **SOURCE NOT ESTABLISHED**. A disposition is advisory and never authorizes deletion.

## Block 01 — Governance

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 01.1 | SHYAM → SITARAM → KHEM | Founder premise establishes three generations | FOUNDER-CONFIRMED PREMISE | SHYAM CRUD app; SITARAM locks; KHEM source-of-truth config | KHEM recovery governance | Exact MRD/transition record absent | All architecture | FOUNDER REVIEW | Master reconstruction; Git |
| 01.2 | Approval/change control | Unlock → Modify → Founder Review → Approval → Re-freeze; no silent modification | DIRECT LOCKED EVIDENCE | `khem-navigation.config.ts` v1.0 rule | Present in stash/vault/current | Original MEM not found | Config, locks, evidence | KEEP | 49106b40 lineage |
| 01.3 | Draft/status/supersession | Draft, review, approved and locked must be distinct | DISTRIBUTED EVIDENCE | AI shell explicitly pending while shell items locked | Applied in reporting, not centralized | No master status ledger | MEM/BRS | FOUNDER REVIEW | KHEM config/locks |

## Block 02 — Core Document System

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 02.1 | MEM | Master governance/manual existed | FOUNDER-CONFIRMED PREMISE | Governance rules only | Reference only | Exact document absent | All documents | SOURCE NOT ESTABLISHED | Deep discovery |
| 02.2 | AOM/KPL | AI manual and prompt library | DISTRIBUTED EVIDENCE | AI engine, knowledge trees, prompts, disclosures | Partial contextual AI | No approval/version ledger | AI, Q&A | FOUNDER REVIEW | AI source |
| 02.3 | WPB | Website blueprint | DISTRIBUTED EVIDENCE | Locked navigation/shell, routes, Hero locks | Substantial implementation | Final interlinking incomplete | Public UI | KEEP | KHEM config, SITARAM locks |
| 02.4 | DBB/DPB | Database and dashboard blueprints | CONFLICTING EVIDENCE | Narrow Prisma schema; broad web services/dashboards | Partial ERP architecture | System-of-record/permissions unresolved | ERP/security | FOUNDER REVIEW | Schema, dashboards |
| 02.5 | BRS | Supporting business standard | DISTRIBUTED EVIDENCE | Tests, policies, validation, Vahi/RPN rules | Scattered rules | Exact standard absent | All flows | FOUNDER REVIEW | Config/content/tests |

## Block 03 — Business Architecture

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 03.1 | Pitru/Ritual | Guided rites with verified partners and human confirmation | DISTRIBUTED EVIDENCE | Fixed pages, online/offline, inquiries, AI | Current business pillars | Exact master requirements missing | RPN, URMS | KEEP | Pages/content |
| 03.2 | Travel | End-to-end India/Nepal assistance | DIRECT IMPLEMENTATION EVIDENCE | Full Travel page plus request/success | Current fixed Hero/page | Generic Gaya-only predecessor superseded | CRM/ops | KEEP | Travel components |
| 03.3 | Vahi | Confidential lineage coordination, not record creation/certification | DISTRIBUTED EVIDENCE | Hero, approved content, inquiry, privacy/non-guarantee | Current `/vahi-records` | Multiple page owners; children missing | Panda/admin | FOUNDER REVIEW | Aug-5/Vahi evidence |
| 03.4 | RPN | Partner registration, verification, assignment | DISTRIBUTED EVIDENCE | Registration, partner CRUD/dashboard | Admin verification emphasized | Partner self-service authority unresolved | Auth/ERP | FOUNDER REVIEW | RPN content/schema |
| 03.5 | AI/Knowledge/support | Guidance → inquiry/tracking → human owner | PARTIAL EVIDENCE | AI, Knowledge Center, support routes | Active but incomplete Q&A/workflows | Operational persistence partial | CRM/URMS | KEEP | Phase 6/source |

## Block 04 — Golden Rules

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 04.1 | Architecture/visual | Global shell fixed; homepage rotates; no redesign/scale hacks | DIRECT LOCKED EVIDENCE | Shell, fixed-page wrapper, Golden CSS | Recovered | Physical duplicate owners remain | UI/imports | KEEP | Aug-4/config |
| 04.2 | Content/AI | Context-specific data; AI guidance only; human confirmation | DISTRIBUTED EVIDENCE | Five Hero contexts/disclosures | Active | Placeholder answers remain | KPL/AOM | FOUNDER REVIEW | Hero/AI data |
| 04.3 | ERP/database/security | Human authority; Vahi confidentiality; universal status history | PARTIAL EVIDENCE | Services/types/policies | Partial | Full DBB/permission model absent | DB/auth | FOUNDER REVIEW | Services/schema |
| 04.4 | Commercial/support | Quote/payment/refund/escalation require authorized handling | PARTIAL EVIDENCE | Client services and public routes | Partial | End-to-end ownership missing | ERP | FOUNDER REVIEW | Quote/payment/support |

## Block 05 — Public Shell

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 05.1 | Header/sidebar/footer/copyright | Global, non-rotating | DIRECT LOCKED EVIDENCE | Component shell and layout ownership | Active | Alternate root shell/sidebar exist | Layout/auth | KEEP | KHEM config |
| 05.2 | Hero/Trust/AI/Explore/Core | Coordinated central workspace; Hero-specific where established | DISTRIBUTED EVIDENCE | Rotating Hero + contextual AI + Explore; one Core set | Active | Per-Hero Core/Trust completeness unresolved | Hero data | FOUNDER REVIEW | Aug-4/f51 |
| 05.3 | Breadcrumb/inner ownership | Inner-page-specific | PARTIAL EVIDENCE | Some page content/routes | Inconsistent | No universal breadcrumb contract | Routes | FOUNDER REVIEW | Business pages |

## Block 06 — Navigation / Interlinking

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 06.1 | Header/sidebar/footer/logo | Locked hierarchy; logo → home | DIRECT LOCKED EVIDENCE | Configured routes | Active | Some query-mode contact fallbacks | Route tree | KEEP | KHEM config |
| 06.2 | Hero/Explore/Core CTAs | Business-context destinations | PARTIAL EVIDENCE | Hero/Explore links; shared Core links | Mostly implemented | Final active-button matrix unfinished | Pages/config | FOUNDER REVIEW | Hero data |
| 06.3 | AI/Knowledge/tracking/register | Intended customer pathways | DIRECT IMPLEMENTATION EVIDENCE | Routes and links exist | Active | Approval/history partial | ERP handoff | KEEP | App routes |
| 06.4 | Booking/support controls | Reach authorized workflow | CONFLICTING EVIDENCE | CRUD routes and contact/support routes | Mixed public/internal exposure | Destination/authorization unresolved | Auth/ERP | FOUNDER REVIEW | Routes |

## Block 07 — Hero System

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 07.1 | Pitru Hero | Temple/logo/title/service/trust master | DIRECT LOCKED EVIDENCE | Runtime Hero 1 | Active rotating + fixed | Minor source variants | Assets/CSS | KEEP | Aug-4/SITARAM |
| 07.2 | Ritual Hero | Ritual identity/artwork/services/locations | DIRECT LOCKED EVIDENCE | Runtime Ritual state | Active rotating + fixed | Historical numbering varies | Assets/data | KEEP | Ritual lock |
| 07.3 | Travel Hero | Shadow Traveler/India-Nepal assistance | DISTRIBUTED EVIDENCE | Runtime Travel state | Active rotating + fixed | Numbered Hero 3/4/5 in sources | Assets/data | KEEP | Vault/current |
| 07.4 | Vahi Hero | “I am Vahi”, lineage/privacy/non-guarantee | DISTRIBUTED EVIDENCE | Runtime Vahi state | Active rotating + fixed | Numbered Hero 1/2/4 in sources | Vahi content | FOUNDER REVIEW | Aug-5/Vahi |
| 07.5 | Partner Hero | RPN identity/benefits/registration | DISTRIBUTED EVIDENCE | Runtime fifth state labeled Hero 6 | Active rotating + fixed | Number discrepancy | RPN page | KEEP | f51/vault |
| 07.6 | Controls | Arrows + one dots on homepage; none on fixed pages | DIRECT IMPLEMENTATION EVIDENCE | Conditional controls | Active | Autoplay not established | Carousel | KEEP | Current Hero |

## Block 08 — Hero Images / Assets

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 08.1 | Approved masters/screenshots | Hero 1/2 visual references | DIRECT LOCKED EVIDENCE | Stash ZIP/screenshots | Historical reference | Not runtime assets | Visual review | HISTORICAL EVIDENCE ONLY | 49106b40 |
| 08.2 | Current Hero assets | Business-specific images/logos | DIRECT IMPLEMENTATION EVIDENCE | All active paths exist | Referenced | Older versions duplicated | Hero data | KEEP | `public/images` |
| 08.3 | Lotus/emblem/decorative marks | Brand/trust decoration | DISTRIBUTED EVIDENCE | Lotus and metallic emblem present | Mixed usage | Exact emblem placement review pending | Shell/CSS | FOUNDER REVIEW | Aug-4/assets |
| 08.4 | Representative-image rule | Disclose illustrative imagery where established | PARTIAL EVIDENCE | Content/assets survive | Not globally standardized | Approval wording incomplete | Content | FOUNDER REVIEW | Hero/Vahi sources |

## Block 09 — Landing Architecture

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 09.1 | `/` | Rotating five-business workspace | DISTRIBUTED EVIDENCE | `BusinessHome → Shell → HeroCarousel` | Active | Canonical filenames still mixed | Shell/Hero | KEEP | f51/current |
| 09.2 | Five business routes | Fixed matching Hero plus unique content | DIRECT IMPLEMENTATION EVIDENCE | `StaticBusinessHeroPage` routes | Active | Vahi page owner conflict | Pages/data | KEEP | App routes |

## Block 10 — Inner / Child / Floating Pages

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 10.1 | Pitru/Ritual online/offline | Mode-specific pages with inquiry handoff | DIRECT IMPLEMENTATION EVIDENCE | Four routes | Active | Exact blueprint absent | Forms/ERP | KEEP | App routes |
| 10.2 | Travel children | Request and success established | DIRECT IMPLEMENTATION EVIDENCE | Two child routes | Active | Additional children not established | Travel ops | KEEP | App routes |
| 10.3 | Vahi children/floating | Historically referenced | SOURCE NOT ESTABLISHED | No verified route contract | None | Content exists without hierarchy | Vahi/admin | SOURCE NOT ESTABLISHED | DOCX index/reports |
| 10.4 | Partner/service detail | Registration plus generic service details | PARTIAL EVIDENCE | `/register`, `/services/[slug]` | Active | Partner child/dashboard boundary unresolved | Auth/catalog | FOUNDER REVIEW | Routes |

## Block 11 — GenZ Ritual AI

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 11.1 | Role/context | Page/Hero contextual guidance | DISTRIBUTED EVIDENCE | Shared engine and business contexts | Active | AI shell was pending Founder alignment in lock config | AOM/KPL | FOUNDER REVIEW | Phase 6/config |
| 11.2 | Intake/escalation | Clarify, collect, create lead/request; human decides | DISTRIBUTED EVIDENCE | Session, inquiry, URMS lookup, disclosures | Partial | SLA/privacy manual missing | CRM/URMS | KEEP | AI/services |
| 11.3 | Prohibited authority | No final ritual, price, eligibility, Vahi availability decisions | PARTIAL EVIDENCE | Disclosures and content boundaries | Present unevenly | Exact AOM absent | Security/content | FOUNDER REVIEW | AI/Vahi/RPN |

## Block 12 — Golden Q&A

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 12.1 | Golden Base/Hero Q&A | Approved, contextual answer corpus | FOUNDER-CONFIRMED PREMISE | Hero prompts/knowledge trees | Partial | Approval ledger absent | KPL/AOM | FOUNDER REVIEW | Premise/source |
| 12.2 | Pending/duplicates/reuse | Review before AI/FAQ/Knowledge reuse | DIRECT IMPLEMENTATION EVIDENCE | Placeholder text explicitly awaits approved DB | Incomplete | Cannot call complete | Content review | FOUNDER REVIEW | homepageHeroSlides |

## Block 13 — URMS / QRSR / CRM

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 13.1 | Inquiry/intake/follow-up | CRM lead + universal request/history | DISTRIBUTED EVIDENCE | CRM/URMS services, dashboards, tracking | Client architecture active | Persistent system owner incomplete | DBB/ERP | KEEP | f51/current |
| 13.2 | Assessment→quote→approval | Human-reviewed operational path | PARTIAL EVIDENCE | Quote/service clients | Partial | Transition orchestration absent | Admin/DB | FOUNDER REVIEW | Services/types |
| 13.3 | Booking→payment→assignment→execution | Coordinated lifecycle | PARTIAL EVIDENCE | Booking/payment/RPN modules | Partial | Assignment/documentation owner absent | Partner/ERP | FOUNDER REVIEW | Routes/services |
| 13.4 | QRSR/BRM meaning | Distinct operational systems expected | SOURCE NOT ESTABLISHED | Names/references only | Undefined/overlapping | Terminology conflict | Reports/schema | SOURCE NOT ESTABLISHED | Discovery reports |

## Block 14 — Religious Partners / RPN

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 14.1 | Registration/verification | Partner profile, documents, human approval | DISTRIBUTED EVIDENCE | RPN page, register, partner schema/CRUD | Active | Exact private/public field policy absent | Auth/DB | KEEP | RPN source |
| 14.2 | Dashboard/account | Original partner self-service | DIRECT IMPLEMENTATION EVIDENCE | PartnerDashboard/role routing | Present | Later KHEM emphasizes admin control; no explicit removal | Auth/security | FOUNDER REVIEW | Dashboard/Auth |
| 14.3 | Assignment/execution/tracking | Approved partner receives and completes work | PARTIAL EVIDENCE | Operational concepts/modules | Partial | End-to-end workflow/settlement unestablished | URMS/payment | FOUNDER REVIEW | Services/content |

## Block 15 — Customer Account

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 15.1 | Register/login/reset/verify/profile | Customer identity/account | DIRECT IMPLEMENTATION EVIDENCE | Auth routes, customer schema/dashboard | Present | OTP exact design not established; login fetch defect | Backend/auth | KEEP | Routes/schema |
| 15.2 | Requests/tracking/booking/payment | Account lifecycle | PARTIAL EVIDENCE | Dashboard, routes, clients | Partial | CRUD exposure and persistence conflict | ERP/DB | FOUNDER REVIEW | Components/services |
| 15.3 | Documents/history/notifications/support | Completion and follow-up | PARTIAL EVIDENCE | UI/types/support routes | Partial | Document repository/workflow absent | URMS/storage | FOUNDER REVIEW | Dashboard/services |

## Block 16 — Partner Account

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 16.1 | Registration/profile/verification/login | Original role-based partner account | DIRECT IMPLEMENTATION EVIDENCE | Auth, register, partner records | Present | Latest permission intent unknown | Auth/RPN | KEEP | Current/backend |
| 16.2 | Dashboard/assignments/workflow/status | Partner operations | CONFLICTING EVIDENCE | PartnerDashboard survives | KHEM admin-control emphasis | No explicit supersession | Security/ERP | FOUNDER REVIEW | Dashboard/RPN |
| 16.3 | Documents/payment/support | Partner completion/settlement | SOURCE NOT ESTABLISHED | Scattered concepts | Incomplete | No canonical workflow | Payment/storage | SOURCE NOT ESTABLISHED | Reports |

## Block 17 — Founder / Admin

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 17.1 | Founder/Admin authority | Human approval and executive escalation | DISTRIBUTED EVIDENCE | AdminDashboard, Founder Support | Partial | Founder-specific role/permissions absent | Auth/DPB | FOUNDER REVIEW | Dashboards/support |
| 17.2 | Customers/partners/requests/bookings/services | ERP operational modules | DIRECT IMPLEMENTATION EVIDENCE | CRUD/admin routes and clients | Present | Public/internal boundaries mixed | Auth/DB | KEEP | Routes/services |
| 17.3 | CRM/RPN/URMS/QRSR/BRM | Unified operations | CONFLICTING EVIDENCE | CRM/URMS/RPN strong; QRSR/BRM undefined | Partial | Naming/ownership conflict | DBB/DPB | FOUNDER REVIEW | f51/source |
| 17.4 | Knowledge/reports/audit | Review, reporting and history | PARTIAL EVIDENCE | AI review, reports, URMS history | Partial | Approval/audit persistence missing | DB/security | FOUNDER REVIEW | Dashboard/types |

## Block 18 — Commercial Flows

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 18.1 | Quote/pricing/customer approval | Human/admin-authorized commercial decision | PARTIAL EVIDENCE | Quote UI/service/catalog price | Partial | Approval persistence unclear | CRM/DB | FOUNDER REVIEW | Quote/catalog |
| 18.2 | Invoice/payment/booking confirmation | Confirmed commercial workflow | PARTIAL EVIDENCE | Payment/booking clients | Partial | Invoice/provider ownership absent | Payment/DB | FOUNDER REVIEW | Services |
| 18.3 | Cancellation/refund | Policy plus authorized action | DISTRIBUTED EVIDENCE | Public policies/payment concepts | Partial | Operational refund workflow absent | Admin/payment | FOUNDER REVIEW | Policy/service |
| 18.4 | Partner settlement/completion docs | Post-service commercial closure | SOURCE NOT ESTABLISHED | No complete flow | Missing | Cannot assign owner | RPN/accounting | SOURCE NOT ESTABLISHED | Reports |

## Block 19 — Support Flows

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 19.1 | Contact/mail/WhatsApp | Customer → support/admin → response | DIRECT IMPLEMENTATION EVIDENCE | Contact page and query-mode links | Present | WhatsApp test-mode fallback | CRM/support | KEEP | Header/contact |
| 19.2 | Complaint→grievance→Founder | Tiered escalation | DISTRIBUTED EVIDENCE | Three public routes | Partial | SLA/case status owner absent | Admin/URMS | FOUNDER REVIEW | Support pages |
| 19.3 | Tracking/AI escalation | Reference lookup or human escalation | PARTIAL EVIDENCE | Tracking and GenZ engine | Partial | Resolution/customer-response lifecycle incomplete | URMS/CRM | FOUNDER REVIEW | Phase 6/services |

## Block 20 — Technical Architecture

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 20.1 | Next.js/workspace/apps/web | Canonical customer/ERP web application | DIRECT IMPLEMENTATION EVIDENCE | App Router monorepo | Current canonical | Legacy frontend remains historical | Packages/build | KEEP | Workspace/source |
| 20.2 | Components/config/routes/assets | Shared governed modules | DIRECT LOCKED EVIDENCE | KHEM config plus component trees | Active | Duplicate Hero/shell owners | Imports/tests | FOUNDER REVIEW | Config/current |
| 20.3 | API/auth/database | Web service clients + Express/Prisma backend | CONFLICTING EVIDENCE | Both survive | Login fetch defect; model mismatch | Runtime config/security | FOUNDER REVIEW | Backend/web |
| 20.4 | AI/Knowledge | Local approved trees and operational handoffs | DISTRIBUTED EVIDENCE | Feature modules/routes | Partial | KPL/AOM absent | Content/ERP | KEEP | Phase 6 |
| 20.5 | master-vault | Relationship to KHEM content vault | SOURCE NOT ESTABLISHED | Separate secret-service project | Outside runtime | Name/role ambiguity | Deployment/security | FOUNDER REVIEW | ARCHITECTURE.md |

## Block 21 — Coding History

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 21.1 | SHYAM trial | ERP/auth/customer/partner/booking baseline | DIRECT IMPLEMENTATION EVIDENCE | c8d/legacy frontend/backend | Historical | Later app supersedes frontend | Evidence | HISTORICAL EVIDENCE ONLY | Git/recovery |
| 21.2 | SITARAM | Public shell/Hero masters | DIRECT LOCKED EVIDENCE | Hero lock packages, phase-2 branch | Historical/partly active | Exact planning phase absent | UI assets | KEEP | 49106b40 |
| 21.3 | 4-Aug Golden Base | Shared Hero geometry and Pitru/Travel work | DIRECT IMPLEMENTATION EVIDENCE | Dated backups | Recovered | Later mixing required recovery | CSS/components | KEEP | Aug-4 backups |
| 21.4 | 5-Aug/f51/later recovery | Vahi/content/operations consolidation | PARTIAL EVIDENCE | stash objects, f51, current dirty tree | Current | Exact 3 PM checkpoint unavailable | Entire app | FOUNDER REVIEW | Git/stash |

## Block 22 — Vahi / Hero 4

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 22.1 | Hero/Trust/Explore | Vahi identity, representative imagery, lineage discovery | DISTRIBUTED EVIDENCE | Runtime Vahi Hero/Explore | Active | Trust/Core variants incomplete | Hero assets | KEEP | Aug-5/current |
| 22.2 | Landing/content | Lineage, Gotra, ancestors, Pandas, privacy, interpretation, preparation | DISTRIBUTED EVIDENCE | Approved content plus legacy large page | Approved-content owner active | Competing page sources | Content/forms | FOUNDER REVIEW | Vahi DOCX/source |
| 22.3 | Role boundary | CHC coordinates verified custodians; does not create/certify records | PARTIAL EVIDENCE | Non-guarantee/human-review copy | Present | Exact lock not fully extracted | Security/legal | KEEP | Vahi content |
| 22.4 | Search/verification/assignment/delivery/docs | Operational Vahi lifecycle | SOURCE NOT ESTABLISHED | Inquiry and price-access fragments | Incomplete | No full workflow/children | ERP/RPN | SOURCE NOT ESTABLISHED | Aug-5 fragments |

## Block 23 — 5-Aug Checkpoint

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 23.1 | Before 5 Aug | July milestone + Aug-4 shell/Hero backups | DIRECT IMPLEMENTATION EVIDENCE | c8d and dated backups | Historical | Not a complete intended master | Recovery | HISTORICAL EVIDENCE ONLY | Git/backups |
| 23.2 | 5 Aug additions | Stash captures untracked business/AI/Vahi/operations files | PARTIAL EVIDENCE | afd/444/491 objects | Historical evidence | Stash time is 19:41, not exact 3 PM state | Git object mapping | KEEP | Git stash |
| 23.3 | Exact last-good checkpoint | Exact 5-Aug 3 PM restoration | SOURCE NOT ESTABLISHED | None | None | Must not be claimed | All recovery | SOURCE NOT ESTABLISHED | Discovery |
| 23.4 | Later/current | f51 consolidation then mixed duplicate trees/recovery | CONFLICTING EVIDENCE | Current dirty `apps/web` | Canonical runtime | Source ownership still mixed | Imports/data | FOUNDER REVIEW | f51/current |

## Block 24 — Missing-Content Register

| ID | Item | Pre-Trial Intended / Locked State | Evidence Status | Surviving Implementation | Current KHEM State | Conflict/Change | Dependencies | Founder Disposition | Source |
|---|---|---|---|---|---|---|---|---|---|
| 24.1 | MEM/phase ledger/chat decisions | Original governance/24 rounds | SOURCE NOT ESTABLISHED | Premise and scattered rules | Missing | Cannot reconstruct decisions | All | SOURCE NOT ESTABLISHED | Deep discovery |
| 24.2 | AOM/KPL/WPB/DBB/DPB/BRS | Six exact masters/supporting standard | DISTRIBUTED EVIDENCE | Code/config/schema/dashboard substitutes | Partial | Exact docs/versions absent | All | FOUNDER REVIEW | Core source map |
| 24.3 | Golden Q&A/approval records | Complete reviewed corpus | PARTIAL EVIDENCE | Mixed approved/placeholders | Incomplete | Unsafe completion claim | AI/content | FOUNDER REVIEW | AI data |
| 24.4 | Vahi/Travel route masters | Full child/floating hierarchy | SOURCE NOT ESTABLISHED | Some current routes/content | Missing/partial | Cannot invent | Navigation | SOURCE NOT ESTABLISHED | Missing register |
| 24.5 | Images/screenshots/logos/components/configs | Approved masters and runtime artifacts | CONFLICTING EVIDENCE | Canonical, backups, stash, vault duplicates | Preserved | Approval/ownership varies | Runtime/evidence | FOUNDER REVIEW | Evidence index |
| 24.6 | DB/dashboard/forms | Full blueprint and system-of-record | CONFLICTING EVIDENCE | Partial schema + broad clients/UI | Partial | Persistence/authority mismatch | ERP/security | FOUNDER REVIEW | Schema/source |
