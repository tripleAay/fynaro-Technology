import {
  redirect,
} from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

import {
  getAdminSession,
} from "@/lib/admin/getAdminSession";

const ALLOWED_ADMIN_ROLES =
  new Set([
    "owner",
    "admin",
    "project_manager",
    "finance",
    "support",
  ]);

export default async function AdminLayout({
  children,
}: Readonly<{
  children:
    React.ReactNode;
}>) {
  const session =
    await getAdminSession();

if (!session) {
  redirect(
    "/auth/login?next=/admin"
  );
}

  if (
    !ALLOWED_ADMIN_ROLES.has(
      session.profile.role
    )
  ) {
    redirect("/shop");
  }

  return (
    <div className="min-h-screen bg-[#f4f4ef] text-[#111111]">
      <AdminSidebar />

      <div className="lg:pl-[272px]">
        <AdminTopbar
          name={
            session.profile
              .fullName ||
            session.user
              .fullName ||
            "Fynaro Admin"
          }
          role={
            session.profile
              .role
          }
        />

        <main className="px-5 py-7 sm:px-7 lg:px-9 lg:py-9">
          {children}
        </main>
      </div>
    </div>
  );
}