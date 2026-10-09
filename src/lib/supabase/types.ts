export interface Portfolio {
  id: string;
  slug: string;
  client: string;
  title: string;
  project_type: string;
  headline: string;
  industry: string;
  duration: string;
  year: string;
  metric: string;
  metric_label: string;
  tags: string[];
  overview: string;
  challenges: string[];
  solutions: string[];
  results: { value: string; label: string }[];
  is_proposal?: boolean;
  cover_image_url?: string;
  gallery_images?: string[];
  sort_order: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Service {
  id: string;
  slug: string;
  num: number;
  title: string;
  short_desc: string;
  description: string;
  features: string[];
  theme_bg: string;
  theme_text: string;
  tech_stack: string[];
  icon_url: string;
  icon_lp_url: string[];
  image_url: string;
  sort_order: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  color: string;
  sort_order: number;
  is_published: boolean;
  created_at?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  sort_order: number;
  is_published: boolean;
  created_at?: string;
}

export interface TeamDNA {
  id: string;
  value: string;
  short_pitch: string;
  sort_order: number;
  created_at?: string;
}

export interface ContactNumber {
  name: string;
  displayNumber: string;
  contactNumber: string;
  hoverColor: string;
}

export interface GeneralSettings {
  id: string;
  hero_animation_url: string;
  hero_cta_url: string;
  grand_cta_url: string;
  book_meeting_url: string;
  instagram_url: string;
  linkedin_url: string;
  github_url: string;
  email: string;
  contact_numbers: ContactNumber[];
  updated_at?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  company: string;
  email: string;
  service: string;
  budget: string;
  currency: string;
  details: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
}

export interface BlogCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  sort_order: number;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url?: string;
  cover_image_alt?: string;
  author: string;
  category_id?: string;
  category?: BlogCategory;
  tags: string[];
  reading_time_minutes: number;
  sort_order: number;
  is_published: boolean;
  published_at?: string;
  seo_title?: string;
  meta_description?: string;
  canonical_url?: string;
  created_at?: string;
  updated_at?: string;
}
