"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Calendar,
  Briefcase,
  User,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useRouter, usePathname } from "next/navigation";
import { Suspense } from "react";
import { usePageTransition } from "@/hooks/UsePageTransition";

const CATEGORIES = ["All", "Web App", "AI & System", "Backend", "E-Commerce"];

// --- VARIAN ANIMASI UNTUK DETAIL PORTOFOLIO ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4, 
    },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  }
};

const slideUpItem: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: "spring", stiffness: 250, damping: 20 } 
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

// --- KOMPONEN: OVERLAY DETAIL (FULL SCREEN) ---
const ProjectDetail = ({
  project,
  onClose,
}: {
  project: (typeof portfolioData)[0];
  onClose: () => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // STATE BARU: Melacak indeks gambar showcase yang sedang di-zoom
  const [zoomedImageIdx, setZoomedImageIdx] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    mass: 0.5,
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const progressWidth = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  useEffect(() => {
    // Penjaga ini cuma aktif pas gambar lagi di-zoom!
    if (zoomedImageIdx !== null) {
      
      // Fungsi eksekutor untuk mematikan scroll bawaan (Native Scroll Browser)
      const killNativeScroll = (e: Event) => {
        e.preventDefault();
      };

      // Pasang gembok di level paling akar (window)
      // Opsi { passive: false } ini WAJIB MANTLUL ada, kalau nggak browser bakal nge-block preventDefault() lu.
      window.addEventListener("touchmove", killNativeScroll, { passive: false });
      window.addEventListener("wheel", killNativeScroll, { passive: false });

      return () => {
        // Buka gembok saat gambar ditutup / di-discard (drag)
        window.removeEventListener("touchmove", killNativeScroll);
        window.removeEventListener("wheel", killNativeScroll);
      };
    }
  }, [zoomedImageIdx]);

  return (
    <>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-100 h-dvh w-full overflow-x-clip overscroll-none bg-surface-light custom-scrollbar ${
          zoomedImageIdx !== null ? "overflow-hidden" : "overflow-y-auto"
        }`}
      >
        {/* TOP COMMAND BAR & PROGRESS INDICATOR */}
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
          className="sticky top-0 z-110 w-full border-b-4 border-text-primary bg-surface-light shadow-[0_4px_0_rgba(0,0,0,1)]"
        >
          <div className="flex w-full justify-between px-6 py-4 pointer-events-none sm:px-12 items-center">
            <div className="flex items-center gap-3">
               <div className="h-3 w-3 rounded-full bg-pop-pink animate-pulse" />
               <span className="font-mono text-sm font-bold uppercase tracking-widest text-text-primary hidden sm:block">
                 Previewing: {project.id}
               </span>
            </div>
            <button
              onClick={onClose}
              className="pointer-events-auto flex items-center gap-2 rounded-full border-4 border-text-primary bg-pop-yellow px-6 py-2 font-display text-sm font-black uppercase text-text-primary shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:bg-pop-pink hover:shadow-[6px_6px_0_rgba(0,0,0,1)] active:translate-y-0"
            >
              <ArrowLeft className="h-5 w-5" /> Back to Archive
            </button>
          </div>
          <motion.div 
            style={{ width: progressWidth }} 
            className="absolute bottom-0 left-0 h-1.5 bg-pop-green border-r-2 border-text-primary z-120" 
          />
        </motion.div>

        <div className="mx-auto w-full max-w-6xl px-6 pb-24 pt-12 desktop:px-0 sm:px-12">
          
          {/* HERO SECTION */}
          <div className="flex flex-col gap-8 desktop:flex-row desktop:items-center">
            <div className="w-full desktop:w-1/2">
              <motion.div
                layoutId={`image-${project.id}`}
                className="relative aspect-4/3 w-full overflow-hidden rounded-[2.5rem] border-4 border-text-primary bg-surface-dark shadow-[8px_8px_0_rgba(0,0,0,1)]"
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover origin-center"
                />
              </motion.div>
            </div>
            <div className="w-full desktop:w-1/2">
              <motion.div layoutId={`info-${project.id}`} className="flex flex-col items-start gap-4">
                <div className="rounded-full border-2 border-text-primary bg-pop-purple px-4 py-1 font-display text-sm font-black uppercase tracking-widest text-surface-light shadow-[2px_2px_0_rgba(0,0,0,1)]">
                  {project.projectType}
                </div>
                <h2 className="font-display text-5xl font-black uppercase leading-none tracking-tighter text-text-primary desktop:text-8xl sm:text-7xl drop-shadow-sm">
                  {project.title}
                </h2>
              </motion.div>
            </div>
          </div>

          <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          exit="exit"
          className="mt-20 flex flex-col gap-12 desktop:flex-row"
        >
          {/* Main Content (Kiri) */}
          <div className="flex flex-col gap-16 desktop:w-2/3">
            <motion.section variants={slideUpItem}>
              <h3 className="mb-4 font-display text-3xl font-black uppercase tracking-tight text-text-primary flex items-center gap-3">
                <span className="bg-pop-pink w-3 h-8 border-2 border-text-primary inline-block"></span>
                The Challenge
              </h3>
              <p className="text-lg font-medium leading-relaxed text-text-primary/80">
                {project.challenge}
              </p>
            </motion.section>

            <motion.section variants={slideUpItem}>
              <h3 className="mb-6 font-display text-3xl font-black uppercase tracking-tight text-text-primary flex items-center gap-3">
                <span className="bg-pop-blue w-3 h-8 border-2 border-text-primary inline-block"></span>
                The Blueprint
              </h3>
              <div className="relative w-full rounded-[2.5rem] border-4 border-text-primary bg-surface-light p-8 shadow-[8px_8px_0_rgba(0,0,0,1)] sm:p-10">
                <p className="whitespace-pre-line text-lg font-medium leading-relaxed text-text-primary/80">
                  {project.requirements}
                </p>
              </div>
            </motion.section>

            <motion.section variants={slideUpItem}>
              <h3 className="mb-6 font-display text-3xl font-black uppercase tracking-tight text-text-primary flex items-center gap-3">
                <span className="bg-pop-yellow w-3 h-8 border-2 border-text-primary inline-block"></span>
                The Craft
              </h3>
              <div className="flex flex-wrap gap-4">
                {project.tags.map((tech) => (
                  <motion.div
                    key={tech}
                    whileHover={{ y: -5, rotate: [-2, 2, 0] }} // Micro-interaction Jiggle
                    className="flex cursor-default items-center gap-2 rounded-2xl border-4 border-text-primary bg-surface-light px-5 py-3 shadow-[4px_4px_0_rgba(0,0,0,1)] transition-colors hover:bg-pop-yellow"
                  >
                    <div className="h-3 w-3 rounded-full border-2 border-text-primary bg-pop-green" />
                    <span className="font-display text-sm font-black uppercase tracking-wider">
                      {tech}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={slideUpItem} className="rounded-[2.5rem] border-4 border-text-primary bg-pop-green p-8 shadow-[8px_8px_0_rgba(0,0,0,1)] sm:p-10">
              <h3 className="mb-4 font-display text-3xl font-black uppercase tracking-tight text-text-primary">
                The Solutions
              </h3>
              <p className="text-xl font-bold italic leading-relaxed text-text-primary">
                "{project.solutions}"
              </p>
            </motion.section>
          </div>

          {/* Sticky Sidebar (Kanan) */}
          <motion.aside variants={slideUpItem} className="desktop:w-1/3">
            <div className="sticky top-32 flex flex-col gap-6 rounded-[2.5rem] border-4 border-text-primary bg-pop-yellow p-8 shadow-[8px_8px_0_rgba(0,0,0,1)]">
              
              <div className="flex items-center gap-4 group">
                <div className="rounded-xl border-4 border-text-primary bg-surface-light p-3 shadow-[4px_4px_0_rgba(0,0,0,1)] transition-transform group-hover:-translate-y-1 group-hover:bg-pop-pink">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase opacity-60">Client</p>
                  <p className="font-display text-lg font-black uppercase">{project.client}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="rounded-xl border-4 border-text-primary bg-surface-light p-3 shadow-[4px_4px_0_rgba(0,0,0,1)] transition-transform group-hover:-translate-y-1 group-hover:bg-pop-blue">
                  <Briefcase className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase opacity-60">Industry</p>
                  <p className="font-display text-lg font-black uppercase">{project.industry}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="rounded-xl border-4 border-text-primary bg-surface-light p-3 shadow-[4px_4px_0_rgba(0,0,0,1)] transition-transform group-hover:-translate-y-1 group-hover:bg-pop-green">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase opacity-60">Date</p>
                  <p className="font-display text-lg font-black uppercase">{project.date}</p>
                </div>
              </div>

              <hr className="my-2 border-2 border-text-primary/20" />
              
              <motion.a
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                href={project.link}
                target="_blank"
                className="group flex items-center justify-center gap-3 rounded-full border-4 border-text-primary bg-text-primary py-4 font-display text-lg font-black uppercase tracking-widest text-surface-light shadow-[4px_4px_0_rgba(195,155,211,1)] transition-colors hover:bg-pop-pink hover:text-text-primary hover:shadow-[6px_6px_0_rgba(0,0,0,1)]"
              >
                Live Preview <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </motion.a>

            </div>
          </motion.aside>
        </motion.div>

          {/* =========================================================
              THE VISUALS (GRID DENGAN ONCLICK KE ZOOM)
          ========================================================= */}
          {project.showcaseImages?.length > 0 && (
            <motion.section 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer} 
              className="mt-32 flex flex-col gap-8"
            >
              <motion.div variants={slideUpItem} className="flex items-center gap-6">
                <h3 className="font-display text-4xl font-black uppercase tracking-tight text-text-primary sm:text-5xl">
                  The Visuals
                </h3>
                <div className="h-4 w-full flex-1 rounded-full border-2 border-text-primary bg-surface-dark/10 shadow-[inset_0_4px_0_rgba(0,0,0,0.1)]"></div>
              </motion.div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                {project.showcaseImages.map((img: string, idx: number) => {
                  const isFullWidth = idx % 3 === 0;

                  return (
                    <motion.div
                      variants={slideUpItem}
                      key={idx}
                      // 1. EVENT KLIK: Simpan index gambar yang dipilih
                      onClick={() => setZoomedImageIdx(idx)}
                      // 2. LAYOUT ID: Hubungkan grid statis dengan layer zoom
                      layoutId={`showcase-${project.id}-${idx}`}
                      className={`group relative overflow-hidden rounded-[2.5rem] border-4 border-text-primary bg-surface-dark shadow-[8px_8px_0_rgba(0,0,0,1)] transition-transform duration-300 hover:-translate-y-2 hover:shadow-[12px_12px_0_rgba(0,0,0,1)] cursor-zoom-in ${
                        isFullWidth ? "aspect-video md:col-span-2" : "aspect-square md:aspect-4/3"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${project.title} showcase ${idx + 1}`}
                        className="h-full w-full object-cover opacity-90 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-100"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-pop-pink/0 transition-colors duration-300 group-hover:bg-pop-pink/10" />
                      
                      {/* Label "View" kecil saat di-hover */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-text-primary text-pop-yellow font-display font-black uppercase tracking-widest px-6 py-2 rounded-full border-2 border-pop-yellow">
                        View
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          )}
        </div>
      </motion.div>

      {/* =========================================================
          INTERACTIVE LIGHTBOX (DRAG TO DISCARD) - Z-INDEX 200
      ========================================================= */}
      <AnimatePresence>
        {zoomedImageIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImageIdx(null)}
            // THE FIX 2 🛠️: touch-none adalah kunci. Ini memblokir total native scroll dari browser HP.
            className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-surface-dark/90 backdrop-blur-sm p-4 sm:p-12 cursor-zoom-out touch-none overscroll-none"
          >
            {/* Tooltip Kursor Magnetik (Instruksi Gamifikasi) */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.3 }}
              className="absolute top-8 pointer-events-none"
            >
               <span className="font-mono text-sm sm:text-base font-black uppercase tracking-widest text-pop-yellow bg-text-primary px-6 py-3 rounded-full border-2 border-pop-yellow shadow-[4px_4px_0_rgba(253,224,71,1)]">
                 Drag image to discard
               </span>
            </motion.div>

            {/* Gambar yang di-Zoom */}
            <motion.img
              // LAYOUT ID KUNCI: Membuatnya meluncur dari grid ke tengah layar
              layoutId={`showcase-${project.id}-${zoomedImageIdx}`}
              src={project.showcaseImages[zoomedImageIdx]}
              // Mencegah klik pada gambar agar tidak menutup modal (bubbling)
              onClick={(e) => e.stopPropagation()}
              // FUNGSI GAMIFIKASI: Drag to discard
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={0.8} // Efek karet yang sangat melar
              onDragEnd={(e, { offset, velocity }) => {
                // Jika digeser cukup jauh atau dengan kecepatan tinggi (lemparan)
                const swipeThreshold = 100; 
                if (Math.abs(offset.y) > swipeThreshold || Math.abs(offset.x) > swipeThreshold || Math.abs(velocity.x) > 500 || Math.abs(velocity.y) > 500) {
                  setZoomedImageIdx(null); // Tutup/Buang gambar!
                }
              }}
              className="w-full max-w-5xl max-h-[80vh] object-contain rounded-4xl border-4 border-text-primary shadow-[16px_16px_0_rgba(0,0,0,1)] bg-surface-light cursor-grab active:cursor-grabbing"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- KOMPONEN: LAYERED PROJECT CARD ---
const LayeredProjectCard = ({
  project,
  onSelect,
}: {
  project: (typeof portfolioData)[0];
  onSelect: (id: string) => void;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 1280px di Tailwind itu sama dengan breakpoint 'xl'
    const checkMobile = () => setIsMobile(window.innerWidth < 1280);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      id={`project-card-${project.id}`}
      layoutId={`card-${project.id}`}
      onClick={() => onSelect(project.id)}
      initial="idle"
      animate={isMobile ? "hover" : "idle"}
      whileHover="hover"
      // FIX 1: Container jadi flex-col di Mobile. Di Desktop (xl) baru dikunci aspect-4/3
      className="group relative w-full flex flex-col xl:block xl:aspect-4/3 cursor-pointer overflow-hidden overflow-x-clip rounded-4xl border-2 border-text-primary bg-surface-light shadow-[6px_6px_0_rgba(0,0,0,1)] transition-shadow duration-300 hover:shadow-[10px_10px_0_rgba(0,0,0,1)]"
    >
      {/* Warna Latar Belakang (Sembunyiin di mobile, cuma buat desktop) */}
      <div className={`absolute inset-0 z-0 h-full w-full hidden xl:block ${project.color}`} />

      {/* FIX 2: THE BOTTOM INFO BAR */}
      {/* Mobile: Tampil wajar di bawah flex (order-last). Desktop: Absolute nyumput di bawah */}
      <div className={`order-last relative xl:absolute xl:bottom-0 xl:left-0 xl:right-0 z-10 flex h-20 items-center justify-between px-6 ${project.color}`}>
        <motion.div
          variants={{
            idle: { y: 20, opacity: 0 },
            hover: { y: 0, opacity: 1 },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.05 }}
          className="flex flex-col"
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-text-primary/60">
            Client
          </p>
          <p className="font-display text-sm font-black uppercase text-text-primary">
            {project.client}
          </p>
        </motion.div>

        <motion.div
          variants={{
            idle: { y: 20, opacity: 0 },
            hover: { y: 0, opacity: 1 },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
        >
          <p className="rounded-full border-2 border-text-primary bg-surface-light px-3 py-1 text-xs font-bold uppercase tracking-widest text-text-primary shadow-[2px_2px_0_rgba(0,0,0,1)]">
            {project.projectType}
          </p>
        </motion.div>
      </div>

      {/* FIX 3: THE MAIN IMAGE LAYER */}
      {/* THE MAIN IMAGE LAYER (Z-20) */}
      <motion.div
        layoutId={`image-${project.id}`}
        variants={{ idle: { y: 0 }, hover: { y: isMobile ? 0 : -80 } }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="relative z-20 w-full aspect-4/3 bg-surface-dark transition-colors duration-300 desktop:absolute desktop:-left-px desktop:top-0 desktop:h-full desktop:w-[calc(100%+2px)] desktop:aspect-auto"
      >
        <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover" />
        
        <div className="absolute inset-0 bg-linear-to-t from-surface-dark/90 via-surface-dark/20 to-transparent pointer-events-none" />
        
        <motion.div layoutId={`info-${project.id}`} className="absolute bottom-6 left-6 right-6 flex flex-col items-start pointer-events-none">
          <h3 className="font-display text-2xl font-black uppercase text-surface-light drop-shadow-[2px_2px_0_rgba(0,0,0,1)] sm:text-4xl">
            {project.title}
          </h3>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN PORTFOLIO PAGE ---
function PortfolioListContent() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const isTransitionReady = usePageTransition();

  // 1. STATE TIRAI LOKAL
  const [isCurtainVisible, setIsCurtainVisible] = useState(() => {
    // Pastikan kode ini cuma jalan di sisi Client (Browser)
    if (typeof window !== "undefined") {
      const pendingId = sessionStorage.getItem("pendingProjectId");
      // Kalau nggak ada ID yang nunggu, nggak usah buka tirai lokal
      if (!pendingId) return false;

      // THE HANDSHAKE: Cek apakah Global Preloader lagi ada di layar
      const isGlobalPreloaderActive =
        document.getElementById("global-preloader");

      // Kalau Global Preloader KETEMU (artinya ini Hard Load/New Tab),
      // Local Preloader langsung matiin diri (false) biar Global yang ngurus.
      // Kalau Global Preloader GAK ADA (artinya ini pindah rute biasa),
      // Local Preloader baru maju jalan (true).
      return !isGlobalPreloaderActive;
    }
    // Default aman untuk Server-Side Rendering
    return false;
  });

  const itemsPerPage = 4;

  useEffect(() => {
    const pendingId = sessionStorage.getItem("pendingProjectId");
    if (pendingId) {
      sessionStorage.removeItem("pendingProjectId");
      // ==========================================
      // 1. PASANG GEMBOK GLOBAL PRELOADER!
      // Begitu script tau ada queryId, langsung kunci pintu biar preloader kuning nggak kabur duluan.
      // ==========================================
      document.body.setAttribute("data-animating", "true");

      const projectIndex = portfolioData.findIndex((p) => p.id === pendingId);

      if (projectIndex !== -1) {
        setActiveFilter("All");

        const calculatedPage = Math.ceil((projectIndex + 1) / itemsPerPage);
        setCurrentPage(calculatedPage);

        let stableFrames = 0;
        let lastTop = -1;
        let animationFrameId: number;

        const checkAndScroll = () => {
          const cardElement = document.getElementById(
            `project-card-${pendingId}`,
          );

          if (!cardElement) {
            animationFrameId = requestAnimationFrame(checkAndScroll);
            return;
          }

          const currentTop = cardElement.getBoundingClientRect().top;

          if (currentTop === lastTop && currentTop !== 0) {
            stableFrames++;
          } else {
            stableFrames = 0;
            lastTop = currentTop;
          }

          if (stableFrames > 5) {
            const rect = cardElement.getBoundingClientRect();
            const scrollTop =
              window.pageYOffset || document.documentElement.scrollTop;
            const elementMid = rect.top + scrollTop + rect.height / 2;
            const viewportMid = window.innerHeight / 2;

            window.scrollTo({
              top: elementMid - viewportMid,
              behavior: "instant",
            });

            setSelectedId(pendingId);

            // ==========================================
            // 2. BUKA GEMBOK SETELAH ANIMASI SELESAI (800ms)
            // ==========================================
            setTimeout(() => {
              setIsCurtainVisible(false); // Matiin tirai lokal (kalau ada)
              document.body.removeAttribute("data-animating"); // Lepas gembok global!
            }, 800);
          } else {
            animationFrameId = requestAnimationFrame(checkAndScroll);
          }
        };

        animationFrameId = requestAnimationFrame(checkAndScroll);
        return () => cancelAnimationFrame(animationFrameId);
      } else {
        // ==========================================
        // 3. FALLBACK: Kalau project ID ngawur, tetep harus lepas gemboknya!
        // ==========================================
        setIsCurtainVisible(false);
        document.body.removeAttribute("data-animating");
      }
    }
  }, [itemsPerPage]);

  const filteredProjects = portfolioData.filter(
    (p) => activeFilter === "All" || p.projectType === activeFilter,
  );
  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const selectedProject = portfolioData.find((p) => p.id === selectedId);

  const handlePageChange = (newPage: number) => {
    const archiveSection = document.getElementById("archive-section");
    if (archiveSection) {
      const y =
        archiveSection.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setCurrentPage(newPage);
  };

  return (
    <div className="relative overflow-x-clip">
      {/* ======================================================== */}
      {/* THE CURTAIN (TIRAI LOKAL DENGAN UI GLOBAL) */}
      {/* Z-Index 90: Nutupin grid, tapi Project Detail bakal tembus di atasnya */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isCurtainVisible && (
          <motion.div
            key="local-preloader"
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-90 flex flex-col items-center justify-center bg-pop-yellow"
          >
            <div className="flex flex-col items-center gap-8">
              {/* Spinning Cog/Star ala Neo-Brutalism */}
              <div className="relative flex h-24 w-24 items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-xl border-4 border-text-primary bg-pop-pink shadow-[6px_6px_0_rgba(0,0,0,1)]"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border-4 border-text-primary bg-pop-green"
                />
              </div>

              {/* Brand & Loading Text */}
              <div className="flex flex-col items-center gap-2 overflow-hidden">
                <motion.h1
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="font-display text-5xl font-black uppercase tracking-widest text-text-primary"
                >
                  Digifolks
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center gap-3 rounded-full border-2 border-text-primary bg-surface-light px-4 py-2 shadow-playful"
                >
                  <div className="h-2 w-2 animate-ping rounded-full bg-pop-purple" />
                  <span className="text-xs font-bold uppercase tracking-widest text-text-primary">
                    Opening Project...
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="archive-section"
        className="min-h-screen w-full bg-surface-light px-4 py-24 desktop:px-24 sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isTransitionReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h1 className="font-display text-5xl font-black uppercase tracking-tighter text-text-primary desktop:text-8xl sm:text-7xl">
            The{" "}
            <span className="block text-pop-yellow drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
              Archive
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isTransitionReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveFilter(cat);
                setCurrentPage(1);
              }}
              className={`relative rounded-full border-2 border-text-primary px-6 py-3 font-display text-sm font-black uppercase tracking-widest transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_rgba(0,0,0,1)] ${activeFilter === cat ? "bg-pop-pink shadow-[4px_4px_0_rgba(0,0,0,1)] -translate-y-1 text-text-primary" : "bg-surface-light text-text-primary/70 hover:text-text-primary"}`}
            >
              {activeFilter === cat && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 -z-10 rounded-full border-2 border-text-primary bg-pop-pink"
                />
              )}
              {cat}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`page-${currentPage}-${activeFilter}`}
            // 1. Definisikan variants untuk Container
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15, // Jeda waktu antar card muncul
                  delayChildren: 0.1, // Tunggu sebentar sebelum card pertama muncul
                },
              },
              exit: {
                opacity: 0,
                y: -20,
                transition: { duration: 0.2 },
              },
            }}
            initial="hidden"
            // Gunakan isTransitionReady Anda
            animate={isTransitionReady ? "visible" : "hidden"}
            exit="exit"
            className="mx-auto grid w-full max-w-375 grid-cols-1 gap-8 desktop:grid-cols-2 desktop:gap-12"
          >
            {paginatedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                // 1. THE HACK: Kirim index ke dalam variants biar bisa dikalkulasi
                custom={index}
                // 2. Set state awal secara eksplisit ke "hidden"
                initial="hidden"
                // 3. THE TRIGGER: Hanya pindah ke "visible" KETIKA tirai udah kebuka
                animate={isTransitionReady ? "visible" : "hidden"}
                // 4. THE VARIANTS: Menyimpan semua logika visual dan timing
                variants={{
                  hidden: (idx) => ({
                    opacity: 0,
                    scale: 1.15,
                    y: -50,
                    rotate: idx % 2 === 0 ? -6 : 6,
                  }),
                  visible: (idx) => ({
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotate: 0,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 12,
                      mass: 1.2,
                      // Delay selang-seling tetap aman berkat parameter custom (idx)
                      delay: (idx % 2) * 0.1,
                    },
                  }),
                }}
              >
                <LayeredProjectCard
                  project={project}
                  onSelect={setSelectedId}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {isMounted && totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-6">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-text-primary bg-pop-yellow shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:bg-pop-pink disabled:pointer-events-none disabled:opacity-50"
            >
              <ArrowLeft className="h-6 w-6 text-text-primary" />
            </button>
            <div className="font-display text-xl font-black uppercase text-text-primary">
              {currentPage} <span className="opacity-50">/ {totalPages}</span>
            </div>
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-text-primary bg-pop-yellow shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:bg-pop-pink disabled:pointer-events-none disabled:opacity-50"
            >
              <ArrowRight className="h-6 w-6 text-text-primary" />
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* THE PPT MAGIC OVERLAY (Z-INDEX 100) */}
        {/* ======================================================== */}
        <AnimatePresence
          onExitComplete={() => {
            document.body.style.overflow = "unset";
          }}
        >
          {selectedId && selectedProject && (
            <ProjectDetail
              project={selectedProject}
              onClose={() => {
                setSelectedId(null);
              }}
            />
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

export default function PortfolioList() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-surface-light font-display font-bold"></div>
      }
    >
      <PortfolioListContent />
    </Suspense>
  );
}
