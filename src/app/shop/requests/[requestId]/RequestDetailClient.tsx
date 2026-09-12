"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Circle,
  Clock3,
  Download,
  FileText,
  MessageSquareText,
  MoreHorizontal,
  Paperclip,
  Plus,
  WalletCards,
} from "lucide-react";

export type RequestStatus =
  | "submitted"
  | "reviewing"
  | "needs_info"
  | "proposal_ready"
  | "closed";

export type ActivityStatus =
  | "complete"
  | "current"
  | "upcoming";

export type RequestFile = {
  name: string;
  type: string;
  size: string;
};

export type ActivityItem = {
  title: string;
  description: string;
  date?: string;
  status: ActivityStatus;
};

export type ProjectRequest = {
  id: string;
  title: string;
  service: string;
  status: RequestStatus;
  submittedAt: string;

  businessName: string;
  businessDescription: string;
  projectDescription: string;

  requirements: string[];

  budget: string;
  timeline: string;
  existingUrl?: string;

  files: RequestFile[];
  activity: ActivityItem[];
};

type Props = {
  request: ProjectRequest;
};

export default function RequestDetailClient({
  request,
}: Props) {
  const isProposalReady =
    request.status === "proposal_ready";

  const needsInfo =
    request.status === "needs_info";

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* BREADCRUMB */}
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
        <Link href="/shop" className="transition hover:text-black">
          Dashboard
        </Link>

        <span>/</span>

        <Link
          href="/shop/requests"
          className="transition hover:text-black"
        >
          Requests
        </Link>

        <span>/</span>

        <span>{request.id}</span>
      </div>

      {/* HEADER */}
      <section className="mt-8 border-b border-black/[0.09] pb-9">
        <Link
          href="/shop/requests"
          className="mb-7 inline-flex items-center gap-2 text-[11px] font-semibold text-black/40 transition hover:text-black"
        >
          <ArrowLeft size={13} />
          All requests
        </Link>

        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/30">
                {request.id}
              </span>

              <StatusBadge status={request.status} />
            </div>

            <h1 className="mt-5 text-[38px] font-semibold leading-none tracking-[-0.05em] sm:text-[50px]">
              {request.title}
            </h1>

            <p className="mt-3 text-[12px] text-black/40">
              {request.service}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/shop/messages"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-black/[0.1] bg-white px-4 text-[11px] font-semibold transition hover:border-black/25"
            >
              <MessageSquareText size={14} />
              Message Fynaro
            </Link>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.1] bg-white"
              aria-label="More options"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* STATUS MESSAGE */}
      <section className="py-7">
        {request.status === "reviewing" && (
          <StatusMessage
            eyebrow="Under review"
            title="We're reviewing your project."
            description="The Fynaro team is reviewing the requirements, product structure and the scope needed to move this project forward."
          />
        )}

        {needsInfo && (
          <StatusMessage
            eyebrow="Action required"
            title="We need a little more information."
            description="There are a few details we need from you before the project scope can be completed."
            actionLabel="View questions"
            href="/shop/messages"
          />
        )}

        {isProposalReady && (
          <StatusMessage
            dark
            eyebrow="Proposal ready"
            title="Your project scope is ready."
            description="We've prepared the recommended scope, investment, milestones and delivery structure for this project."
            actionLabel="Review proposal"
            href={`/shop/proposals/${request.id}`}
          />
        )}
      </section>

      {/* MAIN CONTENT */}
      <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
        <main className="space-y-8">
          {/* OVERVIEW */}
          <section className="overflow-hidden rounded-[20px] border border-black/[0.09] bg-white">
            <SectionHeader
              eyebrow="Project overview"
              title="Request details"
            />

            <div className="grid border-t border-black/[0.08] sm:grid-cols-2">
              <InfoCell
                label="Business / Project"
                value={request.businessName}
              />

              <InfoCell
                label="Service"
                value={request.service}
              />

              <InfoCell
                label="Investment range"
                value={request.budget}
              />

              <InfoCell
                label="Preferred timeline"
                value={request.timeline}
              />

              <InfoCell
                label="Submitted"
                value={request.submittedAt}
              />

              <InfoCell
                label="Existing website"
                value={request.existingUrl || "None provided"}
              />
            </div>
          </section>

          {/* BUSINESS */}
          <section className="rounded-[20px] border border-black/[0.09] bg-white p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-black/30">
              About the business
            </p>

            <p className="mt-5 max-w-[760px] text-[13px] leading-7 text-black/55">
              {request.businessDescription}
            </p>
          </section>

          {/* PROJECT DESCRIPTION */}
          <section className="rounded-[20px] border border-black/[0.09] bg-white p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-black/30">
              What you're building
            </p>

            <h2 className="mt-4 text-[25px] font-semibold tracking-[-0.035em]">
              Project brief
            </h2>

            <p className="mt-5 max-w-[780px] text-[13px] leading-7 text-black/55">
              {request.projectDescription}
            </p>
          </section>

          {/* REQUIREMENTS */}
          <section className="rounded-[20px] border border-black/[0.09] bg-white p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-black/30">
              Requirements
            </p>

            <h2 className="mt-4 text-[25px] font-semibold tracking-[-0.035em]">
              What this project may need
            </h2>

            <div className="mt-7 grid gap-px overflow-hidden rounded-[16px] border border-black/[0.08] bg-black/[0.07] sm:grid-cols-2">
              {request.requirements.map((requirement) => (
                <div
                  key={requirement}
                  className="flex min-h-[64px] items-center gap-3 bg-[#fafaf8] px-5"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black/[0.05]">
                    <Check size={11} />
                  </span>

                  <span className="text-[11px] font-medium text-black/55">
                    {requirement}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* FILES */}
          <section className="overflow-hidden rounded-[20px] border border-black/[0.09] bg-white">
            <div className="flex items-center justify-between gap-5 p-6 sm:p-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-black/30">
                  Files
                </p>

                <h2 className="mt-3 text-[23px] font-semibold tracking-[-0.03em]">
                  Project references
                </h2>
              </div>

              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-black/[0.1] px-4 text-[10px] font-semibold"
              >
                <Plus size={13} />
                Add file
              </button>
            </div>

            <div className="border-t border-black/[0.08]">
              {request.files.length ? (
                request.files.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between gap-4 border-b border-black/[0.07] px-6 py-5 last:border-b-0 sm:px-8"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-black/[0.05]">
                        <FileText size={15} />
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold">
                          {file.name}
                        </p>

                        <p className="mt-1 text-[9px] uppercase tracking-[0.1em] text-black/30">
                          {file.type} · {file.size}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/[0.09]"
                      aria-label={`Download ${file.name}`}
                    >
                      <Download size={13} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <Paperclip
                    size={17}
                    className="mx-auto text-black/25"
                  />

                  <p className="mt-3 text-[11px] text-black/35">
                    No files attached.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* ACTIVITY */}
          <section className="rounded-[20px] border border-black/[0.09] bg-white p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-black/30">
              Activity
            </p>

            <h2 className="mt-4 text-[25px] font-semibold tracking-[-0.035em]">
              Request progress
            </h2>

            <div className="mt-8">
              {request.activity.map((item, index) => (
                <ActivityRow
                  key={item.title}
                  item={item}
                  last={index === request.activity.length - 1}
                />
              ))}
            </div>
          </section>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside>
          <div className="space-y-4 xl:sticky xl:top-[100px]">
            {/* CURRENT STATUS */}
            <div className="rounded-[20px] border border-black/[0.09] bg-white p-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                Current status
              </p>

              <div className="mt-5 flex items-center gap-3">
                <StatusIcon status={request.status} />

                <div>
                  <p className="text-[13px] font-semibold">
                    {statusLabel(request.status)}
                  </p>

                  <p className="mt-1 text-[10px] text-black/35">
                    Request {request.id}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-black/[0.07] pt-5">
                <p className="text-[11px] leading-5 text-black/45">
                  {request.status === "reviewing" &&
                    "Your request is currently with Fynaro for scope review."}

                  {request.status === "submitted" &&
                    "Your request has been received and is waiting for review."}

                  {request.status === "needs_info" &&
                    "Fynaro needs additional information before continuing."}

                  {request.status === "proposal_ready" &&
                    "Your recommended project proposal is ready."}

                  {request.status === "closed" &&
                    "This project request has been closed."}
                </p>
              </div>
            </div>

            {/* PROJECT SNAPSHOT */}
            <div className="rounded-[20px] bg-[#e9e9e3] p-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                Project snapshot
              </p>

              <div className="mt-6 space-y-5">
                <SnapshotItem
                  icon={WalletCards}
                  label="Investment"
                  value={request.budget}
                />

                <SnapshotItem
                  icon={Clock3}
                  label="Timeline"
                  value={request.timeline}
                />

                <SnapshotItem
                  icon={CalendarDays}
                  label="Submitted"
                  value={request.submittedAt}
                />
              </div>
            </div>

            {/* HELP */}
            <div className="rounded-[20px] bg-[#111] p-6 text-white">
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/30">
                Need to add context?
              </p>

              <p className="mt-4 text-[12px] leading-6 text-white/50">
                Send Fynaro a message if something important has changed
                or you need to clarify part of the request.
              </p>

              <Link
                href="/shop/messages"
                className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[10px] font-semibold text-black"
              >
                Message Fynaro
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="p-6 sm:p-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-black/30">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.035em]">
        {title}
      </h2>
    </div>
  );
}

function InfoCell({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-black/[0.07] p-5 last:border-b-0 sm:min-h-[105px] sm:border-r sm:p-6 sm:[&:nth-child(even)]:border-r-0">
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-black/30">
        {label}
      </p>

      <p className="mt-3 text-[12px] font-medium text-black/65">
        {value}
      </p>
    </div>
  );
}

function StatusMessage({
  eyebrow,
  title,
  description,
  actionLabel,
  href,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  href?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-[20px] p-6 sm:p-8",
        dark ? "bg-[#111] text-white" : "bg-[#e9e9e3]",
      ].join(" ")}
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p
            className={[
              "text-[9px] font-semibold uppercase tracking-[0.18em]",
              dark ? "text-white/30" : "text-black/30",
            ].join(" ")}
          >
            {eyebrow}
          </p>

          <h2 className="mt-3 text-[25px] font-semibold tracking-[-0.035em]">
            {title}
          </h2>

          <p
            className={[
              "mt-3 max-w-[680px] text-[11px] leading-5",
              dark ? "text-white/45" : "text-black/45",
            ].join(" ")}
          >
            {description}
          </p>
        </div>

        {actionLabel && href && (
          <Link
            href={href}
            className={[
              "inline-flex h-11 items-center gap-3 rounded-full px-5 text-[11px] font-semibold",
              dark
                ? "bg-white text-black"
                : "bg-[#111] text-white",
            ].join(" ")}
          >
            {actionLabel}
            <ArrowRight size={13} />
          </Link>
        )}
      </div>
    </div>
  );
}

function ActivityRow({
  item,
  last,
}: {
  item: ActivityItem;
  last: boolean;
}) {
  const complete = item.status === "complete";
  const current = item.status === "current";

  return (
    <div className="relative flex gap-5">
      {!last && (
        <div className="absolute left-[13px] top-7 h-[calc(100%-4px)] w-px bg-black/[0.09]" />
      )}

      <div
        className={[
          "relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
          complete
            ? "bg-[#111] text-white"
            : current
            ? "border border-black bg-white"
            : "border border-black/[0.1] bg-white text-black/20",
        ].join(" ")}
      >
        {complete ? (
          <Check size={11} />
        ) : current ? (
          <Clock3 size={11} />
        ) : (
          <Circle size={7} />
        )}
      </div>

      <div className="pb-8">
        <div className="flex flex-wrap items-center gap-3">
          <p
            className={[
              "text-[12px] font-semibold",
              item.status === "upcoming"
                ? "text-black/35"
                : "text-black",
            ].join(" ")}
          >
            {item.title}
          </p>

          {item.date && (
            <span className="text-[9px] text-black/25">
              {item.date}
            </span>
          )}
        </div>

        <p
          className={[
            "mt-2 max-w-[650px] text-[11px] leading-5",
            item.status === "upcoming"
              ? "text-black/30"
              : "text-black/45",
          ].join(" ")}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

function SnapshotItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/65">
        <Icon size={13} />
      </span>

      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-black/30">
          {label}
        </p>

        <p className="mt-1.5 text-[11px] font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: RequestStatus;
}) {
  const classes: Record<RequestStatus, string> = {
    submitted: "bg-black/[0.05] text-black/50",
    reviewing: "bg-[#eee9da] text-[#645c39]",
    needs_info: "bg-[#f3e8e3] text-[#85533e]",
    proposal_ready: "bg-[#111] text-white",
    closed: "bg-black/[0.04] text-black/35",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] ${classes[status]}`}
    >
      {statusLabel(status)}
    </span>
  );
}

function StatusIcon({
  status,
}: {
  status: RequestStatus;
}) {
  if (status === "proposal_ready") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111] text-white">
        <Check size={15} />
      </span>
    );
  }

  if (status === "needs_info") {
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e8e3] text-[#85533e]">
        <MessageSquareText size={15} />
      </span>
    );
  }

  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.05]">
      <Clock3 size={15} />
    </span>
  );
}

function statusLabel(status: RequestStatus) {
  const labels: Record<RequestStatus, string> = {
    submitted: "Submitted",
    reviewing: "Reviewing",
    needs_info: "Needs Info",
    proposal_ready: "Proposal Ready",
    closed: "Closed",
  };

  return labels[status];
}