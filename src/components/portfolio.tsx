"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type Project = {
  id: number;
  title: string;
  category: string;
  desc: string;
  cover: string;
  year?: string;
  snapshots?: string[];
  tags?: string[];
};

/* -------------------------------------------------------------------------- */
/*                                Data source                                 */
/* -------------------------------------------------------------------------- */

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Starlight Energy",
    category: "Branding",
    desc: "A bold identity system built to position a modern energy brand for scale.",
    cover: "/portfolio/brand-1.jpg",
    year: "2024",
    snapshots: [
      "/portfolio/brand-1.jpg",
      "/portfolio/brand-2-mock.jpg",
      "/portfolio/brand-3-logo.jpg",
    ],
    tags: ["Visual Identity", "Logo Design", "Brand Guidelines"],
  },
  {
    id: 2,
    title: "Fynaro Tech Website",
    category: "Web Design",
    desc: "A high-performance website focused on clarity, trust, and conversion.",
    cover: "/portfolio/web-1.jpg",
    year: "2025",
    snapshots: [
      "/portfolio/web-1.jpg",
      "/portfolio/web-2-desktop.jpg",
      "/portfolio/web-3-mobile.jpg",
      "/portfolio/web-4-cta.jpg",
    ],
    tags: ["UI/UX", "Motion", "Webflow"],
  },
  {
    id: 3,
    title: "Elite Prints",
    category: "Packaging",
    desc: "Premium packaging design crafted for luxury perception.",
    cover: "/portfolio/packaging-1.jpg",
    year: "2024",
    snapshots: ["/portfolio/packaging-1.jpg", "/portfolio/packaging-2-mockup.jpg"],
    tags: ["Embossing", "Die-cut", "Sustainable Materials"],
  },
  {
    id: 4,
    title: "Giftwave",
    category: "Product",
    desc: "Clean product UX for secure and seamless gift card trading.",
    cover: "/portfolio/giftcards-1.jpg",
    year: "2025",
    snapshots: [
      "/portfolio/giftcards-1.jpg",
      "/portfolio/giftcards-2-flow.jpg",
      "/portfolio/giftcards-3-dashboard.jpg",
    ],
    tags: ["Web App", "Fintech", "Dark Mode"],
  },
];

/* -------------------------------------------------------------------------- */
/*                               Animations                                   */
/* -------------------------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const springModal = {
  hidden: { opacity: 0, scale: 0.95, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 16 },
};

/* -------------------------------------------------------------------------- */
/*                             Main Component                                  */
/* -------------------------------------------------------------------------- */

export default function PortfolioShowcase() {
  const [filter, setFilter] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  /* ----------------------------- Derived data ----------------------------- */

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))],
    []
  );

  const visibleProjects = useMemo(() => {
    if (filter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  /* ---------------------------- Modal behavior ----------------------------- */

  useEffect(() => {
    if (!activeProject) return;

    document.body.style.overflow = "hidden";

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveProject(null);
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [activeProject]);

  /* ------------------------------------------------------------------------ */

  return (
    <section className="w-full bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* ------------------------------------------------------------------ */}
        {/* Header                                                              */}
        {/* ------------------------------------------------------------------ */}
        <motion.header
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-5">
            Selected <span className="text-emerald-600">Work</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Where thoughtful strategy meets precise craft.
          </p>
        </motion.header>

        {/* ------------------------------------------------------------------ */}
        {/* Filters                                                             */}
        {/* ------------------------------------------------------------------ */}
        <nav className="flex justify-center flex-wrap gap-3 mb-20">
          {categories.map((cat) => {
            const isActive = filter === cat;

            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                aria-pressed={isActive}
              >
                {cat}
              </button>
            );
          })}
        </nav>

        {/* ------------------------------------------------------------------ */}
        {/* Grid                                                                */}
        {/* ------------------------------------------------------------------ */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, i) => (
            <motion.article
              key={project.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{
                delay: i * 0.08,
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group cursor-pointer"
              onClick={() => setActiveProject(project)}
              role="button"
              tabIndex={0}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gray-50 aspect-[4/3] shadow-sm group-hover:shadow-xl transition-shadow">
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="mt-5 px-1">
                <p className="text-xs uppercase tracking-widest text-emerald-600 font-medium mb-2">
                  {project.category}
                </p>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-2">
                  {project.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Modal                                                               */}
        {/* ------------------------------------------------------------------ */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-modal
              role="dialog"
              onClick={() => setActiveProject(null)}
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />

              <motion.div
                variants={springModal}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-xl"
                  aria-label="Close project modal"
                >
                  ×
                </button>

                <div className="p-6 md:p-10">
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-gray-50 mb-10">
                    <Image
                      src={activeProject.cover}
                      alt={activeProject.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {activeProject.title}
                      </h2>
                      <span className="text-sm font-medium text-emerald-600 uppercase tracking-wide">
                        {activeProject.category}
                      </span>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                      {activeProject.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-10">
                      {activeProject.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {activeProject.year && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {activeProject.year}
                        </span>
                      )}
                    </div>

                    {activeProject.snapshots?.length && (
                      <>
                        <h4 className="text-xl font-semibold text-gray-900 mb-5">
                          Project Snapshots
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {activeProject.snapshots.map((src, idx) => (
                            <div
                              key={idx}
                              className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 shadow-sm"
                            >
                              <Image
                                src={src}
                                alt={`${activeProject.title} snapshot ${idx + 1}`}
                                fill
                                className="object-cover transition-transform hover:scale-105"
                              />
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ------------------------------------------------------------------ */}
        {/* CTA                                                                 */}
        {/* ------------------------------------------------------------------ */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-28 text-center"
        >
          <a
            href="/portfolio"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all shadow-md text-lg"
          >
            Explore Full Portfolio →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
