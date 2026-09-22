"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {
  Check,
  LoaderCircle,
  MapPin,
  Plus,
  X,
} from "lucide-react";

import {
  useFynaroToast,
} from "@/components/dashboard components/common/fynaroToast";

type Props = {
  proposalId: string;

  status:
    | "sent"
    | "accepted"
    | "rejected"
    | "expired";
};

type DeliveryAddress = {
  id: string;
  label: string;
  recipient_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?:
    | string
    | null;
  city: string;
  state: string;
  postal_code?:
    | string
    | null;
  country: string;
  landmark?:
    | string
    | null;
  delivery_notes?:
    | string
    | null;
  is_default: boolean;
};

type AddressesResponse = {
  success?: boolean;
  message?: string;
  addresses?: DeliveryAddress[];
};

type DecisionResponse = {
  success?: boolean;
  message?: string;

  order?: {
    id?: string;
    reference?: string;
    status?: string;
    paymentStatus?: string;
  };
};

export default function ProposalDecisionActions({
  proposalId,
  status,
}: Props) {
  const router =
    useRouter();

  const {
    notifySuccess,
    notifyError,
    notifyLoading,
    updateSuccess,
    updateError,
  } = useFynaroToast();

  const [
    loading,
    setLoading,
  ] = useState<
    | "accept"
    | "reject"
    | null
  >(null);

  const [
    loadingAddresses,
    setLoadingAddresses,
  ] = useState(
    status === "sent"
  );

  const [
    addresses,
    setAddresses,
  ] = useState<
    DeliveryAddress[]
  >([]);

  const [
    selectedAddressId,
    setSelectedAddressId,
  ] = useState("");

  const [
    addressError,
    setAddressError,
  ] = useState("");

  const [
    showReject,
    setShowReject,
  ] = useState(false);

  const [
    note,
    setNote,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  // ======================================================
  // LOAD DELIVERY ADDRESSES
  // ======================================================

  useEffect(() => {
    if (
      status !== "sent"
    ) {
      setLoadingAddresses(
        false
      );

      return;
    }

    let active = true;

    async function loadAddresses() {
      try {
        setLoadingAddresses(
          true
        );

        setAddressError("");

        const response =
          await fetch(
            "/api/client/delivery-addresses",
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
          (await response
            .json()
            .catch(
              () => null
            )) as
            | AddressesResponse
            | null;

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to load delivery addresses."
          );
        }

        if (!active) {
          return;
        }

        const items =
          data?.addresses ||
          [];

        setAddresses(
          items
        );

        const defaultAddress =
          items.find(
            (address) =>
              address.is_default
          ) || items[0];

        setSelectedAddressId(
          defaultAddress?.id ||
            ""
        );
      } catch (loadError) {
        console.error(
          "[PROPOSAL ADDRESSES]",
          loadError
        );

        if (active) {
          setAddressError(
            loadError instanceof
              Error
              ? loadError.message
              : "Unable to load delivery addresses."
          );
        }
      } finally {
        if (active) {
          setLoadingAddresses(
            false
          );
        }
      }
    }

    void loadAddresses();

    return () => {
      active = false;
    };
  }, [status]);

  // ======================================================
  // ACCEPT
  // ======================================================

  async function accept() {
    if (
      !selectedAddressId
    ) {
      const message =
        "Select or add a delivery address before accepting this proposal.";

      setError(message);

      notifyError(
        "Delivery address required",
        message
      );

      return;
    }

    const selectedAddress =
      addresses.find(
        (address) =>
          address.id ===
          selectedAddressId
      );

    const confirmed =
      window.confirm(
        `Accept this proposal using ${
          selectedAddress?.label ||
          "the selected address"
        } as the delivery address?`
      );

    if (!confirmed) {
      return;
    }

    setLoading("accept");
    setError("");

    const toastId =
      notifyLoading(
        "Accepting proposal",
        "Fynaro is creating your order and securing the delivery address."
      );

    try {
      const response =
        await fetch(
          `/api/client/proposals/${proposalId}/accept`,
          {
            method:
              "POST",

            credentials:
              "include",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body:
              JSON.stringify({
                deliveryAddressId:
                  selectedAddressId,
              }),
          }
        );

      const data =
        (await response
          .json()
          .catch(
            () => null
          )) as
          | DecisionResponse
          | null;

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to accept proposal."
        );
      }

      updateSuccess(
        toastId,
        "Proposal accepted",
        data?.order
          ?.reference
          ? `Order ${data.order.reference} has been created.`
          : "Your Fynaro order has been created."
      );

      notifySuccess(
        "Delivery address secured",
        `${selectedAddress?.label || "Your selected address"} was saved to this order.`
      );

      if (
        data?.order?.id
      ) {
        router.push(
          `/shop/orders/${data.order.id}`
        );

        return;
      }

      router.refresh();
    } catch (
      acceptError
    ) {
      const message =
        acceptError instanceof
          Error
          ? acceptError.message
          : "Unable to accept proposal.";

      setError(message);

      updateError(
        toastId,
        "Proposal not accepted",
        message
      );
    } finally {
      setLoading(null);
    }
  }

  // ======================================================
  // REJECT
  // ======================================================

  async function reject() {
    setLoading("reject");
    setError("");

    const toastId =
      notifyLoading(
        "Submitting decision",
        "Fynaro is recording your proposal response."
      );

    try {
      const response =
        await fetch(
          `/api/client/proposals/${proposalId}/reject`,
          {
            method:
              "POST",

            credentials:
              "include",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body:
              JSON.stringify({
                decisionNote:
                  note.trim(),
              }),
          }
        );

      const data =
        (await response
          .json()
          .catch(
            () => null
          )) as
          | DecisionResponse
          | null;

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to decline proposal."
        );
      }

      setShowReject(false);

      updateSuccess(
        toastId,
        "Decision submitted",
        "Fynaro has received your proposal response."
      );

      router.refresh();
    } catch (
      rejectError
    ) {
      const message =
        rejectError instanceof
          Error
          ? rejectError.message
          : "Unable to decline proposal.";

      setError(message);

      updateError(
        toastId,
        "Decision not submitted",
        message
      );
    } finally {
      setLoading(null);
    }
  }

  // ======================================================
  // COMPLETED STATES
  // ======================================================

  if (
    status === "accepted"
  ) {
    return (
      <div className="rounded-xl border border-[#d6cc6d]/40 bg-[#f4f4ef] p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Check className="h-4 w-4" />

          Proposal accepted
        </div>

        <p className="mt-2 text-xs leading-5 text-black/45">
          Your order has been
          created and is ready
          for the next stage.
        </p>

        <Link
          href="/shop/orders"
          className="mt-4 inline-flex text-[10px] font-semibold text-black underline underline-offset-4"
        >
          View your orders
        </Link>
      </div>
    );
  }

  if (
    status === "rejected"
  ) {
    return (
      <div className="rounded-xl bg-[#f4f4ef] p-4">
        <p className="text-sm font-semibold">
          Proposal declined
        </p>

        <p className="mt-2 text-xs leading-5 text-black/45">
          Fynaro has received
          your decision.
        </p>
      </div>
    );
  }

  if (
    status === "expired"
  ) {
    return (
      <div className="rounded-xl bg-[#f4f4ef] p-4">
        <p className="text-sm font-semibold">
          Proposal expired
        </p>

        <p className="mt-2 text-xs leading-5 text-black/45">
          Contact Fynaro if
          you would like an
          updated proposal.
        </p>
      </div>
    );
  }

  // ======================================================
  // ACTIVE PROPOSAL
  // ======================================================

  return (
    <div>
      {!showReject ? (
        <div className="space-y-4">
          {/* DELIVERY ADDRESS */}

          <div className="rounded-[16px] border border-black/[0.08] bg-[#fafaf8] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/35">
                  Delivery address
                </p>

                <p className="mt-1 text-[11px] leading-5 text-black/45">
                  Select the address
                  that should be
                  attached to this
                  order.
                </p>
              </div>

              <MapPin className="h-4 w-4 text-black/35" />
            </div>

            {loadingAddresses ? (
              <div className="mt-4 flex min-h-[80px] items-center justify-center">
                <LoaderCircle className="h-5 w-5 animate-spin text-black/35" />
              </div>
            ) : addressError ? (
              <div className="mt-4 rounded-xl border border-red-900/10 bg-red-50 p-3">
                <p className="text-[10px] leading-5 text-red-700">
                  {addressError}
                </p>

                <Link
                  href="/shop/settings/addresses"
                  className="mt-2 inline-flex text-[9px] font-semibold text-red-800 underline underline-offset-4"
                >
                  Manage addresses
                </Link>
              </div>
            ) : addresses.length ===
              0 ? (
              <div className="mt-4 rounded-xl border border-dashed border-black/15 bg-white p-4 text-center">
                <p className="text-[11px] font-medium">
                  No delivery address
                </p>

                <p className="mt-1 text-[9px] leading-4 text-black/40">
                  Add an address
                  before accepting
                  this proposal.
                </p>

                <Link
                  href="/shop/settings/addresses"
                  className="mt-3 inline-flex h-9 items-center gap-1.5 rounded-full bg-[#111] px-4 text-[9px] font-semibold text-white"
                >
                  <Plus className="h-3.5 w-3.5" />

                  Add address
                </Link>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                {addresses.map(
                  (address) => {
                    const selected =
                      selectedAddressId ===
                      address.id;

                    return (
                      <button
                        key={
                          address.id
                        }
                        type="button"
                        disabled={
                          loading !==
                          null
                        }
                        onClick={() => {
                          setSelectedAddressId(
                            address.id
                          );

                          setError(
                            ""
                          );
                        }}
                        className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
                          selected
                            ? "border-[#d6cc6d] bg-white ring-2 ring-[#d6cc6d]/15"
                            : "border-black/[0.08] bg-white hover:border-black/20"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            selected
                              ? "border-[#111] bg-[#111] text-white"
                              : "border-black/20"
                          }`}
                        >
                          {selected && (
                            <Check className="h-3 w-3" />
                          )}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-semibold">
                              {
                                address.label
                              }
                            </span>

                            {address.is_default && (
                              <span className="rounded-full bg-[#f3f0cf] px-2 py-0.5 text-[7px] font-semibold uppercase tracking-[0.08em] text-[#6d6524]">
                                Default
                              </span>
                            )}
                          </span>

                          <span className="mt-1 block text-[10px] font-medium text-black/65">
                            {
                              address.recipient_name
                            }
                          </span>

                          <span className="mt-1 block text-[9px] leading-4 text-black/40">
                            {
                              address.address_line_1
                            }
                            {address.address_line_2
                              ? `, ${address.address_line_2}`
                              : ""}
                            ,{" "}
                            {
                              address.city
                            }
                            ,{" "}
                            {
                              address.state
                            }
                            ,{" "}
                            {
                              address.country
                            }
                          </span>

                          <span className="mt-1 block text-[9px] text-black/35">
                            {
                              address.phone
                            }
                          </span>
                        </span>
                      </button>
                    );
                  }
                )}

                <Link
                  href="/shop/settings/addresses"
                  className="inline-flex items-center gap-1.5 pt-2 text-[9px] font-semibold text-black/50 transition hover:text-black"
                >
                  <Plus className="h-3.5 w-3.5" />

                  Add or manage addresses
                </Link>
              </div>
            )}
          </div>

          {/* DECISION BUTTONS */}

          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              disabled={
                loading !==
                  null ||
                loadingAddresses ||
                !selectedAddressId
              }
              onClick={() =>
                void accept()
              }
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl bg-[#111111] px-5 text-sm font-medium text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ===
              "accept" ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Check
                  className="h-4 w-4"
                  strokeWidth={
                    1.8
                  }
                />
              )}

              {loading ===
              "accept"
                ? "Accepting..."
                : "Accept proposal"}
            </button>

            <button
              type="button"
              disabled={
                loading !==
                null
              }
              onClick={() =>
                setShowReject(
                  true
                )
              }
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-5 text-sm font-medium text-black transition hover:bg-[#f7f7f3] disabled:opacity-50"
            >
              <X
                className="h-4 w-4"
                strokeWidth={
                  1.8
                }
              />

              Decline
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-black/[0.08] bg-[#fafaf8] p-4">
          <p className="text-sm font-semibold">
            Decline proposal
          </p>

          <p className="mt-1 text-xs leading-5 text-black/40">
            You can optionally
            tell Fynaro what
            should be changed.
          </p>

          <textarea
            value={note}
            onChange={(
              event
            ) =>
              setNote(
                event.target.value
              )
            }
            maxLength={2000}
            rows={4}
            placeholder="What would you like us to revise?"
            className="mt-4 w-full resize-none rounded-xl border border-black/[0.08] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-black/25 focus:border-black/25"
          />

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={
                loading !==
                null
              }
              onClick={() =>
                void reject()
              }
              className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-[#111111] px-4 text-sm font-medium text-white disabled:opacity-50"
            >
              {loading ===
              "reject" && (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              )}

              {loading ===
              "reject"
                ? "Submitting..."
                : "Confirm decline"}
            </button>

            <button
              type="button"
              disabled={
                loading !==
                null
              }
              onClick={() => {
                setShowReject(
                  false
                );

                setError("");
              }}
              className="min-h-[42px] rounded-xl border border-black/[0.08] bg-white px-4 text-sm font-medium"
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