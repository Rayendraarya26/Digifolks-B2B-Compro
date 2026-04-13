// Tipe data untuk pitch-deck scroll section
export interface PortfolioItem {
  id: string;
  client: string;
  projectType: string;
  headline: string;
  imageUrl: string; // Bisa diganti dengan 3D snapshot
  tags: string[];
}

export const portfolioData: PortfolioItem[] = [
  {
    id: "port-01",
    client: "Nova Wear",
    projectType: "E-Commerce",
    headline: "Redefining streetwear checkout flow.",
    imageUrl: "/assets/portfolio/nova-wear.webp",
    tags: ["Next.js", "WebGL", "Stripe"],
  },
  {
    id: "port-02",
    client: "MetaFit",
    projectType: "Web App",
    headline: "Gamified fitness tracking for the modern gym rat.",
    imageUrl: "/assets/portfolio/metafit.webp",
    tags: ["React", "Framer Motion", "Supabase"],
  }
];