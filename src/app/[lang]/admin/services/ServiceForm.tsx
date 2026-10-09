"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { saveService } from "../actions";

export function ServiceForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [num, setNum] = useState<number>(initialData?.num ?? 1);
  const [shortDesc, setShortDesc] = useState(initialData?.short_desc || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [themeBg, setThemeBg] = useState(initialData?.theme_bg || "bg-pop-blue");
  const [themeText, setThemeText] = useState(initialData?.theme_text || "text-pop-blue");

  const [techStack, setTechStack] = useState<string>(
    Array.isArray(initialData?.tech_stack)
      ? initialData.tech_stack.join(", ")
      : typeof initialData?.tech_stack === "string"
      ? JSON.parse(initialData.tech_stack || "[]").join(", ")
      : ""
  );

  const rawFeatures = Array.isArray(initialData?.features)
    ? initialData.features
    : typeof initialData?.features === "string"
    ? JSON.parse(initialData.features || "[]")
    : [""];
  const [features, setFeatures] = useState<string[]>(rawFeatures.length ? rawFeatures : [""]);

  const [iconUrl, setIconUrl] = useState(initialData?.icon_url || "/Image/Brain.webp");
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");
  const [sortOrder, setSortOrder] = useState<number>(initialData?.sort_order ?? 0);
  const [isPublished, setIsPublished] = useState<boolean>(initialData?.is_published ?? true);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData) {
      setSlug("svc-" + val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const parsedTech = techStack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const filteredFeatures = features.map((f) => f.trim()).filter(Boolean);

      await saveService({
        id: initialData?.id,
        title,
        slug,
        num,
        short_desc: shortDesc,
        description,
        features: filteredFeatures,
        theme_bg: themeBg,
        theme_text: themeText,
        tech_stack: parsedTech,
        icon_url: iconUrl,
        image_url: imageUrl,
        sort_order: sortOrder,
        is_published: isPublished,
      });

      router.push("/admin/services");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save service.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between border-b border-border-flat/10 pb-4">
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-2 text-xs font-mono text-text-off-white/60 hover:text-text-pure transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Services
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
          {initialData ? "Update Service" : "Create Service"}
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-xs text-red-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-text-pure uppercase tracking-wider font-mono">
              Service Details
            </h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Artificial Intelligence"
                  className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-3 text-sm text-text-pure focus:border-accent-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                  Display Number *
                </label>
                <input
                  type="number"
                  required
                  value={num}
                  onChange={(e) => setNum(Number(e.target.value))}
                  className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-3 text-sm text-text-pure font-mono focus:border-accent-emerald focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="svc-ai"
                  className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-3 text-sm text-text-pure font-mono focus:border-accent-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                  Tech Stack (comma-separated)
                </label>
                <input
                  type="text"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                  placeholder="Python, TensorFlow, PyTorch, OpenAI"
                  className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-3 text-sm text-text-pure font-mono focus:border-accent-emerald focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                Short Description (Cards) *
              </label>
              <textarea
                required
                rows={2}
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
                placeholder="Brief summary for homepage cards..."
                className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-3 text-sm text-text-pure focus:border-accent-emerald focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                Full Description (Detail Page)
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="In-depth explanation of service capabilities..."
                className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-4 py-3 text-sm text-text-pure focus:border-accent-emerald focus:outline-none leading-relaxed"
              />
            </div>

            {/* Features */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-text-off-white/70">
                  Key Features / Deliverables
                </label>
                <button
                  type="button"
                  onClick={() => setFeatures([...features, ""])}
                  className="inline-flex items-center gap-1 text-xs text-accent-emerald hover:underline cursor-pointer"
                >
                  <Plus className="h-3 w-3" /> Add Feature
                </button>
              </div>
              {features.map((f, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={f}
                    onChange={(e) => {
                      const updated = [...features];
                      updated[i] = e.target.value;
                      setFeatures(updated);
                    }}
                    placeholder={`Feature ${i + 1}`}
                    className="flex-1 rounded-xl border border-border-flat/10 bg-navy-base px-3 py-2 text-sm text-text-pure focus:border-accent-emerald focus:outline-none"
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setFeatures(features.filter((_, idx) => idx !== i))}
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

        {/* Right Settings */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-text-pure uppercase tracking-wider font-mono">
              Display & Theme
            </h3>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                Icon URL / Path
              </label>
              <input
                type="text"
                value={iconUrl}
                onChange={(e) => setIconUrl(e.target.value)}
                placeholder="/Image/Brain.webp"
                className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-3 py-2 text-xs text-text-pure font-mono focus:border-accent-emerald focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-2">
                Image URL (Detail header)
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-3 py-2 text-xs text-text-pure font-mono focus:border-accent-emerald focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1">
                  Theme BG Class
                </label>
                <input
                  type="text"
                  value={themeBg}
                  onChange={(e) => setThemeBg(e.target.value)}
                  placeholder="bg-pop-pink"
                  className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-3 py-2 text-xs text-text-pure font-mono focus:border-accent-emerald focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1">
                  Theme Text Class
                </label>
                <input
                  type="text"
                  value={themeText}
                  onChange={(e) => setThemeText(e.target.value)}
                  placeholder="text-pop-pink"
                  className="w-full rounded-xl border border-border-flat/10 bg-navy-base px-3 py-2 text-xs text-text-pure font-mono focus:border-accent-emerald focus:outline-none"
                />
              </div>
            </div>

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

            <label className="flex items-center gap-3 pt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="h-4 w-4 rounded border-border-flat/20 text-accent-emerald focus:ring-accent-emerald"
              />
              <span className="text-sm font-medium text-text-pure">Published</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
