"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Check,
  X,
} from "lucide-react";

type Props = {
  proposalId: string;

  status:
    | "sent"
    | "accepted"
    | "rejected"
    | "expired";
};

export default function ProposalDecisionActions({
  proposalId,
  status,
}: Props) {
  const router =
    useRouter();

  const [loading, setLoading] =
    useState<
      "accept" |
      "reject" |
      null
    >(null);

  const [showReject, setShowReject] =
    useState(false);

  const [note, setNote] =
    useState("");

  const [error, setError] =
    useState("");

  if (status === "accepted") {
    return (
      <div className="rounded-xl bg-[#f4f4ef] p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Check className="h-4 w-4" />

          Proposal accepted
        </div>

        <p className="mt-2 text-xs leading-5 text-black/45">
          Your project is ready for
          the next stage.
        </p>
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="rounded-xl bg-[#f4f4ef] p-4">
        <p className="text-sm font-semibold">
          Proposal declined
        </p>

        <p className="mt-2 text-xs leading-5 text-black/45">
          Fynaro has received your
          decision.
        </p>
      </div>
    );
  }

  if (status === "expired") {
    return (
      <div className="rounded-xl bg-[#f4f4ef] p-4">
        <p className="text-sm font-semibold">
          Proposal expired
        </p>

        <p className="mt-2 text-xs leading-5 text-black/45">
          Contact Fynaro if you would
          like an updated proposal.
        </p>
      </div>
    );
  }

  async function accept() {
    const confirmed =
      window.confirm(
        "Accept this proposal and its scope, investment and payment structure?"
      );

    if (!confirmed) {
      return;
    }

    setLoading("accept");
    setError("");

    try {
      const response =
        await fetch(
          `/api/client/proposals/${proposalId}/accept`,
          {
            method: "POST",
          }
        );

      const data =
        await response
          .json()
          .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to accept proposal."
        );
      }

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to accept proposal."
      );
    } finally {
      setLoading(null);
    }
  }

  async function reject() {
    setLoading("reject");
    setError("");

    try {
      const response =
        await fetch(
          `/api/client/proposals/${proposalId}/reject`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                decisionNote:
                  note,
              }),
          }
        );

      const data =
        await response
          .json()
          .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to decline proposal."
        );
      }

      setShowReject(false);

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to decline proposal."
      );
    } finally {
      setLoading(null);
    }
  }

  return (
    <div>
      {!showReject ? (
        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            disabled={
              loading !== null
            }
            onClick={accept}
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 text-sm font-medium text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Check
              className="h-4 w-4"
              strokeWidth={1.8}
            />

            {loading === "accept"
              ? "Accepting..."
              : "Accept proposal"}
          </button>

          <button
            type="button"
            disabled={
              loading !== null
            }
            onClick={() =>
              setShowReject(true)
            }
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-5 text-sm font-medium text-black transition hover:bg-[#f7f7f3]"
          >
            <X
              className="h-4 w-4"
              strokeWidth={1.8}
            />

            Decline
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-black/8 bg-[#fafaf8] p-4">
          <p className="text-sm font-semibold">
            Decline proposal
          </p>

          <p className="mt-1 text-xs leading-5 text-black/40">
            You can optionally tell
            Fynaro what should be
            changed.
          </p>

          <textarea
            value={note}
            onChange={(event) =>
              setNote(
                event.target.value
              )
            }
            maxLength={2000}
            rows={4}
            placeholder="What would you like us to revise?"
            className="mt-4 w-full resize-none rounded-xl border border-black/8 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-black/25"
          />

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={
                loading !== null
              }
              onClick={reject}
              className="min-h-[42px] rounded-xl bg-[#111111] px-4 text-sm font-medium text-white disabled:opacity-50"
            >
              {loading === "reject"
                ? "Submitting..."
                : "Confirm decline"}
            </button>

            <button
              type="button"
              disabled={
                loading !== null
              }
              onClick={() => {
                setShowReject(
                  false
                );

                setError("");
              }}
              className="min-h-[42px] rounded-xl border border-black/8 bg-white px-4 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-3 text-xs leading-5 text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}