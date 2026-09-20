"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  Loader2,
  ReceiptText,
  RefreshCw,
  Search,
  WalletCards,
} from "lucide-react";

// ======================================================
// TYPES
// ======================================================

type ClientProfile = {
  id?: string;
  email?: string | null;
  full_name?: string | null;
  company_name?: string | null;
};

type Payment = {
  id: string;

  reference?: string | null;
  provider_reference?: string | null;

  order_id?: string | null;
  order_reference?: string | null;

  client_id?: string | null;

  amount: number;
  currency?: string | null;

  status?: string | null;
  payment_status?: string | null;

  payment_method?: string | null;
  provider?: string | null;

  paid_at?: string | null;
  created_at: string;
  updated_at?: string | null;

  client?:
    | ClientProfile
    | ClientProfile[]
    | null;

  order?: {
    id?: string;
    reference?: string | null;
    title?: string | null;
  } | null;
};

type PaymentsResponse = {
  success?: boolean;

  payments?: Payment[];

  data?:
    | Payment[]
    | {
        payments?: Payment[];
      };

  message?: string;
};

// ======================================================
// HELPERS
// ======================================================

function getClient(
  value:
    | ClientProfile
    | ClientProfile[]
    | null
    | undefined
) {
  if (!value) {
    return null;
  }

  if (Array.isArray(value)) {
    return value[0] || null;
  }

  return value;
}

function normalizeStatus(
  payment: Payment
) {
  return (
    payment.payment_status ||
    payment.status ||
    "pending"
  )
    .trim()
    .toLowerCase();
}

function formatLabel(
  value?: string | null
) {
  if (!value) {
    return "Not set";
  }

  return value
    .replace(/[_-]+/g, " ")
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
}

function formatMoney(
  amount: number,
  currency = "NGN"
) {
  try {
    return new Intl.NumberFormat(
      "en-NG",
      {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
      }
    ).format(
      Number(amount || 0)
    );
  } catch {
    return `₦${Number(
      amount || 0
    ).toLocaleString("en-NG")}`;
  }
}

function formatDate(
  value?: string | null
) {
  if (!value) {
    return "Not available";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Not available";
  }

  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(date);
}

function statusClasses(
  status: string
) {
  if (
    status === "paid" ||
    status === "successful" ||
    status === "success" ||
    status === "verified"
  ) {
    return "border-emerald-700/15 bg-emerald-50 text-emerald-700";
  }

  if (
    status === "failed" ||
    status === "cancelled" ||
    status === "rejected"
  ) {
    return "border-red-700/15 bg-red-50 text-red-700";
  }

  if (
    status === "processing" ||
    status === "pending_verification"
  ) {
    return "border-blue-700/15 bg-blue-50 text-blue-700";
  }

  return "border-[#b5aa49]/25 bg-[#f5f1cf] text-[#665f1f]";
}

function isPaid(
  payment: Payment
) {
  return [
    "paid",
    "successful",
    "success",
    "verified",
  ].includes(
    normalizeStatus(payment)
  );
}

// ======================================================
// PAGE
// ======================================================

export default function AdminPaymentsPage() {
  const [
    payments,
    setPayments,
  ] =
    useState<Payment[]>([]);

  const [
    search,
    setSearch,
  ] =
    useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] =
    useState("all");

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  const [
    refreshing,
    setRefreshing,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null
    );

  // ====================================================
  // LOAD PAYMENTS
  // ====================================================

  const loadPayments =
    useCallback(
      async (
        manualRefresh = false
      ) => {
        if (manualRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError(null);

        try {
          const response =
            await fetch(
              "/api/admin/payments",
              {
                method: "GET",

                credentials:
                  "include",

                cache:
                  "no-store",

                headers: {
                  Accept:
                    "application/json",
                },
              }
            );

          const data =
            (await response
              .json()
              .catch(
                () => null
              )) as
              | PaymentsResponse
              | null;

          if (!response.ok) {
            throw new Error(
              data?.message ||
                `Unable to load payments (${response.status}).`
            );
          }

          const paymentData =
            data?.payments ||
            (
              Array.isArray(
                data?.data
              )
                ? data.data
                : data?.data
                    ?.payments
            ) ||
            [];

          setPayments(
            paymentData
          );
        } catch (loadError) {
          setError(
            loadError instanceof
              Error
              ? loadError.message
              : "Unable to load payments."
          );
        } finally {
          setLoading(false);
          setRefreshing(false);
        }
      },
      []
    );

  useEffect(() => {
    void loadPayments();
  }, [loadPayments]);

  // ====================================================
  // STATISTICS
  // ====================================================

  const totalAmount =
    useMemo(
      () =>
        payments.reduce(
          (
            total,
            payment
          ) =>
            total +
            Number(
              payment.amount ||
                0
            ),
          0
        ),
      [payments]
    );

  const paidPayments =
    useMemo(
      () =>
        payments.filter(
          isPaid
        ),
      [payments]
    );

  const paidAmount =
    useMemo(
      () =>
        paidPayments.reduce(
          (
            total,
            payment
          ) =>
            total +
            Number(
              payment.amount ||
                0
            ),
          0
        ),
      [paidPayments]
    );

  const pendingCount =
    useMemo(
      () =>
        payments.filter(
          (payment) =>
            !isPaid(payment) &&
            ![
              "failed",
              "cancelled",
              "rejected",
            ].includes(
              normalizeStatus(
                payment
              )
            )
        ).length,
      [payments]
    );

  // ====================================================
  // FILTERED PAYMENTS
  // ====================================================

  const filteredPayments =
    useMemo(() => {
      const query =
        search
          .trim()
          .toLowerCase();

      return payments.filter(
        (payment) => {
          const status =
            normalizeStatus(
              payment
            );

          const client =
            getClient(
              payment.client
            );

          const matchesStatus =
            statusFilter ===
              "all" ||
            (
              statusFilter ===
                "paid"
                ? isPaid(
                    payment
                  )
                : status ===
                  statusFilter
            );

          if (!matchesStatus) {
            return false;
          }

          if (!query) {
            return true;
          }

          const searchable =
            [
              payment.reference,
              payment
                .provider_reference,
              payment
                .order_reference,
              payment.order
                ?.reference,
              payment.order
                ?.title,
              client?.full_name,
              client?.company_name,
              client?.email,
              payment.provider,
              payment
                .payment_method,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

          return searchable.includes(
            query
          );
        }
      );
    }, [
      payments,
      search,
      statusFilter,
    ]);

  return (
    <main className="min-h-screen bg-[#f3f3ee] text-[#111]">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* HEADER */}

        <section className="overflow-hidden rounded-[28px] bg-[#0d0d0d] px-6 py-7 text-white sm:px-8 sm:py-9">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#d6cc6d]">
                <WalletCards
                  size={15}
                />

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Fynaro Finance
                </span>
              </div>

              <h1 className="mt-4 text-[38px] font-semibold tracking-[-0.05em] sm:text-[48px]">
                Payments
              </h1>

              <p className="mt-3 max-w-2xl text-[11px] leading-6 text-white/45">
                Monitor client
                payments, order
                references and
                transaction status
                across Fynaro.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                void loadPayments(
                  true
                )
              }
              disabled={
                refreshing
              }
              className="inline-flex h-11 w-fit items-center gap-2 rounded-full border border-[#d6cc6d]/35 bg-[#d6cc6d] px-5 text-[10px] font-semibold text-black transition hover:bg-[#e4db7d] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {refreshing ? (
                <Loader2
                  size={13}
                  className="animate-spin"
                />
              ) : (
                <RefreshCw
                  size={13}
                />
              )}

              {refreshing
                ? "Refreshing"
                : "Refresh payments"}
            </button>
          </div>
        </section>

        {/* STATISTICS */}

        <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={ReceiptText}
            label="Transactions"
            value={String(
              payments.length
            )}
          />

          <StatCard
            icon={
              CheckCircle2
            }
            label="Paid"
            value={String(
              paidPayments.length
            )}
          />

          <StatCard
            icon={Clock3}
            label="Pending"
            value={String(
              pendingCount
            )}
          />

          <StatCard
            icon={CreditCard}
            label="Received"
            value={formatMoney(
              paidAmount
            )}
            small
          />
        </section>

        {/* FILTERS */}

        <section className="mt-7 rounded-[20px] border border-black/[0.08] bg-white p-4 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
              />

              <input
                type="search"
                value={search}
                onChange={(
                  event
                ) =>
                  setSearch(
                    event.target
                      .value
                  )
                }
                placeholder="Search payment, order or client..."
                className="h-11 w-full rounded-xl border border-black/[0.09] bg-[#f7f7f3] pl-11 pr-4 text-[11px] text-black outline-none placeholder:text-black/25 focus:border-black/30"
              />
            </div>

            <select
              value={
                statusFilter
              }
              onChange={(
                event
              ) =>
                setStatusFilter(
                  event.target
                    .value
                )
              }
              className="h-11 rounded-xl border border-black/[0.09] bg-[#f7f7f3] px-4 text-[11px] text-black/70 outline-none focus:border-black/30"
            >
              <option value="all">
                All statuses
              </option>

              <option value="paid">
                Paid
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="processing">
                Processing
              </option>

              <option value="pending_verification">
                Pending verification
              </option>

              <option value="failed">
                Failed
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>

            {(search ||
              statusFilter !==
                "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter(
                    "all"
                  );
                }}
                className="h-11 rounded-xl border border-black/[0.09] px-5 text-[10px] font-semibold text-black/45 transition hover:border-black/20 hover:text-black"
              >
                Clear
              </button>
            )}
          </div>
        </section>

        {/* CONTENT */}

        <section className="mt-7">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState
              message={error}
              onRetry={() =>
                void loadPayments()
              }
            />
          ) : filteredPayments.length ===
            0 ? (
            <EmptyState
              filtered={
                Boolean(
                  search ||
                    statusFilter !==
                      "all"
                )
              }
              onClear={() => {
                setSearch("");
                setStatusFilter(
                  "all"
                );
              }}
            />
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/30">
                  {
                    filteredPayments.length
                  }{" "}
                  {filteredPayments.length ===
                  1
                    ? "payment"
                    : "payments"}
                </p>

                <p className="text-[10px] text-black/35">
                  Total value:{" "}
                  <span className="font-semibold text-black/65">
                    {formatMoney(
                      totalAmount
                    )}
                  </span>
                </p>
              </div>

              <div className="overflow-hidden rounded-[22px] border border-black/[0.08] bg-white">
                <div className="hidden grid-cols-[1.1fr_1fr_.8fr_.7fr_.7fr_auto] gap-4 border-b border-black/[0.07] bg-[#f7f7f3] px-5 py-3 lg:grid">
                  <TableHeading>
                    Payment
                  </TableHeading>

                  <TableHeading>
                    Client
                  </TableHeading>

                  <TableHeading>
                    Order
                  </TableHeading>

                  <TableHeading>
                    Amount
                  </TableHeading>

                  <TableHeading>
                    Status
                  </TableHeading>

                  <span />
                </div>

                {filteredPayments.map(
                  (
                    payment,
                    index
                  ) => (
                    <PaymentRow
                      key={
                        payment.id
                      }
                      payment={
                        payment
                      }
                      last={
                        index ===
                        filteredPayments.length -
                          1
                      }
                    />
                  )
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

// ======================================================
// PAYMENT ROW
// ======================================================

function PaymentRow({
  payment,
  last,
}: {
  payment: Payment;
  last: boolean;
}) {
  const client =
    getClient(
      payment.client
    );

  const status =
    normalizeStatus(
      payment
    );

  const reference =
    payment.reference ||
    payment
      .provider_reference ||
    "No reference";

  const orderReference =
    payment.order
      ?.reference ||
    payment
      .order_reference ||
    "No order";

  return (
    <div
      className={[
        "grid gap-5 px-5 py-5 transition hover:bg-black/[0.012] lg:grid-cols-[1.1fr_1fr_.8fr_.7fr_.7fr_auto] lg:items-center",
        last
          ? ""
          : "border-b border-black/[0.07]",
      ].join(" ")}
    >
      <div className="min-w-0">
        <p className="truncate text-[11px] font-semibold text-black/80">
          {reference}
        </p>

        <p className="mt-1 text-[9px] text-black/35">
          {formatDate(
            payment.paid_at ||
              payment.created_at
          )}
        </p>
      </div>

      <div className="min-w-0">
        <p className="truncate text-[11px] font-semibold text-black/70">
          {client
            ?.full_name ||
            client
              ?.company_name ||
            "Fynaro Client"}
        </p>

        <p className="mt-1 truncate text-[9px] text-black/35">
          {client?.email ||
            "No email available"}
        </p>
      </div>

      <div className="min-w-0">
        <p className="truncate text-[10px] font-medium text-black/60">
          {orderReference}
        </p>

        <p className="mt-1 truncate text-[9px] text-black/30">
          {payment.order
            ?.title ||
            formatLabel(
              payment.provider
            )}
        </p>
      </div>

      <p className="text-[12px] font-semibold text-black">
        {formatMoney(
          payment.amount,
          payment.currency ||
            "NGN"
        )}
      </p>

      <span
        className={`w-fit rounded-full border px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.11em] ${statusClasses(
          status
        )}`}
      >
        {formatLabel(status)}
      </span>

      {payment.order_id ? (
        <Link
          href={`/admin/orders/${payment.order_id}`}
          className="inline-flex h-9 w-fit items-center gap-2 rounded-full border border-black/[0.09] px-4 text-[9px] font-semibold text-black/50 transition hover:border-black hover:bg-black hover:text-white"
        >
          Open order

          <ArrowRight
            size={11}
          />
        </Link>
      ) : (
        <span className="text-[9px] text-black/25">
          No order
        </span>
      )}
    </div>
  );
}

// ======================================================
// STAT CARD
// ======================================================

function StatCard({
  icon: Icon,
  label,
  value,
  small = false,
}: {
  icon: typeof ReceiptText;
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="rounded-[20px] border border-black/[0.08] bg-white p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/30">
            {label}
          </p>

          <p
            className={[
              "mt-3 truncate font-semibold tracking-[-0.04em]",
              small
                ? "text-[18px]"
                : "text-[26px]",
            ].join(" ")}
          >
            {value}
          </p>
        </div>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/[0.07] bg-[#f5f5f0] text-black/35">
          <Icon size={14} />
        </span>
      </div>
    </div>
  );
}

// ======================================================
// TABLE HEADING
// ======================================================

function TableHeading({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-black/30">
      {children}
    </span>
  );
}

// ======================================================
// LOADING
// ======================================================

function LoadingState() {
  return (
    <div className="grid min-h-[380px] place-items-center rounded-[24px] border border-black/[0.08] bg-white">
      <div className="text-center">
        <Loader2
          size={22}
          className="mx-auto animate-spin text-[#8a812d]"
        />

        <p className="mt-4 text-[10px] font-medium text-black/40">
          Loading Fynaro
          payments...
        </p>
      </div>
    </div>
  );
}

// ======================================================
// ERROR
// ======================================================

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-[24px] border border-red-500/20 bg-red-50 p-6">
      <div className="flex items-start gap-3">
        <AlertCircle
          size={18}
          className="mt-0.5 shrink-0 text-red-600"
        />

        <div>
          <p className="text-[12px] font-semibold text-red-700">
            Payments could not
            be loaded.
          </p>

          <p className="mt-2 text-[10px] leading-5 text-red-700/60">
            {message}
          </p>

          <button
            type="button"
            onClick={onRetry}
            className="mt-4 inline-flex h-9 items-center gap-2 rounded-full bg-red-600 px-4 text-[9px] font-semibold text-white"
          >
            <RefreshCw
              size={11}
            />

            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// EMPTY
// ======================================================

function EmptyState({
  filtered,
  onClear,
}: {
  filtered: boolean;
  onClear: () => void;
}) {
  return (
    <div className="grid min-h-[400px] place-items-center rounded-[24px] border border-black/[0.08] bg-white px-6 py-14 text-center">
      <div className="max-w-md">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d6cc6d]/30 bg-[#f5f1cf] text-[#766e24]">
          <WalletCards
            size={23}
          />
        </span>

        <h2 className="mt-6 text-[23px] font-semibold tracking-[-0.035em]">
          {filtered
            ? "No matching payments"
            : "No payments yet"}
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-[10px] leading-5 text-black/40">
          {filtered
            ? "No payment matches the current filters."
            : "Client payment records will appear here when transactions are created."}
        </p>

        {filtered && (
          <button
            type="button"
            onClick={onClear}
            className="mt-6 inline-flex h-10 items-center rounded-full border border-black/[0.1] px-5 text-[10px] font-semibold text-black/60"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}