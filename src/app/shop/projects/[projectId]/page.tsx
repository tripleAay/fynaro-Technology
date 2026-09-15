// app/shop/projects/[projectId]/page.tsx

import { notFound } from "next/navigation";

import { getProjectById } from "@/lib/fynaro/data/projects";
import ProjectWorkspace from "./ProjectWorkspace";

type ProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { projectId } = await params;

  const project = getProjectById(projectId);

  if (!project) {
    notFound();
  }

  return <ProjectWorkspace project={project} />;
}