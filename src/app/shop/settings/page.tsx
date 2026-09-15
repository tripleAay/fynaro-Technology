"use client";

import Link from "next/link";
import {
  Bell,
  Check,
  ChevronRight,
  KeyRound,
  Mail,
  MessageSquareText,
  Save,
  ShieldCheck,
  Trash2,
  UserRound,
  WalletCards,
} from "lucide-react";
import { useState } from "react";

type SettingsState = {
  projectUpdates: boolean;
  proposalUpdates: boolean;
  paymentUpdates: boolean;
  messages: boolean;
};

type ToggleKey = keyof SettingsState;

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] =
    useState<SettingsState>({
      projectUpdates: true,
      proposalUpdates: false,
      paymentUpdates: true,
      messages: false,
    });

  function toggleSetting(key: ToggleKey) {
    setSaved(false);

    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function handleSave() {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2200);
  }

  return (
    <div className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* HEADER */}
      <header className="border-b border-black/[0.08] pb-7">
        <div className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.17em] text-black/30">
          <Link
            href="/shop"
            className="transition hover:text-black"
          >
            Dashboard
          </Link>

          <span>/</span>

          <span>Settings</span>
        </div>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[38px] font-semibold leading-none tracking-[-0.05em] sm:text-[46px]">
              Settings
            </h1>

            <p className="mt-3 text-[10px] text-black/38">
              Notifications, security and account controls.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex h-10 w-fit items-center gap-2 rounded-full bg-[#111] px-4 text-[9px] font-semibold text-white transition hover:bg-black/80"
          >
            {saved ? (
              <>
                <Check size={11} />
                Saved
              </>
            ) : (
              <>
                <Save size={11} />
                Save
              </>
            )}
          </button>
        </div>
      </header>

      <main className="space-y-10 py-8">
        {/* NOTIFICATIONS */}
        <section>
          <SectionHeader
            title="Notifications"
            description="Choose what should reach your email."
          />

          <div className="mt-5 overflow-hidden rounded-[16px] border border-black/[0.08] bg-white">
            <ToggleRow
              icon={Bell}
              title="Project updates"
              description="Milestones and important project activity."
              checked={settings.projectUpdates}
              onChange={() =>
                toggleSetting("projectUpdates")
              }
            />

            <ToggleRow
              icon={Mail}
              title="Proposal updates"
              description="New or updated proposals."
              checked={settings.proposalUpdates}
              onChange={() =>
                toggleSetting("proposalUpdates")
              }
            />

            <ToggleRow
              icon={WalletCards}
              title="Payment updates"
              description="Payments, balances and billing activity."
              checked={settings.paymentUpdates}
              onChange={() =>
                toggleSetting("paymentUpdates")
              }
            />

            <ToggleRow
              icon={MessageSquareText}
              title="New messages"
              description="Messages sent through your Fynaro workspace."
              checked={settings.messages}
              onChange={() =>
                toggleSetting("messages")
              }
            />
          </div>
        </section>

        {/* SECURITY */}
        <section>
          <SectionHeader
            title="Security"
            description="Manage access to your account."
          />

          <div className="mt-5 overflow-hidden rounded-[16px] border border-black/[0.08] bg-white">
            <ActionRow
              icon={KeyRound}
              title="Password"
              description="Change your account password."
              href="/shop/settings/password"
            />

            <ActionRow
              icon={ShieldCheck}
              title="Account security"
              description="Review verification and security options."
              href="/shop/settings/security"
            />
          </div>
        </section>

        {/* ACCOUNT */}
        <section>
          <SectionHeader
            title="Account"
            description="Manage your profile and account."
          />

          <div className="mt-5 overflow-hidden rounded-[16px] border border-black/[0.08] bg-white">
            <ActionRow
              icon={UserRound}
              title="Profile"
              description="Update your personal and business details."
              href="/shop/profile"
            />
          </div>

          {/* DANGER */}
          <div className="mt-5 flex flex-col gap-4 rounded-[16px] border border-[#9a5d48]/15 bg-[#fbf8f6] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2e8e3] text-[#80513f]">
                <Trash2 size={13} />
              </span>

              <div>
                <p className="text-[10px] font-semibold">
                  Delete account
                </p>

                <p className="mt-1 text-[8px] leading-4 text-black/35">
                  Permanently remove access to your Fynaro account.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="h-9 w-fit rounded-full border border-[#9a5d48]/15 bg-white px-3.5 text-[8px] font-semibold text-[#80513f] transition hover:bg-[#f2e8e3]"
            >
              Delete
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-[18px] font-semibold tracking-[-0.03em]">
        {title}
      </h2>

      <p className="mt-1.5 text-[9px] text-black/35">
        {description}
      </p>
    </div>
  );
}

function ToggleRow({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div
      className={[
        "flex items-center gap-4 border-b border-black/[0.06] px-4 py-4 last:border-b-0 sm:px-5",
        "transition-colors duration-200 hover:bg-[#fafaf7]",
        checked ? "bg-white" : "bg-[#fcfcfa]",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
          checked
            ? "bg-[#f4f4ef]"
            : "bg-black/[0.035]",
        ].join(" ")}
      >
        <Icon
          size={13}
          className={
            checked
              ? "text-black/50"
              : "text-black/28"
          }
        />
      </span>

      <div className="min-w-0 flex-1">
        <p
          className={[
            "text-[10px] font-semibold transition-colors",
            checked
              ? "text-black"
              : "text-black/58",
          ].join(" ")}
        >
          {title}
        </p>

        <p className="mt-1 text-[8px] leading-4 text-black/35">
          {description}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span
          className={[
            "hidden min-w-[18px] text-right text-[7px] font-semibold uppercase tracking-[0.12em] sm:block",
            checked
              ? "text-black/35"
              : "text-black/22",
          ].join(" ")}
        >
          {checked ? "On" : "Off"}
        </span>

        <Toggle
          checked={checked}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={
        checked
          ? "Disable notification"
          : "Enable notification"
      }
      onClick={onChange}
      className={[
        "relative h-[24px] w-[42px] shrink-0 rounded-full border transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2",
        checked
          ? "border-[#111] bg-[#111]"
          : "border-black/[0.12] bg-[#e9e9e4]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute top-[2px] h-[18px] w-[18px] rounded-full bg-white",
          "shadow-[0_1px_3px_rgba(0,0,0,0.16)]",
          "transition-transform duration-200 ease-out",
          checked
            ? "translate-x-[20px]"
            : "translate-x-[2px]",
        ].join(" ")}
      />
    </button>
  );
}

function ActionRow({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 border-b border-black/[0.06] px-4 py-4 transition-colors hover:bg-[#fafaf7] last:border-b-0 sm:px-5"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4f4ef]">
        <Icon
          size={13}
          className="text-black/45"
        />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold">
          {title}
        </p>

        <p className="mt-1 text-[8px] leading-4 text-black/35">
          {description}
        </p>
      </div>

      <ChevronRight
        size={12}
        className="shrink-0 text-black/20 transition-all group-hover:translate-x-0.5 group-hover:text-black/45"
      />
    </Link>
  );
}