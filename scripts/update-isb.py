import re

filepath = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# ZZ rolineras
content = re.sub(
    r'(id: "isb-zz-[^"]+".*?image: ")[^"]+(")',
    r'\1/assets/product-images/isb/ROLINERA ZZ.png\2',
    content, flags=re.DOTALL
)

# RRS rolineras
content = re.sub(
    r'(id: "isb-rrs-[^"]+".*?image: ")[^"]+(")',
    r'\1/assets/product-images/isb/ROLINERA RRS.png\2',
    content, flags=re.DOTALL
)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated ISB images')
