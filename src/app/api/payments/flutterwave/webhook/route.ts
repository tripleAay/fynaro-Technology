import { NextResponse } from "next/server";
import { upsertOrder } from "@/lib/payments/upsertOrder";

type FlutterwaveWebhookPayload = {
  event?: string;
  data?: {
    id?: number;
    tx_ref?: string;
    flw_ref?: string;
    amount?: number;
    currency?: string;
    status?: string;
    payment_type?: string;
    created_at?: string;
    customer?: {
      email?: string;
      name?: string;
      phone_number?: string;
    };
    meta?: {
      serviceId?: string;
      serviceTitle?: string;
    };
  };
};

export async function POST(req: Request) {
  try {
    const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET_HASH;

    if (!secretHash) {
      return NextResponse.json(
        { error: "Missing FLUTTERWAVE_WEBHOOK_SECRET_HASH." },
        { status: 500 }
      );
    }

    const signature = req.headers.get("verif-hash");

    if (!signature || signature !== secretHash) {
      return NextResponse.json(
        { error: "Invalid webhook signature." },
        { status: 401 }
      );
    }

    const payload = (await req.json()) as FlutterwaveWebhookPayload;
    const tx = payload?.data;

    if (!tx?.tx_ref) {
      return NextResponse.json(
        { error: "Missing tx_ref in webhook payload." },
        { status: 400 }
      );
    }

    const serviceId = tx.meta?.serviceId || "unknown-service";
    const serviceTitle = tx.meta?.serviceTitle || "Untitled service";
    const isPaid = tx.status === "successful";

    const savedOrder = await upsertOrder({
      txRef: tx.tx_ref,
      flutterwaveTransactionId: tx.id ?? null,
      flutterwaveTxRef: tx.flw_ref ?? null,
      serviceId,
      serviceTitle,
      amount: Number(tx.amount || 0),
      currency: tx.currency || "NGN",
      customerEmail: tx.customer?.email || "unknown@email.com",
      customerName: tx.customer?.name || "Unknown Customer",
      customerPhone: tx.customer?.phone_number || null,
      paymentStatus: isPaid ? "paid" : "failed",
      paymentMethod: tx.payment_type || null,
      status: isPaid ? "confirmed" : "failed",
      verificationSource: "webhook",
      rawResponse: payload,
      paidAt: isPaid ? tx.created_at || new Date().toISOString() : null,
    });

    return NextResponse.json({
      success: true,
      order: savedOrder,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Webhook processing failed.",
      },
      { status: 500 }
    );
  }
}