import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const tx_ref = `fynaro_${body.serviceId}_${Date.now()}`;

  return NextResponse.json({
    publicKey: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref,
    amount: body.amount,
  });
}