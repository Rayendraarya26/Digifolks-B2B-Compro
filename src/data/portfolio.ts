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
  requirements: string;
  solutions: string;
  industry: string;
  date: string;
  link: string;
  showcaseImages: string[];
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
    challenge: "Agencies often struggle with low conversion rates due to static, slow-loading websites that fail to capture professional credibility, causing potential clients to lose interest before engaging with the content.", // [cite: 35]
    requirements: "A high-performance digital presence with a seamless User Experience (UX) and an intuitive information architecture designed to build trust and maximize search engine discoverability.", // [cite: 37]
    solutions: "We implemented a conversion-oriented UI/UX strategy combined with technical optimizations for page speed and content architecture. Our primary focus was streamlining navigation for prospective clients and boosting search engine visibility. The result is a professional website that serves as an active marketing tool, effectively transforming traffic into high-potential business leads.", // [cite: 39, 40, 41, 42]
    industry: "Creative Agency",
    date: "Januari 2026",
    link: "https://wecoreofficial.com",
    showcaseImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar (Full)
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kiri)
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kanan)
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar lagi (Full)
    ],
  },
  {
    id: "port-7",
    client: "Homestay di jogja",
    projectType: "Web App",
    headline: "Digital Tourism Catalog & Management Platform",
    imageUrl: "/Image/Portfolio/Homestay.png",
    tags: ["React", "Framer Motion", "Supabase"],
    title: "Tourism Catalog",
    color: "bg-pop-pink",
    size: "normal",
    challenge: "Local accommodation providers in Yogyakarta often lack a centralized digital presence, forcing them to rely heavily on third-party booking platforms with high commission fees that erode their profit margins.", // [cite: 48]
    requirements: "An independent, informative catalog system with seamless navigation for travelers and a robust backend infrastructure that allows managers to maintain full control over their property content.", // [cite: 50]
    solutions: "We developed a high-performance digital catalog focused on local SEO and user-centric navigation. The system integrates a custom CMS, enabling real-time updates for unit details, amenities, and pricing. Built with a lightweight and responsive architecture, the platform ensures rapid access for travelers, serving as a powerful alternative to third-party dependencies.", // [cite: 52, 53, 54]
    industry: "Tourism Agency",
    date: "Unknown",
    link: "https://wecoreofficial.com",
    showcaseImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar (Full)
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kiri)
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kanan)
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar lagi (Full)
    ],
  },
  {
    id: "port-4",
    client: "PT Kawan Kita Semua",
    projectType: "Web App",
    headline: "Smart Aquaculture Decision Support System",
    imageUrl: "/Image/Portfolio/TambakUdang.png",
    tags: ["React", "Framer Motion", "Supabase"],
    title: "Smart Aquaculture System",
    color: "bg-pop-pink",
    size: "normal",
    challenge: "Shrimp farmers face significant risks of harvest failure due to unmonitored water quality parameters and the difficulty of generating accurate growth predictions from data often skewed by outliers.", // [cite: 61]
    requirements: "A centralized digital command center capable of integrating daily operational data such as feed, water quality, and sampling-with Artificial Intelligence to provide early environmental risk detection and cultivation strategy optimization.", // [cite: 63]
    solutions: "We engineered a comprehensive digital ecosystem that digitizes the entire shrimp farming lifecycle, featuring real-time water quality monitoring and automated daily feed management. At its core, we integrated AI to analyze multidimensional relationships between environmental variables and shrimp biomass, delivering high-precision managerial insights. The system is fortified with atomic inventory management to prevent race conditions and an automated risk dashboard, ensuring operational efficiency and biological stability throughout every cultivation cycle.", // [cite: 65, 66, 67]
    industry: "Aquaculture",
    date: "On Going",
    link: "https://wecoreofficial.com",
    showcaseImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar (Full)
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kiri)
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kanan)
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar lagi (Full)
    ],
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
    challenge: "Gym equipment suppliers often encounter critical technical bottlenecks and site crashes during high-traffic growth phases, leading to lost sales opportunities and a degraded brand reputation.", // [cite: 76]
    requirements: "A future-proof digital foundation that offers seamless product catalog management and the elastic capacity to handle expanding market reach without compromising performance.", // [cite: 78]
    solutions: "We engineered a robust web infrastructure utilizing a scalable architecture and a flexible CMS. This system empowers the client with autonomous catalog control while ensuring consistent platform stability during traffic surges. By prioritizing a modular design, we ensured that future feature expansions can be integrated seamlessly without rebuilding the core system, securing long-term operational efficiency.", // [cite: 80, 81, 82]
    industry: "Fitness",
    date: "November 2025",
    link: "https://wecoreofficial.com",
    showcaseImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar (Full)
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kiri)
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kanan)
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar lagi (Full)
    ],
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
    challenge: "Traditional evaluation methods are often plagued by labor-intensive administration and inherent human bias, leading to inconsistent results and fragmented data that hinder objective performance tracking.", // [cite: 94]
    requirements: "A centralized, high-integrity assessment framework capable of automating complex scoring workflows while delivering real-time, data-driven insights to support critical organizational decisions.", // [cite: 96]
    solutions: "We developed a web-based assessment application designed to digitize the entire employee evaluation lifecycle. The platform integrates comprehensive question bank management, automated scoring, and real-time analytical dashboards. This solution eliminates manual administrative bottlenecks, enhances data integrity, and empowers management to make objective, data-driven decisions at an accelerated pace.", // [cite: 98]
    industry: "Human Resources",
    date: "Unknown",
    link: "https://wecoreofficial.com",
    showcaseImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar (Full)
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kiri)
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kanan)
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar lagi (Full)
    ],
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
    challenge: "Digital educational ecosystems are often fragmented, forcing users to navigate between disconnected platforms for course materials, classroom management, and examinations, which leads to a disjointed and frustrating learning experience.", // [cite: 102]
    requirements: "A unified, all-in-one digital environment that consolidates the entire educational lifecycle-from initial enrollment to final assessment-into a single, high-performance system.", // [cite: 104]
    solutions: "We engineered an integrated digital ecosystem that merges high-quality video streaming, classroom management, and assessment tools into a unified portal. By consolidating the full user journey, we ensured a seamless transition from registration to evaluation. The system is designed with a centralized architecture to simplify operational control while significantly driving user engagement and retention.", // [cite: 106, 107, 108]
    industry: "Education",
    date: "Unknown",
    link: "https://wecoreofficial.com",
    showcaseImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar (Full)
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kiri)
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kanan)
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar lagi (Full)
    ],
  },
  {
    id: "port-1",
    client: "Personal Project",
    projectType: "Web App",
    headline: "Modern & Scalable Admin Dashboard for Scalable Web Apps",
    imageUrl: "/Image/Portfolio/AdminTemplate.png",
    tags: ["Next.js", "Tailwind CSS", "Zustand", "Radix UI", "Recharts"],
    title: "Admin Dashboard Template",
    color: "bg-pop-green",
    size: "wide",
    challenge: "Banyak template dashboard yang ada di pasaran memiliki desain yang ketinggalan zaman, sulit dikustomisasi, dan tidak dioptimalkan untuk performa serta skalabilitas jangka panjang.",
    requirements: "Template dashboard modern yang mengutamakan desain bersih, modularitas tinggi, dan performa optimal untuk mendukung pengembangan aplikasi web yang kompleks.",
    solutions: "Kami merancang template dashboard modern dengan fokus pada desain yang bersih, modularitas tinggi, dan performa optimal. Template ini dibangun dengan arsitektur komponen yang memungkinkan pengembang untuk dengan mudah menyesuaikan dan memperluas fungsionalitas sesuai kebutuhan proyek mereka. Dengan menggunakan teknologi terbaru, kami memastikan bahwa template ini tidak hanya estetis tetapi juga siap untuk menangani beban kerja yang kompleks dan skalabilitas di masa depan.",
    industry: "Software Development",
    date: "Unknown",
    link: "https://wecoreofficial.com",
    showcaseImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar (Full)
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kiri)
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kanan)
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar lagi (Full)
    ],
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
    requirements: "Sistem analitik yang mampu memberikan wawasan mendalam tentang performa pemain dan strategi permainan secara real-time.",
    solutions: "Kami mengembangkan sistem analitik bola basket berbasis AI yang menggunakan teknologi computer vision untuk melacak pergerakan pemain, pola permainan, dan statistik performa secara real-time. Sistem ini memberikan wawasan mendalam tentang kekuatan dan kelemahan pemain, serta membantu pelatih dalam membuat keputusan strategis selama pertandingan. Dengan mengotomatiskan proses analisis, kami memastikan bahwa data yang dihasilkan akurat, objektif, dan dapat diakses dengan mudah untuk meningkatkan performa tim.",
    industry: "Sports Analytics",
    date: "Juni 2025",
    link: "https://wecoreofficial.com",
    showcaseImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar (Full)
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kiri)
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kanan)
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar lagi (Full)
    ],
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
    requirements: "Sistem e-commerce yang dirancang untuk performa tinggi, skalabilitas otomatis, dan fitur yang dapat disesuaikan untuk memenuhi kebutuhan bisnis yang terus berkembang.",
    solutions: "Kami membangun solusi e-commerce high-performance yang dirancang untuk memenuhi kebutuhan bisnis modern. Dengan menggunakan teknologi terbaru seperti Golang untuk backend yang cepat, Kubernetes untuk skalabilitas otomatis, dan Elastic Search untuk pencarian produk yang efisien, kami menciptakan platform yang tidak hanya cepat tetapi juga mampu menangani lonjakan trafik dengan mulus. Desain modular memungkinkan penyesuaian fitur sesuai kebutuhan bisnis, memastikan bahwa platform ini dapat tumbuh bersama bisnis Anda tanpa hambatan teknis.",
    industry: "Software Development",
    date: "Unknown",
    link: "https://wecoreofficial.com",
    showcaseImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar (Full)
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kiri)
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",  // Bakal jadi kecil (Kanan)
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80", // Bakal jadi besar lagi (Full)
    ],
  }
];