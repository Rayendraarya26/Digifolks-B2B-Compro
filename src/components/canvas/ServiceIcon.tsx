"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { MathUtils, Color } from "three";
import type { Mesh, MeshStandardMaterial } from "three";

interface ServiceIconProps {
  assetId: string;
  isHovered: boolean;
  accentColor: string;
}

export default function ServiceIcon({ assetId, isHovered, accentColor }: ServiceIconProps) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);

  const targetColor = useMemo(() => new Color(), []);
  const hoverColor = useMemo(() => new Color(accentColor), [accentColor]);
  const baseColor = useMemo(() => new Color("#1A1A1A"), []); 

  const rotationSpeed = useRef(0.5);

  useFrame((state, delta) => {
    // Pengamanan tambahan: Batasi nilai delta agar jika terjadi lag (FPS drop parah), 
    // objek tidak melompat terlalu jauh. (Cap max delta di 0.1 detik)
    const safeDelta = Math.min(delta, 0.1);

    if (meshRef.current && materialRef.current) {
      const targetScale = isHovered ? 1.3 : 1;
      meshRef.current.scale.setScalar(
        MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
      );

      const targetSpeed = isHovered ? 2.5 : 0.5;
      rotationSpeed.current = MathUtils.lerp(rotationSpeed.current, targetSpeed, 0.1);
      
      // Gunakan safeDelta agar rotasi tetap stabil walau FPS perangkat pengguna berfluktuasi
      meshRef.current.rotation.y += safeDelta * rotationSpeed.current;
      meshRef.current.rotation.x += safeDelta * (rotationSpeed.current * 0.4);

      targetColor.copy(isHovered ? hoverColor : baseColor);
      materialRef.current.color.lerp(targetColor, 0.1);
    }
  });

  const renderGeometry = () => {
    switch (assetId) {
      case "floating-keyboard":
        return <icosahedronGeometry args={[1.2, 0]} />;
      case "server-stack":
        return <cylinderGeometry args={[1, 1, 2, 16]} />;
      case "abstract-sphere":
        return <torusKnotGeometry args={[0.8, 0.3, 64, 8]} />;
      default:
        return <boxGeometry args={[1.5, 1.5, 1.5]} />;
    }
  };

  return (
    // PERBAIKAN KRUSIAL: Set rotationIntensity ke 0 agar tidak bertabrakan dengan useFrame
    <Float speed={2} rotationIntensity={0} floatIntensity={1}>
      <mesh ref={meshRef}>
        {renderGeometry()}
        <meshStandardMaterial 
          ref={materialRef}
          roughness={0.3} 
          metalness={0.7} 
          wireframe={assetId === "abstract-sphere" && !isHovered} 
        />
      </mesh>
    </Float>
  );
}