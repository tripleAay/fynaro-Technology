// lib/fynaro/data/proposals.ts

import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function getProposalByReference(
  reference: string,
  clientId: string
) {
  const supabase =
    createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("proposals")
    .select(`
      *,
      deliverables:proposal_deliverables(*),
      exclusions:proposal_exclusions(*),
      payment_stages:proposal_payment_stages(*)
    `)
    .eq("reference", reference)
    .eq("client_id", clientId)
    .order("version", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to load proposal: ${error.message}`
    );
  }

  return data;
}