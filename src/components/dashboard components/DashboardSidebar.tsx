"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  BadgeHelp,
  BriefcaseBusiness,
  ChevronRight,
  CircleDollarSign,
  FileText,
  FolderKanban,
  Globe2,
  House,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Palette,
  PanelsTopLeft,
  Settings,
  Smartphone,
  UserRound,
  X,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
};

type UnreadCountResponse = {
  success?: boolean;
  unread_count?: number | string | null;
  conversation_id?: string | null;
  message?: string;
};

const buildLinks: NavItem[] = [
  {
    label: "Web Development",
    href: "/shop/web-development",
    icon: Globe2,
  },
  {
    label: "Mobile Apps",
    href: "/shop/mobile",
    icon: Smartphone,
  },
  {
    label: "Digital Products",
    href: "/shop/product",
    icon: PanelsTopLeft,
  },
  {
    label: "Design",
    href: "/shop/design",
    icon: Palette,
  },
];

const workspaceLinks: NavItem[] = [
  {
    label: "Projects",
    href: "/shop/projects",
    icon: FolderKanban,
  },
  {
    label: "Requests",
    href: "/shop/requests",
    icon: FileText,
  },
  {
    label: "Proposals",
    href: "/shop/proposals",
    icon: BriefcaseBusiness,
  },
  {
    label: "Orders",
    href: "/shop/orders",
    icon: Package,
  },
  {
    label: "Payments",
    href: "/shop/billing",
    icon: CircleDollarSign,
  },
  {
    label: "Messages",
    href: "/shop/messages",
    icon: MessageSquare,
  },
];

const accountLinks: NavItem[] = [
  {
    label: "Profile",
    href: "/shop/profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    href: "/shop/settings",
    icon: Settings,
  },
  {
    label: "Support",
    href: "/shop/support",
    icon: BadgeHelp,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const [
    unreadMessages,
    setUnreadMessages,
  ] = useState(0);

  // ======================================================
  // ACTIVE ROUTE
  // ======================================================

  const isActive = (
    href: string
  ) => {
    if (href === "/shop") {
      return pathname === "/shop";
    }

    return (
      pathname === href ||
      pathname.startsWith(
        `${href}/`
      )
    );
  };

  // ======================================================
  // LOAD CLIENT UNREAD COUNT
  // ======================================================

  const loadUnreadMessages =
    useCallback(async () => {
      try {
        const response =
          await fetch(
            "/api/client/conversations/unread-count",
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
          if (
            response.status ===
            401
          ) {
            setUnreadMessages(0);
          }

          return;
        }

        const text =
          await response.text();

        if (!text) {
          setUnreadMessages(0);
          return;
        }

        let data: UnreadCountResponse;

        try {
          data =
            JSON.parse(text);
        } catch {
          return;
        }

        const count =
          Number(
            data.unread_count ??
              0
          );

        setUnreadMessages(
          Number.isFinite(count)
            ? Math.max(0, count)
            : 0
        );
      } catch (error) {
        console.error(
          "[CLIENT SIDEBAR UNREAD]",
          error
        );
      }
    }, []);

  // ======================================================
  // POLLING + WINDOW REFRESH
  // ======================================================

  useEffect(() => {
    void loadUnreadMessages();

    const interval =
      window.setInterval(
        () => {
          void loadUnreadMessages();
        },
        15000
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
        setUnreadMessages(0);

        void loadUnreadMessages();
      };

    window.addEventListener(
      "focus",
      handleFocus
    );

    window.addEventListener(
      "fynaro:client-messages-read",
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
        "fynaro:client-messages-read",
        handleMessagesRead
      );

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [loadUnreadMessages]);

  // ======================================================
  // ROUTE CHANGE
  // ======================================================

  useEffect(() => {
    if (
      pathname ===
        "/shop/messages" ||
      pathname.startsWith(
        "/shop/messages/"
      )
    ) {
      setUnreadMessages(0);
    }

    void loadUnreadMessages();
  }, [
    pathname,
    loadUnreadMessages,
  ]);

  // ======================================================
  // NAV LINK
  // ======================================================

  function NavLink({
    item,
  }: {
    item: NavItem;
  }) {
    const Icon =
      item.icon;

    const active =
      isActive(
        item.href
      );

    const isMessages =
      item.href ===
      "/shop/messages";

    return (
      <Link
        href={item.href}
        onClick={() => {
          setMobileOpen(false);

          if (isMessages) {
            setUnreadMessages(0);
          }
        }}
        className={[
          "group flex h-[44px] items-center gap-3 rounded-[11px] px-3.5",
          "text-[12.5px] font-medium transition-all duration-200",

          active
            ? "bg-[#111] text-white shadow-[0_5px_16px_rgba(0,0,0,0.07)]"
            : "text-black/55 hover:bg-black/[0.045] hover:text-black",
        ].join(" ")}
      >
        <div className="relative shrink-0">
          <Icon
            size={17}
            strokeWidth={1.7}
            className={[
              "shrink-0 transition-colors",

              active
                ? "text-white"
                : "text-black/38 group-hover:text-black/70",
            ].join(" ")}
          />

          {isMessages &&
            unreadMessages >
              0 && (
              <span
                className={[
                  "absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#d6cc6d]",

                  active
                    ? "ring-2 ring-[#111]"
                    : "ring-2 ring-[#fafaf8]",
                ].join(" ")}
              />
            )}
        </div>

        <span className="truncate">
          {item.label}
        </span>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {isMessages &&
            unreadMessages >
              0 && (
              <span
                title={`${unreadMessages} unread message${
                  unreadMessages === 1
                    ? ""
                    : "s"
                }`}
                className={[
                  "flex min-w-[22px] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-4",

                  active
                    ? "bg-[#d6cc6d] text-[#111]"
                    : "bg-[#111] text-white",
                ].join(" ")}
              >
                {unreadMessages >
                99
                  ? "99+"
                  : unreadMessages}
              </span>
            )}

          {active && (
            <ChevronRight
              size={13}
              strokeWidth={1.8}
              className="shrink-0 text-white/45"
            />
          )}
        </div>
      </Link>
    );
  }

  // ======================================================
  // SIDEBAR CONTENT
  // ======================================================

  function SidebarContent() {
    return (
      <>
        {/* BRAND */}

        <div className="flex h-[74px] shrink-0 items-center border-b border-black/[0.07] px-5">
          <Link
            href="/shop"
            onClick={() =>
              setMobileOpen(false)
            }
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#111] text-[12px] font-bold text-white">
              F
            </div>

            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold tracking-[-0.025em]">
                Fynaro
              </p>

              <p className="mt-0.5 truncate text-[9.5px] text-black/38">
                Client Workspace
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() =>
              setMobileOpen(false)
            }
            aria-label="Close navigation"
            className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-black/45 transition hover:bg-black/[0.05] hover:text-black lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* NAVIGATION */}

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <SidebarSection title="Overview">
            <NavLink
              item={{
                label:
                  "Dashboard",

                href:
                  "/shop",

                icon:
                  House,
              }}
            />
          </SidebarSection>

          <SidebarSection title="Build">
            {buildLinks.map(
              (item) => (
                <NavLink
                  key={
                    item.href
                  }
                  item={
                    item
                  }
                />
              )
            )}
          </SidebarSection>

          <SidebarSection title="Workspace">
            {workspaceLinks.map(
              (item) => (
                <NavLink
                  key={
                    item.href
                  }
                  item={
                    item
                  }
                />
              )
            )}
          </SidebarSection>

          <SidebarSection
            title="Account"
            last
          >
            {accountLinks.map(
              (item) => (
                <NavLink
                  key={
                    item.href
                  }
                  item={
                    item
                  }
                />
              )
            )}
          </SidebarSection>
        </div>

        {/* BOTTOM */}

        <div className="shrink-0 border-t border-black/[0.07] p-4">
          <button
            type="button"
            className="mt-2.5 flex h-[42px] w-full items-center gap-3 rounded-[11px] px-3.5 text-[12px] font-medium text-black/45 transition hover:bg-black/[0.04] hover:text-black"
          >
            <LogOut
              size={16}
              strokeWidth={
                1.7
              }
            />

            Log out
          </button>
        </div>
      </>
    );
  }

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <>
      {/* MOBILE TRIGGER */}

      <button
        type="button"
        onClick={() =>
          setMobileOpen(true)
        }
        aria-label="Open navigation"
        className="fixed left-4 top-[18px] z-[60] flex h-10 w-10 items-center justify-center rounded-[10px] border border-black/[0.08] bg-white shadow-sm lg:hidden"
      >
        <Menu size={18} />
      </button>

      {/* DESKTOP */}

      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[272px] flex-col border-r border-black/[0.07] bg-[#fafaf8] lg:flex">
        <SidebarContent />
      </aside>

      {/* MOBILE OVERLAY */}

      <div
        onClick={() =>
          setMobileOpen(false)
        }
        className={[
          "fixed inset-0 z-[70] bg-black/25 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden",

          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      {/* MOBILE SIDEBAR */}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-[80] flex w-[292px] flex-col border-r border-black/[0.08] bg-[#fafaf8] shadow-[18px_0_50px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-out lg:hidden",

          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full",
        ].join(" ")}
      >
        <SidebarContent />
      </aside>
    </>
  );
}

function SidebarSection({
  title,
  children,
  last = false,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={
        last
          ? "mb-1"
          : "mb-6"
      }
    >
      <p className="mb-2 px-3 text-[8.5px] font-semibold uppercase tracking-[0.17em] text-black/28">
        {title}
      </p>

      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
}