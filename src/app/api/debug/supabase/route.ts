import {
  NextResponse,
} from "next/server";

export async function GET() {
  const rawUrl =
    process.env
      .NEXT_PUBLIC_SUPABASE_URL;

  const serviceKey =
    process.env
      .SUPABASE_SERVICE_ROLE_KEY;

  const supabaseUrl =
    rawUrl?.trim();

  if (!supabaseUrl) {
    return NextResponse.json(
      {
        ok: false,
        step: "env",
        message:
          "NEXT_PUBLIC_SUPABASE_URL is missing.",
      },
      {
        status: 500,
      }
    );
  }

  if (!serviceKey) {
    return NextResponse.json(
      {
        ok: false,
        step: "env",
        message:
          "SUPABASE_SERVICE_ROLE_KEY is missing.",
      },
      {
        status: 500,
      }
    );
  }

  const testUrl =
    `${supabaseUrl}/rest/v1/`;

  try {
    console.log(
      "[SUPABASE DEBUG] URL:",
      testUrl
    );

    const response =
      await fetch(
        testUrl,
        {
          method: "GET",

          headers: {
            apikey:
              serviceKey,

            Authorization:
              `Bearer ${serviceKey}`,
          },

          cache:
            "no-store",
        }
      );

    const text =
      await response.text();

    console.log(
      "[SUPABASE DEBUG] STATUS:",
      response.status
    );

    console.log(
      "[SUPABASE DEBUG] RESPONSE:",
      text.slice(
        0,
        1000
      )
    );

    return NextResponse.json(
      {
        ok:
          response.ok,

        step:
          "supabase-fetch",

        url:
          testUrl,

        status:
          response.status,

        response:
          text.slice(
            0,
            1000
          ),
      },
      {
        status:
          response.ok
            ? 200
            : response.status,
      }
    );
  } catch (error) {
    const err =
      error as Error & {
        cause?: unknown;
      };

    console.error(
      "[SUPABASE DEBUG] FETCH FAILED"
    );

    console.error(
      "[SUPABASE DEBUG] NAME:",
      err.name
    );

    console.error(
      "[SUPABASE DEBUG] MESSAGE:",
      err.message
    );

    console.error(
      "[SUPABASE DEBUG] CAUSE:",
      err.cause
    );

    return NextResponse.json(
      {
        ok: false,

        step:
          "network-fetch",

        url:
          testUrl,

        errorName:
          err.name,

        errorMessage:
          err.message,

        cause:
          String(
            err.cause ??
              "No cause available"
          ),
      },
      {
        status: 500,
      }
    );
  }
}