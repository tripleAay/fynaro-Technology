import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  cookies,
} from "next/headers";

export const dynamic =
  "force-dynamic";

export const runtime =
  "nodejs";

type RouteContext = {
  params: Promise<{
    path?: string[];
  }>;
};

// ======================================================
// BACKEND URL
// ======================================================

function getApiUrl() {
  const apiUrl =
    process.env
      .FYNARO_API_URL
      ?.trim() ||
    process.env
      .NEXT_PUBLIC_API_URL
      ?.trim() ||
    "http://localhost:3500";

  return apiUrl.replace(
    /\/+$/,
    ""
  );
}

// ======================================================
// SAFE JSON PARSER
// ======================================================

async function readResponse(
  response: Response
) {
  const rawText =
    await response.text();

  if (!rawText) {
    return null;
  }

  try {
    return JSON.parse(
      rawText
    ) as Record<
      string,
      unknown
    >;
  } catch {
    return {
      success: false,
      message:
        "The Fynaro backend returned an invalid response.",
      code:
        "INVALID_BACKEND_RESPONSE",
      backendResponse:
        rawText.slice(
          0,
          500
        ),
    };
  }
}

// ======================================================
// PROXY
// ======================================================

async function proxyRequest(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // --------------------------------------------------
    // AUTHENTICATION
    // --------------------------------------------------

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
          code:
            "AUTH_REQUIRED",
        },
        {
          status: 401,
        }
      );
    }

    // --------------------------------------------------
    // DYNAMIC PATH
    // --------------------------------------------------

    const {
      path = [],
    } = await context.params;

    const safePath =
      path
        .map((segment) =>
          encodeURIComponent(
            segment
          )
        )
        .join("/");

    const baseUrl =
      `${getApiUrl()}/api/client/delivery-addresses`;

    const backendUrl =
      safePath
        ? `${baseUrl}/${safePath}`
        : baseUrl;

    // Preserve query parameters if supplied.
    const requestUrl =
      new URL(
        request.url
      );

    const queryString =
      requestUrl.searchParams.toString();

    const finalUrl =
      queryString
        ? `${backendUrl}?${queryString}`
        : backendUrl;

    // --------------------------------------------------
    // HEADERS
    // --------------------------------------------------

    const headers:
      Record<string, string> = {
        Accept:
          "application/json",

        Authorization:
          `Bearer ${token}`,
      };

    const contentType =
      request.headers.get(
        "content-type"
      );

    if (contentType) {
      headers[
        "Content-Type"
      ] = contentType;
    }

    // --------------------------------------------------
    // BODY
    // --------------------------------------------------

    const method =
      request.method.toUpperCase();

    let body:
      string |
      undefined;

    if (
      method !== "GET" &&
      method !== "HEAD"
    ) {
      const rawBody =
        await request.text();

      if (rawBody) {
        body = rawBody;
      }
    }

    // --------------------------------------------------
    // EXPRESS REQUEST
    // --------------------------------------------------

    const backendResponse =
      await fetch(
        finalUrl,
        {
          method,
          headers,
          body,
          cache:
            "no-store",
        }
      );

    const data =
      await readResponse(
        backendResponse
      );

    if (!data) {
      return new NextResponse(
        null,
        {
          status:
            backendResponse.status,
        }
      );
    }

    return NextResponse.json(
      data,
      {
        status:
          backendResponse.status,

        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "[DELIVERY ADDRESS PROXY]",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to process delivery address request.",

        code:
          "DELIVERY_ADDRESS_PROXY_FAILED",
      },
      {
        status: 500,
      }
    );
  }
}

// ======================================================
// METHODS
// ======================================================

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  return proxyRequest(
    request,
    context
  );
}

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  return proxyRequest(
    request,
    context
  );
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  return proxyRequest(
    request,
    context
  );
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  return proxyRequest(
    request,
    context
  );
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  return proxyRequest(
    request,
    context
  );
}