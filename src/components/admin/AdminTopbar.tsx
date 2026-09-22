"use client";

import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Bell,
  ChevronDown,
  ExternalLink,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Search,
  Settings,
  UserRound,
  X,
} from "lucide-react";

type AdminTopbarProps = {
  name: string;
  role: string;
  email?: string;
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

  conversations?:
    AdminConversation[];

  data?:
    | AdminConversation[]
    | {
        conversations?:
          AdminConversation[];
      };
};

function formatRole(
  role: string
) {
  if (!role) {
    return "Administrator";
  }

  return role
    .replaceAll("_", " ")
    .replace(
      /\b\w/g,
      (letter) =>
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

  if (
    Array.isArray(
      data.data
    )
  ) {
    return data.data;
  }

  if (
    data.data &&
    !Array.isArray(
      data.data
    ) &&
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
  email,
}: AdminTopbarProps) {
  const router =
    useRouter();

  const pathname =
    usePathname();

  const profileMenuRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const searchInputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  const [
    unreadMessages,
    setUnreadMessages,
  ] = useState(0);

  const [
    profileMenuOpen,
    setProfileMenuOpen,
  ] = useState(false);

  const [
    mobileSearchOpen,
    setMobileSearchOpen,
  ] = useState(false);

  const [
    searchValue,
    setSearchValue,
  ] = useState("");

  const [
    signingOut,
    setSigningOut,
  ] = useState(false);

  const [
    messagesAvailable,
    setMessagesAvailable,
  ] = useState(true);

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

  const displayName =
    name?.trim() ||
    "Fynaro Admin";

  const firstName =
    displayName
      .split(" ")
      .filter(Boolean)[0] ||
    "Admin";

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

        if (
          response.status ===
            401 ||
          response.status === 403
        ) {
          setMessagesAvailable(
            false
          );

          setUnreadMessages(0);

          return;
        }

        if (!response.ok) {
          return;
        }

        const text =
          await response.text();

        if (!text) {
          return;
        }

        let data:
          ConversationsResponse;

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

        setMessagesAvailable(
          true
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
  // POLLING
  // ======================================================

  useEffect(() => {
    void loadUnreadMessages();

    if (!messagesAvailable) {
      return;
    }

    const interval =
      window.setInterval(
        () => {
          if (
            document.visibilityState ===
            "visible"
          ) {
            void loadUnreadMessages();
          }
        },
        30000
      );

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
  }, [
    loadUnreadMessages,
    messagesAvailable,
  ]);

  // ======================================================
  // ROUTE CHANGE
  // ======================================================

  useEffect(() => {
    setProfileMenuOpen(false);
    setMobileSearchOpen(false);

    void loadUnreadMessages();
  }, [
    pathname,
    loadUnreadMessages,
  ]);

  // ======================================================
  // CLOSE PROFILE MENU
  // ======================================================

  useEffect(() => {
    const handlePointerDown = (
      event: MouseEvent
    ) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(
          event.target as Node
        )
      ) {
        setProfileMenuOpen(
          false
        );
      }
    };

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape"
      ) {
        setProfileMenuOpen(
          false
        );

        setMobileSearchOpen(
          false
        );
      }

      if (
        (event.ctrlKey ||
          event.metaKey) &&
        event.key.toLowerCase() ===
          "k"
      ) {
        event.preventDefault();

        setMobileSearchOpen(
          true
        );

        window.setTimeout(
          () => {
            searchInputRef.current?.focus();
          },
          50
        );
      }
    };

    document.addEventListener(
      "mousedown",
      handlePointerDown
    );

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handlePointerDown
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  // ======================================================
  // SEARCH
  // ======================================================

  const handleSearch = (
    event:
      React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const query =
      searchValue.trim();

    if (!query) {
      return;
    }

    router.push(
      `/admin/search?q=${encodeURIComponent(
        query
      )}`
    );

    setMobileSearchOpen(false);
  };

  // ======================================================
  // SIGN OUT
  // ======================================================

  const handleSignOut =
    async () => {
      if (signingOut) {
        return;
      }

      setSigningOut(true);

      try {
        await fetch(
          "/api/auth/logout",
          {
            method: "POST",

            credentials:
              "include",

            headers: {
              Accept:
                "application/json",
            },
          }
        );
      } catch (error) {
        console.error(
          "[ADMIN SIGN OUT]",
          error
        );
      } finally {
        setProfileMenuOpen(
          false
        );

        router.replace(
          "/auth/login"
        );

        router.refresh();

        setSigningOut(false);
      }
    };

  return (
    <header className="sticky top-0 z-30 border-b border-black/[0.06] bg-[#fafaf8]/95 backdrop-blur-xl">
      <div className="flex h-[86px] items-center justify-between gap-4 px-4 sm:px-7 lg:px-9">
        {/* LEFT */}

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#111111]">
            Admin workspace
          </p>

          <p className="mt-0.5 truncate text-xs text-black/40">
            Welcome back,{" "}
            {firstName}
          </p>
        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-2">
          {/* DESKTOP SEARCH */}

          <form
            onSubmit={
              handleSearch
            }
            className="hidden h-10 w-[240px] items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-3 shadow-sm transition focus-within:border-[#d6cc6d] focus-within:ring-2 focus-within:ring-[#d6cc6d]/15 lg:flex"
          >
            <Search
              className="h-4 w-4 shrink-0 text-black/35"
              strokeWidth={1.8}
            />

            <input
              type="search"
              value={
                searchValue
              }
              onChange={(
                event
              ) =>
                setSearchValue(
                  event.target.value
                )
              }
              placeholder="Search Fynaro"
              aria-label="Search administration"
              className="min-w-0 flex-1 bg-transparent text-xs text-[#111111] outline-none placeholder:text-black/35"
            />

            <span className="rounded-md border border-black/[0.07] bg-[#f7f7f4] px-1.5 py-0.5 text-[9px] font-medium text-black/35">
              ⌘K
            </span>
          </form>

          {/* MOBILE SEARCH */}

          <button
            type="button"
            onClick={() =>
              setMobileSearchOpen(
                true
              )
            }
            aria-label="Open search"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-black/55 shadow-sm transition hover:-translate-y-0.5 hover:border-black/15 hover:text-[#111111] lg:hidden"
          >
            <Search
              className="h-[18px] w-[18px]"
              strokeWidth={1.8}
            />
          </button>

          {/* NOTIFICATIONS */}

          <Link
            href="/admin/messages"
            aria-label={
              unreadMessages > 0
                ? `${unreadMessages} unread messages`
                : "Admin messages"
            }
            title={
              unreadMessages > 0
                ? `${unreadMessages} unread messages`
                : "No unread messages"
            }
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-black/[0.08] bg-white text-black/55 shadow-sm transition hover:-translate-y-0.5 hover:border-black/15 hover:text-[#111111]"
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

          {/* PROFILE MENU */}

          <div
            ref={
              profileMenuRef
            }
            className="relative ml-1"
          >
            <button
              type="button"
              onClick={() =>
                setProfileMenuOpen(
                  (current) =>
                    !current
                )
              }
              aria-expanded={
                profileMenuOpen
              }
              aria-haspopup="menu"
              className={`flex items-center gap-2 rounded-xl border px-1.5 py-1 shadow-sm transition ${
                profileMenuOpen
                  ? "border-[#d6cc6d]/70 bg-white ring-2 ring-[#d6cc6d]/15"
                  : "border-transparent hover:border-black/[0.08] hover:bg-white"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111111] text-xs font-semibold tracking-wide text-white">
                {initials}
              </div>

              <div className="hidden min-w-0 text-left md:block">
                <p className="max-w-[150px] truncate text-sm font-medium text-[#111111]">
                  {displayName}
                </p>

                <p className="text-xs text-black/40">
                  {formatRole(
                    role
                  )}
                </p>
              </div>

              <ChevronDown
                className={`hidden h-4 w-4 text-black/35 transition-transform md:block ${
                  profileMenuOpen
                    ? "rotate-180"
                    : ""
                }`}
                strokeWidth={1.8}
              />
            </button>

            {profileMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-[calc(100%+10px)] w-[270px] overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.14)]"
              >
                <div className="border-b border-black/[0.06] bg-[#fafaf8] px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#111111] text-xs font-semibold tracking-wide text-white">
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#111111]">
                        {displayName}
                      </p>

                      <p className="truncate text-xs text-black/40">
                        {email ||
                          formatRole(
                            role
                          )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <Link
                    href="/admin"
                    role="menuitem"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-black/65 transition hover:bg-[#f6f5ef] hover:text-[#111111]"
                  >
                    <LayoutDashboard
                      className="h-4 w-4"
                      strokeWidth={
                        1.8
                      }
                    />

                    Admin dashboard
                  </Link>

                  <Link
                    href="/admin/profile"
                    role="menuitem"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-black/65 transition hover:bg-[#f6f5ef] hover:text-[#111111]"
                  >
                    <UserRound
                      className="h-4 w-4"
                      strokeWidth={
                        1.8
                      }
                    />

                    My profile
                  </Link>

                  <Link
                    href="/admin/settings"
                    role="menuitem"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-black/65 transition hover:bg-[#f6f5ef] hover:text-[#111111]"
                  >
                    <Settings
                      className="h-4 w-4"
                      strokeWidth={
                        1.8
                      }
                    />

                    Admin settings
                  </Link>

                  <Link
                    href="/shop"
                    role="menuitem"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-black/65 transition hover:bg-[#f6f5ef] hover:text-[#111111]"
                  >
                    <ExternalLink
                      className="h-4 w-4"
                      strokeWidth={
                        1.8
                      }
                    />

                    Open client dashboard
                  </Link>
                </div>

                <div className="border-t border-black/[0.06] p-2">
                  <button
                    type="button"
                    role="menuitem"
                    disabled={
                      signingOut
                    }
                    onClick={
                      handleSignOut
                    }
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {signingOut ? (
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                    ) : (
                      <LogOut
                        className="h-4 w-4"
                        strokeWidth={
                          1.8
                        }
                      />
                    )}

                    {signingOut
                      ? "Signing out..."
                      : "Sign out"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH PANEL */}

      {mobileSearchOpen && (
        <div className="absolute inset-x-0 top-0 z-50 flex h-[86px] items-center border-b border-black/[0.06] bg-[#fafaf8] px-4 sm:px-7 lg:hidden">
          <form
            onSubmit={
              handleSearch
            }
            className="flex h-11 flex-1 items-center gap-2 rounded-xl border border-[#d6cc6d]/70 bg-white px-3 ring-2 ring-[#d6cc6d]/15"
          >
            <Search
              className="h-4 w-4 shrink-0 text-black/40"
              strokeWidth={1.8}
            />

            <input
              ref={
                searchInputRef
              }
              type="search"
              value={
                searchValue
              }
              onChange={(
                event
              ) =>
                setSearchValue(
                  event.target.value
                )
              }
              placeholder="Search Fynaro administration"
              aria-label="Search administration"
              autoFocus
              className="min-w-0 flex-1 bg-transparent text-sm text-[#111111] outline-none placeholder:text-black/35"
            />

            <button
              type="button"
              onClick={() =>
                setMobileSearchOpen(
                  false
                )
              }
              aria-label="Close search"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-black/45 transition hover:bg-black/[0.05] hover:text-black"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </header>
  );
}