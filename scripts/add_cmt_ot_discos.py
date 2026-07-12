FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

products = [
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

lines = []
for diametro, cuerpo, espesor, hueco, dientes, codigo in products:
    d = str(diametro)
    c = codigo.replace(".", "-")
    prod_id = f"cmt-ot-disco-alterno-{d}-{dientes}-{c}"
    slug = f"cmt-disco-alterno-{d}mm-{dientes.lower()}-{c}"
    image = f"/assets/product-images/cmt-orange-tools/{codigo}.jpg"
    name = f"CMT DISCO ALTERNO {d}mm {dientes} {codigo}"
    short_desc = f"Disco alterno {d}mm {dientes} {codigo}."
    desc = f"Disco CMT Orange Tools diente alterno para sierra circular. Diametro {d}mm. Cuerpo {cuerpo}mm. Espesor {espesor}mm. Hueco {hueco}mm. {dientes} dientes. Codigo {codigo}."
    lines.append(f'  {{ id: "{prod_id}", slug: "{slug}", name: "{name}", brand: "CMT Orange Tools", model: "{codigo}", description: "{desc}", shortDescription: "{short_desc}", category: "Discos", subcategory: "Discos Diente Alterno", image: "{image}" }},')

ot_block = '\n'.join(lines)

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the ]; that closes the products array
# It's the ]; right before \n\nexport const productSubcategories
marker = '\n\n];\n\nexport const productSubcategories'
pos = content.find(marker)
if pos == -1:
    print("ERROR: Could not find products array closing")
    exit()

# Insert OT block between ]; and the next line
# content[:pos+3] = everything up to and including ];
# content[pos+3:] = everything after ];
# pos is at the start of '];' - insert BEFORE it
new_content = content[:pos] + '\n' + ot_block + '\n' + content[pos:]

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Inserted {len(lines)} products INSIDE the array (before ];)")
