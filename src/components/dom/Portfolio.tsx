"use client";

import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { motion, useInView, animate, AnimationPlaybackControls, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ExternalLink, Calendar, Briefcase, User } from "lucide-react";

const targetIds = ["port-1", "port-2", "port-3"];

// Gabungkan semua data
const allCards = [
  { id: "intro", type: "intro" },
  ...targetIds
    .map((id) => portfolioData.find((item) => item.id === id))
    .filter(Boolean)
    .map((item) => ({ ...item, type: "portfolio" })),
  { id: "outro", type: "outro" },
];

export default function Portfolio() {
  // Jarak ujung atas kartu yang ngintip (Diperpendek jadi 24px)
  const GAP = 24;
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = portfolioData.find(p => p.id === selectedId);

  return (
    <section className="relative w-full bg-surface-dark px-4 pb-24 pt-[10vh] sm:px-8 desktop:px-24">
      {/* RUMAH UTAMA TUMPUKAN KARTU */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {allCards.map((item, index) => {
          // MAGIC SINKRONISASI: 
          // Kita hitung seberapa besar "bantalan bawah" yang dibutuhin tiap kartu 
          // biar batas bawah mereka semua rata. (Kartu pertama butuh bantalan paling tebal)
          const bottomAlignmentPadding = (allCards.length - 1 - index) * GAP;

          return (
            <div
              key={item.id}
              className="sticky w-full"
              style={{
                // Jarak atas diperpendek pakai GAP 24px
                top: `calc(10vh + ${index * GAP}px)`,
                
                // Dead zone diperbesar! 120vh bikin jeda kosong yang dramatis
                marginTop: index === 0 ? "0" : "120vh", 
              }}
            >
              {/* Card visualnya fix 75vh biar bentuknya konsisten */}
              <motion.div layout className="h-[75vh] w-full">
                <AnimatePresence mode="popLayout">
                  <CardContent item={item} onSelect={setSelectedId} />
                </AnimatePresence>
              </motion.div>

              {/* BANTALAN BAWAH (Invisible Spacer) */}
              <div style={{ height: `${bottomAlignmentPadding}px` }} />
            </div>
          );
        })}

        {/* RUNWAY SPACER (Ruang Baca Card Terakhir)
          Tanpa ini, card terakhir bakal langsung kabur ditarik ke atas.
          100vh ngasih waktu buat user baca card terakhir, sebelum semuanya naik barengan!
        */}
        <div className="h-screen w-full" />
      </div>
        {/* THE PPT MAGIC OVERLAY */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <ProjectDetail project={selectedProject} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// --- MICRO-COMPONENT: Outro Card (Infinite Replay Counting) ---
const OutroCardInteractive = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const isInView = useInView(countRef, { margin: "-10% 0px" });
  
  const TOTAL_PROJECTS = portfolioData.length;

  useEffect(() => {
    let controls: AnimationPlaybackControls | undefined;
    
    if (isInView) {
      // Jalankan animasi maju saat masuk layar
      controls = animate(0, TOTAL_PROJECTS, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.round(latest)),
      });
    } else {
      // 2. RESET: Balikin ke 0 saat kartu keluar dari layar
      setCount(0);
    }

    return () => controls?.stop(); // Stop animasi kalau komponen unmount
  }, [isInView]);

  const handleClick = () => {
    window.location.href = "/work"; // Ganti ke halaman portfolio utama
  };

  return (
    <div 
      ref={countRef}
      className="group relative flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-[2.5rem] border-4 border-pop-yellow bg-pop-yellow p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]"
    >
      {/* 1. THE GIANT BACKGROUND COUNTER */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
        <span className="font-display text-[15rem] font-black leading-none text-text-primary desktop:text-[25rem]">
          {count}
        </span>
      </div>

      {/* 2. FOREGROUND CONTENT */}
      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* Badge yang ikut goyang dikit pas muncul */}
        <motion.div 
          animate={isInView ? { scale: [0.9, 1.1, 1], opacity: 1 } : { scale: 0.9, opacity: 0 }}
          className="mb-6 rounded-full border-2 border-text-primary bg-surface-light px-5 py-2 font-display text-sm font-black uppercase tracking-widest text-text-primary shadow-[2px_2px_0_rgba(0,0,0,1)]"
        >
          {count} Successful Missions
        </motion.div>
        
        <h3 className="font-display text-5xl font-black text-text-primary desktop:text-7xl">
          Hungry for more pixels?
        </h3>
        
        <p className="mt-4 max-w-md text-lg font-bold text-text-primary/70">
          If you love what you see, wait until you see the rest of our digital crafts.
        </p>

      </div>
      
      {/* 3. BUTTON */}
      <button onClick={handleClick} className="relative z-10 mt-8 rounded-xl border-4 border-text-primary bg-surface-light px-10 py-5 font-display text-xl font-black uppercase tracking-widest text-text-primary shadow-[6px_6px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 active:translate-y-0">
        Take a Deeper Dive
      </button>

    </div>
  );
};

// --- MICRO-COMPONENT: Card UI Builder ---
const CardContent = ({ item, onSelect }: { item: any, onSelect: (id: string) => void }) => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Kita taruh di useEffect biar aman dari error SSR Next.js
    const checkMobile = () => setIsMobile(window.innerWidth < 1280);
    checkMobile(); // Cek saat pertama kali web di-load
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 1. Desain Card Intro
  if (item.type === "intro") {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-[2.5rem] border-4 border-surface-light bg-surface-dark p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]">
        <h3 className="text-center font-display text-4xl font-bold text-surface-light desktop:text-6xl">
          Our Project <br />
          <span className="text-xl text-text-muted opacity-50 desktop:text-3xl">(Just keep scrolling down)</span>
        </h3>
      </div>
    );
  }

  // 2. Desain Card Outro
  if (item.type === "outro") {
    return <OutroCardInteractive />;
  }

  // 3. Desain Card Portfolio Utama
  return (
    // PERBAIKAN 1: Ganti div jadi motion.div dan pasang layoutId="card-{id}"
    <motion.div 
      layoutId={`card-${item.id}`}
      onClick={isMobile ? () => onSelect(item.id) : undefined} // Hanya aktif di desktop, di mobile biar klik langsung ke detail
      className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[2.5rem] border-4 border-pop-green bg-surface-light p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] transition-colors hover:border-pop-pink desktop:p-12"
    >
      
      {/* PERBAIKAN 2: Bungkus gambar dengan motion.div dan pasang layoutId="image-{id}" */}
      <motion.div 
        layoutId={`image-${item.id}`}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <Image 
          src={item.imageUrl}
          alt={item.headline}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          className="object-cover object-center opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
          priority={false} 
        />
      </motion.div>

      {/* Shadow Gradient biar teks selalu kebaca */}
      <div className="absolute inset-0 z-0 bg-linear-to-t from-surface-dark/90 via-surface-dark/40 to-transparent" />

      {/* PERBAIKAN 3: Bungkus teks info dengan motion.div dan pasang layoutId="info-{id}" */}
      <motion.div 
        layoutId={`info-${item.id}`}
        className="relative z-10 flex flex-col items-start gap-4 translate-y-8 transition-transform duration-500 group-hover:translate-y-0"
      >
        <div className="flex flex-wrap gap-2">
          {item.tags?.map((tag: string) => (
            <span key={tag} className="rounded-full border-2 border-text-primary bg-pop-yellow px-3 py-1 text-xs font-bold uppercase text-text-primary shadow-[2px_2px_0_rgba(0,0,0,1)]">
              {tag}
            </span>
          ))}
        </div>
        <div>
          <p className="font-display font-bold uppercase tracking-widest text-surface-light/80 drop-shadow-md">
            {item.client} &mdash; {item.projectType}
          </p>
          <h4 className="mt-2 font-display text-3xl font-black leading-tight text-surface-light drop-shadow-lg desktop:text-5xl">
            {item.headline}
          </h4>
        </div>
        
        <button onClick={() => onSelect(item.id)} className="mt-4 w-fit rounded-full border-2 border-text-primary bg-surface-light px-6 py-3 font-bold text-text-primary opacity-0 shadow-[4px_4px_0_rgba(0,0,0,1)] transition-opacity duration-500 group-hover:opacity-100">
          View Project Case
        </button>
      </motion.div>

    </motion.div>
  );
};

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
          <ArrowLeft className="h-6 w-6" /> Back to Showcase
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