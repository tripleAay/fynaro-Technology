"use client";

import StatTile from "@/components/admin/dashboard/stat-tile";
import {
  Package,
  FolderKanban,
  BriefcaseBusiness,
  Mail,
} from "lucide-react";

export default function AdminStats() {
  const stats = [
    { title: "Products", count: 12, icon: Package },
    { title: "Projects", count: 8, icon: FolderKanban },
    { title: "Services", count: 5, icon: BriefcaseBusiness },
    { title: "Messages", count: 23, icon: Mail },
  ];

  return (
    <section className="w-full ">
      <div className="w-full max-w-xl">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((item) => (
            <StatTile
              key={item.title}
              title={item.title}
              count={item.count}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}