import { cookies } from "next/headers";

export type AdminDashboardData = {
  stats: {
    clients: number;
    newRequests: number;
    activeProjects: number;
    proposals: number;
    payments: number;
    pendingPayments: number;
    revenue: number;
    pendingAmount: number;
  };

  recentClients: unknown[];
  recentRequests: unknown[];
  recentProjects: unknown[];
  recentPayments: unknown[];
  activity: unknown[];
};

export async function getAdminDashboard(): Promise<AdminDashboardData | null> {
  try {
    const cookieStore = await cookies();

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
      console.error(
        "FYNARO_API_URL is not configured."
      );

      return null;
    }

    const backendUrl =
      apiUrl.replace(/\/$/, "");

    const response =
      await fetch(
        `${backendUrl}/api/admin/dashboard`,
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
      await response.json();

    return data.dashboard;
  } catch (error) {
    console.error(
      "getAdminDashboard error:",
      error
    );

    return null;
  }
}