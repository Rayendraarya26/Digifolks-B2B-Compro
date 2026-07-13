'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Reveal } from '@/components/animations/Reveal';
import { ScanFace, LineChart, Cpu, Bot, FileText, Sparkles, Target, Zap } from 'lucide-react';

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
    { title: 'Vision & Intelligence', items: [{ title: 'Computer Vision', desc: '' }, { title: 'Object Detection & Counting', desc: '' }] },
    { title: 'Data & Insights', items: [{ title: 'Predictive Analytics', desc: '' }, { title: 'Recommendation System', desc: '' }] },
    { title: 'Process Automation', items: [{ title: 'AI Chatbot & Virtual Assistant', desc: '' }, { title: 'OCR & Document Processing', desc: '' }, { title: 'Generative AI & Automation', desc: '' }] }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) {
              setActiveCategory(id);
            }
          }
        });
      },
      {
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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
                        onClick={() => {
                          const element = document.getElementById(`capability-${catId}`);
                          if (element) {
                            const offset = 100;
                            const bodyRect = document.body.getBoundingClientRect().top;
                            const elementRect = element.getBoundingClientRect().top;
                            const elementPosition = elementRect - bodyRect;
                            const offsetPosition = elementPosition - offset;
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                        }}
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
          <div className="md:col-span-8 space-y-32">
            {cats.map((cat, idx) => {
              const catId = categoryIds[idx];
              return (
                <div 
                  key={catId} 
                  id={`capability-${catId}`}
                  data-id={catId}
                  ref={(el) => {
                    sectionRefs.current[idx] = el;
                  }}
                  className="scroll-mt-32"
                >
                  {/* Mobile Category Title */}
                  <h3 className="text-2xl font-bold text-navy-base mb-8 md:hidden border-b border-border-flat pb-4">
                    {cat.title}
                  </h3>
                  
                  <div className="grid gap-6">
                    {cat.items.map((cap, i) => (
                      <Reveal key={i} delay={i * 0.1}>
                        <div className="group flex flex-col sm:flex-row gap-6 p-8 bg-bg-ice-blue border border-border-flat rounded-2xl hover:border-accent-emerald/50 hover:shadow-lg transition-all duration-300">
                          <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-accent-emerald/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            {categoryIcons[idx]?.[i]}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-navy-base mb-3">{cap.title}</h4>
                            <p className="text-text-muted leading-relaxed">{cap.desc}</p>
                          </div>
                        </div>
                      </Reveal>
                    ))}
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
