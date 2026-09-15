"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  FileText,
  FolderOpen,
  MessageSquareText,
  MoreHorizontal,
  ReceiptText,
  Upload,
  UserRound,
  WalletCards,
} from "lucide-react";
import { useState } from "react";

type ProjectStatus =
  | "preparing"
  | "active"
  | "waiting_on_client"
  | "paused"
  | "completed";

type Tab =
  | "overview"
  | "timeline"
  | "files"
  | "messages"
  | "payments";

type PhaseStatus = "complete" | "current" | "upcoming";

type ProjectPhase = {
  number: string;
  title: string;
  description: string;
  status: PhaseStatus;
};

type ProjectFile = {
  name: string;
  category: string;
  size: string;
  uploadedBy: string;
  date: string;
};

type Activity = {
  title: string;
  description: string;
  date: string;
};

const project = {
  id: "FYN-PRJ-0042",
  requestId: "FYN-0042",
  proposalId: "PRP-0042",

  title: "Marketplace Platform",
  service: "Digital Product",
  status: "active" as ProjectStatus,

  progress: 38,

  totalInvestment: 2450000,
  amountPaid: 1225000,
  balance: 1225000,

  startedAt: "Sep 10, 2026",
  estimatedDelivery: "Nov 2026",

  currentPhase: "Core Development",

  currentPhaseDescription:
    "The approved product architecture and interface direction are now being translated into the working marketplace platform.",

  nextMilestone: "Customer marketplace experience",

  attention: {
    title: "Dashboard design approval",
    description:
      "The latest administrative dashboard direction is ready for your review.",
  },

  phases: [
    {
      number: "01",
      title: "Discovery",
      description:
        "Project requirements, objectives and product direction confirmed.",
      status: "complete" as PhaseStatus,
    },
    {
      number: "02",
      title: "Product Architecture",
      description:
        "User roles, workflows and core product structure established.",
      status: "complete" as PhaseStatus,
    },
    {
      number: "03",
      title: "Development",
      description:
        "Core marketplace functionality and application systems are being built.",
      status: "current" as PhaseStatus,
    },
    {
      number: "04",
      title: "Quality Assurance",
      description:
        "Product testing, refinements and launch preparation.",
      status: "upcoming" as PhaseStatus,
    },
    {
      number: "05",
      title: "Launch",
      description:
        "Production deployment and final project handover.",
      status: "upcoming" as PhaseStatus,
    },
  ],

  files: [
    {
      name: "marketplace-product-architecture.pdf",
      category: "Documentation",
      size: "2.1 MB",
      uploadedBy: "Fynaro",
      date: "Sep 12, 2026",
    },
    {
      name: "dashboard-interface-v2.pdf",
      category: "Design",
      size: "4.6 MB",
      uploadedBy: "Fynaro",
      date: "Sep 18, 2026",
    },
  ],

  activity: [
    {
      title: "Development phase started",
      description:
        "Core marketplace development has started.",
      date: "Sep 19, 2026",
    },
    {
      title: "Design file uploaded",
      description:
        "Dashboard interface V2 was added to project files.",
      date: "Sep 18, 2026",
    },
    {
      title: "Product architecture approved",
      description:
        "The product structure and primary workflows were approved.",
      date: "Sep 15, 2026",
    },
    {
      title: "Initial payment confirmed",
      description:
        "The project-start payment was successfully recorded.",
      date: "Sep 10, 2026",
    },
  ],
};

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "timeline", label: "Timeline" },
  { id: "files", label: "Files" },
  { id: "messages", label: "Messages" },
  { id: "payments", label: "Payments" },
];

export default function ProjectDetailPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 pb-20 sm:px-6 lg:px-8 lg:py-10">
      {/* BREADCRUMB */}
      <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
        <Link href="/shop" className="transition hover:text-black">
          Dashboard
        </Link>

        <span>/</span>

        <Link
          href="/shop/projects"
          className="transition hover:text-black"
        >
          Projects
        </Link>

        <span>/</span>

        <span>{project.id}</span>
      </div>

      {/* HEADER */}
      <section className="mt-8">
        <Link
          href="/shop/projects"
          className="inline-flex items-center gap-2 text-[11px] font-semibold text-black/40 transition hover:text-black"
        >
          <ArrowLeft size={13} />
          All projects
        </Link>

        <div className="mt-8 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/30">
                {project.id}
              </span>

              <ProjectStatusBadge status={project.status} />
            </div>

            <h1 className="mt-5 text-[42px] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-[56px]">
              {project.title}
            </h1>

            <p className="mt-4 text-[11px] text-black/40">
              {project.service}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/shop/messages"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-black/[0.1] bg-white px-4 text-[11px] font-semibold"
            >
              <MessageSquareText size={13} />
              Message Fynaro
            </Link>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.1] bg-white"
            >
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="mt-9 border-b border-black/[0.09]">
        <div className="flex gap-7 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={[
                "relative min-w-fit pb-4 text-[11px] font-semibold transition",
                activeTab === tab.id
                  ? "text-black"
                  : "text-black/35 hover:text-black/60",
              ].join(" ")}
            >
              {tab.label}

              {activeTab === tab.id && (
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-black" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <div className="pt-8">
        {activeTab === "overview" && <Overview />}
        {activeTab === "timeline" && <Timeline />}
        {activeTab === "files" && <Files />}
        {activeTab === "messages" && <Messages />}
        {activeTab === "payments" && <Payments />}
      </div>
    </div>
  );
}

/* =========================================================
   OVERVIEW
========================================================= */

function Overview() {
  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_350px]">
      <main className="space-y-6">
        {/* PROGRESS */}
        <section className="rounded-[22px] bg-[#111] p-7 text-white sm:p-9">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">
                Project Progress
              </p>

              <p className="mt-4 text-[48px] font-semibold leading-none tracking-[-0.06em]">
                {project.progress}%
              </p>

              <p className="mt-4 text-[11px] text-white/40">
                Current phase · {project.currentPhase}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                Estimated delivery
              </p>

              <p className="mt-2 text-[13px] font-semibold">
                {project.estimatedDelivery}
              </p>
            </div>
          </div>

          <div className="mt-8 h-[3px] overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-white transition-all"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </section>

        {/* CURRENT PHASE */}
        <section className="rounded-[20px] border border-black/[0.09] bg-white p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                Current Phase
              </p>

              <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.04em]">
                {project.currentPhase}
              </h2>

              <p className="mt-4 max-w-[650px] text-[11px] leading-6 text-black/45">
                {project.currentPhaseDescription}
              </p>
            </div>

            <div className="border-t border-black/[0.08] pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/30">
                Next Milestone
              </p>

              <p className="mt-3 text-[12px] font-semibold leading-5">
                {project.nextMilestone}
              </p>

              <Link
                href="#timeline"
                className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold"
              >
                View timeline
                <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </section>

        {/* ATTENTION */}
        <section className="rounded-[20px] bg-[#e9e9e3] p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-black" />

                <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/35">
                  Needs Your Attention
                </p>
              </div>

              <h2 className="mt-4 text-[22px] font-semibold tracking-[-0.035em]">
                {project.attention.title}
              </h2>

              <p className="mt-3 max-w-[620px] text-[11px] leading-5 text-black/45">
                {project.attention.description}
              </p>
            </div>

            <button
              type="button"
              className="inline-flex h-11 items-center gap-3 rounded-full bg-[#111] px-5 text-[11px] font-semibold text-white"
            >
              Review & Approve
              <ArrowRight size={12} />
            </button>
          </div>
        </section>

        {/* TIMELINE PREVIEW */}
        <section
          id="timeline"
          className="rounded-[20px] border border-black/[0.09] bg-white p-6 sm:p-8"
        >
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                Delivery
              </p>

              <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.035em]">
                Project timeline
              </h2>
            </div>
          </div>

          <div className="mt-8">
            {project.phases.map((phase, index) => (
              <PhaseRow
                key={phase.number}
                phase={phase}
                last={index === project.phases.length - 1}
              />
            ))}
          </div>
        </section>

        {/* RECENT ACTIVITY */}
        <section className="overflow-hidden rounded-[20px] border border-black/[0.09] bg-white">
          <div className="p-6 sm:p-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
              Recent Activity
            </p>

            <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.035em]">
              What&apos;s happening
            </h2>
          </div>

          <div className="border-t border-black/[0.08]">
            {project.activity.map((activity) => (
              <div
                key={`${activity.title}-${activity.date}`}
                className="grid gap-3 border-b border-black/[0.07] px-6 py-5 last:border-b-0 sm:grid-cols-[1fr_auto] sm:px-8"
              >
                <div>
                  <p className="text-[11px] font-semibold">
                    {activity.title}
                  </p>

                  <p className="mt-1.5 text-[10px] text-black/40">
                    {activity.description}
                  </p>
                </div>

                <p className="text-[9px] text-black/30">
                  {activity.date}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* SIDEBAR */}
      <aside>
        <div className="space-y-4 xl:sticky xl:top-[100px]">
          <section className="rounded-[20px] border border-black/[0.09] bg-white p-6">
            <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
              Project Summary
            </p>

            <div className="mt-6 space-y-5">
              <SidebarItem
                icon={CalendarDays}
                label="Started"
                value={project.startedAt}
              />

              <SidebarItem
                icon={Clock3}
                label="Delivery"
                value={project.estimatedDelivery}
              />

              <SidebarItem
                icon={WalletCards}
                label="Investment"
                value={formatMoney(project.totalInvestment)}
              />

              <SidebarItem
                icon={CheckCircle2}
                label="Paid"
                value={formatMoney(project.amountPaid)}
              />
            </div>

            <div className="mt-6 border-t border-black/[0.08] pt-5">
              <div className="flex justify-between gap-4">
                <span className="text-[10px] text-black/40">
                  Balance
                </span>

                <span className="text-[11px] font-semibold">
                  {formatMoney(project.balance)}
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-[20px] bg-[#e9e9e3] p-6">
            <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
              Project References
            </p>

            <div className="mt-5 space-y-3">
              <ReferenceLink
                label="Request"
                value={project.requestId}
                href={`/shop/requests/${project.requestId}`}
              />

              <ReferenceLink
                label="Proposal"
                value={project.proposalId}
                href={`/shop/proposals/${project.proposalId}`}
              />
            </div>
          </section>

          <section className="rounded-[20px] bg-[#111] p-6 text-white">
            <MessageSquareText
              size={17}
              className="text-white/45"
            />

            <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.025em]">
              Talk to Fynaro
            </h3>

            <p className="mt-2 text-[10px] leading-5 text-white/40">
              Keep project questions, decisions and updates attached to
              the work.
            </p>

            <Link
              href="/shop/messages"
              className="mt-6 flex h-10 items-center justify-between rounded-full bg-white px-4 text-[10px] font-semibold text-black"
            >
              Open Messages
              <ArrowRight size={11} />
            </Link>
          </section>
        </div>
      </aside>
    </div>
  );
}

/* =========================================================
   TIMELINE TAB
========================================================= */

function Timeline() {
  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
      <section className="rounded-[20px] border border-black/[0.09] bg-white p-6 sm:p-8 lg:p-10">
        <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
          Project Delivery
        </p>

        <h2 className="mt-3 text-[30px] font-semibold tracking-[-0.04em]">
          From start to launch.
        </h2>

        <p className="mt-3 max-w-[620px] text-[11px] leading-5 text-black/43">
          Follow the major stages of the project and see where work
          currently stands.
        </p>

        <div className="mt-10">
          {project.phases.map((phase, index) => (
            <PhaseRow
              key={phase.number}
              phase={phase}
              last={index === project.phases.length - 1}
            />
          ))}
        </div>
      </section>

      <aside className="space-y-4">
        <div className="rounded-[20px] bg-[#111] p-6 text-white">
          <p className="text-[9px] uppercase tracking-[0.16em] text-white/30">
            Current
          </p>

          <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.035em]">
            {project.currentPhase}
          </h3>

          <p className="mt-3 text-[10px] leading-5 text-white/40">
            {project.currentPhaseDescription}
          </p>
        </div>

        <div className="rounded-[20px] bg-[#e9e9e3] p-6">
          <p className="text-[9px] uppercase tracking-[0.16em] text-black/30">
            Overall Progress
          </p>

          <p className="mt-3 text-[32px] font-semibold tracking-[-0.05em]">
            {project.progress}%
          </p>

          <div className="mt-5 h-[3px] bg-black/10">
            <div
              className="h-full bg-black"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}

/* =========================================================
   FILES TAB
========================================================= */

function Files() {
  return (
    <section className="overflow-hidden rounded-[20px] border border-black/[0.09] bg-white">
      <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
            Project Files
          </p>

          <h2 className="mt-3 text-[27px] font-semibold tracking-[-0.04em]">
            Everything attached to the build.
          </h2>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-fit items-center gap-2 rounded-full bg-[#111] px-4 text-[10px] font-semibold text-white"
        >
          <Upload size={12} />
          Upload File
        </button>
      </div>

      <div className="border-t border-black/[0.08]">
        {project.files.map((file) => (
          <div
            key={file.name}
            className="grid gap-4 border-b border-black/[0.07] px-6 py-5 last:border-b-0 sm:grid-cols-[1fr_140px_120px] sm:items-center sm:px-8"
          >
            <div className="flex min-w-0 items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] bg-black/[0.05]">
                <FileText size={15} />
              </span>

              <div className="min-w-0">
                <p className="truncate text-[11px] font-semibold">
                  {file.name}
                </p>

                <p className="mt-1 text-[9px] text-black/30">
                  {file.category} · {file.size}
                </p>
              </div>
            </div>

            <div>
              <p className="text-[9px] text-black/30">
                Uploaded by
              </p>

              <p className="mt-1 text-[10px] font-medium">
                {file.uploadedBy}
              </p>
            </div>

            <p className="text-[9px] text-black/30 sm:text-right">
              {file.date}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================================
   MESSAGES TAB
========================================================= */

function Messages() {
  return (
    <div className="grid min-h-[520px] place-items-center rounded-[20px] border border-black/[0.09] bg-white px-6 text-center">
      <div>
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/[0.05]">
          <MessageSquareText size={17} />
        </span>

        <h2 className="mt-5 text-[23px] font-semibold tracking-[-0.035em]">
          Project conversation
        </h2>

        <p className="mx-auto mt-3 max-w-[430px] text-[11px] leading-5 text-black/40">
          Messages related to this project will live here so decisions
          and project context stay attached to the work.
        </p>

        <Link
          href={`/shop/messages?project=${project.id}`}
          className="mt-6 inline-flex h-11 items-center gap-3 rounded-full bg-[#111] px-5 text-[11px] font-semibold text-white"
        >
          Open Conversation
          <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  );
}

/* =========================================================
   PAYMENTS TAB
========================================================= */

function Payments() {
  const paidPercentage =
    (project.amountPaid / project.totalInvestment) * 100;

  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
      <section className="overflow-hidden rounded-[20px] border border-black/[0.09] bg-white">
        <div className="p-6 sm:p-8">
          <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
            Project Payments
          </p>

          <h2 className="mt-3 text-[27px] font-semibold tracking-[-0.04em]">
            Payment history
          </h2>
        </div>

        <div className="border-t border-black/[0.08]">
          <PaymentRow
            label="Project Start"
            percentage="50%"
            amount={1225000}
            status="Paid"
            date="Sep 10, 2026"
          />

          <PaymentRow
            label="Development Milestone"
            percentage="30%"
            amount={735000}
            status="Upcoming"
          />

          <PaymentRow
            label="Final Delivery"
            percentage="20%"
            amount={490000}
            status="Upcoming"
          />
        </div>
      </section>

      <aside className="rounded-[20px] bg-[#111] p-6 text-white">
        <WalletCards size={17} className="text-white/40" />

        <p className="mt-6 text-[9px] uppercase tracking-[0.16em] text-white/30">
          Payment Progress
        </p>

        <p className="mt-3 text-[31px] font-semibold tracking-[-0.05em]">
          {Math.round(paidPercentage)}%
        </p>

        <div className="mt-5 h-[3px] bg-white/10">
          <div
            className="h-full bg-white"
            style={{ width: `${paidPercentage}%` }}
          />
        </div>

        <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
          <MoneyRow
            label="Investment"
            value={project.totalInvestment}
          />

          <MoneyRow
            label="Paid"
            value={project.amountPaid}
          />

          <MoneyRow
            label="Balance"
            value={project.balance}
          />
        </div>

        <Link
          href="/shop/billing"
          className="mt-7 flex h-11 items-center justify-between rounded-full bg-white px-4 text-[10px] font-semibold text-black"
        >
          View Billing
          <ArrowRight size={11} />
        </Link>
      </aside>
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

function PhaseRow({
  phase,
  last,
}: {
  phase: ProjectPhase;
  last: boolean;
}) {
  const complete = phase.status === "complete";
  const current = phase.status === "current";

  return (
    <div className="relative flex gap-5">
      {!last && (
        <div className="absolute left-[17px] top-9 h-[calc(100%-10px)] w-px bg-black/[0.09]" />
      )}

      <div
        className={[
          "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
          complete
            ? "bg-[#111] text-white"
            : current
              ? "border border-black bg-white"
              : "border border-black/[0.1] bg-white text-black/20",
        ].join(" ")}
      >
        {complete ? (
          <Check size={12} />
        ) : current ? (
          <Clock3 size={12} />
        ) : (
          <Circle size={7} />
        )}
      </div>

      <div className="flex-1 pb-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p
              className={[
                "text-[12px] font-semibold",
                phase.status === "upcoming"
                  ? "text-black/35"
                  : "text-black",
              ].join(" ")}
            >
              {phase.title}
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-black/25">
              Phase {phase.number}
            </p>
          </div>

          {current && (
            <span className="rounded-full bg-[#111] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-white">
              Current
            </span>
          )}
        </div>

        <p
          className={[
            "mt-3 max-w-[650px] text-[10px] leading-5",
            phase.status === "upcoming"
              ? "text-black/28"
              : "text-black/42",
          ].join(" ")}
        >
          {phase.description}
        </p>
      </div>
    </div>
  );
}

function ProjectStatusBadge({
  status,
}: {
  status: ProjectStatus;
}) {
  const config: Record<
    ProjectStatus,
    { label: string; className: string }
  > = {
    preparing: {
      label: "Preparing",
      className: "bg-black/[0.05] text-black/50",
    },
    active: {
      label: "Active",
      className: "bg-[#e3ede6] text-[#42604a]",
    },
    waiting_on_client: {
      label: "Waiting on You",
      className: "bg-[#f3e8e3] text-[#85533e]",
    },
    paused: {
      label: "Paused",
      className: "bg-[#eee9da] text-[#645c39]",
    },
    completed: {
      label: "Completed",
      className: "bg-[#111] text-white",
    },
  };

  const item = config[status];

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] ${item.className}`}
    >
      {item.label}
    </span>
  );
}

function SidebarItem({
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
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/[0.05]">
        <Icon size={12} />
      </span>

      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-black/30">
          {label}
        </p>

        <p className="mt-1 text-[11px] font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}

function ReferenceLink({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-[12px] bg-white/60 px-4 py-3 transition hover:bg-white"
    >
      <div>
        <p className="text-[8px] uppercase tracking-[0.12em] text-black/30">
          {label}
        </p>

        <p className="mt-1 text-[10px] font-semibold">
          {value}
        </p>
      </div>

      <ArrowRight size={11} />
    </Link>
  );
}

function PaymentRow({
  label,
  percentage,
  amount,
  status,
  date,
}: {
  label: string;
  percentage: string;
  amount: number;
  status: string;
  date?: string;
}) {
  return (
    <div className="grid gap-4 border-b border-black/[0.07] p-6 last:border-b-0 sm:grid-cols-[70px_1fr_140px_100px] sm:items-center sm:px-8">
      <p className="text-[18px] font-semibold tracking-[-0.035em]">
        {percentage}
      </p>

      <div>
        <p className="text-[11px] font-semibold">{label}</p>

        {date && (
          <p className="mt-1 text-[9px] text-black/30">
            {date}
          </p>
        )}
      </div>

      <p className="text-[12px] font-semibold">
        {formatMoney(amount)}
      </p>

      <span
        className={[
          "w-fit rounded-full px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em]",
          status === "Paid"
            ? "bg-[#e3ede6] text-[#42604a]"
            : "bg-black/[0.05] text-black/35",
        ].join(" ")}
      >
        {status}
      </span>
    </div>
  );
}

function MoneyRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex justify-between gap-5">
      <span className="text-[10px] text-white/35">
        {label}
      </span>

      <span className="text-[11px] font-semibold">
        {formatMoney(value)}
      </span>
    </div>
  );
}