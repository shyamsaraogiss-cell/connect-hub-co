'use client';

import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import styles from './GenZChatShell.module.css';

export type GenZChatDensity = 'page' | 'floating';

export type GenZDrawerId = 'approved' | 'trust' | 'help' | 'limits' | null;

export type GenZChatShellProps = {
  density: GenZChatDensity;
  title?: string;
  subtitle?: string;
  activeDrawer: GenZDrawerId;
  onDrawerChange: (id: GenZDrawerId) => void;
  thread: ReactNode;
  composer: ReactNode;
  approvedPanel: ReactNode;
  trustPanel: ReactNode;
  helpPanel: ReactNode;
  limitsPanel: ReactNode;
  showSidePanel?: boolean;
};

const DRAWER_LABELS: Record<Exclude<GenZDrawerId, null>, string> = {
  approved: 'Browse approved questions',
  trust: 'Trust & privacy',
  help: 'Need more help?',
  limits: 'GenZ AI limitations',
};

const FLOATING_DRAWER_LABELS: Record<Exclude<GenZDrawerId, null>, string> = {
  approved: 'Questions',
  trust: 'Trust',
  help: 'Help',
  limits: 'Limits',
};

export function GenZChatShell({
  density,
  title = 'Ask GenZ AI',
  subtitle = 'Approved guidance · Human escalation',
  activeDrawer,
  onDrawerChange,
  thread,
  composer,
  approvedPanel,
  trustPanel,
  helpPanel,
  limitsPanel,
  showSidePanel = false,
}: GenZChatShellProps) {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)');
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const panelContent =
    activeDrawer === 'approved'
      ? approvedPanel
      : activeDrawer === 'trust'
        ? trustPanel
        : activeDrawer === 'help'
          ? helpPanel
          : activeDrawer === 'limits'
            ? limitsPanel
            : null;

  const useSide = density === 'page' && showSidePanel && wide && activeDrawer !== null;
  const toolLabels = density === 'floating' ? FLOATING_DRAWER_LABELS : DRAWER_LABELS;
  const panelTitle = activeDrawer ? DRAWER_LABELS[activeDrawer] : 'Details';

  return (
    <div
      className={`${styles.shell} ${density === 'floating' ? styles.shellFloating : styles.shellPage}`}
      role="region"
      aria-label="Ask GenZ AI"
    >
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div>
            <h2 id="hero-assistant-title" className={styles.title}>
              {title}
            </h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
          {density === 'floating' ? null : (
            <span className={styles.live}>
              <span className={styles.liveDot} aria-hidden="true" />
              Live
            </span>
          )}
        </div>
        <div className={styles.toolbar} role="toolbar" aria-label="GenZ secondary tools">
          {(Object.keys(DRAWER_LABELS) as Exclude<GenZDrawerId, null>[]).map((id) => (
            <button
              key={id}
              type="button"
              className={`${styles.toolBtn} ${activeDrawer === id ? styles.toolBtnActive : ''}`}
              aria-pressed={activeDrawer === id}
              aria-label={DRAWER_LABELS[id]}
              onClick={() => onDrawerChange(activeDrawer === id ? null : id)}
            >
              {toolLabels[id]}
            </button>
          ))}
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.thread} aria-live="polite">
          {thread}
        </div>

        {useSide ? (
          <aside className={styles.side} aria-label={panelTitle}>
            <div className={styles.sheetHeader}>
              <strong>{panelTitle}</strong>
              <button type="button" className={styles.closeBtn} aria-label="Close panel" onClick={() => onDrawerChange(null)}>
                ×
              </button>
            </div>
            <div className={styles.sheetBody}>{panelContent}</div>
          </aside>
        ) : null}

        {!useSide && activeDrawer && panelContent ? (
          <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={panelTitle}>
            <div className={styles.sheet}>
              <div className={styles.sheetHeader}>
                <strong>{panelTitle}</strong>
                <button type="button" className={styles.closeBtn} aria-label="Close panel" onClick={() => onDrawerChange(null)}>
                  ×
                </button>
              </div>
              <div className={styles.sheetBody}>{panelContent}</div>
            </div>
          </div>
        ) : null}
      </div>

      {composer}

      <div className={styles.footerNote}>
        Guidance only — final religious and service decisions stay human-led.{' '}
        <button type="button" onClick={() => onDrawerChange('limits')}>
          Limitations
        </button>
      </div>
    </div>
  );
}

export type ComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  disabled?: boolean;
  placeholder?: string;
};

export function GenZComposer({ value, onChange, onSubmit, disabled, placeholder = 'Type your question…' }: ComposerProps) {
  return (
    <form className={styles.composer} onSubmit={onSubmit} role="search">
      <input
        className={styles.composerInput}
        value={value}
        disabled={disabled}
        maxLength={240}
        aria-label="Ask GenZ AI a question"
        placeholder={placeholder}
        onChange={(event) => {
          const next = event.target.value;
          if (next.trim().split(/\s+/).filter(Boolean).length <= 30) onChange(next);
        }}
      />
      <button type="submit" className={styles.sendBtn} disabled={disabled || !value.trim()} aria-label="Submit question">
        →
      </button>
    </form>
  );
}

export { styles as genzChatStyles };
