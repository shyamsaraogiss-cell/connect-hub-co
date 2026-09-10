# Legal master implementation

The two v1.0 DOCX files in this directory are the legal content sources. The subsequent project-wide priest terminology lock is applied as an explicit wording overlay; original masters remain unchanged for traceability.

Published pages:

- `/policies-and-legal-terms`
- `/refund-policy`

Regenerate content after an approved source revision:

```powershell
python scripts/generate-legal-documents.py
python scripts/generate-legal-documents.py --check
```

The generated TypeScript includes the source filename and SHA-256. Do not edit legal wording in generated files. The converter preserves source text except for the authorized mappings in `apps/web/src/lib/priest-terminology.rules.json`, including phrases split across Word runs. Numbering, published anchors, bullet items, emphasis, and document-footer text remain intact. It rejects unsupported structures rather than silently dropping them. The policies master's document footer still says “Website-ready draft”; this is preserved verbatim.

The table of contents derives from document headings and displays plain-text entries. In-page jump links were removed at the user's request; legal cross-reference links remain unchanged. Existing published top-level anchors remain stable. Named references to the two policies and Booking Terms link to their canonical pages/sections without changing link text.

Independent rendered-content verification (requires the local website):

```powershell
python scripts/verify-legal-pages.py --base-url http://localhost:3000
```

Browser verification (requires Chromium launched with a debugging endpoint):

```powershell
node scripts/verify-legal-browser.mjs http://localhost:3000 http://localhost:9227
```

Validation completed:

- TypeScript `tsc --noEmit`: PASS.
- ESLint for legal components and both page routes: PASS.
- Rendered DOCX fidelity: PASS (85 policies paragraphs, 53 refund paragraphs, including document footers; nine bullet items).
- Legal cross-reference targets and plain-text contents: PASS.
- Heading hierarchy and browser runtime: PASS. (Earlier smooth-scrolling tests were superseded by the removal of contents jump links.)
- Legal-content bounds at 1440, 1024, 768, 390, and 320px: PASS.
- Screenshots: `artifacts/legal-review/`.

Shared KHEM components, business workflows, and the earlier sidebar work were not edited for this task. The existing shared shell has horizontal overflow at tablet/mobile widths (including the footer subscription block), affecting mobile viewport scaling. Full-page responsive visual approval remains limited by that existing issue; it was not changed because this task expressly excludes shared shell modifications. Repository-wide lint also has the previously identified unrelated `no-require-imports` failure in `src/__tests__/css-module-stub.cjs`.
