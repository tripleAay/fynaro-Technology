// src/components/ui/GlassSearchBar.tsx
"use client";

import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";

type GlassSearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
  wrapperClassName?: string;
};

export default function GlassSearchBar({
  wrapperClassName = "",
  className = "",
  ...props
}: GlassSearchBarProps) {
  return (
    <div className={`w-full ${wrapperClassName}`}>
      <div className="relative">
        {/* Icon */}
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Search className="h-4 w-4 text-slate-400" />
        </span>

        {/* Input */}
        <input
          type="text"
          {...props}
          placeholder={props.placeholder ?? "Search"}
          className={
            `
            w-full h-10 sm:h-11 rounded-full
            bg-slate-100/80
            border border-slate-200/70
            pl-10 pr-4
            text-sm text-slate-800
            placeholder:text-slate-400
            shadow-inner
            focus:outline-none
            focus:bg-white
            focus:ring-2
            focus:ring-sky-200
            focus:border-sky-300
            transition
          ` + " " + className
          }
        />
      </div>
    </div>
  );
}
