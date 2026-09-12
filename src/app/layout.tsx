import type { Metadata } from "next";

import "./globals.css";

import { CartProvider } from "@/contexts/cartContext";
import { WishlistProvider } from "@/contexts/wishlistContext";

import { FynaroToastHost } from "@/components/dashboard components/common/fynaroToast";

export const metadata: Metadata = {
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

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-black"
        suppressHydrationWarning
      >
        <CartProvider>
          <WishlistProvider>
            {children}

            <FynaroToastHost />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}