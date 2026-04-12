import AdminStats from "@/components/admin/dashboard/admin-stats";

export default function AdminPage() {
  return (
    <div className="space-y-8 ">
      <div className="pl-0 md:pl-8 lg:pl-12">
        <p className="text-sm font-medium text-slate-500">Welcome back</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>
      </div>

      <div className="pl-0 md:pl-8 lg:pl-12">
        <AdminStats />
      </div>
    </div>
  );
}