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

export async function POST(
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
    // BODY
    // ==========================================

    const body =
      await request.json();

    const orderId =
      body?.orderId;

    const stageId =
      body?.stageId;

    const provider =
      body?.provider;

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
    // IMPORTANT
    //
    // We intentionally DO NOT accept:
    //
    // amount
    // percentage
    // currency
    // proposalId
    //
    // Those values must come from the backend.
    // ==========================================

    const payload: {
      orderId: string;
      stageId: string;
      provider?: string;
    } = {
      orderId,
      stageId,
    };

    if (
      typeof provider ===
        "string" &&
      provider.trim()
    ) {
      payload.provider =
        provider.trim();
    }

    // ==========================================
    // EXPRESS API
    // ==========================================

    const apiUrl =
      getApiUrl();

    const response =
      await fetch(
        `${apiUrl}/api/client/payments/initialize`,
        {
          method: "POST",

          headers: {
            Accept:
              "application/json",

            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body:
            JSON.stringify(
              payload
            ),

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
        "[PAYMENT INITIALIZE PROXY] Non-JSON backend response:",
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
      "[PAYMENT INITIALIZE PROXY]",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Unable to initialize payment.",
      },
      {
        status: 500,
      }
    );
  }
}