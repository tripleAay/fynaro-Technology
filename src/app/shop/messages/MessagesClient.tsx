"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useSearchParams,
} from "next/navigation";

import {
  Building2,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  FolderKanban,
  Headphones,
  Loader2,
  MessageCircle,
  MessageSquareText,
  Search,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";

import type {
  ProjectConversation,
  SupportConversation,
} from "./page";

import type {
  ClientProject,
  ProjectMessage,
} from "@/lib/client/projects";

import type {
  ClientConversation,
  ConversationMessage,
  ConversationMessageType,
} from "@/lib/client/conversations";

// ======================================================
// TYPES
// ======================================================

type MessagesClientProps = {
  initialSupport:
    SupportConversation;

  initialProjectConversations:
    ProjectConversation[];
};

type ActiveConversation =
  | {
      type: "support";
    }
  | {
      type: "project";
      projectId: string;
    };

type SendSupportResponse = {
  success: boolean;

  message?: string;

  conversation?:
    ClientConversation;

  conversationMessage?:
    ConversationMessage;

  code?: string;
};

type SendProjectResponse = {
  success: boolean;

  message?: string;

  projectMessage?:
    ProjectMessage;

  data?: ProjectMessage;

  code?: string;
};

// ======================================================
// HELPERS
// ======================================================

function getSender(
  sender:
    | ConversationMessage["sender"]
    | undefined
) {
  if (!sender) {
    return null;
  }

  if (
    Array.isArray(
      sender
    )
  ) {
    return sender[0] || null;
  }

  return sender;
}

function formatDate(
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
      year: "numeric",
    }
  ).format(date);
}

function formatTime(
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
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(date);
}

function getProjectLabel(
  project: ClientProject
) {
  return (
    project.title ||
    project.service ||
    project.reference ||
    "Project"
  );
}

function getProjectLastMessage(
  conversation:
    ProjectConversation
) {
  return conversation.messages[
    conversation.messages.length - 1
  ];
}

function getSupportLastMessage(
  support:
    SupportConversation
) {
  return support.messages[
    support.messages.length - 1
  ];
}

function getProjectMessageText(
  message:
    ProjectMessage | undefined
) {
  if (!message) {
    return "Project conversation";
  }

  return (
    message.message ||
    "Project conversation"
  );
}

function getProjectMessageSender(
  message: ProjectMessage
) {
  const sender =
    message.sender;

  if (
    typeof sender === "string"
  ) {
    return sender;
  }

  return "client";
}

// ======================================================
// COMPONENT
// ======================================================

export default function MessagesClient({
  initialSupport,
  initialProjectConversations,
}: MessagesClientProps) {
  const searchParams =
    useSearchParams();

  // ======================================================
  // CLIENT MESSAGE READ SYNC
  // ======================================================

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(
        "fynaro:client-messages-read"
      )
    );
  }, []);

  const requestedProjectId =
    searchParams.get(
      "project"
    );

  const [
    support,
    setSupport,
  ] =
    useState<SupportConversation>(
      initialSupport
    );

  const [
    projectConversations,
    setProjectConversations,
  ] =
    useState<
      ProjectConversation[]
    >(
      initialProjectConversations
    );

  const [
    activeConversation,
    setActiveConversation,
  ] =
    useState<ActiveConversation>(
      () => {
        if (
          requestedProjectId &&
          initialProjectConversations.some(
            (conversation) =>
              conversation.project
                .id ===
              requestedProjectId
          )
        ) {
          return {
            type: "project",
            projectId:
              requestedProjectId,
          };
        }

        return {
          type: "support",
        };
      }
    );

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
    messageType,
    setMessageType,
  ] =
    useState<ConversationMessageType>(
      "message"
    );

  const [
    sending,
    setSending,
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
  // FILTER PROJECTS
  // ====================================================

  const filteredProjects =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return projectConversations;
      }

      return projectConversations.filter(
        (conversation) => {
          const project =
            conversation.project;

          const searchable =
            [
              project.title,
              project.service,
              project.reference,
              project.status,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

          return searchable.includes(
            query
          );
        }
      );
    }, [
      projectConversations,
      search,
    ]);

  // ====================================================
  // ACTIVE PROJECT
  // ====================================================

  const activeProjectConversation =
    useMemo(() => {
      if (
        activeConversation.type !==
        "project"
      ) {
        return null;
      }

      return (
        projectConversations.find(
          (conversation) =>
            conversation.project
              .id ===
            activeConversation.projectId
        ) || null
      );
    }, [
      activeConversation,
      projectConversations,
    ]);

  // ====================================================
  // SEND SUPPORT MESSAGE
  // ====================================================

  async function sendSupportMessage() {
    const cleanMessage =
      draft.trim();

    if (
      !cleanMessage ||
      sending
    ) {
      return;
    }

    setSending(true);
    setError(null);

    try {
      const response =
        await fetch(
          "/api/client/conversations/support/messages",
          {
            method:
              "POST",

            headers: {
              Accept:
                "application/json",

              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                message:
                  cleanMessage,

                messageType,
              }),
          }
        );

      const data =
        (await response.json()) as
          SendSupportResponse;

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Unable to send message."
        );
      }

      if (
        !data.conversation ||
        !data.conversationMessage
      ) {
        throw new Error(
          "Invalid message response."
        );
      }

      setSupport(
        (current) => ({
          conversation:
            data.conversation!,

          messages: [
            ...current.messages,
            data.conversationMessage!,
          ],
        })
      );

      setDraft("");
      setMessageType(
        "message"
      );
    } catch (sendError) {
      console.error(
        "[Messages] Support message failed",
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
  // SEND PROJECT MESSAGE
  // ====================================================

  async function sendProjectMessage() {
    if (
      !activeProjectConversation
    ) {
      return;
    }

    const cleanMessage =
      draft.trim();

    if (
      !cleanMessage ||
      sending
    ) {
      return;
    }

    setSending(true);
    setError(null);

    try {
      const projectId =
        activeProjectConversation
          .project.id;

      const response =
        await fetch(
          `/api/client/projects/${encodeURIComponent(
            projectId
          )}/messages`,
          {
            method:
              "POST",

            headers: {
              Accept:
                "application/json",

              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                message:
                  cleanMessage,

                messageType,
              }),
          }
        );

      const data =
        (await response.json()) as
          SendProjectResponse;

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Unable to send project message."
        );
      }

      const createdMessage =
        data.projectMessage ||
        data.data;

      if (!createdMessage) {
        throw new Error(
          "Invalid project message response."
        );
      }

      setProjectConversations(
        (current) =>
          current.map(
            (conversation) => {
              if (
                conversation.project
                  .id !==
                projectId
              ) {
                return conversation;
              }

              return {
                ...conversation,

                messages: [
                  ...conversation.messages,
                  createdMessage,
                ],
              };
            }
          )
      );

      setDraft("");
      setMessageType(
        "message"
      );
    } catch (sendError) {
      console.error(
        "[Messages] Project message failed",
        sendError
      );

      setError(
        sendError instanceof Error
          ? sendError.message
          : "Unable to send project message."
      );
    } finally {
      setSending(false);
    }
  }

  // ====================================================
  // SEND
  // ====================================================

  async function handleSend() {
    if (
      activeConversation.type ===
      "support"
    ) {
      await sendSupportMessage();
      return;
    }

    await sendProjectMessage();
  }

  // ====================================================
  // KEYBOARD
  // ====================================================

  function handleKeyDown(
    event:
      React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key ===
        "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      void handleSend();
    }
  }

  // ====================================================
  // SUPPORT DATA
  // ====================================================

  const supportLastMessage =
    getSupportLastMessage(
      support
    );

  const supportUnreadCount =
    activeConversation.type ===
    "support"
      ? 0
      : support.messages.filter(
          (message) =>
            !message.read_by_client
        ).length;

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f7f7f5]">
      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        {/* HEADER */}

        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              <MessageSquareText className="h-4 w-4" />

              Client workspace
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
              Messages
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-500">
              Talk directly with Fynaro or
              continue conversations attached
              to your active projects.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-600 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />

            Fynaro support available
          </div>
        </div>

        {/* LAYOUT */}

        <div className="grid min-h-[720px] overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm lg:grid-cols-[360px_minmax(0,1fr)]">
          {/* SIDEBAR */}

          <aside className="flex min-h-0 flex-col border-b border-neutral-200 bg-[#fbfbfa] lg:border-b-0 lg:border-r">
            {/* SEARCH */}

            <div className="border-b border-neutral-200 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                <input
                  type="text"
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
                  className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-neutral-400"
                />
              </div>
            </div>

            {/* CONVERSATIONS */}

            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              {/* FYNARO SUPPORT */}

              <div className="mb-2 px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                Fynaro
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveConversation({
                    type: "support",
                  });

                  setError(null);
                }}
                className={`mb-3 flex w-full items-start gap-3 rounded-2xl p-3 text-left transition ${
                  activeConversation.type ===
                  "support"
                    ? "bg-neutral-950 text-white shadow-sm"
                    : "hover:bg-neutral-100"
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    activeConversation.type ===
                    "support"
                      ? "bg-white/10 text-[#d6cc6d]"
                      : "bg-neutral-950 text-[#d6cc6d]"
                  }`}
                >
                  <Headphones className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="truncate text-sm font-semibold">
                      Fynaro Support
                    </div>

                    {supportLastMessage && (
                      <span
                        className={`shrink-0 text-[10px] ${
                          activeConversation.type ===
                          "support"
                            ? "text-white/50"
                            : "text-neutral-400"
                        }`}
                      >
                        {formatTime(
                          supportLastMessage.created_at
                        )}
                      </span>
                    )}
                  </div>

                  <div
                    className={`mt-1 truncate text-xs ${
                      activeConversation.type ===
                      "support"
                        ? "text-white/60"
                        : "text-neutral-500"
                    }`}
                  >
                    {supportLastMessage
                      ? supportLastMessage.message
                      : "Start a conversation with our team"}
                  </div>
                </div>

                {supportUnreadCount >
                  0 && (
                  <div className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#d6cc6d] px-1.5 text-[10px] font-bold text-black">
                    {
                      supportUnreadCount
                    }
                  </div>
                )}
              </button>

              {/* PROJECTS */}

              <div className="mb-2 flex items-center justify-between px-2 pb-1 pt-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                  Projects
                </span>

                <span className="text-[10px] font-medium text-neutral-400">
                  {
                    projectConversations.length
                  }
                </span>
              </div>

              {filteredProjects.length >
              0 ? (
                <div className="space-y-1">
                  {filteredProjects.map(
                    (
                      conversation
                    ) => {
                      const {
                        project,
                      } =
                        conversation;

                      const lastMessage =
                        getProjectLastMessage(
                          conversation
                        );

                      const active =
                        activeConversation.type ===
                          "project" &&
                        activeConversation.projectId ===
                          project.id;

                      return (
                        <button
                          key={
                            project.id
                          }
                          type="button"
                          onClick={() => {
                            setActiveConversation(
                              {
                                type: "project",
                                projectId:
                                  project.id,
                              }
                            );

                            setError(
                              null
                            );
                          }}
                          className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left transition ${
                            active
                              ? "bg-neutral-100"
                              : "hover:bg-neutral-100/70"
                          }`}
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-700">
                            <FolderKanban className="h-4 w-4" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="truncate text-sm font-semibold text-neutral-900">
                                {getProjectLabel(
                                  project
                                )}
                              </div>

                              {lastMessage && (
                                <span className="shrink-0 text-[10px] text-neutral-400">
                                  {formatTime(
                                    lastMessage.created_at
                                  )}
                                </span>
                              )}
                            </div>

                            <div className="mt-1 truncate text-xs text-neutral-500">
                              {getProjectMessageText(
                                lastMessage
                              )}
                            </div>

                            <div className="mt-2 flex items-center gap-2">
                              <span className="rounded-full bg-neutral-200/70 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                                {project.reference}
                              </span>

                              <span className="truncate text-[10px] capitalize text-neutral-400">
                                {project.status}
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    }
                  )}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-neutral-200 bg-white p-5 text-center">
                  <FolderKanban className="mx-auto h-5 w-5 text-neutral-300" />

                  <p className="mt-3 text-xs font-medium text-neutral-600">
                    {search
                      ? "No matching project conversations."
                      : "No project conversations yet."}
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-neutral-400">
                    Your project
                    conversations will
                    appear here once a
                    project is created.
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* ==================================================
              SUPPORT CHAT
          ================================================== */}

          {activeConversation.type ===
          "support" ? (
            <section className="flex min-h-[720px] min-w-0 flex-col">
              {/* CHAT HEADER */}

              <div className="flex min-h-[84px] items-center justify-between gap-4 border-b border-neutral-200 px-5 py-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-[#d6cc6d]">
                    <Headphones className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate text-sm font-semibold text-neutral-950">
                        Fynaro Support
                      </h2>

                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    </div>

                    <p className="mt-1 truncate text-xs text-neutral-500">
                      General support,
                      requests, proposals,
                      orders and account
                      questions.
                    </p>
                  </div>
                </div>

                <div className="hidden items-center gap-2 rounded-full bg-neutral-100 px-3 py-1.5 text-[11px] font-medium text-neutral-500 sm:flex">
                  <CircleHelp className="h-3.5 w-3.5" />

                  General conversation
                </div>
              </div>

              {/* MESSAGES */}

              <div className="flex-1 overflow-y-auto bg-[#fafaf8] px-4 py-6 sm:px-6">
                {support.messages
                  .length === 0 ? (
                  <div className="flex min-h-[430px] items-center justify-center">
                    <div className="mx-auto max-w-md text-center">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-950 text-[#d6cc6d] shadow-sm">
                        <MessageCircle className="h-7 w-7" />
                      </div>

                      <h3 className="mt-5 text-lg font-semibold text-neutral-950">
                        Talk to Fynaro
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-neutral-500">
                        You do not need an
                        active project to
                        message us. Ask
                        about a service,
                        proposal, order,
                        payment or
                        anything related
                        to your Fynaro
                        account.
                      </p>

                      <div className="mt-5 flex flex-wrap justify-center gap-2">
                        {[
                          "I have a question about my proposal.",
                          "I want to discuss a new service.",
                          "I need help with my order.",
                        ].map(
                          (
                            suggestion
                          ) => (
                            <button
                              key={
                                suggestion
                              }
                              type="button"
                              onClick={() =>
                                setDraft(
                                  suggestion
                                )
                              }
                              className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-medium text-neutral-600 transition hover:border-neutral-300 hover:text-neutral-950"
                            >
                              {
                                suggestion
                              }
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mx-auto max-w-4xl space-y-5">
                    {support.messages.map(
                      (message) => {
                        const sender =
                          getSender(
                            message.sender
                          );

                        const role =
                          String(
                            sender?.role ||
                              ""
                          ).toLowerCase();

                        const isClient =
                          role ===
                          "client";

                        const senderName =
                          isClient
                            ? "You"
                            : sender?.full_name ||
                              "Fynaro";

                        return (
                          <div
                            key={
                              message.id
                            }
                            className={`flex ${
                              isClient
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`flex max-w-[85%] gap-3 sm:max-w-[72%] ${
                                isClient
                                  ? "flex-row-reverse"
                                  : ""
                              }`}
                            >
                              <div
                                className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                                  isClient
                                    ? "bg-neutral-200 text-neutral-700"
                                    : "bg-neutral-950 text-[#d6cc6d]"
                                }`}
                              >
                                {isClient ? (
                                  <UserRound className="h-4 w-4" />
                                ) : (
                                  <Sparkles className="h-4 w-4" />
                                )}
                              </div>

                              <div>
                                <div
                                  className={`mb-1 flex items-center gap-2 ${
                                    isClient
                                      ? "justify-end"
                                      : ""
                                  }`}
                                >
                                  <span className="text-[11px] font-semibold text-neutral-600">
                                    {
                                      senderName
                                    }
                                  </span>

                                  <span className="text-[10px] text-neutral-400">
                                    {formatTime(
                                      message.created_at
                                    )}
                                  </span>
                                </div>

                                <div
                                  className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                                    isClient
                                      ? "rounded-tr-md bg-neutral-950 text-white"
                                      : "rounded-tl-md border border-neutral-200 bg-white text-neutral-700 shadow-sm"
                                  }`}
                                >
                                  {
                                    message.message
                                  }
                                </div>

                                <div
                                  className={`mt-1 flex items-center gap-1 text-[10px] text-neutral-400 ${
                                    isClient
                                      ? "justify-end"
                                      : ""
                                  }`}
                                >
                                  {isClient &&
                                    message.read_by_admin && (
                                      <>
                                        <Check className="h-3 w-3" />

                                        Read
                                      </>
                                    )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>

              {/* COMPOSER */}

              <div className="border-t border-neutral-200 bg-white p-4 sm:p-5">
                <div className="mx-auto max-w-4xl">
                  {error && (
                    <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                      {error}
                    </div>
                  )}

                  <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm transition focus-within:border-neutral-400">
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
                      maxLength={
                        10000
                      }
                      placeholder="Message Fynaro..."
                      className="w-full resize-none bg-transparent px-1 py-1 text-sm leading-6 text-neutral-900 outline-none placeholder:text-neutral-400"
                    />

                    <div className="mt-3 flex flex-col gap-3 border-t border-neutral-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <select
                          value={
                            messageType
                          }
                          onChange={(
                            event
                          ) =>
                            setMessageType(
                              event
                                .target
                                .value as ConversationMessageType
                            )
                          }
                          className="h-9 rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-xs font-medium text-neutral-600 outline-none"
                        >
                          <option value="message">
                            Message
                          </option>

                          <option value="question">
                            Question
                          </option>

                          <option value="feedback">
                            Feedback
                          </option>
                        </select>

                        <span className="hidden text-[10px] text-neutral-400 sm:inline">
                          Enter to send ·
                          Shift + Enter for
                          a new line
                        </span>
                      </div>

                      <button
                        type="button"
                        disabled={
                          sending ||
                          !draft.trim()
                        }
                        onClick={() =>
                          void handleSend()
                        }
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 text-xs font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {sending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />

                            Sending
                          </>
                        ) : (
                          <>
                            Send message

                            <Send className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : activeProjectConversation ? (
            /* ==================================================
               PROJECT CHAT
            ================================================== */

            <section className="flex min-h-[720px] min-w-0 flex-col">
              {/* PROJECT HEADER */}

              <div className="flex min-h-[84px] items-center justify-between gap-4 border-b border-neutral-200 px-5 py-4 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700">
                    <FolderKanban className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-neutral-950">
                      {getProjectLabel(
                        activeProjectConversation.project
                      )}
                    </h2>

                    <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                      <span>
                        {
                          activeProjectConversation
                            .project
                            .reference
                        }
                      </span>

                      <span>
                        •
                      </span>

                      <span className="capitalize">
                        {
                          activeProjectConversation
                            .project
                            .status
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={`/shop/projects/${activeProjectConversation.project.id}`}
                  className="hidden items-center gap-1 text-xs font-semibold text-neutral-600 transition hover:text-neutral-950 sm:flex"
                >
                  Open project

                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>

              {/* PROJECT MESSAGES */}

              <div className="flex-1 overflow-y-auto bg-[#fafaf8] px-4 py-6 sm:px-6">
                {activeProjectConversation
                  .messages.length ===
                0 ? (
                  <div className="flex min-h-[430px] items-center justify-center">
                    <div className="max-w-sm text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-700">
                        <MessageSquareText className="h-6 w-6" />
                      </div>

                      <h3 className="mt-4 text-base font-semibold text-neutral-950">
                        Project
                        conversation
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-neutral-500">
                        Send a message
                        about this project.
                        Updates and replies
                        from the Fynaro
                        team will stay
                        attached to this
                        workspace.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mx-auto max-w-4xl space-y-5">
                    {activeProjectConversation.messages.map(
                      (message) => {
                        const sender =
                          getProjectMessageSender(
                            message
                          );

                        const isClient =
                          sender ===
                          "client";

                        return (
                          <div
                            key={
                              message.id
                            }
                            className={`flex ${
                              isClient
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[85%] sm:max-w-[72%] ${
                                isClient
                                  ? "text-right"
                                  : ""
                              }`}
                            >
                              <div className="mb-1 text-[10px] text-neutral-400">
                                {isClient
                                  ? "You"
                                  : "Fynaro"}{" "}
                                ·{" "}
                                {formatTime(
                                  message.created_at
                                )}
                              </div>

                              <div
                                className={`rounded-2xl px-4 py-3 text-left text-sm leading-6 ${
                                  isClient
                                    ? "rounded-tr-md bg-neutral-950 text-white"
                                    : "rounded-tl-md border border-neutral-200 bg-white text-neutral-700 shadow-sm"
                                }`}
                              >
                                {
                                  message.message
                                }
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>

              {/* PROJECT COMPOSER */}

              <div className="border-t border-neutral-200 bg-white p-4 sm:p-5">
                <div className="mx-auto max-w-4xl">
                  {error && (
                    <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                      {error}
                    </div>
                  )}

                  <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm focus-within:border-neutral-400">
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
                      placeholder="Write a project message..."
                      className="w-full resize-none bg-transparent px-1 py-1 text-sm leading-6 text-neutral-900 outline-none placeholder:text-neutral-400"
                    />

                    <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-3">
                      <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                        <Clock3 className="h-3.5 w-3.5" />

                        Project messages
                        stay with this
                        workspace
                      </div>

                      <button
                        type="button"
                        disabled={
                          sending ||
                          !draft.trim()
                        }
                        onClick={() =>
                          void handleSend()
                        }
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 text-xs font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
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
                </div>
              </div>
            </section>
          ) : (
            /* FALLBACK */

            <section className="flex min-h-[720px] items-center justify-center p-8">
              <div className="text-center">
                <Building2 className="mx-auto h-8 w-8 text-neutral-300" />

                <p className="mt-3 text-sm font-medium text-neutral-700">
                  Conversation not
                  available.
                </p>
              </div>
            </section>
          )}
        </div>

        {/* FOOTNOTE */}

        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-neutral-400">
          <MessageCircle className="h-3.5 w-3.5" />

          Messages are kept inside your
          Fynaro workspace.
        </div>
      </div>
    </div>
  );
}