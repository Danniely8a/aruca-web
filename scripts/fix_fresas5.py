FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the fresa block
fresa_marker = '{ id: "cmt-con-fresa-1-8-81103"'
fresa_start = content.find(fresa_marker)
# Go back to start of line (find previous newline)
fresa_start = content.rfind('\n', 0, fresa_start) + 1

# Find end of fresas - look for export const productSubcategories
subcats_marker = '\nexport const productSubcategories'
subcats_pos = content.find(subcats_marker)
# Fresas end just before subcats (skip blank lines)
fresa_end = subcats_pos
while fresa_end > fresa_start and content[fresa_end - 1] in '\n\r ':
    fresa_end -= 1
fresa_end += 1  # include the last newline

fresa_block = content[fresa_start:fresa_end].strip()

# Now find the ]; before fresa_start (products array closing)
# It should be on line 7648 which is just before fresa_start
before_fresa = content[:fresa_start]
# Find the last ]; before fresa_start
last_bracket = before_fresa.rfind('\n];')
if last_bracket == -1:
    last_bracket = before_fresa.rfind('];')
    
bracket_end = last_bracket + len('];')

# Remove the ]; and everything after it up to fresas
# Then rebuild: products without ]; + fresas + ]; + subcategories
products_without_close = content[:last_bracket + 2]  # up to and including ];
after_subcats = content[subcats_pos:]  # from subcategories onward

# Actually, let's just:
# 1. Remove fresa block from between ]; and subcategories
# 2. Insert fresa block before ];
# So: content up to ]; + fresas + ]; + content from subcategories onward

new_content = content[:last_bracket + 2] + '\n' + fresa_block + '\n' + content[subcats_pos:]

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done!")
