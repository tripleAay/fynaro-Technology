"use client";

import MessageStats from "@/components/admin/messages/message-stats";
import MessageLayout from "@/components/admin/messages/message-layout";

export default function AdminMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-500">Messages</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
          Inbox & Project Requests
        </h1>
      </div>

      <MessageStats />
      <MessageLayout />
    </div>
  );
}