# KHEM GOLDEN AUTHORITY REGISTER
## Connect Hub Co. — Public Website Evidence Baseline

**Purpose:** Single evidence-based authority register for auditing, restoring, accepting, rejecting, or marking unresolved every public-website item before ERP work.

**Core rule:** NO EVIDENCE = NO ACCEPTANCE. A working route, passing build, HTTP 200, or visually plausible page is not proof of KHEM correctness.

## 1. Authority hierarchy
1. Current explicit **KHEM LOCK / Founder-approved KHEM source**.
2. Current **KHEM Approved Base / Protected Implementation Register**.
3. **Six Core Chapters** — MEM, AOM, KPL, WPB, DBB, DPB.
4. KHEM hero/page-specific master carrying **LOCKED / APPROVED** status.
5. Most recent evidence-backed KHEM implementation / recovery snapshot.
6. Historical SHYAM/SITARAM material — **provenance evidence only**, never current naming authority.
7. Screenshots — **visual corroboration only**.
8. Current code with no provenance — **never authoritative by existence alone**.

If evidence is insufficient or conflicting: **UNRESOLVED → numbered RED X**.

## 2. Status vocabulary
- **LOCKED - KHEM** — controlling authority unless explicitly unlocked/superseded.
- **APPROVED BASE** — approved foundation; final wording/implementation may still require confirmation.
- **FOUNDER REVIEW** — useful recovery evidence but not final authority.
- **STRUCTURE READY** — architecture may be implemented; content can remain gated.
- **HISTORICAL EVIDENCE** — provenance only.
- **DRAFT** — not final public authority.
- **UNRESOLVED** — insufficient evidence; numbered RED X required.
- **SUPERSEDED / DUPLICATE** — preserve until replacement provenance is proven.

## 3. Six Core Chapters — governance ownership
- **MEM — Master Execution Manual:** Founder vision, strategy, business model, roadmap, governance, decision log.
- **AOM — AI Operating Manual:** GenZ Ritual AI behaviour, rules, workflows, prompts, limitations.
- **KPL — Knowledge & Prompt Library:** business knowledge, SOPs, prompts, FAQs, templates, reusable assets.
- **WPB — Website Product Blueprint:** website structure, user journeys, UI/UX, pages, components, business flows.
- **DBB — Database Blueprint:** database architecture, entities, records, relationships, business/data rules.
- **DPB — Dashboard Blueprint:** CRM, BRM, RPN, ERP, Admin Dashboard, internal operations.

**Rule:** public code cannot be accepted if it violates its controlling chapter even when build/runtime passes.

## 4. Canonical public-website ownership
### 4.1 Application owner
- Canonical public application: `apps/web`.
- Root legacy `frontend/` is historical/legacy evidence, not active authority.
- `.next`, `.turbo`, `node_modules`, logs and generated caches are never KHEM authority.

### 4.2 Master outer shell
Owns:
- Public Header
- Public Sidebar
- Public Footer + copyright bar
- public responsive shell/grid

Protected invariants:
- one fixed global Header outside Hero rotation;
- one fixed Sidebar/navigation system;
- one fixed global Footer outside Hero rotation;
- public shell separate from ERP/internal authenticated shell.

### 4.3 Master inner shell / central workspace
Owns:
- Hero carousel/static Hero binding;
- Hero slide renderer;
- contextual AI panel;
- Explore bar;
- core-services band/cards;
- detailed inner/floating-page content within the approved shell.

**Shared destination/API/config does not mean shared component state or content ownership.**

## 5. Five current Hero identities
1. H1 — PitruMoksha Gaya
2. H2 — Ritual Services
3. H3 — Travel Assistance
4. H4 — Vahi Records
5. H5 — Religious Partner

Hero content, artwork, prompts, Explore data and detailed content are Hero-scoped unless an explicit KHEM shared rule exists.

## 6. Hero 1 — PitruMoksha Gaya authority
### 6.1 Locked master-Hero lines
- `Daan. Dharma. Moksha.`
- `Distance Never Stops Devotion.`
- Explore: `The journey of Moksha is a duty of love. Let us handle the logistics; you focus on the prayers.`

### 6.2 Route ownership
- Main: `/pitru-moksha-gaya`
- Online: `/pitru-moksha-gaya/online`
- Offline: `/pitru-moksha-gaya/offline`

### 6.3 Online-page authority
Direct KHEM page-specific evidence exists in `KHEM_PitruMoksha_Gaya_Main_Online_Content_Refined_v1.1.xlsx`.
Controls include:
- keep approved full Master Hero 1 as master visual;
- Online uses a **contextual Online banner**, not a competing duplicate Master Hero;
- content/data are approval-gated;
- do not hard-code packages/prices;
- do not hard-code current-year dates;
- no FAQ body preview; approved Q&A belongs to GenZ AI / Knowledge Centre;
- workflow: assessment → quotation → payment → booking;
- exceptions/limitations are controlled and versioned.

### 6.4 Offline-page authority
The same coding-readiness source explicitly records **Offline as not reviewed in that review**.
Therefore:
- do not infer Offline from Online;
- do not treat parent-Hero image/content as Offline ownership;
- unresolved Offline-specific material stays numbered RED X until stronger evidence is found.

## 7. Hero 2 — Ritual Services authority
Evidence-backed identity:
- Title: `Ritual Services`
- Description: `Every ritual carries its own purpose, tradition, and prescribed method.`

Inner routes:
- `/ritual-services/online`
- `/ritual-services/offline`

**Rule:** Online/Offline require their own provenance. Parent-Hero artwork or runtime Q&A cannot become route-owned content merely through fallback.

## 8. Hero 3 / Hero 4 / Hero 5 authority
### H3 — Travel Assistance
Hero-3 content remains Hero-scoped. Founder Draft material may support provenance but cannot be promoted to final lock without approval evidence.

### H4 — Vahi Records
Vahi content must remain isolated. Historical Vahi, extracts, transcription, translation, interpretation, customer genealogy and platform-generated family trees must preserve separate provenance.

### H5 — Religious Partner
Public partner information is separate from protected RPN/Admin records. Only approved public status/profile information may surface publicly.

## 9. Navigation / routing authority
Controlling evidence:
- `khem-navigation.config.ts`
- `navigation.ts`
- KHEM route matrix / protected implementation rules

Known detail routes include:
- `/pitru-moksha-gaya/online`
- `/pitru-moksha-gaya/offline`
- `/ritual-services/online`
- `/ritual-services/offline`
- `/travel-assistance/requests`
- `/pitru-moksha/requests`

**Rule:** route existence, component owner and target content must each be proven. HTTP 200 is not proof of correct KHEM implementation.

## 10. Policy / company / support ownership
Separate authoritative content classes:
- About Us
- Contact
- Founder Support
- Privacy
- Terms
- Booking Terms
- Cancellation / Refund
- Complaint / Grievance
- Tracking

These must not be folded into Golden Q&A.
If route/page-name is locked but final content is not proven:
- preserve route and shell;
- do not invent copy;
- display numbered RED X in the missing content location.

## 11. AI / Q&A / Knowledge ownership
Separate classes — never silently merge:
1. Golden Q&A — Founder/Admin-approved, published versions only.
2. Knowledge Centre — Founder-approved articles/guides; separate from Golden Q&A.
3. Policies/About/Cancellation — separate authoritative content classes.
4. Hero / Explore / Core / Inner Page content — KHEM-approved, versioned, Hero-scoped.
5. Private Inquiry — never direct public knowledge.
6. Private Booking — never public knowledge.
7. Admin-reviewed reusable answer — public only after approval/publication.
8. Operational Partner/Vahi/Travel/Gaya/Ritual databases — no direct public AI access.
9. ERP — no direct public AI access.

AI controls:
- progressive discovery;
- raw Q&A database never exposed;
- Knowledge Centre stays separate; cross-reference/navigation only;
- AI may link to relevant approved inner/floating page;
- one URMS per service journey;
- customer Track Service Request and Partner Track Registration remain separate projections;
- unresolved/sensitive matters escalate to Admin/Founder;
- no public AI access to ERP/customer/partner/Vahi/Gaya/Ritual/Travel operational databases;
- display AI mistake notice.

## 12. Public / internal security boundary
Blocked public patterns include:
- public ERP endpoints;
- raw ERP/customer/partner/URMS objects;
- raw Golden Q&A browsing endpoint;
- runtime AI credential to ERP;
- provider ERP login/dashboard;
- partner self-service ERP edits;
- generic destructive ERP DELETE;
- overwriting an issued quotation version;
- cross-customer tracking by internal UUID;
- Layer-2 identity without its bound active Layer-1 session.

## 13. Visual evidence rule
Screenshots may confirm:
- shell colour family;
- typography hierarchy;
- layout/grid;
- arrows;
- artwork identity;
- spacing/alignment.

Screenshots alone may **not** prove:
- component provenance;
- latest version;
- route ownership;
- Q&A ownership;
- business-rule authority.

## 14. Acceptance gate — mandatory for every public item
Each page/component/content/asset must prove:
1. Evidence
2. Identity
3. Owner
4. Provenance/source
5. Version/date or relative ordering
6. KHEM approval/lock status
7. Dependencies/coupling
8. Correct content/asset source
9. Runtime behaviour
10. Visual match where applicable
11. Decision: ACCEPT / RESTORE / UNRESOLVED / DUPLICATE / X_REMOVE

**NO EVIDENCE = UNRESOLVED.**

## 15. Numbered RED-X rule
Every unresolved item gets a stable ID: `X01`, `X02`, `X03`...

Required fields:
- X-ID
- route/page/component
- exact UI location
- missing/unproven item
- expected owner/source class
- evidence searched
- current wrong fallback/coupling, if any
- status
- date cleared
- evidence source that cleared it

Never clear an X because build passes, HTTP 200, a component renders, similar content exists elsewhere, a parent Hero has an image, or runtime Q&A has a related answer.

## 16. Current high-priority provenance risks
1. Hero-1 Online/Offline must be audited against page-specific KHEM masters, not merely current route files.
2. Hero-2 Online/Offline require equivalent route-specific proof.
3. Every item changed during coupling repair must be rechecked for provenance/version before freeze.
4. `Founder Review`, `Draft`, `Not Reviewed` or `Historical Evidence` cannot become `LOCKED` merely because code uses them.
5. Historical SHYAM/SITARAM files may support provenance only; legacy naming must not return to production.
6. X_REMOVE/backup files remain until dependency + provenance + authoritative replacement are proven.

## 17. Golden comparison rule for Codex
For every public item compare:

**CURRENT IMPLEMENTATION**
against
**THIS REGISTER + THE EXACT UNDERLYING SOURCE FILE**.

Never compare only against:
- current working tree;
- newest timestamp;
- current imports;
- successful build;
- screenshots alone.

If an authority source named here is unavailable in Codex's workspace, report:
`AUTHORITY SOURCE NOT AVAILABLE IN WORKSPACE`
and mark the item `UNRESOLVED`.

## 18. Register control
This register is a **comparison index**, not a substitute for the underlying evidence files. It must not silently upgrade Founder Review, Draft, Historical Evidence or Not Reviewed material to KHEM Locked status.

Before public production freeze, every `ACCEPT` decision must retain a traceable source reference.
