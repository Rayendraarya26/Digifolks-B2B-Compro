'use client';

import React from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';

const AvayxRegular = localFont({
  src: '/../../fonts/Avayx.ttf',
  variable: '--font-avayx',
});

export function Footer() {
  return (
    <footer className="bg-brand-navy pt-20 pb-10 border-t border-brand-navy/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span
                className={`${AvayxRegular.className} text-2xl text-bg-pure`}
                style={{ letterSpacing: '-0.2em' }}
              >
                DIGIFOLKS
              </span>
            </Link>
            <p className="text-border-flat/70 max-w-sm text-sm leading-relaxed">
              We build scalable operational systems that reduce complexity, improve reliability, and support long-term business growth.
            </p>
          </div>
          
          <div>
            <h4 className="text-bg-pure font-bold mb-4 uppercase tracking-wider text-xs">Sitemap</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">Beranda</Link></li>
              <li><Link href="/services" className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">Layanan</Link></li>
              <li><Link href="/work" className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">Studi Kasus</Link></li>
              <li><Link href="/contact" className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">Hubungi Kami</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-bg-pure font-bold mb-4 uppercase tracking-wider text-xs">Connect</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">LinkedIn</a></li>
              <li><a href="#" className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">Twitter</a></li>
              <li><a href="#" className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">Instagram</a></li>
              <li><a href="mailto:solutions@digifolks.id" className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">solutions@digifolks.id</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-bg-pure/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-border-flat/50 text-xs">
            &copy; {new Date().getFullYear()} Digifolks Solutions. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-border-flat/50 hover:text-bg-pure text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-border-flat/50 hover:text-bg-pure text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
