FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Find CMT Contractor products with empty image
pattern = r'\{ id: "cmt-con[^"]*"[^}]*image: ""[^}]*\}'
matches = re.findall(pattern, content)

print(f"Productos CMT Contractor SIN imagen: {len(matches)}")
for m in matches:
    name_match = re.search(r'name: "([^"]+)"', m)
    if name_match:
        print(f"  - {name_match.group(1)}")

# Also check which ones HAVE images
pattern2 = r'\{ id: "cmt-con[^"]*"[^}]*image: "/assets[^"]*"[^}]*\}'
matches2 = re.findall(pattern2, content)
print(f"\nProductos CMT Contractor CON imagen: {len(matches2)}")
