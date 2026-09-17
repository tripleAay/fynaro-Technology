"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  CreditCard,
  FileText,
  Loader2,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";

// ============================================================
// TYPES
// ============================================================

type PaymentMethod =
  | "card"
  | "transfer";

type PaymentStatus =
  | "idle"
  | "processing"
  | "error";

type OrderPaymentStatus =
  | "unpaid"
  | "partially_paid"
  | "paid"
  | "refunded"
  | "partially_refunded"
  | string;

type StagePaymentStatus =
  | "unpaid"
  | "pending"
  | "processing"
  | "paid"
  | string;

type ClientProfile = {
  id: string;
  external_auth_id?: string;
  email?: string;
  full_name?: string | null;
};

type PaymentOrder = {
  id: string;
  reference: string;
  client_id: string;

  order_type?: string | null;
  source_type?: string | null;
  source_id?: string | null;

  proposal_id?: string | null;
  proposal_reference?: string | null;
  proposal_version?: number | null;

  title: string;
  service?: string | null;
  scope_snapshot?: string | null;
  summary_snapshot?: string | null;

  currency: string;

  subtotal?: number | string | null;
  total: number | string;

  status: string;
  payment_status: OrderPaymentStatus;
  fulfillment_status?: string | null;

  created_at?: string;
};

type PaymentStage = {
  id: string;
  order_id: string;

  proposal_payment_stage_id?: string | null;

  position: number;
  stage: string;

  percentage:
    | number
    | string;

  amount:
    | number
    | string;

  trigger_label?: string | null;

  payment_status: StagePaymentStatus;

  paid_at?: string | null;
};

type PaymentTotals = {
  orderTotal: number;
  paid: number;
  dueNow: number;
  outstanding: number;
  remainingAfterPayment: number;
};

type PaymentContextResponse = {
  message?: string;

  client: ClientProfile;

  order: PaymentOrder;

  stage: PaymentStage;

  paymentSchedule: PaymentStage[];

  totals: PaymentTotals;
};

type InitializePaymentResponse = {
  message?: string;
  created?: boolean;

  payment?: {
    id: string;
    reference: string;
    amount: number | string;
    currency: string;
    stage: string;
    provider?: string | null;
    provider_reference?: string | null;
    status: string;
  };

  order?: {
    id: string;
    reference: string;
    title: string;
    total: number | string;
    currency: string;
  };

  stage?: {
    id: string;
    stage: string;
    position: number;
    percentage:
      | number
      | string;
    amount:
      | number
      | string;
    trigger_label?: string | null;
  };
};

// ============================================================
// HELPERS
// ============================================================

function numberValue(
  value:
    | number
    | string
    | null
    | undefined
) {
  const parsed =
    Number(value ?? 0);

  return Number.isFinite(parsed)
    ? parsed
    : 0;
}

function normalizeCurrency(
  currency?: string | null
) {
  return (
    currency?.trim() ||
    "NGN"
  );
}

function formatMoney(
  amount:
    | number
    | string,
  currency = "NGN"
) {
  const value =
    numberValue(amount);

  try {
    return new Intl.NumberFormat(
      "en-NG",
      {
        style: "currency",
        currency:
          normalizeCurrency(
            currency
          ),
        maximumFractionDigits: 0,
      }
    ).format(value);
  } catch {
    return `₦${value.toLocaleString(
      "en-NG"
    )}`;
  }
}

function formatLabel(
  value?: string | null
) {
  if (!value) {
    return "—";
  }

  return value
    .replace(/[_-]+/g, " ")
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
}

function getStageDisplayStatus(
  stage: PaymentStage,
  selectedStageId: string
) {
  if (
    stage.payment_status ===
    "paid"
  ) {
    return "Paid";
  }

  if (
    stage.id ===
    selectedStageId
  ) {
    return "Due now";
  }

  if (
    stage.payment_status ===
      "processing" ||
    stage.payment_status ===
      "pending"
  ) {
    return "Processing";
  }

  return "Upcoming";
}

// ============================================================
// PAGE
// ============================================================

export default function BillingPage() {
  const searchParams =
    useSearchParams();

  const orderId =
    searchParams.get("order");

  const stageId =
    searchParams.get("stage");

  const [
    paymentMethod,
    setPaymentMethod,
  ] =
    useState<PaymentMethod>(
      "card"
    );

  const [
    paymentStatus,
    setPaymentStatus,
  ] =
    useState<PaymentStatus>(
      "idle"
    );

  const [
    paymentContext,
    setPaymentContext,
  ] =
    useState<PaymentContextResponse | null>(
      null
    );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null
    );

  const [
    paymentMessage,
    setPaymentMessage,
  ] =
    useState<string | null>(
      null
    );

  // ==========================================================
  // LOAD PAYMENT CONTEXT
  // ==========================================================

  const loadPaymentContext =
    useCallback(async () => {
      if (
        !orderId ||
        !stageId
      ) {
        setLoading(false);

        setError(
          "This payment link is incomplete. Open the payment from your order page."
        );

        return;
      }

      setLoading(true);
      setError(null);

      try {
        const params =
          new URLSearchParams({
            orderId,
            stageId,
          });

        const response =
          await fetch(
            `/api/client/payments/context?${params.toString()}`,
            {
              method: "GET",
              credentials:
                "include",
              cache:
                "no-store",
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to load payment details."
          );
        }

        setPaymentContext(
          data
        );
      } catch (err) {
        console.error(
          "[BILLING] Context error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load payment details."
        );
      } finally {
        setLoading(false);
      }
    }, [
      orderId,
      stageId,
    ]);

  useEffect(() => {
    loadPaymentContext();
  }, [loadPaymentContext]);

  // ==========================================================
  // DERIVED VALUES
  // ==========================================================

  const order =
    paymentContext?.order;

  const currentStage =
    paymentContext?.stage;

  const paymentSchedule =
    paymentContext
      ?.paymentSchedule ??
    [];

  const totals =
    paymentContext?.totals;

  const currency =
    normalizeCurrency(
      order?.currency
    );

  const dueNow =
    numberValue(
      totals?.dueNow ??
        currentStage?.amount
    );

  const orderTotal =
    numberValue(
      totals?.orderTotal ??
        order?.total
    );

  const paidAmount =
    numberValue(
      totals?.paid
    );

  const outstanding =
    numberValue(
      totals?.outstanding
    );

  const remainingAfterPayment =
    numberValue(
      totals
        ?.remainingAfterPayment
    );

  const percentage =
    numberValue(
      currentStage
        ?.percentage
    );

  const proposalHref =
    order?.proposal_id
      ? `/shop/proposals/${order.proposal_id}`
      : null;

  const orderHref =
    order?.id
      ? `/shop/orders/${order.id}`
      : "/shop/orders";

  const stageLabel =
    formatLabel(
      currentStage?.stage
    );

  const paymentHeading =
    currentStage?.stage ===
    "deposit"
      ? "Confirm the project start."
      : `Complete the ${stageLabel.toLowerCase()} payment.`;

  const paymentDescription =
    currentStage?.trigger_label
      ? `${currentStage.trigger_label}. Complete this payment to keep the order moving through the Fynaro workflow.`
      : "Complete this payment to keep the order moving through the Fynaro workflow.";

  // ==========================================================
  // INITIALIZE INTERNAL PAYMENT
  // ==========================================================

  const handlePayment =
    async () => {
      if (
        !orderId ||
        !stageId ||
        !currentStage
      ) {
        setError(
          "Payment information is incomplete."
        );

        return;
      }

      setPaymentStatus(
        "processing"
      );

      setPaymentMessage(null);
      setError(null);

      try {
        const provider =
          paymentMethod ===
          "card"
            ? "flutterwave"
            : "bank_transfer";

        const response =
          await fetch(
            "/api/client/payments/initialize",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              credentials:
                "include",

              body: JSON.stringify({
                orderId,
                stageId,
                provider,
              }),
            }
          );

        const data: InitializePaymentResponse =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to prepare payment."
          );
        }

        console.log(
          "[BILLING] Internal payment:",
          data
        );

        if (
          paymentMethod ===
          "card"
        ) {
          setPaymentMessage(
            `Payment ${data.payment?.reference ?? ""} is ready. Flutterwave checkout is the next integration step.`
          );
        } else {
          setPaymentMessage(
            `Payment ${data.payment?.reference ?? ""} is ready for bank-transfer processing.`
          );
        }

        setPaymentStatus(
          "idle"
        );
      } catch (err) {
        console.error(
          "[BILLING] Payment initialization error:",
          err
        );

        setPaymentStatus(
          "error"
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to prepare payment."
        );
      }
    };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[65vh] w-full max-w-[1500px] items-center justify-center px-4">
        <div className="text-center">
          <Loader2
            size={24}
            className="mx-auto animate-spin text-black/40"
          />

          <p className="mt-4 text-[11px] font-medium text-black/40">
            Loading payment
            details...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================================
  // ERROR / INVALID LINK
  // ==========================================================

  if (
    error &&
    !paymentContext
  ) {
    return (
      <div className="mx-auto flex min-h-[65vh] w-full max-w-[1500px] items-center justify-center px-4">
        <div className="w-full max-w-[520px] rounded-[24px] border border-black/[0.09] bg-white p-7 sm:p-9">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f2f2ee]">
            <TriangleAlert
              size={17}
            />
          </span>

          <h1 className="mt-6 text-[26px] font-semibold tracking-[-0.04em]">
            Payment unavailable
          </h1>

          <p className="mt-3 text-[11px] leading-6 text-black/45">
            {error}
          </p>

          <Link
            href="/shop/orders"
            className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-[#111] px-5 text-[10px] font-semibold text-white"
          >
            <ArrowLeft
              size={12}
            />
            Back to orders
          </Link>
        </div>
      </div>
    );
  }

  if (
    !paymentContext ||
    !order ||
    !currentStage
  ) {
    return null;
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
        <Link
          href="/shop"
          className="transition hover:text-black"
        >
          Dashboard
        </Link>

        <span>/</span>

        <Link
          href="/shop/orders"
          className="transition hover:text-black"
        >
          Orders
        </Link>

        <span>/</span>

        <Link
          href={orderHref}
          className="transition hover:text-black"
        >
          {order.reference}
        </Link>

        <span>/</span>

        <span>
          Payment
        </span>
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="mt-8 border-b border-black/[0.09] pb-9">
        <Link
          href={orderHref}
          className="mb-7 inline-flex items-center gap-2 text-[11px] font-semibold text-black/40 transition hover:text-black"
        >
          <ArrowLeft
            size={13}
          />
          Back to order
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-black/35">
              {stageLabel} Payment
            </p>

            <h1 className="mt-3 max-w-[800px] text-[40px] font-semibold leading-[0.96] tracking-[-0.05em] sm:text-[52px]">
              {paymentHeading}
            </h1>

            <p className="mt-5 max-w-[650px] text-[12px] leading-6 text-black/45">
              {paymentDescription}
            </p>
          </div>

          <div className="rounded-full bg-[#e7eee8] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#45604b]">
            {formatLabel(
              order.status
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="grid gap-8 py-8 xl:grid-cols-[1fr_370px]">
        <main className="space-y-8">
          {/* =================================================
              ORDER / PROJECT
          ================================================= */}

          <section className="overflow-hidden rounded-[20px] border border-black/[0.09] bg-white">
            <div className="p-6 sm:p-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                Order
              </p>

              <div className="mt-5 flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-black/[0.05]">
                  <Building2
                    size={17}
                  />
                </span>

                <div className="min-w-0">
                  <h2 className="text-[22px] font-semibold tracking-[-0.035em]">
                    {order.title}
                  </h2>

                  <p className="mt-1.5 text-[11px] text-black/40">
                    {order.scope_snapshot ||
                      formatLabel(
                        order.service
                      )}
                  </p>

                  <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.13em] text-black/25">
                    {order.reference}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid border-t border-black/[0.08] sm:grid-cols-3">
              <InfoCell
                label="Order"
                value={
                  order.reference
                }
              />

              <InfoCell
                label="Service"
                value={formatLabel(
                  order.service
                )}
              />

              <InfoCell
                label="Investment"
                value={formatMoney(
                  orderTotal,
                  currency
                )}
              />
            </div>
          </section>

          {/* =================================================
              AMOUNT DUE
          ================================================= */}

          <section className="rounded-[22px] bg-[#111] p-7 text-white sm:p-9">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">
                  Due Now
                </p>

                <p className="mt-4 text-[38px] font-semibold tracking-[-0.05em] sm:text-[48px]">
                  {formatMoney(
                    dueNow,
                    currency
                  )}
                </p>

                <p className="mt-3 text-[11px] text-white/40">
                  {percentage}%{" "}
                  {stageLabel.toLowerCase()}{" "}
                  payment
                </p>

                {currentStage.trigger_label && (
                  <p className="mt-2 text-[10px] text-white/30">
                    {
                      currentStage.trigger_label
                    }
                  </p>
                )}
              </div>

              <div className="md:text-right">
                <p className="text-[9px] uppercase tracking-[0.14em] text-white/30">
                  Remaining after
                  payment
                </p>

                <p className="mt-2 text-[16px] font-semibold">
                  {formatMoney(
                    remainingAfterPayment,
                    currency
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* =================================================
              PAYMENT METHOD
          ================================================= */}

          <section className="rounded-[20px] border border-black/[0.09] bg-white p-6 sm:p-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
              Payment Method
            </p>

            <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.035em]">
              How would you like
              to pay?
            </h2>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <PaymentMethodCard
                active={
                  paymentMethod ===
                  "card"
                }
                icon={
                  CreditCard
                }
                title="Card / Online Payment"
                description="Pay securely through Fynaro's online payment provider."
                onClick={() =>
                  setPaymentMethod(
                    "card"
                  )
                }
              />

              <PaymentMethodCard
                active={
                  paymentMethod ===
                  "transfer"
                }
                icon={
                  Building2
                }
                title="Bank Transfer"
                description="Create a payment reference for direct bank-transfer processing."
                onClick={() =>
                  setPaymentMethod(
                    "transfer"
                  )
                }
              />
            </div>

            {paymentMethod ===
              "transfer" && (
              <div className="mt-6 rounded-[16px] bg-[#f2f2ee] p-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/30">
                  Bank Transfer
                </p>

                <p className="mt-3 text-[11px] leading-5 text-black/45">
                  Fynaro bank
                  details will be
                  provided from the
                  verified payment
                  configuration.
                  Payment details
                  are not hardcoded
                  into this page.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold text-black/45">
                  <FileText
                    size={12}
                  />
                  Payment reference
                  generated when
                  you continue
                </div>
              </div>
            )}

            {paymentMessage && (
              <div className="mt-6 flex items-start gap-3 rounded-[16px] bg-[#e7eee8] p-5 text-[#45604b]">
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0"
                />

                <p className="text-[10px] leading-5 font-medium">
                  {
                    paymentMessage
                  }
                </p>
              </div>
            )}

            {error &&
              paymentContext && (
                <div className="mt-6 flex items-start gap-3 rounded-[16px] bg-red-50 p-5 text-red-700">
                  <TriangleAlert
                    size={16}
                    className="mt-0.5 shrink-0"
                  />

                  <p className="text-[10px] leading-5 font-medium">
                    {error}
                  </p>
                </div>
              )}
          </section>

          {/* =================================================
              PAYMENT SCHEDULE
          ================================================= */}

          <section className="overflow-hidden rounded-[20px] border border-black/[0.09] bg-white">
            <div className="p-6 sm:p-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                Payment Schedule
              </p>

              <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.035em]">
                Project payment
                structure
              </h2>
            </div>

            <div className="border-t border-black/[0.08]">
              {paymentSchedule.map(
                (payment) => {
                  const status =
                    getStageDisplayStatus(
                      payment,
                      currentStage.id
                    );

                  return (
                    <div
                      key={
                        payment.id
                      }
                      className="grid gap-5 border-b border-black/[0.07] p-6 last:border-b-0 sm:grid-cols-[70px_1fr_auto] sm:items-center sm:p-7"
                    >
                      <p className="text-[23px] font-semibold tracking-[-0.04em]">
                        {numberValue(
                          payment.percentage
                        )}
                        %
                      </p>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[12px] font-semibold">
                            {formatLabel(
                              payment.stage
                            )}
                          </p>

                          {status ===
                            "Paid" && (
                            <CheckCircle2
                              size={
                                13
                              }
                              className="text-[#45604b]"
                            />
                          )}
                        </div>

                        <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-black/30">
                          {
                            status
                          }
                        </p>

                        {payment.trigger_label && (
                          <p className="mt-2 text-[10px] text-black/35">
                            {
                              payment.trigger_label
                            }
                          </p>
                        )}
                      </div>

                      <p className="text-[14px] font-semibold sm:text-right">
                        {formatMoney(
                          payment.amount,
                          currency
                        )}
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          </section>

          {/* =================================================
              SECURITY
          ================================================= */}

          <section className="flex items-start gap-4 rounded-[18px] bg-[#e9e9e3] p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70">
              <ShieldCheck
                size={16}
              />
            </span>

            <div>
              <p className="text-[12px] font-semibold">
                Payment records
                stay attached to
                your order.
              </p>

              <p className="mt-2 max-w-[650px] text-[10px] leading-5 text-black/42">
                Fynaro creates an
                internal payment
                record against the
                exact order and
                payment stage.
                Amounts are loaded
                from the server,
                not accepted from
                the browser.
              </p>
            </div>
          </section>
        </main>

        {/* ===================================================
            SIDEBAR
        =================================================== */}

        <aside>
          <div className="space-y-4 xl:sticky xl:top-[100px]">
            <div className="rounded-[20px] border border-black/[0.09] bg-white p-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                Payment Summary
              </p>

              <div className="mt-6 space-y-5">
                <SummaryRow
                  label="Order value"
                  value={formatMoney(
                    orderTotal,
                    currency
                  )}
                />

                <SummaryRow
                  label="Already paid"
                  value={formatMoney(
                    paidAmount,
                    currency
                  )}
                />

                <SummaryRow
                  label="Due now"
                  value={formatMoney(
                    dueNow,
                    currency
                  )}
                />

                <SummaryRow
                  label="Outstanding"
                  value={formatMoney(
                    outstanding,
                    currency
                  )}
                />

                <SummaryRow
                  label="After this payment"
                  value={formatMoney(
                    remainingAfterPayment,
                    currency
                  )}
                />
              </div>

              <div className="mt-6 border-t border-black/[0.08] pt-6">
                <button
                  type="button"
                  disabled={
                    paymentStatus ===
                      "processing" ||
                    currentStage.payment_status ===
                      "paid"
                  }
                  onClick={
                    handlePayment
                  }
                  className="flex h-12 w-full items-center justify-between rounded-full bg-[#111] px-5 text-[11px] font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    {paymentStatus ===
                      "processing" && (
                      <Loader2
                        size={13}
                        className="animate-spin"
                      />
                    )}

                    {paymentStatus ===
                    "processing"
                      ? "Preparing payment..."
                      : currentStage.payment_status ===
                          "paid"
                        ? "Payment completed"
                        : `Pay ${formatMoney(
                            dueNow,
                            currency
                          )}`}
                  </span>

                  {currentStage.payment_status ===
                  "paid" ? (
                    <Check
                      size={13}
                    />
                  ) : (
                    <ArrowRight
                      size={13}
                    />
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-[9px] text-black/30">
                  <LockKeyhole
                    size={11}
                  />
                  Secure payment
                </div>
              </div>
            </div>

            {/* ===============================================
                ORDER DETAILS
            =============================================== */}

            <div className="rounded-[20px] border border-black/[0.09] bg-[#f2f2ee] p-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                Source
              </p>

              <p className="mt-4 text-[12px] font-semibold">
                {order.reference}
              </p>

              {order.proposal_reference && (
                <p className="mt-1 text-[10px] text-black/40">
                  Proposal{" "}
                  {
                    order.proposal_reference
                  }
                </p>
              )}

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href={
                    orderHref
                  }
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-[9px] font-semibold"
                >
                  View order
                  <ArrowRight
                    size={10}
                  />
                </Link>

                {proposalHref && (
                  <Link
                    href={
                      proposalHref
                    }
                    className="inline-flex h-9 items-center gap-2 rounded-full border border-black/[0.08] px-4 text-[9px] font-semibold"
                  >
                    Proposal
                    <FileText
                      size={10}
                    />
                  </Link>
                )}
              </div>
            </div>

            {/* ===============================================
                RECEIPT
            =============================================== */}

            <div className="rounded-[20px] bg-[#111] p-6 text-white">
              <ReceiptText
                size={17}
                className="text-white/50"
              />

              <p className="mt-5 text-[12px] font-semibold">
                Receipt generated
                after confirmation.
              </p>

              <p className="mt-2 text-[10px] leading-5 text-white/40">
                Once Fynaro
                verifies the
                transaction, the
                payment record,
                order status and
                receipt can be
                updated
                automatically.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ============================================================
// PAYMENT METHOD CARD
// ============================================================

function PaymentMethodCard({
  active,
  icon: Icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "min-h-[170px] rounded-[18px] border p-5 text-left transition",

        active
          ? "border-black bg-[#111] text-white"
          : "border-black/[0.09] bg-[#fafaf8] hover:border-black/25",
      ].join(" ")}
    >
      <div className="flex items-start justify-between">
        <span
          className={[
            "flex h-10 w-10 items-center justify-center rounded-full border",

            active
              ? "border-white/15"
              : "border-black/[0.08]",
          ].join(" ")}
        >
          <Icon
            size={15}
          />
        </span>

        <span
          className={[
            "flex h-6 w-6 items-center justify-center rounded-full border",

            active
              ? "border-white bg-white text-black"
              : "border-black/[0.1]",
          ].join(" ")}
        >
          {active && (
            <Check
              size={11}
            />
          )}
        </span>
      </div>

      <p className="mt-7 text-[13px] font-semibold">
        {title}
      </p>

      <p
        className={[
          "mt-2 text-[10px] leading-5",

          active
            ? "text-white/40"
            : "text-black/40",
        ].join(" ")}
      >
        {description}
      </p>
    </button>
  );
}

// ============================================================
// INFO CELL
// ============================================================

function InfoCell({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-black/[0.07] p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:p-6 sm:last:border-r-0">
      <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-black/30">
        {label}
      </p>

      <p className="mt-2 text-[11px] font-medium">
        {value}
      </p>
    </div>
  );
}

// ============================================================
// SUMMARY ROW
// ============================================================

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-5">
      <p className="text-[10px] text-black/40">
        {label}
      </p>

      <p className="text-[11px] font-semibold">
        {value}
      </p>
    </div>
  );
}