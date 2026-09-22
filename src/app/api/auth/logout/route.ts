import {
  NextRequest,
  NextResponse,
} from "next/server";

export const dynamic =
  "force-dynamic";

export async function POST(
  request: NextRequest
) {
  const apiUrl =
    process.env
      .FYNARO_API_URL
      ?.trim()
      .replace(
        /\/+$/,
        ""
      );

  const token =
    request.cookies.get(
      "fynaro_token"
    )?.value;

  if (apiUrl && token) {
    try {
      await fetch(
        `${apiUrl}/api/auth/logout`,
        {
          method: "POST",

          headers: {
            Accept:
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          cache: "no-store",
        }
      );
    } catch (error) {
      console.error(
        "[FYNARO LOGOUT PROXY]",
        error
      );
    }
  }

  const response =
    NextResponse.json(
      {
        success: true,

        message:
          "Signed out successfully.",
      },
      {
        status: 200,
      }
    );

  response.cookies.set({
    name: "fynaro_token",
    value: "",
    httpOnly: true,
    secure:
      process.env.NODE_ENV ===
      "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}