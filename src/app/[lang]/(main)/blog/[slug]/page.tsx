import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/animations/Reveal";
import { 
  ArrowLeft, Clock, Calendar, User, Tag, Share2, 
  ArrowRight, BookOpen, Sparkles, CheckCircle2 
} from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/supabase/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.is_published) {
    return {
      title: "Article Not Found — Digifolks",
    };
  }

  const title = post.seo_title || `${post.title} — Digifolks`;
  const description = post.meta_description || post.excerpt;
  const canonicalUrl = post.canonical_url || `/${lang}/blog/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `/en/blog/${slug}`,
        id: `/id/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.published_at,
      authors: [post.author || "Digifolks Team"],
      images: post.cover_image_url
        ? [
            {
              url: post.cover_image_url,
              alt: post.cover_image_alt || post.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang as "en" | "id");
  const t = dict.blog || {
    backToBlog: "Back to all articles",
    minRead: "min read",
    author: "Author",
    publishedOn: "Published on",
    share: "Share",
    relatedArticles: "Related Articles",
    readArticle: "Read Article",
  };
  const prefix = `/${lang}`;

  const post = await getBlogPostBySlug(slug);

  if (!post || !post.is_published) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts(post.id, post.category_id, 3);

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="flex w-full flex-col min-h-screen bg-bg-ice-blue pt-32 pb-24 relative overflow-hidden text-navy-base">
      {/* Subtle light ambient tint */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-forest/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-slate-200/40 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href={`${prefix}/blog`}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-text-muted hover:text-navy-base transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.backToBlog}</span>
          </Link>
        </div>

        {/* Article Header */}
        <Reveal>
          <header className="mb-10">
            {/* Category & Read Time */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {post.category && (
                <Link
                  href={`${prefix}/blog?category=${post.category.slug}`}
                  className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-accent-forest/10 text-accent-forest border border-accent-forest/20 hover:bg-accent-forest/20 transition-colors shadow-xs"
                >
                  {post.category.name}
                </Link>
              )}
              <span className="flex items-center gap-1.5 text-xs font-mono text-text-muted">
                <Clock className="w-3.5 h-3.5 text-accent-forest" />
                {post.reading_time_minutes} {t.minRead}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy-base tracking-tight leading-[1.2] mb-6">
              {post.title}
            </h1>

            {/* Excerpt Lead */}
            {post.excerpt && (
              <p className="text-lg md:text-xl text-text-muted leading-relaxed font-normal mb-8 border-l-4 border-accent-forest pl-5 py-3 bg-bg-pure/80 border-y border-r border-border-flat rounded-r-2xl italic shadow-xs">
                {post.excerpt}
              </p>
            )}

            {/* Author Attribution Bar */}
            <div className="flex items-center justify-between border-y border-border-flat py-4 text-xs font-mono text-text-muted bg-bg-pure/40 px-2 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-forest/10 border border-accent-forest/20 flex items-center justify-center text-accent-forest font-bold text-sm shadow-xs">
                  {(post.author || "DF").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-navy-base text-sm">
                    {post.author || "Digifolks Team"}
                  </div>
                  <div className="text-[11px] text-text-muted">
                    {formattedDate}
                  </div>
                </div>
              </div>
            </div>
          </header>
        </Reveal>

        {/* Featured Cover Graphic */}
        {post.cover_image_url && (
          <Reveal>
            <div className="mb-12 rounded-3xl overflow-hidden border border-border-flat bg-bg-pure shadow-lg">
              <img
                src={post.cover_image_url}
                alt={post.cover_image_alt || post.title}
                className="w-full h-auto object-cover max-h-[520px]"
              />
              {post.cover_image_alt && post.cover_image_alt !== post.title && (
                <div className="px-5 py-3 text-center text-xs text-text-muted italic bg-bg-pure border-t border-border-flat">
                  {post.cover_image_alt}
                </div>
              )}
            </div>
          </Reveal>
        )}

        {/* Article Body — Styled with blog-prose-light */}
        <Reveal>
          <div className="bg-bg-pure rounded-3xl p-6 sm:p-10 md:p-12 border border-border-flat shadow-sm mb-16">
            <article
              className="blog-prose-light max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </Reveal>

        {/* Tags Section */}
        {post.tags && post.tags.length > 0 && (
          <div className="border-t border-border-flat pt-6 mb-12">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-text-muted flex items-center gap-1 mr-2">
                <Tag className="w-3.5 h-3.5 text-accent-forest" />
                Tags:
              </span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`${prefix}/blog?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-bg-pure text-text-muted hover:text-accent-forest hover:border-accent-forest/40 border border-border-flat transition-colors shadow-xs"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Author / Digifolks Bio Card */}
        <div className="rounded-3xl border border-border-flat bg-bg-pure p-8 mb-16 shadow-md relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-forest font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Digifolks Engineering
              </div>
              <h3 className="text-xl font-bold text-navy-base">
                Engineering systems that scale with your business.
              </h3>
              <p className="text-sm text-text-muted max-w-xl leading-relaxed">
                Need to modernize legacy architecture, build custom enterprise systems, or scale digital operations? We design and deliver production-grade software solutions.
              </p>
            </div>
            <Link
              href={`${prefix}/contact`}
              className="flex-shrink-0 px-6 py-3 rounded-full bg-navy-base text-text-pure font-bold text-xs hover:bg-navy-base/90 transition-all shadow-md whitespace-nowrap"
            >
              Consult with Engineers
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="border-t border-border-flat pt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-navy-base">
                {t.relatedArticles}
              </h2>
              <Link
                href={`${prefix}/blog`}
                className="text-xs font-mono text-accent-forest font-bold hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <Link
                  key={rPost.id}
                  href={`${prefix}/blog/${rPost.slug}`}
                  className="group flex flex-col rounded-2xl border border-border-flat bg-bg-pure overflow-hidden hover:border-accent-forest/30 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden bg-bg-slate-soft">
                    {rPost.cover_image_url ? (
                      <img
                        src={rPost.cover_image_url}
                        alt={rPost.cover_image_alt || rPost.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-bg-slate-soft text-text-muted/30">
                        <BookOpen className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-[10px] font-mono text-accent-forest font-bold mb-1">
                      {rPost.category?.name || "Article"}
                    </span>
                    <h3 className="text-sm font-bold text-navy-base line-clamp-2 group-hover:text-accent-forest transition-colors mb-2">
                      {rPost.title}
                    </h3>
                    <p className="text-xs text-text-muted line-clamp-2 mt-auto">
                      {rPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
