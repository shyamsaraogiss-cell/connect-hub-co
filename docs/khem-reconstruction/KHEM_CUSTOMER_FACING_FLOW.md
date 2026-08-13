# KHEM Customer-Facing Flow

## Map A

```text
CUSTOMER
  → / (global header + permanent sidebar + rotating five-Hero workspace)
    ├─ PitruMoksha Gaya → /pitru-moksha-gaya
    │   ├─ /pitru-moksha-gaya/online
    │   └─ /pitru-moksha-gaya/offline
    ├─ Ritual Services → /ritual-services
    │   ├─ /ritual-services/online
    │   └─ /ritual-services/offline
    ├─ Travel Assistance → /travel-assistance
    │   ├─ /travel-assistance/requests
    │   └─ /travel-assistance/success
    ├─ Vahi Records → /vahi-records
    └─ Religious Partner Network → /religious-partners → /register
  → Explore / Core Services
  → contextual GenZ AI or /zen-g
  → /knowledge-center
  → inquiry / request / registration / service selection
  → /tracking or authenticated /dashboard
  → human-reviewed quote / booking / assignment
  → execution / documentation / completion / support
```

## Supporting public routes

`/services`, `/services/[slug]`, `/contact`, `/about`, `/tracking`, `/complaint`, `/grievance`, `/founder-support`, `/privacy-policy`, `/terms`, `/booking-terms`, `/cancellation-policy`, `/login`, `/forgot-password`, `/reset-password`, and `/verify-email`.

## Ownership

- Header, sidebar and footer are global.
- The homepage Hero, AI context and Explore content rotate together.
- Business landing Heroes are fixed and contain no homepage controls.
- Trust strip is Hero-specific where data/source establishes it.
- Core Services currently uses one canonical configuration; independent datasets for all Heroes are not established.
- Inner content owns forms, breadcrumbs and page-specific guidance.

## Route status summary

Twenty-eight public/customer routes are evidenced in the current App Router. Travel/Vahi floating routes beyond those listed are not established. Navigation intent exceeds implemented destinations in several historical documents; current navigation uses existing public routes or query-mode `/contact` fallbacks.
