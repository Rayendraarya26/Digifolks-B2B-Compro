"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  useTransform,
  Variants,
  useScroll,
} from "framer-motion";

// --- VARIAN ANIMASI UNTUK ENTRANCE TAMPARAN ---
const slamContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const slamWord: Variants = {
  hidden: { opacity: 0, y: 100, rotate: 10, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 15, mass: 1.2 },
  },
};

export default function GrandCTA({ grandCTAUrl }: { grandCTAUrl: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isAnimVisible, setIsAnimVisible] = useState(false);
  // ========================================================
  // THE DIRECTIONAL SENSOR HACK 🧠
  // ========================================================
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // KONDISI 1: 30% Elemen masuk layar -> TAMPILKAN!
          setIsAnimVisible(true);
        } else {
          // KONDISI 2: Elemen keluar layar
          // Kita cek apakah posisi 'top' dari elemen ini bernilai positif.
          // Kalau positif, artinya elemen ini posisinya ada di BAWAH layar.
          // Kalau negatif, artinya dia udah ke-scroll sampai ke ATAS layar.
          if (entry.boundingClientRect.top > 0) {
            // HANYA RESET JIKA ELEMEN TENGGELAM KE BAWAH LAYAR
            setIsAnimVisible(false);
          }
        }
      },
      {
        // 1. Threshold nol, supaya nggak error di elemen yang super tinggi (HP)
        threshold: 0,
        // 2. RootMargin bawah negatif (-150px).
        // Artinya: Animasi baru jalan pas elemen udah masuk/nongol 150px dari batas bawah layar user.
        rootMargin: "0px 0px -150px 0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // --- 1. MOBILE SCROLL PARALLAX ---
  // Membuat teks bergerak sedikit berlawanan dengan arah scroll (efek 3D/kedalaman) di Mobile & Desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // --- 2. MAGNETIC & GRAVITY LOGIC ---
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const btnX = useSpring(pointerX, { stiffness: 150, damping: 15, mass: 0.5 });
  const btnY = useSpring(pointerY, { stiffness: 150, damping: 15, mass: 0.5 });

  const textX = useSpring(pointerX, { stiffness: 50, damping: 30, mass: 2 });
  const textY = useSpring(pointerY, { stiffness: 50, damping: 30, mass: 2 });

  const textSkewX = useTransform(textX, [-100, 100], [4, -4]);
  const textSkewY = useTransform(textY, [-100, 100], [-4, 4]);

  // Menggunakan onPointerMove agar Touch (HP) dan Mouse (PC) sama-sama terdeteksi
  const handlePointerMove = (e: React.PointerEvent) => {
    if (btnRef.current) {
      const btnRect = btnRef.current.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;

      pointerX.set((e.clientX - btnCenterX) * 0.3);
      pointerY.set((e.clientY - btnCenterY) * 0.3);
    }
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const words1 = "Let's build the".split(" ");
  const words2 = "future, one".split(" ");
  const words3 = "pixel at a time.".split(" ");

  return (
    <div
      ref={sectionRef}
      className="relative w-full max-h-screen flex flex-col bg-pop-yellow border-y-4 border-text-primary"
    >
      {/* =========================================
          1. TOP WARNING TAPE (LURUS & BERSIH)
      ========================================= */}
      <div className="relative flex w-full overflow-hidden border-b-4 border-text-primary bg-text-primary py-3 shadow-[0_6px_0_rgba(0,0,0,0.15)] z-20">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="flex whitespace-nowrap"
        >
          {Array(10)
            .fill("SYSTEM READY // INITIATE DEPLOYMENT // ")
            .map((text, i) => (
              <span
                key={i}
                className="font-mono text-sm sm:text-base font-black uppercase tracking-widest text-pop-yellow px-4"
              >
                {text}
              </span>
            ))}
        </motion.div>
      </div>

      {/* =========================================
          THE GRAND CALL-TO-ACTION AREA
      ========================================= */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative z-10 flex flex-col items-center justify-center px-6 py-32 text-center desktop:px-24 desktop:py-48 overflow-hidden"
      >
        {/* Background Grid Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.15] bg-[radial-gradient(#000000_3px,transparent_3px)] bg-size-[40px_40px]" />

        {/* BUNGKUSAN PARALLAX SCROLL (Jalan otomatis di mobile saat di-scroll) */}
        <motion.div
          style={{ y: parallaxY }}
          className="relative z-20 flex flex-col items-center"
        >
          <motion.div
            variants={slamContainer}
            initial="hidden"
            animate={isAnimVisible ? "visible" : "hidden"}
            // EFEK GRAVITASI POINTER (Jalan saat disentuh/di-hover)
            style={{ x: textX, y: textY, skewX: textSkewX, skewY: textSkewY }}
            className="flex flex-col items-center pointer-events-none"
          >
            <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-5">
              {words1.map((word, i) => (
                <motion.span
                  key={i}
                  variants={slamWord}
                  className="font-display text-5xl font-black uppercase leading-none tracking-tighter text-text-primary sm:text-7xl desktop:text-[7rem]"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-5 mt-2 sm:mt-4">
              {words2.map((word, i) => (
                <motion.span
                  key={i}
                  variants={slamWord}
                  className={`font-display text-5xl font-black uppercase leading-none tracking-tighter sm:text-7xl desktop:text-[7rem] ${word.includes("future") ? "text-surface-light drop-shadow-[6px_6px_0_rgba(0,0,0,1)]" : "text-text-primary"}`}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-5 mt-2 sm:mt-4">
              {words3.map((word, i) => (
                <motion.span
                  key={i}
                  variants={slamWord}
                  className="font-display text-5xl font-black uppercase leading-none tracking-tighter text-text-primary sm:text-7xl desktop:text-[7rem]"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* THE MAGNETIC BUTTON DENGAN IDLE BREATHING */}
          <div className="relative z-30 mt-16 p-8 sm:p-12">
            {/* Animasi Breathing (Pasif) agar tombol terlihat hidup di mobile */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <motion.button
                ref={btnRef}
                style={{ x: btnX, y: btnY }}
                onClick={() =>
                  window.open(grandCTAUrl, "_blank", "noopener,noreferrer")
                }
                className="group relative flex items-center justify-center gap-4 rounded-full border-4 border-text-primary bg-pop-pink px-8 py-5 sm:px-12 sm:py-6 font-display text-md sm:text-xl tablet:text-2xl font-black uppercase tracking-widest text-text-primary shadow-[6px_6px_0_rgba(0,0,0,1)] sm:shadow-[8px_8px_0_rgba(0,0,0,1)] transition-colors hover:bg-surface-light hover:text-pop-pink active:shadow-[0px_0px_0_rgba(0,0,0,1)] active:translate-y-2 active:translate-x-2 cursor-pointer"
              >
                Start a Project
                <motion.span
                  animate={{ rotate: [0, 90, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                  className="flex items-center justify-center rounded-full border-2 border-current p-1"
                >
                  ✦
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* =========================================
          2. BOTTOM WARNING TAPE (LURUS & BERSIH)
      ========================================= */}
      <div className="relative flex w-full overflow-hidden border-t-4 border-text-primary bg-pop-green py-3 shadow-[0_-6px_0_rgba(0,0,0,0.15)] z-20">
        <motion.div
          animate={{ x: ["-50%", "0%"] }} // Berjalan ke arah sebaliknya
          transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
          className="flex whitespace-nowrap"
        >
          {Array(10)
            .fill("ALL SYSTEMS NOMINAL // READY TO BUILD // ")
            .map((text, i) => (
              <span
                key={i}
                className="font-mono text-sm sm:text-base font-black uppercase tracking-widest text-text-primary px-4"
              >
                {text}
              </span>
            ))}
        </motion.div>
      </div>
    </div>
  );
}
