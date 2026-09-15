import Link from "next/link";
import { Plus, Edit2, ExternalLink, Briefcase, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "../_components/DeleteButton";
import { deletePortfolio, togglePublishPortfolio } from "../actions";

export default async function AdminPortfoliosPage() {
  const supabase = await createClient();
  const { data: portfolios, error } = await supabase
    .from("portfolios")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-flat/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent-emerald uppercase tracking-wider mb-1">
            <Briefcase className="h-3.5 w-3.5" />
            Case Studies
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-text-pure">Portfolios</h1>
          <p className="text-xs text-text-off-white/60 mt-1">
            Manage your showcase projects and case studies shown on the website.
          </p>
        </div>

        <Link
          href="/admin/portfolios/new"
          className="inline-flex items-center gap-2 rounded-xl bg-accent-emerald px-4 py-2.5 text-xs font-semibold text-navy-base hover:bg-accent-emerald/90 transition-all shadow-[0_0_15px_rgba(0,223,137,0.15)]"
        >
          <Plus className="h-4 w-4" />
          Add Portfolio
        </Link>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border-flat/10 bg-navy-base/60 text-xs font-mono uppercase text-text-off-white/50 tracking-wider">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Cover</th>
                <th className="px-6 py-4">Project & Client</th>
                <th className="px-6 py-4">Industry & Year</th>
                <th className="px-6 py-4">Key Metric</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-flat/10">
              {(!portfolios || portfolios.length === 0) ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-text-off-white/40">
                    No portfolios found. Click "Add Portfolio" to create your first case study.
                  </td>
                </tr>
              ) : (
                portfolios.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-navy-light/40 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-text-off-white/40">
                      {item.sort_order || idx + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-12 w-16 rounded-lg bg-navy-base border border-border-flat/10 overflow-hidden flex items-center justify-center">
                        <img
                          src={item.cover_image_url || `/Image/Portfolio/${item.slug}/cover.png`}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-text-pure text-sm">{item.title}</div>
                      <div className="text-xs text-text-off-white/50 mt-0.5 flex items-center gap-2">
                        <span>{item.client}</span>
                        <span>·</span>
                        <span className="font-mono text-accent-emerald">/{item.slug}</span>
                      </div>
                      {item.is_proposal && (
                        <span className="mt-1.5 inline-block text-[9px] font-mono px-2 py-0.5 rounded bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20">
                          Proposal
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div className="text-text-pure">{item.industry}</div>
                      <div className="text-text-off-white/40 font-mono mt-0.5">{item.year} · {item.duration}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono text-xs font-bold text-accent-emerald">{item.metric}</div>
                      <div className="text-[11px] text-text-off-white/50">{item.metric_label}</div>
                    </td>
                    <td className="px-6 py-4">
                      <form action={async () => {
                        "use server";
                        await togglePublishPortfolio(item.id, !item.is_published);
                      }}>
                        <button
                          type="submit"
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-mono font-medium transition-colors cursor-pointer ${
                            item.is_published
                              ? "bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/30 hover:bg-accent-emerald/25"
                              : "bg-navy-light text-text-off-white/50 border border-border-flat/20 hover:text-text-pure"
                          }`}
                        >
                          {item.is_published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          {item.is_published ? "Published" : "Draft"}
                        </button>
                      </form>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/en/work/${item.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-navy-base border border-border-flat/10 text-text-off-white/60 hover:text-text-pure hover:border-accent-emerald/30 transition-all"
                          title="View on site"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          href={`/admin/portfolios/${item.id}`}
                          className="p-2 rounded-lg bg-navy-base border border-border-flat/10 text-accent-emerald hover:bg-accent-emerald/10 hover:border-accent-emerald/40 transition-all"
                          title="Edit portfolio"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </Link>
                        <DeleteButton
                          id={item.id}
                          deleteAction={deletePortfolio}
                          itemName={item.title}
                        />
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
  );
}
