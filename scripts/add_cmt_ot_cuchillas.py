import os

FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"
IMG_DIR = "/assets/product-images/cmt-orange-tools"

# (largo, ancho, espesor, material, empaque, codigo, img_file_or_None)
products = [
    (82, 5.7, 1.1, "HW", "PAR", "790.821.90", None),
    (82, 30, 3, "HSS", "PAR", "790.821.95", None),
    (82, 30, 3, "HSS", "PAR", "790.821.10", "790.821.10.jpg"),
    (110, 30, 3, "HSS", "PAR", "790.110.50", "790.110.50.jpg"),
]

lines = []
for largo, ancho, espesor, material, empaque, codigo, img in products:
    c = codigo.replace(".", "-")
    prod_id = f"cmt-ot-cuchilla-cepillo-{largo}-{c}"
    slug = f"cmt-cuchilla-cepillo-portatil-{largo}mm-{c}"
    image = f"{IMG_DIR}/{img}" if img else ""
    name = f"CMT CUCHILLA PARA CEPILLO PORTATIL {codigo}"
    short_desc = f"Cuchilla cepillo portatil {largo}x{ancho}x{espesor}mm {material}."
    desc = f"Cuchilla CMT Orange Tools doble filo para cepillos portatiles. Largo {largo}mm. Ancho {ancho}mm. Espesor {espesor}mm. Material {material}. Empaque {empaque}. Codigo {codigo}."
    lines.append(f'  {{ id: "{prod_id}", slug: "{slug}", name: "{name}", brand: "CMT Orange Tools", model: "{codigo}", description: "{desc}", shortDescription: "{short_desc}", category: "Cuchillas", subcategory: "Cuchillas", image: "{image}" }},')

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

marker = '\n\n];\n\nexport const productSubcategories'
pos = content.find(marker)
if pos == -1:
    print("ERROR: marker not found")
    exit()

block = '\n'.join(lines)
new_content = content[:pos] + '\n' + block + '\n' + content[pos:]

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Added {len(lines)} CMT cuchillas cepillo portatil")
