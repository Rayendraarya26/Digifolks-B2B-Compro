import { createClient } from "@/lib/supabase/server";
import { BlogForm } from "../BlogForm";

export default async function NewBlogPostPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("blog_categories")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div>
      <BlogForm categories={categories || []} />
    </div>
  );
}
