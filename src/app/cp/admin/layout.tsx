import { ReactNode } from "react";
import AdminHeader from "@/components/admin/dashboard/adminHeader";
import AdminSidebar from "@/components/admin/dashboard/adminSidebar";
import AdminStats from "@/components/admin/dashboard/admin-stats";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <AdminHeader />
      <AdminSidebar />

      <main className="ml-[220px] min-w-0 p-6 pt-[80px]">
        {/*                                    ^^^^^^^^^^  */}
        {/* Add top padding to push content below the fixed header (64px + breathing room) */}
        <AdminStats />
       
      </main>
    </div>
  );
}