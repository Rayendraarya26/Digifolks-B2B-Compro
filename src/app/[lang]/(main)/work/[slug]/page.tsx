import { Metadata } from "next";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { getPortfolioBySlug } from "@/lib/supabase/queries";
import { getDictionary } from "@/lib/dictionaries";
import { WorkImageGallery } from "@/components/ui/WorkImageGallery";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}): Promise<Metadata> {
  const { slug, lang } = await params;
  const project = await getPortfolioBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const title = `${project.title} — ${project.client}`;
  const description = project.headline || project.overview;
  const url = `/${lang}/work/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `/en/work/${slug}`,
        id: `/id/work/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: "article",
      images: project.cover_image_url ? [{ url: project.cover_image_url }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string; lang: string }>;
}) {
  const { slug, lang } = await params;
  const currentLang = (lang || "en") as "en" | "id";
  const dict = await getDictionary(currentLang);
  const t = dict.work?.detail || {
    backLink: currentLang === "id" ? "Kembali ke Studi Kasus" : "Back to Case Studies",
    proposalBadge: "Professional Portfolio for Stakeholder Proposals",
    overview: "Overview",
    theChallenge: currentLang === "id" ? "Tantangan" : "The Challenge",
    ourSolution: currentLang === "id" ? "Solusi Kami" : "Our Solution",
    projectInfo: currentLang === "id" ? "Info Proyek" : "Project Info",
    client: currentLang === "id" ? "Klien" : "Client",
    industry: currentLang === "id" ? "Industri" : "Industry",
    duration: currentLang === "id" ? "Durasi" : "Duration",
    year: currentLang === "id" ? "Tahun" : "Year",
    techStack: "Tech Stack & Tags",
    ctaTitle: currentLang === "id" ? "Ingin hasil serupa?" : "Looking for similar results?",
    ctaDesc: currentLang === "id" ? "Ceritakan tantangan bisnis Anda dan kami akan merancang solusinya." : "Share your business challenges and we will architect the solution.",
    ctaBtn: currentLang === "id" ? "Jadwalkan Konsultasi" : "Schedule Consultation",
    galleryTitle: currentLang === "id" ? "Galeri Proyek" : "Project Gallery",
    galleryDesc: currentLang === "id" ? "Visual showcase dari proyek yang telah kami kerjakan." : "Visual showcase of the system built for this project.",
    noGallery: currentLang === "id" ? "Tidak ada gambar galeri tambahan untuk proyek ini." : "No additional gallery images for this project."
  };
  const prefix = `/${currentLang}`;

  const project = await getPortfolioBySlug(slug);

  if (!project) {
    notFound();
  }

  const publicDir = path.join(process.cwd(), "public", "Image", "Portfolio", project.slug);
  let galleryImages: string[] = project.gallery_images || [];
  let coverImage = project.cover_image_url || `/Image/Portfolio/${project.slug}/cover.png`;

  try {
    if (fs.existsSync(publicDir)) {
      const files = fs.readdirSync(publicDir);

      const coverFile = files.find(f => f.startsWith("cover.") && f.match(/\.(png|jpe?g|webp)$/i));
      if (coverFile) {
        coverImage = `/Image/Portfolio/${project.slug}/${coverFile}`;
      }

      const diskGallery = files
        .filter((file) => file.startsWith("gallery-") && file.match(/\.(png|jpe?g|webp)$/i))
        .sort()
        .map((file) => `/Image/Portfolio/${project.slug}/${file}`);
      
      if (diskGallery.length > 0) {
        galleryImages = diskGallery;
      }
    }
  } catch {
    // Fallback to project.gallery_images
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digifolks.id";
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "headline": project.headline || project.title,
    "description": project.overview || project.headline,
    "url": `${baseUrl}/${currentLang}/work/${slug}`,
    "creator": {
      "@type": "Organization",
      "name": "Digifolks",
      "url": baseUrl,
    },
    ...(project.cover_image_url && {
      "image": project.cover_image_url,
    }),
  };

  return (
    <div className="flex w-full flex-col min-h-screen bg-navy-base">
      <JsonLd data={projectSchema} />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 bg-navy-base overflow-hidden">
        {/* Soft blur circle top left */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#10B981]/5 rounded-full blur-[200px] pointer-events-none mix-blend-screen" />
        <div className="absolute w-96 h-96 border border-accent-emerald/5 rounded-full -top-32 -right-32" />
        <div className="absolute w-64 h-64 border border-border-flat/5 rounded-full bottom-0 left-16" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <Link href={`${prefix}/work`} className="inline-flex items-center text-text-off-white/50 hover:text-text-pure mb-8 transition-colors text-sm font-mono">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backLink}
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-3 mb-6 items-center">
              {project.is_proposal && (
                <span className="px-3 py-1.5 rounded-lg border border-[#10B981]/40 bg-[#10B981]/10 text-[10px] md:text-xs font-mono text-accent-emerald shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  {t.proposalBadge}
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
                  <h2 className="text-sm font-bold text-accent-forest uppercase tracking-widest mb-4">{t.overview}</h2>
                  <p className="text-lg text-text-muted leading-relaxed">
                    {project.overview}
                  </p>
                </section>
              </Reveal>

              {project.challenges && project.challenges.length > 0 && (
                <Reveal delay={0.1}>
                  <section>
                    <h2 className="text-sm font-bold text-accent-forest uppercase tracking-widest mb-6">{t.theChallenge}</h2>
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
              )}

              {project.solutions && project.solutions.length > 0 && (
                <Reveal delay={0.2}>
                  <section>
                    <h2 className="text-sm font-bold text-accent-forest uppercase tracking-widest mb-6">{t.ourSolution}</h2>
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
              )}
            </div>

            {/* Sidebar */}
            <div className="md:col-span-4">
              <Reveal delay={0.3}>
                <div className="sticky top-28 space-y-6">
                  {/* Project Info */}
                  <div className="bg-bg-pure border border-border-flat rounded-2xl p-6 shadow-sm">
                    <h3 className="text-sm font-bold text-navy-base uppercase tracking-wider mb-6">{t.projectInfo}</h3>
                    <dl className="space-y-4">
                      <div className="flex justify-between">
                        <dt className="text-sm text-text-muted">{t.client}</dt>
                        <dd className="text-sm font-medium text-navy-base">{project.client}</dd>
                      </div>
                      <div className="border-t border-border-flat" />
                      <div className="flex justify-between">
                        <dt className="text-sm text-text-muted">{t.industry}</dt>
                        <dd className="text-sm font-medium text-navy-base">{project.industry}</dd>
                      </div>
                      <div className="border-t border-border-flat" />
                      <div className="flex justify-between">
                        <dt className="text-sm text-text-muted">{t.duration}</dt>
                        <dd className="text-sm font-medium text-navy-base">{project.duration}</dd>
                      </div>
                      <div className="border-t border-border-flat" />
                      <div className="flex justify-between">
                        <dt className="text-sm text-text-muted">{t.year}</dt>
                        <dd className="text-sm font-medium text-navy-base">{project.year}</dd>
                      </div>
                    </dl>
                  </div>

                  {/* Tech Stack */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="bg-bg-pure border border-border-flat rounded-2xl p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-navy-base uppercase tracking-wider mb-4">{t.techStack}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1.5 text-xs font-mono bg-[#1e293b]/5 text-text-muted rounded-lg border border-border-flat">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="bg-navy-base border border-border-flat/10 rounded-2xl p-6 text-text-pure">
                    <h4 className="font-bold mb-2">{t.ctaTitle}</h4>
                    <p className="text-sm text-text-off-white/80 mb-4">{t.ctaDesc}</p>
                    <Link href={`${prefix}/contact`} tabIndex={-1}>
                      <Button className="w-full">
                        {t.ctaBtn}
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
              <h2 className="text-sm font-bold text-accent-forest uppercase tracking-widest mb-4">{t.galleryTitle}</h2>
              <p className="text-text-muted text-lg">{t.galleryDesc}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <WorkImageGallery
              coverImage={coverImage}
              galleryImages={galleryImages}
              projectTitle={project.title}
              labels={{
                galleryTitle: t.galleryTitle,
                galleryDesc: t.galleryDesc,
                noGallery: t.noGallery,
                zoomHint: currentLang === "id" ? "Klik untuk memperbesar" : "Click to zoom",
                coverLabel: currentLang === "id" ? "Sampul Proyek" : "Cover",
                screenshotLabel: currentLang === "id" ? "Tangkapan Layar" : "Screenshot",
              }}
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
