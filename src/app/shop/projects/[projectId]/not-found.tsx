// app/shop/projects/[projectId]/not-found.tsx

import WorkspaceNotFound from "@/lib/fynaro/WorkspaceNotFound";

export default function NotFound() {
  return (
    <WorkspaceNotFound
      title="Project not found."
      description="This project may no longer exist or you may not have access to it."
      backHref="/shop/projects"
      backLabel="Back to projects"
    />
  );
}