import { Metadata } from "next";
import { AdminAuthGuard } from "./_components/AdminAuthGuard";
import { AdminSidebar } from "./_components/AdminSidebar";

export const metadata: Metadata = {
  title: "Digifolks Admin Panel",
  description: "Digifolks B2B Content Management System",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy-base text-text-pure font-sans">
      <AdminAuthGuard>
        <div className="flex min-h-screen">
          <AdminSidebar />
          <main className="flex-1 pl-64 overflow-x-hidden min-h-screen bg-[#0A1628]">
            <div className="p-8 max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </AdminAuthGuard>
    </div>
  );
}
