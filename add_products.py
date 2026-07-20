import re

products = []

# SERIE 172 - ESCOPIL CON ROMPEVIRUTA EJE 13mm
for d, lc, lm, cod in [(6,50,105,"172.060.31"),(7,55,110,"172.070.31"),(8,60,115,"172.080.31"),(9,65,120,"172.090.31"),(10,70,125,"172.100.31"),(11,75,130,"172.110.31"),(12,80,135,"172.120.31"),(13,85,140,"172.130.31"),(14,90,145,"172.140.31"),(15,95,150,"172.150.31"),(16,100,155,"172.160.31"),(18,110,165,"172.180.31"),(20,120,175,"172.200.31")]:
    products.append({"name":f"CMT MECHA DE ESCOPIL CON ROMPEVIRUTA EJE 13mm {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools de escopil con rompeviruta. Diametro {d}mm. L.corte {lc}mm. L.mecha {lm}mm. Z2 dientes. Eje 13mm. Codigo {cod}.","short":f"Mecha escopil rompeviruta 13mm {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":f"/assets/product-images/cmt-orange-tools/serie-172.jpg"})

# SERIE 104 - ESCOPIL AMBIDIESTRO Z4 EJE 13mm
for d, lc, lm, cod in [(6,45,100,"104.060.30"),(8,45,100,"104.080.30"),(9,45,100,"104.090.30"),(10,55,110,"104.100.30"),(12,55,110,"104.120.30"),(14,55,110,"104.140.30"),(16,55,110,"104.160.30")]:
    products.append({"name":f"CMT MECHA PARA ESCOPLO AMBIDIESTRO Z4 EJE 13mm {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para escoplo ambidiestro Z4. Diametro {d}mm. L.corte {lc}mm. L.mecha {lm}mm. Z4 dientes. Eje 13mm. Codigo {cod}.","short":f"Mecha escoplo ambidiestro Z4 13mm {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":f"/assets/product-images/cmt-orange-tools/serie-104.jpg"})

# SERIE 105 - ESCOPIL AMBIDIESTRO Z4 EJE 10mm
for d, lc, lm, cod in [(6,28,73,"105.060.30"),(7,28,73,"105.070.30"),(8,28,73,"105.080.30"),(10,28,73,"105.100.30"),(12,28,73,"105.120.30")]:
    products.append({"name":f"CMT MECHA PARA ESCOPLO AMBIDIESTRO Z4 EJE 10mm {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para escoplo ambidiestro Z4. Diametro {d}mm. L.corte {lc}mm. L.mecha {lm}mm. Z4 dientes. Eje 10mm. Codigo {cod}.","short":f"Mecha escoplo ambidiestro Z4 10mm {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":f"/assets/product-images/cmt-orange-tools/serie-105.jpg"})

# SERIE 179 - ESCOPIL AMBIDIESTRO Z2 EJE 13mm
for d, lc, lm, cod in [(8,50,95,"179.080.50"),(9,55,100,"179.090.50"),(10,60,105,"179.100.50"),(11,65,110,"179.110.50"),(12,70,115,"179.120.50"),(13,75,120,"179.130.50")]:
    products.append({"name":f"CMT MECHA PARA ESCOPLO AMBIDIESTRO Z2 EJE 13mm {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para escoplo ambidiestro Z2. Diametro {d}mm. L.corte {lc}mm. L.mecha {lm}mm. Z2 dientes. Eje 13mm. Codigo {cod}.","short":f"Mecha escoplo ambidiestro Z2 13mm {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":f"/assets/product-images/cmt-orange-tools/serie-179.jpg"})

# SERIE 106 - ESCOPIL AMBIDIESTRO Z2 EJE 12mm
for d, cod in [(6,"106.060.30"),(7,"106.070.30"),(8,"106.080.30"),(9,"106.090.30"),(10,"106.100.30")]:
    products.append({"name":f"CMT MECHA PARA ESCOPLO AMBIDIESTRO Z2 EJE 12mm {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para escoplo ambidiestro Z2. Diametro {d}mm. L.corte 25mm. L.mecha 60mm. Z2 dientes. Eje 12mm. Codigo {cod}.","short":f"Mecha escoplo ambidiestro Z2 12mm {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":""})

# SERIE 107 - ESCOPIL Z3 EJE 16mm
for d, lc, lm, cod in [(6,55,110,"107.060.31"),(8,55,110,"107.080.31"),(10,55,110,"107.100.31"),(12,55,110,"107.120.31"),(14,60,115,"107.140.31"),(16,60,115,"107.160.31"),(18,60,115,"107.180.31"),(20,60,115,"107.200.31"),(6,55,110,"107.060.32"),(8,55,110,"107.080.32"),(10,55,110,"107.100.32"),(12,55,110,"107.120.32"),(14,60,115,"107.140.32"),(16,60,115,"107.160.32"),(18,60,115,"107.180.32"),(20,60,115,"107.200.32")]:
    products.append({"name":f"CMT MECHA PARA ESCOPLO AMBIDIESTRO Z3 EJE 16mm {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para escoplo ambidiestro Z3. Diametro {d}mm. L.corte {lc}mm. L.mecha {lm}mm. Z3 dientes. Eje 16mm. Codigo {cod}.","short":f"Mecha escoplo ambidiestro Z3 16mm {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":f"/assets/product-images/cmt-orange-tools/serie-107.jpg"})

# SERIE 302/303/360 - MANDRILES PARA TALADRADORA
mandriles = [
    {"d":"10","d2":"18","rosca":"S/R","tipo":"","marca":"VITAP","cod":"360.101.00","img":"360-101-00.jpg"},
    {"d":"10","d2":"19.5","rosca":"M10","tipo":"CONICO","marca":"VARIAS","cod":"303.000.01","img":"serie-303.jpg"},
    {"d":"10","d2":"19.5","rosca":"M10","tipo":"CONICO","marca":"VARIAS","cod":"303.000.02","img":"serie-303.jpg"},
    {"d":"10","d2":"19.5","rosca":"M10","tipo":"RECTO","marca":"VARIAS","cod":"302.000.01","img":"serie-302.jpg"},
    {"d":"10","d2":"19.5","rosca":"M10","tipo":"RECTO","marca":"VARIAS","cod":"302.000.02","img":"serie-302.jpg"},
]
for m in mandriles:
    tipo = f" {m['tipo']}" if m['tipo'] else ""
    rosca = f" Rosca {m['rosca']}" if m['rosca'] != 'S/R' else ""
    desc_extra = f". Rosca {m['rosca']}{tipo}. Marca {m['marca']}" if m['rosca'] != 'S/R' else f". Marca {m['marca']}"
    products.append({"name":f"CMT MANDRIL PARA TALADRADORA D2 {m['d2']}mm{tipo} {m['cod']}","model":m['cod'],"desc":f"Mandril CMT Orange Tools para taladradora. Diametro {m['d']}mm. D2 {m['d2']}mm{desc_extra}. Codigo {m['cod']}.","short":f"Mandril taladradora D2 {m['d2']}mm{tipo} {m['cod']}","cat":"Fresas","sub":"Mechas","img":f"/assets/product-images/cmt-orange-tools/{m['img']}"})

# SERIE 310 - TALADRO MULTIPLE CONEXION RAPIDA Z2
for d, cod in [(4,"310.040.11"),(4,"310.040.12"),(5,"310.050.11"),(5,"310.050.12"),(6,"310.060.11"),(6,"310.060.12"),(7,"310.070.11"),(7,"310.070.12"),(8,"310.080.11"),(8,"310.080.12"),(10,"310.100.11"),(10,"310.100.12"),(12,"310.120.11"),(12,"310.120.12"),(13,"310.130.11"),(13,"310.130.12"),(14,"310.140.12"),(15,"310.150.11"),(15,"310.150.12"),(16,"310.160.11"),(16,"310.160.12")]:
    products.append({"name":f"CMT MECHA PARA TALADRO MULTIPLE CONEXION RAPIDA Z2 {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para taladro multiple conexion rapida Z2. Diametro {d}mm. L.corte 27mm. L.mecha 57.5mm. Z2 dientes. Eje 10mm. Codigo {cod}.","short":f"Mecha taladro multiple rapida Z2 {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":f"/assets/product-images/cmt-orange-tools/serie-310.jpg"})

# SERIE 311 - TALADRO MULTIPLE Z2
for d, lc, cod in [(3,18,"311.030.21"),(3,18,"311.030.22"),(4,35,"311.040.11"),(4,35,"311.040.12"),(5,35,"311.050.11"),(5,35,"311.050.12"),(6,35,"311.060.11"),(6,35,"311.060.12"),(7,35,"311.070.11"),(7,35,"311.070.12"),(8,35,"311.080.11"),(8,35,"311.080.12"),(9,35,"311.090.11"),(9,35,"311.090.12"),(10,35,"311.100.11"),(10,35,"311.100.12"),(11.1,35,"311.111.11"),(12,35,"311.120.11"),(12,35,"311.120.12"),(13,35,"311.130.11"),(13,35,"311.130.12"),(14,35,"311.140.11"),(15,35,"311.150.11"),(15,35,"311.150.12"),(16,35,"311.160.11"),(16,35,"311.160.12")]:
    products.append({"name":f"CMT MECHA PARA TALADRO MULTIPLE CONEXION RAPIDA Z2 {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para taladro multiple conexion rapida Z2. Diametro {d}mm. L.corte {lc}mm. L.mecha 70mm. Z2 dientes. Eje 10mm. Codigo {cod}.","short":f"Mecha taladro multiple rapida Z2 {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":f"/assets/product-images/cmt-orange-tools/serie-311.jpg"})

# SERIE 307 - TALADRO MULTIPLE CONEXION RAPIDA Z2+ EJE
for d, cod in [(8,"307.080.11"),(8,"307.080.12"),(10,"307.100.11"),(10,"307.100.12"),(12,"307.120.11"),(12,"307.120.12"),(14,"307.140.11"),(14,"307.140.12"),(16,"307.160.11"),(18,"307.180.11"),(18,"307.180.12")]:
    products.append({"name":f"CMT MECHA PARA TALADRO MULTIPLE CONEXION RAPIDA Z2+ EJE 8mm {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para taladro multiple conexion rapida Z2+. Diametro {d}mm. L.corte 40mm. L.mecha 67mm. Z2 dientes. Eje 8mm. Codigo {cod}.","short":f"Mecha taladro multiple rapida Z2+ {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":f"/assets/product-images/cmt-orange-tools/serie-307.jpg"})

# SERIE 313 - TALADRO MULTIPLE PASANTE EJE 10mm (L.CORTE 27)
for d, cod in [(5,"313.050.11"),(5,"313.050.12"),(6,"313.060.11"),(6,"313.060.12"),(8,"313.080.11"),(8,"313.080.12"),(10,"313.100.11"),(10,"313.100.12"),(14,"313.140.11"),(14,"313.140.12"),(16,"313.160.11"),(16,"313.160.12")]:
    products.append({"name":f"CMT MECHA PARA TALADRO MULTIPLE CONEXION RAPIDA PASANTE EJE 10mm {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para taladro multiple conexion rapida pasante. Diametro {d}mm. L.corte 27mm. L.mecha 57.5mm. Z2 dientes. Eje 10mm. Codigo {cod}.","short":f"Mecha taladro multiple pasante {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":f"/assets/product-images/cmt-orange-tools/serie-313.jpg"})

# SERIE 314 - TALADRO MULTIPLE PASANTE EJE 10mm (L.CORTE 35)
for d, lc, cod in [(3,27,"314.030.21"),(3,27,"314.030.22"),(4,35,"314.040.11"),(4,35,"314.040.12"),(5,35,"314.050.11"),(5,35,"314.050.12"),(6,35,"314.060.11"),(6,35,"314.060.12"),(8,35,"314.080.11"),(10,35,"314.100.11"),(10,35,"314.100.12"),(12,35,"314.120.11"),(12,35,"314.120.12")]:
    products.append({"name":f"CMT MECHA PARA TALADRO MULTIPLE CONEXION RAPIDA PASANTE EJE 10mm {d}mm {cod}","model":cod,"desc":f"Mecha CMT Orange Tools para taladro multiple conexion rapida pasante. Diametro {d}mm. L.corte {lc}mm. L.mecha 70mm. Z2 dientes. Eje 10mm. Codigo {cod}.","short":f"Mecha taladro multiple pasante {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":f"/assets/product-images/cmt-orange-tools/serie-314.jpg"})

# SERIE 315 - AVELLANADOR
for d, lc, cod in [(20,"DE 5 A 10","315.200.11"),(22,"DE 11 A 12","315.220.11")]:
    products.append({"name":f"CMT AVELLANADOR PARA MECHAS DE TALADRO MULTIPLE {d}mm {cod}","model":cod,"desc":f"Avellanador CMT Orange Tools para mechas de taladro multiple. Diametro {d}mm. L.corte {lc}. Codigo {cod}.","short":f"Avellanador taladro multiple {d}mm {cod}","cat":"Fresas","sub":"Mechas","img":f"/assets/product-images/cmt-orange-tools/serie-315.jpg"})

# Generate TypeScript entries
lines = []
for p in products:
    slug = p["name"].lower().replace('"','').replace('/','-').replace(' ','-').replace('+','-')
    slug = re.sub(r'-+', '-', slug).strip('-')
    lines.append(f'  {{ id: "cmt-ot-{slug}", slug: "{slug}", name: "{p["name"]}", brand: "CMT Orange Tools", model: "{p["model"]}", description: "{p["desc"]}", shortDescription: "{p["short"]}", category: "{p["cat"]}", subcategory: "{p["sub"]}", image: "{p["img"]}" }},')

print(f"Total products: {len(products)}")
with open(r"C:\Users\Danniely\Desktop\ARUCA WEB\aruca-web\new_products.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(lines))
print("Written to new_products.txt")
