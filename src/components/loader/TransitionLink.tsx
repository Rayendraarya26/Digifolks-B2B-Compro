"use client";

import Link from "next/link";
import React, {useRef} from "react";
import localFont from "next/font/local";

const AvayxRegular = localFont({ 
  src: "/../../fonts/Avayx.ttf",
  variable: "--avayx-regular" 
});

export default function TransitionLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const hiddenLinkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.location.pathname === href) return;

    // 1. Kunci kursor seketika
    document.body.style.pointerEvents = "none";

    // 2. Buat Kontainer Overlay
    const overlay = document.createElement("div");
    overlay.id = "transition-overlay";
    overlay.className = "fixed inset-0 z-[99999] flex flex-col pointer-events-none overflow-hidden";

    const panels: HTMLDivElement[] = [];

    // 3. GENERATE 5 BALOK (SOLID YELLOW SEAMLESS)
    for (let i = 0; i < 5; i++) {
      const panel = document.createElement("div");
      const isEven = i % 2 === 0;
      const startTranslate = isEven ? "-100%" : "100%";

      // KUNCI ESTETIKA: Full bg-pop-yellow tanpa border.
      // Kita tambahin class 'shutter-panel' biar gampang dideteksi sama Provider nanti
      panel.className = `shutter-panel flex-1 w-full bg-pop-yellow transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]`;
      
      panel.style.transform = `translateX(${startTranslate})`;
      // Efek Stagger (Beruntun)
      panel.style.transitionDelay = `${i * 75}ms`;
      panel.dataset.direction = isEven ? "right" : "left";

      overlay.appendChild(panel);
      panels.push(panel);
    }

    // 4. TEKS LOGO DI TENGAH (ABSOLUTE)
    const textContainer = document.createElement("div");
    textContainer.id = "transition-text"; // Dikasih ID biar gampang diilangin nanti
    textContainer.className = "absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out";
    textContainer.style.transitionDelay = "300ms"; 
    // Warna teks diganti jadi text-text-primary biar kelihatan di atas kuning
    textContainer.innerHTML = `<h1 class="${AvayxRegular.className} font-display text-4xl font-black uppercase tracking-widest text-text-primary">Digifolks</h1>`;
    
    overlay.appendChild(textContainer);
    document.body.appendChild(overlay);

    // 5. TRIGGER ANIMASI MASUK
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panels.forEach((p) => {
          p.style.transform = "translateX(0%)";
        });
        textContainer.classList.remove("opacity-0");
        textContainer.classList.add("opacity-100");
      });
    });

    // 6. Eksekusi pindah rute (500ms animasi + 300ms total stagger delay)
    setTimeout(() => {
      if (hiddenLinkRef.current) {
        hiddenLinkRef.current.click();
      }
    }, 800);
  };

  return (
    <>
      {/* THE PHANTOM LINK: Tag Link asli Next.js yang disembunyikan. 
          Prefetch otomatis jalan pas dirender, memastikan cache bersih dan transisi kilat! */}
      <Link ref={hiddenLinkRef} href={href} prefetch={true} className="hidden" />

      {/* Ini wrapper visual (a tag) yang diklik sama user */}
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>
    </>
  );
}