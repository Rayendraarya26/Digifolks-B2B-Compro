"use client";
import { motion, Variants } from "framer-motion";
import { teamDNAData } from "@/data/about";
import { useEffect, useRef, useState } from "react";

// 1. Container dengan stagger yang lebih rapat
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// 2. Card Variants menggunakan fungsi (custom props) untuk rotasi akhir
const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -80,
    scale: 1.1, 
    rotateX: 45, 
    rotateZ: 0
  },
  visible: (index: number) => ({ 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    rotateZ: index % 2 === 0 ? -3 : 3, 
    transition: { 
      type: "spring", 
      stiffness: 250, 
      damping: 15,
      mass: 1.2
    }
  }),
};

// 3. Header Variants (Biar sinkron sama kartu)
const headerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 20 } 
  }
};

const cardColors = ["bg-pop-pink", "bg-pop-blue", "bg-pop-yellow"];

export default function OurDNA() {
  const sectionRef = useRef<HTMLElement>(null);
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
        // Threshold 0.3 = Animasi nunggu sampai 30% area grid masuk ke layar
        // Ini obat ampuh buat masalah "animasi kelar sebelum keliatan"
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    // Pasang ref sensornya di pembungkus utama
    <section ref={sectionRef} className="relative w-full bg-surface-light px-6 py-24 desktop:px-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-12">
        
        {/* Header Section */}
        {/* HAPUS whileInView, ganti dengan animate yang di-drive oleh state isAnimVisible */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isAnimVisible ? "visible" : "hidden"}
          className="text-center"
        >
          <h2 className="font-display text-4xl font-black uppercase tracking-tighter desktop:text-6xl">
            Our{" "}
            <span
              className="text-transparent bg-clip-text bg-linear-to-r from-pop-green to-pop-blue stroke-text-primary stroke-2"
              style={{ WebkitTextStroke: "2px var(--color-text-primary)" }}
            >
              DNA
            </span>
          </h2>
          <p className="mt-4 max-w-lg text-lg font-medium text-text-muted">
            Our approach is built around system reliability, scalability, and long-term maintainability.
          </p>
        </motion.div>

        {/* Grid Kartu DNA */}
        {/* HAPUS whileInView, ganti dengan animate statis */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isAnimVisible ? "visible" : "hidden"}
          className="grid w-full grid-cols-1 gap-6 tablet:grid-cols-3 tablet:gap-8"
        >
          {teamDNAData.map((dna, index) => {
            const bgColor = cardColors[index % cardColors.length];

            return (
              <motion.div
                  key={dna.id}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateZ: 0, 
                    y: -10,
                    boxShadow: "10px 10px 0px var(--color-text-primary)", 
                    transition: { type: "spring", stiffness: 300, damping: 15 }
                  }}
                  className={`relative flex h-full flex-col items-start justify-between rounded-2xl border-4 border-text-primary p-8 shadow-playful transition-colors ${bgColor}`}
                >
                <span className="absolute right-4 top-4 font-display text-2xl font-black opacity-30">
                  0{index + 1}
                </span>

                <div className="mt-8 flex flex-col gap-4">
                  <h3 className="font-display text-2xl font-bold leading-tight text-text-primary">
                    {dna.value}
                  </h3>
                  <p className="font-medium text-text-primary/80">
                    {dna.shortPitch}
                  </p>
                </div>

                <div className="mt-12 h-2 w-12 bg-text-primary" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}