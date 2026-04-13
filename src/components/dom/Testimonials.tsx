"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { testimonialsData } from "@/data/testimonials";

const pastelColors = [
  "bg-pop-pink",   
  "bg-pop-blue",   
  "bg-pop-yellow", 
  "bg-pop-green"   
];

// Kita ikat warnanya permanen ke data awal agar warnanya tidak berubah-ubah saat array digeser
const coloredTestimonials = testimonialsData.map((t, i) => ({
  ...t,
  color: pastelColors[i % pastelColors.length]
}));

export default function Testimonials() {
  const [cards, setCards] = useState(coloredTestimonials);
  const [isHovered, setIsHovered] = useState(false);

  // LOGIKA ANIMASI OTOMATIS (Infinite Loop)
  useEffect(() => {
    // Kalau kursor masuk (onHover) atau layar disentuh, matikan timer-nya!
    if (isHovered) return;

    const timer = setInterval(() => {
      setCards((prev) => {
        const newArr = [...prev];
        // Cabut kartu paling depan, taruh di paling belakang
        newArr.push(newArr.shift()!);
        return newArr;
      });
    }, 1500); // Ganti kartu tiap 1.5 detik

    return () => clearInterval(timer);
  }, [isHovered]);

  // LOGIKA SWIPE MANUAL (Mobile & Desktop Drag)
  const handleDragEnd = (e: any, info: PanInfo) => {
    const swipeThreshold = 50; // Jarak minimal drag untuk dihitung sebagai swipe

    if (info.offset.x < -swipeThreshold) {
      // Geser Kiri -> Lanjut ke kartu berikutnya
      setCards((prev) => {
        const newArr = [...prev];
        newArr.push(newArr.shift()!);
        return newArr;
      });
    } else if (info.offset.x > swipeThreshold) {
      // Geser Kanan -> Balikin kartu sebelumnya
      setCards((prev) => {
        const newArr = [...prev];
        newArr.unshift(newArr.pop()!);
        return newArr;
      });
    }
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-surface-dark px-6 py-24 desktop:px-24">
      
      {/* Background Teks */}
      {/* <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5 pointer-events-none">
        <h2 className="font-display text-[15vw] font-black uppercase leading-none tracking-tighter text-surface-light">
          Impact
        </h2>
      </div> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 mb-16 inline-block rounded-full border-2 border-text-primary bg-surface-light px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-text-primary shadow-playful"
      >
        Word on the street
      </motion.div>

      {/* STACKING CAROUSEL ARENA */}
      <div 
        className="relative flex h-100 w-full max-w-md items-center justify-center desktop:h-112.5 desktop:max-w-xl"
        // Event listener untuk Pause on Hover
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // Untuk Mobile (Tap & Hold)
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <AnimatePresence mode="popLayout">
          {cards.map((card, index) => {
            // OPTIMASI: Cukup render 3 kartu teratas agar DOM tidak berat.
            // Saat kartu ke-4 maju ke posisi 3, Framer Motion akan memunculkannya perlahan.
            if (index > 2) return null;

            const isFront = index === 0;

            return (
              <motion.div
                key={card.id}
                layout // Ini fitur magis yang bikin kartu di belakang maju ke depan dengan mulus
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{
                  opacity: 1 - index * 0.2, // Kartu belakang makin transparan (1, 0.8, 0.6)
                  scale: 1 - index * 0.05, // Kartu belakang makin kecil (1, 0.95, 0.9)
                  y: -index * 30, // Kartu belakang ditumpuk agak ke atas (-0, -30px, -60px)
                  zIndex: 10 - index, // Kartu depan z-index paling tinggi
                }}
                exit={{
                  opacity: 0,
                  x: -250, // Slide out "Terbang" ke kiri
                  rotate: -20, // Efek jatuh saat dibuang
                  transition: { duration: 0.3, ease: "easeIn" }
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  delay: 0.30,
                }}
                // Bikin cuma kartu terdepan yang bisa di-drag
                drag={isFront ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={isFront ? handleDragEnd : undefined}
                className={`absolute flex h-75 w-[320px] flex-col justify-between rounded-3xl border-4 border-text-primary p-6 shadow-playful desktop:h-87.5 desktop:w-112.5 desktop:p-8 ${card.color} ${isFront ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
              >
                {/* Konten Teks (pointer-events-none agar tidak ganggu drag) */}
                <div className="flex flex-col gap-2 pointer-events-none desktop:gap-4">
                  <span className="font-display text-4xl font-black text-text-primary opacity-20 desktop:text-6xl">
                    "
                  </span>
                  <p className="font-display text-lg font-black leading-tight text-text-primary desktop:text-2xl">
                    {card.quote}
                  </p>
                </div>

                <div className="mt-auto flex w-full justify-end pointer-events-none">
                  <p className="rounded-full border-2 border-text-primary bg-surface-light px-3 py-1.5 font-display text-[10px] font-bold uppercase tracking-widest text-text-primary desktop:px-4 desktop:py-2 desktop:text-xs">
                    {card.author}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* Visual Hint untuk User */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
        className="relative z-10 mt-8 font-display text-sm font-bold tracking-widest text-surface-light uppercase"
      >
        *Hover to pause &bull; Swipe to explore
      </motion.p>

    </section>
  );
}