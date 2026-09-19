"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ComponentType } from "react";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Globe2,
  Layers3,
  Palette,
  Plus,
  Smartphone,
} from "lucide-react";

import PremiumProductsShowcase from "@/components/dashboard components/hotstuffSections";

type Capability = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  priceLabel: string;
  price?: string;
  items: string[];
  icon: ComponentType<{
    size?: number;
    strokeWidth?: number;
  }>;
};

type BuildAction = {
  label: string;
  description: string;
  href: string;
  icon: ComponentType<{
    size?: number;
    strokeWidth?: number;
  }>;
};

const buildActions: BuildAction[] = [
  {
    label: "Website",
    description: "Business websites & commerce",
    href: "/shop/web-development",
    icon: Globe2,
  },
  {
    label: "Mobile App",
    description: "iOS, Android & cross-platform",
    href: "/shop/mobile",
    icon: Smartphone,
  },
  {
    label: "Digital Product",
    description: "Platforms, SaaS & systems",
    href: "/shop/product",
    icon: Layers3,
  },
  {
    label: "Not sure yet",
    description: "Tell us what you need",
    href: "/shop/requests/new",
    icon: CircleHelp,
  },
];

const capabilities: Capability[] = [
  {
    number: "01",
    eyebrow: "Web",
    title: "Web Development",
    description:
      "Websites built for businesses that expect more from the web.",
    href: "/shop/web-development",
    priceLabel: "From",
    price: "₦350,000",
    items: [
      "Business websites",
      "Ecommerce",
      "Web platforms",
    ],
    icon: Globe2,
  },
  {
    number: "02",
    eyebrow: "Mobile",
    title: "Mobile Apps",
    description:
      "Mobile experiences designed around users and real workflows.",
    href: "/shop/mobile",
    priceLabel: "Project based",
    items: [
      "iOS & Android",
      "Cross-platform",
      "Business apps",
    ],
    icon: Smartphone,
  },
  {
    number: "03",
    eyebrow: "Product",
    title: "Digital Products",
    description:
      "Platforms and software built around how your business works.",
    href: "/shop/product",
    priceLabel: "From",
    price: "₦1,500,000",
    items: [
      "SaaS products",
      "Dashboards",
      "Marketplaces",
    ],
    icon: Layers3,
  },
  {
    number: "04",
    eyebrow: "Design",
    title: "Design",
    description:
      "Brand and digital product design with clarity and purpose.",
    href: "/shop/design",
    priceLabel: "Explore services",
    items: [
      "Brand identity",
      "UI / UX",
      "Product design",
    ],
    icon: Palette,
  },
];

const startingPoints = [
  {
    eyebrow: "Launch",
    title: "Business Website",
    description:
      "A professional online presence built around credibility and enquiries.",
    price: "From ₦350,000",
    href: "/shop/web-development/launch",
  },
  {
    eyebrow: "Growth",
    title: "Commerce Website",
    description:
      "A more advanced web experience for selling and operating online.",
    price: "From ₦750,000",
    href: "/shop/web-development/growth",
  },
  {
    eyebrow: "Product",
    title: "Custom Platform",
    description:
      "A tailored product, portal or business system beyond a standard website.",
    price: "From ₦1,500,000",
    href: "/shop/product",
  },
];

type UnknownRecord = Record<string, unknown>;

type ClientProject = UnknownRecord & {
  id: string;
  title?: string;
  name?: string;
  service?: string;
  description?: string;
  status?: string;
  progress?: number;
  progress_percentage?: number;
  current_phase?: string;
  next_milestone?: string;
  updated_at?: string;
  created_at?: string;
};

type ActivityItem = {
  id: string;
  title: string;
  meta: string;
  value: string;
  href: string;
  createdAt: string;
};

const ACTIVE_STATUSES = new Set([
  "active",
  "in_progress",
  "in progress",
  "started",
  "development",
  "design",
  "review",
]);

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" ? (value as UnknownRecord) : {};
}

function asArray(payload: unknown, keys: string[]): UnknownRecord[] {
  if (Array.isArray(payload)) return payload.map(asRecord);
  const object = asRecord(payload);
  for (const key of keys) {
    if (Array.isArray(object[key])) return (object[key] as unknown[]).map(asRecord);
  }
  return [];
}

function text(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function numberValue(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function titleCase(value: string) {
  return value.replace(/[_-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function shortDate(value: string) {
  if (!value) return "Now";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Now"
    : new Intl.DateTimeFormat("en", { month: "short", day: "2-digit" }).format(date);
}

async function getJson(url: string, signal: AbortSignal) {
  const response = await fetch(url, {
    credentials: "include",
    cache: "no-store",
    signal,
    headers: { Accept: "application/json" },
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(text(asRecord(body).message, `Request failed (${response.status})`));
  return body;
}

export default function FynaroDashboardPage() {
  const [profile, setProfile] = useState<UnknownRecord>({});
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [proposals, setProposals] = useState<UnknownRecord[]>([]);
  const [payments, setPayments] = useState<UnknownRecord[]>([]);
  const [notifications, setNotifications] = useState<UnknownRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async (signal: AbortSignal) => {
    setError("");
    const endpoints = [
      ["profile", "/api/client/profile"],
      ["projects", "/api/client/projects"],
      ["proposals", "/api/client/proposals"],
      ["payments", "/api/client/payments"],
      ["notifications", "/api/client/notifications"],
    ] as const;

    const results = await Promise.allSettled(
      endpoints.map(([, url]) => getJson(url, signal))
    );
    if (signal.aborted) return;

    const data = new Map<string, unknown>();
    results.forEach((result, index) => {
      if (result.status === "fulfilled") data.set(endpoints[index][0], result.value);
    });

    const profilePayload = asRecord(data.get("profile"));
    setProfile(asRecord(profilePayload.profile ?? profilePayload.user ?? profilePayload.data));
    setProjects(asArray(data.get("projects"), ["projects", "data"]) as ClientProject[]);
    setProposals(asArray(data.get("proposals"), ["proposals", "data"]));
    setPayments(asArray(data.get("payments"), ["payments", "data"]));
    setNotifications(asArray(data.get("notifications"), ["notifications", "data"]));

    if (results.every((result) => result.status === "rejected")) {
      setError("Fynaro could not load your workspace. Please refresh the page.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadDashboard(controller.signal);
    return () => controller.abort();
  }, [loadDashboard]);

  const activeProjects = useMemo(
    () => projects.filter((project) => ACTIVE_STATUSES.has(text(project.status).toLowerCase())),
    [projects]
  );
  const featuredProject = activeProjects[0] ?? projects[0] ?? null;
  const firstName = text(profile.full_name ?? profile.name, "Fynaro Client").split(" ")[0];

  const attentionItems = useMemo(() => {
    const items: ActivityItem[] = [];
    proposals
      .filter((proposal) => ["sent", "ready", "pending", "awaiting_client"].includes(text(proposal.status).toLowerCase()))
      .slice(0, 2)
      .forEach((proposal, index) => items.push({
        id: text(proposal.id, `proposal-${index}`),
        title: "Proposal ready",
        meta: text(proposal.title ?? proposal.service, "Review your Fynaro proposal"),
        value: "Review proposal",
        href: "/shop/proposals",
        createdAt: text(proposal.updated_at ?? proposal.created_at),
      }));
    return items;
  }, [proposals]);

  const activity = useMemo(() => {
    const items: ActivityItem[] = [];
    payments.forEach((payment, index) => items.push({
      id: `payment-${text(payment.id, String(index))}`,
      title: text(payment.status).toLowerCase() === "paid" ? "Payment received" : "Payment updated",
      meta: text(payment.title ?? payment.reference ?? payment.order_reference, "Fynaro payment"),
      value: payment.amount == null
        ? titleCase(text(payment.status, "Updated"))
        : new Intl.NumberFormat("en-NG", { style: "currency", currency: text(payment.currency, "NGN"), maximumFractionDigits: 0 }).format(numberValue(payment.amount)),
      href: "/shop/payments",
      createdAt: text(payment.updated_at ?? payment.created_at),
    }));
    notifications.forEach((notification, index) => items.push({
      id: `notification-${text(notification.id, String(index))}`,
      title: text(notification.title, "Workspace update"),
      meta: text(notification.message, "A new Fynaro update is available"),
      value: notification.read_at ? "Viewed" : "New",
      href: text(notification.href, "/notifications"),
      createdAt: text(notification.created_at),
    }));
    projects.forEach((project) => items.push({
      id: `project-${project.id}`,
      title: "Project updated",
      meta: text(project.title ?? project.name, "Fynaro project"),
      value: titleCase(text(project.status, "Updated")),
      href: `/shop/projects/${project.id}`,
      createdAt: text(project.updated_at ?? project.created_at),
    }));
    return items.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()).slice(0, 6);
  }, [notifications, payments, projects]);

  return (
    <div className="mx-auto w-full max-w-[1460px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="border-b border-black/[0.08] pb-9 lg:pb-11">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35">
            Fynaro / Client Workspace
          </p>

          <span className="text-[10px] font-medium text-black/30">
            Your digital workspace
          </span>
        </div>

        <div className="mt-6 grid gap-8 xl:grid-cols-[1fr_410px] xl:items-end">
          <div>
            <p className="mb-3 text-[12px] font-medium text-black/45">
              Welcome back, {firstName}.
            </p>

            <h1 className="max-w-[760px] text-[42px] font-semibold leading-[0.94] tracking-[-0.055em] sm:text-[54px] lg:text-[66px]">
              What are we
              <br />
              building?
            </h1>
          </div>

          <div className="xl:pb-1">
            <p className="max-w-[390px] text-[13px] leading-6 text-black/48">
              Choose what you want to build, or continue where
              you left off.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Link
                href="/shop/requests/new"
                className="inline-flex h-10 items-center gap-2.5 rounded-full bg-[#111] px-4 text-[11px] font-semibold text-white transition hover:bg-black/80"
              >
                <Plus size={14} />
                Start a project
              </Link>

              <a
                href="#capabilities"
                className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-[11px] font-semibold text-black/45 transition hover:text-black"
              >
                Explore services
                <ArrowDown size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* BUILD ACTIONS */}

        <div className="mt-8 grid overflow-hidden rounded-[17px] border border-black/[0.08] bg-black/[0.07] sm:grid-cols-2 xl:grid-cols-4">
          {buildActions.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className="group flex min-h-[105px] items-center gap-3 bg-white p-4 transition duration-200 hover:bg-[#f7f7f3] sm:p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/[0.035] transition group-hover:bg-[#111] group-hover:text-white">
                  <Icon
                    size={15}
                    strokeWidth={1.6}
                  />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[12px] font-semibold">
                      {item.label}
                    </p>

                    <ArrowUpRight
                      size={12}
                      className="text-black/25 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black"
                    />
                  </div>

                  <p className="mt-1.5 text-[9px] leading-4 text-black/38">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* WORKSPACE                                                          */}
      {/* ------------------------------------------------------------------ */}

      <section className="py-9 lg:py-11">
        <SectionHeader
          eyebrow="Your workspace"
          title={loading ? "Loading projects…" : `${activeProjects.length} active ${activeProjects.length === 1 ? "project" : "projects"}`}
          href="/shop/projects"
          linkLabel="View all"
        />

        <div className="mt-5 grid gap-3 xl:grid-cols-[1.55fr_.75fr]">
          {/* MAIN PROJECT */}

          {featuredProject ? <Link
            href={`/shop/projects/${featuredProject.id}`}
            className="group rounded-[18px] border border-black/[0.09] bg-white p-5 transition hover:border-black/20 sm:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/30">
                  {text(featuredProject.service ?? featuredProject.project_type, "Fynaro Project")}
                </p>

                <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em]">
                  {text(featuredProject.title ?? featuredProject.name, "Untitled project")}
                </h3>

                <p className="mt-1 text-[11px] text-black/40">
                  {text(featuredProject.description, "Your Fynaro project workspace")}
                </p>
              </div>

              <StatusBadge label={titleCase(text(featuredProject.status, "Active"))} />
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-black/40">
                  Project progress
                </span>

                <span className="font-semibold">
                  {Math.min(100, Math.max(0, numberValue(featuredProject.progress_percentage ?? featuredProject.progress)))}%
                </span>
              </div>

              <div className="mt-2.5 h-[4px] overflow-hidden rounded-full bg-black/[0.07]">
                <div className="h-full rounded-full bg-[#111]" style={{ width: `${Math.min(100, Math.max(0, numberValue(featuredProject.progress_percentage ?? featuredProject.progress)))}%` }} />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-black/[0.07] pt-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.14em] text-black/30">
                  Next milestone
                </p>

                <p className="mt-1.5 text-[12px] font-medium">
                  {text(featuredProject.next_milestone ?? featuredProject.current_phase, "Project team will post the next milestone")}
                </p>
              </div>

              <span className="flex items-center gap-2 text-[11px] font-semibold">
                Open project

                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </Link> : <div className="rounded-[18px] border border-dashed border-black/15 bg-white p-6">
            <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/30">Your projects</p>
            <h3 className="mt-3 text-[21px] font-semibold tracking-[-0.035em]">No active project yet</h3>
            <p className="mt-2 max-w-md text-[11px] leading-5 text-black/45">When Fynaro starts your project, its live status, progress and next milestone will appear here.</p>
            <Link href="/shop/requests/new" className="mt-6 inline-flex h-9 items-center gap-2 rounded-full bg-[#111] px-4 text-[10px] font-semibold text-white">Start a project <ArrowRight size={12} /></Link>
          </div>}

          {/* NEEDS ATTENTION */}

          <div className="rounded-[18px] bg-[#111] p-5 text-white sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-white/35">
                  Needs attention
                </p>

                <h3 className="mt-3 text-[21px] font-semibold tracking-[-0.035em]">
                  {attentionItems.length} pending {attentionItems.length === 1 ? "item" : "items"}
                </h3>
              </div>

              <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                {attentionItems.length}
              </span>
            </div>

            <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {attentionItems.length ? attentionItems.map((item) => <AttentionItem key={item.id} href={item.href} title={item.title} meta={item.meta} />) : <p className="py-5 text-[11px] text-white/45">You&apos;re all caught up.</p>}
            </div>

            <Link
              href="/shop/projects"
              className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold text-white/50 transition hover:text-white"
            >
              View everything
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* HOT STUFF                                                          */}
      {/* ------------------------------------------------------------------ */}

      <section className="border-t border-black/[0.08] py-9 lg:py-11">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d6cc6d]" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
                Hot Stuff
              </p>
            </div>

            <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.04em] sm:text-[31px]">
              Worth a look.
            </h2>
          </div>

          <p className="max-w-[400px] text-[11px] leading-5 text-black/42 sm:text-right">
            Selected products and Fynaro picks available
            right now.
          </p>
        </div>

        <PremiumProductsShowcase />
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CAPABILITIES                                                       */}
      {/* ------------------------------------------------------------------ */}

      <section
        id="capabilities"
        className="border-t border-black/[0.08] py-9 lg:py-11"
      >
        <SectionHeading
          eyebrow="Capabilities"
          title="Build with Fynaro."
          description="Choose what you're trying to create and we'll take you into the right scope."
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {capabilities.map((capability) => (
            <CapabilityCard
              key={capability.title}
              capability={capability}
            />
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* POPULAR STARTING POINTS                                            */}
      {/* ------------------------------------------------------------------ */}

      <section className="border-t border-black/[0.08] py-9 lg:py-11">
        <SectionHeading
          eyebrow="Popular starting points"
          title="Start with a clear scope."
          description="Three common ways businesses begin working with Fynaro."
        />

        <div className="mt-6 grid overflow-hidden rounded-[18px] border border-black/[0.08] bg-black/[0.07] lg:grid-cols-3">
          {startingPoints.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex min-h-[175px] flex-col bg-white p-5 transition hover:bg-[#f7f7f3] sm:p-6"
            >
              <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-black/28">
                {item.eyebrow}
              </p>

              <h3 className="mt-2 text-[16px] font-semibold tracking-[-0.025em]">
                {item.title}
              </h3>

              <p className="mt-2 max-w-[340px] text-[10px] leading-5 text-black/40">
                {item.description}
              </p>

              <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                <span className="text-[11px] font-semibold text-black/55">
                  {item.price}
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 transition-all group-hover:bg-black group-hover:text-white">
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* GUIDANCE                                                           */}
      {/* ------------------------------------------------------------------ */}

      <section className="border-t border-black/[0.08] py-9 lg:py-11">
        <div className="grid overflow-hidden rounded-[20px] bg-[#edede7] lg:grid-cols-[1.45fr_.55fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
              Need direction?
            </p>

            <h2 className="mt-4 max-w-[620px] text-[30px] font-semibold leading-[1] tracking-[-0.045em] sm:text-[36px]">
              Tell us what you&apos;re trying to make happen.
            </h2>

            <p className="mt-4 max-w-[500px] text-[12px] leading-6 text-black/48">
              You don&apos;t need to know the technical solution.
              Describe the business problem or idea and we&apos;ll
              help shape the right approach.
            </p>

            <Link
              href="/shop/requests/new"
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-full bg-[#111] px-4 text-[11px] font-semibold text-white transition hover:bg-black/80"
            >
              Tell us about your idea
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="relative hidden border-l border-black/[0.07] lg:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full border border-black/[0.1]">
                <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#111] text-white">
                  <ArrowUpRight
                    size={22}
                    strokeWidth={1.3}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ACTIVITY                                                           */}
      {/* ------------------------------------------------------------------ */}

      <section className="border-t border-black/[0.08] py-9 lg:py-11">
        <SectionHeader
          eyebrow="Workspace"
          title="Recent activity"
        />

        <div className="mt-5">
          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-[11px] text-red-700">{error}</p>}
          {!loading && !activity.length && !error && <p className="border-t border-black/[0.07] py-5 text-[11px] text-black/40">Your latest Fynaro updates will appear here.</p>}
          {activity.map((item) => (
            <Link
              href={item.href}
              key={item.id}
              className="grid gap-1.5 border-t border-black/[0.07] py-4 sm:grid-cols-[75px_1.2fr_1fr_auto] sm:items-center"
            >
              <span className="text-[9px] font-medium uppercase tracking-[0.1em] text-black/30">
                {shortDate(item.createdAt)}
              </span>

              <p className="text-[12px] font-semibold">
                {item.title}
              </p>

              <p className="text-[11px] text-black/40">
                {item.meta}
              </p>

              <p className="text-[11px] font-medium text-black/55">
                {item.value}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CAPABILITY CARD                                                            */
/* -------------------------------------------------------------------------- */

function CapabilityCard({
  capability,
}: {
  capability: Capability;
}) {
  const Icon = capability.icon;

  return (
    <Link
      href={capability.href}
      className="group flex min-h-[270px] flex-col rounded-[18px] border border-black/[0.08] bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-black/15 hover:bg-[#f8f8f4]"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/[0.035]">
          <Icon
            size={14}
            strokeWidth={1.6}
          />
        </div>

        <span className="text-[9px] font-semibold text-black/25">
          {capability.number}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-black/30">
          {capability.eyebrow}
        </p>

        <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.035em]">
          {capability.title}
        </h3>

        <p className="mt-2.5 text-[11px] leading-5 text-black/45">
          {capability.description}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {capability.items.map((item) => (
          <span
            key={item}
            className="rounded-full bg-black/[0.035] px-2.5 py-1 text-[9px] font-medium text-black/45"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <div>
          <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-black/30">
            {capability.priceLabel}
          </p>

          {capability.price && (
            <p className="mt-1 text-[16px] font-semibold tracking-[-0.03em]">
              {capability.price}
            </p>
          )}
        </div>

        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111] text-white transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          <ArrowUpRight size={13} />
        </span>
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* ATTENTION ITEM                                                             */
/* -------------------------------------------------------------------------- */

function AttentionItem({
  href,
  title,
  meta,
}: {
  href: string;
  title: string;
  meta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-4 py-4"
    >
      <div>
        <p className="text-[11px] font-medium">
          {title}
        </p>

        <p className="mt-1 text-[10px] text-white/40">
          {meta}
        </p>
      </div>

      <ChevronRight
        size={14}
        className="text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-white"
      />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION HEADING                                                            */
/* -------------------------------------------------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="grid gap-3 lg:grid-cols-2 lg:items-end">
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
          {eyebrow}
        </p>

        <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.04em] sm:text-[31px]">
          {title}
        </h2>
      </div>

      <p className="max-w-[390px] text-[11px] leading-5 text-black/42 lg:justify-self-end">
        {description}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION HEADER                                                             */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  eyebrow,
  title,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-5">
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
          {eyebrow}
        </p>

        <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.035em]">
          {title}
        </h2>
      </div>

      {href && linkLabel && (
        <Link
          href={href}
          className="flex items-center gap-2 text-[10px] font-semibold text-black/40 transition hover:text-black"
        >
          {linkLabel}
          <ArrowRight size={13} />
        </Link>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STATUS                                                                     */
/* -------------------------------------------------------------------------- */

function StatusBadge({
  label,
}: {
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#edf4ed] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.12em] text-[#315d38]">
      <CheckCircle2 size={10} />
      {label}
    </span>
  );
}



// "use client";

// import { useState, useEffect } from "react";
// import DashboardHeader from "../../components/dashboard components/mainheader";
// import HeroSlider from "../../components/dashboard components/mainheroe";
// import Collections from "../../components/dashboard components/collections";
// import ProductTileGrid from "@/components/dashboard components/ProductTileGridMirror";
// import HotStuffSection from "../../components/dashboard components/hotstuffSections";
// import Footer from "../../components/footer";
// import ExploreByCategorySection from "@/components/dashboard components/exploreByCategorySection";
// import HowItWorksSection from "@/components/dashboard components/howItWorksSection";
// import ProjectModeCTA from "../../components/dashboard components/projectModeCTA";

// const dashboardCategories = [
//   {
//     id: "web-services",
//     name: "Web & Mobile App",
//     image: "/categories/web.png",
//     description:
//       "High-performance websites, mobile apps and digital product experiences crafted to position your brand with clarity, speed and premium execution.",
//     badge: "Digital Build",
//   },
//   {
//     id: "services",
//     name: "Services",
//     image: "/categories/design.png",
//     description:
//       "Explore Fynaro’s service offers, pricing and execution options across websites, design, product support and brand-focused solutions for serious businesses.",
//     badge: "Pricing & Offers",
//   },
//   {
//     id: "printed-products",
//     name: "Printed Products",
//     image: "/categories/print.png",
//     description:
//       "Premium print, packaging and branded materials designed to carry your identity beautifully into the physical world.",
//     badge: "Physical Brand",
//   },
// ];

// export default function ShopPage() {
//   const [activeCategoryId, setActiveCategoryId] = useState<string | number>(
//     "web-services"
//   );
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const t = setTimeout(() => setIsLoading(false), 800);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <div className="min-h-screen bg-[#050506] text-white">
//       <DashboardHeader />

//       <main className="pt-16">
//         {isLoading ? (
//           <section className="px-4 sm:px-6 lg:px-10 mt-4 animate-pulse">
//             <div className="max-w-6xl mx-auto">
//               <div className="h-40 sm:h-56 lg:h-64 rounded-3xl bg-gradient-to-r from-neutral-800/70 to-neutral-900/70 border border-neutral-800/60" />
//               <div className="mt-4 flex gap-3">
//                 <div className="h-8 w-32 rounded-full bg-neutral-800/80" />
//                 <div className="h-8 w-20 rounded-full bg-neutral-800/60" />
//               </div>
//             </div>
//           </section>
//         ) : (
//           <HeroSlider />
//         )}

//         {isLoading ? (
//           <section className="mt-10 px-4 sm:px-6 lg:px-10 animate-pulse">
//             <div className="flex items-center justify-between mb-4">
//               <div className="h-6 w-40 rounded-full bg-neutral-800/80" />
//               <div className="h-6 w-20 rounded-full bg-neutral-800/60" />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               {Array.from({ length: 4 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="rounded-2xl bg-neutral-900/70 border border-neutral-800/70 p-4"
//                 >
//                   <div className="h-32 rounded-xl bg-neutral-800/80 mb-3" />
//                   <div className="h-4 w-3/4 bg-neutral-800/80 rounded-full mb-2" />
//                   <div className="h-3 w-1/2 bg-neutral-800/70 rounded-full mb-1.5" />
//                   <div className="h-3 w-1/3 bg-neutral-800/60 rounded-full" />
//                 </div>
//               ))}
//             </div>
//           </section>
//         ) : (
//           <Collections />
//         )}

//         {isLoading ? (
//           <section className="mt-10 px-4 sm:px-6 lg:px-10 animate-pulse">
//             <div className="flex items-center justify-between mb-4">
//               <div className="h-6 w-40 rounded-full bg-neutral-800/80" />
//               <div className="h-6 w-20 rounded-full bg-neutral-800/60" />
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//               {Array.from({ length: 8 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="rounded-2xl bg-neutral-900/70 border border-neutral-800/70 p-4"
//                 >
//                   <div className="h-32 rounded-xl bg-neutral-800/80 mb-3" />
//                   <div className="h-4 w-3/4 bg-neutral-800/80 rounded-full mb-2" />
//                   <div className="h-3 w-1/2 bg-neutral-800/70 rounded-full mb-1.5" />
//                   <div className="h-3 w-1/3 bg-neutral-800/60 rounded-full" />
//                 </div>
//               ))}
//             </div>
//           </section>
//         ) : (
//           <section className="mt-10 px-4 sm:px-6 lg:px-10">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg font-semibold tracking-tight">
//                 Featured Products
//               </h2>
//               <button className="text-sm text-white/60 hover:text-white transition">
//                 View all
//               </button>
//             </div>

//             <ProductTileGrid />
//           </section>
//         )}

//         {isLoading ? (
//           <section className="mt-10 px-4 sm:px-6 lg:px-10 animate-pulse">
//             <div className="flex items-center justify-between mb-4">
//               <div className="h-6 w-32 rounded-full bg-neutral-800/80" />
//               <div className="h-6 w-16 rounded-full bg-neutral-800/60" />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               {Array.from({ length: 3 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="rounded-2xl bg-neutral-900/70 border border-neutral-800/70 p-4"
//                 >
//                   <div className="h-24 rounded-xl bg-neutral-800/80 mb-3" />
//                   <div className="h-4 w-2/3 bg-neutral-800/80 rounded-full mb-2" />
//                   <div className="h-3 w-1/2 bg-neutral-800/70 rounded-full mb-1" />
//                   <div className="h-3 w-1/3 bg-neutral-800/60 rounded-full" />
//                 </div>
//               ))}
//             </div>
//           </section>
//         ) : (
//           <HotStuffSection />
//         )}

//         <ExploreByCategorySection
//           isLoading={isLoading}
//           categories={dashboardCategories}
//           activeCategoryId={activeCategoryId}
//           onSelectCategory={(cat) => {
//             setActiveCategoryId(cat.id);
//             console.log("Selected category:", cat.id);
//           }}
//         />

//         <HowItWorksSection isLoading={isLoading} />
//         <ProjectModeCTA />
//       </main>

//       <Footer />
//     </div>
//   );
// }
