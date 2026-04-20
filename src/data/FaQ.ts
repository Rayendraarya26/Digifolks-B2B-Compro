// Tipe data untuk FaQ (Frequently Asked Questions)
export interface FaQItem {
  id: string;
  question: string;
  answer: string;
  color: string;
}

export const faQData: FaQItem[] = [
  {
    id: "1",
    question: "Bro, berapa lama biasanya bikin website kayak gini?",
    answer: "Tergantung seberapa liar idemu! Biasanya 2-4 minggu buat hasil yang mind-blowing dan pixel-perfect. Kita nggak main template soalnya 🚀",
    color: "bg-pop-pink",
  },
  {
    id: "2",
    question: "Bisa handle backend sama database sekalian nggak?",
    answer: "Aman bro! Kita fullstack. Dari UI/UX yang sexy sampai arsitektur database yang tahan banting (PostgreSQL, Go, Node.js), kita libas semua.",
    color: "bg-pop-blue",
  },
  {
    id: "3",
    question: "Kalau project udah kelar, dapet support maintenance?",
    answer: "Pasti dong. Bug fixing, minor updates, atau sekadar nanya-nanya teknis tetep kita kawal. We build partnerships, not just websites.",
    color: "bg-pop-yellow",
  },
  {
    id: "4",
    question: "Harganya gimana nih? Bikin kantong jebol nggak?",
    answer: "Harga kita sebanding sama impact yang lu dapet. Kita bisa sesuaikan scope project sama budget lu kok. Hit us up on the contact form to discuss!",
    color: "bg-pop-green",
  },
];