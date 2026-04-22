"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import Link from "next/link";

type DbProject = {
  id: string;
  title: string;
  category: string | null;
  subtitle?: string | null;
  year: string | null;
  client_name: string | null;
  cover_image: string | null;
  gallery_images?: string[] | null;
  created_at?: string | null;
  status?: "Published" | "Draft" | "Archived" | null;
  link?: string | null;
  services?: string[] | null;
  overview?: string | null;
  challenge?: string | null;
  approach?: string | null;
  outcome?: string | null;
};

type ProjectResponse = {
  projects: DbProject[];
};

function normalizeTags(project: DbProject) {
  if (Array.isArray(project.services) && project.services.length > 0) {
    return project.services;
  }

  const fallbackTags: string[] = [];

  if (project.category) fallbackTags.push(project.category);
  if (project.year) fallbackTags.push(project.year);
  if (project.client_name) fallbackTags.push(project.client_name);

  return fallbackTags.slice(0, 3);
}

function getProjectDescription(project: DbProject) {
  return (
    project.overview ||
    project.subtitle ||
    project.challenge ||
    project.approach ||
    project.outcome ||
    "A premium project built with clarity, structure, and execution in mind."
  );
}

function getProjectGallery(project: DbProject) {
  const gallery = [
    project.cover_image,
    ...(Array.isArray(project.gallery_images) ? project.gallery_images : []),
  ].filter(Boolean) as string[];

  return Array.from(new Set(gallery)).slice(0, 5);
}

function ProjectModal({
  project,
  onClose,
}: {
  project: DbProject;
  onClose: () => void;
}) {
  const gallery = getProjectGallery(project);
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
  const description = getProjectDescription(project);
  const tags = normalizeTags(project);

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-md md:p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center">
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0d] shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 transition hover:border-white/20 hover:text-white"
            aria-label="Close project details"
          >
            <X size={18} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="border-b border-white/10 p-4 md:p-5 lg:border-b-0 lg:border-r">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_170px]">
                <div className="relative min-h-[300px] overflow-hidden rounded-[1.5rem] bg-white/[0.03] md:min-h-[500px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={gallery[activeImage] || "fallback"}
                      initial={{ opacity: 0.35, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.2, scale: 0.985 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={gallery[activeImage] || "/categories/web.png"}
                        alt={`${project.title || "Project"} preview ${activeImage + 1}`}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm">
                    <span>{gallery.length ? activeImage + 1 : 1}</span>
                    <span className="text-white/40">/</span>
                    <span>{gallery.length || 1}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                  {sideThumbs.map((img, idx) => {
                    const realIndex = gallery.findIndex((g) => g === img);

                    return (
                      <button
                        key={`${img}-${idx}`}
                        onClick={() => setActiveImage(realIndex)}
                        className="group relative h-28 min-h-[130px] overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.03] text-left md:h-[calc(50%-8px)]"
                        aria-label={`Show image ${realIndex + 1}`}
                      >
                        <Image
                          src={img}
                          alt={`${project.title || "Project"} thumbnail ${realIndex + 1}`}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
                        <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] text-white/85 backdrop-blur-sm">
                          Preview {realIndex + 1}
                        </div>
                      </button>
                    );
                  })}

                  {gallery.length <= 1 && (
                    <div className="hidden rounded-[1.25rem] border border-dashed border-white/10 bg-white/[0.02] md:block" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between p-5 md:p-7 lg:p-8">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-emerald-300">
                    {project.category || "Project"}
                  </span>
                  <span className="text-sm text-white/35">{project.year || "—"}</span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl lg:text-4xl">
                  {project.title || "Untitled Project"}
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 md:leading-7 text-white/65 md:text-[15px]">
                  {description}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                      Client
                    </p>
                    <p className="mt-2 text-sm text-white/90">
                      {project.client_name || "Confidential Client"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                      Status
                    </p>
                    <p className="mt-2 text-sm text-white/90">
                      {project.status || "Published"}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                    Deliverables
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags.length ? (
                      tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/75"
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/75">
                        Creative Direction
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/shop/web-services/${project.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:scale-[0.99]"
                >
                  View Case Study
                  <ArrowUpRight size={16} />
                </Link>

                {project.link ? (
                  <Link
                    href={project.link}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
                  >
                    Live Preview
                    <ArrowUpRight size={16} />
                  </Link>
                ) : null}

                <button
                  onClick={onClose}
                  className="inline-flex items-center rounded-full border border-white/10 px-5 py-2.5 text-sm text-white/80 transition hover:border-white/20 hover:text-white"
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
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState<DbProject | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/projects", {
          method: "GET",
          cache: "no-store",
        });

        const text = await res.text();

        let data: ProjectResponse;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error(`Invalid server response: ${text}`);
        }

        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }

        setProjects(data.projects ?? []);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const publishedProjects = useMemo(() => {
    return projects.filter((project) => {
      const status = project.status?.toLowerCase();
      return status === "published" || !status;
    });
  }, [projects]);

  const categories = useMemo(() => {
    const dbCategories = Array.from(
      new Set(
        publishedProjects
          .map((project) => project.category?.trim())
          .filter(Boolean)
      )
    ) as string[];

    return ["All", ...dbCategories];
  }, [publishedProjects]);

  const visibleProjects = useMemo(() => {
    if (filter === "All") return publishedProjects;
    return publishedProjects.filter((project) => project.category === filter);
  }, [filter, publishedProjects]);

  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  return (
    <section className="w-full bg-[#050506] py-16 text-white md:py-20 xl:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8 xl:px-10">
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

          <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl xl:text-5xl">
            Selected Work
          </h2>

          <p className="mt-4 text-sm leading-6 md:leading-7 text-white/50 md:text-[15px]">
            A curated collection of standout work across design, product, and digital
            experience — now powered directly from your backend.
          </p>
        </motion.div>

        {!loading && !error && categories.length > 1 ? (
          <div className="mb-10 mt-10 flex flex-wrap justify-center gap-2.5 md:mb-12 md:mt-12">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.97 }}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  filter === cat
                    ? "bg-white text-black shadow-[0_8px_30px_rgba(255,255,255,0.08)]"
                    : "border border-white/10 text-white/55 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="mb-10 mt-10 md:mb-12 md:mt-12" />
        )}

        <div className="w-full">
          {loading ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02]"
                >
                  <div className="aspect-[4/3] animate-pulse bg-white/5" />
                  <div className="space-y-4 p-4 md:p-5">
                    <div className="h-4 w-32 animate-pulse rounded-full bg-white/10" />
                    <div className="h-3 w-24 animate-pulse rounded-full bg-white/10" />
                    <div className="space-y-2">
                      <div className="h-3 w-full animate-pulse rounded-full bg-white/10" />
                      <div className="h-3 w-5/6 animate-pulse rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-[24px] border border-red-400/20 bg-red-500/5 p-6 text-sm text-red-200">
              {error}
            </div>
          ) : !visibleProjects.length ? (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-8 text-center">
              <p className="text-sm text-white/55">No published projects available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleProjects.map((project, i) => {
                const description = getProjectDescription(project);
                const tags = normalizeTags(project);

                return (
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
                          src={project.cover_image || "/categories/web.png"}
                          alt={project.title || "Project image"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition duration-700 group-hover:scale-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />

                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                          <div>
                            <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-300">
                              {project.category || "Project"}
                            </p>
                            <h3 className="mt-2 text-lg md:text-xl font-medium text-white">
                              {project.title || "Untitled Project"}
                            </h3>
                          </div>

                          <div className="rounded-full border border-white/10 bg-black/40 px-3 py-2 text-xs text-white/70 backdrop-blur-sm">
                            {project.year || "—"}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 md:p-5">
                        <p className="line-clamp-2 text-sm leading-6 text-white/50">
                          {description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {tags.slice(0, 2).map((tag) => (
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
                );
              })}
            </div>
          )}
        </div>

        {!loading && !error && visibleProjects.length > 0 ? (
          <div className="mt-14 md:mt-16 text-center">
            <Link
              href="/auth/login"
              className="text-sm tracking-[0.22em] text-white/40 transition hover:text-white"
            >
              VIEW ALL PROJECTS →
            </Link>
          </div>
        ) : null}
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