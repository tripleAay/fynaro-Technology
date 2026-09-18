import { NextRequest, NextResponse } from "next/server";

function getApiUrl() {
  return (
    process.env.FYNARO_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3500"
  ).replace(/\/$/, "");
}

type RouteContext = {
  params: Promise<{
    projectId: string;
    phaseId: string;
  }>;
};

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const {
      projectId,
      phaseId,
    } = await context.params;

    const token =
      request.cookies.get("fynaro_token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        {
          status: 401,
        }
      );
    }

    const body = await request.json();

    const response = await fetch(
      `${getApiUrl()}/api/admin/projects/${encodeURIComponent(
        projectId
      )}/phases/${encodeURIComponent(phaseId)}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(body),

        cache: "no-store",
      }
    );

    const text = await response.text();

    let data;

    try {
      data = text
        ? JSON.parse(text)
        : {};
    } catch {
      data = {
        success: false,
        message: "The backend returned an invalid response.",
      };
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error(
      "[ADMIN PROJECT PHASE PATCH PROXY]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update project phase.",
      },
      {
        status: 500,
      }
    );
  }
}