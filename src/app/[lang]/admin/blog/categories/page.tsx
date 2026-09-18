import { createClient } from "@/lib/supabase/server";
import { CategoryManager } from "./CategoryManager";

export default async function AdminBlogCategoriesPage() {
  const supabase = await createClient();

  const [{ data: categories }, { data: posts }] = await Promise.all([
    supabase
      .from("blog_categories")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .from("blog_posts")
      .select("category_id"),
  ]);

  // Count posts per category
  const countMap: Record<string, number> = {};
  (posts || []).forEach((p) => {
    if (p.category_id) {
      countMap[p.category_id] = (countMap[p.category_id] || 0) + 1;
    }
  });

  const categoriesWithCount = (categories || []).map((cat) => ({
    ...cat,
    post_count: countMap[cat.id] || 0,
  }));

  return <CategoryManager categories={categoriesWithCount} />;
}
