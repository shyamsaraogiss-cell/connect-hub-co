# KHEM Pre-Trial Master Reconstruction

## Executive finding

The intended system was a customer website connected to contextual AI/knowledge, universal request tracking, CRM/operations, human quotation and approval, Religious Partner execution, payment/documentation, and customer status/follow-up. The current repository implements substantial slices of that design, but the primary governance manuals and 23 of 24 phase records are absent. Consequently this report separates documentary facts, code evidence and Founder-provided premise.

## 1. Governance evolution: SHYAM → SITARAM → KHEM

| Generation | Reconstructed purpose and scope | Authority/approval | Lock/change rules | Status |
|---|---|---|---|---|
| SHYAM | Initial trial full-stack application: auth, customers, partners, bookings, dashboards, Pitru/Travel requests | Founder authority implied; direct approval record absent | Git history and implementation acted as record; formal supersession rules unavailable | HISTORICAL / partly superseded |
| SITARAM | Customer website/product presentation: permanent shell, Hero masters, locked visual/content packages | Explicit Founder approval/lock wording survives for Hero 1 and Ritual Hero | Master-lock files prohibit silent visual/content modification and require controlled integration | LOCKED where a lock file exists; otherwise historical |
| KHEM | Recovery/consolidation governance spanning shell, five business Heroes, AI/knowledge, public routes and operational architecture | Founder remains decision authority; recovery commands require evidence-first selection | Protect approved files, choose sources independently, preserve evidence, report conflicts, no silent invention | CURRENT GOVERNANCE PREMISE / partially encoded |

Status must not be inferred from names: `MASTER`, `FINAL`, `GOLDEN`, or a late timestamp alone is not proof. Explicit lock/approved-content evidence plus matching source is stronger.

## 2. Six core document system

The supplied premise names the following system. No readable canonical copies were found.

| Document | Full name / controlling role | Major expected scope and dependencies | Surviving evidence | Status/missing portion |
|---|---|---|---|---|
| MEM | Master Execution Manual | Top-level governance, roles, execution, locks, change control; parent of all operational blueprints | Premise and later recovery discipline | MISSING — full document |
| AOM | AI Operating Manual | AI role, intake, approved answers, escalation, privacy, prohibited authority; depends on MEM/KPL/BRS | GenZ engine, AI types/services, disclaimers | MISSING — manual; behavior partial |
| KPL | Knowledge & Prompt Library | Golden Q&A, categories, prompts, reuse, review states; supports AOM/WPB | `ai-knowledge.ts`, semantic search, Hero prompts | MISSING — master library and approval ledger |
| WPB | Website Product Blueprint | Routes, shell, Heroes, page hierarchy, navigation, forms and handoffs | App Router, navigation config, Hero locks/backups | MISSING — blueprint; implementation reconstructable |
| DBB | Database Blueprint | entities, ownership, lifecycle, privacy, audit and integration | Prisma schema and web types | MISSING — blueprint; current sources conflict |
| DPB | Dashboard Blueprint | Founder/admin/customer/partner dashboards, permissions, KPIs and workflows | dashboard components/routes/services | MISSING — blueprint and approval state |
| BRS | Business Rules / Requirements Standard | Cross-cutting business, commercial, security and support rules | scattered page copy, validation, types and tests | MISSING — consolidated standard |

Recoverable relationship: MEM governs the other manuals; AOM consumes KPL; WPB creates customer events governed by BRS; DBB stores them; DPB operates them. DBB and DPB are bidirectionally dependent. Exact historical diagram remains SOURCE NOT ESTABLISHED.

## 3. Business architecture

| Pillar | Customer/offering/entry | Process and dependencies | Admin/partner/payment/output/data owner |
|---|---|---|---|
| PitruMoksha Gaya | Families/NRI; ancestral rites; homepage and `/pitru-moksha-gaya` | Guidance → online/offline selection → inquiry → review → verified partner coordination | Admin approval, Religious Partner execution, quote/payment where applicable, documentation; URMS/CRM |
| Ritual Services | Families seeking Vedic rituals; `/ritual-services` | Ritual/location/tradition clarification → inquiry → partner match → quote/booking | Admin and verified partner; completion evidence; URMS/booking |
| Travel Assistance | India/Nepal travelers; `/travel-assistance` | Requirement → planning/ground/shadow support → confirmation → active-trip support | Travel operations/admin/partners; commercial confirmation; CRM/request |
| Vahi Records | Families researching lineage; `/vahi-records` | Confidential intake → human/custodian review → possible discovery → interpretation/delivery | Authorized Panda/custodian and admin; no availability guarantee; restricted lineage data |
| Religious Partner Network | Priests/institutions; `/religious-partners`, `/register` | Application → document/experience verification → approval → service eligibility/assignment | RPN/admin authority; profile and operational records |
| GenZ Ritual AI | Any visitor; Hero panels, `/zen-g`, Knowledge Center | Approved guidance/search → clarification → lead/reference handling → escalation | No final authority; AI session plus CRM/URMS handoff |
| Knowledge Center | Visitors seeking verified guidance; `/knowledge-center` | Domain navigation, approved knowledge, AI and tracking | Content/admin review; knowledge records |
| Support | Customers/partners; contact, complaint, grievance, Founder support | Intake → classification → owner/escalation → response/closure | Support/admin/founder; case/history |

## 4. Golden Rules register

| Class | Rule | Origin/status | Protection/current state |
|---|---|---|---|
| Governance | No silent modification; Founder decides unresolved conflicts | Lock/recovery evidence; LOCKED principle | Preserved in reconstruction method |
| Architecture | Global header/sidebar/footer do not rotate | Aug-4 shell/f51; VERIFIED | Active component shell |
| Architecture | Homepage rotates; business landing page uses fixed Hero | f51/current architecture; VERIFIED | Active through `StaticBusinessHeroPage` |
| Content | Never copy Pitru content into other businesses | KHEM recovery rules; CURRENT | Five contextual data records |
| Visual | No redesign or application scaling to solve geometry | Golden Base rules; VERIFIED | Shared shell CSS |
| Navigation | One active indicator system; no dead CTA invention | Aug-4 recovery evidence | Runtime has one active owner; destinations still need governance review |
| AI | AI provides guidance; humans confirm authoritative decisions | AI disclosures/business copy; VERIFIED | Implemented across contexts |
| AI | Golden Q&A must not be called complete while placeholders remain | premise/code evidence | INCOMPLETE |
| Database | Universal reference/history should connect customer and operations | URMS source | Client architecture present; backend schema gap |
| Security | Vahi data is confidential and discovery is not guaranteed | approved Vahi content | Active in Vahi context |
| Partner | Partner eligibility and final approval require human verification | RPN content/AI prompts | Implemented conceptually |
| Commercial | Quote, price, payment, refund and settlement are human/system-authorized, not AI-decided | quote/payment/policy source | Partial implementation |
| Support | Complaint → grievance → Founder escalation are distinct | public routes/source | Routes present; internal lifecycle partial |

## 5. Intended customer website and public shell

The route tree and detailed flow are in `KHEM_CUSTOMER_FACING_FLOW.md`. The shell boundary is:

- **Global:** PublicHeader (through layout ownership), PublicHeroSidebar, BusinessFooter, brand, copyright.
- **Homepage workspace:** rotating Hero card, contextual assistant, trust where defined, Explore, arrows, one dots system, Core Services.
- **Business page:** fixed matching Hero followed by business-specific inner content.
- **Inner page:** page content/forms/breadcrumb intent; global shell remains external.

Navigation evidence distinguishes implemented links from intended controls. Logo resolves home. Header WhatsApp uses a contact test-mode URL; Login and Services resolve. Sidebar business/AI/Knowledge links resolve. Historical Book Now destinations varied; current header uses `/services`. Mail/support controls use public routes or contact query modes. Final interlinking was historically unfinished.

## 6. Hero system

| Hero/business | Principal visual/content | Explore/AI/target | Numbering/status/source |
|---|---|---|---|
| PitruMoksha Gaya | Temple background, Pitru logo, “Daan. Dharma. Moksha.”, “Distance Never Stops Devotion.”, five service points, trust cells | Gaya Explore; Pitru assistant; `/pitru-moksha-gaya` | Called Hero 1 in current master; Aug-4 locked source |
| Ritual Services | Approved ritual artwork, ten ritual categories, verified partners/locations | Ritual Explore; Ritual assistant; `/ritual-services` | Hero 2 current; SITARAM Ritual lock/f51 |
| Travel Assistance | Airport-arrival v2.1, Shadow Traveler promise, nine support items, India/Nepal | Travel Explore; GenZ Travel AI; `/travel-assistance` | Hero 3 current; vault folders sometimes label Hero 4/5 |
| Vahi Records | Representative Vahi image, “I am Vahi”, lineage/privacy/non-guarantee points | Lineage Explore; Vahi Ledger AI; `/vahi-records` | Hero 4 current; some vault folders label Vahi Hero 1/2 |
| Religious Partner Network | Five-priest image, partner-network promise and benefits | Partner Explore; partner context; `/religious-partners` | Fifth runtime state but source label “HERO 6” |

The numbering discrepancy is a SOURCE CONFLICT. Business identity and route, not numeric folder name, are the stable keys. Per-Hero AI and Explore are evidenced. Separate Core Services datasets for every Hero are not fully evidenced; current implementation uses the canonical configured set.

## 7. Asset and visual-master inventory

| Asset group | Source/current use | Status/conflict |
|---|---|---|
| Golden lotus mark | stash/vault → `public/images/brand` | Referenced; verified physical file |
| Pitru logo/background | Aug-4/stash/vault → current Hero assets | Referenced |
| Metallic peacock emblem | Aug-4 trust work → current Hero assets | Present; exact placement needs visual review |
| Ritual artwork and approved mockup | SITARAM lock/stash/current | Runtime artwork referenced; mockup historical |
| Travel airport versions v1/v2/v2.1 | stash/vault/current | v2.1 Clean is referenced; older versions historical |
| Vahi representative and Shraddh imagery | Aug-5 stash/current | Representative image referenced; other image historical |
| Religious Partner images v1/v2 | stash/current | Five-priest v2 referenced |
| Hero 1 approved screenshots/packages | `.codex-validation` and approved-content ZIPs in stash | Historical locked masters; not runtime assets |

No asset was created or deleted. Duplicate extraction copies are preserved.

## 8. Landing, inner and service-detail architecture

- `/` is the rotating discovery workspace.
- Five business landing pages have a fixed matching Hero.
- Pitru and Ritual each have online/offline child routes.
- Travel has request and success routes; further inner routes are unestablished.
- Vahi has approved long-form content/inquiry architecture; separate child/floating routes are unestablished.
- Religious Partners links to registration; original partner dashboard/account proposals coexist with later uncertainty.
- `/services/[slug]` is the generic service-detail route; historical business-specific card targets require final link review.

## 9. GenZ AI and Golden Q&A

The shared engine selects page/Hero context, searches approved knowledge trees, supports fixed topic tabs and URMS reference lookup, retains limited session memory, and can collect a lead. It must not determine final ritual choice, partner eligibility, Vahi availability, price, refund, assignment or completion. Those decisions escalate to humans.

Golden Q&A remains incomplete. Evidence includes strong approved answers for some domains, Hero prompt lists, general knowledge trees, placeholder responses explicitly saying approved database guidance will be added, and no complete approval ledger. Categories must therefore be classified question-by-question as approved, pending, duplicate or unknown before launch.

## 10. URMS, QRSR, CRM and operational lifecycle

`URMS` is implemented as the universal request/status/history layer in web services/types. `CRM` owns leads/customer relationships. `QRSR` appears as historical quote/request/service-record terminology but lacks a canonical definition document. `BRM` is referenced conceptually but its canonical expansion/ownership is SOURCE NOT ESTABLISHED.

Supported lifecycle:

```text
Inquiry → intake/CRM → assessment → human review → quotation → customer approval
→ booking/payment → assignment → service execution → documentation
→ completion → notification/tracking/follow-up
```

The client code models most stages. The current backend schema does not model the entire lifecycle, so system-of-record ownership remains a conflict requiring a database decision.

## 11. Religious Partner, customer and partner accounts

Original design evidence contains customer, partner and admin roles; registration/login; customer and partner dashboards; partner CRUD, verification/profile data; assignments/workflows; and service interaction. Current code still role-routes `/dashboard` and contains PartnerDashboard/CustomerDashboard.

Later KHEM treatment emphasizes verified partner registration and admin-controlled approval/assignment. No primary later rule conclusively removes partner access. Therefore partner dashboard is **ORIGINAL + CURRENTLY IMPLEMENTED**, with possible later modification **UNKNOWN**, not deleted or declared approved.

Customer architecture includes registration, login/reset/verification, profile/customer records, requests, bookings, tracking, payments, documents/history concepts, notifications and support. Authorization of CRUD-style customer/booking routes needs Founder/security review.

## 12. Founder/Admin/ERP and commercial/support flows

Seventeen internal modules are catalogued in `KHEM_ERP_ADMIN_FACING_FLOW.md`. Human authority begins at eligibility, substantive assessment, quote/pricing, approval, assignment, payment/refund handling, settlement, execution acceptance and completion.

Commercial evidence covers quote generation, payment checkout, booking confirmation, cancellation policy and record status. Invoice and partner-settlement end-to-end implementation is not established. Support separates contact/inquiry, complaint, grievance, Founder support, WhatsApp and AI escalation; the public intake exists but full resolution SLA/workflow evidence does not.

## 13. Technical architecture

- Monorepo/workspace with canonical Next.js App Router application at `apps/web`.
- Shared feature/components/configuration with public and authenticated route ownership.
- Web services abstract backend/API calls for auth, customers, partners, bookings, catalog, CRM, URMS, inquiries, quotes, payments, communications and notifications.
- Separate Express/Prisma backend implements a narrower SHYAM-era model.
- Role-aware React auth context and route-specific dashboards.
- Public assets under `apps/web/public` plus historical stash/vault copies.
- AI uses local approved knowledge/search plus operational service handoffs.
- `master-vault` is a standalone AES/RBAC secret service; no evidence proves it was deployed as the content Master Vault.

## 14. Implementation chronology and Aug-5 Vahi checkpoint

1. SHYAM trial: legacy frontend/backend CRUD, auth, customer/partner/booking dashboards.
2. SITARAM: branded public shell and locked Hero masters.
3. Aug 3–4: Pitru content versions, travel alignment, shared Hero shell and Golden Base geometry backups.
4. Before Aug 5: five-business architecture largely present; Vahi content existed in multiple page/component forms.
5. Aug 5: stash objects `afdcd580`, `44471ebc`, `49106b40`; untracked approved content/assets and Vahi price-access migration/source captured.
6. f51 KHEM consolidation: public routes, five-Hero data, AI/URMS/CRM, business pages, inquiry/payment/quote and dashboards consolidated.
7. Later mixing: legacy frontend deletion, duplicate Hero/Public Shell trees, alternate Vahi/page owners and recovery attempts.
8. Current: `apps/web` is canonical; recovered shell/Hero route chain active; physical duplicates remain.

Vahi at the last-good checkpoint included Hero content, representative imagery, lineage/Gotra/ancestor preparation, Panda/custodian qualification, privacy/non-guarantee rules, translation/interpretation, inquiry forms, approved content, pricing-access code and a database migration reference. No definitive child/floating route contract or complete delivery workflow was found. Timestamp alone was not used to select a version.

## 15. Current versus pre-trial master

| Area | Classification |
|---|---|
| Five-pillar public discovery and fixed landing pages | PRE-TRIAL REQUIRED + CURRENT |
| Shared outer shell | PRE-TRIAL REQUIRED + MODIFIED/RECOVERED |
| Contextual AI and Knowledge Center | PRE-TRIAL REQUIRED + CURRENT, Q&A incomplete |
| Public navigation/interlinking | PRE-TRIAL REQUIRED + MODIFIED/PARTIAL |
| URMS/CRM/quote/payment client architecture | PRE-TRIAL REQUIRED + CURRENT/PARTIAL |
| Full database blueprint implementation | PRE-TRIAL REQUIRED + MISSING/CONFLICT |
| Founder/admin operations | PRE-TRIAL REQUIRED + CURRENT/PARTIAL |
| Customer account | PRE-TRIAL REQUIRED + CURRENT/PARTIAL |
| Partner account | CONFLICT / Founder decision required |
| Legacy `frontend` | HISTORICAL ONLY / possible later removal |
| Duplicate Hero/Public Shell trees | DUPLICATE / exclusion candidates |
| Master Vault secrets service | LATER OR PARALLEL ADDITION / relationship unknown |

## 16. Registers and decision boundary

- Missing-content register: 12 items.
- Conflicts tracked across nine major areas: manuals/phases, Hero numbering, component ownership, navigation completion, Q&A, partner access, operational naming, backend model, and Master Vault relationship.
- SHYAM/SITARAM exclusion candidates: 10.
- Founder decisions required: 12.

No runtime cleanup, deletion, route change, schema change or architecture decision is made by this reconstruction.
