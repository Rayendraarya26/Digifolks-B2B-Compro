import { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Database, LayoutTemplate, Layers, Cpu, Code, Lock, CheckCircle2, ArrowRight, Smartphone, PenTool, Wrench, Briefcase, Globe } from "lucide-react";
import { getDictionary } from "@/lib/dictionaries";
import { getServices } from "@/lib/supabase/queries";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const url = `/${lang}/services`;

  return {
    title: "Services — Scalable System Development",
    description: "Custom system development, enterprise tools, AI-driven platforms, and integrated ecosystems built for scalability and efficiency.",
    alternates: {
      canonical: url,
      languages: {
        'en': '/en/services',
        'id': '/id/services',
      },
    },
    openGraph: {
      url: url,
    },
  };
}

const getServiceIcon = (slug: string) => {
  switch (slug) {
    case 'svc-ai':
      return <Cpu className="w-10 h-10 text-accent-forest" />;
    case 'svc-mgmt':
      return <Database className="w-10 h-10 text-accent-forest" />;
    case 'svc-web':
      return <Globe className="w-10 h-10 text-accent-forest" />;
    case 'svc-apps':
      return <Smartphone className="w-10 h-10 text-accent-forest" />;
    case 'svc-it':
      return <Briefcase className="w-10 h-10 text-accent-forest" />;
    default:
      return <Code className="w-10 h-10 text-accent-forest" />;
  }
};

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang || 'en') as 'en' | 'id';
  const [dict, dbServices] = await Promise.all([
    getDictionary(lang),
    getServices(),
  ]);
  const t = dict.services;
  const prefix = `/${lang}`;

  // Default fallback services if DB returns empty
  const defaultServices = [
    { slug: 'svc-ai', num: 1, title: 'Artificial Intelligence', short_desc: 'AI-powered systems for automation, prediction, and data-driven decision making.', features: ['Machine Learning Models', 'NLP & Chatbots', 'Predictive Analytics', 'Computer Vision'], tech_stack: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI'] },
    { slug: 'svc-mgmt', num: 2, title: 'Management System', short_desc: 'Custom operational systems to streamline workflows and centralize business processes.', features: ['Custom ERP Solutions', 'Real-time Dashboards', 'Automated Workflows', 'Data Visualization'], tech_stack: ['React', 'Node.js', 'PostgreSQL', 'Docker'] },
    { slug: 'svc-web', num: 3, title: 'Web Platforms', short_desc: 'Scalable web systems built for performance, stability, and growth.', features: ['Interactive 3D Web', 'High-Performance SSR', 'Scalable Architecture', 'SEO Optimization'], tech_stack: ['Next.js', 'TailwindCSS', 'Framer Motion', 'Three.js'] },
    { slug: 'svc-apps', num: 4, title: 'iOS, Android, Desktop', short_desc: 'Cross-platform applications designed for operational efficiency and usability.', features: ['Cross-Platform Mobile', 'Native Desktop Apps', 'Offline Capabilities', 'Hardware Integration'], tech_stack: ['React Native', 'Flutter', 'Swift', 'Electron'] },
    { slug: 'svc-it', num: 5, title: 'IT Solution & Consulting', short_desc: 'System architecture planning and technical consulting for scalable infrastructure.', features: ['Cloud Migration', 'DevOps Setup', 'Security Audits', 'Tech Consultation'], tech_stack: ['AWS', 'Google Cloud', 'Kubernetes', 'Linux'] },
  ];

  const sourceServices = dbServices.length > 0 ? dbServices : defaultServices;

  const servicesToRender = sourceServices.map((dbSvc, idx) => {
    const dictItem = t.items.find((item: any) => item.slug === dbSvc.slug) || t.items[idx];
    const techStack: string[] = Array.isArray(dbSvc.tech_stack)
      ? dbSvc.tech_stack
      : typeof dbSvc.tech_stack === 'string'
      ? JSON.parse(dbSvc.tech_stack || '[]')
      : ['Next.js', 'Node.js', 'PostgreSQL', 'Go'];

    const details: string[] = dictItem?.details || (
      Array.isArray(dbSvc.features)
        ? dbSvc.features
        : typeof dbSvc.features === 'string'
        ? JSON.parse(dbSvc.features || '[]')
        : []
    );

    return {
      slug: dbSvc.slug,
      num: dbSvc.num || idx + 1,
      title: dictItem?.title || dbSvc.title,
      summary: dictItem?.summary || dbSvc.short_desc,
      details,
      techStack,
    };
  });

  return (
    <div className="flex w-full flex-col min-h-screen bg-navy-base">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-navy-base border-b border-border-flat/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-emerald/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-light text-text-off-white font-mono text-xs mb-6 border border-border-flat/10 uppercase tracking-widest">
              {t.hero.tag}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text-pure mb-6 max-w-3xl">
              {t.hero.titleLine1} <span className="text-accent-emerald">{t.hero.titleAccent}</span> {t.hero.titleLine2}
            </h1>
            <p className="text-xl text-text-off-white max-w-3xl leading-relaxed">
              {t.hero.desc}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 bg-bg-ice-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {servicesToRender.map((service, idx) => {
              return (
                <Reveal key={service.slug} delay={0.1}>
                  <div className={`grid md:grid-cols-12 gap-10 md:gap-16 items-start ${idx % 2 !== 0 ? 'md:[direction:rtl] md:[&>*]:[direction:ltr]' : ''}`}>
                    {/* Left: Info */}
                    <div className="md:col-span-5">
                      <div className="sticky top-28">
                        <div className="text-6xl font-bold text-accent-forest/10 mb-2">{String(service.num).padStart(2, '0')}</div>
                        <div className="mb-4">{getServiceIcon(service.slug)}</div>
                        <h2 className="text-2xl md:text-3xl font-bold text-navy-base mb-4 leading-tight">
                          {service.title}
                        </h2>
                        <p className="text-text-muted text-lg leading-relaxed mb-6">
                          {service.summary}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {service.techStack.map((tech) => (
                            <span key={tech} className="px-3 py-1.5 text-xs font-mono bg-[#1e293b]/5 text-text-muted rounded-lg border border-border-flat">
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div>
                          <Link
                            href={`${prefix}/services/${service.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-bold text-accent-forest hover:opacity-80 transition-opacity group/link"
                          >
                            <span>{lang === 'id' ? 'Detail Layanan & Arsitektur' : 'Explore Architecture & Capabilities'}</span>
                            <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Right: Detailed capabilities */}
                    <div className="md:col-span-7">
                      <div className="space-y-4">
                        {service.details.map((detail: string, i: number) => (
                          <div key={i} className="group flex gap-4 items-start p-5 bg-bg-pure border border-border-flat rounded-xl hover:border-accent-forest/30 hover:bg-accent-forest/5 transition-all duration-300 shadow-sm">
                            <div className="w-8 h-8 rounded-lg bg-accent-forest/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-accent-forest/20 transition-colors">
                              <CheckCircle2 className="w-4 h-4 text-accent-forest" />
                            </div>
                            <p className="text-text-muted leading-relaxed text-lg">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-navy-light relative overflow-hidden border-t border-border-flat/10">
        <div className="absolute w-96 h-96 bg-accent-emerald/10 rounded-full blur-[100px] -top-24 right-0 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-text-pure mb-6 leading-tight">
              {t.cta.titleLine1} <span className="text-accent-emerald">{t.cta.titleAccent}</span>{t.cta.titleLine2 ? ` ${t.cta.titleLine2}` : ''}
            </h2>
            <p className="text-text-off-white text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              {t.cta.desc}
            </p>
            <Link href={`${prefix}/contact`} tabIndex={-1}>
              <Button size="lg" className="px-8">
                {t.cta.cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}