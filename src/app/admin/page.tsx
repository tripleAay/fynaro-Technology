import Link from "next/link";

import {
  ArrowUpRight,
  BadgeDollarSign,
  ClipboardList,
  FolderKanban,
  ReceiptText,
  Users,
} from "lucide-react";

import AdminStatCard from "@/components/admin/AdminStat";

import {
  getAdminSession,
} from "@/lib/admin/getAdminSession";

import {
  getAdminDashboard,
} from "@/lib/admin/getAdminDashboard";

function formatCurrency(
  amount: number
) {
  return new Intl.NumberFormat(
    "en-NG",
    {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }
  ).format(amount);
}

export default async function AdminPage() {
  const [
    session,
    dashboard,
  ] = await Promise.all([
    getAdminSession(),
    getAdminDashboard(),
  ]);

  const firstName =
    session?.profile.fullName
      ?.split(" ")[0] ||
    session?.user.fullName
      ?.split(" ")[0] ||
    "Admin";

  const stats =
    dashboard?.stats || {
      clients: 0,
      newRequests: 0,
      activeProjects: 0,
      proposals: 0,
      payments: 0,
      pendingPayments: 0,
      revenue: 0,
      pendingAmount: 0,
    };

  return (
    <div className="mx-auto max-w-[1500px]">
      <section className="flex flex-col gap-5 border-b border-black/5 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/35">
            Fynaro administration
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-[#111111] sm:text-[38px]">
            Good to see you,{" "}
            {firstName}.
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-black/45">
            Here is what needs
            attention across sales,
            clients and project
            delivery.
          </p>
        </div>

        <Link
          href="/admin/requests"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 text-sm font-medium text-white transition hover:-translate-y-0.5"
        >
          Review requests

          <ArrowUpRight
            className="h-4 w-4"
            strokeWidth={1.8}
          />
        </Link>
      </section>

      <section className="grid gap-4 py-7 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="New requests"
          value={String(
            stats.newRequests
          )}
          description="Submitted client requests awaiting review."
          icon={
            ClipboardList
          }
        />

        <AdminStatCard
          label="Active projects"
          value={String(
            stats.activeProjects
          )}
          description="Projects currently moving through delivery."
          icon={
            FolderKanban
          }
        />

        <AdminStatCard
          label="Pending payments"
          value={formatCurrency(
            stats.pendingAmount
          )}
          description={`${stats.pendingPayments} payment(s) awaiting completion.`}
          icon={
            ReceiptText
          }
        />

        <AdminStatCard
          label="Revenue"
          value={formatCurrency(
            stats.revenue
          )}
          description={`${stats.payments} payment record(s) currently tracked.`}
          icon={
            BadgeDollarSign
          }
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-2xl border border-black/6 bg-white">
          <div className="flex items-center justify-between border-b border-black/5 px-5 py-5 sm:px-6">
            <div>
              <h2 className="text-base font-semibold tracking-[-0.02em]">
                Needs attention
              </h2>

              <p className="mt-1 text-xs text-black/40">
                Operational items
                that should be
                handled next.
              </p>
            </div>
          </div>

          <div className="divide-y divide-black/5">
            <AttentionItem
              title="Project requests"
              description={
                stats.newRequests >
                0
                  ? `${stats.newRequests} request(s) are waiting for review.`
                  : "No new project requests require attention."
              }
              href="/admin/requests"
              action="Open requests"
            />

            <AttentionItem
              title="Outstanding payments"
              description={
                stats.pendingPayments >
                0
                  ? `${stats.pendingPayments} payment(s) worth ${formatCurrency(
                      stats.pendingAmount
                    )} are still outstanding.`
                  : "There are no outstanding payments right now."
              }
              href="/admin/payments"
              action="Open payments"
            />

            <AttentionItem
              title="Active delivery"
              description={
                stats.activeProjects >
                0
                  ? `${stats.activeProjects} active project(s) are currently in delivery.`
                  : "There are no active projects currently."
              }
              href="/admin/projects"
              action="Open projects"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-black/6 bg-white">
          <div className="border-b border-black/5 px-5 py-5 sm:px-6">
            <h2 className="text-base font-semibold tracking-[-0.02em]">
              Business snapshot
            </h2>

            <p className="mt-1 text-xs text-black/40">
              Current Fynaro
              workspace overview.
            </p>
          </div>

          <div className="space-y-1 p-3">
            <SnapshotRow
              icon={Users}
              label="Clients"
              value={String(
                stats.clients
              )}
              href="/admin/clients"
            />

            <SnapshotRow
              icon={
                ClipboardList
              }
              label="Requests"
              value={String(
                stats.newRequests
              )}
              href="/admin/requests"
            />

            <SnapshotRow
              icon={
                FolderKanban
              }
              label="Projects"
              value={String(
                stats.activeProjects
              )}
              href="/admin/projects"
            />

            <SnapshotRow
              icon={
                BadgeDollarSign
              }
              label="Revenue"
              value={formatCurrency(
                stats.revenue
              )}
              href="/admin/payments"
            />
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-black/6 bg-white">
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-5 sm:px-6">
          <div>
            <h2 className="text-base font-semibold tracking-[-0.02em]">
              Recent activity
            </h2>

            <p className="mt-1 text-xs text-black/40">
              Important changes
              across the Fynaro
              platform.
            </p>
          </div>

          <Link
            href="/admin/activity"
            className="text-xs font-medium text-black/55 hover:text-black"
          >
            View all
          </Link>
        </div>

        {!dashboard?.activity?.length ? (
          <div className="flex min-h-[180px] flex-col items-center justify-center px-6 py-10 text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4f4ef]">
              <ReceiptText
                className="h-[18px] w-[18px] text-black/45"
                strokeWidth={
                  1.8
                }
              />
            </div>

            <p className="mt-4 text-sm font-medium">
              No activity yet
            </p>

            <p className="mt-1 max-w-sm text-xs leading-5 text-black/40">
              Client requests,
              payments and project
              changes will appear here
              as they happen.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-black/5">
            {dashboard.activity.map(
              (item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
                >
                  <div>
                    <p className="text-sm font-medium text-[#111111]">
                      {
                        item.title
                      }
                    </p>

                    <p className="mt-1 text-xs text-black/40">
                      {item.reference ||
                        item.type}
                    </p>
                  </div>

                  <span className="text-xs capitalize text-black/45">
                    {item.status ||
                      item.type}
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </section>
    </div>
  );
}

type AttentionItemProps = {
  title: string;
  description: string;
  href: string;
  action: string;
};

function AttentionItem({
  title,
  description,
  href,
  action,
}: AttentionItemProps) {
  return (
    <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <p className="text-sm font-medium text-[#111111]">
          {title}
        </p>

        <p className="mt-1 max-w-xl text-xs leading-5 text-black/40">
          {description}
        </p>
      </div>

      <Link
        href={href}
        className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-[#111111]"
      >
        {action}

        <ArrowUpRight
          className="h-3.5 w-3.5"
          strokeWidth={1.8}
        />
      </Link>
    </div>
  );
}

type SnapshotRowProps = {
  icon:
    React.ComponentType<{
      className?: string;
      strokeWidth?: number;
    }>;

  label: string;
  value: string;
  href: string;
};

function SnapshotRow({
  icon: Icon,
  label,
  value,
  href,
}: SnapshotRowProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl px-3 py-3.5 transition hover:bg-[#f7f7f3]"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f4f4ef]">
          <Icon
            className="h-4 w-4 text-black/55"
            strokeWidth={1.8}
          />
        </div>

        <span className="text-sm text-black/60">
          {label}
        </span>
      </div>

      <span className="text-sm font-semibold text-[#111111]">
        {value}
      </span>
    </Link>
  );
}