"use client";

import { Inbox, FolderKanban, MessageCircle, Clock3 } from "lucide-react";

const stats = [
  {
    label: "Total Inbox",
    value: 28,
    icon: Inbox,
  },
  {
    label: "Project Requests",
    value: 9,
    icon: FolderKanban,
  },
  {
    label: "Unread Messages",
    value: 6,
    icon: MessageCircle,
  },
  {
    label: "Pending Replies",
    value: 4,
    icon: Clock3,
  },
];

export default function MessageStats() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.label}
                </p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                  {item.value}
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d6cc6d]/15">
                <Icon className="h-5 w-5 text-[#8f8440]" />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}