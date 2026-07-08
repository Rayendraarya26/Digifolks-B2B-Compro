"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const runStabilityTracker = () => {
      let stableFrames = 0;
      let lastHeight = -1;
      let animationFrameId: number;

      const checkStability = () => {
        const currentHeight = document.body.scrollHeight;

        if (currentHeight === lastHeight && currentHeight > 0) {
          stableFrames++;
        } else {
          stableFrames = 0;
          lastHeight = currentHeight;
        }

        const isLocked = document.body.getAttribute("data-animating") === "true";

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

    document.body.style.overflow = "hidden";

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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-pure"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src="/Digifolks-Logo.png"
                alt="Digifolks Logo"
                width={200}
                height={60}
                className="w-auto h-60 object-contain"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-3 px-4 py-2"
            >
              <div className="flex space-x-1">
                <motion.div className="w-2 h-2 bg-brand-navy rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                <motion.div className="w-2 h-2 bg-brand-navy rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                <motion.div className="w-2 h-2 bg-brand-navy rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

