import Link from "next/link";
import {
  BadgeHelp,
  ChevronRight,
  Settings,
  UserRound,
} from "lucide-react";

const accountItems = [
  {
    title: "Profile",
    description:
      "Update your personal and business information.",
    href: "/shop/profile",
    icon: UserRound,
  },
  {
    title: "Settings",
    description:
      "Manage notifications, security and account preferences.",
    href: "/shop/settings",
    icon: Settings,
  },
  {
    title: "Support",
    description:
      "Get help with your account, projects or payments.",
    href: "/shop/support",
    icon: BadgeHelp,
  },
];

export default function AccountPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <header className="border-b border-black/[0.08] pb-8">
        <div className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.17em] text-black/30">
          <Link
            href="/shop"
            className="transition hover:text-black"
          >
            Dashboard
          </Link>

          <span>/</span>

          <span>Account</span>
        </div>

        <div className="mt-6">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/30">
            Client Account
          </p>

          <h1 className="mt-3 text-[38px] font-semibold leading-none tracking-[-0.05em] sm:text-[46px]">
            Account
          </h1>

          <p className="mt-3 max-w-[520px] text-[10px] leading-5 text-black/40">
            Manage your profile, workspace settings and support.
          </p>
        </div>
      </header>

      <main className="py-8">
        <div className="overflow-hidden rounded-[16px] border border-black/[0.08] bg-white">
          {accountItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-4 border-b border-black/[0.06] px-5 py-5 transition hover:bg-[#fafaf7] last:border-b-0"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4f4ef]">
                  <Icon
                    size={15}
                    strokeWidth={1.7}
                    className="text-black/45"
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold">
                    {item.title}
                  </p>

                  <p className="mt-1 text-[9px] leading-4 text-black/38">
                    {item.description}
                  </p>
                </div>

                <ChevronRight
                  size={13}
                  className="shrink-0 text-black/20 transition-transform group-hover:translate-x-0.5 group-hover:text-black/45"
                />
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}