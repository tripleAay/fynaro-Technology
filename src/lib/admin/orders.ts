import { cookies } from "next/headers";

// ======================================================
// ORDER TYPES
// ======================================================

export type OrderType =
  | "service"
  | "product"
  | "mixed";

export type OrderSourceType =
  | "proposal"
  | "checkout"
  | "manual";

export type OrderStatus =
  | "pending"
  | "awaiting_payment"
  | "confirmed"
  | "processing"
  | "completed"
  | "cancelled";

export type OrderPaymentStatus =
  | "unpaid"
  | "partially_paid"
  | "paid"
  | "refunded"
  | "partially_refunded";

export type OrderFulfillmentStatus =
  | "unfulfilled"
  | "preparing"
  | "in_progress"
  | "ready"
  | "shipped"
  | "delivered"
  | "completed"
  | "cancelled";

// ======================================================
// CLIENT
// ======================================================

export type OrderClient = {
  id: string;

  external_auth_id?: string | null;

  email: string;

  full_name: string | null;

  company_name: string | null;

  phone: string | null;

  avatar_url: string | null;
};

// ======================================================
// ORDER ITEM
// ======================================================

export type AdminOrderItem = {
  id: string;

  order_id: string;

  item_type:
    | "service"
    | "product";

  product_id?: string | null;

  variant_id?: string | null;

  name: string;

  quantity: number;

  unit_price: number;

  subtotal: number;

  metadata:
    | Record<string, unknown>
    | null;

  created_at: string;
};

// ======================================================
// ORDER PAYMENT STAGE
// ======================================================

export type AdminOrderPaymentStage = {
  id: string;

  order_id: string;

  proposal_payment_stage_id:
    | string
    | null;

  position: number;

  stage: string;

  percentage: number;

  amount: number;

  trigger_label: string;

  payment_status: string;

  paid_at: string | null;

  created_at: string;
};

// ======================================================
// ADMIN ORDER
// ======================================================

export type AdminOrder = {
  id: string;

  reference: string;

  client_id: string;

  order_type: OrderType;

  source_type: OrderSourceType;

  source_id: string | null;

  request_id: string | null;

  proposal_id: string | null;

  proposal_reference: string | null;

  proposal_version: number | null;

  title: string;

  service: string | null;

  scope_snapshot: string | null;

  summary_snapshot: string | null;

  currency: string;

  subtotal: number;

  discounts: number;

  delivery: number;

  tax: number;

  total: number;

  status: OrderStatus;

  payment_status: OrderPaymentStatus;

  fulfillment_status:
    OrderFulfillmentStatus;

  accepted_at: string | null;

  placed_at: string | null;

  created_at: string;

  updated_at: string;

  // ----------------------------------------------------
  // RELATIONSHIPS
  // ----------------------------------------------------

  client: OrderClient | null;

  items?: AdminOrderItem[];

  paymentStages?:
    AdminOrderPaymentStage[];
};

// ======================================================
// SERVER ADMIN FETCH
// ======================================================

async function adminFetch(
  path: string
) {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      "fynaro_token"
    )?.value;

  if (!token) {
    return null;
  }

  const apiUrl =
    process.env.FYNARO_API_URL;

  if (!apiUrl) {
    throw new Error(
      "FYNARO_API_URL is not configured."
    );
  }

  const backendUrl =
    apiUrl.replace(
      /\/$/,
      ""
    );

  const response =
    await fetch(
      `${backendUrl}${path}`,
      {
        method: "GET",

        headers: {
          Accept:
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        cache: "no-store",
      }
    );

  if (!response.ok) {
    console.error(
      `[ADMIN ORDERS] ${response.status} ${response.statusText} — ${path}`
    );

    return null;
  }

  return response.json();
}

// ======================================================
// GET ALL ORDERS
// ======================================================

export async function getAdminOrders(): Promise<
  AdminOrder[]
> {
  const data =
    await adminFetch(
      "/api/admin/orders"
    );

  return (
    (data?.orders ??
      []) as AdminOrder[]
  );
}

// ======================================================
// GET ONE ORDER
// ======================================================

export async function getAdminOrder(
  orderId: string
): Promise<AdminOrder | null> {
  if (!orderId) {
    return null;
  }

  const data =
    await adminFetch(
      `/api/admin/orders/${encodeURIComponent(
        orderId
      )}`
    );

  return (
    (data?.order as
      | AdminOrder
      | undefined) ??
    null
  );
}