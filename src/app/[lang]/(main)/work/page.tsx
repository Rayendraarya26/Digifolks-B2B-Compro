import { Metadata } from "next";
import { Reveal } from "@/components/animations/Reveal";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { FolderGit2 } from "lucide-react";
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
    if (customCover && (customCover.startsWith('/') || customCover.startsWith('http://') || customCover.startsWith('https://'))) {
      return customCover;
    }
    try {
      const publicDir = path.join(process.cwd(), "public", "Image", "Portfolio", slug);
      if (fs.existsSync(publicDir)) {
        const files = fs.readdirSync(publicDir);
        const cover = files.find(f => f.startsWith("cover.") && f.match(/\.(png|jpe?g|webp)$/i));
        if (cover) return `/Image/Portfolio/${slug}/${cover}`;
      }
      return customCover || `/Image/Portfolio/${slug}/cover.png`;
    } catch {
      return customCover || `/Image/Portfolio/${slug}/cover.png`;
    }
  };

  return (
    <div className="flex w-full flex-col min-h-screen bg-navy-base">
      {/* Hero Section */}
      <section className="relative pt-28 pb-14 sm:pt-32 sm:pb-20 bg-navy-base border-b border-border-flat/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-emerald/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-light/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-light/60 text-accent-emerald font-mono text-xs mb-6 border border-accent-emerald/20 uppercase tracking-widest">
              <FolderGit2 className="w-3.5 h-3.5" />
              {t.hero.tag || (lang === 'id' ? 'Studi Kasus & Portofolio' : 'Case Studies & Systems')}
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-text-pure mb-6 max-w-3xl leading-tight">
              {t.hero.titleLine1} <br />
              <span className="text-accent-emerald">{t.hero.titleLine2}</span>
            </h1>
            <p className="text-base sm:text-xl text-text-off-white max-w-3xl leading-relaxed">
              {t.hero.desc}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-14 sm:py-20 bg-bg-ice-blue min-h-[600px] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="sr-only">{lang === 'id' ? 'Daftar Studi Kasus Portofolio' : 'Portfolio Case Studies'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {cases.map((study, idx) => (
              <PortfolioCard
                key={study.id || study.slug || idx}
                study={study}
                href={`${prefix}/work/${study.slug}`}
                coverImage={getCoverImage(study.slug, study.cover_image_url)}
                proposalBadge={t.hero.proposalBadge}
                delay={0.05 * idx}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}