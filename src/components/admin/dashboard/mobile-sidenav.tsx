"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutGrid,
  Package,
  FolderKanban,
  BriefcaseBusiness,
  Mail,
  Settings,
} from "lucide-react";

const links = [
  { label: "Dashboard", href: "/cp/admin", icon: LayoutGrid },
  { label: "Products", href: "/cp/admin/products", icon: Package },
  { label: "Projects", href: "/cp/admin/projects", icon: FolderKanban },
  { label: "Services", href: "/cp/admin/services", icon: BriefcaseBusiness },
  { label: "Messages", href: "/cp/admin/messages", icon: Mail },
  { label: "Settings", href: "/cp/admin/settings", icon: Settings },
];

export default function MobileSideNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname ?? "";

  const isActive = (href: string) => {
    if (href === "/cp/admin") return currentPath === href;
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  return (
    <div className="border-b border-black/5 bg-white px-4 py-3">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2 text-sm font-medium text-slate-700"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        Menu
      </button>

      {open && (
        <div className="mt-3 rounded-2xl border border-black/10 bg-white p-3 shadow-sm">
          <nav className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    active
                      ? "bg-[#d6cc6d]/14 text-slate-900"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}