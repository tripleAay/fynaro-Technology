"use client";

import Link from "next/link";
import {
  Building2,
  Check,
  ChevronRight,
  Globe2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

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

type ProfileForm = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  website: string;
  address: string;
  city: string;
  state: string;
};

const PROFILE_STORAGE_KEY =
  "fynaro_profile_details";

const EMPTY_STORED_PROFILE: StoredProfile = {
  phone: "",
  company: "",
  role: "",
  website: "",
  address: "",
  city: "",
  state: "",
};

const EMPTY_PROFILE: ProfileForm = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  website: "",
  address: "",
  city: "",
  state: "",
};

export default function ProfilePage() {
  const [
    form,
    setForm,
  ] = useState<ProfileForm>(
    EMPTY_PROFILE
  );

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    saved,
    setSaved,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null
  );

  /* ------------------------------------------------------------------------ */
  /* LOAD REAL SIGNED-IN USER                                                 */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      setLoading(true);
      setError(null);

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
              "Unable to load your account."
          );
        }

        const user =
          data.user as AuthUser;

        let storedProfile:
          StoredProfile =
          EMPTY_STORED_PROFILE;

        const existing =
          window.localStorage.getItem(
            PROFILE_STORAGE_KEY
          );

        if (existing) {
          try {
            storedProfile =
              {
                ...EMPTY_STORED_PROFILE,
                ...JSON.parse(
                  existing
                ),
              };
          } catch {
            window.localStorage.removeItem(
              PROFILE_STORAGE_KEY
            );
          }
        }

        const fullName =
          user.fullName?.trim() ||
          user.full_name?.trim() ||
          user.name?.trim() ||
          "";

        const email =
          user.email?.trim() ||
          "";

        if (!active) {
          return;
        }

        setForm({
          fullName,
          email,
          ...storedProfile,
        });
      } catch (err) {
        console.error(
          "Profile load error:",
          err
        );

        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load profile."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* UPDATE                                                                   */
  /* ------------------------------------------------------------------------ */

  function updateField(
    field:
      keyof StoredProfile,
    value: string
  ) {
    setSaved(false);

    setForm(
      (current) => ({
        ...current,
        [field]: value,
      })
    );
  }

  /* ------------------------------------------------------------------------ */
  /* SAVE                                                                     */
  /* ------------------------------------------------------------------------ */

  function handleSave(
    event: FormEvent
  ) {
    event.preventDefault();

    setSaving(true);
    setSaved(false);

    const profileToStore:
      StoredProfile = {
      phone:
        form.phone.trim(),

      company:
        form.company.trim(),

      role:
        form.role.trim(),

      website:
        form.website.trim(),

      address:
        form.address.trim(),

      city:
        form.city.trim(),

      state:
        form.state.trim(),
    };

    window.localStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify(
        profileToStore
      )
    );

    window.dispatchEvent(
      new CustomEvent(
        "fynaro-profile-updated",
        {
          detail:
            profileToStore,
        }
      )
    );

    setSaving(false);
    setSaved(true);

    window.setTimeout(
      () => {
        setSaved(false);
      },
      2500
    );
  }

  /* ------------------------------------------------------------------------ */
  /* COMPLETENESS                                                             */
  /* ------------------------------------------------------------------------ */

  const completion =
    useMemo(() => {
      const required = [
        form.fullName,
        form.email,
        form.phone,
        form.address,
        form.city,
        form.state,
      ];

      const useful = [
        form.company,
        form.role,
        form.website,
      ];

      const all = [
        ...required,
        ...useful,
      ];

      const completed =
        all.filter(
          (value) =>
            value.trim()
              .length > 0
        ).length;

      const percentage =
        Math.round(
          (completed /
            all.length) *
            100
        );

      const missingRequired =
        required.filter(
          (value) =>
            !value.trim()
        ).length;

      return {
        percentage,
        missingRequired,
      };
    }, [
      form,
    ]);

  /* ------------------------------------------------------------------------ */
  /* LOADING                                                                  */
  /* ------------------------------------------------------------------------ */

  if (loading) {
    return (
      <ProfileLoading />
    );
  }

  /* ------------------------------------------------------------------------ */
  /* ERROR                                                                    */
  /* ------------------------------------------------------------------------ */

  if (error) {
    return (
      <div className="mx-auto w-full max-w-[1420px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[20px] border border-[#a94444]/20 bg-white p-8">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8d3939]">
            Profile unavailable
          </p>

          <h1 className="mt-3 text-[28px] font-semibold tracking-[-0.04em]">
            We could not load
            your account.
          </h1>

          <p className="mt-3 text-[11px] text-black/45">
            {error}
          </p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-6 rounded-full bg-[#111] px-5 py-2.5 text-[9px] font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1420px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      {/* HEADER */}

      <section className="border-b border-black/[0.08] pb-8">
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
          Account
        </p>

        <h1 className="mt-3 text-[38px] font-semibold leading-none tracking-[-0.05em] sm:text-[48px]">
          Your profile.
        </h1>

        <p className="mt-3 max-w-[560px] text-[11px] leading-5 text-black/42">
          Your account identity,
          contact and delivery
          information used across
          Fynaro projects, orders
          and checkout.
        </p>
      </section>

      {/* IDENTITY */}

      <section className="border-b border-black/[0.08] py-7">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#111] text-[16px] font-semibold text-white">
              {getInitials(
                form.fullName ||
                  form.email
              )}
            </div>

            <div>
              <h2 className="text-[17px] font-semibold tracking-[-0.025em]">
                {form.fullName ||
                  "Fynaro Client"}
              </h2>

              <p className="mt-1 text-[9px] text-black/35">
                {form.email}
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex rounded-full bg-[#e7eee8] px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[0.1em] text-[#45604b]">
                  Active Client
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-[#f2f2ed] px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[0.1em] text-black/40">
                  <ShieldCheck
                    size={8}
                  />

                  Signed in
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/shop/settings"
            className="inline-flex h-9 w-fit items-center gap-2 rounded-full border border-black/[0.09] px-4 text-[9px] font-semibold text-black/50 transition hover:bg-[#f4f4ef] hover:text-black"
          >
            Account settings

            <ChevronRight
              size={11}
            />
          </Link>
        </div>
      </section>

      <form
        onSubmit={
          handleSave
        }
        className="grid gap-10 py-8 xl:grid-cols-[minmax(0,1fr)_320px]"
      >
        <main className="min-w-0">
          <div className="max-w-[850px]">
            {/* ACCOUNT IDENTITY */}

            <SectionHeading
              eyebrow="Identity"
              title="Account identity"
              description="These details come directly from your signed-in Fynaro account."
            />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <ReadOnlyField
                label="Full name"
                value={
                  form.fullName
                }
                icon={
                  UserRound
                }
              />

              <ReadOnlyField
                label="Email address"
                value={
                  form.email
                }
                icon={
                  Mail
                }
              />
            </div>

            <Divider />

            {/* CONTACT */}

            <SectionHeading
              eyebrow="Contact"
              title="Contact information"
              description="Used for project communication, order confirmations and delivery questions."
            />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <FormField
                label="Phone number"
                value={
                  form.phone
                }
                onChange={(
                  value
                ) =>
                  updateField(
                    "phone",
                    value
                  )
                }
                icon={
                  Phone
                }
                type="tel"
                autoComplete="tel"
                placeholder="+234..."
                required
              />

              <FormField
                label="Role / Position"
                value={
                  form.role
                }
                onChange={(
                  value
                ) =>
                  updateField(
                    "role",
                    value
                  )
                }
                icon={
                  UserRound
                }
                placeholder="Founder, Manager..."
              />
            </div>

            <Divider />

            {/* DELIVERY */}

            <SectionHeading
              eyebrow="Delivery"
              title="Default delivery address"
              description="This address will automatically appear during checkout and can still be changed for an individual order."
            />

            <div className="mt-6 grid gap-5">
              <FormField
                label="Street address"
                value={
                  form.address
                }
                onChange={(
                  value
                ) =>
                  updateField(
                    "address",
                    value
                  )
                }
                icon={
                  MapPin
                }
                autoComplete="street-address"
                placeholder="House number, street and area"
                required
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="City"
                  value={
                    form.city
                  }
                  onChange={(
                    value
                  ) =>
                    updateField(
                      "city",
                      value
                    )
                  }
                  icon={
                    MapPin
                  }
                  autoComplete="address-level2"
                  placeholder="Ibadan"
                  required
                />

                <FormField
                  label="State"
                  value={
                    form.state
                  }
                  onChange={(
                    value
                  ) =>
                    updateField(
                      "state",
                      value
                    )
                  }
                  icon={
                    MapPin
                  }
                  autoComplete="address-level1"
                  placeholder="Oyo"
                  required
                />
              </div>
            </div>

            <Divider />

            {/* BUSINESS */}

            <SectionHeading
              eyebrow="Business"
              title="Business information"
              description="Used when Fynaro prepares proposals, invoices, projects and business documents."
            />

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <FormField
                label="Company / Business"
                value={
                  form.company
                }
                onChange={(
                  value
                ) =>
                  updateField(
                    "company",
                    value
                  )
                }
                icon={
                  Building2
                }
                autoComplete="organization"
                placeholder="Business name"
              />

              <FormField
                label="Website"
                value={
                  form.website
                }
                onChange={(
                  value
                ) =>
                  updateField(
                    "website",
                    value
                  )
                }
                icon={
                  Globe2
                }
                type="url"
                placeholder="https://example.com"
              />
            </div>

            {/* SAVE */}

            <div className="mt-9 flex flex-wrap items-center gap-3 border-t border-black/[0.08] pt-6">
              <button
                type="submit"
                disabled={
                  saving
                }
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[#111] px-5 text-[9px] font-semibold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2
                      size={11}
                      className="animate-spin"
                    />
                    Saving
                  </>
                ) : saved ? (
                  <>
                    <Check
                      size={11}
                    />
                    Saved
                  </>
                ) : (
                  <>
                    <Save
                      size={11}
                    />
                    Save changes
                  </>
                )}
              </button>

              {saved && (
                <span className="text-[8px] font-medium text-[#46624b]">
                  Your profile has
                  been updated.
                </span>
              )}
            </div>
          </div>
        </main>

        {/* SIDEBAR */}

        <aside>
          <div className="space-y-4 xl:sticky xl:top-[100px]">
            <section className="rounded-[18px] bg-[#111] p-5 text-white">
              <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/35">
                Profile completeness
              </p>

              <div className="mt-5 flex items-end justify-between gap-4">
                <p className="text-[30px] font-semibold tracking-[-0.05em]">
                  {
                    completion.percentage
                  }
                  %
                </p>

                <p className="text-right text-[8px] leading-4 text-white/35">
                  {completion.missingRequired ===
                  0
                    ? "Ready for checkout"
                    : `${completion.missingRequired} required ${
                        completion.missingRequired ===
                        1
                          ? "field"
                          : "fields"
                      } missing`}
                </p>
              </div>

              <div className="mt-4 h-[3px] overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{
                    width: `${completion.percentage}%`,
                  }}
                />
              </div>

              <p className="mt-4 text-[9px] leading-5 text-white/45">
                Complete your contact
                and delivery details
                once and Fynaro can
                reuse them during
                checkout.
              </p>
            </section>

            <section className="rounded-[18px] border border-black/[0.08] bg-white p-5">
              <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-black/30">
                Checkout readiness
              </p>

              <div className="mt-5 space-y-4">
                <StatusRow
                  label="Name"
                  complete={
                    Boolean(
                      form.fullName.trim()
                    )
                  }
                />

                <StatusRow
                  label="Email"
                  complete={
                    Boolean(
                      form.email.trim()
                    )
                  }
                />

                <StatusRow
                  label="Phone"
                  complete={
                    Boolean(
                      form.phone.trim()
                    )
                  }
                />

                <StatusRow
                  label="Delivery address"
                  complete={
                    Boolean(
                      form.address.trim() &&
                        form.city.trim() &&
                        form.state.trim()
                    )
                  }
                />
              </div>
            </section>
          </div>
        </aside>
      </form>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

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
    <div>
      <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-black/30">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-[20px] font-semibold tracking-[-0.03em]">
        {title}
      </h2>

      <p className="mt-2 max-w-[560px] text-[10px] leading-5 text-black/38">
        {description}
      </p>
    </div>
  );
}

function Divider() {
  return (
    <div className="my-9 border-t border-black/[0.08]" />
  );
}

function ReadOnlyField({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <label className="block">
      <span className="text-[8px] font-semibold uppercase tracking-[0.13em] text-black/32">
        {label}
      </span>

      <div className="relative mt-2">
        <Icon
          size={12}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-black/25"
        />

        <div className="flex h-11 items-center rounded-[12px] border border-black/[0.07] bg-[#f3f3ef] pl-9 pr-3.5 text-[10px] font-medium text-black/60">
          {value ||
            "Not available"}
        </div>
      </div>

      <p className="mt-1.5 text-[7px] text-black/28">
        Linked to your signed-in
        account
      </p>
    </label>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  type = "text",
  autoComplete,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  placeholder?: string;
  icon?: React.ElementType;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  const missing =
    required &&
    !value.trim();

  return (
    <label className="block">
      <span className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.13em] text-black/32">
        {label}

        {required && (
          <span className="text-[#987b2b]">
            Required
          </span>
        )}
      </span>

      <div className="relative mt-2">
        {Icon && (
          <Icon
            size={12}
            className={[
              "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2",
              missing
                ? "text-white/40"
                : "text-black/25",
            ].join(
              " "
            )}
          />
        )}

        <input
          type={type}
          value={value}
          required={required}
          autoComplete={
            autoComplete
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
            "h-11 w-full rounded-[12px] border text-[10px] outline-none transition",
            Icon
              ? "pl-9 pr-3.5"
              : "px-3.5",

            missing
              ? "border-[#111] bg-[#111] text-white placeholder:text-white/35 focus:bg-black"
              : "border-black/[0.08] bg-white text-black placeholder:text-black/20 focus:border-black/20 focus:bg-[#fcfcfa]",
          ].join(
            " "
          )}
        />
      </div>
    </label>
  );
}

function StatusRow({
  label,
  complete,
}: {
  label: string;
  complete: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-black/[0.06] pb-3 last:border-b-0 last:pb-0">
      <span className="text-[9px] text-black/40">
        {label}
      </span>

      <span
        className={[
          "rounded-full px-2 py-1 text-[7px] font-semibold",
          complete
            ? "bg-[#e7eee8] text-[#45604b]"
            : "bg-[#111] text-white",
        ].join(
          " "
        )}
      >
        {complete
          ? "Ready"
          : "Add"}
      </span>
    </div>
  );
}

function getInitials(
  value: string
) {
  const parts =
    value
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  if (!parts.length) {
    return "FC";
  }

  if (parts.length === 1) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return `${parts[0][0]}${
    parts[
      parts.length - 1
    ][0]
  }`.toUpperCase();
}

function ProfileLoading() {
  return (
    <div className="mx-auto w-full max-w-[1420px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="h-2 w-20 rounded bg-black/[0.05]" />

        <div className="mt-4 h-12 w-64 rounded-xl bg-black/[0.05]" />

        <div className="mt-8 border-t border-black/[0.08] pt-8">
          <div className="h-16 w-16 rounded-full bg-black/[0.05]" />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {[
            1,
            2,
            3,
            4,
            5,
            6,
          ].map(
            (item) => (
              <div
                key={item}
                className="h-16 rounded-xl bg-black/[0.04]"
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}