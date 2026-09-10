"""Authorized priest terminology overlay; source master documents stay unchanged."""
import json
import re
from pathlib import Path

RULES = json.loads((Path(__file__).resolve().parents[1] / 'apps/web/src/lib/priest-terminology.rules.json').read_text(encoding='utf-8'))


def priest_terminology(text):
    for rule in RULES:
        text = re.sub(rule['pattern'], lambda match: rule['replacement'].upper() if match.group().isupper() else rule['replacement'], text, flags=re.I)
    return text


def terminology_runs(runs):
    # Word may split a phrase between runs. Preserve unaffected emphasis and text.
    result = [dict(run) for run in runs]
    for rule in RULES:
        text = ''.join(run['text'] for run in result)
        for match in reversed(list(re.finditer(rule['pattern'], text, flags=re.I))):
            offset = 0
            inserted = False
            for run in result:
                original = run['text']
                end = offset + len(original)
                if offset < match.end() and end > match.start():
                    before = original[:max(0, match.start() - offset)]
                    after = original[max(0, match.end() - offset):]
                    replacement = rule['replacement'].upper() if match.group().isupper() else rule['replacement']
                    run['text'] = before + (replacement if not inserted else '') + after
                    inserted = True
                offset = end
    return [run for run in result if run['text']]
