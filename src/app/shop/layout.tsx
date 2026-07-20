"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("fynaro_token");

    if (!token) {
      router.replace("/auth/login");
      return;
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-[#050506] text-white flex items-center justify-center">
        <div className="text-sm text-white/60">Checking access...</div>
      </main>
    );
  }

  return <>{children}</>;
}