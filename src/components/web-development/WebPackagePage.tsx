"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Minus,
  Plus,
  Sparkles,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";

import {
  packageIcons,
  packageOrder,
  packageSupportItems,
  webPackages,
  type PackageAddon,
  type PackageSlug,
  type WebPackage,
} from "@/lib/fynaro/web-development/packages";

type Props = {
  packageData: WebPackage;
};

function money(value: number) {
  return new Intl.NumberFormat(
    "en-NG",
    {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }
  ).format(value);
}

export default function WebPackagePage({
  packageData,
}: Props) {
  const [selectedAddons, setSelectedAddons] =
    useState<string[]>([]);

  const [faqOpen, setFaqOpen] =
    useState<number | null>(0);

  const [scopeOpen, setScopeOpen] =
    useState(true);

  const PackageIcon =
    packageIcons[packageData.slug];

  const selectedAddonObjects =
    useMemo(
      () =>
        packageData.addons.filter(
          (addon) =>
            selectedAddons.includes(
              addon.id
            )
        ),
      [
        packageData.addons,
        selectedAddons,
      ]
    );

  const addonTotal =
    useMemo(
      () =>
        selectedAddonObjects.reduce(
          (total, addon) =>
            total + addon.price,
          0
        ),
      [selectedAddonObjects]
    );

  const estimatedTotal =
    packageData.startingPrice +
    addonTotal;

  function toggleAddon(
    addon: PackageAddon
  ) {
    setSelectedAddons(
      (current) =>
        current.includes(addon.id)
          ? current.filter(
              (id) =>
                id !== addon.id
            )
          : [
              ...current,
              addon.id,
            ]
    );
  }

  const inquiryParams =
    new URLSearchParams();

  inquiryParams.set(
    "service",
    "web-development"
  );

  inquiryParams.set(
    "package",
    packageData.slug
  );

  if (
    selectedAddonObjects.length
  ) {
    inquiryParams.set(
      "addons",
      selectedAddonObjects
        .map(
          (addon) =>
            addon.title
        )
        .join(",")
    );
  }

  inquiryParams.set(
    "estimate",
    String(estimatedTotal)
  );

  const requestHref =
    `/shop/requests/new?${inquiryParams.toString()}`;

  return (
    <div className="mx-auto w-full max-w-[1460px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* BREADCRUMB */}

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] pb-5">
        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
          <Link
            href="/shop"
            className="transition hover:text-black"
          >
            Dashboard
          </Link>

          <span>/</span>

          <Link
            href="/shop/web-development"
            className="transition hover:text-black"
          >
            Web Development
          </Link>

          <span>/</span>

          <span className="text-black/60">
            {packageData.name}
          </span>
        </div>

        <Link
          href="/shop/web-development"
          className="inline-flex items-center gap-2 text-[10px] font-semibold text-black/40 transition hover:text-black"
        >
          <ArrowLeft size={12} />
          All web packages
        </Link>
      </div>

      {/* PACKAGE SWITCHER */}

      <div className="mt-5 flex flex-wrap gap-2">
        {packageOrder.map(
          (slug) => {
            const pkg =
              webPackages[slug];

            const active =
              slug ===
              packageData.slug;

            return (
              <Link
                key={slug}
                href={`/shop/web-development/${slug}`}
                className={[
                  "inline-flex h-9 items-center gap-2 rounded-full px-4 text-[10px] font-semibold transition",
                  active
                    ? "bg-[#111] text-white"
                    : "border border-black/[0.09] bg-white text-black/45 hover:border-black/20 hover:text-black",
                ].join(" ")}
              >
                <span
                  className={
                    active
                      ? "text-white/40"
                      : "text-black/25"
                  }
                >
                  {pkg.number}
                </span>

                {pkg.name}

                {pkg.recommended && (
                  <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#c6a85a]" />
                )}
              </Link>
            );
          }
        )}
      </div>

      {/* HERO */}

      <section className="grid gap-8 border-b border-black/[0.08] py-9 lg:grid-cols-[1.25fr_.75fr] lg:items-end lg:py-12">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-[#f7f7f3]">
              <PackageIcon
                size={15}
                strokeWidth={1.6}
              />
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.19em] text-black/35">
                Web Development /{" "}
                {packageData.number}
              </p>

              <p className="mt-1 text-[10px] font-medium text-black/45">
                {
                  packageData.eyebrow
                }
              </p>
            </div>
          </div>

          <h1 className="mt-7 max-w-[880px] text-[43px] font-semibold leading-[0.94] tracking-[-0.055em] sm:text-[56px] lg:text-[70px]">
            {
              packageData.headline
            }
          </h1>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c6a85a]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-black/35">
              {
                packageData.accentLabel
              }
            </span>
          </div>

          <p className="mt-4 max-w-[440px] text-[13px] leading-6 text-black/50">
            {
              packageData.description
            }
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href={requestHref}
              className="inline-flex h-11 items-center gap-2.5 rounded-full bg-[#111] px-5 text-[11px] font-semibold text-white transition hover:bg-black/80"
            >
              Start this project
              <ArrowUpRight
                size={13}
              />
            </Link>

            <a
              href="#configure"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-black/[0.09] px-4 text-[11px] font-semibold text-black/50 transition hover:border-black/20 hover:text-black"
            >
              Configure scope
              <ChevronDown
                size={13}
              />
            </a>
          </div>
        </div>
      </section>

      {/* COMMERCIAL OVERVIEW */}

      <section className="grid gap-px overflow-hidden rounded-[18px] border border-black/[0.08] bg-black/[0.08] lg:grid-cols-[1.3fr_repeat(3,.7fr)]">
        <div className="bg-[#111] p-6 text-white sm:p-7">
          <p className="text-[8px] font-semibold uppercase tracking-[0.17em] text-white/35">
            {
              packageData.priceLabel
            }
          </p>

          <p className="mt-2 text-[30px] font-semibold tracking-[-0.04em]">
            {money(
              packageData.startingPrice
            )}
          </p>

          <p className="mt-3 max-w-[340px] text-[10px] leading-5 text-white/45">
            {
              packageData.summary
            }
          </p>
        </div>

        {packageData.timeline.map(
          (item) => (
            <div
              key={item.label}
              className="bg-white p-6"
            >
              <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-black/30">
                {item.label}
              </p>

              <p className="mt-3 text-[15px] font-semibold tracking-[-0.02em]">
                {item.value}
              </p>
            </div>
          )
        )}
      </section>

      {/* MAIN CONTENT */}

      <div className="grid gap-8 py-10 xl:grid-cols-[1fr_350px] xl:items-start">
        <main className="min-w-0">
          {/* INCLUDED */}

          <section>
            <SectionHeading
              eyebrow="Included"
              title={`What's inside ${packageData.name}.`}
              description="The starting scope gives your project a clear foundation before any optional requirements are added."
            />

            <div className="mt-6 grid gap-px overflow-hidden rounded-[18px] border border-black/[0.08] bg-black/[0.08] sm:grid-cols-2">
              {packageData.coreFeatures.map(
                (
                  feature,
                  index
                ) => (
                  <div
                    key={
                      feature
                    }
                    className="flex items-center gap-3 bg-white p-4"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f3f3ee]">
                      <Check
                        size={11}
                      />
                    </span>

                    <span className="text-[11px] font-medium text-black/60">
                      {feature}
                    </span>

                    <span className="ml-auto text-[8px] font-semibold text-black/20">
                      {String(
                        index +
                          1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>
                  </div>
                )
              )}
            </div>
          </section>

          {/* IDEAL FOR */}

          <section className="border-t border-black/[0.08] py-10">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
              Best suited for
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {packageData.idealFor.map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/[0.08] bg-white px-4 py-2 text-[10px] font-medium text-black/50"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </section>

          {/* FEATURE GROUPS */}

          <section className="border-t border-black/[0.08] py-10">
            <SectionHeading
              eyebrow="Scope"
              title="Built around the work."
              description="The package combines design, business thinking and technical implementation rather than treating them as separate pieces."
            />

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {packageData.featureGroups.map(
                (
                  group,
                  index
                ) => (
                  <div
                    key={
                      group.title
                    }
                    className="rounded-[17px] border border-black/[0.08] bg-white p-5"
                  >
                    <span className="text-[9px] font-semibold text-[#a18435]">
                      {String(
                        index +
                          1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.03em]">
                      {
                        group.title
                      }
                    </h3>

                    <p className="mt-2 text-[10px] leading-5 text-black/40">
                      {
                        group.description
                      }
                    </p>

                    <div className="mt-5 border-t border-black/[0.07] pt-4">
                      {group.features.map(
                        (
                          feature
                        ) => (
                          <div
                            key={
                              feature
                            }
                            className="flex items-center gap-2 py-1.5"
                          >
                            <CheckCircle2
                              size={
                                11
                              }
                              className="text-black/30"
                            />

                            <span className="text-[10px] text-black/55">
                              {
                                feature
                              }
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

          {/* CONFIGURATOR */}

          <section
            id="configure"
            className="border-t border-black/[0.08] py-10"
          >
            <button
              onClick={() =>
                setScopeOpen(
                  !scopeOpen
                )
              }
              className="flex w-full items-end justify-between gap-6 text-left"
            >
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
                  Configure
                </p>

                <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.04em]">
                  Extend your
                  package.
                </h2>
              </div>

              <span
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] transition",
                  scopeOpen
                    ? "rotate-180"
                    : "",
                ].join(
                  " "
                )}
              >
                <ChevronDown
                  size={14}
                />
              </span>
            </button>

            {scopeOpen && (
              <>
                <p className="mt-3 max-w-[540px] text-[11px] leading-5 text-black/42">
                  Select anything
                  your project may
                  need. The estimate
                  updates instantly
                  and gives you a
                  useful starting
                  point for your
                  project request.
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {packageData.addons.map(
                    (
                      addon
                    ) => {
                      const selected =
                        selectedAddons.includes(
                          addon.id
                        );

                      const Icon =
                        addon.icon;

                      return (
                        <button
                          key={
                            addon.id
                          }
                          onClick={() =>
                            toggleAddon(
                              addon
                            )
                          }
                          className={[
                            "group flex min-h-[165px] flex-col rounded-[17px] border p-5 text-left transition",
                            selected
                              ? "border-[#b29547] bg-[#faf8f1]"
                              : "border-black/[0.08] bg-white hover:border-black/20",
                          ].join(
                            " "
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <span
                              className={[
                                "flex h-8 w-8 items-center justify-center rounded-full",
                                selected
                                  ? "bg-[#111] text-white"
                                  : "bg-black/[0.035]",
                              ].join(
                                " "
                              )}
                            >
                              <Icon
                                size={
                                  13
                                }
                              />
                            </span>

                            <span
                              className={[
                                "flex h-7 w-7 items-center justify-center rounded-full border transition",
                                selected
                                  ? "border-[#111] bg-[#111] text-white"
                                  : "border-black/[0.1]",
                              ].join(
                                " "
                              )}
                            >
                              {selected ? (
                                <Check
                                  size={
                                    12
                                  }
                                />
                              ) : (
                                <Plus
                                  size={
                                    12
                                  }
                                />
                              )}
                            </span>
                          </div>

                          <h3 className="mt-5 text-[14px] font-semibold">
                            {
                              addon.title
                            }
                          </h3>

                          <p className="mt-1.5 text-[10px] leading-5 text-black/40">
                            {
                              addon.description
                            }
                          </p>

                          <p className="mt-auto pt-4 text-[10px] font-semibold text-black/60">
                            {addon.priceLabel ??
                              `+ ${money(
                                addon.price
                              )}`}
                          </p>
                        </button>
                      );
                    }
                  )}
                </div>
              </>
            )}
          </section>

          {/* PROCESS */}

          <section className="border-t border-black/[0.08] py-10">
            <SectionHeading
              eyebrow="Process"
              title="How the project moves."
              description="Every stage has a purpose so scope, expectations and decisions stay clear."
            />

            <div className="mt-6 border-y border-black/[0.08]">
              {packageData.process.map(
                (
                  step,
                  index
                ) => (
                  <div
                    key={
                      step.number
                    }
                    className="grid gap-4 border-b border-black/[0.07] py-5 last:border-b-0 sm:grid-cols-[55px_170px_1fr] sm:items-start"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-semibold text-[#a18435]">
                        {
                          step.number
                        }
                      </span>

                      {index <
                        packageData
                          .process
                          .length -
                          1 && (
                        <span className="hidden h-px flex-1 bg-black/[0.08] sm:block" />
                      )}
                    </div>

                    <h3 className="text-[13px] font-semibold tracking-[-0.02em]">
                      {
                        step.title
                      }
                    </h3>

                    <p className="max-w-[540px] text-[10px] leading-5 text-black/43">
                      {
                        step.description
                      }
                    </p>
                  </div>
                )
              )}
            </div>
          </section>

          {/* FAQ */}

          <section className="border-t border-black/[0.08] py-10">
            <SectionHeading
              eyebrow="Questions"
              title="Before you start."
              description={`Common questions about the ${packageData.name} package.`}
            />

            <div className="mt-6 border-t border-black/[0.08]">
              {packageData.faqs.map(
                (
                  faq,
                  index
                ) => {
                  const open =
                    faqOpen ===
                    index;

                  return (
                    <div
                      key={
                        faq.question
                      }
                      className="border-b border-black/[0.08]"
                    >
                      <button
                        onClick={() =>
                          setFaqOpen(
                            open
                              ? null
                              : index
                          )
                        }
                        className="flex w-full items-center justify-between gap-5 py-5 text-left"
                      >
                        <span className="text-[12px] font-semibold">
                          {
                            faq.question
                          }
                        </span>

                        <span
                          className={[
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/[0.08] transition",
                            open
                              ? "rotate-180 bg-black text-white"
                              : "",
                          ].join(
                            " "
                          )}
                        >
                          <ChevronDown
                            size={
                              12
                            }
                          />
                        </span>
                      </button>

                      {open && (
                        <div className="pb-5 pr-10">
                          <p className="max-w-[650px] text-[10px] leading-5 text-black/45">
                            {
                              faq.answer
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </section>
        </main>

        {/* STICKY SUMMARY */}

        <aside className="xl:sticky xl:top-24">
          <div className="overflow-hidden rounded-[19px] border border-black/[0.08] bg-white">
            <div className="bg-[#111] p-6 text-white">
              <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/35">
                Your configuration
              </p>

              <h2 className="mt-3 text-[23px] font-semibold tracking-[-0.04em]">
                {
                  packageData.name
                }
              </h2>

              <p className="mt-2 text-[10px] leading-5 text-white/45">
                {
                  packageData.eyebrow
                }
              </p>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between gap-5">
                <span className="text-[10px] text-black/40">
                  Package
                </span>

                <span className="text-[11px] font-semibold">
                  {money(
                    packageData.startingPrice
                  )}
                </span>
              </div>

              {selectedAddonObjects.length >
                0 && (
                <div className="mt-5 border-t border-black/[0.07] pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-black/30">
                      Add-ons
                    </p>

                    <button
                      onClick={() =>
                        setSelectedAddons(
                          []
                        )
                      }
                      className="text-[9px] font-semibold text-black/35 hover:text-black"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="mt-3 space-y-3">
                    {selectedAddonObjects.map(
                      (
                        addon
                      ) => (
                        <div
                          key={
                            addon.id
                          }
                          className="flex items-start justify-between gap-3"
                        >
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                toggleAddon(
                                  addon
                                )
                              }
                              className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black/[0.05] text-black/45"
                            >
                              <Minus
                                size={
                                  9
                                }
                              />
                            </button>

                            <span className="text-[9px] leading-4 text-black/50">
                              {
                                addon.title
                              }
                            </span>
                          </div>

                          <span className="shrink-0 text-[9px] font-medium text-black/55">
                            {money(
                              addon.price
                            )}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              <div className="mt-5 border-t border-black/[0.08] pt-5">
                <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-black/30">
                  Estimated starting
                  investment
                </p>

                <p className="mt-2 text-[24px] font-semibold tracking-[-0.04em]">
                  {money(
                    estimatedTotal
                  )}
                </p>

                <p className="mt-2 text-[9px] leading-4 text-black/35">
                  This is a planning
                  estimate. Final
                  pricing is confirmed
                  after project
                  scoping.
                </p>
              </div>

              <Link
                href={requestHref}
                className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#111] text-[10px] font-semibold text-white transition hover:bg-black/80"
              >
                Request this project

                <ArrowUpRight
                  size={12}
                />
              </Link>

              <Link
                href="/shop/web-development"
                className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-full text-[9px] font-semibold text-black/40 transition hover:text-black"
              >
                Compare packages
              </Link>
            </div>
          </div>

          {/* SUPPORT */}

          <div className="mt-3 rounded-[18px] bg-[#f3f3ee] p-5">
            <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-black/30">
              Working with Fynaro
            </p>

            <div className="mt-4 space-y-3">
              {packageSupportItems.map(
                (item) => {
                  const Icon =
                    item.icon;

                  return (
                    <div
                      key={
                        item.title
                      }
                      className="flex items-center gap-3"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                        <Icon
                          size={
                            11
                          }
                        />
                      </span>

                      <span className="text-[9px] font-medium text-black/50">
                        {
                          item.title
                        }
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* FINAL CTA */}

      <section className="pb-6">
        <div className="overflow-hidden rounded-[22px] bg-[#e9e9e3]">
          <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[1.3fr_.7fr] lg:items-end lg:p-11">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
                Ready when you are
              </p>

              <h2 className="mt-4 max-w-[680px] text-[34px] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-[42px]">
                Build{" "}
                {
                  packageData.name
                }{" "}
                around your actual
                business.
              </h2>
            </div>

            <div>
              <p className="text-[11px] leading-5 text-black/45">
                Tell us what you're
                building. We'll review
                your requirements,
                validate the scope and
                turn it into a clear
                project proposal.
              </p>

              <Link
                href={requestHref}
                className="mt-5 inline-flex h-11 items-center gap-2.5 rounded-full bg-[#111] px-5 text-[10px] font-semibold text-white"
              >
                Start{" "}
                {
                  packageData.name
                }

                <ArrowRight
                  size={12}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

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

        <h2 className="mt-2 max-w-[600px] text-[27px] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-[31px]">
          {title}
        </h2>
      </div>

      <p className="max-w-[410px] text-[10px] leading-5 text-black/42 lg:justify-self-end">
        {description}
      </p>
    </div>
  );
}