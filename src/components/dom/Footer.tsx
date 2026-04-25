"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowUp, Rocket, Mail, Phone } from "lucide-react";
import { servicesData } from "@/data/services";
import { GeneralData } from "@/data/general";
import localFont from "next/font/local";

const AvayxRegular = localFont({ 
  src: "/../../fonts/Avayx.ttf",
  // Opsional: Kasih fallback variable kalau lu mau gabungin ke Tailwind
  variable: "--avayx-regular" 
});

// Varian untuk mengatur kemunculan berurutan (Stagger)
const footerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Muncul berurutan dengan cepat dari kiri ke kanan
      delayChildren: 0.1,
    },
  },
};

// Varian untuk efek bantingan dari bawah (Membanting & Mengunci)
const footerItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 80,         // Muncul dari bawah
    rotateX: -25,  // Miring ke belakang (efek 3D ditarik)
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,    // Mengunci lurus
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 250, 
      damping: 15, 
      mass: 1.2 
    }
  },
};

const bottomBarVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    // Delay 0.1s ditaruh di sini biar dia muncul setelah Pill
    transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.5},
  },
};

export default function Footer() {
 // --- DYNAMIC CLOCK LOGIC ---
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Format jam khusus ke zona waktu WIB (Jakarta/Yogyakarta)
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatter.format(now));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // --- BACK TO TOP ROCKET LOGIC ---
  const [isLaunched, setIsLaunched] = useState(false);

  const handleScrollTop = () => {
    if (isLaunched) return;
    setIsLaunched(true);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => setIsLaunched(false), 800);
    }, 400);
  };

  const sectionRef = useRef<HTMLElement>(null);
    const [isAnimVisible, setIsAnimVisible] = useState(false);
    // ========================================================
    // THE DIRECTIONAL SENSOR HACK 🧠
    // ========================================================
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // KONDISI 1: 30% Elemen masuk layar -> TAMPILKAN!
            setIsAnimVisible(true);
          } else {
            // KONDISI 2: Elemen keluar layar
            // Kita cek apakah posisi 'top' dari elemen ini bernilai positif.
            // Kalau positif, artinya elemen ini posisinya ada di BAWAH layar.
            // Kalau negatif, artinya dia udah ke-scroll sampai ke ATAS layar.
            if (entry.boundingClientRect.top > 0) {
              // HANYA RESET JIKA ELEMEN TENGGELAM KE BAWAH LAYAR
              setIsAnimVisible(false);
            }
          }
        },
        {
          // Threshold 0.3 = Animasi nunggu sampai 30% area grid masuk ke layar
          // Ini obat ampuh buat masalah "animasi kelar sebelum keliatan"
          threshold: 0.3,
        },
      );
  
      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
  
      return () => observer.disconnect();
    }, []);

  return (
    <footer ref={sectionRef} className="relative w-full flex flex-col overflow-hidden">
      {/* =========================================
          MAIN FOOTER AREA (Dark Mode)
      ========================================= */}
      <div className="flex flex-col bg-surface-dark px-6 pt-24 pb-25 desktop:pb-30 text-surface-light desktop:px-24">
        
        {/* TAMBAHKAN MOTION PADA CONTAINER GRID */}
        <motion.div 
          variants={footerContainerVariants}
          initial="hidden"
          animate={isAnimVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-12 border-b-2 border-text-primary/20 pb-16 md:grid-cols-2 desktop:grid-cols-4 desktop:gap-8"
        >
          {/* Kolom 1: Brand Identity */}
          <motion.div variants={footerItemVariants} className="flex flex-col gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 text-pop-yellow transition-colors hover:text-pop-pink"
            >
              <span className={`${AvayxRegular.className} font-display text-3xl font-black uppercase tracking-widest`}>
                DIGIFOLKS
              </span>
            </motion.div>
            <p className="font-bold text-surface-light/70">
              Crafting high-end digital solutions for visionary brands.
            </p>
            <div className="mt-2 flex w-fit items-center gap-3 rounded-full border-2 border-text-primary/20 bg-surface-light/5 px-4 py-2">
              <div className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pop-green opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-pop-green"></span>
              </div>
              <span className="font-display text-xs font-black uppercase tracking-widest text-surface-light/80">
                Systems Operational
              </span>
            </div>
          </motion.div>

          {/* Kolom 2: Explore */}
          <motion.div variants={footerItemVariants} className="flex flex-col gap-4">
            <h4 className="font-display text-lg font-black uppercase text-pop-pink">
              Explore
            </h4>
            <div className="flex flex-col gap-3">
              {[{name: "Home", href: "/"}, {name: "Services", href: "/services"}, {name: "Work", href: "/work"}, {name: "Contact", href: "/contact"}].map((link) => (
                <HoverLink key={link.name} text={link.name} href={link.href} />
              ))}
            </div>
          </motion.div>

          {/* Kolom 3: Services */}
          <motion.div variants={footerItemVariants} className="flex flex-col gap-4">
            <h4 className="font-display text-lg font-black uppercase text-pop-blue">
              Expertise
            </h4>
            <div className="flex flex-col gap-3">
              {servicesData.map((link) => (
                <HoverLink key={link.id} text={link.title} href={`/services#${link.id}`} />
              ))}
            </div>
          </motion.div>

          {/* Kolom 4: Connect */}
          <motion.div variants={footerItemVariants} className="flex flex-col gap-4">
            <h4 className="font-display text-lg font-black uppercase text-pop-green">
              Connect
            </h4>
            
            <div className="flex flex-col gap-3 mb-2">
              <ContactItem icon={Mail} text={GeneralData[0].email} href={`mailto:${GeneralData[0].email}`} hoverColor="hover:text-pop-yellow" />
              {GeneralData[0].contactNumber.map((contact, index) => (
                <ContactItem key={index} icon={Phone} text={contact.displayNumber} href={contact.contactNumber} label={contact.name} hoverColor={contact.hoverColor} />
              ))}
            </div>

            <div className="mt-2 flex gap-4">
              <SocialIcon href={GeneralData[0].footerContactUrl.instagram} color="hover:bg-pop-pink"><IconInstagram className="h-5 w-5" /></SocialIcon>
              <SocialIcon href={GeneralData[0].footerContactUrl.linkedin} color="hover:bg-pop-blue"><IconLinkedin className="h-5 w-5" /></SocialIcon>
              {/* <SocialIcon href={GeneralData[0].footerContactUrl.github} color="hover:bg-pop-purple"><IconGithub className="h-5 w-5" /></SocialIcon> */}
            </div>

            <div className="mt-6 flex flex-col gap-1">
              <p className="text-sm font-bold text-surface-light/50">Working from Yogyakarta, ID</p>
              <p className="font-display text-xl font-black uppercase tracking-widest text-pop-yellow">
                {time ? `${time} WIB` : "SYNCING TIME..."}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* =========================================
            GLASSMORPHISM BOTTOM BAR (Terikut di Stagger)
        ========================================= */}
        <motion.div 
          // Cukup tambahkan initial dan whileInView terpisah agar masuk belakangan dengan mulus
          variants={bottomBarVariants}
          initial="hidden"
          animate={isAnimVisible ? "visible" : "hidden"}
          className="relative mt-6 flex flex-col items-center justify-between gap-6 rounded-4xl bg-surface-light/5 p-6 backdrop-blur-md sm:flex-row"
        >
          {/* ... [KONTEN BOTTOM BAR TETAP SAMA] ... */}
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <p className="font-display text-sm font-black uppercase tracking-widest text-surface-light/80">
              Â© {new Date().getFullYear()} Digifolks. All rights reserved.
            </p>
            <p className="text-xs font-bold text-surface-light/50">
              No bugs were harmed in the making of this website. (Maybe a few).
            </p>
          </div>

          <button
            onClick={handleScrollTop}
            className="group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-text-primary bg-pop-yellow shadow-[4px_4px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 active:translate-y-0"
          >
             <AnimatePresence mode="wait">
              {!isLaunched ? (
                <motion.div
                  key="arrow"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUp className="h-6 w-6 text-text-primary" />
                </motion.div>
              ) : (
                <motion.div
                  key="rocket"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: -100, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeIn" }}
                  className="absolute"
                >
                  <Rocket className="h-6 w-6 text-text-primary" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

      </div>
    </footer>
  );
}

// --- MICRO-COMPONENTS ---

const HoverLink = ({ text, href }: { text: string; href: string }) => (
  <motion.a
    href={href}
    initial="idle"
    whileHover="hover"
    className="group relative w-fit cursor-pointer font-bold text-surface-light/80 transition-colors hover:text-surface-light"
  >
    {text}
    <motion.span
      variants={{ idle: { scaleX: 0 }, hover: { scaleX: 1 } }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-current"
    />
  </motion.a>
);

// Diubah agar menerima React Node mentah sebagai children
const SocialIcon = ({
  children,
  href,
  color,
}: {
  children: React.ReactNode;
  href: string;
  color: string;
}) => (
  <motion.a
    href={href}
    target="_blank"
    whileHover={{ y: -6, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 400, damping: 15 }}
    className={`flex items-center justify-center rounded-xl border-2 border-surface-light/20 bg-surface-light/10 p-3 text-surface-light transition-colors ${color}`}
  >
    {children}
  </motion.a>
);

// --- RAW SVG ICONS ---
const IconInstagram = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const IconLinkedin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const IconGithub = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


// --- MICRO-COMPONENT KHUSUS KONTAK ---
const ContactItem = ({ 
  icon: Icon, 
  text, 
  href, 
  label, 
  hoverColor 
}: { 
  icon: any; 
  text: string; 
  href: string; 
  label?: string; 
  hoverColor: string; 
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    initial="idle"
    whileHover="hover"
    // hoverColor disuntik dari props, misal: hover:text-pop-green
    className={`group relative flex w-fit cursor-pointer items-center gap-3 font-bold text-surface-light/80 transition-colors ${hoverColor}`}
  >
    <Icon className="h-5 w-5 shrink-0" />
    <div className="flex items-center gap-2">
      <span>{text}</span>
      {/* Jika ada label, tampilkan badge kecil ala brutalism */}
      {label && (
        <span className="rounded-md border border-current bg-current/10 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest opacity-80 group-hover:opacity-100">
          {label}
        </span>
      )}
    </div>
    <motion.span
      variants={{ idle: { scaleX: 0 }, hover: { scaleX: 1 } }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute -bottom-1 left-8 h-0.5 w-[calc(100%-2rem)] origin-left bg-current"
    />
  </motion.a>
);