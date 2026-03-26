// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../contexts/cartContext";
import { WishlistProvider } from "../contexts/wishlistContext"; // ✅ add this
import { FynaroToastHost } from "@/components/dashboard components/common/fynaroToast"; // ✅ use the actual path you created

export const metadata = {
  title: {
    default: "Fynaro Tech",
    template: "%s | Fynaro Tech",
  },
  description:
    "Fynaro Tech builds premium digital experiences through design, technology, and strategy.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        <CartProvider>
          <WishlistProvider>
            {children}
            {/* 🔔 Toast container lives once here */}
            <FynaroToastHost />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
