"use client";

import {
  useMemo,
  useState,
} from "react";

import Link from "next/link";

import {
  Check,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

type Deliverable = {
  title: string;
  description: string;
};

type PaymentStage = {
  stage: string;
  percentage: number;
  triggerLabel: string;
};

type ProposalBuilderProps = {
  requestId: string;
  requestReference: string;
  initialTitle: string;
  initialService: string;
};

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
  ).format(amount || 0);
}

export default function ProposalBuilder({
  requestId,
  requestReference,
  initialTitle,
  initialService,
}: ProposalBuilderProps) {
  const [title, setTitle] =
    useState(initialTitle);

  const [service, setService] =
    useState(initialService);

  const [scope, setScope] =
    useState("");

  const [summary, setSummary] =
    useState("");

  const [
    investment,
    setInvestment,
  ] = useState(350000);

  const [
    deliverables,
    setDeliverables,
  ] = useState<Deliverable[]>([
    {
      title: "",
      description: "",
    },
  ]);

  const [
    exclusions,
    setExclusions,
  ] = useState<string[]>([
    "",
  ]);

  const [
    paymentStages,
    setPaymentStages,
  ] = useState<
    PaymentStage[]
  >([
    {
      stage: "deposit",
      percentage: 50,
      triggerLabel:
        "Project commencement",
    },

    {
      stage: "final",
      percentage: 50,
      triggerLabel:
        "Before final handover",
    },
  ]);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [
    createdProposal,
    setCreatedProposal,
  ] = useState<{
    id: string;
    reference: string;
  } | null>(null);

  const totalPercentage =
    useMemo(
      () =>
        paymentStages.reduce(
          (total, stage) =>
            total +
            Number(
              stage.percentage ||
                0
            ),
          0
        ),
      [paymentStages]
    );

  function updateDeliverable(
    index: number,
    field:
      | "title"
      | "description",
    value: string
  ) {
    setDeliverables(
      (current) =>
        current.map(
          (
            item,
            itemIndex
          ) =>
            itemIndex ===
            index
              ? {
                  ...item,
                  [field]:
                    value,
                }
              : item
        )
    );
  }

  function updateStage(
    index: number,
    field:
      | "stage"
      | "percentage"
      | "triggerLabel",
    value:
      | string
      | number
  ) {
    setPaymentStages(
      (current) =>
        current.map(
          (
            item,
            itemIndex
          ) =>
            itemIndex ===
            index
              ? {
                  ...item,
                  [field]:
                    value,
                }
              : item
        )
    );
  }

  async function submitProposal() {
    setError("");

    if (
      totalPercentage !== 100
    ) {
      setError(
        "Payment stages must total exactly 100%."
      );

      return;
    }

    setSaving(true);

    try {
      const response =
        await fetch(
          `/api/admin/requests/${requestId}/proposals`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                title,
                service,
                scope,
                summary,
                investment:
                  Number(
                    investment
                  ),

                currency:
                  "NGN",

                deliverables,

                exclusions,

                paymentStages,
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
            "Unable to create proposal."
        );
      }

      setCreatedProposal({
        id:
          data.proposal.id,

        reference:
          data.proposal
            .reference,
      });
    } catch (error) {
      setError(
        error instanceof
          Error
          ? error.message
          : "Unable to create proposal."
      );
    } finally {
      setSaving(false);
    }
  }

  if (createdProposal) {
    return (
      <div className="rounded-2xl border border-black/6 bg-white p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f4f4ef]">
          <Check
            className="h-5 w-5"
            strokeWidth={
              1.8
            }
          />
        </div>

        <h2 className="mt-5 text-xl font-semibold tracking-[-0.03em]">
          Proposal created
        </h2>

        <p className="mt-2 text-sm text-black/45">
          {
            createdProposal.reference
          }{" "}
          has been saved to
          Fynaro.
        </p>

        <div className="mt-6 flex justify-center">
          <Link
            href={`/admin/requests/${requestId}`}
            className="rounded-xl bg-[#111111] px-5 py-3 text-sm font-medium text-white"
          >
            Back to request
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
      <div className="space-y-5">
        <Section title="Proposal details">
          <Input
            label="Proposal title"
            value={title}
            onChange={
              setTitle
            }
          />

          <Input
            label="Service"
            value={service}
            onChange={
              setService
            }
          />

          <Textarea
            label="Executive summary"
            value={summary}
            onChange={
              setSummary
            }
            placeholder="Briefly explain the proposed solution and intended business outcome."
          />

          <Textarea
            label="Scope of work"
            value={scope}
            onChange={
              setScope
            }
            placeholder="Describe exactly what Fynaro will design, build and deliver."
          />
        </Section>

        <Section title="Deliverables">
          <div className="space-y-4">
            {deliverables.map(
              (
                deliverable,
                index
              ) => (
                <div
                  key={index}
                  className="rounded-xl border border-black/6 bg-[#fafaf8] p-4"
                >
                  <div className="flex justify-between gap-4">
                    <p className="text-xs font-semibold text-black/45">
                      Deliverable{" "}
                      {index + 1}
                    </p>

                    {deliverables.length >
                      1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setDeliverables(
                            (
                              current
                            ) =>
                              current.filter(
                                (
                                  _,
                                  itemIndex
                                ) =>
                                  itemIndex !==
                                  index
                              )
                          )
                        }
                        className="text-black/35 hover:text-black"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="mt-4 space-y-3">
                    <Input
                      label="Title"
                      value={
                        deliverable.title
                      }
                      onChange={(
                        value
                      ) =>
                        updateDeliverable(
                          index,
                          "title",
                          value
                        )
                      }
                    />

                    <Textarea
                      label="Description"
                      value={
                        deliverable.description
                      }
                      onChange={(
                        value
                      ) =>
                        updateDeliverable(
                          index,
                          "description",
                          value
                        )
                      }
                    />
                  </div>
                </div>
              )
            )}

            <button
              type="button"
              onClick={() =>
                setDeliverables(
                  (current) => [
                    ...current,
                    {
                      title: "",
                      description:
                        "",
                    },
                  ]
                )
              }
              className="inline-flex items-center gap-2 text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              Add deliverable
            </button>
          </div>
        </Section>

        <Section title="Exclusions">
          <div className="space-y-3">
            {exclusions.map(
              (
                exclusion,
                index
              ) => (
                <div
                  key={index}
                  className="flex gap-2"
                >
                  <input
                    value={
                      exclusion
                    }
                    onChange={(
                      event
                    ) =>
                      setExclusions(
                        (
                          current
                        ) =>
                          current.map(
                            (
                              item,
                              itemIndex
                            ) =>
                              itemIndex ===
                              index
                                ? event
                                    .target
                                    .value
                                : item
                          )
                      )
                    }
                    placeholder="Example: Domain renewal fees"
                    className="min-h-[44px] flex-1 rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-black/30"
                  />

                  {exclusions.length >
                    1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setExclusions(
                          (
                            current
                          ) =>
                            current.filter(
                              (
                                _,
                                itemIndex
                              ) =>
                                itemIndex !==
                                index
                            )
                        )
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/8"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )
            )}

            <button
              type="button"
              onClick={() =>
                setExclusions(
                  (current) => [
                    ...current,
                    "",
                  ]
                )
              }
              className="inline-flex items-center gap-2 text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              Add exclusion
            </button>
          </div>
        </Section>

        <Section title="Payment plan">
          <div className="space-y-4">
            {paymentStages.map(
              (
                stage,
                index
              ) => (
                <div
                  key={index}
                  className="grid gap-3 rounded-xl border border-black/6 bg-[#fafaf8] p-4 md:grid-cols-[150px_120px_1fr_44px]"
                >
                  <Input
                    label="Stage"
                    value={
                      stage.stage
                    }
                    onChange={(
                      value
                    ) =>
                      updateStage(
                        index,
                        "stage",
                        value
                      )
                    }
                  />

                  <NumberInput
                    label="%"
                    value={
                      stage.percentage
                    }
                    onChange={(
                      value
                    ) =>
                      updateStage(
                        index,
                        "percentage",
                        value
                      )
                    }
                  />

                  <Input
                    label="Payment trigger"
                    value={
                      stage.triggerLabel
                    }
                    onChange={(
                      value
                    ) =>
                      updateStage(
                        index,
                        "triggerLabel",
                        value
                      )
                    }
                  />

                  <button
                    type="button"
                    disabled={
                      paymentStages.length <=
                      1
                    }
                    onClick={() =>
                      setPaymentStages(
                        (
                          current
                        ) =>
                          current.filter(
                            (
                              _,
                              itemIndex
                            ) =>
                              itemIndex !==
                              index
                          )
                      )
                    }
                    className="mt-[22px] flex h-11 items-center justify-center rounded-xl border border-black/8 disabled:opacity-30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )
            )}

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() =>
                  setPaymentStages(
                    (current) => [
                      ...current,
                      {
                        stage:
                          "milestone",
                        percentage:
                          0,
                        triggerLabel:
                          "",
                      },
                    ]
                  )
                }
                className="inline-flex items-center gap-2 text-sm font-medium"
              >
                <Plus className="h-4 w-4" />
                Add stage
              </button>

              <span
                className={`text-sm font-semibold ${
                  totalPercentage ===
                  100
                    ? "text-black"
                    : "text-red-600"
                }`}
              >
                {
                  totalPercentage
                }
                %
              </span>
            </div>
          </div>
        </Section>
      </div>

      <aside>
        <div className="sticky top-[110px] rounded-2xl border border-black/6 bg-white p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/35">
            Proposal summary
          </p>

          <p className="mt-5 text-xs text-black/40">
            Request
          </p>

          <p className="mt-1 text-sm font-semibold">
            {requestReference}
          </p>

          <div className="mt-6 border-t border-black/5 pt-5">
            <label className="text-xs font-medium text-black/50">
              Total investment
            </label>

            <input
              type="number"
              min="0"
              value={investment}
              onChange={(
                event
              ) =>
                setInvestment(
                  Number(
                    event
                      .target
                      .value
                  )
                )
              }
              className="mt-2 min-h-[46px] w-full rounded-xl border border-black/10 px-4 text-lg font-semibold outline-none focus:border-black/30"
            />

            <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
              {formatCurrency(
                investment
              )}
            </p>
          </div>

          <div className="mt-6 space-y-3 border-t border-black/5 pt-5">
            {paymentStages.map(
              (
                stage,
                index
              ) => (
                <div
                  key={index}
                  className="flex justify-between gap-4 text-xs"
                >
                  <span className="capitalize text-black/45">
                    {stage.stage ||
                      `Stage ${
                        index + 1
                      }`}
                  </span>

                  <span className="font-medium">
                    {formatCurrency(
                      Math.round(
                        investment *
                          (Number(
                            stage.percentage
                          ) /
                            100)
                      )
                    )}
                  </span>
                </div>
              )
            )}
          </div>

          {error && (
            <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-xs leading-5 text-red-700">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={
              submitProposal
            }
            disabled={saving}
            className="mt-6 flex min-h-[46px] w-full items-center justify-center rounded-xl bg-[#111111] px-5 text-sm font-medium text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Creating proposal..."
              : "Create proposal"}
          </button>

          <p className="mt-3 text-center text-[11px] leading-4 text-black/35">
            Payment amounts are
            recalculated and
            validated by the
            Fynaro backend.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children:
    React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-black/6 bg-white p-5 sm:p-6">
      <h2 className="text-sm font-semibold">
        {title}
      </h2>

      <div className="mt-5 space-y-4">
        {children}
      </div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-black/45">
        {label}
      </span>

      <input
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="mt-2 min-h-[44px] w-full rounded-xl border border-black/10 bg-white px-4 text-sm outline-none transition focus:border-black/30"
      />
    </label>
  );
}

function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (
    value: number
  ) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-black/45">
        {label}
      </span>

      <input
        type="number"
        min="0"
        max="100"
        value={value}
        onChange={(event) =>
          onChange(
            Number(
              event.target.value
            )
          )
        }
        className="mt-2 min-h-[44px] w-full rounded-xl border border-black/10 bg-white px-4 text-sm outline-none focus:border-black/30"
      />
    </label>
  );
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-black/45">
        {label}
      </span>

      <textarea
        value={value}
        placeholder={
          placeholder
        }
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        rows={5}
        className="mt-2 w-full resize-y rounded-xl border border-black/10 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-black/30"
      />
    </label>
  );
}