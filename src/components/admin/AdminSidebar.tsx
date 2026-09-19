"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  Activity,
  BadgeDollarSign,
  BriefcaseBusiness,
  ChevronRight,
  ClipboardList,
  FileText,
  FolderKanban,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  Users,
} from "lucide-react";

const navigation = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "Sales",
    items: [
      {
        label: "Requests",
        href: "/admin/requests",
        icon: ClipboardList,
      },
      {
        label: "Proposals",
        href: "/admin/proposals",
        icon: FileText,
      },
      {
        label: "Orders",
        href: "/admin/orders",
        icon: BriefcaseBusiness,
      },
      {
        label: "Payments",
        href: "/admin/payments",
        icon: BadgeDollarSign,
      },
    ],
  },

  {
    label: "Delivery",
    items: [
      {
        label: "Projects",
        href: "/admin/projects",
        icon: FolderKanban,
      },
    ],
  },

  {
    label: "Clients",
    items: [
      {
        label: "Clients",
        href: "/admin/clients",
        icon: Users,
      },
      {
        label: "Messages",
        href: "/admin/messages",
        icon: MessageSquareText,
      },
    ],
  },

  {
    label: "System",
    items: [
      {
        label: "Activity",
        href: "/admin/activity",
        icon: Activity,
      },
      {
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

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

function isActive(
  pathname: string,
  href: string
) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return (
    pathname === href ||
    pathname.startsWith(
      `${href}/`
    )
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

export default function AdminSidebar() {
  const pathname = usePathname();

  const [
    unreadMessages,
    setUnreadMessages,
  ] = useState(0);

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
          "[ADMIN SIDEBAR UNREAD]",
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
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[272px] border-r border-black/5 bg-[#f4f4ef] lg:flex lg:flex-col">
      {/* LOGO */}

      <div className="flex h-[86px] items-center border-b border-black/5 px-7">
        <Link
          href="/admin"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111111] text-sm font-semibold text-white">
            F
          </div>

          <div>
            <p className="text-[15px] font-semibold tracking-[-0.02em] text-[#111111]">
              Fynaro
            </p>

            <p className="text-xs text-black/45">
              Administration
            </p>
          </div>
        </Link>
      </div>

      {/* NAVIGATION */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-7">
          {navigation.map(
            (section) => (
              <div
                key={
                  section.label
                }
              >
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-black/35">
                  {section.label}
                </p>

                <div className="space-y-1">
                  {section.items.map(
                    (item) => {
                      const Icon =
                        item.icon;

                      const active =
                        isActive(
                          pathname,
                          item.href
                        );

                      const isMessages =
                        item.href ===
                        "/admin/messages";

                      return (
                        <Link
                          key={
                            item.href
                          }
                          href={
                            item.href
                          }
                          className={[
                            "group flex min-h-[44px] items-center justify-between rounded-xl px-3.5 text-sm transition-all duration-200",

                            active
                              ? "bg-white font-medium text-[#111111] shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                              : "text-black/55 hover:bg-white/65 hover:text-[#111111]",
                          ].join(
                            " "
                          )}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="relative shrink-0">
                              <Icon
                                className="h-[18px] w-[18px]"
                                strokeWidth={
                                  1.8
                                }
                              />

                              {isMessages &&
                                unreadMessages >
                                  0 && (
                                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#d6cc6d] ring-2 ring-[#f4f4ef]" />
                                )}
                            </div>

                            <span>
                              {item.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {isMessages &&
                              unreadMessages >
                                0 && (
                                <span
                                  className="flex min-w-[22px] items-center justify-center rounded-full bg-[#111111] px-1.5 py-0.5 text-[10px] font-semibold leading-4 text-white"
                                  title={`${unreadMessages} unread message${
                                    unreadMessages ===
                                    1
                                      ? ""
                                      : "s"
                                  }`}
                                >
                                  {unreadMessages >
                                  99
                                    ? "99+"
                                    : unreadMessages}
                                </span>
                              )}

                            {active && (
                              <ChevronRight
                                className="h-4 w-4 text-black/35"
                                strokeWidth={
                                  1.8
                                }
                              />
                            )}
                          </div>
                        </Link>
                      );
                    }
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </nav>

      {/* CLIENT DASHBOARD */}

      <div className="border-t border-black/5 p-4">
        <Link
          href="/shop"
          className="flex min-h-[46px] items-center justify-center rounded-xl border border-black/10 bg-white px-4 text-sm font-medium text-[#111111] transition hover:-translate-y-0.5"
        >
          Open client dashboard
        </Link>
      </div>
    </aside>
  );
}