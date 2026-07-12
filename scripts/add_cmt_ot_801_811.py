import os

PROJECT = r'C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web'
PRODUCTS_FILE = os.path.join(PROJECT, 'src', 'lib', 'data', 'products.ts')
IMAGE_DIR = '/assets/product-images/cmt-orange-tools'

products = [
    # SERIE 801 - MECHAS RECTAS PARA MORTAJAR
    ("cmt-ot-mecha-mortajar-12-7-801-128-11b", "cmt-mecha-mortajar-12-7mm-801-128-11b", "CMT MECHA RECTA PARA MORTAJAR 12.7mm 801.128.11B", "801.128.11B", "Mecha CMT Orange Tools recta para mortajar. Diametro 12.7mm. L.corte 6.35mm. L.mecha 41mm. 2 dientes. Eje 1/4\\\". Codigo 801.128.11B.", "Mecha mortajar 12.7mm 801.128.11B.", f"{IMAGE_DIR}/801-128-11b.jpg"),
    ("cmt-ot-mecha-mortajar-19-802-001-11b", "cmt-mecha-mortajar-19mm-802-001-11b", "CMT MECHA RECTA PARA MORTAJAR 19mm 802.001.11B", "802.001.11B", "Mecha CMT Orange Tools recta para mortajar. Diametro 19mm. L.corte 9.5mm. L.mecha 57mm. 2 dientes. Eje 1/4\\\". Codigo 802.001.11B.", "Mecha mortajar 19mm 802.001.11B.", f"{IMAGE_DIR}/801-128-11b.jpg"),

    # SERIE 811 - MECHAS RECTAS PARA RANURAR (new set)
    ("cmt-ot-mecha-ranurar-2-811-020-11", "cmt-mecha-ranurar-2mm-811-020-11", "CMT MECHA RECTA PARA RANURAR 2mm 811.020.11", "811.020.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 2mm. L.corte 4mm. L.mecha 38mm. Z2 dientes. Eje 1/4\\\". Codigo 811.020.11.", "Mecha ranurar 2mm 811.020.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-3-811-030-11", "cmt-mecha-ranurar-3mm-811-030-11", "CMT MECHA RECTA PARA RANURAR 3mm 811.030.11", "811.030.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 3mm. L.corte 8mm. L.mecha 45mm. Z2 dientes. Eje 1/4\\\". Codigo 811.030.11.", "Mecha ranurar 3mm 811.030.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-4-811-040-11", "cmt-mecha-ranurar-4mm-811-040-11", "CMT MECHA RECTA PARA RANURAR 4mm 811.040.11", "811.040.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 4mm. L.corte 10mm. L.mecha 45mm. Z2 dientes. Eje 1/4\\\". Codigo 811.040.11.", "Mecha ranurar 4mm 811.040.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-4-75-811-050-11", "cmt-mecha-ranurar-4-75mm-811-050-11", "CMT MECHA RECTA PARA RANURAR 4.75mm 811.050.11", "811.050.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 4.75mm. L.corte 12.7mm. L.mecha 50.8mm. Z2 dientes. Eje 1/4\\\". Codigo 811.050.11.", "Mecha ranurar 4.75mm 811.050.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-5-811-060-11", "cmt-mecha-ranurar-5mm-811-060-11", "CMT MECHA RECTA PARA RANURAR 5mm 811.060.11", "811.060.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 5mm. L.corte 12mm. L.mecha 50.8mm. Z2 dientes. Eje 1/4\\\". Codigo 811.060.11.", "Mecha ranurar 5mm 811.060.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-6-811-064-11", "cmt-mecha-ranurar-6mm-811-064-11", "CMT MECHA RECTA PARA RANURAR 6mm 811.064.11", "811.064.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 6mm. L.corte 16mm. L.mecha 50.8mm. Z2 dientes. Eje 1/4\\\". Codigo 811.064.11.", "Mecha ranurar 6mm 811.064.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-1-4-811-064-11b", "cmt-mecha-ranurar-1-4-811-064-11b", "CMT MECHA RECTA PARA RANURAR 1/4\\\" 811.064.11B", "811.064.11B", "Mecha CMT Orange Tools recta para ranurar. Diametro 1/4\\\". L.corte 19mm. L.mecha 50.8mm. Z2 dientes. Eje 1/4\\\". Codigo 811.064.11B.", "Mecha ranurar 1/4\\\" 811.064.11B.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-7-811-070-11", "cmt-mecha-ranurar-7mm-811-070-11", "CMT MECHA RECTA PARA RANURAR 7mm 811.070.11", "811.070.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 7mm. L.corte 18mm. L.mecha 48mm. Z2 dientes. Eje 1/4\\\". Codigo 811.070.11.", "Mecha ranurar 7mm 811.070.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-8-811-080-11", "cmt-mecha-ranurar-8mm-811-080-11", "CMT MECHA RECTA PARA RANURAR 8mm 811.080.11", "811.080.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 8mm. L.corte 20mm. L.mecha 48mm. Z2 dientes. Eje 1/4\\\". Codigo 811.080.11.", "Mecha ranurar 8mm 811.080.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-1-4-811-081-11", "cmt-mecha-ranurar-1-4-811-081-11", "CMT MECHA RECTA PARA RANURAR 1/4\\\" 811.081.11", "811.081.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 1/4\\\". L.corte 20mm. L.mecha 48mm. Z2 dientes. Eje 1/4\\\". Codigo 811.081.11.", "Mecha ranurar 1/4\\\" 811.081.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-5-16-811-095-11", "cmt-mecha-ranurar-5-16-811-095-11", "CMT MECHA RECTA PARA RANURAR 5/16\\\" 811.095.11", "811.095.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 5/16\\\". L.corte 25.4mm. L.mecha 71.5mm. Z2 dientes. Eje 1/4\\\". Codigo 811.095.11.", "Mecha ranurar 5/16\\\" 811.095.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-10-811-100-11", "cmt-mecha-ranurar-10mm-811-100-11", "CMT MECHA RECTA PARA RANURAR 10mm 811.100.11", "811.100.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 10mm. L.corte 20mm. L.mecha 48mm. Z2 dientes. Eje 1/4\\\". Codigo 811.100.11.", "Mecha ranurar 10mm 811.100.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-3-8-811-095-11b", "cmt-mecha-ranurar-3-8-811-095-11b", "CMT MECHA RECTA PARA RANURAR 3/8\\\" 811.095.11B", "811.095.11B", "Mecha CMT Orange Tools recta para ranurar. Diametro 3/8\\\". L.corte 19mm. L.mecha 50.8mm. Z2 dientes. Eje 1/4\\\". Codigo 811.095.11B.", "Mecha ranurar 3/8\\\" 811.095.11B.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-12-811-120-11", "cmt-mecha-ranurar-12mm-811-120-11", "CMT MECHA RECTA PARA RANURAR 12mm 811.120.11", "811.120.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 12mm. L.corte 20mm. L.mecha 50mm. Z2 dientes. Eje 1/4\\\". Codigo 811.120.11.", "Mecha ranurar 12mm 811.120.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-1-2-811-127-11", "cmt-mecha-ranurar-1-2-811-127-11", "CMT MECHA RECTA PARA RANURAR 1/2\\\" 811.127.11", "811.127.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 1/2\\\". L.corte 19mm. L.mecha 57.2mm. Z2 dientes. Eje 1/4\\\". Codigo 811.127.11.", "Mecha ranurar 1/2\\\" 811.127.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-15-811-150-11", "cmt-mecha-ranurar-15mm-811-150-11", "CMT MECHA RECTA PARA RANURAR 15mm 811.150.11", "811.150.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 15mm. L.corte 20mm. L.mecha 57.2mm. Z2 dientes. Eje 1/4\\\". Codigo 811.150.11.", "Mecha ranurar 15mm 811.150.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-5-8-811-158-11", "cmt-mecha-ranurar-5-8-811-158-11", "CMT MECHA RECTA PARA RANURAR 5/8\\\" 811.158.11", "811.158.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 5/8\\\". L.corte 19mm. L.mecha 66.7mm. Z2 dientes. Eje 1/4\\\". Codigo 811.158.11.", "Mecha ranurar 5/8\\\" 811.158.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-16-811-160-11", "cmt-mecha-ranurar-16mm-811-160-11", "CMT MECHA RECTA PARA RANURAR 16mm 811.160.11", "811.160.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 16mm. L.corte 20mm. L.mecha 57.2mm. Z2 dientes. Eje 1/4\\\". Codigo 811.160.11.", "Mecha ranurar 16mm 811.160.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-18-811-180-11", "cmt-mecha-ranurar-18mm-811-180-11", "CMT MECHA RECTA PARA RANURAR 18mm 811.180.11", "811.180.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 18mm. L.corte 20mm. L.mecha 50mm. Z2 dientes. Eje 1/4\\\". Codigo 811.180.11.", "Mecha ranurar 18mm 811.180.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-3-4-811-191-11", "cmt-mecha-ranurar-3-4-811-191-11", "CMT MECHA RECTA PARA RANURAR 3/4\\\" 811.191.11", "811.191.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 3/4\\\". L.corte 19mm. L.mecha 57.2mm. Z2 dientes. Eje 1/4\\\". Codigo 811.191.11.", "Mecha ranurar 3/4\\\" 811.191.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-20-811-200-11", "cmt-mecha-ranurar-20mm-811-200-11", "CMT MECHA RECTA PARA RANURAR 20mm 811.200.11", "811.200.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 20mm. L.corte 20mm. L.mecha 57.2mm. Z2 dientes. Eje 1/4\\\". Codigo 811.200.11.", "Mecha ranurar 20mm 811.200.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-22-811-220-11", "cmt-mecha-ranurar-22mm-811-220-11", "CMT MECHA RECTA PARA RANURAR 22mm 811.220.11", "811.220.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 22mm. L.corte 20mm. L.mecha 57.2mm. Z2 dientes. Eje 1/4\\\". Codigo 811.220.11.", "Mecha ranurar 22mm 811.220.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
    ("cmt-ot-mecha-ranurar-1-811-254-11", "cmt-mecha-ranurar-1-811-254-11", "CMT MECHA RECTA PARA RANURAR 1\\\" 811.254.11", "811.254.11", "Mecha CMT Orange Tools recta para ranurar. Diametro 1\\\". L.corte 19mm. L.mecha 50.8mm. Z2 dientes. Eje 1/4\\\". Codigo 811.254.11.", "Mecha ranurar 1\\\" 811.254.11.", f"{IMAGE_DIR}/foto-811-812.jpg"),
]

# Build insertion block
lines = []
for pid, slug, name, model, desc, short, img in products:
    lines.append(
        f'  {{ id: "{pid}", slug: "{slug}", name: "{name}", brand: "CMT Orange Tools", model: "{model}", description: "{desc}", shortDescription: "{short}", category: "Fresas", subcategory: "Mechas", image: "{img}" }},'
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

print(f"Added {len(products)} products (2 mortajar + {len(products)-2} ranurar)")
