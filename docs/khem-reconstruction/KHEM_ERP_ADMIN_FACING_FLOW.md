# KHEM ERP/Admin-Facing Flow

## Map B

```text
CUSTOMER ACTION
  → inquiry API / service request / registration / authentication
  → CRM lead + URMS universal reference (QRSR terminology historically referenced)
  → ADMIN / FOUNDER review
  → quote and approval
  → booking and payment intent
  → Religious Partner / service assignment
  → execution and communications
  → documentation and completion
  → tracking, notification and customer follow-up
```

## Internal module register

| Module | Role | Inputs/actions | Routes/source | Status |
|---|---|---|---|---|
| Authentication | Customer, partner, admin | Login, register, reset, role routing | `/login`, `/register`, `AuthProvider`, backend auth | Implemented |
| Founder/Admin dashboard | Admin/founder | KPIs, review, operational access | `/admin`, `/dashboard`, `AdminDashboard` | Implemented, authority depth mixed |
| Customer management | Admin | CRUD customer records | `/customers/*`, customer service/API | Implemented |
| Partner management/RPN | Admin | Register, verify, view/edit partners | `/partners/*`, `/religious-partners` | Implemented |
| Booking management | Admin/customer | Create, view, edit, cancel | `/bookings/*`, booking API | Implemented |
| Service catalog | Public/admin | Browse, categorize, price, activate | `/services/*`, `/admin/services`, categories | Implemented |
| CRM | Admin | Lead and contact management | `crm.api.ts`, `CRMLeadManager` | Implemented client architecture |
| URMS | Admin/customer | Universal record and status tracking | `/tracking`, `urms.api.ts` | Implemented client architecture |
| QRSR | Operations | Quote/request/service record concept | Types/services and premise | Naming/source conflict |
| BRM | Business operations | Relationship/booking management concept | Historical references only | Source not established |
| Quotes | Admin | Generate, revise, customer acceptance | quote service/modal | Implemented client architecture |
| Payments | Admin/customer | Checkout/payment records | payment service/modal | Implemented client architecture |
| Communications | Operations | Customer/partner messages | communication service | Implemented client architecture |
| Notifications | Operations | Status/update delivery | notification service | Implemented client architecture |
| Complaints/grievance/support | Admin/founder | Intake, escalation, resolution | public support routes, inquiry services | Partial |
| Knowledge/AI | Content/admin | Approved trees, answers, escalation | AI knowledge/services | Partial; Golden Q&A unfinished |
| Reports | Founder/admin | Operational summaries | `/reports`, dashboard services | Partial |
| Audit/history | Founder/admin | Trace actions/changes | URMS history/types; vault architecture | Partial/conflicting |

## Authority boundary

AI may explain, collect and route. Human/admin authority owns eligibility, partner approval, final ritual/travel guidance, record availability, quotation, pricing, booking confirmation, assignment, refunds, settlement and completion approval.

## Data architecture limitation

The current backend Prisma schema models users, customers, Religious Partners and PitruMoksha requests. The richer web-side URMS, CRM, quote, payment, catalog and notification types are not fully represented in that schema, producing a pre-trial/current implementation gap.
