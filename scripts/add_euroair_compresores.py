FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

def esc(s):
    return s.replace('"', '\\"')

lines = []

def add(ea_id, slug, name, modelo, desc, short, sub):
    lines.append(
        f'  {{ id: "{ea_id}", slug: "{slug}", name: "{esc(name)}", brand: "EUROAIR", model: "{modelo}", '
        f'description: "{esc(desc)}", shortDescription: "{esc(short)}", '
        f'category: "Compresores", subcategory: "{sub}", image: "" }},'
    )

# COMPRESORES COAXIALES
for hp, tanque in [("1HP", "8lts"), ("2HP", "24lts"), ("2.5HP", "40lts"), ("3HP", "50lts")]:
    hp_s = hp.replace(".", "-").lower()
    add(f"ea-coax-{hp_s}", f"euroair-compresor-coaxial-{hp_s}", f"Euroair Compresor Coaxial {hp} {tanque}", "N/A", f"Compresor coaxial Euroair {hp}. Capacidad tanque {tanque}. Monofasico 110V.", f"Compresor coaxial {hp} {tanque}.", "Compresores Coaxiales")

# COMPRESORES DENTALES (SIN ACEITE)
add("ea-den-cabezal", "euroair-compresor-dental-cabezal-solo-1-5hp", "Euroair Compresor Dental Cabezal Solo 1.5HP", "N/A", "Cabezal solo para compresor dental Euroair 1.5HP. Sin aceite. Monofasico 110V.", "Cabezal compresor dental 1.5HP.", "Compresores Dentales")
add("ea-den-sil-15", "euroair-compresor-dental-silente-1-5hp", "Euroair Compresor Dental Silente / Libre de Aceite 1.5HP", "N/A", "Compresor dental Euroair silente y libre de aceite 1.5HP. Capacidad tanque 40LTS. Monofasico 110V.", "Compresor dental silente 1.5HP 40LTS.", "Compresores Dentales")
add("ea-den-sil-3", "euroair-compresor-dental-silente-3hp", "Euroair Compresor Dental Silente / Libre de Aceite 3HP", "N/A", "Compresor dental Euroair silente y libre de aceite 3HP. Capacidad tanque 70LTS. Monofasico 110V.", "Compresor dental silente 3HP 70LTS.", "Compresores Dentales")

# COMPRESORES A CORREA MONOFASICOS
for hp, tanque in [("1HP", "40lts"), ("2HP", "50lts"), ("3HP", "100lts")]:
    hp_s = hp.replace(".", "-").lower()
    add(f"ea-corr-mono-{hp_s}", f"euroair-compresor-correa-monofasico-{hp_s}", f"Euroair Compresor a Correa Monofasico {hp} {tanque}", "N/A", f"Compresor a correa monofasico Euroair {hp}. Capacidad tanque {tanque}. Monofasico 110V.", f"Compresor correa monofasico {hp} {tanque}.", "Compresores Correa Monofasicos")

# COMPRESORES A CORREA TRIFASICOS
for hp, tanque in [("3.5HP", "200lts"), ("4HP", "200lts"), ("5.5HP", "270lts"), ("7.5HP", "300lts"), ("10HP", "500lts"), ("15HP", "500lts")]:
    hp_s = hp.replace(".", "-").lower()
    add(f"ea-corr-tri-{hp_s}", f"euroair-compresor-correa-trifasico-{hp_s}", f"Euroair Compresor a Correa Trifasico {hp} {tanque}", "N/A", f"Compresor a correa trifasico Euroair {hp}. Capacidad tanque {tanque}. Trifasico 220V 60Hz.", f"Compresor correa trifasico {hp} {tanque}.", "Compresores Correa Trifasicos")

# COMPRESORES A CORREA VERTICALES DE 220V
for hp, tanque in [("2HP", "100lts"), ("3HP", "200lts"), ("4HP", "200lts"), ("5.5HP", "300lts")]:
    hp_s = hp.replace(".", "-").lower()
    add(f"ea-corr-vert-{hp_s}", f"euroair-compresor-correa-vertical-{hp_s}", f"Euroair Compresor a Correa Vertical {hp} {tanque}", "N/A", f"Compresor a correa vertical Euroair {hp}. Capacidad tanque {tanque}. 220V 60Hz.", f"Compresor correa vertical {hp} {tanque}.", "Compresores Correa Verticales")

# COMPRESORES A CORREA TRIFASICOS (CABEZAL ITALIANO)
for hp, tanque in [("3HP", "200lts"), ("4HP", "200lts"), ("5.5HP", "300lts"), ("7.5HP", "300lts"), ("10HP", "500lts"), ("15HP", "500lts"), ("20HP", "900lts")]:
    hp_s = hp.replace(".", "-").lower()
    add(f"ea-corr-tri-it-{hp_s}", f"euroair-compresor-correa-trifasico-cabezal-italiano-{hp_s}", f"Euroair Compresor a Correa Trifasico Cabezal Italiano {hp} {tanque}", "N/A", f"Compresor a correa trifasico Euroair con cabezal italiano {hp}. Capacidad tanque {tanque}. Trifasico 220V 60Hz.", f"Compresor correa trifasico cab. italiano {hp} {tanque}.", "Compresores Correa Trifasicos Italiano")

# COMPRESORES LIBRES DE ACEITE PARA TRABAJO
add("ea-lib-cab-21", "euroair-compresor-libre-aceite-cabezal-solo-2-1hp", "Euroair Compresor Libre de Aceite Cabezal Solo 2.1HP", "N/A", "Cabezal solo compresor libre de aceite Euroair 2.1HP. Monofasico 110V.", "Cabezal libre aceite 2.1HP.", "Compresores Libres de Aceite")
add("ea-lib-sil-21", "euroair-compresor-libre-aceite-silente-2-1hp", "Euroair Compresor Libre de Aceite Silente 2.1HP", "N/A", "Compresor libre de aceite silente Euroair 2.1HP. Capacidad tanque 30lts. Monofasico 110V.", "Compresor libre aceite silente 2.1HP 30lts.", "Compresores Libres de Aceite")
add("ea-lib-sil-42", "euroair-compresor-libre-aceite-silente-4-2hp", "Euroair Compresor Libre de Aceite Silente 4.2HP", "N/A", "Compresor libre de aceite silente Euroair 4.2HP. Capacidad tanque 50lts. Monofasico 110V.", "Compresor libre aceite silente 4.2HP 50lts.", "Compresores Libres de Aceite")
add("ea-lib-sil-63", "euroair-compresor-libre-aceite-silente-6-3hp", "Euroair Compresor Libre de Aceite Silente 6.3HP", "N/A", "Compresor libre de aceite silente Euroair 6.3HP. Capacidad tanque 130lts. Trifasico 220V 60Hz.", "Compresor libre aceite silente 6.3HP 130lts.", "Compresores Libres de Aceite")
add("ea-lib-sil-84", "euroair-compresor-libre-aceite-silente-8-4hp", "Euroair Compresor Libre de Aceite Silente 8.4HP", "N/A", "Compresor libre de aceite silente Euroair 8.4HP. Capacidad tanque 170lts. Trifasico 220V 60Hz.", "Compresor libre aceite silente 8.4HP 170lts.", "Compresores Libres de Aceite")

# CABEZALES PARA COMPRESOR A CORREA
for hp, orient, modelo in [
    ("0.75HP", "L", "1051"), ("1HP", "L", "1065"), ("2HP", "L", "2055TA"),
    ("3HP", "L", "2065TA"), ("3HP", "V", "2070"), ("3HP", "L", "2070TA"),
    ("4HP", "V", "2080"), ("5.5HP", "V", "2090"), ("5.5HP", "L", "2090TA"),
    ("7.5HP 12BAR", "L", "10105"), ("7.5HP", "W", "V3095"),
    ("10HP 12BAR", "V", "20105"), ("15HP 12BAR", "W", "30100"),
    ("20HP 8BAR", "W", "30120"), ("25HP 12BAR", "V", "2155T"),
]:
    hp_s = hp.replace(".", "-").replace(" ", "").lower()
    add(f"ea-cab-{modelo.lower()}", f"euroair-cabezal-compresor-{hp_s}-{modelo.lower()}", f"Euroair Cabezal para Compresor {hp} Orientacion {orient} Modelo {modelo}", modelo, f"Cabezal para compresor a correa Euroair {hp}. Orientacion {orient}. Modelo {modelo}.", f"Cabezal compresor {hp} {orient}.", "Cabezales Compresor Correa")

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

marker = "export const productCategories"
cat_idx = content.find(marker)
insert = content.rfind("\n];", 0, cat_idx) + 1

new = "\n  // --- EUROAIR COMPRESORES ---\n" + "\n".join(lines) + "\n"
content = content[:insert] + new + content[insert:]

# Add subcategories
new_subs = ["Compresores Coaxiales", "Compresores Dentales", "Compresores Correa Monofasicos",
            "Compresores Correa Trifasicos", "Compresores Correa Verticales", "Compresores Correa Trifasicos Italiano",
            "Compresores Libres de Aceite", "Cabezales Compresor Correa"]
existing_subs = content.split("export const productSubcategories")[1].split("];")[0]
for sub in new_subs:
    if f'"{sub}"' not in existing_subs:
        content = content.replace('  "Kits PPS",\n];', f'  "Kits PPS",\n  "{sub}",\n];')
        existing_subs += f'"{sub}",'

# Add "Compresores" category
if '"Compresores"' not in content.split("export const productCategories")[1].split("];")[0]:
    content = content.replace('  "Accesorios Compresores",\n', '  "Accesorios Compresores",\n  "Compresores",\n')

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Added {len(lines)} EUROAIR compressor products")
