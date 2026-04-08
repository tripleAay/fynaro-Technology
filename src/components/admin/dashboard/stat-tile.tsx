"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

type StatTileProps = {
  title: string;
  count: number | string;
  icon: LucideIcon;
};

export default function StatTile({ title, count, icon: Icon }: StatTileProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="min-w-0 rounded-2xl border border-white/10 bg-zinc-900/70 p-6 shadow-md backdrop-blur-md transition-all"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm text-white/60">{title}</p>
          <h2 className="mt-2 truncate text-2xl font-semibold text-white">
            {count}
          </h2>
        </div>

        <div className="shrink-0 rounded-xl bg-[#d6cc6d]/20 p-3">
          <Icon className="h-6 w-6 text-[#d6cc6d]" />
        </div>
      </div>
    </motion.div>
  );
}