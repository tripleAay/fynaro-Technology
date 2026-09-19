import AdminMessagesInbox from "@/components/admin/messages/AdminMessagesInbox";

export const dynamic =
  "force-dynamic";

export default function AdminMessagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/35">
            Fynaro Admin
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
            Messages
          </h1>

          <p className="mt-2 text-sm leading-6 text-black/45">
            Manage client enquiries,
            support conversations and
            communication across Fynaro.
          </p>
        </div>
      </div>

      <AdminMessagesInbox />
    </div>
  );
}