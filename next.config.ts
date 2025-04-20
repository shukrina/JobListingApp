import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Core Next.js configurations
  reactStrictMode: true,
  swcMinify: true,
  
  // Environment variables
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },

  // ES Modules support
  experimental: {
    //appDir: false, // Set to true if using App Router
    esmExternals: true,
  },

  // Webpack configurations (optional)
  webpack: (config) => {
    return config;
  },
  
  // TypeScript support
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;