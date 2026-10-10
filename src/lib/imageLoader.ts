import type { ImageLoaderProps } from "next/image";

// Loader propio con images.weserv.nl (CDN open-source, gratis, sin cuota):
// redimensiona y convierte a WebP al vuelo. Reemplaza /_next/image de Vercel,
// que en el plan Hobby devuelve 402 (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED).
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  const q = quality ?? 75;
  const origin = src.startsWith("http")
    ? src.replace(/^https?:\/\//, "")
    : `arucamaquinarias.com${src.startsWith("/") ? src : `/${src}`}`;
  const params = new URLSearchParams({
    url: origin,
    w: String(width),
    q: String(q),
    output: "webp",
  });
  return `https://images.weserv.nl/?${params.toString()}`;
}
