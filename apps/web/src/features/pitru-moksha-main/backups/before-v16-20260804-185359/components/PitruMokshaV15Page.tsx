"use client";

import Link from "next/link";
import { useState } from "react";

import { v15PageContent } from "../data/mainPageV15Content";
import styles from "../PitruMokshaV15.module.css";

type Action = { readonly label: string; readonly href: string };
type Block =
  | { readonly kind: "heading" | "subheading" | "paragraph" | "bullet" | "check" | "step"; readonly text: string }
  | { readonly kind: "actions"; readonly actions: readonly Action[] }
  | { readonly kind: "callout"; readonly tone: string; readonly lines: readonly string[] }
  | { readonly kind: "cards"; readonly tone: string; readonly cards: readonly (readonly string[])[] }
  | { readonly kind: "table"; readonly rows: readonly (readonly (readonly string[])[])[] };

function BlockView({ block }: { readonly block: Block }) {
  if (block.kind === "heading") return <h4 className={styles.heading}>{block.text}</h4>;
  if (block.kind === "subheading") return <h5 className={styles.subheading}>{block.text}</h5>;
  if (block.kind === "paragraph") return <p className={styles.paragraph}>{block.text}</p>;
  if (block.kind === "bullet") return <p className={styles.bullet}>{block.text}</p>;
  if (block.kind === "check") return <p className={styles.check}>{block.text}</p>;
  if (block.kind === "step") {
    const [title, ...rest] = block.text.split(":");
    return <article className={styles.step}><strong>{title}</strong><p>{rest.join(":").trim()}</p></article>;
  }
  if (block.kind === "actions") {
    return <nav className={styles.actions} aria-label="Section actions">{block.actions.map((action) => <Link href={action.href} key={`${action.label}-${action.href}`}>{action.label}</Link>)}</nav>;
  }
  if (block.kind === "callout") {
    return <aside className={`${styles.callout} ${styles[block.tone]}`}>{block.lines.map((line, index) => index === 0 ? <strong key={line}>{line}</strong> : <p key={`${line}-${index}`}>{line}</p>)}</aside>;
  }
  if (block.kind === "cards") {
    return <div className={styles.cards}>{block.cards.map((card, index) => <article className={styles.card} key={`${card[0]}-${index}`}><h5>{card[0]}</h5>{card.slice(1).map((line) => <p key={line}>{line}</p>)}</article>)}</div>;
  }
  if (block.kind === "table") {
    return (
      <div
        className={styles.tableWrap}
        role="region"
        aria-label="Section information table"
        tabIndex={0}
      >
        <table>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) =>
                  rowIndex === 0 ? (
                    <th key={cellIndex}>
                      {cell.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </th>
                  ) : (
                    <td key={cellIndex}>
                      {cell.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}

export function PitruMokshaV15Page() {
  const [openIds, setOpenIds] = useState<readonly string[]>(["01"]);
  const allIds = v15PageContent.sections.map((section) => section.id);
  const toggle = (id: string) => setOpenIds((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);

  return <main className={styles.page}>
    <header className={styles.guideHeader}>
      <div><p>Explore the Land of Moksha</p><h2>{v15PageContent.masthead}</h2></div>
      <div className={styles.controls}><button type="button" onClick={() => setOpenIds(allIds)}>Expand All</button><button type="button" onClick={() => setOpenIds([])}>Collapse All</button></div>
    </header>
    <div className={styles.sections}>
      {v15PageContent.sections.map((section) => {
        const open = openIds.includes(section.id);
        const triggerId = `v15-${section.id}-trigger`;
        const panelId = `v15-${section.id}-panel`;
        const blocks = section.blocks as readonly Block[];
        return <section className={`${styles.section} ${open ? styles.open : ""}`} id={`section-${section.id}`} key={section.id}>
          <h3><button aria-controls={panelId} aria-expanded={open} id={triggerId} onClick={() => toggle(section.id)} type="button"><span className={styles.number}>{section.id}</span><span className={styles.sectionTitle}>{section.title}</span><span className={styles.chevron} aria-hidden="true">⌄</span></button></h3>
          {open ? <div aria-labelledby={triggerId} className={styles.panel} id={panelId} role="region">{blocks.map((block, index) => <BlockView block={block} key={`${block.kind}-${index}`} />)}</div> : null}
        </section>;
      })}
    </div>
  </main>;
}
