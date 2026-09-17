"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Check,
  LoaderCircle,
  Mail,
} from "lucide-react";

type Props = {
  proposalId: string;
  status: string;
};

function getStatusLabel(
  status: string
) {
  switch (status) {
    case "sent":
      return "Sent to client";

    case "accepted":
      return "Accepted";

    case "rejected":
      return "Rejected";

    case "expired":
      return "Expired";

    default:
      return status;
  }
}

export default function SendProposalButton({
  proposalId,
  status,
}: Props) {
  const router = useRouter();

  const [sending, setSending] =
    useState(false);

  const [error, setError] =
    useState("");

  // ======================================================
  // NON-DRAFT PROPOSAL
  // ======================================================

  if (status !== "draft") {
    return (
      <div className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-black/8 bg-white px-5 text-sm font-medium text-black/55">
        <Check
          className="h-4 w-4"
          strokeWidth={1.8}
        />

        {getStatusLabel(status)}
      </div>
    );
  }

  // ======================================================
  // SEND
  // ======================================================

  async function sendProposal() {
    if (sending) {
      return;
    }

    const confirmed =
      window.confirm(
        "Send this proposal to the client? It will become visible in their Fynaro workspace."
      );

    if (!confirmed) {
      return;
    }

    setSending(true);
    setError("");

    try {
      const response =
        await fetch(
          `/api/admin/proposals/${proposalId}/send`,
          {
            method: "POST",

            headers: {
              Accept:
                "application/json",
            },

            cache:
              "no-store",
          }
        );

      const data =
        await response
          .json()
          .catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to send proposal."
        );
      }

      router.refresh();
    } catch (error) {
      console.error(
        "Send proposal error:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to send proposal."
      );
    } finally {
      setSending(false);
    }
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="flex flex-col items-start lg:items-end">
      <button
        type="button"
        disabled={sending}
        onClick={sendProposal}
        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 text-sm font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-black disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50"
      >
        {sending ? (
          <LoaderCircle
            className="h-4 w-4 animate-spin"
            strokeWidth={1.8}
          />
        ) : (
          <Mail
            className="h-4 w-4"
            strokeWidth={1.8}
          />
        )}

        {sending
          ? "Sending..."
          : "Send to client"}
      </button>

      {error && (
        <p className="mt-2 max-w-[280px] text-left text-xs leading-5 text-red-600 lg:text-right">
          {error}
        </p>
      )}
    </div>
  );
}