// lib/fynaro/data/requests.ts

import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function getClientRequests(
  clientId: string
) {
  const supabase =
    createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("project_requests")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(
      `Failed to load project requests: ${error.message}`
    );
  }

  return data ?? [];
}

export async function getRequestById(
  requestId: string,
  clientId: string
) {
  const supabase =
    createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("project_requests")
    .select("*")
    .eq("id", requestId)
    .eq("client_id", clientId)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to load project request: ${error.message}`
    );
  }

  return data;
}

export async function getRequestByReference(
  reference: string,
  clientId: string
) {
  const supabase =
    createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("project_requests")
    .select("*")
    .eq("reference", reference)
    .eq("client_id", clientId)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to load project request: ${error.message}`
    );
  }

  return data;
}