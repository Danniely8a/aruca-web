import os, re

FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"
IMG_MECHAS = "/assets/product-images/cmt-orange-tools/foto-811-812.jpg"

# Mechas para ranurar - use raw data, no quotes in strings
# Format: (diameter_display, diameter_clean, body_mm, length_mm, teeth, shank_display, shank_clean, code)
mechas = [
    ("12mm", "12mm", "25.4", "63.5", "Z2", "", "sin-eje", "811.620.11"),
    ('1/2"', "1-2", "25.4", "66.7", "Z2", '1/2"', "1-2", "811.627.11"),
    ('1/2"', "1-2", "31.7", "82.5", "Z2", '1/2"', "1-2", "811.628.11"),
    ('1/4"', "1-4", "19", "63.5", "Z2", '1/2"', "1-2", "811.564.11"),
    ('5/16"', "5-16", "25.4", "70", "Z2", '1/2"', "1-2", "811.581.11"),
    ('3/8"', "3-8", "31.7", "66.7", "Z2", '1/2"', "1-2", "811.595.11"),
    ('5/8"', "5-8", "25.4", "63.5", "Z2", '1/2"', "1-2", "811.660.11"),
    ('23/32"', "23-32", "25.4", "63.5", "Z2", '1/2"', "1-2", "811.682.11"),
    ('25/32"', "25-32", "25.4", "25.4", "Z2", '1/2"', "1-2", "811.700.11"),
    ('1"', "1", "25.4", "31.7", "Z2", '1/2"', "1-2", "811.754.11"),
    ("12mm", "12mm", "31.7", "60", "Z2", '1/4"', "1-4", "812.120.11"),
    ("12mm", "12mm", "25.4", "31.7", "Z2", '1/2"', "1-2", "812.620.11"),
    ('1/2"', "1-2", "38.1", "95", "Z2", '1/2"', "1-2", "812.627.11"),
    ('1/2"', "1-2", "50.8", "108", "Z2", '1/2"', "1-2", "812.628.11"),
    ('1/2"', "1-2", "63.5", "111", "Z2", '1/2"', "1-2", "812.629.11"),
]

def esc(s):
    return s.replace('"', '\\"')

mecha_lines = []
for d_disp, d_clean, body, length, teeth, shank_disp, shank_clean, code in mechas:
    c = code.replace(".", "-")
    prod_id = f"cmt-ot-mecha-ranurar-{d_clean}-{c}"
    slug = f"cmt-mecha-recta-ranurar-{d_clean}-eje-{shank_clean}-{c}"
    shank_part = f' Eje {shank_disp}' if shank_disp else ''
    name = esc(f'CMT MECHA RECTA PARA RANURAR {d_disp} {code}{shank_part}')
    short_desc = esc(f'Mecha recta ranurar {d_disp} {code}.')
    desc = esc(f'Mecha CMT Orange Tools recta para ranurar. Diametro {d_disp}. Cuerpo {body}mm. L.corte {length}mm. {teeth} dientes.{shank_part}. Codigo {code}.')
    mecha_lines.append(f'  {{ id: "{prod_id}", slug: "{slug}", name: "{name}", brand: "CMT Orange Tools", model: "{code}", description: "{desc}", shortDescription: "{short_desc}", category: "Fresas", subcategory: "Mechas", image: "{IMG_MECHAS}" }},')

# Discos alterno
IMG_DISCO = "/assets/product-images/cmt-orange-tools"
discos = [
    (200, 1.8, 2.8, 30, "Z24", "290.200.24M"),
    (250, 1.8, 2.8, 30, "Z24", "290.250.24M"),
    (300, 2.2, 3.2, 30, "Z20", "286.020.12M"),
    (300, 2.2, 3.2, 30, "Z24", "293.024.12M"),
    (300, 2.2, 3.2, 30, "Z28", "278.028.12M"),
    (350, 2.5, 3.5, 30, "Z28", "293.028.14M"),
    (350, 2.5, 3.5, 30, "Z36", "278.036.14M"),
    (400, 3.0, 4.0, 30, "Z28+6", "279.028.16M"),
    (150, 2.2, 3.2, 30, "Z48", "285.048.06M"),
    (180, 2.2, 3.2, 30, "Z56", "285.056.07M"),
    (200, 2.2, 3.2, 30, "Z36", "285.036.08M"),
    (200, 2.2, 3.2, 30, "Z48", "285.048.08"),
    (200, 2.2, 3.2, 30, "Z64", "285.064.08M"),
    (250, 2.2, 3.2, 30, "Z40", "285.040.10M"),
    (250, 2.2, 3.2, 30, "Z48", "285.048.10M"),
    (250, 2.2, 3.2, 30, "Z60", "285.060.10M"),
    (250, 2.2, 3.2, 30, "Z80", "285.080.10M"),
    (300, 2.2, 3.2, 30, "Z36", "285.036.12M"),
    (300, 2.2, 3.2, 30, "Z48", "285.048.12M"),
    (300, 2.2, 3.2, 30, "Z60", "285.060.12M"),
    (300, 2.2, 3.2, 30, "Z72", "285.072.12M"),
    (350, 2.5, 3.5, 30, "Z54", "285.054.14M"),
    (350, 2.5, 3.5, 30, "Z72", "285.072.14M"),
    (350, 2.5, 3.5, 30, "Z84", "285.084.14M"),
    (400, 2.5, 3.5, 30, "Z36", "285.036.16M"),
    (400, 2.5, 3.5, 30, "Z48", "285.048.16M"),
    (400, 2.5, 3.5, 30, "Z60", "285.060.16M"),
    (400, 2.5, 3.5, 30, "Z120", "285.120.16M"),
    (450, 2.8, 3.8, 30, "Z36", "285.036.18M"),
    (450, 2.8, 3.8, 30, "Z54", "285.054.18M"),
    (450, 2.8, 3.8, 30, "Z66", "285.066.18M"),
    (500, 2.8, 3.8, 30, "Z44", "285.044.20M"),
    (500, 2.8, 3.8, 30, "Z60", "285.060.20M"),
    (550, 3.2, 4.2, 30, "Z40", "286.040.22M"),
    (600, 3.2, 4.2, 30, "Z66", "285.066.24M"),
]

case_fixes = {
    "285.036.12M.jpg": "285.036.12m.jpg", "285.048.12M.jpg": "285.048.12m.jpg",
    "285.060.12M.jpg": "285.060.12m.jpg", "285.072.12M.jpg": "285.072.12m.jpg",
    "285.054.14M.jpg": "285.054.14m.jpg", "285.072.14M.jpg": "285.072.14m.jpg",
    "285.084.14M.jpg": "285.084.14m.jpg", "285.036.16M.jpg": "285.036.16m.jpg",
    "285.048.16M.jpg": "285.048.16m.jpg", "285.060.16M.jpg": "285.060.16m.jpg",
    "285.036.18M.jpg": "285.036.18m.jpg", "285.054.18M.jpg": "285.054.18m.jpg",
    "285.066.18M.jpg": "285.066.18m.jpg", "285.044.20M.jpg": "285.044.20m.jpg",
    "285.060.20M.jpg": "285.060.20m.jpg", "285.066.24M.jpg": "285.066.24m.jpg",
}

disco_lines = []
for diam, body, thick, hole, teeth, code in discos:
    d = str(diam)
    c = code.replace(".", "-")
    img_file = f"{code}.jpg"
    if img_file in case_fixes:
        img_file = case_fixes[img_file]
    image = f"{IMG_DISCO}/{img_file}"
    if code in ("278.036.14M", "286.040.22M"):
        image = ""
    prod_id = f"cmt-ot-disco-alterno-{d}-{teeth}-{c}"
    slug = f"cmt-disco-alterno-{d}mm-{teeth.lower()}-{c}"
    name = f"CMT DISCO ALTERNO {d}mm {teeth} {code}"
    short_desc = f"Disco alterno {d}mm {teeth} {code}."
    desc = f"Disco CMT Orange Tools diente alterno para sierra circular. Diametro {d}mm. Cuerpo {body}mm. Espesor {thick}mm. Hueco {hole}mm. {teeth} dientes. Codigo {code}."
    disco_lines.append(f'  {{ id: "{prod_id}", slug: "{slug}", name: "{name}", brand: "CMT Orange Tools", model: "{code}", description: "{desc}", shortDescription: "{short_desc}", category: "Discos", subcategory: "Discos Diente Alterno", image: "{image}" }},')

# Add subcategory
with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

if '"Discos Diente Alterno"' not in content:
    content = content.replace('"Discos para Melamina",', '"Discos para Melamina",\n  "Discos Diente Alterno",')

# Insert products
marker = '\n\n];\n\nexport const productSubcategories'
pos = content.find(marker)
if pos == -1:
    print("ERROR: marker not found")
    exit()

all_products = '\n'.join(disco_lines) + '\n' + '\n'.join(mecha_lines)
new_content = content[:pos] + '\n' + all_products + '\n' + content[pos:]

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Added {len(disco_lines)} discos + {len(mecha_lines)} mechas = {len(disco_lines)+len(mecha_lines)} products")
