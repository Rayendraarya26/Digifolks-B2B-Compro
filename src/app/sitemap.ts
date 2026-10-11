import { MetadataRoute } from 'next';
import { getServices, getPortfolios, getBlogPosts } from '@/lib/supabase/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.digifolks.id';
  const languages = ['en', 'id'] as const;

  // 1. Static routes
  const staticRoutes = ['', '/about', '/services', '/work', '/contact', '/blog'];
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    languages.map((lang) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? ('weekly' as const) : ('monthly' as const),
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en${route}`,
          id: `${baseUrl}/id${route}`,
        },
      },
    }))
  );

  // 2. Dynamic service pages
  let serviceEntries: MetadataRoute.Sitemap = [];
  try {
    const services = await getServices();
    serviceEntries = services.flatMap((svc) =>
      languages.map((lang) => ({
        url: `${baseUrl}/${lang}/services/${svc.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/services/${svc.slug}`,
            id: `${baseUrl}/id/services/${svc.slug}`,
          },
        },
      }))
    );
  } catch (err) {
    console.error('Error generating sitemap service entries:', err);
  }

  // 3. Dynamic portfolio/work pages
  let portfolioEntries: MetadataRoute.Sitemap = [];
  try {
    const portfolios = await getPortfolios();
    portfolioEntries = portfolios.flatMap((p) =>
      languages.map((lang) => ({
        url: `${baseUrl}/${lang}/work/${p.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: {
          languages: {
            en: `${baseUrl}/en/work/${p.slug}`,
            id: `${baseUrl}/id/work/${p.slug}`,
          },
        },
      }))
    );
  } catch (err) {
    console.error('Error generating sitemap portfolio entries:', err);
  }

  // 4. Dynamic blog post pages
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const { posts } = await getBlogPosts({ limit: 100 });
    blogEntries = posts.flatMap((post) =>
      languages.map((lang) => ({
        url: `${baseUrl}/${lang}/blog/${post.slug}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.published_at || Date.now()),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/${post.slug}`,
            id: `${baseUrl}/id/blog/${post.slug}`,
          },
        },
      }))
    );
  } catch (err) {
    console.error('Error generating sitemap blog entries:', err);
  }

  return [...staticEntries, ...serviceEntries, ...portfolioEntries, ...blogEntries];
}
