"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

// --- DATA FAQ ---
const FAQ_DATA = [
  {
    id: 1,
    question: "Bro, berapa lama biasanya bikin website kayak gini?",
    answer: "Tergantung seberapa liar idemu! Biasanya 2-4 minggu buat hasil yang mind-blowing dan pixel-perfect. Kita nggak main template soalnya 🚀",
    color: "bg-pop-pink",
  },
  {
    id: 2,
    question: "Bisa handle backend sama database sekalian nggak?",
    answer: "Aman bro! Kita fullstack. Dari UI/UX yang sexy sampai arsitektur database yang tahan banting (PostgreSQL, Go, Node.js), kita libas semua.",
    color: "bg-pop-blue",
  },
  {
    id: 3,
    question: "Kalau project udah kelar, dapet support maintenance?",
    answer: "Pasti dong. Bug fixing, minor updates, atau sekadar nanya-nanya teknis tetep kita kawal. We build partnerships, not just websites.",
    color: "bg-pop-yellow",
  },
  {
    id: 4,
    question: "Harganya gimana nih? Bikin kantong jebol nggak?",
    answer: "Harga kita sebanding sama impact yang lu dapet. Kita bisa sesuaikan scope project sama budget lu kok. Hit us up on the contact form to discuss!",
    color: "bg-pop-green",
  },
];

// --- KOMPONEN BUBBLE CHAT INDIVIDUAL ---
const ChatItem = ({ item }: { item: typeof FAQ_DATA[0] }) => {
  // PERBAIKAN 1: Gabungin state biar gampang dikontrol (closed -> typing -> open)
  const [chatState, setChatState] = useState<"closed" | "typing" | "open">("closed");

  const handleClick = () => {
    if (chatState === "closed") {
      setChatState("typing");
      setTimeout(() => {
        // Cek kalau user nggak keburu nutup lagi, baru tampilin jawaban
        setChatState((prev) => (prev === "typing" ? "open" : prev));
      }, 1500); 
    } else {
      setChatState("closed");
    }
  };

  return (
    <motion.div layout className="flex w-full flex-col gap-4">
      
      {/* 1. PERTANYAAN (KIRI) */}
      <motion.button
        layout
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex w-11/12 max-w-xl flex-col items-start justify-center rounded-4xl rounded-bl-none border-4 border-text-primary bg-surface-light p-5 text-left shadow-playful transition-all hover:shadow-[8px_8px_0_var(--color-text-primary)] sm:p-6"
      >
        <p className="font-display text-lg font-black leading-tight text-text-primary sm:text-xl">
          {item.question}
        </p>
        <p className="mt-2 text-xs font-bold uppercase tracking-widest text-text-primary opacity-50 transition-opacity group-hover:opacity-100">
          {chatState === "closed" ? "Tap to view reply" : "Tap to close"}
        </p>
      </motion.button>

      {/* 2. JAWABAN (KANAN) - THE MORPHING ENGINE */}
      <AnimatePresence initial={false}>
        {chatState !== "closed" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full overflow-hidden" 
          >
            <div className="flex w-full flex-col items-end pb-4 pr-4 pt-2">
              
              <motion.div
                layout 
                initial={{ scale: 0.8, x: 20 }}
                animate={{ scale: 1, x: 0 }}
                exit={{ scale: 0.8, x: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className={`ml-auto overflow-hidden rounded-4xl rounded-br-none border-4 border-text-primary ${item.color} shadow-playful ${
                  chatState === "typing" ? "w-fit" : "w-11/12 max-w-xl"
                }`}
              >
                {/* Kalau state-nya typing, tampilin titik 3 */}
                {chatState === "typing" ? (
                  <div className="flex items-center justify-center gap-2 px-6 py-5">
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0 }} className="h-3 w-3 rounded-full bg-text-primary" />
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.15 }} className="h-3 w-3 rounded-full bg-text-primary" />
                    <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.3 }} className="h-3 w-3 rounded-full bg-text-primary" />
                  </div>
                ) : (
                  // Kalau state-nya open, tampilin teksnya (dikasih fade-in dikit biar cakep)
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="p-5 sm:p-6"
                  >
                    <p className="font-bold leading-relaxed text-text-primary sm:text-lg">
                      {item.answer}
                    </p>
                    <p className="mt-3 text-right text-[10px] font-black uppercase tracking-widest text-text-primary opacity-60">
                      Read &bull; Just now
                    </p>
                  </motion.div>
                )}
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export default function FaqChat() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-surface-dark px-4 py-24 sm:px-6 desktop:px-24">
      
      {/* HEADER SECTION */}
      <div className="mb-12 flex flex-col items-center text-center desktop:mb-16">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-text-primary bg-surface-light px-6 py-2 text-sm font-bold uppercase tracking-widest text-text-primary shadow-playful">
          <MessageCircle className="h-4 w-4" />
          Spill The Tea
        </div>
        <h2 className="font-display text-4xl font-black uppercase leading-none tracking-tighter text-surface-light sm:text-6xl desktop:text-7xl">
          Frequently Asked
          <span className="mt-2 block text-pop-yellow drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
            Questions
          </span>
        </h2>
      </div>

      {/* CHAT THREAD CONTAINER */}
      <motion.div layout className="relative w-full max-w-3xl flex-col flex gap-8 rounded-[3rem] border-4 border-text-primary bg-surface-light/5 p-6 backdrop-blur-sm sm:gap-10 sm:p-10 desktop:p-12">
        {FAQ_DATA.map((item) => (
          <ChatItem key={item.id} item={item} />
        ))}
      </motion.div>

    </section>
  );
}