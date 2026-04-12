"use client";

import { useState } from "react";
import ProjectActions from "@/components/admin/project/project-actions";
import ProjectGrid from "@/components/admin/project/project-grid";
import type { ProjectItem } from "@/components/admin/project/project-card";

const initialProjects: ProjectItem[] = [
  {
    id: "1",
    title: "Fynaro Studio Website",
    category: "Web Design",
    image: "/images/project-1.jpg",
    client: "Fynaro Tech",
    year: "2026",
    status: "Published",
    link: "https://example.com",
  },
  {
    id: "2",
    title: "Luxury Packaging Showcase",
    category: "Brand Identity",
    image: "/images/project-2.jpg",
    client: "Private Client",
    year: "2025",
    status: "Draft",
  },
  {
    id: "3",
    title: "Corporate Portfolio System",
    category: "Frontend Development",
    image: "/images/project-3.jpg",
    client: "Enterprise Brand",
    year: "2024",
    status: "Archived",
  },
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);

  const handleDelete = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  return (
    <div className="space-y-6">
      <ProjectActions />
      <ProjectGrid projects={projects} onDelete={handleDelete} />
    </div>
  );
}