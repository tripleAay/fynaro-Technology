import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function getBackendUrl() {
  return (
    process.env.FYNARO_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3500"
  ).replace(/\/$/, "");
}

async function safelyReadResponse(
  response: Response
) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      message:
        "The Fynaro backend returned an invalid response.",
      raw: text.slice(0, 500),
    };
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();

    const token =
      cookieStore.get("fynaro_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const backendUrl =
      getBackendUrl();

    const response = await fetch(
      `${backendUrl}/api/admin/conversations`,
      {
        method: "GET",

        headers: {
          Accept: "application/json",

          Authorization: `Bearer ${token}`,
        },

        cache: "no-store",
      }
    );

    const data =
      await safelyReadResponse(
        response
      );

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,

          message:
            data?.message ||
            "Unable to load conversations.",

          ...(process.env.NODE_ENV ===
          "development"
            ? {
                backendStatus:
                  response.status,

                backendResponse:
                  data,
              }
            : {}),
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(
      data || {
        success: true,
        conversations: [],
      },
      {
        status: response.status,
      }
    );
  } catch (error) {
    console.error(
      "[ADMIN CONVERSATIONS GET]",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to connect to the Fynaro backend.",
      },
      {
        status: 500,
      }
    );
  }
}