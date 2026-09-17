"use client";

import {
  useMemo,
  useState,
} from "react";

import Link from "next/link";
import {
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Globe2,
  Layers3,
  Palette,
  Smartphone,
  Upload,
} from "lucide-react";

type ProjectType =
  | "website"
  | "ecommerce"
  | "mobile"
  | "product"
  | "brand"
  | "uiux"
  | "other";

type FormState = {
  projectType:
    | ProjectType
    | "";

  businessName: string;

  businessDescription:
    string;

  projectDescription:
    string;

  existingUrl: string;

  requirements:
    string[];

  budget: string;

  timeline: string;

  notes: string;
};

type RequestResponse = {
  success?: boolean;

  message?: string;

  code?: string;

  request?: {
    id: string;
    reference: string;
    status: string;
    title?: string;
  };
};

const projectTypes = [
  {
    id:
      "website" as ProjectType,

    title:
      "Website",

    description:
      "Business website, company website or web presence.",

    icon:
      Globe2,
  },

  {
    id:
      "ecommerce" as ProjectType,

    title:
      "Ecommerce Store",

    description:
      "Online store with products, payments and order flows.",

    icon:
      Globe2,
  },

  {
    id:
      "mobile" as ProjectType,

    title:
      "Mobile App",

    description:
      "A customer, business or custom mobile application.",

    icon:
      Smartphone,
  },

  {
    id:
      "product" as ProjectType,

    title:
      "Digital Product",

    description:
      "SaaS, portal, dashboard, marketplace or custom system.",

    icon:
      Layers3,
  },

  {
    id:
      "brand" as ProjectType,

    title:
      "Brand Identity",

    description:
      "Brand direction, identity system and visual language.",

    icon:
      Palette,
  },

  {
    id:
      "uiux" as ProjectType,

    title:
      "UI / UX Design",

    description:
      "Website, app or product interface design.",

    icon:
      Palette,
  },

  {
    id:
      "other" as ProjectType,

    title:
      "Something Else",

    description:
      "Tell us what you have in mind and we’ll help shape it.",

    icon:
      FileText,
  },
];

const requirements = [
  "Design",
  "Development",
  "Ecommerce",
  "Payments",
  "User accounts",
  "Admin dashboard",
  "Booking",
  "Database",
  "API integrations",
  "Notifications",
  "Analytics",
  "I'm not sure",
];

const budgets = [
  "₦350,000 – ₦750,000",
  "₦750,000 – ₦1,500,000",
  "₦1,500,000 – ₦3,000,000",
  "₦3,000,000+",
  "I need guidance",
];

const timelines = [
  "As soon as possible",
  "Within one month",
  "1–3 months",
  "3+ months",
  "Still exploring",
];

const steps = [
  "Project",
  "Details",
  "Requirements",
  "Investment",
  "Timeline",
  "Files",
  "Review",
];

export default function StartProjectPage() {
  const router =
    useRouter();

  const [
    step,
    setStep,
  ] =
    useState(0);

  const [
    submitting,
    setSubmitting,
  ] =
    useState(false);

  const [
    submitError,
    setSubmitError,
  ] =
    useState<
      string | null
    >(null);

  const [
    form,
    setForm,
  ] =
    useState<FormState>({
      projectType:
        "",

      businessName:
        "",

      businessDescription:
        "",

      projectDescription:
        "",

      existingUrl:
        "",

      requirements:
        [],

      budget:
        "",

      timeline:
        "",

      notes:
        "",
    });

  const selectedProject =
    useMemo(
      () =>
        projectTypes.find(
          (item) =>
            item.id ===
            form.projectType
        ),

      [
        form.projectType,
      ]
    );

  const updateField = <
    K extends keyof FormState,
  >(
    key: K,
    value:
      FormState[K]
  ) => {
    setSubmitError(
      null
    );

    setForm(
      (current) => ({
        ...current,

        [key]:
          value,
      })
    );
  };

  const toggleRequirement =
    (
      requirement:
        string
    ) => {
      setSubmitError(
        null
      );

      setForm(
        (current) => {
          const exists =
            current.requirements.includes(
              requirement
            );

          return {
            ...current,

            requirements:
              exists
                ? current.requirements.filter(
                    (
                      item
                    ) =>
                      item !==
                      requirement
                  )
                : [
                    ...current.requirements,
                    requirement,
                  ],
          };
        }
      );
    };

  const scrollTop =
    () => {
      window.scrollTo({
        top: 0,
        behavior:
          "smooth",
      });
    };

  const next =
    () => {
      setSubmitError(
        null
      );

      /*
       * Basic validation before
       * allowing the user to move
       * forward.
       */

      if (
        step === 0 &&
        !form.projectType
      ) {
        setSubmitError(
          "Please select the type of project you want to build."
        );

        return;
      }

      if (
        step === 1 &&
        !form.businessName.trim()
      ) {
        setSubmitError(
          "Please enter your business or project name."
        );

        return;
      }

      if (
        step === 1 &&
        !form.projectDescription.trim()
      ) {
        setSubmitError(
          "Please describe what you are trying to build."
        );

        return;
      }

      setStep(
        (
          current
        ) =>
          Math.min(
            current +
              1,

            steps.length -
              1
          )
      );

      scrollTop();
    };

  const back =
    () => {
      setSubmitError(
        null
      );

      setStep(
        (
          current
        ) =>
          Math.max(
            current -
              1,

            0
          )
      );

      scrollTop();
    };

  const goToStep =
    (
      index:
        number
    ) => {
      if (
        submitting
      ) {
        return;
      }

      if (
        index <=
        step
      ) {
        setSubmitError(
          null
        );

        setStep(
          index
        );

        scrollTop();
      }
    };

  const submitRequest =
    async () => {
      if (
        submitting
      ) {
        return;
      }

      setSubmitError(
        null
      );

      /*
       * Final validation.
       */

      if (
        !form.projectType
      ) {
        setSubmitError(
          "Please select a project type."
        );

        setStep(0);

        scrollTop();

        return;
      }

      if (
        !form.businessName.trim()
      ) {
        setSubmitError(
          "Please enter your business or project name."
        );

        setStep(1);

        scrollTop();

        return;
      }

      if (
        !form.projectDescription.trim()
      ) {
        setSubmitError(
          "Please describe what you are trying to build."
        );

        setStep(1);

        scrollTop();

        return;
      }

      try {
        setSubmitting(
          true
        );

        const response =
          await fetch(
            "/api/client/requests",
            {
              method:
                "POST",

              headers:
                {
                  "Content-Type":
                    "application/json",
                },

              body:
                JSON.stringify(
                  {
                    projectType:
                      form.projectType,

                    businessName:
                      form.businessName.trim(),

                    businessDescription:
                      form.businessDescription.trim(),

                    projectDescription:
                      form.projectDescription.trim(),

                    existingUrl:
                      form.existingUrl.trim(),

                    requirements:
                      form.requirements,

                    budget:
                      form.budget,

                    timeline:
                      form.timeline,

                    notes:
                      form.notes.trim(),
                  }
                ),
            }
          );

        const data =
          (await response
            .json()
            .catch(
              () =>
                null
            )) as
            | RequestResponse
            | null;

        if (
          !response.ok
        ) {
          throw new Error(
            data?.message ||
              "Unable to submit project request."
          );
        }

        if (
          !data?.success ||
          !data.request?.id
        ) {
          throw new Error(
            data?.message ||
              "The request was submitted but the server returned an invalid response."
          );
        }

        console.log(
          "[Fynaro] Project request created:",
          data.request
        );

        /*
         * Redirect to the
         * client's request list.
         */

        router.push(
          "/shop/requests"
        );

        router.refresh();
      } catch (
        error
      ) {
        console.error(
          "[Fynaro] Project request submission failed:",
          error
        );

        setSubmitError(
          error instanceof
            Error
            ? error.message
            : "Unable to submit project request."
        );
      } finally {
        setSubmitting(
          false
        );
      }
    };

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* HEADER */}

      <section className="border-b border-black/[0.09] pb-8">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
          <Link
            href="/shop"
            className="transition hover:text-black"
          >
            Dashboard
          </Link>

          <span>
            /
          </span>

          <Link
            href="/shop/requests"
            className="transition hover:text-black"
          >
            Requests
          </Link>

          <span>
            /
          </span>

          <span>
            New Project
          </span>
        </div>

        <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/35">
              Start a
              project
            </p>

            <h1 className="mt-3 text-[38px] font-semibold tracking-[-0.045em] sm:text-[48px]">
              Tell us what
              you’re
              building.
            </h1>

            <p className="mt-4 max-w-[600px] text-[13px] leading-6 text-black/48">
              You don’t
              need to know
              every
              technical
              detail.
              Start with
              what you’re
              trying to
              achieve and
              Fynaro will
              help shape
              the right
              scope.
            </p>
          </div>

          <div className="text-[11px] font-medium text-black/35">
            Step{" "}
            {step +
              1}{" "}
            of{" "}
            {
              steps.length
            }
          </div>
        </div>
      </section>

      {/* PROGRESS */}

      <section className="border-b border-black/[0.09] py-5">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {steps.map(
            (
              label,
              index
            ) => {
              const active =
                index ===
                step;

              const complete =
                index <
                step;

              return (
                <button
                  key={
                    label
                  }
                  type="button"
                  disabled={
                    submitting
                  }
                  onClick={() =>
                    goToStep(
                      index
                    )
                  }
                  className={[
                    "flex min-w-fit items-center gap-2 rounded-full px-3 py-2 text-[10px] font-semibold transition",
                    active
                      ? "bg-[#111] text-white"
                      : complete
                        ? "bg-black/[0.07] text-black"
                        : "text-black/30",
                    submitting
                      ? "cursor-not-allowed opacity-60"
                      : "",
                  ].join(
                    " "
                  )}
                >
                  <span
                    className={[
                      "flex h-5 w-5 items-center justify-center rounded-full text-[9px]",
                      active
                        ? "bg-white text-black"
                        : complete
                          ? "bg-black text-white"
                          : "border border-black/[0.1]",
                    ].join(
                      " "
                    )}
                  >
                    {complete ? (
                      <Check
                        size={
                          11
                        }
                      />
                    ) : (
                      index +
                      1
                    )}
                  </span>

                  {
                    label
                  }
                </button>
              );
            }
          )}
        </div>
      </section>

      <div className="grid gap-10 py-10 xl:grid-cols-[1fr_340px]">
        {/* MAIN FORM */}

        <main>
          {step ===
            0 && (
            <StepContainer
              eyebrow="01 / Project"
              title="What are you looking to build?"
              description="Choose the closest option. You can clarify the details in the next steps."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {projectTypes.map(
                  (
                    item
                  ) => {
                    const Icon =
                      item.icon;

                    const selected =
                      form.projectType ===
                      item.id;

                    return (
                      <button
                        key={
                          item.id
                        }
                        type="button"
                        disabled={
                          submitting
                        }
                        onClick={() =>
                          updateField(
                            "projectType",
                            item.id
                          )
                        }
                        className={[
                          "group min-h-[180px] rounded-[18px] border p-5 text-left transition",
                          selected
                            ? "border-black bg-[#111] text-white"
                            : "border-black/[0.09] bg-white hover:border-black/25",
                        ].join(
                          " "
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div
                            className={[
                              "flex h-10 w-10 items-center justify-center rounded-full border",
                              selected
                                ? "border-white/15"
                                : "border-black/[0.09]",
                            ].join(
                              " "
                            )}
                          >
                            <Icon
                              size={
                                16
                              }
                              strokeWidth={
                                1.6
                              }
                            />
                          </div>

                          <span
                            className={[
                              "flex h-6 w-6 items-center justify-center rounded-full border",
                              selected
                                ? "border-white/20 bg-white text-black"
                                : "border-black/[0.1]",
                            ].join(
                              " "
                            )}
                          >
                            {selected && (
                              <Check
                                size={
                                  12
                                }
                              />
                            )}
                          </span>
                        </div>

                        <h3 className="mt-8 text-[18px] font-semibold tracking-[-0.025em]">
                          {
                            item.title
                          }
                        </h3>

                        <p
                          className={[
                            "mt-2 max-w-[330px] text-[11px] leading-5",
                            selected
                              ? "text-white/50"
                              : "text-black/42",
                          ].join(
                            " "
                          )}
                        >
                          {
                            item.description
                          }
                        </p>
                      </button>
                    );
                  }
                )}
              </div>
            </StepContainer>
          )}

          {step ===
            1 && (
            <StepContainer
              eyebrow="02 / Details"
              title="Tell us about the business and idea."
              description="Give us enough context to understand what the project needs to support."
            >
              <div className="space-y-6">
                <Field
                  label="Business or project name"
                  value={
                    form.businessName
                  }
                  disabled={
                    submitting
                  }
                  onChange={(
                    value
                  ) =>
                    updateField(
                      "businessName",
                      value
                    )
                  }
                  placeholder="e.g. NewJersey.ng"
                />

                <TextArea
                  label="What does the business do?"
                  value={
                    form.businessDescription
                  }
                  disabled={
                    submitting
                  }
                  onChange={(
                    value
                  ) =>
                    updateField(
                      "businessDescription",
                      value
                    )
                  }
                  placeholder="Tell us what the business offers, who it serves and anything important about how it works."
                />

                <TextArea
                  label="What are you trying to build?"
                  value={
                    form.projectDescription
                  }
                  disabled={
                    submitting
                  }
                  onChange={(
                    value
                  ) =>
                    updateField(
                      "projectDescription",
                      value
                    )
                  }
                  placeholder="Describe the website, app, product or design work you have in mind."
                />

                <Field
                  label="Existing website or product URL"
                  optional
                  value={
                    form.existingUrl
                  }
                  disabled={
                    submitting
                  }
                  onChange={(
                    value
                  ) =>
                    updateField(
                      "existingUrl",
                      value
                    )
                  }
                  placeholder="https://"
                />
              </div>
            </StepContainer>
          )}

          {step ===
            2 && (
            <StepContainer
              eyebrow="03 / Requirements"
              title="What might the project need?"
              description="Select everything that seems relevant. Choose “I’m not sure” if you want Fynaro to recommend the right setup."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                {requirements.map(
                  (
                    item
                  ) => {
                    const selected =
                      form.requirements.includes(
                        item
                      );

                    return (
                      <button
                        key={
                          item
                        }
                        type="button"
                        disabled={
                          submitting
                        }
                        onClick={() =>
                          toggleRequirement(
                            item
                          )
                        }
                        className={[
                          "flex min-h-[74px] items-center justify-between rounded-[15px] border px-5 text-left text-[12px] font-medium transition",
                          selected
                            ? "border-black bg-[#111] text-white"
                            : "border-black/[0.09] bg-white hover:border-black/25",
                        ].join(
                          " "
                        )}
                      >
                        {
                          item
                        }

                        <span
                          className={[
                            "flex h-6 w-6 items-center justify-center rounded-full border",
                            selected
                              ? "border-white/20 bg-white text-black"
                              : "border-black/[0.1]",
                          ].join(
                            " "
                          )}
                        >
                          {selected && (
                            <Check
                              size={
                                12
                              }
                            />
                          )}
                        </span>
                      </button>
                    );
                  }
                )}
              </div>
            </StepContainer>
          )}

          {step ===
            3 && (
            <StepContainer
              eyebrow="04 / Investment"
              title="What level of investment are you considering?"
              description="This helps us recommend a scope that makes sense for where you are."
            >
              <div className="space-y-3">
                {budgets.map(
                  (
                    budget
                  ) => {
                    const selected =
                      form.budget ===
                      budget;

                    return (
                      <button
                        key={
                          budget
                        }
                        type="button"
                        disabled={
                          submitting
                        }
                        onClick={() =>
                          updateField(
                            "budget",
                            budget
                          )
                        }
                        className={[
                          "flex w-full items-center justify-between rounded-[16px] border p-5 text-left transition",
                          selected
                            ? "border-black bg-[#111] text-white"
                            : "border-black/[0.09] bg-white hover:border-black/25",
                        ].join(
                          " "
                        )}
                      >
                        <span className="text-[13px] font-semibold">
                          {
                            budget
                          }
                        </span>

                        <span
                          className={[
                            "flex h-6 w-6 items-center justify-center rounded-full border",
                            selected
                              ? "border-white/20 bg-white text-black"
                              : "border-black/[0.12]",
                          ].join(
                            " "
                          )}
                        >
                          {selected && (
                            <Check
                              size={
                                12
                              }
                            />
                          )}
                        </span>
                      </button>
                    );
                  }
                )}
              </div>

              <div className="mt-6 rounded-[16px] bg-[#ecece7] p-5">
                <p className="text-[11px] leading-5 text-black/45">
                  This isn’t
                  a final
                  quote.
                  Final
                  pricing is
                  based on
                  scope,
                  functionality,
                  integrations
                  and
                  delivery
                  requirements.
                </p>
              </div>
            </StepContainer>
          )}

          {step ===
            4 && (
            <StepContainer
              eyebrow="05 / Timeline"
              title="When are you hoping to move?"
              description="A rough timeline is enough. We’ll confirm actual delivery expectations during scoping."
            >
              <div className="space-y-3">
                {timelines.map(
                  (
                    timeline
                  ) => {
                    const selected =
                      form.timeline ===
                      timeline;

                    return (
                      <button
                        key={
                          timeline
                        }
                        type="button"
                        disabled={
                          submitting
                        }
                        onClick={() =>
                          updateField(
                            "timeline",
                            timeline
                          )
                        }
                        className={[
                          "flex w-full items-center justify-between rounded-[16px] border p-5 text-left transition",
                          selected
                            ? "border-black bg-[#111] text-white"
                            : "border-black/[0.09] bg-white hover:border-black/25",
                        ].join(
                          " "
                        )}
                      >
                        <span className="text-[13px] font-semibold">
                          {
                            timeline
                          }
                        </span>

                        <span
                          className={[
                            "flex h-6 w-6 items-center justify-center rounded-full border",
                            selected
                              ? "border-white/20 bg-white text-black"
                              : "border-black/[0.12]",
                          ].join(
                            " "
                          )}
                        >
                          {selected && (
                            <Check
                              size={
                                12
                              }
                            />
                          )}
                        </span>
                      </button>
                    );
                  }
                )}
              </div>
            </StepContainer>
          )}

          {step ===
            5 && (
            <StepContainer
              eyebrow="06 / Files"
              title="Anything we should see?"
              description="Briefs, references, screenshots, documents and existing brand materials can help us understand the project faster."
            >
              <label className="group flex min-h-[250px] cursor-pointer flex-col items-center justify-center rounded-[20px] border border-dashed border-black/[0.15] bg-white p-8 text-center transition hover:border-black/30">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/[0.05]">
                  <Upload
                    size={
                      18
                    }
                    strokeWidth={
                      1.6
                    }
                  />
                </div>

                <p className="mt-5 text-[13px] font-semibold">
                  Add
                  project
                  files
                </p>

                <p className="mt-2 max-w-[390px] text-[11px] leading-5 text-black/40">
                  File
                  uploads
                  are not
                  connected
                  yet. You
                  can
                  continue
                  without
                  attaching
                  anything.
                </p>

                <input
                  type="file"
                  multiple
                  disabled
                  className="hidden"
                />
              </label>

              <div className="mt-6">
                <TextArea
                  label="Additional notes"
                  optional
                  value={
                    form.notes
                  }
                  disabled={
                    submitting
                  }
                  onChange={(
                    value
                  ) =>
                    updateField(
                      "notes",
                      value
                    )
                  }
                  placeholder="Anything else Fynaro should know before reviewing the request?"
                />
              </div>
            </StepContainer>
          )}

          {step ===
            6 && (
            <StepContainer
              eyebrow="07 / Review"
              title="Review your project request."
              description="Check the information below before sending it to Fynaro."
            >
              <div className="overflow-hidden rounded-[20px] border border-black/[0.09] bg-white">
                <ReviewRow
                  label="Project type"
                  value={
                    selectedProject?.title ||
                    "Not selected"
                  }
                />

                <ReviewRow
                  label="Business / project"
                  value={
                    form.businessName ||
                    "Not provided"
                  }
                />

                <ReviewRow
                  label="Project"
                  value={
                    form.projectDescription ||
                    "Not provided"
                  }
                  multiline
                />

                <ReviewRow
                  label="Requirements"
                  value={
                    form.requirements
                      .length
                      ? form.requirements.join(
                          ", "
                        )
                      : "Not selected"
                  }
                  multiline
                />

                <ReviewRow
                  label="Investment"
                  value={
                    form.budget ||
                    "Not selected"
                  }
                />

                <ReviewRow
                  label="Timeline"
                  value={
                    form.timeline ||
                    "Not selected"
                  }
                />

                <ReviewRow
                  label="Existing URL"
                  value={
                    form.existingUrl ||
                    "None provided"
                  }
                />
              </div>

              <div className="mt-6 rounded-[18px] bg-[#e9e9e3] p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-black/35">
                  What
                  happens
                  next
                </p>

                <div className="mt-5 space-y-4">
                  {[
                    "Fynaro reviews your request.",
                    "We clarify anything necessary.",
                    "A recommended scope is prepared.",
                    "Your proposal appears inside your workspace.",
                  ].map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={
                          item
                        }
                        className="flex items-center gap-4"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[9px] font-semibold">
                          {String(
                            index +
                              1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <p className="text-[12px] text-black/55">
                          {
                            item
                          }
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </StepContainer>
          )}

          {/* ERROR */}

          {submitError && (
            <div
              role="alert"
              className="mt-8 rounded-[16px] border border-red-200 bg-red-50 px-5 py-4"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-red-500">
                Request
                could not
                be
                submitted
              </p>

              <p className="mt-2 text-[12px] leading-5 text-red-700">
                {
                  submitError
                }
              </p>
            </div>
          )}

          {/* CONTROLS */}

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-black/[0.09] pt-6">
            {step >
            0 ? (
              <button
                type="button"
                onClick={
                  back
                }
                disabled={
                  submitting
                }
                className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-[12px] font-semibold text-black/50 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft
                  size={
                    14
                  }
                />

                Back
              </button>
            ) : (
              <div />
            )}

            {step <
            steps.length -
              1 ? (
              <button
                type="button"
                onClick={
                  next
                }
                disabled={
                  submitting
                }
                className="inline-flex h-12 items-center gap-3 rounded-full bg-[#111] px-6 text-[12px] font-semibold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue

                <ArrowRight
                  size={
                    14
                  }
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={
                  submitRequest
                }
                disabled={
                  submitting
                }
                className="inline-flex h-12 min-w-[215px] items-center justify-center gap-3 rounded-full bg-[#111] px-6 text-[12px] font-semibold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    Submitting...
                  </>
                ) : (
                  <>
                    Submit
                    Project
                    Request

                    <ArrowRight
                      size={
                        14
                      }
                    />
                  </>
                )}
              </button>
            )}
          </div>
        </main>

        {/* SUMMARY SIDEBAR */}

        <aside className="hidden xl:block">
          <div className="sticky top-[100px] rounded-[20px] border border-black/[0.09] bg-white p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/30">
              Your request
            </p>

            <div className="mt-6">
              <SummaryItem
                label="Project"
                value={
                  selectedProject?.title ||
                  "Not selected"
                }
              />

              <SummaryItem
                label="Business"
                value={
                  form.businessName ||
                  "Not provided"
                }
              />

              <SummaryItem
                label="Investment"
                value={
                  form.budget ||
                  "Not selected"
                }
              />

              <SummaryItem
                label="Timeline"
                value={
                  form.timeline ||
                  "Not selected"
                }
              />
            </div>

            <div className="mt-6 rounded-[15px] bg-[#f2f2ee] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-black/30">
                Need help?
              </p>

              <p className="mt-2 text-[11px] leading-5 text-black/45">
                You can
                leave
                uncertain
                areas open.
                Fynaro will
                help define
                the right
                technical
                scope.
              </p>

              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold"
              >
                Talk to
                Fynaro

                <ArrowRight
                  size={
                    12
                  }
                />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StepContainer({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow:
    string;

  title:
    string;

  description:
    string;

  children:
    React.ReactNode;
}) {
  return (
    <section>
      <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-black/35">
        {eyebrow}
      </p>

      <h2 className="mt-3 max-w-[700px] text-[32px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[40px]">
        {title}
      </h2>

      <p className="mt-4 max-w-[640px] text-[12px] leading-6 text-black/45">
        {
          description
        }
      </p>

      <div className="mt-8">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  optional,
  value,
  onChange,
  placeholder,
  disabled,
}: {
  label:
    string;

  optional?:
    boolean;

  value:
    string;

  onChange: (
    value: string
  ) => void;

  placeholder?:
    string;

  disabled?:
    boolean;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-[11px] font-semibold">
          {label}
        </span>

        {optional && (
          <span className="text-[9px] uppercase tracking-[0.12em] text-black/30">
            Optional
          </span>
        )}
      </div>

      <input
        type="text"
        value={
          value
        }
        disabled={
          disabled
        }
        onChange={(
          event
        ) =>
          onChange(
            event.target
              .value
          )
        }
        placeholder={
          placeholder
        }
        className="h-13 w-full rounded-[14px] border border-black/[0.1] bg-white px-4 text-[13px] outline-none transition placeholder:text-black/25 focus:border-black/30 disabled:cursor-not-allowed disabled:bg-black/[0.02] disabled:opacity-60"
      />
    </label>
  );
}

function TextArea({
  label,
  optional,
  value,
  onChange,
  placeholder,
  disabled,
}: {
  label:
    string;

  optional?:
    boolean;

  value:
    string;

  onChange: (
    value: string
  ) => void;

  placeholder?:
    string;

  disabled?:
    boolean;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-[11px] font-semibold">
          {label}
        </span>

        {optional && (
          <span className="text-[9px] uppercase tracking-[0.12em] text-black/30">
            Optional
          </span>
        )}
      </div>

      <textarea
        value={
          value
        }
        disabled={
          disabled
        }
        onChange={(
          event
        ) =>
          onChange(
            event.target
              .value
          )
        }
        placeholder={
          placeholder
        }
        rows={6}
        className="w-full resize-none rounded-[14px] border border-black/[0.1] bg-white p-4 text-[13px] leading-6 outline-none transition placeholder:text-black/25 focus:border-black/30 disabled:cursor-not-allowed disabled:bg-black/[0.02] disabled:opacity-60"
      />
    </label>
  );
}

function ReviewRow({
  label,
  value,
  multiline,
}: {
  label:
    string;

  value:
    string;

  multiline?:
    boolean;
}) {
  return (
    <div className="grid gap-3 border-b border-black/[0.07] p-5 last:border-b-0 sm:grid-cols-[180px_1fr]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/30">
        {label}
      </p>

      <p
        className={[
          "text-[12px] text-black/60",
          multiline
            ? "leading-6"
            : "",
        ].join(
          " "
        )}
      >
        {value}
      </p>
    </div>
  );
}

function SummaryItem({
  label,
  value,
}: {
  label:
    string;

  value:
    string;
}) {
  return (
    <div className="border-b border-black/[0.07] py-4 first:pt-0 last:border-b-0">
      <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/30">
        {label}
      </p>

      <p className="mt-1.5 text-[12px] font-medium">
        {value}
      </p>
    </div>
  );
}