import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { 
  ArrowLeft, CheckCircle2, ArrowRight, ArrowDown, Cpu, Sparkles 
} from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { getServiceBySlug, getServices, getPortfolios } from "@/lib/supabase/queries";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const service = await getServiceBySlug(slug);

  if (!service || !service.is_published) {
    return {
      title: "Service Not Found",
    };
  }

  const dict = await getDictionary(lang as "en" | "id");
  const dictItem = dict.home?.services?.items?.find((item: any) => item.slug === slug);

  const title = lang === "id" && dictItem
    ? `${dictItem.title} — Layanan Rekayasa Sistem Enterprise`
    : service.title;
  const description = lang === "id" && dictItem
    ? `${dictItem.desc} Solusi rekayasa sistem enterprise terukur dari Digifolks.`
    : (service.short_desc || service.description);
  const url = `/${lang}/services/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `/en/services/${slug}`,
        id: `/id/services/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      images: service.image_url
        ? [{ url: service.image_url }]
        : [
            {
              url: "/Dih.webp",
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const dict = await getDictionary(lang as "en" | "id");
  const t = dict.serviceDetail || {
    backToServices: "Back to Services",
    overview: "Service Overview",
    keyFeatures: "Core Capabilities & Deliverables",
    techStack: "Technology & Tooling",
    consultationTitle: "Ready to build this for your organization?",
    consultationDesc: "Schedule an architecture discovery session with our engineering leads.",
    consultationBtn: "Book Consultation",
    relatedPortfolios: "Related Case Studies",
    nextService: lang === "id" ? "Layanan Selanjutnya" : "Next Service",
    viewDetails: lang === "id" ? "Lihat Detail" : "View Details",
  };
  const prefix = `/${lang}`;

  const [service, allServices, allPortfolios] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getPortfolios(),
  ]);

  if (!service || !service.is_published) {
    notFound();
  }

  // Find next service in sequence
  const currentIndex = allServices.findIndex((s) => s.slug === slug);
  const nextService = allServices[(currentIndex + 1) % allServices.length];

  // Parse features and tech stack safely
  const features: string[] = Array.isArray(service.features)
    ? service.features
    : typeof service.features === "string"
    ? JSON.parse(service.features || "[]")
    : [];

  const techStack: string[] = Array.isArray(service.tech_stack)
    ? service.tech_stack
    : typeof service.tech_stack === "string"
    ? JSON.parse(service.tech_stack || "[]")
    : [];

  // Related Portfolios (Prepared but hidden as requested by user)
  const SHOW_RELATED_PORTFOLIOS = false;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digifolks.id";
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.short_desc || service.description,
    "url": `${baseUrl}/${lang}/services/${slug}`,
    "provider": {
      "@type": "Organization",
      "name": "Digifolks",
      "url": baseUrl,
    },
    "areaServed": "ID",
  };

  return (
    <div className="flex w-full flex-col min-h-screen bg-navy-base">
      <JsonLd data={serviceSchema} />
      {/* 1. Hero Section (Dark Theme) */}
      <section className="relative pt-32 pb-20 bg-navy-base overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-emerald/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-navy-light/20 rounded-full blur-[200px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          {/* Back Link */}
          <div className="mb-8">
            <Link
              href={`${prefix}/services`}
              className="inline-flex items-center gap-2 text-xs font-mono text-text-off-white/60 hover:text-accent-emerald transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.backToServices}</span>
            </Link>
          </div>

          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-3">
                  <span className="text-4xl font-bold font-mono text-accent-emerald/40">
                    {String(service.num || 1).padStart(2, "0")}
                  </span>
                  <span className="h-4 w-[1px] bg-border-flat/20" />
                  <span className="text-xs font-mono uppercase tracking-widest text-accent-emerald px-3 py-1 rounded-full bg-accent-emerald/10 border border-accent-emerald/20">
                    Enterprise Solution
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-pure tracking-tight leading-[1.1]">
                  {service.title}
                </h1>

                <p className="text-lg md:text-xl text-text-off-white/80 leading-relaxed font-normal max-w-2xl">
                  {service.short_desc}
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link href={`${prefix}/contact`}>
                    <Button size="lg" className="px-8 shadow-lg shadow-accent-emerald/15">
                      {t.consultationBtn}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <a href="#capabilities">
                    <Button variant="secondary" size="lg" className="px-8">
                      {lang === 'id' ? 'Jelajahi Kapabilitas' : 'Explore Capabilities'}
                      <ArrowDown className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>

              {/* Hero Graphic / Visual Representation */}
              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden border border-border-flat/15 bg-navy-base/80 shadow-2xl group aspect-[4/3]">
                  {service.image_url ? (
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-navy-base to-[#091527] text-accent-emerald">
                      <Cpu className="w-20 h-20 mb-4 opacity-80" />
                      <span className="font-mono text-sm uppercase tracking-widest text-text-off-white/60">
                        {service.title}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-base/90 via-transparent to-transparent pointer-events-none" />
                  {service.icon_url && (
                    <div className="absolute bottom-6 left-6 flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-navy-base/90 backdrop-blur-md border border-border-flat/20 shadow-xl">
                        <img src={service.icon_url} alt="" className="w-8 h-8 object-contain" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. Main Content Section (Light Theme) */}
      <div className="bg-bg-ice-blue flex-grow relative z-10 border-t border-border-flat py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
          {/* Overview Description Box */}
          {service.description && (
            <Reveal>
              <div className="rounded-3xl border border-border-flat bg-bg-pure p-8 sm:p-12 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-accent-forest" />
                <div className="max-w-4xl space-y-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-accent-forest font-semibold block">
                    {t.overview}
                  </span>
                  <p className="text-xl sm:text-2xl font-medium text-navy-base leading-relaxed">
                    &ldquo;{service.description}&rdquo;
                  </p>
                </div>
              </div>
            </Reveal>
          )}

          {/* Core Capabilities / Features */}
          <section id="capabilities">
            <Reveal>
              <div className="mb-10">
                <span className="text-xs font-mono uppercase tracking-widest text-accent-forest font-semibold block mb-2">
                  Capabilities
                </span>
                <h2 className="text-3xl font-bold text-navy-base">
                  {t.keyFeatures}
                </h2>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div className="flex items-start gap-4 p-6 rounded-2xl border border-border-flat bg-bg-pure hover:border-accent-forest/40 hover:shadow-lg transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-accent-forest/10 border border-accent-forest/20 flex items-center justify-center flex-shrink-0 mt-0.5 text-accent-forest">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-navy-base mb-1">
                        {feature}
                      </h3>
                      <p className="text-sm text-text-muted leading-relaxed">
                        Engineered for high reliability, clean architectural separation, and seamless integration with existing business workflows.
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Tech Stack & Tooling */}
          {techStack.length > 0 && (
            <section>
              <Reveal>
                <div className="rounded-3xl border border-border-flat bg-bg-pure p-8 sm:p-10 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b border-border-flat pb-6">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-accent-forest font-semibold block mb-1">
                        Infrastructure & Stack
                      </span>
                      <h2 className="text-2xl font-bold text-navy-base">
                        {t.techStack}
                      </h2>
                    </div>
                    <span className="text-xs font-mono text-text-muted">
                      Industry-standard modern tech
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-xl text-xs font-mono bg-bg-ice-blue text-navy-base border border-border-flat hover:border-accent-forest/40 transition-all font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </section>
          )}

          {/* Related Portfolios — BUILT BUT HIDDEN PER USER INSTRUCTION */}
          {SHOW_RELATED_PORTFOLIOS && (
            <section>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-accent-forest block mb-1 font-semibold">
                    Track Record
                  </span>
                  <h2 className="text-2xl font-bold text-navy-base">
                    {t.relatedPortfolios}
                  </h2>
                </div>
                <Link
                  href={`${prefix}/work`}
                  className="text-xs font-mono text-accent-forest hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>View all work</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {allPortfolios.slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    href={`${prefix}/work/${item.slug}`}
                    className="group flex flex-col rounded-2xl border border-border-flat bg-bg-pure overflow-hidden hover:border-accent-forest/40 hover:shadow-lg transition-all"
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden bg-navy-base">
                      {item.cover_image_url && (
                        <img
                          src={item.cover_image_url}
                          alt={item.title}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <span className="text-[10px] font-mono text-accent-forest mb-1 font-semibold">
                        {item.client}
                      </span>
                      <h3 className="text-sm font-bold text-navy-base line-clamp-2 group-hover:text-accent-forest transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Next Service Navigation Card */}
          {nextService && nextService.slug !== slug && (
            <div className="pt-4">
              <Link
                href={`${prefix}/services/${nextService.slug}`}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-8 rounded-3xl border border-border-flat bg-bg-pure hover:border-accent-forest/40 hover:shadow-lg transition-all shadow-sm"
              >
                <div>
                  <span className="text-xs font-mono text-accent-forest uppercase tracking-wider block mb-1 font-semibold">
                    {t.nextService} →
                  </span>
                  <h3 className="text-2xl font-bold text-navy-base group-hover:text-accent-forest transition-colors">
                    {nextService.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-1 max-w-md">
                    {nextService.short_desc}
                  </p>
                </div>

                <div className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-2.5 rounded-full bg-navy-base text-text-pure text-xs font-mono group-hover:bg-accent-forest transition-colors font-bold">
                  <span>{t.viewDetails}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          )}

          {/* Call to Action Banner (High-contrast Dark Card) */}
          <section className="rounded-3xl border border-border-flat/10 bg-navy-base p-10 sm:p-14 text-center relative overflow-hidden shadow-2xl text-text-pure">
            <div className="absolute w-96 h-96 bg-accent-emerald/10 rounded-full blur-[120px] -top-20 left-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-2xl mx-auto relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-emerald/10 text-accent-emerald font-mono text-xs border border-accent-emerald/30 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                Engineering Discovery
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-text-pure leading-tight">
                {t.consultationTitle}
              </h2>
              <p className="text-base text-text-off-white/70 leading-relaxed">
                {t.consultationDesc}
              </p>
              <div className="pt-2">
                <Link href={`${prefix}/contact`}>
                  <Button size="lg" className="px-8 shadow-lg shadow-accent-emerald/20">
                    {t.consultationBtn}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
