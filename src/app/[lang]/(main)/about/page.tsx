import { Metadata } from "next";
import { Reveal } from "@/components/animations/Reveal";
import { Users, Rocket, Lightbulb, TrendingUp, CheckCircle2, ArrowRight, Building2, Briefcase, FileCode2, LineChart, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getDictionary } from "@/lib/dictionaries";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> | { lang: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const dict = await getDictionary(lang as 'en' | 'id');
  const seo = dict.seo?.about || {
    title: "About Us",
    description: "Digifolks is a technology company focused on developing end-to-end digital solutions for enterprises.",
  };
  const url = `/${lang}/about`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: url,
      languages: {
        en: '/en/about',
        id: '/id/about',
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: url,
      type: "website",
    },
  };
}

const focusIcons = [
  <Globe key="globe" className="w-8 h-8 text-accent-emerald mb-4" />,
  <Building2 key="building" className="w-8 h-8 text-accent-emerald mb-4" />,
  <Lightbulb key="lightbulb" className="w-8 h-8 text-accent-emerald mb-4" />,
  <LineChart key="linechart" className="w-8 h-8 text-accent-emerald mb-4" />
];

const valuesIcons = [
  <Users key="users" className="w-8 h-8 text-accent-emerald mb-6" />,
  <Rocket key="rocket" className="w-8 h-8 text-accent-emerald mb-6" />,
  <Lightbulb key="lightbulb" className="w-8 h-8 text-accent-emerald mb-6" />,
  <TrendingUp key="trendingup" className="w-8 h-8 text-accent-emerald mb-6" />
];

const expertiseList = [
  "AI Chatbot & Virtual Assistant",
  "Computer Vision",
  "Object Detection & Counting",
  "OCR & Document Processing",
  "Recommendation System",
  "Predictive Analytics",
  "Generative AI",
  "AI Automation"
];

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> | { lang: string } }) {
  const resolvedParams = await params;
  const lang = (resolvedParams?.lang || 'en') as 'en' | 'id';
  const dict = await getDictionary(lang);
  const t = dict.about;
  const prefix = `/${lang}`;

  return (
    <div className="flex w-full flex-col min-h-screen bg-navy-base">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-navy-base border-b border-border-flat/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-emerald/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-light/50 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-light text-text-off-white font-mono text-xs mb-6 border border-border-flat/10 uppercase tracking-widest">
              {t.hero.tag}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text-pure mb-6 max-w-4xl leading-tight">
              {t.hero.titleLine1} <span className="text-accent-emerald">{t.hero.titleAccent}</span> {t.hero.titleLine2}
            </h1>
            <p className="text-xl text-text-off-white max-w-3xl leading-relaxed">
              {t.hero.desc}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats / Vision & Mission Section */}
      <section className="py-20 bg-bg-ice-blue border-b border-border-flat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Reveal delay={0.1}>
              <div className="text-center p-6">
                <div className="text-5xl font-bold text-navy-base mb-2">2026</div>
                <p className="text-text-muted font-mono uppercase tracking-wider text-sm">{t.stats.founded}</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="text-center p-6">
                <div className="text-5xl font-bold text-navy-base mb-2">10+</div>
                <p className="text-text-muted font-mono uppercase tracking-wider text-sm">{t.stats.projects}</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="text-center p-6">
                <div className="text-5xl font-bold text-navy-base mb-2">5</div>
                <p className="text-text-muted font-mono uppercase tracking-wider text-sm">{t.stats.industries}</p>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="text-center p-6">
                <div className="text-5xl font-bold text-navy-base mb-2">7</div>
                <p className="text-text-muted font-mono uppercase tracking-wider text-sm">{t.stats.coreServices}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Focus Section */}
      <section className="py-24 bg-navy-base text-text-pure relative border-b border-border-flat/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-text-pure mb-4">{t.focus.title}</h2>
              <p className="text-text-off-white max-w-2xl mx-auto text-lg">{t.focus.desc}</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Digital Transformation" },
              { title: "Enterprise Software" },
              { title: "Artificial Intelligence" },
              { title: "Cloud Technology" }
            ].map((item, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div className="p-8 h-full bg-navy-light/30 border border-border-flat/20 rounded-2xl text-center hover:border-accent-emerald/50 transition-all duration-300">
                  <div className="flex justify-center">{focusIcons[i]}</div>
                  <h3 className="text-xl font-bold text-text-pure">{item.title}</h3>
                </div>
              </Reveal>
            ))}
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
            {t.coreValues.items.map((item: { title: string; desc: string }, i: number) => (
              <Reveal key={i} delay={0.1 * (i + 1)}>
                <div className="p-8 h-full bg-bg-pure border border-border-flat rounded-2xl relative hover:border-accent-forest/30 transition-all duration-300 shadow-lg">
                  {valuesIcons[i]}
                  <h3 className="text-xl font-bold text-navy-base mb-3">{item.title}</h3>
                  <p className="text-text-muted leading-relaxed text-sm">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities & Expertise */}
      <section className="py-24 bg-navy-base text-text-pure relative border-b border-border-flat/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-text-pure mb-4">{t.expertise.title}</h2>
              <p className="text-text-off-white max-w-2xl mx-auto text-lg">{t.expertise.desc}</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertiseList.map((expertise, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <div className="flex items-center gap-4 p-5 bg-navy-light/30 border border-border-flat/20 rounded-xl hover:border-accent-emerald/50 hover:bg-navy-light/50 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-accent-emerald/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-accent-emerald" />
                  </div>
                  <h3 className="text-text-pure font-medium">{expertise}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-navy-light relative overflow-hidden border-t border-border-flat/10">
        <div className="absolute w-96 h-96 bg-accent-emerald/10 rounded-full blur-[100px] -top-24 right-0 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-text-pure mb-6 leading-tight">
              {t.cta.titleLine1} <span className="text-accent-emerald">{t.cta.titleAccent}</span>
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
              <Link href={`${prefix}/services`} tabIndex={-1}>
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
