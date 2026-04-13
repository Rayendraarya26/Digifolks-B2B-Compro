"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- MOCK DATA (Sesuaikan dengan data asli lu) ---
const testimonialsData = [
  { id: 1, quote: "Their frontend magic made our conversion rate skyrocket. Absolute wizards.", author: "Sarah J., Startup Founder" },
  { id: 2, quote: "I didn't know a dashboard could look this sexy. My team loves it.", author: "Mike T., Product Manager" },
  { id: 3, quote: "Fast, reliable, and they actually understand Gen Z aesthetics.", author: "Elena R., Creative Director" },
  { id: 4, quote: "They rebuilt our backend architecture from scratch. Zero downtime since.", author: "David L., CTO" },
  { id: 5, quote: "From Figma to React, pixel perfect. Best agency I've worked with.", author: "Chloe W., Designer" },
];

const pastelColors = ["bg-pop-pink", "bg-pop-blue", "bg-pop-yellow", "bg-pop-green"];
const coloredTestimonials = testimonialsData.map((t, i) => ({
  ...t,
  color: pastelColors[i % pastelColors.length],
}));

// GANDAKAN KARTU UNTUK INFINITE LOOP (Set 1, Set 2, Set 3)
const marqueeCards = [...coloredTestimonials, ...coloredTestimonials, ...coloredTestimonials];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Pastikan DOM sudah siap
    if (!trackRef.current || !cardsRef.current.length) return;

    // Pisahkan kartu asli (Set 1) dan kartu kloningan (Set 2 & 3)
    const originalCount = coloredTestimonials.length;
    const firstBatch = cardsRef.current.slice(0, originalCount);
    const clones = cardsRef.current.slice(originalCount);

    // Dapatkan lebar satu kartu + gap untuk kalkulasi tumpukan
    const cardElement = firstBatch[0];
    if (!cardElement) return;
    
    // Asumsi gap tailwind: gap-6 (24px) di mobile, gap-8 (32px) di desktop
    const gap = window.innerWidth >= 1024 ? 32 : 24; 
    const cardWidthWithGap = cardElement.offsetWidth + gap;

    // --- SETUP AWAL ---
    // Sembunyikan kloningan
    gsap.set(clones, { opacity: 0, display: "none" });

    // Tumpuk Set 1 di tengah bawah layar (Sihir "The Deck")
    gsap.set(firstBatch, {
      y: 400, // Taruh di bawah layar
      opacity: 0,
      // Tarik setiap kartu ke kiri agar menumpuk di posisi kartu pertama
      x: (i) => -i * cardWidthWithGap, 
      // Tambahkan sedikit rotasi acak biar tumpukannya terlihat organik kayak kartu asli
      rotation: (i) => i * 2 - (originalCount), 
    });

    // --- MASTER TIMELINE KOREOGRAFI ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%", // Jalan saat section ini masuk 30% dari bawah layar
        toggleActions: "play none none none",
      },
    });

    // 1. THE RISE (Tumpukan naik ke tengah layar)
    tl.to(firstBatch, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.2)",
    });

    // 2. THE DEAL (Kartu dibagikan ke kanan)
    tl.to(firstBatch, {
      x: 0, // Kembalikan ke posisi flex aslinya (menyebar)
      rotation: 0, // Luruskan rotasinya
      duration: 1.5,
      stagger: 0.15, // Jeda antar kartu biar kayak dibagikan satu-satu
      ease: "power3.out",
    });

    // 3. THE LOOP PREPARATION (Munculkan kloningan secara diam-diam)
    tl.set(clones, { opacity: 1, display: "flex" });

    // 4. INFINITE MARQUEE (Jalan selamanya ke kiri)
    tl.add(() => {
      gsap.to(trackRef.current, {
        // Pindahkan track persis sejauh panjang 1 set original
        x: `-${100 / 3}%`, 
        duration: 25, // Makin besar makin lambat jalannya
        repeat: -1, // Loop selamanya
        ease: "none", // Kecepatan konstan
      });
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-surface-dark py-24"
    >
      
      {/* Visual Hint */}
      <div className="relative z-10 mb-16 inline-block rounded-full border-2 border-text-primary bg-surface-light px-6 py-2 text-sm font-bold uppercase tracking-widest text-text-primary shadow-playful">
        Word on the street
      </div>

      {/* TRACK CONTAINER: 
        Dikasih padding-left 50vw dikurangi setengah lebar kartu.
        Ini trik CSS dewa biar Kartu Pertama PASTI persis di tengah layar saat awal di-*load*.
      */}
      <div className="w-full overflow-visible" style={{ paddingLeft: "calc(50vw - (320px / 2))" }}>
        
        {/* THE TRACK: Panjang menyesuaikan isi, menampung 3 set array */}
        <div 
          ref={trackRef} 
          className="flex w-max gap-6 desktop:gap-8"
        >
          {marqueeCards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              ref={(el) => { cardsRef.current[index] = el; }}
              // Hover group untuk menghentikan animasi bisa ditambahkan nanti jika perlu
              className={`flex h-72 w-[320px] shrink-0 flex-col justify-between rounded-3xl border-4 border-text-primary p-6 shadow-playful desktop:h-80 desktop:w-[400px] desktop:p-8 ${card.color}`}
            >
              
              <div className="flex flex-col gap-2 desktop:gap-4">
                <span className="font-display text-4xl font-black text-text-primary opacity-20 desktop:text-6xl leading-none">
                  "
                </span>
                <p className="font-display text-lg font-black leading-tight text-text-primary desktop:text-xl">
                  {card.quote}
                </p>
              </div>

              <div className="mt-auto flex w-full justify-end">
                <p className="rounded-full border-2 border-text-primary bg-surface-light px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-widest text-text-primary desktop:px-4 desktop:py-2 desktop:text-xs">
                  {card.author}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
      
    </section>
  );
}