import { NextResponse } from "next/server";
import { upsertOrder } from "@/lib/payments/upsertOrder";

type VerifyBody = {
  transaction_id: number;
  tx_ref: string;
  serviceId: string;
  serviceTitle: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  expectedAmount: number;
  expectedCurrency: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as VerifyBody;

    if (
      !body?.transaction_id ||
      !body?.tx_ref ||
      !body?.serviceId ||
      !body?.serviceTitle ||
      !body?.customerEmail ||
      !body?.customerName ||
      !body?.expectedAmount ||
      !body?.expectedCurrency
    ) {
      return NextResponse.json(
        { error: "Missing verification fields." },
        { status: 400 }
      );
    }

    const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { error: "Missing FLUTTERWAVE_SECRET_KEY." },
        { status: 500 }
      );
    }

    const verifyRes = await fetch(
      `https://api.flutterwave.com/v3/transactions/${body.transaction_id}/verify`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    const verifyData = await verifyRes.json();

    if (!verifyRes.ok) {
      return NextResponse.json(
        { error: verifyData?.message || "Verification failed." },
        { status: 500 }
      );
    }

    const tx = verifyData?.data;

    if (!tx) {
      return NextResponse.json(
        { error: "No transaction returned." },
        { status: 400 }
      );
    }

    if (tx.tx_ref !== body.tx_ref) {
      return NextResponse.json(
        { error: "Transaction reference mismatch." },
        { status: 400 }
      );
    }

    if (tx.status !== "successful") {
      await upsertOrder({
        txRef: body.tx_ref,
        flutterwaveTransactionId: tx.id ?? null,
        flutterwaveTxRef: tx.flw_ref ?? null,
        serviceId: body.serviceId,
        serviceTitle: body.serviceTitle,
        amount: Number(tx.amount || body.expectedAmount),
        currency: tx.currency || body.expectedCurrency,
        customerEmail: body.customerEmail,
        customerName: body.customerName,
        customerPhone: body.customerPhone || tx.customer?.phone_number || null,
        paymentStatus: "failed",
        paymentMethod: tx.payment_type || null,
        status: "failed",
        verificationSource: "client_verify",
        rawResponse: tx,
        paidAt: null,
      });

      return NextResponse.json(
        { error: "Payment not successful." },
        { status: 400 }
      );
    }

    if (Number(tx.amount) < Number(body.expectedAmount)) {
      return NextResponse.json(
        { error: "Amount paid is lower than expected." },
        { status: 400 }
      );
    }

    if (tx.currency !== body.expectedCurrency) {
      return NextResponse.json(
        { error: "Currency mismatch." },
        { status: 400 }
      );
    }

    const savedOrder = await upsertOrder({
      txRef: body.tx_ref,
      flutterwaveTransactionId: tx.id ?? null,
      flutterwaveTxRef: tx.flw_ref ?? null,
      serviceId: body.serviceId,
      serviceTitle: body.serviceTitle,
      amount: Number(tx.amount),
      currency: tx.currency,
      customerEmail: body.customerEmail,
      customerName: body.customerName,
      customerPhone: body.customerPhone || tx.customer?.phone_number || null,
      paymentStatus: "paid",
      paymentMethod: tx.payment_type || null,
      status: "confirmed",
      verificationSource: "client_verify",
      rawResponse: tx,
      paidAt: tx.created_at || new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      order: savedOrder,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected verification error",
      },
      { status: 500 }
    );
  }
}