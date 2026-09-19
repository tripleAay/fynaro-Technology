import { notFound } from "next/navigation";

import {
  getAdminProjectById,
  getAdminProjectFiles,
  getAdminProjectMessages,
} from "@/lib/admin/project";

import AdminProjectWorkspace from "./AdminProjectWorkspace";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function AdminProjectPage({
  params,
}: PageProps) {
  const { projectId } = await params;

  const result =
    await getAdminProjectById(projectId);

  if (!result) {
    notFound();
  }

  // Load project-related resources in parallel.
  const [files, messages] =
    await Promise.all([
      getAdminProjectFiles(projectId),
      getAdminProjectMessages(projectId),
    ]);

  return (
    <AdminProjectWorkspace
      project={result.project}
      phases={result.phases}
      activities={result.activities}
      order={result.order}
      paymentStages={result.paymentStages}
      files={files}
      messages={messages}
    />
  );
}