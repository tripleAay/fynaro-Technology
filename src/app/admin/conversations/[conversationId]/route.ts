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

export async function GET(
  _request: NextRequest,
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

    const response =
      await fetch(
        `${getApiUrl()}/api/admin/conversations/${encodeURIComponent(
          conversationId
        )}`,
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

    const rawText =
      await response.text();

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
      "[ADMIN CONVERSATION]",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to load conversation.",
      },
      {
        status: 500,
      }
    );
  }
}

// ======================================================
// UPDATE STATUS
// ======================================================

export async function PATCH(
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

    const response =
      await fetch(
        `${getApiUrl()}/api/admin/conversations/${encodeURIComponent(
          conversationId
        )}/status`,
        {
          method: "PATCH",

          headers: {
            Accept:
              "application/json",

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body:
            JSON.stringify(
              body
            ),

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
      "[ADMIN CONVERSATION STATUS]",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to update conversation.",
      },
      {
        status: 500,
      }
    );
  }
}