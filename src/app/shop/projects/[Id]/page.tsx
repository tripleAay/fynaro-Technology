import { notFound } from "next/navigation";

import {
  getClientProjectById,
  getClientProjectFiles,
} from "@/lib/client/projects";

import ProjectWorkspace from "./ProjectWorkspace";

export const dynamic =
  "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetailPage({
  params,
}: PageProps) {
  const { id } =
    await params;

  // ====================================================
  // PROJECT
  // ====================================================

  const result =
    await getClientProjectById(
      id
    );

  if (!result) {
    notFound();
  }

  // ====================================================
  // PROJECT FILES
  //
  // Fetch separately because files use their own
  // ownership + visibility protected endpoint.
  // ====================================================

  const files =
    await getClientProjectFiles(
      id
    );

  // ====================================================
  // WORKSPACE
  // ====================================================

  return (
    <ProjectWorkspace
      project={
        result.project
      }
      phases={
        result.phases
      }
      activities={
        result.activities
      }
      files={
        files
      }
      order={
        result.order
      }
    />
  );
}