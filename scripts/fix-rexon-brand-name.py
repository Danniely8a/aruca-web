import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('brand: "REXON"', 'brand: "Rexon"')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed REXON brand name to Rexon')
