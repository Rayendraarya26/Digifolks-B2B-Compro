"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { MathUtils, Vector3 } from "three";
import type { Group } from "three";

export default function JumpingMascot({ activeIndex }: { activeIndex: number | null }) {
  const groupRef = useRef<Group>(null);
  const targetPosition = useRef(new Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // PERBAIKAN: Koordinat dirapatkan ke tengah agar visualnya pas dengan DOM Grid
    if (activeIndex === 0) targetPosition.current.set(-2, 1.2, 2);   // AI (Kiri Atas)
    else if (activeIndex === 1) targetPosition.current.set(2, 1.2, 2); // Mgmt (Kanan Atas)
    else if (activeIndex === 2) targetPosition.current.set(-2.5, -1.2, 2); // Web (Kiri Bawah)
    else if (activeIndex === 3) targetPosition.current.set(0, -1.2, 2);  // Apps (Tengah Bawah)
    else if (activeIndex === 4) targetPosition.current.set(2.5, -1.2, 2);  // IT (Kanan Bawah)
    else targetPosition.current.set(0, 0, -2); // Idle (Tengah Mundur)

    // Lerp untuk pergerakan mulus
    groupRef.current.position.lerp(targetPosition.current, 0.08);

    // Animasi putaran saat berpindah
    const dist = groupRef.current.position.distanceTo(targetPosition.current);
    const rotationSpeed = dist > 0.2 ? 8 : 1; // Putaran lebih agresif saat loncat
    
    groupRef.current.rotation.y += delta * rotationSpeed;
    groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, dist > 0.2 ? 0.5 : 0, 0.1);
  });

  return (
    <group ref={groupRef}>
      <Float speed={4} rotationIntensity={0} floatIntensity={0.5}>
        <mesh castShadow receiveShadow>
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial 
            color="var(--color-text-primary)" 
            roughness={0.2} 
            metalness={0.5} 
          />
        </mesh>
      </Float>
    </group>
  );
}