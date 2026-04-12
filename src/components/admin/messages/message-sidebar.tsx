"use client";

type MessageItem = {
  id: string;
  name: string;
  subject: string;
  preview: string;
  type: "Inbox" | "Project Request";
  time: string;
  unread?: boolean;
};

type MessageSidebarProps = {
  conversations: MessageItem[];
  activeId: string;
  onSelect: (id: string) => void;
};

export default function MessageSidebar({
  conversations,
  activeId,
  onSelect,
}: MessageSidebarProps) {
  return (
    <aside className="h-full rounded-2xl border border-black/5 bg-white shadow-sm">
      <div className="border-b border-black/5 px-4 py-4">
        <p className="text-sm font-medium text-slate-500">Inbox</p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">
          Messages & Requests
        </h2>
      </div>

      <div className="max-h-[620px] overflow-y-auto p-3">
        <div className="space-y-2">
          {conversations.map((item) => {
            const isActive = item.id === activeId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  isActive
                    ? "border-[#d6cc6d]/30 bg-[#d6cc6d]/10"
                    : "border-transparent bg-slate-50 hover:border-black/5 hover:bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-sm font-semibold text-slate-900">
                        {item.name}
                      </h3>
                      {item.unread && (
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      )}
                    </div>

                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                      {item.type}
                    </p>

                    <p className="mt-2 truncate text-sm font-medium text-slate-700">
                      {item.subject}
                    </p>

                    <p className="mt-1 truncate text-sm text-slate-500">
                      {item.preview}
                    </p>
                  </div>

                  <span className="shrink-0 text-xs text-slate-400">
                    {item.time}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}