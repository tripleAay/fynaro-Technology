import Link from "next/link";

import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CircleCheckBig,
  Clock3,
  FolderKanban,
  Search,
  WalletCards,
} from "lucide-react";

import {
  getAdminProjects,
  type AdminProject,
  type AdminProjectClient,
} from "@/lib/admin/project";

export const dynamic =
  "force-dynamic";

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

function getClient(
  project: AdminProject
): AdminProjectClient | null {
  if (
    Array.isArray(
      project.client
    )
  ) {
    return (
      project.client[0] ||
      null
    );
  }

  return (
    project.client ||
    null
  );
}

function statusClasses(
  status: string
) {
  const normalized =
    status.toLowerCase();

  if (
    normalized ===
    "completed"
  ) {
    return "border-emerald-500/20 bg-emerald-500/10 text-emerald-300";
  }

  if (
    normalized ===
      "active" ||
    normalized ===
      "in_progress"
  ) {
    return "border-[#d6cc6d]/30 bg-[#d6cc6d]/10 text-[#e8df8d]";
  }

  if (
    normalized ===
    "waiting_on_client"
  ) {
    return "border-blue-500/20 bg-blue-500/10 text-blue-300";
  }

  if (
    normalized ===
      "paused" ||
    normalized ===
      "on_hold"
  ) {
    return "border-orange-500/20 bg-orange-500/10 text-orange-300";
  }

  return "border-white/10 bg-white/[0.05] text-white/60";
}

// ======================================================
// CARD
// ======================================================

function ProjectCard({
  project,
}: {
  project: AdminProject;
}) {
  const client =
    getClient(project);

  const progress =
    Math.min(
      100,
      Math.max(
        0,
        Number(
          project.progress || 0
        )
      )
    );

  return (
    <Link
      href={`/admin/projects/${project.id}`}
      className="group block rounded-[26px] border border-white/[0.08] bg-[#111111] p-5 transition duration-300 hover:border-[#d6cc6d]/30 hover:bg-[#141414] sm:p-6"
    >
      <div className="flex h-full flex-col">
        {/* TOP */}

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#d6cc6d]">
                {
                  project.reference
                }
              </span>

              <span
                className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.11em] ${statusClasses(
                  project.status
                )}`}
              >
                {formatLabel(
                  project.status
                )}
              </span>
            </div>

            <h2 className="mt-4 truncate text-[20px] font-semibold tracking-[-0.035em] text-white">
              {project.title}
            </h2>

            <p className="mt-1 text-[11px] text-white/35">
              {formatLabel(
                project.service
              )}
            </p>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] text-white/35 transition group-hover:border-[#d6cc6d]/30 group-hover:text-[#d6cc6d]">
            <ArrowRight
              size={14}
            />
          </span>
        </div>

        {/* CLIENT */}

        <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/20 p-4">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/25">
            Client
          </p>

          <p className="mt-2 truncate text-[12px] font-semibold text-white/80">
            {client?.full_name ||
              client?.company_name ||
              "Fynaro Client"}
          </p>

          <p className="mt-1 truncate text-[10px] text-white/30">
            {client?.email ||
              "No email available"}
          </p>
        </div>

        {/* PROGRESS */}

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] text-white/35">
              Progress
            </span>

            <span className="text-[10px] font-semibold text-white">
              {progress}%
            </span>
          </div>

          <div className="h-[3px] overflow-hidden rounded-full bg-white/[0.08]">
            <div
              className="h-full bg-[#d6cc6d]"
              style={{
                width:
                  `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* INFO */}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-3.5">
            <div className="flex items-center gap-2 text-white/25">
              <WalletCards
                size={12}
              />

              <span className="text-[8px] font-semibold uppercase tracking-[0.12em]">
                Investment
              </span>
            </div>

            <p className="mt-2 text-[11px] font-semibold text-white/75">
              {formatMoney(
                project.total_investment
              )}
            </p>
          </div>

          <div className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-3.5">
            <div className="flex items-center gap-2 text-white/25">
              <CalendarDays
                size={12}
              />

              <span className="text-[8px] font-semibold uppercase tracking-[0.12em]">
                Delivery
              </span>
            </div>

            <p className="mt-2 text-[11px] font-semibold text-white/75">
              {formatDate(
                project.estimated_delivery
              )}
            </p>
          </div>
        </div>

        {/* MILESTONE */}

        <div className="mt-5 border-t border-white/[0.06] pt-4">
          <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/25">
            Next milestone
          </p>

          <p className="mt-1.5 line-clamp-2 text-[10px] leading-5 text-white/45">
            {project.next_milestone ||
              "No milestone set."}
          </p>
        </div>
      </div>
    </Link>
  );
}

// ======================================================
// PAGE
// ======================================================

type PageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
};

export default async function AdminProjectsPage({
  searchParams,
}: PageProps) {
  const params =
    await searchParams;

  const search =
    params.search?.trim() ||
    "";

  const status =
    params.status || "all";

  let projects:
    AdminProject[] = [];

  let error:
    string | null = null;

  try {
    projects =
      await getAdminProjects({
        search,
        status,
      });
  } catch (err) {
    console.error(
      "[ADMIN PROJECTS PAGE]",
      err
    );

    error =
      err instanceof Error
        ? err.message
        : "Unable to load projects.";
  }

  const total =
    projects.length;

  const active =
    projects.filter(
      (project) =>
        [
          "active",
          "in_progress",
        ].includes(
          project.status.toLowerCase()
        )
    ).length;

  const waiting =
    projects.filter(
      (project) =>
        project.status
          .toLowerCase() ===
        "waiting_on_client"
    ).length;

  const completed =
    projects.filter(
      (project) =>
        project.status
          .toLowerCase() ===
        "completed"
    ).length;

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        {/* HEADER */}

        <section className="border-b border-white/[0.07] pb-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#d6cc6d]">
                <FolderKanban
                  size={15}
                />

                <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">
                  Operations
                </span>
              </div>

              <h1 className="mt-4 text-[38px] font-semibold tracking-[-0.05em] sm:text-[48px]">
                Projects
              </h1>

              <p className="mt-3 max-w-2xl text-[11px] leading-6 text-white/35">
                Manage client
                delivery, phases,
                milestones and
                project progress
                across Fynaro.
              </p>
            </div>

            <Link
              href="/admin/requests"
              className="inline-flex h-11 w-fit items-center gap-2 rounded-full border border-white/[0.1] px-5 text-[10px] font-semibold text-white/65 transition hover:border-white/20 hover:text-white"
            >
              <BriefcaseBusiness
                size={13}
              />

              View Requests
            </Link>
          </div>
        </section>

        {/* STATS */}

        <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={
              FolderKanban
            }
            label="Projects"
            value={total}
          />

          <StatCard
            icon={Clock3}
            label="Active"
            value={active}
          />

          <StatCard
            icon={
              BriefcaseBusiness
            }
            label="Waiting"
            value={waiting}
          />

          <StatCard
            icon={
              CircleCheckBig
            }
            label="Completed"
            value={completed}
          />
        </section>

        {/* FILTERS */}

        <section className="mt-7 rounded-[22px] border border-white/[0.07] bg-[#101010] p-4">
          <form className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search
                size={14}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
              />

              <input
                type="search"
                name="search"
                defaultValue={
                  search
                }
                placeholder="Search project reference, title or service..."
                className="h-11 w-full rounded-xl border border-white/[0.07] bg-black/30 pl-11 pr-4 text-[11px] text-white outline-none placeholder:text-white/20 focus:border-[#d6cc6d]/35"
              />
            </div>

            <select
              name="status"
              defaultValue={
                status
              }
              className="h-11 rounded-xl border border-white/[0.07] bg-[#111] px-4 text-[11px] text-white/70 outline-none focus:border-[#d6cc6d]/35"
            >
              <option value="all">
                All statuses
              </option>

              <option value="preparing">
                Preparing
              </option>

              <option value="active">
                Active
              </option>

              <option value="waiting_on_client">
                Waiting on client
              </option>

              <option value="paused">
                Paused
              </option>

              <option value="completed">
                Completed
              </option>
            </select>

            <button
              type="submit"
              className="h-11 rounded-xl bg-[#d6cc6d] px-6 text-[10px] font-semibold text-black transition hover:opacity-90"
            >
              Apply
            </button>

            {(search ||
              status !==
                "all") && (
              <Link
                href="/admin/projects"
                className="flex h-11 items-center justify-center rounded-xl border border-white/[0.08] px-5 text-[10px] font-semibold text-white/45 transition hover:text-white"
              >
                Clear
              </Link>
            )}
          </form>
        </section>

        {/* CONTENT */}

        <section className="mt-7">
          {error ? (
            <div className="rounded-[24px] border border-red-500/20 bg-red-500/[0.06] p-6">
              <p className="text-[12px] font-semibold text-red-300">
                Projects could
                not be loaded.
              </p>

              <p className="mt-2 text-[10px] leading-5 text-red-200/55">
                {error}
              </p>
            </div>
          ) : projects.length ===
            0 ? (
            <div className="grid min-h-[430px] place-items-center rounded-[28px] border border-white/[0.07] bg-[#101010] px-6 py-14 text-center">
              <div className="max-w-md">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d6cc6d]/20 bg-[#d6cc6d]/[0.06] text-[#d6cc6d]">
                  <FolderKanban
                    size={23}
                  />
                </span>

                <h2 className="mt-6 text-[23px] font-semibold tracking-[-0.035em]">
                  {search ||
                  status !==
                    "all"
                    ? "No matching projects"
                    : "No projects yet"}
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-[10px] leading-5 text-white/35">
                  {search ||
                  status !==
                    "all"
                    ? "No project matches the current filters."
                    : "Projects will appear here after an accepted service order receives its commencement payment."}
                </p>

                {search ||
                status !==
                  "all" ? (
                  <Link
                    href="/admin/projects"
                    className="mt-6 inline-flex h-10 items-center rounded-full border border-white/[0.1] px-5 text-[10px] font-semibold text-white/60"
                  >
                    Clear filters
                  </Link>
                ) : (
                  <Link
                    href="/admin/orders"
                    className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-[#d6cc6d] px-5 text-[10px] font-semibold text-black"
                  >
                    View Orders

                    <ArrowRight
                      size={11}
                    />
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white/25">
                  {projects.length}{" "}
                  {projects.length ===
                  1
                    ? "project"
                    : "projects"}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {projects.map(
                  (project) => (
                    <ProjectCard
                      key={
                        project.id
                      }
                      project={
                        project
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
// STAT CARD
// ======================================================

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[20px] border border-white/[0.07] bg-[#101010] p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/25">
            {label}
          </p>

          <p className="mt-3 text-[26px] font-semibold tracking-[-0.04em]">
            {value}
          </p>
        </div>

        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.025] text-white/30">
          <Icon
            size={14}
          />
        </span>
      </div>
    </div>
  );
}