"use client";

import AdminHeader from "@/components/admin/dashboard/adminHeader";
import AdminSidebar from "@/components/admin/dashboard/adminSidebar";
import MobileSideNav from "@/components/admin/dashboard/mobile-sidenav";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f6f7f8]">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 h-16 border-b bg-white">
        <AdminHeader />
      </header>

      {/* Mobile Nav */}
      <div className="fixed inset-x-0 top-16 z-40 md:hidden">
        <MobileSideNav />
      </div>

      {/* Body */}
      <div className="pt-16">
        <div className="flex min-h-[calc(100vh-64px)]">
          
          {/* Sidebar → 40% */}
          <aside className="hidden md:block w-[40%] border-r bg-white">
            <div className="h-full overflow-y-auto">
              <AdminSidebar />
            </div>
          </aside>

          {/* Content → 60% */}
          <main className="w-full md:w-[60%]">
            <div className="h-full overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}