"use client";

import { useMemo, useState } from "react";
import MessageSidebar from "@/components/admin/messages/message-sidebar";
import MessageChatWindow from "@/components/admin/messages/message-chat-window";

const conversations = [
  {
    id: "1",
    name: "John Ade",
    email: "john@example.com",
    subject: "Brand identity inquiry",
    type: "Inbox" as const,
    preview: "I would like to know your pricing for branding...",
    time: "2m ago",
    unread: true,
    messages: [
      {
        id: "m1",
        sender: "client" as const,
        text: "Hello, I would like to know your pricing for branding and packaging design.",
        time: "10:02 AM",
      },
    ],
  },
  {
    id: "2",
    name: "Sarah Studio",
    email: "sarah@example.com",
    subject: "Website project request",
    type: "Project Request" as const,
    preview: "We need a premium website for our company...",
    time: "15m ago",
    unread: true,
    messages: [
      {
        id: "m2",
        sender: "client" as const,
        text: "We need a premium website for our company and would like to discuss timeline and cost.",
        time: "9:40 AM",
      },
      {
        id: "m3",
        sender: "admin" as const,
        text: "Thanks for reaching out. Please share your preferred features and reference sites.",
        time: "9:55 AM",
      },
    ],
  },
  {
    id: "3",
    name: "David Crown",
    email: "david@example.com",
    subject: "Print design service",
    type: "Inbox" as const,
    preview: "Can you help with a premium print design package?",
    time: "1h ago",
    messages: [
      {
        id: "m4",
        sender: "client" as const,
        text: "Can you help with a premium print design package?",
        time: "8:12 AM",
      },
    ],
  },
];

export default function MessageLayout() {
  const [activeId, setActiveId] = useState(conversations[0].id);

  const activeConversation = useMemo(
    () => conversations.find((item) => item.id === activeId),
    [activeId]
  );

  return (
    <section className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      <MessageSidebar
        conversations={conversations}
        activeId={activeId}
        onSelect={setActiveId}
      />

      <MessageChatWindow conversation={activeConversation} />
    </section>
  );
}