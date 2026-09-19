import {
  NextRequest,
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

// ======================================================
// POST
// /api/client/conversations/support/messages
// ======================================================

export async function POST(
  request: NextRequest
) {
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
          code:
            "AUTH_REQUIRED",
        },
        {
          status: 401,
        }
      );
    }

    let body: {
      message?: string;
      messageType?: string;
    };

    try {
      body =
        await request.json();
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
      String(
        body?.message || ""
      ).trim();

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

    const backendResponse =
      await fetch(
        `${getApiUrl()}/api/client/conversations/support/messages`,
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

    const rawText =
      await backendResponse.text();

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
          "[SUPPORT MESSAGE PROXY] Backend returned non-JSON:",
          rawText
        );

        return NextResponse.json(
          {
            success: false,

            message:
              "The Fynaro backend returned an invalid response.",

            code:
              "INVALID_BACKEND_RESPONSE",

            backendStatus:
              backendResponse.status,
          },
          {
            status:
              backendResponse.ok
                ? 502
                : backendResponse.status,
          }
        );
      }
    }

    if (
      !backendResponse.ok
    ) {
      return NextResponse.json(
        data || {
          success: false,

          message:
            "Unable to send message.",

          code:
            "BACKEND_MESSAGE_FAILED",
        },
        {
          status:
            backendResponse.status,
        }
      );
    }

    return NextResponse.json(
      data || {
        success: true,
      },
      {
        status:
          backendResponse.status,
      }
    );
  } catch (error) {
    console.error(
      "[SUPPORT MESSAGE PROXY]",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to send message.",

        code:
          "SUPPORT_MESSAGE_PROXY_FAILED",
      },
      {
        status: 500,
      }
    );
  }
}