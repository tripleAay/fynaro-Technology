"use client";

import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  Check,
  ChevronLeft,
  LoaderCircle,
  MapPin,
  Pencil,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";

import {
  useFynaroToast,
} from "@/components/dashboard components/common/fynaroToast";

type DeliveryAddress = {
  id: string;
  profile_id: string;
  label: string;
  recipient_name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string | null;
  city: string;
  state: string;
  postal_code?: string | null;
  country: string;
  landmark?: string | null;
  delivery_notes?: string | null;
  is_default: boolean;
  created_at: string;
  updated_at: string;
};

type AddressForm = {
  label: string;
  recipientName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  landmark: string;
  deliveryNotes: string;
  isDefault: boolean;
};

type AddressResponse = {
  success?: boolean;
  message?: string;
  address?: DeliveryAddress;
  addresses?: DeliveryAddress[];
};

const EMPTY_FORM:
  AddressForm = {
  label: "Home",
  recipientName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "Nigeria",
  landmark: "",
  deliveryNotes: "",
  isDefault: false,
};

export default function DeliveryAddressesPage() {
  const {
    notifySuccess,
    notifyError,
  } = useFynaroToast();

  const [
    addresses,
    setAddresses,
  ] = useState<
    DeliveryAddress[]
  >([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    deletingId,
    setDeletingId,
  ] = useState<
    string | null
  >(null);

  const [
    defaultingId,
    setDefaultingId,
  ] = useState<
    string | null
  >(null);

  const [
    formOpen,
    setFormOpen,
  ] = useState(false);

  const [
    editingAddress,
    setEditingAddress,
  ] = useState<
    DeliveryAddress | null
  >(null);

  const [
    form,
    setForm,
  ] = useState<AddressForm>(
    EMPTY_FORM
  );

  const loadAddresses =
    useCallback(async () => {
      try {
        setLoading(true);

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
            | AddressResponse
            | null;

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Unable to load delivery addresses."
          );
        }

        setAddresses(
          data?.addresses ||
            []
        );
      } catch (error) {
        notifyError(
          "Addresses unavailable",
          error instanceof
            Error
            ? error.message
            : "Unable to load your delivery addresses."
        );
      } finally {
        setLoading(false);
      }
    }, [notifyError]);

  useEffect(() => {
    void loadAddresses();
  }, [loadAddresses]);

  function updateField<
    K extends keyof AddressForm,
  >(
    key: K,
    value: AddressForm[K]
  ) {
    setForm(
      (current) => ({
        ...current,
        [key]: value,
      })
    );
  }

  function openCreateForm() {
    setEditingAddress(
      null
    );

    setForm({
      ...EMPTY_FORM,
      isDefault:
        addresses.length ===
        0,
    });

    setFormOpen(true);
  }

  function openEditForm(
    address: DeliveryAddress
  ) {
    setEditingAddress(
      address
    );

    setForm({
      label:
        address.label ||
        "Delivery address",

      recipientName:
        address.recipient_name,

      phone:
        address.phone,

      addressLine1:
        address.address_line_1,

      addressLine2:
        address.address_line_2 ||
        "",

      city:
        address.city,

      state:
        address.state,

      postalCode:
        address.postal_code ||
        "",

      country:
        address.country ||
        "Nigeria",

      landmark:
        address.landmark ||
        "",

      deliveryNotes:
        address.delivery_notes ||
        "",

      isDefault:
        address.is_default,
    });

    setFormOpen(true);
  }

  function closeForm() {
    if (saving) {
      return;
    }

    setFormOpen(false);
    setEditingAddress(
      null
    );

    setForm(
      EMPTY_FORM
    );
  }

  async function saveAddress(
    event: FormEvent
  ) {
    event.preventDefault();

    if (
      !form.recipientName.trim() ||
      !form.phone.trim() ||
      !form.addressLine1.trim() ||
      !form.city.trim() ||
      !form.state.trim() ||
      !form.country.trim()
    ) {
      notifyError(
        "Address incomplete",
        "Complete the recipient, phone, address, city, state and country fields."
      );

      return;
    }

    try {
      setSaving(true);

      const endpoint =
        editingAddress
          ? `/api/client/delivery-addresses/${editingAddress.id}`
          : "/api/client/delivery-addresses";

      const response =
        await fetch(
          endpoint,
          {
            method:
              editingAddress
                ? "PATCH"
                : "POST",

            credentials:
              "include",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            body:
              JSON.stringify(
                form
              ),
          }
        );

      const data =
        (await response
          .json()
          .catch(
            () => null
          )) as
          | AddressResponse
          | null;

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to save delivery address."
        );
      }

      closeForm();

      await loadAddresses();

      notifySuccess(
        editingAddress
          ? "Address updated"
          : "Address added",
        editingAddress
          ? "Your delivery details have been updated."
          : "Your new delivery address is ready to use."
      );
    } catch (error) {
      notifyError(
        "Address not saved",
        error instanceof
          Error
          ? error.message
          : "Unable to save the delivery address."
      );
    } finally {
      setSaving(false);
    }
  }

  async function makeDefault(
    address: DeliveryAddress
  ) {
    if (
      address.is_default ||
      defaultingId
    ) {
      return;
    }

    try {
      setDefaultingId(
        address.id
      );

      const response =
        await fetch(
          `/api/client/delivery-addresses/${address.id}/default`,
          {
            method:
              "PATCH",

            credentials:
              "include",

            headers: {
              Accept:
                "application/json",
            },
          }
        );

      const data =
        (await response
          .json()
          .catch(
            () => null
          )) as
          | AddressResponse
          | null;

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to update the default address."
        );
      }

      setAddresses(
        (current) =>
          current
            .map(
              (item) => ({
                ...item,

                is_default:
                  item.id ===
                  address.id,
              })
            )
            .sort(
              (a, b) =>
                Number(
                  b.is_default
                ) -
                Number(
                  a.is_default
                )
            )
      );

      notifySuccess(
        "Default address updated",
        `${address.label} will be selected automatically during checkout.`
      );
    } catch (error) {
      notifyError(
        "Default not changed",
        error instanceof
          Error
          ? error.message
          : "Unable to change the default address."
      );
    } finally {
      setDefaultingId(
        null
      );
    }
  }

  async function deleteAddress(
    address: DeliveryAddress
  ) {
    const confirmed =
      window.confirm(
        `Remove “${address.label}” from your delivery addresses?`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(
        address.id
      );

      const response =
        await fetch(
          `/api/client/delivery-addresses/${address.id}`,
          {
            method:
              "DELETE",

            credentials:
              "include",

            headers: {
              Accept:
                "application/json",
            },
          }
        );

      const data =
        (await response
          .json()
          .catch(
            () => null
          )) as
          | AddressResponse
          | null;

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Unable to remove delivery address."
        );
      }

      await loadAddresses();

      notifySuccess(
        "Address removed",
        `${address.label} was removed from your address book.`
      );
    } catch (error) {
      notifyError(
        "Address not removed",
        error instanceof
          Error
          ? error.message
          : "Unable to remove the delivery address."
      );
    } finally {
      setDeletingId(
        null
      );
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1420px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
      <section className="border-b border-black/[0.08] pb-8">
        <Link
          href="/shop/profile"
          className="inline-flex items-center gap-2 text-[10px] font-semibold text-black/40 transition hover:text-black"
        >
          <ChevronLeft className="h-4 w-4" />

          Back to profile
        </Link>

        <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.19em] text-black/35">
              Account / Delivery
            </p>

            <h1 className="mt-3 text-[38px] font-semibold leading-none tracking-[-0.05em] sm:text-[48px]">
              Delivery addresses.
            </h1>

            <p className="mt-4 max-w-[590px] text-[11px] leading-5 text-black/45">
              Manage the locations Fynaro can deliver products and project materials to.
            </p>
          </div>

          <button
            type="button"
            onClick={
              openCreateForm
            }
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#111] px-5 text-[10px] font-semibold text-white transition hover:bg-black/80"
          >
            <Plus className="h-4 w-4" />

            Add address
          </button>
        </div>
      </section>

      {loading ? (
        <div className="flex min-h-[360px] items-center justify-center">
          <LoaderCircle className="h-6 w-6 animate-spin text-black/35" />
        </div>
      ) : addresses.length ===
        0 ? (
        <section className="flex min-h-[420px] flex-col items-center justify-center border-b border-black/[0.08] text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f2f2ed] text-black/55">
            <MapPin className="h-5 w-5" />
          </div>

          <h2 className="mt-5 text-[22px] font-semibold tracking-[-0.035em]">
            No delivery address yet.
          </h2>

          <p className="mt-2 max-w-[420px] text-[11px] leading-5 text-black/40">
            Add an address to make checkout and physical deliveries faster.
          </p>

          <button
            type="button"
            onClick={
              openCreateForm
            }
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-[#111] px-5 text-[10px] font-semibold text-white"
          >
            <Plus className="h-4 w-4" />

            Add first address
          </button>
        </section>
      ) : (
        <section className="grid gap-4 py-8 md:grid-cols-2 xl:grid-cols-3">
          {addresses.map(
            (address) => (
              <article
                key={
                  address.id
                }
                className={`relative flex min-h-[285px] flex-col rounded-[20px] border bg-white p-5 transition ${
                  address.is_default
                    ? "border-[#d6cc6d] shadow-[0_12px_35px_rgba(214,204,109,0.12)]"
                    : "border-black/[0.08] hover:border-black/20"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45">
                        {address.label}
                      </p>

                      {address.is_default && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#f3f0cf] px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.08em] text-[#6d6524]">
                          <Check className="h-3 w-3" />

                          Default
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 text-[16px] font-semibold tracking-[-0.025em]">
                      {address.recipient_name}
                    </h2>

                    <p className="mt-1 text-[10px] text-black/40">
                      {address.phone}
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f4f4ef] text-black/55">
                    <MapPin className="h-4 w-4" />
                  </div>
                </div>

                <div className="mt-5 space-y-1 text-[11px] leading-5 text-black/52">
                  <p>
                    {address.address_line_1}
                  </p>

                  {address.address_line_2 && (
                    <p>
                      {address.address_line_2}
                    </p>
                  )}

                  <p>
                    {address.city},{" "}
                    {address.state}
                    {address.postal_code
                      ? ` ${address.postal_code}`
                      : ""}
                  </p>

                  <p>
                    {address.country}
                  </p>

                  {address.landmark && (
                    <p className="pt-2 text-[10px] text-black/35">
                      Landmark:{" "}
                      {address.landmark}
                    </p>
                  )}
                </div>

                <div className="mt-auto flex flex-wrap gap-2 border-t border-black/[0.07] pt-4">
                  {!address.is_default && (
                    <button
                      type="button"
                      disabled={
                        defaultingId ===
                        address.id
                      }
                      onClick={() =>
                        void makeDefault(
                          address
                        )
                      }
                      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-black/[0.09] px-3 text-[9px] font-semibold text-black/55 transition hover:border-[#d6cc6d] hover:text-black disabled:opacity-50"
                    >
                      {defaultingId ===
                      address.id ? (
                        <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Star className="h-3.5 w-3.5" />
                      )}

                      Make default
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      openEditForm(
                        address
                      )
                    }
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-black/[0.09] px-3 text-[9px] font-semibold text-black/55 transition hover:border-black/25 hover:text-black"
                  >
                    <Pencil className="h-3.5 w-3.5" />

                    Edit
                  </button>

                  <button
                    type="button"
                    disabled={
                      deletingId ===
                      address.id
                    }
                    onClick={() =>
                      void deleteAddress(
                        address
                      )
                    }
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-red-900/10 px-3 text-[9px] font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {deletingId ===
                    address.id ? (
                      <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}

                    Remove
                  </button>
                </div>
              </article>
            )
          )}
        </section>
      )}

      {formOpen && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-5">
          <button
            type="button"
            aria-label="Close address form"
            onClick={
              closeForm
            }
            className="absolute inset-0"
          />

          <div className="relative z-10 max-h-[94vh] w-full max-w-[720px] overflow-y-auto rounded-t-[24px] bg-[#fafaf8] p-5 shadow-2xl sm:rounded-[24px] sm:p-7">
            <div className="flex items-start justify-between gap-5 border-b border-black/[0.08] pb-5">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
                  Delivery address
                </p>

                <h2 className="mt-2 text-[26px] font-semibold tracking-[-0.04em]">
                  {editingAddress
                    ? "Edit address"
                    : "Add a new address"}
                </h2>
              </div>

              <button
                type="button"
                disabled={
                  saving
                }
                onClick={
                  closeForm
                }
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white text-black/45 transition hover:text-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={
                saveAddress
              }
              className="mt-6 grid gap-5 sm:grid-cols-2"
            >
              <AddressField
                label="Address label"
                value={
                  form.label
                }
                placeholder="Home, Office, Project site"
                onChange={(
                  value
                ) =>
                  updateField(
                    "label",
                    value
                  )
                }
              />

              <AddressField
                label="Recipient name"
                value={
                  form.recipientName
                }
                required
                onChange={(
                  value
                ) =>
                  updateField(
                    "recipientName",
                    value
                  )
                }
              />

              <AddressField
                label="Phone number"
                value={
                  form.phone
                }
                type="tel"
                required
                onChange={(
                  value
                ) =>
                  updateField(
                    "phone",
                    value
                  )
                }
              />

              <AddressField
                label="Country"
                value={
                  form.country
                }
                required
                onChange={(
                  value
                ) =>
                  updateField(
                    "country",
                    value
                  )
                }
              />

              <div className="sm:col-span-2">
                <AddressField
                  label="Address line 1"
                  value={
                    form.addressLine1
                  }
                  required
                  placeholder="Street address, building and number"
                  onChange={(
                    value
                  ) =>
                    updateField(
                      "addressLine1",
                      value
                    )
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <AddressField
                  label="Address line 2"
                  value={
                    form.addressLine2
                  }
                  placeholder="Apartment, suite or floor"
                  onChange={(
                    value
                  ) =>
                    updateField(
                      "addressLine2",
                      value
                    )
                  }
                />
              </div>

              <AddressField
                label="City"
                value={
                  form.city
                }
                required
                onChange={(
                  value
                ) =>
                  updateField(
                    "city",
                    value
                  )
                }
              />

              <AddressField
                label="State"
                value={
                  form.state
                }
                required
                onChange={(
                  value
                ) =>
                  updateField(
                    "state",
                    value
                  )
                }
              />

              <AddressField
                label="Postal code"
                value={
                  form.postalCode
                }
                onChange={(
                  value
                ) =>
                  updateField(
                    "postalCode",
                    value
                  )
                }
              />

              <AddressField
                label="Landmark"
                value={
                  form.landmark
                }
                placeholder="Nearby landmark"
                onChange={(
                  value
                ) =>
                  updateField(
                    "landmark",
                    value
                  )
                }
              />

              <div className="sm:col-span-2">
                <label className="block">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-black/40">
                    Delivery notes
                  </span>

                  <textarea
                    value={
                      form.deliveryNotes
                    }
                    onChange={(
                      event
                    ) =>
                      updateField(
                        "deliveryNotes",
                        event.target.value
                      )
                    }
                    rows={3}
                    placeholder="Gate instructions, preferred contact or delivery notes"
                    className="mt-2 w-full resize-none rounded-[14px] border border-black/[0.09] bg-white px-4 py-3 text-[11px] text-black outline-none transition placeholder:text-black/25 focus:border-[#d6cc6d]"
                  />
                </label>
              </div>

              {!editingAddress && (
                <label className="flex cursor-pointer items-center gap-3 sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={
                      form.isDefault
                    }
                    onChange={(
                      event
                    ) =>
                      updateField(
                        "isDefault",
                        event.target.checked
                      )
                    }
                    className="h-4 w-4 accent-black"
                  />

                  <span className="text-[11px] text-black/55">
                    Use this as my default delivery address
                  </span>
                </label>
              )}

              <div className="flex justify-end gap-2 border-t border-black/[0.08] pt-5 sm:col-span-2">
                <button
                  type="button"
                  disabled={
                    saving
                  }
                  onClick={
                    closeForm
                  }
                  className="h-10 rounded-full border border-black/[0.09] px-5 text-[9px] font-semibold text-black/50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    saving
                  }
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-[#111] px-5 text-[9px] font-semibold text-white disabled:opacity-50"
                >
                  {saving && (
                    <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                  )}

                  {saving
                    ? "Saving..."
                    : editingAddress
                      ? "Save changes"
                      : "Add address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

type AddressFieldProps = {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange: (
    value: string
  ) => void;
};

function AddressField({
  label,
  value,
  placeholder,
  type = "text",
  required = false,
  onChange,
}: AddressFieldProps) {
  return (
    <label className="block">
      <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-black/40">
        {label}

        {required && (
          <span className="ml-1 text-red-600">
            *
          </span>
        )}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        placeholder={
          placeholder
        }
        onChange={(
          event
        ) =>
          onChange(
            event.target.value
          )
        }
        className="mt-2 h-11 w-full rounded-[14px] border border-black/[0.09] bg-white px-4 text-[11px] text-black outline-none transition placeholder:text-black/25 focus:border-[#d6cc6d]"
      />
    </label>
  );
}