// app/shop/requests/[requestId]/page.tsx

import { notFound } from "next/navigation";

import {
  getCurrentProfile,
} from "@/lib/fynaro/auth/current-profile";

import {
  getRequestByReference,
} from "@/lib/fynaro/data/requests";

type PageProps = {
  params: Promise<{
    requestId: string;
  }>;
};

export default async function RequestPage({
  params,
}: PageProps) {
  const { requestId } = await params;

  const profile =
    await getCurrentProfile();

  // The shop layout already handles authentication.
  // We still need the profile here to verify ownership.
  if (!profile) {
    notFound();
  }

  const request =
    await getRequestByReference(
      requestId,
      profile.id
    );

  if (!request) {
    notFound();
  }

  return (
    <div>
      <p>{request.reference}</p>

      <h1>{request.title}</h1>

      <p>
        {request.project_description}
      </p>

      {/* existing request UI */}
    </div>
  );
}