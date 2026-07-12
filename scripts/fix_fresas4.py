FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(FILEPATH, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Line 7648 is ]; (index 7647), fresas start at 7649 (index 7648)
# Need to find where fresas end
fresa_start_idx = 7648  # 0-indexed line 7649

# Find where fresas end - look for "export const productSubcategories"
fresa_end_idx = None
for i in range(fresa_start_idx, len(lines)):
    if 'export const productSubcategories' in lines[i]:
        # fresas end one line before this (skip blank lines)
        fresa_end_idx = i - 1
        while fresa_end_idx > fresa_start_idx and lines[fresa_end_idx].strip() == '':
            fresa_end_idx -= 1
        break

print(f"Fresa block: lines {fresa_start_idx+1} to {fresa_end_idx+1}")
print(f"First fresa: {lines[fresa_start_idx][:80]}")
print(f"Last fresa: {lines[fresa_end_idx][:80]}")

# Extract fresa lines and fix indentation
fresa_lines = []
for i in range(fresa_start_idx, fresa_end_idx + 1):
    stripped = lines[i].lstrip()
    if stripped.strip():  # non-empty
        fresa_lines.append('  ' + stripped)
    else:
        fresa_lines.append('\n')

# Build new file:
# 1. Everything before fresas (up to and including line 7647 = last product entry)
before = lines[:fresa_start_idx]

# 2. The ]; closing
closing = ['\n];\n']

# 3. Everything from productSubcategories onwards
after_start = fresa_end_idx + 1
# Skip blank lines
while after_start < len(lines) and lines[after_start].strip() == '':
    after_start += 1
after = lines[after_start:]

# Write: before products + fresas + ]; + subcategories + categories
with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.writelines(before)
    f.write('\n')
    f.writelines(fresa_lines)
    f.writelines(closing)
    f.writelines(after)

print("Done! Fresas moved inside products array before ];")
