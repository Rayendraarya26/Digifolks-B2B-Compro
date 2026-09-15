"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Sparkles, 
  Plus, 
  Pencil, 
  Trash2, 
  X,
  Target
} from "lucide-react";
import { saveTeamDNA, deleteTeamDNA } from "../actions";
import { TeamDNA } from "@/lib/supabase/types";

export function TeamDNAManager({ initialItems }: { initialItems: TeamDNA[] }) {
  const router = useRouter();
  const [items, setItems] = useState<TeamDNA[]>(initialItems);
  const [editingItem, setEditingItem] = useState<TeamDNA | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [value, setValue] = useState("");
  const [shortPitch, setShortPitch] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const openCreateModal = () => {
    setValue("");
    setShortPitch("");
    setSortOrder(items.length);
    setEditingItem(null);
    setIsCreating(true);
  };

  const openEditModal = (item: TeamDNA) => {
    setValue(item.value);
    setShortPitch(item.short_pitch);
    setSortOrder(item.sort_order);
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
      await saveTeamDNA({
        id: editingItem?.id,
        value,
        short_pitch: shortPitch,
        sort_order: Number(sortOrder),
      });

      router.refresh();
      closeModal();
      if (editingItem) {
        setItems((prev) =>
          prev.map((i) =>
            i.id === editingItem.id
              ? { ...i, value, short_pitch: shortPitch, sort_order: Number(sortOrder) }
              : i
          )
        );
      } else {
        router.refresh();
      }
    } catch (err: any) {
      alert("Error saving Team DNA: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Team DNA principle?")) return;
    try {
      await deleteTeamDNA(id);
      setItems((prev) => prev.filter((i) => i.id !== id));
      router.refresh();
    } catch (err: any) {
      alert("Error deleting item: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-text-off-white/60">
          Showing <span className="text-accent-emerald font-mono font-semibold">{items.length}</span> core principles
        </p>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-xl bg-accent-emerald px-4 py-2 text-xs font-semibold text-navy-base hover:bg-accent-emerald/90 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Principle
        </button>
      </div>

      {/* List of Team DNA items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 p-6 flex flex-col justify-between hover:border-accent-emerald/30 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-accent-emerald/10 border border-accent-emerald/20 text-accent-emerald">
                    <Target className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-xs text-accent-emerald font-bold">0{idx + 1}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-1.5 rounded-lg text-text-off-white/60 hover:text-accent-emerald hover:bg-accent-emerald/10 transition-colors"
                    title="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-text-off-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-sm text-text-pure leading-snug">{item.value}</h3>
              <p className="text-xs text-text-off-white/70 leading-relaxed">{item.short_pitch}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-border-flat/10 flex items-center justify-between text-[10px] font-mono text-text-off-white/40">
              <span>Sort order: {item.sort_order}</span>
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
                {editingItem ? "Edit Principle" : "Add Team DNA Principle"}
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
                  Core Value / Statement
                </label>
                <input
                  type="text"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="e.g. We solve business problems, not just write code."
                  className="w-full bg-navy-base border border-border-flat/10 rounded-xl px-3 py-2 text-xs text-text-pure placeholder-text-off-white/30 focus:border-accent-emerald focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-text-off-white/70 mb-1.5">
                  Short Pitch / Elaboration
                </label>
                <textarea
                  rows={4}
                  required
                  value={shortPitch}
                  onChange={(e) => setShortPitch(e.target.value)}
                  placeholder="Explain the engineering philosophy and business impact..."
                  className="w-full bg-navy-base border border-border-flat/10 rounded-xl p-3 text-xs text-text-pure placeholder-text-off-white/30 focus:border-accent-emerald focus:outline-none"
                />
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
                  {loading ? "Saving..." : "Save Principle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
