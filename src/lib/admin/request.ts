import {
  cookies,
} from "next/headers";

export type RequestClient = {
  id: string;
  full_name: string | null;
  email: string;
  company_name: string | null;
  phone: string | null;
  avatar_url: string | null;
};

export type AdminProjectRequest = {
  id: string;
  reference: string;
  client_id: string;
  title: string | null;
  business_name: string | null;
  service: string | null;
  business_description:
    string | null;
  project_description:
    string | null;
  requirements: string[];
  budget_min: number | null;
  budget_max: number | null;
  timeline: string | null;
  existing_url: string | null;
  notes: string | null;
  status: string;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
  client: RequestClient | null;
};

async function adminFetch(
  path: string
) {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      "fynaro_token"
    )?.value;

  if (!token) {
    return null;
  }

  const apiUrl =
    process.env.FYNARO_API_URL;

  if (!apiUrl) {
    throw new Error(
      "FYNARO_API_URL is not configured."
    );
  }

  const backendUrl =
    apiUrl.replace(/\/$/, "");

  const response =
    await fetch(
      `${backendUrl}${path}`,
      {
        headers: {
          Accept:
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        cache:
          "no-store",
      }
    );

  if (!response.ok) {
    return null;
  }

  return response.json();
}

export async function getAdminRequests() {
  const data =
    await adminFetch(
      "/api/admin/requests"
    );

  return (
    (data?.requests ??
      []) as AdminProjectRequest[]
  );
}

export async function getAdminRequest(
  requestId: string
) {
  const data =
    await adminFetch(
      `/api/admin/requests/${encodeURIComponent(
        requestId
      )}`
    );

  return (
    data?.request as
      | AdminProjectRequest
      | undefined
  ) ?? null;
}