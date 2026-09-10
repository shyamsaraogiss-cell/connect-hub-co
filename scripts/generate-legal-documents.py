"""Generate only the two legal pages from approved DOCX masters. Use --check in CI."""
import argparse
import hashlib
import json
import re
from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET
from priest_terminology import terminology_runs

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'apps/web/src/components/legal'
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
SOURCES = {
    'policiesDocument': 'POLICIES_AND_LEGAL_TERMS_MASTER_v1.0.docx',
    'refundDocument': 'REFUND_AND_CANCELLATION_POLICY_MASTER_v1.0.docx',
}
# Published anchors must remain stable for existing inbound links.
ANCHORS = {'1. Terms & Conditions': 'terms-and-conditions'}
REFERENCES = {
    'Policies & Legal Terms': '/policies-and-legal-terms#legal-page-title',
    'Refund & Cancellation Policy': '/refund-policy#legal-page-title',
    'Booking Terms': '/policies-and-legal-terms#booking-terms',
    'Cancellation Policy': '/refund-policy#legal-page-title',
}
PATTERN = re.compile('|'.join(re.escape(key) for key in REFERENCES))


def runs(paragraph):
    result = []
    for run in paragraph.findall(f'{W}r'):
        text = ''.join(node.text or '' if node.tag == f'{W}t' else
                       '\t' if node.tag == f'{W}tab' else '\n' if node.tag == f'{W}br' else ''
                       for node in run)
        if not text:
            continue
        item = {'text': text}
        for prop, key in [('b', 'bold'), ('i', 'italic')]:
            value = run.find(f'{W}rPr/{W}{prop}')
            if value is not None and value.get(f'{W}val') not in ('0', 'false', 'off'):
                item[key] = True
        result.append(item)
    return result


def linked(source):
    # Match across Word run boundaries without changing characters or emphasis.
    text = ''.join(run['text'] for run in source)
    matches = list(PATTERN.finditer(text))
    result, offset = [], 0
    for run in source:
        end = offset + len(run['text'])
        cuts = sorted({offset, end} | {max(offset, m.start()) for m in matches if m.start() < end and m.end() > offset}
                      | {min(end, m.end()) for m in matches if m.start() < end and m.end() > offset})
        for a, b in zip(cuts, cuts[1:]):
            item = {**run, 'text': text[a:b]}
            match = next((m for m in matches if m.start() <= a and b <= m.end()), None)
            if match:
                item['href'] = REFERENCES[match.group()]
            result.append(item)
        offset = end
    return result


def extract(path):
    with ZipFile(path) as archive:
        body = ET.fromstring(archive.read('word/document.xml')).find(f'{W}body')
        assert body is not None
        assert all(node.tag in (f'{W}p', f'{W}sectPr') for node in body), 'Unsupported body structure'
        assert not any(body.iter(f'{W}hyperlink')), 'Source hyperlinks need explicit preservation'
        document = {'title': '', 'blocks': [], 'footer': []}
        ids = set()
        for paragraph in body.findall(f'{W}p'):
            content = runs(paragraph)
            text = ''.join(run['text'] for run in content)
            assert text == ''.join(node.text or '' for node in paragraph.iter(f'{W}t')), 'Unconverted source text'
            if not text:
                continue
            style = paragraph.find(f'{W}pPr/{W}pStyle')
            name = style.get(f'{W}val') if style is not None else ''
            assert paragraph.find(f'{W}pPr/{W}numPr') is None, 'New automatic numbering needs explicit handling'
            if name == 'Title':
                assert not document['title']
                document['title'] = text
                continue
            if name == 'ListBullet':
                if not document['blocks'] or document['blocks'][-1]['type'] != 'ul':
                    document['blocks'].append({'type': 'ul', 'items': []})
                document['blocks'][-1]['items'].append(linked(content))
                continue
            kind = {'Heading1': 'h2', 'Heading2': 'h3', 'Heading3': 'h4'}.get(name, 'p')
            if text in ('Cancellation Before Service Commitments', 'Cancellation After Service Commitments'):
                kind = 'h4'
            block = {'type': kind, 'runs': content if kind != 'p' else linked(content)}
            if kind != 'p':
                slug = ANCHORS.get(text) or re.sub(r'[^a-z0-9]+', '-', re.sub(r'^\d+(?:\.\d+)*\.?\s+', '', text).lower()).strip('-')
                assert slug not in ids, f'Duplicate anchor: {slug}'
                ids.add(slug)
                block['id'] = slug
            document['blocks'].append(block)
        for part in archive.namelist():
            if re.match(r'word/(footer|header|footnotes|endnotes).*\.xml$', part):
                root = ET.fromstring(archive.read(part))
                for paragraph in root.iter(f'{W}p'):
                    content = runs(paragraph)
                    if content:
                        assert 'footer' in part, f'New notes/header require rendering: {part}'
                        document['footer'].append(content)
        # Apply only the user's terminology lock after generating the original anchors.
        for block in document['blocks']:
            if block['type'] == 'ul':
                block['items'] = [terminology_runs(item) for item in block['items']]
            else:
                block['runs'] = terminology_runs(block['runs'])
        document['footer'] = [terminology_runs(item) for item in document['footer']]
        return document


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    documents = {}
    for name, filename in SOURCES.items():
        source = ROOT / 'docs/legal' / filename
        document = extract(source)
        documents[name] = document
        result = ("import type { LegalDocumentContent } from './LegalDocument';\n\n"
                  f'// Generated from docs/legal/{filename}; do not edit legal wording here.\n'
                  f'// Source SHA-256: {hashlib.sha256(source.read_bytes()).hexdigest()}\n'
                  '// Authorized priest terminology overlay: apps/web/src/lib/priest-terminology.rules.json\n'
                  '// Regenerate: python scripts/generate-legal-documents.py\n'
                  f'export const {name} = ' + json.dumps(document, ensure_ascii=False, indent=2)
                  + ' satisfies LegalDocumentContent;\n')
        target = OUTPUT / f'{name}.ts'
        if args.check:
            assert target.read_text(encoding='utf-8') == result, f'Generated content drift: {target}'
        else:
            target.write_text(result, encoding='utf-8')
        print(f'{filename}: {len(document["blocks"])} blocks; source fidelity PASS')
    for href in REFERENCES.values():
        route, anchor = href.split('#')
        document = documents['refundDocument' if route == '/refund-policy' else 'policiesDocument']
        assert anchor in {'legal-page-title'} | {block.get('id') for block in document['blocks']}
    print('Cross-reference targets: PASS')


if __name__ == '__main__':
    main()
