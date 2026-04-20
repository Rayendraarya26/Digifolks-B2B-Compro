"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeroSection({
  heroAnim,
  heroCTA,
}: {
  heroAnim: string;
  heroCTA: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // STATE UNTUK THE MASTER TRIGGER
  const [isDomReady, setIsDomReady] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // CEK DOM STABILITY PAKE REQUEST ANIMATION FRAME (Ide Jenius Lu)
  useEffect(() => {
    let frameId: number;
    frameId = requestAnimationFrame(() => {
      frameId = requestAnimationFrame(() => {
        setIsDomReady(true);
      });
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  // FALLBACK TIMER & CACHE CHECKER
  useEffect(() => {
    // Kalau video udah ada di cache browser, dia siap seketika
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setIsVideoLoaded(true);
    }

    // Fallback: Kalau sinyal user jelek, paksa animasi jalan dalam 1.5 detik
    const fallbackTimer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 1500);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // OBSERVER UNTUK PLAY/PAUSE (Tetap dipertahankan)
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
      { threshold: 0 },
    );

    observer.observe(videoRef.current);
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  // THE MASTER TRIGGER: Animasi baru jalan kalau DOM stabil DAN video siap (atau kena fallback)
  const shouldAnimate = isDomReady && isVideoLoaded;

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden px-6 pb-20 pt-[45vh] tablet:flex-row tablet:items-center tablet:justify-start desktop:px-24 tablet:pb-20 tablet:pt-20">
      
      {/* =========================================
          ANIMASI VIDEO BARENGAN SAMA TEKS
      ========================================= */}
      <motion.div 
        // Awalnya transparan dan agak turun sedikit
        initial={{ opacity: 0, y: 30 }}
        // Baru animate kalau shouldAnimate TRUE
        animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        // Dikasih durasi agak panjang biar videonya masuknya elegan banget
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute left-0 top-0 z-0 h-[55vh] w-full pointer-events-none tablet:bottom-0 tablet:left-auto tablet:right-0 tablet:h-full tablet:w-[65%]"
      >
        <div className="absolute inset-0 z-10" />

        <video
          ref={videoRef}
          src={heroAnim}
          autoPlay
          loop
          muted
          playsInline
          // Event ini bakal lapor ke state kalau frame pertama video udah selesai di-download
          onLoadedData={() => setIsVideoLoaded(true)}
          className="h-full w-full object-cover object-center opacity-90 pointer-events-none will-change-transform"
        />
      </motion.div>

      <div className="relative z-20 flex w-full max-w-2xl flex-col items-start justify-center gap-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          // Konek ke Master Trigger
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-auto flex w-fit items-center gap-3 rounded-full border-2 border-text-primary bg-pop-purple px-4 py-1.5 text-sm font-bold uppercase tracking-widest shadow-playful"
        >
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pop-green opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-pop-green"></span>
          </div>
          System Online
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          // Konek ke Master Trigger
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-5xl font-black leading-tight tracking-tighter drop-shadow-md desktop:text-7xl"
        >
          We Don't Just Build. <br />
          <span
            className="bg-linear-to-r from-pop-pink to-pop-blue bg-clip-text text-transparent stroke-text-primary stroke-2"
            style={{ WebkitTextStroke: "2px var(--color-text-primary)" }}
          >
            We Engineer Systems.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          // Konek ke Master Trigger
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="max-w-md text-lg font-medium text-text-muted drop-shadow-sm desktop:text-xl"
        >
          We design and develop scalable operational systems that reduce
          complexity, improve reliability, and support long-term business
          growth.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          // Konek ke Master Trigger
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          whileHover={{ y: -4, boxShadow: "var(--shadow-playful-hover)" }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto mt-4 rounded-xl border-2 border-text-primary bg-pop-yellow px-8 py-4 font-display font-bold text-text-primary shadow-playful transition-all"
          onClick={() => window.open(heroCTA, "_blank", "noopener,noreferrer")}
        >
          Initiate Sequence
        </motion.button>
      </div>
    </section>
  );
}