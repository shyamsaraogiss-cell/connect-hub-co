import { Fragment } from 'react';
import { PublicHeroShell } from '@/features/public-shell';
import styles from './LegalDocument.module.css';
import { LegalContents } from './LegalContents';

type LegalRun = { text: string; bold?: boolean; italic?: boolean; href?: string };
type LegalBlock =
  | { type: 'p' | 'h2' | 'h3' | 'h4'; runs: LegalRun[]; id?: string }
  | { type: 'ul'; items: LegalRun[][] };

export type LegalDocumentContent = { title: string; blocks: LegalBlock[]; footer: LegalRun[][] };

function TextRuns({ runs }: { runs: LegalRun[] }) {
  return runs.map((run, index) => {
    const text = run.italic ? <em>{run.text}</em> : run.text;
    const content = run.bold ? <strong>{text}</strong> : text;
    return <Fragment key={index}>{run.href ? <a href={run.href}>{content}</a> : content}</Fragment>;
  });
}

export function LegalDocument({ document }: { document: LegalDocumentContent }) {
  const headings = document.blocks.flatMap(block =>
    block.type !== 'ul' && block.type !== 'p' && block.id
      ? [{ id: block.id, title: block.runs.map(run => run.text).join(''), level: Number(block.type.slice(1)) }]
      : []);
  return (
    <PublicHeroShell>
      <main className={styles.page}>
        <article className={styles.document} aria-labelledby="legal-page-title" data-legal-document>
          <h1 id="legal-page-title" tabIndex={-1}>{document.title}</h1>
          <LegalContents headings={headings} />
          <div data-legal-body>
          {document.blocks.map((block, index) => {
            if (block.type === 'ul') {
              return <ul key={index}>{block.items.map((runs, item) => <li key={item}><TextRuns runs={runs} /></li>)}</ul>;
            }
            const Tag = block.type;
            return <Tag key={index} id={block.id} tabIndex={block.id ? -1 : undefined}><TextRuns runs={block.runs} /></Tag>;
          })}
          </div>
          <footer className={styles.documentFooter} data-legal-footer>
            {document.footer.map((runs, index) => <p key={index}><TextRuns runs={runs} /></p>)}
          </footer>
        </article>
      </main>
    </PublicHeroShell>
  );
}
