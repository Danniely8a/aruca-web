FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

products = []

# COMPRESORES A TORNILLO SIN TANQUE
hp_list_sin = [
    ("5.5HP", "485 Lts/min"),
    ("7.5HP", "650 Lts/min"),
    ("10HP", "1000 Lts/min"),
    ("15HP", "1500 Lts/min"),
    ("20HP", "1850 Lts/min"),
    ("25HP", "2500 Lts/min"),
    ("30HP", "3000 Lts/min"),
]
for hp, cfm in hp_list_sin:
    slug_hp = hp.replace(".", "-")
    products.append({
        "id": f"sham-comp-sin-{slug_hp}",
        "slug": f"shamal-compresor-tornillo-sin-tanque-{slug_hp}",
        "name": f"Shamal Compresor a Tornillo sin Tanque {hp}",
        "model": hp,
        "desc": f"Compresor a tornillo Shamal/Dari sin tanque. Potencia {hp}. CFM: {cfm}. Presion maxima 145 PSI. Trifasico 220V 60Hz.",
        "short": f"Compresor tornillo sin tanque {hp}.",
        "img": "/assets/product-images/shamal/compresor-tornillo-sin-tanque.jpg",
        "cat": "Compresores",
    })

# COMPRESORES A TORNILLO CON TANQUE + SECADOR
hp_list_con = [
    ("5.5HP", "485 Lts/min", "220LTS"),
    ("7.5HP", "650 Lts/min", "300LTS"),
    ("10HP", "1000 Lts/min", "500LTS"),
    ("15HP", "1500 Lts/min", "500LTS"),
]
for hp, cfm, cap in hp_list_con:
    slug_hp = hp.replace(".", "-")
    products.append({
        "id": f"sham-comp-con-{slug_hp}",
        "slug": f"shamal-compresor-tornillo-tanque-secador-{slug_hp}",
        "name": f"Shamal Compresor a Tornillo con Tanque + Secador {hp}",
        "model": hp,
        "desc": f"Compresor a tornillo Shamal/Dari con tanque y secador. Potencia {hp}. CFM: {cfm}. Capacidad tanque: {cap}. Presion maxima 145 PSI. Trifasico 220V 60Hz.",
        "short": f"Compresor tornillo tanque+secador {hp}.",
        "img": "/assets/product-images/shamal/compresor-tornillo-tanque-secador.jpg",
        "cat": "Compresores",
    })

# SECADORES
products.append({
    "id": "sham-secador",
    "slug": "shamal-secador-aire",
    "name": "Shamal Secador de Aire",
    "model": "N/A",
    "desc": "Secador de aire Shamal para compresores industriales.",
    "short": "Secador de aire Shamal.",
    "img": "/assets/product-images/shamal/secadores.jpg",
    "cat": "Secadores",
})

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

# Find end of products array
marker2 = "export const productCategories"
cat_idx = content.find(marker2)
insert = content.rfind("\n];", 0, cat_idx) + 1

lines = []
for p in products:
    lines.append(f'  {{ id: "{p["id"]}", slug: "{p["slug"]}", name: "{p["name"]}", brand: "Shamal", model: "{p["model"]}", description: "{p["desc"]}", shortDescription: "{p["short"]}", category: "{p["cat"]}", subcategory: "{p["cat"]}", image: "{p["img"]}" }},')

new = "\n  // --- SHAMAL COMPRESORES A TORNILLO ---\n" + "\n".join(lines) + "\n"
content = content[:insert] + new + content[insert:]

# Add "Secadores" to productCategories if not present
if '"Secadores"' not in content.split("export const productCategories")[1].split("];")[0]:
    content = content.replace('  "Dientes para Fresa",\n', '  "Dientes para Fresa",\n  "Secadores",\n')

# Add "Secadores" to productSubcategories if not present
if '"Secadores"' not in content.split("export const productSubcategories")[1].split("];")[0]:
    content = content.replace('  "Tintas",\n];', '  "Tintas",\n  "Secadores",\n];')

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Added {len(products)} SHAMAL products")
