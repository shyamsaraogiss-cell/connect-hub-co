# Connect Hub Co. master content library

This directory is the copy-first master library for approved public static content and physical assets.

- `pages/` contains exact static-content catalogs for public inner and child pages.
- `applications/` contains exact public application-page copy catalogs.
- `forms/` contains public labels, options, declarations, placeholders, and explanatory copy only.
- `assets/` contains byte-identical master copies of reusable physical public assets.
- `heroes/` contains Hero content, assets, and references when those files physically exist.

Runtime React components, CSS, routes, state, validation, handlers, APIs, and workflow logic remain in `apps/web/src`. Catalog entries include source paths, source line numbers, and SHA-256 hashes. Runtime references remain unchanged where conversion could affect behavior.

## Runtime asset relationship

`project-content/assets/brand/golden-lotus-mark.svg` is the master copy. Its byte-identical runtime copy remains at `apps/web/public/images/brand/golden-lotus-mark.svg` so existing public URLs continue to work.

Knowledge Center, GenZ, and `project-content/qa` are excluded from this migration.
