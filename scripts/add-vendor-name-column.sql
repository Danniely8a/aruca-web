-- Add vendor_name column to accounts_receivable for per-vendor filtering
-- Run this once to update the existing table

ALTER TABLE accounts_receivable ADD COLUMN IF NOT EXISTS vendor_name TEXT DEFAULT '';
CREATE INDEX IF NOT EXISTS idx_ar_vendor_name ON accounts_receivable(vendor_name);
