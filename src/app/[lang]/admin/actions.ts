"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// ==========================================
// PORTFOLIOS ACTIONS
// ==========================================

export async function savePortfolio(data: {
  id?: string;
  slug: string;
  client: string;
  title: string;
  project_type: string;
  headline?: string;
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
  is_proposal: boolean;
  cover_image_url: string;
  gallery_images: string[];
  sort_order: number;
  is_published: boolean;
}) {
  const supabase = await createClient();

  const payload = {
    slug: data.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-"),
    client: data.client,
    title: data.title,
    project_type: data.project_type || "Web App",
    headline: data.headline || data.title,
    industry: data.industry,
    duration: data.duration || "Completed",
    year: data.year || new Date().getFullYear().toString(),
    metric: data.metric,
    metric_label: data.metric_label,
    tags: JSON.stringify(data.tags || []),
    overview: data.overview,
    challenges: JSON.stringify(data.challenges || []),
    solutions: JSON.stringify(data.solutions || []),
    results: JSON.stringify(data.results || []),
    is_proposal: Boolean(data.is_proposal),
    cover_image_url: data.cover_image_url || `/Image/Portfolio/${data.slug}/cover.png`,
    gallery_images: JSON.stringify(data.gallery_images || []),
    sort_order: Number(data.sort_order) || 0,
    is_published: Boolean(data.is_published),
    updated_at: new Date().toISOString(),
  };

  if (data.id) {
    const { error } = await supabase
      .from("portfolios")
      .update(payload)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("portfolios").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/en");
  revalidatePath("/en/work");
  revalidatePath(`/en/work/${data.slug}`);
  revalidatePath("/admin/portfolios");
  return { success: true };
}

export async function deletePortfolio(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("portfolios").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/en");
  revalidatePath("/en/work");
  revalidatePath("/admin/portfolios");
  return { success: true };
}

export async function togglePublishPortfolio(id: string, is_published: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("portfolios")
    .update({ is_published })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/en");
  revalidatePath("/en/work");
  revalidatePath("/admin/portfolios");
  return { success: true };
}

// ==========================================
// SERVICES ACTIONS
// ==========================================

export async function saveService(data: {
  id?: string;
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
  image_url: string;
  sort_order: number;
  is_published: boolean;
}) {
  const supabase = await createClient();

  const payload = {
    slug: data.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-"),
    num: Number(data.num) || 1,
    title: data.title,
    short_desc: data.short_desc,
    description: data.description,
    features: JSON.stringify(data.features || []),
    theme_bg: data.theme_bg || "bg-pop-blue",
    theme_text: data.theme_text || "text-pop-blue",
    tech_stack: JSON.stringify(data.tech_stack || []),
    icon_url: data.icon_url || "/Image/Brain.webp",
    image_url: data.image_url || "",
    sort_order: Number(data.sort_order) || 0,
    is_published: Boolean(data.is_published),
    updated_at: new Date().toISOString(),
  };

  if (data.id) {
    const { error } = await supabase.from("services").update(payload).eq("id", data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("services").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/en");
  revalidatePath("/en/services");
  revalidatePath("/admin/services");
  return { success: true };
}

export async function deleteService(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/en");
  revalidatePath("/en/services");
  revalidatePath("/admin/services");
  return { success: true };
}

// ==========================================
// TESTIMONIALS ACTIONS
// ==========================================

export async function saveTestimonial(data: {
  id?: string;
  quote: string;
  author: string;
  sort_order: number;
  is_published: boolean;
}) {
  const supabase = await createClient();

  const payload = {
    quote: data.quote,
    author: data.author,
    sort_order: Number(data.sort_order) || 0,
    is_published: Boolean(data.is_published),
  };

  if (data.id) {
    const { error } = await supabase.from("testimonials").update(payload).eq("id", data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("testimonials").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/en");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/en");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

// ==========================================
// FAQs ACTIONS
// ==========================================

export async function saveFAQ(data: {
  id?: string;
  question: string;
  answer: string;
  color: string;
  sort_order: number;
  is_published: boolean;
}) {
  const supabase = await createClient();

  const payload = {
    question: data.question,
    answer: data.answer,
    color: data.color || "bg-pop-pink",
    sort_order: Number(data.sort_order) || 0,
    is_published: Boolean(data.is_published),
  };

  if (data.id) {
    const { error } = await supabase.from("faqs").update(payload).eq("id", data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("faqs").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/en");
  revalidatePath("/admin/faqs");
  return { success: true };
}

export async function deleteFAQ(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/en");
  revalidatePath("/admin/faqs");
  return { success: true };
}

// ==========================================
// TEAM DNA ACTIONS
// ==========================================

export async function saveTeamDNA(data: {
  id?: string;
  value: string;
  short_pitch: string;
  sort_order: number;
}) {
  const supabase = await createClient();

  const payload = {
    value: data.value,
    short_pitch: data.short_pitch,
    sort_order: Number(data.sort_order) || 0,
  };

  if (data.id) {
    const { error } = await supabase.from("team_dna").update(payload).eq("id", data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("team_dna").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/en/about");
  revalidatePath("/admin/team-dna");
  return { success: true };
}

export async function deleteTeamDNA(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("team_dna").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/en/about");
  revalidatePath("/admin/team-dna");
  return { success: true };
}

// ==========================================
// INQUIRIES ACTIONS
// ==========================================

export async function updateInquiryStatus(id: string, status: "new" | "read" | "replied" | "archived") {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  return { success: true };
}

export async function deleteInquiry(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  return { success: true };
}

// ==========================================
// SETTINGS ACTIONS
// ==========================================

export async function saveGeneralSettings(data: {
  id?: string;
  hero_animation_url: string;
  hero_cta_url: string;
  grand_cta_url: string;
  book_meeting_url: string;
  instagram_url: string;
  linkedin_url: string;
  github_url: string;
  email: string;
  contact_numbers: any[];
}) {
  const supabase = await createClient();

  const payload = {
    hero_animation_url: data.hero_animation_url,
    hero_cta_url: data.hero_cta_url,
    grand_cta_url: data.grand_cta_url,
    book_meeting_url: data.book_meeting_url,
    instagram_url: data.instagram_url,
    linkedin_url: data.linkedin_url,
    github_url: data.github_url,
    email: data.email,
    contact_numbers: JSON.stringify(data.contact_numbers || []),
    updated_at: new Date().toISOString(),
  };

  if (data.id) {
    const { error } = await supabase.from("general_settings").update(payload).eq("id", data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("general_settings").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/en");
  revalidatePath("/admin/settings");
  return { success: true };
}

// ==========================================
// BLOG ACTIONS
// ==========================================

export async function saveBlogPost(data: {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url?: string;
  cover_image_alt?: string;
  author: string;
  category_id?: string;
  tags: string[];
  reading_time_minutes?: number;
  sort_order?: number;
  is_published: boolean;
  published_at?: string;
  seo_title?: string;
  meta_description?: string;
  canonical_url?: string;
}) {
  const supabase = await createClient();

  // Auto-calculate reading time if not supplied: ~200 words per minute
  let readingTime = data.reading_time_minutes;
  if (!readingTime || readingTime <= 0) {
    const plainText = (data.content || "").replace(/<[^>]*>/g, " ");
    const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
    readingTime = Math.max(1, Math.ceil(wordCount / 200));
  }

  // Auto-generate SEO fields if empty
  const seoTitle = data.seo_title?.trim() || data.title.trim();
  const metaDescription = data.meta_description?.trim() || data.excerpt?.trim();

  // Published at timestamp logic
  let publishedAt = data.published_at || null;
  if (data.is_published && !publishedAt) {
    publishedAt = new Date().toISOString();
  }

  const cleanSlug = data.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");

  const payload = {
    slug: cleanSlug,
    title: data.title.trim(),
    excerpt: data.excerpt.trim(),
    content: data.content,
    cover_image_url: data.cover_image_url || null,
    cover_image_alt: data.cover_image_alt?.trim() || data.title.trim(),
    author: data.author?.trim() || "Digifolks Team",
    category_id: data.category_id || null,
    tags: JSON.stringify(data.tags || []),
    reading_time_minutes: readingTime,
    sort_order: Number(data.sort_order) || 0,
    is_published: Boolean(data.is_published),
    published_at: publishedAt,
    seo_title: seoTitle,
    meta_description: metaDescription,
    canonical_url: data.canonical_url?.trim() || "",
    updated_at: new Date().toISOString(),
  };

  if (data.id) {
    const { error } = await supabase
      .from("blog_posts")
      .update(payload)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("blog_posts").insert(payload);
    if (error) throw new Error(error.message);
  }

  // Revalidate both language routes and admin
  revalidatePath("/en");
  revalidatePath("/id");
  revalidatePath("/en/blog");
  revalidatePath("/id/blog");
  revalidatePath(`/en/blog/${cleanSlug}`);
  revalidatePath(`/id/blog/${cleanSlug}`);
  revalidatePath("/admin/blog");
  revalidatePath("/en/admin/blog");
  revalidatePath("/id/admin/blog");

  return { success: true, slug: cleanSlug };
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/en/blog");
  revalidatePath("/id/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/en/admin/blog");
  revalidatePath("/id/admin/blog");
  return { success: true };
}

export async function togglePublishBlogPost(id: string, is_published: boolean) {
  const supabase = await createClient();
  const updateData: any = {
    is_published,
    updated_at: new Date().toISOString(),
  };
  if (is_published) {
    updateData.published_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("blog_posts")
    .update(updateData)
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/en/blog");
  revalidatePath("/id/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/en/admin/blog");
  revalidatePath("/id/admin/blog");
  return { success: true };
}

export async function saveBlogCategory(data: {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  sort_order?: number;
}) {
  const supabase = await createClient();
  const cleanSlug = data.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-");

  const payload = {
    name: data.name.trim(),
    slug: cleanSlug,
    description: data.description?.trim() || "",
    sort_order: Number(data.sort_order) || 0,
  };

  if (data.id) {
    const { error } = await supabase
      .from("blog_categories")
      .update(payload)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("blog_categories").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/en/blog");
  revalidatePath("/id/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin/blog/categories");
  return { success: true };
}

export async function deleteBlogCategory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_categories").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/en/blog");
  revalidatePath("/id/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin/blog/categories");
  return { success: true };
}
