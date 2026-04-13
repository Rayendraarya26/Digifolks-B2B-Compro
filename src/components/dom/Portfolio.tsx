"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
// import Image from "next/image"; // Nanti dipakai buat gambar asli

export default function Portfolio() {
  // Ref untuk track tinggi total section (untuk durasi scroll)
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Membaca progress scroll vertikal di dalam area targetRef
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Mengubah scroll vertikal (0 - 1) menjadi pergeseran horizontal (X%)
  // -95% artinya geser hampir sampai ujung kanan elemen
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-95%"]);

  return (
    // Section ini tingginya 400vh (4x tinggi layar).
    // Artinya user harus scroll sepanjang 4 layar untuk melewati section ini.
    // Inilah yang memberikan "ruang waktu" untuk animasi horizontal berjalan.
    <section ref={targetRef} className="relative h-[400vh] bg-surface-dark">
      
      {/* Sticky Container: Menahan posisi di layar (sticky) saat user scroll di dalam area 400vh */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Teks Judul Vertikal (Menempel di kiri) */}
        <div className="absolute left-6 top-1/2 z-10 -translate-y-1/2 desktop:left-24">
          <h2 className="font-display text-5xl font-black uppercase text-surface-light opacity-20 desktop:text-8xl">
            Selected Work
          </h2>
        </div>

        {/* Horizontal Track (Kontainer yang bergeser ke kiri) */}
        <motion.div style={{ x }} className="flex gap-12 px-6 desktop:px-48">
          
          {/* Kartu Intro (Biar user tau ini awal portfolio) */}
          <div className="flex h-[60vh] w-[80vw] shrink-0 items-center justify-center rounded-3xl border-4 border-surface-light p-8 desktop:w-[50vw]">
            <h3 className="font-display text-4xl font-bold text-surface-light desktop:text-6xl">
              Swipe Left <br />
              <span className="text-text-muted">(Or just keep scrolling)</span>
            </h3>
          </div>

          {/* Render Kartu Portfolio dari Database */}
          {portfolioData.map((item) => (
            <div 
              key={item.id} 
              className="group relative flex h-[60vh] w-[85vw] shrink-0 flex-col justify-end overflow-hidden rounded-3xl border-4 border-surface-light bg-surface-light p-8 transition-colors hover:border-pop-pink desktop:w-[60vw]"
            >
              {/* Gambar / Cover (Placeholder 2D) */}
              <div className="absolute inset-0 z-0">
                {/* Nanti ganti pakai <Image src={item.imageUrl} ... /> */}
                <div className="flex h-full w-full items-center justify-center bg-surface-dark/5">
                  <span className="font-display text-2xl font-bold text-text-muted opacity-50">[Project Visual]</span>
                </div>
              </div>

              {/* Konten Teks Overlay */}
              <div className="relative z-10 flex flex-col gap-4 translate-y-8 transition-transform duration-500 group-hover:translate-y-0">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border-2 border-text-primary bg-pop-yellow px-3 py-1 text-xs font-bold uppercase text-text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                <div>
                  <p className="font-display font-bold uppercase tracking-widest text-text-muted">
                    {item.client} &mdash; {item.projectType}
                  </p>
                  <h4 className="mt-2 font-display text-3xl font-black leading-tight text-text-primary desktop:text-5xl">
                    {item.headline}
                  </h4>
                </div>
                
                {/* Tombol View Project (Muncul saat hover) */}
                <button className="mt-4 w-fit rounded-full bg-text-primary px-6 py-3 font-bold text-surface-light opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  View Project Case
                </button>
              </div>
            </div>
          ))}

          {/* Kartu Outro (Call to Action) */}
          <div className="flex h-[60vh] w-[80vw] shrink-0 flex-col items-center justify-center gap-6 rounded-3xl border-4 border-pop-yellow bg-pop-yellow p-8 desktop:w-[50vw]">
            <h3 className="text-center font-display text-4xl font-black text-text-primary desktop:text-6xl">
              Ready to be next?
            </h3>
            <button className="rounded-xl border-4 border-text-primary bg-surface-light px-8 py-4 font-bold text-text-primary shadow-playful hover:translate-y-1 hover:shadow-none">
              Start a Project
            </button>
          </div>

        </motion.div>
      </div>
    </section>
  );
}