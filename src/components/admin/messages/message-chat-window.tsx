"use client";

import { useState } from "react";
import { Send, Paperclip } from "lucide-react";

type ChatMessage = {
  id: string;
  sender: "client" | "admin";
  text: string;
  time: string;
};

type Conversation = {
  id: string;
  name: string;
  email: string;
  subject: string;
  type: "Inbox" | "Project Request";
  messages: ChatMessage[];
};

type MessageChatWindowProps = {
  conversation: Conversation | undefined;
};

export default function MessageChatWindow({
  conversation,
}: MessageChatWindowProps) {
  const [reply, setReply] = useState("");

  if (!conversation) {
    return (
      <div className="flex h-full min-h-[620px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <div>
          <p className="text-sm text-slate-500">No conversation selected.</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">
            Select a message to view and reply
          </h3>
        </div>
      </div>
    );
  }

  const handleSend = () => {
    if (!reply.trim()) return;
    console.log("Reply sent:", reply);
    setReply("");
  };

  return (
    <section className="flex min-h-[620px] flex-col rounded-2xl border border-black/5 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-black/5 px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">
              {conversation.type}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">
              {conversation.name}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{conversation.email}</p>
          </div>

          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {conversation.subject}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
        {conversation.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "admin" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                message.sender === "admin"
                  ? "bg-[#d6cc6d]/20 text-slate-900"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              <p>{message.text}</p>
              <span className="mt-2 block text-[11px] text-slate-400">
                {message.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Reply box */}
      <div className="border-t border-black/5 p-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            rows={4}
            placeholder="Write your reply..."
            className="w-full resize-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />

          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Paperclip className="h-4 w-4" />
              Attach
            </button>

            <button
              type="button"
              onClick={handleSend}
              className="inline-flex items-center gap-2 rounded-xl bg-[#d6cc6d] px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:opacity-90"
            >
              <Send className="h-4 w-4" />
              Send Reply
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}