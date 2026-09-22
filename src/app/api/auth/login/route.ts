import {
  NextRequest,
  NextResponse,
} from "next/server";

export const dynamic =
  "force-dynamic";

export const runtime =
  "nodejs";

type LoginRequestBody = {
  emailOrUsername?: string;
  password?: string;
  rememberMe?: boolean;
  turnstileToken?: string | null;
};

type BackendLoginResponse = {
  success?: boolean;
  message?: string;
  token?: string;
  accessToken?: string;
  rememberMe?: boolean;

  user?: {
    id?: string;
    fullName?: string;
    email?: string;
    role?: string;
  } | null;
};

// ============================================================
// POST /api/auth/login
// ============================================================

export async function POST(
  request: NextRequest
) {
  try {
    // ========================================================
    // ENVIRONMENT
    // ========================================================

    const apiUrl =
      process.env
        .FYNARO_API_URL
        ?.trim();

    const proxySecret =
      process.env
        .FYNARO_PROXY_SECRET
        ?.trim();

    if (!apiUrl) {
      console.error(
        "[FYNARO LOGIN PROXY] FYNARO_API_URL is missing."
      );

      return NextResponse.json(
        {
          source: "next-proxy",
          success: false,
          message:
            "Fynaro API is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    // ========================================================
    // REQUEST BODY
    // ========================================================

    let body: LoginRequestBody;

    try {
      body =
        (await request.json()) as LoginRequestBody;
    } catch {
      return NextResponse.json(
        {
          source: "next-proxy",
          success: false,
          message:
            "Invalid login request.",
        },
        {
          status: 400,
        }
      );
    }

    const emailOrUsername =
      typeof body.emailOrUsername ===
      "string"
        ? body.emailOrUsername.trim()
        : "";

    const password =
      typeof body.password ===
      "string"
        ? body.password
        : "";

    if (
      !emailOrUsername ||
      !password
    ) {
      return NextResponse.json(
        {
          source: "next-proxy",
          success: false,
          message:
            "Username or email and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    // ========================================================
    // EXPRESS URL
    // ========================================================

    const backendUrl =
      apiUrl.replace(
        /\/+$/,
        ""
      );

    const loginUrl =
      `${backendUrl}/api/auth/login`;

    // ========================================================
    // EXPRESS HEADERS
    // ========================================================

    const headers:
      Record<string, string> = {
        "Content-Type":
          "application/json",
        Accept:
          "application/json",
      };

    if (proxySecret) {
      headers[
        "x-fynaro-proxy-secret"
      ] = proxySecret;
    }

    const forwardedFor =
      request.headers.get(
        "x-forwarded-for"
      );

    const realIp =
      request.headers.get(
        "x-real-ip"
      );

    if (forwardedFor) {
      headers[
        "x-forwarded-for"
      ] = forwardedFor;
    }

    if (realIp) {
      headers[
        "x-real-ip"
      ] = realIp;
    }

    // ========================================================
    // EXPRESS LOGIN REQUEST
    // ========================================================

    let backendResponse:
      Response;

    try {
      backendResponse =
        await fetch(
          loginUrl,
          {
            method: "POST",

            headers,

            body:
              JSON.stringify({
                ...body,
                emailOrUsername,
                password,
              }),

            cache: "no-store",
          }
        );
    } catch (error) {
      console.error(
        "[FYNARO LOGIN PROXY] Express connection failed:",
        error
      );

      return NextResponse.json(
        {
          source: "next-proxy",
          success: false,
          message:
            "Unable to connect to the Fynaro API.",
        },
        {
          status: 502,
        }
      );
    }

    // ========================================================
    // PARSE EXPRESS RESPONSE
    // ========================================================

    const rawText =
      await backendResponse.text();

    let data:
      BackendLoginResponse = {};

    if (rawText) {
      try {
        data =
          JSON.parse(
            rawText
          ) as BackendLoginResponse;
      } catch {
        console.error(
          "[FYNARO LOGIN PROXY] Express returned invalid JSON:",
          rawText.slice(
            0,
            500
          )
        );

        return NextResponse.json(
          {
            source: "next-proxy",
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

    // ========================================================
    // EXPRESS REJECTED LOGIN
    // ========================================================

    if (!backendResponse.ok) {
      return NextResponse.json(
        {
          source: "next-proxy",
          success: false,
          message:
            data.message ||
            "Login failed.",
        },
        {
          status:
            backendResponse.status,
        }
      );
    }

    // ========================================================
    // GET JWT
    // ========================================================

    const rawToken =
      data.token ||
      data.accessToken ||
      "";

    const token =
      typeof rawToken ===
      "string"
        ? rawToken.trim()
        : "";

    if (!token) {
      console.error(
        "[FYNARO LOGIN PROXY] Express authenticated the user but returned no JWT.",
        {
          status:
            backendResponse.status,

          responseKeys:
            Object.keys(data),
        }
      );

      return NextResponse.json(
        {
          source: "next-proxy",
          success: false,
          message:
            "Login succeeded but a Fynaro session could not be created.",
        },
        {
          status: 502,
        }
      );
    }

    // ========================================================
    // CREATE NEXT RESPONSE
    // ========================================================

    const response =
      NextResponse.json(
        {
          source: "next-proxy",
          success: true,
          message:
            data.message ||
            "Login successful.",
          user:
            data.user || null,
        },
        {
          status: 200,

          headers: {
            "Cache-Control":
              "no-store, no-cache, must-revalidate",
          },
        }
      );

    // ========================================================
    // CREATE FIRST-PARTY JWT COOKIE
    // ========================================================

    const shouldRemember =
      typeof body.rememberMe ===
      "boolean"
        ? body.rememberMe
        : Boolean(
            data.rememberMe
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
          ? 60 * 60 * 24 * 7
          : 60 * 60 * 24,
    });

    console.log(
      "[FYNARO LOGIN PROXY] Session created:",
      {
        hasToken:
          true,

        rememberMe:
          shouldRemember,

        secure:
          process.env.NODE_ENV ===
          "production",

        userId:
          data.user?.id ||
          null,
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
        source: "next-proxy",
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