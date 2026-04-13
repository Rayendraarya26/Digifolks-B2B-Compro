"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Zap, Settings, Globe, Smartphone, Lightbulb } from "lucide-react";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// --- CONFIGURATION ---
const FRAME_COUNT = 580;
const currentFrame = (index: number) => `/sequence/frame-${String(index + 1).padStart(4, "0")}.webp`;
// Track panjang, scrollbar PASTI muncul
const TOTAL_SCROLL_HEIGHT = "1200vh"; 

// --- DATA ---
const SERVICES = [
  {
    id: 1,
    title: "Artificial Intelligence",
    description: "We don't just code AI. We birth digital brains that learn, adapt, and outsmart humans. From chatbots that roast you to predictive models that know you better than your mom.",
    icon: "zap",
    theme: { bg: "bg-pop-pink", text: "text-pop-pink", border: "border-text-primary" },
  },
  {
    id: 2,
    title: "Management System",
    description: "ERP, CRM, DMS - whatever you call it, we make it sexy. Dashboards that pop, workflows that flow, and data that dances. Your business, but make it Gen Z.",
    icon: "settings",
    theme: { bg: "bg-pop-blue", text: "text-pop-blue", border: "border-text-primary" },
  },
  {
    id: 3,
    title: "Web Platform",
    description: "Not just websites. Hyper-interactive playgrounds with WebGL, shaders, and animations that break the internet. Your web presence will go viral (the good kind).",
    icon: "globe",
    theme: { bg: "bg-pop-yellow", text: "text-pop-yellow", border: "border-text-primary" },
  },
  {
    id: 4,
    title: "Mobile & Desktop Apps",
    description: "Android, iOS, Desktop - we build apps that feel native but look futuristic. Cross-platform sorcery with React Native, Flutter, and Electron. One codebase, infinite flex.",
    icon: "smartphone",
    theme: { bg: "bg-pop-green", text: "text-pop-green", border: "border-text-primary" },
  },
  {
    id: 5,
    title: "IT Solution & Consulting",
    description: "Stuck in digital hell? We rescue you with custom solutions, cloud migration, and consulting that actually makes sense. Your IT nightmare becomes our playground.",
    icon: "lightbulb",
    theme: { bg: "bg-pop-purple", text: "text-pop-purple", border: "border-text-primary" },
  },
];

const ICON_MAP: { [key: string]: any } = {
  zap: Zap, settings: Settings, globe: Globe, smartphone: Smartphone, lightbulb: Lightbulb,
};

// --- COMPONENT ---
export default function ServicesScrollytelling() {
  // DOM Refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // State & Data Refs
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // === HELPER: DRAW TO CANVAS ===
  const renderFrameToCanvas = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = imagesRef.current[index];
    
    if (!img || !ctx) return;
    
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    let renderWidth, renderHeight, x, y;
    
    if (canvasRatio > imgRatio) {
      renderWidth = canvas.width; 
      renderHeight = canvas.width / imgRatio;
      x = 0; 
      y = (canvas.height - renderHeight) / 2;
    } else {
      renderWidth = canvas.height * imgRatio; 
      renderHeight = canvas.height;
      x = (canvas.width - renderWidth) / 2; 
      y = 0;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, renderWidth, renderHeight);
  };

  // === EFFECT 1: Scroll Lock ===
  useEffect(() => {
    if (isLoaded) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isLoaded]);

  // === EFFECT 2: Image Preloading & Canvas Setup ===
  useEffect(() => {
    let loadedCount = 0;
    const PRELOAD_THRESHOLD = FRAME_COUNT * 0.2; 

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (i === 0) renderFrameToCanvas(0); 
        if (loadedCount > PRELOAD_THRESHOLD) setIsLoaded(true);
      };
      imagesRef.current.push(img);
    }

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        renderFrameToCanvas(Math.max(0, imagesRef.current.length - 1 > 0 ? 0 : 0)); 
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // === EFFECT 3: Master GSAP Choreography ===
  useEffect(() => {
    if (!isLoaded) return;

    const playhead = { frame: 0 };
    const elements = sectionRefs.current.filter(Boolean);

    // Inisialisasi Timeline Utama
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current, // Targetkan kontainer 1200vh
        start: "top top",
        end: "bottom bottom", // Berhenti saat scroll mencapai ujung bawah 1200vh
        scrub: 1, // Efek inersia
        // PIN DIHAPUS TOTAL! Kita murni pakai CSS Sticky
      },
    });

    // --- Konfigurasi Sinkronisasi Waktu ---
    const TOTAL_ANIMATION_DURATION = 185; // Telah dikalibrasi sesuai durasi DOM
    let currentTime = 20; 
    const ENTER_DUR = 12; 
    const HOLD_DUR = 10;  
    const EXIT_DUR = 12;  
    const OVERLAP = 4;    

    // --- TIMELINE A: Video Scrubbing ---
    tl.to(playhead, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      duration: TOTAL_ANIMATION_DURATION, // Video selesai persis bersamaan dengan DOM
      onUpdate: () => renderFrameToCanvas(Math.round(playhead.frame))
    }, 0);

    // --- TIMELINE B: DOM Elements Choreography ---
    
    // 1. Intro Out
    tl.to(introRef.current, { 
      y: "-100vh", opacity: 0, duration: 15, ease: "power2.inOut" 
    }, 5);

    // 2. Services Loop
    elements.forEach((el) => {
      const icon = el?.querySelector("[data-icon]");
      
      tl.fromTo(el, 
        { y: "100vh", opacity: 0, pointerEvents: "none" }, 
        { y: 0, opacity: 1, pointerEvents: "auto", duration: ENTER_DUR, ease: "power2.out" }, 
        currentTime
      );
      if (icon) {
        tl.fromTo(icon, { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: ENTER_DUR, ease: "back.out(1.5)" }, currentTime);
      }
      currentTime += ENTER_DUR;

      tl.to(el, { y: 0, opacity: 1, duration: HOLD_DUR }, currentTime);
      currentTime += HOLD_DUR;

      tl.to(el, { 
        y: "-100vh", opacity: 0, pointerEvents: "none", duration: EXIT_DUR, ease: "power2.in" 
      }, currentTime);
      
      currentTime += (EXIT_DUR - OVERLAP); 
    });

    // 3. Outro In
    tl.fromTo(outroRef.current, 
      { y: "100vh", opacity: 0, pointerEvents: "none" }, 
      { y: 0, opacity: 1, pointerEvents: "auto", duration: 15, ease: "power2.out" }, 
      currentTime
    );

    // Cleanup GSAP
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoaded]);

  // === RENDER HELPERS ===
  const renderIcon = (iconName: string) => {
    const Component = ICON_MAP[iconName];
    return Component ? <Component className="h-10 w-10 text-text-primary" /> : null;
  };

  // === RENDER UI ===
  return (
    // THE WRAPPER: Fisik rel scroll yang panjang (1200vh)
    <section ref={wrapperRef} className="relative w-full bg-surface-dark" style={{ height: TOTAL_SCROLL_HEIGHT }}>
      
      {/* THE STICKY STAGE: Panggung diam yang nempel di layar */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Loading Curtain */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 z-[100] flex items-center justify-center bg-surface-dark"
            >
              <div className="flex flex-col items-center space-y-6">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="h-20 w-20 border-4 border-surface-light/20 border-t-pop-yellow rounded-full" />
                <p className="font-display text-pop-yellow font-black uppercase tracking-widest text-sm desktop:text-xl animate-pulse">
                  Initializing Engine...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Canvas Layer */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full opacity-60" />

        {/* DOM Content Layer (Absolute Stacking Engine) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          
          {/* Intro Card */}
          <div ref={introRef} className="absolute inset-0 flex items-center justify-center px-6 lg:px-24">
            <div className="rounded-[3rem] border-4 border-text-primary bg-surface-light p-10 text-center shadow-playful desktop:p-16">
              <h2 className="font-display text-5xl font-black uppercase text-text-primary lg:text-8xl leading-none tracking-tighter">
                Our <span className="text-pop-yellow block drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">Expertise</span>
              </h2>
            </div>
          </div>

          {/* Service Cards Loop */}
          {SERVICES.map((service, index) => (
            <div key={service.id} ref={(el) => { sectionRefs.current[index] = el; }} className="absolute inset-0 flex items-center justify-center px-4 lg:px-24 opacity-0">
              <div className="relative w-full max-w-3xl flex flex-col items-center text-center">
                {/* Icon Badge */}
                <div data-icon className="relative z-10 -mb-8 inline-flex">
                  <div className={`p-4 rounded-full ${service.theme.bg} border-4 ${service.theme.border} shadow-playful`}>
                    {renderIcon(service.icon)}
                  </div>
                </div>
                {/* Main Card */}
                <div className={`relative w-full overflow-hidden rounded-[2.5rem] border-4 ${service.theme.border} bg-surface-light p-10 desktop:p-16 shadow-playful`}>
                  <div className={`absolute top-0 left-0 w-full h-4 ${service.theme.bg} border-b-4 ${service.theme.border}`} />
                  <h3 className={`font-display text-4xl lg:text-6xl font-black uppercase mt-4 mb-6 ${service.theme.text} drop-shadow-[3px_3px_0_rgba(0,0,0,1)] leading-none tracking-tight`}>
                    {service.title}
                  </h3>
                  <p className="mx-auto max-w-xl text-lg lg:text-xl text-text-primary font-bold leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Outro Card */}
          <div ref={outroRef} className="absolute inset-0 flex items-center justify-center px-6 lg:px-24 opacity-0">
            <motion.button
              whileHover={{ scale: 1.05, y: -4, boxShadow: "12px 12px 0px var(--shadow-playful-hover)" }}
              whileTap={{ scale: 0.95 }}
              // Pointer events auto diaktifkan agar tombol bisa diklik
              className="pointer-events-auto group relative rounded-[2rem] border-4 border-text-primary bg-pop-yellow px-12 py-6 font-display text-2xl font-black uppercase tracking-widest text-text-primary shadow-playful transition-all duration-300"
            >
              Start Project
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
}