export interface ServiceItem {
  id: string;
  num: number; // Untuk urutan dan animasi
  title: string;
  shortDesc: string;
  description: string; // Deskripsi lengkap untuk halaman detail
  features: string[]; // Fitur utama yang ditonjolkan
  theme: {
    bg: string; // Warna latar belakang utama untuk kartu
    text: string; // Warna teks utama untuk kartu
  }
  techStack: string[]; // Teknologi yang digunakan, untuk ditampilkan di detail
  iconUrl: string; // Menggunakan 2D High-Res Render (PNG/WEBP transparan)
  iconLPUrl: string[];
  imageUrl: string; // Gambar besar untuk halaman detail (bisa berupa render atau mockup)
}

export const servicesData: ServiceItem[] = [
  {
    id: "svc-ai",
    num: 1,
    title: "Artificial Intelligence",
    shortDesc: "AI-powered systems for automation, prediction, and data-driven decision making.",
    description: "We don't just code AI. We birth digital brains that learn, adapt, and outsmart humans. From chatbots that roast you to predictive models that know you better than your mom.",
    features: ["Machine Learning Models", "NLP & Chatbots", "Predictive Analytics", "Computer Vision"],
    theme: { bg: "bg-pop-pink", text: "text-pop-pink" },
    techStack: ["Python", "TensorFlow", "PyTorch", "OpenAI"],
    iconUrl: "/assets/services/icon-ai.png",
    iconLPUrl: [
      "/Image/Service/LP/Utek2.webp",
      "/Image/Service/LP/TestCube.webp",
      "/Image/Service/LP/TestCube.webp"
    ],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop"
  },
  {
    id: "svc-mgmt",
    num: 2,
    title: "Management System",
    shortDesc: "Custom operational systems to streamline workflows and centralize business processes.",
    description: "ERP, CRM, DMS - whatever you call it, we make it sexy. Dashboards that pop, workflows that flow, and data that dances. Your business, but make it Gen Z.",
    features: ["Custom ERP Solutions", "Real-time Dashboards", "Automated Workflows", "Data Visualization"],
    theme: { bg: "bg-pop-blue", text: "text-pop-blue" },
    techStack: ["React", "Node.js", "PostgreSQL", "Docker"],
    iconUrl: "/assets/services/icon-mgmt.png",
    iconLPUrl: [
      "/Image/Service/LP/TestServer.webp",
      "/Image/Service/LP/TestServer.webp",
      "/Image/Service/LP/TestServer.webp"
    ],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "svc-web",
    num: 3,
    title: "Web Platforms",
    shortDesc: "Scalable web systems built for performance, stability, and growth.",
    description: "Not just websites. Hyper-interactive playgrounds with WebGL, shaders, and animations that break the internet. Your web presence will go viral (the good kind).",
    features: ["Interactive 3D Web", "High-Performance SSR", "Scalable Architecture", "SEO Optimization"],
    theme: { bg: "bg-pop-yellow", text: "text-pop-yellow" },
    techStack: ["Next.js", "Tailwind v4", "Framer Motion", "Three.js"],
    iconUrl: "/assets/services/icon-web.png",
    iconLPUrl: [
      "/Image/Service/LP/TestLaptop.webp",
      "/Image/Service/LP/TestLaptop.webp",
      "/Image/Service/LP/TestLaptop.webp"
    ],
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
  },
  {
    id: "svc-apps",
    num: 4,
    title: "iOS, Android, Desktop",
    shortDesc: "Cross-platform applications designed for operational efficiency and usability.",
    description: "Android, iOS, Desktop - we build apps that feel native but look futuristic. Cross-platform sorcery with React Native, Flutter, and Electron. One codebase, infinite flex.",
    features: ["Cross-Platform Mobile", "Native Desktop Apps", "Offline Capabilities", "Hardware Integration"],
    theme: { bg: "bg-pop-green", text: "text-pop-green" },
    techStack: ["React Native", "Flutter", "Swift", "Electron"],
    iconUrl: "/assets/services/icon-apps.png",
    iconLPUrl: [
      "/Image/Service/LP/TestPhoneR.webp",
      "/Image/Service/LP/TestPhoneR.webp",
      "/Image/Service/LP/TestPhoneR.webp"
    ],
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "svc-it",
    num: 5,
    title: "IT Solution & Consulting",
    shortDesc: "System architecture planning and technical consulting for scalable infrastructure.",
    description: "Stuck in digital hell? We rescue you with custom solutions, cloud migration, and consulting that actually makes sense. Your IT nightmare becomes our playground.",
    features: ["Cloud Migration", "DevOps Setup", "Security Audits", "Tech Consultation"],
    theme: { bg: "bg-pop-purple", text: "text-pop-purple" },
    techStack: ["AWS", "Google Cloud", "Kubernetes", "Linux"],
    iconUrl: "/assets/services/icon-it.png",
    iconLPUrl: [
      "/Image/Service/LP/TestBulb.webp",
      "/Image/Service/LP/TestText1.webp",
      "/Image/Service/LP/TestText3.webp"
    ],
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
  }
];