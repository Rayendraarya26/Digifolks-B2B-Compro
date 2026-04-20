"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import localFont from "next/font/local";

const AvayxRegular = localFont({ 
  src: "/../../fonts/Avayx.ttf",
  variable: "--avayx-regular" 
});

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fungsi Tracker buat ngecek stabilitas layout (requestAnimationFrame)
    const runStabilityTracker = () => {
      let stableFrames = 0;
      let lastHeight = -1;
      let animationFrameId: number;

      const checkStability = () => {
        const currentHeight = document.body.scrollHeight;

        // Cek apakah tinggi body udah konsisten
        if (currentHeight === lastHeight && currentHeight > 0) {
          stableFrames++;
        } else {
          stableFrames = 0;
          lastHeight = currentHeight;
        }

        const isLocked =
          document.body.getAttribute("data-animating") === "true";

        // Kalau udah stabil selama 10 frame DAN gemboknya nggak dikunci
        if (stableFrames > 10 && !isLocked) {
          setTimeout(() => {
            document.body.style.overflow = "unset";
            setIsLoading(false);
          }, 600);
        } else {
          animationFrameId = requestAnimationFrame(checkStability);
        }
      };

      animationFrameId = requestAnimationFrame(checkStability);
    };

    // Kunci scroll pas lagi preloading
    document.body.style.overflow = "hidden";

    // MASTER TRIGGER:
    // Pastikan semua aset gambar/font udah selesai didownload browser dulu
    // Baru kita jalanin Tracker kestabilan layout-nya
    if (document.readyState === "complete") {
      runStabilityTracker();
    } else {
      window.addEventListener("load", runStabilityTracker);
      return () => window.removeEventListener("load", runStabilityTracker);
    }
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        window.dispatchEvent(new CustomEvent("curtain-lifted"));
      }}
    >
      {isLoading && (
        <motion.div
          id="global-preloader"
          key="global-preloader"
          // Exit animation: Tirai diangkat ke atas (y: "-100%")
          exit={{ y: "-100%" }}
          // Custom easing ini bikin tarikannya terasa berat di awal lalu wussssh kenceng (Premium feel)
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-pop-yellow"
        >
          {/* =========================================
              KONTEN PRELOADER NEO-BRUTALISM
          ========================================= */}
          <div className="flex flex-col items-center gap-8">
            {/* Spinning Cog/Star ala Neo-Brutalism */}
            <div className="relative flex h-24 w-24 items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-xl border-4 border-text-primary bg-pop-pink shadow-[6px_6px_0_rgba(0,0,0,1)]"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-4 border-text-primary bg-pop-green"
              />
            </div>

            {/* Brand & Loading Text */}
            <div className="flex flex-col items-center gap-2 overflow-hidden">
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`${AvayxRegular.className} font-display text-5xl font-black uppercase tracking-widest text-text-primary`}
              >
                Digifolks
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-3 rounded-full border-2 border-text-primary bg-surface-light px-4 py-2 shadow-playful"
              >
                <div className="h-2 w-2 animate-ping rounded-full bg-pop-purple" />
                <span className="font-bold uppercase tracking-widest text-text-primary text-xs">
                  Compiling Assets...
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
