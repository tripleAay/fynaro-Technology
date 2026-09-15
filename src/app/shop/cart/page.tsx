"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  Check,
  ChevronRight,
  CircleCheck,
  CreditCard,
  LockKeyhole,
  MapPin,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UserRound,
} from "lucide-react";

import {
  useCart,
} from "@/contexts/cartContext";

import PayNowButton from "@/components/dashboard components/PayNowButton";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type AuthUser = {
  id?: string;
  _id?: string;
  email?: string | null;
  fullName?: string | null;
  full_name?: string | null;
  name?: string | null;
};

type StoredProfile = {
  phone: string;
  company: string;
  role: string;
  website: string;
  address: string;
  city: string;
  state: string;
};

type CheckoutDetails = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  company: string;
  orderNote: string;
};

type CheckoutErrors =
  Partial<
    Record<
      keyof CheckoutDetails,
      string
    >
  >;

const PROFILE_STORAGE_KEY =
  "fynaro_profile_details";

const CHECKOUT_STORAGE_KEY =
  "fynaro_checkout_details";

const EMPTY_PROFILE: StoredProfile = {
  phone: "",
  company: "",
  role: "",
  website: "",
  address: "",
  city: "",
  state: "",
};

const EMPTY_CHECKOUT: CheckoutDetails = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  company: "",
  orderNote: "",
};

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

function safeString(
  value:
    | string
    | null
    | undefined
) {
  return value?.trim() || "";
}

function parsePrice(
  price: string
) {
  const numeric =
    price.replace(
      /[^\d.]/g,
      ""
    );

  return Number.parseFloat(
    numeric || "0"
  );
}

function formatNGN(
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

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function CheckoutPage() {
  const {
    items,
  } = useCart();

  const [
    details,
    setDetails,
  ] =
    useState<CheckoutDetails>(
      EMPTY_CHECKOUT
    );

  const [
    errors,
    setErrors,
  ] =
    useState<CheckoutErrors>(
      {}
    );

  const [
    confirmed,
    setConfirmed,
  ] =
    useState(false);

  const [
    loadingProfile,
    setLoadingProfile,
  ] =
    useState(true);

  const [
    accountLoaded,
    setAccountLoaded,
  ] =
    useState(false);

  const [
    profileData,
    setProfileData,
  ] =
    useState<StoredProfile>(
      EMPTY_PROFILE
    );

  /* ------------------------------------------------------------------------ */
  /* TOTALS                                                                   */
  /* ------------------------------------------------------------------------ */

  const {
    subtotal,
    itemCount,
  } = useMemo(
    () => {
      const subtotalValue =
        items.reduce(
          (
            total,
            item
          ) =>
            total +
            parsePrice(
              item.price
            ) *
              (item.quantity ??
                1),
          0
        );

      const countValue =
        items.reduce(
          (
            total,
            item
          ) =>
            total +
            (item.quantity ??
              1),
          0
        );

      return {
        subtotal:
          subtotalValue,
        itemCount:
          countValue,
      };
    },
    [
      items,
    ]
  );

  const vat =
    subtotal * 0.075;

  const shipping =
    items.length > 0
      ? 3500
      : 0;

  const total =
    subtotal +
    vat +
    shipping;

  const isEmpty =
    items.length === 0;

  /* ------------------------------------------------------------------------ */
  /* LOAD REAL AUTH USER + PROFILE                                            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    let active = true;

    async function loadCustomer() {
      setLoadingProfile(true);

      try {
        const response =
          await fetch(
            "/api/auth/me",
            {
              method: "GET",
              credentials:
                "include",
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
            .catch(
              () => ({})
            );

        if (
          !response.ok ||
          !data?.user
        ) {
          throw new Error(
            data?.message ||
              "Unable to load signed-in customer."
          );
        }

        const user =
          data.user as AuthUser;

        const fullName =
          safeString(
            user.fullName
          ) ||
          safeString(
            user.full_name
          ) ||
          safeString(
            user.name
          );

        const email =
          safeString(
            user.email
          );

        let storedProfile:
          StoredProfile = {
          ...EMPTY_PROFILE,
        };

        const rawProfile =
          window.localStorage.getItem(
            PROFILE_STORAGE_KEY
          );

        if (rawProfile) {
          try {
            storedProfile =
              {
                ...EMPTY_PROFILE,
                ...JSON.parse(
                  rawProfile
                ),
              };
          } catch {
            window.localStorage.removeItem(
              PROFILE_STORAGE_KEY
            );
          }
        }

        let savedCheckout:
          Partial<CheckoutDetails> =
          {};

        const rawCheckout =
          window.sessionStorage.getItem(
            CHECKOUT_STORAGE_KEY
          );

        if (rawCheckout) {
          try {
            savedCheckout =
              JSON.parse(
                rawCheckout
              );
          } catch {
            window.sessionStorage.removeItem(
              CHECKOUT_STORAGE_KEY
            );
          }
        }

        if (!active) {
          return;
        }

        setProfileData(
          storedProfile
        );

        setDetails({
          /*
           * Name + email ALWAYS come
           * from current signed-in user.
           */
          fullName,
          email,

          /*
           * Checkout input takes priority,
           * then saved Fynaro profile.
           */
          phone:
            safeString(
              savedCheckout.phone
            ) ||
            safeString(
              storedProfile.phone
            ),

          company:
            safeString(
              savedCheckout.company
            ) ||
            safeString(
              storedProfile.company
            ),

          address:
            safeString(
              savedCheckout.address
            ) ||
            safeString(
              storedProfile.address
            ),

          city:
            safeString(
              savedCheckout.city
            ) ||
            safeString(
              storedProfile.city
            ),

          state:
            safeString(
              savedCheckout.state
            ) ||
            safeString(
              storedProfile.state
            ),

          orderNote:
            savedCheckout.orderNote ??
            "",
        });

        setAccountLoaded(
          true
        );
      } catch (
        error
      ) {
        console.error(
          "Checkout customer load error:",
          error
        );

        if (active) {
          setAccountLoaded(
            false
          );
        }
      } finally {
        if (active) {
          setLoadingProfile(
            false
          );
        }
      }
    }

    loadCustomer();

    return () => {
      active = false;
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* PROFILE UPDATE EVENT                                                     */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    function syncProfile() {
      const stored =
        window.localStorage.getItem(
          PROFILE_STORAGE_KEY
        );

      if (!stored) {
        return;
      }

      try {
        const parsed =
          {
            ...EMPTY_PROFILE,
            ...JSON.parse(
              stored
            ),
          };

        setProfileData(
          parsed
        );

        setDetails(
          (current) => ({
            ...current,

            phone:
              current.phone ||
              parsed.phone,

            company:
              current.company ||
              parsed.company,

            address:
              current.address ||
              parsed.address,

            city:
              current.city ||
              parsed.city,

            state:
              current.state ||
              parsed.state,
          })
        );
      } catch {
        return;
      }
    }

    window.addEventListener(
      "fynaro-profile-updated",
      syncProfile
    );

    window.addEventListener(
      "storage",
      syncProfile
    );

    return () => {
      window.removeEventListener(
        "fynaro-profile-updated",
        syncProfile
      );

      window.removeEventListener(
        "storage",
        syncProfile
      );
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* SAVE TEMP CHECKOUT                                                       */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (
      !accountLoaded
    ) {
      return;
    }

    window.sessionStorage.setItem(
      CHECKOUT_STORAGE_KEY,
      JSON.stringify(
        details
      )
    );
  }, [
    details,
    accountLoaded,
  ]);

  /* ------------------------------------------------------------------------ */
  /* FIELD UPDATE                                                             */
  /* ------------------------------------------------------------------------ */

  function updateField(
    field:
      keyof CheckoutDetails,
    value: string
  ) {
    if (
      field ===
        "fullName" ||
      field ===
        "email"
    ) {
      return;
    }

    setDetails(
      (current) => ({
        ...current,
        [field]: value,
      })
    );

    if (
      errors[field]
    ) {
      setErrors(
        (current) => ({
          ...current,
          [field]:
            undefined,
        })
      );
    }
  }

  /* ------------------------------------------------------------------------ */
  /* VALIDATE                                                                 */
  /* ------------------------------------------------------------------------ */

  function validate() {
    const next:
      CheckoutErrors =
      {};

    if (
      !details.fullName.trim()
    ) {
      next.fullName =
        "Account name unavailable.";
    }

    if (
      !details.email.trim()
    ) {
      next.email =
        "Account email unavailable.";
    }

    if (
      !details.phone.trim()
    ) {
      next.phone =
        "Enter your phone number.";
    }

    if (
      !details.address.trim()
    ) {
      next.address =
        "Enter your delivery address.";
    }

    if (
      !details.city.trim()
    ) {
      next.city =
        "Enter your city.";
    }

    if (
      !details.state.trim()
    ) {
      next.state =
        "Enter your state.";
    }

    setErrors(
      next
    );

    return (
      Object.keys(
        next
      ).length === 0
    );
  }

  function handleReview(
    event: FormEvent
  ) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setConfirmed(
      true
    );

    window.scrollTo({
      top: 0,
      behavior:
        "smooth",
    });
  }

  /* ------------------------------------------------------------------------ */
  /* LOADING                                                                  */
  /* ------------------------------------------------------------------------ */

  if (
    loadingProfile
  ) {
    return (
      <CheckoutLoading />
    );
  }

  /* ------------------------------------------------------------------------ */
  /* EMPTY CART                                                               */
  /* ------------------------------------------------------------------------ */

  if (isEmpty) {
    return (
      <div className="mx-auto w-full max-w-[1460px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[22px] border border-black/[0.08] bg-white p-8 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2f2ed]">
            <ShoppingBag
              size={19}
            />
          </span>

          <h1 className="mt-6 text-[32px] font-semibold tracking-[-0.045em]">
            Your cart is empty.
          </h1>

          <Link
            href="/shop"
            className="mt-7 inline-flex h-10 items-center gap-2 rounded-full bg-[#111] px-5 text-[10px] font-semibold text-white"
          >
            Explore Fynaro

            <ChevronRight
              size={11}
            />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1460px] px-4 py-6 pb-14 sm:px-6 lg:px-8 lg:py-8">
      {/* BREADCRUMB */}

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] pb-5">
        <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
          <Link
            href="/shop"
          >
            Dashboard
          </Link>

          <span>/</span>

          <Link
            href="/shop/cart"
          >
            Cart
          </Link>

          <span>/</span>

          <span className="text-black/60">
            Checkout
          </span>
        </div>

        <Link
          href="/shop/cart"
          className="inline-flex items-center gap-2 text-[10px] font-semibold text-black/40 transition hover:text-black"
        >
          <ArrowLeft
            size={12}
          />

          Back to cart
        </Link>
      </div>

      {/* HERO */}

      <section className="grid gap-8 border-b border-black/[0.08] py-9 lg:grid-cols-[1.25fr_.75fr] lg:items-end lg:py-11">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2f2ed]">
              <CreditCard
                size={15}
              />
            </span>

            <p className="text-[9px] font-semibold uppercase tracking-[0.19em] text-black/35">
              Fynaro / Checkout
            </p>
          </div>

          <h1 className="text-[42px] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-[54px] lg:text-[64px]">
            Complete your
            <br />
            order.
          </h1>
        </div>

        <div>
          <p className="max-w-[420px] text-[12px] leading-6 text-black/45">
            Confirm your
            information, review
            the order and continue
            to secure payment.
          </p>

          <div className="mt-5 flex items-center gap-2">
            <StepBadge
              number="01"
              label="Details"
              active={
                !confirmed
              }
              complete={
                confirmed
              }
            />

            <span className="h-px w-5 bg-black/[0.1]" />

            <StepBadge
              number="02"
              label="Payment"
              active={
                confirmed
              }
            />
          </div>
        </div>
      </section>

      <div className="grid gap-7 py-9 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
        <main>
          {!confirmed ? (
            <form
              onSubmit={
                handleReview
              }
            >
              {/* CUSTOMER */}

              <CheckoutSection
                icon={
                  UserRound
                }
                eyebrow="Contact"
                title="Who is placing the order?"
                description="Your identity comes directly from the Fynaro account currently signed in."
              >
                {!accountLoaded && (
                  <div className="mb-5 rounded-[14px] border border-[#a94444]/15 bg-[#fbf5f5] p-4">
                    <p className="text-[9px] font-semibold text-[#8c3c3c]">
                      Signed-in account
                      information could
                      not be loaded.
                    </p>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <AccountDetail
                    label="Full name"
                    value={
                      details.fullName
                    }
                  />

                  <AccountDetail
                    label="Email address"
                    value={
                      details.email
                    }
                  />

                  <CheckoutField
                    label="Phone number"
                    value={
                      details.phone
                    }
                    type="tel"
                    required
                    error={
                      errors.phone
                    }
                    placeholder="Enter phone number"
                    dark={
                      !profileData.phone
                    }
                    onChange={(
                      value
                    ) =>
                      updateField(
                        "phone",
                        value
                      )
                    }
                  />

                  <CheckoutField
                    label="Company"
                    value={
                      details.company
                    }
                    placeholder="Optional business name"
                    dark={
                      !profileData.company
                    }
                    onChange={(
                      value
                    ) =>
                      updateField(
                        "company",
                        value
                      )
                    }
                  />
                </div>

                <div className="mt-4 flex items-start gap-2 rounded-[12px] bg-[#f6f6f2] px-3 py-2.5">
                  <CircleCheck
                    size={13}
                    className="mt-0.5 shrink-0 text-[#4c6a50]"
                  />

                  <p className="text-[8px] leading-4 text-black/40">
                    Name and email are
                    tied to your signed-in
                    account. Missing
                    profile information
                    appears as a dark
                    field for completion.
                  </p>
                </div>
              </CheckoutSection>

              {/* DELIVERY */}

              <CheckoutSection
                icon={
                  MapPin
                }
                eyebrow="Delivery"
                title="Where should the order go?"
                description="Your saved default address is used when available. You can change it for this order."
              >
                <div className="grid gap-4">
                  <CheckoutField
                    label="Delivery address"
                    required
                    value={
                      details.address
                    }
                    error={
                      errors.address
                    }
                    placeholder="Enter street address"
                    dark={
                      !profileData.address
                    }
                    onChange={(
                      value
                    ) =>
                      updateField(
                        "address",
                        value
                      )
                    }
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <CheckoutField
                      label="City"
                      required
                      value={
                        details.city
                      }
                      error={
                        errors.city
                      }
                      placeholder="Enter city"
                      dark={
                        !profileData.city
                      }
                      onChange={(
                        value
                      ) =>
                        updateField(
                          "city",
                          value
                        )
                      }
                    />

                    <CheckoutField
                      label="State"
                      required
                      value={
                        details.state
                      }
                      error={
                        errors.state
                      }
                      placeholder="Enter state"
                      dark={
                        !profileData.state
                      }
                      onChange={(
                        value
                      ) =>
                        updateField(
                          "state",
                          value
                        )
                      }
                    />
                  </div>
                </div>
              </CheckoutSection>

              {/* NOTE */}

              <CheckoutSection
                icon={
                  PackageCheck
                }
                eyebrow="Order note"
                title="Anything we should know?"
                description="Add branding instructions, delivery notes or anything Fynaro should confirm."
              >
                <textarea
                  rows={5}
                  value={
                    details.orderNote
                  }
                  onChange={(
                    event
                  ) =>
                    updateField(
                      "orderNote",
                      event.target
                        .value
                    )
                  }
                  placeholder="Optional instructions..."
                  className="w-full resize-none rounded-[14px] border border-black/[0.09] bg-white px-4 py-3 text-[11px] leading-5 outline-none transition placeholder:text-black/25 focus:border-black/30"
                />
              </CheckoutSection>

              <button
                type="submit"
                className="group mt-5 flex h-11 items-center gap-2 rounded-full bg-[#111] px-5 text-[10px] font-semibold text-white transition hover:bg-black/80"
              >
                Review and continue

                <ChevronRight
                  size={12}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </button>
            </form>
          ) : (
            <div>
              <section className="overflow-hidden rounded-[20px] border border-black/[0.08] bg-white">
                <div className="flex items-start justify-between gap-5 border-b border-black/[0.07] p-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eef3ea] text-[#35573c]">
                        <Check
                          size={12}
                        />
                      </span>

                      <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-black/30">
                        Details confirmed
                      </p>
                    </div>

                    <h2 className="mt-4 text-[26px] font-semibold tracking-[-0.04em]">
                      Review before
                      payment.
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setConfirmed(
                        false
                      )
                    }
                    className="text-[9px] font-semibold text-black/35 hover:text-black"
                  >
                    Edit details
                  </button>
                </div>

                <div className="grid gap-px bg-black/[0.07] sm:grid-cols-2">
                  <ReviewBlock
                    label="Customer"
                    value={
                      details.fullName
                    }
                    secondary={
                      details.email
                    }
                  />

                  <ReviewBlock
                    label="Phone"
                    value={
                      details.phone
                    }
                    secondary={
                      details.company ||
                      undefined
                    }
                  />

                  <ReviewBlock
                    label="Delivery"
                    value={
                      details.address
                    }
                    secondary={`${details.city}, ${details.state}`}
                  />

                  <ReviewBlock
                    label="Order"
                    value={`${itemCount} ${
                      itemCount ===
                      1
                        ? "item"
                        : "items"
                    }`}
                    secondary={formatNGN(
                      total
                    )}
                  />
                </div>
              </section>

              <section className="mt-4 overflow-hidden rounded-[20px] border border-black/[0.08] bg-white">
                <div className="flex items-center justify-between border-b border-black/[0.07] p-6">
                  <div>
                    <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-black/30">
                      Payment
                    </p>

                    <h2 className="mt-2 text-[20px] font-semibold tracking-[-0.03em]">
                      Pay securely.
                    </h2>
                  </div>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2f2ed]">
                    <LockKeyhole
                      size={14}
                    />
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-black/30">
                        Amount due
                      </p>

                      <p className="mt-1 text-[9px] text-black/30">
                        NGN
                      </p>
                    </div>

                    <p className="text-[28px] font-semibold tracking-[-0.045em]">
                      {formatNGN(
                        total
                      )}
                    </p>
                  </div>

                  <PayNowButton
                    serviceId={`cart_${items.length}_${Math.round(
                      total
                    )}`}
                    serviceTitle={`Fynaro Order - ${itemCount} ${
                      itemCount ===
                      1
                        ? "item"
                        : "items"
                    }`}
                    amount={
                      total
                    }
                    currency="NGN"
                    redirectUrl="/shop/success"
                    buttonText={`Pay ${formatNGN(
                      total
                    )}`}
                    className="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-[#111] px-5 text-[10px] font-semibold text-white"
                  />
                </div>
              </section>
            </div>
          )}
        </main>

        {/* SUMMARY */}

        <aside className="xl:sticky xl:top-24">
          <div className="overflow-hidden rounded-[20px] border border-black/[0.08] bg-white">
            <div className="bg-[#111] p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/35">
                    Your order
                  </p>

                  <h2 className="mt-3 text-[22px] font-semibold tracking-[-0.04em]">
                    {itemCount}{" "}
                    {itemCount ===
                    1
                      ? "item"
                      : "items"}
                  </h2>
                </div>

                <ShoppingBag
                  size={15}
                  className="text-white/50"
                />
              </div>
            </div>

            <div className="max-h-[330px] overflow-y-auto">
              {items.map(
                (item) => {
                  const quantity =
                    item.quantity ??
                    1;

                  const lineTotal =
                    parsePrice(
                      item.price
                    ) *
                    quantity;

                  return (
                    <div
                      key={
                        item.id
                      }
                      className="flex gap-3 border-b border-black/[0.07] p-4 last:border-b-0"
                    >
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[11px] bg-[#f4f4ef]">
                        {item.image ? (
                          <Image
                            src={
                              item.image
                            }
                            alt={
                              item.name
                            }
                            fill
                            sizes="56px"
                            className="object-contain p-1"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <ShoppingBag
                              size={14}
                              className="text-black/20"
                            />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-[10px] font-semibold leading-4">
                          {
                            item.name
                          }
                        </p>

                        <p className="mt-1 text-[8px] text-black/35">
                          Qty{" "}
                          {
                            quantity
                          }
                        </p>
                      </div>

                      <span className="shrink-0 text-[9px] font-semibold text-black/60">
                        {formatNGN(
                          lineTotal
                        )}
                      </span>
                    </div>
                  );
                }
              )}
            </div>

            <div className="p-5">
              <div className="space-y-3">
                <SummaryRow
                  label="Subtotal"
                  value={formatNGN(
                    subtotal
                  )}
                />

                <SummaryRow
                  label="VAT"
                  value={formatNGN(
                    vat
                  )}
                  helper="7.5%"
                />

                <SummaryRow
                  label="Shipping"
                  value={formatNGN(
                    shipping
                  )}
                />
              </div>

              <div className="mt-5 border-t border-black/[0.08] pt-5">
                <div className="flex items-end justify-between">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-black/30">
                    Total
                  </span>

                  <span className="text-[22px] font-semibold tracking-[-0.04em]">
                    {formatNGN(
                      total
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-[18px] bg-[#f0f0eb] p-5">
            <InfoRow
              icon={
                Truck
              }
              title="Delivery"
              description="Final fulfilment details are confirmed after payment."
            />

            <InfoRow
              icon={
                ShieldCheck
              }
              title="Protected payment"
              description="Payment confirmation is recorded against your Fynaro order."
            />

            <InfoRow
              icon={
                CircleCheck
              }
              title="Order confirmation"
              description="You'll receive confirmation when payment succeeds."
              last
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                 */
/* -------------------------------------------------------------------------- */

function AccountDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const available =
    Boolean(
      value.trim()
    );

  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-black/35">
        {label}
      </p>

      <div
        className={[
          "mt-2 flex h-11 items-center justify-between gap-3 rounded-[13px] border px-4",
          available
            ? "border-black/[0.08] bg-[#f3f3ef]"
            : "border-[#111] bg-[#111] text-white",
        ].join(
          " "
        )}
      >
        <span className="truncate text-[11px] font-semibold">
          {available
            ? value
            : "Not available"}
        </span>

        {available && (
          <span className="shrink-0 rounded-full bg-[#e5ece2] px-2 py-1 text-[6px] font-semibold uppercase tracking-[0.1em] text-[#48604b]">
            Account
          </span>
        )}
      </div>
    </div>
  );
}

function CheckoutField({
  label,
  value,
  placeholder,
  error,
  required = false,
  type = "text",
  dark = false,
  onChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  required?: boolean;
  type?:
    | "text"
    | "email"
    | "tel";
  dark?: boolean;
  onChange: (
    value: string
  ) => void;
}) {
  return (
    <label className="block">
      <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-black/35">
        {label}

        {required && (
          <span className="ml-1 text-[#997d2f]">
            *
          </span>
        )}

        {dark && (
          <span className="ml-2 text-[6px] normal-case tracking-normal text-black/30">
            Update required
          </span>
        )}
      </span>

      <input
        type={type}
        value={value}
        required={
          required
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
        className={[
          "mt-2 h-11 w-full rounded-[13px] border px-4 text-[11px] outline-none transition",

          dark &&
          !value.trim()
            ? "border-[#111] bg-[#111] text-white placeholder:text-white/35 focus:bg-black"
            : "border-black/[0.09] bg-white text-black placeholder:text-black/25 focus:border-black/30",

          error
            ? "border-[#a64242]"
            : "",
        ].join(
          " "
        )}
      />

      {error && (
        <p className="mt-1.5 text-[8px] font-medium text-[#9b3434]">
          {error}
        </p>
      )}
    </label>
  );
}

function CheckoutSection({
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
}: {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  description: string;
  children:
    React.ReactNode;
}) {
  return (
    <section className="mb-4 overflow-hidden rounded-[20px] border border-black/[0.08] bg-white">
      <div className="grid gap-4 border-b border-black/[0.07] p-6 sm:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f2f2ed]">
              <Icon
                size={11}
              />
            </span>

            <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-black/30">
              {eyebrow}
            </p>
          </div>

          <h2 className="mt-4 text-[21px] font-semibold tracking-[-0.035em]">
            {title}
          </h2>
        </div>

        <p className="max-w-[330px] text-[9px] leading-4 text-black/38 sm:text-right">
          {description}
        </p>
      </div>

      <div className="p-6">
        {children}
      </div>
    </section>
  );
}

function ReviewBlock({
  label,
  value,
  secondary,
}: {
  label: string;
  value: string;
  secondary?: string;
}) {
  return (
    <div className="bg-white p-5">
      <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-black/30">
        {label}
      </p>

      <p className="mt-2 text-[11px] font-semibold">
        {value}
      </p>

      {secondary && (
        <p className="mt-1 text-[9px] leading-4 text-black/40">
          {secondary}
        </p>
      )}
    </div>
  );
}

function SummaryRow({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="text-[9px] text-black/40">
          {label}
        </span>

        {helper && (
          <span className="rounded-full bg-black/[0.04] px-1.5 py-0.5 text-[7px] text-black/30">
            {helper}
          </span>
        )}
      </div>

      <span className="text-[9px] font-semibold text-black/60">
        {value}
      </span>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  title,
  description,
  last = false,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  last?: boolean;
}) {
  return (
    <div
      className={[
        "flex gap-3 py-3",
        last
          ? ""
          : "border-b border-black/[0.06]",
      ].join(
        " "
      )}
    >
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
        <Icon
          size={11}
        />
      </span>

      <div>
        <p className="text-[9px] font-semibold text-black/60">
          {title}
        </p>

        <p className="mt-1 text-[8px] leading-4 text-black/35">
          {description}
        </p>
      </div>
    </div>
  );
}

function StepBadge({
  number,
  label,
  active = false,
  complete = false,
}: {
  number: string;
  label: string;
  active?: boolean;
  complete?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={[
          "flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-semibold",
          active
            ? "bg-[#111] text-white"
            : complete
              ? "bg-[#e7eee3] text-[#31573a]"
              : "bg-black/[0.04] text-black/30",
        ].join(
          " "
        )}
      >
        {complete ? (
          <Check
            size={10}
          />
        ) : (
          number
        )}
      </span>

      <span className="text-[8px] font-semibold uppercase tracking-[0.12em] text-black/40">
        {label}
      </span>
    </div>
  );
}

function CheckoutLoading() {
  return (
    <div className="mx-auto w-full max-w-[1460px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="h-3 w-40 rounded bg-black/[0.05]" />

        <div className="mt-10 h-20 max-w-[500px] rounded-xl bg-black/[0.05]" />

        <div className="mt-10 grid gap-7 xl:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            <div className="h-[260px] rounded-[20px] bg-white" />
            <div className="h-[260px] rounded-[20px] bg-white" />
          </div>

          <div className="h-[400px] rounded-[20px] bg-white" />
        </div>
      </div>
    </div>
  );
}