import Link from "next/link";

import {
  ArrowUpRight,
  ClipboardList,
} from "lucide-react";

import {
  getAdminRequests,
} from "@/lib/admin/request";

function formatDate(
  value: string | null
) {
  if (!value) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  ).format(
    new Date(value)
  );
}

function formatMoney(
  value: number | null
) {
  if (
    value === null ||
    value === undefined
  ) {
    return "—";
  }

  return new Intl.NumberFormat(
    "en-NG",
    {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }
  ).format(value);
}

function statusClasses(
  status: string
) {
  switch (
    status.toLowerCase()
  ) {
    case "submitted":
      return "bg-amber-50 text-amber-700 ring-amber-600/10";

    case "approved":
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/10";

    case "rejected":
      return "bg-red-50 text-red-700 ring-red-600/10";

    default:
      return "bg-[#f4f4ef] text-black/55 ring-black/5";
  }
}

export default async function AdminRequestsPage() {
  const requests =
    await getAdminRequests();

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="flex flex-col gap-5 border-b border-black/5 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
            Sales
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#111111]">
            Project requests
          </h1>

          <p className="mt-2 text-sm text-black/45">
            Review incoming
            enquiries before creating
            proposals.
          </p>
        </div>

        <div className="rounded-xl border border-black/6 bg-white px-4 py-3">
          <p className="text-xs text-black/40">
            Total requests
          </p>

          <p className="mt-1 text-lg font-semibold">
            {requests.length}
          </p>
        </div>
      </div>

      {!requests.length ? (
        <div className="mt-7 flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-black/6 bg-white px-6 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f4f4ef]">
            <ClipboardList
              className="h-5 w-5 text-black/45"
              strokeWidth={1.8}
            />
          </div>

          <h2 className="mt-4 text-sm font-semibold">
            No project requests yet
          </h2>

          <p className="mt-2 max-w-md text-xs leading-5 text-black/40">
            New client submissions
            from your request flow
            will appear here
            automatically.
          </p>
        </div>
      ) : (
        <div className="mt-7 overflow-hidden rounded-2xl border border-black/6 bg-white">
          <div className="hidden grid-cols-[1.2fr_1fr_0.8fr_0.8fr_0.6fr_40px] gap-4 border-b border-black/5 bg-[#fafaf8] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-black/35 lg:grid">
            <span>
              Request
            </span>

            <span>
              Client
            </span>

            <span>
              Budget
            </span>

            <span>
              Submitted
            </span>

            <span>
              Status
            </span>

            <span />
          </div>

          <div className="divide-y divide-black/5">
            {requests.map(
              (request) => (
                <Link
                  key={
                    request.id
                  }
                  href={`/admin/requests/${request.id}`}
                  className="grid gap-4 px-5 py-5 transition hover:bg-[#fafaf8] lg:grid-cols-[1.2fr_1fr_0.8fr_0.8fr_0.6fr_40px] lg:items-center"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#111111]">
                      {request.title ||
                        request.business_name ||
                        "Untitled request"}
                    </p>

                    <p className="mt-1 text-xs text-black/40">
                      {request.reference}
                      {request.service
                        ? ` · ${request.service}`
                        : ""}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-black/65">
                      {request.client
                        ?.full_name ||
                        "Unknown client"}
                    </p>

                    <p className="mt-1 truncate text-xs text-black/40">
                      {request.client
                        ?.email ||
                        "—"}
                    </p>
                  </div>

                  <div className="text-sm text-black/60">
                    {request.budget_min ||
                    request.budget_max
                      ? `${formatMoney(
                          request.budget_min
                        )} – ${formatMoney(
                          request.budget_max
                        )}`
                      : "Not specified"}
                  </div>

                  <div className="text-sm text-black/55">
                    {formatDate(
                      request.submitted_at ||
                        request.created_at
                    )}
                  </div>

                  <div>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ring-1 ring-inset ${statusClasses(
                        request.status
                      )}`}
                    >
                      {
                        request.status
                      }
                    </span>
                  </div>

                  <div className="flex justify-end">
                    <ArrowUpRight
                      className="h-4 w-4 text-black/30"
                      strokeWidth={
                        1.8
                      }
                    />
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}