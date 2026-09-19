import {
  NextRequest,
  NextResponse,
} from "next/server";

// ======================================================
// API
// ======================================================

function getApiUrl() {
  const url =
    process.env.FYNARO_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3500";

  return url.replace(/\/$/, "");
}

// ======================================================
// TYPES
// ======================================================

type RouteContext = {
  params: Promise<{
    projectId: string;
    messageId: string;
  }>;
};

// ======================================================
// SAFE RESPONSE
// ======================================================

async function proxyResponse(
  response: Response
) {
  const contentType =
    response.headers.get(
      "content-type"
    );

  if (
    contentType?.includes(
      "application/json"
    )
  ) {
    try {
      const data =
        await response.json();

      return NextResponse.json(
        data,
        {
          status:
            response.status,
        }
      );
    } catch {
      // Continue to fallback.
    }
  }

  const text =
    await response.text();

  return NextResponse.json(
    {
      success: false,
      message:
        text ||
        "The project message server returned an invalid response.",
    },
    {
      status:
        response.status || 500,
    }
  );
}

// ======================================================
// DELETE MESSAGE
// ======================================================

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const {
      projectId,
      messageId,
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
          code: "AUTH_REQUIRED",
        },
        {
          status: 401,
        }
      );
    }

    if (!projectId?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Project ID is required.",
          code:
            "PROJECT_ID_REQUIRED",
        },
        {
          status: 400,
        }
      );
    }

    if (!messageId?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Message ID is required.",
          code:
            "MESSAGE_ID_REQUIRED",
        },
        {
          status: 400,
        }
      );
    }

    const response =
      await fetch(
        `${getApiUrl()}/api/admin/projects/${encodeURIComponent(
          projectId
        )}/messages/${encodeURIComponent(
          messageId
        )}`,
        {
          method: "DELETE",

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

    return proxyResponse(
      response
    );
  } catch (error) {
    console.error(
      "[ADMIN PROJECT MESSAGE DELETE]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to delete project message.",
      },
      {
        status: 500,
      }
    );
  }
}