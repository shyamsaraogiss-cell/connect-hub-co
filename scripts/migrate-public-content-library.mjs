import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import ts from "../apps/web/node_modules/typescript/lib/typescript.js";

const jobs = [
  ["project-content/pages/inner/pitru-moksha-gaya/content.json", ["apps/web/src/app/pitru-moksha-gaya/page.tsx", "apps/web/src/features/pitru-moksha-main/data/mainPageV15Content.ts"]],
  ["project-content/pages/inner/ritual-services/content.json", ["apps/web/src/app/ritual-services/page.tsx", "apps/web/src/components/business-pages/ritual-services/RitualServicesPage.tsx"]],
  ["project-content/pages/inner/travel-assistance/content.json", ["apps/web/src/app/travel-assistance/page.tsx", "apps/web/src/components/business-pages/travel-assistance/TravelAssistanceContent.tsx"]],
  ["project-content/pages/inner/vahi-records/content.json", ["apps/web/src/app/vahi-records/page.tsx", "apps/web/src/components/business-pages/vahi-records/VahiApprovedContent.tsx"]],
  ["project-content/pages/inner/religious-partners/content.json", ["apps/web/src/app/religious-partners/page.tsx", "apps/web/src/components/business-pages/religious-partners/ReligiousPartnersContent.tsx"]],
  ["project-content/pages/inner/about/content.json", ["apps/web/src/app/about/page.tsx", "apps/web/src/components/common/BusinessAbout.tsx"]],
  ["project-content/pages/child/pitru-moksha-gaya/online/content.json", ["apps/web/src/app/pitru-moksha-gaya/online/page.tsx", "apps/web/src/components/business-pages/online/OnlineAncestralPage.tsx"]],
  ["project-content/pages/child/pitru-moksha-gaya/offline/content.json", ["apps/web/src/app/pitru-moksha-gaya/offline/page.tsx"]],
  ["project-content/pages/child/ritual-services/online/content.json", ["apps/web/src/app/ritual-services/online/page.tsx"]],
  ["project-content/pages/child/ritual-services/offline/content.json", ["apps/web/src/app/ritual-services/offline/page.tsx"]],
  ["project-content/pages/child/travel-assistance/success/content.json", ["apps/web/src/app/travel-assistance/success/page.tsx"]],
  ["project-content/applications/general-inquiry/content.json", ["apps/web/src/app/contact/page.tsx"]],
  ["project-content/applications/service-request/content.json", ["apps/web/src/app/services/page.tsx"]],
  ["project-content/applications/complaint/content.json", ["apps/web/src/app/complaint/page.tsx"]],
  ["project-content/applications/grievance/content.json", ["apps/web/src/app/grievance/page.tsx"]],
  ["project-content/applications/founder-support/content.json", ["apps/web/src/app/founder-support/page.tsx"]],
  ["project-content/applications/religious-partner-registration/content.json", ["apps/web/src/app/religious-partners/register/page.tsx"]],
  ["project-content/applications/tracking/content.json", ["apps/web/src/app/tracking/page.tsx"]],
  ["project-content/forms/general-inquiry/content.json", ["apps/web/src/components/inquiry/GeneralInquiryForm.tsx"]],
  ["project-content/forms/service-request/content.json", ["apps/web/src/components/booking/BookingForm.tsx"]],
  ["project-content/forms/complaint/content.json", ["apps/web/src/components/support/ComplaintForm.tsx"]],
  ["project-content/forms/grievance/content.json", ["apps/web/src/components/support/GrievanceForm.tsx"]],
  ["project-content/forms/founder-support/content.json", ["apps/web/src/components/support/DedicatedSupportForm.tsx"]],
  ["project-content/forms/religious-partner-registration/content.json", ["apps/web/src/components/partner/ReligiousPartnerApplicationForm.tsx"]],
];

const textProps = new Set(["title", "description", "subtitle", "supportingLine", "heading", "text", "intro", "sourceTitle", "question", "answer", "label", "cta", "ctaText", "eyebrow", "introduction", "overviewTitle", "overviewCopy", "detailsLabel", "detailsPlaceholder", "categoryLabel", "categoryPlaceholder", "badge", "name"]);
const textAttrs = new Set(["alt", "aria-label", "placeholder", "title"]);
const codeProps = new Set(["href", "id", "icon", "slug", "value", "ctaTopic", "tone", "kind", "action", "articleIds", "faqIds", "qaIds"]);

function lineOf(sf, node) { return sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1; }
function collect(sourcePath, source) {
  const sf = ts.createSourceFile(sourcePath, source, ts.ScriptTarget.Latest, true, sourcePath.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const entries = [];
  const add = (kind, node, value) => { if (value && value.trim()) entries.push({ kind, line: lineOf(sf, node), value }); };
  function propertyName(node) {
    for (let p = node.parent; p; p = p.parent) {
      if (ts.isPropertyAssignment(p)) return ts.isIdentifier(p.name) || ts.isStringLiteral(p.name) ? p.name.text : "";
      if (ts.isJsxAttribute(p)) return p.name.getText(sf);
      if (ts.isVariableDeclaration(p)) return ts.isIdentifier(p.name) ? p.name.text : "";
    }
    return "";
  }
  function visit(node) {
    if (ts.isJsxText(node)) add("jsx-text", node, node.getText(sf));
    if (ts.isJsxAttribute(node) && textAttrs.has(node.name.getText(sf)) && node.initializer && ts.isStringLiteral(node.initializer)) add(`attribute:${node.name.getText(sf)}`, node.initializer, node.initializer.text);
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const prop = propertyName(node);
      if (textProps.has(prop) && !codeProps.has(prop)) add(`field:${prop}`, node, node.text);
      else if (ts.isArrayLiteralExpression(node.parent)) {
        const owner = propertyName(node.parent);
        if (!codeProps.has(owner)) add(`list:${owner || "content"}`, node, node.text);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sf);
  const unique = [];
  const seen = new Set();
  for (const entry of entries) {
    const key = `${entry.line}\0${entry.kind}\0${entry.value}`;
    if (!seen.has(key)) { seen.add(key); unique.push(entry); }
  }
  return unique;
}

for (const [destination, sources] of jobs) {
  const records = [];
  for (const sourcePath of sources) {
    const source = await readFile(sourcePath, "utf8");
    records.push({ source: sourcePath.replaceAll("\\", "/"), sha256: createHash("sha256").update(source).digest("hex"), entries: collect(sourcePath, source) });
  }
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, `${JSON.stringify({ schemaVersion: 1, ownership: "MASTER_CONTENT_LIBRARY", runtimeReference: "UNCHANGED_COPY_FIRST", sources: records }, null, 2)}\n`, "utf8");
}
