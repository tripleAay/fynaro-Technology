import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing remote image patterns (keep these!)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "restcountries.com",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // TEMPORARY: Ignore ESLint & TypeScript errors during builds
  // This stops Vercel from failing on lint/type issues
  // Remove these two lines once you've fixed all lint/type errors
  eslint: {
    ignoreDuringBuilds: false,        // ← skips ESLint checks on build
  },
  typescript: {
    ignoreBuildErrors: false,         // ← skips TypeScript errors on build
  },
  // ──────────────────────────────────────────────────────────────
};

export default nextConfig;