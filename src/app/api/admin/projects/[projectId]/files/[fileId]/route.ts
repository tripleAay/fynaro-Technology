import {
  NextRequest,
  NextResponse,
} from "next/server";

// ======================================================
// API
// ======================================================

function getApiUrl() {
  return (
    process.env.FYNARO_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3500"
  ).replace(/\/$/, "");
}

// ======================================================
// TYPES
// ======================================================

type RouteContext = {
  params: Promise<{
    projectId: string;
    fileId: string;
  }>;
};

// ======================================================
// DELETE PROJECT FILE
// ======================================================

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const {
      projectId,
      fileId,
    } = await context.params;

    const token =
      request.cookies.get(
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

    if (
      !projectId ||
      !fileId
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Project ID and file ID are required.",
        },
        {
          status: 400,
        }
      );
    }

    const response = await fetch(
      `${getApiUrl()}/api/admin/projects/${encodeURIComponent(
        projectId
      )}/files/${encodeURIComponent(
        fileId
      )}`,
      {
        method: "DELETE",

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

    let data: unknown;

    try {
      data = text
        ? JSON.parse(text)
        : {};
    } catch {
      data = {
        success: false,
        message:
          "The backend returned an invalid response.",
      };
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
      "[ADMIN PROJECT FILE DELETE PROXY]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to delete project file.",
      },
      {
        status: 500,
      }
    );
  }
}