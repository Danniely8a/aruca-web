FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(FILEPATH, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find where productSubcategories starts and where products array ends
prod_sub_start = None
prod_end = None
cmt_start = None
cmt_end = None

for i, line in enumerate(lines):
    if 'export const productSubcategories' in line:
        prod_sub_start = i
    if 'export const productCategories' in line:
        prod_end_line = i

# The products array ends with '];' just before productCategories
# Find that line
for i in range(prod_end_line - 1, 0, -1):
    if lines[i].strip() == '];':
        prod_end = i
        break

# Find where CMT products start inside productSubcategories
# They start with '  { id: "cmt-'
for i in range(prod_sub_start, len(lines)):
    if '{ id: "cmt-' in lines[i]:
        cmt_start = i
        break

# Find where CMT products end
if cmt_start:
    for i in range(cmt_start, len(lines)):
        if lines[i].strip() == '];' and i > cmt_start:
            cmt_end = i
            break

print(f"productSubcategories starts at line {prod_sub_start + 1}")
print(f"products array ends at line {prod_end + 1}")
print(f"CMT products start at line {cmt_start + 1}")
print(f"CMT products end at line {cmt_end + 1}")

if cmt_start and cmt_end and prod_end:
    # Extract CMT product lines
    cmt_lines = lines[cmt_start:cmt_end]
    print(f"Found {len(cmt_lines)} CMT product lines")
    
    # Remove CMT lines from productSubcategories (keep the array structure)
    fixed_lines = lines[:cmt_start] + lines[cmt_end:]
    
    # Re-find the products array end in the fixed content
    for i, line in enumerate(fixed_lines):
        if 'export const productCategories' in line:
            new_prod_end_line = i
            break
    
    for i in range(new_prod_end_line - 1, 0, -1):
        if fixed_lines[i].strip() == '];':
            new_prod_end = i
            break
    
    # Insert CMT products before the closing ];
    insert_lines = [l + '\n' if not l.endswith('\n') else l for l in cmt_lines]
    final_lines = fixed_lines[:new_prod_end] + insert_lines + fixed_lines[new_prod_end:]
    
    with open(FILEPATH, 'w', encoding='utf-8') as f:
        f.writelines(final_lines)
    
    print(f"Successfully moved {len(cmt_lines)} CMT products to correct location")
else:
    print("ERROR: Could not find all required locations")
