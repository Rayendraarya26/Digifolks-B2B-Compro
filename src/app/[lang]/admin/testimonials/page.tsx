import { createClient } from "@/lib/supabase/server";
import { TestimonialsManager } from "./TestimonialsManager";

export default async function TestimonialsAdminPage() {
  const supabase = await createClient();

  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-flat/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-pure">Testimonials</h1>
          <p className="text-xs text-text-off-white/60 mt-1">
            Manage client reviews, endorsements, and social proof on the website.
          </p>
        </div>
      </div>

      <TestimonialsManager initialTestimonials={testimonials || []} />
    </div>
  );
}
