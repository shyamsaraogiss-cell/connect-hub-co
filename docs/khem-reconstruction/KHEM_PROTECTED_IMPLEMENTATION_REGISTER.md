# KHEM Protected Implementation Register

These approved architecture constraints must not be silently altered during implementation. Any exception requires explicit Founder review. This is not the final KHEM implementation lock.

| ID | Protected implementation item | Required invariant | Decision/evidence basis | Verification gate |
|---|---|---|---|---|
| PI-01 | Canonical `apps/web` ownership | Public website composition remains owned by the canonical web application; root/recovery copies cannot silently take ownership. | protected candidate architecture | import/build ownership audit |
| PI-02 | Fixed Header | One fixed global Header outside Hero rotation. | protected shell evidence | all public layouts render same owner |
| PI-03 | Fixed Sidebar | Component-folder/application-shell Sidebar is the single owner after verified reconciliation; root duplicate cannot compete. | FD-02 | import graph, route/link and visual comparison |
| PI-04 | Fixed Footer | One fixed global Footer outside Hero rotation. | protected shell evidence | layout and link audit |
| PI-05 | Rotating Hero workspace | Compare both implementations, keep only independently verified behavior, then establish one canonical Hero owner; current import alone is insufficient proof. | FD-01 | approved behavior/visual matrix and single-owner import audit |
| PI-06 | Five Hero identities | Preserve PitruMoksha Gaya, Ritual Services, broad India/Nepal Travel Assistance, Vahi Records, and Religious Partner/Registration. | comparison and master map | route/content inventory |
| PI-07 | Fixed business-page architecture | Landing pages remain distinct from rotating homepage presentation; exact children require source evidence. | approved customer architecture | route-tree validation |
| PI-08 | Public versus ERP boundary | Public intake and customer-safe projections cannot expose internal CRUD, notes, pricing, assignment or bulk records. | FD-04 | authorization and field-level tests |
| PI-09 | Customer own-data boundary | Authenticated customers may access only their own permitted records, bookings, documents, statuses and supported actions. | FD-04 | object-level authorization tests |
| PI-10 | Limited Partner portal | Verified partners see only explicitly assigned work, status, permitted documents and approved communications; no ERP/URMS/database/admin/other-partner access. | FD-03 | role, assignment, revocation and tenant-isolation tests |
| PI-11 | Unverified partner boundary | Unverified partners receive no operational or customer-data access. | FD-03 | negative authorization tests |
| PI-12 | Golden Q&A publication boundary | Only explicitly approved, versioned, provenance-backed answers may be labelled Founder-approved. | FD-07 | publication-state and provenance tests |
| PI-13 | AI fallback boundary | Fallback is constrained and disclosed, excludes draft/placeholder content, and escalates to humans where appropriate. | FD-07 | retrieval, labelling, safety and escalation tests |
| PI-14 | Knowledge Center boundary | Only published/approved material is public; draft/editorial state and provenance remain governed. | FD-07 and master map | content-status access tests |
| PI-15 | CRM verified ownership | CRM owns established customer relationship/contact responsibilities only; unresolved acronyms cannot displace it. | FD-06 | workflow/role mapping |
| PI-16 | URMS verified ownership | URMS owns only independently verified request-management responsibilities; QRSR/BRM cannot silently inherit authority. | FD-06 | transition and authorization mapping |
| PI-17 | RPN/partner verification | RPN/Admin verification precedes operational portal access and assignment. | FD-03 | state-transition and access tests |
| PI-18 | Vahi privacy | Public Vahi discovery cannot expose private/bulk lineage or record data; access is owner/scoped and purpose-limited. | protected architecture | privacy, enumeration and object-access tests |
| PI-19 | `master-vault` isolation | Do not make canonical, expand, remove or depend on it until consumers, owner, threat model, inventory and rotation/recovery are established. | FD-05 | dependency and security review |
| PI-20 | QRSR/BRM non-authority | Acronyms cannot determine routing, permissions, schema, workflows, record authority or reporting. | FD-06 | code/schema/role search |
| PI-21 | Historical evidence preservation | Superseded/excluded/historical material is not physically removed until separately approved. | disposition register | evidence inventory |
| PI-22 | No-assumption/no-silent-recreation | Missing historical content, routes, modules, definitions and workflows must not be invented or silently recreated. | Founder directive | evidence citation in implementation plan |

Protected implementation items: **22**.
