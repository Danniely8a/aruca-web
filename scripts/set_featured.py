import re

FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

# The 7 products to feature
FEATURED_IDS = [
    "ms-1324",              # Milescraft 1324 Plantilla PocketJig
    "ica-fondo-blanco-fp1031b",  # ICA Kit Fondo Blanco P.U
    "tb-instant-2oz",       # Titebond Instant Bond 2oz
    "ea-pres-nema-4v",      # Euroair Presostato Nema 4V
    "brm-025-0-1",          # Bremas Switch 0-1 25amp
    "9",                    # Makita Sierra Circular SP6000
    "forza-9k-cunete",      # Forza Cemento 9K Cuñete
]

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

# Step 1: Remove all existing featured: true lines
lines = content.split("\n")
new_lines = []
for line in lines:
    if "featured: true" in line:
        continue  # skip this line entirely
    new_lines.append(line)

content = "\n".join(new_lines)

# Step 2: Add featured: true to each target product
for pid in FEATURED_IDS:
    # Find the product by id and add featured: true before the closing }
    # Pattern: { id: "xxx", ... },  or  { id: "xxx", ... }
    # We need to find the closing "}" of the product object and insert featured: true before it
    
    # Find the id line
    id_pattern = f'id: "{pid}"'
    idx = content.find(id_pattern)
    if idx == -1:
        print(f"  NOT FOUND: {pid}")
        continue
    
    # Find the closing "}" of this product object (the last }, before the next product)
    # Search forward from idx for "}," or " }," which ends the product
    end_idx = content.find("},", idx)
    if end_idx == -1:
        print(f"  NO END FOUND: {pid}")
        continue
    
    # Insert featured: true before the },
    insert_text = ", featured: true"
    content = content[:end_idx] + insert_text + content[end_idx:]
    print(f"  Featured: {pid}")

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\nDone. Featured {len(FEATURED_IDS)} products.")
