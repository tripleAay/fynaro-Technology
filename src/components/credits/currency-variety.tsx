"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

type CurrencyOption = {
  id: string;
  code: string;
  iconSrc: string;
};

type Props = {
  currencies?: CurrencyOption[];
  defaultActiveId?: string;
  onChange?: (id: string) => void;
};

// NGN REMOVED
const STATIC_CURRENCIES: CurrencyOption[] = [
  { id: "usd", code: "USD", iconSrc: "" },
  { id: "cad", code: "CAD", iconSrc: "" },
  { id: "aud", code: "AUD", iconSrc: "" },
  { id: "eur", code: "EUR", iconSrc: "" },
  { id: "gbp", code: "GBP", iconSrc: "" },
  { id: "chf", code: "CHF", iconSrc: "" },
  { id: "jpy", code: "JPY", iconSrc: "" },
  { id: "cny", code: "CNY", iconSrc: "" },
  { id: "zar", code: "ZAR", iconSrc: "" },
  { id: "sgd", code: "SGD", iconSrc: "" },
  { id: "aed", code: "AED", iconSrc: "" },
  { id: "sar", code: "SAR", iconSrc: "" },
  { id: "brl", code: "BRL", iconSrc: "" },
  { id: "inr", code: "INR", iconSrc: "" },
  { id: "mxn", code: "MXN", iconSrc: "" },
];

export default function CurrencyStripe({
  currencies = STATIC_CURRENCIES,
  defaultActiveId = "usd",
  onChange,
}: Props) {
  const [activeId, setActiveId] = useState(defaultActiveId);
  const [options, setOptions] = useState<CurrencyOption[]>(currencies);

  // Fetch flags from REST Countries
  useEffect(() => {
    async function loadFlags() {
      const updated = await Promise.all(
        currencies.map(async (c) => {
          try {
            const res = await fetch(
              `https://restcountries.com/v3.1/currency/${c.code.toLowerCase()}?fields=flags,currencies`
            );

            if (!res.ok) return c;
            const data = await res.json();
            const first = Array.isArray(data) ? data[0] : null;

            const flagUrl = first?.flags?.png || first?.flags?.svg;
            if (!flagUrl) return c;

            return { ...c, iconSrc: flagUrl };
          } catch {
            return c;
          }
        })
      );

      setOptions(updated);
    }

    loadFlags();
  }, [currencies]);

  const handleClick = (id: string) => {
    setActiveId(id);
    onChange?.(id);
  };

  return (
    <div className="w-full mt-5 bg-black border-b border-slate-800">
      <div className="w-full px-4 sm:px-6">
        {/* wrapped pills, centered, no overflow */}
        <div
          className="
            flex flex-wrap
            items-center justify-center
            gap-x-4 gap-y-3
            py-3
          "
        >
          {options.map((c, index) => {
            const isActive = c.id === activeId;
            const isLast = index === options.length - 1;

            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleClick(c.id)}
                className={`
                  inline-flex items-center gap-2
                  text-xs sm:text-sm font-medium
                  rounded-full px-3 py-1
                  border
                  transition-all
                  active:bg-white/50
                  ${
                    isActive
                      ? "bg-white text-black border-white/80 shadow-[0_0_0_1px_rgba(255,255,255,0.4)] px-4 py-1.5"
                      : "bg-white/40 text-slate-100 border-white/15 hover:bg-white/60 hover:text-black"
                  }
                `}
              >
                <span
                  className={`
                    flex items-center justify-center overflow-hidden
                    ${isActive ? "h-5 w-8 rounded-full bg-white" : "h-5 w-8 rounded-[3px] bg-white"}
                  `}
                >
                  {c.iconSrc ? (
                    <Image
                      src={c.iconSrc}
                      alt={c.code}
                      width={30}
                      height={16}
                    />
                  ) : (
                    <span className="h-3 w-5 rounded-[2px] bg-slate-300" />
                  )}
                </span>

                <span>{c.code}</span>

                {!isActive && isLast && (
                  <ChevronDown className="ml-0.5 h-3 w-3 text-slate-300" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
