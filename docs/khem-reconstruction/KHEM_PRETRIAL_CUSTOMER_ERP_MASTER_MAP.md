# KHEM Pre-Trial Customer / ERP Master Maps

Legend: `[LOCKED]` direct locked evidence; `[IMPL]` direct implementation; `[DIST]` distributed; `[PART]` partial; `[CONFLICT]` conflicting; `[UNKNOWN]` source not established; `[PREMISE]` Founder-confirmed premise.

## Map 1 — Pre-Trial Customer-Facing Intended Master

```text
CUSTOMER [PREMISE]
└─ HOME / [IMPL]
   ├─ Global Header + Sidebar + Footer [LOCKED]
   ├─ Rotating Hero Workspace [DIST]
   │  ├─ PitruMoksha Gaya → /pitru-moksha-gaya [LOCKED/DIST]
   │  │  ├─ /online [IMPL]
   │  │  └─ /offline [IMPL]
   │  ├─ Ritual Services → /ritual-services [LOCKED/DIST]
   │  │  ├─ /online [IMPL]
   │  │  └─ /offline [IMPL]
   │  ├─ Travel Assistance → /travel-assistance [DIST]
   │  │  ├─ /requests [IMPL]
   │  │  └─ /success [IMPL]
   │  ├─ Vahi Records → /vahi-records [DIST/CONFLICT]
   │  │  └─ child/floating pages [UNKNOWN]
   │  └─ Religious Partner Network → /religious-partners → /register [DIST]
   ├─ Contextual GenZ AI [DIST]
   ├─ Trust + Explore [DIST]
   ├─ One carousel control system [IMPL]
   └─ Core Services [IMPL; per-Hero variants UNKNOWN]

SUPPORTING PATHS
├─ /zen-g + /knowledge-center [Phase 6 PART]
├─ /services → /services/[slug] [IMPL]
├─ /tracking [DIST]
├─ /login → /dashboard [IMPL/CONFLICT]
├─ booking/payment workflow [PART]
├─ /contact + WhatsApp/mail [IMPL]
├─ /complaint → /grievance → /founder-support [DIST/PART]
└─ policies/about/account recovery [IMPL]
```

Customer master status: **PARTIAL**. Page/shell architecture is strong; final interlinking, Q&A approval, Vahi/Travel missing children and account/commercial authorization remain unresolved.

## Map 2 — Pre-Trial ERP / Admin Intended Master

```text
FOUNDER [DIST]
└─ ADMIN / ERP [IMPL/PART]
   ├─ Authentication + authorization [IMPL; Founder matrix UNKNOWN]
   ├─ CRM leads/inquiries [DIST]
   ├─ URMS universal records/tracking/history [DIST]
   ├─ QRSR / BRM [UNKNOWN]
   ├─ RPN partner registration/verification [DIST]
   ├─ Customer records [IMPL]
   ├─ Partner records [IMPL]
   ├─ Requests [PART]
   ├─ Bookings [IMPL/CONFLICT]
   ├─ Services + categories [IMPL]
   ├─ Quotations/pricing/approval [PART]
   ├─ Invoice [UNKNOWN]
   ├─ Payment/refund [PART]
   ├─ Assignment/execution [PART]
   ├─ Complaints/grievance/Founder Support [PART]
   ├─ Knowledge/Q&A review [PART]
   ├─ Reports [PART]
   └─ Audit/history [PART/CONFLICT]

DATABASE [CONFLICT]
├─ Backend Prisma: User, Customer, ReligiousPartner, PitruMokshaRequest [IMPL]
└─ Web operational types: CRM, URMS, quote, payment, catalog, notifications [IMPL]
   └─ canonical system-of-record mapping [UNKNOWN]
```

ERP/Admin master status: **PARTIAL**. Module breadth survives, but DBB/DPB, permissions, persistence and several operational transitions are not established.

## Map 3 — Customer → AI/Request → ERP/Admin → Partner → Completion → Customer

```text
CUSTOMER [PREMISE]
  → PUBLIC HERO / BUSINESS / INNER PAGE [IMPL/DIST]
  → EXPLORE / SERVICE SELECTION [IMPL/PART]
  → GENZ AI / KNOWLEDGE [Phase 6 PART]
      ├─ approved guidance [DIST]
      ├─ clarification/session [IMPL]
      └─ human escalation boundary [DIST]
  → INQUIRY / REGISTRATION / SUPPORT FORM [IMPL]
  → CRM INTAKE [DIST]
  → URMS REQUEST / REFERENCE [DIST; persistence PART]
  → HUMAN ASSESSMENT [PART]
  → QUOTATION [PART]
  → CUSTOMER APPROVAL [PART]
  → BOOKING [IMPL; orchestration PART]
  → PAYMENT / INVOICE [payment PART; invoice UNKNOWN]
  → RPN PARTNER / SERVICE ASSIGNMENT [PART]
  → EXECUTION + COMMUNICATION [PART]
  → TRACKING [DIST]
  → DOCUMENTATION [UNKNOWN/PART]
  → COMPLETION [PART]
  → CUSTOMER HISTORY / NOTIFICATION / SUPPORT [PART]
```

Authority boundary: AI explains, searches, collects and routes `[DIST]`. Human/Admin/Founder authority controls eligibility, substantive assessment, Vahi availability, quotation, price, approval, booking confirmation, assignment, refund/settlement and completion `[DIST/PART]`.

End-to-end master status: **PARTIAL**. Unsupported ownership/transitions remain explicitly marked rather than inferred.
