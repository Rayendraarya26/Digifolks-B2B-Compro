import { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Database, LayoutTemplate, Layers, Cpu, Code, Lock, CheckCircle2, ArrowRight, Smartphone, PenTool, Wrench, Briefcase, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Services — Scalable System Development",
  description: "Custom system development, enterprise tools, AI-driven platforms, and integrated ecosystems built for scalability and efficiency.",
};

const services = [
  {
    id: "01",
    title: "Custom Software Development",
    icon: <Code className="w-10 h-10 text-accent-forest" />,
    summary: "Pengembangan sistem perangkat lunak kustom dan scalable yang dirancang khusus untuk memenuhi kebutuhan proses bisnis operasional Anda.",
    details: [
      "Sistem Enterprise Resource Planning (ERP).",
      "Customer Relationship Management (CRM).",
      "Sistem Informasi Manajemen spesifik industri.",
      "Arsitektur Microservices yang scalable."
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Go"],
  },
  {
    id: "02",
    title: "Website Development",
    icon: <Globe className="w-10 h-10 text-accent-forest" />,
    summary: "Pembuatan website company profile, e-commerce, hingga web portal dengan performa tinggi dan desain yang modern.",
    details: [
      "Company Profile dan Landing Page interaktif.",
      "Sistem e-commerce terintegrasi payment gateway.",
      "Portal B2B dengan akses pengguna kustom.",
      "Optimasi SEO dan performa (Core Web Vitals)."
    ],
    tech: ["React", "Next.js", "TailwindCSS", "CMS"],
  },
  {
    id: "03",
    title: "Mobile App Development",
    icon: <Smartphone className="w-10 h-10 text-accent-forest" />,
    summary: "Pengembangan aplikasi mobile native dan cross-platform untuk iOS dan Android demi jangkauan pengguna yang lebih luas.",
    details: [
      "Aplikasi iOS dan Android berbasis React Native / Flutter.",
      "Aplikasi internal untuk produktivitas karyawan.",
      "Integrasi notifikasi push dan fitur device-native.",
      "Publikasi dan manajemen App Store & Play Store."
    ],
    tech: ["React Native", "Flutter", "Swift", "Kotlin"],
  },
  {
    id: "04",
    title: "AI Development",
    icon: <Cpu className="w-10 h-10 text-accent-forest" />,
    summary: "Solusi kecerdasan buatan, machine learning, dan automasi untuk membantu mempercepat proses pengambilan keputusan dan operasional bisnis.",
    details: [
      "AI Chatbot & Virtual Assistant.",
      "Computer Vision & Object Detection.",
      "OCR & Document Processing.",
      "Predictive Analytics & Recommendation System."
    ],
    tech: ["Python", "TensorFlow", "OpenAI", "PyTorch"],
  },
  {
    id: "05",
    title: "UI/UX Design",
    icon: <PenTool className="w-10 h-10 text-accent-forest" />,
    summary: "Desain antarmuka pengguna yang intuitif, estetis, dan fungsional untuk pengalaman pengguna yang maksimal.",
    details: [
      "Wireframing dan prototyping.",
      "User research dan usability testing.",
      "Desain antarmuka modern dan responsif.",
      "Pembuatan Design System perusahaan."
    ],
    tech: ["Figma", "Adobe XD", "Prototyping Tools"],
  },
  {
    id: "06",
    title: "Maintenance & Support",
    icon: <Wrench className="w-10 h-10 text-accent-forest" />,
    summary: "Dukungan teknis berkelanjutan, pemeliharaan sistem, dan pembaruan keamanan agar sistem Anda selalu berjalan optimal.",
    details: [
      "Monitoring performa dan uptime server 24/7.",
      "Pembaruan patch keamanan secara berkala.",
      "Dukungan teknis responsif dan SLA terjamin.",
      "Backup data rutin dan pemulihan sistem."
    ],
    tech: ["Monitoring", "Cloud Services", "CI/CD"],
  },
  {
    id: "07",
    title: "IT Consulting",
    icon: <Briefcase className="w-10 h-10 text-accent-forest" />,
    summary: "Konsultasi strategis untuk transformasi digital, pemilihan teknologi, dan arsitektur IT guna mendukung pertumbuhan bisnis Anda.",
    details: [
      "Audit arsitektur sistem existing.",
      "Perencanaan transformasi digital.",
      "Pemilihan teknologi dan infrastruktur cloud.",
      "Konsultasi keamanan siber dan kepatuhan data."
    ],
    tech: ["Cloud Strategy", "Architecture", "Security"],
  }
];

export default function ServicesPage() {
  return (
    <div className="flex w-full flex-col min-h-screen bg-navy-base">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-navy-base border-b border-border-flat/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-emerald/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-light text-text-off-white font-mono text-xs mb-6 border border-border-flat/10 uppercase tracking-widest">
              What We Do
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text-pure mb-6 max-w-3xl">
              Layanan <span className="text-accent-emerald">Engineering</span> Kami
            </h1>
            <p className="text-xl text-text-off-white max-w-3xl leading-relaxed">
              Kami tidak sekadar membuat aplikasi. Kami merancang arsitektur sistem operasional end-to-end yang menjamin skalabilitas, stabilitas, dan performa di level enterprise.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 bg-bg-ice-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, idx) => (
              <Reveal key={idx} delay={0.1}>
                <div className={`grid md:grid-cols-12 gap-10 md:gap-16 items-start ${idx % 2 !== 0 ? 'md:[direction:rtl] md:[&>*]:[direction:ltr]' : ''}`}>

                    {/* Left: Info */}
                    <div className="md:col-span-5">
                      <div className="sticky top-28">
                        <div className="text-6xl font-bold text-accent-forest/10 mb-2">{service.id}</div>
                        <div className="mb-4">{service.icon}</div>
                        <h2 className="text-2xl md:text-3xl font-bold text-navy-base mb-4 leading-tight">
                          {service.title}
                        </h2>
                        <p className="text-text-muted text-lg leading-relaxed mb-6">
                          {service.summary}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {service.tech.map((t) => (
                            <span key={t} className="px-3 py-1.5 text-xs font-mono bg-[#1e293b]/5 text-text-muted rounded-lg border border-border-flat">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Detailed capabilities */}
                    <div className="md:col-span-7">
                      <div className="space-y-4">
                        {service.details.map((detail, i) => (
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
              Butuh Solusi <span className="text-accent-emerald">Spesifik?</span>
            </h2>
            <p className="text-text-off-white text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Setiap bisnis memiliki tantangan unik. Hubungi kami untuk mendiskusikan bagaimana kami dapat merancang solusi yang tepat untuk kebutuhan Anda.
            </p>
            <Link href="/contact" tabIndex={-1}>
              <Button size="lg" className="px-8">
                Jadwalkan Konsultasi Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}