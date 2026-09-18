import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { BlogForm } from "../BlogForm";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string; lang: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: post, error }, { data: categories }] = await Promise.all([
    supabase
      .from("blog_posts")
      .select("*, category:blog_categories(*)")
      .eq("id", id)
      .single(),
    supabase
      .from("blog_categories")
      .select("*")
      .order("sort_order", { ascending: true }),
  ]);

  if (error || !post) {
    notFound();
  }

  return (
    <div>
      <BlogForm initialData={post} categories={categories || []} />
    </div>
  );
}
