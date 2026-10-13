"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Save, Loader2, Sliders, Globe, Calendar, User, Tag, 
  Clock, Eye, Image as ImageIcon, AlertCircle, CheckCircle2 
} from "lucide-react";
import { BlogPost, BlogCategory } from "@/lib/supabase/types";
import { saveBlogPost } from "../actions";
import { ImageUploader } from "../_components/ImageUploader";
import { RichTextEditor } from "../_components/RichTextEditor";

interface BlogFormProps {
  initialData?: BlogPost | null;
  categories: BlogCategory[];
}

export function BlogForm({ initialData, categories }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(Boolean(initialData?.slug));
  const [categoryId, setCategoryId] = useState(initialData?.category_id || (categories[0]?.id || ""));
  const [author, setAuthor] = useState(initialData?.author || "Digifolks Team");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.cover_image_url || "");
  const [coverImageAlt, setCoverImageAlt] = useState(initialData?.cover_image_alt || "");
  const [tags, setTags] = useState<string>(() => {
    if (Array.isArray(initialData?.tags)) {
      return initialData.tags.join(", ");
    }
    if (typeof initialData?.tags === "string") {
      try {
        const parsed = JSON.parse(initialData.tags);
        return Array.isArray(parsed) ? parsed.join(", ") : "";
      } catch {
        return initialData.tags;
      }
    }
    return "";
  });
  const [readingTime, setReadingTime] = useState<number>(initialData?.reading_time_minutes || 5);
  const [isPublished, setIsPublished] = useState<boolean>(initialData?.is_published || false);
  const [publishedAt, setPublishedAt] = useState<string>(
    initialData?.published_at 
      ? new Date(initialData.published_at).toISOString().slice(0, 16) 
      : ""
  );

  // SEO Fields (Auto-generate but editable)
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title || "");
  const [seoTitleManuallyEdited, setSeoTitleManuallyEdited] = useState(Boolean(initialData?.seo_title));
  const [metaDescription, setMetaDescription] = useState(initialData?.meta_description || "");
  const [metaDescManuallyEdited, setMetaDescManuallyEdited] = useState(Boolean(initialData?.meta_description));
  const [canonicalUrl, setCanonicalUrl] = useState(initialData?.canonical_url || "");

  // Auto-slugify
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugManuallyEdited) {
      const generatedSlug = val
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(generatedSlug);
    }
    if (!seoTitleManuallyEdited) {
      setSeoTitle(val);
    }
  };

  const handleExcerptChange = (val: string) => {
    setExcerpt(val);
    if (!metaDescManuallyEdited) {
      setMetaDescription(val);
    }
  };

  // Content change also recalculates reading time if untouched
  const handleContentChange = (html: string) => {
    setContent(html);
    const text = html.replace(/<[^>]*>/g, " ");
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const estTime = Math.max(1, Math.ceil(words / 200));
    setReadingTime(estTime);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Please enter an article title.");
      return;
    }
    if (!slug.trim()) {
      setError("Please enter a valid slug.");
      return;
    }
    if (!categoryId) {
      setError("Please select a category for this article.");
      return;
    }
    if (!author.trim()) {
      setError("Please enter the author name.");
      return;
    }
    if (!content.trim() || content === "<p></p>") {
      setError("Please enter article content.");
      return;
    }

    try {
      setLoading(true);

      const parsedTags: string[] = tags
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean);

      const formattedPublishedAt = isPublished
        ? publishedAt 
          ? new Date(publishedAt).toISOString() 
          : new Date().toISOString()
        : null;

      await saveBlogPost({
        id: initialData?.id,
        title: title.trim(),
        slug: slug.trim(),
        category_id: categoryId,
        author: author.trim(),
        excerpt: excerpt.trim(),
        content,
        cover_image_url: coverImageUrl || undefined,
        cover_image_alt: coverImageAlt.trim() || title.trim(),
        tags: parsedTags,
        reading_time_minutes: Number(readingTime) || 5,
        sort_order: initialData?.sort_order || 0,
        is_published: isPublished,
        published_at: formattedPublishedAt || undefined,
        seo_title: seoTitle.trim() || title.trim(),
        meta_description: metaDescription.trim() || excerpt.trim(),
        canonical_url: canonicalUrl.trim() || undefined,
      });

      router.push("/admin/blog");
      router.refresh();
    } catch (err: any) {
      console.error("Save blog post failed:", err);
      setError(err.message || "Failed to save blog post. Please check the form.");
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find((c) => c.id === categoryId);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-6xl mx-auto pb-16">
      {/* Top Header & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-flat/10 pb-6 sticky top-0 bg-navy-base/90 backdrop-blur-md z-20 py-2">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-light text-text-off-white/70 hover:text-text-pure transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-text-pure">
              {initialData ? "Edit Article" : "Create New Article"}
            </h1>
            <p className="text-xs text-text-off-white/50 font-mono">
              {initialData ? `Editing /blog/${initialData.slug}` : "Draft a new publication"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-text-off-white/70 hover:bg-navy-light transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-emerald text-navy-base text-xs font-bold hover:bg-accent-emerald/90 transition-all cursor-pointer shadow-lg shadow-accent-emerald/10 disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>{loading ? "Saving Article..." : "Save Article"}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Article Title */}
          <div className="rounded-2xl border border-border-flat/10 bg-navy-base/60 p-6 space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. Modern Architecture Patterns for Enterprise Systems"
                className="w-full px-4 py-3 rounded-xl bg-navy-light/50 border border-border-flat/15 text-text-pure placeholder:text-text-off-white/30 text-lg font-semibold focus:outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald transition-all"
              />
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-text-off-white/70">
                  Slug / URL path *
                </label>
                <span className="text-[11px] text-text-off-white/40 font-mono">
                  {slug ? `/blog/${slug}` : "Auto-generated from title"}
                </span>
              </div>
              <div className="flex items-center rounded-xl bg-navy-light/50 border border-border-flat/15 px-3 py-2 text-sm">
                <span className="text-text-off-white/40 font-mono mr-1">/blog/</span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => {
                    setSlugManuallyEdited(true);
                    setSlug(e.target.value);
                  }}
                  placeholder="modern-architecture-patterns"
                  className="w-full bg-transparent text-accent-emerald font-mono focus:outline-none"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                Summary / Excerpt
              </label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => handleExcerptChange(e.target.value)}
                placeholder="A compelling 1-2 sentence overview of the key insights in this article..."
                className="w-full px-4 py-3 rounded-xl bg-navy-light/50 border border-border-flat/15 text-text-pure placeholder:text-text-off-white/30 text-sm focus:outline-none focus:border-accent-emerald focus:ring-1 focus:ring-accent-emerald transition-all resize-none"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl border border-border-flat/10 bg-navy-base/60 p-6 space-y-4">
            <h3 className="text-sm font-bold text-text-pure flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-accent-emerald" />
              Featured Cover Image
            </h3>
            <ImageUploader
              value={coverImageUrl}
              onChange={(url) => setCoverImageUrl(url)}
              bucket="blog-images"
              folder="covers"
              label="Article Hero Image"
              description="Upload high-resolution landscape image (16:9 recommended, max 10MB)."
            />

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
                Image Alt Text (SEO & Accessibility)
              </label>
              <input
                type="text"
                value={coverImageAlt}
                onChange={(e) => setCoverImageAlt(e.target.value)}
                placeholder="Descriptive explanation of the cover graphic"
                className="w-full px-3.5 py-2 rounded-xl bg-navy-light/50 border border-border-flat/15 text-text-pure text-xs focus:outline-none focus:border-accent-emerald transition-all"
              />
            </div>
          </div>

          {/* Article Rich Text Content */}
          <div className="rounded-2xl border border-border-flat/10 bg-navy-base/60 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-text-pure">Article Body Content *</h3>
                <p className="text-xs text-text-off-white/50">
                  Rich formatting supported: headings, code blocks, bullet lists, blockquotes, and embedded visuals.
                </p>
              </div>
              <span className="text-xs font-mono text-accent-emerald px-2 py-1 rounded bg-accent-emerald/10 border border-accent-emerald/20">
                Tiptap Rich Text
              </span>
            </div>

            <RichTextEditor
              value={content}
              onChange={handleContentChange}
              placeholder="Start drafting the comprehensive insights here..."
            />
          </div>

          {/* SEO & Meta Settings Card */}
          <div className="rounded-2xl border border-border-flat/10 bg-navy-base/60 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-border-flat/10 pb-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-accent-emerald" />
                <h3 className="text-sm font-bold text-text-pure">Search Engine Optimization (SEO)</h3>
              </div>
              <span className="text-[11px] font-mono text-accent-emerald/80">Auto-generated & editable</span>
            </div>

            {/* Google Preview */}
            <div className="p-4 rounded-xl bg-[#091527] border border-border-flat/10 space-y-1.5 font-sans">
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-off-white/40 block">
                Google Search Result Preview
              </span>
              <div className="text-xs text-text-off-white/50 font-mono truncate">
                https://digifolks.id/blog/{slug || "article-slug"}
              </div>
              <div className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer truncate">
                {seoTitle || title || "Article Title Preview"} - Digifolks
              </div>
              <div className="text-xs text-text-off-white/70 line-clamp-2 leading-relaxed">
                {metaDescription || excerpt || "Article summary description preview appears here..."}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-mono uppercase tracking-wider text-text-off-white/70">
                    SEO Meta Title
                  </label>
                  <span className={`text-[11px] font-mono ${(seoTitle || title).length > 60 ? "text-amber-400" : "text-text-off-white/40"}`}>
                    {(seoTitle || title).length} / 60 chars
                  </span>
                </div>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => {
                    setSeoTitleManuallyEdited(true);
                    setSeoTitle(e.target.value);
                  }}
                  placeholder={title || "SEO optimized title"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light/50 border border-border-flat/15 text-text-pure text-xs focus:outline-none focus:border-accent-emerald transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-mono uppercase tracking-wider text-text-off-white/70">
                    Meta Description
                  </label>
                  <span className={`text-[11px] font-mono ${(metaDescription || excerpt).length > 160 ? "text-amber-400" : "text-text-off-white/40"}`}>
                    {(metaDescription || excerpt).length} / 160 chars
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={metaDescription}
                  onChange={(e) => {
                    setMetaDescManuallyEdited(true);
                    setMetaDescription(e.target.value);
                  }}
                  placeholder={excerpt || "Search engine description snippet"}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light/50 border border-border-flat/15 text-text-pure text-xs focus:outline-none focus:border-accent-emerald transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1">
                  Canonical URL (Optional)
                </label>
                <input
                  type="url"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder="https://digifolks.id/blog/original-post"
                  className="w-full px-3.5 py-2 rounded-xl bg-navy-light/50 border border-border-flat/15 text-text-pure text-xs focus:outline-none focus:border-accent-emerald transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Publishing & Meta sidebar */}
        <div className="space-y-6">
          {/* Publication Control */}
          <div className="rounded-2xl border border-border-flat/10 bg-navy-base/60 p-6 space-y-5">
            <h3 className="text-sm font-bold text-text-pure flex items-center gap-2">
              <Sliders className="h-4 w-4 text-accent-emerald" />
              Publishing Settings
            </h3>

            {/* Publish Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-navy-light/50 border border-border-flat/10">
              <div>
                <div className="text-xs font-bold text-text-pure">Publish Status</div>
                <div className="text-[11px] text-text-off-white/50">
                  {isPublished ? "Visible to public visitors" : "Saved as private draft"}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-navy-base peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-emerald"></div>
              </label>
            </div>

            {/* Published Date */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5 flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-accent-emerald" />
                Publication Date
              </label>
              <input
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-light/50 border border-border-flat/15 text-text-pure text-xs focus:outline-none focus:border-accent-emerald transition-all"
              />
              <p className="text-[10px] text-text-off-white/40 mt-1">
                Leave blank to automatically set current time upon publishing.
              </p>
            </div>

            {/* Reading Time */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-accent-emerald" />
                Estimated Read Time (Minutes)
              </label>
              <input
                type="number"
                min={1}
                value={readingTime}
                onChange={(e) => setReadingTime(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-navy-light/50 border border-border-flat/15 text-text-pure text-xs focus:outline-none focus:border-accent-emerald transition-all"
              />
            </div>
          </div>

          {/* Taxonomy & Attribution */}
          <div className="rounded-2xl border border-border-flat/10 bg-navy-base/60 p-6 space-y-5">
            <h3 className="text-sm font-bold text-text-pure flex items-center gap-2">
              <Tag className="h-4 w-4 text-accent-emerald" />
              Taxonomy & Author
            </h3>

            {/* Mandatory Category */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-text-off-white/70">
                  Category * (Mandatory)
                </label>
                <Link
                  href="/admin/blog/categories"
                  className="text-[11px] text-accent-emerald hover:underline"
                >
                  Manage Categories
                </Link>
              </div>
              <select
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-navy-light border border-border-flat/15 text-text-pure text-xs focus:outline-none focus:border-accent-emerald transition-all cursor-pointer"
              >
                <option value="" disabled>
                  -- Select Category --
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {selectedCategory?.description && (
                <p className="text-[11px] text-text-off-white/40 mt-1 italic">
                  {selectedCategory.description}
                </p>
              )}
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-accent-emerald" />
                Author *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Digifolks Engineering Team"
                className="w-full px-3.5 py-2 rounded-xl bg-navy-light/50 border border-border-flat/15 text-text-pure text-xs focus:outline-none focus:border-accent-emerald transition-all"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
                Tags (Optional, comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Next.js, Architecture, Cloud, DevOps"
                className="w-full px-3.5 py-2 rounded-xl bg-navy-light/50 border border-border-flat/15 text-text-pure text-xs focus:outline-none focus:border-accent-emerald transition-all"
              />
              <p className="text-[10px] text-text-off-white/40 mt-1">
                Separate multiple tags with a comma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
