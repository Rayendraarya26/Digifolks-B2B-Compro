"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  HelpCircle, 
  Plus, 
  Pencil, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  X,
  Palette
} from "lucide-react";
import { saveFAQ, deleteFAQ } from "../actions";
import { FAQ } from "@/lib/supabase/types";

const COLOR_OPTIONS = [
  { label: "Pink", value: "bg-pop-pink", dot: "bg-pink-500" },
  { label: "Yellow", value: "bg-pop-yellow", dot: "bg-yellow-400" },
  { label: "Blue", value: "bg-pop-blue", dot: "bg-blue-500" },
  { label: "Green", value: "bg-pop-green", dot: "bg-emerald-500" },
  { label: "Purple", value: "bg-purple-500", dot: "bg-purple-500" },
];

export function FAQsManager({ initialFAQs }: { initialFAQs: FAQ[] }) {
  const router = useRouter();
  const [items, setItems] = useState<FAQ[]>(initialFAQs);
  const [editingItem, setEditingItem] = useState<FAQ | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [color, setColor] = useState("bg-pop-pink");
  const [sortOrder, setSortOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);

  const openCreateModal = () => {
    setQuestion("");
    setAnswer("");
    setColor("bg-pop-pink");
    setSortOrder(items.length);
    setIsPublished(true);
    setEditingItem(null);
    setIsCreating(true);
  };

  const openEditModal = (item: FAQ) => {
    setQuestion(item.question);
    setAnswer(item.answer);
    setColor(item.color || "bg-pop-pink");
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
      await saveFAQ({
        id: editingItem?.id,
        question,
        answer,
        color,
        sort_order: Number(sortOrder),
        is_published: isPublished,
      });

      router.refresh();
      closeModal();
      if (editingItem) {
        setItems((prev) =>
          prev.map((i) =>
            i.id === editingItem.id
              ? { ...i, question, answer, color, sort_order: Number(sortOrder), is_published: isPublished }
              : i
          )
        );
      } else {
        router.refresh();
      }
    } catch (err: any) {
      alert("Error saving FAQ: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;
    try {
      await deleteFAQ(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      router.refresh();
    } catch (err: any) {
      alert("Error deleting FAQ: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-text-off-white/60">
          Showing <span className="text-accent-emerald font-mono font-semibold">{items.length}</span> questions
        </p>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-accent-emerald px-4 py-2 text-xs font-semibold text-navy-base hover:bg-accent-emerald/90 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Question
        </button>
      </div>

      {/* List of FAQs */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all p-5 ${
              item.is_published
                ? "border-border-flat/10 bg-[#0F1E36]/70 hover:border-accent-emerald/30"
                : "border-border-flat/5 bg-[#0F1E36]/30 opacity-60"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-navy-base text-accent-emerald border border-border-flat/10">
                    #{item.sort_order}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${item.color.replace('bg-', 'bg-')}`} />
                    <span className="text-[10px] font-mono text-text-off-white/40">{item.color}</span>
                  </div>
                  <span
                    className={`px-2 py-0.2 rounded-full text-[10px] font-mono ${
                      item.is_published
                        ? "bg-accent-emerald/20 text-accent-emerald"
                        : "bg-navy-light text-text-off-white/50"
                    }`}
                  >
                    {item.is_published ? "Published" : "Draft"}
                  </span>
                </div>

                <h3 className="font-semibold text-sm text-text-pure">{item.question}</h3>
                <p className="text-xs text-text-off-white/70 leading-relaxed whitespace-pre-wrap">
                  {item.answer}
                </p>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-2 rounded-lg text-text-off-white/60 hover:text-accent-emerald hover:bg-accent-emerald/10 transition-colors"
                  title="Edit FAQ"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-lg text-text-off-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete FAQ"
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
                {editingItem ? "Edit FAQ" : "Add FAQ"}
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
                  Question
                </label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. How does Digifolks handle project delivery?"
                  className="w-full bg-navy-base border border-border-flat/10 rounded-xl px-3 py-2 text-xs text-text-pure placeholder-text-off-white/30 focus:border-accent-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
                  Answer
                </label>
                <textarea
                  rows={4}
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Explain clearly and concisely..."
                  className="w-full bg-navy-base border border-border-flat/10 rounded-xl p-3 text-xs text-text-pure placeholder-text-off-white/30 focus:border-accent-emerald focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
                    Accent Color
                  </label>
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full bg-navy-base border border-border-flat/10 rounded-xl px-3 py-2 text-xs text-text-pure focus:border-accent-emerald focus:outline-none"
                  >
                    {COLOR_OPTIONS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label} ({c.value})
                      </option>
                    ))}
                  </select>
                </div>

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
                  {loading ? "Saving..." : "Save Question"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
