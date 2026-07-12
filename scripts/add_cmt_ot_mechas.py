FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"
IMG = "/assets/product-images/cmt-orange-tools/foto-811-812.jpg"

# (diametro_str, cuerpo_mm, l_corte_mm, dientes, eje_str, codigo)
products = [
    ("12mm", "25.4", "63.5", "Z2", "", "811.620.11"),
    ("1/2\"", "25.4", "66.7", "Z2", "1/2\"", "811.627.11"),
    ("1/2\"", "31.7", "82.5", "Z2", "1/2\"", "811.628.11"),
    ("1/4\"", "19", "63.5", "Z2", "1/2\"", "811.564.11"),
    ("5/16\"", "25.4", "70", "Z2", "1/2\"", "811.581.11"),
    ("3/8\"", "31.7", "66.7", "Z2", "1/2\"", "811.595.11"),
    ("5/8\"", "25.4", "63.5", "Z2", "1/2\"", "811.660.11"),
    ("23/32\"", "25.4", "63.5", "Z2", "1/2\"", "811.682.11"),
    ("25/32\"", "25.4", "25.4", "Z2", "1/2\"", "811.700.11"),
    ("1\"", "25.4", "31.7", "Z2", "1/2\"", "811.754.11"),
    ("12mm", "31.7", "60", "Z2", "1/4\"", "812.120.11"),
    ("12mm", "25.4", "31.7", "Z2", "1/2\"", "812.620.11"),
    ("1/2\"", "38.1", "95", "Z2", "1/2\"", "812.627.11"),
    ("1/2\"", "50.8", "108", "Z2", "1/2\"", "812.628.11"),
    ("1/2\"", "63.5", "111", "Z2", "1/2\"", "812.629.11"),
]

lines = []
for diam, cuerpo, l_corte, dientes, eje, codigo in products:
    d_clean = diam.replace('"', '').replace("/", "-").replace(" ", "")
    e_clean = eje.replace('"', '').replace("/", "-") if eje else "sin-eje"
    c_clean = codigo.replace(".", "-")
    prod_id = f"cmt-ot-mecha-ranurar-{d_clean}-{c_clean}"
    slug = f"cmt-mecha-recta-ranurar-{d_clean}-eje-{e_clean}-{c_clean}"
    
    eje_part = f" Eje {eje}" if eje else ""
    name = f"CMT MECHA RECTA PARA RANURAR {diam} {codigo}{eje_part}"
    short_desc = f"Mecha recta ranurar {diam} {codigo}."
    desc = f"Mecha CMT Orange Tools recta para ranurar. Diametro {diam}. Cuerpo {cuerpo}mm. L.corte {l_corte}mm. {dientes} dientes.{eje_part}. Codigo {codigo}."
    
    lines.append(f'  {{ id: "{prod_id}", slug: "{slug}", name: "{name}", brand: "CMT Orange Tools", model: "{codigo}", description: "{desc}", shortDescription: "{short_desc}", category: "Fresas", subcategory: "Mechas", image: "{IMG}" }},')

with open(FILEPATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Find insertion point
marker = '\n\n];\n\nexport const productSubcategories'
pos = content.find(marker)
if pos == -1:
    print("ERROR: marker not found")
    exit()

ot_block = '\n'.join(lines)
new_content = content[:pos] + '\n' + ot_block + '\n' + content[pos:]

with open(FILEPATH, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"Added {len(lines)} CMT Orange Tools mechas para ranurar")
