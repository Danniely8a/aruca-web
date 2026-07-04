import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

codes_to_remove = ['1320', '1366', '5342']

for code in codes_to_remove:
    marker = f'id: "ms-{code}",'
    idx = content.find(marker)
    if idx == -1:
        print(f'Not found: {code}')
        continue
    
    # Find the start of this product block (the opening { before the id)
    block_start = content.rfind('{', 0, idx)
    if block_start == -1:
        print(f'No opening brace for {code}')
        continue
    
    # Find the end of this product block (the closing },)
    block_end = content.find('},', idx)
    if block_end == -1:
        print(f'No closing brace for {code}')
        continue
    
    block_end += 2  # Include the comma
    
    # Remove the entire block
    content = content[:block_start] + content[block_end:]
    print(f'Removed ms-{code}')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('\nDone!')
