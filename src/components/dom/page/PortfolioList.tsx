"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ExternalLink, Calendar, Briefcase, User } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

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

// --- KOMPONEN BARU: LAYERED PROJECT CARD (CLEAN BORDERS & SMART MOBILE) ---
const LayeredProjectCard = ({ project, onSelect }: { project: typeof portfolioData[0], onSelect: (id: string) => void }) => {
  
  // 1. SIHIR DETEKSI LAYAR: Cek apakah user pakai HP/Tablet (lebar di bawah 1280px)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Kita taruh di useEffect biar aman dari error SSR Next.js
    const checkMobile = () => setIsMobile(window.innerWidth < 1280);
    checkMobile(); // Cek saat pertama kali web di-load
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  let spanClasses = "col-span-1 row-span-1 h-[300px]";
  if (project.size === "large") spanClasses = "col-span-1 md:col-span-2 row-span-1 md:row-span-2 h-[300px] md:h-[632px]";
  if (project.size === "wide") spanClasses = "col-span-1 md:col-span-2 row-span-1 h-[300px]";

  return (
    <motion.div
      layoutId={`card-${project.id}`}
      onClick={() => onSelect(project.id)}
      // 2. THE LOGIC: 
      // - Desktop: Mulai dari "idle" (laci nutup), buka pas di-hover.
      // - Mobile: Langsung tembak ke "hover" (laci kebuka terus).
      initial="idle"
      animate={isMobile ? "hover" : "idle"} 
      whileHover="hover"
      className={`group relative w-full cursor-pointer overflow-hidden rounded-4xl border-2 border-text-primary bg-surface-light shadow-[6px_6px_0_rgba(0,0,0,1)] transition-shadow duration-300 hover:shadow-[10px_10px_0_rgba(0,0,0,1)] ${spanClasses}`}
    >
      {/* 1. BACKGROUND LACI */}
      <div className={`absolute inset-0 z-0 h-full w-full ${project.color}`} />

      {/* 2. ISI LACI (Client & Tipe Project) */}
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