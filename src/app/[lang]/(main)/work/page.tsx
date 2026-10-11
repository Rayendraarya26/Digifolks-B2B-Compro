import { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { ArrowUpRight } from "lucide-react";
import fs from "fs";
import path from "path";
import { getDictionary } from "@/lib/dictionaries";
import { getPortfolios } from "@/lib/supabase/queries";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const dict = await getDictionary(lang as 'en' | 'id');
  const seo = dict.seo?.work || {
    title: "Portfolio — Real Systems Built for Real Problems",
    description: "Explore case studies of scalable systems solving operational bottlenecks, data complexity, and business growth challenges.",
  };
  const url = `/${lang}/work`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
      languages: {
        en: '/en/work',
        id: '/id/work',
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

export default async function PortfoliosPage({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang || 'en') as 'en' | 'id';
  const dict = await getDictionary(lang);
  const t = dict.work;
  const prefix = `/${lang}`;

  const cases = await getPortfolios();

  const getCoverImage = (slug: string, customCover?: string) => {
    if (customCover && customCover.startsWith('/')) {
      return customCover;
    }
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
              {t.hero.titleLine1} <br className="hidden md:block" />{t.hero.titleLine2}
            </h1>
            <p className="text-xl text-text-muted max-w-3xl">
              {t.hero.desc}
            </p>
          </div>
        </Reveal>

        {/* Project Grid */}
        <h2 className="sr-only">{lang === 'id' ? 'Daftar Studi Kasus Portofolio' : 'Portfolio Case Studies'}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((study, idx) => (
            <Reveal key={study.id || study.slug || idx} delay={0.05 * idx} className="h-full">
              <Link href={`${prefix}/work/${study.slug}`} className="group block h-full">
                <div className="h-full bg-bg-pure border border-border-flat rounded-2xl overflow-hidden hover:border-accent-forest/30 hover:shadow-2xl transition-all duration-300 flex flex-col">
                  {/* Card Header Visual: Project Image */}
                  <div className="aspect-[16/10] bg-navy-base relative overflow-hidden">
                    <img
                      src={getCoverImage(study.slug, study.cover_image_url)}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-base/60 via-transparent to-transparent" />

                    {/* Proposal Badge */}
                    {study.is_proposal && (
                      <div className="absolute top-4 left-4 bg-[#10B981]/70 text-white text-[9px] sm:text-[10px] font-mono px-2.5 py-1 rounded-md backdrop-blur-md z-10 shadow-lg border border-[#10B981]/50">
                        {t.hero.proposalBadge}
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
          ))}
        </div>
      </div>
    </div>
  );
}