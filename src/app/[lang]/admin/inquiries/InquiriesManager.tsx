"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Inbox, 
  Search, 
  Mail, 
  Building, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  Archive, 
  Trash2, 
  ExternalLink,
  Filter,
  Eye,
  X
} from "lucide-react";
import { updateInquiryStatus, deleteInquiry } from "../actions";
import { ContactSubmission } from "@/lib/supabase/types";

export function InquiriesManager({ initialInquiries }: { initialInquiries: ContactSubmission[] }) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<ContactSubmission[]>(initialInquiries);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<ContactSubmission | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = filterStatus === "all" || inq.status === filterStatus;
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(search.toLowerCase())) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.service.toLowerCase().includes(search.toLowerCase()) ||
      inq.details.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (id: string, status: "new" | "read" | "replied" | "archived") => {
    setUpdatingId(id);
    try {
      await updateInquiryStatus(id, status);
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );
      if (selectedInquiry?.id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status } : null));
      }
      router.refresh();
    } catch (err: any) {
      alert("Error updating inquiry: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    setUpdatingId(id);
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
      router.refresh();
    } catch (err: any) {
      alert("Error deleting inquiry: " + err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColors: Record<string, { bg: string; text: string; border: string }> = {
    new: { bg: "bg-accent-emerald/20", text: "text-accent-emerald", border: "border-accent-emerald/30" },
    read: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
    replied: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
    archived: { bg: "bg-gray-500/20", text: "text-gray-400", border: "border-gray-500/30" },
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-navy-base border border-border-flat/10 rounded-xl overflow-x-auto max-w-full">
          {["all", "new", "read", "replied", "archived"].map((status) => {
            const count = status === "all" ? inquiries.length : inquiries.filter((i) => i.status === status).length;
            const isActive = filterStatus === status;
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? "bg-accent-emerald text-navy-base font-bold shadow"
                    : "text-text-off-white/60 hover:text-text-pure hover:bg-navy-light/50"
                }`}
              >
                <span>{status}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isActive ? "bg-navy-base/30 text-navy-base" : "bg-navy-light text-text-off-white/70"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-off-white/40" />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-navy-base border border-border-flat/10 rounded-xl pl-9 pr-4 py-2 text-xs text-text-pure placeholder-text-off-white/30 focus:border-accent-emerald focus:outline-none"
          />
        </div>
      </div>

      {/* Leads Table / Cards */}
      {filteredInquiries.length === 0 ? (
        <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/60 p-12 text-center text-text-off-white/40">
          <Inbox className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium text-text-off-white/60">No inquiries found</p>
          <p className="text-xs text-text-off-white/40 mt-1">
            {search ? "Try adjusting your search criteria" : "Client submissions from the contact form will appear here"}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border-flat/10 bg-navy-base/50 text-text-off-white/60 font-mono uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-6">Client / Company</th>
                  <th className="py-3.5 px-6">Service Requested</th>
                  <th className="py-3.5 px-6">Budget</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Date</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-flat/10">
                {filteredInquiries.map((inq) => {
                  const style = statusColors[inq.status] || statusColors.new;
                  return (
                    <tr
                      key={inq.id}
                      className="hover:bg-navy-light/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedInquiry(inq)}
                    >
                      <td className="py-4 px-6">
                        <div className="font-semibold text-text-pure text-sm">{inq.name}</div>
                        <div className="text-text-off-white/50 text-xs flex items-center gap-1.5 mt-0.5">
                          {inq.company && <span>{inq.company} · </span>}
                          <span>{inq.email}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-mono text-accent-emerald text-xs">{inq.service}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-text-off-white/80 font-mono">
                          {inq.currency || "USD"} {inq.budget || "-"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border ${style.bg} ${style.text} ${style.border}`}
                        >
                          {inq.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-text-off-white/50 font-mono text-[11px]">
                        {new Date(inq.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="p-1.5 rounded-lg text-text-off-white/60 hover:text-accent-emerald hover:bg-accent-emerald/10 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <a
                            href={`mailto:${inq.email}?subject=Regarding your project inquiry on Digifolks`}
                            className="p-1.5 rounded-lg text-text-off-white/60 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                            title="Reply via Email"
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() => handleDelete(inq.id)}
                            disabled={updatingId === inq.id}
                            className="p-1.5 rounded-lg text-text-off-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            title="Delete Inquiry"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-[#0F1E36] border border-border-flat/20 rounded-2xl p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-border-flat/10 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${
                      statusColors[selectedInquiry.status]?.bg || ""
                    } ${statusColors[selectedInquiry.status]?.text || ""} ${
                      statusColors[selectedInquiry.status]?.border || ""
                    }`}
                  >
                    {selectedInquiry.status}
                  </span>
                  <span className="text-xs text-text-off-white/40 font-mono">
                    {new Date(selectedInquiry.created_at).toLocaleString("en-US")}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-text-pure">{selectedInquiry.name}</h3>
                <p className="text-xs text-text-off-white/60 mt-0.5">
                  {selectedInquiry.company ? `${selectedInquiry.company} · ` : ""}
                  {selectedInquiry.email}
                </p>
              </div>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-xl text-text-off-white/50 hover:text-text-pure hover:bg-navy-light transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Inquiry Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-navy-base border border-border-flat/10">
              <div>
                <span className="text-[10px] font-mono uppercase text-text-off-white/50 block">Service</span>
                <span className="text-xs font-semibold text-accent-emerald mt-0.5 block">
                  {selectedInquiry.service}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-text-off-white/50 block">Budget Range</span>
                <span className="text-xs font-semibold text-text-pure mt-0.5 block">
                  {selectedInquiry.currency || "USD"} {selectedInquiry.budget || "Not specified"}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-text-off-white/50 block">Email Address</span>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="text-xs font-mono text-blue-400 hover:underline mt-0.5 block truncate"
                >
                  {selectedInquiry.email}
                </a>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-text-off-white/60">
                Project Overview & Requirements
              </span>
              <div className="p-4 rounded-xl bg-navy-base/80 border border-border-flat/10 text-sm text-text-pure/90 whitespace-pre-wrap leading-relaxed">
                {selectedInquiry.details || "No details provided."}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border-flat/10">
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-off-white/60 mr-1">Status:</span>
                {(["new", "read", "replied", "archived"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedInquiry.id, st)}
                    disabled={updatingId === selectedInquiry.id}
                    className={`px-3 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                      selectedInquiry.status === st
                        ? "bg-accent-emerald text-navy-base font-bold shadow"
                        : "bg-navy-light text-text-off-white/70 hover:bg-navy-light/80"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Digifolks - Response to your inquiry`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold hover:bg-blue-500/30 transition-all"
                >
                  <Mail className="h-4 w-4" />
                  Reply via Email
                </a>
                <button
                  onClick={() => handleDelete(selectedInquiry.id)}
                  disabled={updatingId === selectedInquiry.id}
                  className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
                  title="Delete Inquiry"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
