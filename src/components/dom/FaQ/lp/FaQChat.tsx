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
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleClick = () => {
    // Kalau belum buka sama sekali, jalankan animasi ngetik dulu
    if (!isOpen && !isTyping) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setIsOpen(true);
      }, 1500); // 1.5 Detik efek "Someone is typing..."
    } 
    // Kalau udah buka dan diklik lagi, tutup aja
    else if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      
      {/* 1. PERTANYAAN (KIRI) */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex w-11/12 max-w-xl flex-col items-start justify-center rounded-[2rem] rounded-bl-none border-4 border-text-primary bg-surface-light p-5 text-left shadow-playful transition-all hover:shadow-[8px_8px_0_var(--color-text-primary)] sm:p-6"
      >
        <p className="font-display text-lg font-black leading-tight text-text-primary sm:text-xl">
          {item.question}
        </p>
        <p className="mt-2 text-xs font-bold uppercase tracking-widest text-text-primary opacity-50 transition-opacity group-hover:opacity-100">
          {!isOpen && !isTyping ? "Tap to view reply" : "Tap to close"}
        </p>
      </motion.button>

      {/* 2. JAWABAN ATAU TYPING INDICATOR (KANAN) */}
      <AnimatePresence mode="wait">
        
        {/* A. Typing Indicator */}
        {isTyping && (
          <motion.div
            key="typing"
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`ml-auto flex w-fit items-center justify-center rounded-[2rem] rounded-br-none border-4 border-text-primary ${item.color} px-6 py-5 shadow-playful`}
          >
            <div className="flex gap-2">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0 }} className="h-3 w-3 rounded-full bg-text-primary" />
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.15 }} className="h-3 w-3 rounded-full bg-text-primary" />
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.3 }} className="h-3 w-3 rounded-full bg-text-primary" />
            </div>
          </motion.div>
        )}

        {/* B. Jawaban Asli */}
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, scale: 0.8, x: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`ml-auto w-11/12 max-w-xl rounded-[2rem] rounded-br-none border-4 border-text-primary ${item.color} p-5 text-left shadow-playful sm:p-6`}
          >
            <p className="font-bold leading-relaxed text-text-primary sm:text-lg">
              {item.answer}
            </p>
            <p className="mt-3 text-right text-[10px] font-black uppercase tracking-widest text-text-primary opacity-60">
              Read &bull; Just now
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
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
      <div className="relative w-full max-w-3xl flex-col flex gap-8 rounded-[3rem] border-4 border-text-primary bg-surface-light/5 p-6 backdrop-blur-sm sm:gap-10 sm:p-10 desktop:p-12">
        {FAQ_DATA.map((item) => (
          <ChatItem key={item.id} item={item} />
        ))}
      </div>

    </section>
  );
}