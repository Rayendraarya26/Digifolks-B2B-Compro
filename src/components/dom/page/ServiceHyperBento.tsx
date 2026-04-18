"use client";

import { motion } from "framer-motion";
import { Zap, Settings, Globe, Smartphone, Lightbulb } from "lucide-react";

// --- DATA SERVICES ---
const SERVICES = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    description: "We don't just code AI. We birth digital brains that learn, adapt, and outsmart humans. From chatbots that roast you to predictive models that know you better than your mom.",
    icon: Zap,
    color: "bg-pop-pink",
    techStack: ["Python", "TensorFlow", "PyTorch", "OpenAI"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "management-system",
    title: "Management System",
    description: "ERP, CRM, DMS - whatever you call it, we make it sexy. Dashboards that pop, workflows that flow, and data that dances. Your business, but make it Gen Z.",
    icon: Settings,
    color: "bg-pop-blue",
    techStack: ["React", "Node.js", "PostgreSQL", "Docker"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "web-platform",
    title: "Web Platform",
    description: "Not just websites. Hyper-interactive playgrounds with WebGL, shaders, and animations that break the internet. Your web presence will go viral (the good kind).",
    icon: Globe,
    color: "bg-pop-yellow",
    techStack: ["Next.js", "Tailwind v4", "Framer Motion", "Three.js"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
  },
  {
    id: "mobile-desktop",
    title: "Mobile & Desktop Apps",
    description: "Android, iOS, Desktop - we build apps that feel native but look futuristic. Cross-platform sorcery with React Native, Flutter, and Electron. One codebase, infinite flex.",
    icon: Smartphone,
    color: "bg-pop-green",
    techStack: ["React Native", "Flutter", "Swift", "Electron"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "it-solution",
    title: "IT Solution & Consulting",
    description: "Stuck in digital hell? We rescue you with custom solutions, cloud migration, and consulting that actually makes sense. Your IT nightmare becomes our playground.",
    icon: Lightbulb,
    color: "bg-pop-purple",
    techStack: ["AWS", "Google Cloud", "Kubernetes", "Linux"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
  }
];

export default function ServicesHyperBento() {
  return (
    <section className="min-h-screen w-full bg-surface-light px-4 py-24 sm:px-6 desktop:px-24">
      
      {/* HEADER SECTION */}
      <div className="mb-20 flex flex-col items-center text-center">
        <div className="mb-6 inline-block rounded-full border-2 border-text-primary bg-surface-light px-6 py-2 text-sm font-bold uppercase tracking-widest text-text-primary shadow-[4px_4px_0_rgba(0,0,0,1)]">
          Our Expertise
        </div>
        <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tighter text-text-primary sm:text-7xl desktop:text-8xl">
          Digital <span className="block text-pop-yellow drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">Firepower</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg font-bold text-text-primary/80">
          We don't just build software. We engineer scalable ecosystems designed to dominate the modern web. Choose your weapon.
        </p>
      </div>

      {/* THE HYPER-BENTO DIRECTORY */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-24">
        {SERVICES.map((service, index) => (
          
          // SUPER-BENTO BLOCK
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }} // Reveal saat block masuk layar
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="flex flex-col gap-4 desktop:grid desktop:grid-cols-3 desktop:grid-rows-2 desktop:gap-6"
          >
            
            {/* KOTAK 1: Judul & Icon (Warna Dinamis) */}
            <div className={`col-span-1 row-span-1 flex flex-col justify-between rounded-4xl border-2 border-text-primary p-8 shadow-[4px_4px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 ${service.color}`}>
              <div className="mb-8 inline-flex w-fit rounded-2xl border-2 border-text-primary bg-surface-light p-4 shadow-[4px_4px_0_rgba(0,0,0,1)]">
                <service.icon className="h-8 w-8 text-text-primary" />
              </div>
              <h2 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-text-primary sm:text-4xl">
                {service.title}
              </h2>
            </div>

            {/* KOTAK 2: Deskripsi Panjang */}
            <div className="col-span-1 row-span-1 flex items-center rounded-4xl border-2 border-text-primary bg-surface-light p-8 shadow-[4px_4px_0_rgba(0,0,0,1)] desktop:col-span-2">
              <p className="text-xl font-bold leading-relaxed text-text-primary sm:text-2xl">
                "{service.description}"
              </p>
            </div>

            {/* KOTAK 4: Tech Stack (Kita letakkan di row 2 col 1 agar rapi di bawah judul saat desktop) */}
            <div className="col-span-1 row-span-1 flex flex-col justify-center gap-4 rounded-4xl border-2 border-text-primary bg-surface-light p-8 shadow-[4px_4px_0_rgba(0,0,0,1)]">
              <p className="font-display text-sm font-black uppercase tracking-widest text-text-primary/50">
                Core Stack
              </p>
              <div className="flex flex-wrap gap-3">
                {service.techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="rounded-full border-2 border-text-primary bg-surface-dark/5 px-4 py-2 text-sm font-bold uppercase tracking-wider text-text-primary transition-colors hover:bg-pop-yellow"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* KOTAK 3: Gambar Visual Utama */}
            <div className="col-span-1 row-span-1 overflow-hidden rounded-4xl border-2 border-text-primary bg-surface-dark shadow-[4px_4px_0_rgba(0,0,0,1)] desktop:col-span-2">
              <div className="group relative h-64 w-full sm:h-80 desktop:h-full">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                {/* Subtle overlay agar lebih nge-blend */}
                <div className="absolute inset-0 bg-surface-dark/10 transition-opacity duration-300 group-hover:bg-transparent" />
              </div>
            </div>

          </motion.div>
        ))}
      </div>

    </section>
  );
}