// Tipe data untuk pitch-deck scroll section
export interface PortfolioItem {
  id: string;
  client: string;
  title: string;
  projectType: string;
  headline: string;
  imageUrl: string; // Bisa diganti dengan 3D snapshot
  tags: string[];
  color: string;
  size: "large" | "normal" | "wide";
  challenge: string;
  solutions: string;
  industry: string;
  date: string;
  link: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: "port-2",
    client: "We Core",
    projectType: "Web App",
    headline: "Professional Agency Company Profile for We Core",
    imageUrl: "/Image/Portfolio/WeCoreCompro.png",
    tags: ["Next.js", "WebGL", "Stripe"],
    title: "WeCore Agency",
    color: "bg-pop-blue",
    size: "large",
    challenge: "Agensi membutuhkan platform profesional yang mampu mengonversi pengunjung menjadi klien melalui performa yang cepat.",
    solutions: "Kami menerapkan strategi UI/UX berorientasi konversi dengan optimasi teknis pada kecepatan akses dan struktur konten. Fokus utamanya adalah mempermudah navigasi bagi calon klien serta meningkatkan visibilitas di mesin pencari. Hasilnya adalah website profesional yang berfungsi sebagai alat pemasaran aktif untuk mengubah traffic menjadi lead bisnis potensial.",
    industry: "Creative Agency",
    date: "Januari 2026",
    link: "https://wecoreofficial.com"
  },
  {
    id: "port-1",
    client: "Bapak Arya",
    projectType: "Web App",
    headline: "Digital Tourism Catalog & Management Platform",
    imageUrl: "/Image/Portfolio/Homestay.png",
    tags: ["React", "Framer Motion", "Supabase"],
    title: "Tourism Catalog",
    color: "bg-pop-pink",
    size: "normal",
    challenge: "Pengelola akomodasi lokal di Yogyakarta membutuhkan platform digital terpusat yang profesional untuk memasarkan unit homestay secara luas tanpa ketergantungan penuh pada pihak ketiga yang memiliki biaya komisi tinggi.",
    solutions: "Kami mengembangkan platform katalog digital dengan fokus pada SEO lokal dan kemudahan navigasi pengguna. Sistem ini mengintegrasikan CMS kustom yang memungkinkan pengelola memperbarui detail unit, fasilitas, dan harga secara real-time. Arsitektur web dirancang ringan dan responsif untuk memastikan akses cepat bagi wisatawan yang mencari penginapan.",
    industry: "Tourism Agency",
    date: "Unknown",
    link: "https://wecoreofficial.com"
  },
  {
    id: "port-4",
    client: "Tambak Udang",
    projectType: "Web App",
    headline: "Smart Aquaculture Decision Support System",
    imageUrl: "/Image/Portfolio/TambakUdang.png",
    tags: ["React", "Framer Motion", "Supabase"],
    title: "Tambak Udang di Balik Batu",
    color: "bg-pop-pink",
    size: "normal",
    challenge: "Petani tambak udang sering menghadapi risiko kegagalan panen akibat parameter kualitas air yang tidak terukur secara real-time dan sulitnya melakukan prediksi pertumbuhan yang akurat tanpa data yang bersih dari pencilan (outliers).",
    solutions: "Kami membangun ekosistem digital komprehensif yang mendigitalkan seluruh siklus operasional tambak, mulai dari manajemen pakan harian hingga pemantauan kualitas air pagi dan sore secara real-time. Kami membangun dan mengintegrasikan Nexus AI yang berfungsi menganalisis hubungan multidimensi antara variabel lingkungan dan pertumbuhan udang untuk memberikan saran manajerial yang presisi. Sistem ini juga dilengkapi manajemen inventaris atomik untuk mencegah race condition stok serta dasbor pemantauan risiko otomatis, memastikan efisiensi operasional dan stabilitas biologis di setiap siklus budidaya.",
    industry: "Aquaculture",
    date: "On Going",
    link: "https://wecoreofficial.com"
  },
  {
    id: "port-3",
    client: "Positive Strength",
    projectType: "Web App",
    headline: "Scalable Business Website for Positive Strength",
    imageUrl: "/Image/Portfolio/PositiveStrength.png",
    tags: ["React", "Framer Motion", "Supabase"],
    title: "Positive Strength Gym Catalog",
    color: "bg-pop-green",
    size: "wide",
    challenge: "Klien membutuhkan platform digital yang siap mendukung pertumbuhan bisnis penyedia alat gym tanpa hambatan teknis saat trafik meningkat.",
    solutions: "Kami membangun infrastruktur web dengan arsitektur scalable dan CMS fleksibel. Sistem ini memungkinkan pengelolaan katalog produk secara mandiri serta memastikan platform tetap stabil saat trafik meningkat. Desain dirancang untuk mendukung ekspansi fitur di masa depan tanpa perlu membangun ulang sistem dari nol, menjamin efisiensi bisnis jangka panjang.",
    industry: "Fitness",
    date: "November 2025",
    link: "https://wecoreofficial.com"
  },
  {
    id: "port-5",
    client: "TMMIN",
    projectType: "Web App",
    headline: "Web-Based App Digital Assessment for Prospective Client",
    imageUrl: "/Image/Portfolio/TMMIN.png",
    tags: ["React", "Framer Motion", "Supabase"],
    title: "TMMIN Digital Assessment",
    color: "bg-pop-pink",
    size: "normal",
    challenge: "Proses evaluasi karyawan yang masih manual memakan waktu lama dan menghasilkan data yang sulit diukur secara objektif.",
    solutions: "Kami mengembangkan aplikasi penilaian berbasis web yang mendigitalkan siklus evaluasi karyawan. Mencakup manajemen bank soal, penilaian otomatis, dan dashboard analitik real-time. Solusi ini menghilangkan hambatan administratif manual, meningkatkan akurasi data, serta mempercepat proses pengambilan keputusan bagi manajemen secara objektif.",
    industry: "Human Resources",
    date: "Unknown",
    link: "https://wecoreofficial.com"
  },
  {
    id: "port-6",
    client: "Malaka Project",
    projectType: "Web App",
    headline: "Integrated Learning Platform for Prospective Client",
    imageUrl: "/Image/Portfolio/Malaka.png",
    tags: ["React", "Framer Motion", "Supabase"],
    title: "Malaka Learning Ecosystem",
    color: "bg-pop-pink",
    size: "normal",
    challenge: "Kebutuhan akan ekosistem pendidikan digital yang seringkali terpecah antara materi, manajemen kelas, dan sistem ujian.",
    solutions: "Kami membangun ekosistem digital terintegrasi yang menyatukan modul streaming video, manajemen kelas, dan sistem asesmen dalam satu pintu. Dengan mengonsolidasikan seluruh pengalaman belajar, kami memastikan user journey yang mulus dari pendaftaran hingga evaluasi akhir. Sistem dirancang terpusat untuk mempermudah kontrol operasional dan meningkatkan engagement pengguna.",
    industry: "Education",
    date: "Unknown",
    link: "https://wecoreofficial.com"
  },
  {
    id: "port-7",
    client: "Personal Project",
    projectType: "Web App",
    headline: "Modern & Scalable Admin Dashboard for Scalable Web Apps",
    imageUrl: "/Image/Portfolio/AdminTemplate.png",
    tags: ["Next.js", "Tailwind CSS", "Zustand", "Radix UI", "Recharts"],
    title: "Admin Dashboard Template",
    color: "bg-pop-green",
    size: "wide",
    challenge: "Banyak template dashboard yang ada di pasaran memiliki desain yang ketinggalan zaman, sulit dikustomisasi, dan tidak dioptimalkan untuk performa serta skalabilitas jangka panjang.",
    solutions: "Kami merancang template dashboard modern dengan fokus pada desain yang bersih, modularitas tinggi, dan performa optimal. Template ini dibangun dengan arsitektur komponen yang memungkinkan pengembang untuk dengan mudah menyesuaikan dan memperluas fungsionalitas sesuai kebutuhan proyek mereka. Dengan menggunakan teknologi terbaru, kami memastikan bahwa template ini tidak hanya estetis tetapi juga siap untuk menangani beban kerja yang kompleks dan skalabilitas di masa depan.",
    industry: "Software Development",
    date: "Unknown",
    link: "https://wecoreofficial.com"
  },
  {
    id: "port-8",
    client: "Personal Project",
    projectType: "AI & System",
    headline: "Precision Basketball Analytics & Performance Tracking",
    imageUrl: "/Image/Portfolio/CourtVision.png",
    tags: ["Python", "Yolo V8", "Next.js"],
    title: "CourtVision Analytics",
    color: "bg-pop-blue",
    size: "large",
    challenge: "Analisis performa pemain bola basket yang masih bergantung pada metode manual dan subjektif, sehingga sulit untuk mendapatkan wawasan yang akurat dan real-time selama pertandingan.",
    solutions: "Kami mengembangkan sistem analitik bola basket berbasis AI yang menggunakan teknologi computer vision untuk melacak pergerakan pemain, pola permainan, dan statistik performa secara real-time. Sistem ini memberikan wawasan mendalam tentang kekuatan dan kelemahan pemain, serta membantu pelatih dalam membuat keputusan strategis selama pertandingan. Dengan mengotomatiskan proses analisis, kami memastikan bahwa data yang dihasilkan akurat, objektif, dan dapat diakses dengan mudah untuk meningkatkan performa tim.",
    industry: "Sports Analytics",
    date: "Juni 2025",
    link: "https://wecoreofficial.com"
  },
  {
    id: "port-9",
    client: "Personal Project",
    projectType: "E-Commerce",
    headline: "High-Performance E-commerce Solution for Modern Brands",
    imageUrl: "/Image/Portfolio/AsyuraShop.png",
    tags: ["Golang", "Kubernetes", "Elastic Search", "Next.js"],
    title: "AsyuraShop",
    color: "bg-pop-blue",
    size: "large",
    challenge: "Banyak platform e-commerce yang ada saat ini mengalami masalah performa, skalabilitas, dan keterbatasan fitur yang menghambat pertumbuhan bisnis modern.",
    solutions: "Kami membangun solusi e-commerce high-performance yang dirancang untuk memenuhi kebutuhan bisnis modern. Dengan menggunakan teknologi terbaru seperti Golang untuk backend yang cepat, Kubernetes untuk skalabilitas otomatis, dan Elastic Search untuk pencarian produk yang efisien, kami menciptakan platform yang tidak hanya cepat tetapi juga mampu menangani lonjakan trafik dengan mulus. Desain modular memungkinkan penyesuaian fitur sesuai kebutuhan bisnis, memastikan bahwa platform ini dapat tumbuh bersama bisnis Anda tanpa hambatan teknis.",
    industry: "Software Development",
    date: "Unknown",
    link: "https://wecoreofficial.com"
  }
];