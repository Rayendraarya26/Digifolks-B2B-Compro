import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";

const allProjects = [
  {
    slug: "fleet-tracking",
    title: "Real-time Fleet Tracking & Route Optimization System",
    client: "Logistics Corp",
    industry: "Supply Chain",
    duration: "8 months",
    year: "2024",
    metric: "40%",
    metricLabel: "Fuel Efficiency Improvement",
    tags: ["IoT", "Real-time Analytics", "Route Optimization", "Dashboard"],
    overview: "Klien memiliki lebih dari 500 armada yang dikelola secara manual dengan spreadsheet dan laporan harian. Tidak ada visibilitas real-time terhadap posisi kendaraan, konsumsi BBM, atau efisiensi rute. Kami membangun platform terpadu untuk memonitor seluruh armada secara real-time.",
    challenges: [
      "Data armada tersebar di berbagai sistem yang tidak terintegrasi.",
      "Tidak ada visibilitas real-time terhadap posisi dan status kendaraan.",
      "Rute pengiriman tidak optimal, menyebabkan pemborosan BBM hingga 40%.",
      "Pelaporan memakan waktu berhari-hari karena proses manual."
    ],
    solutions: [
      "Membangun IoT gateway untuk integrasi perangkat GPS dan sensor BBM pada seluruh armada.",
      "Mengembangkan dashboard real-time dengan WebSocket untuk monitoring posisi live.",
      "Implementasi algoritma optimasi rute berbasis machine learning yang memperhitungkan traffic dan kondisi jalan.",
      "Sistem reporting otomatis dengan scheduled jobs dan notifikasi anomali."
    ],
    results: [
      { value: "40%", label: "Penghematan BBM" },
      { value: "500+", label: "Armada Terlacak" },
      { value: "<2s", label: "Latensi Update" },
      { value: "90%", label: "Waktu Laporan Berkurang" },
    ]
  },
  {
    slug: "fintech-core",
    title: "High-Volume Transaction Processing Core",
    client: "Fintech Startup",
    industry: "Financial Services",
    duration: "12 months",
    year: "2024",
    metric: "99.99%",
    metricLabel: "System Uptime",
    tags: ["Microservices", "Kafka", "Kubernetes", "High-availability"],
    overview: "Startup fintech ini membutuhkan arsitektur backend yang mampu menangani lebih dari 10.000 transaksi per detik dengan latensi di bawah 50ms. Sistem monolitik sebelumnya sudah mencapai batas skalabilitas dan sering mengalami downtime saat peak hours.",
    challenges: [
      "Arsitektur monolitik tidak mampu menangani lonjakan transaksi.",
      "Downtime berulang pada saat peak hours mengurangi kepercayaan pengguna.",
      "Skalabilitas horizontal tidak dimungkinkan dengan arsitektur yang ada.",
      "Tidak ada mekanisme failover dan disaster recovery yang memadai."
    ],
    solutions: [
      "Dekomposisi monolith menjadi 12 microservices independen menggunakan Kubernetes.",
      "Implementasi Event-Driven Architecture dengan Apache Kafka untuk decoupling dan async processing.",
      "Multi-region deployment dengan automated failover dan zero-downtime deployment.",
      "Implementasi circuit breaker pattern dan rate limiting untuk resiliensi sistem."
    ],
    results: [
      { value: "99.99%", label: "Uptime" },
      { value: "10K+", label: "TPS Capacity" },
      { value: "<50ms", label: "Avg. Latency" },
      { value: "0", label: "Data Loss Incidents" },
    ]
  },
  {
    slug: "qa-dashboard",
    title: "Automated Production QA Dashboard",
    client: "Manufacturing Co",
    industry: "Industry 4.0",
    duration: "6 months",
    year: "2023",
    metric: "+85%",
    metricLabel: "Defect Detection Rate",
    tags: ["Computer Vision", "Dashboard", "Automation", "Edge Computing"],
    overview: "Pabrik manufaktur ini memiliki proses quality assurance yang sepenuhnya manual. Inspector harus memeriksa setiap produk secara visual, proses yang lambat dan rentan terhadap human error. Kami mengintegrasikan model computer vision ke lini produksi.",
    challenges: [
      "Inspeksi QA manual hanya mampu mendeteksi 60% cacat produk.",
      "Bottleneck pada lini produksi karena proses inspeksi yang lambat.",
      "Tidak ada data historis untuk analisis tren kualitas.",
      "Biaya QA manual yang terus meningkat seiring volume produksi."
    ],
    solutions: [
      "Deployment model computer vision (YOLOv8) pada edge devices di setiap lini produksi.",
      "Dashboard real-time untuk monitoring kualitas dengan alert system terintegrasi.",
      "Pipeline data untuk analisis tren cacat produk dan predictive maintenance.",
      "Integrasi dengan sistem ERP existing untuk automated reject tracking."
    ],
    results: [
      { value: "+85%", label: "Detection Rate" },
      { value: "3x", label: "Throughput Increase" },
      { value: "60%", label: "QA Cost Reduction" },
      { value: "< 100ms", label: "Inspection Time" },
    ]
  },
];

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const project = allProjects.find(p => p.slug === slug) || allProjects[0];

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
            <div className="flex flex-wrap gap-3 mb-6">
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

          {/* Results Grid in Hero */}
          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {project.results.map((r, i) => (
                <div key={i} className="bg-navy-light/50 backdrop-blur-sm border border-border-flat/10 rounded-xl p-5">
                  <div className="text-3xl md:text-4xl font-bold text-accent-emerald mb-1">{r.value}</div>
                  <div className="text-xs text-text-off-white/50 uppercase tracking-wider">{r.label}</div>
                </div>
              ))}
            </div>
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
                <div className="bg-bg-pure border border-border-flat rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-navy-base uppercase tracking-wider mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 text-xs font-mono bg-[#1e293b]/5 text-text-muted rounded-lg border border-border-flat">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

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
    </div>
  );
}
