"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";

// Daftarkan ScrollTrigger ke GSAP
gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 580; // Total gambar lu
// Fungsi untuk memanggil path gambar sesuai indeks (sesuaikan nama file lu di sini)
const currentFrame = (index: number) =>
  `/sequence/frame-${String(index + 1).padStart(4, "0")}.webp`;

export default function ServicesScrollytelling() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    if (!isLoaded) {
      // Kunci layar biar nggak bisa di-scroll
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; // Opsional buat kunci usapan di HP
    } else {
      // Buka kunci kalau udah loaded
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }

    // Cleanup pas pindah halaman
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isLoaded]);

  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    if (!isLoaded) lenis.stop();
    else lenis.start();
  }, [isLoaded, lenis]);

  // 1. PRELOADER & SETUP CANVAS
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let loadedCount = 0;
    const playhead = { frame: 0 };

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (i === 0) renderFrame(0);
        // Load 20% gambar dulu baru buka gembok layar
        if (loadedCount > FRAME_COUNT * 0.2) setIsLoaded(true);
      };
      imagesRef.current.push(img);
    }

    const renderFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !ctx || !canvas) return;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let renderWidth, renderHeight, x, y;

      if (canvasRatio > imgRatio) {
        renderWidth = canvas.width;
        renderHeight = canvas.width / imgRatio;
        x = 0;
        y = (canvas.height - renderHeight) / 2;
      } else {
        renderWidth = canvas.height * imgRatio;
        renderHeight = canvas.height;
        x = (canvas.width - renderWidth) / 2;
        y = 0;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, renderWidth, renderHeight);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(Math.round(playhead.frame));
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // 2. GSAP SCROLL TRIGGER LOGIC
    const animation = gsap.to(playhead, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
      onUpdate: () => renderFrame(Math.round(playhead.frame)),
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      animation.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    // THE GHOST TRACK:
    // Tinggi 600vh artinya butuh 6 kali scroll layar untuk menyelesaikan animasi ini.
    // Semakin tinggi vh-nya, semakin lambat/panjang animasinya.
    <section
      ref={containerRef}
      className="relative w-full bg-surface-dark"
      style={{ height: "600vh" }}
    >
      {/* THE STICKY CANVAS (Panggung Permanen) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-surface-dark">
        {/* Loading State Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-surface-dark">
            <p className="font-display text-pop-yellow font-bold uppercase tracking-widest animate-pulse">
              Initializing Engine...
            </p>
          </div>
        )}

        {/* Canvas Gambar */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-0 h-full w-full opacity-60" // Opacity dikurangi agar teks lebih terbaca
        />

        {/* Vignette Overlay (Untuk blend background canvas agar menyatu dengan web) */}
        <div className="absolute inset-0 z-10 bg-linear-to-b from-surface-dark/80 via-transparent to-surface-dark/80 pointer-events-none" />
      </div>

      {isLoaded && (
        <div className="relative z-20 -mt-[100vh] flex w-full flex-col">
          {/* Intro */}
          <div className="flex h-screen w-full items-center justify-center px-6 desktop:px-24">
            <h2 className="font-display text-5xl font-black uppercase text-surface-light desktop:text-8xl drop-shadow-lg text-center">
              Our Ecosystem
            </h2>
          </div>

          {/* Service 1 */}
          <div className="flex h-[150vh] w-full items-center justify-start px-6 desktop:px-24">
            <div className="max-w-xl">
              <h3 className="font-display text-4xl font-black text-pop-pink desktop:text-6xl mb-4">
                Frontend Engineering
              </h3>
              <p className="text-xl text-surface-light/80 font-medium leading-relaxed">
                We don't just build UI. We craft hyper-interactive experiences.
                Every pixel is calculated, every animation is GPU-accelerated.
              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="flex h-[150vh] w-full items-center justify-end px-6 desktop:px-24 text-right">
            <div className="max-w-xl">
              <h3 className="font-display text-4xl font-black text-pop-blue desktop:text-6xl mb-4">
                Backend Architecture
              </h3>
              <p className="text-xl text-surface-light/80 font-medium leading-relaxed">
                Robust, scalable, and secure. We architect systems designed to
                handle millions of requests without breaking a sweat.
              </p>
            </div>
          </div>

          {/* Outro */}
          <div className="flex h-screen w-full items-center justify-center px-6 desktop:px-24">
            <button className="rounded-full border-4 border-pop-yellow bg-transparent px-8 py-4 font-display text-xl font-bold uppercase text-pop-yellow transition-colors hover:bg-pop-yellow hover:text-surface-dark">
              Explore Stack
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
