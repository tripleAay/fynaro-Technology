"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Project = {
  id: number;
  title: string;
  category: string;
  desc: string;
  cover: string;
  year: string;
  client?: string;
  role?: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Starlight Energy",
    category: "Branding",
    desc: "Complete visual identity system for a next-generation renewable energy company.",
    cover: "/portfolio/brand-1.jpg",
    year: "2025",
    tags: ["Visual Identity", "Logo Design", "Brand Guidelines"],
  },
  {
    id: 2,
    title: "NovaPay",
    category: "Web Development",
    desc: "High-performance fintech platform with real-time analytics.",
    cover: "/portfolio/web-1.jpg",
    year: "2025",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
  },
  {
    id: 3,
    title: "Lumina",
    category: "Mobile Apps",
    desc: "Wellness and mindfulness mobile application.",
    cover: "/portfolio/mobile-1.jpg",
    year: "2024",
    tags: ["React Native", "UI Design"],
  },
];

export default function PortfolioShowcase() {
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = ["All", "Branding", "Web Development", "Mobile Apps"];

  const visibleProjects = useMemo(() => {
    return filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
  }, [activeProject]);

  return (
    <section className="w-full bg-[#050506] py-32 text-white">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">

        {/* 🔥 HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-xl"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Selected Work
          </h2>
          <p className="mt-4 text-gray-400 leading-relaxed">
            A curated collection of our best work across design, development, and product.
          </p>
        </motion.div>

        {/* 🔥 FILTERS */}
        <div className="flex flex-wrap justify-center gap-3 mt-12 mb-20">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-sm rounded-full transition-all ${
                filter === cat
                  ? "bg-white text-black"
                  : "border border-white/10 text-gray-400 hover:text-white hover:border-white/30"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* 🔥 ELITE GRID */}
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl w-full">

            {visibleProjects.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.8 }}
                whileHover="hover"
                className="group cursor-pointer"
                onClick={() => setActiveProject(project)}
              >
                {/* 🔥 IMAGE BLOCK */}
                <motion.div
                  className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-zinc-900"
                >
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />

                  {/* cinematic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* glow edge */}
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-white/20 transition" />
                </motion.div>

                {/* 🔥 TEXT */}
                <div className="mt-5 space-y-2">
                  <p className="text-xs uppercase tracking-widest text-emerald-400">
                    {project.category}
                  </p>

                  <h3 className="text-lg font-medium group-hover:text-white/80 transition">
                    {project.title}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {project.desc}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-28 text-center">
          <a className="text-sm tracking-widest text-gray-500 hover:text-white transition">
            VIEW ALL PROJECTS →
          </a>
        </div>
      </div>

      {/* 🔥 ELITE MODAL */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#0a0a0b] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* CLOSE */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-5 right-5 z-10 text-white/60 hover:text-white"
              >
                <X size={24} />
              </button>

              {/* IMAGE */}
              <div className="relative aspect-video">
                <Image
                  src={activeProject.cover}
                  alt={activeProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="p-10 space-y-6">
                <h2 className="text-3xl font-medium">
                  {activeProject.title}
                </h2>

                <p className="text-gray-400 leading-relaxed">
                  {activeProject.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-4">
                  {activeProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-4 py-1.5 text-xs border border-white/10 rounded-full text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}