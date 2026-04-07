"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Project = {
  id: number;
  slug: string;
  title: string;
  meta: string;
  year: string;
  cover: string;
  summary: string;
};

type ProjectsGridProps = {
  activeFilter: string;
  filteredProjects: Project[];
};

export default function ProjectsGrid({
  activeFilter,
  filteredProjects,
}: ProjectsGridProps) {
  return (
    <section
      id="selected-work"
      className="relative overflow-hidden px-6 py-28 md:px-8 md:py-40"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-[#d6cc6d]/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-20 max-w-3xl">
          <p className="mb-4 text-[11px] tracking-[0.35em] text-white/35">
            SELECTED WORK
          </p>

          <h2 className="text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">
            A body of work across brand, product, web, and mobile.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
            Each project reflects a different challenge, but the same standard:
            build with purpose, design with clarity, and execute with intent.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.35 }}
            className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
          >
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-[30px] border border-white/8 bg-white/[0.02] transition-all duration-500 hover:-translate-y-1.5 hover:border-[#d6cc6d]/25 hover:bg-white/[0.04]"
              >
                <Link href={`/projects/${project.slug}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent transition duration-500 group-hover:from-black/40" />

                    <div className="absolute inset-0 bg-gradient-to-br from-[#d6cc6d]/0 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100 group-hover:from-[#d6cc6d]/10" />

                    <div className="absolute left-4 top-4">
                      <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] tracking-[0.25em] text-white/72 backdrop-blur-md transition duration-300 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">
                        {project.meta.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-7">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <span className="text-xs tracking-wide text-white/35">
                        {project.year}
                      </span>

                      <span className="text-[#d6cc6d] transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110">
                        <ArrowRight size={16} />
                      </span>
                    </div>

                    <h3 className="text-2xl font-semibold tracking-tight text-white transition duration-300 group-hover:text-white">
                      {project.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-white/58 transition duration-300 group-hover:text-white/68 md:text-[15px]">
                      {project.summary}
                    </p>

                    <div className="mt-8 h-px w-16 bg-white/10 transition-all duration-500 group-hover:w-24 group-hover:bg-[#d6cc6d]/50" />
                  </div>
                </Link>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}