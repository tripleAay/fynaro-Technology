"use client";

import ProjectCard, {
  ProjectItem,
} from "@/components/admin/project/project-card";

type ProjectGridProps = {
  projects: ProjectItem[];
  onDelete?: (id: string) => void;
};

export default function ProjectGrid({
  projects,
  onDelete,
}: ProjectGridProps) {
  if (!projects.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-sm text-slate-500">No projects yet.</p>
        <h3 className="mt-2 text-lg font-semibold text-slate-900">
          Start adding projects to your portfolio
        </h3>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}