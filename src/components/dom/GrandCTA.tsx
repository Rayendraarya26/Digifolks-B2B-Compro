"use client";

import { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function GrandCTA({grandCTAUrl}: {grandCTAUrl: string}) {

  // --- MAGNETIC BUTTON LOGIC ---
  const btnRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const centerPointX = left + width / 2;
    const centerPointY = top + height / 2;
    x.set((e.clientX - centerPointX) * 0.3);
    y.set((e.clientY - centerPointY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative w-full flex flex-col">
      
      {/* =========================================
          THE GRAND CALL-TO-ACTION (Pre-Footer)
      ========================================= */}
      <div className="relative flex flex-col items-center justify-center border-t-2 border-b-2 border-text-primary bg-pop-yellow px-6 py-32 text-center desktop:px-24 desktop:py-48">
        <h2 className="font-display text-5xl font-black uppercase leading-none tracking-tighter text-text-primary sm:text-7xl desktop:text-8xl">
          Let's build the <span className="text-surface-light drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">future</span>,<br />
          one pixel at a time.
        </h2>
        
        <div className="mt-16 p-8" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={() => window.open(grandCTAUrl, '_blank', 'noopener,noreferrer')}>
          <motion.button
            ref={btnRef}
            style={{ x: smoothX, y: smoothY }}
            className="group relative rounded-full border-2 border-text-primary bg-pop-pink px-12 py-6 font-display text-md tablet:text-2xl font-black uppercase tracking-widest text-text-primary shadow-[6px_6px_0_rgba(0,0,0,1)] transition-shadow hover:shadow-[10px_10px_0_rgba(0,0,0,1)] active:shadow-none"
          >
            Start a Project
          </motion.button>
        </div>
      </div>
    </div>
  );
}