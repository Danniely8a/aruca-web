import re, json, hashlib, math, os, sys

sys.stdout.reconfigure(encoding='utf-8')

# Read products from products.ts
path = os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'data', 'products.ts')
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

products = []
idx = 0
while True:
    m = re.search(r'\{', content[idx:])
    if not m:
        break
    s = idx + m.start()
    depth = 0
    for i in range(s, len(content)):
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
            if depth == 0:
                block = content[s:i+1]
                id_m = re.search(r"id:\s*['\"](.+?)['\"]", block)
                name_m = re.search(r"name:\s*['\"](.+?)['\"]", block)
                brand_m = re.search(r"brand:\s*['\"](.+?)['\"]", block)
                model_m = re.search(r"model:\s*['\"](.+?)['\"]", block)
                desc_m = re.search(r"description:\s*['\"](.+?)['\"]", block)
                cat_m = re.search(r"category:\s*['\"](.+?)['\"]", block)
                subcat_m = re.search(r"subcategory:\s*['\"](.+?)['\"]", block)
                short_m = re.search(r"shortDescription:\s*['\"](.+?)['\"]", block)
                
                if id_m:
                    products.append({
                        'id': id_m.group(1),
                        'name': name_m.group(1) if name_m else '',
                        'brand': brand_m.group(1) if brand_m else '',
                        'model': model_m.group(1) if model_m else '',
                        'description': desc_m.group(1) if desc_m else '',
                        'shortDescription': short_m.group(1) if short_m else '',
                        'category': cat_m.group(1) if cat_m else '',
                        'subcategory': subcat_m.group(1) if subcat_m else '',
                    })
                idx = i + 1
                break
    else:
        break

print(f"Found {len(products)} products")

# Create text representation for each product
def product_to_text(p):
    return f"{p['brand']} {p['name']} {p['model']} {p['description']} {p['shortDescription']} {p['category']} {p['subcategory']}".lower().strip()

# Simple bag-of-words embedding using hash-based features
# This creates a 384-dim sparse vector from text
def text_to_embedding(text):
    words = re.findall(r'\w+', text.lower())
    embedding = [0.0] * 384
    
    for word in words:
        h = int(hashlib.md5(word.encode()).hexdigest(), 16)
        idx = h % 384
        embedding[idx] += 1.0
        # Also add nearby dimensions for better distribution
        embedding[(idx + 1) % 384] += 0.5
        embedding[(idx - 1) % 384] += 0.5
        embedding[(idx + 7) % 384] += 0.3
    
    # Normalize
    norm = math.sqrt(sum(x*x for x in embedding))
    if norm > 0:
        embedding = [x/norm for x in embedding]
    
    return embedding

# Generate embeddings
embeddings_data = []
for i, p in enumerate(products):
    text = product_to_text(p)
    embedding = text_to_embedding(text)
    embeddings_data.append({
        'product_id': p['id'],
        'product_text': text[:500],  # Truncate for storage
        'embedding': embedding
    })
    if (i+1) % 200 == 0:
        print(f"  Processed {i+1}/{len(products)}")

print(f"Generated {len(embeddings_data)} embeddings")

# Save to JSON for later upload to Supabase
output_path = os.path.join(os.path.dirname(__file__), 'embeddings_data.json')
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(embeddings_data, f)

print(f"Saved to {output_path}")
