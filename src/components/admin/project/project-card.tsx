"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2, ExternalLink } from "lucide-react";

export type ProjectItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  client: string;
  year: string;
  status: "Published" | "Draft" | "Archived";
  link?: string;
};

type ProjectCardProps = {
  project: ProjectItem;
  onDelete?: (id: string) => void;
};

export default function ProjectCard({
  project,
  onDelete,
}: ProjectCardProps) {
  const statusStyles = {
    Published: "border-emerald-200 bg-emerald-50 text-emerald-700",
    Draft: "border-amber-200 bg-amber-50 text-amber-700",
    Archived: "border-slate-200 bg-slate-100 text-slate-600",
  };

  return (
    <article className="group overflow-hidden rounded-[26px] border border-black/6 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.10)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1536px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        <div className="absolute left-4 top-4">
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold ${statusStyles[project.status]}`}
          >
            {project.status}
          </span>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {project.category}
          </p>

          <h3 className="line-clamp-1 text-xl font-semibold tracking-tight text-slate-900">
            {project.title}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-[20px] bg-slate-50 p-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
              Client
            </p>
            <p className="mt-1 line-clamp-1 text-sm font-semibold text-slate-900">
              {project.client}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
              Year
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              {project.year}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/cp/admin/projects/edit/${project.id}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>

          <button
            type="button"
            onClick={() => onDelete?.(project.id)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>

        {project.link && (
          <Link
            href={project.link}
            target="_blank"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            <ExternalLink className="h-4 w-4" />
            View Live Project
          </Link>
        )}
      </div>
    </article>
  );
}