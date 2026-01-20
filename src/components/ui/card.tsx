"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ───────────────── Card Root ───────────────── */

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function Card({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-neutral-800 bg-[#0c0b10] text-white shadow-sm",
        className
      )}
      {...props}
    />
  );
});

Card.displayName = "Card";

/* ───────────────── Card Header ───────────────── */

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CardHeader({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
});

CardHeader.displayName = "CardHeader";

/* ───────────────── Card Title ───────────────── */

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(function CardTitle({ className, ...props }, ref) {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
});

CardTitle.displayName = "CardTitle";

/* ───────────────── Card Content ───────────────── */

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CardContent({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  );
});

CardContent.displayName = "CardContent";

/* ───────────────── Card Footer ───────────────── */

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CardFooter({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
});

CardFooter.displayName = "CardFooter";

/* ───────────────── Exports ───────────────── */

export {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
};
