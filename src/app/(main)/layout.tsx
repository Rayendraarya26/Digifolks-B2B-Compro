import { Footer } from "@/components/ui/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="relative min-h-screen w-full">{children}</main>
      <Footer />
    </>
  );
}
