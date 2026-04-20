"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function TransitionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const overlay = document.getElementById("transition-overlay");

    if (overlay) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          
          // AMBIL KHUSUS ELEMEN BALOK SAJA
          const panels = Array.from(overlay.querySelectorAll(".shutter-panel")) as HTMLElement[];
          const textContainer = document.getElementById("transition-text");
          
          if (panels.length === 0) return;

          // Pantau balok TERAKHIR (index 4)
          const lastPanel = panels[panels.length - 1];

          // 1. SAFETY NET (Jaga-jaga tab di-minimize)
          const safetyFallback = setTimeout(() => {
            if (document.body.contains(overlay)) {
              window.dispatchEvent(new CustomEvent("curtain-lifted"));
              overlay.remove();
            }
          }, 1000); 

          // 2. THE ABSOLUTE SYNC
          const onTransitionEnd = (e: TransitionEvent) => {
            if (e.propertyName === "transform") {
              clearTimeout(safetyFallback);
              window.dispatchEvent(new CustomEvent("curtain-lifted"));
              lastPanel.removeEventListener("transitionend", onTransitionEnd);
              overlay.remove();
            }
          };

          lastPanel.addEventListener("transitionend", onTransitionEnd as EventListener);

          // 3. ACTION: Suruh baloknya BABLAS dan TEKSNYA HILANG!
          if (textContainer) {
            textContainer.classList.remove("opacity-100");
            textContainer.classList.add("opacity-0");
          }

          panels.forEach((p) => {
            const direction = p.dataset.direction;
            const endTranslate = direction === "right" ? "100%" : "-100%";
            p.style.transform = `translateX(${endTranslate})`;
          });

          document.body.style.pointerEvents = "auto";
          
        });
      });
    }
  }, [pathname]);

  return null;
}