FILEPATH = r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\src\lib\data\products.ts"

products = []

# MULTIPLE GRUESO (HM)
for d, esp, hueco, dien in [
    ("250", "3.0/4.0", "30", "Z12+2"),
    ("300", "3.0/4.0", "30", "Z16+2"),
    ("300", "3.0/4.4", "30", "Z20+4"),
    ("350", "3.0/4.4", "30", "Z20+4"),
    ("350", "3.5/4.4", "30", "Z24+4"),
    ("400", "4.0/5.2", "30", "Z20+4"),
    ("450", "4.0/5.2", "30", "Z28+6"),
    ("500", "4.0/5.2", "30", "Z28+6"),
]:
    esp_s = esp.replace(".", "-").replace("/", "-")
    dien_s = dien.replace("+", "-")
    products.append({
        "id": f"first-mg-{d}mm-{esp_s}-{dien_s}",
        "slug": f"first-multiple-grueso-{d}mm-{esp_s}-{dien_s}",
        "name": f"Discos FIRST Multiple Grueso {d}mm {esp} {dien}",
        "model": f"{d}mm {esp} {dien}",
        "desc": f"Disco FIRST Multiple Grueso HM de {d}mm, espesor {esp}, hueco {hueco}mm, {dien} dientes.",
        "short": f"Disco FIRST Multiple Grueso {d}mm {dien}.",
        "img": "",
        "cat": "Discos",
        "sub": "Discos Múltiple Grueso",
    })

# MULTIPLE FINO (HM)
for d, esp, hueco, dien in [
    ("200", "2.2/3.2", "30", "Z16+2"),
    ("250", "2.2/3.2", "30", "Z18+2"),
    ("300", "2.2/3.2", "30", "Z20+4"),
    ("350", "2.5/3.5", "30", "Z20+4"),
    ("400", "3.0/4.0", "30", "Z20+4"),
]:
    esp_s = esp.replace(".", "-").replace("/", "-")
    dien_s = dien.replace("+", "-")
    products.append({
        "id": f"first-mf-{d}mm-{esp_s}-{dien_s}",
        "slug": f"first-multiple-fino-{d}mm-{esp_s}-{dien_s}",
        "name": f"Discos FIRST Multiple Fino {d}mm {esp} {dien}",
        "model": f"{d}mm {esp} {dien}",
        "desc": f"Disco FIRST Multiple Fino HM de {d}mm, espesor {esp}, hueco {hueco}mm, {dien} dientes.",
        "short": f"Disco FIRST Multiple Fino {d}mm {dien}.",
        "img": "",
        "cat": "Discos",
        "sub": "Discos Múltiple Fino",
    })

# PRECORTADORES CONICOS FIJOS
for d, esp, hueco, dien in [
    ("100", "3.1 A 4", "20", "Z20"),
    ("105", "3.1 A 4", "20", "Z20"),
    ("110", "3.1 A 4.3", "20", "Z20"),
    ("115", "3.1 A 4.3", "20", "Z20"),
    ("120", "3.1 A 4.3", "20", "Z24"),
    ("125", "3.1 A 4.3", "20", "Z24"),
    ("150", "3.1 A 4", "20", "Z24"),
]:
    esp_s = esp.replace(".", "-").replace(" ", "-").lower()
    products.append({
        "id": f"first-pcf-{d}mm-{esp_s}-{dien.lower()}",
        "slug": f"first-precortadores-conicos-fijos-{d}mm-{esp_s}-{dien.lower()}",
        "name": f"Discos FIRST Precortadores Conicos Fijos {d}mm {esp} {dien}",
        "model": f"{d}mm {esp} {dien}",
        "desc": f"Disco FIRST Precortadores Conicos Fijos de {d}mm, espesor {esp}, hueco {hueco}mm, {dien} dientes.",
        "short": f"Disco FIRST Precortadores Conicos Fijos {d}mm {dien}.",
        "img": "",
        "cat": "Discos",
        "sub": "Discos Precortadores Conicos Fijos",
    })

# PRECORTADORES CONICOS FIJOS PARA SECCIONADORA
for d, esp, hueco, dien in [
    ("150", "4.3 A 5.5", "20", "Z24"),
    ("160", "4.3 A 5.5", "30", "Z24"),
    ("180", "4.3 A 5.5", "30", "Z36"),
    ("200", "4.3 A 5.5", "45", "Z32"),
    ("300", "4.3 A 5.5", "65", "Z72"),
]:
    esp_s = esp.replace(".", "-").replace(" ", "-").lower()
    products.append({
        "id": f"first-pcfs-{d}mm-{esp_s}-{dien.lower()}",
        "slug": f"first-precortadores-conicos-fijos-seccionadora-{d}mm-{esp_s}-{dien.lower()}",
        "name": f"Discos FIRST Precortadores Conicos Fijos p/Seccionadora {d}mm {esp} {dien}",
        "model": f"{d}mm {esp} {dien}",
        "desc": f"Disco FIRST Precortadores Conicos Fijos para Seccionadora de {d}mm, espesor {esp}, hueco {hueco}mm, {dien} dientes.",
        "short": f"Disco FIRST Precortadores Conicos p/Seccionadora {d}mm {dien}.",
        "img": "",
        "cat": "Discos",
        "sub": "Discos Precortadores Conicos Fijos para Seccionadora",
    })

# ESPECIALES PARA SECCIONADORA
for d, esp, hueco, dien in [
    ("300", "4.4", "30", "Z60"),
    ("320", "4.4", "65", "Z60"),
    ("350", "4.4", "30", "Z72"),
    ("380", "4.4", "65", "Z72"),
    ("400", "4.4", "65", "Z72"),
]:
    esp_s = esp.replace(".", "-")
    products.append({
        "id": f"first-esp-secc-{d}mm-{esp_s}-{dien.lower()}",
        "slug": f"first-especiales-seccionadora-{d}mm-{esp_s}-{dien.lower()}",
        "name": f"Discos FIRST Especiales p/Seccionadora {d}mm {esp} {dien}",
        "model": f"{d}mm {esp} {dien}",
        "desc": f"Disco FIRST Especiales para Seccionadora de {d}mm, espesor {esp}, hueco {hueco}mm, {dien} dientes.",
        "short": f"Disco FIRST Especiales p/Seccionadora {d}mm {dien}.",
        "img": "",
        "cat": "Discos",
        "sub": "Discos Especiales para Seccionadora",
    })

# HSS VELOCIDAD LENTA
for d, esp, hueco, dien in [
    ("225", "1.9", "32", "Z180"),
    ("250", "2.0", "32", "Z200"),
    ("250", "2.0", "32", "Z220"),
    ("250", "2.0", "32", "Z250"),
    ("275", "2.0", "32", "Z220"),
    ("300", "2.5", "32", "Z220"),
    ("300", "2.5", "32", "Z300"),
    ("315", "2.5", "32", "Z240"),
    ("350", "3.0", "32", "Z220"),
    ("400", "3.0", "32", "Z260"),
]:
    esp_s = esp.replace(".", "-")
    products.append({
        "id": f"first-hss-lenta-{d}mm-{esp_s}-{dien.lower()}",
        "slug": f"first-hss-lenta-{d}mm-{esp_s}-{dien.lower()}",
        "name": f"Discos FIRST HSS Lenta {d}mm {esp} {dien}",
        "model": f"{d}mm {esp} {dien}",
        "desc": f"Disco FIRST HSS Velocidad Lenta de {d}mm, espesor {esp}, hueco {hueco}mm, {dien} dientes.",
        "short": f"Disco FIRST HSS Lenta {d}mm {dien}.",
        "img": "",
        "cat": "Discos",
        "sub": "Discos HSS Lenta",
    })

# HSS VELOCIDAD RAPIDA
for d, esp, hueco, dien in [
    ("250", "3.0", "30", "Z180"),
    ("300", "3.0", "30", "Z180"),
    ("350", "3.0", "40", "Z200"),
    ("400", "3.0", "40", "Z240"),
    ("450", "3.0", "40", "Z240"),
    ("450", "4.0", "40", "Z240"),
    ("520", "4.0", "40", "Z300"),
    ("550", "4.0", "40", "Z300"),
    ("600", "5.0", "40", "Z300"),
    ("700", "5.0", "60", "Z318"),
    ("750", "6.0", "40", "Z400"),
    ("800", "6.0", "65", "Z370"),
]:
    esp_s = esp.replace(".", "-")
    products.append({
        "id": f"first-hss-rapida-{d}mm-{esp_s}-{dien.lower()}",
        "slug": f"first-hss-rapida-{d}mm-{esp_s}-{dien.lower()}",
        "name": f"Discos FIRST HSS Rapida {d}mm {esp} {dien}",
        "model": f"{d}mm {esp} {dien}",
        "desc": f"Disco FIRST HSS Velocidad Rapida de {d}mm, espesor {esp}, hueco {hueco}mm, {dien} dientes.",
        "short": f"Disco FIRST HSS Rapida {d}mm {dien}.",
        "img": "",
        "cat": "Discos",
        "sub": "Discos HSS Rapida",
    })

# HSS PARA ALUMINIO
for d, esp, hueco, dien in [
    ("250", "2.0", "32", "Z100"),
    ("300", "2.5", "32", "Z120"),
    ("350", "2.5", "32", "Z140"),
]:
    esp_s = esp.replace(".", "-")
    products.append({
        "id": f"first-alum-{d}mm-{esp_s}-{dien.lower()}",
        "slug": f"first-para-aluminio-{d}mm-{esp_s}-{dien.lower()}",
        "name": f"Discos FIRST Para Aluminio {d}mm {esp} {dien}",
        "model": f"{d}mm {esp} {dien}",
        "desc": f"Disco FIRST Para Aluminio HSS de {d}mm, espesor {esp}, hueco {hueco}mm, {dien} dientes.",
        "short": f"Disco FIRST Para Aluminio {d}mm {dien}.",
        "img": "",
        "cat": "Discos",
        "sub": "Discos Para Aluminio",
    })

with open(FILEPATH, "r", encoding="utf-8") as f:
    content = f.read()

marker2 = "export const productCategories"
cat_idx = content.find(marker2)
insert = content.rfind("\n];", 0, cat_idx) + 1

lines = []
for p in products:
    lines.append(
        f'  {{ id: "{p["id"]}", slug: "{p["slug"]}", name: "{p["name"]}", brand: "FIRST", model: "{p["model"]}", '
        f'description: "{p["desc"]}", shortDescription: "{p["short"]}", '
        f'category: "{p["cat"]}", subcategory: "{p["sub"]}", image: "{p["img"]}" }},'
    )

new = "\n  // --- FIRST DISCOS HM Y HSS ---\n" + "\n".join(lines) + "\n"
content = content[:insert] + new + content[insert:]

with open(FILEPATH, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Added {len(products)} FIRST discos")
