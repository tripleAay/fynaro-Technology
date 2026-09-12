"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  MessageSquareText,
  ShieldCheck,
  WalletCards,
} from "lucide-react";

type ProposalStatus =
  | "draft"
  | "ready"
  | "accepted"
  | "declined"
  | "expired";

type Deliverable = {
  title: string;
  description: string;
};

type Milestone = {
  number: string;
  title: string;
  description: string;
  duration: string;
};

type PaymentStage = {
  percentage: string;
  label: string;
  amount: string;
  description: string;
};

type Proposal = {
  id: string;
  requestId: string;
  projectTitle: string;
  service: string;
  scope: string;
  status: ProposalStatus;
  createdAt: string;
  validUntil: string;
  estimatedDelivery: string;
  investment: string;
  summary: string;
  deliverables: Deliverable[];
  exclusions: string[];
  milestones: Milestone[];
  payments: PaymentStage[];
};

const proposal: Proposal = {
  id: "PRP-0042",
  requestId: "FYN-0042",
  projectTitle: "Marketplace Platform",
  service: "Digital Product",
  scope: "Custom Product Development",
  status: "ready",

  createdAt: "Sep 9, 2026",
  validUntil: "Sep 23, 2026",
  estimatedDelivery: "10–12 weeks",

  investment: "₦2,450,000",

  summary:
    "Design and development of a custom multi-sided marketplace connecting customers with service providers. The product will include customer and provider accounts, marketplace discovery, service requests, payments, notifications and an administrative system for platform operations.",

  deliverables: [
    {
      title: "Product Architecture",
      description:
        "Definition of the core product structure, user roles, primary workflows and technical requirements.",
    },
    {
      title: "UI / UX Design",
      description:
        "Interface design for customer, provider and administrative experiences across the core product.",
    },
    {
      title: "Customer Experience",
      description:
        "Account creation, marketplace discovery, provider profiles, requests, transactions and account management.",
    },
    {
      title: "Provider Experience",
      description:
        "Provider onboarding, service management, incoming requests, customer activity and account controls.",
    },
    {
      title: "Payments",
      description:
        "Payment flow integration for supported transactions within the platform.",
    },
    {
      title: "Admin Dashboard",
      description:
        "Administrative interface for managing users, providers, marketplace activity and platform operations.",
    },
    {
      title: "Notifications",
      description:
        "Core transactional notifications around accounts, requests and important marketplace activity.",
    },
    {
      title: "Deployment",
      description:
        "Production deployment, final configuration and launch preparation for the approved first release.",
    },
  ],

  exclusions: [
    "Native iOS or Android applications unless separately scoped.",
    "Third-party service fees, payment processor charges and external subscriptions.",
    "Major features introduced after the approved scope.",
    "Ongoing product maintenance after the agreed post-launch support period.",
  ],

  milestones: [
    {
      number: "01",
      title: "Discovery & Architecture",
      description:
        "Confirm requirements, workflows, user roles and product structure.",
      duration: "1 week",
    },
    {
      number: "02",
      title: "UX & Interface Design",
      description:
        "Design the primary customer, provider and administrative experiences.",
      duration: "2–3 weeks",
    },
    {
      number: "03",
      title: "Core Development",
      description:
        "Build authentication, marketplace workflows, data architecture and primary application functionality.",
      duration: "4–5 weeks",
    },
    {
      number: "04",
      title: "Integrations & Admin",
      description:
        "Implement payments, notifications, administrative functionality and required integrations.",
      duration: "2 weeks",
    },
    {
      number: "05",
      title: "QA & Launch",
      description:
        "Testing, final refinements, production configuration and release.",
      duration: "1 week",
    },
  ],

  payments: [
    {
      percentage: "50%",
      label: "Project Start",
      amount: "₦1,225,000",
      description:
        "Due when the proposal is accepted to reserve the project and begin work.",
    },
    {
      percentage: "30%",
      label: "Development Milestone",
      amount: "₦735,000",
      description:
        "Due when the agreed core development milestone has been reached.",
    },
    {
      percentage: "20%",
      label: "Final Delivery",
      amount: "₦490,000",
      description:
        "Due before final production handover and project completion.",
    },
  ],
};

export default function ProposalDetailPage() {
  const ready = proposal.status === "ready";
  const accepted = proposal.status === "accepted";

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* BREADCRUMB */}
      <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
        <Link href="/shop" className="transition hover:text-black">
          Dashboard
        </Link>

        <span>/</span>

        <Link
          href="/shop/proposals"
          className="transition hover:text-black"
        >
          Proposals
        </Link>

        <span>/</span>

        <span>{proposal.id}</span>
      </div>

      {/* HERO */}
      <section className="mt-8 border-b border-black/[0.09] pb-10">
        <Link
          href={`/shop/requests/${proposal.requestId}`}
          className="mb-8 inline-flex items-center gap-2 text-[11px] font-semibold text-black/40 transition hover:text-black"
        >
          <ArrowLeft size={13} />
          Back to request
        </Link>

        <div className="grid gap-10 xl:grid-cols-[1fr_auto] xl:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/30">
                {proposal.id}
              </span>

              <ProposalStatusBadge status={proposal.status} />
            </div>

            <h1 className="mt-5 max-w-[850px] text-[42px] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-[56px]">
              {proposal.projectTitle}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-black/40">
              <span>{proposal.service}</span>
              <span className="h-1 w-1 rounded-full bg-black/20" />
              <span>{proposal.scope}</span>
              <span className="h-1 w-1 rounded-full bg-black/20" />
              <span>Request {proposal.requestId}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-black/[0.1] bg-white px-4 text-[11px] font-semibold"
            >
              <Download size={13} />
              Download Proposal
            </button>

            <Link
              href="/shop/messages"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-black/[0.1] bg-white px-4 text-[11px] font-semibold"
            >
              <MessageSquareText size={13} />
              Ask a Question
            </Link>
          </div>
        </div>
      </section>

      {/* PROPOSAL INTRO */}
      <section className="py-7">
        <div className="overflow-hidden rounded-[22px] bg-[#111] text-white">
          <div className="grid xl:grid-cols-[1fr_380px]">
            <div className="p-7 sm:p-9 lg:p-11">
              <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-white/30">
                Recommended Scope
              </p>

              <h2 className="mt-5 max-w-[650px] text-[32px] font-semibold leading-[1] tracking-[-0.045em] sm:text-[42px]">
                {proposal.scope}
              </h2>

              <p className="mt-6 max-w-[720px] text-[12px] leading-6 text-white/50">
                {proposal.summary}
              </p>
            </div>

            <div className="border-t border-white/10 p-7 sm:p-9 xl:border-l xl:border-t-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/30">
                Project Investment
              </p>

              <p className="mt-3 text-[35px] font-semibold tracking-[-0.05em]">
                {proposal.investment}
              </p>

              <div className="mt-8 space-y-5 border-t border-white/10 pt-6">
                <DarkInfo
                  icon={Clock3}
                  label="Estimated delivery"
                  value={proposal.estimatedDelivery}
                />

                <DarkInfo
                  icon={CalendarDays}
                  label="Proposal valid until"
                  value={proposal.validUntil}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1fr_350px]">
        <main className="space-y-8">
          {/* SCOPE */}
          <section className="rounded-[20px] border border-black/[0.09] bg-white p-6 sm:p-8">
            <SectionTitle
              eyebrow="01 / Scope"
              title="What Fynaro will build"
              description="The proposed first release is structured around the following deliverables."
            />

            <div className="mt-8 grid gap-px overflow-hidden rounded-[16px] border border-black/[0.08] bg-black/[0.07] md:grid-cols-2">
              {proposal.deliverables.map((item, index) => (
                <div
                  key={item.title}
                  className="min-h-[180px] bg-[#fafaf8] p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.05]">
                      <Check size={12} />
                    </span>

                    <span className="text-[9px] font-semibold text-black/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-8 text-[16px] font-semibold tracking-[-0.025em]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[11px] leading-5 text-black/43">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* EXCLUSIONS */}
          <section className="rounded-[20px] border border-black/[0.09] bg-white p-6 sm:p-8">
            <SectionTitle
              eyebrow="02 / Scope Boundaries"
              title="Not included in this proposal"
              description="Keeping these boundaries visible protects both sides from unclear expectations later."
            />

            <div className="mt-8 border-t border-black/[0.08]">
              {proposal.exclusions.map((item, index) => (
                <div
                  key={item}
                  className="grid gap-3 border-b border-black/[0.07] py-5 sm:grid-cols-[60px_1fr]"
                >
                  <span className="text-[10px] font-semibold text-black/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="max-w-[700px] text-[11px] leading-5 text-black/50">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* TIMELINE */}
          <section className="rounded-[20px] border border-black/[0.09] bg-white p-6 sm:p-8">
            <SectionTitle
              eyebrow="03 / Delivery"
              title="Project timeline"
              description={`Estimated delivery is ${proposal.estimatedDelivery}, subject to timely feedback, approvals and required project materials.`}
            />

            <div className="mt-9">
              {proposal.milestones.map((milestone, index) => (
                <div
                  key={milestone.number}
                  className="relative grid gap-4 pb-9 last:pb-0 sm:grid-cols-[60px_1fr_100px]"
                >
                  {index !== proposal.milestones.length - 1 && (
                    <div className="absolute left-[17px] top-9 h-[calc(100%-20px)] w-px bg-black/[0.09]" />
                  )}

                  <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.1] bg-white text-[9px] font-semibold">
                    {milestone.number}
                  </div>

                  <div>
                    <h3 className="text-[14px] font-semibold">
                      {milestone.title}
                    </h3>

                    <p className="mt-2 max-w-[600px] text-[11px] leading-5 text-black/43">
                      {milestone.description}
                    </p>
                  </div>

                  <p className="text-[10px] font-medium text-black/35 sm:text-right">
                    {milestone.duration}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* PAYMENT */}
          <section className="overflow-hidden rounded-[20px] border border-black/[0.09] bg-white">
            <div className="p-6 sm:p-8">
              <SectionTitle
                eyebrow="04 / Investment"
                title="Payment structure"
                description="Payments are tied to clear points in the project rather than treated as one undifferentiated amount."
              />
            </div>

            <div className="border-t border-black/[0.08]">
              {proposal.payments.map((payment) => (
                <div
                  key={payment.percentage}
                  className="grid gap-5 border-b border-black/[0.07] p-6 last:border-b-0 sm:grid-cols-[80px_1fr_auto] sm:items-center sm:p-8"
                >
                  <div>
                    <p className="text-[25px] font-semibold tracking-[-0.04em]">
                      {payment.percentage}
                    </p>
                  </div>

                  <div>
                    <p className="text-[13px] font-semibold">
                      {payment.label}
                    </p>

                    <p className="mt-2 max-w-[520px] text-[10px] leading-5 text-black/40">
                      {payment.description}
                    </p>
                  </div>

                  <p className="text-[15px] font-semibold tracking-[-0.02em] sm:text-right">
                    {payment.amount}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* TERMS */}
          <section className="rounded-[20px] border border-black/[0.09] bg-white p-6 sm:p-8">
            <SectionTitle
              eyebrow="05 / Agreement"
              title="Before accepting"
              description="The proposal defines the commercial scope. Your final project agreement should contain the complete contractual terms."
            />

            <div className="mt-8 space-y-4">
              {[
                "Work begins after proposal acceptance and the required initial payment.",
                "Delivery estimates depend on timely client feedback, content and approvals.",
                "Requests outside the approved scope may require a revised quote or additional proposal.",
                "Third-party fees and subscriptions are separate unless specifically included in the proposal.",
                "Final handover follows completion of the agreed payment schedule.",
              ].map((term) => (
                <div
                  key={term}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/[0.05]">
                    <Check size={9} />
                  </span>

                  <p className="text-[11px] leading-5 text-black/48">
                    {term}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href={`/shop/proposals/${proposal.id}/terms`}
              className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold"
            >
              Read complete project terms
              <ArrowRight size={12} />
            </Link>
          </section>
        </main>

        {/* SIDEBAR */}
        <aside>
          <div className="space-y-4 xl:sticky xl:top-[100px]">
            {/* ACTION */}
            <div
              className={[
                "rounded-[20px] p-6",
                accepted
                  ? "bg-[#e9e9e3]"
                  : "bg-[#111] text-white",
              ].join(" ")}
            >
              {accepted ? (
                <>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                    <CheckCircle2 size={16} />
                  </div>

                  <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                    Proposal accepted
                  </p>

                  <h3 className="mt-3 text-[22px] font-semibold tracking-[-0.035em]">
                    Ready for project start.
                  </h3>

                  <p className="mt-3 text-[11px] leading-5 text-black/45">
                    Complete the initial payment to move this proposal
                    into an active Fynaro project.
                  </p>

                  <Link
                    href={`/shop/billing?proposal=${proposal.id}`}
                    className="mt-6 flex h-11 items-center justify-between rounded-full bg-[#111] px-4 text-[11px] font-semibold text-white"
                  >
                    Continue to Payment
                    <ArrowRight size={13} />
                  </Link>
                </>
              ) : (
                <>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/30">
                    Ready to proceed?
                  </p>

                  <h3 className="mt-3 text-[24px] font-semibold leading-[1.05] tracking-[-0.04em]">
                    Accept this proposal to move forward.
                  </h3>

                  <p className="mt-4 text-[11px] leading-5 text-white/45">
                    Acceptance confirms that you agree with the
                    proposed project scope and investment.
                  </p>

                  <button
                    type="button"
                    className="mt-7 flex h-12 w-full items-center justify-between rounded-full bg-white px-5 text-[11px] font-semibold text-black"
                  >
                    Accept Proposal
                    <ArrowRight size={13} />
                  </button>

                  <Link
                    href="/shop/messages"
                    className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/15 text-[10px] font-semibold text-white/70"
                  >
                    <MessageSquareText size={12} />
                    Discuss Proposal
                  </Link>
                </>
              )}
            </div>

            {/* SNAPSHOT */}
            <div className="rounded-[20px] border border-black/[0.09] bg-white p-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                Proposal summary
              </p>

              <div className="mt-6 space-y-5">
                <SidebarInfo
                  icon={WalletCards}
                  label="Investment"
                  value={proposal.investment}
                />

                <SidebarInfo
                  icon={Clock3}
                  label="Delivery"
                  value={proposal.estimatedDelivery}
                />

                <SidebarInfo
                  icon={CalendarDays}
                  label="Valid until"
                  value={proposal.validUntil}
                />

                <SidebarInfo
                  icon={FileText}
                  label="Proposal"
                  value={proposal.id}
                />
              </div>
            </div>

            {/* SECURITY */}
            <div className="rounded-[20px] bg-[#e9e9e3] p-6">
              <ShieldCheck
                size={18}
                className="text-black/45"
              />

              <p className="mt-5 text-[12px] font-semibold">
                Your scope stays documented.
              </p>

              <p className="mt-2 text-[10px] leading-5 text-black/42">
                Accepted proposals should remain available in your
                workspace as the commercial record for the project.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* MOBILE ACCEPT BAR */}
      {ready && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.1] bg-white/95 p-3 backdrop-blur xl:hidden">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[9px] uppercase tracking-[0.12em] text-black/30">
                Investment
              </p>

              <p className="truncate text-[15px] font-semibold">
                {proposal.investment}
              </p>
            </div>

            <button
              type="button"
              className="inline-flex h-11 shrink-0 items-center gap-3 rounded-full bg-[#111] px-5 text-[11px] font-semibold text-white"
            >
              Accept Proposal
              <ArrowRight size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/30">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-[25px] font-semibold tracking-[-0.035em]">
        {title}
      </h2>

      <p className="mt-3 max-w-[650px] text-[11px] leading-5 text-black/43">
        {description}
      </p>
    </div>
  );
}

function DarkInfo({
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
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
        <Icon size={12} />
      </span>

      <div>
        <p className="text-[9px] uppercase tracking-[0.13em] text-white/30">
          {label}
        </p>

        <p className="mt-1 text-[11px] font-medium text-white/65">
          {value}
        </p>
      </div>
    </div>
  );
}

function SidebarInfo({
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

        <p className="mt-1.5 text-[11px] font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}

function ProposalStatusBadge({
  status,
}: {
  status: ProposalStatus;
}) {
  const config: Record<
    ProposalStatus,
    { label: string; className: string }
  > = {
    draft: {
      label: "Draft",
      className: "bg-black/[0.05] text-black/40",
    },
    ready: {
      label: "Ready for Review",
      className: "bg-[#111] text-white",
    },
    accepted: {
      label: "Accepted",
      className: "bg-[#e4eee7] text-[#42614a]",
    },
    declined: {
      label: "Declined",
      className: "bg-[#f2e7e3] text-[#7a5040]",
    },
    expired: {
      label: "Expired",
      className: "bg-black/[0.05] text-black/35",
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