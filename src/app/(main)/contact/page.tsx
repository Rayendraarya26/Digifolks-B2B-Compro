"use client";

import { useState } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

const projectCategories = [
  "Custom Management System",
  "AI Automation",
  "IT Infrastructure Consulting",
  "Cloud Migration",
  "Legacy Modernization",
  "Other"
];

export default function ContactPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="flex w-full flex-col min-h-screen bg-navy-base pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent-emerald/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <Reveal>
          <div className="mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-text-pure mb-6">Let's Build <br/>Something Solid.</h1>
            <p className="text-xl text-text-off-white max-w-2xl">
              Ceritakan tantangan operasional Anda. Tim engineer kami akan merancang solusi arsitektur yang terukur dan efisien.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-navy-light border border-border-flat/10 rounded-2xl p-8 md:p-12 shadow-lg">
            <form className="space-y-12">
              
              {/* Project Categories */}
              <div>
                <label className="block text-sm font-bold text-text-pure mb-4 uppercase tracking-wider">What are you looking for?</label>
                <div className="flex flex-wrap gap-3">
                  {projectCategories.map((cat) => {
                    const isSelected = selectedCategories.includes(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => toggleCategory(cat)}
                        className={`px-4 py-2 text-sm rounded-full transition-all duration-300 border ${
                          isSelected 
                            ? 'bg-accent-emerald text-navy-base border-accent-emerald font-medium' 
                            : 'bg-transparent text-text-off-white/70 border-border-flat/20 hover:border-accent-emerald hover:text-accent-emerald'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Minimalist Inputs */}
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input 
                      type="text" 
                      id="name"
                      className="w-full bg-transparent border-b border-border-flat/30 py-3 px-0 text-text-pure focus:outline-none focus:border-accent-emerald transition-colors peer placeholder-transparent"
                      placeholder="Name"
                      required
                    />
                    <label htmlFor="name" className="absolute left-0 top-3 text-text-off-white/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-emerald peer-valid:-top-4 peer-valid:text-xs">
                      Full Name *
                    </label>
                  </div>
                  <div className="relative group">
                    <input 
                      type="email" 
                      id="email"
                      className="w-full bg-transparent border-b border-border-flat/30 py-3 px-0 text-text-pure focus:outline-none focus:border-accent-emerald transition-colors peer placeholder-transparent"
                      placeholder="Email"
                      required
                    />
                    <label htmlFor="email" className="absolute left-0 top-3 text-text-off-white/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-emerald peer-valid:-top-4 peer-valid:text-xs">
                      Corporate Email *
                    </label>
                  </div>
                </div>

                <div className="relative group">
                  <textarea 
                    id="message"
                    rows={4}
                    className="w-full bg-transparent border-b border-border-flat/30 py-3 px-0 text-text-pure focus:outline-none focus:border-accent-emerald transition-colors peer placeholder-transparent resize-none"
                    placeholder="Tell us about your project"
                    required
                  ></textarea>
                  <label htmlFor="message" className="absolute left-0 top-3 text-text-off-white/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-emerald peer-valid:-top-4 peer-valid:text-xs">
                    Project Details *
                  </label>
                </div>
              </div>

              <Button size="lg" type="submit" className="w-full md:w-auto">
                Send Request
              </Button>
            </form>
          </div>
        </Reveal>

        {/* Credibility Footer */}
        <Reveal delay={0.2}>
          <div className="mt-16 pt-8 border-t border-border-flat/10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-bold text-text-pure mb-2 uppercase tracking-wider">Direct Contact</h4>
              <a href="mailto:solutions@digifolks.id" className="text-lg text-accent-emerald hover:underline">
                solutions@digifolks.id
              </a>
            </div>
            <div>
              <h4 className="text-sm font-bold text-text-pure mb-2 uppercase tracking-wider">Headquarters</h4>
              <p className="text-text-off-white/70 leading-relaxed">
                Yogyakarta, Indonesia<br/>
                Tech & Engineering Hub
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}