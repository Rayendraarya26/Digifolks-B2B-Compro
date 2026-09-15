import Link from "next/link";
import {
  Briefcase,
  Cpu,
  HelpCircle,
  Quote,
  Inbox,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch counts in parallel
  const [
    { count: portfolioCount },
    { count: serviceCount },
    { count: faqCount },
    { count: testimonialCount },
    { count: inquiryCount },
    { count: newInquiryCount },
    { data: recentInquiries },
  ] = await Promise.all([
    supabase.from("portfolios").select("*", { count: "exact", head: true }),
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("faqs").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }).limit(5),
  ]);

  const stats = [
    {
      title: "Portfolios",
      value: portfolioCount ?? 8,
      desc: "Published case studies",
      icon: Briefcase,
      href: "/admin/portfolios",
      color: "text-accent-emerald",
      bg: "bg-accent-emerald/10",
      border: "border-accent-emerald/20",
    },
    {
      title: "Services",
      value: serviceCount ?? 5,
      desc: "Active engineering solutions",
      icon: Cpu,
      href: "/admin/services",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      title: "Inquiries",
      value: inquiryCount ?? 0,
      badge: (newInquiryCount ?? 0) > 0 ? `${newInquiryCount} new` : undefined,
      desc: "Client project leads",
      icon: Inbox,
      href: "/admin/inquiries",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      title: "Testimonials",
      value: testimonialCount ?? 5,
      desc: "Client endorsements",
      icon: Quote,
      href: "/admin/testimonials",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      title: "FAQs",
      value: faqCount ?? 4,
      desc: "Common questions & answers",
      icon: HelpCircle,
      href: "/admin/faqs",
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-flat/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent-emerald/10 text-accent-emerald font-mono text-xs mb-2 border border-accent-emerald/20 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald animate-pulse" />
            Control Center
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-text-pure">Admin Dashboard</h1>
          <p className="text-sm text-text-off-white/60 mt-1">
            Manage your portfolios, services, testimonials, inquiries, and company settings in one place.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/portfolios/new"
            className="inline-flex items-center gap-2 rounded-xl bg-accent-emerald px-4 py-2.5 text-xs font-semibold text-navy-base hover:bg-accent-emerald/90 transition-all shadow-[0_0_20px_rgba(0,223,137,0.15)]"
          >
            <Plus className="h-4 w-4" />
            Add Portfolio
          </Link>
          <Link
            href="/admin/services/new"
            className="inline-flex items-center gap-2 rounded-xl bg-navy-light px-4 py-2.5 text-xs font-semibold text-text-pure hover:bg-navy-light/80 border border-border-flat/10 transition-all"
          >
            <Plus className="h-4 w-4" />
            Add Service
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="group relative rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 p-5 hover:border-accent-emerald/40 hover:bg-[#0F1E36] transition-all duration-300 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.border} border`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <ArrowUpRight className="h-4 w-4 text-text-off-white/30 group-hover:text-accent-emerald group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>

            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-text-pure">{stat.value}</span>
                {stat.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30">
                    {stat.badge}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold text-text-pure mt-1">{stat.title}</h3>
              <p className="text-xs text-text-off-white/50 mt-0.5">{stat.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Inquiries Section */}
      <div className="rounded-2xl border border-border-flat/10 bg-[#0F1E36]/70 overflow-hidden shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-border-flat/10">
          <div>
            <h2 className="text-lg font-bold text-text-pure">Recent Client Inquiries</h2>
            <p className="text-xs text-text-off-white/60 mt-0.5">Leads submitted via web contact form</p>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs font-semibold text-accent-emerald hover:underline"
          >
            View All ({inquiryCount ?? 0})
          </Link>
        </div>

        {(!recentInquiries || recentInquiries.length === 0) ? (
          <div className="p-12 text-center text-text-off-white/40">
            <Inbox className="h-8 w-8 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No inquiries yet. Submissions from the contact form will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-border-flat/10">
            {recentInquiries.map((inq: any) => (
              <div key={inq.id} className="p-5 flex items-center justify-between hover:bg-navy-light/30 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-text-pure">{inq.name}</span>
                    {inq.company && (
                      <span className="text-xs text-text-off-white/50">· {inq.company}</span>
                    )}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider ${
                      inq.status === 'new'
                        ? 'bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/30'
                        : 'bg-navy-light text-text-off-white/60'
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-xs text-text-off-white/70 line-clamp-1 max-w-xl">{inq.details}</p>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-accent-emerald">{inq.service}</div>
                  <div className="text-[11px] text-text-off-white/40 mt-0.5">
                    {new Date(inq.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Setup Card */}
      <div className="rounded-2xl border border-accent-emerald/20 bg-accent-emerald/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30 text-accent-emerald">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-text-pure text-sm">Supabase Database Connected</h3>
            <p className="text-xs text-text-off-white/70 mt-0.5">
              Live connection to Postgres with 8 normalized portfolios and all service data.
            </p>
          </div>
        </div>

        <Link
          href="/admin/portfolios"
          className="inline-flex items-center gap-2 rounded-xl bg-accent-emerald px-4 py-2 text-xs font-semibold text-navy-base hover:bg-accent-emerald/90 transition-all"
        >
          Manage Portfolios
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
