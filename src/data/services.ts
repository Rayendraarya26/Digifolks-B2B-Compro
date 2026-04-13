export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  accentColor: string; 
  imageUrl: string; // Menggunakan 2D High-Res Render (PNG/WEBP transparan)
}

export const servicesData: ServiceItem[] = [
  {
    id: "svc-ai",
    title: "Artificial Intelligence",
    shortDesc: "Smarter systems. Automated workflows. AI that actually works.",
    accentColor: "#FF90E8", 
    imageUrl: "/assets/services/render-ai.webp", 
  },
  {
    id: "svc-mgmt",
    title: "Management System",
    shortDesc: "Streamline operations with custom ERPs and dashboards.",
    accentColor: "#90E0EF",
    imageUrl: "/assets/services/render-mgmt.webp",
  },
  {
    id: "svc-web",
    title: "Web Platforms",
    shortDesc: "High-conversion web apps built on Next.js.",
    accentColor: "#FFEA00",
    imageUrl: "/assets/services/render-web.webp",
  },
  {
    id: "svc-apps",
    title: "iOS, Android, Desktop",
    shortDesc: "Native performance. Cross-platform agility.",
    accentColor: "#B9FBC0",
    imageUrl: "/assets/services/render-apps.webp",
  },
  {
    id: "svc-it",
    title: "IT Solution & Consulting",
    shortDesc: "Architecting scalable infrastructure for the future.",
    accentColor: "#CDB4DB",
    imageUrl: "/assets/services/render-it.webp",
  }
];