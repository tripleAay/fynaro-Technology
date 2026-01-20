"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Activity,
  MessageCircle,
  Wallet,
  User,
} from "lucide-react";

type NavItem = {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
};

const NAV_ITEMS: NavItem[] = [
  {
    key: "home",
    label: "Home",
    href: "/shop/credits",
    icon: <Home className="h-[18px] w-[18px]" />,
  },
  {
    key: "status",
    label: "Status",
    href: "/shop/credits/status",
    icon: <Activity className="h-[18px] w-[18px]" />,
  },
  {
    key: "chat",
    label: "Chat",
    href: "/chat",
    icon: <MessageCircle className="h-[18px] w-[18px]" />,
  },
  {
    key: "wallet",
    label: "Wallet",
    href: "/shop/credits/wallet",
    icon: <Wallet className="h-[18px] w-[18px]" />,
  },
  {
    key: "user",
    label: "User",
    href: "/shop/credits/user",
    icon: <User className="h-[18px] w-[18px]" />,
  },
];

export default function FooterNav() {
  const pathname = usePathname();

  // ✅ Only active when the path matches exactly
  const isActive = (href: string) => {
    if (!pathname) return false;

    const normalize = (p: string) =>
      p === "/" ? "/" : p.replace(/\/+$/, ""); // remove trailing slash except root

    return normalize(pathname) === normalize(href);
  };

  return (
    <>
      {/* MOBILE NAV */}
      <nav
        className="
          fixed bottom-0 inset-x-0 z-40
          flex items-center justify-center
          bg-black backdrop-blur-xl
          border-t border-white/10
          shadow-[0_0_20px_rgba(255,255,255,0.35)]
          md:hidden
        "
      >
        <div className="flex w-full max-w-md items-center justify-between px-3 py-3">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`
                  flex flex-1 flex-col items-center justify-center
                  gap-0.5 text-[10px] font-medium transition-all
                  ${active ? "text-white" : "text-white/50 hover:text-white"}
                `}
              >
                <span
                  className={`
                    flex h-8 w-8 items-center justify-center rounded-full transition-all
                    ${
                      active
                        ? "bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.55)]"
                        : "bg-white/5"
                    }
                  `}
                >
                  {item.icon}
                </span>
                <span className="leading-none">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* DESKTOP NAV */}
      <nav
        className="
          hidden md:flex
          fixed bottom-4 left-1/2 -translate-x-1/2 z-40
          rounded-full
          bg-black/85 backdrop-blur-2xl
          border border-white/10
          px-4 py-2.5
          shadow-[0_0_25px_rgba(255,255,255,0.35)]
          ring-1 ring-white/20
        "
      >
        <div className="flex items-center gap-2">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.key}
                href={item.href}
                className={`
                  group inline-flex items-center gap-1.5
                  rounded-full px-3.5 py-1.5
                  text-xs font-medium transition-all
                  ${
                    active
                      ? "bg-white text-black shadow-[0_0_18px_rgba(255,255,255,0.45)]"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }
                `}
              >
                <span
                  className={`
                    flex h-6 w-6 items-center justify-center rounded-full transition-all
                    ${
                      active
                        ? "bg-black/5"
                        : "bg-white/5 group-hover:bg-white/15"
                    }
                  `}
                >
                  {item.icon}
                </span>

                <span className="hidden sm:inline-block">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
