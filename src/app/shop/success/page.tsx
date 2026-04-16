import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  return (
    <main className="min-h-screen bg-[#050506] text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-20 sm:px-8">
        <div className="w-full rounded-[32px] border border-white/10 bg-white/[0.04] p-8 sm:p-10">
          <div className="flex items-center gap-3 text-emerald-300">
            <CheckCircle2 className="h-8 w-8" />
            <p className="text-lg font-semibold">Payment Successful</p>
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Your order has been received
          </h1>

          <p className="mt-4 text-sm leading-7 text-white/65 sm:text-[15px]">
            Your payment was completed successfully. We have received your order
            and will process it shortly.
          </p>

          {ref ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                Payment Reference
              </p>
              <p className="mt-2 break-all text-sm font-medium text-[#eadb97]">
                {ref}
              </p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#d6cc6d] px-5 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]"
            >
              Continue Shopping
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.07]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}