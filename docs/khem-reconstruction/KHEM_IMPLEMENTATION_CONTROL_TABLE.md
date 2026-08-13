# KHEM Implementation Control Table

Initial planning status only. `READY` means sufficiently specified to begin controlled implementation after authorization; it does not mean implemented.

| ID | Wave | Area | Current state | Approved target | Canonical source | Files to change | Protected dependencies | Action | Validation | Status |
|---|---:|---|---|---|---|---|---|---|---|---|
| IC-01 | 1 | Shell ownership | component/root duplicates | component-folder owner | public-shell index | shell imports/components | PI-01 | map/consolidate verified behavior | import/bundle graph | READY |
| IC-02 | 1 | Hero ownership | 3+ components, 5 data sources | one verified owner/data contract | selected after FD-01 diff | Hero components/data/index | PI-05/06 | compare and consolidate | behavior/visual matrix | READY |
| IC-03 | 1 | Sidebar ownership | two files | component-folder owner | component Sidebar | Sidebar/config/imports | PI-03 | reconcile differences | route/visual diff | READY |
| IC-04 | 2 | Header | ownership split | one fixed Header | approved shell/Header | shell/Header | PI-02 | reconnect | all-route visual | READY |
| IC-05 | 2 | Footer | composition incomplete | one fixed Footer | `BusinessFooter` | shell/Footer/config | PI-04 | reconnect | links/visual | READY |
| IC-06 | 3 | Hero synchronization | trust/Core not consistently slide-bound | atomic rotating workspace | consolidated slide state | Hero UI/data/CSS | PI-05/06 | correct | five-state tests | READY |
| IC-07 | 3 | Hero assets/logos | variants/duplicate locations | verified mapping | logo config + approved assets | references/config | PI-06 | map/correct | asset/hash/render | READY |
| IC-08 | 4 | Five landings | active | fixed approved pages | route pages/business components | only verified deltas | PI-07 | validate/correct | route/content/CTA | READY |
| IC-09 | 5 | PMG/Ritual children | active children | verified children | current route pages | child pages as needed | PI-07/12 | validate/Q&A classify | route/content | READY |
| IC-10 | 5 | Vahi children | no approved exact inventory | evidence-only children | none yet | none | PI-18/22 | await source/privacy approval | evidence trace | BLOCKED |
| IC-11 | 5 | Parallel `/pitru-moksha` | legacy active flow | approved alias/redirect or supersession | not yet selected | none until compatibility map | PI-07/21 | map request dependencies | route/data parity | BLOCKED |
| IC-12 | 6 | Golden Q&A model | names imply approval; metadata absent | version/provenance/publication gate | AI governance architecture | AI types/knowledge/services/UI | PI-12 | introduce governed statuses | provenance tests | READY |
| IC-13 | 6 | AI fallback | non-fabrication response exists | disclosed constrained fallback | AI engine | engine/UI/escalation | PI-13 | correct disclosure/audit | fallback tests | READY |
| IC-14 | 6 | Knowledge retrieval | mixed-status risk | published-only index | knowledge owner | knowledge/search/page | PI-14 | filter and cite | retrieval negatives | READY |
| IC-15 | 7 | Customer CRUD | bulk CRUD routes/services | ERP CRUD plus own-data account | split contracts | customer pages/services/backend | PI-08/09 | supersede/split | cross-account tests | READY |
| IC-16 | 7 | Booking CRUD | broad list/edit/delete UI | ERP CRUD plus own booking | split contracts | booking pages/services/backend | PI-08/09 | supersede/split | role/field tests | READY |
| IC-17 | 7 | Booking backend | no backend booking route found in live inventory | explicit authorized service | to be established from evidence | none until owner located | PI-08/22 | locate/approve contract | API inventory | BLOCKED |
| IC-18 | 8 | Partner dashboard | role-selected full dashboard | limited portal | PartnerDashboard replacement boundary | dashboard/auth/partner files | PI-10/11/17 | supersede | assignment negative tests | READY |
| IC-19 | 8 | Partner authorization | role/email heuristic visible | verified server role/assignment | auth and partner backend | auth/controller/service/repository | PI-10/11 | correct | spoof/revocation tests | READY |
| IC-20 | 9 | CRM/URMS/RPN | present/fragmented | verified connected ownership | existing services/components | flows/guards | PI-15–17 | reconnect | transition/audit tests | READY |
| IC-21 | 9 | Quote/payment | partial components/services | authorized lifecycle | quote/payment owners | components/services/API | PI-08 | reconnect | approval/reconciliation | READY |
| IC-22 | 9 | Complaint | visible page, persistence unclear | controlled case flow | support owner | page/service/API | PI-08 | reconnect | submission/ownership | READY |
| IC-23 | 9 | Grievance | visible page, persistence unclear | restricted case flow | grievance owner | page/service/API | PI-08 | reconnect | access/audit | READY |
| IC-24 | 9 | Founder Support | visible page, queue unclear | audited escalation | Founder-support owner | page/service/API | PI-08 | reconnect | role/audit | READY |
| IC-25 | 10 | Navigation | two configs/mojibake/active-link risk | one approved registry | KHEM config after reconciliation | configs/consumers/sitemap | PI-03/07 | correct | crawler/active links | READY |
| IC-26 | 11 | Assets/encoding | variants and mojibake visible | verified assets/UTF-8 | approved asset map | refs/CSS/text/config | PI-06/21 | correct, do not delete | render/path/encoding | READY |
| IC-27 | 12 | Technical validation | existing tests partial | full quality/security gates | workspace scripts/tests | tests/config only as needed | all PI | run/extend checks | lint/type/build/security | READY |
| IC-28 | 13–14 | Functional/desktop review | incomplete coverage | all roles/routes/desktop states reviewed | approved architecture | tests/fixtures only | all PI | execute review | journey/screenshot matrix | READY |
| IC-29 | 15 | Cleanup/lock | classifications only | Founder-approved cleanup and final lock | disposition/protection reports | only separately approved targets | PI-21/22 | wait for Founder authorization | inventory/regression/rollback | NO CHANGE REQUIRED |
| IC-30 | — | `master-vault` | local config; relationship unknown | isolated/noncanonical pending investigation | no established owner | documentation only | PI-19 | dependency/threat investigation | security review | SOURCE NOT ESTABLISHED |

## Status totals

- READY: **25**
- NO CHANGE REQUIRED: **1**
- BLOCKED: **3**
- SOURCE NOT ESTABLISHED: **1**
- Total controlled items: **30**

Blocked items are IC-10, IC-11, and IC-17. Discovery/reconnection work for case persistence in IC-22–24 may begin, but those flows cannot ship until their APIs and authorities are verified; they remain `READY` planning items rather than additional architecture blockers.

## Implementation gate review — 2026-08-12

The initial statuses above remain the discovery record. The release gate applies the following operational classification:

| Control | Gate class | Release disposition | Dependency effect |
|---|---|---|---|
| IC-10 | B — safe to fence | FENCED | No other ready control requires unapproved Vahi child routes. |
| IC-11 | B — safe to fence | FENCED | Canonical `/pitru-moksha-gaya` and its verified children can proceed while the parallel legacy flow remains unchanged. |
| IC-17 | B — safe to fence | FENCED | The missing authorized booking backend contract prevents IC-16 from implementing or shipping its split. |
| IC-30 | B — safe to fence | FENCED | FD-05 removes `master-vault` from all unrelated dependencies. |
| IC-16 | Dependent release adjustment | FENCED | It depends on IC-17 for server-enforced customer/ERP booking separation. |

### Release-set totals

- READY NOW: **24** — every original `READY` item except IC-16.
- FENCED: **5** — IC-10, IC-11, IC-16, IC-17, IC-30.
- GLOBAL BLOCKERS: **0**.

No ready control may introduce a dependency on a fenced control. IC-16 may continue non-mutating contract analysis, but implementation and shipment remain fenced until IC-17 is resolved.
