import type { MetadataRoute } from 'next';
import { ROUTES } from '@/config/navigation';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://connecthubco.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // L1 Homepage
  const l1Routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}${ROUTES.HOME}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ];

  // L2 Core Master Pages
  const l2RoutesList = [
    ROUTES.PITRU_MOKSHA_GAYA,
    ROUTES.RITUAL_SERVICES,
    ROUTES.TRAVEL_ASSISTANCE,
    ROUTES.VAHI_RECORDS,
    ROUTES.RELIGIOUS_PARTNERS,
    ROUTES.KNOWLEDGE_CENTER,
    ROUTES.ASK_GENZ_AI,
    ROUTES.BOOKING,
    ROUTES.INQUIRY,
    ROUTES.TRACKING,
  ];

  const l2Routes: MetadataRoute.Sitemap = l2RoutesList.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // L3 Sub-Pathways & Form Pages
  const l3RoutesList = [
    ROUTES.PITRU_MOKSHA_GAYA_ONLINE,
    ROUTES.PITRU_MOKSHA_GAYA_OFFLINE,
    ROUTES.RITUAL_SERVICES_ONLINE,
    ROUTES.RITUAL_SERVICES_OFFLINE,
    ROUTES.COMPLAINT,
    ROUTES.GRIEVANCE,
    ROUTES.FOUNDER_SUPPORT,
    ROUTES.POLICIES_LEGAL_TERMS,
    ROUTES.REFUND_POLICY,
    ROUTES.LOGIN,
  ];

  const l3Routes: MetadataRoute.Sitemap = l3RoutesList.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...l1Routes, ...l2Routes, ...l3Routes];
}
