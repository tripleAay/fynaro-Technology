/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ⚡ Allow production build to succeed even if ESLint errors exist
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Optional: if you are using images from external URLs
  images: {
    domains: ['example.com'], // replace with your image domains
  },

  // Optional: for TypeScript strictness settings
 
};

module.exports = nextConfig;
