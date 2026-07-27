-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Product embeddings table
CREATE TABLE IF NOT EXISTS product_embeddings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id TEXT NOT NULL UNIQUE,
  embedding vector(384) NOT NULL,
  product_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast vector search
CREATE INDEX IF NOT EXISTS idx_product_embeddings_vector 
  ON product_embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Index for product_id lookup
CREATE INDEX IF NOT EXISTS idx_product_embeddings_product_id 
  ON product_embeddings(product_id);

-- RLS policies
ALTER TABLE product_embeddings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anon read product_embeddings" ON product_embeddings FOR SELECT USING (true);
CREATE POLICY "Service role full access product_embeddings" ON product_embeddings FOR ALL USING (true);

-- Function to search similar products
CREATE OR REPLACE FUNCTION search_products(query_embedding vector(384), match_count int DEFAULT 5)
RETURNS TABLE (
  product_id text,
  product_text text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    product_embeddings.product_id,
    product_embeddings.product_text,
    1 - (product_embeddings.embedding <=> query_embedding) as similarity
  FROM product_embeddings
  ORDER BY product_embeddings.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
