FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Find OT block
ot_start = content.find('{ id: "cmt-ot-disco-alterno')
ot_start = content.rfind('\n', 0, ot_start) + 1

subcats_pos = content.find('\nexport const productSubcategories')
ot_block = content[ot_start:subcats_pos].strip()

# Remove OT from current position
content = content[:ot_start] + content[subcats_pos:]

# Find the ]; that closes the products array (right before subcategories)
new_subcats_pos = content.find('export const productSubcategories')
insert_pos = content.rfind('];', 0, new_subcats_pos)

new_content = content[:insert_pos + 2] + '\n' + ot_block + '\n' + content[insert_pos + 2:]

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Fixed OT position')
