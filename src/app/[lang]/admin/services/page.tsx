import Link from "next/link";
import { Plus, Edit2, ExternalLink, Cpu } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "../_components/DeleteButton";
import { deleteService } from "../actions";

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data: services, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-flat/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent-emerald uppercase tracking-wider mb-1">
            <Cpu className="h-3.5 w-3.5" />
            Engineering Solutions
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-text-pure">Services</h1>
          <p className="text-xs text-text-off-white/60 mt-1">
            Manage your service offerings displayed on the website.
          </p>
        </div>

        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 rounded-xl bg-accent-emerald px-4 py-2.5 text-xs font-semibold text-navy-base hover:bg-accent-emerald/90 transition-all shadow-[0_0_15px_rgba(0,223,137,0.15)]"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </Link>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border-flat/10 bg-navy-base/60 text-xs font-mono uppercase text-text-off-white/50 tracking-wider">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Icon</th>
                <th className="px-6 py-4">Title & Slug</th>
                <th className="px-6 py-4">Short Description</th>
                <th className="px-6 py-4">Tech Stack</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-flat/10">
              {(!services || services.length === 0) ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-text-off-white/40">
                    No services found. Click "Add Service" to create one.
                  </td>
                </tr>
              ) : (
                services.map((item, idx) => {
                  const tech = Array.isArray(item.tech_stack)
                    ? item.tech_stack
                    : typeof item.tech_stack === "string"
                    ? JSON.parse(item.tech_stack || "[]")
                    : [];

                  return (
                    <tr key={item.id} className="hover:bg-navy-light/40 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-text-off-white/40">
                        0{item.num || idx + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-10 w-10 rounded-lg bg-navy-base border border-border-flat/10 flex items-center justify-center p-1.5">
                          <img
                            src={item.icon_url || "/Image/Brain.webp"}
                            alt={item.title}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-text-pure text-sm">{item.title}</div>
                        <div className="text-xs text-accent-emerald font-mono mt-0.5">/{item.slug}</div>
                      </td>
                      <td className="px-6 py-4 text-xs text-text-off-white/70 max-w-sm">
                        <p className="line-clamp-2">{item.short_desc}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {tech.slice(0, 3).map((t: string) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 text-[10px] font-mono rounded bg-navy-base border border-border-flat/10 text-text-off-white/80"
                            >
                              {t}
                            </span>
                          ))}
                          {tech.length > 3 && (
                            <span className="text-[10px] font-mono text-text-off-white/40 self-center">
                              +{tech.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href="/en/services"
                            target="_blank"
                            className="p-2 rounded-lg bg-navy-base border border-border-flat/10 text-text-off-white/60 hover:text-text-pure hover:border-accent-emerald/30 transition-all"
                            title="View on site"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                          <Link
                            href={`/admin/services/${item.id}`}
                            className="p-2 rounded-lg bg-navy-base border border-border-flat/10 text-accent-emerald hover:bg-accent-emerald/10 hover:border-accent-emerald/40 transition-all"
                            title="Edit service"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Link>
                          <DeleteButton
                            id={item.id}
                            deleteAction={deleteService}
                            itemName={item.title}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
