"use client";

import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { ThreeElements, useThree } from '@react-three/fiber'
import { KTX2Loader } from 'three-stdlib'

const ktx2Loader = new KTX2Loader()
ktx2Loader.setTranscoderPath('https://unpkg.com/three@0.168.0/examples/jsm/libs/basis/')

type GLTFResult = GLTF & {
  nodes: {
    Torus004: THREE.Mesh
    Torus001: THREE.Mesh
    Torus002: THREE.Mesh
    Torus003: THREE.Mesh
    Torus005: THREE.Mesh
    Torus006: THREE.Mesh
    Torus007: THREE.Mesh
    Torus008: THREE.Mesh
    Torus009: THREE.Mesh
    Torus010: THREE.Mesh
    Tube001_1: THREE.Mesh
    Sphere001: THREE.Mesh
    Line001_1: THREE.Mesh
    Tube002_1: THREE.Mesh
    Sphere002: THREE.Mesh
    Line002_1: THREE.Mesh
    Tube003_1: THREE.Mesh
    Sphere003: THREE.Mesh
    Line003_1: THREE.Mesh
    Tube004_1: THREE.Mesh
    Sphere004: THREE.Mesh
    Line004_1: THREE.Mesh
    Tube005_1: THREE.Mesh
    Sphere005: THREE.Mesh
    Line005_1: THREE.Mesh
    ['1__RPDP_HANDLE_1']: THREE.Mesh
    ['1__RPDP_HANDLE_1_1']: THREE.Mesh
    Rectangle001: THREE.Mesh
    Rectangle002: THREE.Mesh
  }
  materials: {}
  // PERBAIKAN 1: Gunakan THREE.AnimationClip bawaan Three.js
  animations: THREE.AnimationClip[] 
}

// Gunakan GroupProps di sini
export function Model(props: ThreeElements['group']) {
  const group = useRef<THREE.Group>(null)

  const { gl } = useThree()
  
  const { nodes, materials, animations } = useGLTF(
    '/assets3D/Newton_Cradle.glb', 
    true, // useDraco (kompresi geometri)
    true, // useMeshOpt (kompresi mesh)
    (loader) => {
      ktx2Loader.detectSupport(gl)
      loader.setKTX2Loader(ktx2Loader)
    }
  ) as unknown as GLTFResult
  
  // Setup Animasi
  const { actions } = useAnimations(animations, group)

  // Auto-play animasi saat komponen di-mount
  useEffect(() => {
    const animationNames = Object.keys(actions);
    // Kalau ada animasi di dalam file .glb, langsung play animasi pertama
    if (animationNames.length > 0) {
      const firstAnimation = animationNames[0];
      actions[firstAnimation]?.play();
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, -0.034, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01}>
        <group position={[0, 40, 114.97]}>
          <mesh geometry={nodes.Torus004.geometry} material={nodes.Torus004.material} position={[18, 0, 0]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} />
          <mesh geometry={nodes.Torus001.geometry} material={nodes.Torus001.material} position={[-36, 0, 0]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} />
          <mesh geometry={nodes.Torus002.geometry} material={nodes.Torus002.material} position={[-18, 0, 0]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} />
          <mesh geometry={nodes.Torus003.geometry} material={nodes.Torus003.material} rotation={[Math.PI / 2, -Math.PI / 2, 0]} />
          <mesh geometry={nodes.Torus005.geometry} material={nodes.Torus005.material} position={[36, 0, 0]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} />
        </group>
        <group position={[0, -40, 114.97]}>
          <mesh geometry={nodes.Torus006.geometry} material={nodes.Torus006.material} position={[18, 0, 0]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} />
          <mesh geometry={nodes.Torus007.geometry} material={nodes.Torus007.material} position={[-36, 0, 0]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} />
          <mesh geometry={nodes.Torus008.geometry} material={nodes.Torus008.material} position={[-18, 0, 0]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} />
          <mesh geometry={nodes.Torus009.geometry} material={nodes.Torus009.material} rotation={[Math.PI / 2, -Math.PI / 2, 0]} />
          <mesh geometry={nodes.Torus010.geometry} material={nodes.Torus010.material} position={[36, 0, 0]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} />
        </group>
        <group position={[-36, -20.561, 112.488]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
          <group position={[-23.061, -73.104, 0]} rotation={[0, Math.PI / 2, 0]}>
            <mesh geometry={nodes.Tube001_1.geometry} material={nodes.Tube001_1.material} />
            <mesh geometry={nodes.Sphere001.geometry} material={nodes.Sphere001.material} position={[0, -9.384, 2.5]} rotation={[-Math.PI / 2, 0, 0]} />
          </group>
          <mesh geometry={nodes.Line001_1.geometry} material={nodes.Line001_1.material} position={[0, -35.462, 0]} />
        </group>
        <group position={[-18, -20.561, 112.488]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
          <group position={[-23.061, -73.104, 0]} rotation={[0, Math.PI / 2, 0]}>
            <mesh geometry={nodes.Tube002_1.geometry} material={nodes.Tube002_1.material} />
            <mesh geometry={nodes.Sphere002.geometry} material={nodes.Sphere002.material} position={[0, -9.384, 2.5]} rotation={[-Math.PI / 2, 0, 0]} />
          </group>
          <mesh geometry={nodes.Line002_1.geometry} material={nodes.Line002_1.material} position={[0, -35.462, 0]} />
        </group>
        <group position={[0, -20.561, 112.488]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
          <group position={[-23.061, -73.104, 0]} rotation={[0, Math.PI / 2, 0]}>
            <mesh geometry={nodes.Tube003_1.geometry} material={nodes.Tube003_1.material} />
            <mesh geometry={nodes.Sphere003.geometry} material={nodes.Sphere003.material} position={[0, -9.384, 2.5]} rotation={[-Math.PI / 2, 0, 0]} />
          </group>
          <mesh geometry={nodes.Line003_1.geometry} material={nodes.Line003_1.material} position={[0, -35.462, 0]} />
        </group>
        <group position={[18, -20.561, 112.488]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
          <group position={[-23.061, -73.104, 0]} rotation={[0, Math.PI / 2, 0]}>
            <mesh geometry={nodes.Tube004_1.geometry} material={nodes.Tube004_1.material} />
            <mesh geometry={nodes.Sphere004.geometry} material={nodes.Sphere004.material} position={[0, -9.384, 2.5]} rotation={[-Math.PI / 2, 0, 0]} />
          </group>
          <mesh geometry={nodes.Line004_1.geometry} material={nodes.Line004_1.material} position={[0, -35.462, 0]} />
        </group>
        <group position={[36, -20.561, 112.488]} rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
          <group position={[-23.061, -73.104, 0]} rotation={[0, Math.PI / 2, 0]}>
            <mesh geometry={nodes.Tube005_1.geometry} material={nodes.Tube005_1.material} />
            <mesh geometry={nodes.Sphere005.geometry} material={nodes.Sphere005.material} position={[0, -9.384, 2.5]} rotation={[-Math.PI / 2, 0, 0]} />
          </group>
          <mesh geometry={nodes.Line005_1.geometry} material={nodes.Line005_1.material} position={[0, -35.462, 0]} />
        </group>
        <group position={[0, 0, 3.41]}>
          <mesh geometry={nodes['1__RPDP_HANDLE_1'].geometry} material={nodes['1__RPDP_HANDLE_1'].material} />
          <mesh geometry={nodes['1__RPDP_HANDLE_1_1'].geometry} material={nodes['1__RPDP_HANDLE_1_1'].material} />
        </group>
        <mesh geometry={nodes.Rectangle001.geometry} material={nodes.Rectangle001.material} position={[0, -40, 60]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes.Rectangle002.geometry} material={nodes.Rectangle002.material} position={[0, 40, 60]} rotation={[Math.PI / 2, 0, 0]} />
      </group>
    </group>
  )
}

// useGLTF.preload('/assets3D/Newton_Cradle.glb')