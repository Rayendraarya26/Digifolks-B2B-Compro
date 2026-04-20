import FloatingDock from "@/components/dom/FloatingDock";
import Footer from "@/components/dom/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="relative min-h-screen w-full">{children}</main>
      <FloatingDock />
      <Footer />
    </>
  );
}
