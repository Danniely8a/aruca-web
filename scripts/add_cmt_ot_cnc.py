import os

PROJECT = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web'
PRODUCTS_FILE = os.path.join(PROJECT, 'src', 'lib', 'data', 'products.ts')

# First, remove the broken entries we just added
with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove lines containing "cmt-ot-mecha-cnc-" that were just added
lines = content.split('\n')
cleaned = []
for line in lines:
    if 'cmt-ot-mecha-cnc-' in line and 'CMT Orange Tools' in line and 'MECHA PARA CNC' in line:
        continue
    cleaned.append(line)
content = '\n'.join(cleaned)

with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
    f.write(content)

# Now re-add with escaped quotes
products = [
    # SERIE 190
    ("cmt-ot-mecha-cnc-4mm-190-040-11", "cmt-mecha-cnc-4mm-190-040-11", "CMT MECHA PARA CNC 4mm 190.040.11", "190.040.11", "Mecha CMT Orange Tools para CNC. Diametro 4mm. L.corte 15mm. L.mecha 50mm. 1 diente. Eje 1mm. Codigo 190.040.11.", "Mecha CNC 4mm 190.040.11."),
    ("cmt-ot-mecha-cnc-1-4-190-081-11", "cmt-mecha-cnc-1-4-190-081-11", "CMT MECHA PARA CNC 1/4\\\" 190.081.11", "190.081.11", "Mecha CMT Orange Tools para CNC. Diametro 1/4\\\". L.corte 22.1mm. L.mecha 63.5mm. 2 dientes. Eje 1/4\\\". Codigo 190.081.11.", "Mecha CNC 1/4\\\" 190.081.11."),
    ("cmt-ot-mecha-cnc-6mm-190-094-11", "cmt-mecha-cnc-6mm-190-094-11", "CMT MECHA PARA CNC 6mm 190.094.11", "190.094.11", "Mecha CMT Orange Tools para CNC. Diametro 6mm. L.corte 31.75mm. L.mecha 76.2mm. 2 dientes. Eje 1/4\\\". Codigo 190.094.11.", "Mecha CNC 6mm 190.094.11."),
    ("cmt-ot-mecha-cnc-1-2-190-097-11", "cmt-mecha-cnc-1-2-190-097-11", "CMT MECHA PARA CNC 1/2\\\" 190.097.11", "190.097.11", "Mecha CMT Orange Tools para CNC. Diametro 1/2\\\". L.corte 34.9mm. L.mecha 88.9mm. 2 dientes. Eje 1/2\\\". Codigo 190.097.11.", "Mecha CNC 1/2\\\" 190.097.11."),
    ("cmt-ot-mecha-cnc-1-2-190-098-11", "cmt-mecha-cnc-1-2-190-098-11", "CMT MECHA PARA CNC 1/2\\\" 190.098.11", "190.098.11", "Mecha CMT Orange Tools para CNC. Diametro 1/2\\\". L.corte 41.15mm. L.mecha 101.6mm. 2 dientes. Eje 1/2\\\". Codigo 190.098.11.", "Mecha CNC 1/2\\\" 190.098.11."),
    ("cmt-ot-mecha-cnc-4-76mm-190-080-11", "cmt-mecha-cnc-4-76mm-190-080-11", "CMT MECHA PARA CNC 4.76mm 190.080.11", "190.080.11", "Mecha CMT Orange Tools para CNC. Diametro 4.76mm. L.corte 19.05mm. L.mecha 50.8mm. 2 dientes. Eje 1/4\\\". Codigo 190.080.11.", "Mecha CNC 4.76mm 190.080.11."),
    ("cmt-ot-mecha-cnc-3-16-190-080-51", "cmt-mecha-cnc-3-16-190-080-51", "CMT MECHA PARA CNC 3/16\\\" 190.080.51", "190.080.51", "Mecha CMT Orange Tools para CNC. Diametro 3/16\\\". L.corte 19.05mm. L.mecha 50.8mm. 2 dientes. Eje 1/4\\\". Codigo 190.080.51.", "Mecha CNC 3/16\\\" 190.080.51."),
    ("cmt-ot-mecha-cnc-1-4-190-082-11", "cmt-mecha-cnc-1-4-190-082-11", "CMT MECHA PARA CNC 1/4\\\" 190.082.11", "190.082.11", "Mecha CMT Orange Tools para CNC. Diametro 1/4\\\". L.corte 25.4mm. L.mecha 63.5mm. 2 dientes. Eje 1/4\\\". Codigo 190.082.11.", "Mecha CNC 1/4\\\" 190.082.11."),
    ("cmt-ot-mecha-cnc-7mm-190-100-01", "cmt-mecha-cnc-7mm-190-100-01", "CMT MECHA PARA CNC 7mm 190.100.01", "190.100.01", "Mecha CMT Orange Tools para CNC. Diametro 7mm. L.corte 22.2mm. L.mecha 59.5mm. 2 dientes. Eje 3\\\". Codigo 190.100.01.", "Mecha CNC 7mm 190.100.01."),
    ("cmt-ot-mecha-cnc-5-16-190-081-11b", "cmt-mecha-cnc-5-16-190-081-11b", "CMT MECHA PARA CNC 5/16\\\" 190.081.11B", "190.081.11B", "Mecha CMT Orange Tools para CNC. Diametro 5/16\\\". L.corte 25.4mm. L.mecha 76.2mm. 2 dientes. Eje 1/4\\\". Codigo 190.081.11B.", "Mecha CNC 5/16\\\" 190.081.11B."),
    ("cmt-ot-mecha-cnc-3-8-190-101-11", "cmt-mecha-cnc-3-8-190-101-11", "CMT MECHA PARA CNC 3/8\\\" 190.101.11", "190.101.11", "Mecha CMT Orange Tools para CNC. Diametro 3/8\\\". L.corte 31.75mm. L.mecha 82.5mm. 2 dientes. Eje 1/2\\\". Codigo 190.101.11.", "Mecha CNC 3/8\\\" 190.101.11."),
    ("cmt-ot-mecha-cnc-1-2-190-097-11b", "cmt-mecha-cnc-1-2-190-097-11b", "CMT MECHA PARA CNC 1/2\\\" 190.097.11B", "190.097.11B", "Mecha CMT Orange Tools para CNC. Diametro 1/2\\\". L.corte 31.75mm. L.mecha 76.2mm. 2 dientes. Eje 1/2\\\". Codigo 190.097.11B.", "Mecha CNC 1/2\\\" 190.097.11B."),
    ("cmt-ot-mecha-cnc-1-2-190-098-01", "cmt-mecha-cnc-1-2-190-098-01", "CMT MECHA PARA CNC 1/2\\\" 190.098.01", "190.098.01", "Mecha CMT Orange Tools para CNC. Diametro 1/2\\\". L.corte 38.1mm. L.mecha 88.9mm. 2 dientes. Eje 8\\\". Codigo 190.098.01.", "Mecha CNC 1/2\\\" 190.098.01."),
    ("cmt-ot-mecha-cnc-0-6-190-094-11b", "cmt-mecha-cnc-0-6-190-094-11b", "CMT MECHA PARA CNC 0.6mm 190.094.11B", "190.094.11B", "Mecha CMT Orange Tools para CNC. Diametro 0.6mm. L.corte 25.4mm. L.mecha 76.2mm. 2 dientes. Eje 1/4\\\". Codigo 190.094.11B.", "Mecha CNC 0.6mm 190.094.11B."),
    ("cmt-ot-mecha-cnc-1-6-190-106-11", "cmt-mecha-cnc-1-6-190-106-11", "CMT MECHA PARA CNC 1.6mm 190.106.11", "190.106.11", "Mecha CMT Orange Tools para CNC. Diametro 1.6mm. L.corte 28.6mm. L.mecha 76.2mm. 2 dientes. Eje 1/4\\\". Codigo 190.106.11.", "Mecha CNC 1.6mm 190.106.11."),
    ("cmt-ot-mecha-cnc-3-2-190-106-432", "cmt-mecha-cnc-3-2-190-106-432", "CMT MECHA PARA CNC 3.2mm 190.106.432", "190.106.432", "Mecha CMT Orange Tools para CNC. Diametro 3.2mm. L.corte 25.4mm. L.mecha 76.2mm. 2 dientes. Eje 1/4\\\". Codigo 190.106.432.", "Mecha CNC 3.2mm 190.106.432."),
    ("cmt-ot-mecha-cnc-1-4-190-082-11b", "cmt-mecha-cnc-1-4-190-082-11b", "CMT MECHA PARA CNC 1/4\\\" 190.082.11B", "190.082.11B", "Mecha CMT Orange Tools para CNC. Diametro 1/4\\\". L.corte 22.1mm. L.mecha 63.5mm. 2 dientes. Eje 1/4\\\". Codigo 190.082.11B.", "Mecha CNC 1/4\\\" 190.082.11B."),
    ("cmt-ot-mecha-cnc-6-190-110-11", "cmt-mecha-cnc-6-190-110-11", "CMT MECHA PARA CNC 6mm 190.110.11", "190.110.11", "Mecha CMT Orange Tools para CNC. Diametro 6mm. L.corte 27mm. L.mecha 70mm. 2 dientes. Eje 1/4\\\". Codigo 190.110.11.", "Mecha CNC 6mm 190.110.11."),
    ("cmt-ot-mecha-cnc-1-2-190-098-11b", "cmt-mecha-cnc-1-2-190-098-11b", "CMT MECHA PARA CNC 1/2\\\" 190.098.11B", "190.098.11B", "Mecha CMT Orange Tools para CNC. Diametro 1/2\\\". L.corte 28.57mm. L.mecha 76.2mm. 2 dientes. Eje 1/2\\\". Codigo 190.098.11B.", "Mecha CNC 1/2\\\" 190.098.11B."),

    # SERIE 191
    ("cmt-ot-mecha-cnc-1-4-191-081-11", "cmt-mecha-cnc-1-4-191-081-11", "CMT MECHA PARA CNC 1/4\\\" 191.081.11", "191.081.11", "Mecha CMT Orange Tools para CNC. Diametro 1/4\\\". L.corte 22.1mm. L.mecha 63.5mm. 2 dientes. Eje 1/4\\\". Codigo 191.081.11.", "Mecha CNC 1/4\\\" 191.081.11."),
    ("cmt-ot-mecha-cnc-8mm-191-120-11", "cmt-mecha-cnc-8mm-191-120-11", "CMT MECHA PARA CNC 8mm 191.120.11", "191.120.11", "Mecha CMT Orange Tools para CNC. Diametro 8mm. L.corte 31.75mm. L.mecha 82.5mm. 2 dientes. Eje 1/4\\\". Codigo 191.120.11.", "Mecha CNC 8mm 191.120.11."),
    ("cmt-ot-mecha-cnc-1-2-191-098-01", "cmt-mecha-cnc-1-2-191-098-01", "CMT MECHA PARA CNC 1/2\\\" 191.098.01", "191.098.01", "Mecha CMT Orange Tools para CNC. Diametro 1/2\\\". L.corte 38.1mm. L.mecha 88.9mm. 3 dientes. Eje 1/2\\\". Codigo 191.098.01.", "Mecha CNC 1/2\\\" 191.098.01."),
    ("cmt-ot-mecha-cnc-1-2-191-098-11", "cmt-mecha-cnc-1-2-191-098-11", "CMT MECHA PARA CNC 1/2\\\" 191.098.11", "191.098.11", "Mecha CMT Orange Tools para CNC. Diametro 1/2\\\". L.corte 41.15mm. L.mecha 101.6mm. 2 dientes. Eje 1/2\\\". Codigo 191.098.11.", "Mecha CNC 1/2\\\" 191.098.11."),
    ("cmt-ot-mecha-cnc-3-2-191-106-432", "cmt-mecha-cnc-3-2-191-106-432", "CMT MECHA PARA CNC 3.2mm 191.106.432", "191.106.432", "Mecha CMT Orange Tools para CNC. Diametro 3.2mm. L.corte 25.4mm. L.mecha 76.2mm. 2 dientes. Eje 1/4\\\". Codigo 191.106.432.", "Mecha CNC 3.2mm 191.106.432."),
    ("cmt-ot-mecha-cnc-1-4-191-082-11", "cmt-mecha-cnc-1-4-191-082-11", "CMT MECHA PARA CNC 1/4\\\" 191.082.11", "191.082.11", "Mecha CMT Orange Tools para CNC. Diametro 1/4\\\". L.corte 22.1mm. L.mecha 63.5mm. 2 dientes. Eje 1/4\\\". Codigo 191.082.11.", "Mecha CNC 1/4\\\" 191.082.11."),

    # SERIE 192
    ("cmt-ot-mecha-cnc-8mm-192-120-11", "cmt-mecha-cnc-8mm-192-120-11", "CMT MECHA PARA CNC 8mm 192.120.11", "192.120.11", "Mecha CMT Orange Tools para CNC. Diametro 8mm. L.corte 31.75mm. L.mecha 82.5mm. 2 dientes. Eje 1/4\\\". Codigo 192.120.11.", "Mecha CNC 8mm 192.120.11."),
]

# Build insertion block
lines = []
for pid, slug, name, model, desc, short in products:
    img_path = "/assets/product-images/cmt-orange-tools/mechas-para-cnc.webp"
    lines.append(
        f'  {{ id: "{pid}", slug: "{slug}", name: "{name}", brand: "CMT Orange Tools", model: "{model}", description: "{desc}", shortDescription: "{short}", category: "Fresas", subcategory: "Mechas", image: "{img_path}" }},'
    )

insert_block = "\n".join(lines)

with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
    content = f.read()

marker = "\n];\n\nexport const productSubcategories"
idx = content.find(marker)
if idx == -1:
    print("ERROR: Could not find insertion point")
    exit(1)

new_content = content[:idx] + "\n" + insert_block + "\n" + content[idx:]

with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Added {len(products)} CMT mechas para CNC")
