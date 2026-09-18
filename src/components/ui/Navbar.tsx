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

export function Navbar({ dict, lang }: { dict: any; lang: string }) {
  const pathname = usePathname();

  // Helper to check if current path matches link
  const isActive = (path: string) => {
    if (path === '/' && (pathname === `/${lang}` || pathname === `/${lang}/`)) return true;
    return pathname.startsWith(`/${lang}${path}`) && path !== '/';
  };

  const navLinks = [
    { name: dict.home, href: '/' },
    // { name: dict.about, href: '/about' },
    { name: dict.services, href: '/services' },
    { name: dict.work, href: '/work' },
    { name: dict.blog || 'Blog', href: '/blog' },
  ];

  const getTargetUrl = (targetLang: string) => {
    if (!pathname) return `/${targetLang}`;
    const segments = pathname.split('/');
    if (segments[1] === 'en' || segments[1] === 'id') {
      segments[1] = targetLang;
      return segments.join('/') || `/${targetLang}`;
    }
    return `/${targetLang}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-navy-base/80 backdrop-blur-[12px] border-b border-navy-light transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Sisi Kiri: Brand Anchor */}
          <div className="flex-shrink-0 flex items-center">
            <Link href={`/${lang}`} className="flex items-center gap-2">
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
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={`/${lang}${link.href === '/' ? '' : link.href}`}
                  className={`relative text-sm font-medium transition-colors duration-300 ${active ? 'text-accent-emerald' : 'text-text-off-white hover:text-accent-emerald'
                    } group`}
                >
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-1 w-full h-[2px] bg-accent-emerald origin-center transition-transform duration-300 ease-out ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                  ></span>
                </Link>
              );
            })}
          </nav>

          {/* Sisi Kanan: Action Hub */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 h-10 px-3 rounded-lg bg-transparent border border-border-flat text-xs font-mono">
              <Link 
                href={getTargetUrl('en')} 
                className={`transition-colors duration-200 px-1.5 py-0.5 rounded ${lang === 'en' ? 'text-accent-emerald font-bold bg-accent-emerald/10' : 'text-text-off-white/60 hover:text-text-pure'}`}
              >
                EN
              </Link>
              <span className="text-border-flat/40">/</span>
              <Link 
                href={getTargetUrl('id')} 
                className={`transition-colors duration-200 px-1.5 py-0.5 rounded ${lang === 'id' ? 'text-accent-emerald font-bold bg-accent-emerald/10' : 'text-text-off-white/60 hover:text-text-pure'}`}
              >
                ID
              </Link>
            </div>
            
            <Link href={`/${lang}/contact`} tabIndex={-1}>
              <Button variant="ghost">
                {dict.contact}
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
}
