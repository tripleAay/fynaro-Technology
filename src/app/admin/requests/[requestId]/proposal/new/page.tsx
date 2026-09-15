import Link from "next/link";

import {
  ArrowLeft,
} from "lucide-react";

import {
  notFound,
} from "next/navigation";

import ProposalBuilder from "@/components/admin/ProposalBuilder";

import {
  getAdminRequest,
} from "@/lib/admin/request";

type PageProps = {
  params: Promise<{
    requestId: string;
  }>;
};

export default async function NewProposalPage({
  params,
}: PageProps) {
  const {
    requestId,
  } = await params;

  const request =
    await getAdminRequest(
      requestId
    );

  if (!request) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1500px]">
      <Link
        href={`/admin/requests/${request.id}`}
        className="inline-flex items-center gap-2 text-xs font-medium text-black/50 transition hover:text-black"
      >
        <ArrowLeft
          className="h-4 w-4"
          strokeWidth={
            1.8
          }
        />

        Back to request
      </Link>

      <div className="mt-6 border-b border-black/5 pb-7">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
          {
            request.reference
          }
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em]">
          Create proposal
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-black/45">
          Turn this client
          request into a defined
          Fynaro scope,
          investment and payment
          structure.
        </p>
      </div>

      <div className="mt-7">
        <ProposalBuilder
          requestId={
            request.id
          }
          requestReference={
            request.reference
          }
          initialTitle={
            request.title ||
            `${
              request.business_name ||
              "Client"
            } project`
          }
          initialService={
            request.service ||
            ""
          }
        />
      </div>
    </div>
  );
}