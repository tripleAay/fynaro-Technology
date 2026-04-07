"use client";

import { motion } from "framer-motion";
import {
  Layers3,
  Palette,
  Globe,
  Smartphone,
  Grid2x2,
} from "lucide-react";

type ProjectCategory = "All" | "Products" | "Branding" | "Web" | "Mobile Apps";

type ProjectsIntroProps = {
  filters: ProjectCategory[];
  activeFilter: ProjectCategory;
  setActiveFilter: (value: ProjectCategory) => void;
};

function categoryIcon(category: ProjectCategory) {
  switch (category) {
    case "All":
      return <Grid2x2 size={16} />;
    case "Products":
      return <Layers3 size={16} />;
    case "Branding":
      return <Palette size={16} />;
    case "Web":
      return <Globe size={16} />;
    case "Mobile Apps":
      return <Smartphone size={16} />;
    default:
      return <Grid2x2 size={16} />;
  }
}

export default function ProjectsIntro({
  filters,
  activeFilter,
  setActiveFilter,
}: ProjectsIntroProps) {
  return (
    <section className="relative overflow-hidden px-6 py-24 md:px-8 md:py-32">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[#d6cc6d]/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* approach */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-4 text-[11px] tracking-[0.35em] text-[#d6cc6d]">
            OUR APPROACH
          </p>

          <h2 className="text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            More than visuals.
            <span className="text-[#d6cc6d]"> A clearer direction.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/62 md:text-lg">
            We do not approach projects as surface-level visuals. Each one is
            shaped around what the business needs to communicate, how the
            product needs to work, and how the experience should feel. That is
            what gives the work structure, meaning, and staying power.
          </p>
        </motion.div>

        {/* filters */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-16 rounded-[30px] border border-white/8 bg-white/[0.02] p-6 md:mt-20 md:p-8"
        >
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-[11px] tracking-[0.35em] text-white/35">
              EXPLORE PROJECTS
            </p>

            <p className="text-sm text-white/40">Strategy · Design · Code</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {filters.map((item) => {
              const isActive = activeFilter === item;

              return (
                <button
                  key={item}
                  onClick={() => setActiveFilter(item)}
                  className={`group relative overflow-hidden rounded-2xl border px-5 py-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-[#d6cc6d]/40 bg-[#d6cc6d]/10 shadow-[0_10px_40px_rgba(214,204,109,0.08)]"
                      : "border-white/8 bg-black/20 hover:-translate-y-1 hover:border-[#d6cc6d]/30 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d6cc6d]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative z-10 flex items-center gap-3">
                    <span className="text-[#d6cc6d]">{categoryIcon(item)}</span>

                    <span
                      className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/80"
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}