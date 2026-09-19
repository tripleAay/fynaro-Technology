import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

function getBackendUrl() {
  return (
    process.env.FYNARO_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3500"
  ).replace(/\/$/, "");
}

async function safelyReadResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      message: "The Fynaro backend returned an invalid response.",
      raw: text.slice(0, 500),
    };
  }
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
    const { conversationId } = await context.params;

    if (!conversationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Conversation ID is required.",
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
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    let body: {
      message?: string;
      messageType?: string;
    };

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    const message = body.message?.trim();

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "Message is required.",
        },
        { status: 400 }
      );
    }

    const allowedMessageTypes = [
      "message",
      "question",
      "update",
      "feedback",
    ];

    const messageType =
      body.messageType &&
      allowedMessageTypes.includes(body.messageType)
        ? body.messageType
        : "message";

    const backendUrl = getBackendUrl();

    const backendResponse = await fetch(
      `${backendUrl}/api/admin/conversations/${encodeURIComponent(
        conversationId
      )}/messages`,
      {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          message,
          messageType,
        }),

        cache: "no-store",
      }
    );

    const data = await safelyReadResponse(backendResponse);

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          success: false,

          message:
            data?.message ||
            "Unable to send message.",

          ...(process.env.NODE_ENV === "development"
            ? {
                backendStatus: backendResponse.status,
                backendResponse: data,
              }
            : {}),
        },
        {
          status: backendResponse.status,
        }
      );
    }

    return NextResponse.json(
      data || {
        success: true,
      },
      {
        status: backendResponse.status,
      }
    );
  } catch (error) {
    console.error(
      "[ADMIN CONVERSATION MESSAGE POST]",
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