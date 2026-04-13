"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { servicesData, ServiceItem } from "@/data/services";
// import Image from "next/image"; // Nanti di-uncomment saat WebP sudah siap

export default function Services() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center bg-surface-light px-6 py-24 desktop:px-24">
      <div className="relative z-10 flex w-full max-w-7xl flex-col gap-12">
        
        <div className="flex flex-col items-start gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-block rounded-full border-2 border-text-primary bg-surface-dark px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-surface-light shadow-playful"
          >
            Capabilities
          </motion.div>
          <h2 className="font-display text-4xl font-black tracking-tighter desktop:text-6xl">
            Not Just Pretty Pixels. <br />
            <span className="text-text-muted">Fully Functional Systems.</span>
          </h2>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
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
        </div>
      </div>
    </section>
  );
}

function AnimatedMediaCard({ service, index, spanClass }: { service: ServiceItem; index: number; spanClass: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Fungsi super ringan untuk kalkulasi kursor murni pakai JavaScript bawaan (tanpa library)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // Posisi X kursor di dalam kartu
    const y = e.clientY - rect.top;  // Posisi Y kursor di dalam kartu

    // Menghitung persentase dari tengah (-1 sampai 1)
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    // Suntikkan nilai ke CSS Variable murni
    cardRef.current.style.setProperty('--mouse-x', xPct.toString());
    cardRef.current.style.setProperty('--mouse-y', yPct.toString());
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    // Reset ke tengah saat mouse keluar
    cardRef.current.style.setProperty('--mouse-x', '0');
    cardRef.current.style.setProperty('--mouse-y', '0');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--hover-bg': service.accentColor } as React.CSSProperties}
      // CSS murni mengurus background hover dan bayangan tanpa JS
      className={`group relative flex min-h-87.5 flex-col overflow-hidden rounded-3xl border-4 border-text-primary p-8 bg-surface-light shadow-playful transition-all duration-500 ease-out tablet:min-h-100 cursor-crosshair hover:-translate-y-2 hover:shadow-playful-hover hover:bg-(--hover-bg) ${spanClass}`}
    >
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
          // TRANSAKSI PARALLAX MENGGUNAKAN CSS CALC() MURNI (Super Ringan)
          // Transform akan membaca var(--mouse-x) yang disuntikkan oleh handleMouseMove
          className="relative h-full w-full transition-transform duration-300 ease-out group-hover:scale-110"
          style={{
            transform: 'translate(calc(var(--mouse-x, 0) * -20px), calc(var(--mouse-y, 0) * -20px))'
          }}
        >
          <div className="relative h-full w-full flex items-center justify-center">
            {/* Animasi mengambang statis menggunakan Framer Motion, sangat ringan karena tidak bergantung pada scroll/mouse */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute h-24 w-24 rounded-2xl border-4 border-text-primary bg-surface-light shadow-playful"
            />
            <motion.div 
              animate={{ y: [0, 20, 0], x: [0, 15, 0], rotate: [0, -10, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -left-4 top-8 h-16 w-16 rounded-xl border-4 border-text-primary bg-pop-pink shadow-playful"
            />
            <motion.div 
              animate={{ y: [0, -25, 0], x: [0, -10, 0], rotate: [0, 15, 0] }} 
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-4 bottom-12 h-20 w-20 rounded-full border-4 border-text-primary bg-pop-blue shadow-playful"
            />
          </div>

          {/* NANTI GANTI KODE DI ATAS (Batas Placeholder) DENGAN KODE INI:
            
            <Image 
              src={service.imageUrl} 
              fill 
              alt={service.title} 
              className="object-contain" 
              unoptimized={true} // Penting: Agar Next.js tidak merusak frame animasi WebP
            />
          */}
        </div>
      </div>
    </div>
  );
}