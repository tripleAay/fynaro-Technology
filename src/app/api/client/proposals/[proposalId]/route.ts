import {
  NextRequest,
  NextResponse,
} from "next/server";

export async function GET(
  request: NextRequest
) {
  try {
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

    const backendUrl =
      apiUrl.replace(/\/$/, "");

    const response =
      await fetch(
        `${backendUrl}/api/client/proposals`,
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
      "GET client proposals error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to load proposals.",
      },
      {
        status: 500,
      }
    );
  }
}