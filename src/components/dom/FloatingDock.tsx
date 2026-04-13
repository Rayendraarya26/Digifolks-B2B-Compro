"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Struktur data navigasi internal
const navItems = [
  {
    path: "/",
    label: "Home",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    path: "/services",
    label: "Service",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    path: "/work",
    label: "Work",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    path: "/contact",
    label: "Contact",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function FloatingDock() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 tablet:bottom-8">
      <nav className="flex items-center gap-2 rounded-2xl border-2 border-text-primary bg-surface-light p-2 shadow-playful transition-all hover:shadow-playful-hover">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return <NavItem key={item.path} item={item} isActive={isActive} />;
        })}
      </nav>
    </div>
  );
}

// Sub-komponen dipisah untuk mengelola state isHovered secara independen
function NavItem({ item, isActive }: { item: typeof navItems[0]; isActive: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={item.path}>
      <motion.div
        className="relative flex h-14 w-14 flex-col items-center justify-center rounded-xl font-display font-bold transition-colors tablet:h-16 tablet:w-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Tooltip hanya muncul di desktop (>=1280px) saat di-hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute -top-12 z-50 hidden whitespace-nowrap rounded-lg border-2 border-text-primary bg-text-primary px-3 py-1 text-sm text-surface-light shadow-playful desktop:flex desktop:items-center desktop:justify-center"
            >
              {item.label}
              {/* Panah bawah (Segitiga) untuk tooltip */}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-text-primary" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Render Icon */}
        <div className={`relative z-10 flex items-center justify-center ${isActive ? "text-text-primary" : "text-text-muted hover:text-text-primary"}`}>
          {item.icon}
        </div>

        {/* Label kecil persisten untuk Mobile & Tablet, disembunyikan di Desktop */}
        <span className={`mt-1 text-[10px] uppercase tracking-wider desktop:hidden ${isActive ? "font-bold text-text-primary" : "text-text-muted"}`}>
          {item.label}
        </span>

        {/* Background aktif beranimasi */}
        {isActive && (
          <motion.div
            layoutId="activeNavIndicator"
            className="absolute inset-0 z-0 rounded-xl border-2 border-text-primary bg-pop-pink"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />
        )}
      </motion.div>
    </Link>
  );
}