"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCheck,
  FileText,
  MessageSquareText,
  Paperclip,
  Search,
  Send,
} from "lucide-react";
import { useMemo, useState } from "react";

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

type Message = {
  id: string;
  sender: "client" | "fynaro";
  text: string;
  time: string;
  read?: boolean;
};

type Conversation = {
  id: string;
  title: string;
  contextType: "Project" | "Proposal" | "Request" | "General";
  contextId?: string;
  contextHref?: string;
  lastMessage: string;
  updatedAt: string;
  unread: number;
  messages: Message[];
};

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const conversations: Conversation[] = [
  {
    id: "CONV-0042",
    title: "Marketplace Platform",
    contextType: "Project",
    contextId: "FYN-PRJ-0042",
    contextHref: "/shop/projects/FYN-PRJ-0042",
    lastMessage:
      "The latest dashboard direction is ready for your review.",
    updatedAt: "Today, 4:42 PM",
    unread: 2,
    messages: [
      {
        id: "MSG-001",
        sender: "fynaro",
        text: "We’ve completed the next dashboard direction for the marketplace platform.",
        time: "Today, 3:58 PM",
      },
      {
        id: "MSG-002",
        sender: "fynaro",
        text: "The latest dashboard direction is ready for your review.",
        time: "Today, 4:42 PM",
      },
    ],
  },
  {
    id: "CONV-0039",
    title: "NewJersey.ng Ecommerce",
    contextType: "Proposal",
    contextId: "PRP-0039",
    contextHref: "/shop/proposals/PRP-0039",
    lastMessage:
      "Your proposal has been prepared and is ready to review.",
    updatedAt: "Sep 10",
    unread: 0,
    messages: [
      {
        id: "MSG-003",
        sender: "fynaro",
        text: "Your ecommerce scope has been reviewed.",
        time: "Sep 10, 10:16 AM",
      },
      {
        id: "MSG-004",
        sender: "fynaro",
        text: "Your proposal has been prepared and is ready to review.",
        time: "Sep 10, 11:02 AM",
        read: true,
      },
    ],
  },
  {
    id: "CONV-0035",
    title: "Brand Identity Refresh",
    contextType: "Request",
    contextId: "FYN-0035",
    contextHref: "/shop/requests/FYN-0035",
    lastMessage:
      "Could you share the current logo files and brand references?",
    updatedAt: "Sep 9",
    unread: 1,
    messages: [
      {
        id: "MSG-005",
        sender: "fynaro",
        text: "Could you share the current logo files and brand references?",
        time: "Sep 9, 2:10 PM",
      },
    ],
  },
  {
    id: "CONV-GENERAL",
    title: "Fynaro Support",
    contextType: "General",
    lastMessage:
      "You can use this conversation for general workspace questions.",
    updatedAt: "Sep 7",
    unread: 0,
    messages: [
      {
        id: "MSG-006",
        sender: "fynaro",
        text: "You can use this conversation for general workspace questions.",
        time: "Sep 7, 9:30 AM",
        read: true,
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                    PAGE                                    */
/* -------------------------------------------------------------------------- */

export default function MessagesPage() {
  const [activeConversationId, setActiveConversationId] =
    useState(conversations[0]?.id ?? "");

  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");

  const [messageStore, setMessageStore] =
    useState<Conversation[]>(conversations);

  const filteredConversations = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return messageStore;
    }

    return messageStore.filter((conversation) => {
      return (
        conversation.title.toLowerCase().includes(query) ||
        conversation.contextType
          .toLowerCase()
          .includes(query) ||
        conversation.contextId
          ?.toLowerCase()
          .includes(query) ||
        conversation.lastMessage
          .toLowerCase()
          .includes(query)
      );
    });
  }, [search, messageStore]);

  const activeConversation =
    messageStore.find(
      (conversation) =>
        conversation.id === activeConversationId,
    ) ?? messageStore[0];

  function handleSelectConversation(
    conversationId: string,
  ) {
    setActiveConversationId(conversationId);

    setMessageStore((current) =>
      current.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              unread: 0,
            }
          : conversation,
      ),
    );
  }

  function handleSendMessage() {
    const message = draft.trim();

    if (!message || !activeConversation) {
      return;
    }

    const newMessage: Message = {
      id: `MSG-${Date.now()}`,
      sender: "client",
      text: message,
      time: "Just now",
      read: true,
    };

    setMessageStore((current) =>
      current.map((conversation) =>
        conversation.id === activeConversation.id
          ? {
              ...conversation,
              lastMessage: message,
              updatedAt: "Just now",
              messages: [
                ...conversation.messages,
                newMessage,
              ],
            }
          : conversation,
      ),
    );

    setDraft("");
  }

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* HEADER */}
      <section className="border-b border-black/[0.08] pb-7">
        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
          <Link
            href="/shop"
            className="transition hover:text-black"
          >
            Dashboard
          </Link>

          <span>/</span>

          <span>Messages</span>
        </div>

        <div className="mt-6">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
            Communication
          </p>

          <h1 className="mt-3 text-[38px] font-semibold leading-none tracking-[-0.05em] sm:text-[48px]">
            Messages
          </h1>

          <p className="mt-3 max-w-[520px] text-[11px] leading-5 text-black/42">
            Keep project questions, decisions and
            updates connected to the work.
          </p>
        </div>
      </section>

      {/* WORKSPACE */}
      <section className="py-5">
        <div className="grid min-h-[680px] overflow-hidden rounded-[18px] border border-black/[0.08] bg-white lg:grid-cols-[330px_1fr]">
          {/* SIDEBAR */}
          <aside className="border-b border-black/[0.08] lg:border-b-0 lg:border-r">
            {/* SIDEBAR HEADER */}
            <div className="border-b border-black/[0.08] p-4">
              <div className="relative">
                <Search
                  size={12}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-black/25"
                />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search conversations"
                  className="
                    h-10
                    w-full
                    rounded-full
                    border
                    border-black/[0.08]
                    bg-[#fafaf7]
                    pl-9
                    pr-4
                    text-[10px]
                    outline-none
                    transition
                    placeholder:text-black/25
                    focus:border-black/15
                    focus:bg-white
                  "
                />
              </div>
            </div>

            {/* CONVERSATIONS */}
            <div className="max-h-[610px] overflow-y-auto">
              {filteredConversations.length > 0 ? (
                filteredConversations.map(
                  (conversation) => {
                    const active =
                      activeConversation?.id ===
                      conversation.id;

                    return (
                      <button
                        key={conversation.id}
                        type="button"
                        onClick={() =>
                          handleSelectConversation(
                            conversation.id,
                          )
                        }
                        className={[
                          "w-full border-b border-black/[0.06] px-4 py-4 text-left transition-colors",
                          active
                            ? "bg-[#f4f4ef]"
                            : "bg-white hover:bg-[#fafaf7]",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="truncate text-[11px] font-semibold">
                                {conversation.title}
                              </p>

                              {conversation.unread >
                                0 && (
                                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[#111] px-1 text-[7px] font-semibold text-white">
                                  {
                                    conversation.unread
                                  }
                                </span>
                              )}
                            </div>

                            <div className="mt-1.5 flex items-center gap-1.5 text-[8px] text-black/27">
                              <span>
                                {
                                  conversation.contextType
                                }
                              </span>

                              {conversation.contextId && (
                                <>
                                  <span className="h-[3px] w-[3px] rounded-full bg-black/15" />

                                  <span>
                                    {
                                      conversation.contextId
                                    }
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          <span className="shrink-0 text-[8px] text-black/25">
                            {conversation.updatedAt}
                          </span>
                        </div>

                        <p
                          className={[
                            "mt-3 line-clamp-2 text-[9px] leading-4",
                            conversation.unread > 0
                              ? "font-medium text-black/60"
                              : "text-black/35",
                          ].join(" ")}
                        >
                          {conversation.lastMessage}
                        </p>
                      </button>
                    );
                  },
                )
              ) : (
                <div className="px-5 py-10 text-center">
                  <MessageSquareText
                    size={16}
                    className="mx-auto text-black/20"
                  />

                  <p className="mt-3 text-[10px] font-medium text-black/40">
                    No conversations found.
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* ACTIVE CONVERSATION */}
          {activeConversation ? (
            <div className="flex min-w-0 flex-col">
              {/* CONVERSATION HEADER */}
              <div className="flex flex-col gap-4 border-b border-black/[0.08] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold tracking-[-0.02em]">
                    {activeConversation.title}
                  </p>

                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[8px] text-black/30">
                    <span>
                      {activeConversation.contextType}
                    </span>

                    {activeConversation.contextId && (
                      <>
                        <span className="h-[3px] w-[3px] rounded-full bg-black/15" />

                        <span>
                          {
                            activeConversation.contextId
                          }
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {activeConversation.contextHref && (
                  <Link
                    href={
                      activeConversation.contextHref
                    }
                    className="group inline-flex h-9 w-fit items-center gap-2 rounded-full border border-black/[0.09] px-3.5 text-[9px] font-semibold text-black/45 transition hover:bg-[#f4f4ef] hover:text-black"
                  >
                    Open{" "}
                    {
                      activeConversation.contextType
                    }

                    <ArrowRight
                      size={10}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                )}
              </div>

              {/* MESSAGES */}
              <div className="flex-1 overflow-y-auto bg-[#fcfcfa] px-4 py-6 sm:px-6">
                <div className="mx-auto max-w-[760px] space-y-4">
                  <div className="flex justify-center">
                    <span className="rounded-full bg-black/[0.035] px-3 py-1.5 text-[7px] font-medium uppercase tracking-[0.12em] text-black/30">
                      Recent conversation
                    </span>
                  </div>

                  {activeConversation.messages.map(
                    (message) => (
                      <MessageBubble
                        key={message.id}
                        message={message}
                      />
                    ),
                  )}
                </div>
              </div>

              {/* COMPOSER */}
              <div className="border-t border-black/[0.08] bg-white p-4 sm:p-5">
                <div className="mx-auto max-w-[780px]">
                  <div className="rounded-[16px] border border-black/[0.09] bg-white p-3 transition focus-within:border-black/15">
                    <textarea
                      value={draft}
                      onChange={(event) =>
                        setDraft(
                          event.target.value,
                        )
                      }
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" &&
                          !event.shiftKey
                        ) {
                          event.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Write a message..."
                      rows={3}
                      className="w-full resize-none bg-transparent px-1 text-[10px] leading-5 outline-none placeholder:text-black/25"
                    />

                    <div className="mt-2 flex items-center justify-between gap-3 border-t border-black/[0.06] pt-3">
                      <button
                        type="button"
                        aria-label="Attach a file"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-black/30 transition hover:bg-[#f4f4ef] hover:text-black"
                      >
                        <Paperclip size={13} />
                      </button>

                      <button
                        type="button"
                        onClick={handleSendMessage}
                        disabled={!draft.trim()}
                        className="
                          inline-flex
                          h-9
                          items-center
                          gap-2
                          rounded-full
                          bg-[#111]
                          px-4
                          text-[9px]
                          font-semibold
                          text-white
                          transition
                          hover:bg-black/80
                          disabled:cursor-not-allowed
                          disabled:opacity-30
                        "
                      >
                        Send

                        <Send size={10} />
                      </button>
                    </div>
                  </div>

                  <p className="mt-2 text-[7px] text-black/20">
                    Press Enter to send · Shift +
                    Enter for a new line
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <ConversationEmptyState />
          )}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                MESSAGE BUBBLE                              */
/* -------------------------------------------------------------------------- */

function MessageBubble({
  message,
}: {
  message: Message;
}) {
  const client = message.sender === "client";

  return (
    <div
      className={[
        "flex",
        client
          ? "justify-end"
          : "justify-start",
      ].join(" ")}
    >
      <div className="max-w-[82%] sm:max-w-[68%]">
        {!client && (
          <p className="mb-1.5 px-1 text-[7px] font-semibold uppercase tracking-[0.12em] text-black/25">
            Fynaro
          </p>
        )}

        <div
          className={[
            "rounded-[16px] px-4 py-3",
            client
              ? "rounded-br-[5px] bg-[#111] text-white"
              : "rounded-bl-[5px] border border-black/[0.07] bg-white text-black",
          ].join(" ")}
        >
          <p
            className={[
              "text-[10px] leading-5",
              client
                ? "text-white/85"
                : "text-black/58",
            ].join(" ")}
          >
            {message.text}
          </p>
        </div>

        <div
          className={[
            "mt-1.5 flex items-center gap-1 px-1",
            client
              ? "justify-end"
              : "justify-start",
          ].join(" ")}
        >
          <span className="text-[7px] text-black/22">
            {message.time}
          </span>

          {client && message.read && (
            <CheckCheck
              size={9}
              className="text-black/25"
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                EMPTY STATE                                 */
/* -------------------------------------------------------------------------- */

function ConversationEmptyState() {
  return (
    <div className="grid min-h-[600px] place-items-center px-6 text-center">
      <div>
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f4f4ef]">
          <MessageSquareText
            size={15}
            className="text-black/45"
          />
        </span>

        <h2 className="mt-4 text-[17px] font-semibold tracking-[-0.025em]">
          Select a conversation.
        </h2>

        <p className="mx-auto mt-2 max-w-[320px] text-[9px] leading-5 text-black/35">
          Project and account conversations
          will appear here.
        </p>
      </div>
    </div>
  );
}