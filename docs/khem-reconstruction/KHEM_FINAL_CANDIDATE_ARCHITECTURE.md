# KHEM Final Candidate Architecture

Status: Founder-ready candidate; no implementation authority.  
Prepared: 2026-08-12  
Decision authority: Founder only.

## Control note

The named primary source, `KHEM_COMPLETE_FOUNDER_CLASSIFICATION.md`, was not present when this register was prepared. Therefore no Founder decision is inferred. The surviving comparison matrix, exclusion/supersession register, pre-trial master map, and three source-discovery maps are the evidence base. Classifications below are candidates only. Where an item has several flags, its primary classification is counted once.

## A. Protected final keep register

| ID | Block | Area | Item | Canonical owner | Surface | Why keep | Dependencies | Strongest source | Evidence status | Protection level |
|---|---:|---|---|---|---|---|---|---|---|---|
| PK-01 | 1 | Global shell | Fixed Header | public application shell | Shared | Stable navigation and identity owner | route tree | 24-block comparison matrix | Established | Architecture keep |
| PK-02 | 1 | Global shell | Fixed Sidebar | public application shell | Shared | Stable cross-business navigation | single sidebar ownership | exclusion register | Established; root duplicate conflicts | Architecture keep |
| PK-03 | 1 | Global shell | Fixed Footer | public application shell | Shared | Stable legal/contact close | content and links | pre-trial master map | Established | Architecture keep |
| PK-04 | 2 | Homepage | Five-card rotating workspace | homepage composition | Customer | Connects the five business identities without changing the fixed shell | canonical hero owner | 24-block comparison matrix | Strong reconstructed evidence | Architecture keep |
| PK-05 | 2 | Homepage | Trust strip, Explore, controls, Core Services | homepage composition | Customer | Preserves the approved visible interaction model | hero context | 24-block comparison matrix | Strong reconstructed evidence | Content keep |
| PK-06 | 3 | Business | PitruMoksha Gaya | `/pitru-moksha-gaya` owner | Customer | Supported primary business landing | inner-page content | pre-trial master map | Established | Content keep |
| PK-07 | 4 | Business | Ritual Services | `/ritual-services` owner | Customer | Supported primary business landing | service catalog | pre-trial master map | Established | Content keep |
| PK-08 | 5 | Business | India-and-Nepal Travel Assistance | `/travel-assistance` owner | Customer | Latest broad business identity; supersedes generic Pitru-only travel | travel service content | exclusion register | Established candidate | Content keep |
| PK-09 | 6 | Business | Vahi Records | `/vahi-records` owner | Customer | Supported business landing; legacy page remains evidence only | verified child routes | pre-trial master map | Established at landing level | Content keep |
| PK-10 | 7 | Business | Religious Partner / Registration | `/religious-partners` owner | Shared | Supported acquisition and verification entry | partner operating model decision | pre-trial master map | Established entry; downstream disputed | Architecture keep |
| PK-11 | 8 | Assistance | Ask GenZ AI contextual panel | AI experience owner | Customer | Supported assistance mechanism across business contexts | answer provenance and safe fallback | comparison matrix | Established shell; content quality mixed | Architecture keep |
| PK-12 | 9 | Knowledge | Knowledge Center | knowledge owner | Shared | Supported controlled information surface | publication status and Q&A governance | pre-trial master map | Established concept | Content keep |
| PK-13 | 10 | Conversion | Inquiry/request intake | request service | Shared | Required public-to-internal handoff | consent, validation, request ID | customer-to-ERP map | Established pattern | Security keep |
| PK-14 | 11 | Commerce | Quotation to customer approval | quotation service | Shared | Supported assessment-to-booking gate | request, pricing authority | pre-trial master map | Established process | Architecture keep |
| PK-15 | 12 | Commerce | Booking and payment | booking/payment owners | Shared | Supported fulfilment contract | quotation approval, payment controls | pre-trial master map | Established process; route boundary unresolved | Security keep |
| PK-16 | 13 | Operations | Assignment and service execution | ERP operations | ERP | Supported fulfilment ownership | verified partner and booking | ERP/admin flow | Established process | Security keep |
| PK-17 | 14 | Customer care | Tracking, complaints, grievances, Founder Support | support owners | Shared | Supported return and escalation paths | authenticated lookup and audit | customer-facing flow | Established capabilities | Security keep |
| PK-18 | 15 | Records | Customer account/history/documentation | account and records owners | Shared | Supported post-service continuity | identity, authorization, retention | pre-trial master map | Partial implementation evidence | Security keep |
| PK-19 | 16 | Governance | Reports and audit/history | ERP governance | ERP | Required traceability and oversight | role access and immutable events | ERP/admin flow | Established architecture | Security keep |
| PK-20 | 17 | Data boundary | Role-based public/internal separation | auth and policy owners | Shared | Prevents customer and partner access to internal records | resolved role model and route guards | source maps | Strong requirement; details partial | Security keep |

Protected keep count: **20**. No unresolved item is marked `HARD LOCK CANDIDATE`.

## B. Clear candidate classifications

| Primary ID | Item | Primary status | Secondary flag | Candidate treatment |
|---|---|---|---|---|
| ES-08 | Generic Gaya/Pitru-only Travel page | SUPERSEDE | Preserve provenance | Replace runtime ownership with broad India-and-Nepal Travel Assistance; do not delete. |
| ES-02 | Root Hero duplicate tree | EXCLUDE FROM RUNTIME | Source conflict | Canonical hero ownership remains with the application component tree; no physical action. |
| ES-04 | Root hard-coded `PublicHeroShell` | EXCLUDE FROM RUNTIME | Competing shell ownership | Prevent future runtime ownership only after approval; no physical action now. |
| ES-01 | Legacy frontend application | HISTORICAL EVIDENCE ONLY | Reconstruction evidence | Preserve; do not restore runtime ownership. |
| ES-09 | Large legacy Vahi Records page | HISTORICAL EVIDENCE ONLY | Source conflict/useful evidence | Preserve as Vahi evidence; do not make canonical wholesale. |
| ES-13 | Older hero image variants | HISTORICAL EVIDENCE ONLY | Visual provenance | Preserve for comparison; no runtime claim. |
| ES-14 | Broken-state Aug-5 stash | HISTORICAL EVIDENCE ONLY | Unsafe restore source | Preserve only as evidence; never wholesale restore. |

## C. Founder review register

| ID | Item | Current implementation | Older state | Latest KHEM evidence | Quality | Customer / ERP / security impact | Dependencies | Risks (keep / exclude / supersede) | Supported options | Safe default | Founder decision |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| FR-01 | Component `HeroCarousel.tsx` duplicate | Duplicate candidate exists beside canonical hero composition | Multiple carousel/hero owners survived | One owner is required; exact approved component not conclusively named | Conflict | Visual regression / none direct / competing ownership | canonical imports and visual baseline | Duplicate divergence / lost useful behavior / regression during replacement | A canonicalize current imported owner; B retain inactive as evidence; other compare before consolidation | Keep current runtime owner unchanged | |
| FR-02 | Root sidebar duplicate | Root duplicate competes with shell sidebar | Older sidebar variants survived | Single fixed sidebar is supported | Conflict | Navigation inconsistency / none direct / link-policy drift | import graph and route tree | Drift / lost evidence / replacement regression | A keep canonical shell owner; B archive duplicate later; other extract proven deltas | Keep current runtime unchanged | |
| FR-03 | Partner dashboard access | Role/dashboard routing exists | Full partner self-service was envisioned | Registration, verification and admin control emphasized; no direct removal rule | Mixed | Partner UX / operational control / customer-data exposure | auth roles, row-level access, assignment policy | Exposure and complexity / loss of self-service / migration cost | A self-service; B admin-controlled; other limited portal | Deny unverified/internal-data access; preserve registration | |
| FR-04 | Customer and booking CRUD exposure | `/customers/*` and `/bookings/*` families are reported; canonical code/API boundary not located | CRUD-style pages existed | No conclusive rule assigns public, customer, ERP or admin ownership | Weak/conflict | PII and booking UX / record integrity / authorization risk | route inventory, API guards, identity ownership | Overexposure / operational loss / breaking migration | A authenticated self-service subset; B internal-only; other split read/write | Treat as non-public until verified; do not alter runtime | |
| FR-05 | `master-vault` secret service | Referenced in surviving material; authoritative source/contract absent | Secret-management intent implied | Meaning and approved runtime role not established | Unestablished | None direct / deployment dependency / critical secret exposure | owner, threat model, key lifecycle | Unknown secret path / broken integrations / unsafe replacement | A document and retain isolated; B supersede with approved secret manager; other remove only after dependency proof | Do not depend on or expose it | |
| FR-06 | QRSR/BRM terminology | Labels appear in architecture material | Different operational acronyms survived | Definitions and boundaries are not established | Unestablished | Confusing handoff / ambiguous ownership / authorization ambiguity | Founder definitions and data model | Misrouting / lost concepts / false normalization | A define as separate modules; B map to known modules; other treat as labels only | Do not route or authorize based on acronyms | |
| FR-07 | Placeholder Golden Q&A in customer AI | Customer AI can present non-final answer material according to reports | Golden Q&A was intended | Golden Q&A remains unfinished | Strong | Misrepresentation / content administration / trust and safety | answer status metadata and publication gate | Placeholder leakage / loss of fallback UX / unsupported generated claims | A approved-only answers; B approved plus clearly labelled safe fallback; other disable answer path | Never label draft/placeholder as Founder-approved | |

## D. Customer-facing candidate map

| Route/node | Parent | Purpose | Canonical owner | AI context | Data/request created | ERP handoff | Status | Classification |
|---|---|---|---|---|---|---|---|---|
| `/` | Customer | Home and five-business gateway | homepage composition | Rotates with active hero | analytics only if consented | none required | KEEP | KEEP |
| Header / Sidebar / Footer | `/` fixed shell | Navigation, identity, contact/legal | public shell | none | none | none | KEEP | KEEP |
| Hero workspace / Trust / Explore / controls / Core Services | `/` | Business discovery | homepage composition | active hero context | inquiry only after action | request service | KEEP | KEEP |
| Hero 1 | `/` | PitruMoksha Gaya discovery | `/pitru-moksha-gaya` | Pitru context | inquiry/request | request intake | KEEP | KEEP |
| Hero 2 | `/` | Ritual service discovery | `/ritual-services` | ritual context | inquiry/request | request intake | KEEP | KEEP |
| Hero 3 | `/` | India/Nepal travel discovery | `/travel-assistance` | travel context | inquiry/request | request intake | KEEP | KEEP |
| Hero 4 | `/` | Vahi records discovery | `/vahi-records` | Vahi context | inquiry/request | request intake | KEEP | KEEP |
| Hero 5 | `/` | Partner registration discovery | `/religious-partners` | partner context | registration | verification queue | KEEP | KEEP |
| `/pitru-moksha-gaya` | Hero 1 | Fixed business landing | business-page owner | contextual | inquiry/request | request intake | KEEP | KEEP |
| `/ritual-services` | Hero 2 | Fixed business landing | business-page owner | contextual | service request | request intake | KEEP | KEEP |
| `/travel-assistance` | Hero 3 | Fixed broad business landing | business-page owner | contextual | travel request | request intake | KEEP | KEEP |
| Generic Pitru-only travel page | Hero 3 historical | Narrow obsolete identity | legacy owner | uncertain | uncertain | uncertain | SUPERSEDE | SUPERSEDE |
| `/vahi-records` | Hero 4 | Fixed business landing | business-page owner | contextual | Vahi inquiry | request intake | KEEP | KEEP |
| Vahi child/inner pages | `/vahi-records` | Record-specific exploration | not conclusively enumerated | contextual | possible inquiry | unknown | SOURCE NOT ESTABLISHED | SOURCE NOT ESTABLISHED |
| `/religious-partners` | Hero 5 | Registration and verification entry | partner registration owner | contextual | partner application | admin verification | KEEP | KEEP |
| Partner login/dashboard | partner entry | Self-service operations | role/dashboard owner | none | status/documents | ERP assignments | FOUNDER REVIEW | FOUNDER REVIEW |
| Ask GenZ AI | Any supported business page | Guided assistance | AI experience owner | parent page context | question/session | request only on explicit conversion | FOUNDER REVIEW | FOUNDER REVIEW |
| Knowledge Center | Global/customer | Curated information | knowledge owner | retrieval context | query/analytics | none unless inquiry | KEEP | KEEP |
| Customer account/history | Global/authenticated | View owned requests/bookings/history | account owner | account-safe only | account activity | customer/booking services | KEEP | KEEP |
| Tracking | Account or tracking link | Status lookup | tracking owner | none | lookup/audit event | fulfilment status | KEEP | KEEP |
| Booking / payment | approved quotation | Confirm and pay | booking/payment owners | none | booking/payment record | booking and finance | KEEP | KEEP |
| Contact / Mail / Raise Inquiry / WhatsApp | Global | Human contact and intake | contact/request owner | optional context | inquiry and consent | request/CRM | KEEP | KEEP |
| Complaint / grievance / Founder Support | Account/global | Escalation | support owners | safe triage only | case record | support queues | KEEP | KEEP |
| `/customers/*` | unresolved | Customer record CRUD family | not established | none | personal data | customer store | FOUNDER REVIEW | FOUNDER REVIEW |
| `/bookings/*` | unresolved | Booking CRUD family | not established | none | booking/personal data | booking store | FOUNDER REVIEW | FOUNDER REVIEW |

Child routes not explicitly evidenced are not invented; their status remains source not established.

## E. ERP/admin candidate map

| Module | Role | Purpose / owner | Public input | Internal action / approval | Data access and output | Customer return / partner connection | Status | Classification |
|---|---|---|---|---|---|---|---|---|
| Founder | Founder | Governance and exception authority / Founder control | escalations | final policy decisions | broad audited oversight | Founder Support outcomes | KEEP | KEEP |
| Admin | Admin | Configuration and operations / admin shell | registrations, requests | verify, route, manage | scoped operational records | notices/status | KEEP | KEEP |
| ERP | Internal roles | System-of-record workflow / ERP owner | accepted requests | orchestrate fulfilment | operational records | status/output | KEEP | KEEP |
| CRM | Service team | Customer relationship/request handling | inquiry and consent | qualify and communicate | customer/contact/request | responses | KEEP | KEEP |
| BRM | Undefined | Acronym present; purpose not safely defined | unknown | must not authorize/route yet | unknown | unknown | SOURCE NOT ESTABLISHED | SOURCE NOT ESTABLISHED |
| URMS | Internal service team | Request management where established | request | assess and route | request record | request status | KEEP | KEEP |
| QRSR | Undefined | Acronym present; purpose not safely defined | unknown | must not authorize/route yet | unknown | unknown | SOURCE NOT ESTABLISHED | SOURCE NOT ESTABLISHED |
| RPN | Internal/partner network | Partner-network linkage where evidenced | partner registration | verify/connect partner | partner profile/eligibility | assignment connection | KEEP | KEEP |
| Customers | CRM/admin | Customer record stewardship | account/inquiry | validate, restrict, support | PII | account/support response | FOUNDER REVIEW | FOUNDER REVIEW |
| Partners | Admin/RPN | Registration, verification, eligibility | application | verify and manage | partner data | decision/assignment | FOUNDER REVIEW | FOUNDER REVIEW |
| Requests | CRM/URMS | Intake and assessment | inquiry/request | triage, assess | request and history | status/quotation | KEEP | KEEP |
| Bookings | Operations | Confirmed service record | approval/payment | schedule/manage | booking and PII | confirmation/tracking | FOUNDER REVIEW | FOUNDER REVIEW |
| Services / Categories | Admin | Catalog governance | discovery selection | curate and price rules | catalog | public offerings | KEEP | KEEP |
| Quotations | Authorized operations | Commercial proposal | request | prepare/approve | prices and terms | quotation | KEEP | KEEP |
| Invoices / Payments | Finance | Financial control | payment action | reconcile/refund as authorized | financial records | receipt/status | KEEP | KEEP |
| Assignments | Operations | Match booking to execution | none direct | assign verified provider | booking/partner minimum necessary | partner task/customer status | KEEP | KEEP |
| Complaints / Grievances / Founder Support | Support/governance | Escalation casework | case submission | investigate/resolve/escalate | case and audit | resolution | KEEP | KEEP |
| Knowledge/Q&A | Content authority | Govern customer answers | questions | review/publish/version | answer provenance | approved knowledge | FOUNDER REVIEW | FOUNDER REVIEW |
| Reports / Audit / History | Governance | Oversight and traceability | none direct | review/export per role | scoped aggregate/event data | exceptional notices only | KEEP | KEEP |

## F. Customer-to-ERP candidate flow

| From | Action | To | System owner | Data created | Approval | Customer visible? | Partner visible? | ERP only? | Evidence status |
|---|---|---|---|---|---|---|---|---|---|
| Customer | visits | Public website | public shell | optional consented analytics | none | Yes | Yes, public | No | Established |
| Public website | selects | Hero/business page | homepage/business owner | context | none | Yes | Yes, public | No | Established |
| Business page | explores | Inner page | business owner | context | none | Yes | Public only | No | Partial; exact children not established |
| Page | asks/reads | GenZ AI/Knowledge | AI/knowledge owner | query and provenance | publication gate for approved answers | Yes | Public only | No | Partial; Golden Q&A unfinished |
| Assistance/page | explicitly submits | Inquiry/request/registration/support | intake owner | consented request/contact record | validation | Yes | Own registration only | No | Established pattern |
| Intake | validates/persists | Request record | request service | request ID, consent, audit | system/authorized staff | Status only | No unless partner request | Yes | Established pattern |
| Request record | routes where defined | CRM/URMS | internal operations | assignment/triage events | role policy | Limited status | No | Yes | Established for CRM/URMS; QRSR not established |
| CRM/URMS | assesses | Human assessment | authorized team | notes, requirements | staff | Outcome/status | No | Yes | Established |
| Assessment | prepares | Quotation | quotation service | quotation/version | pricing authority | Yes | No | Internal until issued | Established |
| Quotation | customer accepts | Customer approval | quotation service | acceptance/audit | customer | Yes | No | No | Established |
| Approval | confirms | Booking | booking service | booking | policy/system | Yes | Necessary task later | No | Established; route boundary unresolved |
| Booking | pays | Payment | payment/finance owner | payment reference | provider/finance controls | Yes | No | Finance detail ERP-only | Established |
| Paid booking | schedules | Assignment | operations | assignment | authorized staff | Status | Minimum necessary | Yes | Established |
| Assignment | fulfils | Religious partner/service execution | operations/RPN | execution status | verified partner/admin | Status | Own assignment only under chosen model | Mixed | Partner model unresolved |
| Execution | updates | Tracking/documentation | tracking/records owner | events/documents | role policy | Owned status/docs | Own task subset | Mixed | Established concept; visibility policy partial |
| Documentation | closes | Completion | operations | completion/audit | authorized staff/customer acknowledgement where required | Yes | Own task result | Mixed | Established |
| Completion | returns | Account/history/support | account/support owner | history/support case | identity and role policy | Owned records | No customer history | No | Established concept |

Unsupported transitions—especially QRSR/BRM routing—remain blank by design and must not become dependencies.

## G. Partner architecture decision area

| Dimension | Model A — partner self-service | Model B — admin-controlled partner |
|---|---|---|
| Flow | Registration → login → dashboard → assignments → status/workflow → documents → communications | Registration → admin verification → tracking ID/external communication → admin assignment; no internal ERP/database exposure |
| Security | Requires partner identity, MFA/session policy, row/field authorization, audit and tenant isolation | Smaller external attack surface; strong admin controls and secure outbound communication still required |
| Customer-data exposure | Minimum assigned-customer data may be exposed; consent and field-level minimization required | No direct database access; admin sends only minimum task data through controlled channels |
| ERP ownership | Portal is a constrained ERP consumer, never system owner | ERP/admin remains sole internal owner |
| Operational complexity | Higher engineering, support, access-review and incident burden | Higher manual operations and communication burden |
| Dependencies | Auth role, verification, assignment API, document controls, revocation, audit | Admin capacity, verification queue, tracking IDs, secure messaging, audit |

Founder decision: ________________________

Safe interim principle: registration may remain visible, but no unverified partner should receive internal ERP or customer data.

## H. Customer/booking CRUD boundary

The reports identify these current route families, but the canonical source/API implementation was not located in the inspected root tree. They therefore remain deliberately unassigned.

| Route/API combination | Data carried | Candidate boundary | Reason/status |
|---|---|---|---|
| `/customers` + customer list API (exact endpoint not established) | Customer identity/contact and record metadata | SOURCE NOT ESTABLISHED; likely internal/admin unless proven scoped | List exposure carries bulk PII risk. |
| `/customers/new` + customer create API (exact endpoint not established) | Identity, contact, consent | MIXED | Could be public registration or staff CRM creation; ownership unresolved. |
| `/customers/[id]` + customer read API (exact endpoint not established) | Full customer record/history | MIXED | Authenticated owner view and ERP view require distinct policies. |
| `/customers/[id]/edit` + customer update API (exact endpoint not established) | Mutable PII/profile fields | MIXED | Customer-safe fields must be separated from internal fields. |
| `/bookings` + booking list API (exact endpoint not established) | Booking/customer/service/status | SOURCE NOT ESTABLISHED | Customer-owned list and internal operational list cannot share unrestricted semantics. |
| `/bookings/new` + booking create API (exact endpoint not established) | Service, customer, schedule, price references | MIXED | Public flow should follow approved quotation; staff may create internally. |
| `/bookings/[id]` + booking read API (exact endpoint not established) | Booking, customer, fulfilment and payment references | MIXED | Requires ownership/role filtering and field minimization. |
| `/bookings/[id]/edit` + booking update API (exact endpoint not established) | Mutable status/schedule/assignment fields | MIXED; internal fields ADMIN/ERP ONLY | Customer amendments must not permit internal status, price or assignment mutation. |

Required classification decision: split APIs and permissions among `AUTHENTICATED CUSTOMER`, `INTERNAL ERP`, and `ADMIN ONLY`; do not expose bulk CRUD publicly. Exact API paths and guards require a verified source inventory before implementation.

## I. Golden Q&A, Knowledge and AI safety

Established fact: Golden Q&A is unfinished. No new answers are generated by this report.

| Customer-facing path | Material reachable | Classification | Candidate safety treatment |
|---|---|---|---|
| GenZ AI approved-answer lookup | Versioned, explicitly published answer with provenance | APPROVED only when publication state is verified | May display as approved; log version/source. |
| GenZ AI placeholder path | Placeholder Golden Q&A | PLACEHOLDER | Never label as Founder-approved; block from production answer selection or label unavailable. |
| GenZ AI draft path | Editorial draft | DRAFT | Author/reviewer access only; exclude from customer retrieval. |
| GenZ AI generation/fallback | Generated or fallback text | UNVERIFIED | Clearly disclose, constrain scope, avoid authoritative ritual/legal/payment claims, and offer human escalation. |
| Knowledge Center retrieval | Published and possibly mixed-status knowledge | SOURCE NOT ESTABLISHED per item unless status metadata proves publication | Retrieve only approved/public records; preserve citations and version. |
| Hero-context AI panel | Any of the above filtered by active business | Mixed | Context does not upgrade evidence status; apply the same publication gate. |

Candidate rule: answer provenance and publication state must be enforced before retrieval. Placeholder or draft content must never appear as Founder-approved Golden Q&A.

## K. Source-conflict register

| Conflict ID | Item | Source A | Source B | Older/newer | Approval strength | Current runtime owner | Dependencies | Safe temporary owner | Founder decision? | Candidate status |
|---|---|---|---|---|---|---|---|---|---|---|
| SC-01 | Root Hero duplicate tree (ES-02) | Root duplicate tree | Current application hero tree | Mixed chronology | Current imported owner stronger; no Founder lock | Current app import owner | imports, visuals | Current app owner unchanged | Yes for physical disposition | EXCLUDE FROM RUNTIME candidate |
| SC-02 | Component `HeroCarousel.tsx` duplicate (ES-03) | Duplicate component | Current hero composition | Mixed | Neither conclusively approved | Current import graph | carousel behavior | Current runtime owner unchanged | Yes | FOUNDER REVIEW |
| SC-03 | Root sidebar duplicate (ES-05) | Root sidebar | Current fixed-shell sidebar | Mixed | Fixed shell architecture stronger | Current app owner | nav/routes | Current runtime owner unchanged | Yes | FOUNDER REVIEW |
| SC-04 | Partner dashboard access (ES-06) | Older full self-service | Latest registration/admin-control emphasis | Older vs latest | Both supported; removal rule absent | Current role/dashboard routing | auth/data policy | Existing runtime with no expanded exposure | Yes | FOUNDER REVIEW |
| SC-05 | Customer/booking CRUD (ES-07) | CRUD route families | Customer-to-ERP separation requirements | Current coexistence | Boundary evidence incomplete | Not conclusively located | route/API guards | Existing runtime; treat non-public operationally | Yes | FOUNDER REVIEW |
| SC-06 | Large Vahi page (ES-09) | Detailed legacy page | Current concise Vahi landing | Older vs current | Legacy contains evidence but not wholesale approval | Current landing | verified content extraction | Current landing | Yes for selective reuse | HISTORICAL EVIDENCE ONLY |

## L. Source-not-established register

| Item | Why unestablished | What exists | May affect | Must not depend on it yet | Search evidence | Safe temporary treatment |
|---|---|---|---|---|---|---|
| `master-vault` secret service | No authoritative contract, owner, threat model or approved source was found | References in surviving material | secrets, deployments, integrations, auth | Production secrets or new integrations | Discovery/source maps do not establish a canonical definition | Keep isolated and unchanged; document dependencies before any disposition. |
| QRSR/BRM terminology | Surviving sources use labels without conclusive definitions/boundaries | Architecture mentions and possible runtime labels | routing, roles, reports, data ownership | Authorization, workflow transitions or schema meaning | Comparison/source maps explicitly leave meaning unresolved | Treat as untranslated labels; route through established CRM/URMS only where independently evidenced. |

Primary source-not-established count is **2**. Other route-level unknowns are dependencies of FR-04 and are not double-counted.

## Architecture completeness

- Customer architecture: **PARTIAL** — supported shell, businesses and handoffs mapped; child routes, CRUD boundary and answer provenance remain unresolved.
- ERP/admin architecture: **PARTIAL** — core modules mapped; partner access, CRUD ownership and QRSR/BRM meaning remain unresolved.
- End-to-end flow: **PARTIAL** — supported transitions are recorded; unsupported system routing is intentionally not inferred.
- Actual Founder decisions recorded: **0**.
