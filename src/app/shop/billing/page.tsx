"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  CreditCard,
  FileText,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { useMemo, useState } from "react";

type PaymentMethod = "card" | "transfer";

type PaymentStatus =
  | "pending"
  | "processing"
  | "paid"
  | "failed";

type PaymentStage = {
  percentage: number;
  label: string;
  amount: number;
  status: "due" | "upcoming" | "paid";
};

const proposal = {
  id: "PRP-0042",
  requestId: "FYN-0042",
  projectTitle: "Marketplace Platform",
  service: "Digital Product",
  scope: "Custom Product Development",
  totalInvestment: 2450000,
};

const paymentSchedule: PaymentStage[] = [
  {
    percentage: 50,
    label: "Project Start",
    amount: 1225000,
    status: "due",
  },
  {
    percentage: 30,
    label: "Development Milestone",
    amount: 735000,
    status: "upcoming",
  },
  {
    percentage: 20,
    label: "Final Delivery",
    amount: 490000,
    status: "upcoming",
  },
];

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export default function BillingPage() {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("card");

  const [paymentStatus, setPaymentStatus] =
    useState<PaymentStatus>("pending");

  const initialPayment = paymentSchedule[0];

  const remainingBalance = useMemo(
    () => proposal.totalInvestment - initialPayment.amount,
    [initialPayment.amount]
  );

  const handlePayment = async () => {
    setPaymentStatus("processing");

    /*
     * Replace this with your actual payment provider.
     *
     * Example:
     *
     * const result = await initializePayment({
     *   proposalId: proposal.id,
     *   amount: initialPayment.amount,
     *   currency: "NGN",
     * });
     *
     * Redirect to provider checkout or open payment modal.
     */

    console.log({
      proposalId: proposal.id,
      amount: initialPayment.amount,
      paymentMethod,
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      {/* BREADCRUMB */}
      <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/35">
        <Link href="/shop" className="transition hover:text-black">
          Dashboard
        </Link>

        <span>/</span>

        <Link
          href="/shop/proposals"
          className="transition hover:text-black"
        >
          Proposals
        </Link>

        <span>/</span>

        <span>Payment</span>
      </div>

      {/* HEADER */}
      <section className="mt-8 border-b border-black/[0.09] pb-9">
        <Link
          href={`/shop/proposals/${proposal.id}`}
          className="mb-7 inline-flex items-center gap-2 text-[11px] font-semibold text-black/40 transition hover:text-black"
        >
          <ArrowLeft size={13} />
          Back to proposal
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-black/35">
              Initial Payment
            </p>

            <h1 className="mt-3 max-w-[800px] text-[40px] font-semibold leading-[0.96] tracking-[-0.05em] sm:text-[52px]">
              Confirm the project start.
            </h1>

            <p className="mt-5 max-w-[620px] text-[12px] leading-6 text-black/45">
              Your proposal has been accepted. Complete the initial
              payment to move this work into an active Fynaro project.
            </p>
          </div>

          <div className="rounded-full bg-[#e7eee8] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#45604b]">
            Proposal Accepted
          </div>
        </div>
      </section>

      <div className="grid gap-8 py-8 xl:grid-cols-[1fr_370px]">
        <main className="space-y-8">
          {/* PROJECT */}
          <section className="overflow-hidden rounded-[20px] border border-black/[0.09] bg-white">
            <div className="p-6 sm:p-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                Project
              </p>

              <div className="mt-5 flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-black/[0.05]">
                  <Building2 size={17} />
                </span>

                <div>
                  <h2 className="text-[22px] font-semibold tracking-[-0.035em]">
                    {proposal.projectTitle}
                  </h2>

                  <p className="mt-1.5 text-[11px] text-black/40">
                    {proposal.scope}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid border-t border-black/[0.08] sm:grid-cols-3">
              <InfoCell
                label="Proposal"
                value={proposal.id}
              />

              <InfoCell
                label="Service"
                value={proposal.service}
              />

              <InfoCell
                label="Investment"
                value={formatMoney(proposal.totalInvestment)}
              />
            </div>
          </section>

          {/* AMOUNT DUE */}
          <section className="rounded-[22px] bg-[#111] p-7 text-white sm:p-9">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/30">
                  Due Now
                </p>

                <p className="mt-4 text-[38px] font-semibold tracking-[-0.05em] sm:text-[48px]">
                  {formatMoney(initialPayment.amount)}
                </p>

                <p className="mt-3 text-[11px] text-white/40">
                  {initialPayment.percentage}% initial payment
                </p>
              </div>

              <div className="md:text-right">
                <p className="text-[9px] uppercase tracking-[0.14em] text-white/30">
                  Remaining after payment
                </p>

                <p className="mt-2 text-[16px] font-semibold">
                  {formatMoney(remainingBalance)}
                </p>
              </div>
            </div>
          </section>

          {/* PAYMENT METHOD */}
          <section className="rounded-[20px] border border-black/[0.09] bg-white p-6 sm:p-8">
            <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
              Payment Method
            </p>

            <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.035em]">
              How would you like to pay?
            </h2>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <PaymentMethodCard
                active={paymentMethod === "card"}
                icon={CreditCard}
                title="Card / Online Payment"
                description="Pay securely through the available online payment provider."
                onClick={() => setPaymentMethod("card")}
              />

              <PaymentMethodCard
                active={paymentMethod === "transfer"}
                icon={Building2}
                title="Bank Transfer"
                description="Transfer directly and submit the payment reference for confirmation."
                onClick={() => setPaymentMethod("transfer")}
              />
            </div>

            {paymentMethod === "transfer" && (
              <div className="mt-6 rounded-[16px] bg-[#f2f2ee] p-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/30">
                  Bank Transfer
                </p>

                <p className="mt-3 text-[11px] leading-5 text-black/45">
                  Your verified Fynaro bank details should appear here
                  from your backend or business configuration. Avoid
                  hardcoding account information directly into this
                  component.
                </p>

                <button
                  type="button"
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[10px] font-semibold"
                >
                  <FileText size={12} />
                  Submit Payment Reference
                </button>
              </div>
            )}
          </section>

          {/* PAYMENT SCHEDULE */}
          <section className="overflow-hidden rounded-[20px] border border-black/[0.09] bg-white">
            <div className="p-6 sm:p-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                Payment Schedule
              </p>

              <h2 className="mt-3 text-[24px] font-semibold tracking-[-0.035em]">
                Project payment structure
              </h2>
            </div>

            <div className="border-t border-black/[0.08]">
              {paymentSchedule.map((payment) => (
                <div
                  key={payment.percentage}
                  className="grid gap-5 border-b border-black/[0.07] p-6 last:border-b-0 sm:grid-cols-[70px_1fr_auto] sm:items-center sm:p-7"
                >
                  <p className="text-[23px] font-semibold tracking-[-0.04em]">
                    {payment.percentage}%
                  </p>

                  <div>
                    <p className="text-[12px] font-semibold">
                      {payment.label}
                    </p>

                    <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-black/30">
                      {payment.status === "due"
                        ? "Due now"
                        : "Upcoming"}
                    </p>
                  </div>

                  <p className="text-[14px] font-semibold sm:text-right">
                    {formatMoney(payment.amount)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* SECURITY */}
          <section className="flex items-start gap-4 rounded-[18px] bg-[#e9e9e3] p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/70">
              <ShieldCheck size={16} />
            </span>

            <div>
              <p className="text-[12px] font-semibold">
                Payment records stay attached to the project.
              </p>

              <p className="mt-2 max-w-[650px] text-[10px] leading-5 text-black/42">
                Every confirmed payment should create a transaction
                record and receipt inside the client workspace.
              </p>
            </div>
          </section>
        </main>

        {/* SIDEBAR */}
        <aside>
          <div className="space-y-4 xl:sticky xl:top-[100px]">
            <div className="rounded-[20px] border border-black/[0.09] bg-white p-6">
              <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-black/30">
                Payment Summary
              </p>

              <div className="mt-6 space-y-5">
                <SummaryRow
                  label="Project investment"
                  value={formatMoney(proposal.totalInvestment)}
                />

                <SummaryRow
                  label="Initial payment"
                  value={formatMoney(initialPayment.amount)}
                />

                <SummaryRow
                  label="Remaining balance"
                  value={formatMoney(remainingBalance)}
                />
              </div>

              <div className="mt-6 border-t border-black/[0.08] pt-6">
                <button
                  type="button"
                  disabled={paymentStatus === "processing"}
                  onClick={handlePayment}
                  className="flex h-12 w-full items-center justify-between rounded-full bg-[#111] px-5 text-[11px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {paymentStatus === "processing"
                    ? "Preparing payment..."
                    : `Pay ${formatMoney(initialPayment.amount)}`}

                  <ArrowRight size={13} />
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-[9px] text-black/30">
                  <LockKeyhole size={11} />
                  Secure payment
                </div>
              </div>
            </div>

            <div className="rounded-[20px] bg-[#111] p-6 text-white">
              <ReceiptText size={17} className="text-white/50" />

              <p className="mt-5 text-[12px] font-semibold">
                Receipt generated automatically.
              </p>

              <p className="mt-2 text-[10px] leading-5 text-white/40">
                After successful payment, the transaction and receipt
                become available in your workspace.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PaymentMethodCard({
  active,
  icon: Icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: React.ElementType;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "min-h-[170px] rounded-[18px] border p-5 text-left transition",
        active
          ? "border-black bg-[#111] text-white"
          : "border-black/[0.09] bg-[#fafaf8] hover:border-black/25",
      ].join(" ")}
    >
      <div className="flex items-start justify-between">
        <span
          className={[
            "flex h-10 w-10 items-center justify-center rounded-full border",
            active
              ? "border-white/15"
              : "border-black/[0.08]",
          ].join(" ")}
        >
          <Icon size={15} />
        </span>

        <span
          className={[
            "flex h-6 w-6 items-center justify-center rounded-full border",
            active
              ? "border-white bg-white text-black"
              : "border-black/[0.1]",
          ].join(" ")}
        >
          {active && <Check size={11} />}
        </span>
      </div>

      <p className="mt-7 text-[13px] font-semibold">
        {title}
      </p>

      <p
        className={[
          "mt-2 text-[10px] leading-5",
          active ? "text-white/40" : "text-black/40",
        ].join(" ")}
      >
        {description}
      </p>
    </button>
  );
}

function InfoCell({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-black/[0.07] p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:p-6 sm:last:border-r-0">
      <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-black/30">
        {label}
      </p>

      <p className="mt-2 text-[11px] font-medium">
        {value}
      </p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-5">
      <p className="text-[10px] text-black/40">
        {label}
      </p>

      <p className="text-[11px] font-semibold">
        {value}
      </p>
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import { motion } from "framer-motion";
// import Header from "@/components/dashboard components/mainheader";
// import {
//   ArrowLeft,
//   CreditCard,
//   Wallet,
//   FileText,
//   Download,
//   AlertCircle,
//   CheckCircle2,
//   XCircle,
//   ArrowUpRight,
// } from "lucide-react";

// type InvoiceStatus = "Paid" | "Pending" | "Overdue";
// type PaymentMethodKey = "card" | "transfer" | "wallet";

// type Invoice = {
//   id: string;
//   label: string;
//   date: string;
//   amount: number;
//   status: InvoiceStatus;
//   project?: string;
// };

// const formatNGN = (amount: number) =>
//   `₦${amount.toLocaleString("en-NG", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;

// const INVOICES: Invoice[] = [
//   {
//     id: "INV-2412-001",
//     label: "Brand starter pack",
//     date: "10 February 2025",
//     amount: 185000,
//     status: "Paid",
//     project: "Studio – Design & Mockups",
//   },
//   {
//     id: "INV-2412-002",
//     label: "50 Classic White Tees",
//     date: "24 February 2025",
//     amount: 325000,
//     status: "Pending",
//     project: "PrintHub – Merch drop",
//   },
//   {
//     id: "2411-008",
//     label: "Autotech crew merch",
//     date: "02 January 2025",
//     amount: 210000,
//     status: "Overdue",
//     project: "AutoTech – Internal merch",
//   },
// ];

// const invoiceStatusStyles: Record<InvoiceStatus, { chip: string; text: string }> = {
//   Paid: {
//     chip: "bg-emerald-50/90 text-emerald-700 border-emerald-200",
//     text: "text-emerald-300",
//   },
//   Pending: {
//     chip: "bg-amber-50/90 text-amber-700 border-amber-200",
//     text: "text-amber-300",
//   },
//   Overdue: {
//     chip: "bg-rose-50/90 text-rose-700 border-rose-200",
//     text: "text-rose-300",
//   },
// };

// export default function BillingPage() {
//   const [selectedMethod, setSelectedMethod] = useState<PaymentMethodKey>("card");

//   const stats = useMemo(() => {
//     const totalInvoices = INVOICES.length;
//     const paid = INVOICES.filter((i) => i.status === "Paid").length;
//     const pending = INVOICES.filter((i) => i.status === "Pending").length;
//     const overdue = INVOICES.filter((i) => i.status === "Overdue").length;
//     const outstanding = INVOICES.filter((i) => i.status !== "Paid").reduce(
//       (sum, i) => sum + i.amount,
//       0
//     );
//     const totalPaid = INVOICES.filter((i) => i.status === "Paid").reduce(
//       (sum, i) => sum + i.amount,
//       0
//     );

//     return { totalInvoices, paid, pending, overdue, outstanding, totalPaid };
//   }, []);

//   const currentPlanName = "Standard Plan";
//   const currentPlanTagline = "Clean billing. No noise.";

//   return (
//     <main className="min-h-screen bg-[#050505] text-white pt-20 pb-16">
//       <Header />

//       <div className="max-w-6xl mt-10 mx-auto px-4 sm:px-6 lg:px-8">
//         <nav className="mb-3 sm:mb-4 text-[11px] sm:text-xs text-neutral-500">
//           <ol className="flex items-center gap-1.5 sm:gap-2">
//             <li>
//               <Link href="/" className="hover:text-neutral-200">
//                 Home
//               </Link>
//             </li>
//             <li className="text-neutral-600">/</li>
//             <li className="text-neutral-300">Billing</li>
//           </ol>
//         </nav>

//         <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8">
//           <button
//             type="button"
//             onClick={() => history.back()}
//             className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-neutral-300 hover:text-white"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back
//           </button>
//         </div>

//         <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-6 sm:mb-8">
//           <div>
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
//               Billing
//             </h1>
//             <p className="mt-1 text-xs sm:text-sm text-neutral-400 max-w-xl">
//               All payments in one clean view.
//             </p>
//           </div>

//           <div className="text-right text-[11px] sm:text-xs">
//             <p className="text-neutral-400">Invoices</p>
//             <p className="text-sm sm:text-base font-semibold">
//               {stats.totalInvoices}{" "}
//               <span className="text-neutral-400 font-normal">total</span>
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] gap-6 lg:gap-8">
//           {/* ───────── LEFT ───────── */}
//           <section className="space-y-5">
//             <motion.div
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.35 }}
//               className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-[#101010] to-[#050505] p-4 sm:p-5"
//             >
//               <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-start">
//                 <div className="space-y-1">
//                   <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
//                     Current plan
//                   </p>
//                   <h2 className="text-sm sm:text-base font-semibold">{currentPlanName}</h2>
//                   <p className="text-[11px] sm:text-xs text-neutral-400">{currentPlanTagline}</p>
//                 </div>

//                 <div className="text-right text-[11px] sm:text-xs">
//                   <p className="text-neutral-400">Total paid</p>
//                   <p className="text-sm sm:text-base font-semibold">
//                     {formatNGN(stats.totalPaid)}
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 text-[11px] sm:text-xs">
//                 <div className="rounded-2xl border border-amber-500/40 bg-amber-950/40 px-3 py-2.5">
//                   <p className="text-neutral-100">Outstanding</p>
//                   <p className="mt-1 text-sm sm:text-base font-semibold text-amber-300">
//                     {formatNGN(stats.outstanding)}
//                   </p>
//                 </div>

//                 <div className="rounded-2xl border border-emerald-500/35 bg-emerald-950/40 px-3 py-2.5">
//                   <p className="text-neutral-100">Upgrade</p>
//                   <p className="mt-1 text-sm sm:text-base font-semibold text-emerald-300">
//                     Studio + Priority
//                   </p>
//                 </div>
//               </div>

//               <div className="mt-4 flex flex-wrap gap-2 text-[11px] sm:text-xs">
//                 <button
//                   type="button"
//                   className="inline-flex items-center gap-1.5 rounded-full bg-white text-black px-4 py-1.5 font-medium hover:bg-neutral-100"
//                 >
//                   <ArrowUpRight className="w-3.5 h-3.5" />
//                   Upgrade
//                 </button>

//                 <button
//                   type="button"
//                   className="inline-flex items-center gap-1.5 rounded-full border border-neutral-500 px-4 py-1.5"
//                 >
//                   <CreditCard className="w-3.5 h-3.5" />
//                   Pay balance
//                 </button>
//               </div>
//             </motion.div>

//             {/* Payment method */}
//             <motion.div
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.35, delay: 0.05 }}
//               className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-[#101010] to-[#050505] p-4 sm:p-5"
//             >
//               <h2 className="text-sm sm:text-base font-medium">Payment method</h2>

//               <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
//                 {(["card", "transfer", "wallet"] as PaymentMethodKey[]).map((method) => {
//                   const icons = { card: <CreditCard className="h-3.5 w-3.5" />, transfer: <FileText className="h-3.5 w-3.5" />, wallet: <Wallet className="h-3.5 w-3.5" /> };
//                   const labels = { card: "Card", transfer: "Bank transfer", wallet: "Wallet" };
//                   return (
//                     <button
//                       key={method}
//                       type="button"
//                       onClick={() => setSelectedMethod(method)}
//                       className={`flex flex-col items-start rounded-2xl border px-3 py-2.5 text-left text-[11px] sm:text-xs transition-all ${
//                         selectedMethod === method
//                           ? "border-neutral-100 bg-neutral-100 text-neutral-950"
//                           : "border-neutral-700 bg-neutral-900/70"
//                       }`}
//                     >
//                       <div className="flex items-center gap-2">{icons[method]}<span className="font-medium">{labels[method]}</span></div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           </section>

//           {/* ───────── RIGHT ───────── */}
//           <section className="space-y-5">
//             <motion.div
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.35 }}
//               className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-[#101010] to-[#050505] p-4 sm:p-5"
//             >
//               <div className="flex items-center justify-between gap-2 mb-3">
//                 <h2 className="text-sm sm:text-base font-medium">Invoices</h2>
//                 <span className="rounded-full border border-neutral-700 px-3 py-1 text-[10px] text-neutral-300 bg-neutral-900/70">
//                   {INVOICES.length}
//                 </span>
//               </div>

//               <div className="space-y-2">
//                 {INVOICES.map((inv) => {
//                   const styles = invoiceStatusStyles[inv.status];
//                   return (
//                     <div
//                       key={inv.id}
//                       className="flex flex-col gap-2 rounded-2xl border border-neutral-800 bg-neutral-900/70 px-3 py-3 text-[11px] sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:text-xs"
//                     >
//                       <div className="flex flex-1 items-start gap-3">
//                         <span
//                           className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] ${styles.chip}`}
//                         >
//                           {inv.status === "Paid" && <CheckCircle2 className="w-3 h-3" />}
//                           {inv.status === "Pending" && <AlertCircle className="w-3 h-3" />}
//                           {inv.status === "Overdue" && <XCircle className="w-3 h-3" />}
//                           <span>{inv.status}</span>
//                         </span>

//                         <div className="min-w-0">
//                           <p className="font-mono text-[11px] text-neutral-300">{inv.id}</p>
//                           <p className="mt-0.5 truncate font-medium text-neutral-50">{inv.label}</p>
//                           {inv.project && <p className="mt-0.5 text-[10px] text-neutral-500 sm:text-[11px]">{inv.project}</p>}
//                           <p className="mt-0.5 text-[10px] text-neutral-500">{inv.date}</p>
//                         </div>
//                       </div>

//                       <div className="flex flex-col items-start gap-1 sm:items-end">
//                         <p className="text-sm sm:text-base font-semibold text-neutral-50">{formatNGN(inv.amount)}</p>
//                         <div className="flex flex-wrap gap-1.5 text-[10px] sm:text-[11px]">
//                           <button className="inline-flex items-center gap-1 rounded-full border border-neutral-600 px-2.5 py-1 text-neutral-100">
//                             <FileText className="w-3 h-3" /> Invoice
//                           </button>
//                           <button className="inline-flex items-center gap-1 rounded-full border border-neutral-700 px-2.5 py-1 text-neutral-300">
//                             <Download className="w-3 h-3" /> Receipt
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// }
