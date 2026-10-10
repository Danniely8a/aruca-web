import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Vercel Hobby devuelve 402 (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED) en
    // /_next/image, lo que rompia TODAS las imagenes del sitio. Usamos un loader
    // propio (images.weserv.nl) que redimensiona y sirve WebP sin cuota de Vercel.
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ocuafmydwitrhxhtuole.supabase.co",
      },
    ],
  },
};

export default nextConfig;
