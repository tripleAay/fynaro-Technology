import { cookies } from "next/headers";

// ======================================================
// TYPES
// ======================================================

export type ClientOrderItem = {
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

export type ClientOrderPaymentStage = {
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

export type ClientOrder = {
  id: string;

  reference: string;

  client_id: string;

  order_type:
    | "service"
    | "product"
    | "mixed";

  source_type:
    | "proposal"
    | "checkout"
    | "manual";

  source_id: string | null;

  request_id: string | null;

  proposal_id: string | null;

  proposal_reference:
    | string
    | null;

  proposal_version:
    | number
    | null;

  title: string;

  service: string | null;

  scope_snapshot:
    | string
    | null;

  summary_snapshot:
    | string
    | null;

  currency: string;

  subtotal: number;

  discounts: number;

  delivery: number;

  tax: number;

  total: number;

  status: string;

  payment_status: string;

  fulfillment_status: string;

  accepted_at:
    | string
    | null;

  placed_at:
    | string
    | null;

  created_at: string;

  updated_at: string;

  client?: {
    id: string;

    email: string;

    full_name:
      | string
      | null;

    company_name:
      | string
      | null;

    phone:
      | string
      | null;

    avatar_url:
      | string
      | null;
  } | null;

  items?: ClientOrderItem[];

  paymentStages?:
    ClientOrderPaymentStage[];
};

// ======================================================
// RESPONSE TYPES
// ======================================================

type OrdersResponse = {
  orders?: ClientOrder[];
};

type OrderResponse = {
  order?: ClientOrder;
};

// ======================================================
// CLIENT SERVER FETCH
// ======================================================

async function clientFetch<T>(
  path: string
): Promise<T | null> {
  const cookieStore =
    await cookies();

  const token =
    cookieStore.get(
      "fynaro_token"
    )?.value;

  if (!token) {
    console.error(
      "[CLIENT ORDERS] No fynaro_token cookie found."
    );

    return null;
  }

  const apiUrl =
    process.env.FYNARO_API_URL;

  if (!apiUrl) {
    throw new Error(
      "FYNARO_API_URL is not configured."
    );
  }

  // Remove trailing slash(es)
  const backendUrl =
    apiUrl.replace(
      /\/+$/,
      ""
    );

  const url =
    `${backendUrl}${path}`;

  console.log(
    `[CLIENT ORDERS] GET ${url}`
  );

  let response: Response;

  try {
    response =
      await fetch(
        url,
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
  } catch (error) {
    console.error(
      "[CLIENT ORDERS] Backend request failed:",
      error
    );

    throw new Error(
      `Unable to connect to Fynaro backend at ${backendUrl}.`
    );
  }

  const raw =
    await response.text();

  let data:
    | T
    | null = null;

  if (raw) {
    try {
      data =
        JSON.parse(raw) as T;
    } catch {
      console.error(
        "[CLIENT ORDERS] Backend returned non-JSON:",
        raw
      );
    }
  }

  if (!response.ok) {
    console.error(
      `[CLIENT ORDERS] ${response.status} ${response.statusText}`,
      {
        path,
        url,
        response: data ?? raw,
      }
    );

    return null;
  }

  return data;
}

// ======================================================
// GET ORDERS
// ======================================================

export async function getClientOrders(): Promise<
  ClientOrder[]
> {
  const data =
    await clientFetch<OrdersResponse>(
      "/api/client/orders"
    );

  if (!data) {
    return [];
  }

  return Array.isArray(
    data.orders
  )
    ? data.orders
    : [];
}

// ======================================================
// GET SINGLE ORDER
// ======================================================

export async function getClientOrder(
  orderId: string
): Promise<ClientOrder | null> {
  const cleanOrderId =
    orderId?.trim();

  if (!cleanOrderId) {
    return null;
  }

  const data =
    await clientFetch<OrderResponse>(
      `/api/client/orders/${encodeURIComponent(
        cleanOrderId
      )}`
    );

  if (!data?.order) {
    return null;
  }

  return data.order;
}