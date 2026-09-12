import "server-only";

import {
  getCurrentAuthUser,
} from "./current-user";

import {
  createSupabaseAdminClient,
} from "@/lib/supabase/admin";

export type CurrentProfile = {
  id: string;

  external_auth_id: string;

  email: string;

  full_name: string | null;

  role: string;

  avatar_url?: string | null;

  created_at?: string;

  updated_at?: string;
};

export async function getCurrentProfile():
  Promise<CurrentProfile | null> {
  // ============================================================
  // 1. GET AUTHENTICATED FYNARO USER
  // ============================================================

  const authUser =
    await getCurrentAuthUser();

  if (!authUser) {
    console.log(
      "[getCurrentProfile] No authenticated Fynaro user."
    );

    return null;
  }

  console.log(
    "[getCurrentProfile] Auth user resolved:",
    {
      id:
        authUser.id,

      email:
        authUser.email,
    }
  );

  // ============================================================
  // 2. CREATE SUPABASE ADMIN CLIENT
  // ============================================================

  const supabase =
    createSupabaseAdminClient();

  const externalAuthId =
    String(
      authUser.id
    );

  // ============================================================
  // 3. FIND EXISTING PROFILE
  // ============================================================

  const {
    data: existing,
    error: findError,
  } = await supabase
    .from("profiles")
    .select("*")
    .eq(
      "external_auth_id",
      externalAuthId
    )
    .maybeSingle();

if (findError) {
  const errorMessage =
    String(
      findError.message ??
        "Unknown Supabase error"
    );

  const errorCode =
    String(
      findError.code ??
        "NO_CODE"
    );

  const errorDetails =
    String(
      findError.details ??
        "No details"
    );

  const errorHint =
    String(
      findError.hint ??
        "No hint"
    );

  console.error(
    "[getCurrentProfile] SUPABASE ERROR MESSAGE:",
    errorMessage
  );

  console.error(
    "[getCurrentProfile] SUPABASE ERROR CODE:",
    errorCode
  );

  console.error(
    "[getCurrentProfile] SUPABASE ERROR DETAILS:",
    errorDetails
  );

  console.error(
    "[getCurrentProfile] SUPABASE ERROR HINT:",
    errorHint
  );

  throw new Error(
    [
      "Supabase profile lookup failed.",
      `Code=${errorCode}.`,
      `Message=${errorMessage}.`,
      `Details=${errorDetails}.`,
      `Hint=${errorHint}.`,
    ].join(" ")
  );
}

  // ============================================================
  // 4. RETURN EXISTING PROFILE
  // ============================================================

  if (existing) {
    console.log(
      "[getCurrentProfile] Existing profile found:",
      {
        id:
          existing.id,

        external_auth_id:
          existing.external_auth_id,

        email:
          existing.email,
      }
    );

    return existing as CurrentProfile;
  }

  // ============================================================
  // 5. NO PROFILE YET — CREATE ONE
  // ============================================================

  const normalizedEmail =
    authUser.email
      ?.trim()
      .toLowerCase();

  if (!normalizedEmail) {
    console.error(
      "[getCurrentProfile] Authenticated user has no email."
    );

    return null;
  }

  console.log(
    "[getCurrentProfile] Creating new Supabase profile:",
    {
      externalAuthId,
      email:
        normalizedEmail,
      fullName:
        authUser.fullName ??
        null,
    }
  );

  const {
    data: created,
    error: createError,
  } = await supabase
    .from("profiles")
    .insert({
      external_auth_id:
        externalAuthId,

      email:
        normalizedEmail,

      full_name:
        authUser.fullName ??
        null,

      role:
        "client",
    })
    .select("*")
    .single();

  if (createError) {
    console.error(
      "[getCurrentProfile] Supabase profile creation failed:",
      {
        message:
          createError.message,

        code:
          createError.code,

        details:
          createError.details,

        hint:
          createError.hint,
      }
    );

    throw new Error(
      [
        "Failed to create Fynaro profile.",
        `Code: ${createError.code ?? "unknown"}`,
        `Message: ${createError.message ?? "unknown"}`,
        `Details: ${createError.details ?? "none"}`,
        `Hint: ${createError.hint ?? "none"}`,
      ].join(" ")
    );
  }

  console.log(
    "[getCurrentProfile] New profile created:",
    {
      id:
        created.id,

      external_auth_id:
        created.external_auth_id,

      email:
        created.email,
    }
  );

  return created as CurrentProfile;
}