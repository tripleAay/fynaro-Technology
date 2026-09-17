import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_URL =
  process.env.FYNARO_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3500";

export const dynamic = "force-dynamic";

/**
 * POST /api/client/requests
 *
 * Browser
 *   ↓
 * Next.js
 *   ↓
 * fynaro_token cookie
 *   ↓
 * Express /api/client/requests
 */
export async function POST(
  request: NextRequest
) {
  try {
    const cookieStore = await cookies();

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
          code: "AUTH_REQUIRED",
        },
        {
          status: 401,
        }
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid request body.",
          code: "INVALID_REQUEST_BODY",
        },
        {
          status: 400,
        }
      );
    }

    const response = await fetch(
      `${API_URL}/api/client/requests`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body: JSON.stringify(body),

        cache: "no-store",
      }
    );

    let data: unknown;

    try {
      data =
        await response.json();
    } catch {
      data = {
        success: false,

        message:
          "The Fynaro API returned an invalid response.",

        code:
          "INVALID_API_RESPONSE",
      };
    }

    return NextResponse.json(
      data,
      {
        status: response.status,
      }
    );
  } catch (error) {
    console.error(
      "[POST /api/client/requests]",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to submit project request.",

        code:
          "REQUEST_PROXY_FAILED",
      },
      {
        status: 500,
      }
    );
  }
}