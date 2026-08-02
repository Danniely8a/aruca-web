-- ARUCA Web - Mejoras Corto y Mediano Plazo
-- Ejecutar en Supabase SQL Editor

-- 1. Agregar avatar_url a users
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS avatar_url TEXT DEFAULT '';

-- 2. Agregar stock y price a products  
ALTER TABLE products ADD COLUMN IF NOT EXISTS stock INTEGER DEFAULT 0;
-- price ya existe (se agregó en checkout-tables.sql)

-- 3. Agregar campo images (multiple) a products
ALTER TABLE products ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]';
ALTER TABLE products ADD COLUMN IF NOT EXISTS video_id TEXT DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]';

-- 4. Tabla de facturas
CREATE TABLE IF NOT EXISTS invoices (
  id BIGSERIAL PRIMARY KEY,
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  invoice_number TEXT NOT NULL,
  invoice_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Tabla de conversaciones WhatsApp (chat en vivo)
CREATE TABLE IF NOT EXISTS whatsapp_conversations (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  phone TEXT NOT NULL,
  name TEXT DEFAULT '',
  last_message TEXT DEFAULT '',
  unread INTEGER DEFAULT 0,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS whatsapp_messages (
  id BIGSERIAL PRIMARY KEY,
  conversation_id BIGINT NOT NULL REFERENCES whatsapp_conversations(id) ON DELETE CASCADE,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  message TEXT NOT NULL,
  media_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. RLS para facturas, whatsapp
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;

-- 7. Políticas facturas
CREATE POLICY "Users can read own invoices" ON invoices
  FOR SELECT USING (
    order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can read all invoices" ON invoices
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
  );

CREATE POLICY "Admins can insert invoices" ON invoices
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
  );

-- 8. Políticas whatsapp
CREATE POLICY "Admins can read conversations" ON whatsapp_conversations
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
  );

CREATE POLICY "Admins can update conversations" ON whatsapp_conversations
  FOR UPDATE USING (
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
  );

CREATE POLICY "Admins can read messages" ON whatsapp_messages
  FOR SELECT USING (
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
  );

CREATE POLICY "Admins can insert messages" ON whatsapp_messages
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT id FROM public.users WHERE role = 'admin')
  );

-- 9. Trigger updated_at para conversations
DROP TRIGGER IF EXISTS on_whatsapp_conversation_updated ON whatsapp_conversations;
CREATE TRIGGER on_whatsapp_conversation_updated
  BEFORE UPDATE ON whatsapp_conversations
  FOR EACH ROW EXECUTE FUNCTION update_order_updated_at();

-- 10. actualizar el trigger de handle_new_user para incluir avatar_url
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, phone, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    'customer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 13. Stock decrement function
CREATE OR REPLACE FUNCTION decrement_stock(product_id TEXT, decrement_by INT DEFAULT 1)
RETURNS VOID AS $$
BEGIN
  UPDATE products
  SET stock = GREATEST(stock - decrement_by, 0)
  WHERE id = product_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 14. Bucket para avatares
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read avatars" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Auth upload avatars" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');

-- 12. Bucket para facturas
INSERT INTO storage.buckets (id, name, public) VALUES ('invoices', 'invoices', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users can read own invoices bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'invoices');

CREATE POLICY "Admins can upload invoices" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'invoices' AND auth.role() = 'authenticated');
