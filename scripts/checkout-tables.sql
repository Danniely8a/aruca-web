-- ARUCA Web - Checkout, Orders, Payment & Delivery Tables
-- Run this in Supabase SQL Editor

-- 1. Add price column to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS price TEXT DEFAULT '';

-- 2. Add phone as required in users table (already exists, just ensure it's used)
-- No schema change needed; phone field already exists in public.users

-- 3. Orders table
CREATE TABLE IF NOT EXISTS orders (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending_payment' CHECK (status IN (
    'pending_payment',
    'payment_verification',
    'payment_verified',
    'in_process',
    'shipped',
    'delivered',
    'cancelled'
  )),
  items JSONB NOT NULL DEFAULT '[]',
  total TEXT DEFAULT '',
  payment_method TEXT DEFAULT '',
  payment_reference TEXT DEFAULT '',
  comprobante_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Delivery / Shipping table
CREATE TABLE IF NOT EXISTS deliveries (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  method TEXT NOT NULL CHECK (method IN ('pickup', 'delivery', 'mrw', 'zoom', 'tealca')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending',
    'in_process',
    'shipped',
    'delivered'
  )),
  recipient_name TEXT DEFAULT '',
  recipient_id_number TEXT DEFAULT '',
  address TEXT DEFAULT '',
  office_destiny TEXT DEFAULT '',
  tracking_number TEXT DEFAULT '',
  tracking_url TEXT DEFAULT '',
  courier_company TEXT DEFAULT '',
  estimated_delivery TEXT DEFAULT '',
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliveries ENABLE ROW LEVEL SECURITY;

-- 6. Orders policies
-- Users can read their own orders
CREATE POLICY "Users can read own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own orders
CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own orders
CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

-- Admins can read all orders
CREATE POLICY "Admins can read all orders" ON orders
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
  );

-- Admins can update all orders
CREATE POLICY "Admins can update all orders" ON orders
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
  );

-- 7. Deliveries policies
-- Users can read their own deliveries
CREATE POLICY "Users can read own deliveries" ON deliveries
  FOR SELECT USING (
    order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
  );

-- Users can create deliveries for their own orders
CREATE POLICY "Users can create own deliveries" ON deliveries
  FOR INSERT WITH CHECK (
    order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
  );

-- Admins can read all deliveries
CREATE POLICY "Admins can read all deliveries" ON deliveries
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
  );

-- Admins can update all deliveries
CREATE POLICY "Admins can update all deliveries" ON deliveries
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
  );

-- 8. updated_at trigger for orders
CREATE OR REPLACE FUNCTION update_order_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_order_updated ON orders;
CREATE TRIGGER on_order_updated
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_order_updated_at();

-- 9. updated_at trigger for deliveries
DROP TRIGGER IF EXISTS on_delivery_updated ON deliveries;
CREATE TRIGGER on_delivery_updated
  BEFORE UPDATE ON deliveries
  FOR EACH ROW EXECUTE FUNCTION update_order_updated_at();

-- 10. Storage bucket for comprobantes
INSERT INTO storage.buckets (id, name, public) VALUES ('comprobantes', 'comprobantes', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users can upload own comprobantes" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'comprobantes' AND auth.role() = 'authenticated');

CREATE POLICY "Users can read own comprobantes" ON storage.objects
  FOR SELECT USING (bucket_id = 'comprobantes');

CREATE POLICY "Admins can read all comprobantes" ON storage.objects
  FOR SELECT USING (bucket_id = 'comprobantes');
