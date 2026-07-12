FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"
with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

cats_pos = content.rfind('export const productCategories')
prod_end = content.rfind('];', 0, cats_pos)

madera_start = content.find('{ id: "cmt-con-disco-madera', prod_end)
if madera_start == -1:
    print('ERROR: madera products not found')
else:
    subcats_end_pos = content.rfind('];')
    madera_block = content[madera_start:subcats_end_pos].rstrip()
    if madera_block.endswith('];'):
        madera_block = madera_block[:-2].rstrip()
    
    content = content[:madera_start] + content[subcats_end_pos:]
    
    cats_pos = content.rfind('export const productCategories')
    prod_end = content.rfind('];', 0, cats_pos)
    
    content = content[:prod_end+2] + '\n' + madera_block + '\n' + content[prod_end+2:]
    
    with open(FILEPATH, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Fixed madera products position')
