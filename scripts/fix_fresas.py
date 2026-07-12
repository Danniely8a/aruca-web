FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Find "export const productCategories" and the ]; before it
cats_pos = content.rfind('export const productCategories')
prod_end = content.rfind('];', 0, cats_pos)

# Find lines with fresas that are AFTER prod_end
fresa_start = content.find('{ id: "cmt-con-fresa', prod_end + 2)
if fresa_start == -1:
    print("No fresas found after array end")
    exit()

# Find end of fresas block (next ]; after fresa_start)
fresa_end = content.find('];', fresa_start)
if fresa_end == -1:
    print("No closing ]; found after fresas")
    exit()

# Extract the fresas block
fresa_block = content[fresa_start:fresa_end]

# Remove old fresas from after ];
content = content[:prod_end + 2] + content[fresa_end + 2:]

# Now re-find productCategories position
cats_pos = content.rfind('export const productCategories')
prod_end = content.rfind('];', 0, cats_pos)

# Insert fresas before ];
content = content[:prod_end + 2] + '\n' + fresa_block + '\n' + content[prod_end + 2:]

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(content)
print("Fixed fresas position")
