'use client';

import React from 'react';
import Link from 'next/link';
import localFont from 'next/font/local';

const AvayxRegular = localFont({
  src: '/../../fonts/Avayx.ttf',
  variable: '--font-avayx',
});

export function Footer({ dict, lang }: { dict?: any; lang?: string }) {
  const prefix = lang ? `/${lang}` : '';
  
  return (
    <footer className="bg-brand-navy pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <Link href={`${prefix}/`} className="inline-block mb-6">
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
            <h4 className="text-bg-pure font-bold mb-4 uppercase tracking-wider text-xs">{dict?.sitemap || 'Sitemap'}</h4>
            <ul className="space-y-3">
              <li><Link href={`${prefix}/`} className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">{dict?.navbar?.home || 'Beranda'}</Link></li>
              <li><Link href={`${prefix}/services`} className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">{dict?.navbar?.services || 'Layanan'}</Link></li>
              <li><Link href={`${prefix}/work`} className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">{dict?.navbar?.work || 'Studi Kasus'}</Link></li>
              <li><Link href={`${prefix}/contact`} className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">{dict?.navbar?.contact || 'Hubungi Kami'}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-bg-pure font-bold mb-4 uppercase tracking-wider text-xs">Connect</h4>
            <ul className="space-y-3">
              <li><a href="mailto:digifolkstech@gmail.com" className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">digifolkstech@gmail.com</a></li>
              <li><a href="mailto:marketing@digifolks.id" className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">marketing@digifolks.id</a></li>
              <li><a href="https://wa.me/6285814412099" className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">+62 858-1441-2099 (Vellan)</a></li>
              <li><a href="https://wa.me/62895401088270" className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">+62 895-4010-88270 (Ailsa) </a></li>
              <li><a href="https://id.linkedin.com/company/digifolks-id" className="text-border-flat/70 hover:text-brand-green transition-colors text-sm">LinkedIn</a></li>
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
