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
  return (
    process.env
      .FYNARO_API_URL ||
    process.env
      .NEXT_PUBLIC_API_URL ||
    "http://localhost:3500"
  )
    .trim()
    .replace(
      /\/+$/,
      ""
    );
}

async function readResponse(
  response: Response
) {
  const text =
    await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(
      text
    );
  } catch {
    return {
      success: false,

      message:
        "Fynaro API returned an invalid response.",
    };
  }
}

export async function GET(
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
            "Not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    const requestUrl =
      new URL(request.url);

    const backendUrl =
      new URL(
        `${getApiUrl()}/api/admin/payments`
      );

    requestUrl.searchParams.forEach(
      (
        value,
        key
      ) => {
        backendUrl.searchParams.set(
          key,
          value
        );
      }
    );

    const backendResponse =
      await fetch(
        backendUrl.toString(),
        {
          method: "GET",

          headers: {
            Accept:
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          cache: "no-store",
        }
      );

    const data =
      await readResponse(
        backendResponse
      );

    return NextResponse.json(
      data,
      {
        status:
          backendResponse.status,
      }
    );
  } catch (error) {
    console.error(
      "[ADMIN PAYMENTS PROXY]",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to load Fynaro payments.",
      },
      {
        status: 500,
      }
    );
  }
}