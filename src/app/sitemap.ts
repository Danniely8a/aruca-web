import type { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase/admin";

const BASE_URL = "https://arucamaquinarias.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const supabase = createAdminClient();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/catalogo`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/servicios`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/cotizacion`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const { data: products } = await supabase
    .from("products")
    .select("slug")
    .order("name");

  const productRoutes: MetadataRoute.Sitemap = (products || []).map((product) => ({
    url: `${BASE_URL}/productos/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const { data: brands } = await supabase
    .from("brands")
    .select("name, active")
    .order("name");

  const brandRoutes: MetadataRoute.Sitemap = (brands || [])
    .filter((brand) => brand.active !== false)
    .map((brand) => ({
      url: `${BASE_URL}/catalogo?marca=${encodeURIComponent(brand.name.toLowerCase())}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));

  return [...staticRoutes, ...productRoutes, ...brandRoutes];
}
