"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Quote, 
  Plus, 
  Pencil, 
  Trash2, 
  Eye, 
  EyeOff, 
  Check, 
  X,
  User
} from "lucide-react";
import { saveTestimonial, deleteTestimonial } from "../actions";
import { Testimonial } from "@/lib/supabase/types";

export function TestimonialsManager({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Testimonial[]>(initialTestimonials);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);

  const openCreateModal = () => {
    setQuote("");
    setAuthor("");
    setSortOrder(items.length);
    setIsPublished(true);
    setEditingItem(null);
    setIsCreating(true);
  };

  const openEditModal = (item: Testimonial) => {
    setQuote(item.quote);
    setAuthor(item.author);
    setSortOrder(item.sort_order);
    setIsPublished(item.is_published);
    setEditingItem(item);
    setIsCreating(true);
  };

  const closeModal = () => {
    setIsCreating(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await saveTestimonial({
        id: editingItem?.id,
        quote,
        author,
        sort_order: Number(sortOrder),
        is_published: isPublished,
      });

      router.refresh();
      closeModal();
      // Optimistic update
      if (editingItem) {
        setItems((prev) =>
          prev.map((i) =>
            i.id === editingItem.id
              ? { ...i, quote, author, sort_order: Number(sortOrder), is_published: isPublished }
              : i
          )
        );
      } else {
        // refetch or append
        router.refresh();
      }
    } catch (err: any) {
      alert("Error saving testimonial: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      router.refresh();
    } catch (err: any) {
      alert("Error deleting testimonial: " + err.message);
    }
  };

  const handleTogglePublish = async (item: Testimonial) => {
    try {
      await saveTestimonial({
        ...item,
        is_published: !item.is_published,
      });
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, is_published: !item.is_published } : i))
      );
      router.refresh();
    } catch (err: any) {
      alert("Error updating status: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-text-off-white/60">
          Showing <span className="text-accent-emerald font-mono font-semibold">{items.length}</span> testimonials
        </p>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-accent-emerald px-4 py-2 text-xs font-semibold text-navy-base hover:bg-accent-emerald/90 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </button>
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all p-6 flex flex-col justify-between ${
              item.is_published
                ? "border-border-flat/10 bg-[#0F1E36]/70 hover:border-accent-emerald/30"
                : "border-border-flat/5 bg-[#0F1E36]/30 opacity-60"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Quote className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-text-off-white/40">
                    Order: {item.sort_order}
                  </span>
                  <button
                    onClick={() => handleTogglePublish(item)}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono cursor-pointer border ${
                      item.is_published
                        ? "bg-accent-emerald/20 text-accent-emerald border-accent-emerald/30"
                        : "bg-navy-light text-text-off-white/50 border-border-flat/10"
                    }`}
                  >
                    {item.is_published ? "Published" : "Draft"}
                  </button>
                </div>
              </div>

              <blockquote className="text-sm text-text-pure italic font-serif leading-relaxed">
                "{item.quote}"
              </blockquote>
            </div>

            <div className="flex items-center justify-between pt-6 mt-4 border-t border-border-flat/10">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-navy-light flex items-center justify-center text-text-off-white/60">
                  <User className="h-3.5 w-3.5" />
                </div>
                <span className="text-xs font-semibold text-text-pure">{item.author}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-1.5 rounded-lg text-text-off-white/60 hover:text-accent-emerald hover:bg-accent-emerald/10 transition-colors"
                  title="Edit"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg text-text-off-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Form */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#0F1E36] border border-border-flat/20 rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-border-flat/10 pb-4">
              <h3 className="text-lg font-bold text-text-pure">
                {editingItem ? "Edit Testimonial" : "Add Testimonial"}
              </h3>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-xl text-text-off-white/50 hover:text-text-pure"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
                  Quote / Feedback
                </label>
                <textarea
                  rows={4}
                  required
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="The team engineered a robust backend that handled our scale with zero downtime..."
                  className="w-full bg-navy-base border border-border-flat/10 rounded-xl p-3 text-xs text-text-pure placeholder-text-off-white/30 focus:border-accent-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
                  Author & Role / Company
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. CTO, Healthcare AI Platform"
                  className="w-full bg-navy-base border border-border-flat/10 rounded-xl px-3 py-2 text-xs text-text-pure placeholder-text-off-white/30 focus:border-accent-emerald focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    className="w-full bg-navy-base border border-border-flat/10 rounded-xl px-3 py-2 text-xs text-text-pure focus:border-accent-emerald focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
                    Status
                  </label>
                  <select
                    value={isPublished ? "published" : "draft"}
                    onChange={(e) => setIsPublished(e.target.value === "published")}
                    className="w-full bg-navy-base border border-border-flat/10 rounded-xl px-3 py-2 text-xs text-text-pure focus:border-accent-emerald focus:outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-flat/10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-xl text-xs text-text-off-white/60 hover:bg-navy-light"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-xl bg-accent-emerald text-navy-base font-semibold text-xs hover:bg-accent-emerald/90 transition-all cursor-pointer"
                >
                  {loading ? "Saving..." : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
