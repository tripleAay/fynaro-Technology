import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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

    // Prevent duplicate orders
    const { data: existingOrder, error: existingOrderError } = await supabase
      .from("orders")
      .select("id, transaction_id, tx_ref")
      .or(`transaction_id.eq.${data.id},tx_ref.eq.${data.tx_ref}`)
      .maybeSingle();

    if (existingOrderError) {
      return NextResponse.json(
        { error: "Failed to check existing order" },
        { status: 500 }
      );
    }

    if (existingOrder) {
      return NextResponse.json({
        success: true,
        message: "Payment already verified and order already exists",
        order: existingOrder,
        payment: {
          id: data.id,
          tx_ref: data.tx_ref,
          flw_ref: data.flw_ref,
          amount: data.amount,
          currency: data.currency,
          status: data.status,
        },
      });
    }

    const orderPayload = {
      type: "service",
      item_id: serviceId || null,
      item_title: serviceTitle || null,
      customer_email: customerEmail || data.customer?.email || null,
      customer_name: customerName || data.customer?.name || null,
      customer_phone: customerPhone || data.customer?.phone_number || null,
      amount: Number(data.amount),
      currency: String(data.currency).toUpperCase(),
      payment_status: "paid",
      order_status: "pending",
      tx_ref: data.tx_ref,
      transaction_id: String(data.id),
      payment_provider: "flutterwave",
      metadata: {
        flw_ref: data.flw_ref || null,
        charged_amount: data.charged_amount || null,
        app_fee: data.app_fee || null,
        processor_response: data.processor_response || null,
      },
    };

    const { data: newOrder, error: insertError } = await supabase
      .from("orders")
      .insert(orderPayload)
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: insertError.message || "Failed to create order" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified and order created successfully",
      order: newOrder,
      payment: {
        id: data.id,
        tx_ref: data.tx_ref,
        flw_ref: data.flw_ref,
        amount: data.amount,
        currency: data.currency,
        status: data.status,
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