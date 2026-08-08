export type BusinessPageIconName = 'online' | 'offline' | 'records' | 'check' | 'guide' | 'virtual' | 'offering' | 'family' | 'sankalp' | 'partner' | 'camera' | 'timezone' | 'consultation' | 'details' | 'followup';

export function BusinessPageIcon({ name }: { name: BusinessPageIconName }) {
  const paths = {
    online: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4M8 10h8M10 7h4" /></>,
    offline: <><path d="M4 20h16M6 20V9l6-5 6 5v11M9 12h6M10 20v-5h4v5" /></>,
    records: <><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z" /><path d="M8 4v13a3 3 0 0 0-3 3M11 9h5M11 13h5" /></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
    guide: <><path d="M4 19V5l5-2 6 3 5-2v14l-5 2-6-3-5 2Z" /><path d="M9 3v14M15 6v14" /></>,
    virtual: <><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4" /><circle cx="12" cy="10" r="2.5" /></>,
    offering: <><path d="M5 15c3-1 11-1 14 0-1 4-3 6-7 6s-6-2-7-6Z" /><path d="M8 12c0-2 1-3 2-4M12 12c0-3 1-5 3-7M16 12c0-2 1-3 2-4" /></>,
    family: <><circle cx="8" cy="8" r="2.5" /><circle cx="16" cy="8" r="2.5" /><path d="M3 20v-2a5 5 0 0 1 10 0v2M11 20v-2a5 5 0 0 1 10 0v2" /></>,
    sankalp: <><path d="M6 3h12v18H6zM9 8h6M9 12h6M9 16h4" /><path d="m15 17 2 2 4-5" /></>,
    partner: <><circle cx="12" cy="7" r="3" /><path d="M6 21v-3a6 6 0 0 1 12 0v3M3 12l3 2M21 12l-3 2" /></>,
    camera: <><path d="M4 7h4l2-2h4l2 2h4v12H4z" /><circle cx="12" cy="13" r="4" /></>,
    timezone: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18M12 7v5l3 2" /></>,
    consultation: <><path d="M4 5h16v11H9l-5 4V5Z" /><path d="M8 9h8M8 12h5" /></>,
    details: <><path d="M7 4h10v16H7zM10 8h4M10 12h4M10 16h3" /><circle cx="5" cy="7" r="2" /></>,
    followup: <><path d="M4 12a8 8 0 1 0 3-6M4 4v5h5" /><path d="m9 12 2 2 4-5" /></>,
  } as const;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
