"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { savePortfolio } from "../actions";

export function PortfolioForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [client, setClient] = useState(initialData?.client || "");
  const [projectType, setProjectType] = useState(initialData?.project_type || "Web App");
  const [headline, setHeadline] = useState(initialData?.headline || "");
  const [industry, setIndustry] = useState(initialData?.industry || "");
  const [duration, setDuration] = useState(initialData?.duration || "Completed");
  const [year, setYear] = useState(initialData?.year || "2026");
  const [metric, setMetric] = useState(initialData?.metric || "");
  const [metricLabel, setMetricLabel] = useState(initialData?.metric_label || "");
  const [tags, setTags] = useState<string>(
    Array.isArray(initialData?.tags)
      ? initialData.tags.join(", ")
      : typeof initialData?.tags === "string"
      ? JSON.parse(initialData.tags || "[]").join(", ")
      : ""
  );
  const [overview, setOverview] = useState(initialData?.overview || "");

  // Challenges array
  const rawChallenges = Array.isArray(initialData?.challenges)
    ? initialData.challenges
    : typeof initialData?.challenges === "string"
    ? JSON.parse(initialData.challenges || "[]")
    : [""];
  const [challenges, setChallenges] = useState<string[]>(rawChallenges.length ? rawChallenges : [""]);

  // Solutions array
  const rawSolutions = Array.isArray(initialData?.solutions)
    ? initialData.solutions
    : typeof initialData?.solutions === "string"
    ? JSON.parse(initialData.solutions || "[]")
    : [""];
  const [solutions, setSolutions] = useState<string[]>(rawSolutions.length ? rawSolutions : [""]);

  // Results array ({ value, label })
  const rawResults = Array.isArray(initialData?.results)
    ? initialData.results
    : typeof initialData?.results === "string"
    ? JSON.parse(initialData.results || "[]")
    : [{ value: "", label: "" }];
  const [results, setResults] = useState<{ value: string; label: string }[]>(
    rawResults.length ? rawResults : [{ value: "", label: "" }]
  );

  const [coverImageUrl, setCoverImageUrl] = useState(
    initialData?.cover_image_url || (slug ? `/Image/Portfolio/${slug}/cover.png` : "")
  );

  const rawGallery = Array.isArray(initialData?.gallery_images)
    ? initialData.gallery_images
    : typeof initialData?.gallery_images === "string"
    ? JSON.parse(initialData.gallery_images || "[]")
    : [];
  const [galleryImages, setGalleryImages] = useState<string>(rawGallery.join("\n"));

  const [sortOrder, setSortOrder] = useState<number>(initialData?.sort_order ?? 0);
  const [isProposal, setIsProposal] = useState<boolean>(Boolean(initialData?.is_proposal));
  const [isPublished, setIsPublished] = useState<boolean>(initialData?.is_published ?? true);

  // Auto-generate slug from title if new
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const parsedTags = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const parsedGallery = galleryImages
        .split("\n")
        .map((g) => g.trim())
        .filter(Boolean);

      const filteredChallenges = challenges.map((c) => c.trim()).filter(Boolean);
      const filteredSolutions = solutions.map((s) => s.trim()).filter(Boolean);
      const filteredResults = results.filter((r) => r.value.trim() && r.label.trim());

      await savePortfolio({
        id: initialData?.id,
        title,
        slug,
        client,
        project_type: projectType,
        headline: headline || title,
        industry,
        duration,
        year,
        metric,
        metric_label: metricLabel,
        tags: parsedTags,
        overview,
        challenges: filteredChallenges,
        solutions: filteredSolutions,
        results: filteredResults,
        is_proposal: isProposal,
        cover_image_url: coverImageUrl || `/Image/Portfolio/${slug}/cover.png`,
        gallery_images: parsedGallery,
        sort_order: sortOrder,
        is_published: isPublished,
      });

      router.push("/admin/portfolios");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save portfolio.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Top action bar */}
      <div className="flex items-center justify-between border-b border-border-flat/10 pb-4">
        <Link
          href="/admin/portfolios"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-off-white/60 hover:text-text-pure transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolios
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-accent-emerald px-5 py-2.5 text-xs font-semibold text-navy-base hover:bg-accent-emerald/90 transition-all cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-navy-base border-t-transparent" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {initialData ? "Update Portfolio" : "Create Portfolio"}
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-300">
          {error}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column (Core Details) */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-text-pure uppercase tracking-wider font-mono">
              Basic Information
            </h3>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Integrated Web e-Commerce & POS System"
                className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-3 text-sm text-text-pure focus:border-accent-emerald focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                  Slug (URL) *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="gorillacoach"
                  className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-3 text-sm text-text-pure font-mono focus:border-accent-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                  Client / Partner Name *
                </label>
                <input
                  type="text"
                  required
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="GorillaCoachID"
                  className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-3 text-sm text-text-pure focus:border-accent-emerald focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                  Industry *
                </label>
                <input
                  type="text"
                  required
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="Retail / E-Commerce"
                  className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-3 text-sm text-text-pure focus:border-accent-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                  Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Completed / On Going"
                  className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-3 text-sm text-text-pure focus:border-accent-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                  Year
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2026"
                  className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-3 text-sm text-text-pure font-mono focus:border-accent-emerald focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                  Key Metric Value
                </label>
                <input
                  type="text"
                  value={metric}
                  onChange={(e) => setMetric(e.target.value)}
                  placeholder="3-in-1 / 100% / SEO"
                  className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-3 text-sm text-accent-emerald font-mono focus:border-accent-emerald focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                  Key Metric Label
                </label>
                <input
                  type="text"
                  value={metricLabel}
                  onChange={(e) => setMetricLabel(e.target.value)}
                  placeholder="Unified Platform"
                  className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-3 text-sm text-text-pure focus:border-accent-emerald focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Next.js, Node.js, PostgreSQL, POS Integration"
                className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-3 text-sm text-text-pure font-mono focus:border-accent-emerald focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                Project Overview *
              </label>
              <textarea
                required
                rows={4}
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
                placeholder="Summary description of the client problem and project scope..."
                className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-3 text-sm text-text-pure focus:border-accent-emerald focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 p-6 space-y-6">
            <h3 className="text-sm font-semibold text-text-pure uppercase tracking-wider font-mono">
              Challenges & Solutions
            </h3>

            {/* Challenges List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-text-off-white/70">
                  Key Challenges
                </label>
                <button
                  type="button"
                  onClick={() => setChallenges([...challenges, ""])}
                  className="inline-flex items-center gap-1 text-xs text-accent-emerald hover:underline cursor-pointer"
                >
                  <Plus className="h-3 w-3" /> Add Challenge
                </button>
              </div>
              {challenges.map((c, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={c}
                    onChange={(e) => {
                      const updated = [...challenges];
                      updated[i] = e.target.value;
                      setChallenges(updated);
                    }}
                    placeholder={`Challenge ${i + 1}`}
                    className="flex-1 rounded-xl border border-border-flat/10 bg-navy-base px-3 py-2 text-sm text-text-pure focus:border-accent-emerald focus:outline-none"
                  />
                  {challenges.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setChallenges(challenges.filter((_, idx) => idx !== i))}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Solutions List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-text-off-white/70">
                  Our Solutions
                </label>
                <button
                  type="button"
                  onClick={() => setSolutions([...solutions, ""])}
                  className="inline-flex items-center gap-1 text-xs text-accent-emerald hover:underline cursor-pointer"
                >
                  <Plus className="h-3 w-3" /> Add Solution
                </button>
              </div>
              {solutions.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={s}
                    onChange={(e) => {
                      const updated = [...solutions];
                      updated[i] = e.target.value;
                      setSolutions(updated);
                    }}
                    placeholder={`Solution ${i + 1}`}
                    className="flex-1 rounded-xl border border-border-flat/10 bg-navy-base px-3 py-2 text-sm text-text-pure focus:border-accent-emerald focus:outline-none"
                  />
                  {solutions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setSolutions(solutions.filter((_, idx) => idx !== i))}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Settings & Images) */}
        <div className="space-y-6">
          {/* Status & Visibility */}
          <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-text-pure uppercase tracking-wider font-mono">
              Publishing Options
            </h3>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="h-4 w-4 rounded border-border-flat/20 text-accent-emerald focus:ring-accent-emerald"
              />
              <div>
                <span className="text-sm font-medium text-text-pure block">Published</span>
                <span className="text-xs text-text-off-white/50 block">Visible to web visitors</span>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isProposal}
                onChange={(e) => setIsProposal(e.target.checked)}
                className="h-4 w-4 rounded border-border-flat/20 text-accent-emerald focus:ring-accent-emerald"
              />
              <div>
                <span className="text-sm font-medium text-text-pure block">Proposal Badge</span>
                <span className="text-xs text-text-off-white/50 block">Mark as professional proposal</span>
              </div>
            </label>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                Sort Order
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-2.5 text-sm text-text-pure font-mono focus:border-accent-emerald focus:outline-none"
              />
            </div>
          </div>

          {/* Image Paths */}
          <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-text-pure uppercase tracking-wider font-mono">
              Media Assets
            </h3>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                Cover Image Path
              </label>
              <input
                type="text"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder={`/Image/Portfolio/${slug || "slug"}/cover.png`}
                className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-3 py-2 text-xs text-text-pure font-mono focus:border-accent-emerald focus:outline-none"
              />
              <p className="text-[11px] text-text-off-white/40 mt-1">Path relative to public folder</p>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                Gallery Images (one per line)
              </label>
              <textarea
                rows={4}
                value={galleryImages}
                onChange={(e) => setGalleryImages(e.target.value)}
                placeholder={`/Image/Portfolio/${slug || "slug"}/gallery-01.png\n/Image/Portfolio/${slug || "slug"}/gallery-02.png`}
                className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-3 py-2 text-xs text-text-pure font-mono focus:border-accent-emerald focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
