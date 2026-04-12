"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

type StatTileProps = {
  title: string;
  count: number | string;
  icon: LucideIcon;
};

export default function StatTile({
  title,
  count,
  icon: Icon,
}: StatTileProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="w-full min-w-0 rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="mt-2 truncate text-2xl font-semibold text-slate-900">
            {count}
          </h2>
        </div>

        <div className="shrink-0 rounded-2xl bg-[#d6cc6d]/15 p-3">
          <Icon className="h-5 w-5 text-[#8f8440]" />
        </div>
      </div>
    </motion.div>
  );
}