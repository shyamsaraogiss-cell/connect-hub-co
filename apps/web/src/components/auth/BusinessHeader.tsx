'use client';

import React from 'react';
import Link from 'next/link';

export function BusinessHeader() {
  return (
    <header className="w-full px-6 py-3 border-b border-teal-800/40 flex items-center justify-between" style={{ backgroundColor: '#054B52' }}>
      <div className="flex items-center gap-3">
        <img 
          src="/images/brand/golden-lotus-mark.svg" 
          alt="Connect Hub Co. Logo" 
          className="h-9 w-auto object-contain"
        />
        <span className="text-white font-bold text-2xl tracking-tight">Connect Hub Co.</span>
        <span className="text-teal-200/80 text-xs hidden md:inline ml-2 border-l border-teal-700/60 pl-3 py-1">
          The Authentic Ancestral Rites | Verified Lineage | Vedic Precision
        </span>
      </div>
      <div className="flex items-center gap-3">
        <a 
          href="https://wa.me/" 
          target="_blank" 
          rel="noreferrer" 
          className="w-9 h-9 rounded-full border border-teal-600/60 flex items-center justify-center text-teal-200 hover:bg-teal-800/50"
          title="WhatsApp Support"
        >
          💬
        </a>
        <Link 
          href="/login" 
          className="px-4 py-1.5 rounded-lg border border-teal-400/30 text-white text-sm font-medium hover:bg-teal-800/50"
        >
          Login / Sign Up
        </Link>
        <Link 
          href="/book" 
          className="px-4 py-1.5 rounded-lg bg-amber-400 text-teal-950 text-sm font-semibold hover:bg-amber-300"
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}