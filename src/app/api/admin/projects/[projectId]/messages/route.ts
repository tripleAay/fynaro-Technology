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
  }>;
};

type CreateClientMessageBody = {
  message?: string;

  messageType?:
    | "message"
    | "feedback"
    | "question";
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
// GET CLIENT MESSAGES
// ======================================================

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { projectId } =
      await context.params;

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

    const response =
      await fetch(
        `${getApiUrl()}/api/client/projects/${encodeURIComponent(
          projectId
        )}/messages`,
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

    return proxyResponse(
      response
    );
  } catch (error) {
    console.error(
      "[CLIENT PROJECT MESSAGES GET]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load project messages.",
      },
      {
        status: 500,
      }
    );
  }
}

// ======================================================
// POST CLIENT MESSAGE
// ======================================================

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { projectId } =
      await context.params;

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

    let body:
      | CreateClientMessageBody
      | null = null;

    try {
      body =
        (await request.json()) as CreateClientMessageBody;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid request body.",
          code:
            "INVALID_REQUEST_BODY",
        },
        {
          status: 400,
        }
      );
    }

    const message =
      body?.message?.trim();

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Message is required.",
          code:
            "MESSAGE_REQUIRED",
        },
        {
          status: 400,
        }
      );
    }

    const response =
      await fetch(
        `${getApiUrl()}/api/client/projects/${encodeURIComponent(
          projectId
        )}/messages`,
        {
          method: "POST",

          headers: {
            Accept:
              "application/json",

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body:
            JSON.stringify({
              message,

              messageType:
                body?.messageType ||
                "message",
            }),

          cache:
            "no-store",
        }
      );

    return proxyResponse(
      response
    );
  } catch (error) {
    console.error(
      "[CLIENT PROJECT MESSAGES POST]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to send project message.",
      },
      {
        status: 500,
      }
    );
  }
}