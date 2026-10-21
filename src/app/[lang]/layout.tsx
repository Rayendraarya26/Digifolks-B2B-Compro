import type { Metadata, Viewport } from "next";
import Script from "next/script";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://digifolks.id";

// Metadata Global yang SEO Friendly
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  authors: [{ name: "Digifolks", url: siteUrl }],
  title: {
    default: "Digifolks | Scalable Operational Systems & Software Engineering House",
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
    "b2b technology partner",
  ],
  openGraph: {
    title: "Digifolks | Scalable Operational Systems & Software Engineering House",
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

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${siteUrl}/#organization`,
        "name": "Digifolks",
        "legalName": "Digifolks Technology",
        "url": siteUrl,
        "logo": `${siteUrl}/Digifolks-Logo.png`,
        "image": `${siteUrl}/Dih.webp`,
        "description": lang === 'id'
          ? "Software engineering house dan B2B technology partner di Yogyakarta. Merancang dan membangun sistem operasional berskala tinggi (custom ERP, POS, microservices, dan otomasi AI)."
          : "Software engineering house & B2B technology partner based in Yogyakarta, Indonesia. Engineering scalable operational systems, custom ERP, POS, and AI workflows.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Yogyakarta",
          "addressRegion": "D.I. Yogyakarta",
          "addressCountry": "ID",
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+62-858-1441-2099",
            "contactType": "customer service",
            "email": "marketing@digifolks.id",
            "availableLanguage": ["Indonesian", "English"],
          },
          {
            "@type": "ContactPoint",
            "telephone": "+62-895-4010-88270",
            "contactType": "sales",
            "email": "digifolkstech@gmail.com",
            "availableLanguage": ["Indonesian", "English"],
          },
        ],
        "sameAs": [
          "https://id.linkedin.com/company/digifolks-id",
          "https://github.com/Rayendraarya26",
        ],
        "areaServed": "ID",
        "knowsLanguage": ["en", "id"],
        "serviceType": [
          "Custom Management Systems & ERP",
          "Point of Sale (POS) Systems",
          "High-Concurrency Microservices",
          "Artificial Intelligence Solutions",
          "High-Performance Web Platforms",
          "IT Architecture Consulting",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Digifolks",
        "description": "Build Scalable Operational Systems",
        "publisher": {
          "@id": `${siteUrl}/#organization`,
        },
        "inLanguage": ["en", "id"],
      },
    ],
  };

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NFN287D3";

  return (
    <html lang={lang} className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-navy-base text-text-off-white flex flex-col min-h-screen">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
        {/* End Google Tag Manager */}

        <JsonLd data={structuredData} />
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
