// lib/fynaro/data/projects.ts

import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function getClientProjects(
  clientId: string
) {
  const supabase =
    createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      phases:project_phases(*)
    `)
    .eq("client_id", clientId)
    .order("updated_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(
      `Failed to load projects: ${error.message}`
    );
  }

  return data ?? [];
}

export async function getProjectByReference(
  reference: string,
  clientId: string
) {
  const supabase =
    createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      phases:project_phases(
        id,
        position,
        title,
        description,
        status,
        started_at,
        completed_at
      )
    `)
    .eq("reference", reference)
    .eq("client_id", clientId)
    .order("position", {
      referencedTable: "project_phases",
      ascending: true,
    })
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to load project: ${error.message}`
    );
  }

  return data;
}