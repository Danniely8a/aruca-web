-- Run this in Supabase SQL Editor to add A2 client columns
-- Go to: https://supabase.com/dashboard/project/ocuafmydwitrhxhtuole/sql

-- Add A2-specific columns to clients table
ALTER TABLE clients ADD COLUMN IF NOT EXISTS a2_code text UNIQUE;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS nit text DEFAULT '';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS fax text DEFAULT '';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS contact text DEFAULT '';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS vendor_code text DEFAULT '';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS classification text DEFAULT '';
ALTER TABLE clients ADD COLUMN IF NOT EXISTS balance numeric DEFAULT 0;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS credit_limit numeric DEFAULT 0;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS credit_days integer DEFAULT 0;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS currency text DEFAULT '';

-- Create index for fast searching
CREATE INDEX IF NOT EXISTS idx_clients_a2_code ON clients(a2_code);
CREATE INDEX IF NOT EXISTS idx_clients_name ON clients USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_clients_rif ON clients(rif);

-- Enable pg_trgm for fuzzy search (may already be enabled)
CREATE EXTENSION IF NOT EXISTS pg_trgm;
