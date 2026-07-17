import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "42mb",
    },
    proxyClientMaxBodySize: "42mb",
  },
};

export default nextConfig;
