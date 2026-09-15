import {
  Bell,
  Search,
} from "lucide-react";

type AdminTopbarProps = {
  name: string;
  role: string;
};

function formatRole(
  role: string
) {
  return role
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

export default function AdminTopbar({
  name,
  role,
}: AdminTopbarProps) {
  const initials =
    name
      ?.split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map(
        (part) =>
          part[0]?.toUpperCase()
      )
      .join("") || "FA";

  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-[#fafaf8]/95 backdrop-blur-xl">
      <div className="flex h-[86px] items-center justify-between gap-5 px-5 sm:px-7 lg:px-9">
        <div>
          <p className="text-sm font-medium text-[#111111]">
            Admin workspace
          </p>

          <p className="mt-0.5 text-xs text-black/40">
            Manage Fynaro operations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden h-10 items-center gap-2 rounded-xl border border-black/8 bg-white px-3 text-sm text-black/45 sm:flex"
          >
            <Search
              className="h-4 w-4"
              strokeWidth={
                1.8
              }
            />

            <span className="pr-6">
              Search
            </span>
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/8 bg-white text-black/55 transition hover:-translate-y-0.5"
          >
            <Bell
              className="h-[18px] w-[18px]"
              strokeWidth={
                1.8
              }
            />
          </button>

          <div className="ml-1 flex items-center gap-3 rounded-xl px-1.5 py-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#111111] text-xs font-semibold text-white">
              {initials}
            </div>

            <div className="hidden md:block">
              <p className="max-w-[160px] truncate text-sm font-medium text-[#111111]">
                {name}
              </p>

              <p className="text-xs text-black/40">
                {formatRole(
                  role
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}