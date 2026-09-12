"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BadgeHelp,
  Boxes,
  BriefcaseBusiness,
  ChevronRight,
  CircleDollarSign,
  FileText,
  FolderKanban,
  Globe2,
  House,
  Layers3,
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

import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
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
    href: "/shop/order",
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
    href: "/contact",
    icon: BadgeHelp,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/shop") {
      return pathname === "/shop";
    }

    return pathname.startsWith(href);
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const Icon = item.icon;
    const active = isActive(item.href);

    return (
      <Link
        href={item.href}
        onClick={() => setMobileOpen(false)}
        className={[
          "group flex h-11 items-center gap-3 rounded-xl px-3",
          "text-[13px] font-medium transition-all duration-200",
          active
            ? "bg-[#111111] text-white"
            : "text-black/55 hover:bg-black/[0.045] hover:text-black",
        ].join(" ")}
      >
        <Icon
          size={17}
          strokeWidth={1.7}
          className={
            active
              ? "text-white"
              : "text-black/40 transition group-hover:text-black"
          }
        />

        <span>{item.label}</span>

        {active && (
          <ChevronRight
            size={14}
            className="ml-auto text-white/45"
          />
        )}
      </Link>
    );
  };

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="flex h-[72px] items-center border-b border-black/[0.08] px-6">
        <Link href="/shop" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111] text-[11px] font-bold tracking-tight text-white">
            F
          </div>

          <div>
            <p className="text-[14px] font-semibold tracking-[-0.02em]">
              Fynaro
            </p>
            <p className="text-[10px] text-black/40">
              Client Workspace
            </p>
          </div>
        </Link>

        <button
          onClick={() => setMobileOpen(false)}
          className="ml-auto flex h-9 w-9 items-center justify-center lg:hidden"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <SidebarSection title="Overview">
          <NavLink
            item={{
              label: "Dashboard",
              href: "/shop",
              icon: House,
            }}
          />
        </SidebarSection>

        <SidebarSection title="Build">
          {buildLinks.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </SidebarSection>

        <SidebarSection title="Workspace">
          {workspaceLinks.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </SidebarSection>

        <SidebarSection title="More">
          <NavLink
            item={{
              label: "Print & Branding",
              href: "/shop/printed-products",
              icon: Boxes,
            }}
          />
        </SidebarSection>

        <SidebarSection title="Account">
          {accountLinks.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </SidebarSection>
      </div>

      {/* Bottom */}
      <div className="border-t border-black/[0.08] p-4">
        <Link
          href="/contact"
          className="group block rounded-2xl bg-[#ecece7] p-4"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-black/35">
            Need help?
          </p>

          <div className="mt-2 flex items-center justify-between">
            <p className="text-[13px] font-semibold">
              Talk to Fynaro
            </p>

            <ChevronRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </div>
        </Link>

        <button className="mt-2 flex h-11 w-full items-center gap-3 rounded-xl px-3 text-[13px] font-medium text-black/45 transition hover:bg-black/[0.04] hover:text-black">
          <LogOut size={16} strokeWidth={1.7} />
          Log out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-[18px] z-[60] flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-white lg:hidden"
      >
        <Menu size={18} />
      </button>

      {/* Desktop */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[272px] flex-col border-r border-black/[0.08] bg-[#fafaf8] lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[70] bg-black/30 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-[80] flex w-[290px] flex-col bg-[#fafaf8] transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
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
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <p className="mb-2 px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/30">
        {title}
      </p>

      <div className="space-y-1">{children}</div>
    </div>
  );
}