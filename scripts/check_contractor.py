import re, os

f = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts'
with open(f, 'r', encoding='utf-8') as fh:
    content = fh.read()

lines = content.split('\n')
contractor = []
for i, l in enumerate(lines):
    if 'CMT Contractor' in l:
        m = re.search(r'model: "([^"]+)"', l)
        img = re.search(r'image: "([^"]*)"', l)
        model = m.group(1) if m else '?'
        image = img.group(1) if img else '?'
        # Check if image file exists
        if image and image.startswith('/'):
            full = os.path.join(r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\public', image.lstrip('/'))
            exists = os.path.exists(full)
        else:
            exists = False
        if not exists:
            contractor.append((i+1, model, image))

print(f'{len(contractor)} CMT Contractor products with missing/empty image:')
for n, model, img in contractor:
    print(f'  Line {n}: model={model} image={img}')
