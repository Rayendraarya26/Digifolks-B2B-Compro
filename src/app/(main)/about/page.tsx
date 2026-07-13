import { Metadata } from "next";
import { Reveal } from "@/components/animations/Reveal";
import { Users, Rocket, Lightbulb, TrendingUp, CheckCircle2, ArrowRight, Building2, Briefcase, FileCode2, LineChart, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us — Digifolks",
  description: "Digifolks merupakan perusahaan teknologi yang berfokus pada pengembangan solusi digital end-to-end.",
};

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col min-h-screen bg-navy-base">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-navy-base border-b border-border-flat/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-emerald/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-light/50 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-light text-text-off-white font-mono text-xs mb-6 border border-border-flat/10 uppercase tracking-widest">
              Tentang Kami
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text-pure mb-6 max-w-4xl leading-tight">
              Transformasi Digital <span className="text-accent-emerald">End-to-End</span> untuk Bisnis Anda
            </h1>
            <p className="text-xl text-text-off-white max-w-3xl leading-relaxed">
              Digifolks merupakan perusahaan teknologi yang berfokus pada pengembangan solusi digital end-to-end. Kami membantu perusahaan mentransformasikan proses bisnis melalui pengembangan website, aplikasi, artificial intelligence, enterprise system, dan integrasi teknologi yang disesuaikan dengan kebutuhan bisnis.
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
                <p className="text-text-muted font-mono uppercase tracking-wider text-sm">Founded</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="text-center p-6">
                <div className="text-5xl font-bold text-navy-base mb-2">10+</div>
                <p className="text-text-muted font-mono uppercase tracking-wider text-sm">Projects Completed</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="text-center p-6">
                <div className="text-5xl font-bold text-navy-base mb-2">5</div>
                <p className="text-text-muted font-mono uppercase tracking-wider text-sm">Industries</p>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="text-center p-6">
                <div className="text-5xl font-bold text-navy-base mb-2">7</div>
                <p className="text-text-muted font-mono uppercase tracking-wider text-sm">Core Services</p>
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
              <h2 className="text-3xl font-bold text-text-pure mb-4">Our Focus</h2>
              <p className="text-text-off-white max-w-2xl mx-auto text-lg">Area spesialisasi kami dalam memberikan solusi teknologi.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Digital Transformation", icon: <Globe className="w-8 h-8 text-accent-emerald mb-4" /> },
              { title: "Enterprise Software", icon: <Building2 className="w-8 h-8 text-accent-emerald mb-4" /> },
              { title: "Artificial Intelligence", icon: <Lightbulb className="w-8 h-8 text-accent-emerald mb-4" /> },
              { title: "Cloud Technology", icon: <LineChart className="w-8 h-8 text-accent-emerald mb-4" /> }
            ].map((item, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div className="p-8 h-full bg-navy-light/30 border border-border-flat/20 rounded-2xl text-center hover:border-accent-emerald/50 transition-all duration-300">
                  <div className="flex justify-center">{item.icon}</div>
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
              <h2 className="text-3xl font-bold text-navy-base mb-4">Core Values</h2>
              <p className="text-text-muted max-w-2xl mx-auto text-lg">Prinsip yang memandu kami dalam setiap baris kode yang kami tulis dan solusi yang kami bangun.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Users className="w-8 h-8 text-accent-emerald mb-6" />,
                title: "Think Like a Partner",
                desc: "Kami bekerja sebagai partner, bukan sekadar vendor. Kami memahami tujuan bisnis sebelum menulis satu baris kode."
              },
              {
                icon: <Rocket className="w-8 h-8 text-accent-emerald mb-6" />,
                title: "Build Fast. Build Right.",
                desc: "Kami mengembangkan software secara agile untuk mempercepat delivery tanpa mengorbankan kualitas, keamanan, maupun stabilitas sistem."
              },
              {
                icon: <Lightbulb className="w-8 h-8 text-accent-emerald mb-6" />,
                title: "Solve Problems, Not Just Requirements",
                desc: "Kami tidak hanya mengembangkan fitur, tetapi memahami proses bisnis di baliknya untuk menghasilkan solusi yang benar-benar memberikan dampak."
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-accent-emerald mb-6" />,
                title: "Design for Growth",
                desc: "Setiap sistem dirancang modular, scalable, dan mudah dipelihara sehingga mampu beradaptasi dengan kebutuhan bisnis di masa depan."
              }
            ].map((item, i) => (
              <Reveal key={i} delay={0.1 * (i + 1)}>
                <div className="p-8 h-full bg-bg-pure border border-border-flat rounded-2xl relative hover:border-accent-forest/30 transition-all duration-300 shadow-lg">
                  {item.icon}
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
              <h2 className="text-3xl font-bold text-text-pure mb-4">AI Capabilities & Expertise</h2>
              <p className="text-text-off-white max-w-2xl mx-auto text-lg">Keahlian spesifik kami dalam menghadirkan solusi masa depan.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "AI Chatbot & Virtual Assistant",
              "Computer Vision",
              "Object Detection & Counting",
              "OCR & Document Processing",
              "Recommendation System",
              "Predictive Analytics",
              "Generative AI",
              "AI Automation"
            ].map((expertise, i) => (
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
              Siap Memulai <span className="text-accent-emerald">Transformasi Digital?</span>
            </h2>
            <p className="text-text-off-white text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Jadwalkan konsultasi dengan kami untuk mendiskusikan kebutuhan sistem dan strategi digitalisasi perusahaan Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" tabIndex={-1}>
                <Button size="lg" className="px-8">
                  Jadwalkan Konsultasi
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services" tabIndex={-1}>
                <Button size="lg" variant="ghost" className="px-8">
                  Pelajari Layanan Kami
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
