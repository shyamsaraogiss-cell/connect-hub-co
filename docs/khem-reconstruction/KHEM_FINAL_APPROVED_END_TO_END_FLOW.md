# KHEM Final Approved End-to-End Flow

This flow applies all seven Founder decisions without inventing unsupported systems or modifying runtime.

| From → To | System owner | Authority | Data created | Customer visibility | Partner visibility | ERP-only data | Approval requirement |
|---|---|---|---|---|---|---|---|
| Customer → Public website | `apps/web` shell | Public | consented analytics only | Full public surface | Same public surface | none | none |
| Website → Hero/business/inner page | homepage/business owners | Public | navigation context | Full published content | Full published content | none | content publication |
| Page → GenZ AI/Knowledge | AI/knowledge owner | Public or authenticated context | query, source/version and audit metadata | Approved Q&A or disclosed constrained fallback | public knowledge only | draft/editorial metadata | content approval for Golden Q&A |
| Page/AI → Inquiry/request/booking/registration/support | intake owner | Public validated intake or authenticated action | consent, contact and request payload | own submission/confirmation | own registration only | internal routing metadata | validation; explicit consent |
| Intake → Customer-safe request record | request service | system/authorized staff | request ID, safe status and audit | own safe projection | none unless partner registration | notes, routing and risk flags | system validation |
| Request → CRM/URMS | CRM/URMS | authorized internal roles | triage, ownership and history | limited status | none | full internal working record | role policy; QRSR/BRM not used |
| CRM/URMS → Human assessment | authorized service team | assigned role | requirements, assessment and notes | outcome/status as approved | none | internal notes | staff authority |
| Assessment → Quotation | quotation owner | commercial authority | versioned quotation and approval record | issued terms | none | cost/approval controls | pricing approval |
| Quotation → Customer approval | quotation/customer surface | authenticated customer | acceptance/rejection and audit | full own decision | none | internal approval trail | customer confirmation |
| Approval → Booking | booking service | authenticated customer plus system policy | booking and customer-safe status | own booking | none yet | internal workflow fields | valid approved quotation |
| Booking → Payment | payment/finance owner | authenticated/scoped checkout | provider reference and payment state | own status/receipt | none | reconciliation and sensitive finance | provider/finance control |
| Paid booking → Assignment | operations | authorized ERP/Admin | assignment, scope and revocation data | safe status | only assigned task subset | selection logic, internal notes | verified eligible partner/staff |
| Assignment → Limited partner portal/external communication | partner portal/operations | verified, role- and assignment-scoped partner | delivery/read/action audit | safe fulfilment status | own work, permitted documents, approved messages | all unrelated customer/ERP data | explicit assignment and verification |
| Partner/staff → Execution | operations | assigned executor | task events and permitted documents | progress as approved | own task | internal controls/notes | workflow authorization |
| Execution → Tracking | tracking owner | authorized event producer | status timeline | own tracking | own assignment status | internal exception details | status validation |
| Tracking → Documentation | records owner | assigned role | approved service documents and provenance | own permitted documents | permitted task documents | sensitive/internal documents | document review where required |
| Documentation → Completion | operations | authorized closer | completion, acknowledgement and audit | completion state | own task completion | closure controls | completion criteria |
| Completion → Customer account/history/support | account/support owners | authenticated record owner | history projection/support case | own records only | no customer history | operational history and internal case notes | identity/ownership checks |

## Governing constraints

- Hero and Sidebar transitions use one canonical owner only after FD-01/FD-02 verification and consolidation.
- Customer and ERP records are separate projections and authorities, not a shared unrestricted CRUD surface.
- Partner visibility is assignment-scoped, role-scoped, minimum-necessary and audited.
- QRSR/BRM perform no transition and grant no authority.
- `master-vault` is outside the canonical flow and cannot become a dependency pending investigation.
- Draft/placeholder Q&A cannot enter the customer answer path. Fallback is disclosed AI assistance, never Founder-approved Golden Q&A.

Architecture completeness: **COMPLETE** at the approved business-transition level. Implementation endpoints and schema mappings require a separate verified implementation plan.
