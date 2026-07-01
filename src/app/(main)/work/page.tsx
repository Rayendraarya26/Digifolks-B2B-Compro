import { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio — Real Systems Built for Real Problems",
  description: "Explore case studies of scalable systems solving operational bottlenecks, data complexity, and business growth challenges.",
};

const cases = [
  {
    slug: "fleet-tracking",
    partner: "Logistics Corp",
    industry: "Supply Chain",
    title: "Real-time Fleet Tracking & Route Optimization System",
    metric: "40%",
    metricLabel: "Fuel Efficiency",
    tags: ["IoT", "Real-time", "Optimization"],
  },
  {
    slug: "fintech-core",
    partner: "Fintech Startup",
    industry: "Financial Services",
    title: "High-Volume Transaction Processing Core",
    metric: "99.99%",
    metricLabel: "Uptime",
    tags: ["Microservices", "Kafka", "High-availability"],
  },
  {
    slug: "qa-dashboard",
    partner: "Manufacturing Co",
    industry: "Industry 4.0",
    title: "Automated Production QA Dashboard",
    metric: "+85%",
    metricLabel: "Defect Detection",
    tags: ["Computer Vision", "Dashboard", "Automation"],
  },
  {
    slug: "patient-data",
    partner: "Healthcare Provider",
    industry: "MedTech",
    title: "Unified Patient Data Management",
    metric: "10x",
    metricLabel: "Data Retrieval",
    tags: ["HIPAA", "Distributed Systems", "Migration"],
  },
  {
    slug: "ecommerce-platform",
    partner: "Retail Enterprise",
    industry: "E-Commerce",
    title: "Omnichannel Commerce Platform",
    metric: "3x",
    metricLabel: "Revenue Growth",
    tags: ["Next.js", "Headless CMS", "Analytics"],
  },
  {
    slug: "smart-warehouse",
    partner: "Distribution Co",
    industry: "Warehousing",
    title: "Smart Warehouse Management System",
    metric: "60%",
    metricLabel: "Faster Fulfillment",
    tags: ["RFID", "Automation", "Real-time"],
  },
];

export default function PortfoliosPage() {
  return (
    <div className="flex w-full flex-col min-h-screen bg-bg-ice-blue pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-emerald/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-40 left-0 w-[800px] h-[800px] bg-[#10B981]/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Header */}
        <Reveal>
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-navy-base mb-6">
              Real Systems. <br className="hidden md:block"/>Real Impact.
            </h1>
            <p className="text-xl text-text-muted max-w-3xl">
              Kami berkolaborasi dengan enterprise untuk memecahkan kompleksitas operasional melalui rekayasa perangkat lunak yang presisi.
            </p>
          </div>
        </Reveal>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((study, idx) => (
            <Reveal key={idx} delay={0.05 * idx}>
              <Link href={`/work/${study.slug}`} className="group block h-full">
                <div className="h-full bg-bg-pure border border-border-flat rounded-2xl overflow-hidden hover:border-accent-forest/30 hover:shadow-2xl transition-all duration-300 flex flex-col">
                  {/* Card Header Visual: Dashboard Mockup */}
                  <div className="aspect-[16/10] bg-navy-base relative overflow-hidden flex items-center justify-center p-6">
                    {/* Dashboard Mockup UI */}
                    <div className="w-full h-full border border-navy-light rounded-t-lg bg-[#0F172A] relative flex flex-col pt-3 px-4 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <div className="flex gap-1.5 mb-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-border-flat/10"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-border-flat/10"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-border-flat/10"></div>
                      </div>
                      <div className="flex-1 bg-navy-light rounded-t-md opacity-50 relative overflow-hidden">
                        {/* Overlay fade-out */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy-base" />
                      </div>
                    </div>
                    
                    {/* Metric overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                      <div className="text-6xl font-bold text-accent-emerald mb-1 drop-shadow-md">{study.metric}</div>
                      <div className="text-sm text-text-pure/80 uppercase tracking-widest font-mono drop-shadow-md">{study.metricLabel}</div>
                    </div>

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