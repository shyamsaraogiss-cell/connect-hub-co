import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://connecthubco.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/dashboard/',
        '/bookings/',
        '/customers/',
        '/partners/',
        '/requests/',
        '/reports/',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
