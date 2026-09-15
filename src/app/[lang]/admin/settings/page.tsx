import { createClient } from "@/lib/supabase/server";
import { SettingsManager } from "./SettingsManager";

export default async function SettingsAdminPage() {
  const supabase = await createClient();

  const { data: settings } = await supabase
    .from("general_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-flat/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-pure">Website Settings</h1>
          <p className="text-xs text-text-off-white/60 mt-1">
            Configure global URLs, video hero assets, company contact channels, and WhatsApp representatives.
          </p>
        </div>
      </div>

      <SettingsManager initialSettings={settings} />
    </div>
  );
}
