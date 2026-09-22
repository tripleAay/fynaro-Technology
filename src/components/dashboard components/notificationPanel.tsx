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
      return "bg-[#f7f1df] text-[#8a7125] ring-[#d6cc6d]/35";

    case "project":
    case "milestone":
      return "bg-[#f3f0dc] text-[#786b24] ring-[#d6cc6d]/35";

    case "proposal":
      return "bg-[#f0edf5] text-[#655778] ring-[#655778]/15";

    case "order":
      return "bg-[#eaf0f2] text-[#4d6970] ring-[#4d6970]/15";

    case "request":
      return "bg-[#e9f0ea] text-[#4d6852] ring-[#4d6852]/15";

    default:
      return "bg-[#f0f0eb] text-black/50 ring-black/[0.06]";
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
            className="fixed inset-0 z-[65] cursor-default bg-black/10 backdrop-blur-[1.5px]"
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
              y: -8,
              scale: 0.985,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -6,
              scale: 0.99,
            }}
            transition={{
              duration: 0.22,
              ease: [
                0.16,
                1,
                0.3,
                1,
              ],
            }}
            className="fixed right-3 top-[68px] z-[70] w-[calc(100vw-24px)] max-w-[390px] overflow-hidden rounded-[20px] border border-black/[0.08] bg-[#fafaf8] text-[#111] shadow-[0_24px_70px_rgba(0,0,0,0.16)] sm:right-5 sm:top-[76px]"
          >
            <div className="h-[2px] bg-[#d6cc6d]" />

            {projectRequestJustCreated && (
              <div className="flex items-start gap-2.5 border-b border-[#d6cc6d]/35 bg-[#f5f1d9] px-4 py-3">
                <FiCheckCircle className="mt-0.5 shrink-0 text-[#85772b]" />

                <p className="text-[10px] leading-5 text-black/55">
                  Your request has
                  entered the Fynaro
                  review process.
                  Important progress
                  will appear here.
                </p>
              </div>
            )}

            <header className="flex items-center justify-between gap-4 border-b border-black/[0.07] bg-white px-4 py-4">
              <div>
                <h2 className="text-[15px] font-semibold tracking-[-0.025em] text-[#111]">
                  Notifications
                </h2>

                <p className="mt-1 text-[9px] text-black/35">
                  Updates for {firstName}
                </p>
              </div>

              <button
                type="button"
                onClick={
                  onClose
                }
                aria-label="Close notifications"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-[#fafaf8] text-black/35 transition hover:border-black/15 hover:bg-[#f1f1ec] hover:text-black"
              >
                <FiX size={15} />
              </button>
            </header>

            <div className="flex items-center justify-between gap-3 border-b border-black/[0.07] bg-[#f5f5f1] px-4 py-2.5">
              <span className="text-[9px] text-black/40">
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
                  className="text-[9px] font-semibold text-[#786b24] transition hover:text-[#111] disabled:cursor-not-allowed disabled:opacity-50"
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
                        className="h-[82px] animate-pulse rounded-[14px] bg-black/[0.045]"
                      />
                    )
                  )}
                </div>
              ) : errorMessage ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-[12px] font-medium text-black/65">
                    Notifications
                    unavailable
                  </p>

                  <p className="mt-2 text-[10px] leading-5 text-black/35">
                    {
                      errorMessage
                    }
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      void loadNotifications()
                    }
                    className="mt-4 rounded-full border border-black/[0.09] bg-white px-4 py-2 text-[9px] font-semibold text-black/60 transition hover:bg-[#111] hover:text-white"
                  >
                    Try again
                  </button>
                </div>
              ) : notifications.length ===
                0 ? (
                <div className="px-6 py-14 text-center">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f1eed8] text-[#796d27] ring-1 ring-[#d6cc6d]/30">
                    <FiBell
                      size={18}
                    />
                  </div>

                  <p className="mt-4 text-[13px] font-semibold text-[#111]">
                    Nothing new yet
                  </p>

                  <p className="mx-auto mt-2 max-w-[250px] text-[10px] leading-5 text-black/35">
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
                          "relative flex gap-3 border-b border-black/[0.06] px-4 py-4 transition last:border-b-0",
                          unread
                            ? "bg-[#f8f5e7] hover:bg-[#f4efd5]"
                            : "bg-white hover:bg-[#f7f7f3]",
                        ].join(
                          " "
                        )}
                      >
                        {unread && (
                          <span className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-[#9a8732] shadow-[0_0_0_3px_rgba(214,204,109,0.22)]" />
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
                            <p className="text-[11px] font-semibold leading-5 text-black/75">
                              {
                                notification.title
                              }
                            </p>

                            <span className="shrink-0 text-[8px] text-black/30">
                              {formatTimeAgo(
                                notification.created_at
                              )}
                            </span>
                          </div>

                          <p className="mt-1 text-[9.5px] leading-[1.65] text-black/43">
                            {
                              notification.message
                            }
                          </p>

                          {notification.href && (
                            <p className="mt-2 text-[9px] font-semibold text-[#786b24]">
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

            <footer className="flex items-center justify-between gap-4 border-t border-black/[0.07] bg-white px-4 py-3">
              <p className="text-[8px] leading-4 text-black/30">
                Requests, proposals, payments and project updates.
              </p>

              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#a48f35]" />
            </footer>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}
