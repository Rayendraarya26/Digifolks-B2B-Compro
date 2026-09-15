import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { getPortfolioBySlug } from "@/lib/supabase/queries";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

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
              {project.is_proposal && (
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

              {project.challenges && project.challenges.length > 0 && (
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
              )}

              {project.solutions && project.solutions.length > 0 && (
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
              )}
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
                  {project.tags && project.tags.length > 0 && (
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
                  )}

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
            {/* Gallery Grid */}
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
