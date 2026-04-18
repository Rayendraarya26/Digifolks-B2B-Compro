"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Ubah ke state Submitting (Form melipat)
    setStatus("submitting");

    // 2. Simulasi API Call (Delay 2 detik)
    setTimeout(() => {
      // Ubah ke state Success (Pesawat terbang)
      setStatus("success");
      
      // Reset form setelah 5 detik biar user bisa kirim pesan lagi
      setTimeout(() => setStatus("idle"), 5000);
    }, 2000);
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-surface-dark px-6 py-24 desktop:px-24">
      
      {/* Visual Hint */}
      <div className="relative z-10 mb-12 inline-block rounded-full border-2 border-text-primary bg-surface-light px-6 py-2 text-sm font-bold uppercase tracking-widest text-text-primary shadow-playful">
        Drop A Line
      </div>

      <div className="relative flex w-full max-w-4xl flex-col items-center justify-center desktop:flex-row desktop:items-start desktop:gap-12">
        
        {/* --- KOTAK POS (LOTTIE PLACEHOLDER) --- */}
        <div className="relative mb-12 flex h-64 w-full items-center justify-center rounded-[3rem] border-4 border-text-primary bg-pop-blue shadow-playful desktop:mb-0 desktop:w-1/2">
          {/* Nanti ganti div di bawah ini dengan komponen <Lottie /> lu */}
          <div className="flex flex-col items-center text-text-primary">
            <Mail className="h-24 w-24 opacity-50" />
            <p className="mt-4 font-display text-xl font-black uppercase">Postbox Asset</p>
            <p className="text-sm font-bold opacity-70">(Lottie Placeholder)</p>
          </div>

          {/* Animasi Pesawat Kertas Terbang (Placeholder) */}
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ x: -200, y: 100, scale: 0, rotate: -45 }}
                animate={{ x: 0, y: 0, scale: 1, rotate: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 12 }}
                className="absolute z-30"
              >
                {/* Nanti ganti ini dengan Lottie Pesawat lu */}
                <div className="flex items-center justify-center rounded-full border-4 border-text-primary bg-surface-light p-4 shadow-playful">
                  <Send className="h-12 w-12 text-pop-pink" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- FORM SECTION --- */}
        <div className="relative w-full desktop:w-1/2">
          <AnimatePresence mode="wait">
            
            {/* STATE 1 & 2: IDLE ATAU SUBMITTING */}
            {(status === "idle" || status === "submitting" || status === "error") && (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                // Animasi "Fold & Hold": Mengecil saat submitting, Goyang saat error
                animate={{
                  scale: status === "submitting" ? 0.9 : 1,
                  opacity: status === "submitting" ? 0.7 : 1,
                  x: status === "error" ? [-10, 10, -10, 10, 0] : 0,
                }}
                exit={{ opacity: 0, scale: 0.5, y: -50 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 rounded-[2.5rem] border-4 border-text-primary bg-surface-light p-8 shadow-playful desktop:p-10"
              >
                <div className="flex flex-col gap-2">
                  <label className="font-display font-black uppercase tracking-widest text-text-primary">Name</label>
                  <input 
                    type="text" 
                    required
                    disabled={status === "submitting"}
                    className="rounded-xl border-4 border-text-primary bg-surface-dark/5 px-4 py-3 font-bold text-text-primary outline-none transition-colors focus:border-pop-pink focus:bg-surface-light disabled:opacity-50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-display font-black uppercase tracking-widest text-text-primary">Message</label>
                  <textarea 
                    rows={4}
                    required
                    disabled={status === "submitting"}
                    className="resize-none rounded-xl border-4 border-text-primary bg-surface-dark/5 px-4 py-3 font-bold text-text-primary outline-none transition-colors focus:border-pop-yellow focus:bg-surface-light disabled:opacity-50"
                  />
                </div>

                {/* Tombol Dinamis */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group relative mt-4 overflow-hidden rounded-full border-4 border-text-primary bg-pop-yellow px-8 py-4 font-display text-xl font-black uppercase tracking-widest text-text-primary shadow-playful transition-all hover:bg-pop-pink hover:text-surface-light disabled:cursor-not-allowed disabled:bg-surface-dark/20 disabled:hover:text-text-primary"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === "idle" && "Send It"}
                    {status === "submitting" && (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        Folding...
                      </>
                    )}
                    {status === "error" && (
                      <>
                        <AlertCircle className="h-6 w-6" />
                        Try Again
                      </>
                    )}
                  </span>
                </button>
              </motion.form>
            )}

            {/* STATE 3: SUCCESS */}
            {status === "success" && (
              <motion.div
                key="success-msg"
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="flex h-full min-h-100 flex-col items-center justify-center rounded-[2.5rem] border-4 border-text-primary bg-pop-green p-8 text-center shadow-playful"
              >
                <CheckCircle2 className="mb-6 h-20 w-20 text-text-primary" />
                <h3 className="font-display text-4xl font-black uppercase leading-tight text-text-primary">
                  Message<br/>Delivered!
                </h3>
                <p className="mt-4 font-bold text-text-primary opacity-80">
                  I'll get back to you faster than this paper plane.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}