import { createClient } from "@/lib/supabase/server";
import { FAQsManager } from "./FAQsManager";

export default async function FAQsAdminPage() {
  const supabase = await createClient();

  const { data: faqs, error } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-flat/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-pure">Frequently Asked Questions</h1>
          <p className="text-xs text-text-off-white/60 mt-1">
            Manage FAQs that appear on the homepage and services pages.
          </p>
        </div>
      </div>

      <FAQsManager initialFAQs={faqs || []} />
    </div>
  );
}
