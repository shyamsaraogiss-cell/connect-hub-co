# KHEM Founder Master Review

## 1. Executive Reconstruction Status

This review read all nine reconstruction reports completely and rechecked archive names, Git history/stashes, recovery locations and alternate phase terminology. The overall architecture is reconstructable at a **partial** level: customer presentation is comparatively strong; internal workflow is modeled but not backed by a complete database blueprint; phase governance and the seven core documents remain the largest evidence gap.

### Report verification

| Report | Exists / size | Main purpose | Evidence used | Key findings | Missing/conflicts/action |
|---|---:|---|---|---|---|
| `KHEM_PRETRIAL_MASTER_RECONSTRUCTION.md` | Yes / 18,779 B | Master synthesis | Current code, f51, Aug-4 backups, Aug-5 stash, vaults, Founder premise | Five business pillars; contextual AI; public-to-operations lifecycle; 17 internal modules | Manuals/phases absent; schema, ownership and access conflicts; use as synthesis, not approval record |
| `KHEM_PHASE_1_TO_24_RECONSTRUCTION.md` | Yes / 4,247 B | Phase ledger | Explicit phase labels and source searches | Phase 6 partially attributable to AI/Knowledge/URMS | 23 unresolved; search embedded/alternate terminology |
| `KHEM_CUSTOMER_FACING_FLOW.md` | Yes / 2,030 B | Public route map | App Router, navigation, Hero data | 28 public/customer routes; five-Hero workspace; fixed landing pages | Travel/Vahi floating routes and final links unresolved |
| `KHEM_ERP_ADMIN_FACING_FLOW.md` | Yes / 3,377 B | Internal module/flow map | Routes, dashboards, services, types, Prisma | 17 operational modules plus audit/history; human authority boundary | Rich web model versus narrow backend schema; QRSR/BRM undefined |
| `KHEM_CUSTOMER_TO_ERP_HANDOFF_MATRIX.md` | Yes / 2,409 B | Public-to-internal handoffs | Forms, service clients, routes | 16 handoffs | Several destinations are client architecture or partial workflow, not proven system-of-record |
| `KHEM_SHYAM_SITARAM_EXCLUSION_CANDIDATES.md` | Yes / 2,319 B | Non-destructive candidate register | Duplicate trees, legacy app, current imports | 10 candidates | Dependency review and Founder decisions required before exclusion |
| `KHEM_MISSING_CONTENT_REGISTER.md` | Yes / 2,105 B | Missing/source-reference register | All evidence locations | Seven manuals, phase records, Golden Q&A, Vahi/Travel route contracts missing | Recover embedded documents before coding decisions |
| `KHEM_FOUNDER_DECISION_REGISTER.md` | Yes / 2,783 B | Open decision register | Conflicts across runtime and historical architecture | 12 decisions | Founder decision fields intentionally blank |
| `KHEM_SOURCE_EVIDENCE_INDEX.md` | Yes / 3,299 B | Evidence ranking/chronology | Locks, backups, stash, f51, vault, legacy code | Explicit locks outrank timestamp; current does not mean approved | Approval provenance incomplete; preserve evidence |

### Counts and confidence

- Phases fully established: **0**.
- Phases partially established: **1** (Phase 6).
- Phases unresolved: **23**.
- Core documents found as complete documents: **0/7**.
- Customer architecture: **PARTIAL**, with strong route/shell evidence.
- ERP/Admin architecture: **PARTIAL**, with strong client-module but incomplete database/authority evidence.
- End-to-end flow: **PARTIAL**, because several operational transitions lack a proven persistent owner.

## 2. Phase 1–24 Coverage

### Why the earlier result was 1/24

The failure has four causes:

1. The original phase/question ledger and seven manuals are not present as readable named files in the searched tree.
2. Substantial planned behavior survives under business/component names, but it cannot safely be assigned to a phase without a crosswalk.
3. Binary/archive content was indexed but not fully extracted: two filesystem ZIPs, two Hero ZIPs in the Aug-5 stash, and five Vahi DOCX files are potential embedded evidence.
4. Git only exposes a branch name `sitaram-phase-2` and one content label, `Phase 6 — Ask GenZ AI + Knowledge Center + URMS Engine`; neither proves the complete Phase 2 or Phase 6 decision block.

Thus the dominant classifications are **A (primary files absent from visible sources), C/D (content may use other terminology or be embedded in missing manuals), E (some evidence exists in backups/stash), F (historical references only), and G (topic evidence cannot be associated to phase numbers)**. There is no current evidence that a complete phase ledger was merely overlooked as a plain-text file.

### Phase matrix

| Phase | Found? | What was found | What is missing | Searched source | Possible next source |
|---:|---|---|---|---|---|
| 1 | No | Unnumbered business/governance evidence | Question, options, Founder answer, document update | Current, vaults, stash names, Git | Original MEM/BRS exports; email/Drive backups |
| 2 | Reference only | Git branch name `sitaram-phase-2` | Phase scope and decisions | Git log/stash | Reflog objects; workstation/editor history |
| 3 | No | Unnumbered route/service evidence | Complete decision block | Same | WPB/BRS archive |
| 4 | No | Unnumbered data/role evidence | Complete decision block | Same | DBB/DPB archive |
| 5 | No | Unnumbered AI/business evidence | Complete decision block | Same | AOM/KPL archive |
| 6 | Partial | “Ask GenZ AI + Knowledge Center + URMS Engine”; matching code | Exact questions/options/Founder wording/version | Vault, current AI/URMS, stash | AOM/KPL, phase minutes, ZIP contents |
| 7 | No | Unnumbered architecture evidence | Complete decision block | Current/vault/stash | MEM/BRS |
| 8 | No | Same | Same | Same | MEM/BRS |
| 9 | No | Same | Same | Same | MEM/BRS |
| 10 | No | Same | Same | Same | MEM/WPB |
| 11 | No | Same | Same | Same | WPB/DPB |
| 12 | No | Same | Same | Same | DBB/DPB |
| 13 | No | Same | Same | Same | AOM/KPL |
| 14 | No | Same | Same | Same | KPL/BRS |
| 15 | No | Same | Same | Same | DBB/operational sheets |
| 16 | No | Same | Same | Same | DPB/dashboard specifications |
| 17 | No | Same | Same | Same | RPN/partner requirement files |
| 18 | No | Same | Same | Same | Customer-account requirements |
| 19 | No | Same | Same | Same | ERP/admin blueprint |
| 20 | No | Same | Same | Same | Pricing/quotation/payment sheets |
| 21 | No | Same | Same | Same | Support/SLA documents |
| 22 | No | Same | Same | Same | Technical architecture/route definitions |
| 23 | No | Git chronology and implementation artifacts | Decision-to-file chronology | Git/stash/current | Reflog, IDE timeline, external Git clone |
| 24 | No | Aug-5 Vahi artifacts and checkpoint code | Original Phase 24 decision block | stash/vault/Vahi docs index | Extract five DOCX files and associated source package |

The repeated “same” means topic-level evidence exists but no reliable phase association exists. It is not a claim that the underlying business content is absent.

## 3. MEM/AOM/KPL/WPB/DBB/DPB/BRS Coverage

| Document | Found? | Source/version/date | Completeness | Approval/lock | Phases represented | Website / ERP / DB / AI coverage | Missing/conflicts |
|---|---|---|---|---|---|---|---|
| MEM | No complete document | Founder premise; KHEM recovery rules; date unknown | Low | Founder authority implied; no manual lock | Unknown | Governance across all areas inferred | Sections, version, approvals, change/supersession ledger missing |
| AOM | Substitute evidence | GenZ engine, AI types/services, disclosures; current/f51 | Medium behavior, zero manual | No AOM lock found | Phase 6 partial | AI intake, context, search, escalation; ERP handoff partial | Privacy, prohibited-action and approval matrix not canonical |
| KPL | Substitute evidence | `ai-knowledge.ts`, Hero prompts, semantic search | Medium content, incomplete approval | Some approved language; no library ledger | Phase 6 partial | Website/AI strong; ERP escalation partial | Golden Q&A completion/review/version status |
| WPB | Substitute evidence | routes, navigation, Hero locks, shell backups | High implementation, zero blueprint | SITARAM Hero locks; KHEM shell evidence | Unknown | Website strong; handoffs partial | Final navigation/interlinking, route intent and page approval ledger |
| DBB | Substitute evidence | backend Prisma plus web operational types | Low/medium and conflicting | None found | Unknown | Website forms modeled; ERP client types broad | System of record, full entities, privacy/retention/audit, migrations |
| DPB | Substitute evidence | Admin/Customer/Partner dashboards and services | Medium implementation | None found | Unknown | ERP/dashboard broad; DB dependency weak | Roles, permission matrix, Founder approval workflow, KPI definitions |
| BRS | Substitute evidence | validation, policies, Vahi/RPN copy, tests | Medium scattered rules | Individual locks/approved copy only | Unknown | Cross-cutting coverage | Consolidated requirements, precedence and supersession history |

Core documents found as complete artifacts: **0/7**. All seven have substitute evidence, but substitutes must not be promoted to canonical manuals.

## 4. Customer-Facing Pre-Trial Architecture

### Master tree

```text
HOME /
├─ Global header, sidebar, footer
├─ Rotating Hero workspace
│  ├─ Hero card + page-specific image/content
│  ├─ contextual GenZ AI
│  ├─ Hero-specific trust where established
│  ├─ Explore CTA/content
│  ├─ arrows + one dots system
│  └─ Core Services (shared current dataset; variants unresolved)
├─ PitruMoksha Gaya /pitru-moksha-gaya
│  ├─ online
│  └─ offline
├─ Ritual Services /ritual-services
│  ├─ online
│  └─ offline
├─ Travel Assistance /travel-assistance
│  ├─ requests
│  └─ success
├─ Vahi Records /vahi-records
├─ Religious Partners /religious-partners → /register
├─ Ask GenZ AI /zen-g
├─ Knowledge Center /knowledge-center
├─ Service catalog /services → /services/[slug]
├─ Customer account /login → /dashboard
├─ Tracking /tracking
└─ Contact/support/policies
```

### Route review

| Route/group | Purpose / parent / children | CTA/form/AI | ERP handoff | Current / pre-trial / conflict |
|---|---|---|---|---|
| `/` | Global discovery root; five rotating business states | Hero CTA, Explore, AI | Inquiry/service entry | Current recovered; pre-trial rotating intent strong; per-Hero Core Services unresolved |
| `/pitru-moksha-gaya` | Fixed Pitru landing; online/offline children | Inquiry and contextual AI | URMS/CRM/admin | Current; strong Aug-4 evidence |
| Pitru online/offline | Service-mode detail | Inquiry/booking intent | Admin/partner coordination | Current; source-backed |
| `/ritual-services` | Fixed Ritual landing; online/offline children | Ritual inquiry/context AI | CRM/URMS/RPN | Current; locked Hero evidence |
| Ritual online/offline | Ritual-mode detail | Forms/CTA | Admin/partner | Current; source-backed |
| `/travel-assistance` | Full India/Nepal Travel landing | Travel inquiry/context AI | Travel ops/CRM | Current recovered; request/success children exist; more children unestablished |
| `/vahi-records` | Confidential lineage guidance | Vahi inquiry/context AI | Vahi coordinator/admin/custodian | Current approved-content owner; legacy page conflicts; no child-route contract |
| `/religious-partners` | Partner-network information | Register CTA/context AI | RPN/admin | Current; dashboard access policy unresolved |
| `/register` | Customer/partner registration | Registration form | Auth/RPN/customer records | Current; role/boundary needs review |
| `/zen-g` | Standalone assistant | AI/lead/reference controls | Knowledge/CRM/URMS | Current; Phase 6 partial |
| `/knowledge-center` | Central knowledge repository | Central AI and topic links | Knowledge/URMS | Current; Golden Q&A incomplete |
| `/services`, `/services/[slug]` | Catalog and detail | Browse/book/inquire | Catalog/booking/admin | Current; public-to-CRUD boundary unresolved |
| `/login`, reset/verify routes | Account access | Auth forms | Auth/backend | Current; `/login` has runtime Failed to fetch defect |
| `/dashboard` | Role-routed account | Account actions | Admin/customer/partner modules | Current; partner/customer authorization intent conflicts |
| `/tracking` | Universal reference status | Lookup form/AI | URMS | Current client architecture; persistent owner uncertain |
| `/contact` | General/WhatsApp/mail inquiry | Contact form/query modes | CRM/support | Current; WhatsApp is test-mode fallback |
| `/complaint` | Complaint intake | Form/link | Support/admin | Current/partial lifecycle |
| `/grievance` | Escalation | Form/link | Admin/founder | Current/partial lifecycle |
| `/founder-support` | Highest support escalation | Form/link | Founder office | Current/partial lifecycle |
| `/about` and policies | Company/governance information | Navigation | Minimal | Current; content approval history incomplete |

Booking and payment are evidenced as workflow/components and internal routes, not conclusively approved as unrestricted public top-level destinations.

## 5. ERP/Admin Pre-Trial Architecture

| Module | Role/input/action/output | Public connection | Database/auth | Current vs pre-trial / conflict |
|---|---|---|---|---|
| Founder | Final authority, escalations, KPIs, approvals | Founder support, quotes, exceptions | Admin role; exact founder role model unclear | Partial; Founder-specific permissions missing |
| Admin/ERP | Operate requests, users, services and approvals | All handoffs | Role auth/backend | Implemented breadth; blueprint absent |
| CRM | Lead/customer relationship intake and management | Contact, AI, inquiries | Web service/types | Client architecture; persistence uncertain |
| BRM | Business/booking relationship concept | Booking/service lifecycle | Source not established | Historical name only/conflicting |
| URMS | Universal request/status/history | Tracking and all inquiries | Web service/types | Strong client model; backend gap |
| QRSR | Quote/request/service-record concept | Quote/service handoff | Definition absent | Naming conflict |
| RPN | Partner registration/verification/assignment | Religious Partners | Partner schema/auth | Partly implemented; access policy unresolved |
| Customers | CRUD/profile/history | Account/forms | Customer Prisma model | Implemented; exposure boundary unresolved |
| Partners | CRUD/profile/verification | Registration | ReligiousPartner model | Implemented; dashboard intent unresolved |
| Requests | Intake/assessment/status | Business forms | Pitru request plus web types | Partial model coverage |
| Bookings | Schedule/status/cancel | Service/customer flows | Booking client API; backend conflict | Implemented UI/client, system of record unclear |
| Services/categories | Catalog, pricing metadata, activation | `/services` | Admin services clients | Implemented |
| Quotations | Create/revise/approve | Customer selection | quote types/service | Client architecture only/partial |
| Invoices | Billing document | Commercial flow | No canonical model found | SOURCE NOT ESTABLISHED |
| Payments | Checkout/status/refund concept | Booking/quote | payment types/service | Client architecture; authority partial |
| Assignments | Partner/service allocation | Confirmed request | dashboard/URMS concepts | Transition not fully established |
| Complaints/grievances | Triage/escalate/resolve | Public support routes | inquiry/case concepts | Partial lifecycle |
| Founder Support | Executive escalation | Public Founder route | Owner/status schema unclear | Partial |
| Knowledge/Q&A | Review and publish approved guidance | AI/Knowledge | Local trees; no approval DB | Incomplete Golden Q&A |
| Reports | Operational visibility | Indirect | dashboard service | Partial |
| Audit/history | Trace state and decisions | Tracking/status | URMS types; vault service conflict | Partial |

## 6. Customer → ERP End-to-End Flow

| Transition | Historical/current module | Evidence status |
|---|---|---|
| Customer → public website | Next.js public shell/App Router | Established |
| Website → service/Hero | Hero data, sidebar and CTA routes | Established |
| Hero → Explore/inner page | Explore href/business route | Established; some final linking historically unfinished |
| Page → GenZ AI/Knowledge | Contextual Hero assistant, `/zen-g`, Knowledge Center | Established/Golden Q&A partial |
| AI/page → inquiry | `submitUnifiedInquiry`, business forms | Established client handoff |
| Inquiry → request record | Inquiry API/URMS types | Partial; backend persistence owner not established |
| Request → human assessment | Admin/CRM/URMS architecture | Supported concept; exact queue/state SOURCE NOT ESTABLISHED |
| Assessment → quotation | Quote generator/service | Partial client implementation |
| Quote → customer approval | Quote status/UI | Partial; approval persistence SOURCE NOT ESTABLISHED |
| Approval → booking | Booking client/routes | Partial; orchestration SOURCE NOT ESTABLISHED |
| Booking → payment | Payment modal/service | Partial; provider/invoice SOURCE NOT ESTABLISHED |
| Payment → assignment | RPN/dashboard concepts | SOURCE NOT ESTABLISHED as complete transition |
| Assignment → execution | Partner/service architecture | Concept established; execution workflow partial |
| Execution → tracking | URMS statuses/history | Partial |
| Tracking → documentation | URMS/communications concepts | SOURCE NOT ESTABLISHED as complete document flow |
| Documentation → completion | Completion statuses/concept | Partial |
| Completion → history/support | dashboard, notifications and support routes | Partial |

## 7. SHYAM → SITARAM → KHEM Evolution

| Architecture item | SHYAM | SITARAM | KHEM | Classification |
|---|---|---|---|---|
| Application root | Legacy `frontend` + backend | Public website layered onto project | `apps/web` canonical | SUPERSEDED/refined |
| Public shell | Basic site layout | Branded permanent shell, locked Heroes | Recovered shared shell | REFINED |
| Hero system | Generic/limited pages | Hero 1/2 visual masters | Five contextual Hero states | REFINED, numbering conflicting |
| Business pages | Pitru/Travel trial flows | Rich branded pages | Five fixed landing pages | REFINED |
| AI | Little/no original evidence | Hero assistant concepts | Shared contextual GenZ AI/Knowledge/URMS | REFINED |
| Navigation | Basic routes | Sidebar/shell intent | Configured public navigation; final interlinking partial | REFINED/PARTIAL |
| Customer dashboard | CRUD/account | Coexists | Role-routed dashboard retained | UNCHANGED/REVIEW |
| Partner dashboard | CRUD/role account | Coexists | Registration emphasized; access decision absent | CONFLICTING |
| ERP/Admin | CRUD dashboards | Not primary SITARAM focus | Broader CRM/URMS/quote/payment client modules | REFINED/PARTIAL |
| Database | Prisma baseline | No strong change evidence | Web types exceed backend schema | CONFLICTING |
| Vahi | Earlier large page | Visual/content expansion | Aug-5 approved-content owner | DUPLICATED/REFINED |
| Governance | Git implementation record | Explicit Hero locks | Evidence-first recovery/no-silent-change | REFINED |
| Master Vault | Not evidenced | Not evidenced | Separate secrets project appears | UNKNOWN |

## 8. Current Runtime Defects

| ID | Defect | Evidence | Likely layer | Action now |
|---|---|---|---|---|
| RD-01 | `/login` shows “Sign in to the ERP” then “Failed to fetch” | Founder screenshot/report | Most likely API/backend or environment/configuration; frontend successfully renders the form. Authentication/database cause remains unknown without diagnostics. Credentials must not be blamed. | Record only; inspect endpoint/base URL/backend availability later with authorization |

## 9. Exclusion Candidates

| ID | Item | SHYAM / SITARAM / KHEM / current | Dependencies and conflict | If removed / retained | Recommendation |
|---|---|---|---|---|---|
| EX-01 | Root Hero duplicate tree | Earlier implementation / superseded visual work / Golden runtime / inactive files | Imports, tests, TS compilation; duplicate ownership | Removal may break hidden imports; retention confuses ownership | EXCLUDE FROM RUNTIME; historical evidence only |
| EX-02 | Component HeroCarousel duplicate | f51 owner / shared carousel / later Golden owner / inactive | Tests/imports | Same | FOUNDER REVIEW |
| EX-03 | Root hard-coded PublicHeroShell | Trial/alternate / duplicates shell / KHEM component owner / inactive | Header, sidebar, AI, footer | Wrong import duplicates global UI; removal may lose evidence | EXCLUDE FROM RUNTIME |
| EX-04 | Root sidebar duplicate | Earlier navigation / SITARAM shell / component owner / inactive | Navigation imports | Wrong owner can change routes | FOUNDER REVIEW |
| EX-05 | Legacy `frontend` | SHYAM canonical / superseded / KHEM `apps/web` / deleted working copy | Historical backend/UI evidence | Removal loses provenance; retention outside runtime is safe | HISTORICAL EVIDENCE ONLY |
| EX-06 | Partner dashboard assumptions | Original role dashboard / retained / later decision unknown / implemented | Auth, RPN, assignment | Removing may destroy intended workflow; retaining may expose access | FOUNDER REVIEW |
| EX-07 | Direct booking CRUD routes | SHYAM operational UI / retained / boundary unresolved / present | Auth, customer, booking | Removal breaks ops; retention may expose internal CRUD | FOUNDER REVIEW |
| EX-08 | Generic Pitru-only Travel page | Trial Travel / superseded by rich page / wider Travel scope / source superseded | Request/success links | Removing old route code after proof reduces confusion; retaining risks regression | SUPERSEDE, no physical deletion yet |
| EX-09 | Large VahiRecordsPage | Earlier rich page / expanded content / approved-content owner / inactive alternate | Forms, privacy, price matrix | Removal may lose sections; retention creates competing truth | HISTORICAL EVIDENCE ONLY + review |
| EX-10 | Master-vault secret service | Absent / absent / unrelated name collision / separate project | Secrets/deployment | Removal could discard security work; retention confuses content-vault meaning | FOUNDER REVIEW |

## 10. Missing Content

| ID | Missing / why required | Last reference / possible location / substitute | Priority |
|---|---|---|---|
| MC-01 | MEM; establishes authority/change precedence | Founder premise; external document stores/backups; recovery rules substitute | P0 |
| MC-02 | AOM; governs safe AI behavior | premise; AOM exports/Drive/email; GenZ code substitute | P0 |
| MC-03 | KPL; identifies approved versus pending answers | premise; knowledge exports; AI trees substitute | P0 |
| MC-04 | WPB; establishes routes/navigation/page ownership | premise; Hero ZIPs/locks; current routes substitute | P0 |
| MC-05 | DBB; establishes system of record/privacy/lifecycle | premise; schema backups/spreadsheets; Prisma/types substitute | P0 |
| MC-06 | DPB; establishes roles/modules/permissions | premise; dashboard specs; components substitute | P0 |
| MC-07 | BRS; establishes business-rule precedence | premise; requirement sheets/Word/PDF; scattered rules substitute | P0 |
| MC-08 | Phase 1–5 records; required for early decision chronology | phase premise and `sitaram-phase-2`; reflog/external records | P0 |
| MC-09 | Phase 7–24 records; required for complete master | premise; archives/vault/external records | P0 |
| MC-10 | Completed Golden Q&A; required before customer AI approval | placeholder responses; KPL/approved-content; partial trees | P1 |
| MC-11 | Vahi child/floating route specification | Vahi content references; five stash DOCX files; long-form page substitute | P1 |
| MC-12 | Travel child-route master | current request/success; Travel vault/source; no broader substitute | P1 |

## 11. Source Conflicts

| # | Old source | New source | Conflict / impact | Later vs stronger evidence | Founder decision |
|---:|---|---|---|---|---|
| 1 | Missing manuals/phase premise | Topic-level code/reports | Cannot convert implementation into approved phase decision; affects all areas | Code is later; premise is stronger about existence, not content | Yes |
| 2 | Historical Hero folder numbering | Current business-ID order | Vahi/Travel/Partner numbers differ; customer labels/assets could mix | Current is later; locked business content stronger than numbering | Yes, naming policy |
| 3 | Earlier Hero/Public Shell trees | Golden/component runtime owner | Duplicate active-candidate components; regression risk | Current barrel later; Aug-4 locks stronger visually | Yes |
| 4 | Intended navigation documents | Current routes/contact fallbacks | Final interlinking historically unfinished; dead/wrong CTA risk | Current later; explicit approved links stronger where available | Yes |
| 5 | Partial/placeholder Q&A | Current AI exposure | Guidance may look complete when approval is not | Current implementation later; no complete approval ledger | Yes |
| 6 | Original partner dashboard | KHEM registration/admin emphasis | Partner self-service authority unclear; security/ERP impact | KHEM later; direct supersession evidence missing | Yes |
| 7 | URMS/QRSR/CRM/BRM terms | Current overlapping services/types | Ownership and reporting ambiguity | Current code later; manuals would be stronger | Yes |
| 8 | Narrow backend Prisma schema | Rich web operational model | Handoffs may not persist; ERP/database mismatch | Web model later; DBB approval absent | Yes |
| 9 | Content “Master Vault” concept | Standalone cryptographic `master-vault` project | Name/role ambiguity; deployment/security impact | Secret project later/parallel; no integration approval | Yes |

## 12. Founder Decisions

### FD-01 — Canonical Hero files

- Question: consolidate/rename Golden owner or retain alias and inactive evidence?
- Option A: consolidate canonical filenames after dependency proof.
- Option B: retain current alias and exclude duplicates from runtime.
- Other: archive a manifest-only evidence snapshot.
- Current: Golden-named runtime plus duplicates. Pre-trial: shared Hero system. Latest KHEM: one owner required.
- Dependencies/risk: imports, tests, history; premature removal may break runtime.
- **FOUNDER DECISION: __________**

### FD-02 — Public Shell duplicates

- Option A: consolidate component-folder owner. Option B: retain evidence but exclude root alternate. Other: archive separately.
- Current: component owner active. Intent: one global shell. Risk: duplicate header/AI/footer if wrong import wins.
- **FOUNDER DECISION: __________**

### FD-03 — Partner dashboard access

- Option A: retain self-service. Option B: restrict to registration/status. Other: admin-only with later partner portal.
- Current: role dashboard exists. Pre-trial: partner account. Latest KHEM: verification/admin emphasis, no conclusive removal rule.
- Risk: security versus workflow loss.
- **FOUNDER DECISION: __________**

### FD-04 — Customer booking CRUD exposure

- Option A: protect existing routes. Option B: replace public access with guided flow. Other: internal-only CRUD.
- Current: routes present. Intent/boundary unresolved. Dependencies: auth, booking, customer data.
- **FOUNDER DECISION: __________**

### FD-05 — Vahi page owner

- Option A: keep approved-content owner. Option B: restore legacy page. Other: evidence-reviewed merge.
- Current: approved-content route; pre-trial includes large page; Aug-5/f51 favors approved content.
- Risk: privacy/content loss or duplication.
- **FOUNDER DECISION: __________**

### FD-06 — Vahi child/floating pages

- Option A: omit until sources found. Option B: approve new design later. Other: recover from DOCX/archive first.
- Current: none established. Risk: invented routes/dead links.
- **FOUNDER DECISION: __________**

### FD-07 — Per-Hero Core Services

- Option A: retain shared dataset. Option B: approve contextual datasets. Other: hybrid shared-plus-highlight.
- Current: shared canonical dataset. Intent: Hero-specific possibility not fully evidenced.
- **FOUNDER DECISION: __________**

### FD-08 — Golden Q&A

- Option A: restrict AI until review. Option B: expose approved subset. Other: complete KPL review first.
- Current: mixed approved and placeholder answers. Risk: inaccurate authoritative appearance.
- **FOUNDER DECISION: __________**

### FD-09 — URMS/QRSR/CRM/BRM terminology

- Option A: retain distinct systems. Option B: normalize under URMS/CRM. Other: recover manuals before naming.
- Current: overlapping models; pre-trial definitions missing.
- **FOUNDER DECISION: __________**

### FD-10 — Backend data model

- Option A: expand Prisma later. Option B: integrate external operational API. Other: reduce web scope.
- Current: narrow backend, rich client. Risk: persistence/security/migration failures.
- **FOUNDER DECISION: __________**

### FD-11 — Master Vault service

- Option A: integrate as secret service. Option B: keep separate. Other: historical only.
- Current: separate project; no pre-trial relationship established.
- **FOUNDER DECISION: __________**

### FD-12 — Historical trial frontend

- Option A: archive permanently. Option B: retain recovery copy. Other: approve deletion only after evidence extraction.
- Current: deleted working tree, recovery copy exists; KHEM canonical app is `apps/web`.
- **FOUNDER DECISION: __________**

## 13. Recovery Search Priorities

### P0 — architecture blockers

1. Search original user document locations, cloud drives, email attachments, desktop downloads, Office AutoRecover and backups for exact and expanded names of MEM/AOM/KPL/WPB/DBB/DPB/BRS.
2. Inspect Git reflog and unreachable objects non-destructively; search all clones/remotes/export bundles for phase ledgers and document history.
3. Extract and text-index the two filesystem ZIPs, the two SITARAM Hero ZIPs in `stash@{0}^3`, and all five Vahi DOCX files into a temporary/read-only analysis location.
4. Search spreadsheets, Word/PDF metadata and internal headings for `Round`, `Stage`, `Question`, `Decision Block`, `Founder Answer`, `Lock`, `Section 1–24`, and date sequences—not only `Phase`.

### P1 — required before coding

5. Correlate source comments, tests, migrations, route definitions and dashboard modules with recovered manual sections.
6. Recover the database/dashboard blueprints and system-name glossary for URMS/QRSR/CRM/BRM.
7. Recover the Golden Q&A approval ledger and Vahi/Travel route contracts.

### P2 — before visual approval

8. Compare locked screenshots/ZIP assets against localhost at agreed viewports.
9. Build a navigation/CTA destination ledger from approved docs and current routes.

### P3 — historical provenance

10. Inventory the legacy `frontend`, duplicate trees, old asset versions and `master-vault` project after runtime dependencies are proven.

## 14. What Is Safe To Do Next

- Perform read-only extraction/indexing of ZIP/DOCX/PDF/XLSX evidence into a separate analysis directory.
- Capture Git object, hash, timestamp and source-path provenance.
- Diagnose `/login` with read-only frontend network/API/backend/environment checks.
- Build question-level Golden Q&A and route/link approval matrices.
- Present FD-01 through FD-12 to the Founder with localhost screenshots and dependency evidence.
- Continue preserving current runtime and all historical sources.

## 15. What Must NOT Be Changed Yet

- Do not delete or consolidate Hero/Public Shell duplicates.
- Do not remove the legacy frontend evidence.
- Do not decide Partner dashboard or booking-route access.
- Do not normalize URMS/QRSR/CRM/BRM names.
- Do not expand or replace the database schema.
- Do not invent Vahi/Travel child routes or missing Q&A.
- Do not alter navigation, ERP login, payment, quote, assignment or support workflows.
- Do not integrate or discard `master-vault`.
- Do not commit, push, deploy, redesign or begin cleanup before Founder review.
