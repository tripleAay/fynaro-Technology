"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  Bell,
  ChevronDown,
  CircleHelp,
  CreditCard,
  FolderKanban,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";

import {
  useCart,
} from "@/contexts/cartContext";

import useLogout from "@/hooks/useLogout";

import NotificationPanel from "@/components/dashboard components/notificationPanel";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type DashboardProfile = {
  id?: string;

  external_auth_id?: string;

  email: string;

  full_name?: string | null;

  role?: string | null;

  avatar_url?: string | null;
};

type DashboardTopbarProps = {
  profile: DashboardProfile;

  projectRequestJustCreated?: boolean;

  onMobileMenuOpen?: () => void;
};

type SearchItem = {
  title: string;
  description: string;
  href: string;
  keywords: string[];
};

type CartItem = {
  id: string | number;
  quantity?: number;
};

/* -------------------------------------------------------------------------- */
/* SEARCH DATA                                                                */
/* -------------------------------------------------------------------------- */

const searchItems: SearchItem[] = [
  {
    title: "Dashboard",
    description: "Main Fynaro workspace",
    href: "/shop",
    keywords: [
      "dashboard",
      "home",
      "workspace",
    ],
  },
  {
    title: "Web Development",
    description: "Websites and digital builds",
    href: "/shop/web-development",
    keywords: [
      "website",
      "web",
      "development",
      "launch",
      "growth",
      "custom",
    ],
  },
  {
    title: "Mobile Apps",
    description: "Mobile application services",
    href: "/shop/mobile",
    keywords: [
      "mobile",
      "app",
      "ios",
      "android",
    ],
  },
  {
    title: "Digital Products",
    description: "Platforms, SaaS and product systems",
    href: "/shop/product",
    keywords: [
      "product",
      "saas",
      "platform",
      "system",
    ],
  },
  {
    title: "Design",
    description: "Brand and product design services",
    href: "/shop/design",
    keywords: [
      "design",
      "branding",
      "brand",
      "ui",
      "ux",
    ],
  },
  {
    title: "Printed Products",
    description: "Print, merchandise and branding products",
    href: "/shop/printed-products",
    keywords: [
      "print",
      "merch",
      "shirts",
      "cards",
      "flyers",
      "banner",
    ],
  },
  {
    title: "Projects",
    description: "Active and completed projects",
    href: "/shop/projects",
    keywords: [
      "projects",
      "active",
      "milestone",
    ],
  },
  {
    title: "Requests",
    description: "Project and service requests",
    href: "/shop/requests",
    keywords: [
      "request",
      "brief",
      "project request",
    ],
  },
  {
    title: "Proposals",
    description: "Review your project proposals",
    href: "/shop/proposals",
    keywords: [
      "proposal",
      "quote",
      "scope",
    ],
  },
  {
    title: "Orders",
    description: "Purchases and confirmed orders",
    href: "/shop/orders",
    keywords: [
      "orders",
      "purchase",
      "order",
    ],
  },
  {
    title: "Payments",
    description: "Billing and payment records",
    href: "/shop/billing",
    keywords: [
      "billing",
      "payment",
      "invoice",
      "receipt",
    ],
  },
  {
    title: "Messages",
    description: "Conversations with Fynaro",
    href: "/shop/messages",
    keywords: [
      "message",
      "chat",
      "conversation",
    ],
  },
  {
    title: "Cart",
    description: "Review selected products",
    href: "/shop/cart",
    keywords: [
      "cart",
      "basket",
      "checkout",
    ],
  },
  {
    title: "Profile",
    description: "Personal and business details",
    href: "/shop/profile",
    keywords: [
      "profile",
      "account",
      "personal",
    ],
  },
  {
    title: "Settings",
    description: "Notifications and security",
    href: "/shop/settings",
    keywords: [
      "settings",
      "security",
      "notifications",
    ],
  },
  {
    title: "Support",
    description: "Get help from Fynaro",
    href: "/shop/support",
    keywords: [
      "support",
      "help",
      "issue",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* HEADER                                                                     */
/* -------------------------------------------------------------------------- */

export default function DashboardTopbar({
  profile,
  projectRequestJustCreated = false,
  onMobileMenuOpen,
}: DashboardTopbarProps) {
  const pathname =
    usePathname();

  const router =
    useRouter();

  const logout =
    useLogout();

  const {
    items,
  } = useCart();

  const profileRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const searchRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const [
    profileOpen,
    setProfileOpen,
  ] = useState(false);

  const [
    notificationsOpen,
    setNotificationsOpen,
  ] = useState(false);

  const [
    hasUnreadNotifications,
    setHasUnreadNotifications,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    searchOpen,
    setSearchOpen,
  ] = useState(false);

  const [
    mobileSearchOpen,
    setMobileSearchOpen,
  ] = useState(false);

  /* ------------------------------------------------------------------------ */
  /* PROFILE                                                                  */
  /* ------------------------------------------------------------------------ */

  const displayName =
    profile.full_name?.trim() ||
    profile.email?.split("@")[0] ||
    "Fynaro Client";

  const initials =
    getInitials(
      displayName
    );

  /* ------------------------------------------------------------------------ */
  /* CART COUNT                                                               */
  /* ------------------------------------------------------------------------ */

  const cartCount =
    useMemo(() => {
      return (
        items?.reduce(
          (
            total: number,
            item: CartItem
          ) =>
            total +
            (item.quantity ??
              1),
          0
        ) ?? 0
      );
    }, [
      items,
    ]);

  /* ------------------------------------------------------------------------ */
  /* CURRENT PAGE                                                             */
  /* ------------------------------------------------------------------------ */

  const currentPage =
    useMemo(() => {
      if (
        pathname ===
        "/shop"
      ) {
        return "Dashboard";
      }

      const match =
        searchItems.find(
          (item) =>
            item.href !==
              "/shop" &&
            pathname.startsWith(
              item.href
            )
        );

      return (
        match?.title ??
        "Workspace"
      );
    }, [
      pathname,
    ]);

  /* ------------------------------------------------------------------------ */
  /* SEARCH                                                                   */
  /* ------------------------------------------------------------------------ */

  const searchResults =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      if (!query) {
        return searchItems.slice(
          0,
          6
        );
      }

      return searchItems
        .filter(
          (item) => {
            const haystack = [
              item.title,
              item.description,
              ...item.keywords,
            ]
              .join(" ")
              .toLowerCase();

            return haystack.includes(
              query
            );
          }
        )
        .slice(
          0,
          7
        );
    }, [
      search,
    ]);

  function goToResult(
    href: string
  ) {
    setSearch("");
    setSearchOpen(false);
    setMobileSearchOpen(
      false
    );

    router.push(
      href
    );
  }

  /* ------------------------------------------------------------------------ */
  /* NOTIFICATION FLAG                                                       */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (
      projectRequestJustCreated
    ) {
      setHasUnreadNotifications(
        true
      );
    }
  }, [
    projectRequestJustCreated,
  ]);

  /* ------------------------------------------------------------------------ */
  /* OUTSIDE CLICK                                                            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    function handleClick(
      event: MouseEvent
    ) {
      const target =
        event.target as Node;

      if (
        profileRef.current &&
        !profileRef.current.contains(
          target
        )
      ) {
        setProfileOpen(
          false
        );
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(
          target
        )
      ) {
        setSearchOpen(
          false
        );
      }
    }

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  /* ------------------------------------------------------------------------ */
  /* ESCAPE                                                                   */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (
        event.key ===
        "Escape"
      ) {
        setProfileOpen(
          false
        );

        setSearchOpen(
          false
        );

        setMobileSearchOpen(
          false
        );

        setNotificationsOpen(
          false
        );
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/[0.08] bg-[#f5f5f2]/92 backdrop-blur-xl">
        <div className="flex h-[72px] items-center gap-4 px-4 sm:px-6 lg:px-8">
          {/* -------------------------------------------------------------- */}
          {/* MOBILE MENU                                                    */}
          {/* -------------------------------------------------------------- */}

          {onMobileMenuOpen ? (
            <button
              type="button"
              onClick={
                onMobileMenuOpen
              }
              aria-label="Open navigation"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-black/50 transition hover:bg-black/[0.04] hover:text-black lg:hidden"
            >
              <Menu
                size={18}
                strokeWidth={
                  1.7
                }
              />
            </button>
          ) : (
            <div className="w-10 lg:hidden" />
          )}

          {/* -------------------------------------------------------------- */}
          {/* PAGE CONTEXT                                                   */}
          {/* -------------------------------------------------------------- */}

          <div className="hidden min-w-[130px] xl:block">
            <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-black/30">
              Fynaro Workspace
            </p>

            <p className="mt-1 truncate text-[11px] font-semibold text-black/65">
              {currentPage}
            </p>
          </div>

          {/* -------------------------------------------------------------- */}
          {/* SEARCH                                                         */}
          {/* -------------------------------------------------------------- */}

          <div
            ref={searchRef}
            className="relative hidden max-w-[390px] flex-1 md:block"
          >
            <div
              className={[
                "flex h-10 items-center gap-3 rounded-xl border bg-white/65 px-3 transition",
                searchOpen
                  ? "border-black/20 bg-white"
                  : "border-black/[0.08]",
              ].join(
                " "
              )}
            >
              <Search
                size={16}
                strokeWidth={
                  1.7
                }
                className="shrink-0 text-black/35"
              />

              <input
                type="search"
                value={
                  search
                }
                onChange={(
                  event
                ) => {
                  setSearch(
                    event.target
                      .value
                  );

                  setSearchOpen(
                    true
                  );
                }}
                onFocus={() =>
                  setSearchOpen(
                    true
                  )
                }
                onKeyDown={(
                  event
                ) => {
                  if (
                    event.key ===
                      "Enter" &&
                    searchResults[0]
                  ) {
                    goToResult(
                      searchResults[0]
                        .href
                    );
                  }
                }}
                placeholder="Search Fynaro..."
                aria-label="Search Fynaro"
                className="w-full bg-transparent text-[12px] text-black outline-none placeholder:text-black/30"
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch(
                      ""
                    )
                  }
                  aria-label="Clear search"
                  className="text-black/25 transition hover:text-black"
                >
                  <X
                    size={13}
                  />
                </button>
              )}
            </div>

            {/* SEARCH RESULTS */}

            {searchOpen && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-[16px] border border-black/[0.08] bg-white shadow-[0_18px_50px_rgba(0,0,0,0.10)]">
                <div className="border-b border-black/[0.06] px-4 py-3">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-black/30">
                    {search
                      ? "Search results"
                      : "Quick navigation"}
                  </p>
                </div>

                {searchResults.length >
                0 ? (
                  <div className="p-2">
                    {searchResults.map(
                      (
                        item
                      ) => (
                        <button
                          key={
                            item.href
                          }
                          type="button"
                          onClick={() =>
                            goToResult(
                              item.href
                            )
                          }
                          className="flex w-full items-center justify-between gap-4 rounded-[11px] px-3 py-2.5 text-left transition hover:bg-[#f5f5f1]"
                        >
                          <div>
                            <p className="text-[10px] font-semibold text-black/70">
                              {
                                item.title
                              }
                            </p>

                            <p className="mt-0.5 text-[8px] text-black/35">
                              {
                                item.description
                              }
                            </p>
                          </div>

                          <span className="text-[9px] text-black/20">
                            →
                          </span>
                        </button>
                      )
                    )}
                  </div>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-[10px] font-medium text-black/45">
                      No matching
                      Fynaro page.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* -------------------------------------------------------------- */}
          {/* RIGHT ACTIONS                                                  */}
          {/* -------------------------------------------------------------- */}

          <div className="ml-auto flex items-center gap-1">
            {/* MOBILE SEARCH */}

            <button
              type="button"
              onClick={() =>
                setMobileSearchOpen(
                  true
                )
              }
              aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-black/50 transition hover:bg-black/[0.04] hover:text-black md:hidden"
            >
              <Search
                size={17}
                strokeWidth={
                  1.7
                }
              />
            </button>

            {/* HELP */}

            <Link
              href="/shop/support"
              className="hidden h-10 items-center gap-2 rounded-xl px-3 text-[11px] font-medium text-black/45 transition hover:bg-black/[0.04] hover:text-black lg:flex"
            >
              <CircleHelp
                size={16}
                strokeWidth={
                  1.7
                }
              />

              Help
            </Link>

            {/* MESSAGES */}

            <Link
              href="/shop/messages"
              aria-label="Messages"
              className="hidden h-10 w-10 items-center justify-center rounded-xl text-black/50 transition hover:bg-black/[0.04] hover:text-black sm:flex"
            >
              <MessageSquare
                size={17}
                strokeWidth={
                  1.7
                }
              />
            </Link>

            {/* NOTIFICATIONS */}

            <button
              type="button"
              aria-label="Notifications"
              onClick={() => {
                setProfileOpen(
                  false
                );

                setNotificationsOpen(
                  (current) =>
                    !current
                );
              }}
              className={[
                "relative flex h-10 w-10 items-center justify-center rounded-xl transition",
                notificationsOpen
                  ? "bg-[#111] text-white"
                  : "text-black/50 hover:bg-black/[0.04] hover:text-black",
              ].join(
                " "
              )}
            >
              <Bell
                size={17}
                strokeWidth={
                  1.7
                }
              />

              {hasUnreadNotifications &&
                !notificationsOpen && (
                  <span className="absolute right-[9px] top-[8px] h-[5px] w-[5px] rounded-full bg-[#a68b39] ring-2 ring-[#f5f5f2]" />
                )}
            </button>

            {/* CART */}

            <Link
              href="/shop/cart"
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-black/50 transition hover:bg-black/[0.04] hover:text-black"
            >
              <ShoppingBag
                size={17}
                strokeWidth={
                  1.7
                }
              />

              {cartCount >
                0 && (
                <span className="absolute -right-[1px] -top-[1px] flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#111] px-1 text-[7px] font-semibold text-white ring-2 ring-[#f5f5f2]">
                  {cartCount >
                  99
                    ? "99+"
                    : cartCount}
                </span>
              )}
            </Link>

            {/* PROFILE */}

            <div
              ref={profileRef}
              className="relative ml-1"
            >
              <button
                type="button"
                aria-expanded={
                  profileOpen
                }
                aria-haspopup="menu"
                onClick={() => {
                  setNotificationsOpen(
                    false
                  );

                  setProfileOpen(
                    (current) =>
                      !current
                  );
                }}
                className={[
                  "group flex h-11 items-center gap-3 rounded-xl px-1.5 transition",
                  profileOpen
                    ? "bg-white shadow-sm"
                    : "hover:bg-black/[0.04]",
                ].join(
                  " "
                )}
              >
                {/* USER DETAILS */}

                <div className="hidden text-right sm:block">
                  <p className="max-w-[145px] truncate text-[10px] font-semibold text-black">
                    {
                      displayName
                    }
                  </p>

                  <p className="mt-[1px] max-w-[145px] truncate text-[8px] capitalize text-black/35">
                    {profile.role ||
                      "client"}
                  </p>
                </div>

                {/* AVATAR */}

                {profile.avatar_url ? (
                  <Image
                    src={
                      profile.avatar_url
                    }
                    alt={
                      displayName
                    }
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover ring-1 ring-black/[0.08]"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111] text-[9px] font-semibold uppercase tracking-[0.04em] text-white transition group-hover:bg-black/80">
                    {
                      initials
                    }
                  </div>
                )}

                <ChevronDown
                  size={12}
                  strokeWidth={
                    1.8
                  }
                  className={[
                    "hidden text-black/30 transition sm:block",
                    profileOpen
                      ? "rotate-180"
                      : "",
                  ].join(
                    " "
                  )}
                />
              </button>

              {/* PROFILE MENU */}

              {profileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-[calc(100%+9px)] w-[285px] overflow-hidden rounded-[17px] border border-black/[0.08] bg-white shadow-[0_22px_65px_rgba(0,0,0,0.11)]"
                >
                  {/* ACCOUNT */}

                  <div className="border-b border-black/[0.07] p-4">
                    <div className="flex items-center gap-3">
                      {profile.avatar_url ? (
                        <Image
                          src={
                            profile.avatar_url
                          }
                          alt={
                            displayName
                          }
                          width={
                            40
                          }
                          height={
                            40
                          }
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111] text-[10px] font-semibold text-white">
                          {
                            initials
                          }
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold text-black/75">
                          {
                            displayName
                          }
                        </p>

                        <p className="mt-0.5 truncate text-[8px] text-black/35">
                          {
                            profile.email
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* MAIN LINKS */}

                  <div className="p-2">
                    <MenuItem
                      href="/shop/profile"
                      icon={
                        UserRound
                      }
                      title="Profile"
                      description="Personal and business details"
                      onClick={() =>
                        setProfileOpen(
                          false
                        )
                      }
                    />

                    <MenuItem
                      href="/shop/projects"
                      icon={
                        FolderKanban
                      }
                      title="Projects"
                      description="View active project work"
                      onClick={() =>
                        setProfileOpen(
                          false
                        )
                      }
                    />

                    <MenuItem
                      href="/shop/billing"
                      icon={
                        CreditCard
                      }
                      title="Payments"
                      description="Billing and payment records"
                      onClick={() =>
                        setProfileOpen(
                          false
                        )
                      }
                    />

                    <MenuItem
                      href="/shop/settings"
                      icon={
                        Settings
                      }
                      title="Settings"
                      description="Notifications and security"
                      onClick={() =>
                        setProfileOpen(
                          false
                        )
                      }
                    />

                    <MenuItem
                      href="/shop/support"
                      icon={
                        CircleHelp
                      }
                      title="Support"
                      description="Get help from Fynaro"
                      onClick={() =>
                        setProfileOpen(
                          false
                        )
                      }
                    />
                  </div>

                  {/* LOGOUT */}

                  <div className="border-t border-black/[0.07] p-2">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(
                          false
                        );

                        logout();
                      }}
                      className="flex w-full items-center gap-3 rounded-[11px] px-3 py-2.5 text-left transition hover:bg-[#f5f5f1]"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f1f1ed] text-black/45">
                        <LogOut
                          size={
                            12
                          }
                          strokeWidth={
                            1.7
                          }
                        />
                      </span>

                      <div>
                        <p className="text-[9px] font-semibold text-black/60">
                          Log out
                        </p>

                        <p className="mt-0.5 text-[7px] text-black/30">
                          End your
                          Fynaro session
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* MOBILE SEARCH                                                      */}
      {/* ------------------------------------------------------------------ */}

      {mobileSearchOpen && (
        <div className="fixed inset-0 z-[70] bg-black/20 backdrop-blur-sm md:hidden">
          <button
            type="button"
            aria-label="Close search"
            onClick={() =>
              setMobileSearchOpen(
                false
              )
            }
            className="absolute inset-0"
          />

          <div className="relative mx-3 mt-3 overflow-hidden rounded-[18px] border border-black/[0.08] bg-white shadow-xl">
            <div className="flex h-14 items-center gap-3 border-b border-black/[0.07] px-4">
              <Search
                size={16}
                className="text-black/35"
              />

              <input
                autoFocus
                type="search"
                value={
                  search
                }
                onChange={(
                  event
                ) =>
                  setSearch(
                    event.target
                      .value
                  )
                }
                placeholder="Search Fynaro..."
                className="flex-1 bg-transparent text-[12px] outline-none placeholder:text-black/30"
              />

              <button
                type="button"
                onClick={() =>
                  setMobileSearchOpen(
                    false
                  )
                }
                className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.04]"
              >
                <X
                  size={13}
                />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {searchResults.map(
                (
                  item
                ) => (
                  <button
                    key={
                      item.href
                    }
                    type="button"
                    onClick={() =>
                      goToResult(
                        item.href
                      )
                    }
                    className="w-full rounded-[11px] px-3 py-3 text-left transition hover:bg-[#f5f5f1]"
                  >
                    <p className="text-[10px] font-semibold text-black/70">
                      {
                        item.title
                      }
                    </p>

                    <p className="mt-1 text-[8px] text-black/35">
                      {
                        item.description
                      }
                    </p>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* NOTIFICATIONS                                                      */}
      {/* ------------------------------------------------------------------ */}

      <NotificationPanel
        open={
          notificationsOpen
        }
        onClose={() =>
          setNotificationsOpen(
            false
          )
        }
        userName={
          displayName
        }
        projectRequestJustCreated={
          projectRequestJustCreated
        }
        onUnreadChange={
          setHasUnreadNotifications
        }
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* MENU ITEM                                                                  */
/* -------------------------------------------------------------------------- */

function MenuItem({
  href,
  icon: Icon,
  title,
  description,
  onClick,
}: {
  href: string;

  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
  }>;

  title: string;

  description: string;

  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={
        onClick
      }
      className="flex items-center gap-3 rounded-[11px] px-3 py-2.5 transition hover:bg-[#f5f5f1]"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f2f2ed] text-black/45">
        <Icon
          size={12}
          strokeWidth={
            1.7
          }
        />
      </span>

      <div className="min-w-0">
        <p className="text-[9px] font-semibold text-black/65">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[7px] text-black/30">
          {
            description
          }
        </p>
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* INITIALS                                                                   */
/* -------------------------------------------------------------------------- */

function getInitials(
  name: string
) {
  const parts =
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  if (
    parts.length === 0
  ) {
    return "FC";
  }

  if (
    parts.length === 1
  ) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${parts[0][0]}${
    parts[
      parts.length - 1
    ][0]
  }`.toUpperCase();
}