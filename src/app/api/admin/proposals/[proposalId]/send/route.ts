import {
  NextRequest,
  NextResponse,
} from "next/server";

import { cookies } from "next/headers";

export const dynamic =
  "force-dynamic";

const API_URL =
  process.env.FYNARO_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3500";

type RouteContext = {
  params: Promise<{
    proposalId: string;
  }>;
};

export async function POST(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { proposalId } =
      await params;

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
          code:
            "AUTH_REQUIRED",
        },
        {
          status: 401,
        }
      );
    }

    const backendUrl =
      API_URL.replace(
        /\/$/,
        ""
      );

    const response =
      await fetch(
        `${backendUrl}/api/admin/proposals/${proposalId}/send`,
        {
          method: "POST",

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

    let data: unknown;

    try {
      data =
        await response.json();
    } catch {
      data = {
        success: false,

        message:
          "The Fynaro API returned an invalid response.",

        code:
          "INVALID_API_RESPONSE",
      };
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
      "[POST /api/admin/proposals/[proposalId]/send]",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to send proposal.",

        code:
          "SEND_PROPOSAL_PROXY_FAILED",
      },
      {
        status: 500,
      }
    );
  }
}