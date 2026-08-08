import type { ReactNode } from "react";

type TravelServiceIconProps = {
  service: string;
};

export function TravelServiceIcon({ service }: TravelServiceIconProps) {
  const paths: Record<string, ReactNode> = {
    "Shadow Assistance": <><circle cx="9" cy="7" r="2.5" /><circle cx="16" cy="9" r="2" /><path d="M4 20v-2a5 5 0 0 1 10 0v2M14 14c3 0 5 2 5 5v1M12 12l4 3" /></>,
    "Emergency Family & Personal Support": <><path d="M12 3 5 6v5c0 4.6 2.8 8.3 7 10 4.2-1.7 7-5.4 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    "24×7 On-Trip Support": <><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2M4 13v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 1ZM20 13v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 1Z" /></>,
    "Safari Assistance": <><path d="M3 16h18l-2-7H7l-4 7ZM8 9V6h7l2 3M7 16v3M18 16v3" /><circle cx="7" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M10 12h3M16 12h2" /></>,
    "Beach Assistance": <><path d="M4 20c2-2 4-2 6 0 2-2 4-2 6 0 2-2 4-2 6 0" /><path d="M12 17V5M5 10c4-6 10-6 14 0-5-2-9-2-14 0Z" /></>,
    "Local Ground Assistance": <><path d="M3 17h14M5 17l2-6h8l2 6" /><circle cx="7" cy="18" r="2" /><circle cx="15" cy="18" r="2" /><path d="M19 13s3-2.2 3-5a3 3 0 1 0-6 0c0 2.8 3 5 3 5Z" /><circle cx="19" cy="8" r=".7" /></>,
    "Customized Travel Planning": <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /><circle cx="12" cy="12" r=".8" /></>,
    "Nepal Jungle Ride & Stay": <><path d="M4 19V5l5-2 6 3 5-2v14l-5 2-6-3-5 2Z" /><path d="M9 3v14M15 6v14M6.5 14c2-4 5-6 10-5" /><circle cx="6.5" cy="14" r=".7" /><circle cx="16.5" cy="9" r=".7" /></>,
    "Customized & Others": <><path d="M4 20h16M6 20V5h12v15M9 8h2M13 8h2M9 12h2M13 12h2M10 20v-4h4v4" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="url(#travel-service-gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <defs>
        <linearGradient id="travel-service-gold" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF1A8" />
          <stop offset=".38" stopColor="#F4B942" />
          <stop offset=".72" stopColor="#C98516" />
          <stop offset="1" stopColor="#FFE28A" />
        </linearGradient>
      </defs>
      {paths[service]}
    </svg>
  );
}
