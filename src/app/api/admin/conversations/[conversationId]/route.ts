import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

function getBackendUrl() {
  return (
    process.env.FYNARO_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3500"
  ).replace(/\/+$/, "");
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

// ======================================================
// GET CONVERSATION
// ======================================================

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { conversationId } = await params;

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

    const backendUrl = getBackendUrl();

    const backendResponse = await fetch(
      `${backendUrl}/api/admin/conversations/${encodeURIComponent(
        conversationId
      )}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    const data = await safelyReadResponse(backendResponse);

    if (!backendResponse.ok) {
      console.error(
        "[ADMIN CONVERSATION GET] Backend error:",
        backendResponse.status,
        data
      );

      return NextResponse.json(
        {
          success: false,
          message:
            data?.message ||
            "Unable to load conversation.",
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
        conversation: null,
        messages: [],
      },
      {
        status: backendResponse.status,
      }
    );
  } catch (error) {
    console.error(
      "[ADMIN CONVERSATION GET]",
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
      { status: 500 }
    );
  }
}

// ======================================================
// UPDATE CONVERSATION STATUS
// ======================================================

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { conversationId } = await params;

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
      status?: string;
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

    if (
      body.status !== "open" &&
      body.status !== "closed"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Status must be open or closed.",
        },
        { status: 400 }
      );
    }

    const backendUrl = getBackendUrl();

    const backendResponse = await fetch(
      `${backendUrl}/api/admin/conversations/${encodeURIComponent(
        conversationId
      )}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: body.status,
        }),
        cache: "no-store",
      }
    );

    const data = await safelyReadResponse(backendResponse);

    if (!backendResponse.ok) {
      console.error(
        "[ADMIN CONVERSATION PATCH] Backend error:",
        backendResponse.status,
        data
      );

      return NextResponse.json(
        {
          success: false,
          message:
            data?.message ||
            "Unable to update conversation.",
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
      "[ADMIN CONVERSATION PATCH]",
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
      { status: 500 }
    );
  }
}