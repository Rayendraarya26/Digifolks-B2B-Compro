"use client";

import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { motion, useScroll, useTransform, useSpring, useInView, animate, AnimationPlaybackControls} from "framer-motion";
import { useRef, useState, useEffect } from "react";

const targetIds = ["port-1", "port-2", "port-3", "port-4"];

const displayPortfolios = [
  ...targetIds
    .map((id) => portfolioData.find((item) => item.id === id))
    .filter(Boolean)
    .map((item) => ({ ...item, type: "portfolio" }))
];

export default function Portfolio() {
  const containerRef = useRef(null);
  
  // Baca progres scroll dari container raksasa
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // THE BUTTER HACK 🧈 (TWEAKED FOR CINEMATIC SLOW-MO)
  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.8,       // Kartu dibikin lebih "berat" biar geraknya ngalir
    stiffness: 50,   // Tarikan per-scroll dilembutin (gak terlalu responsif/agresif)
    damping: 25,     // Rem-nya dibikin lebih pakem biar berhentinya super mulus
    restDelta: 0.001
  });

  return (
    // THE TRACK LENGTH: Diperpanjang jadi 1600vh!
    // Ini bikin user harus nge-scroll lebih panjang untuk nyelesaiin 100% animasi.
    // Hasilnya? Tiap kartu bakal jalan jauh lebih lambat dan elegan melintasi layar.
    <section ref={containerRef} className="relative w-full h-[1600vh] bg-surface-light">
      
      {/* THE STICKY STAGE */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-surface-light">
        
        {/* BACKGROUND DOODLES (Z-0) */}
        <ParallaxDoodles smoothProgress={smoothProgress} />

        {/* FASE 1: THE INK-SPILL INTRO (Z-10) */}
        <IntroHeroSection smoothProgress={smoothProgress} />

        {/* FASE 2: THE DIAGONAL DECK (Z-20 sampai Z-30) */}
        {displayPortfolios.map((port, idx) => (
          <DiagonalDeckCard 
            key={port.id} 
            port={port} 
            idx={idx} 
            smoothProgress={smoothProgress} 
          />
        ))}

        {/* FASE 3: THE CURTAIN OUTRO (Z-50) */}
        <OutroSection smoothProgress={smoothProgress} />

      </div>
    </section>
  );
}

// =====================================================================
// FASE 1: INTRO HERO SECTION (THE INK SPILL)
// =====================================================================
const IntroHeroSection = ({ smoothProgress }: { smoothProgress: any }) => {
  const text = "OUR PROJECT".split("");
  
  // Teks kecil juga ikut "ditahan" sampai 0.04, baru fade out bareng teks besar
  const fadeOut = useTransform(smoothProgress, [0.04, 0.10], [1, 0]);

  return (
    <motion.div 
      style={{ opacity: fadeOut }}
      className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
    >
      {/* TEKS BESAR "OUR PROJECT" (Per Huruf) */}
      <div className="flex flex-wrap justify-center overflow-hidden px-4 text-center">
        {text.map((char, idx) => (
          <AnimatedInkLetter key={idx} char={char} idx={idx} progress={smoothProgress} />
        ))}
      </div>

      {/* TEKS KECIL & GARIS PROGRESS */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }} // Ikut keriset!
        transition={{ delay: 0.3, duration: 1 }} // Fade in sedikit belakangan pas teks lagi jatuh
        className="mt-12 flex flex-col items-center gap-6"
      >
        <p className="font-display text-sm font-black uppercase tracking-[0.3em] text-text-primary/60">
          Scroll to explore
        </p>
        <div className="h-24 w-0.5 overflow-hidden bg-text-primary/20">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="h-full w-full bg-text-primary"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- LOGIKA ANIMASI TINTA TUMPAH PER HURUF ---
const AnimatedInkLetter = ({ char, idx, progress }: { char: string, idx: number, progress: any }) => {
  // 1. THE RANDOMIZER 🎲: Urutan acak pseudo-random untuk 11 karakter "OUR PROJECT"
  // Urutan: O(7), U(2), R(9), Space(0), P(4), R(8), O(1), J(10), E(5), C(3), T(6)
  const randomOrder = [7, 2, 9, 0, 4, 8, 1, 10, 5, 3, 6];
  const rank = randomOrder[idx] || 0;

  // 2. THE HOLD 🛑: Kita geser startWipe dari 0.00 menjadi 0.04.
  // Artinya, selama 4% scroll pertama (sekitar 40vh layar), teks bakal "ditahan" dan diem aja.
  const startWipe = 0.04 + (rank * 0.005); 
  const endWipe = startWipe + 0.03; // Kecepatan hapus

  const reverseSpill = useTransform(progress, [startWipe, endWipe], ["inset(0% 0 0% 0)", "inset(0% 0 100% 0)"]);

  return (
    <motion.span style={{ clipPath: reverseSpill, display: "inline-block" }}>
      <motion.span
        initial={{ clipPath: "inset(0% 0 100% 0)" }}
        whileInView={{ clipPath: "inset(0% 0 0% 0)" }}
        viewport={{ once: false }} // THE RESET FIX 🛠️: Berubah jadi false biar keriset tiap masuk layar!
        // Delay juga pakai 'rank' biar jatuhnya acak, bukan dari kiri ke kanan
        transition={{ delay: rank * 0.08, duration: 0.6, ease: "easeOut" }}
        className="font-display text-6xl desktop:text-[14vw] font-black uppercase tracking-tighter text-text-primary leading-none"
        style={{ display: "inline-block" }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </motion.span>
  );
};

// =====================================================================
// FASE 2: THE DIAGONAL DECK CARDS
// =====================================================================
const DiagonalDeckCard = ({ port, idx, smoothProgress }: { port: any; idx: number; smoothProgress: any }) => {
  // TIMING MAPPING (Total Scroll buat Kartu: 0.15 sampai 0.85)
  // Tiap kartu dapet jatah waktu 0.15 untuk jalan dari ujung ke ujung
  const enterStart = 0.15 + (idx * 0.15); // Masuk layar
  const centerPoint = 0.30 + (idx * 0.15); // Di tengah layar
  const exitPoint = 0.45 + (idx * 0.15); // Keluar layar

  const isLastCard = idx === 3;

  // 1. Translasi Diagonal (Infinite Train)
  const x = useTransform(
    smoothProgress, 
    [enterStart, centerPoint, exitPoint], 
    ["120vw", "0vw", isLastCard ? "0vw" : "-120vw"] // Kunci di tengah kalau ini kartu terakhir!
  );
  const y = useTransform(
    smoothProgress, 
    [enterStart, centerPoint, exitPoint], 
    ["120vh", "0vh", isLastCard ? "0vh" : "-120vh"]
  );

  // 2. Rotasi Lemparan
  const rotate = useTransform(
    smoothProgress, 
    [enterStart, centerPoint, exitPoint], 
    [0, 0, isLastCard ? 0 : -0]
  );

  // 3. Efek Mundur (Scale Down) saat kartu ditimpa kartu berikutnya
  const scale = useTransform(
    smoothProgress,
    [centerPoint, exitPoint],
    [1, isLastCard ? 1 : 0.9]
  );

  // Styling
  const isMint = idx % 2 === 0; 
  const bgColor = isMint ? "bg-[#86EFAC]" : "bg-[#D8B4FE]"; 

  return (
    <motion.div
      style={{ x, y, rotate, scale, zIndex: 20 + idx }} // Z-index nambah biar yg masuk selalu di atas
      className={`absolute flex w-[80vw] max-w-225 flex-col overflow-hidden rounded-[2.5rem] border-[6px] border-[#000000] shadow-[12px_12px_0_#000000] ${bgColor}`}
    >
      <div className="absolute inset-0 z-50 cursor-pointer desktop:hidden" onClick={() => window.location.href = `/work?projectId=${port.id}`} />

      {/* Pattern Titik */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-20" 
        style={{ backgroundImage: "radial-gradient(#000000 3px, transparent 3px)", backgroundSize: "24px 24px" }} 
      />
      
      {/* Konten Portofolio Asli */}
      <div className="relative z-10 flex h-full flex-col p-6 sm:p-8 desktop:p-16">
        <div className="relative w-full aspect-4/3 grow overflow-hidden rounded-4xl border-4 border-[#000000] bg-surface-dark">
          <Image src={port.imageUrl} alt={port.headline} fill className="object-cover" />
        </div>
        <div className="flex items-end justify-between shrink-0 pt-6 desktop:pt-10">
          <div className="flex flex-col pr-4">
            <p className="font-display text-sm font-black uppercase tracking-widest text-[#000000]/60">
              {port.projectType}
            </p>
            <h4 className="font-display text-3xl sm:text-5xl desktop:text-6xl font-black uppercase text-[#000000] mt-2 leading-none">
              {port.client}
            </h4>
          </div>
          <div 
            onClick={() => window.location.href = `/work?projectId=${port.id}`}
            className="hidden sm:flex shrink-0 cursor-pointer items-center justify-center rounded-full border-4 border-text-primary bg-[#FDE047] px-10 py-5 font-display text-lg font-black text-text-primary shadow-[4px_4px_0_rgba(0,0,0,1)] transition-transform duration-300 hover:bg-surface-light hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(0,0,0,1)] active:translate-y-0"
          >
            VIEW
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// =====================================================================
// FASE 3: THE OUTRO CURTAIN (SECTION NAIK DARI BAWAH)
// =====================================================================
const OutroSection = ({ smoothProgress }: { smoothProgress: any }) => {
  // Outro mulai naik saat scroll 0.85 sampai 0.95, menutupi seluruh layar
  const y = useTransform(smoothProgress, [0.85, 0.95], ["100vh", "0vh"]);
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

  return (
    <motion.div 
      style={{ y, zIndex: 50 }} 
      ref={countRef}
      className="absolute inset-0 flex h-screen w-full flex-col items-center justify-center bg-pop-pink p-8 text-center border-t-8 border-text-primary"
    >
      <div className="mb-8 rounded-full border-4 border-text-primary bg-surface-light px-6 py-2 font-display text-sm font-black uppercase tracking-widest text-text-primary shadow-[4px_4px_0_rgba(0,0,0,1)]">
        STABLE BUILD: v2.0
      </div>
      <h3 className="font-display text-5xl font-black uppercase leading-none tracking-tighter text-text-primary sm:text-7xl desktop:text-[8rem]">
        {count} Systems Deployed.
      </h3>
      <p className="mt-8 max-w-lg text-lg font-bold leading-relaxed text-text-primary/70 sm:text-xl">
        Click to decrypt our mission reports and see how we engineered solutions for complex business logic.
      </p>
      <button onClick={() => (window.location.href = "/work")} className="mt-12 rounded-xl border-4 border-text-primary bg-pop-yellow px-12 py-5 font-display text-2xl font-black uppercase tracking-widest text-text-primary shadow-[8px_8px_0_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[12px_12px_0_rgba(0,0,0,1)] active:translate-y-0">
        ACCESS DATA
      </button>
    </motion.div>
  );
};

// =====================================================================
// BACKGROUND PARALLAX DOODLES
// =====================================================================
const ParallaxDoodles = ({ smoothProgress }: { smoothProgress: any }) => {
  const y1 = useTransform(smoothProgress, [0, 1], [-200, 1000]); 
  const y2 = useTransform(smoothProgress, [0, 1], [1000, -200]); 
  const y3 = useTransform(smoothProgress, [0, 1], [200, 800]); 
  const rotate1 = useTransform(smoothProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(smoothProgress, [0, 1], [45, -360]);

  return (
    <div className="absolute inset-0 z-0 opacity-60 desktop:opacity-100">
      <motion.div style={{ y: y1, rotate: rotate1 }} className="absolute right-[15%] top-[10%] flex h-20 w-20 items-center justify-center bg-pop-pink border-4 border-text-primary shadow-[4px_4px_0_rgba(0,0,0,1)]">
        <div className="h-6 w-6 bg-text-primary rounded-full" />
      </motion.div>
      <motion.div style={{ y: y2, rotate: rotate2 }} className="absolute left-[10%] bottom-[10%] h-16 w-32 rounded-full bg-pop-blue border-4 border-text-primary shadow-[6px_6px_0_rgba(0,0,0,1)]" />
      <motion.div style={{ y: y3, rotate: rotate1 }} className="absolute right-[10%] top-[40%] flex h-24 w-24 items-center justify-center rounded-3xl bg-pop-yellow border-4 border-text-primary shadow-[6px_6px_0_rgba(0,0,0,1)]">
        <span className="font-display text-6xl font-black text-text-primary leading-none">+</span>
      </motion.div>
      <motion.div style={{ y: y1, rotate: rotate2 }} className="absolute left-[20%] top-[20%] h-0 w-0 border-l-40 border-r-40 border-b-70 border-l-transparent border-r-transparent border-b-pop-green drop-shadow-[6px_6px_0_rgba(0,0,0,1)]" />
    </div>
  );
};