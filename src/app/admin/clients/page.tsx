export const dynamic = "force-dynamic";

export default function AdminClientsPage() {
  return (
    <main className="min-h-screen bg-neutral-50 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-neutral-200 bg-white p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">
            Fynaro Admin
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
            Clients
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
            Manage Fynaro clients, their accounts,
            projects, orders and activity.
          </p>

          <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-10 text-center">
            <p className="text-sm font-medium text-neutral-900">
              Client management is coming next.
            </p>

            <p className="mt-1 text-xs text-neutral-500">
              Your admin route is working correctly.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}