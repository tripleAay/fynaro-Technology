// app/shop/proposals/[proposalId]/page.tsx

import { notFound } from "next/navigation";

import { getProposalById } from "@/lib/fynaro/data/proposals";
import ProposalDetailClient from "./ProposalDetailClient";

type PageProps = {
  params: Promise<{
    proposalId: string;
  }>;
};

export default async function ProposalPage({
  params,
}: PageProps) {
  const { proposalId } = await params;

  const proposal = await getProposalById(proposalId);

  if (!proposal) {
    notFound();
  }

  return <ProposalDetailClient proposal={proposal} />;
}