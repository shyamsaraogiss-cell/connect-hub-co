# KHEM Customer-to-ERP Handoff Matrix

| Customer action | Public route/control | Public component | Data created | Internal destination/owner | Approval | Status/source |
|---|---|---|---|---|---|---|
| General inquiry | `/contact` / Mail or inquiry | Contact page/shared inquiry | Contact/lead | CRM/admin | Human response | Implemented |
| WhatsApp request | Header/sidebar/footer contact link | Public header/navigation | Contact intent | Support/admin | Human response | Test-mode contact fallback |
| AI question | Hero AI, `/zen-g`, Knowledge Center | GenZ engine | Session/query; optional lead | Knowledge search/CRM | Escalate when authoritative | Implemented/partial Q&A |
| Reference tracking | `/tracking` or AI reference input | Tracking/GenZ engine | Lookup event | URMS/admin | No for lookup | Implemented client architecture |
| Pitru inquiry | Pitru pages/forms | Pitru inquiry form | Service inquiry | URMS/CRM/admin | Yes | Implemented |
| Ritual inquiry | Ritual pages/forms | Ritual inquiry form | Service inquiry | URMS/CRM/admin | Yes | Implemented |
| Travel request | `/travel-assistance`, requests | Travel content/form | Travel request | Travel ops/CRM | Yes | Implemented |
| Vahi inquiry | `/vahi-records` | Vahi approved content/form | Confidential lineage inquiry | Vahi coordinator/admin | Yes; availability not guaranteed | Implemented |
| Partner application | `/religious-partners`, `/register` | Registration content/form | Partner profile/application | RPN/admin | Yes | Implemented |
| Service browsing | `/services`, detail CTA | Public catalog | Selection intent | Catalog/booking | Quote may be required | Implemented |
| Booking creation | `/bookings/new` or service flow | Booking form | Booking | Booking/admin | Yes | Implemented internal-facing route |
| Quote approval | Quote modal/workflow | Quote UI | Quote status | Admin/founder | Yes | Client architecture present |
| Payment | Checkout workflow | Payment modal | Payment intent/record | Payment/admin | Yes | Client architecture present |
| Complaint | `/complaint` | Complaint page | Support case | Admin/support | Yes | Partial handoff |
| Grievance | `/grievance` | Grievance page | Escalated case | Founder/admin | Yes | Partial handoff |
| Founder support | `/founder-support` | Support page | Escalation | Founder office | Yes | Partial handoff |

Count: 16 evidenced customer-to-internal handoffs.
