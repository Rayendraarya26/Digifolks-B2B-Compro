import { createClient } from './client';
import { Portfolio, Service, FAQ, Testimonial, TeamDNA, GeneralSettings, BlogPost, BlogCategory } from './types';

// Browser / Public Client
const supabase = createClient();

function parseJsonArray<T = string>(val: unknown): T[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // fallback
      }
    }
    if (trimmed.length > 0) {
      return trimmed.split(',').map((s) => s.trim()).filter(Boolean) as unknown as T[];
    }
  }
  return [];
}

export function normalizePortfolio(data: any): Portfolio {
  if (!data) return data;
  return {
    ...data,
    tags: parseJsonArray<string>(data.tags),
    challenges: parseJsonArray<string>(data.challenges),
    solutions: parseJsonArray<string>(data.solutions),
    results: parseJsonArray<{ value: string; label: string }>(data.results),
    gallery_images: parseJsonArray<string>(data.gallery_images),
  };
}

export function normalizeService(data: any): Service {
  if (!data) return data;
  return {
    ...data,
    features: parseJsonArray<string>(data.features),
    tech_stack: parseJsonArray<string>(data.tech_stack),
    icon_lp_url: parseJsonArray<string>(data.icon_lp_url),
  };
}

export function normalizeBlogPost(data: any): BlogPost {
  if (!data) return data;
  return {
    ...data,
    tags: parseJsonArray<string>(data.tags),
  };
}

export async function getPortfolios(): Promise<Portfolio[]> {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching portfolios from Supabase:', error.message);
      return [];
    }
    return (data || []).map(normalizePortfolio);
  } catch (err) {
    console.error('Unexpected error in getPortfolios:', err);
    return [];
  }
}

export async function getPortfolioBySlug(slug: string): Promise<Portfolio | null> {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching portfolio ${slug} from Supabase:`, error.message);
      return null;
    }
    return data ? normalizePortfolio(data) : null;
  } catch (err) {
    console.error(`Unexpected error in getPortfolioBySlug (${slug}):`, err);
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching services from Supabase:', error.message);
      return [];
    }
    return (data || []).map(normalizeService);
  } catch (err) {
    console.error('Unexpected error in getServices:', err);
    return [];
  }
}

export async function getFAQs(): Promise<FAQ[]> {
  try {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching faqs from Supabase:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Unexpected error in getFAQs:', err);
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching testimonials from Supabase:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Unexpected error in getTestimonials:', err);
    return [];
  }
}

export async function getTeamDNA(): Promise<TeamDNA[]> {
  try {
    const { data, error } = await supabase
      .from('team_dna')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching team DNA from Supabase:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Unexpected error in getTeamDNA:', err);
    return [];
  }
}

export async function getGeneralSettings(): Promise<GeneralSettings | null> {
  try {
    const { data, error } = await supabase
      .from('general_settings')
      .select('*')
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching general settings from Supabase:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.error('Unexpected error in getGeneralSettings:', err);
    return null;
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching service ${slug} from Supabase:`, error.message);
      return null;
    }
    return data ? normalizeService(data) : null;
  } catch (err) {
    console.error(`Unexpected error in getServiceBySlug (${slug}):`, err);
    return null;
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching blog categories from Supabase:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Unexpected error in getBlogCategories:', err);
    return [];
  }
}

export interface GetBlogPostsParams {
  categorySlug?: string;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetBlogPostsResult {
  posts: BlogPost[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export async function getBlogPosts({
  categorySlug,
  tag,
  search,
  page = 1,
  limit = 9,
}: GetBlogPostsParams = {}): Promise<GetBlogPostsResult> {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*, category:blog_categories(*)', { count: 'exact' })
      .eq('is_published', true)
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false });

    // Filter by category slug if provided
    if (categorySlug && categorySlug !== 'all') {
      const { data: catData } = await supabase
        .from('blog_categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();
      
      if (catData?.id) {
        query = query.eq('category_id', catData.id);
      }
    }

    // Filter by tag if provided
    if (tag) {
      query = query.contains('tags', [tag]);
    }

    // Filter by search query if provided (sanitized against wildcard abuse)
    if (search && search.trim()) {
      const sanitizedSearch = search.trim().replace(/[%_\\]/g, '\\$&').slice(0, 100);
      if (sanitizedSearch) {
        query = query.ilike('title', `%${sanitizedSearch}%`);
      }
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.error('Error fetching blog posts from Supabase:', error.message);
      return { posts: [], total: 0, totalPages: 0, currentPage: page };
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    return {
      posts: (((data as BlogPost[]) || []).map(normalizeBlogPost)),
      total,
      totalPages,
      currentPage: page,
    };
  } catch (err) {
    console.error('Unexpected error in getBlogPosts:', err);
    return { posts: [], total: 0, totalPages: 0, currentPage: page };
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, category:blog_categories(*)')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching blog post ${slug} from Supabase:`, error.message);
      return null;
    }
    return data ? normalizeBlogPost(data) : null;
  } catch (err) {
    console.error(`Unexpected error in getBlogPostBySlug (${slug}):`, err);
    return null;
  }
}

export async function getRelatedBlogPosts(currentPostId: string, categoryId?: string, limit = 3): Promise<BlogPost[]> {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*, category:blog_categories(*)')
      .eq('is_published', true)
      .neq('id', currentPostId)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching related blog posts:', error.message);
      return [];
    }
    return (((data as BlogPost[]) || []).map(normalizeBlogPost));
  } catch (err) {
    console.error('Unexpected error in getRelatedBlogPosts:', err);
    return [];
  }
}
