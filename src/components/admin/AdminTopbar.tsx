"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Bell,
  Search,
} from "lucide-react";

type AdminTopbarProps = {
  name: string;
  role: string;
};

type AdminConversation = {
  id: string;
  unread_count?:
    | number
    | string
    | null;
};

type ConversationsResponse = {
  success?: boolean;

  conversations?: AdminConversation[];

  data?:
    | AdminConversation[]
    | {
        conversations?: AdminConversation[];
      };
};

function formatRole(
  role: string
) {
  return role
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function getConversations(
  data: ConversationsResponse
): AdminConversation[] {
  if (
    Array.isArray(
      data.conversations
    )
  ) {
    return data.conversations;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  if (
    data.data &&
    !Array.isArray(data.data) &&
    Array.isArray(
      data.data.conversations
    )
  ) {
    return data.data.conversations;
  }

  return [];
}

export default function AdminTopbar({
  name,
  role,
}: AdminTopbarProps) {
  const pathname = usePathname();

  const [
    unreadMessages,
    setUnreadMessages,
  ] = useState(0);

  const initials =
    name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (part) =>
          part[0]?.toUpperCase()
      )
      .join("") || "FA";

  // ======================================================
  // LOAD UNREAD MESSAGES
  // ======================================================

  const loadUnreadMessages =
    useCallback(async () => {
      try {
        const response =
          await fetch(
            "/api/admin/conversations",
            {
              method: "GET",

              headers: {
                Accept:
                  "application/json",
              },

              cache: "no-store",
            }
          );

        if (!response.ok) {
          return;
        }

        const text =
          await response.text();

        if (!text) {
          return;
        }

        let data: ConversationsResponse;

        try {
          data =
            JSON.parse(text);
        } catch {
          return;
        }

        const conversations =
          getConversations(data);

        const totalUnread =
          conversations.reduce(
            (
              total,
              conversation
            ) => {
              const unread =
                Number(
                  conversation.unread_count ??
                    0
                );

              return (
                total +
                (Number.isFinite(
                  unread
                )
                  ? unread
                  : 0)
              );
            },
            0
          );

        setUnreadMessages(
          totalUnread
        );
      } catch (error) {
        console.error(
          "[ADMIN TOPBAR UNREAD]",
          error
        );
      }
    }, []);

  // ======================================================
  // LIVE / POLLING REFRESH
  // ======================================================

  useEffect(() => {
    void loadUnreadMessages();

    const interval =
      window.setInterval(() => {
        void loadUnreadMessages();
      }, 15000);

    const handleFocus = () => {
      void loadUnreadMessages();
    };

    const handleVisibilityChange =
      () => {
        if (
          document.visibilityState ===
          "visible"
        ) {
          void loadUnreadMessages();
        }
      };

    const handleMessagesRead =
      () => {
        void loadUnreadMessages();
      };

    window.addEventListener(
      "focus",
      handleFocus
    );

    window.addEventListener(
      "fynaro:admin-messages-read",
      handleMessagesRead
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      window.clearInterval(
        interval
      );

      window.removeEventListener(
        "focus",
        handleFocus
      );

      window.removeEventListener(
        "fynaro:admin-messages-read",
        handleMessagesRead
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [loadUnreadMessages]);

  // ======================================================
  // ROUTE CHANGE REFRESH
  // ======================================================

  useEffect(() => {
    void loadUnreadMessages();
  }, [
    pathname,
    loadUnreadMessages,
  ]);

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-[#fafaf8]/95 backdrop-blur-xl">
      <div className="flex h-[86px] items-center justify-between gap-5 px-5 sm:px-7 lg:px-9">
        {/* LEFT */}

        <div>
          <p className="text-sm font-medium text-[#111111]">
            Admin workspace
          </p>

          <p className="mt-0.5 text-xs text-black/40">
            Manage Fynaro operations
          </p>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2">
          {/* SEARCH */}

          <button
            type="button"
            className="hidden h-10 items-center gap-2 rounded-xl border border-black/8 bg-white px-3 text-sm text-black/45 transition hover:border-black/15 hover:text-[#111111] sm:flex"
          >
            <Search
              className="h-4 w-4"
              strokeWidth={1.8}
            />

            <span className="pr-6">
              Search
            </span>
          </button>

          {/* NOTIFICATIONS */}

          <Link
            href="/admin/messages"
            aria-label={
              unreadMessages > 0
                ? `${unreadMessages} unread message${
                    unreadMessages ===
                    1
                      ? ""
                      : "s"
                  }`
                : "Messages"
            }
            title={
              unreadMessages > 0
                ? `${unreadMessages} unread message${
                    unreadMessages ===
                    1
                      ? ""
                      : "s"
                  }`
                : "No unread messages"
            }
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-black/8 bg-white text-black/55 transition hover:-translate-y-0.5 hover:border-black/15 hover:text-[#111111]"
          >
            <Bell
              className="h-[18px] w-[18px]"
              strokeWidth={1.8}
            />

            {unreadMessages >
              0 && (
              <>
                <span className="absolute right-[7px] top-[7px] h-2.5 w-2.5 rounded-full bg-[#d6cc6d] ring-2 ring-white" />

                <span className="absolute -right-2 -top-2 flex min-h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#111111] px-1 text-[9px] font-semibold leading-none text-white shadow-sm">
                  {unreadMessages >
                  99
                    ? "99+"
                    : unreadMessages}
                </span>
              </>
            )}
          </Link>

          {/* PROFILE */}

          <div className="ml-1 flex items-center gap-3 rounded-xl px-1.5 py-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111111] text-xs font-semibold text-white">
              {initials}
            </div>

            <div className="hidden md:block">
              <p className="max-w-[160px] truncate text-sm font-medium text-[#111111]">
                {name}
              </p>

              <p className="text-xs text-black/40">
                {formatRole(
                  role
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}