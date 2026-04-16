"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    FlutterwaveCheckout?: (options: Record<string, unknown>) => void;
    closeFlutterwaveModal?: () => void;
  }
}

type PayNowButtonProps = {
  serviceId: string;
  serviceTitle: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  currency?: string;
  redirectUrl?: string;
  className?: string;
  buttonText?: string;
  onVerified?: (payload: unknown) => void;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeAmount(value: number) {
  if (!Number.isFinite(value) || value <= 0) return 0;
  return Number(value);
}

function makeTxRef(serviceId: string) {
  const safeServiceId = serviceId.replace(/[^a-zA-Z0-9_-]/g, "");
  const random = Math.random().toString(36).slice(2, 8);
  return `fynaro_${safeServiceId}_${Date.now()}_${random}`;
}

export default function PayNowButton({
  serviceId,
  serviceTitle,
  amount,
  customerName,
  customerEmail,
  customerPhone,
  currency = "NGN",
  redirectUrl = "/shop/success",
  className,
  buttonText = "Pay Now",
  onVerified,
}: PayNowButtonProps) {
  const [isReady, setIsReady] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const scriptAddedByThisComponent = useRef(false);

  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://checkout.flutterwave.com/v3.js"]'
    ) as HTMLScriptElement | null;

    if (existing) {
      if (window.FlutterwaveCheckout) {
        setIsReady(true);
        return;
      }

      const handleExistingLoad = () => setIsReady(true);
      existing.addEventListener("load", handleExistingLoad);

      return () => {
        existing.removeEventListener("load", handleExistingLoad);
      };
    }

    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    script.onload = () => setIsReady(true);
    script.onerror = () => {
      setErrorMessage("Unable to load payment gateway. Please refresh and try again.");
      setIsReady(false);
    };

    document.body.appendChild(script);
    scriptAddedByThisComponent.current = true;

    return () => {
      if (scriptAddedByThisComponent.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handlePay = async () => {
    setErrorMessage("");

    const cleanName = customerName.trim();
    const cleanEmail = customerEmail.trim();
    const cleanPhone = customerPhone?.trim() || "";
    const normalizedAmount = normalizeAmount(amount);
    const publicKey = process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY;

    if (!isReady || !window.FlutterwaveCheckout) {
      setErrorMessage("Payment service is still loading. Please try again in a moment.");
      return;
    }

    if (!publicKey) {
      setErrorMessage("Missing Flutterwave public key.");
      return;
    }

    if (!serviceId.trim()) {
      setErrorMessage("Missing service ID.");
      return;
    }

    if (!serviceTitle.trim()) {
      setErrorMessage("Missing service title.");
      return;
    }

    if (!cleanName) {
      setErrorMessage("Please enter your full name before payment.");
      return;
    }

    if (!cleanEmail) {
      setErrorMessage("Please enter your email address before payment.");
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (normalizedAmount <= 0) {
      setErrorMessage("Invalid payment amount.");
      return;
    }

    if (isLaunching || isVerifying) {
      return;
    }

    const txRef = makeTxRef(serviceId);

    try {
      setIsLaunching(true);

      window.FlutterwaveCheckout({
        public_key: publicKey,
        tx_ref: txRef,
        amount: normalizedAmount,
        currency,
        payment_options: "card,banktransfer,ussd",
        customer: {
          email: cleanEmail,
          phone_number: cleanPhone,
          name: cleanName,
        },
        meta: {
          serviceId,
          serviceTitle,
        },
        customizations: {
          title: "Fynaro Tech",
          description: `Payment for ${serviceTitle}`,
          logo: "/logo.png",
        },
        callback: async (response: any) => {
          try {
            setIsLaunching(false);
            setIsVerifying(true);
            setErrorMessage("");

            const transactionId =
              response?.transaction_id ?? response?.id ?? null;

            if (!transactionId) {
              throw new Error("Missing transaction ID from payment response.");
            }

            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                transaction_id: transactionId,
                tx_ref: txRef,
                serviceId,
                serviceTitle,
                customerEmail: cleanEmail,
                customerName: cleanName,
                customerPhone: cleanPhone,
                expectedAmount: normalizedAmount,
                expectedCurrency: currency,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              throw new Error(
                verifyData?.error || "Payment verification failed."
              );
            }

            if (typeof window.closeFlutterwaveModal === "function") {
              window.closeFlutterwaveModal();
            }

            if (onVerified) {
              onVerified(verifyData);
            }

            const separator = redirectUrl.includes("?") ? "&" : "?";
            window.location.href = `${redirectUrl}${separator}ref=${encodeURIComponent(
              txRef
            )}`;
          } catch (error) {
            const message =
              error instanceof Error
                ? error.message
                : "Something went wrong while verifying your payment.";

            setErrorMessage(message);
            alert(message);
          } finally {
            setIsVerifying(false);
          }
        },
        onclose: () => {
          setIsLaunching(false);
        },
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to start payment.";

      setErrorMessage(message);
      setIsLaunching(false);
    }
  };

  const disabled = !isReady || isLaunching || isVerifying;

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handlePay}
        disabled={disabled}
        className={
          className ||
          "inline-flex h-12 w-full items-center justify-center rounded-full bg-[#d6cc6d] px-6 text-sm font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        }
      >
        {isLaunching
          ? "Opening payment..."
          : isVerifying
          ? "Verifying payment..."
          : !isReady
          ? "Loading payment..."
          : buttonText}
      </button>

      {errorMessage ? (
        <p className="mt-3 text-sm text-red-300">{errorMessage}</p>
      ) : null}
    </div>
  );
}