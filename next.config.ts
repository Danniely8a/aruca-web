import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ocuafmydwitrhxhtuole.supabase.co",
      },
    ],
  },
};

export default nextConfig;
