"use client";

import { useEffect, useMemo, useState } from "react";
import ProjectActions from "@/components/admin/project/project-actions";
import ProjectGrid from "@/components/admin/project/project-grid";
import type { ProjectItem } from "@/components/admin/project/project-card";
import { Search } from "lucide-react";

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
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects", {
        method: "GET",
        cache: "no-store",
      });

      const text = await res.text();

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        throw new Error(data?.error || "Failed to fetch projects");
      }

      const mappedProjects: ProjectItem[] = (data.projects ?? []).map(
        (project: DbProject) => ({
          id: project.id,
          title: project.title || "Untitled Project",
          category: project.category || "Project",
          image: project.cover_image || "/images/placeholder-project.jpg",
          client: project.client_name || "Private Client",
          year: project.year || "—",
          status: project.status ?? "Published",
          link: project.link || undefined,
        })
      );

      setProjects(mappedProjects);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this project?");
    if (!confirmed) return;

    setDeletingId(id);

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      const text = await res.text();

      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok) {
        throw new Error(data?.error || "Failed to delete project");
      }

      setProjects((prev) => prev.filter((project) => project.id !== id));
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return projects;

    return projects.filter((project) => {
      return (
        project.title.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query) ||
        project.client.toLowerCase().includes(query) ||
        project.year.toLowerCase().includes(query) ||
        project.status.toLowerCase().includes(query)
      );
    });
  }, [projects, search]);

  if (loading) {
    return (
      <div className="space-y-6">
        <ProjectActions />

        <div className="rounded-[28px] border border-black/5 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Projects</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                Project Library
              </h1>
            </div>

            <div className="h-12 w-full animate-pulse rounded-2xl bg-slate-100 md:max-w-sm" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[26px] border border-black/6 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)]"
            >
              <div className="aspect-[16/10] animate-pulse bg-slate-200" />
              <div className="space-y-5 p-5">
                <div className="space-y-2">
                  <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                  <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />
                </div>

                <div className="grid grid-cols-2 gap-3 rounded-[20px] bg-slate-50 p-3">
                  <div className="space-y-2">
                    <div className="h-3 w-12 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="ml-auto h-3 w-10 animate-pulse rounded bg-slate-200" />
                    <div className="ml-auto h-4 w-12 animate-pulse rounded bg-slate-200" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="h-11 flex-1 animate-pulse rounded-xl bg-slate-200" />
                  <div className="h-11 flex-1 animate-pulse rounded-xl bg-slate-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProjectActions />

      <section className="rounded-[28px] border border-black/5 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Projects</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              Project Library
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              View, search, edit, and delete uploaded projects from your admin workspace.
            </p>
          </div>

          <div className="w-full md:max-w-sm">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, category, client, year..."
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-300"
              />
            </label>
          </div>
        </div>
      </section>

      <ProjectGrid
        projects={filteredProjects}
        onDelete={handleDelete}
        deletingId={deletingId}
        searchQuery={search}
      />
    </div>
  );
}