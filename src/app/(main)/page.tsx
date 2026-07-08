import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/animations/Reveal";
import { ChevronDown, ArrowRight, Code, Server, Shield, LayoutTemplate, Database, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "Build Scalable Operational Systems for Your Business",
  description: "We design and develop scalable systems that reduce operational complexity, improve reliability, and support long-term business growth. Talk to our team today.",
};

export default function Home() {
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
                  Engineering Excellence
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-text-pure leading-tight mb-6 tracking-tight">
                  Engineered for <br />
                  <span className="text-accent-emerald">Scale & Stability.</span>
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-xl text-text-off-white mb-8 max-w-2xl leading-relaxed">
                  We build robust operational systems and enterprise software that reduce complexity, improve reliability, and accelerate your business growth.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact" tabIndex={-1}>
                    <Button size="lg">Jadwalkan Konsultasi</Button>
                  </Link>
                  <Link href="/work" tabIndex={-1}>
                    <Button size="lg" variant="ghost" className="group">
                      Lihat Hasil Kerja <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
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

      {/* Core DNA Section */}
      <section className="py-24 bg-bg-ice-blue relative border-b border-border-flat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-navy-base mb-4">Our Core DNA</h2>
              <p className="text-text-muted max-w-2xl mx-auto text-lg">Tiga pilar keahlian utama kami dalam memberikan solusi teknologi B2B kelas enterprise.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-8 h-8 text-accent-emerald mb-6" />,
                title: "Custom Software Engineering",
                desc: "Pengembangan sistem kustom dari nol yang dirancang khusus untuk memecahkan bottleneck operasional unik pada bisnis Anda."
              },
              {
                icon: <Server className="w-8 h-8 text-accent-emerald mb-6" />,
                title: "Scalable Infrastructure",
                desc: "Arsitektur cloud yang tangguh dan terukur untuk memastikan uptime 99.9% meski dengan lonjakan transaksi yang tinggi."
              },
              {
                icon: <Shield className="w-8 h-8 text-accent-emerald mb-6" />,
                title: "Enterprise Security",
                desc: "Implementasi standar keamanan tertinggi untuk melindungi data sensitif klien dan memastikan kepatuhan regulasi industri."
              }
            ].map((item, i) => (
              <Reveal key={i} delay={0.1 * (i + 1)}>
                <div className="p-8 h-67 bg-bg-pure border border-border-flat rounded-2xl relative hover:border-accent-forest/30 transition-all duration-300 shadow-lg">
                  {item.icon}
                  <h3 className="text-xl font-bold text-navy-base mb-3">{item.title}</h3>
                  <p className="text-text-muted leading-relaxed">{item.desc}</p>
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
                  Our Services
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-pure mb-4">Layanan Kami</h2>
                <p className="text-text-off-white max-w-xl text-lg">Infrastruktur dan rekayasa perangkat lunak yang dirancang untuk kebutuhan enterprise yang kompleks.</p>
              </div>
              <Link href="/services" className="inline-flex items-center text-accent-emerald hover:text-text-pure transition-colors font-medium group">
                Lihat Semua Layanan <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          {/* Bento Grid */}
          <Reveal delay={0.1}>
            <div className="grid md:grid-cols-12 gap-4">
              {/* Large Card */}
              <div className="md:col-span-7">
                <Link href="/services" className="group block h-full">
                  <div className="relative h-full bg-navy-base border border-border-flat/10 rounded-2xl p-8 md:p-10 overflow-hidden hover:border-accent-emerald transition-all duration-500">
                    <div className="absolute top-6 right-6 w-20 h-20 border border-accent-emerald/20 rounded-full group-hover:scale-150 transition-transform duration-700" />
                    <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent-emerald/10 rounded-full blur-2xl" />
                    <div className="relative z-10">
                      <div className="text-6xl md:text-7xl font-bold text-accent-emerald mb-4">01</div>
                      <LayoutTemplate className="w-10 h-10 text-accent-emerald mb-4" />
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-text-pure">Custom Web Applications</h3>
                      <p className="text-text-off-white text-lg max-w-lg leading-relaxed">Sistem manajemen operasional kustom berbasis web yang dirancang untuk memecahkan bottleneck spesifik pada bisnis Anda.</p>

                      <div className="mt-8 flex gap-2">
                        {['React', 'Next.js', 'Node.js'].map(tag => (
                          <span key={tag} className="px-3 py-1 bg-[#1e293b]/50 text-text-pure text-sm rounded-md border border-border-flat/10">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Right column */}
              <div className="md:col-span-5 grid gap-4">
                <Link href="/services" className="group block">
                  <div className="relative h-full bg-navy-base border border-border-flat/10 rounded-2xl p-8 overflow-hidden hover:border-accent-emerald transition-all duration-500">
                    <div className="absolute top-4 right-4 text-5xl font-bold text-accent-emerald">02</div>
                    <Database className="w-9 h-9 text-accent-emerald mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-text-pure">Cloud Architecture</h3>
                    <p className="text-text-off-white leading-relaxed">Arsitektur serverless dan containerized yang terukur, efisien, serta dioptimasi untuk biaya operasional minimal.</p>
                    <div className="mt-4 flex gap-2">
                      {['AWS', 'GCP'].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-[#1e293b]/50 text-text-pure text-sm rounded-md border border-border-flat/10">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
                <Link href="/services" className="group block">
                  <div className="relative h-full bg-navy-base border border-border-flat/10 rounded-2xl p-8 overflow-hidden hover:border-accent-emerald transition-all duration-500">
                    <div className="absolute top-4 right-4 text-5xl font-bold text-accent-emerald">03</div>
                    <Cpu className="w-9 h-9 text-accent-emerald mb-4" />
                    <h3 className="text-xl font-bold mb-2 text-text-pure">AI & Automation</h3>
                    <p className="text-text-off-white leading-relaxed">Otomatisasi proses bisnis dan integrasi model AI untuk efisiensi operasional.</p>
                    <div className="mt-4 flex gap-2">
                      {['Python', 'OpenAI'].map(tag => (
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

      {/* Overview Project Section */}
      <section className="py-24 bg-bg-ice-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-navy-base mb-4">Featured Work</h2>
              <p className="text-text-muted text-lg max-w-2xl mx-auto">Bagaimana sistem kami memecahkan masalah operasional di lapangan.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                slug: "gorillacoach",
                partner: "GORILLACOACHID",
                title: "Integrated Web e-Commerce & POS System",
                metric: "3-in-1 Unified Platform",
              },
              {
                slug: "kazeer",
                partner: "KAZEER SOLUSI DIGITAL",
                title: "Next-Generation FnB POS & AI Business Consultant",
                metric: "AI-Powered Analytics",
              }
            ].map((study, idx) => (
              <Reveal key={idx} delay={0.1 * idx}>
                <Link href={`/work/${study.slug}`} className="group block">
                  <div className="bg-bg-pure border border-border-flat rounded-2xl overflow-hidden hover:border-accent-forest/30 hover:shadow-xl transition-all duration-300">
                    <div className="aspect-video bg-navy-base relative overflow-hidden flex items-center justify-center p-6 border-b border-border-flat/50">
                      {/* Screenshot Mockup Container */}
                      <div className="w-full h-full border border-navy-light rounded-t-lg bg-[#0F172A] relative flex flex-col pt-3 px-4 shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-500">
                        <div className="flex gap-1.5 mb-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-border-flat/20"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-border-flat/20"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-border-flat/20"></div>
                        </div>
                        <div className="flex-1 bg-navy-light rounded-t-md opacity-50 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy-base"></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="text-accent-forest font-mono text-sm tracking-widest mb-2">{study.partner}</div>
                      <h3 className="text-2xl font-bold text-navy-base mb-6 group-hover:text-accent-forest transition-colors">{study.title}</h3>
                      <div className="flex flex-col border-t border-border-flat pt-4">
                        <div className="text-sm font-medium text-text-muted uppercase tracking-wider mb-1">Business Impact</div>
                        <div className="text-3xl md:text-4xl font-bold text-accent-forest">{study.metric}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Reveal delay={0.2}>
              <Link href="/work" tabIndex={-1}>
                <Button variant="secondary" className="px-8">Lihat Semua Studi Kasus</Button>
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
              <h2 className="text-3xl font-bold text-text-pure mb-4">Frequently Asked Questions</h2>
              <p className="text-text-off-white text-lg">Pertanyaan umum terkait layanan dan metodologi kami.</p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {[
              {
                q: "Bagaimana proses kerja sama dengan Digifolks?",
                a: "Kami memulai dengan sesi discovery untuk memahami tantangan operasional Anda secara mendalam. Selanjutnya, kami merancang blueprint arsitektur, melakukan pengembangan iteratif (Agile), hingga deployment dan maintenance berkelanjutan."
              },
              {
                q: "Apakah Digifolks menangani maintenance setelah sistem live?",
                a: "Ya. Kami menyediakan SLA (Service Level Agreement) tingkat enterprise yang mencakup monitoring 24/7, pemeliharaan rutin, dan dukungan teknis proaktif."
              },
              {
                q: "Berapa lama waktu rata-rata pengembangan sebuah sistem?",
                a: "Waktu pengembangan sangat bergantung pada kompleksitas sistem. MVP (Minimum Viable Product) umumnya memakan waktu 3-4 bulan, sementara sistem enterprise berskala penuh dapat memakan waktu 6-12 bulan."
              }
            ].map((faq, i) => (
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
              Siap Membangun Sistem <br className="hidden md:block" />
              <span className="text-accent-emerald">yang Benar-benar Bekerja?</span>
            </h2>
            <p className="text-text-off-white text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Jadwalkan sesi discovery gratis bersama tim engineer kami. Kami akan membantu Anda merancang blueprint arsitektur yang tepat untuk tantangan bisnis Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" tabIndex={-1}>
                <Button size="lg" className="px-8">
                  Jadwalkan Konsultasi Gratis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/work" tabIndex={-1}>
                <Button size="lg" variant="ghost" className="px-8">
                  Lihat Portfolio
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}