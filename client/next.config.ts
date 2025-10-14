import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ["r2imghtlak.mmtcdn.com"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
