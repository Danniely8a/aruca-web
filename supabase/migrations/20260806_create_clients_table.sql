-- Step 1: Create the clients table
CREATE TABLE IF NOT EXISTS clients (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  a2_code text UNIQUE,
  name text NOT NULL DEFAULT '',
  rif text DEFAULT '',
  nit text DEFAULT '',
  phone text DEFAULT '',
  fax text DEFAULT '',
  email text DEFAULT '',
  address text DEFAULT '',
  contact text DEFAULT '',
  vendor_code text DEFAULT '',
  classification text DEFAULT '',
  balance numeric DEFAULT 0,
  credit_limit numeric DEFAULT 0,
  credit_days integer DEFAULT 0,
  currency text DEFAULT '',
  price_list text DEFAULT '',
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Step 2: Indexes for fast search
CREATE INDEX IF NOT EXISTS idx_clients_a2_code ON clients(a2_code);
CREATE INDEX IF NOT EXISTS idx_clients_rif ON clients(rif);
CREATE INDEX IF NOT EXISTS idx_clients_name ON clients(name);
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX IF NOT EXISTS idx_clients_name_trgm ON clients USING gin(name gin_trgm_ops);

-- Step 3: Enable RLS and allow service role full access
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access" ON clients FOR ALL USING (true);
