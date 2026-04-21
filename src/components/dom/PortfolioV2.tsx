"use client";

import Image from "next/image";
import { portfolioData } from "@/data/portfolio";
import { motion, useInView, animate, AnimationPlaybackControls, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// Ambil 4 porto pertama
const displayPortfolios = portfolioData.slice(0, 4);

export default function Portfolio() {
  return (
    <section className="relative w-full overflow-hidden bg-surface-light">
      <IntroCard />
      <ZigZagPortfolioSection />
      <OutroCardInteractive />
    </section>
  );
}

// --- LAYER 1: INTRO ---
const IntroCard = () => {
  return (
    <div className="relative z-10 flex min-h-[80vh] w-full flex-col items-center justify-center bg-surface-light px-4 text-center">
      <div className="mb-8 rounded-full border-2 border-text-primary bg-pop-pink px-6 py-2 font-display text-sm font-black uppercase tracking-widest text-text-primary shadow-playful">
        PHASE 02
      </div>
      <h3 className="font-display text-5xl font-black text-text-primary sm:text-7xl desktop:text-8xl">
        Our Digital <br />
        <span className="text-pop-blue drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">Footprints.</span>
      </h3>
      <p className="mt-6 text-xl font-bold text-text-primary/50">
        ( Keep scrolling to decrypt )
      </p>
    </div>
  );
};

// --- LAYER 2: THE ZIG-ZAG PARALLAX ---
const ZigZagPortfolioSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="relative w-full py-24 desktop:py-40">
      
      {/* THE DOODLES: Tetep ada biar white space makin hidup */}
      <ParallaxDoodles scrollProgress={scrollYProgress} />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-32 px-4 sm:px-12 desktop:gap-56 desktop:px-24">
        {displayPortfolios.map((port, idx) => {
          const isLeft = idx % 2 === 0;
          const alignmentClass = isLeft ? "self-start" : "self-end";
          
          return (
            <div key={port.id} className={`w-full max-w-175 ${alignmentClass}`}>
              {/* Kita lempar index (idx) buat nentuin warna Mint / Lilac */}
              <CardBorderSnake port={port} idx={idx} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- BACKGROUND PARALLAX DOODLES ---
const ParallaxDoodles = ({ scrollProgress }: { scrollProgress: any }) => {
  const y1 = useTransform(scrollProgress, [0, 1], [-100, 600]);
  const y2 = useTransform(scrollProgress, [0, 1], [300, -400]);
  const y3 = useTransform(scrollProgress, [0, 1], [0, 800]);
  const rotate1 = useTransform(scrollProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollProgress, [0, 1], [45, -200]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-60 desktop:opacity-100">
      <motion.div style={{ y: y1, rotate: rotate1 }} className="absolute right-[10%] top-[10%] flex h-20 w-20 items-center justify-center bg-pop-pink border-4 border-text-primary shadow-[4px_4px_0_rgba(0,0,0,1)] rotate-12">
        <div className="h-6 w-6 bg-text-primary rounded-full" />
      </motion.div>
      <motion.div style={{ y: y2, rotate: rotate2 }} className="absolute left-[5%] top-[40%] h-16 w-32 rounded-full bg-pop-blue border-4 border-text-primary shadow-[6px_6px_0_rgba(0,0,0,1)]" />
      <motion.div style={{ y: y3, rotate: rotate1 }} className="absolute right-[5%] top-[60%] flex h-24 w-24 items-center justify-center rounded-3xl bg-pop-yellow border-4 border-text-primary shadow-[6px_6px_0_rgba(0,0,0,1)]">
        <span className="font-display text-6xl font-black text-text-primary leading-none">+</span>
      </motion.div>
      <motion.div style={{ y: y1, rotate: rotate2 }} className="absolute left-[15%] bottom-[15%] h-0 w-0 border-l-40 border-r-40 border-b-70 border-l-transparent border-r-transparent border-b-pop-green drop-shadow-[6px_6px_0_rgba(0,0,0,1)]" />
    </div>
  );
};

// --- MICRO-COMPONENT: THE BORDER-SNAKE CARD (SAFE & PRECISION) ---
const CardBorderSnake = ({ port, idx }: { port: any; idx: number }) => {
  // Logic gonta-ganti warna (Mint buat genap, Lilac buat ganjil)
  const isMint = idx % 2 === 0;
  const bgColor = isMint ? "bg-[#86EFAC]" : "bg-[#D8B4FE]"; 
  const shadowClass = isMint 
    ? "shadow-[12px_12px_0_#FF90E8] hover:shadow-[16px_16px_0_#FF90E8]" // Bubblegum Pink shadow
    : "shadow-[12px_12px_0_#FDE047] hover:shadow-[16px_16px_0_#FDE047]"; // Lemon Zest shadow

  return (
    <motion.div
      // Pembungkus utama ngatur animasi saat InView
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="group relative flex w-full aspect-4/3 flex-col transition-transform duration-300 hover:-translate-y-4"
    >
      {/* 1. THE SNAKE BORDER (MENGGAMBAR BINGKAI KARTU) */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <svg className="h-full w-full overflow-visible">
          {/* Rect ini 100% dinamis ngikutin ukuran aspect-[4/3] lu */}
          <motion.rect
            x="3" y="3" // Offset sedikit biar ketebalan garis gak kepotong
            width="calc(100% - 6px)" 
            height="calc(100% - 6px)" 
            rx="36" // Sesuai dengan rounded-[2.5rem] dari kartu
            fill="none" 
            stroke="#000000" 
            strokeWidth="6"
            variants={{
              hidden: { pathLength: 0 },
              visible: { 
                pathLength: 1, 
                // Ular berjalan mengelilingi kartu selama 0.7 detik
                transition: { duration: 0.7, ease: "easeInOut" } 
              }
            }}
          />
        </svg>
      </div>

      {/* 2. THE POP-UP CARD (MUNCUL SETELAH BORDER SELESAI) */}
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { 
            opacity: 1, 
            scale: 1, 
            // Delay 0.7s (Nunggu si ular border kelar nggambar!), lalu pop-up membal!
            transition: { delay: 0.7, duration: 0.5, type: "spring", bounce: 0.5 } 
          }
        }}
        className={`relative z-10 flex h-full w-full flex-col overflow-hidden rounded-[2.5rem] border-[6px] border-[#000000] ${bgColor} ${shadowClass} transition-shadow duration-300`}
      >
        {/* Detail Pattern Titik-titik */}
        <div 
          className="pointer-events-none absolute inset-0 z-0 opacity-20" 
          style={{ backgroundImage: "radial-gradient(#000000 3px, transparent 3px)", backgroundSize: "24px 24px" }} 
        />

        {/* Kaca Mobile Shield */}
        <div className="absolute inset-0 z-50 cursor-pointer desktop:hidden" onClick={() => (window.location.href = `/work?projectId=${port.id}`)} />

        <div className="relative z-10 flex h-full flex-col p-6 sm:p-8 desktop:p-12">
          <div className="relative w-full grow overflow-hidden rounded-4xl border-4 border-[#000000] bg-surface-dark">
            <Image src={port.imageUrl} alt={port.headline} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
          </div>
          
          <div className="flex items-end justify-between shrink-0 pt-6 desktop:pt-8">
            <div className="flex flex-col pr-4">
              <p className="font-display text-sm font-black uppercase tracking-widest text-[#000000]/60">
                {port.projectType}
              </p>
              <h4 className="font-display text-2xl sm:text-4xl desktop:text-5xl font-black uppercase text-[#000000] mt-1 leading-none">
                {port.client}
              </h4>
            </div>

            <div 
              onClick={() => window.location.href = `/work?projectId=${port.id}`}
              className="hidden sm:flex shrink-0 cursor-pointer items-center justify-center rounded-full border-4 border-text-primary bg-surface-light px-8 py-4 font-display text-sm font-black text-text-primary shadow-[4px_4px_0_rgba(0,0,0,1)] transition-transform duration-300 hover:bg-pop-yellow hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(0,0,0,1)] active:translate-y-0"
            >
              VIEW
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- LAYER 3: OUTRO ---
const OutroCardInteractive = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const isInView = useInView(countRef, { margin: "-10% 0px" });

  const TOTAL_PROJECTS = portfolioData.length;

  useEffect(() => {
    let controls: AnimationPlaybackControls | undefined;

    if (isInView) {
      controls = animate(0, TOTAL_PROJECTS, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setCount(Math.round(latest)),
      });
    } else {
      setCount(0);
    }

    return () => controls?.stop();
  }, [isInView]);

  return (
    <div ref={countRef} className="relative flex min-h-screen w-full flex-col items-center justify-center gap-6 overflow-hidden bg-pop-green p-8 text-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
        <span className="font-display text-[20rem] font-black leading-none text-text-primary sm:text-[35rem] desktop:text-[45rem]">
          {count}
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div animate={isInView ? { scale: [0.9, 1.1, 1], opacity: 1 } : { scale: 0.9, opacity: 0 }} className="mb-8 rounded-full border-2 border-text-primary bg-surface-light px-6 py-2 font-display text-sm font-black uppercase tracking-widest text-text-primary shadow-[2px_2px_0_rgba(0,0,0,1)]">
          ALL SYSTEMS GO
        </motion.div>

        <h3 className="font-display text-6xl font-black uppercase leading-none tracking-tighter text-text-primary sm:text-7xl desktop:text-8xl">
          {count} Systems <br /> Deployed.
        </h3>

        <p className="mt-8 max-w-lg text-lg font-bold leading-relaxed text-text-primary/70 sm:text-xl">
          We don't just build websites. We engineer scalable solutions. Dive into our full archive to see the blueprints.
        </p>

        <button onClick={() => (window.location.href = "/work")} className="relative z-10 mt-10 rounded-xl border-4 border-text-primary bg-pop-yellow px-12 py-5 font-display text-2xl font-black uppercase tracking-widest text-text-primary shadow-[8px_8px_0_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[12px_12px_0_rgba(0,0,0,1)] active:translate-y-0">
          View The Archive
        </button>
      </div>
    </div>
  );
};