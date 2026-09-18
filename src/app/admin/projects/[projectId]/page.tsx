import { notFound } from "next/navigation";

import {
  getAdminProjectById,
  getAdminProjectFiles,
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

  const files =
    await getAdminProjectFiles(projectId);

  return (
    <AdminProjectWorkspace
      project={result.project}
      phases={result.phases}
      activities={result.activities}
      order={result.order}
      paymentStages={result.paymentStages}
      files={files}
    />
  );
}