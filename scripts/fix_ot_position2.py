FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(FILEPATH, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# The OT products are on lines 1-36 (0-indexed: 0-35)
# Line 0 should be // @ts-nocheck
# Lines 1-35 are OT products that shouldn't be here
# Find the real products array start

ot_end = None
products_array_start = None

for i, line in enumerate(lines):
    if line.strip().startswith('// @ts-nocheck'):
        continue
    if 'cmt-ot-disco-alterno' in line:
        continue
    if 'export const products' in line and '= [' in line:
        products_array_start = i
        break

# Find where OT products end (first line that's not OT and not empty before products array)
ot_lines_end = 0
for i in range(len(lines)):
    if 'cmt-ot-disco-alterno' in lines[i]:
        ot_lines_end = i

print(f"OT products on lines 1-{ot_lines_end+1}")
print(f"Products array starts at line {products_array_start+1}")

# Extract OT block
ot_block = []
for i in range(1, ot_lines_end + 1):
    line = lines[i].strip()
    if line:
        ot_block.append('  ' + line if not line.startswith('  ') else line)

ot_text = '\n'.join(ot_block) + '\n'

# Remove OT lines (keep line 0 which is @ts-nocheck, then skip OT)
new_lines = lines[:1] + lines[ot_lines_end + 1:]

# Find the ]; that closes the products array
# Look for the ]; right before "export const productSubcategories"
subcats_idx = None
for i, line in enumerate(new_lines):
    if 'export const productSubcategories' in line:
        subcats_idx = i
        break

# The ]; should be a few lines before subcats_idx
products_close_idx = None
for i in range(subcats_idx - 1, -1, -1):
    if new_lines[i].strip() == '];':
        products_close_idx = i
        break

if products_close_idx is None:
    print("ERROR: Could not find products ];")
    exit()

print(f"Products ]; at line {products_close_idx+1}")

# Insert OT before ];
new_lines = new_lines[:products_close_idx + 1] + [ot_text] + new_lines[products_close_idx + 1:]

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Fixed! OT products placed inside products array.")
