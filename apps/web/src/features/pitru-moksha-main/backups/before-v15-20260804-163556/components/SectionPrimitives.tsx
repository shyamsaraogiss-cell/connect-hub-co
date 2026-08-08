import Link from "next/link";

import styles from "../PitruMokshaMainPage.module.css";

export function Paragraphs({
  paragraphs,
}: {
  readonly paragraphs: readonly string[];
}) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </>
  );
}

export function BulletList({
  items,
}: {
  readonly items: readonly string[];
}) {
  return (
    <ul className={styles.bulletList}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ActionLinks({
  actions,
}: {
  readonly actions: readonly {
    readonly label: string;
    readonly href: string;
  }[];
}) {
  return (
    <nav className={styles.sectionActions} aria-label="Section actions">
      {actions.map((action, index) => (
        <Link
          className={
            index === 0
              ? styles.primaryButton
              : styles.secondaryButton
          }
          href={action.href}
          key={`${action.label}-${action.href}`}
        >
          {action.label}
        </Link>
      ))}
    </nav>
  );
}
