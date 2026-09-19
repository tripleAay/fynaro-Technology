import { notFound } from "next/navigation";

import {
  getClientProjectById,
  getClientProjectFiles,
  getClientProjectMessages,
} from "@/lib/client/projects";

import ProjectWorkspace from "./ProjectWorkspace";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const result =
    await getClientProjectById(id);

  if (!result) {
    notFound();
  }

  const [files, messages] =
    await Promise.all([
      getClientProjectFiles(id),
      getClientProjectMessages(id),
    ]);

  return (
    <ProjectWorkspace
      project={result.project}
      phases={result.phases}
      activities={result.activities}
      files={files}
      messages={messages}
      order={result.order}
    />
  );
}