'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { GenZRitualAIEngine } from './GenZRitualAIEngine';

export function NeedHelpAITrigger() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>('textarea, input, button')?.focus({ preventScroll: true });
    }, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [isOpen]);

  const panel =
    isOpen && mounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[60] pointer-events-none"
            aria-hidden={false}
          >
            <button
              type="button"
              className="pointer-events-auto absolute inset-0 bg-slate-950/25"
              aria-label="Dismiss Ask GenZ AI"
              onClick={() => setIsOpen(false)}
            />
            <div
              id="compact-ai-modal"
              ref={dialogRef}
              className="pointer-events-auto absolute bottom-20 right-4 flex h-[min(70vh,560px)] w-[min(calc(100vw-1.5rem),22rem)] max-w-[22rem] flex-col overflow-hidden rounded-2xl border border-[#D4AF37]/70 bg-[#fffdfa] shadow-2xl sm:right-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <span id={titleId} className="sr-only">
                Ask GenZ AI
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute right-2 top-2 z-20 grid h-8 w-8 place-items-center rounded-lg bg-black/25 text-lg leading-none text-white hover:bg-black/40"
                aria-label="Close assistant"
              >
                ×
              </button>
              <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden">
                <GenZRitualAIEngine category="pitru-moksha-gaya" compact />
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <aside aria-label="Ask GenZ AI">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#064E59] px-5 py-3 text-sm font-semibold text-white shadow-xl hover:bg-[#087F8C] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
        aria-expanded={isOpen}
        aria-controls="compact-ai-modal"
      >
        <span>Ask GenZ AI</span>
      </button>
      {panel}
    </aside>
  );
}
