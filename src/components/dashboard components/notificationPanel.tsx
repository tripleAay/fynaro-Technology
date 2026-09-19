"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  FiBell,
  FiBriefcase,
  FiCheckCircle,
  FiCreditCard,
  FiFileText,
  FiFlag,
  FiLayers,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";

export type NotificationType =
  | "request"
  | "proposal"
  | "order"
  | "payment"
  | "project"
  | "milestone"
  | "system";

export type NotificationItem = {
  id: string;
  recipient_profile_id: string;
  actor_profile_id?: string | null;
  type: NotificationType;
  title: string;
  message: string;
  href?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  metadata?: Record<
    string,
    unknown
  >;
  read_at?: string | null;
  created_at: string;
};

type NotificationsResponse = {
  success?: boolean;
  notifications?: NotificationItem[];
  unread_count?: number;
  message?: string;
};

type NotificationPanelProps = {
  open: boolean;
  onClose: () => void;
  userName?: string;
  projectRequestJustCreated?: boolean;
  onUnreadChange?: (
    hasUnread: boolean
  ) => void;
};

function iconForType(
  type: NotificationType
) {
  switch (type) {
    case "request":
      return <FiFileText />;

    case "proposal":
      return <FiBriefcase />;

    case "order":
      return <FiShoppingBag />;

    case "payment":
      return <FiCreditCard />;

    case "project":
      return <FiLayers />;

    case "milestone":
      return <FiFlag />;

    case "system":
    default:
      return <FiBell />;
  }
}

function iconClasses(
  type: NotificationType
) {
  switch (type) {
    case "payment":
      return "bg-amber-400/10 text-amber-300 ring-amber-300/20";

    case "project":
    case "milestone":
      return "bg-[#d6cc6d]/15 text-[#e2d986] ring-[#d6cc6d]/25";

    case "proposal":
      return "bg-violet-400/10 text-violet-300 ring-violet-300/20";

    case "order":
      return "bg-sky-400/10 text-sky-300 ring-sky-300/20";

    case "request":
      return "bg-emerald-400/10 text-emerald-300 ring-emerald-300/20";

    default:
      return "bg-white/[0.06] text-white/65 ring-white/10";
  }
}

function formatTimeAgo(
  value: string
) {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  const seconds =
    Math.floor(
      (Date.now() -
        date.getTime()) /
        1000
    );

  if (seconds < 30) {
    return "Just now";
  }

  if (seconds < 60) {
    return `${seconds}s ago`;
  }

  const minutes =
    Math.floor(
      seconds / 60
    );

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours =
    Math.floor(
      minutes / 60
    );

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days =
    Math.floor(
      hours / 24
    );

  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleDateString(
    "en-NG",
    {
      day: "numeric",
      month: "short",
    }
  );
}

export default function NotificationPanel({
  open,
  onClose,
  userName = "Fynaro Client",
  projectRequestJustCreated = false,
  onUnreadChange,
}: NotificationPanelProps) {
  const [
    notifications,
    setNotifications,
  ] = useState<
    NotificationItem[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    markingAll,
    setMarkingAll,
  ] = useState(false);

  const unreadCount =
    useMemo(
      () =>
        notifications.filter(
          (notification) =>
            !notification.read_at
        ).length,
      [notifications]
    );

  const firstName =
    userName
      .trim()
      .split(/\s+/)[0] ||
    "Client";

  const loadNotifications =
    useCallback(
      async (
        silent = false
      ) => {
        try {
          if (!silent) {
            setLoading(true);
          }

          const response =
            await fetch(
              "/api/client/notifications?limit=30",
              {
                method: "GET",

                credentials:
                  "include",

                headers: {
                  Accept:
                    "application/json",
                },

                cache:
                  "no-store",
              }
            );

          const text =
            await response.text();

          let data:
            | NotificationsResponse
            | null = null;

          if (text) {
            try {
              data =
                JSON.parse(
                  text
                );
            } catch {
              data = null;
            }
          }

          if (!response.ok) {
            throw new Error(
              data?.message ||
                "Unable to load notifications."
            );
          }

          setNotifications(
            Array.isArray(
              data?.notifications
            )
              ? data.notifications
              : []
          );

          setErrorMessage("");
        } catch (error) {
          console.error(
            "[FYNA­RO NOTIFICATIONS]",
            error
          );

          if (!silent) {
            setErrorMessage(
              error instanceof
                Error
                ? error.message
                : "Unable to load notifications."
            );
          }
        } finally {
          if (!silent) {
            setLoading(false);
          }
        }
      },
      []
    );

  useEffect(() => {
    void loadNotifications();

    const interval =
      window.setInterval(
        () => {
          void loadNotifications(
            true
          );
        },
        15000
      );

    const handleFocus =
      () => {
        void loadNotifications(
          true
        );
      };

    const handleVisibility =
      () => {
        if (
          document.visibilityState ===
          "visible"
        ) {
          void loadNotifications(
            true
          );
        }
      };

    window.addEventListener(
      "focus",
      handleFocus
    );

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      window.clearInterval(
        interval
      );

      window.removeEventListener(
        "focus",
        handleFocus
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, [loadNotifications]);

  useEffect(() => {
    if (open) {
      void loadNotifications(
        true
      );
    }
  }, [
    open,
    loadNotifications,
  ]);

  useEffect(() => {
    onUnreadChange?.(
      unreadCount > 0
    );
  }, [
    unreadCount,
    onUnreadChange,
  ]);

  async function markAsRead(
    notificationId: string
  ) {
    const notification =
      notifications.find(
        (item) =>
          item.id ===
          notificationId
      );

    if (
      !notification ||
      notification.read_at
    ) {
      return;
    }

    const readAt =
      new Date()
        .toISOString();

    setNotifications(
      (current) =>
        current.map(
          (item) =>
            item.id ===
            notificationId
              ? {
                  ...item,
                  read_at:
                    readAt,
                }
              : item
        )
    );

    try {
      const response =
        await fetch(
          `/api/client/notifications/${notificationId}/read`,
          {
            method: "PATCH",
            credentials:
              "include",
            headers: {
              Accept:
                "application/json",
            },
          }
        );

      if (!response.ok) {
        throw new Error(
          "Unable to mark notification as read."
        );
      }
    } catch (error) {
      console.error(
        "[FYNA­RO NOTIFICATION READ]",
        error
      );

      void loadNotifications(
        true
      );
    }
  }

  async function handleMarkAllAsRead() {
    if (
      unreadCount === 0 ||
      markingAll
    ) {
      return;
    }

    setMarkingAll(true);

    const previous =
      notifications;

    const readAt =
      new Date()
        .toISOString();

    setNotifications(
      (current) =>
        current.map(
          (notification) => ({
            ...notification,

            read_at:
              notification.read_at ||
              readAt,
          })
        )
    );

    try {
      const response =
        await fetch(
          "/api/client/notifications/read-all",
          {
            method: "PATCH",

            credentials:
              "include",

            headers: {
              Accept:
                "application/json",
            },
          }
        );

      if (!response.ok) {
        throw new Error(
          "Unable to mark all notifications as read."
        );
      }
    } catch (error) {
      console.error(
        "[FYNA­RO NOTIFICATIONS READ ALL]",
        error
      );

      setNotifications(
        previous
      );
    } finally {
      setMarkingAll(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close notifications"
            onClick={
              onClose
            }
            className="fixed inset-0 z-[65] cursor-default bg-black/20 backdrop-blur-[2px]"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          />

          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label="Fynaro notifications"
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.98,
            }}
            transition={{
              duration: 0.18,
              ease:
                "easeOut",
            }}
            className="fixed right-3 top-[68px] z-[70] w-[calc(100vw-24px)] max-w-[390px] overflow-hidden rounded-[20px] border border-white/10 bg-[#090909] text-white shadow-[0_24px_80px_rgba(0,0,0,0.42)] sm:right-5 sm:top-[76px]"
          >
            <div className="h-[3px] bg-[#d6cc6d]" />

            {projectRequestJustCreated && (
              <div className="flex items-start gap-2.5 border-b border-[#d6cc6d]/20 bg-[#d6cc6d]/10 px-4 py-3">
                <FiCheckCircle className="mt-0.5 shrink-0 text-[#d6cc6d]" />

                <p className="text-[11px] leading-5 text-white/70">
                  Your request has
                  entered the Fynaro
                  review process.
                  Important progress
                  will appear here.
                </p>
              </div>
            )}

            <header className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-4 py-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d6cc6d]">
                  Fynaro workspace
                </p>

                <h2 className="mt-1 text-[15px] font-semibold tracking-[-0.02em]">
                  Notifications
                </h2>

                <p className="mt-1 text-[10px] text-white/40">
                  Hello,{" "}
                  {firstName}
                </p>
              </div>

              <button
                type="button"
                onClick={
                  onClose
                }
                aria-label="Close notifications"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/45 transition hover:bg-white/[0.06] hover:text-white"
              >
                <FiX size={15} />
              </button>
            </header>

            <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] bg-white/[0.025] px-4 py-2.5">
              <span className="text-[10px] text-white/40">
                {unreadCount >
                0
                  ? `${unreadCount} new update${
                      unreadCount ===
                      1
                        ? ""
                        : "s"
                    }`
                  : "You’re up to date"}
              </span>

              {unreadCount >
                0 && (
                <button
                  type="button"
                  disabled={
                    markingAll
                  }
                  onClick={
                    handleMarkAllAsRead
                  }
                  className="text-[10px] font-semibold text-[#d6cc6d] transition hover:text-[#eee49a] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {markingAll
                    ? "Updating..."
                    : "Mark all as read"}
                </button>
              )}
            </div>

            <div className="max-h-[430px] overflow-y-auto">
              {loading ? (
                <div className="space-y-3 p-4">
                  {[1, 2, 3].map(
                    (item) => (
                      <div
                        key={item}
                        className="h-[82px] animate-pulse rounded-[14px] bg-white/[0.045]"
                      />
                    )
                  )}
                </div>
              ) : errorMessage ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-[12px] font-medium text-white/65">
                    Notifications
                    unavailable
                  </p>

                  <p className="mt-2 text-[10px] leading-5 text-white/35">
                    {
                      errorMessage
                    }
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      void loadNotifications()
                    }
                    className="mt-4 rounded-full border border-[#d6cc6d]/30 px-4 py-2 text-[10px] font-semibold text-[#d6cc6d]"
                  >
                    Try again
                  </button>
                </div>
              ) : notifications.length ===
                0 ? (
                <div className="px-6 py-14 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#d6cc6d]/10 text-[#d6cc6d]">
                    <FiBell
                      size={18}
                    />
                  </div>

                  <p className="mt-4 text-[13px] font-semibold">
                    Nothing new yet
                  </p>

                  <p className="mx-auto mt-2 max-w-[250px] text-[10px] leading-5 text-white/35">
                    Updates about
                    requests,
                    proposals,
                    payments and
                    active projects
                    will appear here.
                  </p>
                </div>
              ) : (
                notifications.map(
                  (
                    notification
                  ) => {
                    const unread =
                      !notification.read_at;

                    const content = (
                      <div
                        className={[
                          "relative flex gap-3 border-b border-white/[0.07] px-4 py-4 transition last:border-b-0",
                          unread
                            ? "bg-[#d6cc6d]/[0.055] hover:bg-[#d6cc6d]/[0.08]"
                            : "hover:bg-white/[0.03]",
                        ].join(
                          " "
                        )}
                      >
                        {unread && (
                          <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-[#d6cc6d]" />
                        )}

                        <div
                          className={[
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] ring-1",
                            iconClasses(
                              notification.type
                            ),
                          ].join(
                            " "
                          )}
                        >
                          {iconForType(
                            notification.type
                          )}
                        </div>

                        <div className="min-w-0 flex-1 pr-3">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-[11.5px] font-semibold leading-5 text-white/90">
                              {
                                notification.title
                              }
                            </p>

                            <span className="shrink-0 text-[8.5px] text-white/30">
                              {formatTimeAgo(
                                notification.created_at
                              )}
                            </span>
                          </div>

                          <p className="mt-1 text-[10px] leading-[1.65] text-white/45">
                            {
                              notification.message
                            }
                          </p>

                          {notification.href && (
                            <p className="mt-2 text-[9.5px] font-semibold text-[#d6cc6d]">
                              View update
                              <span className="ml-1">
                                →
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    );

                    if (
                      notification.href
                    ) {
                      return (
                        <Link
                          key={
                            notification.id
                          }
                          href={
                            notification.href
                          }
                          onClick={() => {
                            void markAsRead(
                              notification.id
                            );

                            onClose();
                          }}
                          className="block"
                        >
                          {content}
                        </Link>
                      );
                    }

                    return (
                      <button
                        key={
                          notification.id
                        }
                        type="button"
                        onClick={() =>
                          void markAsRead(
                            notification.id
                          )
                        }
                        className="block w-full text-left"
                      >
                        {content}
                      </button>
                    );
                  }
                )
              )}
            </div>

            <footer className="flex items-center justify-between gap-4 border-t border-white/[0.08] bg-white/[0.025] px-4 py-3">
              <p className="text-[9px] leading-4 text-white/30">
                Important movement
                across your Fynaro
                workspace.
              </p>

              <div className="h-2 w-2 shrink-0 rounded-full bg-[#d6cc6d] shadow-[0_0_14px_rgba(214,204,109,0.65)]" />
            </footer>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}