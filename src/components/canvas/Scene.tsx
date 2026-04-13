"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import LowPolyPoI from "./LowPolyPoI";

export default function Scene() {
  return (
    <div className="h-full w-full">
      {/* Set dpr (Device Pixel Ratio) untuk ketajaman ekstra di layar Retina/High-DPI */}
      <Canvas shadows camera={{ position: [0, 2, 10], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
          
          <LowPolyPoI />

          <Environment preset="city" />
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={4} />
        </Suspense>
      </Canvas>
    </div>
  );
}