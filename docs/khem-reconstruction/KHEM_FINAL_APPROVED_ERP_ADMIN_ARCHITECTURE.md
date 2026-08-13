# KHEM Final Approved ERP/Admin Architecture

Founder decisions FD-03–FD-07 are binding architecture boundaries. This report does not change roles, routes, schema, secrets, or runtime.

| Module | Canonical authority | Public input | Internal authority | Data boundary | Output/customer return | Partner connection | Status |
|---|---|---|---|---|---|---|---|
| Founder | governance and exception authority | escalated Founder Support | final policy/exception decisions | audited oversight; least privilege still applies | approved resolution/policy | none direct | APPROVED KEEP |
| Admin | administration shell | registrations and validated requests | configuration, verification, routing and authorized CRUD | role-scoped operational records | notices/status | verifies and governs partner access | APPROVED KEEP |
| ERP | internal system-of-record/workflow owner | accepted requests only | orchestration and operational mutation | never publicly exposed wholesale | customer-safe projections | assignment-scoped portal API | APPROVED KEEP |
| CRM | customer relationship owner | consented inquiries/contact | qualify, communicate, manage relationship | customer/contact/request data by role | responses and progress | none unless fulfilment requires | APPROVED VERIFIED OWNER |
| URMS | verified request-management owner | validated request | assess, route and maintain request history | request records by authorized role | customer-safe status/quotation | feeds assignment after approval | APPROVED VERIFIED OWNER |
| RPN | partner-network owner | partner registration | verification, eligibility and network management | partner records; no general customer store | registration/verification status | source of verified-partner identity | APPROVED KEEP |
| Customers | CRM/Admin stewardship | registration/inquiry/account updates | operational CRUD separately authorized | bulk/internal fields ERP/Admin-only; own safe fields customer-only | customer-owned record projection | minimum assigned fields only | APPROVED FD-04 SPLIT |
| Partners | RPN/Admin stewardship | application and permitted own updates | verification, suspension, assignment eligibility | other partners and admin fields forbidden to portal | verification/status | limited portal for verified partner | APPROVED FD-03 |
| Requests | CRM/URMS | inquiry/request/support | validation, triage, assessment | customer-safe projection distinct from internal record | request ID/status/quotation | assignment only after booking | APPROVED KEEP |
| Bookings | booking operations | customer approval/supported actions | schedule, internal status, pricing/assignment controls | customer sees own allowed fields; internal CRUD separate | confirmation/tracking | minimum assigned booking subset | APPROVED FD-04 SPLIT |
| Services | service administration | public selection | define and maintain approved offerings | catalog data | published service view | assignment context | APPROVED KEEP |
| Categories | catalog administration | public discovery | curate taxonomy | catalog only | published categories | none direct | APPROVED KEEP |
| Quotations | authorized commercial operations | request and customer response | prepare/version/approve pricing | internal cost/approval controls protected | issued quotation | no access unless task requires | APPROVED KEEP |
| Invoices | finance | billing identity/required details | issue, correct and audit | financial role controls | invoice/receipt | no general access | APPROVED KEEP |
| Payments | payment/finance owner | payment action/provider callback | reconcile/refund under authority | payment secrets and internal finance protected | payment status/receipt | no access | APPROVED KEEP |
| Assignments | operations | none direct | assign verified provider and revoke | minimum necessary customer/task fields | customer-safe execution status | own explicit assignments only | APPROVED FD-03 BOUNDARY |
| Complaints | support | validated case | investigate/resolve | case-scoped access | own case status/outcome | only if assigned and necessary | APPROVED KEEP |
| Grievances | grievance authority | validated case | investigate/escalate/resolve | sensitive case restrictions | own case status/outcome | normally none | APPROVED KEEP |
| Founder Support | Founder-support authority | validated escalation | review/escalate/resolve | restricted audit trail | own escalation outcome | none | APPROVED KEEP |
| Knowledge/Q&A governance | content authority | questions/feedback | draft, review, approve, version, withdraw | publication status/provenance mandatory | approved answers or disclosed fallback | none | APPROVED FD-07 |
| Reports | authorized governance roles | none | generate scoped operational/aggregate reports | role and purpose limitation | no raw public report | partner receives own approved extracts only | APPROVED KEEP |
| Audit/history | audit owner | system events | append/review/export under authority | tamper-resistant, retention-controlled | own relevant history where supported | own portal actions only | APPROVED KEEP |
| Limited Partner Portal | partner portal owner | verified login and own workflow actions | no administrative authority | only own explicit assignments, permitted documents and approved communications | task/status exchange | constrained consumer, never ERP owner | APPROVED FD-03 |
| QRSR / BRM | none | none | no runtime authority | cannot control routing, permissions, schema, records, workflow or reports | none | none | HISTORICAL/UNRESOLVED TERMINOLOGY per FD-06 |
| `master-vault` | no canonical KHEM owner established | none | no approved operational role | isolate; no expansion, removal or new dependency | none | none | SOURCE NOT ESTABLISHED; FD-05 treatment approved |

## Mandatory access separations

1. Customer self-service uses owner-scoped projections and supported actions; it is not ERP CRUD.
2. ERP/Admin retains bulk records, internal notes, pricing, assignments, internal statuses and administrative mutations.
3. Verified partners receive only explicitly assigned work, permitted documents, approved communications and minimum necessary customer details. No general ERP, URMS/database, other-partner, or administrative access.
4. Unverified partners receive no operational or customer-data access.
5. QRSR/BRM labels grant no authority.
6. Golden Q&A publication requires explicit approval, version and provenance.
7. `master-vault` remains isolated pending dependency graph, consumers, owner, threat model, secret inventory, and rotation/recovery requirements.

Architecture completeness: **PARTIAL** because `master-vault` operational evidence remains unestablished; all Founder policy decisions are resolved.
