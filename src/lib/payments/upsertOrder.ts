import { supabaseAdmin } from "@/lib/supabase/server";

type UpsertOrderInput = {
  txRef: string;
  flutterwaveTransactionId?: number | null;
  flutterwaveTxRef?: string | null;
  serviceId: string;
  serviceTitle: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string | null;
  paymentStatus: "pending" | "paid" | "failed";
  paymentMethod?: string | null;
  status: "pending" | "confirmed" | "failed";
  verificationSource: "client_verify" | "webhook";
  rawResponse?: unknown;
  paidAt?: string | null;
};

export async function upsertOrder(input: UpsertOrderInput) {
  const nowIso = new Date().toISOString();

  const payload = {
    tx_ref: input.txRef,
    flutterwave_transaction_id: input.flutterwaveTransactionId ?? null,
    flutterwave_tx_ref: input.flutterwaveTxRef ?? null,
    service_id: input.serviceId,
    service_title: input.serviceTitle,
    amount: input.amount,
    currency: input.currency,
    customer_email: input.customerEmail,
    customer_name: input.customerName,
    customer_phone: input.customerPhone ?? null,
    payment_status: input.paymentStatus,
    payment_provider: "flutterwave",
    payment_method: input.paymentMethod ?? null,
    status: input.status,
    verification_source: input.verificationSource,
    raw_response: input.rawResponse ?? null,
    paid_at: input.paidAt ?? null,
    updated_at: nowIso,
  };

  const existing = await supabaseAdmin
    .from("orders")
    .select("id, tx_ref")
    .eq("tx_ref", input.txRef)
    .maybeSingle();

  if (existing.error) {
    throw new Error(existing.error.message);
  }

  if (existing.data) {
    const updated = await supabaseAdmin
      .from("orders")
      .update(payload)
      .eq("tx_ref", input.txRef)
      .select()
      .single();

    if (updated.error) {
      throw new Error(updated.error.message);
    }

    return updated.data;
  }

  const inserted = await supabaseAdmin
    .from("orders")
    .insert({
      ...payload,
      created_at: nowIso,
    })
    .select()
    .single();

  if (inserted.error) {
    throw new Error(inserted.error.message);
  }

  return inserted.data;
}