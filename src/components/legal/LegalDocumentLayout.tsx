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

      const scrollPosition = window.scrollY + 200;

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
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-navy-base text-text-off-white selection:bg-accent-emerald selection:text-navy-base">
      {/* Hero Header Section */}
      <section className="relative pt-32 pb-16 bg-navy-base border-b border-border-flat/10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-emerald/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-light/60 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-light text-accent-emerald font-mono text-xs border border-border-flat/10 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                {document.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-border-flat/60 font-mono">
                <Calendar className="w-3.5 h-3.5 text-accent-emerald" />
                {lang === 'id' ? 'Terakhir Diperbarui:' : 'Last Updated:'} {document.lastUpdated}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-text-pure mb-6 tracking-tight">
              {document.title}
            </h1>

            <p className="text-base sm:text-lg text-text-off-white/80 max-w-4xl leading-relaxed mb-10">
              {document.intro}
            </p>

            {/* Key Summary Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {document.summaryHighlights.map((highlight, idx) => {
                const IconComponent = iconMap[highlight.icon] || Shield;
                return (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-navy-light/40 border border-border-flat/10 backdrop-blur-sm hover:border-accent-emerald/30 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent-emerald/10 flex items-center justify-center text-accent-emerald mb-3 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h2 className="text-sm font-semibold text-text-pure mb-1">
                      {highlight.title}
                    </h2>
                    <p className="text-xs text-border-flat/70 leading-relaxed">
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
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Sticky Sidebar (Table of Contents) */}
            <aside className="lg:col-span-4 sticky top-24 space-y-6 hidden lg:block">
              <div className="p-6 rounded-2xl bg-navy-light/40 border border-border-flat/10 backdrop-blur-sm shadow-xl">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-flat/10">
                  <span className="text-xs font-mono uppercase tracking-widest text-accent-emerald font-semibold">
                    {document.tableOfContentsLabel}
                  </span>
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 text-xs text-border-flat/60 hover:text-text-pure transition-colors cursor-pointer"
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
                            ? 'bg-accent-emerald/15 text-accent-emerald font-semibold border-l-2 border-accent-emerald pl-3.5'
                            : 'text-border-flat/70 hover:text-text-pure hover:bg-navy-light/60'
                        }`}
                      >
                        <span className="truncate pr-2">
                          <span className="font-mono text-[10px] opacity-60 mr-2">{section.number}.</span>
                          {section.title}
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isActive ? 'text-accent-emerald translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Legal Entity Snapshot Card */}
              <div className="p-5 rounded-2xl bg-navy-light/20 border border-border-flat/10 text-xs space-y-3">
                <div className="flex items-center gap-2 text-text-pure font-semibold">
                  <Building2 className="w-4 h-4 text-accent-emerald" />
                  <span>{document.contactBox.companyName}</span>
                </div>
                <p className="text-border-flat/60 text-[11px] leading-relaxed">
                  {lang === 'id' 
                    ? 'Dioperasikan di bawah merek dagang Digifolks Solutions di Yogyakarta, Indonesia.' 
                    : 'Operated commercially as Digifolks Solutions in Yogyakarta, Indonesia.'}
                </p>
                <div className="pt-2 border-t border-border-flat/10 flex flex-col gap-1.5 text-[11px] text-border-flat/70">
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-accent-emerald" />
                    <a href={`mailto:${document.contactBox.email}`} className="hover:text-accent-emerald transition-colors">
                      {document.contactBox.email}
                    </a>
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-accent-emerald" />
                    <a href="https://wa.me/6285814412099" target="_blank" rel="noopener noreferrer" className="hover:text-accent-emerald transition-colors">
                      +62 858-1441-2099
                    </a>
                  </span>
                </div>
              </div>
            </aside>

            {/* Right Main Content Sections */}
            <main className="lg:col-span-8 space-y-12">
              {document.sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-navy-light/30 border border-border-flat/10 transition-colors hover:border-border-flat/20"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-accent-emerald/10 text-accent-emerald font-semibold border border-accent-emerald/20">
                      {section.number}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-text-pure tracking-tight">
                      {section.title}
                    </h2>
                  </div>

                  {/* Paragraphs */}
                  <div className="space-y-4 text-sm sm:text-base text-text-off-white/80 leading-relaxed">
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
                        <div key={sIdx} className="p-4 rounded-xl bg-navy-base/60 border border-border-flat/10">
                          <h3 className="text-sm font-semibold text-text-pure mb-2.5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-emerald" />
                            {sub.title}
                          </h3>
                          <ul className="space-y-2">
                            {sub.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="text-xs sm:text-sm text-border-flat/80 flex items-start gap-2.5 leading-relaxed">
                                <span className="text-accent-emerald mt-1 text-xs">•</span>
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
                    <div className="mt-6 p-4 rounded-xl bg-accent-emerald/5 border border-accent-emerald/20 flex items-start gap-3">
                      <Shield className="w-5 h-5 text-accent-emerald flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-text-pure mb-1">
                          {section.callout.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-border-flat/80 leading-relaxed">
                          {section.callout.text}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              ))}

              {/* Contact Box at bottom of document */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-navy-light/60 to-navy-base border border-accent-emerald/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-emerald/10 rounded-full blur-[80px] pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-emerald/10 text-accent-emerald font-mono text-xs mb-4">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Legal & Compliance Officer</span>
                  </div>

                  <h3 className="text-2xl font-bold text-text-pure mb-2">
                    {document.contactBox.title}
                  </h3>
                  <p className="text-sm text-text-off-white/80 max-w-2xl mb-6 leading-relaxed">
                    {document.contactBox.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-navy-base/80 border border-border-flat/10 space-y-1.5">
                      <p className="text-text-pure font-semibold text-sm">{document.contactBox.companyName}</p>
                      <p className="text-accent-emerald font-mono">{document.contactBox.brandName}</p>
                      <p className="text-border-flat/70 flex items-center gap-1.5 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-accent-emerald flex-shrink-0" />
                        {document.contactBox.address}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-navy-base/80 border border-border-flat/10 space-y-2">
                      <div className="flex items-center gap-2 text-border-flat/80">
                        <Mail className="w-3.5 h-3.5 text-accent-emerald flex-shrink-0" />
                        <a href={`mailto:${document.contactBox.email}`} className="hover:text-accent-emerald transition-colors truncate">
                          {document.contactBox.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-border-flat/80">
                        <Mail className="w-3.5 h-3.5 text-accent-emerald flex-shrink-0" />
                        <a href={`mailto:${document.contactBox.secondaryEmail}`} className="hover:text-accent-emerald transition-colors truncate">
                          {document.contactBox.secondaryEmail}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-border-flat/80">
                        <Phone className="w-3.5 h-3.5 text-accent-emerald flex-shrink-0" />
                        <a href="https://wa.me/6285814412099" target="_blank" rel="noopener noreferrer" className="hover:text-accent-emerald transition-colors">
                          {document.contactBox.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border-flat/10 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-border-flat/60">
                      {lang === 'id' 
                        ? 'Dokumen hukum ini mengikat bagi seluruh pengunjung dan pengguna platform digifolks.id.' 
                        : 'This legal instrument applies to all visitors and users of the digifolks.id platform.'}
                    </span>
                    <Link
                      href={`/${lang}/contact`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-emerald text-navy-base font-semibold text-xs hover:bg-accent-emerald/90 transition-all shadow-lg shadow-accent-emerald/10"
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
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-accent-emerald text-navy-base shadow-2xl hover:bg-accent-emerald/90 transition-all hover:scale-105 cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
