"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    // smoothTouch: false sangat penting agar di HP (mobile) kita tetap pakai native scroll bawaan OS yang udah mulus
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      {children as any}
    </ReactLenis>
  );
}