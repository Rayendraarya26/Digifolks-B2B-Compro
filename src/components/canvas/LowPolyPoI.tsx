"use client";

import { useRef } from "react";
import { useFrame, RootState } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { MathUtils } from "three";
import type { Mesh, Group } from "three";

export default function LowPolyPoI() {
  const groupRef = useRef<Group>(null);
  const probeRef = useRef<Mesh>(null);

  useFrame((state: RootState) => {
    const t = state.clock.getElapsedTime();

    // 1. Animasi konstan untuk probe (tetap berputar sendiri)
    if (probeRef.current) {
      probeRef.current.rotation.x = t * 0.5;
      probeRef.current.rotation.z = t * 0.3;
    }

    // 2. Animasi mengikuti kursor untuk keseluruhan grup
    if (groupRef.current) {
      // Rotasi dasar (berputar sangat pelan secara konstan)
      const baseRotationY = t * 0.1;

      // Kalkulasi target rotasi berdasarkan kursor
      // state.pointer bernilai dari -1 hingga 1 (x: kiri-kanan, y: bawah-atas)
      // Kita batasi maksimal kemiringan menggunakan Math.PI / 4 (sekitar 45 derajat)
      const targetRotationX = (state.pointer.y * Math.PI) / 8; 
      const targetRotationY = baseRotationY + (state.pointer.x * Math.PI) / 4;

      // Gunakan lerp untuk transisi rotasi yang sangat smooth
      groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.5, 2.5, 2.5]} />
          <meshStandardMaterial color="var(--color-pop-purple)" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>

      <group position={[3.5, 1, 0]}>
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
          <mesh ref={probeRef} castShadow>
            <octahedronGeometry args={[0.8, 0]} />
            <MeshDistortMaterial 
              color="var(--color-pop-yellow)" 
              distort={0.2} 
              speed={2} 
              roughness={0.4} 
            />
          </mesh>
        </Float>
      </group>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="var(--color-pop-pink)" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}