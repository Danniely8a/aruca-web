const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ocuafmydwitrhxhtuole.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const products = require("./products-to-migrate.json");
const brands = require("./brands-to-migrate.json");

async function migrate() {
  console.log(`Migrating ${brands.length} brands...`);

  const brandData = brands.map((b) => ({
    id: b.id,
    name: b.name,
    description: b.description || "",
    category: b.category || "",
    country: b.country || "",
    logo: b.logo || "",
    website: b.website || "",
  }));

  const { error: brandError } = await supabase
    .from("brands")
    .upsert(brandData, { onConflict: "id" });

  if (brandError) console.error("Brand error:", brandError);
  else console.log(`✓ ${brandData.length} brands migrated`);

  console.log(`Migrating ${products.length} products...`);

  const batchSize = 100;
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize).map((p) => ({
      id: String(p.id),
      slug: p.slug,
      name: p.name,
      brand: p.brand || "",
      model: p.model || "",
      description: p.description || "",
      short_description: p.shortDescription || "",
      category: p.category || "",
      subcategory: p.subcategory || "",
      image: p.image || "",
      specs: p.specs || {},
      included: p.included || "",
      featured: p.featured || false,
    }));

    const { error } = await supabase
      .from("products")
      .upsert(batch, { onConflict: "id" });

    if (error) console.error(`Batch ${i}:`, error.message);
    else console.log(`✓ Products ${i + 1}-${Math.min(i + batchSize, products.length)} migrated`);
  }

  console.log("Migration complete!");
}

migrate().catch(console.error);
