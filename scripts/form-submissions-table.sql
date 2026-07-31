CREATE TABLE IF NOT EXISTS form_submissions (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL DEFAULT 'contacto',
  name TEXT NOT NULL,
  email TEXT DEFAULT '',
  phone TEXT NOT NULL,
  message TEXT DEFAULT '',
  products JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for all" ON form_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow select for service role" ON form_submissions FOR SELECT USING (true);
