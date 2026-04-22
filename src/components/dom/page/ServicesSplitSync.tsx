"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useSpring, Variants } from "framer-motion";
import { servicesData } from "@/data/services";
import { usePageTransition } from "@/hooks/UsePageTransition";

const titleVariants: Variants = {
  hidden: { opacity: 0, y: -40, rotate: -2 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotate: 0, 
    transition: { type: "spring", stiffness: 300, damping: 15, delay: 0.2 } 
  }
};

const descVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.4 } 
  }
};

// --- VARIANTS UNTUK SETIAP BAGIAN DALAM SERVICE (Staggered Neo-Brutalist) ---
const serviceContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Efek muncul beruntun
      delayChildren: 0.1,
    }
  }
};

const popUpBlock: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95, rotate: -2 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    rotate: 0, 
    transition: { type: "spring", stiffness: 250, damping: 14, mass: 1.2 } 
  }
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: -50, skewX: 10 },
  visible: { 
    opacity: 1, 
    x: 0, 
    skewX: 0, 
    // THE FIX 🛠️: Pakai spring dengan bounce: 0 (Rem ABS). 
    // Gerakan melintir bakal langsung diam di tempat tanpa getaran jeli!
    transition: { type: "spring", bounce: 0, duration: 0.6 } 
  }
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 50, skewX: -10 },
  visible: { 
    opacity: 1, 
    x: 0, 
    skewX: 0, 
    // THE FIX 🛠️: Sama, bunuh efek pantulannya biar solid ala Brutalism.
    transition: { type: "spring", bounce: 0, duration: 0.6 } 
  }
};

export default function ServicesSplitSync() {
  const [activeSection, setActiveSection] = useState<string>(
    servicesData[0].id,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const isTransitionReady = usePageTransition();

  // --- Scroll Progress Bar Logic ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-x-clip bg-surface-light"
    >
      <div className="mx-auto flex w-full max-w-360">
        {/* =========================================
            LEFT COLUMN: THE FIXED NAVIGATOR
        ========================================= */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={
            isTransitionReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
          }
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden desktop:sticky desktop:top-0 desktop:flex desktop:h-screen desktop:w-5/12 desktop:flex-col desktop:justify-center desktop:pl-24 desktop:pr-12"
        >
          <p className="mb-12 font-display text-sm font-black uppercase tracking-widest text-text-primary/50">
            Our Expertise
          </p>

          <div className="flex flex-col gap-6">
            {servicesData.map((service) => {
              const isActive = activeSection === service.id;

              return (
                <div
                  key={`nav-${service.id}`}
                  className={`flex items-center gap-6 transition-all duration-500 ${isActive ? "translate-x-4 opacity-100" : "translate-x-0 opacity-30 grayscale"}`}
                >
                  <span
                    className={`font-display text-2xl font-black ${isActive ? service.theme.text : "text-text-primary"}`}
                  >
                    {service.num}
                  </span>
                  <h2
                    className={`font-display text-4xl font-black uppercase tracking-tight sm:text-5xl ${isActive ? "text-text-primary" : "text-text-primary"}`}
                  >
                    {service.title}
                  </h2>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* =========================================
            THE MIDDLE DIVIDER & PROGRESS BAR (FIXED)
        ========================================= */}
        <div className="hidden desktop:block absolute left-5/12 top-0 bottom-0 w-0.5 bg-text-primary/10">
          <div className="sticky top-0 h-screen w-full bg-text-primary/10">
            <motion.div
              className="h-full w-full bg-text-primary origin-top"
              style={{ scaleY }}
            />
          </div>
        </div>

        {/* =========================================
            RIGHT COLUMN: THE SCROLLABLE CONTENT
        ========================================= */}
        <div className="flex w-full flex-col px-4 sm:px-6 desktop:w-7/12 desktop:px-24">
      
      {/* HEADER MOBILE (Hanya jalan pas isTransitionReady true) */}
      <div className="mt-24 mb-12 flex flex-col items-center text-center desktop:hidden">
        <motion.h1 
          variants={titleVariants}
          initial="hidden"
          animate={isTransitionReady ? "visible" : "hidden"}
          className="font-display text-5xl font-black uppercase leading-none tracking-tighter text-text-primary sm:text-7xl"
        >
          Digital{" "}
          <span className="text-pop-yellow drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
            Firepower
          </span>
        </motion.h1>
        <motion.p 
          variants={descVariants}
          initial="hidden"
          animate={isTransitionReady ? "visible" : "hidden"}
          className="mt-6 font-display text-xl font-bold uppercase tracking-widest text-text-primary/70"
        >
          Scroll to explore.
        </motion.p>
      </div>

      {/* MAPPING SETIAP SECTION (Punya sensor animasi masing-masing) */}
      {servicesData.map((service: any) => (
        <AnimatedServiceSection 
          key={`content-${service.id}`} 
          service={service} 
          setActiveSection={setActiveSection} 
        />
      ))}

    </div>
      </div>
    </section>
  );
}

function AnimatedServiceSection({ service, setActiveSection }: { service: any, setActiveSection: any }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isAnimVisible, setIsAnimVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Logika Active Section Navbar
        if (entry.isIntersecting) {
          setActiveSection(service.id);
          setIsAnimVisible(true);
        } else {
          // Logika Reset Directional
          if (entry.boundingClientRect.top > 0) {
            setIsAnimVisible(false);
          }
        }
      },
      {
        threshold: 0.3, // Nunggu sampai 30% section masuk layar baru di-trigger!
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [service.id, setActiveSection]);

  return (
    <motion.div
      ref={sectionRef}
      id={service.id}
      variants={serviceContainer}
      initial="hidden"
      animate={isAnimVisible ? "visible" : "hidden"}
      className="flex min-h-screen flex-col justify-center py-24"
    >
      {/* JUDUL MOBILE */}
      <motion.div variants={slideRight} className="mb-8 flex items-center gap-4 desktop:hidden">
        <span className={`font-display text-4xl font-black ${service.theme.text}`}>
          {service.num}
        </span>
        <h2 className="font-display text-3xl font-black uppercase text-text-primary">
          {service.title}
        </h2>
      </motion.div>

      {/* GAMBAR UTAMA & ICON */}
      <motion.div
        variants={popUpBlock}
        className={`relative mb-12 w-full overflow-visible rounded-4xl border-4 border-text-primary shadow-[8px_8px_0_rgba(0,0,0,1)] ${service.theme.bg}`}
      >
        <div className="aspect-video w-full p-4 sm:p-6 relative z-10">
          <div className="relative h-full w-full overflow-hidden rounded-xl border-4 border-text-primary bg-surface-dark group">
            <img
              src={service.imageUrl}
              alt={service.title}
              className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* ICON MELAYANG (Levitating Floating Badge) */}
        <motion.div 
          // Animasi ngambang infinite
          animate={{ 
            y: [-10, 10, -10], 
            rotate: [-5, 5, -5] 
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }} 
          className="absolute -bottom-8 -right-4 z-20 flex h-28 w-28 items-center justify-center rounded-full border-4 border-text-primary bg-surface-light shadow-[6px_6px_0_rgba(0,0,0,1)] desktop:-right-8"
        >
           <img
             src={service.iconUrl}
             alt={`${service.title} Icon`}
             className="h-12 w-12 text-text-primary object-contain"
           />
        </motion.div>
      </motion.div>

      {/* DESKRIPSI TEKS */}
      <motion.p
        variants={popUpBlock}
        className="mb-12 text-xl font-bold leading-relaxed text-text-primary sm:text-2xl"
      >
        {service.description}
      </motion.p>

      {/* DUA KOLOM FITUR & STACK */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <motion.div
          variants={slideRight}
          className="flex flex-col gap-4 rounded-[2.5rem] border-4 border-text-primary bg-surface-dark/5 p-6 shadow-[6px_6px_0_rgba(0,0,0,1)] sm:p-8 hover:-translate-y-1 transition-transform"
        >
          <h3 className="font-display text-sm font-black uppercase tracking-widest text-text-primary/50">
            Key Features
          </h3>
          <ul className="flex flex-col gap-3">
            {service.features.map((feat: string) => (
              <li key={feat} className="flex items-center gap-3 font-bold text-text-primary">
                <div className={`h-3 w-3 rounded-full ${service.theme.bg} border-2 border-text-primary`} />
                {feat}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={slideLeft}
          className="flex flex-col gap-4 rounded-[2.5rem] border-4 border-text-primary bg-surface-dark/5 p-6 shadow-[6px_6px_0_rgba(0,0,0,1)] sm:p-8 hover:-translate-y-1 transition-transform"
        >
          <h3 className="font-display text-sm font-black uppercase tracking-widest text-text-primary/50">
            Core Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech: string) => (
              <span
                key={tech}
                className="rounded-full border-2 border-text-primary bg-surface-light px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-text-primary shadow-[2px_2px_0_rgba(0,0,0,1)] transition-colors hover:bg-pop-pink"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}