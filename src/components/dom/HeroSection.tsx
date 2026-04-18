"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Pastikan video element-nya udah ada
    if (!videoRef.current) return;

    // Bikin Observer buat ngecek apakah video ada di dalam layar
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Kalau video masuk layar -> Play, kalau keluar layar -> Pause
        if (entry.isIntersecting) {
          // .catch() dipakai biar nggak muncul error di console kalau 
          // browser nge-block play sebelum user interaksi
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      {
        threshold: 0, // 0 berarti: Asal ada 1 piksel aja yang kelihatan/hilang, langsung trigger
      }
    );

    // Mulai pantau videonya
    observer.observe(videoRef.current);

    // Cleanup pas komponen hancur/pindah halaman biar memory nggak bocor
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden px-6 py-20 desktop:px-24">
      
      {/* 3D Canvas / Video Layer */}
      <div className="absolute inset-y-0 right-0 z-0 h-full w-full pointer-events-none tablet:w-[80%] desktop:w-[65%]">
        <video 
          ref={videoRef}
          src="/Video/Hero/HeroAnim.webm" 
          autoPlay 
          loop 
          muted 
          playsInline
          // Tambahin will-change-transform dari Tailwind
          className="h-full w-full object-cover opacity-90 pointer-events-none will-change-transform"
        />
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-start justify-center gap-6 pointer-events-none">
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