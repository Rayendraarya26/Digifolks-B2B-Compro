"use client";

import { useState, useEffect } from "react";

export function usePageTransition() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 1. CEK DUA-DUANYA BRO! Tirai Lokal (pindah halaman) dan Tirai Global (hard load)
    const localOverlay = document.getElementById("transition-overlay");
    const globalPreloader = document.getElementById("global-preloader");

    // Kalau dua-duanya nggak ada di layar, baru animasi boleh langsung ngegas
    if (!localOverlay && !globalPreloader) {
      setIsReady(true);
      return;
    }

    // 2. Kalau ada salah satu tirai, pasang telinga buat nunggu aba-aba
    const handleCurtainLifted = () => {
      setIsReady(true);
    };

    window.addEventListener("curtain-lifted", handleCurtainLifted);
    
    // Cleanup memory
    return () => window.removeEventListener("curtain-lifted", handleCurtainLifted);
  }, []);

  return isReady;
}