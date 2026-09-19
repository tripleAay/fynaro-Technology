import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const API_URL =
  process.env.FYNARO_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3500";

type RouteContext = {
  params: Promise<{
    projectId: string;
  }>;
};

export async function POST(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { projectId } = await params;

    if (!projectId?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Project ID is required.",
          code: "PROJECT_ID_REQUIRED",
        },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("fynaro_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
          code: "AUTH_REQUIRED",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const backendUrl = API_URL.replace(/\/+$/, "");

    const response = await fetch(
      `${backendUrl}/api/client/projects/${encodeURIComponent(
        projectId
      )}/messages`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        cache: "no-store",
      }
    );

    const rawText = await response.text();

    let data: unknown = null;

    if (rawText) {
      try {
        data = JSON.parse(rawText);
      } catch {
        data = {
          success: false,
          message:
            "The Fynaro API returned an invalid response.",
          code: "INVALID_API_RESPONSE",
        };
      }
    }

    if (!response.ok) {
      return NextResponse.json(
        data || {
          success: false,
          message: "Unable to send message.",
          code: "SEND_MESSAGE_FAILED",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      data || {
        success: true,
        message: "Message sent.",
      },
      { status: response.status }
    );
  } catch (error) {
    console.error(
      "[POST /api/client/projects/[projectId]/messages]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to send message.",
        code: "MESSAGE_PROXY_FAILED",
      },
      { status: 500 }
    );
  }
}