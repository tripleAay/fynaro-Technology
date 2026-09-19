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

type RouteContext = {
  params: Promise<{
    conversationId: string;
  }>;
};

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const {
      conversationId,
    } =
      await context.params;

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

    const body =
      await request.json();

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
        },
        {
          status: 400,
        }
      );
    }

    const response =
      await fetch(
        `${getApiUrl()}/api/admin/conversations/${encodeURIComponent(
          conversationId
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

    const rawText =
      await response.text();

    let data = null;

    if (rawText) {
      try {
        data =
          JSON.parse(
            rawText
          );
      } catch {
        console.error(
          "[ADMIN MESSAGE] Non-JSON backend response:",
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
      "[ADMIN MESSAGE]",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to send message.",
      },
      {
        status: 500,
      }
    );
  }
}