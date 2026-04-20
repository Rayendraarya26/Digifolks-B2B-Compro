"use client";

import { motion, Variants } from "framer-motion";
import { teamDNAData } from "@/data/about";

// Varian animasi untuk kontainer agar memicu efek berurutan (stagger) pada anak-anaknya
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Jeda 0.2 detik antar kartu
    },
  },
};

// Varian animasi untuk masing-masing kartu
const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "tween", ease: "easeOut", duration: 0.5 }
  },
};

// Array warna dari tema Pastel Pop kita untuk variasi kartu
const cardColors = ["bg-pop-pink", "bg-pop-blue", "bg-pop-yellow"];

export default function OurDNA() {
  return (
    <section className="relative w-full bg-surface-light px-6 py-24 desktop:px-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <h2 className="font-display text-4xl font-black uppercase tracking-tighter desktop:text-6xl">
            Our{" "}
            <span
              className="text-transparent bg-clip-text bg-linear-to-r from-pop-green to-pop-blue stroke-text-primary stroke-2"
              style={{ WebkitTextStroke: "2px var(--color-text-primary)" }}
            >
              DNA
            </span>
          </h2>
          <p className="mt-4 max-w-lg text-lg font-medium text-text-muted">
            We don't do industry standards. We set them. Here is the core of our
            engineering culture.
          </p>
        </motion.div>

        {/* Grid Kartu DNA */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="grid w-full grid-cols-1 gap-6 tablet:grid-cols-3 tablet:gap-8"
        >
          {teamDNAData.map((dna, index) => {
            const randomRotation =
              index % 2 === 0 ? "rotate-[-2deg]" : "rotate-[2deg]";
            const bgColor = cardColors[index % cardColors.length];

            return (
              <motion.div
                  key={dna.id}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 0,
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  className={`relative flex h-full flex-col items-start justify-between rounded-2xl border-4 border-text-primary p-8 shadow-playful transition-colors ${bgColor} ${randomRotation}`}
                >
                {/* Dekorasi nomor kartu */}
                <span className="absolute right-4 top-4 font-display text-2xl font-black opacity-30">
                  0{index + 1}
                </span>

                <div className="mt-8 flex flex-col gap-4">
                  <h3 className="font-display text-2xl font-bold leading-tight text-text-primary">
                    {dna.value}
                  </h3>
                  <p className="font-medium text-text-primary/80">
                    {dna.shortPitch}
                  </p>
                </div>

                {/* Elemen dekoratif bawah */}
                <div className="mt-12 h-2 w-12 bg-text-primary" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
