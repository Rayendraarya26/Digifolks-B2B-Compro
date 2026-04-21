"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { testimonialsData } from "@/data/testimonials";

gsap.registerPlugin(ScrollTrigger);

const pastelColors = ["bg-pop-pink", "bg-pop-blue", "bg-pop-yellow", "bg-pop-green"];
const coloredTestimonials = testimonialsData.map((t, i) => ({
  ...t,
  color: pastelColors[i % pastelColors.length],
}));

// THE CLONES: Digandakan 3x lipat (Left Clones, Originals, Right Clones)
const marqueeCards = [...coloredTestimonials, ...coloredTestimonials, ...coloredTestimonials];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!trackRef.current || !cardsRef.current.length) return;

    const originalCount = coloredTestimonials.length;
    // Tentukan indeks tengah (karena 5 kartu, tengahnya ada di indeks 2)
    const centerIndex = Math.floor(originalCount / 2); 
    
    // Pecah array jadi 3 pasukan
    const leftClones = cardsRef.current.slice(0, originalCount);
    const originalCards = cardsRef.current.slice(originalCount, originalCount * 2);
    const rightClones = cardsRef.current.slice(originalCount * 2);

    // BULLETPROOF MATH: Ambil jarak pasti antar kartu (Lebar + Gap)
    const card0 = originalCards[0];
    const card1 = originalCards[1];
    if (!card0 || !card1) return;
    
    const stepDistance = card1.offsetLeft - card0.offsetLeft; 
    const loopDistance = stepDistance * originalCount;

    // --- SETUP AWAL KOREOGRAFI ---
    // Posisi X awal lintasan agar kartu TENGAH dari pasukan 'Original' persis di tengah layar
    const startX = -(originalCount + centerIndex) * stepDistance;

    // 1. Sembunyikan pasukan kiri dan kanan
    gsap.set([leftClones, rightClones], { opacity: 0 });

    // 2. Geser rel ke titik startX 
    gsap.set(trackRef.current, { x: startX });

    // 3. Tumpuk pasukan 'Original' tepat di kartu tengahnya
    gsap.set(originalCards, {
      y: 400, // Mulai dari bawah layar
      opacity: 0,
      // RUMUS DEWA: Menumpuk kartu ke titik tengah. 
      // Yang kiri ketarik ke kanan, yang kanan ketarik ke kiri.
      x: (i) => (centerIndex - i) * stepDistance, 
      // Rotasi berantakan: Kartu tengah lurus, pinggiran miring
      rotation: (i) => (i - centerIndex) * 5, 
    });

    // --- MASTER TIMELINE ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%", 
        toggleActions: "play none none none",
      },
    });

    // 1. THE RISE: Tumpukan kartu naik dari bawah ke poros tengah layar
    tl.to(originalCards, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "back.out(1.2)",
    });

    // 2. THE SYMMETRICAL DEAL: Kartu mekar ke kiri dan kanan dari tengah
    tl.to(originalCards, {
      x: 0, // Masing-masing kembali ke titik DOM aslinya (Mekar)
      rotation: 0, // Semuanya lurus kembali
      duration: 1.5,
      // Fitur dewa GSAP: Stagger dari tengah, jadi kartu tengah nyebar duluan/barengan sama pinggir
      stagger: { amount: 0.4, from: "center" }, 
      ease: "power3.out",
    });

    // 3. HOLD: Kasih jeda 0.5 detik biar user bisa nikmatin animasinya sejenak
    tl.to({}, { duration: 0.5 });

    // 4. SEAMLESS INJECTION: Munculkan pasukan kloningan kiri dan kanan secara halus
    tl.to([leftClones, rightClones], { opacity: 1, duration: 0.5 });

    // 5. INFINITE MARQUEE: Bikin rel berjalan selamanya
    tl.add(() => {
      gsap.fromTo(trackRef.current,
        { x: startX }, 
        { 
          x: startX - loopDistance, // Bergeser ke kiri persis sejauh 1 set
          duration: 25, 
          repeat: -1, 
          ease: "none" 
        }
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-surface-light py-24"
    >
      <div className="relative z-10 mb-16 inline-block rounded-full border-2 border-text-primary bg-surface-light px-6 py-2 text-sm font-bold uppercase tracking-widest text-text-primary shadow-playful">
        CLIENT INSIGHTS
      </div>

      {/* TRACK CONTAINER */}
      {/* Pl-[calc] ini menggeser titik 0-nya. Digabungkan dengan startX GSAP, 
          maka kartu TENGAH dari tumpukan kita akan nongol sempurna di poros tengah monitor!
      */}
      <div className="w-full overflow-visible pl-[calc(50vw-160px)] desktop:pl-[calc(50vw-200px)]">
        
        <div ref={trackRef} className="flex w-max gap-6 desktop:gap-8">
          {marqueeCards.map((card, index) => (
            <div
              key={`${card.id}-${index}`}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={`flex h-72 w-[320px] shrink-0 flex-col justify-between rounded-3xl border-4 border-text-primary p-6 shadow-playful desktop:h-80 desktop:w-100 desktop:p-8 ${card.color}`}
            >
              <div className="flex flex-col gap-2 desktop:gap-4">
                <span className="font-display text-4xl font-black leading-none text-text-primary opacity-20 desktop:text-6xl">
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