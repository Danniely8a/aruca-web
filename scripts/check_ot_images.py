import os, re

FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"
IMGS_DIR = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\public\assets\product-images\cmt-orange-tools"

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

files = os.listdir(IMGS_DIR)

pattern = r'image: "/assets/product-images/cmt-orange-tools/([^"]+)"'
matches = re.findall(pattern, content)

print(f"Productos OT: {len(matches)}")
print(f"Archivos en carpeta: {len(files)}")
print()

for img in matches:
    fname = img.split('/')[-1]
    if fname in files:
        continue
    # Try case-insensitive
    found = False
    for f2 in files:
        if f2.lower() == fname.lower():
            print(f"CASE MISMATCH: {fname} -> existe como {f2}")
            found = True
            break
    if not found:
        print(f"MISSING: {fname}")
