/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ⚡ Allow production build to succeed even if ESLint errors exist
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Allow images from external URLs
  images: {
    domains: ['flagcdn.com'], // add any other external hosts you use
  },
};

module.exports = nextConfig;
