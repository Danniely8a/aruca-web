-- a2_products: productos para el buscador de pedidos del portal de vendedores
-- Ejecutar una sola vez en Supabase Dashboard > SQL Editor

CREATE TABLE IF NOT EXISTS public.a2_products (
  code TEXT PRIMARY KEY,
  description TEXT NOT NULL DEFAULT '',
  stock NUMERIC DEFAULT 0,
  price NUMERIC DEFAULT 0,
  brand TEXT DEFAULT '',
  subcategory TEXT DEFAULT '',
  model TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_a2_products_description ON a2_products(description);
CREATE INDEX IF NOT EXISTS idx_a2_products_brand ON a2_products(brand);

ALTER TABLE a2_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow service role all" ON a2_products FOR ALL USING (true);
