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

    const url =
      new URL(request.url);

    const status =
      url.searchParams.get(
        "status"
      );

    const search =
      url.searchParams.get(
        "search"
      );

    const params =
      new URLSearchParams();

    if (status) {
      params.set(
        "status",
        status
      );
    }

    if (search) {
      params.set(
        "search",
        search
      );
    }

    const backendUrl =
      apiUrl.replace(/\/$/, "");

    const query =
      params.toString();

    const response =
      await fetch(
        `${backendUrl}/api/admin/requests${
          query
            ? `?${query}`
            : ""
        }`,
        {
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
      "GET /api/admin/requests error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to load project requests.",
      },
      {
        status: 500,
      }
    );
  }
}