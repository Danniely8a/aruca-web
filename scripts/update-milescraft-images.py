import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

new_codes = ['4021','5201','5203','5204','5209','5222','5300','5301','5302','5303','5314','5315','5316','5317','5334','5335','5336','5343','5346','5355','5400','5401','5402','5403','6202','8401','8402','8403','8406','8408','8413','8454','8455','8459','8460','8601']

updated = 0
for code in new_codes:
    new_img = f'image: "/assets/product-images/milescraft/{code}.jpg",'
    marker = f'id: "ms-{code}",'
    idx = content.find(marker)
    if idx == -1:
        print(f'Not found: {code}')
        continue
    
    img_start = content.find('image:', idx)
    if img_start == -1:
        print(f'No image line for {code}')
        continue
    
    img_end = content.find('\n', img_start)
    content = content[:img_start] + new_img + content[img_end:]
    updated += 1
    print(f'Updated {code}')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print(f'\nDone! Updated {updated} products')
