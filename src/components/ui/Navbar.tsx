'use client';

import React from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';
import { usePathname } from 'next/navigation';
import { Button } from './Button';

const AvayxRegular = localFont({
  src: '/../../fonts/Avayx.ttf',
  variable: '--font-avayx',
});

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Layanan', href: '/services' },
    { name: 'Studi Kasus', href: '/work' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-navy-base/80 backdrop-blur-[12px] border-b border-navy-light transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Sisi Kiri: Brand Anchor */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span
                className={`${AvayxRegular.className} text-2xl text-text-pure uppercase hover:text-accent-emerald transition-colors duration-300`}
                style={{ letterSpacing: '-0.2em' }}
              >
                DIGIFOLKS
              </span>
            </Link>
          </div>

          {/* Sisi Tengah: Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-accent-emerald' : 'text-text-off-white hover:text-accent-emerald'
                  } group`}
                >
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-1 w-full h-[2px] bg-accent-emerald origin-center transition-transform duration-300 ease-out ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  ></span>
                </Link>
              );
            })}
          </nav>

          {/* Sisi Kanan: Action Hub */}
          <div className="flex items-center">
            <Link href="/contact" tabIndex={-1}>
              <Button variant="ghost">
                Hubungi Kami
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
