'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  FolderGit2, 
  Layers, 
  BookOpen, 
  MessageSquare, 
  ArrowRight, 
  RefreshCw
} from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import enDict from '@/dictionaries/en.json';
import idDict from '@/dictionaries/id.json';

interface CustomErrorPageProps {
  code: '404' | '500';
  initialLang?: 'en' | 'id';
  onReload?: () => void;
}

export function CustomErrorPage({
  code,
  initialLang = 'id',
  onReload,
}: CustomErrorPageProps) {
  const pathname = usePathname();
  const currentLang: 'en' | 'id' = pathname?.startsWith('/en')
    ? 'en'
    : pathname?.startsWith('/id')
    ? 'id'
    : initialLang;

  const dict = currentLang === 'id' ? idDict : enDict;
  const t = dict.error[code];
  const prefix = `/${currentLang}`;

  const handleReload = () => {
    if (onReload) {
      onReload();
    } else if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="w-full min-h-screen bg-navy-base text-text-pure flex flex-col justify-between relative overflow-hidden selection:bg-accent-emerald selection:text-navy-base">
      {/* Dynamic Ambient Glow Ornaments matching stitch design */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[520px] bg-accent-emerald/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[480px] -left-40 w-[420px] h-[420px] bg-[#38BDF8]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] bg-accent-emerald/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Main Official Navbar */}
      <Navbar dict={dict.navbar} lang={currentLang} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Hero & Error Display Section */}
        <main className="max-w-4xl mx-auto w-full text-center py-8 sm:py-14">
          <h1 className="text-[88px] sm:text-[120px] md:text-[140px] font-extrabold text-text-pure tracking-tighter leading-none select-none font-display drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            {code}
          </h1>

          <div className="max-w-2xl mx-auto mt-4 sm:mt-6">
            <h2 className="text-2xl sm:text-4xl font-bold text-text-pure tracking-tight">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-text-off-white/70 max-w-xl mx-auto mt-3 leading-relaxed">
              {t.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 sm:mt-10">
            {code === '500' ? (
              <>
                <button
                  onClick={handleReload}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-emerald text-navy-base font-semibold text-sm hover:bg-accent-emerald/90 transition-all shadow-lg hover:shadow-accent-emerald/20 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  {(t as any).reloadPage}
                </button>
                <Link
                  href={prefix}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-light text-text-pure font-semibold text-sm border border-border-flat/30 hover:border-accent-emerald/40 hover:bg-navy-light/80 transition-all"
                >
                  <Home className="w-4 h-4 text-accent-emerald" />
                  {t.backHome}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={prefix}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-emerald text-navy-base font-semibold text-sm hover:bg-accent-emerald/90 transition-all shadow-lg hover:shadow-accent-emerald/20 cursor-pointer"
                >
                  <Home className="w-4 h-4" />
                  {t.backHome}
                </Link>
                <Link
                  href={`${prefix}/work`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-navy-light text-text-pure font-semibold text-sm border border-border-flat/30 hover:border-accent-emerald/40 hover:bg-navy-light/80 transition-all"
                >
                  <FolderGit2 className="w-4 h-4 text-accent-emerald" />
                  {(t as any).viewPortfolio}
                </Link>
              </>
            )}
          </div>
        </main>

        {/* Helpful Destinations: 4-Column Bento Recovery Grid */}
        <section className="w-full pt-8 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border-flat/20 pb-4 gap-2 mb-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-text-pure">
                {t.usefulLinksTitle}
              </h3>
              <p className="text-xs sm:text-sm text-text-off-white/60">
                {t.usefulLinksSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Services */}
            <Link
              href={`${prefix}/services`}
              className="group flex flex-col justify-between p-6 rounded-2xl bg-navy-light/40 border border-border-flat/20 hover:border-accent-emerald/40 hover:bg-navy-light/70 shadow-sm transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between w-full mb-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-base border border-border-flat/20 flex items-center justify-center text-accent-emerald group-hover:bg-accent-emerald group-hover:text-navy-base transition-colors">
                    <Layers className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-off-white/40 group-hover:text-accent-emerald group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-text-pure mb-2 group-hover:text-accent-emerald transition-colors">
                  {t.cards.services.title}
                </h4>
                <p className="text-xs sm:text-sm text-text-off-white/70 leading-relaxed">
                  {t.cards.services.desc}
                </p>
              </div>
              <span className="mt-5 text-xs font-mono font-semibold text-accent-emerald flex items-center gap-1">
                {t.cards.services.cta} →
              </span>
            </Link>

            {/* Card 2: Work */}
            <Link
              href={`${prefix}/work`}
              className="group flex flex-col justify-between p-6 rounded-2xl bg-navy-light/40 border border-border-flat/20 hover:border-[#38BDF8]/40 hover:bg-navy-light/70 shadow-sm transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between w-full mb-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-base border border-border-flat/20 flex items-center justify-center text-[#38BDF8] group-hover:bg-[#38BDF8] group-hover:text-navy-base transition-colors">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-off-white/40 group-hover:text-[#38BDF8] group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-text-pure mb-2 group-hover:text-[#38BDF8] transition-colors">
                  {t.cards.work.title}
                </h4>
                <p className="text-xs sm:text-sm text-text-off-white/70 leading-relaxed">
                  {t.cards.work.desc}
                </p>
              </div>
              <span className="mt-5 text-xs font-mono font-semibold text-[#38BDF8] flex items-center gap-1">
                {t.cards.work.cta} →
              </span>
            </Link>

            {/* Card 3: Blog */}
            <Link
              href={`${prefix}/blog`}
              className="group flex flex-col justify-between p-6 rounded-2xl bg-navy-light/40 border border-border-flat/20 hover:border-purple-400/40 hover:bg-navy-light/70 shadow-sm transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between w-full mb-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-base border border-border-flat/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-400 group-hover:text-navy-base transition-colors">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-off-white/40 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-text-pure mb-2 group-hover:text-purple-400 transition-colors">
                  {t.cards.blog.title}
                </h4>
                <p className="text-xs sm:text-sm text-text-off-white/70 leading-relaxed">
                  {t.cards.blog.desc}
                </p>
              </div>
              <span className="mt-5 text-xs font-mono font-semibold text-purple-400 flex items-center gap-1">
                {t.cards.blog.cta} →
              </span>
            </Link>

            {/* Card 4: Contact */}
            <Link
              href={`${prefix}/contact`}
              className="group flex flex-col justify-between p-6 rounded-2xl bg-navy-light/40 border border-border-flat/20 hover:border-accent-emerald/40 hover:bg-navy-light/70 shadow-sm transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between w-full mb-4">
                  <div className="w-10 h-10 rounded-xl bg-navy-base border border-border-flat/20 flex items-center justify-center text-accent-emerald group-hover:bg-accent-emerald group-hover:text-navy-base transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-off-white/40 group-hover:text-accent-emerald group-hover:translate-x-1 transition-all" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-text-pure mb-2 group-hover:text-accent-emerald transition-colors">
                  {t.cards.contact.title}
                </h4>
                <p className="text-xs sm:text-sm text-text-off-white/70 leading-relaxed">
                  {t.cards.contact.desc}
                </p>
              </div>
              <span className="mt-5 text-xs font-mono font-semibold text-accent-emerald flex items-center gap-1">
                {t.cards.contact.cta} →
              </span>
            </Link>
          </div>
        </section>

        {/* Footer copyright */}
        <footer className="w-full text-center pt-8 border-t border-border-flat/10 text-xs text-text-off-white/40 font-mono">
          &copy; {new Date().getFullYear()} Digifolks Technology. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
