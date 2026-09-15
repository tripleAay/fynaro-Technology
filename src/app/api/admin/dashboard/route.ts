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
      apiUrl.replace(
        /\/$/,
        ""
      );

    const response =
      await fetch(
        `${backendUrl}/api/admin/dashboard`,
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

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            data?.message ||
            "Unable to load admin dashboard.",
        },
        {
          status:
            response.status,
        }
      );
    }

    return NextResponse.json(
      data,
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET /api/admin/dashboard error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to load admin dashboard.",
      },
      {
        status: 500,
      }
    );
  }
}