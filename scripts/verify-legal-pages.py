"""Independently compare served HTML with every source paragraph, including footers.

Run against a local Next server: python scripts/verify-legal-pages.py --base-url http://localhost:3055
"""
import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import urlopen
from urllib.parse import urlsplit
from zipfile import ZipFile
import xml.etree.ElementTree as ET
from priest_terminology import priest_terminology

ROOT = Path(__file__).resolve().parents[1]
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
PAGES = {
    '/policies-and-legal-terms': 'POLICIES_AND_LEGAL_TERMS_MASTER_v1.0.docx',
    '/refund-policy': 'REFUND_AND_CANCELLATION_POLICY_MASTER_v1.0.docx',
}


class LegalHTML(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.active = False
        self.in_contents = False
        self.capture = None
        self.paragraphs = []
        self.ids = []
        self.links = []
        self.levels = []
        self.bullets = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'article' and 'data-legal-document' in attrs:
            self.active = True
        if not self.active:
            return
        if tag == 'nav':
            self.in_contents = True
        if tag == 'a':
            self.links.append(attrs['href'])
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if self.in_contents:
            return
        if tag in ('h1', 'h2', 'h3', 'h4', 'p', 'li'):
            self.capture = []
        if tag in ('h1', 'h2', 'h3', 'h4'):
            self.levels.append(int(tag[1]))
        if tag == 'li':
            self.bullets += 1

    def handle_data(self, data):
        if self.active and not self.in_contents and self.capture is not None:
            self.capture.append(data)

    def handle_endtag(self, tag):
        if not self.active:
            return
        if tag == 'nav':
            self.in_contents = False
        elif not self.in_contents and tag in ('h1', 'h2', 'h3', 'h4', 'p', 'li') and self.capture is not None:
            self.paragraphs.append(''.join(self.capture))
            self.capture = None
        elif tag == 'article':
            self.active = False


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base-url', default='http://localhost:3055')
    args = parser.parse_args()
    pages = {}
    for route, filename in PAGES.items():
        with ZipFile(ROOT / 'docs/legal' / filename) as source:
            parts = ['word/document.xml'] + [name for name in source.namelist() if name.startswith('word/footer') and name.endswith('.xml')]
            paragraphs = [paragraph for part in parts for paragraph in ET.fromstring(source.read(part)).iter(f'{W}p')]
            expected = [''.join(node.text or '' for node in paragraph.iter(f'{W}t')) for paragraph in paragraphs]
            expected = [priest_terminology(text) for text in expected if text]
            bullets = sum(any(style.get(f'{W}val') == 'ListBullet' for style in paragraph.iter(f'{W}pStyle')) for paragraph in paragraphs)
        with urlopen(args.base_url + route, timeout=180) as response:
            assert response.status == 200
            page = LegalHTML()
            page.feed(response.read().decode('utf-8'))
        assert page.paragraphs == expected, f'{route}: rendered legal wording differs from DOCX'
        assert page.bullets == bullets, f'{route}: list structure changed'
        assert len(page.ids) == len(set(page.ids)), 'Duplicate IDs'
        assert page.levels[0] == 1 and page.levels.count(1) == 1
        assert all(b <= a + 1 for a, b in zip(page.levels, page.levels[1:])), 'Skipped heading level'
        pages[route] = page
        print(f'{route}: HTTP 200; {len(expected)} exact source paragraphs; {bullets} list items; heading hierarchy PASS')
    for route, page in pages.items():
        for href in page.links:
            link = urlsplit(href)
            target = pages[link.path or route]
            assert link.fragment in target.ids, f'Broken cross-reference: {href}'
    print('Every table-of-contents and legal cross-reference target: PASS')


if __name__ == '__main__':
    main()
