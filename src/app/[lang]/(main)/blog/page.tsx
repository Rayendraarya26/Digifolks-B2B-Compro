import { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { 
  BookOpen, Clock, Calendar, User, ArrowRight, 
  Search, ChevronLeft, ChevronRight, Tag as TagIcon, Sparkles, Filter, X 
} from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { getBlogPosts, getBlogCategories } from "@/lib/supabase/queries";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }> | { lang: string };
  searchParams?: Promise<{ category?: string; tag?: string; search?: string; page?: string }> | { category?: string; tag?: string; search?: string; page?: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || "en";
  const url = `/${lang}/blog`;
  const resolvedSearch = searchParams ? await searchParams : undefined;
  const hasFilters = Boolean(resolvedSearch?.category || resolvedSearch?.tag || resolvedSearch?.search || resolvedSearch?.page);

  const isEn = lang === "en";
  const title = isEn
    ? "Blog & Insights — Engineering & Scalable Systems"
    : "Blog & Wawasan — Rekayasa & Sistem Berskala";
  const description = isEn
    ? "Deep-dive engineering articles, architecture breakdowns, and tech insights from the Digifolks team."
    : "Artikel rekayasa mendalam, analisis arsitektur, dan wawasan teknologi dari tim engineer Digifolks.";

  return {
    title,
    description,
    ...(hasFilters && {
      robots: {
        index: false,
        follow: true,
      },
    }),
    alternates: {
      canonical: url,
      languages: {
        en: "/en/blog",
        id: "/id/blog",
      },
    },
    openGraph: {
      title,
      description,
      url: url,
      type: "website",
    },
  };
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }> | { lang: string };
  searchParams: Promise<{ category?: string; tag?: string; search?: string; page?: string }> | { category?: string; tag?: string; search?: string; page?: string };
}) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang || "en") as "en" | "id";
  const dict = await getDictionary(lang);
  const t = dict.blog || {
    tag: "Insights & Engineering",
    titleLine1: "Perspectives on",
    titleLine2: "Scale & Craft.",
    desc: "In-depth articles, case studies, and engineering deep-dives from the Digifolks team.",
    allCategories: "All Topics",
    searchPlaceholder: "Search articles...",
    readArticle: "Read Article",
    minRead: "min read",
    noArticlesFound: "No articles found.",
  };
  const prefix = `/${lang}`;

  const resolvedSearchParams = await searchParams;
  const activeCategory = resolvedSearchParams?.category || "all";
  const activeTag = resolvedSearchParams?.tag;
  const searchQuery = resolvedSearchParams?.search;
  const currentPage = Number(resolvedSearchParams?.page) || 1;
  const postsPerPage = 9;

  const [{ posts, total, totalPages }, categories] = await Promise.all([
    getBlogPosts({
      categorySlug: activeCategory !== "all" ? activeCategory : undefined,
      tag: activeTag,
      search: searchQuery,
      page: currentPage,
      limit: postsPerPage,
    }),
    getBlogCategories(),
  ]);

  const createQueryUrl = (newParams: { category?: string; tag?: string; search?: string; page?: number }) => {
    const p = new URLSearchParams();
    const cat = newParams.category !== undefined ? newParams.category : activeCategory;
    if (cat && cat !== "all") p.set("category", cat);

    const tag = newParams.tag !== undefined ? newParams.tag : activeTag;
    if (tag) p.set("tag", tag);

    const q = newParams.search !== undefined ? newParams.search : searchQuery;
    if (q) p.set("search", q);

    const pg = newParams.page !== undefined ? newParams.page : (newParams.category || newParams.search || newParams.tag ? 1 : currentPage);
    if (pg && pg > 1) p.set("page", pg.toString());

    const qs = p.toString();
    return `${prefix}/blog${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="flex w-full flex-col min-h-screen bg-navy-base">
      {/* Hero Section — Dark Brand Aesthetic */}
      <section className="relative pt-32 pb-16 bg-navy-base overflow-hidden border-b border-border-flat/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-emerald/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-navy-light/30 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-light/60 text-accent-emerald font-mono text-xs mb-6 border border-accent-emerald/20 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              {t.tag}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text-pure mb-6 max-w-3xl leading-tight">
              {t.titleLine1}{" "}
              <span className="text-accent-emerald">{t.titleLine2}</span>
            </h1>
            <p className="text-lg md:text-xl text-text-off-white/70 max-w-2xl leading-relaxed">
              {t.desc}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Card List Area — Light Background Section */}
      <section className="py-16 bg-bg-ice-blue min-h-[600px] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Prominent Filter & Search Control Panel */}
          <div className="bg-bg-pure rounded-3xl border-2 border-slate-200/90 p-5 sm:p-6 shadow-md mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Category Filter Pills */}
              <div className="flex-1 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-navy-base">
                  <Filter className="w-3.5 h-3.5 text-accent-forest" />
                  <span>{lang === 'id' ? 'Pilih Kategori / Topik' : 'Filter by Topic'}</span>
                </div>

                <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
                  <Link
                    href={createQueryUrl({ category: "all", page: 1 })}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                      activeCategory === "all"
                        ? "bg-navy-base text-text-pure shadow-md shadow-navy-base/20 ring-2 ring-navy-base"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-navy-base border border-slate-300"
                    }`}
                  >
                    {t.allCategories}
                  </Link>

                  {categories.map((cat) => {
                    const isSelected = activeCategory === cat.slug;
                    return (
                      <Link
                        key={cat.id}
                        href={createQueryUrl({ category: cat.slug, page: 1 })}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                          isSelected
                            ? "bg-navy-base text-text-pure shadow-md shadow-navy-base/20 ring-2 ring-navy-base"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-navy-base border border-slate-300"
                        }`}
                      >
                        {cat.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Search Form — High Contrast & Elevated */}
              <div className="lg:w-80 flex-shrink-0">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-navy-base mb-2">
                  {lang === 'id' ? 'Cari Artikel' : 'Search Articles'}
                </label>
                <form
                  action={`${prefix}/blog`}
                  method="GET"
                  className="relative"
                >
                  {activeCategory !== "all" && (
                    <input type="hidden" name="category" value={activeCategory} />
                  )}
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    name="search"
                    defaultValue={searchQuery || ""}
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-medium text-navy-base placeholder:text-slate-500 focus:outline-none focus:border-navy-base focus:bg-bg-pure focus:ring-2 focus:ring-navy-base/20 transition-all shadow-xs"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-navy-base text-text-pure text-xs font-bold font-mono hover:bg-navy-base/90 transition-colors cursor-pointer"
                  >
                    {lang === 'id' ? 'Cari' : 'Search'}
                  </button>
                </form>
              </div>

            </div>
          </div>

          {/* Active Filters indicator */}
          {(activeCategory !== "all" || activeTag || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2 mb-8 text-xs text-slate-600 bg-bg-pure p-3.5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="font-bold text-navy-base font-mono">Active Filter:</span>
              {activeCategory !== "all" && (
                <span className="px-3 py-1 rounded-lg bg-slate-100 text-navy-base font-mono font-bold border border-slate-300 shadow-xs flex items-center gap-1.5">
                  Category: {categories.find((c) => c.slug === activeCategory)?.name || activeCategory}
                  <Link href={createQueryUrl({ category: "all", page: 1 })} className="text-slate-400 hover:text-red-500">
                    <X className="w-3 h-3" />
                  </Link>
                </span>
              )}
              {activeTag && (
                <span className="px-3 py-1 rounded-lg bg-slate-100 text-accent-forest font-mono font-bold border border-slate-300 shadow-xs flex items-center gap-1.5">
                  Tag: #{activeTag}
                  <Link href={createQueryUrl({ tag: undefined, page: 1 })} className="text-slate-400 hover:text-red-500">
                    <X className="w-3 h-3" />
                  </Link>
                </span>
              )}
              {searchQuery && (
                <span className="px-3 py-1 rounded-lg bg-slate-100 text-navy-base font-mono font-bold border border-slate-300 shadow-xs flex items-center gap-1.5">
                  &ldquo;{searchQuery}&rdquo;
                  <Link href={createQueryUrl({ search: undefined, page: 1 })} className="text-slate-400 hover:text-red-500">
                    <X className="w-3 h-3" />
                  </Link>
                </span>
              )}
              <Link
                href={`${prefix}/blog`}
                className="text-xs text-red-600 font-bold hover:underline ml-auto font-mono"
              >
                {lang === 'id' ? 'Hapus Semua Filter' : 'Clear All'}
              </Link>
            </div>
          )}

          {/* Blog Post Grid */}
          <h2 className="sr-only">{lang === 'id' ? 'Daftar Artikel Blog' : 'Blog Articles'}</h2>
          {posts.length === 0 ? (
            <div className="py-20 text-center rounded-3xl border border-border-flat bg-bg-pure p-8 shadow-sm">
              <BookOpen className="w-12 h-12 text-text-muted/30 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-navy-base mb-2">
                {t.noArticlesFound}
              </h3>
              <p className="text-sm text-text-muted max-w-md mx-auto mb-6">
                We couldn&apos;t find any articles matching your search criteria. Try browsing all topics or clearing the search.
              </p>
              <Link
                href={`${prefix}/blog`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy-base text-text-pure text-xs font-mono hover:bg-navy-base/90 transition-colors shadow-sm"
              >
                View All Articles
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, idx) => {
                const formattedDate = post.published_at
                  ? new Date(post.published_at).toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "";

                return (
                  <Reveal key={post.id} delay={idx * 0.05}>
                    <Link
                      href={`${prefix}/blog/${post.slug}`}
                      className="group flex flex-col h-full rounded-2xl border border-border-flat bg-bg-pure overflow-hidden hover:border-accent-forest/30 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
                    >
                      {/* Cover Graphic */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg-slate-soft">
                        {post.cover_image_url ? (
                          <img
                            src={post.cover_image_url}
                            alt={post.cover_image_alt || post.title}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-bg-slate-soft text-text-muted/30">
                            <BookOpen className="w-12 h-12" />
                          </div>
                        )}

                        {/* Category Tag overlay */}
                        {post.category?.name && (
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-bg-pure/95 text-navy-base backdrop-blur-md border border-border-flat shadow-sm">
                              {post.category.name}
                            </span>
                          </div>
                        )}

                        {/* Reading Time badge */}
                        <div className="absolute bottom-3 right-3">
                          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-text-pure bg-navy-base/85 backdrop-blur-md">
                            <Clock className="w-3 h-3 text-accent-emerald" />
                            {post.reading_time_minutes} {t.minRead}
                          </span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="flex flex-col flex-1 p-6">
                        {/* Meta Info */}
                        <div className="flex items-center gap-3 text-xs text-text-muted mb-3 font-mono">
                          <span>{formattedDate}</span>
                          <span>•</span>
                          <span>{post.author || "Digifolks Team"}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-navy-base group-hover:text-accent-forest transition-colors line-clamp-2 mb-3 leading-snug">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-text-muted line-clamp-3 leading-relaxed flex-1 mb-6">
                          {post.excerpt}
                        </p>

                        {/* Read Article Link */}
                        <div className="flex items-center gap-1.5 text-xs font-bold text-accent-forest group-hover:translate-x-1 transition-transform">
                          <span>{t.readArticle}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16 pt-8 border-t border-border-flat">
              {currentPage > 1 ? (
                <Link
                  href={createQueryUrl({ page: currentPage - 1 })}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-bg-pure text-navy-base hover:bg-bg-pure/80 text-xs font-mono transition-colors border border-border-flat shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Link>
              ) : (
                <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-bg-pure text-text-muted/40 text-xs font-mono border border-border-flat/50 opacity-60 cursor-not-allowed">
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </span>
              )}

              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  const isCurrent = p === currentPage;
                  return (
                    <Link
                      key={p}
                      href={createQueryUrl({ page: p })}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-mono transition-all ${
                        isCurrent
                          ? "bg-navy-base text-text-pure font-bold shadow-md"
                          : "bg-bg-pure text-text-muted hover:text-navy-base border border-border-flat shadow-xs"
                      }`}
                    >
                      {p}
                    </Link>
                  );
                })}
              </div>

              {currentPage < totalPages ? (
                <Link
                  href={createQueryUrl({ page: currentPage + 1 })}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-bg-pure text-navy-base hover:bg-bg-pure/80 text-xs font-mono transition-colors border border-border-flat shadow-xs"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-bg-pure text-text-muted/40 text-xs font-mono border border-border-flat/50 opacity-60 cursor-not-allowed">
                  Next
                  <ChevronRight className="w-4 h-4" />
                </span>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
