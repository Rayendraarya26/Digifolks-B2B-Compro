"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { servicesData } from "@/data/services";
import { usePageTransition } from "@/hooks/UsePageTransition";


export default function ServicesSplitSync() {
  const [activeSection, setActiveSection] = useState<string>(servicesData[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  const isTransitionReady = usePageTransition();

  // --- Scroll Progress Bar Logic ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative w-full overflow-x-clip bg-surface-light">
      <div className="mx-auto flex w-full max-w-360">
        
        {/* =========================================
            LEFT COLUMN: THE FIXED NAVIGATOR
        ========================================= */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={isTransitionReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
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
                  <span className={`font-display text-2xl font-black ${isActive ? service.theme.text : "text-text-primary"}`}>
                    {service.num}
                  </span>
                  <h2 className={`font-display text-4xl font-black uppercase tracking-tight sm:text-5xl ${isActive ? "text-text-primary" : "text-text-primary"}`}>
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
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isTransitionReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-24 mb-12 flex flex-col items-center text-center desktop:hidden"
          >
            <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tighter text-text-primary sm:text-6xl">
              Digital <span className="text-pop-yellow drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">Firepower</span>
            </h1>
            <p className="mt-4 font-bold text-text-primary/70">Scroll to explore our expertise.</p>
          </motion.div>

          {servicesData.map((service) => (
            <motion.div
              key={`content-${service.id}`}
              id={service.id}
              // PERBAIKAN LOGIKA VIEWPORT
              // Mengubah amount menjadi "some" (sekitar 0.1) biar gampang ke-trigger
              onViewportEnter={() => setActiveSection(service.id)}
              viewport={{ amount: 0.1, margin: "-40% 0px -40% 0px" }}
              className="flex min-h-screen flex-col justify-center py-24"
            >
              
              <div className="mb-8 flex items-center gap-4 desktop:hidden">
                <span className={`font-display text-4xl font-black ${service.theme.text}`}>{service.num}</span>
                <h2 className="font-display text-3xl font-black uppercase text-text-primary">{service.title}</h2>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative mb-12 w-full overflow-hidden rounded-4xl border-2 border-text-primary shadow-[6px_6px_0_rgba(0,0,0,1)] ${service.theme.bg}`}
              >
                <div className="aspect-video w-full p-4 sm:p-6">
                   <div className="relative h-full w-full overflow-hidden rounded-xl border-2 border-text-primary bg-surface-dark">
                      {/* Image tag diperbaiki agar tidak undefined */}
                      <img src={service.imageUrl} alt={service.title} className="h-full w-full object-cover opacity-90" />
                   </div>
                </div>
                <div className="absolute -bottom-6 -right-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-text-primary bg-surface-light shadow-playful">
                   <img src={service.iconUrl} alt={`${service.title} Icon`} className="h-10 w-10 text-text-primary" />
                </div>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-12 text-xl font-bold leading-relaxed text-text-primary sm:text-2xl"
              >
                {service.description}
              </motion.p>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-4 rounded-4xl border-2 border-text-primary bg-surface-dark/5 p-6 sm:p-8"
                >
                  <h3 className="font-display text-sm font-black uppercase tracking-widest text-text-primary/50">Key Features</h3>
                  <ul className="flex flex-col gap-3">
                    {service.features.map(feat => (
                      <li key={feat} className="flex items-center gap-3 font-bold text-text-primary">
                        <div className={`h-2 w-2 rounded-full ${service.theme.bg} border border-text-primary`} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col gap-4 rounded-4xl border-2 border-text-primary bg-surface-dark/5 p-6 sm:p-8"
                >
                  <h3 className="font-display text-sm font-black uppercase tracking-widest text-text-primary/50">Core Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map(tech => (
                      <span key={tech} className="rounded-full border-2 border-text-primary bg-surface-light px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-text-primary shadow-[2px_2px_0_rgba(0,0,0,1)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}