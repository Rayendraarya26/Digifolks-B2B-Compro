import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { AiCapabilities } from "@/components/ui/AiCapabilities";
import { ChevronDown, ArrowRight, Code, Server, Shield, LayoutTemplate, Database, Cpu, ArrowUpRight, Users, Rocket, Lightbulb, TrendingUp, CheckCircle2, Globe } from "lucide-react";
import fs from "fs";
import path from "path";
import { portfolioData } from "@/data/portfolio";
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

export const metadata: Metadata = {
  title: "Build Scalable Operational Systems for Your Business",
  description: "We design and develop scalable systems that reduce operational complexity, improve reliability, and support long-term business growth. Talk to our team today.",
};

export default async function Home({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang || 'en') as 'en' | 'id';
  const dict = await getDictionary(lang);
  const t = dict.home;
  const prefix = `/${lang}`;

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
              {/* Large Card */}
              <div className="md:col-span-7">
                <Link href={`${prefix}/services`} className="group block h-full">
                  <div className="relative h-full bg-navy-base border border-border-flat/10 rounded-2xl p-8 md:p-10 overflow-hidden hover:border-accent-emerald transition-all duration-500">
                    <div className="absolute top-6 right-6 w-20 h-20 border border-accent-emerald/20 rounded-full group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent-emerald/10 rounded-full blur-2xl" />
                    <div className="relative z-10">
                      <div className="text-6xl md:text-7xl font-bold text-accent-emerald mb-4">01</div>
                      <Code className="w-10 h-10 text-accent-emerald mb-4" />
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-text-pure">{t.services.items[0].title}</h3>
                      <p className="text-text-off-white text-lg max-w-lg leading-relaxed">{t.services.items[0].desc}</p>

                      <div className="mt-8 flex gap-2">
                        {['Next.js', 'Node.js', 'PostgreSQL'].map(tag => (
                          <span key={tag} className="px-3 py-1 bg-[#1e293b]/50 text-text-pure text-sm rounded-md border border-border-flat/10">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Right column */}
              <div className="md:col-span-5 grid gap-4">
                <Link href={`${prefix}/services`} className="group block h-full">
                  <div className="relative h-full bg-navy-base border border-border-flat/10 rounded-2xl p-8 overflow-hidden hover:border-accent-emerald transition-all duration-500">
                    <div className="absolute top-4 right-4 text-5xl font-bold text-accent-emerald">02</div>
                    <Cpu className="w-9 h-9 text-accent-emerald mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-text-pure">{t.services.items[1].title}</h3>
                    <p className="text-text-off-white leading-relaxed">{t.services.items[1].desc}</p>
                    <div className="mt-4 flex gap-2">
                      {['Python', 'OpenAI', 'TensorFlow'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-[#1e293b]/50 text-text-pure text-sm rounded-md border border-border-flat/10">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
                <Link href={`${prefix}/services`} className="group block h-full">
                  <div className="relative h-full bg-navy-base border border-border-flat/10 rounded-2xl p-8 overflow-hidden hover:border-accent-emerald transition-all duration-500">
                    <div className="absolute top-4 right-4 text-5xl font-bold text-accent-emerald">03</div>
                    <Globe className="w-9 h-9 text-accent-emerald mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-text-pure">{t.services.items[2].title}</h3>
                    <p className="text-text-off-white leading-relaxed">{t.services.items[2].desc}</p>
                    <div className="mt-4 flex gap-2">
                      {['React', 'Next.js', 'TailwindCSS'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-[#1e293b]/50 text-text-pure text-sm rounded-md border border-border-flat/10">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
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
            {portfolioData.slice(0, 2).map((study, idx) => {
              const slug = study.imageUrl.split('/').slice(-2)[0];
              return (
                <Reveal key={idx} delay={0.1 * idx} className="h-full">
                  <Link href={`${prefix}/work/${slug}`} className="group block h-full focus:outline-none focus:ring-2 focus:ring-accent-emerald rounded-2xl">
                    <div className="h-full bg-bg-pure border border-border-flat rounded-2xl overflow-hidden hover:border-accent-forest/30 hover:shadow-2xl transition-all duration-300 flex flex-col">
                      {/* Card Header Visual: Project Image */}
                      <div className="aspect-[16/10] bg-navy-base relative overflow-hidden">
                        <img
                          src={getCoverImage(slug)}
                          alt={study.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-base/60 via-transparent to-transparent" />

                        {/* Proposal Badge */}
                        {study.isProposal && (
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

      {/* FAQ Section */}
      <section className="py-24 bg-navy-base border-b border-border-flat/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-text-pure mb-4">{t.faq.title}</h2>
              <p className="text-text-off-white text-lg">{t.faq.desc}</p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {t.faq.items.map((faq: { q: string; a: string }, i: number) => (
              <Reveal key={i} delay={0.1 * i}>
                <details className="group border border-border-flat/20 rounded-xl bg-navy-light [&_summary::-webkit-details-marker]:hidden hover:border-accent-emerald transition-colors">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-text-pure font-bold">
                    <h3 className="text-lg">{faq.q}</h3>
                    <ChevronDown className="w-5 h-5 text-accent-emerald transition duration-300 group-open:-rotate-180" />
                  </summary>
                  <div className="px-6 pb-6 text-text-off-white leading-relaxed animate-[slideDown_0.3s_ease-out]">
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