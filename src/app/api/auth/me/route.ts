import {
  NextRequest,
  NextResponse,
} from "next/server";

export const dynamic = "force-dynamic";

// ============================================================
// GET CURRENT AUTHENTICATED USER
//
// Universal session endpoint.
//
// Client:
// /auth/login -> /api/auth/me -> /shop
//
// Admin:
// /auth/login?next=/admin -> /api/auth/me -> /admin
//
// Admin authorization is handled separately by /api/admin/me.
// ============================================================

export async function GET(
  request: NextRequest
) {
  try {
    // ========================================================
    // SESSION COOKIE
    // ========================================================

    const token =
      request.cookies.get(
        "fynaro_token"
      )?.value;

    if (!token) {
      return NextResponse.json(
        {
          authenticated: false,
          message:
            "Not authenticated.",
        },
        {
          status: 401,
        }
      );
    }

    // ========================================================
    // BACKEND CONFIG
    // ========================================================

    const apiUrl =
      process.env.FYNARO_API_URL?.trim();

    if (!apiUrl) {
      console.error(
        "[FYNARO AUTH ME] FYNARO_API_URL is not configured."
      );

      return NextResponse.json(
        {
          authenticated: false,
          message:
            "Fynaro API is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    const backendUrl =
      apiUrl.replace(/\/+$/, "");

    // IMPORTANT:
    // This is the universal auth endpoint.
    // Do NOT use /api/admin/me here.
    const meUrl =
      `${backendUrl}/api/auth/me`;

    console.log(
      "[FYNARO AUTH ME] Verifying session:",
      meUrl
    );

    // ========================================================
    // VERIFY JWT WITH EXPRESS
    // ========================================================

    let backendResponse: Response;

    try {
      backendResponse =
        await fetch(
          meUrl,
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
    } catch (error) {
      console.error(
        "[FYNARO AUTH ME] Backend connection failed:",
        error
      );

      return NextResponse.json(
        {
          authenticated: false,
          message:
            "Unable to connect to the Fynaro API.",
        },
        {
          status: 502,
        }
      );
    }

    // ========================================================
    // READ BACKEND RESPONSE
    // ========================================================

    const rawText =
      await backendResponse.text();

    let data: Record<
      string,
      any
    > = {};

    if (rawText) {
      try {
        data =
          JSON.parse(rawText);
      } catch {
        console.error(
          "[FYNARO AUTH ME] Backend returned non-JSON:",
          rawText.slice(
            0,
            500
          )
        );

        return NextResponse.json(
          {
            authenticated: false,
            message:
              "Fynaro API returned an invalid response.",
          },
          {
            status: 502,
          }
        );
      }
    }

    // ========================================================
    // SESSION REJECTED
    // ========================================================

    if (!backendResponse.ok) {
      console.error(
        "[FYNARO AUTH ME] Session rejected:",
        {
          status:
            backendResponse.status,

          message:
            data?.message,
        }
      );

      const response =
        NextResponse.json(
          {
            authenticated: false,

            message:
              data?.message ||
              "Unable to verify your session.",
          },
          {
            status:
              backendResponse.status,
          }
        );

      // Only remove the browser session when the JWT itself
      // is invalid/expired.
      if (
        backendResponse.status ===
        401
      ) {
        response.cookies.set({
          name:
            "fynaro_token",

          value:
            "",

          httpOnly:
            true,

          secure:
            process.env.NODE_ENV ===
            "production",

          sameSite:
            "lax",

          path:
            "/",

          maxAge:
            0,
        });
      }

      return response;
    }

    // ========================================================
    // VALIDATE USER
    // ========================================================

    if (!data?.user) {
      console.error(
        "[FYNARO AUTH ME] Backend returned no user:",
        data
      );

      return NextResponse.json(
        {
          authenticated: false,
          message:
            "Fynaro could not verify your account.",
        },
        {
          status: 502,
        }
      );
    }

    // ========================================================
    // SUCCESS
    // ========================================================

    console.log(
      "[FYNARO AUTH ME] Session verified:",
      {
        userId:
          data.user?.id,

        email:
          data.user?.email,
      }
    );

    return NextResponse.json(
      {
        authenticated: true,

        user:
          data.user,
      },
      {
        status: 200,

        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "[FYNARO AUTH ME] Unexpected error:",
      error
    );

    return NextResponse.json(
      {
        authenticated: false,

        message:
          "Unable to verify your session.",
      },
      {
        status: 500,
      }
    );
  }
}