"use client";

import Link from "next/link";
import {
  type ElementType,
  useState,
} from "react";
import { useRouter } from "next/navigation";

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
  Loader2,
  MessageSquareText,
  MoreHorizontal,
  Send,
  ReceiptText,
  RefreshCw,
  Rocket,
  WalletCards,
} from "lucide-react";

import type {
  ClientProject,
  ProjectActivity,
  ProjectFile,
  ProjectMessage,
  ProjectMessageSender,
  ProjectMessageType,
  ProjectOrder,
  ProjectPhase,
} from "@/lib/client/projects";

type Tab =
  | "overview"
  | "timeline"
  | "files"
  | "messages"
  | "payments";

type Props = {
  project: ClientProject;
  phases: ProjectPhase[];
  activities: ProjectActivity[];
  files: ProjectFile[];
  messages: ProjectMessage[];
  order: ProjectOrder | null;
};

const tabs: {
  id: Tab;
  label: string;
}[] = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "timeline",
    label: "Timeline",
  },
  {
    id: "files",
    label: "Files",
  },
  {
    id: "messages",
    label: "Messages",
  },
  {
    id: "payments",
    label: "Payments",
  },
];

// ======================================================
// HELPERS
// ======================================================

function formatMoney(
  amount: number
) {
  return new Intl.NumberFormat(
    "en-NG",
    {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }
  ).format(
    Number(amount || 0)
  );
}

function formatDate(
  value: string | null
) {
  if (!value) {
    return "Not set";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Not set";
  }

  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  ).format(date);
}

function formatActivityDate(
  value: string
) {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Recently";
  }

  return new Intl.DateTimeFormat(
    "en-NG",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
  ).format(date);
}

function formatLabel(
  value: string
) {
  return value
    .replace(/_/g, " ")
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
}

function clampProgress(
  progress: number
) {
  return Math.min(
    100,
    Math.max(
      0,
      Number(progress || 0)
    )
  );
}

function getCurrentPhase(
  phases: ProjectPhase[],
  project: ClientProject
) {
  if (
    project.current_phase_id
  ) {
    const current =
      phases.find(
        (phase) =>
          phase.id ===
          project.current_phase_id
      );

    if (current) {
      return current;
    }
  }

  return (
    phases.find(
      (phase) =>
        phase.status ===
          "in_progress" ||
        phase.status ===
          "current"
    ) ||
    phases[0] ||
    null
  );
}

function getPhaseState(
  status: string
):
  | "complete"
  | "current"
  | "upcoming" {
  const normalized =
    status.toLowerCase();

  if (
    normalized ===
      "completed" ||
    normalized ===
      "complete"
  ) {
    return "complete";
  }

  if (
    normalized ===
      "in_progress" ||
    normalized ===
      "current" ||
    normalized ===
      "active"
  ) {
    return "current";
  }

  return "upcoming";
}

// ======================================================
// MAIN WORKSPACE
// ======================================================

export default function ProjectWorkspace({
  project,
  phases,
  activities = [],
  files = [],
  messages = [],
  order,
}: Props) {
  const router = useRouter();
  const [
    activeTab,
    setActiveTab,
  ] =
    useState<Tab>(
      "overview"
    );

  const currentPhase =
    getCurrentPhase(
      phases,
      project
    );

  const progress =
    clampProgress(
      project.progress
    );

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 pb-20 sm:px-6 lg:px-8 lg:py-10">
      {/* BREADCRUMB */}

      <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
        <Link
          href="/shop"
          className="transition hover:text-black"
        >
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

        <span>
          {project.reference}
        </span>
      </div>

      {/* HEADER */}

      <section className="mt-8">
        <Link
          href="/shop/projects"
          className="inline-flex items-center gap-2 text-[11px] font-semibold text-black/40 transition hover:text-black"
        >
          <ArrowLeft
            size={13}
          />

          All projects
        </Link>

        <div className="mt-8 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/30">
                {
                  project.reference
                }
              </span>

              <ProjectStatusBadge
                status={
                  project.status
                }
              />
            </div>

            <h1 className="mt-5 text-[42px] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-[56px]">
              {project.title}
            </h1>

            <p className="mt-4 text-[11px] text-black/40">
              {formatLabel(
                project.service
              )}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("messages")}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-black/[0.1] bg-white px-4 text-[11px] font-semibold transition hover:border-black/25"
            >
              <MessageSquareText size={13} />
              Message Fynaro
            </button>

            <button
              type="button"
              aria-label="Project options"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.1] bg-white"
            >
              <MoreHorizontal
                size={16}
              />
            </button>
          </div>
        </div>
      </section>

      {/* TABS */}

      <section className="mt-9 border-b border-black/[0.09]">
        <div className="flex gap-7 overflow-x-auto">
          {tabs.map(
            (tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() =>
                  setActiveTab(
                    tab.id
                  )
                }
                className={[
                  "relative min-w-fit pb-4 text-[11px] font-semibold transition",

                  activeTab ===
                  tab.id
                    ? "text-black"
                    : "text-black/35 hover:text-black/60",
                ].join(" ")}
              >
                {tab.label}

                {activeTab ===
                  tab.id && (
                  <span className="absolute inset-x-0 bottom-0 h-[2px] bg-black" />
                )}
              </button>
            )
          )}
        </div>
      </section>

      {/* CONTENT */}

      <div className="pt-8">
        {activeTab ===
          "overview" && (
          <Overview
            project={
              project
            }
            phases={
              phases
            }
            activities={
              activities
            }
            order={
              order
            }
            currentPhase={
              currentPhase
            }
            progress={
              progress
            }
            onTimeline={() =>
              setActiveTab(
                "timeline"
              )
            }
          />
        )}

        {activeTab ===
          "timeline" && (
          <Timeline
            project={
              project
            }
            phases={
              phases
            }
            activities={
              activities
            }
            currentPhase={
              currentPhase
            }
            progress={
              progress
            }
          />
        )}

        {activeTab ===
          "files" && (
          <Files
            files={files}
          />
        )}

        {activeTab ===
          "messages" && (
          <Messages
            projectId={project.id}
            messages={messages}
            onRefresh={() => router.refresh()}
          />
        )}

        {activeTab ===
          "payments" && (
          <Payments
            project={
              project
            }
            order={
              order
            }
          />
        )}
      </div>
    </div>
  );
}

// ======================================================
// OVERVIEW
// ======================================================

function Overview({
  project,
  phases,
  activities,
  order,
  currentPhase,
  progress,
  onTimeline,
}: {
  project: ClientProject;
  phases: ProjectPhase[];
  activities: ProjectActivity[];
  order: ProjectOrder | null;
  currentPhase: ProjectPhase | null;
  progress: number;
  onTimeline: () => void;
}) {
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
                {progress}%
              </p>

              <p className="mt-4 text-[11px] text-white/40">
                Current phase ·{" "}
                {currentPhase
                  ?.title ||
                  "Preparing"}
              </p>
            </div>

            <div className="sm:text-right">
              <p className="text-[9px] uppercase tracking-[0.15em] text-white/30">
                Estimated
                delivery
              </p>

              <p className="mt-2 text-[13px] font-semibold">
                {formatDate(
                  project
                    .estimated_delivery
                )}
              </p>
            </div>
          </div>

          <div className="mt-8 h-[3px] overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-white transition-all"
              style={{
                width:
                  `${progress}%`,
              }}
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
                {currentPhase
                  ?.title ||
                  "Project preparation"}
              </h2>

              <p className="mt-4 max-w-[650px] text-[11px] leading-6 text-black/45">
                {currentPhase
                  ?.description ||
                  "Your project is being prepared. Updates will appear here as work progresses."}
              </p>
            </div>

            <div className="border-t border-black/[0.08] pt-6 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/30">
                Next Milestone
              </p>

              <p className="mt-3 text-[12px] font-semibold leading-5">
                {project
                  .next_milestone ||
                  "To be updated"}
              </p>

              <button
                type="button"
                onClick={
                  onTimeline
                }
                className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold"
              >
                View timeline

                <ArrowRight
                  size={11}
                />
              </button>
            </div>
          </div>
        </section>

        {/* TIMELINE PREVIEW */}

        <section className="rounded-[20px] border border-black/[0.09] bg-white p-6 sm:p-8">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
              Delivery
            </p>

            <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.035em]">
              Project timeline
            </h2>
          </div>

          {phases.length >
          0 ? (
            <div className="mt-8">
              {phases.map(
                (
                  phase,
                  index
                ) => (
                  <PhaseRow
                    key={
                      phase.id
                    }
                    phase={
                      phase
                    }
                    last={
                      index ===
                      phases.length -
                        1
                    }
                  />
                )
              )}
            </div>
          ) : (
            <EmptySection
              title="Timeline is being prepared"
              description="Project phases will appear here when the delivery plan is ready."
            />
          )}
        </section>

        {/* REAL PROJECT ACTIVITY */}

        <ProjectActivitySection
          project={
            project
          }
          activities={
            activities
          }
        />
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
                icon={
                  CalendarDays
                }
                label="Started"
                value={formatDate(
                  project.started_at
                )}
              />

              <SidebarItem
                icon={Clock3}
                label="Delivery"
                value={formatDate(
                  project
                    .estimated_delivery
                )}
              />

              <SidebarItem
                icon={
                  WalletCards
                }
                label="Investment"
                value={formatMoney(
                  project
                    .total_investment
                )}
              />

              <SidebarItem
                icon={
                  CheckCircle2
                }
                label="Order Payment"
                value={
                  order
                    ? formatLabel(
                        order.payment_status
                      )
                    : "Not available"
                }
              />
            </div>
          </section>

          <section className="rounded-[20px] bg-[#e9e9e3] p-6">
            <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
              Project References
            </p>

            <div className="mt-5 space-y-3">
              <ReferenceLink
                label="Request"
                value="View request"
                href={`/shop/requests/${project.request_id}`}
              />

              <ReferenceLink
                label="Proposal"
                value="View proposal"
                href={`/shop/proposals/${project.proposal_id}`}
              />

              {order && (
                <ReferenceLink
                  label="Order"
                  value={
                    order.reference
                  }
                  href={`/shop/orders/${order.id}`}
                />
              )}
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
              Keep project
              questions,
              decisions and
              updates attached
              to the work.
            </p>

            <Link
              href={`/shop/messages?project=${project.id}`}
              className="mt-6 flex h-10 items-center justify-between rounded-full bg-white px-4 text-[10px] font-semibold text-black"
            >
              Open Messages

              <ArrowRight
                size={11}
              />
            </Link>
          </section>
        </div>
      </aside>
    </div>
  );
}

// ======================================================
// PROJECT ACTIVITY
// ======================================================

function ProjectActivitySection({
  project,
  activities,
}: {
  project: ClientProject;
  activities: ProjectActivity[];
}) {
  const visibleActivities =
    activities.filter(
      (activity) =>
        activity.visible_to_client !==
        false
    );

  return (
    <section className="overflow-hidden rounded-[20px] border border-black/[0.09] bg-white">
      <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
            Project Activity
          </p>

          <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.035em]">
            What&apos;s happening
          </h2>
        </div>

        {visibleActivities.length >
          0 && (
          <p className="text-[9px] uppercase tracking-[0.14em] text-black/25">
            {
              visibleActivities.length
            }{" "}
            update
            {visibleActivities.length ===
            1
              ? ""
              : "s"}
          </p>
        )}
      </div>

      <div className="border-t border-black/[0.08]">
        {visibleActivities.length >
        0 ? (
          visibleActivities.map(
            (
              activity,
              index
            ) => (
              <ActivityRow
                key={
                  activity.id
                }
                activity={
                  activity
                }
                last={
                  index ===
                  visibleActivities.length -
                    1
                }
              />
            )
          )
        ) : (
          <div className="px-6 py-7 sm:px-8">
            <div className="flex gap-4">
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/[0.05]">
                <FolderOpen
                  size={13}
                />
              </span>

              <div>
                <p className="text-[11px] font-semibold">
                  Project created
                </p>

                <p className="mt-1.5 text-[10px] leading-5 text-black/40">
                  {
                    project.reference
                  }{" "}
                  entered the Fynaro
                  project workspace.
                </p>

                <p className="mt-2 text-[9px] text-black/30">
                  {formatDate(
                    project.created_at
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ActivityRow({
  activity,
  last,
}: {
  activity: ProjectActivity;
  last: boolean;
}) {
  return (
    <div
      className={[
        "px-6 py-6 sm:px-8",

        !last
          ? "border-b border-black/[0.07]"
          : "",
      ].join(" ")}
    >
      <div className="flex gap-4">
        <ActivityIcon
          type={
            activity.activity_type
          }
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold">
                {activity.title}
              </p>

              {activity.description && (
                <p className="mt-1.5 max-w-[700px] text-[10px] leading-5 text-black/40">
                  {
                    activity.description
                  }
                </p>
              )}
            </div>

            <span className="shrink-0 text-[9px] text-black/25">
              {formatActivityDate(
                activity.created_at
              )}
            </span>
          </div>

          <div className="mt-3">
            <span className="inline-flex rounded-full bg-black/[0.04] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-black/35">
              {formatLabel(
                activity.activity_type
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityIcon({
  type,
}: {
  type: string;
}) {
  const normalized =
    type.toLowerCase();

  let Icon: ElementType =
    RefreshCw;

  if (
    normalized ===
    "project_created"
  ) {
    Icon =
      FolderOpen;
  }

  if (
    normalized ===
      "phase_started" ||
    normalized ===
      "status_changed"
  ) {
    Icon =
      Rocket;
  }

  if (
    normalized ===
      "phase_completed" ||
    normalized ===
      "project_completed"
  ) {
    Icon =
      CheckCircle2;
  }

  if (
    normalized ===
      "progress_updated" ||
    normalized ===
      "milestone_updated" ||
    normalized ===
      "delivery_updated" ||
    normalized ===
      "project_updated"
  ) {
    Icon =
      RefreshCw;
  }

  if (
    normalized ===
    "payment_received"
  ) {
    Icon =
      WalletCards;
  }

  if (
    normalized ===
    "file_added"
  ) {
    Icon =
      FileText;
  }

  if (
    normalized ===
    "message_added"
  ) {
    Icon =
      MessageSquareText;
  }

  return (
    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/[0.05]">
      <Icon
        size={13}
      />
    </span>
  );
}

// ======================================================
// TIMELINE
// ======================================================

function Timeline({
  project,
  phases,
  activities,
  currentPhase,
  progress,
}: {
  project: ClientProject;
  phases: ProjectPhase[];
  activities: ProjectActivity[];
  currentPhase: ProjectPhase | null;
  progress: number;
}) {
  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        <section className="rounded-[20px] border border-black/[0.09] bg-white p-6 sm:p-8 lg:p-10">
          <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
            Project Delivery
          </p>

          <h2 className="mt-3 text-[30px] font-semibold tracking-[-0.04em]">
            From start to launch.
          </h2>

          <p className="mt-3 max-w-[620px] text-[11px] leading-5 text-black/40">
            Follow the major
            stages of the project
            and see where work
            currently stands.
          </p>

          {phases.length >
          0 ? (
            <div className="mt-10">
              {phases.map(
                (
                  phase,
                  index
                ) => (
                  <PhaseRow
                    key={
                      phase.id
                    }
                    phase={
                      phase
                    }
                    last={
                      index ===
                      phases.length -
                        1
                    }
                  />
                )
              )}
            </div>
          ) : (
            <EmptySection
              title="No phases yet"
              description="The project delivery timeline is still being prepared."
            />
          )}
        </section>

        <ProjectActivitySection
          project={
            project
          }
          activities={
            activities
          }
        />
      </div>

      <aside className="space-y-4">
        <div className="rounded-[20px] bg-[#111] p-6 text-white">
          <p className="text-[9px] uppercase tracking-[0.16em] text-white/30">
            Current
          </p>

          <h3 className="mt-4 text-[22px] font-semibold tracking-[-0.035em]">
            {currentPhase
              ?.title ||
              "Preparing"}
          </h3>

          <p className="mt-3 text-[10px] leading-5 text-white/40">
            {currentPhase
              ?.description ||
              project
                .next_milestone ||
              "Project setup is in progress."}
          </p>
        </div>

        <div className="rounded-[20px] bg-[#e9e9e3] p-6">
          <p className="text-[9px] uppercase tracking-[0.16em] text-black/30">
            Overall Progress
          </p>

          <p className="mt-3 text-[32px] font-semibold tracking-[-0.05em]">
            {progress}%
          </p>

          <div className="mt-5 h-[3px] bg-black/10">
            <div
              className="h-full bg-black"
              style={{
                width:
                  `${progress}%`,
              }}
            />
          </div>
        </div>
      </aside>
    </div>
  );
}

// ======================================================
// FILES
// ======================================================

function Files({
  files,
}: {
  files: ProjectFile[];
}) {
  return (
    <section className="overflow-hidden rounded-[20px] border border-black/[0.09] bg-white">
      <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
            Project Files
          </p>

          <h2 className="mt-3 text-[27px] font-semibold tracking-[-0.04em]">
            Everything attached
            to the build.
          </h2>

          <p className="mt-3 max-w-[520px] text-[10px] leading-5 text-black/40">
            Documents, designs,
            reports and
            deliverables shared
            with you by Fynaro.
          </p>
        </div>

        {files.length > 0 && (
          <span className="w-fit rounded-full bg-black/[0.05] px-3 py-2 text-[9px] font-semibold text-black/45">
            {files.length}{" "}
            {files.length === 1 ? "file" : "files"}
          </span>
        )}
      </div>

      <div className="border-t border-black/[0.08]">
        {files.length === 0 ? (
          <div className="grid min-h-[300px] place-items-center px-6 py-14 text-center">
            <div>
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/[0.05]">
                <FileText size={17} />
              </span>

              <h3 className="mt-5 text-[20px] font-semibold tracking-[-0.03em]">
                No project files yet
              </h3>

              <p className="mx-auto mt-2 max-w-[420px] text-[10px] leading-5 text-black/40">
                Documents, designs and
                deliverables shared with
                you will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div>
            {files.map((file) => (
              <ProjectFileRow
                key={file.id}
                file={file}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ======================================================
// PROJECT FILE ROW
// ======================================================

function ProjectFileRow({
  file,
}: {
  file: ProjectFile;
}) {
  return (
    <div className="group border-b border-black/[0.07] px-6 py-5 last:border-b-0 sm:px-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-black/[0.05] transition group-hover:bg-black/[0.08]">
            <FileText size={16} />
          </span>

          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold">
              {file.name}
            </p>

            {file.description && (
              <p className="mt-1.5 max-w-[600px] text-[10px] leading-5 text-black/40">
                {file.description}
              </p>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.11em] text-black/40">
                {formatLabel(file.category)}
              </span>

              <span className="text-[9px] text-black/30">
                {formatFileSize(file.file_size)}
              </span>

              <span className="text-[9px] text-black/30">
                {formatDate(file.created_at)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={file.signed_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-black/[0.1] bg-white px-4 text-[10px] font-semibold transition hover:bg-black hover:text-white"
          >
            Open
            <ArrowRight size={11} />
          </a>

          <a
            href={file.signed_url}
            download={file.original_name || file.name}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-[#111] px-4 text-[10px] font-semibold text-white transition hover:bg-black/80"
          >
            Download
            <ArrowRight
              size={11}
              className="rotate-90"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// FILE SIZE
// ======================================================

function formatFileSize(
  bytes: number | null
) {
  const size = Number(bytes || 0);

  if (size <= 0) {
    return "Size unavailable";
  }

  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  if (size < 1024 * 1024 * 1024) {
    return `${(
      size /
      (1024 * 1024)
    ).toFixed(1)} MB`;
  }

  return `${(
    size /
    (1024 * 1024 * 1024)
  ).toFixed(1)} GB`;
}


// ======================================================
// MESSAGES
// ======================================================

function Messages({
  projectId,
  messages,
  onRefresh,
}: {
  projectId: string;
  messages: ProjectMessage[];
  onRefresh: () => void;
}) {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState<ProjectMessageType>("message");
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function sendMessage() {
    const cleanMessage = message.trim();

    if (!cleanMessage) {
      setNotice({
        type: "error",
        message: "Write a message before sending.",
      });
      return;
    }

    if (cleanMessage.length > 10000) {
      setNotice({
        type: "error",
        message: "Message cannot exceed 10,000 characters.",
      });
      return;
    }

    setSending(true);
    setNotice(null);

    try {
      const response = await fetch(
        `/api/client/projects/${projectId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: cleanMessage,
            messageType,
          }),
        }
      );

      const data = await readMessageResponse(response);

      if (!response.ok) {
        throw new Error(
          getMessageResponseText(
            data,
            "Unable to send project message."
          )
        );
      }

      setMessage("");
      setMessageType("message");
      setNotice({
        type: "success",
        message: "Message sent to Fynaro.",
      });

      onRefresh();
    } catch (error) {
      setNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send project message.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_330px]">
      <section className="overflow-hidden rounded-[20px] border border-black/[0.09] bg-white">
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
              Project Messages
            </p>
            <h2 className="mt-3 text-[27px] font-semibold tracking-[-0.04em]">
              Conversation with Fynaro
            </h2>
            <p className="mt-3 max-w-[560px] text-[10px] leading-5 text-black/40">
              Keep questions, feedback and project decisions attached to this project.
            </p>
          </div>

          <span className="w-fit rounded-full bg-black/[0.05] px-3 py-2 text-[9px] font-semibold text-black/45">
            {messages.length} {messages.length === 1 ? "message" : "messages"}
          </span>
        </div>

        <div className="border-t border-black/[0.08]">
          {messages.length > 0 ? (
            <div className="max-h-[620px] overflow-y-auto">
              {messages.map((item) => (
                <ClientMessageRow key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="grid min-h-[280px] place-items-center px-6 py-12 text-center">
              <div>
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/[0.05]">
                  <MessageSquareText size={17} />
                </span>
                <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.03em]">
                  No messages yet
                </h3>
                <p className="mx-auto mt-2 max-w-[390px] text-[10px] leading-5 text-black/40">
                  Start the project conversation below. Replies and updates from Fynaro will appear here.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-black/[0.08] bg-black/[0.015] p-6 sm:p-8">
          {notice && (
            <div
              className={[
                "mb-5 rounded-[12px] border px-4 py-3 text-[10px]",
                notice.type === "success"
                  ? "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-700"
                  : "border-red-500/20 bg-red-500/[0.06] text-red-700",
              ].join(" ")}
            >
              {notice.message}
            </div>
          )}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-black/35">
                Send as
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {(
                  [
                    ["message", "Message"],
                    ["question", "Question"],
                    ["feedback", "Feedback"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setMessageType(value)}
                    className={[
                      "rounded-full px-3 py-2 text-[9px] font-semibold transition",
                      messageType === value
                        ? "bg-[#111] text-white"
                        : "border border-black/[0.09] bg-white text-black/45 hover:border-black/20",
                    ].join(" ")}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-[9px] text-black/30">
              {message.length.toLocaleString()} / 10,000
            </span>
          </div>

          <textarea
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
              if (notice) setNotice(null);
            }}
            maxLength={10000}
            rows={6}
            placeholder="Write a project message..."
            className="mt-5 w-full resize-y rounded-[16px] border border-black/[0.1] bg-white px-4 py-4 text-[11px] leading-6 outline-none placeholder:text-black/25 focus:border-black/30"
          />

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={sendMessage}
              disabled={sending || !message.trim()}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#111] px-5 text-[10px] font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              {sending ? (
                <Loader2 size={12} className="animate-spin" />
              ) : (
                <Send size={12} />
              )}
              {sending ? "Sending..." : "Send to Fynaro"}
            </button>
          </div>
        </div>
      </section>

      <aside className="space-y-4">
        <section className="rounded-[20px] bg-[#111] p-6 text-white">
          <MessageSquareText size={17} className="text-white/40" />
          <h3 className="mt-5 text-[17px] font-semibold tracking-[-0.025em]">
            Project communication
          </h3>
          <p className="mt-3 text-[10px] leading-5 text-white/40">
            Use this conversation for questions, feedback, approvals and decisions related to this project.
          </p>
        </section>

        <section className="rounded-[20px] bg-[#e9e9e3] p-6">
          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/30">
            Message Types
          </p>
          <div className="mt-5 space-y-4">
            <MessageTypeInfo title="Message" description="General project communication." />
            <MessageTypeInfo title="Question" description="Ask Fynaro something about the work." />
            <MessageTypeInfo title="Feedback" description="Share revisions, comments or approval feedback." />
          </div>
        </section>
      </aside>
    </div>
  );
}

function ClientMessageRow({ item }: { item: ProjectMessage }) {
  const sender = getMessageSender(item.sender);
  const fromFynaro = isFynaroSender(sender);
  const senderName =
    sender?.full_name ||
    sender?.company_name ||
    (fromFynaro ? "Fynaro" : "Client");

  return (
    <article className="border-b border-black/[0.07] px-6 py-6 last:border-b-0 sm:px-8">
      <div className="flex items-start gap-4">
        <span
          className={[
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
            fromFynaro
              ? "bg-[#111] text-white"
              : "bg-black/[0.05] text-black/55",
          ].join(" ")}
        >
          {getInitials(senderName)}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[11px] font-semibold">{senderName}</p>

              {fromFynaro && (
                <span className="rounded-full bg-[#111] px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.1em] text-white">
                  Fynaro
                </span>
              )}

              <span className="rounded-full bg-black/[0.04] px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.1em] text-black/35">
                {formatLabel(item.message_type)}
              </span>
            </div>

            <span className="shrink-0 text-[9px] text-black/25">
              {formatActivityDate(item.created_at)}
            </span>
          </div>

          <p className="mt-3 whitespace-pre-wrap break-words text-[11px] leading-6 text-black/55">
            {item.message}
          </p>

          {item.edited_at && (
            <p className="mt-2 text-[8px] uppercase tracking-[0.1em] text-black/25">
              Edited
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function MessageTypeInfo({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold">{title}</p>
      <p className="mt-1 text-[9px] leading-4 text-black/40">
        {description}
      </p>
    </div>
  );
}

function getMessageSender(
  sender: ProjectMessageSender | ProjectMessageSender[] | null
): ProjectMessageSender | null {
  if (Array.isArray(sender)) {
    return sender[0] || null;
  }
  return sender || null;
}

function isFynaroSender(sender: ProjectMessageSender | null) {
  const role = sender?.role?.toLowerCase() || "";

  return [
    "owner",
    "admin",
    "project_manager",
    "finance",
    "support",
  ].includes(role);
}

function getInitials(value: string) {
  const parts = value.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

async function readMessageResponse(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function getMessageResponseText(data: unknown, fallback: string) {
  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof (data as { message?: unknown }).message === "string"
  ) {
    return (data as { message: string }).message;
  }

  return fallback;
}

// ======================================================
// PAYMENTS
// ======================================================

function Payments({
  project,
  order,
}: {
  project: ClientProject;
  order: ProjectOrder | null;
}) {
  return (
    <div className="grid gap-8 xl:grid-cols-[1fr_340px]">
      <section className="overflow-hidden rounded-[20px] border border-black/[0.09] bg-white">
        <div className="p-6 sm:p-8">
          <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
            Project Payments
          </p>

          <h2 className="mt-3 text-[27px] font-semibold tracking-[-0.04em]">
            Payment overview
          </h2>
        </div>

        {order ? (
          <div className="border-t border-black/[0.08]">
            <div className="grid gap-5 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:px-8">
              <div>
                <p className="text-[9px] uppercase tracking-[0.13em] text-black/30">
                  Related order
                </p>

                <p className="mt-2 text-[12px] font-semibold">
                  {
                    order.reference
                  }
                </p>

                <p className="mt-1 text-[10px] text-black/35">
                  {formatLabel(
                    order.payment_status
                  )}
                </p>
              </div>

              <p className="text-[15px] font-semibold">
                {formatMoney(
                  order.total
                )}
              </p>
            </div>
          </div>
        ) : (
          <EmptySection
            title="Payment information unavailable"
            description="No related order was found for this project."
          />
        )}
      </section>

      <aside className="rounded-[20px] bg-[#111] p-6 text-white">
        <WalletCards
          size={17}
          className="text-white/40"
        />

        <p className="mt-6 text-[9px] uppercase tracking-[0.16em] text-white/30">
          Investment
        </p>

        <p className="mt-3 text-[31px] font-semibold tracking-[-0.05em]">
          {formatMoney(
            project
              .total_investment
          )}
        </p>

        <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
          <MoneyTextRow
            label="Order"
            value={
              order
                ?.reference ||
              "Not available"
            }
          />

          <MoneyTextRow
            label="Payment"
            value={
              order
                ? formatLabel(
                    order.payment_status
                  )
                : "Not available"
            }
          />

          <MoneyTextRow
            label="Project"
            value={formatLabel(
              project.status
            )}
          />
        </div>

        {order && (
          <Link
            href={`/shop/orders/${order.id}`}
            className="mt-7 flex h-11 items-center justify-between rounded-full bg-white px-4 text-[10px] font-semibold text-black"
          >
            View Order

            <ArrowRight
              size={11}
            />
          </Link>
        )}
      </aside>
    </div>
  );
}

// ======================================================
// PHASE ROW
// ======================================================

function PhaseRow({
  phase,
  last,
}: {
  phase: ProjectPhase;
  last: boolean;
}) {
  const state =
    getPhaseState(
      phase.status
    );

  const complete =
    state ===
    "complete";

  const current =
    state ===
    "current";

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
          <Check
            size={12}
          />
        ) : current ? (
          <Clock3
            size={12}
          />
        ) : (
          <Circle
            size={7}
          />
        )}
      </div>

      <div className="flex-1 pb-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p
              className={[
                "text-[12px] font-semibold",

                state ===
                "upcoming"
                  ? "text-black/35"
                  : "text-black",
              ].join(" ")}
            >
              {phase.title}
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-black/25">
              Phase{" "}
              {String(
                phase.position
              ).padStart(
                2,
                "0"
              )}
            </p>
          </div>

          {current && (
            <span className="rounded-full bg-[#111] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-white">
              Current
            </span>
          )}

          {complete && (
            <span className="rounded-full bg-[#e3ede6] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#42604a]">
              Complete
            </span>
          )}
        </div>

        <p
          className={[
            "mt-3 max-w-[650px] text-[10px] leading-5",

            state ===
            "upcoming"
              ? "text-black/28"
              : "text-black/42",
          ].join(" ")}
        >
          {phase.description ||
            "Project phase details will be updated as work progresses."}
        </p>

        {(phase.started_at ||
          phase.completed_at) && (
          <div className="mt-3 flex flex-wrap gap-4 text-[9px] text-black/30">
            {phase.started_at && (
              <span>
                Started{" "}
                {formatDate(
                  phase.started_at
                )}
              </span>
            )}

            {phase.completed_at && (
              <span>
                Completed{" "}
                {formatDate(
                  phase.completed_at
                )}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ======================================================
// STATUS BADGE
// ======================================================

function ProjectStatusBadge({
  status,
}: {
  status: string;
}) {
  const normalized =
    status.toLowerCase();

  let label =
    formatLabel(status);

  let className =
    "bg-black/[0.05] text-black/50";

  if (
    normalized ===
      "active" ||
    normalized ===
      "in_progress"
  ) {
    className =
      "bg-[#e3ede6] text-[#42604a]";
  }

  if (
    normalized ===
    "waiting_on_client"
  ) {
    label =
      "Waiting on You";

    className =
      "bg-[#f3e8e3] text-[#85533e]";
  }

  if (
    normalized ===
      "paused" ||
    normalized ===
      "on_hold"
  ) {
    className =
      "bg-[#eee9da] text-[#645c39]";
  }

  if (
    normalized ===
    "completed"
  ) {
    className =
      "bg-[#111] text-white";
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] ${className}`}
    >
      {label}
    </span>
  );
}

// ======================================================
// SIDEBAR ITEM
// ======================================================

function SidebarItem({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black/[0.05]">
        <Icon
          size={12}
        />
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

// ======================================================
// REFERENCE LINK
// ======================================================

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

      <ArrowRight
        size={11}
      />
    </Link>
  );
}

// ======================================================
// TEXT ROW
// ======================================================

function MoneyTextRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between gap-5">
      <span className="text-[10px] text-white/35">
        {label}
      </span>

      <span className="text-right text-[11px] font-semibold">
        {value}
      </span>
    </div>
  );
}

// ======================================================
// EMPTY SECTION
// ======================================================

function EmptySection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="grid min-h-[240px] place-items-center px-6 py-12 text-center">
      <div>
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-black/[0.05]">
          <ReceiptText
            size={15}
          />
        </span>

        <p className="mt-4 text-[12px] font-semibold">
          {title}
        </p>

        <p className="mx-auto mt-2 max-w-[390px] text-[10px] leading-5 text-black/35">
          {description}
        </p>
      </div>
    </div>
  );
} 