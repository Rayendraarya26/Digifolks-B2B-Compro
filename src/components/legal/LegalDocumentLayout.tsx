'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  Lock, 
  FileText, 
  Users, 
  Scale, 
  CheckCircle2, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  ArrowUp,
  Printer,
  Sparkles
} from 'lucide-react';
import { LegalDocument } from '@/data/legal/privacyData';
import { Reveal } from '@/components/animations/Reveal';

interface LegalDocumentLayoutProps {
  document: LegalDocument;
  lang: string;
}

const iconMap = {
  shield: Shield,
  lock: Lock,
  file: FileText,
  user: Users,
  scale: Scale,
  check: CheckCircle2,
};

export function LegalDocumentLayout({ document, lang }: LegalDocumentLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>(document.sections[0]?.id || '');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Detect active section
      const sectionElements = document.sections.map((sec) => ({
        id: sec.id,
        el: window.document.getElementById(sec.id),
      }));

      const scrollPosition = window.scrollY + 180;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [document.sections]);

  const scrollToSection = (id: string) => {
    const el = window.document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Hero Header Section */}
      <section className="relative pt-28 pb-16 bg-slate-50/70 border-b border-slate-200/80 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-200/30 rounded-full blur-[90px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono text-xs border border-emerald-200 font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                {document.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                {lang === 'id' ? 'Terakhir Diperbarui:' : 'Last Updated:'} {document.lastUpdated}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
              {document.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-4xl leading-relaxed mb-10">
              {document.intro}
            </p>

            {/* Key Summary Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {document.summaryHighlights.map((highlight, idx) => {
                const IconComponent = iconMap[highlight.icon] || Shield;
                return (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs hover:border-emerald-500/40 hover:shadow-sm transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 mb-3 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h2 className="text-sm font-semibold text-slate-900 mb-1">
                      {highlight.title}
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Content & Sticky TOC Layout */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Sticky Sidebar (Table of Contents) */}
            <aside className="lg:col-span-4 sticky top-24 space-y-6 hidden lg:block">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-semibold">
                    {document.tableOfContentsLabel}
                  </span>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                    title={lang === 'id' ? 'Cetak dokumen' : 'Print document'}
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{lang === 'id' ? 'Cetak' : 'Print'}</span>
                  </button>
                </div>

                <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
                  {document.sections.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all flex items-center justify-between group cursor-pointer ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-900 font-semibold border-l-2 border-emerald-600 pl-3.5'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate pr-2">
                          <span className="font-mono text-[10px] text-slate-400 mr-2">{section.number}.</span>
                          {section.title}
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isActive ? 'text-emerald-600 translate-x-0.5' : 'opacity-0 group-hover:opacity-100 text-slate-400'}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Legal Entity Snapshot Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>{document.contactBox.companyName}</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  {lang === 'id' 
                    ? 'Dioperasikan di bawah merek dagang Digifolks di Yogyakarta, Indonesia.' 
                    : 'Operated commercially as Digifolks in Yogyakarta, Indonesia.'}
                </p>
                <div className="pt-2 border-t border-slate-200 flex flex-col gap-1.5 text-[11px] text-slate-600">
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-600" />
                    <a href={`mailto:${document.contactBox.email}`} className="hover:text-emerald-700 transition-colors">
                      {document.contactBox.email}
                    </a>
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <a href="https://wa.me/6285814412099" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 transition-colors">
                      +62 858-1441-2099
                    </a>
                  </span>
                </div>
              </div>
            </aside>

            {/* Right Main Content Sections */}
            <main className="lg:col-span-8 space-y-10">
              {document.sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                      {section.number}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      {section.title}
                    </h2>
                  </div>

                  {/* Paragraphs */}
                  <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                    {section.content.map((paragraph, pIdx) => (
                      <p key={pIdx}>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Subsections if any */}
                  {section.subsections && section.subsections.length > 0 && (
                    <div className="mt-6 space-y-4">
                      {section.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70">
                          <h3 className="text-sm font-semibold text-slate-900 mb-2.5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            {sub.title}
                          </h3>
                          <ul className="space-y-2">
                            {sub.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2.5 leading-relaxed">
                                <span className="text-emerald-600 mt-1 text-xs">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Callout box if any */}
                  {section.callout && (
                    <div className="mt-6 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
                      <Shield className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-emerald-950 mb-1">
                          {section.callout.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
                          {section.callout.text}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              ))}

              {/* Contact Box at bottom of document */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 border border-emerald-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono text-xs mb-4 border border-emerald-200">
                    <Building2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Legal & Compliance Officer</span>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {document.contactBox.title}
                  </h3>
                  <p className="text-sm text-slate-600 max-w-2xl mb-6 leading-relaxed">
                    {document.contactBox.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                      <p className="text-slate-900 font-semibold text-sm">{document.contactBox.companyName}</p>
                      <p className="text-emerald-700 font-mono">{document.contactBox.brandName}</p>
                      <p className="text-slate-600 flex items-center gap-1.5 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        {document.contactBox.address}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Mail className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <a href={`mailto:${document.contactBox.email}`} className="hover:text-emerald-700 transition-colors truncate">
                          {document.contactBox.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Mail className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <a href={`mailto:${document.contactBox.secondaryEmail}`} className="hover:text-emerald-700 transition-colors truncate">
                          {document.contactBox.secondaryEmail}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Phone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <a href="https://wa.me/6285814412099" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700 transition-colors">
                          {document.contactBox.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-slate-500">
                      {lang === 'id' 
                        ? 'Dokumen hukum ini mengikat bagi seluruh pengunjung dan pengguna platform digifolks.id.' 
                        : 'This legal instrument applies to all visitors and users of the digifolks.id platform.'}
                    </span>
                    <Link
                      href={`/${lang}/contact`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/10"
                    >
                      <span>{lang === 'id' ? 'Jadwalkan Konsultasi B2B' : 'Schedule B2B Consultation'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Back to top floating button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 transition-all hover:scale-105 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
