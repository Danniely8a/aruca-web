-- ARUCA Web - Supabase Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

-- Brands table
CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  category TEXT DEFAULT '',
  country TEXT DEFAULT '',
  logo TEXT DEFAULT '',
  website TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  brand TEXT NOT NULL DEFAULT '',
  model TEXT DEFAULT '',
  description TEXT DEFAULT '',
  short_description TEXT DEFAULT '',
  category TEXT DEFAULT '',
  subcategory TEXT DEFAULT '',
  image TEXT DEFAULT '',
  specs JSONB DEFAULT '{}',
  included TEXT DEFAULT '',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('product', 'subcategory')),
  parent_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site content table
CREATE TABLE IF NOT EXISTS site_content (
  id SERIAL PRIMARY KEY,
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT DEFAULT '',
  UNIQUE(section, key),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security but allow all for now
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Policies: allow all (since we use service_role for admin, anon for public)
CREATE POLICY "Allow all read" ON products FOR SELECT USING (true);
CREATE POLICY "Allow all insert" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON products FOR DELETE USING (true);

CREATE POLICY "Allow all read" ON brands FOR SELECT USING (true);
CREATE POLICY "Allow all insert" ON brands FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON brands FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON brands FOR DELETE USING (true);

CREATE POLICY "Allow all read" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow all insert" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON categories FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON categories FOR DELETE USING (true);

CREATE POLICY "Allow all read" ON site_content FOR SELECT USING (true);
CREATE POLICY "Allow all insert" ON site_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update" ON site_content FOR UPDATE USING (true);
CREATE POLICY "Allow all delete" ON site_content FOR DELETE USING (true);

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) VALUES ('brand-logos', 'brand-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id IN ('product-images', 'brand-logos'));
CREATE POLICY "Authenticated insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('product-images', 'brand-logos'));
CREATE POLICY "Authenticated update" ON storage.objects FOR UPDATE USING (bucket_id IN ('product-images', 'brand-logos'));
CREATE POLICY "Authenticated delete" ON storage.objects FOR DELETE USING (bucket_id IN ('product-images', 'brand-logos'));
