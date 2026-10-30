import { notFound } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { getDictionary, hasLocale } from "@/lib/dictionaries";

export default async function MainLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }> | { lang: string };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang;

  if (!lang || !hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  return (
    <>
      <Navbar dict={dict.navbar} lang={lang} />
      <main className="relative min-h-screen w-full">{children}</main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
