"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Loader2 } from "lucide-react";

type FormStatus = "idle" | "typing" | "submitting" | "success" | "error";

export default function ContactArcade() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  // State Terminal Log: Menyimpan seluruh riwayat ketikan user
  const [terminalLog, setTerminalLog] = useState<string[]>([]);
  // Ref untuk autoscroll layar arcade ke bawah
  const terminalRef = useRef<HTMLDivElement>(null);

  // Efek autoscroll ke bawah saat log bertambah
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLog]);

  // Efek ngetik: Balik ke idle kalau udah 1 detik ga ngetik
  useEffect(() => {
    if (status !== "typing") return;
    const timer = setTimeout(() => setStatus("idle"), 1000);
    return () => clearTimeout(timer);
  }, [name, email, message, status]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, fieldName: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(e.target.value);
    
    // Format log terminal: "> [Field]: [Input terakhir]"
    const newEntry = `> ${fieldName}: ${e.target.value}`;
    
    setTerminalLog(prev => {
      // Jika input sebelumnya adalah dari field yang sama, timpa (update) baris terakhir
      // Jika dari field berbeda, buat baris baru
      const lastEntry = prev[prev.length - 1] || "";
      if (lastEntry.startsWith(`> ${fieldName}:`)) {
        const updatedLog = [...prev];
        updatedLog[updatedLog.length - 1] = newEntry;
        // Jaga agar log tidak kepanjangan (maksimal 50 baris di memory)
        return updatedLog.slice(-50);
      } else {
        return [...prev, newEntry].slice(-50);
      }
    });

    if (status === "idle") setStatus("typing");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // Animasi Terminal saat Submit
    setTerminalLog(prev => [...prev, "> UPLOADING SYSTEM..."]);

    // Simulasi API API Call
    setTimeout(() => {
      setStatus("success");
      setTerminalLog(prev => [...prev, "> TRANSFER COMPLETE."]);
      
      // Reset form ke awal
      setTimeout(() => {
        setStatus("idle");
        setName("");
        setEmail("");
        setMessage("");
        setTerminalLog([]); // Bersihkan layar
      }, 5000);
    }, 2500);
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-surface-dark px-6 py-24  desktop:px-24">
      
      <div className="relative z-10 mb-8 inline-block rounded-full border-2 border-text-primary bg-surface-light px-6 py-2 text-sm font-bold uppercase tracking-widest text-text-primary shadow-playful desktop:mb-12">
        Insert Coin to Contact
      </div>

      <div className="relative flex w-full flex-col items-center justify-center gap-8 desktop:flex-row desktop:items-stretch desktop:gap-12">
        
        {/* --- THE ARCADE MACHINE --- */}
        <div className="relative flex w-full flex-col items-center justify-center desktop:w-1/3">
          
          <motion.div 
            animate={{
               x: status === "error" ? [-10, 10, -10, 10, 0] : 0,
               y: status === "submitting" ? [0, -5, 0, 5, 0] : 0,
            }}
            transition={{ 
               repeat: status === "submitting" ? Infinity : 0, 
               duration: status === "submitting" ? 0.5 : 0.3 
            }}
            className="relative flex h-96 desktop:h-full w-full flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border-4 border-text-primary bg-pop-blue shadow-playful desktop:w-full"
          >
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
               
               {/* Laya Arcade Hitam (Terminal) */}
               <div className="mb-4 flex h-32 w-full flex-col items-center justify-center overflow-hidden rounded-xl border-4 border-text-primary bg-surface-dark/90 p-4 shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]">
                  
                  <AnimatePresence mode="wait">
                    {/* Saat belum ngetik apa-apa */}
                    {status === "idle" && terminalLog.length === 0 && (
                      <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-display text-pop-pink animate-pulse text-2xl font-black uppercase tracking-widest sm:text-3xl">
                        INPUT MESSAGE
                      </motion.p>
                    )}
                    
                    {/* Saat Ngetik atau ada isi Terminal (Retro Log) */}
                    {(status === "typing" || (status === "idle" && terminalLog.length > 0)) && (
                      <motion.div 
                        key="typing" 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="flex h-full w-full flex-col items-start justify-end"
                      >
                        {/* Area Log yang bisa autoscroll */}
                        <div ref={terminalRef} className="flex max-h-full w-full flex-col items-start overflow-y-hidden text-left">
                          {terminalLog.map((line, index) => (
                            <p 
                              key={index} 
                              className={`font-mono text-sm font-bold uppercase tracking-widest wrap-break-word max-w-full ${index === terminalLog.length - 1 ? 'text-surface-light opacity-100' : 'text-pop-yellow opacity-50'}`}
                            >
                              {line}{index === terminalLog.length - 1 && <span className="animate-pulse">_</span>}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Saat Loading Submit */}
                    {status === "submitting" && (
                      <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full w-full flex-col items-start justify-end text-left">
                         <div className="flex max-h-full w-full flex-col items-start overflow-hidden">
                           {terminalLog.slice(-2).map((line, index) => (
                             <p key={index} className="font-mono text-sm font-bold uppercase tracking-widest text-pop-yellow opacity-50 truncate max-w-full">
                               {line}
                             </p>
                           ))}
                           <div className="mt-2 flex items-center text-surface-light">
                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                             <p className="font-mono text-sm font-bold uppercase tracking-widest">
                               UPLOADING...
                             </p>
                           </div>
                         </div>
                      </motion.div>
                    )}
                    
                    {/* Saat Sukses */}
                    {status === "success" && (
                      <motion.p key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} className="font-display text-pop-green text-3xl font-black uppercase sm:text-4xl">
                        SUCCESS!
                      </motion.p>
                    )}
                  </AnimatePresence>

               </div>

               {/* Bouncing Buttons */}
               <div className="flex gap-4">
                 <motion.div 
                    animate={{ y: status === "typing" ? [0, 4, 0] : 0 }} 
                    transition={{ repeat: status === "typing" ? Infinity : 0, duration: 0.2 }}
                    className="h-10 w-10 rounded-full border-4 border-text-primary bg-pop-pink shadow-[0_4px_0_var(--color-text-primary)]"
                  />
                 <motion.div 
                    animate={{ y: status === "typing" ? [0, 4, 0] : 0 }} 
                    transition={{ repeat: status === "typing" ? Infinity : 0, duration: 0.2, delay: 0.1 }}
                    className="h-10 w-10 rounded-full border-4 border-text-primary bg-pop-yellow shadow-[0_4px_0_var(--color-text-primary)]"
                  />
               </div>
            </div>

          </motion.div>
          {/* <div className="mt-4 h-4 w-48 rounded-full bg-black/20 blur-md desktop:w-64" /> */}
        </div>

        {/* --- FORM SECTION --- */}
        <div className="relative w-full desktop:w-2/3">
          <form
            onSubmit={handleSubmit}
            className="flex h-full flex-col justify-center gap-5 rounded-[2.5rem] border-4 border-text-primary bg-surface-light p-6 shadow-playful sm:gap-6 sm:p-8 desktop:p-12"
          >
            <div className="grid grid-cols-1 gap-5 sm:gap-6 desktop:grid-cols-2">
               <div className="flex flex-col gap-2">
                 <label className="font-display font-black uppercase tracking-widest text-text-primary">Player Name</label>
                 {/* PERUBAHAN: handleInputChange sekarang butuh string fieldName */}
                 <input 
                   type="text" 
                   value={name}
                   onChange={handleInputChange(setName, "P1")} 
                   required
                   disabled={status === "submitting"}
                   placeholder="READY PLAYER ONE"
                   className="rounded-xl border-4 border-text-primary bg-surface-dark/5 px-4 py-3 font-bold text-text-primary outline-none transition-colors placeholder:text-text-primary/30 focus:border-pop-pink focus:bg-white disabled:opacity-50"
                 />
               </div>

               <div className="flex flex-col gap-2">
                 <label className="font-display font-black uppercase tracking-widest text-text-primary">Email Address</label>
                 <input 
                   type="email" 
                   value={email}
                   onChange={handleInputChange(setEmail, "MAIL")}
                   required
                   disabled={status === "submitting"}
                   placeholder="PLAYER@MAIL.COM"
                   className="rounded-xl border-4 border-text-primary bg-surface-dark/5 px-4 py-3 font-bold text-text-primary outline-none transition-colors placeholder:text-text-primary/30 focus:border-pop-blue focus:bg-white disabled:opacity-50"
                 />
               </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-display font-black uppercase tracking-widest text-text-primary">Secret Message</label>
              <textarea 
                rows={4}
                value={message}
                onChange={handleInputChange(setMessage, "MSG")}
                required
                disabled={status === "submitting"}
                placeholder="UP, UP, DOWN, DOWN, LEFT, RIGHT..."
                className="resize-none rounded-xl border-4 border-text-primary bg-surface-dark/5 px-4 py-3 font-bold text-text-primary outline-none transition-colors placeholder:text-text-primary/30 focus:border-pop-yellow focus:bg-white disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className={`group relative mt-2 overflow-hidden rounded-full border-4 border-text-primary px-6 py-4 font-display text-lg font-black uppercase tracking-widest text-text-primary shadow-playful transition-all hover:-translate-y-1 hover:shadow-[0_8px_0_var(--color-text-primary)] active:translate-y-1 active:shadow-[0_0px_0_var(--color-text-primary)] sm:text-xl desktop:mt-4 ${
                status === "success" 
                  ? "bg-pop-green disabled:opacity-100 disabled:pointer-events-none" 
                  : "bg-pop-yellow hover:bg-pop-pink disabled:pointer-events-none disabled:opacity-50"
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {(status === "idle" || status === "typing") && "Send It"}
                {status === "submitting" && (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Transmitting...
                  </>
                )}
                {status === "success" && "Delivered!"}
                {status === "error" && (
                  <>
                    <AlertCircle className="h-6 w-6" />
                    Game Over (Retry)
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

// Anggap lu punya sprite 4 frame menyamping (Lebar total 400%, Tiap frame 100%)
// Frame 0 = Idle, Frame 1 = Typing, Frame 2 = Submitting, Frame 3 = Success

// const getSpritePosition = (currentStatus: FormStatus) => {
//   switch (currentStatus) {
//     case "idle": return "0%"; 
//     case "typing": return "33.33%"; 
//     case "submitting": return "66.66%"; 
//     case "success": return "100%"; 
//     default: return "0%";
//   }
// };

// <div 
//   className="h-full w-full bg-ambarasset bg-cover bg-no-repeat"
//   style={{ 
//     // Ini keajaibannya bro. steps(1) bikin transisinya patah-patah kayak game 8-bit!
//     backgroundPosition: `${getSpritePosition(status)} 0`,
//     transition: "background-position 0s steps(1)" 
//   }}
// />