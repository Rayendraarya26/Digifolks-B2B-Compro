import { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Database, LayoutTemplate, Layers, Cpu, Code, Lock, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Services — Scalable System Development",
  description: "Custom system development, enterprise tools, AI-driven platforms, and integrated ecosystems built for scalability and efficiency.",
};

const services = [
  {
    id: "01",
    title: "Custom Web Applications",
    icon: <LayoutTemplate className="w-10 h-10 text-accent-forest" />,
    summary: "Sistem manajemen operasional kustom berbasis web yang dirancang untuk memecahkan bottleneck spesifik pada bisnis Anda.",
    details: [
      "Dashboard analitik real-time untuk monitoring KPI operasional.",
      "Platform transaksi dan manajemen order dengan workflow kustom.",
      "Sistem CRM dan ERP terintegrasi yang disesuaikan kebutuhan industri.",
      "Progressive Web Apps (PWA) untuk akses mobile tanpa instalasi.",
    ],
    tech: ["Next.js", "React", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    id: "02",
    title: "Cloud Architecture & Infrastructure",
    icon: <Database className="w-10 h-10 text-accent-forest" />,
    summary: "Arsitektur serverless dan containerized yang terukur, efisien, serta dioptimasi untuk biaya operasional minimal.",
    details: [
      "Desain arsitektur microservices dengan Kubernetes orchestration.",
      "Serverless deployment untuk optimasi biaya dan auto-scaling.",
      "Multi-region setup dengan automated failover dan disaster recovery.",
      "Infrastructure as Code (IaC) untuk reproducible environments.",
    ],
    tech: ["AWS", "GCP", "Docker", "Kubernetes", "Terraform"],
  },
  {
    id: "03",
    title: "AI & Data Automation",
    icon: <Cpu className="w-10 h-10 text-accent-forest" />,
    summary: "Otomatisasi proses bisnis dan integrasi model AI untuk meningkatkan efisiensi operasional secara signifikan.",
    details: [
      "Computer vision untuk quality assurance dan deteksi anomali.",
      "NLP dan chatbot cerdas untuk customer service automation.",
      "Predictive analytics untuk forecasting dan pengambilan keputusan.",
      "ETL pipeline dan data warehouse untuk business intelligence.",
    ],
    tech: ["Python", "TensorFlow", "OpenAI", "Apache Kafka", "Spark"],
  },
  {
    id: "04",
    title: "API & System Integration",
    icon: <Layers className="w-10 h-10 text-accent-forest" />,
    summary: "Menghubungkan ekosistem aplikasi terpisah menjadi satu sistem terpusat yang seamless.",
    details: [
      "RESTful & GraphQL API design dengan dokumentasi OpenAPI.",
      "Integrasi payment gateway, shipping, dan third-party services.",
      "Event-driven architecture untuk real-time data synchronization.",
      "API gateway dan rate limiting untuk keamanan dan performa.",
    ],
    tech: ["GraphQL", "REST", "Webhooks", "RabbitMQ", "gRPC"],
  },
  {
    id: "05",
    title: "Legacy System Modernization",
    icon: <Code className="w-10 h-10 text-accent-forest" />,
    summary: "Refactoring dan migrasi sistem lawas Anda ke teknologi modern tanpa downtime operasional.",
    details: [
      "Assessment dan audit arsitektur sistem existing.",
      "Strangler fig pattern untuk migrasi bertahap tanpa risiko.",
      "Database migration dan data transformation pipeline.",
      "Pelatihan tim internal untuk adopsi teknologi baru.",
    ],
    tech: ["Migration Tools", "CI/CD", "Monitoring", "Testing"],
  },
  {
    id: "06",
    title: "Cybersecurity & Compliance",
    icon: <Lock className="w-10 h-10 text-accent-forest" />,
    summary: "Audit keamanan komprehensif dan implementasi standar compliance untuk proteksi data enterprise.",
    details: [
      "Penetration testing dan vulnerability assessment.",
      "Implementasi standar keamanan (ISO 27001, HIPAA, PCI-DSS).",
      "Zero-trust architecture dan identity management.",
      "Security monitoring dan incident response planning.",
    ],
    tech: ["OWASP", "OAuth 2.0", "SSO", "WAF", "SIEM"],
  },
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