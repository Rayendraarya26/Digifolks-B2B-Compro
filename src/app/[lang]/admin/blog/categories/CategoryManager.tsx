"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Edit2, FolderTree, Loader2, Trash2, CheckCircle2 } from "lucide-react";
import { BlogCategory } from "@/lib/supabase/types";
import { saveBlogCategory, deleteBlogCategory } from "../../actions";

interface CategoryWithCount extends BlogCategory {
  post_count?: number;
}

export function CategoryManager({
  categories,
}: {
  categories: CategoryWithCount[];
}) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEdit = (cat: BlogCategory) => {
    setEditingId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || "");
    setSortOrder(cat.sort_order || 0);
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setSlug("");
    setDescription("");
    setSortOrder(0);
    setError(null);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingId) {
      setSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) {
      setError("Name and slug are required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await saveBlogCategory({
        id: editingId || undefined,
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
        sort_order: Number(sortOrder) || 0,
      });
      resetForm();
      router.refresh();
    } catch (err: any) {
      console.error("Save category error:", err);
      setError(err.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (!window.confirm(`Are you sure you want to delete category "${catName}"?`)) {
      return;
    }

    try {
      setLoading(true);
      await deleteBlogCategory(id);
      router.refresh();
    } catch (err: any) {
      alert(`Failed to delete category: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border-flat/10 pb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-light text-text-off-white/70 hover:text-text-pure transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-text-pure flex items-center gap-2">
              <FolderTree className="h-5 w-5 text-accent-emerald" />
              Blog Categories
            </h1>
            <p className="text-xs text-text-off-white/50">
              Manage content taxonomy. Every article must belong to one primary category.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="md:col-span-1">
          <form
            onSubmit={handleSave}
            className="rounded-2xl border border-border-flat/10 bg-navy-base/60 p-5 space-y-4 sticky top-6"
          >
            <h3 className="text-sm font-bold text-text-pure">
              {editingId ? "Edit Category" : "Add New Category"}
            </h3>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Artificial Intelligence"
                className="w-full px-3 py-2 rounded-xl bg-navy-light/50 border border-border-flat/15 text-text-pure text-xs focus:outline-none focus:border-accent-emerald transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1">
                Slug *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="artificial-intelligence"
                className="w-full px-3 py-2 rounded-xl bg-navy-light/50 border border-border-flat/15 text-accent-emerald font-mono text-xs focus:outline-none focus:border-accent-emerald transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief category scope overview"
                className="w-full px-3 py-2 rounded-xl bg-navy-light/50 border border-border-flat/15 text-text-pure text-xs focus:outline-none focus:border-accent-emerald transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1">
                Sort Order
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-navy-light/50 border border-border-flat/15 text-text-pure text-xs focus:outline-none focus:border-accent-emerald transition-all"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-accent-emerald text-navy-base text-xs font-bold hover:bg-accent-emerald/90 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
                <span>{editingId ? "Update" : "Add Category"}</span>
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-3 py-2 rounded-xl bg-navy-light text-text-off-white/70 hover:text-text-pure text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: List */}
        <div className="md:col-span-2">
          <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 overflow-hidden shadow-xl">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border-flat/10 bg-navy-base/60 text-xs font-mono uppercase text-text-off-white/50 tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="px-5 py-3.5">Slug</th>
                  <th className="px-5 py-3.5">Articles</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-flat/10">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-text-off-white/40 text-xs">
                      No categories created yet.
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-navy-light/20 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-text-pure">{cat.name}</div>
                        {cat.description && (
                          <div className="text-xs text-text-off-white/40 line-clamp-1">
                            {cat.description}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-xs font-mono text-accent-emerald">
                        {cat.slug}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-text-off-white/70 font-mono">
                        {cat.post_count ?? 0}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => startEdit(cat)}
                            className="p-1.5 rounded-lg bg-navy-base border border-border-flat/10 text-text-off-white/70 hover:bg-navy-light hover:text-text-pure transition-colors cursor-pointer"
                            title="Edit Category"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(cat.id, cat.name)}
                            className="p-1.5 rounded-lg bg-navy-base border border-border-flat/10 text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer"
                            title="Delete Category"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
