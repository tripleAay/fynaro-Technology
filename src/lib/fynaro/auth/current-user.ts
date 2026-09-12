// src/lib/fynaro/auth/current-user.ts

import "server-only";

import {
  cookies,
} from "next/headers";

export type FynaroAuthUser = {
  id: string;

  email: string;

  fullName: string;

  isEmailVerified: boolean;
};

type CurrentUserResponse = {
  user?: FynaroAuthUser;

  message?: string;
};

export async function getCurrentAuthUser():
  Promise<FynaroAuthUser | null> {
  try {
    // ============================================================
    // 1. READ FYNARO SESSION COOKIE
    // ============================================================

    const cookieStore =
      await cookies();

    const token =
      cookieStore.get(
        "fynaro_token"
      )?.value;

    if (!token) {
      console.log(
        "[getCurrentAuthUser] No fynaro_token cookie."
      );

      return null;
    }

    // ============================================================
    // 2. GET EXPRESS API URL
    // ============================================================

    const apiUrl =
      process.env
        .FYNARO_API_URL;

    if (!apiUrl) {
      console.error(
        "[getCurrentAuthUser] FYNARO_API_URL is missing."
      );

      return null;
    }

    const backendUrl =
      apiUrl.replace(
        /\/$/,
        ""
      );

    // ============================================================
    // 3. ASK EXPRESS TO VERIFY SESSION
    // ============================================================

    const response =
      await fetch(
        `${backendUrl}/api/auth/me`,
        {
          method:
            "GET",

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

    const data =
      (await response
        .json()
        .catch(
          () => ({})
        )) as CurrentUserResponse;

    // ============================================================
    // 4. INVALID SESSION
    // ============================================================

    if (!response.ok) {
      console.error(
        "[getCurrentAuthUser] Express rejected session:",
        {
          status:
            response.status,

          message:
            data?.message,
        }
      );

      return null;
    }

    // ============================================================
    // 5. VALIDATE RETURNED USER
    // ============================================================

    if (
      !data.user ||
      !data.user.id ||
      !data.user.email
    ) {
      console.error(
        "[getCurrentAuthUser] Express returned invalid user:",
        data
      );

      return null;
    }

    console.log(
      "[getCurrentAuthUser] Authenticated user:",
      {
        id:
          data.user.id,

        email:
          data.user.email,
      }
    );

    return data.user;
  } catch (error) {
    console.error(
      "[getCurrentAuthUser] Unexpected error:",
      error
    );

    return null;
  }
}