"use client";

import ProjectCard, {
  ProjectItem,
} from "@/components/admin/project/project-card";

type ProjectGridProps = {
  projects: ProjectItem[];
  onDelete?: (id: string) => void;
  deletingId?: string | null;
  searchQuery?: string;
};

export default function ProjectGrid({
  projects,
  onDelete,
  deletingId,
  searchQuery,
}: ProjectGridProps) {
  if (!projects.length) {
    const hasSearch = !!searchQuery?.trim();

    return (
      <div className="overflow-hidden rounded-[28px] border border-dashed border-black/10 bg-white">
        <div className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-black/[0.03]">
            <span className="text-2xl">+</span>
          </div>

          <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-400">
            Project Library
          </p>

          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
            {hasSearch ? "No matching projects" : "No projects yet"}
          </h3>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            {hasSearch
              ? `No result found for "${searchQuery}". Try another keyword.`
              : "Start adding projects to build a stronger, more visible portfolio inside your admin workspace."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
      {projects.map((project) => (
        <div
          key={project.id}
          className={`transition-opacity duration-200 ${
            deletingId === project.id ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <ProjectCard
            project={project}
            onDelete={onDelete}
          />
        </div>
      ))}
    </section>
  );
}