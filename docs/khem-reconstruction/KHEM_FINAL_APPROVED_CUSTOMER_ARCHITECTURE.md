# KHEM Final Approved Customer Architecture

Architecture approval: Founder decisions FD-01–FD-07 applied. This is an implementation specification, not a runtime change. Exact child routes remain evidence-controlled and must not be invented.

## Ownership and access rules

- `apps/web` is the canonical public-web application owner.
- One component-folder/application-shell Header, Sidebar, Footer and Hero owner is permitted.
- FD-01: compare both HeroCarousel implementations against verified behavior, consolidate only verified behavior, then retain one canonical runtime owner. Current import status alone is not approval.
- FD-02: reconcile verified sidebar differences, then make the application-shell/component-folder Sidebar canonical. The root duplicate cannot compete at runtime.
- FD-04: public intake, authenticated customer self-service, and ERP/Admin CRUD are separate surfaces.
- FD-07: only approved, versioned, provenance-backed answers may be called Founder-approved Golden Q&A. Constrained fallback must be disclosed; drafts/placeholders are excluded.

## Customer route and component map

| Route/component state | Owner | Auth level | Parent | Children | AI context | Customer data access | ERP handoff | Status |
|---|---|---|---|---|---|---|---|---|
| Global Header | `apps/web` application shell | Public; identity-aware | all public pages | approved primary navigation | none | session-safe display only | none | APPROVED KEEP |
| Global Sidebar | component-folder/application shell | Public; role-filtered links | all public pages | approved business/support links | none | no record data | none | APPROVED CANONICAL after FD-02 reconciliation |
| Global Footer | `apps/web` application shell | Public | all public pages | legal/contact/support links | none | none | inquiry/support links | APPROVED KEEP |
| `/` | homepage composition | Public | site root | Hero workspace, Trust, Explore, controls, Core Services | active Hero context | no record access; consented analytics only | explicit intake only | APPROVED KEEP |
| Rotating Hero workspace | single consolidated Hero owner | Public | `/` | Hero 1–5 | supplies active context | none | explicit inquiry/request only | APPROVED CANONICAL after FD-01 verification |
| Hero 1 — PitruMoksha Gaya | homepage/business owner | Public | Hero workspace | `/pitru-moksha-gaya`, verified inner pages | Pitru context | none until submission | request intake | APPROVED KEEP |
| Hero 2 — Ritual Services | homepage/business owner | Public | Hero workspace | `/ritual-services`, verified inner pages | ritual context | none until submission | request intake | APPROVED KEEP |
| Hero 3 — Travel Assistance | homepage/business owner | Public | Hero workspace | `/travel-assistance`, verified India/Nepal children | travel context | none until submission | request intake | APPROVED KEEP; broad identity |
| Hero 4 — Vahi Records | homepage/business owner | Public | Hero workspace | `/vahi-records`, only verified children | Vahi context | no private record exposure | controlled Vahi request | APPROVED KEEP |
| Hero 5 — Religious Partners | homepage/business owner | Public | Hero workspace | `/religious-partners`, registration | partner context | applicant’s submitted data only | RPN/admin verification | APPROVED KEEP |
| Trust / Explore / carousel controls / Hero Core Services | homepage composition | Public | active Hero | verified business destinations | inherits active Hero | none | explicit action only | APPROVED KEEP |
| `/pitru-moksha-gaya` | business-page owner | Public | Hero 1 | only source-verified inner/floating pages | Pitru | submitted inquiry only | CRM/URMS intake | APPROVED KEEP |
| `/ritual-services` | business-page owner | Public | Hero 2 | only source-verified service pages | ritual | submitted request only | CRM/URMS intake | APPROVED KEEP |
| `/travel-assistance` | business-page owner | Public | Hero 3 | only verified India/Nepal travel pages | travel | submitted request only | CRM/URMS intake | APPROVED KEEP |
| `/vahi-records` | business-page owner | Public entry; authenticated/private access where needed | Hero 4 | only verified search/request/result pages | Vahi | own authorized request/result only; no bulk lineage records | controlled request/records workflow | APPROVED KEEP WITH PRIVACY BOUNDARY |
| `/religious-partners` | partner registration owner | Public registration | Hero 5 | registration, verification status, limited portal after approval | partner | own application only | RPN/admin verification | APPROVED KEEP |
| Verified inner/child/floating pages | owning business page | Public or authenticated as evidence requires | corresponding landing page | evidence-established children only | parent business context | minimum required | explicit request handoff | APPROVED PRINCIPLE; exact inventory PARTIAL |
| GenZ AI panel | AI experience owner | Public/authenticated context-safe | homepage/business/knowledge | answer, escalation | current page/business; never upgrades evidence status | query/session minimum; no unrelated account data | creates request only on explicit consent | APPROVED WITH FD-07 CONTROLS |
| Knowledge Center | knowledge owner | Public for published material | global/business pages | approved articles/Q&A | retrieval over published records | none beyond query telemetry | human inquiry if requested | APPROVED KEEP |
| Customer account | customer account owner | Authenticated customer | global | own records, bookings, documents, tracking, supported actions | account-safe only | customer-safe service APIs | APPROVED FD-04 BOUNDARY |
| Customer tracking | tracking owner | Authenticated owner or secure scoped tracking token | account/confirmation | status timeline | none | own status only | fulfilment read model | APPROVED KEEP |
| Customer booking | customer booking surface | Authenticated customer | approved quotation/account | own booking and supported amendments | none | own booking fields only | separate booking service → ERP | APPROVED FD-04 BOUNDARY |
| Payment | payment owner/provider | Authenticated/scoped checkout | approved quotation/booking | confirmation/receipt | none | own payment status; no sensitive internal finance data | finance reconciliation | APPROVED KEEP |
| Contact | contact owner | Public | global | inquiry channels | optional page context | voluntarily submitted contact data | CRM request | APPROVED KEEP |
| Mail / Raise Inquiry | request owner | Public with validation/consent | global/business | request confirmation | optional page context | submitted inquiry only | CRM/URMS request | APPROVED KEEP |
| WhatsApp | approved external-channel owner | Public outbound | contact/business | external conversation | disclose context handoff | minimum voluntarily transmitted data | staff intake under channel policy | APPROVED KEEP, policy-controlled |
| Complaint | support owner | Authenticated owner or validated public intake | account/global | case tracking | safe triage only | own case data | complaint queue | APPROVED KEEP |
| Grievance | grievance owner | Authenticated/validated | account/global | escalation status | safe triage only | own case data | grievance queue | APPROVED KEEP |
| Founder Support | governance support owner | Authenticated/validated | support routes | escalation status | safe triage only | own escalation data | Founder-support queue | APPROVED KEEP |
| Limited Partner Portal | partner portal owner | Verified partner role only | partner verification | own assignments, status, permitted documents, approved communications | none | minimum assigned-customer data only | assignment-scoped ERP API | APPROVED FD-03 |

## Customer/ERP data boundary

The customer may read or perform supported actions only on records owned by that authenticated customer. Bulk customers/bookings, internal notes, pricing authority, assignments, internal statuses, other users’ records, and administrative mutation are ERP/Admin-only. One unrestricted CRUD surface must never serve both audiences.

## AI publication boundary

| Material | Customer treatment |
|---|---|
| Approved, versioned, provenance-backed Golden Q&A | May be labelled Founder-approved/authoritative. |
| Constrained generated/fallback assistance | May appear only as disclosed AI assistance, with scope limits and human escalation. |
| Draft Q&A | Not customer-visible as an approved answer. |
| Placeholder Q&A | Excluded from the approved customer answer path. |
| Knowledge Center content | Customer-visible only when independently marked published/approved; provenance retained. |

Architecture completeness: **PARTIAL** only for the exact evidence-verified inventory of inner/child/floating routes. All seven Founder policy boundaries are resolved.
