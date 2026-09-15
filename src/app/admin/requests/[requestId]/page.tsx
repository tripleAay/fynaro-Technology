import Link from "next/link";

import {
  ArrowLeft,
  ExternalLink,
  FileText,
  Mail,
  Phone,
} from "lucide-react";

import {
  notFound,
} from "next/navigation";

import {
  getAdminRequest,
} from "@/lib/admin/request";

type PageProps = {
  params: Promise<{
    requestId: string;
  }>;
};

function formatMoney(
  value: number | null
) {
  if (
    value === null ||
    value === undefined
  ) {
    return "Not specified";
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
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
  ).format(
    new Date(value)
  );
}

export default async function AdminRequestDetailPage({
  params,
}: PageProps) {
  const {
    requestId,
  } = await params;

  const request =
    await getAdminRequest(
      requestId
    );

  if (!request) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[1400px]">
      <Link
        href="/admin/requests"
        className="inline-flex items-center gap-2 text-xs font-medium text-black/50 transition hover:text-black"
      >
        <ArrowLeft
          className="h-4 w-4"
          strokeWidth={1.8}
        />

        Back to requests
      </Link>

      <div className="mt-6 flex flex-col gap-5 border-b border-black/5 pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
              {
                request.reference
              }
            </p>

            <span className="rounded-full bg-[#f4f4ef] px-2.5 py-1 text-[11px] font-medium capitalize text-black/55">
              {
                request.status
              }
            </span>
          </div>

          <h1 className="mt-3 max-w-4xl text-3xl font-semibold tracking-[-0.045em] text-[#111111]">
            {request.title ||
              request.business_name ||
              "Project request"}
          </h1>

          <p className="mt-3 text-sm text-black/45">
            Submitted{" "}
            {formatDate(
              request.submitted_at ||
                request.created_at
            )}
          </p>
        </div>

     <Link
  href={`/admin/requests/${request.id}/proposal/new`}
  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 text-sm font-medium text-white transition hover:-translate-y-0.5"
>
  <FileText
    className="h-4 w-4"
    strokeWidth={1.8}
  />

  Create proposal
</Link>
      </div>

      <div className="mt-7 grid gap-5 xl:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-5">
          <Section
            title="Project overview"
          >
            <Field
              label="Service"
              value={
                request.service ||
                "Not specified"
              }
            />

            <Field
              label="Business"
              value={
                request.business_name ||
                "Not specified"
              }
            />

            <Field
              label="Timeline"
              value={
                request.timeline ||
                "Not specified"
              }
            />

            <Field
              label="Budget"
              value={
                request.budget_min ||
                request.budget_max
                  ? `${formatMoney(
                      request.budget_min
                    )} – ${formatMoney(
                      request.budget_max
                    )}`
                  : "Not specified"
              }
            />
          </Section>

          <Section
            title="Business context"
          >
            <LongText
              value={
                request.business_description
              }
            />
          </Section>

          <Section
            title="Project description"
          >
            <LongText
              value={
                request.project_description
              }
            />
          </Section>

          <Section
            title="Requirements"
          >
            {request.requirements
              ?.length ? (
              <div className="flex flex-wrap gap-2">
                {request.requirements.map(
                  (
                    requirement,
                    index
                  ) => (
                    <span
                      key={`${requirement}-${index}`}
                      className="rounded-lg bg-[#f4f4ef] px-3 py-2 text-xs text-black/60"
                    >
                      {
                        requirement
                      }
                    </span>
                  )
                )}
              </div>
            ) : (
              <p className="text-sm text-black/40">
                No specific
                requirements were
                submitted.
              </p>
            )}
          </Section>

          {request.notes && (
            <Section
              title="Additional notes"
            >
              <LongText
                value={
                  request.notes
                }
              />
            </Section>
          )}
        </div>

        <aside className="space-y-5">
          <Section
            title="Client"
          >
            <div>
              <p className="text-base font-semibold">
                {request.client
                  ?.full_name ||
                  "Unknown client"}
              </p>

              {request.client
                ?.company_name && (
                <p className="mt-1 text-sm text-black/45">
                  {
                    request.client
                      .company_name
                  }
                </p>
              )}
            </div>

            <div className="mt-5 space-y-3">
              {request.client
                ?.email && (
                <a
                  href={`mailto:${request.client.email}`}
                  className="flex items-center gap-3 text-sm text-black/55"
                >
                  <Mail className="h-4 w-4" />

                  <span className="break-all">
                    {
                      request.client
                        .email
                    }
                  </span>
                </a>
              )}

              {request.client
                ?.phone && (
                <a
                  href={`tel:${request.client.phone}`}
                  className="flex items-center gap-3 text-sm text-black/55"
                >
                  <Phone className="h-4 w-4" />

                  {
                    request.client
                      .phone
                  }
                </a>
              )}
            </div>
          </Section>

          <Section
            title="Reference"
          >
            <Field
              label="Request ID"
              value={
                request.reference
              }
            />

            <Field
              label="Status"
              value={
                request.status
              }
            />

            <Field
              label="Created"
              value={formatDate(
                request.created_at
              )}
            />
          </Section>

          {request.existing_url && (
            <Section
              title="Existing website"
            >
              <a
                href={
                  request.existing_url
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#111111]"
              >
                View website

                <ExternalLink
                  className="h-4 w-4"
                  strokeWidth={
                    1.8
                  }
                />
              </a>
            </Section>
          )}
        </aside>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children:
    React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/6 bg-white p-5 sm:p-6">
      <h2 className="text-sm font-semibold tracking-[-0.01em]">
        {title}
      </h2>

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-black/5 py-3 first:pt-0 last:border-0 last:pb-0">
      <span className="text-xs text-black/40">
        {label}
      </span>

      <span className="max-w-[65%] text-right text-sm font-medium text-black/70">
        {value}
      </span>
    </div>
  );
}

function LongText({
  value,
}: {
  value:
    | string
    | null;
}) {
  return (
    <p className="whitespace-pre-wrap text-sm leading-7 text-black/60">
      {value ||
        "No information was provided."}
    </p>
  );
}