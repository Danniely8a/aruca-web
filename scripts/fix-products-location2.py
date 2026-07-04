filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the pattern: ];\n   {    id: "nf-fibrodisco-7-16",
# We need to move everything from "   {" to before "];"
pattern = '];\n   {    id: "nf-fibrodisco-7-16",'
idx = content.find(pattern)

if idx == -1:
    print("Pattern not found, trying another approach")
    exit(1)

# The products array closing is "];" right before the misplaced block
# We need to:
# 1. Remove from "];" through the misplaced products
# 2. Insert the products BEFORE "];"
# 3. Add "];" back after the products

# Find the misplaced block
misplaced_start = idx + len('];\n')  # skip past "];\n"
# Find end of file or next section
misplaced_block = content[misplaced_start:]

# Remove trailing whitespace/newlines and find the last product closing
# The misplaced block ends at EOF
misplaced_products_text = misplaced_block.rstrip()

# Build the correct output
before = content[:idx]  # Everything up to the "];"
after = '];\n\n' + 'export const productCategories' + content[content.find('export const productCategories') + len('export const productCategories'):]

# Extract just the categories part
cat_start = content.find('export const productCategories')
cat_section = content[cat_start:]

# Also find productSubcategories  
subcat_start = content.find('export const productSubcategories')
subcat_section = content[subcat_start:]

# Rebuild: products + ]; + categories + subcategories
products_only = before.rstrip()
new_content = products_only + ',\n' + misplaced_products_text + ',\n];\n\n' + cat_section

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed products placement")
