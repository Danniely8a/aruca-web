import re

FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

# Map: product ID -> image filename
IMAGE_MAP = {
    "ica-kit-tr-brillante-lp173-05": "/assets/product-images/ica/lp173-05.jpg",
    "ica-kit-blanco-mate-op450g20-05": "/assets/product-images/ica/op450g20-05.jpg",
    "ica-kit-blanco-satinado-op450g80-05": "/assets/product-images/ica/op450g80-05.jpg",
    "ica-kit-blanco-brillante-op450g80-05": "/assets/product-images/ica/kit-blanco-brillante-pu.png",
    "ica-kit-fondo-negro-bp285n-05": "/assets/product-images/ica/kit-fondo-negro-pu-bp285n-05.png",
    "ica-kit-negro-satinado-op550c2dvn-05": "/assets/product-images/ica/kit-negro-satinado-pu-op550c2dvn-05.png",
    "ica-solvente-pu-u1010-05": "/assets/product-images/ica/solvente-pu-u1010-05.png",
    "ica-catalizador-c265-0250": "/assets/product-images/ica/catalizador-c265-0250.png",
    "ica-catalizador-c390-0250": "/assets/product-images/ica/catalizador-c390-0250.png",
    "ica-catalizador-c215-05": "/assets/product-images/ica/catalizador-c215-05.png",
    "ica-sellador-acuoso-fa580-05": "/assets/product-images/ica/sellador-acuoso-fa580-05.png",
    "ica-tr-satinado-acuoso-a01033g30-05": "/assets/product-images/ica/tr-satinado-acuoso-a01033g30-05.jpg",
    "ica-fondo-blanco-acuoso-a08f05-05": "/assets/product-images/ica/fondo-blanco-acuoso-a08f05-05.jpg",
    "ica-blanco-satinado-acuoso-a01032g55-05": "/assets/product-images/ica/blanco-satinado-acuoso-a01032g55-05.jpg",
}

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

lines = content.split("\n")
updated = 0

for i, line in enumerate(lines):
    if 'id: "ica-' not in line:
        continue

    id_match = re.search(r'id: "(ica-[^"]+)"', line)
    if not id_match:
        continue
    pid = id_match.group(1)

    if pid in IMAGE_MAP:
        img = IMAGE_MAP[pid]
        # Replace image: "" with image: "path"
        old = 'image: ""'
        new = f'image: "{img}"'
        if old in line:
            lines[i] = line.replace(old, new, 1)
            updated += 1
            print(f"  {pid} -> {img}")

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))

print(f"\nUpdated {updated} products")
