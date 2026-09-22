import {
  NextRequest,
  NextResponse,
} from "next/server";

export const dynamic =
  "force-dynamic";

type RouteContext = {
  params: Promise<{
    proposalId: string;
  }>;
};

type AcceptProposalBody = {
  deliveryAddressId?: string;
};

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const {
      proposalId,
    } = await context.params;

    if (!proposalId) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Proposal ID is required.",

          code:
            "PROPOSAL_ID_REQUIRED",
        },
        {
          status: 400,
        }
      );
    }

    const token =
      request.cookies.get(
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

    let body:
      AcceptProposalBody;

    try {
      body =
        await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,

          message:
            "Invalid acceptance request.",

          code:
            "INVALID_REQUEST_BODY",
        },
        {
          status: 400,
        }
      );
    }

    const deliveryAddressId =
      typeof body
        ?.deliveryAddressId ===
      "string"
        ? body.deliveryAddressId.trim()
        : "";

    if (!deliveryAddressId) {
      return NextResponse.json(
        {
          success: false,

          message:
            "Select a delivery address before accepting this proposal.",

          code:
            "DELIVERY_ADDRESS_REQUIRED",
        },
        {
          status: 400,
        }
      );
    }

    const apiUrl =
      process.env
        .FYNARO_API_URL
        ?.trim();

    if (!apiUrl) {
      console.error(
        "[ACCEPT PROPOSAL PROXY] FYNARO_API_URL is missing."
      );

      return NextResponse.json(
        {
          success: false,

          message:
            "Fynaro API is not configured.",

          code:
            "API_NOT_CONFIGURED",
        },
        {
          status: 500,
        }
      );
    }

    const backendUrl =
      apiUrl.replace(
        /\/+$/,
        ""
      );

    const endpoint =
      `${backendUrl}/api/client/proposals/${encodeURIComponent(
        proposalId
      )}/accept`;

    let backendResponse:
      Response;

    try {
      backendResponse =
        await fetch(
          endpoint,
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
              JSON.stringify({
                deliveryAddressId,
              }),

            cache:
              "no-store",
          }
        );
    } catch (error) {
      console.error(
        "[ACCEPT PROPOSAL PROXY] Backend connection failed:",
        error
      );

      return NextResponse.json(
        {
          success: false,

          message:
            "Unable to connect to the Fynaro API.",

          code:
            "API_CONNECTION_FAILED",
        },
        {
          status: 502,
        }
      );
    }

    const responseText =
      await backendResponse.text();

    let data:
      Record<
        string,
        unknown
      > = {};

    if (responseText) {
      try {
        data =
          JSON.parse(
            responseText
          );
      } catch {
        console.error(
          "[ACCEPT PROPOSAL PROXY] Invalid backend response:",
          responseText.slice(
            0,
            500
          )
        );

        return NextResponse.json(
          {
            success: false,

            message:
              "Fynaro API returned an invalid response.",

            code:
              "INVALID_API_RESPONSE",
          },
          {
            status: 502,
          }
        );
      }
    }

    return NextResponse.json(
      data,
      {
        status:
          backendResponse.status,
      }
    );
  } catch (error) {
    console.error(
      "[ACCEPT PROPOSAL PROXY]",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to accept proposal.",

        code:
          "ACCEPT_PROPOSAL_PROXY_FAILED",
      },
      {
        status: 500,
      }
    );
  }
}