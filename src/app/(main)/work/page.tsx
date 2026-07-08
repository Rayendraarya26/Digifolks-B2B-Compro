import { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowUpRight } from "lucide-react";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Portfolio — Real Systems Built for Real Problems",
  description: "Explore case studies of scalable systems solving operational bottlenecks, data complexity, and business growth challenges.",
};

const cases = [
  {
    slug: "gorillacoach",
    partner: "GorillaCoachID",
    industry: "Retail / E-Commerce",
    title: "Integrated Web e-Commerce & POS System",
    metric: "3-in-1",
    metricLabel: "Unified Platform",
    tags: ["Next.js", "Node.js", "POS Integration"],
  },
  {
    slug: "wecore",
    partner: "We Core",
    industry: "Creative Agency",
    title: "Professional Agency Company Profile",
    metric: "SEO",
    metricLabel: "Optimized",
    tags: ["Next.js", "WebGL", "UI/UX Strategy"],
  },
  {
    slug: "kazeer",
    partner: "Kazeer Solusi Digital",
    industry: "Food & Beverage",
    title: "Next-Generation FnB POS & AI Business Consultant",
    metric: "AI",
    metricLabel: "Integrated",
    tags: ["AI Chatbot", "WhatsApp API", "Payment Gateway"],
  },
  {
    slug: "homestay",
    partner: "Homestaydijogja.Id",
    industry: "Tourism",
    title: "Digital Tourism Catalog & Management Platform",
    metric: "Local",
    metricLabel: "SEO Focused",
    tags: ["Custom CMS", "SEO", "Responsive"],
  },
  {
    slug: "kawan-kita-semua",
    partner: "PT Kawan Kita Semua",
    industry: "Aquaculture",
    title: "Smart Aquaculture Decision Support System",
    metric: "AI",
    metricLabel: "Driven Insights",
    tags: ["AI Analytics", "IoT", "Real-time Monitoring"],
  },
  {
    slug: "positive-strength",
    partner: "Positive Strength",
    industry: "Fitness",
    title: "Scalable Business Website",
    metric: "∞",
    metricLabel: "Scalable",
    tags: ["Scalable Architecture", "CMS", "Modular Design"],
  },
  {
    slug: "digital-assessment",
    partner: "TMMIN",
    industry: "Human Resources",
    title: "Introduction to Company Culture: Digital Assessment",
    metric: "100%",
    metricLabel: "Automated",
    tags: ["Assessment Platform", "Analytics", "Automation"],
    isProposal: true,
  },
  {
    slug: "malaka",
    partner: "Malaka Project",
    industry: "Education",
    title: "Integrated Learning Platform",
    metric: "All-in-1",
    metricLabel: "Learning Ecosystem",
    tags: ["Video Streaming", "LMS", "Assessment Tools"],
    isProposal: true,
  },
];

export default function PortfoliosPage() {
  const getCoverImage = (slug: string) => {
    try {
      const publicDir = path.join(process.cwd(), "public", "Image", "Portfolio", slug);
      const files = fs.readdirSync(publicDir);
      const cover = files.find(f => f.startsWith("cover.") && f.match(/\.(png|jpe?g|webp)$/i));
      return cover ? `/Image/Portfolio/${slug}/${cover}` : `/Image/Portfolio/${slug}/cover.png`;
    } catch {
      return `/Image/Portfolio/${slug}/cover.png`;
    }
  };

  return (
    <div className="flex w-full flex-col min-h-screen bg-bg-ice-blue pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-emerald/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-40 left-0 w-[800px] h-[800px] bg-[#10B981]/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Header */}
        <Reveal>
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-navy-base mb-6">
              Real Systems. <br className="hidden md:block" />Real Impact.
            </h1>
            <p className="text-xl text-text-muted max-w-3xl">
              Kami berkolaborasi dengan enterprise untuk memecahkan kompleksitas operasional melalui rekayasa perangkat lunak yang presisi.
            </p>
          </div>
        </Reveal>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((study, idx) => (
            <Reveal key={idx} delay={0.05 * idx} className="h-full">
              <Link href={`/work/${study.slug}`} className="group block h-full">
                <div className="h-full bg-bg-pure border border-border-flat rounded-2xl overflow-hidden hover:border-accent-forest/30 hover:shadow-2xl transition-all duration-300 flex flex-col">
                  {/* Card Header Visual: Project Image */}
                  <div className="aspect-[16/10] bg-navy-base relative overflow-hidden">
                    <img
                      src={getCoverImage(study.slug)}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-base/60 via-transparent to-transparent" />

                    {/* Proposal Badge */}
                    {study.isProposal && (
                      <div className="absolute top-4 left-4 bg-[#10B981]/70 text-white text-[9px] sm:text-[10px] font-mono px-2.5 py-1 rounded-md backdrop-blur-md z-10 shadow-lg border border-[#10B981]/50">
                        Professional Portfolio for Stakeholder Proposals
                      </div>
                    )}

                    {/* Hover arrow */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-navy-base/50 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 border border-navy-light">
                      <ArrowUpRight className="w-4 h-4 text-accent-emerald" />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono text-text-muted uppercase tracking-wider">{study.partner}</span>
                      <span className="text-text-muted/30">·</span>
                      <span className="text-xs font-medium text-accent-forest uppercase tracking-wider">{study.industry}</span>
                    </div>

                    <h2 className="text-lg font-bold text-navy-base mb-4 leading-snug group-hover:text-accent-forest transition-colors duration-300 flex-1">
                      {study.title}
                    </h2>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border-flat">
                      {study.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 text-xs font-mono bg-[#1e293b]/5 text-text-muted border border-border-flat rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}