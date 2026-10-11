import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.digifolks.id';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/*/blog?*',
        '/blog?*',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
