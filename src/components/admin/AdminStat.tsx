import {
  LucideIcon,
} from "lucide-react";

type AdminStatCardProps = {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
};

export default function AdminStatCard({
  label,
  value,
  description,
  icon: Icon,
}: AdminStatCardProps) {
  return (
    <div className="rounded-2xl border border-black/6 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.025)]">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-xs font-medium text-black/45">
            {label}
          </p>

          <p className="mt-3 text-[26px] font-semibold tracking-[-0.04em] text-[#111111]">
            {value}
          </p>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f4f4ef] text-black/65">
          <Icon
            className="h-[17px] w-[17px]"
            strokeWidth={
              1.8
            }
          />
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-black/40">
        {description}
      </p>
    </div>
  );
}