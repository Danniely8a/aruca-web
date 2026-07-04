import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Fix drywall product descriptions with " character
# Pattern: "Tornillo Drywall 6 x 5/8"" -> "Tornillo Drywall 6 x 5/8 pulgadas"
content = re.sub(r'(Tornillo Drywall \d+ x [\d\-/]+)"', r'\1 pulgadas', content)
content = re.sub(r'(Tornillo para drywall calibre \d+ x [\d\-/]+)"', r'\1 pulgadas', content)
content = re.sub(r'(Tornillo drywall \d+ x [\d\-/]+)"', r'\1 pulgadas', content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed BlueXpress quote issues')
