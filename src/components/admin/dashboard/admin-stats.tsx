"use client";

import StatTile from "../dashboard/stat-tile";
import { Package, FolderKanban, Settings, Mail } from "lucide-react";

export default function AdminStats() {
  const stats = [
    { title: "Products", count: 12, icon: Package },
    { title: "Projects", count: 8, icon: FolderKanban },
    { title: "Services", count: 5, icon: Settings },
    { title: "Messages", count: 23, icon: Mail },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => (
        <StatTile
          key={index}
          title={item.title}
          count={item.count}
          icon={item.icon}
        />
      ))}
    </div>
  );
}