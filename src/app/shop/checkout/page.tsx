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

import {
  useAuth,
} from "@/hooks/useAuth";

import PayNowButton from "@/components/dashboard components/PayNowButton";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

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

type CheckoutAuthUser = {
  id?: string;

  _id?: string;

  email?: string | null;

  fullName?: string | null;

  full_name?: string | null;

  name?: string | null;

  phone?: string | null;

  phone_number?: string | null;

  company?: string | null;

  company_name?: string | null;

  address?: string | null;

  address_line_1?: string | null;

  city?: string | null;

  state?: string | null;
};

/* -------------------------------------------------------------------------- */
/* CONSTANTS                                                                  */
/* -------------------------------------------------------------------------- */

const EMPTY_CHECKOUT_DETAILS: CheckoutDetails = {
  fullName: "",
  email: "",
  phone: "",

  address: "",
  city: "",
  state: "",

  company: "",
  orderNote: "",
};

const CHECKOUT_STORAGE_KEY =
  "fynaro_checkout_details";

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

const parsePrice = (
  price: string
): number => {
  const numeric =
    price.replace(
      /[^\d.]/g,
      ""
    );

  return Number.parseFloat(
    numeric || "0"
  );
};

const formatNGN = (
  amount: number
) =>
  new Intl.NumberFormat(
    "en-NG",
    {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }
  ).format(amount);

function safeString(
  value:
    | string
    | null
    | undefined
) {
  return value?.trim() || "";
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function CheckoutPage() {
  /* ------------------------------------------------------------------------ */
  /* CART                                                                     */
  /* ------------------------------------------------------------------------ */

  const {
    items,
  } = useCart();

  /* ------------------------------------------------------------------------ */
  /* AUTH                                                                     */
  /* ------------------------------------------------------------------------ */

  const {
    user,
    loading: authLoading,
  } = useAuth();

  const authUser =
    user as
      | CheckoutAuthUser
      | null
      | undefined;

  /* ------------------------------------------------------------------------ */
  /* CHECKOUT STATE                                                           */
  /* ------------------------------------------------------------------------ */

  const [
    details,
    setDetails,
  ] =
    useState<CheckoutDetails>(
      EMPTY_CHECKOUT_DETAILS
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
    detailsReady,
    setDetailsReady,
  ] =
    useState(false);

  /* ------------------------------------------------------------------------ */
  /* ORDER TOTALS                                                             */
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
  /* AUTH PROFILE DEFAULTS                                                    */
  /* ------------------------------------------------------------------------ */

  const profileDefaults =
    useMemo<CheckoutDetails>(
      () => {
        return {
          fullName:
            safeString(
              authUser?.fullName
            ) ||
            safeString(
              authUser?.full_name
            ) ||
            safeString(
              authUser?.name
            ),

          email:
            safeString(
              authUser?.email
            ),

          phone:
            safeString(
              authUser?.phone
            ) ||
            safeString(
              authUser?.phone_number
            ),

          address:
            safeString(
              authUser?.address
            ) ||
            safeString(
              authUser?.address_line_1
            ),

          city:
            safeString(
              authUser?.city
            ),

          state:
            safeString(
              authUser?.state
            ),

          company:
            safeString(
              authUser?.company
            ) ||
            safeString(
              authUser?.company_name
            ),

          orderNote: "",
        };
      },
      [
        authUser?.fullName,
        authUser?.full_name,
        authUser?.name,
        authUser?.email,
        authUser?.phone,
        authUser?.phone_number,
        authUser?.address,
        authUser?.address_line_1,
        authUser?.city,
        authUser?.state,
        authUser?.company,
        authUser?.company_name,
      ]
    );

  /* ------------------------------------------------------------------------ */
  /* LOAD USER DETAILS + SAVED CHECKOUT                                      */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    if (authLoading) {
      return;
    }

    let saved:
      Partial<CheckoutDetails> =
      {};

    const stored =
      window.sessionStorage.getItem(
        CHECKOUT_STORAGE_KEY
      );

    if (stored) {
      try {
        saved =
          JSON.parse(
            stored
          ) as Partial<CheckoutDetails>;
      } catch {
        window.sessionStorage.removeItem(
          CHECKOUT_STORAGE_KEY
        );
      }
    }

    setDetails({
      /*
       * ACCOUNT IDENTITY
       *
       * Always prefer the currently
       * authenticated account.
       */
      fullName:
        profileDefaults.fullName ||
        safeString(
          saved.fullName
        ),

      email:
        profileDefaults.email ||
        safeString(
          saved.email
        ),

      /*
       * OTHER CHECKOUT INFORMATION
       *
       * Previously entered checkout
       * information is allowed.
       */
      phone:
        safeString(
          saved.phone
        ) ||
        profileDefaults.phone,

      address:
        safeString(
          saved.address
        ) ||
        profileDefaults.address,

      city:
        safeString(
          saved.city
        ) ||
        profileDefaults.city,

      state:
        safeString(
          saved.state
        ) ||
        profileDefaults.state,

      company:
        safeString(
          saved.company
        ) ||
        profileDefaults.company,

      orderNote:
        saved.orderNote ??
        "",
    });

    setDetailsReady(
      true
    );
  }, [
    authLoading,
    profileDefaults,
  ]);

  /* ------------------------------------------------------------------------ */
  /* KEEP NAME + EMAIL SYNCED WITH LOGGED-IN USER                             */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (
      !detailsReady
    ) {
      return;
    }

    setDetails(
      (current) => ({
        ...current,

        fullName:
          profileDefaults.fullName ||
          current.fullName,

        email:
          profileDefaults.email ||
          current.email,
      })
    );
  }, [
    detailsReady,
    profileDefaults.fullName,
    profileDefaults.email,
  ]);

  /* ------------------------------------------------------------------------ */
  /* SAVE CHECKOUT DETAILS                                                    */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (
      typeof window ===
        "undefined" ||
      !detailsReady
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
    detailsReady,
  ]);

  /* ------------------------------------------------------------------------ */
  /* FORM                                                                     */
  /* ------------------------------------------------------------------------ */

  function updateField(
    field:
      keyof CheckoutDetails,
    value: string
  ) {
    /*
     * Name and email are account identity.
     * Do not allow the checkout form
     * to mutate them when supplied
     * by the signed-in account.
     */

    if (
      field ===
        "fullName" &&
      profileDefaults.fullName
    ) {
      return;
    }

    if (
      field ===
        "email" &&
      profileDefaults.email
    ) {
      return;
    }

    setDetails(
      (current) => ({
        ...current,

        [field]:
          value,
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

  function validate() {
    const nextErrors:
      CheckoutErrors =
      {};

    if (
      !details.fullName.trim()
    ) {
      nextErrors.fullName =
        "Your account does not have a full name.";
    }

    if (
      !details.email.trim()
    ) {
      nextErrors.email =
        "Your account does not have an email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        details.email
      )
    ) {
      nextErrors.email =
        "Your account email is invalid.";
    }

    if (
      !details.phone.trim()
    ) {
      nextErrors.phone =
        "Enter your phone number.";
    }

    if (
      !details.address.trim()
    ) {
      nextErrors.address =
        "Enter your delivery address.";
    }

    if (
      !details.city.trim()
    ) {
      nextErrors.city =
        "Enter your city.";
    }

    if (
      !details.state.trim()
    ) {
      nextErrors.state =
        "Enter your state.";
    }

    setErrors(
      nextErrors
    );

    return (
      Object.keys(
        nextErrors
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

  function editDetails() {
    setConfirmed(
      false
    );

    window.scrollTo({
      top: 0,

      behavior:
        "smooth",
    });
  }

  /* ------------------------------------------------------------------------ */
  /* AUTH / PROFILE LOADING                                                   */
  /* ------------------------------------------------------------------------ */

  if (
    authLoading ||
    !detailsReady
  ) {
    return (
      <CheckoutLoading />
    );
  }

  /* ------------------------------------------------------------------------ */
  /* EMPTY CHECKOUT                                                           */
  /* ------------------------------------------------------------------------ */

  if (isEmpty) {
    return (
      <div className="mx-auto w-full max-w-[1460px] px-4 py-6 pb-14 sm:px-6 lg:px-8 lg:py-8">
        <div className="flex items-center gap-2 border-b border-black/[0.08] pb-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
          <Link
            href="/shop"
            className="transition hover:text-black"
          >
            Dashboard
          </Link>

          <span>/</span>

          <Link
            href="/shop/cart"
            className="transition hover:text-black"
          >
            Cart
          </Link>

          <span>/</span>

          <span className="text-black/60">
            Checkout
          </span>
        </div>

        <section className="py-10 lg:py-12">
          <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[22px] border border-black/[0.08] bg-white p-8 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f2f2ed]">
              <ShoppingBag
                size={19}
                strokeWidth={
                  1.5
                }
              />
            </span>

            <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/30">
              Checkout
            </p>

            <h1 className="mt-3 text-[32px] font-semibold tracking-[-0.045em]">
              Your cart is empty.
            </h1>

            <p className="mt-3 max-w-[420px] text-[11px] leading-5 text-black/40">
              Add something to
              your cart before
              proceeding to
              checkout.
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex h-10 items-center gap-2 rounded-full bg-[#111] px-5 text-[10px] font-semibold text-white transition hover:bg-black/80"
            >
              Explore Fynaro

              <ChevronRight
                size={11}
              />
            </Link>
          </div>
        </section>
      </div>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* PAGE                                                                     */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="mx-auto w-full max-w-[1460px] px-4 py-6 pb-14 sm:px-6 lg:px-8 lg:py-8">
      {/* ------------------------------------------------------------------ */}
      {/* BREADCRUMB                                                         */}
      {/* ------------------------------------------------------------------ */}

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
            href="/shop/cart"
            className="transition hover:text-black"
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

      {/* ------------------------------------------------------------------ */}
      {/* HEADER                                                             */}
      {/* ------------------------------------------------------------------ */}

      <section className="grid gap-8 border-b border-black/[0.08] py-9 lg:grid-cols-[1.25fr_.75fr] lg:items-end lg:py-11">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2f2ed]">
              <CreditCard
                size={15}
                strokeWidth={
                  1.6
                }
              />
            </span>

            <p className="text-[9px] font-semibold uppercase tracking-[0.19em] text-black/35">
              Fynaro / Checkout
            </p>
          </div>

          <h1 className="max-w-[800px] text-[42px] font-semibold leading-[0.95] tracking-[-0.055em] sm:text-[54px] lg:text-[64px]">
            Complete your
            <br />
            order.
          </h1>
        </div>

        <div>
          <p className="max-w-[420px] text-[12px] leading-6 text-black/45">
            Confirm your
            information, review
            the order and then
            continue to secure
            payment.
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

      {/* ------------------------------------------------------------------ */}
      {/* CONTENT                                                            */}
      {/* ------------------------------------------------------------------ */}

      <div className="grid gap-7 py-9 xl:grid-cols-[minmax(0,1fr)_380px] xl:items-start">
        {/* ---------------------------------------------------------------- */}
        {/* LEFT                                                            */}
        {/* ---------------------------------------------------------------- */}

        <main className="min-w-0">
          {!confirmed ? (
            <form
              onSubmit={
                handleReview
              }
            >
              {/* ---------------------------------------------------------- */}
              {/* CONTACT                                                    */}
              {/* ---------------------------------------------------------- */}

              <CheckoutSection
                icon={
                  UserRound
                }
                eyebrow="Contact"
                title="Who is placing the order?"
                description="Your signed-in Fynaro account is being used for this order. Complete any missing details below."
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* LOGGED-IN NAME */}

                  <AccountDetail
                    label="Full name"
                    value={
                      profileDefaults.fullName ||
                      details.fullName
                    }
                    fallback="No account name found"
                  />

                  {/* LOGGED-IN EMAIL */}

                  <AccountDetail
                    label="Email address"
                    value={
                      profileDefaults.email ||
                      details.email
                    }
                    fallback="No account email found"
                  />

                  {/* PHONE */}

                  {profileDefaults.phone ? (
                    <AccountDetail
                      label="Phone number"
                      value={
                        profileDefaults.phone
                      }
                      fallback="No phone number"
                    />
                  ) : (
                    <Field
                      label="Phone number"
                      type="tel"
                      required
                      value={
                        details.phone
                      }
                      error={
                        errors.phone
                      }
                      placeholder="Enter phone number"
                      autoComplete="tel"
                      dark
                      onChange={(
                        value
                      ) =>
                        updateField(
                          "phone",
                          value
                        )
                      }
                    />
                  )}

                  {/* COMPANY */}

                  {profileDefaults.company ? (
                    <AccountDetail
                      label="Company"
                      value={
                        profileDefaults.company
                      }
                      fallback="No company"
                    />
                  ) : (
                    <Field
                      label="Company"
                      value={
                        details.company
                      }
                      placeholder="Add company"
                      autoComplete="organization"
                      dark
                      onChange={(
                        value
                      ) =>
                        updateField(
                          "company",
                          value
                        )
                      }
                    />
                  )}
                </div>

                <div className="mt-4 flex items-start gap-2 rounded-[12px] bg-[#f6f6f2] px-3 py-2.5">
                  <CircleCheck
                    size={13}
                    strokeWidth={
                      1.7
                    }
                    className="mt-0.5 shrink-0 text-[#4c6a50]"
                  />

                  <p className="text-[8px] leading-4 text-black/40">
                    Name and email are
                    linked to your
                    signed-in Fynaro
                    account. Dark fields
                    require information
                    before checkout can
                    continue.
                  </p>
                </div>
              </CheckoutSection>

              {/* ---------------------------------------------------------- */}
              {/* DELIVERY                                                   */}
              {/* ---------------------------------------------------------- */}

              <CheckoutSection
                icon={
                  MapPin
                }
                eyebrow="Delivery"
                title="Where should the order go?"
                description="Saved information is shown where available. Missing delivery details are highlighted for completion."
              >
                <div className="grid gap-4">
                  <Field
                    label="Delivery address"
                    required
                    value={
                      details.address
                    }
                    error={
                      errors.address
                    }
                    placeholder="Enter street address"
                    autoComplete="street-address"
                    dark={
                      !profileDefaults.address
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
                    <Field
                      label="City"
                      required
                      value={
                        details.city
                      }
                      error={
                        errors.city
                      }
                      placeholder="Enter city"
                      autoComplete="address-level2"
                      dark={
                        !profileDefaults.city
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

                    <Field
                      label="State"
                      required
                      value={
                        details.state
                      }
                      error={
                        errors.state
                      }
                      placeholder="Enter state"
                      autoComplete="address-level1"
                      dark={
                        !profileDefaults.state
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

              {/* ---------------------------------------------------------- */}
              {/* NOTE                                                       */}
              {/* ---------------------------------------------------------- */}

              <CheckoutSection
                icon={
                  PackageCheck
                }
                eyebrow="Order note"
                title="Anything we should know?"
                description="Use this for branding instructions, delivery notes or anything Fynaro should confirm after payment."
              >
                <div>
                  <label className="text-[9px] font-semibold uppercase tracking-[0.14em] text-black/35">
                    Note
                  </label>

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
                    className="mt-2 w-full resize-none rounded-[14px] border border-black/[0.09] bg-white px-4 py-3 text-[11px] leading-5 text-black outline-none transition placeholder:text-black/25 focus:border-black/30"
                  />
                </div>
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
            /* -------------------------------------------------------------- */
            /* REVIEW                                                         */
            /* -------------------------------------------------------------- */

            <div>
              <div className="rounded-[20px] border border-black/[0.08] bg-white">
                <div className="flex items-start justify-between gap-5 border-b border-black/[0.07] p-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eef3ea] text-[#35573c]">
                        <Check
                          size={
                            12
                          }
                        />
                      </span>

                      <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-black/30">
                        Details
                        confirmed
                      </p>
                    </div>

                    <h2 className="mt-4 text-[26px] font-semibold tracking-[-0.04em]">
                      Review before
                      payment.
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={
                      editDetails
                    }
                    className="text-[9px] font-semibold text-black/35 transition hover:text-black"
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

                {details.orderNote && (
                  <div className="border-t border-black/[0.07] p-6">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-black/30">
                      Order note
                    </p>

                    <p className="mt-2 max-w-[600px] text-[10px] leading-5 text-black/50">
                      {
                        details.orderNote
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* ---------------------------------------------------------- */}
              {/* PAYMENT                                                    */}
              {/* ---------------------------------------------------------- */}

              <div className="mt-4 overflow-hidden rounded-[20px] border border-black/[0.08] bg-white">
                <div className="flex items-center justify-between gap-4 border-b border-black/[0.07] p-6">
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
                      strokeWidth={
                        1.5
                      }
                    />
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-end justify-between gap-5">
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
                    className="mt-6 flex h-11 w-full items-center justify-center rounded-full bg-[#111] px-5 text-[10px] font-semibold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  <p className="mt-3 text-center text-[8px] leading-4 text-black/30">
                    By continuing,
                    you confirm the
                    order details
                    above.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* ---------------------------------------------------------------- */}
        {/* SUMMARY                                                          */}
        {/* ---------------------------------------------------------------- */}

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

            {/* ------------------------------------------------------------ */}
            {/* ITEMS                                                        */}
            {/* ------------------------------------------------------------ */}

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
                              size={
                                14
                              }
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

            {/* ------------------------------------------------------------ */}
            {/* TOTAL                                                        */}
            {/* ------------------------------------------------------------ */}

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
                <div className="flex items-end justify-between gap-4">
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

          {/* -------------------------------------------------------------- */}
          {/* DELIVERY                                                       */}
          {/* -------------------------------------------------------------- */}

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
              description="You'll receive confirmation once payment is successful."
              last
            />
          </div>
        </aside>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ACCOUNT DETAIL                                                             */
/* -------------------------------------------------------------------------- */

function AccountDetail({
  label,
  value,
  fallback,
}: {
  label: string;

  value?: string;

  fallback: string;
}) {
  const hasValue =
    Boolean(
      value?.trim()
    );

  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-black/35">
        {label}
      </p>

      <div className="mt-2 flex h-11 items-center justify-between gap-3 rounded-[13px] border border-black/[0.08] bg-[#f3f3ef] px-4">
        <span
          className={[
            "min-w-0 truncate text-[11px]",

            hasValue
              ? "font-semibold text-black/70"
              : "text-black/30",
          ].join(
            " "
          )}
        >
          {hasValue
            ? value
            : fallback}
        </span>

        {hasValue && (
          <span className="shrink-0 rounded-full bg-[#e5ece2] px-2 py-1 text-[6px] font-semibold uppercase tracking-[0.1em] text-[#48604b]">
            Account
          </span>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FIELD                                                                      */
/* -------------------------------------------------------------------------- */

function Field({
  label,
  value,
  placeholder,
  error,
  required = false,
  type = "text",
  autoComplete,
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

  autoComplete?: string;

  dark?: boolean;

  onChange: (
    value: string
  ) => void;
}) {
  return (
    <div>
      <label
        className={[
          "text-[9px] font-semibold uppercase tracking-[0.14em]",

          dark
            ? "text-black/65"
            : "text-black/35",
        ].join(
          " "
        )}
      >
        {label}

        {required && (
          <span className="ml-1 text-[#a18435]">
            *
          </span>
        )}

        {dark && (
          <span className="ml-2 text-[6px] font-semibold normal-case tracking-normal text-black/30">
            Update required
          </span>
        )}
      </label>

      <input
        type={type}
        value={value}
        required={
          required
        }
        autoComplete={
          autoComplete
        }
        onChange={(
          event
        ) =>
          onChange(
            event.target.value
          )
        }
        placeholder={
          placeholder
        }
        className={[
          "mt-2 h-11 w-full rounded-[13px] border px-4 text-[11px] outline-none transition",

          dark
            ? "border-[#111] bg-[#111] text-white placeholder:text-white/35 focus:border-black focus:bg-black"
            : "bg-white text-black placeholder:text-black/25",

          error
            ? "border-[#a84242] ring-1 ring-[#a84242]/20"
            : dark
              ? ""
              : "border-black/[0.09] focus:border-black/30",
        ].join(
          " "
        )}
      />

      {error && (
        <p className="mt-1.5 text-[8px] font-medium text-[#9b3434]">
          {error}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CHECKOUT SECTION                                                           */
/* -------------------------------------------------------------------------- */

function CheckoutSection({
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
  }>;

  eyebrow: string;

  title: string;

  description: string;

  children:
    React.ReactNode;
}) {
  return (
    <section className="mb-4 overflow-hidden rounded-[20px] border border-black/[0.08] bg-white">
      <div className="grid gap-4 border-b border-black/[0.07] p-6 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f2f2ed]">
              <Icon
                size={11}
                strokeWidth={
                  1.5
                }
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

/* -------------------------------------------------------------------------- */
/* REVIEW BLOCK                                                               */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* SUMMARY                                                                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* INFO ROW                                                                   */
/* -------------------------------------------------------------------------- */

function InfoRow({
  icon: Icon,
  title,
  description,
  last = false,
}: {
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
  }>;

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
          strokeWidth={
            1.5
          }
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

/* -------------------------------------------------------------------------- */
/* STEP                                                                       */
/* -------------------------------------------------------------------------- */

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

      <span
        className={[
          "text-[8px] font-semibold uppercase tracking-[0.12em]",

          active
            ? "text-black/60"
            : "text-black/30",
        ].join(
          " "
        )}
      >
        {label}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* LOADING                                                                    */
/* -------------------------------------------------------------------------- */

function CheckoutLoading() {
  return (
    <div className="mx-auto w-full max-w-[1460px] px-4 py-6 pb-14 sm:px-6 lg:px-8 lg:py-8">
      <div className="border-b border-black/[0.08] pb-5">
        <div className="h-2.5 w-36 animate-pulse rounded-full bg-black/[0.05]" />
      </div>

      <section className="grid gap-8 border-b border-black/[0.08] py-9 lg:grid-cols-[1.25fr_.75fr] lg:py-11">
        <div>
          <div className="h-9 w-9 animate-pulse rounded-full bg-black/[0.05]" />

          <div className="mt-5 h-12 max-w-[520px] animate-pulse rounded-[12px] bg-black/[0.05]" />

          <div className="mt-3 h-12 max-w-[390px] animate-pulse rounded-[12px] bg-black/[0.04]" />
        </div>
      </section>

      <div className="grid gap-7 py-9 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-4">
          {[
            1,
            2,
            3,
          ].map(
            (
              item
            ) => (
              <div
                key={
                  item
                }
                className="h-[225px] animate-pulse rounded-[20px] border border-black/[0.06] bg-white"
              />
            )
          )}
        </div>

        <div className="h-[390px] animate-pulse rounded-[20px] border border-black/[0.06] bg-white" />
      </div>
    </div>
  );
}