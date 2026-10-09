import { createClient } from "@/lib/supabase/server";
import { TeamDNAManager } from "./TeamDNAManager";

export default async function TeamDNAAdminPage() {
  const supabase = await createClient();

  const { data: items, error } = await supabase
    .from("team_dna")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-flat/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-pure">Team DNA Principles</h1>
          <p className="text-xs text-text-off-white/60 mt-1">
            Manage the core engineering and business principles displayed in the About section.
          </p>
        </div>
      </div>

      <TeamDNAManager initialItems={items || []} />
    </div>
  );
}
