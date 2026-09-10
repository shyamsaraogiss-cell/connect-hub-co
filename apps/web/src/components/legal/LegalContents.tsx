import styles from './LegalDocument.module.css';

type Heading = { id: string; title: string; level: number };

export function LegalContents({ headings }: { headings: Heading[] }) {
  function entries(items: Heading[], level: number) {
    const groups: { heading: Heading; children: Heading[] }[] = [];
    for (const heading of items) {
      if (heading.level === level) groups.push({ heading, children: [] });
      else groups.at(-1)?.children.push(heading);
    }
    return <ul>{groups.map(({ heading, children }) => <li key={heading.id}>
      <span className={styles.contentsEntry}>{heading.title}</span>
      {children.length ? entries(children, level + 1) : null}
    </li>)}</ul>;
  }

  return <nav className={styles.contents} aria-label="Legal document table of contents">
    <details open>
      <summary>Table of contents</summary>
      {entries(headings, 2)}
    </details>
  </nav>;
}
