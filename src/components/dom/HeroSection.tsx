"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0 }
    );

    observer.observe(videoRef.current);
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden px-6 pb-20 pt-[45vh] tablet:flex-row tablet:items-center tablet:justify-start desktop:px-24 tablet:pb-20 tablet:pt-20">
      
      <div className="absolute left-0 top-0 z-0 h-[55vh] w-full pointer-events-none tablet:bottom-0 tablet:left-auto tablet:right-0 tablet:h-full tablet:w-[65%]">
        
        <div className="absolute inset-0 z-10" />
        
        <video 
          ref={videoRef}
          src="/Video/Hero/HeroAnimV2.webm" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="h-full w-full object-cover object-center opacity-90 pointer-events-none will-change-transform"
        />
      </div>

      <div className="relative z-20 flex w-full max-w-2xl flex-col items-start justify-center gap-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-auto inline-block rounded-full border-2 border-text-primary bg-pop-green px-4 py-1.5 text-sm font-bold uppercase tracking-widest shadow-playful"
        >
          System Online
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-5xl font-black leading-tight tracking-tighter drop-shadow-md desktop:text-7xl"
        >
          We Don't Just Build. <br />
          <span
            className="text-transparent bg-clip-text bg-linear-to-r from-pop-pink to-pop-blue stroke-text-primary stroke-2"
            style={{ WebkitTextStroke: "2px var(--color-text-primary)" }}
          >
            We Engineer.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="max-w-md text-lg font-medium text-text-muted drop-shadow-sm desktop:text-xl"
        >
          From pixel-perfect interfaces to robust backend architectures. Stand
          out in the digital noise or log off.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          whileHover={{ y: -4, boxShadow: "var(--shadow-playful-hover)" }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto mt-4 rounded-xl border-2 border-text-primary bg-pop-yellow px-8 py-4 font-display font-bold text-text-primary shadow-playful transition-all"
        >
          Initiate Sequence
        </motion.button>
      </div>
    </section>
  );
}