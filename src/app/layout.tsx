import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
// import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import Preloader from "@/components/loader/Preloader";
import TransitionProvider from "@/components/providers/TransitionProvider";

// Inisialisasi Font
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

// Metadata Global yang SEO Friendly
export const metadata: Metadata = {
  // authors: [{ name: "Digifolks", url: "https://www.digifolks.com" }],
  title: {
    default: "Digifolks | Scalable Operational Systems & Software Engineering",
    template: "Digifolks | %s",
  },
  description:
    "We build scalable operational systems that reduce complexity, improve reliability, and support long-term business growth. Based in Yogyakarta.",
  keywords: [
    "software house jogja",
    "scalable systems",
    "enterprise system development",
    "custom software indonesia",
    "operational system development",
    "ai systems indonesia",
  ],
  openGraph: {
    title: "Digifolks | Scalable Systems for Complex Businesses",
    description:
      "We design and develop operational systems that scale with your business. Built for reliability, efficiency, and long-term growth.",
    // url: "https://www.digifolks.com",
    siteName: "Digifolks",
    // images: [
    //   {
    //     url: "https://www.digifolks.com/og-image.png",
    //     width: 1200,
    //     height: 630,
    //     alt: "Digifolks Open Graph Image",
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digifolks | Engineering Scalable Systems",
    description:
      "Operational systems built for growth, stability, and efficiency.",
    // images: ["https://www.digifolks.com/twitter-card.png"],
  },
  icons: {
    icon: [
      { url: '/Dih.webp' },
      { url: '/Dih.webp', media: '(prefers-color-scheme: dark)' },
    ],
    apple: "/Dih.webp", // Biasanya ukuran 180x180 px
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  // verification: {
  //   google: "y3-gFYtJ7QEsJVPPgUG7IyCTUuknHNZ4zTxWjX8fEa8",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased selection:bg-pop-yellow selection:text-text-primary">
        <Preloader />
        {/* <SmoothScrollProvider> */}
        <TransitionProvider />
        {children}
        {/* </SmoothScrollProvider> */}
      </body>
    </html>
  );
}
