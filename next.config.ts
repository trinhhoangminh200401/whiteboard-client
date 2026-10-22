import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  experimental: {
    viewTransition: true,
    // cacheComponents: true,
  }
};

export default nextConfig;
