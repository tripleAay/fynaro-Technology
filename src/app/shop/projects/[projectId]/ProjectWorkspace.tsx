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
  MessageSquareText,
  MoreHorizontal,
  Upload,
  WalletCards,
} from "lucide-react";
import { useState } from "react";

import type {
  FynaroProject,
  PhaseStatus,
  ProjectPhase,
  ProjectStatus,
} from "@/lib/fynaro/data/projects";

type Tab =
  | "overview"
  | "timeline"
  | "files"
  | "messages"
  | "payments";

const tabs: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "timeline", label: "Timeline" },
  { id: "files", label: "Files" },
  { id: "messages", label: "Messages" },
  { id: "payments", label: "Payments" },
];

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

type ProjectWorkspaceProps = {
  project: FynaroProject;
};

export default function ProjectWorkspace({
  project,
}: ProjectWorkspaceProps) {
  const [activeTab, setActiveTab] =
    useState<Tab>("overview");

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

              <ProjectStatusBadge
                status={project.status}
              />
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
              href={`/shop/messages?project=${encodeURIComponent(
                project.id,
              )}`}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-black/[0.1] bg-white px-4 text-[11px] font-semibold transition hover:bg-[#f4f4ef]"
            >
              <MessageSquareText size={13} />
              Message Fynaro
            </Link>

            <button
              type="button"
              aria-label="More project options"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.1] bg-white transition hover:bg-[#f4f4ef]"
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

      <div className="pt-8">
        {activeTab === "overview" && (
          <Overview project={project} />
        )}

        {activeTab === "timeline" && (
          <Timeline project={project} />
        )}

        {activeTab === "files" && (
          <Files project={project} />
        )}

        {activeTab === "messages" && (
          <Messages project={project} />
        )}

        {activeTab === "payments" && (
          <Payments project={project} />
        )}
      </div>
    </div>
  );
}