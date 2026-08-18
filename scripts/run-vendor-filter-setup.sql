-- Ejecutar este SQL en Supabase Dashboard > SQL Editor
-- Archivo: scripts/run-vendor-filter-setup.sql

-- 1. Agregar columna vendor_name a accounts_receivable
ALTER TABLE accounts_receivable ADD COLUMN IF NOT EXISTS vendor_name TEXT DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_ar_vendor_name ON accounts_receivable(vendor_name);

-- 2. Crear tabla vendor_clients (mapeo vendedor-cliente)
CREATE TABLE IF NOT EXISTS vendor_clients (
  id BIGSERIAL PRIMARY KEY,
  vendor_name TEXT NOT NULL,
  client_code TEXT NOT NULL,
  client_name TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(vendor_name, client_code)
);

CREATE INDEX IF NOT EXISTS idx_vc_vendor_name ON vendor_clients(vendor_name);
CREATE INDEX IF NOT EXISTS idx_vc_client_code ON vendor_clients(client_code);

ALTER TABLE vendor_clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow service role all" ON vendor_clients FOR ALL USING (true);
