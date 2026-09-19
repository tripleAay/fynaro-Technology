import {
  NextResponse,
} from "next/server";

import {
  cookies,
} from "next/headers";

export const dynamic =
  "force-dynamic";

function getApiUrl() {
  const url =
    process.env.FYNARO_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3500";

  return url.replace(
    /\/+$/,
    ""
  );
}

export async function GET() {
  try {
    const cookieStore =
      await cookies();

    const token =
      cookieStore.get(
        "fynaro_token"
      )?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Authentication required.",
        },
        {
          status: 401,
        }
      );
    }

    const response =
      await fetch(
        `${getApiUrl()}/api/admin/conversations`,
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

    const rawText =
      await response.text();

    let data:
      | Record<
          string,
          unknown
        >
      | null = null;

    if (rawText) {
      try {
        data =
          JSON.parse(
            rawText
          );
      } catch {
        console.error(
          "[ADMIN CONVERSATIONS] Non-JSON backend response:",
          rawText
        );

        return NextResponse.json(
          {
            success: false,

            message:
              "The Fynaro backend returned an invalid response.",
          },
          {
            status: 502,
          }
        );
      }
    }

    return NextResponse.json(
      data || {
        success: response.ok,
      },
      {
        status:
          response.status,
      }
    );
  } catch (error) {
    console.error(
      "[ADMIN CONVERSATIONS]",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to load conversations.",
      },
      {
        status: 500,
      }
    );
  }
}