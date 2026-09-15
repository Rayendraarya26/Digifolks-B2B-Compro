import { createClient } from './client';
import { Portfolio, Service, FAQ, Testimonial, TeamDNA, GeneralSettings } from './types';

// Browser / Public Client
const supabase = createClient();

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
    return data || [];
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
    return data;
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
    return data || [];
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
