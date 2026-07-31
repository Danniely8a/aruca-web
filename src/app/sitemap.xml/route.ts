import { Metadata } from "next";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const baseUrl = "https://arucamaquinarias.com";

  const staticPages = ["", "/nosotros", "/servicios", "/catalogo", "/cotizacion", "/contacto"];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (path) => `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === "" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
