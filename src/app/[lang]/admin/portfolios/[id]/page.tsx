import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PortfolioForm } from "../PortfolioForm";

export default async function EditPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: portfolio, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !portfolio) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-pure">Edit Portfolio</h1>
        <p className="text-xs text-text-off-white/60 mt-1">
          Update case study details for <span className="text-accent-emerald font-semibold">{portfolio.title}</span>.
        </p>
      </div>

      <PortfolioForm initialData={portfolio} />
    </div>
  );
}
