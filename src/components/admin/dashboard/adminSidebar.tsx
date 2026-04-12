"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Package,
  FolderKanban,
  BriefcaseBusiness,
  Mail,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const links = [
  { label: "Dashboard", href: "/cp/admin", icon: LayoutGrid },
  { label: "Products", href: "/cp/admin/products", icon: Package },
  { label: "Projects", href: "/cp/admin/projects", icon: FolderKanban },
  { label: "Services", href: "/cp/admin/services", icon: BriefcaseBusiness },
  { label: "Messages", href: "/cp/admin/messages", icon: Mail },
  { label: "Settings", href: "/cp/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/cp/admin") return pathname === href;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="flex h-full w-full flex-col border-r border-black/5 bg-white">
      
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
        {links.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center justify-between rounded-2xl px-4 py-3 transition ${
                active
                  ? "bg-[#d6cc6d]/14 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    active
                      ? "bg-[#d6cc6d]/20 text-[#8f8440]"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-medium">{link.label}</p>
                  <p className="text-xs text-slate-400">
                    Open {link.label.toLowerCase()}
                  </p>
                </div>
              </div>

              <ChevronRight
                className={`h-4 w-4 transition ${
                  active
                    ? "text-[#8f8440]"
                    : "text-slate-300 group-hover:text-slate-500"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-black/5 p-4">
        <Link
          href="/logout"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
            <LogOut className="h-5 w-5" />
          </div>
          <span>Log Out</span>
        </Link>
      </div>
    </aside>
  );
}