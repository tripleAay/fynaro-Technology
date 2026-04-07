"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

type Project = {
  id: number;
  title: string;
  category: string;
  desc: string;
  cover: string;
  images?: string[];
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
    desc: "Complete visual identity system for a next-generation renewable energy company. The project covered brand strategy, logo design, typography direction, color system, and a robust guideline framework for digital and print consistency.",
    cover: "/portfolio/brand-1.jpg",
    images: [
      "/portfolio/brand-1.jpg",
      "/portfolio/brand-2.jpg",
      "/portfolio/brand-3.jpg",
    ],
    year: "2025",
    client: "Starlight Energy",
    role: "Brand Identity & Art Direction",
    tags: ["Visual Identity", "Logo Design", "Brand Guidelines"],
  },
  {
    id: 2,
    title: "NovaPay",
    category: "Web Development",
    desc: "High-performance fintech platform with real-time analytics, clean dashboard experience, and conversion-focused web architecture for modern digital payment workflows.",
    cover: "/portfolio/web-1.jpg",
    images: [
      "/portfolio/web-1.jpg",
      "/portfolio/web-2.jpg",
      "/portfolio/web-3.jpg",
    ],
    year: "2025",
    client: "NovaPay",
    role: "Product Design & Frontend Development",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
  },
  {
    id: 3,
    title: "Lumina",
    category: "Mobile Apps",
    desc: "Wellness and mindfulness mobile application crafted for a calmer user experience, intuitive habit flow, and emotionally warm interface design.",
    cover: "/portfolio/mobile-1.jpg",
    images: [
      "/portfolio/mobile-1.jpg",
      "/portfolio/mobile-2.jpg",
      "/portfolio/mobile-3.jpg",
    ],
    year: "2024",
    client: "Lumina",
    role: "Mobile UI/UX Design",
    tags: ["React Native", "UI Design"],
  },
];

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const gallery = (project.images?.length ? project.images : [project.cover]).slice(0, 3);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
  }, [project]);

  useEffect(() => {
    if (gallery.length <= 1) return;

    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % gallery.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [gallery.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        setActiveImage((prev) => (prev + 1) % gallery.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveImage((prev) => (prev - 1 + gallery.length) % gallery.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [gallery.length, onClose]);

  const sideThumbs = gallery.filter((_, i) => i !== activeImage).slice(0, 2);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 md:p-6 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="min-h-full flex items-center justify-center">
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl rounded-[2rem] border border-white/10 bg-[#0b0b0d] shadow-[0_20px_80px_rgba(0,0,0,0.45)] overflow-hidden"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 transition hover:text-white hover:border-white/20"
            aria-label="Close project details"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
            {/* LEFT: GALLERY */}
            <div className="border-b border-white/10 lg:border-b-0 lg:border-r border-white/10 p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-4">
                {/* MAIN IMAGE */}
                <div className="relative min-h-[320px] md:min-h-[520px] rounded-[1.5rem] overflow-hidden bg-white/[0.03]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={gallery[activeImage]}
                      initial={{ opacity: 0.35, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.2, scale: 0.985 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={gallery[activeImage]}
                        alt={`${project.title} preview ${activeImage + 1}`}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute left-4 bottom-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm">
                    <span>{activeImage + 1}</span>
                    <span className="text-white/40">/</span>
                    <span>{gallery.length}</span>
                  </div>
                </div>

                {/* THUMBNAILS */}
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                  {sideThumbs.map((img, idx) => {
                    const realIndex = gallery.findIndex((g) => g === img);

                    return (
                      <button
                        key={`${img}-${idx}`}
                        onClick={() => setActiveImage(realIndex)}
                        className="group relative h-32 md:h-[calc(50%-8px)] min-h-[140px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.03] text-left"
                        aria-label={`Show image ${realIndex + 1}`}
                      >
                        <Image
                          src={img}
                          alt={`${project.title} thumbnail ${realIndex + 1}`}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                        <div className="absolute left-3 bottom-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] text-white/85 backdrop-blur-sm">
                          Preview {realIndex + 1}
                        </div>
                      </button>
                    );
                  })}

                  {gallery.length === 1 && (
                    <div className="hidden md:block rounded-[1.25rem] border border-dashed border-white/10 bg-white/[0.02]" />
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: DETAILS */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-emerald-300">
                    {project.category}
                  </span>
                  <span className="text-sm text-white/35">{project.year}</span>
                </div>

                <h2 className="mt-5 text-3xl md:text-4xl font-semibold tracking-tight text-white">
                  {project.title}
                </h2>

                <p className="mt-5 max-w-xl text-sm md:text-[15px] leading-7 text-white/65">
                  {project.desc}
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                      Client
                    </p>
                    <p className="mt-2 text-sm text-white/90">
                      {project.client ?? "Confidential Client"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                      Role
                    </p>
                    <p className="mt-2 text-sm text-white/90">
                      {project.role ?? "Creative / Technical Direction"}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                    Deliverables
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[0.99]">
                  View Case Study
                  <ArrowUpRight size={16} />
                </button>

                <button
                  onClick={onClose}
                  className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  return (
    <section className="w-full bg-[#050506] py-28 md:py-32 text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
          className="max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/45">
            Portfolio
          </span>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
            Selected Work
          </h2>

          <p className="mt-4 text-sm leading-7 text-white/50 md:text-base">
            A curated collection of standout work across design, product, and
            digital experience — presented with more depth and clarity.
          </p>
        </motion.div>

        {/* FILTERS */}
        <div className="mt-12 mb-16 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.97 }}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2.5 text-sm transition-all ${
                filter === cat
                  ? "bg-white text-black shadow-[0_8px_30px_rgba(255,255,255,0.08)]"
                  : "border border-white/10 text-white/55 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* GRID */}
        <div className="w-full">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.55 }}
                onClick={() => setActiveProject(project)}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] transition duration-300 hover:border-white/20 hover:bg-white/[0.03]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

                    <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-300">
                          {project.category}
                        </p>
                        <h3 className="mt-2 text-xl font-medium text-white">
                          {project.title}
                        </h3>
                      </div>

                      <div className="rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/70 backdrop-blur-sm">
                        {project.year}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="line-clamp-2 text-sm leading-6 text-white/50">
                      {project.desc}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <button className="text-sm tracking-[0.22em] text-white/40 transition hover:text-white">
            VIEW ALL PROJECTS →
          </button>
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}