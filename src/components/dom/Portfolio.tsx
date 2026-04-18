"use client";

import Image from "next/image";
import { portfolioData } from "@/data/portfolio"; // Pastikan path data lu bener

// Gabungkan semua data
const allCards = [
  { id: "intro", type: "intro" },
  ...portfolioData.map((item) => ({ ...item, type: "portfolio" })),
  { id: "outro", type: "outro" },
];

export default function Portfolio() {
  // Jarak ujung atas kartu yang ngintip (Diperpendek jadi 24px)
  const GAP = 24; 

  return (
    // Padding bawah nggak perlu terlalu besar lagi karena kita udah pasang spacer di dalam
    <section className="relative w-full bg-surface-dark px-4 pb-24 pt-[10vh] sm:px-8 desktop:px-24">
      {/* RUMAH UTAMA TUMPUKAN KARTU */}
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {allCards.map((item, index) => {
          // SIHIR SINKRONISASI: 
          // Kita hitung seberapa besar "bantalan bawah" yang dibutuhin tiap kartu 
          // biar batas bawah mereka semua rata. (Kartu pertama butuh bantalan paling tebal)
          const bottomAlignmentPadding = (allCards.length - 1 - index) * GAP;

          return (
            <div
              key={item.id}
              className="sticky w-full"
              style={{
                // Jarak atas diperpendek pakai GAP 24px
                top: `calc(10vh + ${index * GAP}px)`,
                
                // Dead zone diperbesar! 120vh bikin jeda kosong yang dramatis
                marginTop: index === 0 ? "0" : "120vh", 
              }}
            >
              {/* Card visualnya fix 75vh biar bentuknya konsisten */}
              <div className="h-[75vh] w-full">
                <CardContent item={item} />
              </div>

              {/* BANTALAN BAWAH (Invisible Spacer) */}
              <div style={{ height: `${bottomAlignmentPadding}px` }} />
            </div>
          );
        })}

        {/* RUNWAY SPACER (Ruang Baca Card Terakhir)
          Tanpa ini, card terakhir bakal langsung kabur ditarik ke atas.
          100vh ngasih waktu buat user baca card terakhir, sebelum semuanya naik barengan!
        */}
        <div className="h-screen w-full" />
      </div>

    </section>
  );
}

// --- MICRO-COMPONENT: Card UI Builder ---
const CardContent = ({ item }: { item: any }) => {
  // 1. Desain Card Intro
  if (item.type === "intro") {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-[2.5rem] border-4 border-surface-light bg-surface-dark p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]">
        <h3 className="text-center font-display text-4xl font-bold text-surface-light desktop:text-6xl">
          Our Project <br />
          <span className="text-xl text-text-muted opacity-50 desktop:text-3xl">(Just keep scrolling down)</span>
        </h3>
      </div>
    );
  }

  // 2. Desain Card Outro
  if (item.type === "outro") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 rounded-[2.5rem] border-4 border-pop-yellow bg-pop-yellow p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.6)]">
        <h3 className="text-center font-display text-4xl font-black text-text-primary desktop:text-6xl">
          Ready to be next?
        </h3>
        <button className="rounded-xl border-4 border-text-primary bg-surface-light px-8 py-4 font-bold text-text-primary shadow-[4px_4px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(0,0,0,1)]">
          Start a Project
        </button>
      </div>
    );
  }

  // 3. Desain Card Portfolio Utama
  return (
    <div className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-[2.5rem] border-4 border-pop-green bg-surface-light p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.4)] transition-colors hover:border-pop-pink desktop:p-12">
      
      {/* Gambar / Cover dengan Next Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image 
          // Placeholder Unsplash keren bertema Tech/Setup
          // Nanti kalau data asli udah siap, tinggal ganti jadi: src={item.image}
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
          alt={item.headline}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
          className="object-cover object-center opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
          priority={false} // Next.js bakal otomatis lazy-load ini
        />
      </div>

      {/* Shadow Gradient biar teks selalu kebaca */}
      <div className="absolute inset-0 z-0 bg-linear-to-t from-surface-dark/90 via-surface-dark/40 to-transparent" />

      {/* Konten Teks Overlay */}
      <div className="relative z-10 flex flex-col items-start gap-4 translate-y-8 transition-transform duration-500 group-hover:translate-y-0">
        <div className="flex flex-wrap gap-2">
          {item.tags?.map((tag: string) => (
            <span key={tag} className="rounded-full border-2 border-text-primary bg-pop-yellow px-3 py-1 text-xs font-bold uppercase text-text-primary shadow-[2px_2px_0_rgba(0,0,0,1)]">
              {tag}
            </span>
          ))}
        </div>
        <div>
          <p className="font-display font-bold uppercase tracking-widest text-surface-light/80 drop-shadow-md">
            {item.client} &mdash; {item.projectType}
          </p>
          <h4 className="mt-2 font-display text-3xl font-black leading-tight text-surface-light drop-shadow-lg desktop:text-5xl">
            {item.headline}
          </h4>
        </div>
        
        <button className="mt-4 w-fit rounded-full border-2 border-text-primary bg-surface-light px-6 py-3 font-bold text-text-primary opacity-0 shadow-[4px_4px_0_rgba(0,0,0,1)] transition-opacity duration-500 group-hover:opacity-100">
          View Project Case
        </button>
      </div>
    </div>
  );
};