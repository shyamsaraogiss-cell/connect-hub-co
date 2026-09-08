"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { HeaderMailIcon } from "@/components/auth/PublicHeader";
import { QuestionCircleIcon, MulticolourAiBrainIcon } from "@/features/public-shell/components/PublicHeroSidebar";
import { ROUTES } from "@/config/navigation";

import { v15PageContent } from "../data/mainPageV15Content";
import styles from "../PitruMokshaV15.module.css";

type Action = { readonly label: string; readonly href: string };
type SankalpBox = {
  readonly title: string;
  readonly content: string;
  readonly note?: string;
  readonly cta?: Action;
};
type Block =
  | { readonly kind: "heading" | "subheading" | "paragraph" | "bullet" | "check" | "step" | "phase"; readonly text: string }
  | { readonly kind: "actions"; readonly actions: readonly Action[] }
  | { readonly kind: "closingActions"; readonly text: string; readonly actions: readonly Action[] }
  | { readonly kind: "callout"; readonly tone: string; readonly lines: readonly string[] }
  | { readonly kind: "vahiFeature"; readonly title: string; readonly text: string; readonly cta: Action }
  | { readonly kind: "familyReceives"; readonly title: string; readonly lines: readonly string[] }
  | { readonly kind: "cards"; readonly tone: string; readonly cards: readonly (readonly string[])[] }
  | { readonly kind: "table"; readonly rows: readonly (readonly (readonly string[])[])[] }
  | {
      readonly kind: "sankalp";
      readonly title: string;
      readonly intro: string;
      readonly mandatory: string;
    }
  | { readonly kind: "sankalpBoxes"; readonly boxes: readonly SankalpBox[] };

function BlockView({ block }: { readonly block: Block }) {
  if (block.kind === "heading") return <h4 className={`${styles.heading} ${block.text === "Ritual Ceremony Description — The Three-Ghat Core Sequence" ? styles.sequenceHeading : ""}`}>{block.text}</h4>;
  if (block.kind === "subheading") return <h5 className={styles.subheading}>{block.text}</h5>;
  if (block.kind === "paragraph") {
    const significanceLabel = "Specialized Ritual Significance:";

    if (block.text.startsWith(significanceLabel)) {
      return (
        <p className={styles.paragraph}>
          <strong>{significanceLabel}</strong>
          {block.text.slice(significanceLabel.length)}
        </p>
      );
    }

    const eligibilityLead = "The Vedic tradition is highly inclusive regarding who may honour their family. Rites can be successfully performed by ";
    if (block.text.startsWith(eligibilityLead)) {
      return <p className={styles.paragraph}>{eligibilityLead}<strong>{block.text.slice(eligibilityLead.length)}</strong></p>;
    }

    const proxyLead = "We arrange a person who has inherited the customary rights to perform rituals on behalf of family members who cannot physically travel to Gaya Ji. The designated representative performs the ritual on the family’s behalf. Please visit ";
    if (block.text.startsWith(proxyLead)) {
      return <p className={styles.paragraph}>{proxyLead}<Link href="/pitru-moksha-gaya/online">Virtual Services</Link> or <Link href="/contact?topic=inquiry">raise an inquiry</Link>.</p>;
    }

    const timingLabels = ["Year-Round:", "Peak Cosmic Window (2026):"];
    const timingLabel = timingLabels.find((label) => block.text.startsWith(label));
    if (timingLabel) {
      return <p className={styles.paragraph}><strong>{timingLabel}</strong>{block.text.slice(timingLabel.length)}</p>;
    }

    const servicePlanLabels = [
      "A) Remote / Live Participation",
      "B) Physical Participation (Offline)",
      "A) Gold Plan:",
      "B) Platinum Plan (Bespoke):",
    ];
    const servicePlanLabel = servicePlanLabels.find((label) => block.text.startsWith(label));
    if (servicePlanLabel) {
      return <p className={styles.paragraph}><strong>{servicePlanLabel}</strong>{block.text.slice(servicePlanLabel.length)}</p>;
    }

    const complaintLead = "Ordinary questions begin with Customer Support through email or ";
    const complaintMiddle = ". Ritual questions are referred to the assigned Gayawal Panda. Unresolved, sensitive, safety, financial, or conduct-related matters may be escalated through the appropriate Quick Link navigation or through ";
    const complaintClosing = ". Please use the name and ID exactly as shown on the invoice.";
    if (block.text === `${complaintLead}Raise Inquiry${complaintMiddle}Founder Support${complaintClosing}`) {
      return <p className={styles.paragraph}>{complaintLead}<Link href="/contact?topic=inquiry">Raise Inquiry</Link>{complaintMiddle}<Link href={ROUTES.FOUNDER_SUPPORT}>Founder Support</Link>{complaintClosing}</p>;
    }

    const vishnupadPhrase = "the Vishnupad Temple";
    const sacredVedisPhrase = "the Phalgu River, Akshay Vat, Pretshila, Ramshila, and other sacred vedis";

    if (block.text.includes(vishnupadPhrase) && block.text.includes(sacredVedisPhrase)) {
      const [beforeVishnupad, afterVishnupad] = block.text.split(vishnupadPhrase);
      const [betweenPhrases, afterSacredVedis] = afterVishnupad.split(sacredVedisPhrase);

      return (
        <p className={styles.paragraph}>
          {beforeVishnupad}<strong>{vishnupadPhrase}</strong>{betweenPhrases}<strong>{sacredVedisPhrase}</strong>{afterSacredVedis}
        </p>
      );
    }

    return <p className={styles.paragraph}>{block.text}</p>;
  }
  if (block.kind === "bullet") return <p className={styles.bullet}>{block.text}</p>;
  if (block.kind === "check") return <p className={styles.check}>{block.text}</p>;
  if (block.kind === "phase") return <h5 className={styles.phaseStrip}>{block.text}</h5>;
  if (block.kind === "step") {
    const [title, ...rest] = block.text.split(":");
    return <article className={styles.step}><strong>{title}</strong><p>{rest.join(":").trim()}</p></article>;
  }
  if (block.kind === "actions") {
    return <nav className={styles.actions} aria-label="Section actions">{block.actions.map((action) => <Link href={action.href} key={`${action.label}-${action.href}`}>{action.label}</Link>)}</nav>;
  }
  if (block.kind === "closingActions") {
    return <div className={styles.closingRow}><p>{block.text}</p><nav aria-label="Section actions">{block.actions.map((action) => <Link aria-label={action.label} href={action.href} key={`${action.label}-${action.href}`} title={action.label}><span className={styles.closingIcon}>{action.label === "Ask GenZ AI" ? <MulticolourAiBrainIcon /> : <QuestionCircleIcon />}</span></Link>)}</nav></div>;
  }
  if (block.kind === "callout") {
    if (block.lines[0] === "Notice" && block.lines.length === 2) {
      return <aside className={`${styles.callout} ${styles[block.tone]} ${styles.noticeLine}`}><p><strong>Notice:</strong> {block.lines[1]}</p></aside>;
    }
    if (block.lines[0] === "Make sure" && block.lines.length === 2) {
      return <aside className={`${styles.callout} ${styles[block.tone]} ${styles.compactNotice}`}><p><strong>Make sure:</strong> {block.lines[1]}</p></aside>;
    }

    return <aside className={`${styles.callout} ${styles[block.tone]}`}>{block.lines.map((line, index) => index === 0 ? <strong key={line}>{line}</strong> : <p key={`${line}-${index}`}>{line}</p>)}</aside>;
  }
  if (block.kind === "vahiFeature") {
    return (
      <article className={styles.vahiFeature}>
        <div>
          <h4 className={styles.heading}>{block.title}</h4>
          <p className={styles.paragraph}>{block.text}</p>
        </div>
        <Link href={block.cta.href}>{block.cta.label}</Link>
      </article>
    );
  }
  if (block.kind === "familyReceives") {
    return (
      <article className={styles.familyReceives}>
        <h4 className={styles.heading}>{block.title}</h4>
        <div className={styles.familyReceivesRows}>
          {block.lines.map((line) => {
            const separatorIndex = line.indexOf(":");
            const label = line.slice(0, separatorIndex + 1);
            const description = line.slice(separatorIndex + 1);

            return (
              <div className={styles.familyReceivesCard} key={line}>
                <span className={styles.familyReceivesMarker} aria-hidden="true">✓</span>
                <div>
                  <strong>{label}</strong>
                  <p>{description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </article>
    );
  }
  if (block.kind === "cards") {
    return (
      <div className={styles.cards}>
        {block.cards.map((card, index) =>
          (
            <article className={styles.card} key={`${card[0]}-${index}`}>
              <h5>{card[0] === "Pathway A: Online Services" || card[0] === "Pathway B: Offline Services" ? <strong>{card[0]}</strong> : card[0]}</h5>
              {card.slice(1).map((line) => <p key={line}>{line}</p>)}
            </article>
          )
        )}
      </div>
    );
  }
  if (block.kind === "sankalp") {
    const bookNowLabel = "Book Now";
    const bookNowIndex = block.intro.indexOf(bookNowLabel);

    return (
      <section className={styles.sankalpSection} aria-labelledby="sankalp-information-title">
        <div className={styles.sankalpContent}>
          <h4 className={styles.heading} id="sankalp-information-title">{block.title}</h4>
          <p className={styles.paragraph}>{bookNowIndex >= 0 ? <>{block.intro.slice(0, bookNowIndex)}<Link href={ROUTES.BOOKING}><strong>{bookNowLabel}</strong></Link>{block.intro.slice(bookNowIndex + bookNowLabel.length)}</> : block.intro}</p>
          <p className={styles.mandatory}>{block.mandatory}</p>
        </div>
      </section>
    );
  }
  if (block.kind === "sankalpBoxes") {
    return (
      <div className={`${styles.sankalpBoxes} ${styles.serviceParticipationBoxes}`}>
        {block.boxes.map((box) => (
          <article className={styles.sankalpBox} key={box.title}>
            <h5>{box.title}</h5>
            <p>{box.content}</p>
            {box.note ? <p className={styles.sankalpNote}>{box.note}</p> : null}
            {box.cta ? <Link href={box.cta.href}>{box.cta.label}</Link> : null}
          </article>
        ))}
      </div>
    );
  }
  if (block.kind === "table") {
    const isRitualSequence = block.rows[0]?.[0]?.[0] === "Stage & Location";
    const isPlanMatrix = block.rows[0]?.[0]?.[0] === "Ritual/ Package Names";

    return (
      <div
        className={`${styles.tableWrap} ${isRitualSequence ? styles.sequenceTable : ""} ${isPlanMatrix ? styles.planMatrixTable : ""}`}
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

export function LeadershipGovernanceSection() {
  const section = v15PageContent.sections.find((candidate) => candidate.id === "08");
  if (!section) return null;

  const blocks = section.blocks as readonly Block[];
  return (
    <section className={styles.aboutGovernance} aria-labelledby="leadership-governance-title">
      <div>
        <h2 id="leadership-governance-title">{section.title}</h2>
        <div className={styles.panel}>
          {blocks.map((block, index) => <BlockView block={block} key={`${block.kind}-${index}`} />)}
        </div>
      </div>
    </section>
  );
}

function TrustShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      className={styles.trustShieldIcon}
      viewBox="0 0 64 72"
    >
      <path
        d="M32 3 57 11v22c0 16-10.7 29.8-25 36C17.7 62.8 7 49 7 33V11L32 3Z"
        fill="#F6C83F"
      />
      <path
        d="M32 7 53 14v19c0 13.5-8.8 25.5-21 31.2C19.8 58.5 11 46.5 11 33V14L32 7Z"
        fill="#8B6A19"
      />
      <path
        d="M32 10.5 50 16.5V33c0 11.7-7.5 22.1-18 27.3C21.5 55.1 14 44.7 14 33V16.5L32 10.5Z"
        fill="#249447"
      />
      <path
        d="M32 14.5 46.5 19.5V33c0 9.2-5.7 17.6-14.5 22.4C23.2 50.6 17.5 42.2 17.5 33V19.5L32 14.5Z"
        fill="#4FAE52"
      />
      <circle cx="32" cy="33" r="12.5" fill="#F7D77A" />
      <path
        d="m24.5 33.5 5 5 10.5-12"
        fill="none"
        stroke="#176E33"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5"
      />
      <path
        d="M32 3 57 11v22c0 16-10.7 29.8-25 36C17.7 62.8 7 49 7 33V11L32 3Z"
        fill="none"
        stroke="#FFE07A"
        strokeWidth="2"
      />
    </svg>
  );
}
export function PitruMokshaV15Page() {
  const [openIds, setOpenIds] = useState<readonly string[]>(["01"]);
  const accordionSections = v15PageContent.sections
    .filter((section) => section.id !== "08")
    .map((section) => ({
      ...section,
      id: section.id === "09" ? "08" : section.id === "09-plan-matrix" ? "09" : section.id,
    }));
  const allIds = accordionSections.map((section) => section.id);
  const toggle = (id: string) => setOpenIds((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]);

  return <main className={styles.page}>
    <header className={styles.guideHeader}>
      <div><h2 id="pitru-trust-title">{v15PageContent.trust.heading}</h2></div>
      <div className={styles.controls}><button type="button" onClick={() => setOpenIds(allIds)}>Expand All</button><button type="button" onClick={() => setOpenIds([])}>Collapse All</button></div>
    </header>
    <aside className={styles.sanctityMandate} aria-labelledby="pitru-sanctity-mandate-title">
      <h3 id="pitru-sanctity-mandate-title">Sanctity Mandate: Our Operational Services Are Premium-Priced.</h3>
          <p>We honor and serve families who demand absolute, uncompromising authenticity. We operate with strict adherence to traditional Vedic codes, combined with modern professionalism and transparency.<br />Every ceremony follows its complete prescribed path with devotion and precise Vedic mantra chanting.</p>
      <Image className={styles.sanctityEmblem} src="/images/heroes/hero-1/pitrumoksha-sanctity-emblem.png" alt="" width={130} height={130} aria-hidden="true" />
    </aside>
    <section className={styles.trustSection} aria-labelledby="pitru-trust-title">
      <div className={styles.trustGrid}>
        {v15PageContent.trust.cards.map((card) => (
          <article className={styles.trustCard} key={card.title} tabIndex={0}>
            <div className={styles.trustCardTop}><TrustShieldIcon />
              <h3>{card.title}</h3>
            </div>
            <p>{card.description}</p>
          </article>
        ))}
      </div>
    </section>
    <div className={styles.sections}>
      {accordionSections.map((section) => {
        const open = openIds.includes(section.id);
        const triggerId = `v15-${section.id}-trigger`;
        const panelId = `v15-${section.id}-panel`;
        const blocks = section.blocks as readonly Block[];
        return <section className={`${styles.section} ${open ? styles.open : ""}`} id={`section-${section.id}`} key={section.id}>
          <h3><button aria-controls={panelId} aria-expanded={open} id={triggerId} onClick={() => toggle(section.id)} type="button"><span className={styles.number}>{section.id}</span><span className={styles.sectionTitle}>{section.title}</span><span className={styles.chevron} aria-hidden="true">{"\u2304"}</span></button></h3>
          {open ? <div aria-labelledby={triggerId} className={styles.panel} id={panelId} role="region">
            {blocks.map((block, index) => <BlockView block={block} key={`${block.kind}-${index}`} />)}
            {section.id === "10" ? <aside className={`${styles.callout} ${styles.neutral}`}>
              <strong>Our Mission</strong>
              <p>To make sacred religion rituals accessible either through online or physical mode, convenient through technology while preserving tradition, authenticity, respect and confidential data.</p>
            </aside> : null}
          </div> : null}
        </section>;
      })}
    </div>
  </main>;
}
