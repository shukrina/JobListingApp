const nextConfig = {
  experimental: {
    appDir: false,
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
};

export default nextConfig;