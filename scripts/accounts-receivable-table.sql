-- accounts_receivable table for vendor portal
-- Stores accounts receivable data imported from A2 CUENTASPORCOBRAR.Xls

CREATE TABLE IF NOT EXISTS accounts_receivable (
  id BIGSERIAL PRIMARY KEY,
  client_code TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_rif TEXT DEFAULT '',
  client_nit TEXT DEFAULT '',
  client_phone TEXT DEFAULT '',
  client_address TEXT DEFAULT '',
  document_type TEXT NOT NULL,
  emission_date DATE,
  due_date DATE,
  days INTEGER DEFAULT 0,
  document_number TEXT NOT NULL,
  description TEXT DEFAULT '',
  amount NUMERIC(12,2) DEFAULT 0,
  total_documents INTEGER DEFAULT 0,
  total_amount NUMERIC(12,2) DEFAULT 0,
  report_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ar_client_code ON accounts_receivable(client_code);
CREATE INDEX IF NOT EXISTS idx_ar_client_name ON accounts_receivable USING gin(to_tsvector('spanish', client_name));
CREATE INDEX IF NOT EXISTS idx_ar_report_date ON accounts_receivable(report_date);

ALTER TABLE accounts_receivable ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON accounts_receivable FOR ALL USING (true);
