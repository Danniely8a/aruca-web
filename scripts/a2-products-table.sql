-- a2_products table for vendor portal product search
-- Stores products (code, description, stock, price) from A2 for the pedidos search

CREATE TABLE IF NOT EXISTS a2_products (
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
