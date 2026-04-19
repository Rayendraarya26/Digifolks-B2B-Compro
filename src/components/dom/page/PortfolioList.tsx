"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ExternalLink, Calendar, Briefcase, User } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

// --- DATA PROJECT ---
const PROJECTS = [
  {
    id: "wecore",
    title: "WeCore Agency",
    category: "Web Platform",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    color: "bg-pop-blue",
    size: "large",
    challenge: "WeCore butuh platform yang nggak cuma sekadar 'Company Profile', tapi juga mesin branding yang mencerminkan identitas Gen-Z mereka. Masalah utamanya adalah performa animasi yang berat sering bikin user bounce.",
    craft: ["Next.js", "Framer Motion", "GSAP", "Tailwind v4", "Three.js"],
    result: "Website berhasil dapet skor Lighthouse 98/100 dan meningkatkan inbound leads sebesar 40% dalam sebulan pertama berkat interaksi yang immersive.",
    client: "WeCore Digital",
    industry: "Creative Agency",
    date: "Januari 2026",
    link: "https://wecore.official"
  },
  {
    id: "court-vision",
    title: "Court Vision",
    category: "AI & System",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop",
    color: "bg-pop-pink",
    size: "normal",
    challenge: "Menganalisis pergerakan pemain basket secara real-time butuh efisiensi komputasi tinggi. Tantangannya adalah menyajikan data kompleks dalam UI yang simpel bagi pelatih.",
    craft: ["Python", "YOLOv8", "React", "FastAPI", "PostgreSQL"],
    result: "Sistem berhasil mendeteksi akurasi tembakan hingga 92% dan digunakan oleh tim kampus untuk evaluasi latihan mingguan.",
    client: "UGM Basketball",
    industry: "Sports Tech",
    date: "September 2025",
    link: "https://courtvision.ai"
  },
  {
    id: "wallet-service",
    title: "Wallet Service",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    color: "bg-pop-yellow",
    size: "normal",
    challenge: "Membangun sistem transaksi finansial yang anti-race-condition. Keamanan dan integritas data adalah harga mati saat ribuan transaksi masuk secara simultan.",
    craft: ["Golang", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
    result: "Backend mampu menangani 5000+ Request Per Second dengan latency di bawah 100ms tanpa ada kegagalan saldo.",
    client: "Personal Project",
    industry: "Fintech",
    date: "Februari 2026",
    link: "https://github.com/wallet-service"
  },
  {
    id: "positive-strength",
    title: "Positive Strength",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    color: "bg-pop-green",
    size: "wide",
    challenge: "Transisi dari sekadar product catalog statis menjadi sistem e-commerce penuh yang responsif dan terintegrasi dengan payment gateway.",
    craft: ["React", "TailwindCSS", "Node.js", "Express", "Midtrans"],
    result: "Sistem keranjang belanja dan checkout berhasil diimplementasi dengan konversi penjualan naik 25%.",
    client: "Positive Strength Co.",
    industry: "Retail & Apparel",
    date: "November 2025",
    link: "https://positivestrength.co"
  },
  {
    id: "unidash",
    title: "UniDash Template",
    category: "Web Platform",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    color: "bg-pop-purple",
    size: "normal",
    challenge: "Menciptakan admin template yang modular dan minimalist namun mudah disesuaikan untuk berbagai kebutuhan klien agency.",
    craft: ["Next.js", "Tailwind v4", "Zustand", "Radix UI", "Recharts"],
    result: "UniDash digunakan sebagai fondasi untuk 5 proyek klien berbeda, menghemat waktu development hingga 60 jam per proyek.",
    client: "Internal Product",
    industry: "SaaS",
    date: "Maret 2026",
    link: "https://unidash.wecore"
  },
];

const CATEGORIES = ["All", "Web App", "AI & System", "Backend", "E-Commerce"];

// --- KOMPONEN: OVERLAY DETAIL (FULL SCREEN) ---
const ProjectDetail = ({ project, onClose }: { project: typeof portfolioData[0], onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  return (
    <motion.div 
      layoutId={`card-${project.id}`}
      className="fixed inset-0 z-100 h-dvh w-full overflow-y-auto bg-surface-light"
    >
      <div className="sticky top-6 z-110 flex w-full justify-between px-6 pointer-events-none sm:px-12">
        <button 
          onClick={onClose}
          // Border ditipisin jadi border-2
          className="pointer-events-auto flex items-center gap-2 rounded-full border-2 border-text-primary bg-pop-pink px-6 py-3 font-display text-lg font-black uppercase text-text-primary shadow-playful transition-all hover:-translate-y-1 active:translate-y-0"
        >
          <ArrowLeft className="h-6 w-6" /> Back to Archive
        </button>
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 pb-24 desktop:px-0 sm:px-12">
        <div className="mt-8 flex flex-col gap-8 desktop:mt-0 desktop:flex-row desktop:items-center">
          <div className="w-full desktop:w-1/2">
            <motion.div 
              layoutId={`image-${project.id}`}
              // Border ditipisin jadi border-2
              className="relative aspect-video overflow-hidden rounded-4xl border-2 border-text-primary bg-surface-dark shadow-playful"
            >
              <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
            </motion.div>
          </div>
          <div className="w-full desktop:w-1/2">
            <motion.div layoutId={`info-${project.id}`}>
              <p className="mb-2 font-display text-lg font-black uppercase tracking-widest text-pop-pink">
                {project.projectType}
              </p>
              <h2 className="font-display text-5xl font-black uppercase leading-none tracking-tighter text-text-primary desktop:text-8xl sm:text-7xl">
                {project.title}
              </h2>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-12 desktop:flex-row">
          <div className="flex flex-col gap-12 desktop:w-2/3">
            <section>
              <h3 className="mb-4 font-display text-3xl font-black uppercase tracking-tight text-text-primary">The Challenge</h3>
              <p className="text-xl font-bold leading-relaxed text-text-primary/80">{project.challenge}</p>
            </section>
            <section>
              <h3 className="mb-6 font-display text-3xl font-black uppercase tracking-tight text-text-primary">The Craft</h3>
              <div className="flex flex-wrap gap-4">
                {project.tags.map((tech) => (
                  // Border ditipisin jadi border-2
                  <div key={tech} className="flex items-center gap-2 rounded-2xl border-2 border-text-primary bg-surface-light px-5 py-3 shadow-playful transition-transform hover:-translate-y-1">
                    <div className="h-3 w-3 rounded-full bg-pop-yellow" />
                    <span className="font-display text-sm font-black uppercase tracking-wider">{tech}</span>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-[2.5rem] border-2 border-text-primary bg-pop-green p-8 shadow-playful sm:p-10">
              <h3 className="mb-4 font-display text-3xl font-black uppercase tracking-tight text-text-primary">The Solutions</h3>
              <p className="text-xl font-black italic leading-relaxed text-text-primary">"{project.solutions}"</p>
            </section>
          </div>

          <aside className="desktop:w-1/3">
            <div className="sticky top-32 flex flex-col gap-6 rounded-[2.5rem] border-2 border-text-primary bg-pop-yellow p-8 shadow-playful">
              <div className="flex items-center gap-4">
                <div className="rounded-xl border-2 border-text-primary bg-surface-light p-2 shadow-playful"><User className="h-5 w-5" /></div>
                <div><p className="text-xs font-black uppercase opacity-50">Client</p><p className="font-display text-lg font-black uppercase">{project.client}</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-xl border-2 border-text-primary bg-surface-light p-2 shadow-playful"><Briefcase className="h-5 w-5" /></div>
                <div><p className="text-xs font-black uppercase opacity-50">Industry</p><p className="font-display text-lg font-black uppercase">{project.industry}</p></div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-xl border-2 border-text-primary bg-surface-light p-2 shadow-playful"><Calendar className="h-5 w-5" /></div>
                <div><p className="text-xs font-black uppercase opacity-50">Date</p><p className="font-display text-lg font-black uppercase">{project.date}</p></div>
              </div>
              <hr className="border-2 border-text-primary/20" />
              <a href={project.link} target="_blank" className="flex items-center justify-center gap-3 rounded-full border-2 border-text-primary bg-surface-light py-4 font-display text-lg font-black uppercase tracking-widest text-text-primary shadow-playful transition-all hover:-translate-y-1 hover:bg-pop-pink">
                Live Preview <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
};

// --- KOMPONEN BARU: LAYERED PROJECT CARD (CLEAN BORDERS) ---
const LayeredProjectCard = ({ project, onSelect }: { project: typeof portfolioData[0], onSelect: (id: string) => void }) => {
  let spanClasses = "col-span-1 row-span-1 h-[300px]";
  if (project.size === "large") spanClasses = "col-span-1 md:col-span-2 row-span-1 md:row-span-2 h-[300px] md:h-[632px]";
  if (project.size === "wide") spanClasses = "col-span-1 md:col-span-2 row-span-1 h-[300px]";

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={() => onSelect(project.id)}
      initial="idle"
      whileHover="hover"
      // Border ditipisin jadi border-2
      className={`group relative w-full cursor-pointer overflow-hidden rounded-4xl border-2 border-text-primary bg-surface-light shadow-[6px_6px_0_rgba(0,0,0,1)] transition-shadow duration-300 hover:shadow-[10px_10px_0_rgba(0,0,0,1)] ${spanClasses}`}
    >
      {/* 1. BACKGROUND LACI */}
      <div className={`absolute inset-0 z-0 h-full w-full ${project.color}`} />

      {/* 2. ISI LACI */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex h-20 items-center justify-between px-6">
        <motion.div
          variants={{
            idle: { y: 20, opacity: 0 },
            hover: { y: 0, opacity: 1 }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
          className="flex flex-col"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-text-primary/60">Client</p>
          <p className="font-display text-sm font-black uppercase text-text-primary">{project.client}</p>
        </motion.div>

        <motion.div
          variants={{
            idle: { y: 20, opacity: 0 },
            hover: { y: 0, opacity: 1 }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
        >
          <p className="rounded-full border-2 border-text-primary bg-surface-light px-3 py-1 text-xs font-bold uppercase tracking-widest text-text-primary shadow-[2px_2px_0_rgba(0,0,0,1)]">
            {project.projectType}
          </p>
        </motion.div>
      </div>

      {/* 3. COVER LACI (Gambar Utama + Judul) */}
      <motion.div
        layoutId={`image-${project.id}`}
        variants={{
          idle: { y: 0 },
          hover: { y: -80 } 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        // HAPUS SISA BORDER-B-4 DI SINI! Murni pakai background color aja
        className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-surface-dark transition-colors duration-300"
      >
        <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
        
        <div className="absolute inset-0 bg-linear-to-t from-surface-dark/90 via-surface-dark/20 to-transparent" />

        <motion.div layoutId={`info-${project.id}`} className="absolute bottom-6 left-6 right-6 flex flex-col items-start">
          <h3 className="font-display text-2xl font-black uppercase text-surface-light drop-shadow-[2px_2px_0_rgba(0,0,0,1)] sm:text-4xl">
            {project.title}
          </h3>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN PORTFOLIO PAGE ---
export default function PortfolioList() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Set jadi 4 biar paginationnya nongol dan bisa dites!
  const itemsPerPage = 4; 

  const filteredProjects = portfolioData.filter(p => activeFilter === "All" || p.projectType === activeFilter);
  const paginatedProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const selectedProject = portfolioData.find(p => p.id === selectedId);

  return (
    <section className="min-h-screen w-full bg-surface-light px-4 py-24 desktop:px-24 sm:px-6">
      
      <div className="mb-16 flex flex-col items-center text-center">
        <h1 className="font-display text-5xl font-black uppercase tracking-tighter text-text-primary desktop:text-8xl sm:text-7xl">
          The <span className="block text-pop-yellow drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">Archive</span>
        </h1>
      </div>

      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {CATEGORIES.map(cat => (
          <button 
            key={cat} onClick={() => { setActiveFilter(cat); setCurrentPage(1); }}
            // Border ditipisin jadi border-2
            className={`relative rounded-full border-2 border-text-primary px-6 py-3 font-display text-sm font-black uppercase tracking-widest transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)] ${activeFilter === cat ? "bg-pop-pink shadow-[4px_4px_0_rgba(0,0,0,1)] -translate-y-1 text-text-primary" : "bg-surface-light text-text-primary/70 hover:text-text-primary"}`}
          >
            {activeFilter === cat && (
              // Border layout id ditipisin juga
              <motion.div layoutId="active-pill" className="absolute inset-0 -z-10 rounded-full border-2 border-text-primary bg-pop-pink" />
            )}
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="grid w-full grid-cols-1 gap-6 desktop:grid-cols-4 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {paginatedProjects.map(project => (
            <LayeredProjectCard key={project.id} project={project} onSelect={setSelectedId} />
          ))}
        </AnimatePresence>
      </motion.div>

      {totalPages > 1 && (
        <div className="mt-16 flex items-center justify-center gap-6">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
            // Border pagination ditipisin
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-text-primary bg-pop-yellow shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:bg-pop-pink disabled:pointer-events-none disabled:opacity-50"
          ><ArrowLeft className="h-6 w-6 text-text-primary" /></button>
          <div className="font-display text-xl font-black uppercase text-text-primary">
            {currentPage} <span className="opacity-50">/ {totalPages}</span>
          </div>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-text-primary bg-pop-yellow shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:bg-pop-pink disabled:pointer-events-none disabled:opacity-50"
          ><ArrowRight className="h-6 w-6 text-text-primary" /></button>
        </div>
      )}

      {/* THE PPT MAGIC OVERLAY */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>

    </section>
  );
}