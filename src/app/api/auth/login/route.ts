import {
  NextRequest,
  NextResponse,
} from "next/server";

export const dynamic =
  "force-dynamic";

export async function POST(
  request: NextRequest
) {
  try {
    // ============================================================
    // ENVIRONMENT
    // ============================================================

    const apiUrl =
      process.env.FYNARO_API_URL?.trim();

    const proxySecret =
      process.env.FYNARO_PROXY_SECRET?.trim();

    if (!apiUrl) {
      console.error(
        "[FYNARO LOGIN PROXY] FYNARO_API_URL is missing."
      );

      return NextResponse.json(
        {
          source:
            "next-proxy",

          success: false,

          message:
            "Fynaro API is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    if (!proxySecret) {
      console.error(
        "[FYNARO LOGIN PROXY] FYNARO_PROXY_SECRET is missing."
      );

      return NextResponse.json(
        {
          source:
            "next-proxy",

          success: false,

          message:
            "Fynaro authentication proxy is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    // ============================================================
    // REQUEST BODY
    // ============================================================

    let body: Record<
      string,
      unknown
    >;

    try {
      body =
        await request.json();
    } catch {
      return NextResponse.json(
        {
          source:
            "next-proxy",

          success: false,

          message:
            "Invalid login request.",
        },
        {
          status: 400,
        }
      );
    }

    // ============================================================
    // BACKEND URL
    // ============================================================

    const backendUrl =
      apiUrl.replace(
        /\/$/,
        ""
      );

    const loginUrl =
      `${backendUrl}/api/auth/login`;

    console.log(
      "[FYNARO LOGIN PROXY] Express:",
      loginUrl
    );

    // ============================================================
    // EXPRESS LOGIN
    // ============================================================

    let backendResponse:
      Response;

    try {
      backendResponse =
        await fetch(
          loginUrl,
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",

              "x-fynaro-proxy-secret":
                proxySecret,

              "x-forwarded-for":
                request.headers.get(
                  "x-forwarded-for"
                ) || "",
            },

            body:
              JSON.stringify(
                body
              ),

            cache:
              "no-store",
          }
        );
    } catch (error) {
      console.error(
        "[FYNARO LOGIN PROXY] Express connection failed:",
        error
      );

      return NextResponse.json(
        {
          source:
            "next-proxy",

          success: false,

          message:
            "Unable to connect to the Fynaro API.",
        },
        {
          status: 502,
        }
      );
    }

    // ============================================================
    // READ RESPONSE
    // ============================================================

    const rawText =
      await backendResponse.text();

    let data: Record<
      string,
      any
    > = {};

    if (rawText) {
      try {
        data =
          JSON.parse(
            rawText
          );
      } catch {
        console.error(
          "[FYNARO LOGIN PROXY] Express returned non-JSON:",
          rawText.slice(
            0,
            500
          )
        );

        return NextResponse.json(
          {
            source:
              "next-proxy",

            success: false,

            message:
              "Fynaro API returned an invalid response.",
          },
          {
            status: 502,
          }
        );
      }
    }

    console.log(
      "[FYNARO LOGIN PROXY] Express response:",
      {
        status:
          backendResponse.status,

        ok:
          backendResponse.ok,

        message:
          data?.message,

        hasToken:
          typeof data?.token ===
          "string",

        tokenLength:
          typeof data?.token ===
          "string"
            ? data.token.length
            : 0,

        hasUser:
          Boolean(
            data?.user
          ),
      }
    );

    // ============================================================
    // EXPRESS REJECTED LOGIN
    // ============================================================

    if (
      !backendResponse.ok
    ) {
      return NextResponse.json(
        {
          source:
            "next-proxy",

          success: false,

          message:
            data?.message ||
            "Login failed.",
        },
        {
          status:
            backendResponse.status,
        }
      );
    }

    // ============================================================
    // VERIFY TOKEN
    // ============================================================

    const token =
      typeof data?.token ===
        "string"
        ? data.token.trim()
        : "";

    if (!token) {
      console.error(
        "[FYNARO LOGIN PROXY] Express authenticated user but returned no JWT.",
        {
          status:
            backendResponse.status,

          message:
            data?.message,

          keys:
            Object.keys(
              data
            ),
        }
      );

      return NextResponse.json(
        {
          source:
            "next-proxy",

          success: false,

          message:
            "Login succeeded but a session could not be created.",
        },
        {
          status: 502,
        }
      );
    }

    // ============================================================
    // RESPONSE
    // ============================================================

    const response =
      NextResponse.json(
        {
          source:
            "next-proxy",

          success: true,

          message:
            data?.message ||
            "Login successful.",

          user:
            data?.user ||
            null,
        },
        {
          status: 200,
        }
      );

    // ============================================================
    // FIRST-PARTY SESSION COOKIE
    // ============================================================

    const shouldRemember =
      Boolean(
        data?.rememberMe
      );

    response.cookies.set({
      name:
        "fynaro_token",

      value:
        token,

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
        shouldRemember
          ? 60 *
            60 *
            24 *
            7
          : 60 *
            60 *
            24,
    });

    console.log(
      "[FYNARO LOGIN PROXY] Session cookie created:",
      {
        rememberMe:
          shouldRemember,

        secure:
          process.env.NODE_ENV ===
          "production",
      }
    );

    return response;
  } catch (error) {
    console.error(
      "[FYNARO LOGIN PROXY] Unexpected error:",
      error
    );

    return NextResponse.json(
      {
        source:
          "next-proxy",

        success: false,

        message:
          "Authentication proxy failed.",
      },
      {
        status: 500,
      }
    );
  }
}