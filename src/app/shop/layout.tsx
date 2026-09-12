import {
  redirect,
} from "next/navigation";

import {
  getCurrentProfile,
} from "@/lib/fynaro/auth/current-profile";

import DashboardSidebar from "@/components/dashboard components/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard components/DashboardTopbar";

type ShopLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function ShopLayout({
  children,
}: ShopLayoutProps) {
  // ============================================================
  // AUTHENTICATED FYNARO PROFILE
  // ============================================================

  const profile =
    await getCurrentProfile();

  // ============================================================
  // PROTECT SHOP
  // ============================================================

  if (!profile) {
    redirect(
      "/auth/login"
    );
  }

  // ============================================================
  // DASHBOARD
  // ============================================================

  return (
    <div className="min-h-screen bg-white">
      <DashboardSidebar
        
      />

      <div className="min-h-screen lg:pl-[280px]">
        <DashboardTopbar
          profile={profile}
        />

        <main className="min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}