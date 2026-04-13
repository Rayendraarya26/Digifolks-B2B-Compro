import type { Metadata } from "next";
// Menggunakan next/font untuk optimasi font agar tidak ada layout shift
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import FloatingDock from "@/components/dom/FloatingDock";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

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
  title: {
    template: "%s | Digifolks.id",
    default: "We Build Digital Experiences | Digifolks.id",
  },
  description: "Crafting hyper-interactive, scalable, and bold web applications for the next generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased selection:bg-pop-yellow selection:text-text-primary">
        {/* Main Content Area */}
        <SmoothScrollProvider>
          <main className="relative min-h-screen w-full">
            {children}
          </main>
        </SmoothScrollProvider>
        
        {/* Global Navigation diletakkan di luar struktur halaman agar persisten */}
        <FloatingDock />
      </body>
    </html>
  );
}