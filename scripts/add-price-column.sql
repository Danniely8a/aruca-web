-- Add price column to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS price TEXT DEFAULT '';

-- Populate prices for the 4 demo products that have static prices
UPDATE products SET price = '$580.00' WHERE id = '1';
UPDATE products SET price = '$1,250.00' WHERE id = '2';
UPDATE products SET price = '$890.00' WHERE id = '3';
UPDATE products SET price = '$420.00' WHERE id = '4';
