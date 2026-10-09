import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ServiceForm } from "../ServiceForm";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: service, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-pure">Edit Service</h1>
        <p className="text-xs text-text-off-white/60 mt-1">
          Update service details for <span className="text-accent-emerald font-semibold">{service.title}</span>.
        </p>
      </div>

      <ServiceForm initialData={service} />
    </div>
  );
}
