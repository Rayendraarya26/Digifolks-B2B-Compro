import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";
// import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import Preloader from "@/components/loader/Preloader";
import TransitionProvider from "@/components/providers/TransitionProvider";
import { Navbar } from "@/components/ui/Navbar";
import { getDictionary } from "@/lib/dictionaries";
import { JsonLd } from "@/components/seo/JsonLd";

// Inisialisasi Font
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digifolks.id";

// Metadata Global yang SEO Friendly
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  authors: [{ name: "Digifolks", url: siteUrl }],
  title: {
    default: "Digifolks | Scalable Systems & Software Engineering",
    template: "%s | Digifolks",
  },
  description:
    "We build scalable operational systems that reduce complexity, improve reliability, and accelerate business growth. Based in Yogyakarta.",
  keywords: [
    "software house jogja",
    "scalable systems",
    "enterprise system development",
    "custom software indonesia",
    "operational system development",
    "ai systems indonesia",
  ],
  openGraph: {
    title: "Digifolks | Scalable Systems & Software Engineering",
    description:
      "We design and develop scalable operational systems that reduce complexity, improve reliability, and accelerate business growth.",
    url: siteUrl,
    siteName: "Digifolks",
    images: [
      {
        url: "/Dih.webp",
        width: 1200,
        height: 630,
        alt: "Digifolks Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digifolks | Engineering Scalable Systems",
    description:
      "Operational systems built for growth, stability, and efficiency.",
    images: ["/Dih.webp"],
  },
  icons: {
    icon: [
      { url: '/Dih.webp' },
      { url: '/Dih.webp', media: '(prefers-color-scheme: dark)' },
    ],
    apple: "/Dih.webp",
  },
  // verification: {
  //   google: "y3-gFYtJ7QEsJVPPgUG7IyCTUuknHNZ4zTxWjX8fEa8",
  // },
};


export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }> | { lang: string };
}>) {
  // Resolve params if it's a promise (Next.js 15+ best practice)
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';

  const dict = await getDictionary(lang as 'en' | 'id');

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Digifolks",
    "url": siteUrl,
    "logo": `${siteUrl}/Dih.webp`,
    "image": `${siteUrl}/Dih.webp`,
    "description": lang === 'id'
      ? "Software house dan partner rekayasa perangkat lunak enterprise. Layanan sistem operasional, solusi AI, platform web, dan aplikasi mobile."
      : "Software engineering house & B2B technology partner. Enterprise operational systems, AI solutions, web platforms, and mobile apps.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Yogyakarta",
      "addressCountry": "ID",
    },
    "areaServed": "ID",
    "knowsLanguage": ["en", "id"],
    "serviceType": [
      "Custom Software Development",
      "Artificial Intelligence Solutions",
      "Enterprise System Development",
      "IT Consulting",
    ],
  };

  return (
    <html lang={lang} className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-navy-base text-text-off-white flex flex-col min-h-screen">
        <JsonLd data={orgSchema} />
        <Preloader />
        {/* <SmoothScrollProvider> */}
        <TransitionProvider />
        <main className="flex-1">
          {children}
        </main>
        {/* </SmoothScrollProvider> */}
      </body>
    </html>
  );
}
