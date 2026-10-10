import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel Hobby devuelve 402 (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED) en
    // /_next/image, lo que rompia TODAS las imagenes del sitio. Con unoptimized,
    // next/image sirve el archivo original directo (Supabase o /assets).
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
