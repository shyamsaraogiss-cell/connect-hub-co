'use client';

import { useState } from 'react';
import { GenZRitualAIEngine } from './GenZRitualAIEngine';

export function NeedHelpAITrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="Need Help AI Assistant">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[var(--peacock-dark,#087F8C)] px-5 py-3 text-sm font-semibold text-white shadow-xl hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-amber-400"
        aria-expanded={isOpen}
        aria-controls="compact-ai-modal"
      >
        <span className="text-amber-300">✦</span>
        <span>Need Help? Ask GenZ AI</span>
      </button>

      {isOpen && (
        <div
          id="compact-ai-modal"
          className="fixed bottom-20 right-6 z-50 w-full max-w-sm rounded-2xl border border-amber-200 bg-white p-4 shadow-2xl"
          role="dialog"
          aria-label="GenZ Ritual AI Assistant"
        >
          <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-amber-600 font-bold text-base">✦</span>
              <strong className="text-stone-900 text-sm">GenZ Ritual AI</strong>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
              aria-label="Close assistant"
            >
              ✕
            </button>
          </div>
          <div className="max-h-[60vh] overflow-y-auto">
            <GenZRitualAIEngine category="pitru-moksha-gaya" />
          </div>
        </div>
      )}
    </aside>
  );
}
