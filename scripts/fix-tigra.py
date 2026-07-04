import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the misplaced TIGRA products (after the ]; closing)
# Pattern: ];\n\n  { id: "tigra-barra...
marker = '];\n\n  { id: "tigra-barra-310x4x2"'
idx_start = content.find(marker)

if idx_start == -1:
    print("Marker not found")
    exit(1)

# Find where the tigra products end (before export const productCategories)
tigra_end_marker = 'export const productCategories'
idx_end = content.find(tigra_end_marker)

# Extract tigra products block
tigra_block_start = idx_start + len('];\n\n')
tigra_block = content[tigra_block_start:idx_end].strip()

# Remove the products from after ];
content_before = content[:idx_start]
content_after = content[idx_end:]

# Now insert before the ];
new_content = content_before + '\n' + tigra_block + '\n];\n\n' + content_after

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed TIGRA products placement")
