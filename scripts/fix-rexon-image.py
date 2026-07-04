import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('/assets/brands/rexon_x2.0.jpeg', '/assets/product-images/rexon/REXON.png')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated all REXON product images to REXON.png')
