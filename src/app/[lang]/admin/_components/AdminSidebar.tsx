"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Cpu,
  Quote,
  HelpCircle,
  Dna,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Portfolios", href: "/admin/portfolios", icon: Briefcase },
  { name: "Services", href: "/admin/services", icon: Cpu },
  { name: "Blog Posts", href: "/admin/blog", icon: BookOpen },
  { name: "Inquiries", href: "/admin/inquiries", icon: Inbox },
  { name: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { name: "Team DNA", href: "/admin/team-dna", icon: Dna },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border-flat/10 bg-navy-base shadow-2xl">
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-border-flat/10 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-emerald/10 border border-accent-emerald/30 text-accent-emerald font-mono font-bold text-sm">
            DF
          </div>
          <div>
            <span className="font-bold tracking-tight text-text-pure text-sm block">Digifolks</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-emerald block">B2B Admin</span>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 px-3 py-6 overflow-y-auto">
        {navigation.map((item) => {
          const normalizedPath = pathname.replace(/^\/(en|id)/, "") || "/admin";
          const isActive =
            item.href === "/admin"
              ? normalizedPath === "/admin" || normalizedPath === ""
              : normalizedPath.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.08)]"
                  : "text-text-off-white/70 hover:bg-navy-light/60 hover:text-text-pure"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={`h-4 w-4 transition-colors ${
                    isActive ? "text-accent-emerald" : "text-text-off-white/50 group-hover:text-text-pure"
                  }`}
                />
                <span>{item.name}</span>
              </div>
              {isActive && (
                <ChevronRight className="h-3.5 w-3.5 text-accent-emerald" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Quick Links & Logout */}
      <div className="border-t border-border-flat/10 p-4 space-y-2">
        <Link
          href="/en"
          target="_blank"
          className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-text-off-white/60 hover:bg-navy-light hover:text-text-pure transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="h-3.5 w-3.5" />
            Live Website
          </span>
          <span className="text-[10px] font-mono text-accent-emerald">/en</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-medium text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
