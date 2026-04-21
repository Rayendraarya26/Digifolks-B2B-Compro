"use client";
import { useRef, useState, useEffect } from "react";
import { motion, Variants } from "framer-motion"; // Pastikan Variants di-import
import { servicesData, ServiceItem } from "@/data/services";
import Image from "next/image";

// VARIAN ANIMASI UNTUK BENTO GRID
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Jeda yang sangat rapat agar jatuhnya seperti rentetan blok
      delayChildren: 0.2,
    },
  },
};

// VARIAN ANIMASI UNTUK MASING-MASING BLOK BENTO
export const bentoVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -80, // Jatuh dari atas
    scale: 0.9,
    rotate: -2, // Sedikit miring sebelum membanting lurus
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 14,
      mass: 1.5, // Mass yang lebih besar memberi kesan objek "berat" khas Brutalism
    },
  },
};

// 1. Variant untuk Badge/Pill "Capabilities"
const pillVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

// 2. Variant untuk Heading Text
const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    // Delay 0.1s ditaruh di sini biar dia muncul setelah Pill
    transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.1 },
  },
};

export default function Services() {
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
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col items-center bg-surface-light px-6 py-24 desktop:px-24"
    >
      <div className="relative z-10 flex w-full max-w-7xl flex-col gap-12">
        {/* Header Section (Tetap Sama) */}
        <div className="flex flex-col items-start gap-4">
          <motion.div
            variants={pillVariants}
            initial="hidden"
            animate={isAnimVisible ? "visible" : "hidden"}
            className="inline-block rounded-full border-2 border-text-primary bg-surface-dark px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-surface-light shadow-playful"
          >
            Capabilities
          </motion.div>
          <motion.h2
            variants={headingVariants}
            initial="hidden"
            animate={isAnimVisible ? "visible" : "hidden"}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.1,
            }}
            className="font-display text-4xl font-black tracking-tighter desktop:text-6xl"
          >
            Not Just Pretty Pixels. <br />
            <span className="text-text-muted">Fully Functional Systems.</span>
          </motion.h2>
        </div>

        {/* BENTO GRID CONTAINER */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isAnimVisible ? "visible" : "hidden"}
          viewport={{ once: true, margin: "-100px" }}
          className="grid w-full grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-3"
        >
          {servicesData.map((service, index) => {
            let spanClass = "desktop:col-span-1";
            if (index === 0) spanClass = "tablet:col-span-2 desktop:col-span-2";

            return (
              <AnimatedMediaCard
                key={service.id}
                service={service}
                index={index}
                spanClass={spanClass}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function AnimatedMediaCard({
  service,
  index,
  spanClass,
}: {
  service: ServiceItem;
  index: number;
  spanClass: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Fungsi Kalkulasi Kursor (Tetap Sama)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    cardRef.current.style.setProperty("--mouse-x", xPct.toString());
    cardRef.current.style.setProperty("--mouse-y", yPct.toString());
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--mouse-x", "0");
    cardRef.current.style.setProperty("--mouse-y", "0");
  };

  const OnClick = () => {
    window.location.href = `/services#${service.id}`;
  };

  return (
    <motion.div // <-- Ubah div menjadi motion.div
      variants={bentoVariants} // <-- Panggil varian jatuh dari atas
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={OnClick}
      style={{ "--hover-bg": service.theme.bg } as React.CSSProperties}
      className={`group relative flex min-h-87.5 flex-col overflow-hidden rounded-3xl border-4 border-text-primary p-8 bg-surface-light shadow-playful transition-all duration-500 ease-out tablet:min-h-100 cursor-crosshair hover:-translate-y-2 hover:shadow-playful-hover hover:bg-(--hover-bg) ${spanClass}`}
    >
      {/* KONTEN CARD TETAP SAMA */}
      <div className="relative z-10 flex h-full flex-col pointer-events-none">
        <span className="mb-4 font-display text-xl font-black opacity-40 transition-opacity duration-300 group-hover:opacity-80">
          0{index + 1}
        </span>
        <h3 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-text-primary desktop:text-4xl">
          {service.title}
        </h3>
        <p className="mt-auto max-w-sm text-lg font-medium text-text-primary/90">
          {service.shortDesc}
        </p>
      </div>

      <div className="absolute -bottom-10 -right-10 z-0 h-64 w-64 tablet:h-80 tablet:w-80 pointer-events-none">
        <div
          className="relative h-full w-full transition-transform duration-300 ease-out group-hover:scale-110"
          style={{
            transform:
              "translate(calc(var(--mouse-x, 0) * -20px), calc(var(--mouse-y, 0) * -20px))",
          }}
        >
          <div className="relative h-full w-full flex items-center justify-center">
            {/* Animasi mengambang statis menggunakan Framer Motion, sangat ringan karena tidak bergantung pada scroll/mouse */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute h-24 w-24"
            >
              <Image
                src={service.iconLPUrl[0]}
                fill
                alt={service.title}
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0], x: [0, 15, 0], rotate: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -left-4 top-8 h-16 w-16"
            >
              <Image
                src={service.iconLPUrl[1]}
                fill
                alt={service.title}
                className="w-full h-full object-contain"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, -25, 0], x: [0, -10, 0], rotate: [0, 15, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -right-4 bottom-12 h-20 w-20"
            >
              <Image
                src={service.iconLPUrl[2]}
                fill
                alt={service.title}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
