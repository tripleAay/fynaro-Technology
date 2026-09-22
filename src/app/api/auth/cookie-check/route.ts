import {
  NextResponse,
} from "next/server";

import {
  cookies,
} from "next/headers";

export const dynamic =
  "force-dynamic";

export async function GET() {
  const cookieStore =
    await cookies();

  const cookieNames =
    cookieStore
      .getAll()
      .map(
        (cookie) =>
          cookie.name
      );

  return NextResponse.json({
    success: true,

    hasFynaroToken:
      Boolean(
        cookieStore.get(
          "fynaro_token"
        )?.value
      ),

    cookieNames,
  });
}