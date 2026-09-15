import { createClient } from "@/lib/supabase/server";
import { InquiriesManager } from "./InquiriesManager";

export default async function InquiriesAdminPage() {
  const supabase = await createClient();

  const { data: inquiries, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-flat/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-pure">Contact Inquiries</h1>
          <p className="text-xs text-text-off-white/60 mt-1">
            Manage incoming project requests and client leads submitted from the website.
          </p>
        </div>
      </div>

      <InquiriesManager initialInquiries={inquiries || []} />
    </div>
  );
}
