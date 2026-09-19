import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

// ======================================================
// GET CLIENT UNREAD MESSAGE COUNT
//
// GET /api/client/conversations/unread-count
// ======================================================

export async function GET() {
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
          unread_count: 0,
        },
        {
          status: 401,
        }
      );
    }

    const backendUrl =
      process.env
        .NEXT_PUBLIC_API_URL ||
      process.env.API_URL ||
      "http://localhost:3500";

    const response = await fetch(
      `${backendUrl}/api/client/conversations/unread-count`,
      {
        method: "GET",

        headers: {
          Accept:
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        cache: "no-store",
      }
    );

    const text =
      await response.text();

    let data: any = {};

    if (text) {
      try {
        data =
          JSON.parse(text);
      } catch {
        data = {
          success: false,
          message:
            "Invalid response from server.",
          unread_count: 0,
        };
      }
    }

    return NextResponse.json(
      data,
      {
        status:
          response.status,
      }
    );
  } catch (error) {
    console.error(
      "[CLIENT UNREAD COUNT PROXY]",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to load unread messages.",

        unread_count: 0,
      },
      {
        status: 500,
      }
    );
  }
}