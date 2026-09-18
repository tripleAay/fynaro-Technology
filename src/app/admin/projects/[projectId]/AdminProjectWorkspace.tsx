"use client";

import Link from "next/link";
import type {
  ElementType,
  ReactNode,
} from "react";
import {
  useState,
  useTransition,
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
  FolderKanban,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  ReceiptText,
  Save,
  Trash2,
  Upload,
  UserRound,
  WalletCards,
} from "lucide-react";

import type {
  AdminProject,
  AdminProjectActivity,
  AdminProjectClient,
  AdminProjectFile,
  AdminProjectOrder,
  AdminProjectPaymentStage,
  AdminProjectPhase,
} from "@/lib/admin/project";

// ======================================================
// TYPES
// ======================================================

type Props = {
  project: AdminProject;

  phases: AdminProjectPhase[];

  activities: AdminProjectActivity[];

  order: AdminProjectOrder | null;

  paymentStages: AdminProjectPaymentStage[];

  files: AdminProjectFile[];
};

type ProjectForm = {
  status: string;
  progress: string;
  nextMilestone: string;
  estimatedDelivery: string;
};

type Notice =
  | {
      type: "success" | "error";
      message: string;
    }
  | null;

// ======================================================
// HELPERS
// ======================================================

function formatMoney(
  amount: number,
  currency = "NGN"
) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));
}

function formatDate(
  value: string | null
) {
  if (!value) {
    return "Not set";
  }

  const date = new Date(value);

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
  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
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

function toDateInput(
  value: string | null
) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  return date
    .toISOString()
    .slice(0, 10);
}

function formatLabel(
  value: string
) {
  if (!value) {
    return "";
  }

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

  return project.client || null;
}

function clampProgress(
  value: number
) {
  return Math.min(
    100,
    Math.max(
      0,
      Number(value || 0)
    )
  );
}

function getPhaseState(
  status: string
) {
  const normalized =
    status.toLowerCase();

  if (
    normalized === "completed" ||
    normalized === "complete"
  ) {
    return "completed";
  }

  if (
    normalized === "in_progress" ||
    normalized === "active"
  ) {
    return "in_progress";
  }

  return "upcoming";
}

function formatFileSize(value: number | null) {
  const bytes = Number(value || 0);

  if (!bytes) return "0 B";

  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );

  const amount = bytes / Math.pow(1024, index);

  return `${amount >= 10 || index === 0 ? amount.toFixed(0) : amount.toFixed(1)} ${units[index]}`;
}

// ======================================================
// WORKSPACE
// ======================================================

export default function AdminProjectWorkspace({
  project,
  phases,
  activities,
  order,
  paymentStages,
  files,
}: Props) {
  const router = useRouter();

  const [
    pending,
    startTransition,
  ] = useTransition();

  const [
    notice,
    setNotice,
  ] = useState<Notice>(null);

  const [
    phaseLoading,
    setPhaseLoading,
  ] = useState<string | null>(
    null
  );

  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadName, setUploadName] = useState("");
  const [uploadCategory, setUploadCategory] =
    useState<AdminProjectFile["category"]>("document");
  const [uploadDescription, setUploadDescription] = useState("");
  const [visibleToClient, setVisibleToClient] = useState(true);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);

  const [
    form,
    setForm,
  ] = useState<ProjectForm>({
    status: project.status,

    progress: String(
      project.progress ?? 0
    ),

    nextMilestone:
      project.next_milestone ||
      "",

    estimatedDelivery:
      toDateInput(
        project.estimated_delivery
      ),
  });

  const client =
    getClient(project);

  const progress =
    clampProgress(
      project.progress
    );

  const paidAmount =
    paymentStages
      .filter(
        (stage) =>
          stage.payment_status ===
          "paid"
      )
      .reduce(
        (total, stage) =>
          total +
          Number(
            stage.amount || 0
          ),
        0
      );

  const orderTotal =
    Number(
      order?.total ||
        project.total_investment ||
        0
    );

  const outstanding =
    Math.max(
      0,
      orderTotal - paidAmount
    );

  const currentPhase =
    phases.find(
      (phase) =>
        phase.id ===
        project.current_phase_id
    ) ||
    phases.find(
      (phase) =>
        getPhaseState(
          phase.status
        ) === "in_progress"
    ) ||
    null;

  // ====================================================
  // SAVE PROJECT
  // ====================================================

  async function saveProject() {
    setNotice(null);

    const progressValue =
      Number(form.progress);

    if (
      !Number.isFinite(
        progressValue
      ) ||
      progressValue < 0 ||
      progressValue > 100
    ) {
      setNotice({
        type: "error",
        message:
          "Progress must be between 0 and 100.",
      });

      return;
    }

    startTransition(
      async () => {
        try {
          const response =
            await fetch(
              `/api/admin/projects/${project.id}`,
              {
                method: "PATCH",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body:
                  JSON.stringify({
                    status:
                      form.status,

                    progress:
                      progressValue,

                    nextMilestone:
                      form.nextMilestone,

                    estimatedDelivery:
                      form.estimatedDelivery ||
                      null,
                  }),
              }
            );

          const data =
            await readJsonResponse(
              response
            );

          if (!response.ok) {
            throw new Error(
              getResponseMessage(
                data,
                "Unable to update project."
              )
            );
          }

          setNotice({
            type: "success",
            message:
              "Project updated successfully.",
          });

          router.refresh();
        } catch (error) {
          setNotice({
            type: "error",

            message:
              error instanceof Error
                ? error.message
                : "Unable to update project.",
          });
        }
      }
    );
  }

  // ====================================================
  // UPDATE PHASE
  // ====================================================

  async function updatePhase(
    phaseId: string,
    status: string
  ) {
    setNotice(null);

    setPhaseLoading(
      phaseId
    );

    try {
      const response =
        await fetch(
          `/api/admin/projects/${project.id}/phases/${phaseId}`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                status,
              }),
          }
        );

      const data =
        await readJsonResponse(
          response
        );

      if (!response.ok) {
        throw new Error(
          getResponseMessage(
            data,
            "Unable to update phase."
          )
        );
      }

      setNotice({
        type: "success",
        message:
          "Project phase updated.",
      });

      router.refresh();
    } catch (error) {
      setNotice({
        type: "error",

        message:
          error instanceof Error
            ? error.message
            : "Unable to update phase.",
      });
    } finally {
      setPhaseLoading(
        null
      );
    }
  }

  // ====================================================
  // PROJECT FILES
  // ====================================================

  async function uploadProjectFile() {
    setNotice(null);

    if (!uploadFile) {
      setNotice({ type: "error", message: "Choose a file to upload." });
      return;
    }

    if (uploadFile.size > 50 * 1024 * 1024) {
      setNotice({ type: "error", message: "File size cannot exceed 50 MB." });
      return;
    }

    setUploadingFile(true);

    try {
      const formData = new FormData();
      formData.append("file", uploadFile);
      formData.append("name", uploadName.trim() || uploadFile.name);
      formData.append("category", uploadCategory);
      formData.append("description", uploadDescription.trim());
      formData.append("visibleToClient", String(visibleToClient));

      const response = await fetch(
        `/api/admin/projects/${project.id}/files`,
        { method: "POST", body: formData }
      );

      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          getResponseMessage(data, "Unable to upload project file.")
        );
      }

      setUploadFile(null);
      setUploadName("");
      setUploadCategory("document");
      setUploadDescription("");
      setVisibleToClient(true);

      setNotice({ type: "success", message: "Project file uploaded successfully." });
      router.refresh();
    } catch (error) {
      setNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to upload project file.",
      });
    } finally {
      setUploadingFile(false);
    }
  }

  async function deleteProjectFile(file: AdminProjectFile) {
    const confirmed = window.confirm(
      `Delete “${file.name}”? This permanently removes the file from this project.`
    );

    if (!confirmed) return;

    setNotice(null);
    setDeletingFileId(file.id);

    try {
      const response = await fetch(
        `/api/admin/projects/${project.id}/files/${file.id}`,
        { method: "DELETE" }
      );

      const data = await readJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          getResponseMessage(data, "Unable to delete project file.")
        );
      }

      setNotice({ type: "success", message: "Project file deleted." });
      router.refresh();
    } catch (error) {
      setNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to delete project file.",
      });
    } finally {
      setDeletingFileId(null);
    }
  }

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-8 pb-20 sm:px-6 lg:px-8 lg:py-10">
      {/* BACK */}

      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-[10px] font-semibold text-black/40 transition hover:text-black"
      >
        <ArrowLeft
          size={12}
        />

        All projects
      </Link>

      {/* HEADER */}

      <section className="mt-7 border-b border-black/[0.08] pb-8">
        <div className="flex flex-col gap-7 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
                {project.reference}
              </span>

              <ProjectStatusBadge
                status={
                  project.status
                }
              />
            </div>

            <h1 className="mt-5 text-[40px] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-[54px]">
              {project.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-[10px] text-black/40">
              <span>
                {formatLabel(
                  project.service
                )}
              </span>

              {currentPhase && (
                <>
                  <span className="h-1 w-1 rounded-full bg-black/20" />

                  <span>
                    Current:{" "}
                    {currentPhase.title}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {order && (
              <Link
                href={`/admin/orders/${order.id}`}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-black/[0.1] bg-white px-5 text-[10px] font-semibold transition hover:border-black/20"
              >
                <ReceiptText
                  size={12}
                />

                {order.reference}
              </Link>
            )}

            <button
              type="button"
              onClick={
                saveProject
              }
              disabled={
                pending
              }
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#111] px-5 text-[10px] font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? (
                <Loader2
                  size={12}
                  className="animate-spin"
                />
              ) : (
                <Save
                  size={12}
                />
              )}

              {pending
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </div>
      </section>

      {/* NOTICE */}

      {notice && (
        <div
          className={[
            "mt-6 rounded-[14px] border px-4 py-3 text-[10px]",

            notice.type ===
            "success"
              ? "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-700"
              : "border-red-500/20 bg-red-500/[0.06] text-red-700",
          ].join(" ")}
        >
          {notice.message}
        </div>
      )}

      {/* TOP STATS */}

      <section className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Progress"
          value={`${progress}%`}
          icon={
            FolderKanban
          }
        />

        <Metric
          label="Investment"
          value={formatMoney(
            project.total_investment,
            order?.currency ||
              "NGN"
          )}
          icon={
            WalletCards
          }
        />

        <Metric
          label="Paid"
          value={formatMoney(
            paidAmount,
            order?.currency ||
              "NGN"
          )}
          icon={
            CheckCircle2
          }
        />

        <Metric
          label="Outstanding"
          value={formatMoney(
            outstanding,
            order?.currency ||
              "NGN"
          )}
          icon={Clock3}
        />
      </section>

      {/* MAIN */}

      <div className="mt-7 grid gap-7 xl:grid-cols-[minmax(0,1fr)_380px]">
        <main className="min-w-0 space-y-6">
          {/* PROJECT CONTROLS */}

          <section className="rounded-[22px] border border-black/[0.08] bg-white p-6 sm:p-8">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                Project Control
              </p>

              <h2 className="mt-3 text-[26px] font-semibold tracking-[-0.04em]">
                Delivery settings
              </h2>

              <p className="mt-2 max-w-xl text-[10px] leading-5 text-black/40">
                These values control
                the project's delivery
                state and the progress
                information shown in
                the client workspace.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {/* STATUS */}

              <Field
                label="Project Status"
              >
                <select
                  value={
                    form.status
                  }
                  onChange={(
                    event
                  ) =>
                    setForm(
                      (
                        current
                      ) => ({
                        ...current,

                        status:
                          event
                            .target
                            .value,
                      })
                    )
                  }
                  className="h-12 w-full rounded-[12px] border border-black/[0.1] bg-white px-4 text-[11px] outline-none transition focus:border-black/30"
                >
                  <option value="preparing">
                    Preparing
                  </option>

                  <option value="active">
                    Active
                  </option>

                  <option value="waiting_on_client">
                    Waiting on Client
                  </option>

                  <option value="paused">
                    Paused
                  </option>

                  <option value="completed">
                    Completed
                  </option>
                </select>
              </Field>

              {/* PROGRESS */}

              <Field
                label="Progress (%)"
              >
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={
                    form.progress
                  }
                  onChange={(
                    event
                  ) =>
                    setForm(
                      (
                        current
                      ) => ({
                        ...current,

                        progress:
                          event
                            .target
                            .value,
                      })
                    )
                  }
                  className="h-12 w-full rounded-[12px] border border-black/[0.1] bg-white px-4 text-[11px] outline-none transition focus:border-black/30"
                />
              </Field>

              {/* DELIVERY */}

              <Field
                label="Estimated Delivery"
              >
                <input
                  type="date"
                  value={
                    form.estimatedDelivery
                  }
                  onChange={(
                    event
                  ) =>
                    setForm(
                      (
                        current
                      ) => ({
                        ...current,

                        estimatedDelivery:
                          event
                            .target
                            .value,
                      })
                    )
                  }
                  className="h-12 w-full rounded-[12px] border border-black/[0.1] bg-white px-4 text-[11px] outline-none transition focus:border-black/30"
                />
              </Field>

              {/* MILESTONE */}

              <Field
                label="Next Milestone"
              >
                <input
                  type="text"
                  value={
                    form.nextMilestone
                  }
                  onChange={(
                    event
                  ) =>
                    setForm(
                      (
                        current
                      ) => ({
                        ...current,

                        nextMilestone:
                          event
                            .target
                            .value,
                      })
                    )
                  }
                  placeholder="e.g. Homepage design review"
                  className="h-12 w-full rounded-[12px] border border-black/[0.1] bg-white px-4 text-[11px] outline-none placeholder:text-black/25 focus:border-black/30"
                />
              </Field>
            </div>

            {/* VISUAL PROGRESS */}

            <div className="mt-8 rounded-[16px] bg-[#111] p-5 text-white">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.14em] text-white/35">
                  Client-visible
                  progress
                </span>

                <span className="text-[11px] font-semibold">
                  {clampProgress(
                    Number(
                      form.progress ||
                        0
                    )
                  )}
                  %
                </span>
              </div>

              <div className="mt-4 h-[3px] overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-[#d6cc6d] transition-all duration-300"
                  style={{
                    width: `${clampProgress(
                      Number(
                        form.progress ||
                          0
                      )
                    )}%`,
                  }}
                />
              </div>
            </div>
          </section>

          {/* PHASE MANAGEMENT */}

          <section className="rounded-[22px] border border-black/[0.08] bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                  Project Phases
                </p>

                <h2 className="mt-3 text-[26px] font-semibold tracking-[-0.04em]">
                  Delivery timeline
                </h2>

                <p className="mt-2 max-w-xl text-[10px] leading-5 text-black/40">
                  Move phases from
                  upcoming to current
                  and then complete
                  them as delivery
                  progresses.
                </p>
              </div>

              <span className="w-fit rounded-full bg-black/[0.05] px-3 py-1.5 text-[9px] font-semibold text-black/40">
                {phases.length}{" "}
                {phases.length === 1
                  ? "phase"
                  : "phases"}
              </span>
            </div>

            {phases.length >
            0 ? (
              <div className="mt-9">
                {phases.map(
                  (
                    phase,
                    index
                  ) => (
                    <PhaseControl
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
                      loading={
                        phaseLoading ===
                        phase.id
                      }
                      onChange={(
                        status
                      ) =>
                        updatePhase(
                          phase.id,
                          status
                        )
                      }
                    />
                  )
                )}
              </div>
            ) : (
              <EmptyState
                title="No phases"
                description="This project does not have a delivery timeline yet."
              />
            )}
          </section>

          {/* PROJECT FILES */}

          <section className="overflow-hidden rounded-[22px] border border-black/[0.08] bg-white">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                    Project Files
                  </p>
                  <h2 className="mt-3 text-[26px] font-semibold tracking-[-0.04em]">
                    Files & deliverables
                  </h2>
                  <p className="mt-2 max-w-xl text-[10px] leading-5 text-black/40">
                    Upload working documents, designs and final deliverables. Choose whether each file should appear in the client workspace.
                  </p>
                </div>

                <span className="w-fit rounded-full bg-black/[0.05] px-3 py-1.5 text-[9px] font-semibold text-black/40">
                  {files.length} {files.length === 1 ? "file" : "files"}
                </span>
              </div>

              <div className="mt-8 rounded-[18px] border border-black/[0.08] bg-black/[0.02] p-5 sm:p-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Choose File">
                    <input
                      type="file"
                      onChange={(event) => {
                        const nextFile = event.target.files?.[0] || null;
                        setUploadFile(nextFile);
                        if (nextFile && !uploadName.trim()) setUploadName(nextFile.name);
                      }}
                      className="block w-full rounded-[12px] border border-black/[0.1] bg-white px-3 py-3 text-[10px] file:mr-3 file:rounded-full file:border-0 file:bg-[#111] file:px-4 file:py-2 file:text-[9px] file:font-semibold file:text-white"
                    />
                  </Field>

                  <Field label="Display Name">
                    <input
                      type="text"
                      value={uploadName}
                      onChange={(event) => setUploadName(event.target.value)}
                      placeholder="e.g. Homepage Final Design"
                      className="h-12 w-full rounded-[12px] border border-black/[0.1] bg-white px-4 text-[11px] outline-none placeholder:text-black/25 focus:border-black/30"
                    />
                  </Field>

                  <Field label="Category">
                    <select
                      value={uploadCategory}
                      onChange={(event) =>
                        setUploadCategory(event.target.value as AdminProjectFile["category"])
                      }
                      className="h-12 w-full rounded-[12px] border border-black/[0.1] bg-white px-4 text-[11px] outline-none focus:border-black/30"
                    >
                      <option value="document">Document</option>
                      <option value="design">Design</option>
                      <option value="deliverable">Deliverable</option>
                      <option value="asset">Asset</option>
                      <option value="report">Report</option>
                      <option value="contract">Contract</option>
                      <option value="invoice">Invoice</option>
                      <option value="client_upload">Client Upload</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>

                  <Field label="Description">
                    <input
                      type="text"
                      value={uploadDescription}
                      onChange={(event) => setUploadDescription(event.target.value)}
                      placeholder="Optional note about this file"
                      className="h-12 w-full rounded-[12px] border border-black/[0.1] bg-white px-4 text-[11px] outline-none placeholder:text-black/25 focus:border-black/30"
                    />
                  </Field>
                </div>

                <div className="mt-5 flex flex-col gap-4 border-t border-black/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={visibleToClient}
                      onChange={(event) => setVisibleToClient(event.target.checked)}
                      className="h-4 w-4 accent-black"
                    />
                    <span>
                      <span className="block text-[10px] font-semibold">Visible to client</span>
                      <span className="mt-0.5 block text-[9px] text-black/35">Client can open and download this file.</span>
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={uploadProjectFile}
                    disabled={!uploadFile || uploadingFile}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#111] px-5 text-[10px] font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {uploadingFile ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Upload size={12} />
                    )}
                    {uploadingFile ? "Uploading..." : "Upload File"}
                  </button>
                </div>

                {uploadFile && (
                  <p className="mt-4 text-[9px] text-black/35">
                    Selected: {uploadFile.name} · {formatFileSize(uploadFile.size)}
                  </p>
                )}
              </div>
            </div>

            {files.length > 0 ? (
              <div className="border-t border-black/[0.08]">
                {files.map((file, index) => (
                  <div
                    key={file.id}
                    className={[
                      "grid gap-4 px-6 py-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center",
                      index !== files.length - 1 ? "border-b border-black/[0.07]" : "",
                    ].join(" ")}
                  >
                    <div className="flex min-w-0 items-start gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-black/[0.05] text-black/45">
                        <FileText size={14} />
                      </span>

                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold">{file.name}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-[8px] uppercase tracking-[0.08em] text-black/30">
                          <span>{formatLabel(file.category)}</span>
                          <span>·</span>
                          <span>{formatFileSize(file.file_size)}</span>
                          <span>·</span>
                          <span>{formatDate(file.created_at)}</span>
                        </div>
                        {file.description && (
                          <p className="mt-2 max-w-2xl text-[10px] leading-5 text-black/40">
                            {file.description}
                          </p>
                        )}
                        <div className="mt-3">
                          {file.visible_to_client ? (
                            <span className="rounded-full bg-emerald-500/[0.08] px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.1em] text-emerald-700">
                              Client Visible
                            </span>
                          ) : (
                            <span className="rounded-full bg-orange-500/10 px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.1em] text-orange-700">
                              Internal
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                      <a
                        href={file.signed_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 items-center gap-2 rounded-full border border-black/[0.1] px-4 text-[9px] font-semibold transition hover:border-black/25"
                      >
                        <ExternalLink size={10} /> Open
                      </a>

                      <a
                        href={file.signed_url}
                        download={file.original_name || file.name}
                        className="inline-flex h-9 items-center gap-2 rounded-full border border-black/[0.1] px-4 text-[9px] font-semibold transition hover:border-black/25"
                      >
                        <Download size={10} /> Download
                      </a>

                      <button
                        type="button"
                        onClick={() => deleteProjectFile(file)}
                        disabled={deletingFileId === file.id}
                        className="inline-flex h-9 items-center gap-2 rounded-full border border-red-500/15 px-4 text-[9px] font-semibold text-red-600 transition hover:bg-red-500/[0.05] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {deletingFileId === file.id ? (
                          <Loader2 size={10} className="animate-spin" />
                        ) : (
                          <Trash2 size={10} />
                        )}
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-t border-black/[0.08] px-6 pb-8 sm:px-8">
                <EmptyState
                  title="No project files"
                  description="Upload the first document, design or deliverable for this project."
                />
              </div>
            )}
          </section>

          {/* PROJECT ACTIVITY */}

          <section className="rounded-[22px] border border-black/[0.08] bg-white p-6 sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                  Activity
                </p>

                <h2 className="mt-3 text-[26px] font-semibold tracking-[-0.04em]">
                  Project history
                </h2>

                <p className="mt-2 max-w-xl text-[10px] leading-5 text-black/40">
                  A chronological
                  record of important
                  changes made
                  throughout this
                  project.
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-black/[0.05] px-3 py-1.5 text-[9px] font-semibold text-black/40">
                {activities.length}
              </span>
            </div>

            {activities.length >
            0 ? (
              <div className="mt-8">
                {activities.map(
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
                        activities.length -
                          1
                      }
                    />
                  )
                )}
              </div>
            ) : (
              <EmptyState
                title="No activity yet"
                description="Project updates will automatically appear here."
              />
            )}
          </section>

          {/* PAYMENT PLAN */}

          <section className="overflow-hidden rounded-[22px] border border-black/[0.08] bg-white">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                    Payment Plan
                  </p>

                  <h2 className="mt-3 text-[26px] font-semibold tracking-[-0.04em]">
                    Project payments
                  </h2>
                </div>

                {order && (
                  <PaymentBadge
                    status={
                      order.payment_status
                    }
                  />
                )}
              </div>
            </div>

            {paymentStages.length >
            0 ? (
              <div className="border-t border-black/[0.08]">
                {paymentStages.map(
                  (
                    stage,
                    index
                  ) => (
                    <div
                      key={
                        stage.id
                      }
                      className={[
                        "grid gap-5 px-6 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:px-8",

                        index !==
                        paymentStages.length -
                          1
                          ? "border-b border-black/[0.07]"
                          : "",
                      ].join(" ")}
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[11px] font-semibold">
                            {formatLabel(
                              stage.stage
                            )}
                          </p>

                          <PaymentBadge
                            status={
                              stage.payment_status
                            }
                          />
                        </div>

                        <p className="mt-2 text-[9px] text-black/35">
                          {stage.percentage}
                          % ·{" "}
                          {stage.trigger_label ||
                            `Stage ${stage.position}`}
                        </p>

                        {stage.paid_at && (
                          <p className="mt-1 text-[9px] text-black/30">
                            Paid{" "}
                            {formatDate(
                              stage.paid_at
                            )}
                          </p>
                        )}
                      </div>

                      <p className="text-[13px] font-semibold">
                        {formatMoney(
                          stage.amount,
                          order?.currency ||
                            "NGN"
                        )}
                      </p>
                    </div>
                  )
                )}
              </div>
            ) : (
              <div className="border-t border-black/[0.08] px-6 pb-8">
                <EmptyState
                  title="No payment stages"
                  description="No payment stages were found for this project."
                />
              </div>
            )}
          </section>
        </main>

        {/* SIDEBAR */}

        <aside className="min-w-0">
          <div className="space-y-4 xl:sticky xl:top-[100px]">
            {/* CLIENT */}

            <section className="rounded-[20px] border border-black/[0.08] bg-white p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/[0.05]">
                <UserRound
                  size={14}
                />
              </div>

              <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.15em] text-black/30">
                Client
              </p>

              <p className="mt-2 text-[15px] font-semibold">
                {client?.full_name ||
                  client?.company_name ||
                  "Fynaro Client"}
              </p>

              {client?.company_name &&
                client?.full_name && (
                  <p className="mt-1 text-[10px] text-black/35">
                    {
                      client.company_name
                    }
                  </p>
                )}

              <p className="mt-3 break-all text-[10px] text-black/35">
                {client?.email ||
                  "No email"}
              </p>

              {client?.phone && (
                <p className="mt-1 text-[10px] text-black/35">
                  {client.phone}
                </p>
              )}
            </section>

            {/* SUMMARY */}

            <section className="rounded-[20px] bg-[#e9e9e3] p-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/30">
                Project Summary
              </p>

              <div className="mt-6 space-y-5">
                <SummaryRow
                  icon={
                    CalendarDays
                  }
                  label="Started"
                  value={formatDate(
                    project.started_at
                  )}
                />

                <SummaryRow
                  icon={Clock3}
                  label="Delivery"
                  value={formatDate(
                    project.estimated_delivery
                  )}
                />

                <SummaryRow
                  icon={
                    FolderKanban
                  }
                  label="Current Phase"
                  value={
                    currentPhase?.title ||
                    "Not set"
                  }
                />

                <SummaryRow
                  icon={
                    WalletCards
                  }
                  label="Investment"
                  value={formatMoney(
                    project.total_investment,
                    order?.currency ||
                      "NGN"
                  )}
                />

                <SummaryRow
                  icon={
                    CheckCircle2
                  }
                  label="Payment"
                  value={
                    order
                      ? formatLabel(
                          order.payment_status
                        )
                      : "Unavailable"
                  }
                />
              </div>
            </section>

            {/* NEXT MILESTONE */}

            <section className="rounded-[20px] border border-black/[0.08] bg-white p-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/30">
                Next Milestone
              </p>

              <p className="mt-4 text-[13px] font-semibold leading-6">
                {project.next_milestone ||
                  "No milestone set"}
              </p>
            </section>

            {/* REFERENCES */}

            <section className="rounded-[20px] bg-[#111] p-6 text-white">
              <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-white/30">
                References
              </p>

              <div className="mt-5 space-y-2">
                <ReferenceLink
                  label="Request"
                  href={`/admin/requests/${project.request_id}`}
                />

                <ReferenceLink
                  label="Proposal"
                  href={`/admin/proposals/${project.proposal_id}`}
                />

                {order && (
                  <ReferenceLink
                    label={
                      order.reference
                    }
                    href={`/admin/orders/${order.id}`}
                  />
                )}
              </div>
            </section>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ======================================================
// SAFE RESPONSE HELPERS
// ======================================================

async function readJsonResponse(
  response: Response
): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function getResponseMessage(
  data: unknown,
  fallback: string
) {
  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof (
      data as {
        message?: unknown;
      }
    ).message === "string"
  ) {
    return (
      data as {
        message: string;
      }
    ).message;
  }

  return fallback;
}

// ======================================================
// FIELD
// ======================================================

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.14em] text-black/35">
        {label}
      </span>

      {children}
    </label>
  );
}

// ======================================================
// METRIC
// ======================================================

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[18px] border border-black/[0.08] bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-black/30">
            {label}
          </p>

          <p className="mt-3 truncate text-[19px] font-semibold tracking-[-0.035em]">
            {value}
          </p>
        </div>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/[0.05] text-black/40">
          <Icon
            size={13}
          />
        </span>
      </div>
    </div>
  );
}

// ======================================================
// PROJECT STATUS
// ======================================================

function ProjectStatusBadge({
  status,
}: {
  status: string;
}) {
  const normalized =
    status.toLowerCase();

  let className =
    "bg-black/[0.06] text-black/55";

  if (
    normalized === "active"
  ) {
    className =
      "bg-emerald-500/10 text-emerald-700";
  }

  if (
    normalized ===
    "waiting_on_client"
  ) {
    className =
      "bg-amber-500/10 text-amber-700";
  }

  if (
    normalized === "paused"
  ) {
    className =
      "bg-orange-500/10 text-orange-700";
  }

  if (
    normalized === "completed"
  ) {
    className =
      "bg-black text-white";
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.11em] ${className}`}
    >
      {formatLabel(
        status
      )}
    </span>
  );
}

// ======================================================
// PHASE CONTROL
// ======================================================

function PhaseControl({
  phase,
  last,
  loading,
  onChange,
}: {
  phase: AdminProjectPhase;
  last: boolean;
  loading: boolean;
  onChange: (
    status: string
  ) => void;
}) {
  const state =
    getPhaseState(
      phase.status
    );

  return (
    <div className="relative flex gap-5">
      {!last && (
        <div className="absolute left-[17px] top-9 h-[calc(100%-8px)] w-px bg-black/[0.09]" />
      )}

      <div
        className={[
          "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",

          state ===
          "completed"
            ? "bg-[#111] text-white"
            : state ===
                "in_progress"
              ? "border border-black bg-white"
              : "border border-black/[0.1] bg-white text-black/20",
        ].join(" ")}
      >
        {loading ? (
          <Loader2
            size={12}
            className="animate-spin"
          />
        ) : state ===
          "completed" ? (
          <Check
            size={12}
          />
        ) : state ===
          "in_progress" ? (
          <Clock3
            size={12}
          />
        ) : (
          <Circle
            size={7}
          />
        )}
      </div>

      <div className="min-w-0 flex-1 pb-9">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[12px] font-semibold">
                {phase.title}
              </p>

              <span className="rounded-full bg-black/[0.04] px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.1em] text-black/35">
                {formatLabel(
                  state
                )}
              </span>
            </div>

            <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-black/25">
              Phase{" "}
              {String(
                phase.position
              ).padStart(
                2,
                "0"
              )}
            </p>

            <p className="mt-3 max-w-xl text-[10px] leading-5 text-black/40">
              {phase.description ||
                "No phase description."}
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

          <select
            value={state}
            disabled={loading}
            onChange={(
              event
            ) =>
              onChange(
                event.target.value
              )
            }
            className="h-9 min-w-[145px] rounded-full border border-black/[0.1] bg-white px-3 text-[9px] font-semibold outline-none transition focus:border-black/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="upcoming">
              Upcoming
            </option>

            <option value="in_progress">
              In Progress
            </option>

            <option value="completed">
              Completed
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// ACTIVITY
// ======================================================

function ActivityRow({
  activity,
  last,
}: {
  activity: AdminProjectActivity;
  last: boolean;
}) {
  return (
    <div className="relative flex gap-4">
      {!last && (
        <div className="absolute left-[15px] top-8 h-[calc(100%-4px)] w-px bg-black/[0.08]" />
      )}

      <span className="relative z-10 flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white">
        <ActivityIcon
          type={
            activity.activity_type
          }
        />
      </span>

      <div className="min-w-0 flex-1 pb-7">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <p className="text-[11px] font-semibold">
            {activity.title}
          </p>

          <p className="shrink-0 text-[8px] uppercase tracking-[0.1em] text-black/25">
            {formatActivityDate(
              activity.created_at
            )}
          </p>
        </div>

        {activity.description && (
          <p className="mt-2 max-w-2xl text-[10px] leading-5 text-black/40">
            {
              activity.description
            }
          </p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-black/[0.04] px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.1em] text-black/30">
            {formatLabel(
              activity.activity_type
            )}
          </span>

          {activity.visible_to_client ? (
            <span className="rounded-full bg-emerald-500/[0.08] px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.1em] text-emerald-700">
              Client Visible
            </span>
          ) : (
            <span className="rounded-full bg-orange-500/10 px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.1em] text-orange-700">
              Internal
            </span>
          )}
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
  if (
    type ===
      "phase_completed" ||
    type ===
      "project_completed"
  ) {
    return (
      <Check
        size={10}
      />
    );
  }

  if (
    type ===
      "phase_started" ||
    type ===
      "progress_updated"
  ) {
    return (
      <Clock3
        size={10}
      />
    );
  }

  if (
    type ===
    "payment_received"
  ) {
    return (
      <WalletCards
        size={10}
      />
    );
  }

  if (
    type ===
    "project_created"
  ) {
    return (
      <FolderKanban
        size={10}
      />
    );
  }

  return (
    <Circle
      size={6}
    />
  );
}

// ======================================================
// PAYMENT BADGE
// ======================================================

function PaymentBadge({
  status,
}: {
  status: string;
}) {
  const normalized =
    status.toLowerCase();

  let className =
    "bg-black/[0.05] text-black/45";

  if (
    normalized === "paid"
  ) {
    className =
      "bg-emerald-500/10 text-emerald-700";
  }

  if (
    normalized ===
      "partially_paid" ||
    normalized ===
      "pending" ||
    normalized ===
      "processing"
  ) {
    className =
      "bg-amber-500/10 text-amber-700";
  }

  if (
    normalized === "failed"
  ) {
    className =
      "bg-red-500/10 text-red-700";
  }

  if (
    normalized ===
      "refunded" ||
    normalized ===
      "partially_refunded"
  ) {
    className =
      "bg-orange-500/10 text-orange-700";
  }

  return (
    <span
      className={`w-fit rounded-full px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] ${className}`}
    >
      {formatLabel(
        status
      )}
    </span>
  );
}

// ======================================================
// SUMMARY
// ======================================================

function SummaryRow({
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
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/60">
        <Icon
          size={12}
        />
      </span>

      <div className="min-w-0">
        <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-black/30">
          {label}
        </p>

        <p className="mt-1 break-words text-[10px] font-semibold">
          {value}
        </p>
      </div>
    </div>
  );
}

// ======================================================
// REFERENCE
// ======================================================

function ReferenceLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-[12px] border border-white/[0.08] px-4 py-3 text-[10px] font-semibold text-white/65 transition hover:border-white/20 hover:text-white"
    >
      <span className="truncate">
        {label}
      </span>

      <ArrowRight
        size={10}
        className="shrink-0"
      />
    </Link>
  );
}

// ======================================================
// EMPTY STATE
// ======================================================

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mt-8 rounded-[16px] bg-black/[0.03] px-5 py-10 text-center">
      <Clock3
        size={17}
        className="mx-auto text-black/20"
      />

      <p className="mt-4 text-[11px] font-semibold">
        {title}
      </p>

      <p className="mx-auto mt-2 max-w-sm text-[10px] leading-5 text-black/35">
        {description}
      </p>
    </div>
  );
}