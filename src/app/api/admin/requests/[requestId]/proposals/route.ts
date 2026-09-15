import {
  NextRequest,
  NextResponse,
} from "next/server";

type RouteContext = {
  params: Promise<{
    requestId: string;
  }>;
};

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const {
      requestId,
    } = await context.params;

    const token =
      request.cookies.get(
        "fynaro_token"
      )?.value;

    if (!token) {
      return NextResponse.json(
        {
          message:
            "Not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    const apiUrl =
      process.env.FYNARO_API_URL;

    if (!apiUrl) {
      return NextResponse.json(
        {
          message:
            "FYNARO_API_URL is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const body =
      await request.json();

    const backendUrl =
      apiUrl.replace(/\/$/, "");

    const response =
      await fetch(
        `${backendUrl}/api/admin/requests/${encodeURIComponent(
          requestId
        )}/proposals`,
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
            JSON.stringify(body),

          cache:
            "no-store",
        }
      );

    const data =
      await response
        .json()
        .catch(() => ({}));

    return NextResponse.json(
      data,
      {
        status:
          response.status,
      }
    );
  } catch (error) {
    console.error(
      "POST admin proposal error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to create proposal.",
      },
      {
        status: 500,
      }
    );
  }
}