-- vendor_clients table
-- Maps vendors to their client codes for accounts receivable filtering
-- Each vendor only sees clients assigned to them

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
