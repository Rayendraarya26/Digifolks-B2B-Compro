import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { AiCapabilities } from "@/components/ui/AiCapabilities";
import { ChevronDown, ArrowRight, Code, Server, Shield, LayoutTemplate, Database, Cpu, ArrowUpRight, Users, Rocket, Lightbulb, TrendingUp, CheckCircle2, Globe, Smartphone, Briefcase } from "lucide-react";
import fs from "fs";
import path from "path";
import { getPortfolios, getBlogPosts, getServices } from "@/lib/supabase/queries";
import { getDictionary } from "@/lib/dictionaries";

// Helper for dynamic cover image resolution
const getCoverImage = (slug: string) => {
  const exts = ['.webp', '.png', '.jpg', '.jpeg'];
  for (const ext of exts) {
    const filePath = path.join(process.cwd(), 'public', 'Image', 'Portfolio', slug, `cover${ext}`);
    if (fs.existsSync(filePath)) {
      return `/Image/Portfolio/${slug}/cover${ext}`;
    }
  }
  return `/Image/Portfolio/${slug}/cover.png`; // Fallback
};

const getHomeServiceIcon = (slug: string, className = "w-9 h-9") => {
  switch (slug) {
    case 'svc-ai':
      return <Cpu className={`${className} text-accent-emerald mb-4 group-hover:scale-110 transition-transform duration-300`} />;
    case 'svc-mgmt':
      return <Database className={`${className} text-accent-emerald mb-4 group-hover:scale-110 transition-transform duration-300`} />;
    case 'svc-web':
      return <Globe className={`${className} text-accent-emerald mb-4 group-hover:scale-110 transition-transform duration-300`} />;
    case 'svc-apps':
      return <Smartphone className={`${className} text-accent-emerald mb-4 group-hover:scale-110 transition-transform duration-300`} />;
    case 'svc-it':
      return <Briefcase className={`${className} text-accent-emerald mb-4 group-hover:scale-110 transition-transform duration-300`} />;
    default:
      return <Code className={`${className} text-accent-emerald mb-4`} />;
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const dict = await getDictionary(lang as 'en' | 'id');
  const seo = dict.seo?.home || {
    title: "Build Scalable Operational Systems",
    description: "We design and develop scalable systems that reduce operational complexity, improve reliability, and support long-term business growth.",
  };
  const url = `/${lang}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
      languages: {
        en: '/en',
        id: '/id',
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: url,
      type: "website",
      images: [
        {
          url: "/Dih.webp",
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang || 'en') as 'en' | 'id';
  const dict = await getDictionary(lang);
  const t = dict.home;
  const prefix = `/${lang}`;

  const [portfolios, blogResult, dbServices] = await Promise.all([
    getPortfolios(),
    getBlogPosts({ limit: 3 }),
    getServices(),
  ]);
  const latestPosts = blogResult.posts || [];

  const defaultServices = [
    { slug: 'svc-ai', num: 1, title: 'Artificial Intelligence', short_desc: 'AI-powered systems for automation, prediction, and data-driven decision making.', tech_stack: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI'] },
    { slug: 'svc-mgmt', num: 2, title: 'Management System', short_desc: 'Custom operational systems to streamline workflows and centralize business processes.', tech_stack: ['React', 'Node.js', 'PostgreSQL', 'Docker'] },
    { slug: 'svc-web', num: 3, title: 'Web Platforms', short_desc: 'Scalable web systems built for performance, stability, and growth.', tech_stack: ['Next.js', 'TailwindCSS', 'Framer Motion', 'Three.js'] },
    { slug: 'svc-apps', num: 4, title: 'iOS, Android, Desktop', short_desc: 'Cross-platform applications designed for operational efficiency and usability.', tech_stack: ['React Native', 'Flutter', 'Swift', 'Electron'] },
    { slug: 'svc-it', num: 5, title: 'IT Solution & Consulting', short_desc: 'System architecture planning and technical consulting for scalable infrastructure.', tech_stack: ['AWS', 'Google Cloud', 'Kubernetes', 'Linux'] },
  ];

  const sourceServices = (dbServices.length > 0 ? dbServices : defaultServices).slice(0, 5);

  const homeServices = sourceServices.map((dbSvc, idx) => {
    const dictItem = dict.services?.items?.find((item: any) => item.slug === dbSvc.slug)
      || t.services?.items?.find((item: any) => item.slug === dbSvc.slug);

    const techStack: string[] = Array.isArray(dbSvc.tech_stack)
      ? dbSvc.tech_stack
      : typeof dbSvc.tech_stack === 'string'
      ? JSON.parse(dbSvc.tech_stack || '[]')
      : ['Next.js', 'Node.js', 'PostgreSQL'];

    return {
      slug: dbSvc.slug,
      num: String(dbSvc.num || idx + 1).padStart(2, '0'),
      title: dictItem?.title || dbSvc.title,
      desc: ((dictItem as any)?.summary || (dictItem as any)?.desc || dbSvc.short_desc) as string,
      techStack: techStack.slice(0, 4),
    };
  });

  return (
    <div className="flex w-full flex-col bg-navy-base">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-navy-base">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-emerald/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-light/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-light text-text-off-white font-mono text-sm mb-6 border border-border-flat/20">
                  <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                  {t.hero.tag}
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-text-pure leading-tight mb-6 tracking-tight">
                  {t.hero.titleLine1} <br />
                  <span className="text-accent-emerald">{t.hero.titleLine2}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-xl text-text-off-white mb-8 max-w-2xl leading-relaxed">
                  {t.hero.desc}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-4">
                  <Link href={`${prefix}/contact`} tabIndex={-1}>
                    <Button size="lg">{t.hero.cta1}</Button>
                  </Link>
                  <Link href={`${prefix}/work`} tabIndex={-1}>
                    <Button size="lg" variant="ghost" className="group">
                      {t.hero.cta2} <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-5 relative hidden md:block">
              <Reveal delay={0.3}>
                <div className="aspect-square rounded-2xl bg-navy-light/30 border border-border-flat/20 flex items-center justify-center p-8 relative overflow-hidden">
                  {/* Mockup Dashboard Card */}
                  <div className="w-full h-full bg-navy-base border border-navy-light rounded-xl p-6 flex flex-col justify-between relative shadow-lg">
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-1/2 h-4 bg-navy-light rounded-md"></div>
                      <div className="w-8 h-8 rounded-full bg-accent-emerald/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex-1 flex items-end gap-3 relative">
                      <div className="w-full h-[30%] bg-navy-light rounded-t-md hover:bg-navy-light/80 transition-colors"></div>
                      <div className="w-full h-[50%] bg-navy-light rounded-t-md hover:bg-navy-light/80 transition-colors"></div>
                      <div className="w-full h-[70%] bg-accent-emerald/40 rounded-t-md hover:bg-accent-emerald/60 transition-colors"></div>
                      <div className="w-full h-[95%] bg-accent-emerald rounded-t-md hover:bg-accent-emerald/90 transition-colors relative">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-navy-base text-accent-emerald text-xs font-mono py-1 px-2 rounded border border-navy-light opacity-0 hover:opacity-100 transition-opacity">
                          +40%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-bg-ice-blue relative border-b border-border-flat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-navy-base mb-4">{t.coreValues.title}</h2>
              <p className="text-text-muted max-w-2xl mx-auto text-lg">{t.coreValues.desc}</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users className="w-8 h-8 text-accent-emerald mb-6" /> },
              { icon: <Rocket className="w-8 h-8 text-accent-emerald mb-6" /> },
              { icon: <Lightbulb className="w-8 h-8 text-accent-emerald mb-6" /> },
              { icon: <TrendingUp className="w-8 h-8 text-accent-emerald mb-6" /> }
            ].map((iconItem, i) => (
              <Reveal key={i} delay={0.1 * (i + 1)}>
                <div className="p-8 h-full bg-bg-pure border border-border-flat rounded-2xl relative hover:border-accent-forest/30 transition-all duration-300 shadow-lg">
                  {iconItem.icon}
                  <h3 className="text-xl font-bold text-navy-base mb-3">{t.coreValues.items[i].title}</h3>
                  <p className="text-text-muted leading-relaxed text-sm">{t.coreValues.items[i].desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>



      {/* Layanan Section — Bento-style */}
      <section className="py-24 bg-navy-base text-text-pure relative overflow-hidden border-t border-b border-border-flat/10">
        <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-[#10B981]/5 rounded-full blur-[200px] pointer-events-none mix-blend-screen" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-emerald/10 text-accent-emerald font-mono text-xs mb-4 border border-accent-emerald/20 uppercase tracking-widest">
                  {t.services.tag}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-pure mb-4">{t.services.title}</h2>
                <p className="text-text-off-white max-w-xl text-lg">{t.services.desc}</p>
              </div>
              <Link href={`${prefix}/services`} className="inline-flex items-center text-accent-emerald hover:text-text-pure transition-colors font-medium group">
                {t.services.viewAll} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          {/* Bento Grid */}
          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-12 gap-4">
              {/* Card 01 - Large Featured */}
              {homeServices[0] && (
                <div className="md:col-span-7">
                  <Link href={`${prefix}/services/${homeServices[0].slug}`} className="group block h-full">
                    <div className="relative h-full bg-navy-base border border-border-flat/10 rounded-2xl p-8 md:p-10 overflow-hidden hover:border-accent-emerald transition-all duration-500 shadow-lg flex flex-col justify-between">
                      <div className="absolute top-6 right-6 w-20 h-20 border border-accent-emerald/20 rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
                      <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent-emerald/10 rounded-full blur-2xl pointer-events-none" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-6xl md:text-7xl font-bold text-accent-emerald">{homeServices[0].num}</div>
                          <ArrowRight className="w-6 h-6 text-text-off-white/40 group-hover:text-accent-emerald group-hover:translate-x-1 transition-all" />
                        </div>
                        {getHomeServiceIcon(homeServices[0].slug, "w-10 h-10")}
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-text-pure group-hover:text-accent-emerald transition-colors">
                          {homeServices[0].title}
                        </h3>
                        <p className="text-text-off-white text-lg max-w-lg leading-relaxed">
                          {homeServices[0].desc}
                        </p>
                      </div>

                      <div className="mt-8 relative z-10 flex flex-wrap gap-2">
                        {homeServices[0].techStack.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-[#1e293b]/50 text-text-pure text-sm rounded-md border border-border-flat/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Card 02 */}
              {homeServices[1] && (
                <div className="md:col-span-5">
                  <Link href={`${prefix}/services/${homeServices[1].slug}`} className="group block h-full">
                    <div className="relative h-full bg-navy-base border border-border-flat/10 rounded-2xl p-8 md:p-10 overflow-hidden hover:border-accent-emerald transition-all duration-500 shadow-lg flex flex-col justify-between">
                      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent-emerald/5 rounded-full blur-2xl pointer-events-none" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-5xl md:text-6xl font-bold text-accent-emerald">{homeServices[1].num}</div>
                          <ArrowRight className="w-5 h-5 text-text-off-white/40 group-hover:text-accent-emerald group-hover:translate-x-1 transition-all" />
                        </div>
                        {getHomeServiceIcon(homeServices[1].slug, "w-9 h-9")}
                        <h3 className="text-xl md:text-2xl font-bold mb-2 text-text-pure group-hover:text-accent-emerald transition-colors">
                          {homeServices[1].title}
                        </h3>
                        <p className="text-text-off-white leading-relaxed text-base">
                          {homeServices[1].desc}
                        </p>
                      </div>
                      <div className="mt-6 relative z-10 flex flex-wrap gap-2">
                        {homeServices[1].techStack.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-[#1e293b]/50 text-text-pure text-sm rounded-md border border-border-flat/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Cards 03, 04, 05 (Max 5 total) */}
              {homeServices.slice(2, 5).map((svc) => (
                <div key={svc.slug} className="md:col-span-4">
                  <Link href={`${prefix}/services/${svc.slug}`} className="group block h-full">
                    <div className="relative h-full bg-navy-base border border-border-flat/10 rounded-2xl p-8 overflow-hidden hover:border-accent-emerald transition-all duration-500 shadow-lg flex flex-col justify-between">
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-5xl font-bold text-accent-emerald">{svc.num}</div>
                          <ArrowRight className="w-5 h-5 text-text-off-white/40 group-hover:text-accent-emerald group-hover:translate-x-1 transition-all" />
                        </div>
                        {getHomeServiceIcon(svc.slug, "w-9 h-9")}
                        <h3 className="text-xl font-bold mb-2 text-text-pure group-hover:text-accent-emerald transition-colors">
                          {svc.title}
                        </h3>
                        <p className="text-text-off-white leading-relaxed text-sm">
                          {svc.desc}
                        </p>
                      </div>
                      <div className="mt-6 relative z-10 flex flex-wrap gap-2">
                        {svc.techStack.map((tag) => (
                          <span key={tag} className="px-2.5 py-1 bg-[#1e293b]/50 text-text-pure text-xs font-mono rounded-md border border-border-flat/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* AI Capabilities Section */}
      <AiCapabilities dict={t.aiCapabilities} />

      {/* Overview Project Section */}
      <section className="py-24 bg-bg-ice-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-navy-base mb-4">{t.featuredWork.title}</h2>
              <p className="text-text-muted text-lg max-w-2xl mx-auto">{t.featuredWork.desc}</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolios.slice(0, 2).map((study, idx) => {
              const slug = study.slug;
              return (
                <Reveal key={study.id || slug || idx} delay={0.1 * idx} className="h-full">
                  <Link href={`${prefix}/work/${slug}`} className="group block h-full focus:outline-none focus:ring-2 focus:ring-accent-emerald rounded-2xl">
                    <div className="h-full bg-bg-pure border border-border-flat rounded-2xl overflow-hidden hover:border-accent-forest/30 hover:shadow-2xl transition-all duration-300 flex flex-col">
                      {/* Card Header Visual: Project Image */}
                      <div className="aspect-[16/10] bg-navy-base relative overflow-hidden">
                        <img
                          src={study.cover_image_url || getCoverImage(slug)}
                          alt={study.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-base/60 via-transparent to-transparent" />

                        {/* Proposal Badge */}
                        {study.is_proposal && (
                          <div className="absolute top-4 left-4 bg-[#10B981]/90 text-navy-base text-[9px] sm:text-[10px] font-mono px-2.5 py-1 rounded-md backdrop-blur-md z-10 shadow-lg border border-[#10B981]/50">
                            {t.featuredWork.proposalBadge}
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
                          <span className="text-xs font-mono text-text-muted uppercase tracking-wider">{study.client}</span>
                          <span className="text-text-muted/30">·</span>
                          <span className="text-xs font-medium text-accent-forest uppercase tracking-wider">{study.industry}</span>
                        </div>

                        <h3 className="text-lg font-bold text-navy-base mb-4 leading-snug group-hover:text-accent-forest transition-colors duration-300 flex-1">
                          {study.title}
                        </h3>

                        <div className="flex flex-wrap gap-2 pt-4 border-t border-border-flat">
                          {study.tags && study.tags.map((tag) => (
                            <span key={tag} className="px-2.5 py-1 text-xs font-mono bg-[#1e293b]/5 text-text-muted border border-border-flat rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Reveal delay={0.2}>
              <Link href={`${prefix}/work`} tabIndex={-1}>
                <Button variant="secondary" className="px-8">{t.featuredWork.viewAll}</Button>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Blog Section (Dark Theme) */}
      <section className="py-24 bg-navy-base border-t border-border-flat/15 relative overflow-hidden text-text-pure">
        {/* Soft emerald ambient glow */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-accent-emerald/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-accent-emerald/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-emerald/10 text-accent-emerald font-mono text-xs border border-accent-emerald/30 uppercase tracking-widest mb-4">
                {t.blog?.tag || (lang === 'id' ? 'Wawasan & Pengetahuan' : 'Insights & Knowledge')}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-text-pure mb-4 tracking-tight">
                {t.blog?.titleLine1 || (lang === 'id' ? 'Perspektif Rekayasa &' : 'Architectural Insights &')}{" "}
                <span className="text-accent-emerald">
                  {t.blog?.titleAccent || (lang === 'id' ? 'Wawasan Sistem' : 'Deep Dives')}
                </span>
              </h2>
              <p className="text-text-off-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
                {t.blog?.desc || (lang === 'id' ? 'Artikel mendalam seputar arsitektur terukur, pipeline AI, dan transformasi digital.' : 'Articles on scalable system architectures, AI pipelines, and digital transformation.')}
              </p>
            </div>
          </Reveal>

          {latestPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {latestPosts.map((post, idx) => (
                <Reveal key={post.id || post.slug} delay={0.1 * idx} className="h-full">
                  <Link
                    href={`${prefix}/blog/${post.slug}`}
                    className="group flex flex-col rounded-2xl border border-border-flat/20 bg-navy-light/40 hover:border-accent-emerald/40 hover:bg-navy-light/70 hover:shadow-2xl transition-all duration-300 overflow-hidden h-full"
                  >
                    <div className="aspect-[16/10] bg-navy-base relative overflow-hidden">
                      {post.cover_image_url ? (
                        <img
                          src={post.cover_image_url}
                          alt={post.cover_image_alt || post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-navy-light/50 text-text-off-white/40 font-mono text-xs">
                          Digifolks Engineering
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-base/80 via-transparent to-transparent opacity-80" />
                      {post.category && (
                        <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-[#10B981]/20 border border-[#10B981]/40 text-accent-emerald text-[10px] font-mono uppercase tracking-wider backdrop-blur-md">
                          {post.category.name}
                        </span>
                      )}
                      {post.reading_time_minutes && (
                        <span className="absolute bottom-3 right-4 text-[10px] font-mono text-text-off-white/70 bg-navy-base/80 px-2 py-0.5 rounded backdrop-blur-md">
                          {post.reading_time_minutes} {t.blog?.readTime || "min read"}
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs font-mono text-text-off-white/50 mb-3">
                        <span>{post.author || "Digifolks Team"}</span>
                        <span>·</span>
                        <span>
                          {post.published_at
                            ? new Date(post.published_at).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                            : ""}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-text-pure group-hover:text-accent-emerald transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-text-off-white/70 line-clamp-2 leading-relaxed flex-1 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-xs font-mono text-accent-emerald group-hover:translate-x-1 transition-transform">
                        <span>{lang === 'id' ? 'Baca Artikel' : 'Read Article'}</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-text-off-white/50 text-sm">
              {lang === 'id' ? 'Artikel segera hadir.' : 'Articles coming soon.'}
            </div>
          )}

          <div className="mt-12 text-center">
            <Reveal delay={0.2}>
              <Link href={`${prefix}/blog`} tabIndex={-1}>
                <Button variant="secondary" className="px-8">
                  {t.blog?.viewAll || (lang === 'id' ? 'Lihat Semua Artikel' : 'View All Articles')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ Section (Light Theme) */}
      <section className="py-24 bg-bg-ice-blue border-t border-b border-border-flat">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-accent-forest font-semibold block mb-2">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-base mb-4">{t.faq.title}</h2>
              <p className="text-text-muted text-lg">{t.faq.desc}</p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {t.faq.items.map((faq: { q: string; a: string }, i: number) => (
              <Reveal key={i} delay={0.08 * i}>
                <details className="group border border-border-flat rounded-2xl bg-bg-pure [&_summary::-webkit-details-marker]:hidden hover:border-accent-forest/40 hover:shadow-md transition-all">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 text-navy-base font-bold select-none">
                    <h3 className="text-lg font-bold group-hover:text-accent-forest transition-colors">{faq.q}</h3>
                    <div className="w-8 h-8 rounded-full bg-bg-ice-blue border border-border-flat flex items-center justify-center flex-shrink-0 text-accent-forest transition-transform duration-300 group-open:-rotate-180">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </summary>
                  <div className="px-6 pb-6 text-text-muted leading-relaxed border-t border-border-flat/40 pt-4 animate-[slideDown_0.3s_ease-out]">
                    <p>{faq.a}</p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-navy-base overflow-hidden">
        <div className="absolute w-96 h-96 bg-accent-emerald/10 rounded-full blur-[100px] -top-24 right-0 pointer-events-none" />
        <div className="absolute w-64 h-64 bg-accent-emerald/5 rounded-full blur-[80px] bottom-0 left-16 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-text-pure mb-6 leading-tight">
              {t.cta.titleLine1} <br className="hidden md:block" />
              <span className="text-accent-emerald">{t.cta.titleLine2}</span>
            </h2>
            <p className="text-text-off-white text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              {t.cta.desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`${prefix}/contact`} tabIndex={-1}>
                <Button size="lg" className="px-8">
                  {t.cta.cta1}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href={`${prefix}/work`} tabIndex={-1}>
                <Button size="lg" variant="ghost" className="px-8">
                  {t.cta.cta2}
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}