// lib/fynaro/money.ts

export function formatMoney(
  amount: number,
  currency: "NGN" = "NGN"
) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculatePercentageAmount(
  total: number,
  percentage: number
) {
  return Math.round(total * (percentage / 100));
}

export function calculateBalance(
  total: number,
  amountPaid: number
) {
  return Math.max(total - amountPaid, 0);
}

export function calculatePaymentProgress(
  total: number,
  amountPaid: number
) {
  if (total <= 0) return 0;

  return Math.min(
    Math.round((amountPaid / total) * 100),
    100
  );
}