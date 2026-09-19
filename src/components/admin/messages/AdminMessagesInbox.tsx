"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";

import {
  Check,
  Headphones,
  Inbox,
  Loader2,
  MessageSquareText,
  RefreshCw,
  Search,
  Send,
  UserRound,
  XCircle,
  CheckCircle2,
} from "lucide-react";

// ======================================================
// TYPES
// ======================================================

type Profile = {
  id: string;
  email: string;
  full_name?: string | null;
  company_name?: string | null;
  role?: string | null;
};

type MessageType =
  | "message"
  | "question"
  | "update"
  | "feedback";

type ConversationStatus =
  | "open"
  | "closed";

type ConversationMessage = {
  id: string;
  conversation_id: string;
  sender_profile_id: string;
  message: string;
  message_type: MessageType;
  read_by_client: boolean;
  read_by_admin: boolean;
  created_at: string;

  sender?:
    | Profile
    | Profile[]
    | null;
};

type Conversation = {
  id: string;
  client_id: string;

  conversation_type:
    | "support"
    | "general";

  subject?: string | null;

  status: ConversationStatus;

  last_message_at?:
    | string
    | null;

  created_at: string;
  updated_at: string;

  client?:
    | Profile
    | Profile[]
    | null;

  latest_message?:
    ConversationMessage | null;

  unread_count?: number;
};

type ListResponse = {
  success?: boolean;
  conversations?: Conversation[];
  data?: Conversation[];
  message?: string;
};

type DetailResponse = {
  success?: boolean;

  conversation?: Conversation;

  messages?: ConversationMessage[];

  data?: {
    conversation?: Conversation;
    messages?: ConversationMessage[];
  };

  message?: string;
};

type SendResponse = {
  success?: boolean;

  conversationMessage?:
    ConversationMessage;

  data?:
    | ConversationMessage
    | {
        conversationMessage?:
          ConversationMessage;
      };

  message?: string;
};

// ======================================================
// HELPERS
// ======================================================

function joinedProfile(
  value:
    | Profile
    | Profile[]
    | null
    | undefined
) {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value[0] || null;
  }

  return value;
}

function clientName(
  conversation: Conversation
) {
  const client =
    joinedProfile(
      conversation.client
    );

  return (
    client?.full_name ||
    client?.company_name ||
    client?.email ||
    "Fynaro Client"
  );
}

function initials(
  name: string
) {
  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (part) =>
          part[0]?.toUpperCase()
      )
      .join("") || "FC"
  );
}

function dateLabel(
  value?: string | null
) {
  if (!value) {
    return "";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(date);
}

async function parseResponse<T>(
  response: Response
): Promise<T | null> {
  const text =
    await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    console.error(
      "[ADMIN MESSAGES] Non-JSON response:",
      text
    );

    return null;
  }
}

// ======================================================
// COMPONENT
// ======================================================

export default function AdminMessagesInbox() {
  const [
    conversations,
    setConversations,
  ] =
    useState<
      Conversation[]
    >([]);

  const [
    activeId,
    setActiveId,
  ] =
    useState<
      string | null
    >(null);

  const [
    activeConversation,
    setActiveConversation,
  ] =
    useState<
      Conversation | null
    >(null);

  const [
    messages,
    setMessages,
  ] =
    useState<
      ConversationMessage[]
    >([]);

  const [
    search,
    setSearch,
  ] =
    useState("");

  const [
    draft,
    setDraft,
  ] =
    useState("");

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    loadingThread,
    setLoadingThread,
  ] =
    useState(false);

  const [
    sending,
    setSending,
  ] =
    useState(false);

  const [
    updatingStatus,
    setUpdatingStatus,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState<
      string | null
    >(null);

  // ====================================================
  // LOAD INBOX
  // ====================================================

  const loadInbox =
    useCallback(
      async () => {
        try {
          setError(null);

          const response =
            await fetch(
              "/api/admin/conversations",
              {
                method: "GET",
                cache: "no-store",
              }
            );

          const data =
            await parseResponse<ListResponse>(
              response
            );

          if (
            !response.ok ||
            !data
          ) {
            throw new Error(
              data?.message ||
                "Unable to load conversations."
            );
          }

          const list =
            data.conversations ||
            data.data ||
            [];

          setConversations(
            list
          );

          setActiveId(
            (current) => {
              if (
                current &&
                list.some(
                  (item) =>
                    item.id ===
                    current
                )
              ) {
                return current;
              }

              return (
                list[0]?.id ||
                null
              );
            }
          );
        } catch (
          loadError
        ) {
          console.error(
            loadError
          );

          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load conversations."
          );
        } finally {
          setLoading(false);
        }
      },
      []
    );

  // ====================================================
  // LOAD THREAD
  // ====================================================

  const loadThread =
    useCallback(
      async (
        conversationId: string
      ) => {
        try {
          setLoadingThread(
            true
          );

          setError(null);

          const response =
            await fetch(
              `/api/admin/conversations/${encodeURIComponent(
                conversationId
              )}`,
              {
                method: "GET",
                cache: "no-store",
              }
            );

          const data =
            await parseResponse<DetailResponse>(
              response
            );

          if (
            !response.ok ||
            !data
          ) {
            throw new Error(
              data?.message ||
                "Unable to load conversation."
            );
          }

          const conversation =
            data.conversation ||
            data.data
              ?.conversation;

          const threadMessages =
            data.messages ||
            data.data?.messages ||
            [];

          if (!conversation) {
            throw new Error(
              "Conversation was not returned by the server."
            );
          }

          setActiveConversation(
            conversation
          );

          setMessages(
            threadMessages
          );

          setConversations(
  (current) =>
    current.map(
      (item) =>
        item.id === conversationId
          ? {
              ...item,
              unread_count: 0,
            }
          : item
    )
);

// Tell the admin sidebar + topbar that unread state changed.
window.dispatchEvent(
  new CustomEvent("fynaro:admin-messages-read", {
    detail: {
      conversationId,
    },
  })
);
        } catch (
          threadError
        ) {
          console.error(
            threadError
          );

          setError(
            threadError instanceof Error
              ? threadError.message
              : "Unable to load conversation."
          );
        } finally {
          setLoadingThread(
            false
          );
        }
      },
      []
    );

  // ====================================================
  // INITIAL DATA
  // ====================================================

  useEffect(() => {
    void loadInbox();
  }, [loadInbox]);

  useEffect(() => {
    if (!activeId) {
      setActiveConversation(
        null
      );

      setMessages([]);

      return;
    }

    void loadThread(
      activeId
    );
  }, [
    activeId,
    loadThread,
  ]);

  // ====================================================
  // SEARCH
  // ====================================================

  const visibleConversations =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return conversations;
      }

      return conversations.filter(
        (conversation) => {
          const client =
            joinedProfile(
              conversation.client
            );

          return [
            client?.full_name,
            client?.email,
            client?.company_name,
            conversation.subject,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(query);
        }
      );
    }, [
      conversations,
      search,
    ]);

  const unreadCount =
    useMemo(
      () =>
        conversations.reduce(
          (
            total,
            conversation
          ) =>
            total +
            Number(
              conversation.unread_count ||
                0
            ),
          0
        ),
      [conversations]
    );

  // ====================================================
  // SEND
  // ====================================================

  async function sendMessage() {
    const clean =
      draft.trim();

    if (
      !clean ||
      !activeConversation ||
      sending
    ) {
      return;
    }

    try {
      setSending(true);
      setError(null);

      const response =
        await fetch(
          `/api/admin/conversations/${encodeURIComponent(
            activeConversation.id
          )}/messages`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                message:
                  clean,

                messageType:
                  "message",
              }),
          }
        );

      const data =
        await parseResponse<SendResponse>(
          response
        );

      if (
        !response.ok ||
        !data
      ) {
        throw new Error(
          data?.message ||
            "Unable to send message."
        );
      }

      setDraft("");

      await Promise.all([
        loadThread(
          activeConversation.id
        ),
        loadInbox(),
      ]);
    } catch (
      sendError
    ) {
      console.error(
        sendError
      );

      setError(
        sendError instanceof Error
          ? sendError.message
          : "Unable to send message."
      );
    } finally {
      setSending(false);
    }
  }

  // ====================================================
  // STATUS
  // ====================================================

  async function toggleStatus() {
    if (
      !activeConversation ||
      updatingStatus
    ) {
      return;
    }

    const nextStatus:
      ConversationStatus =
        activeConversation.status ===
        "open"
          ? "closed"
          : "open";

    try {
      setUpdatingStatus(
        true
      );

      setError(null);

      const response =
        await fetch(
          `/api/admin/conversations/${encodeURIComponent(
            activeConversation.id
          )}`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                status:
                  nextStatus,
              }),
          }
        );

      const data =
        await parseResponse<{
          success?: boolean;
          message?: string;
        }>(response);

      if (
        !response.ok ||
        !data
      ) {
        throw new Error(
          data?.message ||
            "Unable to update conversation."
        );
      }

      await Promise.all([
        loadThread(
          activeConversation.id
        ),
        loadInbox(),
      ]);
    } catch (
      statusError
    ) {
      setError(
        statusError instanceof Error
          ? statusError.message
          : "Unable to update conversation."
      );
    } finally {
      setUpdatingStatus(
        false
      );
    }
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key ===
        "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      void sendMessage();
    }
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="overflow-hidden rounded-[24px] border border-black/5 bg-white">
      {/* SUMMARY */}

      <div className="grid border-b border-black/5 sm:grid-cols-3">
        <div className="p-5">
          <p className="text-xs text-black/40">
            Conversations
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#111111]">
            {
              conversations.length
            }
          </p>
        </div>

        <div className="border-t border-black/5 p-5 sm:border-l sm:border-t-0">
          <p className="text-xs text-black/40">
            Unread
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#111111]">
            {unreadCount}
          </p>
        </div>

        <div className="border-t border-black/5 p-5 sm:border-l sm:border-t-0">
          <p className="text-xs text-black/40">
            Open
          </p>

          <p className="mt-2 text-2xl font-semibold text-[#111111]">
            {
              conversations.filter(
                (conversation) =>
                  conversation.status ===
                  "open"
              ).length
            }
          </p>
        </div>
      </div>

      {error && (
        <div className="border-b border-red-100 bg-red-50 px-5 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid min-h-[650px] lg:grid-cols-[340px_minmax(0,1fr)]">
        {/* LEFT */}

        <aside className="border-b border-black/5 bg-[#fafaf8] lg:border-b-0 lg:border-r">
          <div className="border-b border-black/5 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/30" />

              <input
                value={search}
                onChange={(
                  event
                ) =>
                  setSearch(
                    event.target
                      .value
                  )
                }
                placeholder="Search conversations"
                className="h-11 w-full rounded-xl border border-black/8 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-black/20"
              />
            </div>
          </div>

          <div className="max-h-[650px] overflow-y-auto p-2">
            {loading ? (
              <div className="flex h-40 items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-black/30" />
              </div>
            ) : visibleConversations.length ===
              0 ? (
              <div className="px-6 py-14 text-center">
                <Inbox className="mx-auto h-7 w-7 text-black/20" />

                <p className="mt-4 text-sm font-medium text-[#111111]">
                  No conversations yet
                </p>

                <p className="mt-1 text-xs leading-5 text-black/40">
                  Messages from Fynaro
                  clients will appear
                  here.
                </p>
              </div>
            ) : (
              visibleConversations.map(
                (
                  conversation
                ) => {
                  const name =
                    clientName(
                      conversation
                    );

                  const selected =
                    conversation.id ===
                    activeId;

                  return (
                    <button
                      key={
                        conversation.id
                      }
                      type="button"
                      onClick={() =>
                        setActiveId(
                          conversation.id
                        )
                      }
                      className={[
                        "mb-1 flex w-full items-center gap-3 rounded-2xl p-3 text-left transition",

                        selected
                          ? "bg-[#111111] text-white"
                          : "hover:bg-black/[0.04]",
                      ].join(
                        " "
                      )}
                    >
                      <div
                        className={[
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-semibold",

                          selected
                            ? "bg-white/10 text-[#d6cc6d]"
                            : "bg-black/[0.06] text-[#111111]",
                        ].join(
                          " "
                        )}
                      >
                        {initials(
                          name
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-medium">
                            {name}
                          </p>

                          {!!conversation.unread_count && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d6cc6d] px-1.5 text-[10px] font-bold text-black">
                              {
                                conversation.unread_count
                              }
                            </span>
                          )}
                        </div>

                        <p
                          className={[
                            "mt-1 truncate text-xs",

                            selected
                              ? "text-white/50"
                              : "text-black/40",
                          ].join(
                            " "
                          )}
                        >
                          {conversation.subject ||
                            "Fynaro Support"}
                        </p>
                      </div>
                    </button>
                  );
                }
              )
            )}
          </div>
        </aside>

        {/* RIGHT */}

        <section className="flex min-h-[650px] min-w-0 flex-col">
          {!activeId ? (
            <div className="flex flex-1 items-center justify-center p-8">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#111111] text-[#d6cc6d]">
                  <MessageSquareText className="h-6 w-6" />
                </div>

                <p className="mt-4 font-medium text-[#111111]">
                  Fynaro Inbox
                </p>

                <p className="mt-1 text-sm text-black/40">
                  Select a client
                  conversation.
                </p>
              </div>
            </div>
          ) : loadingThread &&
            !activeConversation ? (
            <div className="flex flex-1 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-black/30" />
            </div>
          ) : activeConversation ? (
            <>
              {/* THREAD HEADER */}

              <div className="flex min-h-[78px] items-center justify-between gap-4 border-b border-black/5 px-5">
                <div>
                  <p className="font-medium text-[#111111]">
                    {clientName(
                      activeConversation
                    )}
                  </p>

                  <p className="mt-1 text-xs capitalize text-black/40">
                    {
                      activeConversation.conversation_type
                    }{" "}
                    •{" "}
                    {
                      activeConversation.status
                    }
                  </p>
                </div>

                <button
                  type="button"
                  disabled={
                    updatingStatus
                  }
                  onClick={() =>
                    void toggleStatus()
                  }
                  className="flex h-9 items-center gap-2 rounded-xl border border-black/8 px-3 text-xs font-medium text-black/55 transition hover:bg-black/[0.03]"
                >
                  {updatingStatus ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : activeConversation.status ===
                    "open" ? (
                    <XCircle className="h-4 w-4" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4" />
                  )}

                  {activeConversation.status ===
                  "open"
                    ? "Close"
                    : "Reopen"}
                </button>
              </div>

              {/* THREAD */}

              <div className="flex-1 overflow-y-auto bg-[#fafaf8] p-5">
                <div className="mx-auto max-w-3xl space-y-5">
                  {messages.length ===
                  0 ? (
                    <div className="py-20 text-center text-sm text-black/35">
                      No messages in this
                      conversation.
                    </div>
                  ) : (
                    messages.map(
                      (
                        message
                      ) => {
                        const sender =
                          joinedProfile(
                            message.sender
                          );

                        const isClient =
                          sender?.role ===
                          "client";

                        return (
                          <div
                            key={
                              message.id
                            }
                            className={`flex ${
                              isClient
                                ? "justify-start"
                                : "justify-end"
                            }`}
                          >
                            <div
                              className={`flex max-w-[82%] gap-2 ${
                                isClient
                                  ? ""
                                  : "flex-row-reverse"
                              }`}
                            >
                              <div
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                  isClient
                                    ? "bg-black/[0.06] text-black/50"
                                    : "bg-[#111111] text-[#d6cc6d]"
                                }`}
                              >
                                {isClient ? (
                                  <UserRound className="h-4 w-4" />
                                ) : (
                                  <Headphones className="h-4 w-4" />
                                )}
                              </div>

                              <div>
                                <div
                                  className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                                    isClient
                                      ? "rounded-tl-md border border-black/5 bg-white text-[#111111]"
                                      : "rounded-tr-md bg-[#111111] text-white"
                                  }`}
                                >
                                  {
                                    message.message
                                  }
                                </div>

                                <div
                                  className={`mt-1 flex items-center gap-1 text-[10px] text-black/35 ${
                                    isClient
                                      ? ""
                                      : "justify-end"
                                  }`}
                                >
                                  {dateLabel(
                                    message.created_at
                                  )}

                                  {!isClient &&
                                    message.read_by_client && (
                                      <>
                                        <span>
                                          •
                                        </span>

                                        <Check className="h-3 w-3" />

                                        <span>
                                          Read
                                        </span>
                                      </>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )
                  )}
                </div>
              </div>

              {/* COMPOSER */}

              <div className="border-t border-black/5 bg-white p-4">
                {activeConversation.status ===
                "closed" ? (
                  <div className="rounded-xl bg-black/[0.03] p-4 text-center text-sm text-black/45">
                    This conversation is
                    closed. Reopen it to
                    send another message.
                  </div>
                ) : (
                  <div className="rounded-2xl border border-black/10 bg-white p-3">
                    <textarea
                      value={draft}
                      onChange={(
                        event
                      ) =>
                        setDraft(
                          event.target
                            .value
                        )
                      }
                      onKeyDown={
                        handleKeyDown
                      }
                      rows={3}
                      placeholder="Reply as Fynaro..."
                      className="w-full resize-none bg-transparent px-1 text-sm leading-6 outline-none placeholder:text-black/30"
                    />

                    <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-3">
                      <span className="text-[11px] text-black/35">
                        Enter to send •
                        Shift + Enter for
                        new line
                      </span>

                      <button
                        type="button"
                        disabled={
                          sending ||
                          !draft.trim()
                        }
                        onClick={() =>
                          void sendMessage()
                        }
                        className="flex h-10 items-center gap-2 rounded-xl bg-[#111111] px-4 text-xs font-semibold text-white transition hover:bg-black/85 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {sending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}

                        Send
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : null}
        </section>
      </div>
    </div>
  );
}