"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { 
  Environment, 
  Float, 
  PresentationControls, 
  ContactShadows 
} from "@react-three/drei";

// Import komponen model Newton Cradle yang udah kita patch tadi
import { Model as NewtonCradle } from "./Newton_Cradle";

export default function Scene() {
  return (
    // Kamera sedikit dinaikkan (Y: 2) biar kita ngeliat cradle-nya agak dari atas
    <Canvas camera={{ position: [0, 2, 8], fov: 45 }} dpr={[1, 2]}>
      {/* Wajib pakai Suspense buat nunggu file .glb loading */}
      <Suspense fallback={null}>
        
        {/* Pencahayaan Studio. Preset "city" bikin pantulan besi di cradle kelihatan super realistis */}
        <Environment preset="city" environmentIntensity={1.2} />

        {/* Presentation Controls: Ini sihir interaktifnya. 
          Bikin objek bisa diputar-putar user, tapi dibatasi sudutnya (azimuth/polar).
          Fitur 'snap' bikin dia nge-per balik ke posisi awal saat mouse dilepas.
        */}
        <PresentationControls
          global
          rotation={[0.1, -0.4, 0]} // Posisi miring default yang estetik
          polar={[-0.2, 0.2]} // Batas putaran atas-bawah
          azimuth={[-Math.PI / 4, Math.PI / 4]} // Batas putaran kiri-kanan
          snap={true}
        >
          {/* Float: Bikin objek ngambang halus kayak di luar angkasa */}
          {/* Intensitas dibikin kecil aja biar nggak nabrak sama animasi ayunan cradle-nya */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            
            {/* INI MODEL LU BRO! 
                Note: scale dan position ini mungkin perlu lu tweak sedikit
                tergantung ukuran asli dari file Blender/glb-nya. 
            */}
            <NewtonCradle scale={1.2} position={[0, -1, 0]} />
            
          </Float>
        </PresentationControls>

        {/* Fake Shadow di lantai biar objeknya terasa punya bobot grafitasi */}
        <ContactShadows 
          position={[0, -2.5, 0]} 
          opacity={0.6} 
          scale={15} 
          blur={2.5} 
          far={4} 
          color="#000000"
        />
        
      </Suspense>
    </Canvas>
  );
}