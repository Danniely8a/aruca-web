FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Find fresas block (lines starting with { id: "cmt-con-fresa" or "  { id: "cmt-con-fresa")
import re
# Find the start of fresas block
fresa_match = re.search(r'^\s*\{ id: "cmt-con-fresa-1-8-81103"', content, re.MULTILINE)
if not fresa_match:
    print("Could not find first fresa line")
    exit()

fresa_start = fresa_match.start()

# Find the end of fresas block (last line with cmt-con-fresa before productCategories)
cats_pos = content.rfind('export const productCategories')
# Find last fresa line before productCategories
last_fresa_end = content.rfind('},\n', fresa_start, cats_pos)
if last_fresa_end == -1:
    last_fresa_end = content.rfind('}\n', fresa_start, cats_pos)
fresa_block_end = last_fresa_end + len('},\n')

fresa_block = content[fresa_start:fresa_block_end].strip()

# 2. Remove the fresas block from its current position (after subcategories)
content = content[:fresa_start].rstrip() + '\n\n' + content[fresa_block_end:].lstrip()

# 3. Now find the products array closing ]; 
# The products array ends before "export const productSubcategories"
subcats_pos = content.find('export const productSubcategories')
prod_end = content.rfind('];', 0, subcats_pos)

# 4. Insert fresas before that ];
fresas_lines = fresa_block.split('\n')
fresas_formatted = '\n'.join(line for line in fresas_lines)

content = content[:prod_end + 2] + '\n' + fresas_formatted + '\n' + content[prod_end + 2:]

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed! Fresas moved before products array closing.")
