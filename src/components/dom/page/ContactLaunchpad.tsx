"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Copy, Calendar, Rocket, CheckCircle2, ArrowRight, ArrowLeft, Send } from "lucide-react";

// --- STATE MANAGEMENT ---
type FormData = {
  name: string;
  company: string;
  email: string;
  service: string;
  budget: string;
    currency: "IDR" | "USD";
  details: string;
};

const SERVICES = ["Web Platform", "Mobile App", "AI Integration", "IT Consulting"];
const BUDGETS = {
  IDR: ["< Rp 50 Juta", "Rp 50Jt - 150Jt", "Rp 150Jt+"],
  USD: ["< $5k", "$5k - $15k", "$15k+"],
};

export default function ContactLaunchpad() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currency, setCurrency] = useState<"IDR" | "USD">("IDR");

  const [formData, setFormData] = useState<FormData>({
    name: "", company: "", email: "", service: "", budget: "", currency: "IDR", details: ""
  });

  const updateForm = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setDirection(1);
      setStep(s => s + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@wecore.official");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- ANIMATION VARIANTS (Slide & Pop) ---
  const slideVariants: Variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 25 } },
    exit: (dir: number) => ({ x: dir < 0 ? 100 : -100, opacity: 0, scale: 0.95, transition: { type: "spring", stiffness: 300, damping: 25 } })
  };

  const canGoNext = () => {
    if (step === 1) return formData.name.length > 0 && formData.email.includes("@");
    if (step === 2) return formData.service !== "";
    if (step === 3) return formData.budget !== "";
    return true;
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col bg-surface-light desktop:flex-row">
      
      {/* =========================================
          SISI KIRI: THE SOCIAL & TRUST AREA (40%)
      ========================================= */}
      <div className="relative flex w-full flex-col justify-between border-b-2 border-text-primary bg-pop-yellow px-6 py-16 sm:px-12 desktop:sticky desktop:top-0 desktop:h-screen desktop:w-2/5 desktop:border-b-0 desktop:border-r-2 desktop:py-24">
        
        <div className="mb-12 flex items-center gap-3">
          <div className="relative flex h-4 w-4 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pop-green opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-text-primary bg-pop-green"></span>
          </div>
          <span className="font-display text-sm font-black uppercase tracking-widest text-text-primary">
            Currently syncing new ideas
          </span>
        </div>

        <div className="mb-16">
          <h1 className="font-display text-5xl font-black uppercase leading-none tracking-tighter text-text-primary sm:text-6xl desktop:text-7xl">
            Let's turn that 'What If' into <span className="text-surface-light drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">'Hell Yeah!'</span>
          </h1>
          <p className="mt-6 text-xl font-bold text-text-primary/80">
            Tell us about your mission. We don't bite, we byte (code).
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-3xl border-2 border-text-primary bg-surface-light p-4 shadow-[4px_4px_0_rgba(0,0,0,1)]">
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-widest text-text-primary/50">Drop an email</span>
              <span className="font-display text-lg font-black sm:text-xl">hello@wecore.official</span>
            </div>
            <button 
              onClick={handleCopyEmail}
              className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-text-primary bg-pop-pink shadow-[2px_2px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-1 active:translate-y-0"
            >
              {copied ? <CheckCircle2 className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>

          <a href="#" className="group flex flex-col justify-between rounded-3xl border-2 border-text-primary bg-pop-blue p-6 shadow-[4px_4px_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full border-2 border-text-primary bg-surface-light p-2">
                <Calendar className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-black uppercase">Book a Call</span>
            </div>
            <p className="font-bold text-text-primary/80">Prefer a human face? Grab a 15-min coffee chat.</p>
          </a>
        </div>
      </div>

      {/* =========================================
          SISI KANAN: THE INQUIRY CONSOLE (60%)
      ========================================= */}
      <div className="relative flex w-full flex-col justify-center px-4 py-16 sm:px-12 desktop:w-3/5 desktop:px-24">
        
        {isSuccess ? (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center">
            <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-full border-2 border-text-primary bg-pop-green shadow-[6px_6px_0_rgba(0,0,0,1)]">
              <CheckCircle2 className="h-16 w-16 text-text-primary" />
              <motion.div animate={{ y: [-10, -30], x: [-10, -20], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="absolute h-3 w-3 rounded-full bg-pop-pink" />
              <motion.div animate={{ y: [-10, -40], x: [10, 30], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="absolute h-4 w-4 rounded-full bg-pop-yellow" />
              <motion.div animate={{ y: [10, 30], x: [-10, -40], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.1 }} className="absolute h-3 w-3 rounded-full bg-pop-blue" />
            </div>
            <h2 className="mb-4 font-display text-5xl font-black uppercase text-text-primary">Mission Initiated!</h2>
            <p className="text-xl font-bold text-text-primary/70">Our systems are processing your coordinates. We'll beam a message to your inbox shortly.</p>
          </motion.div>
        ) : (
          <div className="w-full max-w-2xl">
            
            <div className="mb-12">
              <div className="relative h-2 w-full rounded-full bg-surface-dark/10">
                <motion.div 
                  className="absolute left-0 top-0 h-full rounded-full bg-pop-pink"
                  animate={{ width: `${(step / 4) * 100}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <motion.div 
                  className="absolute -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 border-text-primary bg-surface-light shadow-playful"
                  animate={{ left: `calc(${(step / 4) * 100}% - 20px)` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Rocket className="h-5 w-5 text-text-primary" />
                </motion.div>
              </div>
              <div className="mt-6 flex justify-between font-display text-xs font-black uppercase tracking-widest text-text-primary/50">
                <span>Phase 0{step}</span>
                <span>04 Phases</span>
              </div>
            </div>

            <div className="relative min-h-100">
              <AnimatePresence mode="wait" custom={direction}>
                
                {/* PHASE 1: THE FLOATING INLINE MAD LIBS */}
                {step === 1 && (
                  <motion.div key="step1" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col">
                    <h2 className="font-display text-3xl font-black uppercase leading-16 text-text-primary sm:text-4xl sm:leading-20">
                      Hi there! I am
                      <InlineFloatingInput 
                        placeholder="YOUR NAME" 
                        value={formData.name} 
                        onChange={(e: any) => updateForm("name", e.target.value)} 
                        className="w-48 sm:w-64" 
                        colorClass="bg-pop-pink" 
                        textClass="text-pop-pink" 
                      />
                      from
                      <InlineFloatingInput 
                        placeholder="COMPANY" 
                        value={formData.company} 
                        onChange={(e: any) => updateForm("company", e.target.value)} 
                        className="w-56 sm:w-80" 
                        colorClass="bg-pop-blue" 
                        textClass="text-pop-blue" 
                      />
                      . You can reach me at
                      <InlineFloatingInput 
                        type="email" 
                        placeholder="EMAIL ADDRESS" 
                        value={formData.email} 
                        onChange={(e: any) => updateForm("email", e.target.value)} 
                        className="w-64 sm:w-96" 
                        colorClass="bg-pop-green" 
                        textClass="text-pop-green" 
                      />
                      .
                    </h2>
                  </motion.div>
                )}

                {/* PHASE 2 */}
                {step === 2 && (
                  <motion.div key="step2" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-6">
                    <h2 className="font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
                      I have an exciting project! I need help with...
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-4">
                      {SERVICES.map(srv => (
                        <PillButton key={srv} label={srv} isActive={formData.service === srv} onClick={() => updateForm("service", srv)} />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* PHASE 3 */}
                {step === 3 && (
                  <motion.div key="step3" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-6">
                    <h2 className="font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
                      My target launch is around
                    </h2>
                    <SquishyInput placeholder="e.g. Next Month, Q3 2026..." value={formData.details} onChange={(e: any) => updateForm("details", e.target.value)} />

                    <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <h2 className="font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
                        and I'm allocating a budget of
                      </h2>

                      {/* --- THE CURRENCY TOGGLE --- */}
                      <div className="relative flex rounded-full border-2 border-text-primary bg-surface-dark/5 p-1 shadow-[2px_2px_0_rgba(0,0,0,1)]">
                        <button
                          onClick={() => {
                            setCurrency("IDR");
                            updateForm("budget", "");
                            updateForm("currency", "IDR");
                          }}
                          className={`relative z-10 px-4 py-2 font-display text-sm font-black uppercase tracking-widest transition-colors ${currency === "IDR" ? "text-text-primary" : "text-text-primary/50 hover:text-text-primary"}`}
                        >
                          IDR
                        </button>
                        <button
                          onClick={() => {
                            setCurrency("USD");
                            updateForm("budget", "");
                            updateForm("currency", "USD");
                          }}
                          className={`relative z-10 px-4 py-2 font-display text-sm font-black uppercase tracking-widest transition-colors ${currency === "USD" ? "text-text-primary" : "text-text-primary/50 hover:text-text-primary"}`}
                        >
                          USD
                        </button>
                        
                        {/* Animated Slider Background */}
                        <motion.div
                          className="absolute bottom-1 top-1 z-0 rounded-full border-2 border-text-primary bg-pop-yellow shadow-playful"
                          initial={false}
                          animate={{
                            left: currency === "IDR" ? "4px" : "50%",
                            width: "calc(50% - 4px)"
                          }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      </div>
                    </div>

                    {/* BUDGET PILLS (Ngerender dinamis berdasarkan kurs yang dipilih) */}
                    <div className="mt-2 flex flex-wrap gap-4">
                      {BUDGETS[currency].map(bg => (
                        <PillButton 
                          key={bg} 
                          label={bg} 
                          isActive={formData.budget === bg} 
                          onClick={() => updateForm("budget", bg)} 
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* PHASE 4 */}
                {step === 4 && (
                  <motion.div key="step4" custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" className="flex flex-col gap-6">
                    <h2 className="font-display text-3xl font-black uppercase leading-tight sm:text-4xl">
                      Here's a little secret about the project:
                    </h2>
                    <motion.div whileFocus="focused" initial="idle" className="relative mt-2 w-full">
                      <textarea
                        rows={5}
                        placeholder="Tell us more about the goals, the vibe, or any crazy ideas..."
                        value={formData.details}
                        onChange={(e) => updateForm("details", e.target.value)}
                        className="peer relative z-10 w-full resize-none rounded-2xl border-2 border-text-primary bg-surface-dark/5 p-6 text-xl font-bold text-text-primary outline-none transition-all focus:bg-surface-light"
                      />
                      <motion.div 
                        variants={{ idle: { scaleX: 0 }, focused: { scaleX: 1 } }} 
                        transition={{ duration: 0.3 }} 
                        className="absolute bottom-0 left-0 right-0 z-20 h-1 origin-center rounded-b-2xl bg-pop-pink" 
                      />
                    </motion.div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            <div className="mt-12 flex items-center justify-between border-t-2 border-text-primary/10 pt-8">
              {step > 1 ? (
                <button onClick={handlePrev} className="flex items-center gap-2 font-display text-sm font-black uppercase tracking-widest text-text-primary transition-transform hover:-translate-x-2">
                  <ArrowLeft className="h-5 w-5" /> Back
                </button>
              ) : <div />}

              {step < 4 ? (
                <button 
                  onClick={handleNext} 
                  disabled={!canGoNext()}
                  className="flex items-center gap-2 rounded-full border-2 border-text-primary bg-pop-yellow px-8 py-4 font-display text-lg font-black uppercase tracking-widest shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:bg-pop-pink hover:shadow-[6px_6px_0_rgba(0,0,0,1)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-50"
                >
                  Continue <ArrowRight className="h-5 w-5" />
                </button>
              ) : (
                <button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting || formData.details === ""}
                  className="group relative overflow-hidden flex items-center justify-center gap-2 rounded-full border-2 border-text-primary bg-pop-green px-10 py-4 font-display text-lg font-black uppercase tracking-widest shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(0,0,0,1)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-80"
                >
                  {isSubmitting && (
                    <motion.div 
                      initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 2, ease: "linear" }}
                      className="absolute inset-0 z-0 bg-pop-yellow"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? "Initiating..." : "Launch Project"} 
                    {!isSubmitting && <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                  </span>
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

// --- MICRO-COMPONENTS ---

// 1. KOMPONEN BARU: The Inline Floating Input (Mad Libs Seamless)
const InlineFloatingInput = ({ placeholder, value, onChange, type = "text", className = "w-48", colorClass = "bg-pop-pink", textClass = "text-pop-pink" }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value.length > 0;

  return (
    <div className={`relative mx-3 inline-block align-baseline ${className}`}>
      
      {/* The Floating Placeholder */}
      <motion.span
        animate={{ 
          y: isFloating ? -40 : 0, 
          scale: isFloating ? 0.45 : 1 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`absolute bottom-5 left-0 origin-bottom-left pointer-events-none font-display text-3xl font-black uppercase sm:text-4xl transition-colors duration-300 ${isFloating ? textClass : "text-text-primary/30"}`}
      >
        {placeholder}
      </motion.span>

      {/* The Clean Input */}
      <input
        type={type}
        // Jangan pakai attribute placeholder bawaan HTML biar nggak dobel
        placeholder="" 
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="relative z-10 w-full bg-transparent pb-1 font-display text-3xl font-black uppercase text-text-primary outline-none sm:text-4xl"
      />
      
      {/* Base Subtle Underline */}
      <div className="absolute bottom-4 left-0 right-0 h-0.75 rounded-full bg-text-primary/10" />
      
      {/* Animated Center-Out Underline */}
      <motion.div
        initial={false}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`absolute bottom-4 left-0 right-0 z-20 h-1 origin-center rounded-full ${colorClass}`}
      />

    </div>
  );
};

// 2. The Boxy Squishy Input (Phase 3)
const SquishyInput = ({ placeholder, value, onChange, type = "text" }: any) => {
  return (
    <motion.div initial="idle" whileFocus="focused" whileHover="hover" className="relative w-full">
      <motion.input
        type={type} placeholder={placeholder} value={value} onChange={onChange}
        variants={{ idle: { scale: 1 }, hover: { scale: 1.01 }, focused: { scale: 1.02 } }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="peer relative z-10 w-full rounded-2xl border-2 border-text-primary bg-surface-dark/5 px-6 py-5 text-xl font-bold text-text-primary outline-none transition-colors placeholder:text-text-primary/40 focus:bg-surface-light"
      />
      <motion.div variants={{ idle: { scaleX: 0 }, hover: { scaleX: 0 }, focused: { scaleX: 1 } }} transition={{ duration: 0.3 }} className="absolute bottom-0 left-0 right-0 z-20 h-1 origin-center rounded-b-2xl bg-pop-pink" />
    </motion.div>
  );
};

// 3. Pill Button
const PillButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-full border-2 border-text-primary px-6 py-3 font-display text-sm font-black uppercase tracking-widest transition-all ${
        isActive 
          ? "bg-pop-blue text-text-primary shadow-[4px_4px_0_rgba(0,0,0,1)] -translate-y-1" 
          : "bg-surface-light text-text-primary hover:bg-surface-dark/5 hover:-translate-y-1"
      }`}
    >
      {label}
    </button>
  );
};