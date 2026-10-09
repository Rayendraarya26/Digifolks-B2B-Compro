import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.digifolks.id';
  
  // Base routes inside the (main) group
  const routes = ['', '/about', '/services', '/work', '/contact'];
  const languages = ['en', 'id'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const lang of languages) {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            id: `${baseUrl}/id${route}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
