import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      transaction_id,
      tx_ref,
      serviceId,
      serviceTitle,
      customerEmail,
      customerName,
      customerPhone,
      expectedAmount,
      expectedCurrency,
    } = body;

    if (!transaction_id) {
      return NextResponse.json(
        { error: "Missing transaction_id" },
        { status: 400 }
      );
    }

    const secretKey = process.env.FLW_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { error: "Missing Flutterwave secret key" },
        { status: 500 }
      );
    }

    const res = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok || result?.status !== "success" || !result?.data) {
      return NextResponse.json(
        { error: result?.message || "Verification failed" },
        { status: 400 }
      );
    }

    const data = result.data;

    const isValid =
      data.status === "successful" &&
      data.tx_ref === tx_ref &&
      Number(data.amount) >= Number(expectedAmount) &&
      String(data.currency).toUpperCase() ===
        String(expectedCurrency).toUpperCase();

    if (!isValid) {
      return NextResponse.json(
        { error: "Payment could not be validated" },
        { status: 400 }
      );
    }

    // Save to Supabase here if you want
    // customerEmail, customerName, customerPhone can now be fallback values

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      payment: {
        id: data.id,
        tx_ref: data.tx_ref,
        flw_ref: data.flw_ref,
        amount: data.amount,
        currency: data.currency,
        status: data.status,
        serviceId,
        serviceTitle,
        customerEmail: customerEmail || null,
        customerName: customerName || null,
        customerPhone: customerPhone || null,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong during verification",
      },
      { status: 500 }
    );
  }
}