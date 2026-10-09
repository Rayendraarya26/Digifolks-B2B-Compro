import Link from "next/link";
import { Plus, Edit2, ExternalLink, BookOpen, Eye, EyeOff, Calendar, Tag, FolderTree } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DeleteButton } from "../_components/DeleteButton";
import { ImageThumbnail } from "../_components/ImageThumbnail";
import { deleteBlogPost, togglePublishBlogPost } from "../actions";

export default async function AdminBlogPage() {
  const supabase = await createClient();

  const [{ data: posts }, { data: categories }] = await Promise.all([
    supabase
      .from("blog_posts")
      .select("*, category:blog_categories(*)")
      .order("created_at", { ascending: false }),
    supabase
      .from("blog_categories")
      .select("*")
      .order("sort_order", { ascending: true })
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-flat/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-accent-emerald uppercase tracking-wider mb-1">
            <BookOpen className="h-3.5 w-3.5" />
            Editorial Management
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-text-pure">Blog & Articles</h1>
          <p className="text-xs text-text-off-white/60 mt-1">
            Create, edit, and publish engineering insights and company updates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog/categories"
            className="inline-flex items-center gap-2 rounded-xl bg-navy-light/80 border border-border-flat/15 px-3.5 py-2.5 text-xs font-semibold text-text-off-white hover:bg-navy-light hover:text-text-pure transition-all"
          >
            <FolderTree className="h-4 w-4 text-accent-emerald" />
            Categories ({categories?.length || 0})
          </Link>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 rounded-xl bg-accent-emerald px-4 py-2.5 text-xs font-semibold text-navy-base hover:bg-accent-emerald/90 transition-all shadow-[0_0_15px_rgba(0,223,137,0.15)] cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Write Article
          </Link>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border-flat/10 bg-navy-base/60 text-xs font-mono uppercase text-text-off-white/50 tracking-wider">
              <tr>
                <th className="px-6 py-4">Cover</th>
                <th className="px-6 py-4">Title & Slug</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Author</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-flat/10">
              {(!posts || posts.length === 0) ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-text-off-white/40">
                    No articles found. Click "Write Article" to publish your first post!
                  </td>
                </tr>
              ) : (
                posts.map((post) => {
                  const categoryName = post.category?.name || "Uncategorized";
                  const dateStr = post.published_at 
                    ? new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    : "Not published";

                  return (
                    <tr
                      key={post.id}
                      className="hover:bg-navy-light/20 transition-colors group"
                    >
                      {/* Cover Thumbnail */}
                      <td className="px-6 py-4 w-20">
                        <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-navy-base border border-border-flat/10 flex-shrink-0">
                          {post.cover_image_url ? (
                            <img
                              src={post.cover_image_url}
                              alt={post.cover_image_alt || post.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-text-off-white/20 text-[10px] font-mono">
                              No Cover
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Title & Slug */}
                      <td className="px-6 py-4 max-w-xs">
                        <div className="font-semibold text-text-pure line-clamp-1 group-hover:text-accent-emerald transition-colors">
                          {post.title}
                        </div>
                        <div className="text-xs text-text-off-white/40 font-mono flex items-center gap-1.5 mt-0.5">
                          <span>/blog/{post.slug}</span>
                          {post.is_published && (
                            <Link
                              href={`/en/blog/${post.slug}`}
                              target="_blank"
                              className="text-accent-emerald hover:opacity-80 inline-flex items-center"
                              title="View on site"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Link>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-navy-light text-accent-emerald border border-accent-emerald/20">
                          {categoryName}
                        </span>
                      </td>

                      {/* Author */}
                      <td className="px-6 py-4 text-xs text-text-off-white/80 font-medium">
                        {post.author || "Digifolks Team"}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-xs text-text-off-white/60 font-mono">
                        {dateStr}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <form
                          action={async () => {
                            "use server";
                            await togglePublishBlogPost(post.id, !post.is_published);
                          }}
                        >
                          <button
                            type="submit"
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium transition-colors cursor-pointer ${
                              post.is_published
                                ? "bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20 hover:bg-accent-emerald/20"
                                : "bg-text-off-white/5 text-text-off-white/50 border border-border-flat/10 hover:bg-text-off-white/10"
                            }`}
                            title={post.is_published ? "Click to unpublish" : "Click to publish"}
                          >
                            {post.is_published ? (
                              <>
                                <Eye className="h-3 w-3" />
                                Published
                              </>
                            ) : (
                              <>
                                <EyeOff className="h-3 w-3" />
                                Draft
                              </>
                            )}
                          </button>
                        </form>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/blog/${post.id}`}
                            className="p-2 rounded-lg bg-navy-base border border-border-flat/10 text-text-off-white/70 hover:bg-navy-light hover:text-text-pure transition-colors"
                            title="Edit article"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </Link>

                          <DeleteButton
                            id={post.id}
                            itemName={post.title}
                            deleteAction={deleteBlogPost}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
