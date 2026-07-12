import os

PROJECT = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web'
PRODUCTS_FILE = os.path.join(PROJECT, 'src', 'lib', 'data', 'products.ts')
IMAGE_DIR = '/assets/product-images/cmt-orange-tools'

products = [
    ("cmt-ot-disco-multiple-250-20+4-279-020-10M", "cmt-disco-multiple-250mm-z20+4-279-020-10M", "CMT DISCO MULTIPLE 250mm Z20+4 279.020.10M", "279.020.10M", "Disco CMT Orange Tools multiple para sierra circular. Diametro 250mm. Cuerpo 2.2mm. Espesor 3.2mm. Hueco 30mm. Z20+4 dientes. Codigo 279.020.10M.", "Disco multiple 250mm Z20+4 279.020.10M.", f"{IMAGE_DIR}/279-020-10m.jpg"),
    ("cmt-ot-disco-multiple-300-24+4-279-024-12V", "cmt-disco-multiple-300mm-z24+4-279-024-12V", "CMT DISCO MULTIPLE 300mm Z24+4 279.024.12V", "279.024.12V", "Disco CMT Orange Tools multiple para sierra circular. Diametro 300mm. Cuerpo 2.2mm. Espesor 3.2mm. Hueco 70mm. Z24+4 dientes. Codigo 279.024.12V.", "Disco multiple 300mm Z24+4 279.024.12V.", f"{IMAGE_DIR}/279-024-12v.jpg"),
    ("cmt-ot-disco-multiple-400-28+6-279-028-16M", "cmt-disco-multiple-400mm-z28+6-279-028-16M", "CMT DISCO MULTIPLE 400mm Z28+6 279.028.16M", "279.028.16M", "Disco CMT Orange Tools multiple para sierra circular. Diametro 400mm. Cuerpo 2.8mm. Espesor 4mm. Hueco 30mm. Z28+6 dientes. Codigo 279.028.16M.", "Disco multiple 400mm Z28+6 279.028.16M.", f"{IMAGE_DIR}/279-028-16m-multiple.jpg"),
]

lines = []
for pid, slug, name, model, desc, short, img in products:
    lines.append(
        f'  {{ id: "{pid}", slug: "{slug}", name: "{name}", brand: "CMT Orange Tools", model: "{model}", description: "{desc}", shortDescription: "{short}", category: "Discos", subcategory: "Discos Multiple", image: "{img}" }},'
    )

insert_block = "\n".join(lines)

# Add subcategory
subcategory_line = '  { id: "cmt-ot-discos-multiple", name: "Discos Multiple", brand: "CMT Orange Tools", category: "Discos" },'

with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Insert products
marker = "\n];\n\nexport const productSubcategories"
idx = content.find(marker)
if idx == -1:
    print("ERROR: Could not find insertion point")
    exit(1)
new_content = content[:idx] + "\n" + insert_block + "\n" + content[idx:]

# Insert subcategory
sub_marker = "export const productSubcategories = ["
sub_idx = new_content.find(sub_marker)
if sub_idx != -1:
    insert_pos = sub_idx + len(sub_marker)
    new_content = new_content[:insert_pos] + "\n" + subcategory_line + "\n" + new_content[insert_pos:]

with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Added {len(products)} discos multiple + subcategory")
