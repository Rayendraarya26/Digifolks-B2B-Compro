"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

export function DeleteButton({
  id,
  deleteAction,
  itemName,
}: {
  id: string;
  deleteAction: (id: string) => Promise<any>;
  itemName: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${itemName}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    try {
      await deleteAction(id);
    } catch (err: any) {
      alert(`Error deleting item: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="p-2 rounded-lg bg-navy-base border border-border-flat/10 text-red-400/80 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all disabled:opacity-40 cursor-pointer"
      title={`Delete ${itemName}`}
    >
      {loading ? (
        <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
      ) : (
        <Trash2 className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
