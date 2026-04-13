"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { Zap, Settings, Globe, Smartphone, Lightbulb } from "lucide-react";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// --- CONFIGURATION ---
const FRAME_COUNT = 580; // Pastikan ini pas dengan jumlah gambarmu!
const currentFrame = (index: number) => `/sequence/frame-${String(index + 1).padStart(4, "0")}.webp`;
// Track panjang untuk ngasih ruang scroll yang nyaman
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

export default function ServicesScrollytelling() {
  // DOM Refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null); // Balik ke Canvas!
  const introRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // State & Cache
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // === EFFECT 1: Scroll Lock ===
  useEffect(() => {
    document.body.style.overflow = isLoaded ? "" : "hidden";
    if (isLoaded) setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => { document.body.style.overflow = ""; };
  }, [isLoaded]);

  // === EFFECT 2: Image Preloading (Optimized) ===
  useEffect(() => {
    let loadedCount = 0;
    // Buka tirai loading kalau 20% gambar awal udah masuk RAM
    const PRELOAD_THRESHOLD = Math.floor(FRAME_COUNT * 0.2); 

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        // Paksa render frame pertama segera biar layar nggak kosong
        if (i === 0) renderFrameToCanvas(0); 
        if (loadedCount >= PRELOAD_THRESHOLD && !isLoaded) {
          setIsLoaded(true);
        }
      };
      // Tangkap error diam-diam biar gak menuhin console
      img.onerror = () => { console.warn(`Failed to load frame ${i}`); };
      imagesRef.current.push(img);
    }

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Re-render frame terakhir/pertama pas ukuran layar berubah
        renderFrameToCanvas(0); 
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // isLoaded tidak di-pass ke dependency array agar preload jalan terus di background

  // === HELPER: DRAW TO CANVAS ===
  const renderFrameToCanvas = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const img = imagesRef.current[frameIndex];
    
    // Pastikan gambar sudah full loaded sebelum di-draw
    if (!img || !img.complete || !ctx) return;
    
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    let renderWidth, renderHeight, x, y;
    
    // Logika object-fit: cover
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

  // === EFFECT 3: The Custom LERP & DOM Engine ===
  useEffect(() => {
    if (!isLoaded) return;

    const elements = sectionRefs.current.filter(Boolean);
    
    let targetProgress = 0;  // Input murni dari scroll
    let currentProgress = 0; // Output mulus dari LERP
    let animationFrameId: number;

    // 1. SETUP TIMELINE DOM (Di-pause untuk dikontrol manual)
    const tl = gsap.timeline({ paused: true });

    let currentTime = 20; 
    const ENTER_DUR = 12; 
    const HOLD_DUR = 10;  
    const EXIT_DUR = 12;  
    const OVERLAP = 4;    

    // Intro Out
    tl.to(introRef.current, { y: "-100vh", opacity: 0, duration: 15, ease: "power2.inOut" }, 5);

    // Services Loop
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

      tl.to(el, { y: "-100vh", opacity: 0, pointerEvents: "none", duration: EXIT_DUR, ease: "power2.in" }, currentTime);
      
      currentTime += (EXIT_DUR - OVERLAP); 
    });

    // Outro In
    tl.fromTo(outroRef.current, 
      { y: "100vh", opacity: 0, pointerEvents: "none" }, 
      { y: 0, opacity: 1, pointerEvents: "auto", duration: 15, ease: "power2.out" }, 
      currentTime
    );

    // Bikin DOM align dengan jumlah frame canvas (Padding ekstra di timeline)
    tl.to({}, { duration: 10 }); 

    // 2. TANGKAP PROGRESS SCROLL (Tanpa Scrub GSAP!)
    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        targetProgress = self.progress; 
      }
    });

    // 3. THE MAGICAL LERP RENDER LOOP
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    let lastRenderedFrame = -1; // Buat ngecek performa biar gak re-render frame yang sama

    const renderLoop = () => {
      // Faktor LERP: 0.08 itu kerasa empuk. Ubah ke 0.15 kalau mau lebih responsif.
      currentProgress = lerp(currentProgress, targetProgress, 0.08);

      // A. KALKULASI & RENDER CANVAS
      // Hitung posisi frame dari 0 sampai (FRAME_COUNT - 1)
      const exactFrame = currentProgress * (FRAME_COUNT - 1);
      const roundedFrame = Math.round(exactFrame);
      
      // OPTIMASI: Hanya draw ulang kalau angkanya benar-benar berubah (menghemat CPU)
      if (roundedFrame !== lastRenderedFrame) {
        // Double check agar index aman dari out of bounds
        const safeFrame = Math.min(Math.max(roundedFrame, 0), FRAME_COUNT - 1);
        renderFrameToCanvas(safeFrame);
        lastRenderedFrame = safeFrame;
      }

      // B. UPDATE DOM KOREOGRAFI
      // Dorong GSAP buat nge-update opacity & Y-axis elemen sesuai LERP progress
      tl.progress(currentProgress);

      // Terus berputar 60FPS
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Nyalakan mesin!
    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoaded]);

  const renderIcon = (iconName: string) => {
    const Component = ICON_MAP[iconName];
    return Component ? <Component className="h-10 w-10 text-text-primary" /> : null;
  };

  return (
    <section ref={wrapperRef} className="relative w-full bg-surface-dark" style={{ height: TOTAL_SCROLL_HEIGHT }}>
      
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        
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
                  Loading Frame Assets...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- BALIK KE CANVAS ENGINE --- */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full opacity-60" />

        {/* DOM Content Layer */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          
          <div ref={introRef} className="absolute inset-0 flex items-center justify-center px-6 lg:px-24">
            <div className="rounded-[3rem] border-4 border-text-primary bg-surface-light p-10 text-center shadow-playful desktop:p-16">
              <h2 className="font-display text-5xl font-black uppercase text-text-primary lg:text-8xl leading-none tracking-tighter">
                Our <span className="text-pop-yellow block drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">Expertise</span>
              </h2>
            </div>
          </div>

          {SERVICES.map((service, index) => (
            <div key={service.id} ref={(el) => { sectionRefs.current[index] = el; }} className="absolute inset-0 flex items-center justify-center px-4 lg:px-24 opacity-0">
              <div className="relative w-full max-w-3xl flex flex-col items-center text-center">
                <div data-icon className="relative z-10 -mb-8 inline-flex">
                  <div className={`p-4 rounded-full ${service.theme.bg} border-4 ${service.theme.border} shadow-playful`}>
                    {renderIcon(service.icon)}
                  </div>
                </div>
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

          <div ref={outroRef} className="absolute inset-0 flex items-center justify-center px-6 lg:px-24 opacity-0">
            <motion.button
              whileHover={{ scale: 1.05, y: -4, boxShadow: "12px 12px 0px var(--shadow-playful-hover)" }}
              whileTap={{ scale: 0.95 }}
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