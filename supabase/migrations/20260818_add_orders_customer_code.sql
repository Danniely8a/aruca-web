-- Agregar columna customer_code a la tabla orders
-- Guarda el codigo de cliente de A2 (FC_CODIGO) al crear un pedido desde el portal de vendedores
-- Ejecutar en Supabase SQL Editor

ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_code TEXT DEFAULT '';
