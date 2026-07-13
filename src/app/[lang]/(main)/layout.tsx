import { Footer } from "@/components/ui/Footer";
import { getDictionary } from "@/lib/dictionaries";

export default async function MainLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }> | { lang: string };
}) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  const dict = await getDictionary(lang as 'en' | 'id');

  return (
    <>
      <main className="relative min-h-screen w-full">{children}</main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
