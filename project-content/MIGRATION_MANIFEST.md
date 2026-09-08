# Master content-library migration manifest

## Scope

This copy-first migration covers public inner-page copy, child-page copy, application-page copy, form labels/options/declarations, existing Hero references, and existing shared physical assets.

Knowledge Center, GenZ, and `project-content/qa` are explicitly excluded.

## Runtime references

The generated `content.json` files are non-executable master catalogs. Each catalog records its original source path, SHA-256 source hash, source line, entry kind, and exact extracted value.

Runtime references remain unchanged in this migration because the current static copy is embedded in mixed React and workflow files. Repointing those files without a separately approved adapter conversion could change rendering, state, validation, submission, routing, or workflow behavior.

## Physical assets

| Master | Runtime/source copy | Relationship |
| --- | --- | --- |
| `project-content/assets/brand/golden-lotus-mark.svg` | `apps/web/public/images/brand/golden-lotus-mark.svg` | Byte-identical master to runtime copy |
| `project-content/heroes/hero-1-pitrumoksha-gaya/references/hero1-central-layout-fit-reference.png.png` | `project-content/heroes/hero-1-pitrumoksha-gaya/hero1-central-layout-fit-reference.png.png` | Byte-identical copy-first reference placement |

## Missing Hero assets

The following runtime references do not physically exist and were skipped without searching, restoring, recreating, or substituting:

- `Hero_1_PitruMoksha_Gaya_Final_v2.0.png` — MISSING — SKIPPED BY RULE
- `Hero_4_Vahi_Records_Representative_v1.0.png` — MISSING — SKIPPED BY RULE
- `PitruMoksha_Gaya_Logo_Master.png` — MISSING — SKIPPED BY RULE
- `vahi-records-ledger.jpg` — MISSING — SKIPPED BY RULE

## Preservation

No original source was deleted. React components, CSS, routes, metadata behavior, executable icons, state, validation, handlers, APIs, and workflows remain code-owned under `apps/web/src`.
