// components/fynaro/WorkspaceNotFound.tsx

import Link from "next/link";
import {
  ArrowLeft,
  SearchX,
} from "lucide-react";

type Props = {
  title: string;
  description: string;
  backHref: string;
  backLabel: string;
};

export default function WorkspaceNotFound({
  title,
  description,
  backHref,
  backLabel,
}: Props) {
  return (
    <div className="grid min-h-[70vh] place-items-center px-5">
      <div className="max-w-[460px] text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/[0.05]">
          <SearchX size={17} />
        </span>

        <p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.18em] text-black/30">
          Fynaro Workspace
        </p>

        <h1 className="mt-3 text-[30px] font-semibold tracking-[-0.04em]">
          {title}
        </h1>

        <p className="mt-4 text-[11px] leading-5 text-black/40">
          {description}
        </p>

        <Link
          href={backHref}
          className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-[#111] px-5 text-[11px] font-semibold text-white"
        >
          <ArrowLeft size={12} />
          {backLabel}
        </Link>
      </div>
    </div>
  );
}