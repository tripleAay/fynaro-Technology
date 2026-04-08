import Link from "next/link";

const links = [
  { label: "Home", href: "/cp/admin" },
  { label: "Product", href: "/cp/admin/products" },
  { label: "Project", href: "/cp/admin/projects" },
  { label: "Services", href: "/cp/admin/services" },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-[64px] h-[calc(100vh-64px)] w-[220px] border-r border-white/10 bg-black p-4">
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}