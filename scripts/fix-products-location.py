filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Extract the misplaced block (lines 6267-6465, 0-indexed: 6266 to end)
# The block starts with "];  {" on line 6267 and goes to end
misplaced_start = None
misplaced_products = []
for i, line in enumerate(lines):
    if i >= 6266 and line.strip().startswith('];  {'):
        misplaced_start = i
        # Fix: line starts with "];  {" - we need to extract everything from the { onwards
        # Also add "  {" prefix
        fixed_line = '  ' + line.strip()[3:]  # Remove "];" prefix
        misplaced_products.append(fixed_line)
        for j in range(i + 1, len(lines)):
            misplaced_products.append(lines[j])
        break

if misplaced_start is None:
    print("Could not find misplaced products block")
    exit(1)

# Remove misplaced block
clean_lines = lines[:misplaced_start]

# Fix line 6216 area - need to insert before the products array closing ];
# Find the products array closing ];
products_end = None
for i, line in enumerate(clean_lines):
    if line.strip() == '];' and i > 100:
        # This is likely the products array end (first ]; after many products)
        # But we need to be more precise - find the one right before export const productCategories
        for j in range(i + 1, min(i + 5, len(clean_lines))):
            if 'productCategories' in clean_lines[j]:
                products_end = i
                break
        if products_end:
            break

if products_end is None:
    # Fallback: look for "export const productCategories"
    for i, line in enumerate(clean_lines):
        if 'export const productCategories' in line:
            # The ]; should be a few lines before
            for j in range(i - 1, max(0, i - 5), -1):
                if clean_lines[j].strip() == '];':
                    products_end = j
                    break
            break

if products_end is None:
    print("Could not find products array end")
    exit(1)

print(f"Products array ends at line {products_end + 1}")
print(f"Misplaced products start at line {misplaced_start + 1}")
print(f"Number of misplaced product lines: {len(misplaced_products)}")

# Insert misplaced products before the products array closing ];
new_lines = clean_lines[:products_end + 1] + misplaced_products + ['\n'] + clean_lines[products_end + 1:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Fixed! Products moved to correct location.")
