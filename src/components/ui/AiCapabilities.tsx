'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Reveal } from '@/components/animations/Reveal';
import { ScanFace, LineChart, Bot, FileText, Sparkles, Target, Zap } from 'lucide-react';

const categoryIds = ['vision', 'data', 'process'];

const categoryIcons = [
  // Vision & Intelligence
  [
    <ScanFace key="scanface" className="w-8 h-8 text-accent-emerald" />,
    <Target key="target" className="w-8 h-8 text-accent-emerald" />
  ],
  // Data & Insights
  [
    <LineChart key="linechart" className="w-8 h-8 text-accent-emerald" />,
    <Zap key="zap" className="w-8 h-8 text-accent-emerald" />
  ],
  // Process Automation
  [
    <Bot key="bot" className="w-8 h-8 text-accent-emerald" />,
    <FileText key="filetext" className="w-8 h-8 text-accent-emerald" />,
    <Sparkles key="sparkles" className="w-8 h-8 text-accent-emerald" />
  ]
];

type AiCapabilitiesDict = {
  title: string;
  desc: string;
  categories: {
    title: string;
    items: { title: string; desc: string }[];
  }[];
};

export function AiCapabilities({ dict }: { dict?: AiCapabilitiesDict }) {
  const [activeCategory, setActiveCategory] = useState<string>(categoryIds[0]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Fallback defaults
  const title = dict?.title || 'AI Capabilities';
  const desc = dict?.desc || 'Solusi kecerdasan buatan komprehensif untuk mentransformasi operasional bisnis Anda.';
  const cats = dict?.categories || [
    { 
      title: 'Vision & Intelligence', 
      items: [
        { title: 'Computer Vision', desc: 'Analisis visual real-time untuk otomasi klasifikasi objek dan pemantauan berbasis data visual yang presisi.' }, 
        { title: 'Object Detection & Counting', desc: 'Algoritma deteksi akurat untuk menghitung dan melacak entitas dalam operasional lapangan secara otomatis.' }
      ] 
    },
    { 
      title: 'Data & Insights', 
      items: [
        { title: 'Predictive Analytics', desc: 'Memanfaatkan data historis untuk memprediksi tren masa depan, membantu Anda mengambil keputusan bisnis berbasis bukti.' }, 
        { title: 'Recommendation System', desc: 'Sistem personalisasi cerdas untuk meningkatkan konversi dan kepuasan pelanggan secara terukur.' }
      ] 
    },
    { 
      title: 'Process Automation', 
      items: [
        { title: 'AI Chatbot & Virtual Assistant', desc: 'Asisten interaktif cerdas 24/7 untuk meningkatkan kepuasan pelanggan dan efisiensi operasional.' }, 
        { title: 'OCR & Document Processing', desc: 'Ekstraksi dokumen otomatis berbasis AI untuk menghilangkan input manual yang memakan waktu.' }, 
        { title: 'Generative AI & Automation', desc: 'Otomatisasi alur kerja tingkat lanjut dengan teknologi GenAI untuk produktivitas maksimal.' }
      ] 
    }
  ];

  const activeIndex = Math.max(0, categoryIds.indexOf(activeCategory));

  // Determine active section based on scroll position
  const handleScroll = useCallback(() => {
    const triggerOffset = window.innerHeight * 0.4;
    let currentActive = categoryIds[0];

    for (let i = 0; i < categoryIds.length; i++) {
      const el = sectionRefs.current[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        // If the top of this section has reached or passed the trigger offset
        if (rect.top <= triggerOffset) {
          currentActive = categoryIds[i];
        }
      }
    }

    setActiveCategory(currentActive);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const element = document.getElementById(`capability-${catId}`);
    if (element) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-32 bg-bg-pure text-text-pure relative border-t border-border-flat/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-20 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold text-navy-base mb-4">{title}</h2>
            <p className="text-text-muted max-w-2xl text-lg">{desc}</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Sisi Kiri: Sticky Sidebar */}
          <div className="hidden md:block md:col-span-4 sticky top-32">
            <div className="relative pl-6">
              {/* Vertical line tracker */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border-flat"></div>
              
              <ul className="space-y-8">
                {cats.map((cat, idx) => {
                  const catId = categoryIds[idx];
                  const isActive = activeCategory === catId;
                  return (
                    <li key={catId} className="relative">
                      {/* Active indicator */}
                      <div 
                        className={`absolute -left-[25px] w-0.5 h-full transition-all duration-500 ease-out ${
                          isActive ? 'bg-accent-emerald scale-y-100 opacity-100' : 'bg-transparent scale-y-0 opacity-0'
                        }`} 
                      />
                      <button
                        onClick={() => scrollToCategory(catId)}
                        className={`text-left text-xl lg:text-2xl font-bold transition-all duration-300 ${
                          isActive ? 'text-navy-base translate-x-2' : 'text-text-muted hover:text-navy-light'
                        }`}
                      >
                        {cat.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Sisi Kanan: Scrollable Content */}
          <div className="md:col-span-8">
            {cats.map((cat, idx) => {
              const catId = categoryIds[idx];
              // The section is visible if the user has reached or scrolled into it (idx <= activeIndex)
              const isEntered = idx <= activeIndex;
              const isLast = idx === cats.length - 1;

              return (
                <div 
                  key={catId} 
                  id={`capability-${catId}`}
                  data-id={catId}
                  ref={(el) => {
                    sectionRefs.current[idx] = el;
                  }}
                  className={`scroll-mt-32 ${
                    isLast ? 'min-h-[45vh]' : 'min-h-[65vh] lg:min-h-[75vh] pb-24 lg:pb-36'
                  } transition-all duration-500`}
                >
                  {/* Cards container & section indicator: hidden until scroll enters this capability section */}
                  <div 
                    className={`transition-all duration-700 ease-out ${
                      isEntered 
                        ? 'opacity-100 translate-y-0 pointer-events-auto' 
                        : 'opacity-0 translate-y-10 pointer-events-none'
                    }`}
                  >
                    {/* Section X of Y Header Indicator */}
                    <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-border-flat">
                      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-accent-emerald/10 text-accent-forest border border-accent-emerald/25">
                          Section {idx + 1} of {cats.length}
                        </span>
                        <h3 className="text-xl font-bold text-navy-base tracking-tight">
                          {cat.title}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-text-muted hidden sm:inline-block">
                        {cat.items.length} {cat.items.length === 1 ? 'Capability' : 'Capabilities'}
                      </span>
                    </div>

                    <div className="grid gap-6">
                    {cat.items.map((cap, i) => (
                      <div 
                        key={i} 
                        className="group flex flex-col sm:flex-row gap-6 p-8 bg-bg-ice-blue border border-border-flat rounded-2xl hover:border-accent-emerald/50 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-accent-emerald/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          {categoryIcons[idx]?.[i]}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-navy-base mb-3">{cap.title}</h4>
                          <p className="text-text-muted leading-relaxed">{cap.desc}</p>
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
