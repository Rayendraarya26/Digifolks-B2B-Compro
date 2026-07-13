import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import fs from "fs";
import path from "path";

const allProjects = [
  {
    slug: "gorillacoach",
    title: "Integrated Web e-Commerce & POS System",
    client: "GorillaCoachID",
    industry: "Retail / E-Commerce",
    duration: "On Going",
    year: "2026",
    metric: "3-in-1",
    metricLabel: "Unified Platform (POS + Store + Back Office)",
    tags: ["Next.js", "Node.js", "PostgreSQL", "POS Integration", "Real-time Sync"],
    overview: "GorillaCoachID managed retail sales, online orders, inventory, and business operations through separate systems, creating data inconsistencies, duplicate administrative work, and limited visibility into overall business performance. They needed a unified platform to centralize all operations.",
    challenges: [
      "Data inconsistencies across separate retail sales and online order systems.",
      "Duplicate administrative work due to disconnected inventory and customer databases.",
      "Limited visibility into overall business performance without a centralized dashboard.",
      "No real-time synchronization between online and offline sales channels.",
    ],
    solutions: [
      "Developed an integrated business platform combining Point of Sale (POS), Online Store, and Back Office Management into a single ecosystem.",
      "Implemented real-time synchronization of sales transactions, inventory, product catalogs, and customer information across all channels.",
      "Built a centralized administrative dashboard for monitoring business performance and managing daily operations.",
      "Delivered a seamless purchasing experience for customers across online and offline channels.",
    ],
    results: [
      { value: "3-in-1", label: "Unified Platform" },
      { value: "Real-time", label: "Data Sync" },
      { value: "100%", label: "Channel Coverage" },
      { value: "1", label: "Central Dashboard" },
    ]
  },
  {
    slug: "wecore",
    title: "Professional Agency Company Profile",
    client: "Wisesa Cipta Karsa (We Core)",
    industry: "Creative Agency",
    duration: "Completed",
    year: "2026",
    metric: "SEO",
    metricLabel: "Search Engine Optimized",
    tags: ["Next.js", "WebGL", "UI/UX Strategy", "SEO", "Conversion Optimization"],
    overview: "We Core struggled with low conversion rates due to a static, slow-loading website that failed to capture professional credibility. Potential clients lost interest before engaging with the content, resulting in missed business opportunities.",
    challenges: [
      "Low conversion rates due to static and slow-loading website design.",
      "Failed to capture professional credibility through the existing digital presence.",
      "Potential clients lost interest before engaging with the content.",
      "Poor search engine visibility limiting organic discovery by prospects.",
    ],
    solutions: [
      "Implemented a conversion-oriented UI/UX strategy combined with technical optimizations for page speed.",
      "Streamlined navigation architecture for prospective clients to quickly find relevant information.",
      "Boosted search engine visibility through optimized content architecture and SEO best practices.",
      "Transformed the website into an active marketing tool that converts traffic into high-potential business leads.",
    ],
    results: [
      { value: "SEO", label: "Optimized" },
      { value: "Fast", label: "Page Load" },
      { value: "High", label: "Conversion Rate" },
      { value: "Pro", label: "Brand Credibility" },
    ]
  },
  {
    slug: "kazeer",
    title: "Next-Generation FnB POS & AI Business Consultant",
    client: "Kazeer Solusi Digital",
    industry: "Food & Beverage",
    duration: "Completed",
    year: "2026",
    metric: "AI",
    metricLabel: "Integrated Business Consultant",
    tags: ["Next.js", "AI Chatbot", "WhatsApp API", "Payment Gateway", "Business Analytics"],
    overview: "Kazeer's POS system development was stalled by their previous vendor, resulting in unstable source code, a broken core ordering flow, and asynchronous frontend-backend communication that rendered the application non-functional. They needed a complete code overhaul.",
    challenges: [
      "POS system development stalled by the previous vendor with unstable source code.",
      "Broken core ordering flow rendering the application non-functional.",
      "Asynchronous frontend-backend communication causing data inconsistencies.",
      "No AI-driven analytics for business decision-making and operational insights.",
    ],
    solutions: [
      "Performed complete code overhaul and application optimization to stabilize the system.",
      "Refined the open-bill ordering flow for seamless FnB transaction management.",
      "Integrated a local payment gateway for automated transaction processing.",
      "Embedded an AI Business Consultant Chatbot via WhatsApp for automated turnover analysis, stock tracking, P&L reporting, and real-time COGS estimation.",
    ],
    results: [
      { value: "AI", label: "Business Consultant" },
      { value: "Auto", label: "Payment Processing" },
      { value: "Real-time", label: "COGS Estimation" },
      { value: "WhatsApp", label: "Integrated" },
    ]
  },
  {
    slug: "homestay",
    title: "Digital Tourism Catalog & Management Platform",
    client: "Homestaydijogja.Id",
    industry: "Tourism",
    duration: "Completed",
    year: "2026",
    metric: "Local",
    metricLabel: "SEO Focused Platform",
    tags: ["Custom CMS", "Local SEO", "Responsive Architecture", "Real-time Updates"],
    overview: "Local accommodation providers in Yogyakarta lacked a centralized digital presence, forcing them to rely heavily on third-party booking platforms with high commission fees that eroded their profit margins. They needed an independent digital catalog.",
    challenges: [
      "No centralized digital presence for local accommodation providers in Yogyakarta.",
      "Heavy reliance on third-party booking platforms with high commission fees.",
      "Eroding profit margins due to platform dependency costs.",
      "Managers lacked full control over their property content and pricing updates.",
    ],
    solutions: [
      "Developed a high-performance digital catalog focused on local SEO and user-centric navigation.",
      "Integrated a custom CMS enabling real-time updates for unit details, amenities, and pricing.",
      "Built with a lightweight and responsive architecture ensuring rapid access for travelers.",
      "Created a powerful independent alternative to third-party platform dependencies.",
    ],
    results: [
      { value: "Local", label: "SEO Optimized" },
      { value: "CMS", label: "Custom Built" },
      { value: "Fast", label: "Access Speed" },
      { value: "0%", label: "Commission Fees" },
    ]
  },
  {
    slug: "kawan-kita-semua",
    title: "Smart Aquaculture Decision Support System",
    client: "PT Kawan Kita Semua",
    industry: "Aquaculture",
    duration: "On Going",
    year: "2026",
    metric: "AI",
    metricLabel: "Driven Precision Insights",
    tags: ["AI Analytics", "IoT Monitoring", "Real-time Dashboard", "Inventory Management"],
    overview: "Shrimp farmers faced significant risks of harvest failure due to unmonitored water quality parameters and the difficulty of generating accurate growth predictions from data often skewed by outliers. They needed a centralized digital command center with AI capabilities.",
    challenges: [
      "Significant risks of harvest failure due to unmonitored water quality parameters.",
      "Difficulty generating accurate growth predictions from data skewed by outliers.",
      "No centralized system for integrating daily operational data (feed, water quality, sampling).",
      "Lack of early environmental risk detection and cultivation strategy optimization.",
    ],
    solutions: [
      "Engineered a comprehensive digital ecosystem digitizing the entire shrimp farming lifecycle with real-time water quality monitoring.",
      "Integrated AI to analyze multidimensional relationships between environmental variables and shrimp biomass for high-precision managerial insights.",
      "Built atomic inventory management to prevent race conditions in stock tracking.",
      "Implemented an automated risk dashboard ensuring operational efficiency and biological stability throughout every cultivation cycle.",
    ],
    results: [
      { value: "AI", label: "Precision Analytics" },
      { value: "24/7", label: "Water Monitoring" },
      { value: "Atomic", label: "Inventory Mgmt" },
      { value: "Auto", label: "Risk Detection" },
    ]
  },
  {
    slug: "positive-strength",
    title: "Scalable Business Website",
    client: "Positive Strength",
    industry: "Fitness",
    duration: "Completed",
    year: "2025",
    metric: "∞",
    metricLabel: "Scalable Architecture",
    tags: ["Scalable Architecture", "Flexible CMS", "Modular Design", "Performance"],
    overview: "Positive Strength, a gym equipment supplier, encountered critical technical bottlenecks and site crashes during high-traffic growth phases, leading to lost sales opportunities and a degraded brand reputation. They needed a future-proof digital foundation.",
    challenges: [
      "Critical technical bottlenecks during high-traffic growth phases.",
      "Site crashes leading to lost sales opportunities.",
      "Degraded brand reputation due to unreliable platform performance.",
      "No elastic capacity to handle expanding market reach without compromising performance.",
    ],
    solutions: [
      "Engineered a robust web infrastructure utilizing scalable architecture for consistent stability.",
      "Implemented a flexible CMS empowering the client with autonomous catalog control.",
      "Ensured consistent platform stability during traffic surges with elastic capacity.",
      "Prioritized modular design so future feature expansions can be integrated seamlessly without rebuilding the core system.",
    ],
    results: [
      { value: "∞", label: "Scalability" },
      { value: "99.9%", label: "Uptime" },
      { value: "CMS", label: "Autonomous Control" },
      { value: "Modular", label: "Architecture" },
    ]
  },
  {
    slug: "digital-assessment",
    title: "Introduction to Company Culture: Digital Assessment",
    client: "TMMIN",
    industry: "Human Resources",
    duration: "Completed",
    year: "2025",
    metric: "100%",
    metricLabel: "Automated Scoring",
    tags: ["Assessment Platform", "Automated Scoring", "Analytics Dashboard", "Question Bank"],
    isProposal: true,
    overview: "Traditional evaluation methods at the organization were plagued by labor-intensive administration and inherent human bias, leading to inconsistent results and fragmented data that hindered objective performance tracking.",
    challenges: [
      "Labor-intensive administration of traditional evaluation methods.",
      "Inherent human bias leading to inconsistent assessment results.",
      "Fragmented data hindering objective performance tracking.",
      "No centralized framework for automating complex scoring workflows.",
    ],
    solutions: [
      "Developed a web-based assessment application to digitize the entire employee evaluation lifecycle.",
      "Integrated comprehensive question bank management with automated scoring engine.",
      "Built real-time analytical dashboards for data-driven insights.",
      "Eliminated manual administrative bottlenecks and enhanced data integrity for objective decision-making.",
    ],
    results: [
      { value: "100%", label: "Automated Scoring" },
      { value: "Real-time", label: "Analytics" },
      { value: "Zero", label: "Manual Bottlenecks" },
      { value: "Data", label: "Driven Decisions" },
    ]
  },
  {
    slug: "malaka",
    title: "Integrated Learning Platform (Malaka Project)",
    client: "Malaka Project",
    industry: "Education",
    duration: "Completed",
    year: "2025",
    metric: "All-in-1",
    metricLabel: "Learning Ecosystem",
    tags: ["Video Streaming", "Classroom Management", "Assessment Tools", "Unified Portal"],
    isProposal: true,
    overview: "The digital educational ecosystem was fragmented, forcing users to navigate between disconnected platforms for course materials, classroom management, and examinations. This led to a disjointed and frustrating learning experience that hurt engagement.",
    challenges: [
      "Fragmented digital educational ecosystem with disconnected platforms.",
      "Users forced to navigate between separate systems for course materials, classroom management, and exams.",
      "Disjointed and frustrating learning experience reducing engagement.",
      "No unified environment consolidating the entire educational lifecycle.",
    ],
    solutions: [
      "Engineered an integrated digital ecosystem merging high-quality video streaming, classroom management, and assessment tools into a unified portal.",
      "Consolidated the full user journey ensuring a seamless transition from registration to evaluation.",
      "Designed with centralized architecture to simplify operational control.",
      "Significantly improved user engagement and retention through a unified learning experience.",
    ],
    results: [
      { value: "All-in-1", label: "Unified Platform" },
      { value: "HD", label: "Video Streaming" },
      { value: "Seamless", label: "User Journey" },
      { value: "High", label: "Engagement" },
    ]
  },
];

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = allProjects.find(p => p.slug === slug) || allProjects[0];

  const publicDir = path.join(process.cwd(), "public", "Image", "Portfolio", project.slug);
  let galleryImages: string[] = [];
  let coverImage = `/Image/Portfolio/${project.slug}/cover.png`; // Fallback

  try {
    const files = fs.readdirSync(publicDir);

    // Dynamically find cover image (.png, .jpg, .jpeg, .webp)
    const coverFile = files.find(f => f.startsWith("cover.") && f.match(/\.(png|jpe?g|webp)$/i));
    if (coverFile) {
      coverImage = `/Image/Portfolio/${project.slug}/${coverFile}`;
    }

    galleryImages = files
      .filter((file) => file.startsWith("gallery-") && file.match(/\.(png|jpe?g|webp)$/i))
      .sort()
      .map((file) => `/Image/Portfolio/${project.slug}/${file}`);
  } catch (err) {
    // Directory might not exist or no images yet
  }

  return (
    <div className="flex w-full flex-col min-h-screen bg-navy-base">

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-navy-base overflow-hidden">
        {/* Soft blur circle top left */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#10B981]/5 rounded-full blur-[200px] pointer-events-none mix-blend-screen" />
        <div className="absolute w-96 h-96 border border-accent-emerald/5 rounded-full -top-32 -right-32" />
        <div className="absolute w-64 h-64 border border-border-flat/5 rounded-full bottom-0 left-16" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <Link href="/work" className="inline-flex items-center text-text-off-white/50 hover:text-text-pure mb-8 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Studi Kasus
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-3 mb-6 items-center">
              {project.isProposal && (
                <span className="px-3 py-1.5 rounded-lg border border-[#10B981]/40 bg-[#10B981]/10 text-[10px] md:text-xs font-mono text-accent-emerald shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  Professional Portfolio for Stakeholder Proposals
                </span>
              )}
              <span className="px-3 py-1 rounded-full border border-border-flat/20 text-xs font-mono text-text-off-white/70 uppercase tracking-wider">
                {project.client}
              </span>
              <span className="px-3 py-1 rounded-full border border-accent-emerald/30 bg-accent-emerald/10 text-xs font-mono text-accent-emerald uppercase tracking-wider">
                {project.industry}
              </span>
              <span className="px-3 py-1 rounded-full border border-border-flat/20 text-xs font-mono text-text-off-white/70 uppercase tracking-wider">
                {project.year}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="text-3xl md:text-5xl font-bold text-text-pure mb-6 leading-tight max-w-4xl">
              {project.title}
            </h1>
          </Reveal>

          {/* Results Grid in Hero */}
          {/*<Reveal delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {project.results.map((r, i) => (
                <div key={i} className="bg-navy-light/50 backdrop-blur-sm border border-border-flat/10 rounded-xl p-5">
                  <div className="text-3xl md:text-4xl font-bold text-accent-emerald mb-1">{r.value}</div>
                  <div className="text-xs text-text-off-white/50 uppercase tracking-wider">{r.label}</div>
                </div>
              ))}
            </div>
          </Reveal>*/}
        </div>
      </section>

      {/* Content */}
      <div className="bg-bg-ice-blue flex-grow relative z-10 border-t border-border-flat/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">

            {/* Main Content */}
            <div className="md:col-span-8 space-y-16">
              <Reveal>
                <section>
                  <h2 className="text-sm font-bold text-accent-forest uppercase tracking-widest mb-4">Overview</h2>
                  <p className="text-lg text-text-muted leading-relaxed">
                    {project.overview}
                  </p>
                </section>
              </Reveal>

              <Reveal delay={0.1}>
                <section>
                  <h2 className="text-sm font-bold text-accent-forest uppercase tracking-widest mb-6">The Challenge</h2>
                  <div className="space-y-4">
                    {project.challenges.map((c, i) => (
                      <div key={i} className="flex gap-4 items-start p-4 bg-bg-pure rounded-xl border border-border-flat">
                        <div className="w-6 h-6 rounded-full bg-bg-terang-cool flex items-center justify-center flex-shrink-0 mt-0.5 border border-border-flat">
                          <span className="text-xs font-bold text-navy-base">{i + 1}</span>
                        </div>
                        <p className="text-text-muted leading-relaxed">{c}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>

              <Reveal delay={0.2}>
                <section>
                  <h2 className="text-sm font-bold text-accent-forest uppercase tracking-widest mb-6">Our Solution</h2>
                  <div className="space-y-4">
                    {project.solutions.map((s, i) => (
                      <div key={i} className="flex gap-4 items-start p-4 bg-accent-forest/5 rounded-xl border border-accent-forest/20">
                        <CheckCircle2 className="w-5 h-5 text-accent-forest mt-0.5 flex-shrink-0" />
                        <p className="text-text-muted leading-relaxed">{s}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </Reveal>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-4">
              <Reveal delay={0.3}>
                <div className="sticky top-28 space-y-6">
                  {/* Project Info */}
                  <div className="bg-bg-pure border border-border-flat rounded-2xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-navy-base uppercase tracking-wider mb-6">Project Info</h3>
                    <dl className="space-y-4">
                      <div className="flex justify-between">
                        <dt className="text-sm text-text-muted">Client</dt>
                        <dd className="text-sm font-medium text-navy-base">{project.client}</dd>
                      </div>
                      <div className="border-t border-border-flat" />
                      <div className="flex justify-between">
                        <dt className="text-sm text-text-muted">Industry</dt>
                        <dd className="text-sm font-medium text-navy-base">{project.industry}</dd>
                      </div>
                      <div className="border-t border-border-flat" />
                      <div className="flex justify-between">
                        <dt className="text-sm text-text-muted">Duration</dt>
                        <dd className="text-sm font-medium text-navy-base">{project.duration}</dd>
                      </div>
                      <div className="border-t border-border-flat" />
                      <div className="flex justify-between">
                        <dt className="text-sm text-text-muted">Year</dt>
                        <dd className="text-sm font-medium text-navy-base">{project.year}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Tech Stack */}
                  <div className="bg-bg-pure border border-border-flat rounded-2xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-navy-base uppercase tracking-wider mb-4">Tech Stack & Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 text-xs font-mono bg-[#1e293b]/5 text-text-muted rounded-lg border border-border-flat">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-navy-base border border-border-flat/10 rounded-2xl p-6 text-text-pure">
                    <h4 className="font-bold mb-2">Ingin hasil serupa?</h4>
                    <p className="text-sm text-text-off-white/80 mb-4">Ceritakan tantangan bisnis Anda dan kami akan merancang solusinya.</p>
                    <Link href="/contact" tabIndex={-1}>
                      <Button className="w-full">
                        Jadwalkan Konsultasi
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* Project Gallery */}
      <section className="py-20 bg-bg-ice-blue border-t border-border-flat">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12">
              <h2 className="text-sm font-bold text-accent-forest uppercase tracking-widest mb-4">Project Gallery</h2>
              <p className="text-text-muted text-lg">Visual showcase dari proyek yang telah kami kerjakan.</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {/* Cover Image — Full Width */}
            <div className="rounded-2xl overflow-hidden border border-border-flat shadow-lg mb-6 bg-navy-base">
              <img
                src={coverImage}
                alt={`${project.title} — Cover`}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            {/* Gallery Grid — Masonry Layout */}
            {galleryImages.length > 0 && (
              <div className="columns-1 md:columns-2 gap-6 space-y-6">
                {galleryImages.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl overflow-hidden border border-border-flat shadow-sm bg-navy-base relative group break-inside-avoid"
                  >
                    <img
                      src={imgSrc}
                      alt={`${project.title} — Screenshot ${idx + 1}`}
                      className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-base/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
