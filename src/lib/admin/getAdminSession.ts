import { cookies } from "next/headers";

export type AdminProfile = {
  id: string;
  externalAuthId: string;
  email: string;
  fullName: string | null;
  companyName: string | null;
  phone: string | null;
  avatarUrl: string | null;
  role: string;
};

export type AdminSession = {
  authenticated: boolean;

  user: {
    id: string;
    email: string;
    fullName: string;
  };

  profile: AdminProfile;
};

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("fynaro_token")?.value;

    if (!token) {
      return null;
    }

    const apiUrl =
      process.env.FYNARO_API_URL;

    if (!apiUrl) {
      console.error(
        "FYNARO_API_URL is not configured."
      );

      return null;
    }

    const backendUrl =
      apiUrl.replace(/\/$/, "");

    const response =
      await fetch(
        `${backendUrl}/api/admin/me`,
        {
          method: "GET",

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

    const data =
      (await response.json()) as AdminSession;

    return data;
  } catch (error) {
    console.error(
      "getAdminSession error:",
      error
    );

    return null;
  }
}