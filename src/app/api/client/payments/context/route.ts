import {
  NextRequest,
  NextResponse,
} from "next/server";

import { cookies } from "next/headers";

export const dynamic =
  "force-dynamic";

function getApiUrl() {
  const url =
    process.env.FYNARO_API_URL ||
    process.env
      .NEXT_PUBLIC_API_URL ||
    "http://localhost:3500";

  return url.replace(/\/$/, "");
}

export async function GET(
  request: NextRequest
) {
  try {
    // ==========================================
    // AUTH
    // ==========================================

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
            "Authentication required.",
        },
        {
          status: 401,
        }
      );
    }

    // ==========================================
    // QUERY PARAMETERS
    // ==========================================

    const orderId =
      request.nextUrl.searchParams.get(
        "orderId"
      );

    const stageId =
      request.nextUrl.searchParams.get(
        "stageId"
      );

    if (!orderId || !stageId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "orderId and stageId are required.",
        },
        {
          status: 400,
        }
      );
    }

    // ==========================================
    // EXPRESS API
    // ==========================================

    const apiUrl =
      getApiUrl();

    const params =
      new URLSearchParams({
        orderId,
        stageId,
      });

    const response =
      await fetch(
        `${apiUrl}/api/client/payments/context?${params.toString()}`,
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

    // ==========================================
    // SAFELY READ RESPONSE
    // ==========================================

    const contentType =
      response.headers.get(
        "content-type"
      ) || "";

    let data: unknown;

    if (
      contentType.includes(
        "application/json"
      )
    ) {
      data =
        await response.json();
    } else {
      const text =
        await response.text();

      console.error(
        "[PAYMENT CONTEXT PROXY] Non-JSON backend response:",
        {
          status:
            response.status,
          text: text.slice(
            0,
            500
          ),
        }
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "The payment server returned an invalid response.",
        },
        {
          status:
            response.status >=
              400
              ? response.status
              : 502,
        }
      );
    }

    return NextResponse.json(
      data,
      {
        status:
          response.status,
      }
    );
  } catch (error) {
    console.error(
      "[PAYMENT CONTEXT PROXY]",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to load payment context.",
      },
      {
        status: 500,
      }
    );
  }
}