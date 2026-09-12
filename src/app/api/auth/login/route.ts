import {
  NextRequest,
  NextResponse,
} from "next/server";

export async function POST(
  request: NextRequest
) {
  try {
    const apiUrl =
      process.env.FYNARO_API_URL;

    const proxySecret =
      process.env.FYNARO_PROXY_SECRET;

    // ============================================================
    // ENV CHECKS
    // ============================================================

    if (!apiUrl) {
      return NextResponse.json(
        {
          source:
            "next-proxy",

          message:
            "FYNARO_API_URL is missing.",
        },
        {
          status: 500,
        }
      );
    }

    if (!proxySecret) {
      return NextResponse.json(
        {
          source:
            "next-proxy",

          message:
            "FYNARO_PROXY_SECRET is missing.",
        },
        {
          status: 500,
        }
      );
    }

    // ============================================================
    // REQUEST BODY
    // ============================================================

    const body =
      await request.json();

    const backendUrl =
      apiUrl.replace(
        /\/$/,
        ""
      );

    const loginUrl =
      `${backendUrl}/api/auth/login`;

    console.log(
      "[FYNARO PROXY] Sending login to:",
      loginUrl
    );

    // ============================================================
    // EXPRESS LOGIN
    // ============================================================

    const backendResponse =
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

    // ============================================================
    // READ RAW BACKEND RESPONSE FIRST
    // ============================================================

    const rawText =
      await backendResponse.text();

    console.log(
      "[FYNARO PROXY] Raw Express response:",
      rawText
    );

    let data:
      Record<string, any> = {};

    try {
      data =
        rawText
          ? JSON.parse(
              rawText
            )
          : {};
    } catch (error) {
      console.error(
        "[FYNARO PROXY] Express returned invalid JSON:",
        error
      );

      return NextResponse.json(
        {
          source:
            "next-proxy",

          message:
            "Backend returned an invalid response.",

          debug: {
            backendStatus:
              backendResponse.status,

            backendUrl:
              loginUrl,

            rawResponse:
              rawText.slice(
                0,
                500
              ),
          },
        },
        {
          status: 502,
        }
      );
    }

    // ============================================================
    // DEBUG EXACT BACKEND RESPONSE
    // ============================================================

    console.log(
      "[FYNARO PROXY] Parsed Express login response:",
      {
        status:
          backendResponse.status,

        ok:
          backendResponse.ok,

        backendUrl:
          loginUrl,

        keys:
          Object.keys(
            data
          ),

        message:
          data?.message,

        hasToken:
          Boolean(
            data?.token
          ),

        tokenType:
          typeof data?.token,

        tokenLength:
          typeof data?.token ===
          "string"
            ? data.token.length
            : 0,

        rememberMe:
          data?.rememberMe,

        user:
          data?.user,
      }
    );

    // ============================================================
    // BACKEND ERROR
    // ============================================================

    if (
      !backendResponse.ok
    ) {
      return NextResponse.json(
        {
          source:
            "next-proxy",

          message:
            data?.message ||
            "Login failed.",

          debug: {
            backendStatus:
              backendResponse.status,

            backendUrl:
              loginUrl,

            responseKeys:
              Object.keys(
                data
              ),
          },
        },
        {
          status:
            backendResponse.status,
        }
      );
    }

    // ============================================================
    // TOKEN CHECK
    // ============================================================

    if (
      !data?.token ||
      typeof data.token !==
        "string"
    ) {
      console.error(
        "[FYNARO PROXY] Login succeeded but token is missing.",
        {
          backendUrl:
            loginUrl,

          backendStatus:
            backendResponse.status,

          responseKeys:
            Object.keys(
              data
            ),

          response:
            data,
        }
      );

      return NextResponse.json(
        {
          source:
            "next-proxy",

          message:
            "Backend authenticated you but did not return a session token.",

          debug: {
            backendUrl:
              loginUrl,

            backendStatus:
              backendResponse.status,

            responseKeys:
              Object.keys(
                data
              ),

            tokenReceived:
              false,

            backendMessage:
              data?.message ||
              null,
          },
        },
        {
          status: 500,
        }
      );
    }

    // ============================================================
    // CREATE FIRST-PARTY COOKIE
    // ============================================================

    const response =
      NextResponse.json(
        {
          source:
            "next-proxy",

          message:
            "Login successful.",

          cookieCreated:
            true,

          user:
            data.user,
        },
        {
          status: 200,
        }
      );

    response.cookies.set({
      name:
        "fynaro_token",

      value:
        data.token,

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
        data.rememberMe
          ? 60 *
            60 *
            24 *
            7
          : 60 *
            60 *
            24,
    });

    // TEMP DEBUG COOKIE
    response.cookies.set({
      name:
        "fynaro_cookie_test",

      value:
        "working",

      httpOnly:
        false,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite:
        "lax",

      path:
        "/",

      maxAge:
        60 * 10,
    });

    return response;
  } catch (error) {
    console.error(
      "[FYNARO PROXY] Login proxy error:",
      error
    );

    return NextResponse.json(
      {
        source:
          "next-proxy",

        message:
          "Authentication proxy failed.",

        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}