FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(FILEPATH, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find key line numbers (0-indexed)
products_close = None
fresa_start = None
fresa_end = None

for i, line in enumerate(lines):
    # Find ]; on its own line before productSubcategories
    if line.strip() == '];' and products_close is None:
        # Check if next line is productSubcategories
        if i + 1 < len(lines) and 'productSubcategories' in lines[i+1]:
            products_close = i
    # Find first fresa line
    if 'cmt-con-fresa-1-8-81103' in line and fresa_start is None:
        fresa_start = i
    # Find last fresa line (84211)
    if 'cmt-con-fresa-1-4-84211' in line:
        fresa_end = i

print(f"products_close (line {products_close+1}): {lines[products_close].strip()}")
print(f"fresa_start (line {fresa_start+1}): {lines[fresa_start][:80]}...")
print(f"fresa_end (line {fresa_end+1}): {lines[fresa_end][:80]}...")

# Extract fresa lines (with proper indentation)
fresa_lines = []
for i in range(fresa_start, fresa_end + 1):
    line = lines[i]
    # Ensure proper indentation (2 spaces)
    stripped = line.lstrip()
    fresa_lines.append('  ' + stripped)

# Remove fresa lines from their current position (after products_close)
new_lines = lines[:fresa_start] + lines[fresa_end + 1:]

# Find products_close again in new_lines
for i, line in enumerate(new_lines):
    if line.strip() == '];' and i + 1 < len(new_lines) and 'productSubcategories' in new_lines[i+1]:
        products_close_new = i
        break

# Insert fresas before products_close
insert_lines = fresa_lines + ['\n']
new_lines = new_lines[:products_close_new + 1] + insert_lines + new_lines[products_close_new + 1:]

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Done! Fresas moved inside products array.")
